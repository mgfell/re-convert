import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ConvertJob, ConvertResult, TabId } from "@/abi";
import { makeId } from "@/libc/id";
import { UrlRegistry } from "@/c-core/mm/urls";
import { convertImage } from "@/c-core/drivers/images/converter";
import { convertData } from "@/c-core/drivers/data/converter";
import { convertPdf } from "@/c-core/drivers/pdf/converter";
import { downloadBlob } from "@/c-core/fs/download";
import {
  DEFAULT_QUALITY,
  DEFAULT_MAX_WIDTH,
} from "@/c-core/drivers/images/config";
import { PDF_DEFAULT_SETTINGS } from "@/c-core/drivers/pdf/config";
import type { ImageSettings } from "@/c-core/drivers/images/types";
import type { DataSettings } from "@/c-core/drivers/data/types";
import type { PdfSettings } from "@/c-core/drivers/pdf/types";
import { useToast } from "@/r-core/ui/toast/useToast";
import { useT } from "@/libc/i18n/useT";

const MAX_ATTEMPTS = 3;

export function useBatchConverter(activeTab: TabId) {
  const [jobs, setJobs] = useState<ConvertJob[]>([]);
  const [imageSettings, setImageSettings] = useState<ImageSettings>({
    format: "png",
    quality: DEFAULT_QUALITY,
    maxWidth: DEFAULT_MAX_WIDTH,
  });
  const [dataSettings, setDataSettings] = useState<DataSettings>({
    format: "json",
    pretty: true,
  });
  const [pdfSettings, setPdfSettings] = useState<PdfSettings>({
    ...PDF_DEFAULT_SETTINGS,
  });

  const { push } = useToast();
  const { t } = useT();
  const urlsRef = useRef<UrlRegistry>(new UrlRegistry());
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const registry = urlsRef.current;
    return () => registry.revokeAll();
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      if (!files.length) return;

      setJobs((prev) => [
        ...prev,
        ...files.map<ConvertJob>((file) => ({
          id: makeId(),
          file,
          status: "queued",
          progress: 0,
          result: null,
          error: null,
          attempts: 0,
        })),
      ]);

      push(t("toast.added", { n: files.length }), "info", 2500);
    },
    [push, t]
  );

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => {
      const job = prev.find((j) => j.id === id);
      urlsRef.current.revoke(job?.result?.url);
      return prev.filter((j) => j.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setJobs((prev) => {
      prev.forEach((j) => urlsRef.current.revoke(j.result?.url));
      return [];
    });
  }, []);

  const reorderJobs = useCallback((from: number, to: number) => {
    setJobs((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const updateImageSettings = useCallback(
    (patch: Partial<ImageSettings>) => {
      setImageSettings((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const setImageFormat = useCallback(
    (format: ImageSettings["format"]) => updateImageSettings({ format }),
    [updateImageSettings]
  );

  const updateDataSettings = useCallback(
    (patch: Partial<DataSettings>) => {
      setDataSettings((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const setDataFormat = useCallback(
    (format: DataSettings["format"]) => updateDataSettings({ format }),
    [updateDataSettings]
  );

  const updatePdfSettings = useCallback(
    (patch: Partial<PdfSettings>) => {
      setPdfSettings((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const cancelAll = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setJobs((prev) =>
      prev.map((j) =>
        j.status === "processing"
          ? { ...j, status: "cancelled", progress: 0 }
          : j
      )
    );
    push(t("toast.cancelled"), "info", 2000);
  }, [push, t]);

  const convertOne = useCallback(
    async (
      job: ConvertJob,
      tab: TabId,
      signal?: AbortSignal
    ): Promise<"ok" | "failed" | "cancelled"> => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: "processing",
                progress: 0,
                error: null,
                attempts: j.attempts + 1,
              }
            : j
        )
      );

      const onProgress = (p: number) =>
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, progress: p } : j))
        );

      try {
        let result: ConvertResult;

        if (tab === "images") {
          result = await convertImage(job, imageSettings, onProgress, {
            signal,
          });
        } else if (tab === "data") {
          result = await convertData(job, dataSettings, onProgress, {
            signal,
          });
        } else if (tab === "pdf") {
          result = await convertPdf(job, pdfSettings, onProgress, {
            signal,
          });
        } else {
          throw new Error(`Converter for "${tab}" is not available yet`);
        }

        urlsRef.current.track(result.url);

        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "done", progress: 100, result }
              : j
          )
        );

        return "ok";
      } catch (e) {
        if (signal?.aborted || (e instanceof Error && e.name === "AbortError")) {
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? { ...j, status: "cancelled", progress: 0 }
                : j
            )
          );
          return "cancelled";
        }

        const message =
          e instanceof Error ? e.message : "Conversion error";

        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "error", error: message }
              : j
          )
        );
        return "failed";
      }
    },
    [imageSettings, dataSettings, pdfSettings]
  );

  const convertWithRetry = useCallback(
    async (job: ConvertJob, tab: TabId, signal?: AbortSignal) => {
      let lastResult: "ok" | "failed" | "cancelled" = "failed";

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        if (signal?.aborted) return "cancelled";

        lastResult = await convertOne(job, tab, signal);
        if (lastResult === "ok") return "ok";
        if (lastResult === "cancelled") return "cancelled";

        if (attempt < MAX_ATTEMPTS - 1) {
          const delay = 300 * Math.pow(2, attempt);
          await new Promise((r) => setTimeout(r, delay));
        }
      }

      return lastResult;
    },
    [convertOne]
  );

  const convertAll = useCallback(async () => {
    const snapshot = jobs.filter(
      (j) => j.status === "queued" || j.status === "error"
    );
    if (!snapshot.length) return;

    const controller = new AbortController();
    abortRef.current = controller;

    let ok = 0;
    let failed = 0;

    for (const job of snapshot) {
      if (controller.signal.aborted) break;

      const status = await convertWithRetry(job, activeTab, controller.signal);
      if (status === "ok") ok++;
      else if (status === "failed") failed++;
      else break;
    }

    abortRef.current = null;

    if (controller.signal.aborted) {
      push(t("toast.cancelled"), "info", 2500);
      return;
    }

    if (ok && !failed) {
      push(t("toast.convertedMany", { n: ok }), "success");
    } else if (ok && failed) {
      push(t("toast.convertedPartial", { ok, failed }), "info");
    } else if (failed) {
      push(t("toast.allFailed", { n: failed }), "error");
    }
  }, [jobs, activeTab, convertWithRetry, push, t]);

  const convertSingle = useCallback(
    async (id: string) => {
      const job = jobs.find((j) => j.id === id);
      if (!job) return;

      const status = await convertWithRetry(job, activeTab);
      if (status === "ok") {
        push(t("toast.convertedOne"), "success", 2500);
      } else if (status === "failed") {
        push(t("toast.failed"), "error", 3000);
      }
    },
    [jobs, activeTab, convertWithRetry, push, t]
  );

  const downloadAllSeparate = useCallback(() => {
    const done = jobs.filter((j) => j.status === "done" && j.result);
    done.forEach((job, i) => {
      setTimeout(() => {
        if (job.result) downloadBlob(job.result.blob, job.result.name);
      }, i * 150);
    });
    push(t("toast.downloaded", { name: `${done.length}` }), "success", 2500);
  }, [jobs, push, t]);

  const stats = useMemo(
    () => ({
      total: jobs.length,
      queued: jobs.filter((j) => j.status === "queued").length,
      processing: jobs.filter((j) => j.status === "processing").length,
      done: jobs.filter((j) => j.status === "done").length,
      errors: jobs.filter((j) => j.status === "error").length,
    }),
    [jobs]
  );

  const isBusy = stats.processing > 0;

  return {
    jobs,
    stats,
    isBusy,
    imageSettings,
    dataSettings,
    pdfSettings,
    updateImageSettings,
    updateDataSettings,
    updatePdfSettings,
    setImageFormat,
    setDataFormat,
    addFiles,
    removeJob,
    reorderJobs,
    clearAll,
    cancelAll,
    convertAll,
    convertSingle,
    downloadAllSeparate,
  };
}