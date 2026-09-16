import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ConvertJob, ConvertResult } from "../types/converter";
import type { ImageSettings } from "../types/images";
import type { DataSettings } from "../types/data";
import type { TabId } from "../types/tabs";
import { convertImage } from "../converters/images";
import { convertData } from "../converters/data";
import { DEFAULT_QUALITY, DEFAULT_MAX_WIDTH } from "../config/formats";
import { makeId } from "../lib/id";
import { useToast } from "./useToast";

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

  const { push } = useToast();
  const urlsRef = useRef<Set<string>>(new Set());

  const trackUrl = (url: string) => urlsRef.current.add(url);
  const untrackAndRevoke = (url: string | null | undefined) => {
    if (!url) return;
    if (urlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      urlsRef.current.delete(url);
    }
  };

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.clear();
    };
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
        })),
      ]);

      push(
        `Added ${files.length} file${files.length > 1 ? "s" : ""}`,
        "info",
        2500
      );
    },
    [push]
  );

  const removeJob = useCallback((id: string) => {
    setJobs((prev) => {
      const job = prev.find((j) => j.id === id);
      untrackAndRevoke(job?.result?.url);
      return prev.filter((j) => j.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setJobs((prev) => {
      prev.forEach((j) => untrackAndRevoke(j.result?.url));
      return [];
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

  const convertOne = useCallback(
    async (job: ConvertJob, tab: TabId) => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? { ...j, status: "processing", progress: 0, error: null }
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
          result = await convertImage(job, imageSettings, onProgress);
        } else if (tab === "data") {
          result = await convertData(job, dataSettings, onProgress);
        } else {
          throw new Error(`Converter for "${tab}" is not available yet`);
        }

        trackUrl(result.url);

        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "done", progress: 100, result }
              : j
          )
        );

        return true;
      } catch (e) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? {
                  ...j,
                  status: "error",
                  error:
                    e instanceof Error ? e.message : "Conversion error",
                }
              : j
          )
        );
        return false;
      }
    },
    [imageSettings, dataSettings]
  );

  const convertAll = useCallback(async () => {
    const snapshot = jobs.filter(
      (j) => j.status === "queued" || j.status === "error"
    );
    if (!snapshot.length) return;

    let ok = 0;
    let failed = 0;

    for (const job of snapshot) {
      const success = await convertOne(job, activeTab);
      success ? ok++ : failed++;
    }

    if (ok && !failed) {
      push(`Converted ${ok} file${ok > 1 ? "s" : ""} successfully`, "success");
    } else if (ok && failed) {
      push(`Converted ${ok}, failed ${failed}`, "info");
    } else if (failed) {
      push(`All ${failed} failed`, "error");
    }
  }, [jobs, activeTab, convertOne, push]);

  const convertSingle = useCallback(
    async (id: string) => {
      const job = jobs.find((j) => j.id === id);
      if (!job) return;

      const success = await convertOne(job, activeTab);
      push(
        success ? "Converted successfully" : "Conversion failed",
        success ? "success" : "error",
        success ? 2500 : 3000
      );
    },
    [jobs, activeTab, convertOne, push]
  );

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
    updateImageSettings,
    updateDataSettings,
    setImageFormat,
    setDataFormat,
    addFiles,
    removeJob,
    clearAll,
    convertAll,
    convertSingle,
  };
}