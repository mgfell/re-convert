import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ConvertJob,
  ConvertSettings,
  ImageFormat,
} from "../types/converter";
import { convertImage } from "../converters/image";
import { DEFAULT_QUALITY, DEFAULT_MAX_WIDTH } from "../config/formats";
import { makeId } from "../lib/id";
import { useToast } from "./useToast";

export function useBatchConverter() {
  const [jobs, setJobs] = useState<ConvertJob[]>([]);
  const [settings, setSettings] = useState<ConvertSettings>({
    format: "png",
    quality: DEFAULT_QUALITY,
    maxWidth: DEFAULT_MAX_WIDTH,
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

  const updateSettings = useCallback((patch: Partial<ConvertSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const setFormat = useCallback(
    (format: ImageFormat) => updateSettings({ format }),
    [updateSettings]
  );

  const convertOne = useCallback(
    async (job: ConvertJob, currentSettings: ConvertSettings) => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? { ...j, status: "processing", progress: 0, error: null }
            : j
        )
      );

      try {
        const result = await convertImage(
          job.file,
          currentSettings.format,
          currentSettings,
          (p) =>
            setJobs((prev) =>
              prev.map((j) => (j.id === job.id ? { ...j, progress: p } : j))
            )
        );

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
                  error: e instanceof Error ? e.message : "Conversion error",
                }
              : j
          )
        );
        return false;
      }
    },
    []
  );

  const convertAll = useCallback(async () => {
    const snapshot = jobs.filter(
      (j) => j.status === "queued" || j.status === "error"
    );
    if (!snapshot.length) return;

    let ok = 0;
    let failed = 0;

    for (const job of snapshot) {
      const success = await convertOne(job, settings);
      success ? ok++ : failed++;
    }

    if (ok && !failed) {
      push(`Converted ${ok} file${ok > 1 ? "s" : ""} successfully`, "success");
    } else if (ok && failed) {
      push(`Converted ${ok}, failed ${failed}`, "info");
    } else if (failed) {
      push(`All ${failed} failed`, "error");
    }
  }, [jobs, settings, convertOne, push]);

  const convertSingle = useCallback(
    async (id: string) => {
      const job = jobs.find((j) => j.id === id);
      if (!job) return;

      const success = await convertOne(job, settings);
      push(
        success ? "Converted successfully" : "Conversion failed",
        success ? "success" : "error",
        success ? 2500 : 3000
      );
    },
    [jobs, settings, convertOne, push]
  );

  const stats = {
    total: jobs.length,
    queued: jobs.filter((j) => j.status === "queued").length,
    processing: jobs.filter((j) => j.status === "processing").length,
    done: jobs.filter((j) => j.status === "done").length,
    errors: jobs.filter((j) => j.status === "error").length,
  };

  const isBusy = stats.processing > 0;

  return {
    jobs,
    settings,
    stats,
    isBusy,
    addFiles,
    removeJob,
    clearAll,
    setFormat,
    updateSettings,
    convertAll,
    convertSingle,
  };
}