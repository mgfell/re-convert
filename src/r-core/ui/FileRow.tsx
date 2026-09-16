import { useEffect, useState } from "react";
import type { ConvertJob } from "@/abi";
import { formatFileSize, formatDimensions } from "@/libc/format";
import { downloadBlob } from "@/c-core/fs/download";
import { useT } from "@/libc/i18n/useT";
import FileIcon from "./FileIcon";
import ComparePanel from "./ComparePanel";

type Props = {
  job: ConvertJob;
  onRemove: (id: string) => void;
  onConvertOne: (id: string) => void;
};

export default function FileRow({ job, onRemove, onConvertOne }: Props) {
  const { t } = useT();
  const ext = job.file.name.split(".").pop() ?? "";
  const isProcessing = job.status === "processing";
  const isDone = job.status === "done" && job.result;
  const isError = job.status === "error";
  const isQueued = job.status === "queued";

  const STATUS_COLOR: Record<ConvertJob["status"], string> = {
    queued: "text-white/40",
    processing: "text-blue-300/90",
    done: "text-emerald-300/90",
    error: "text-red-300/90",
    cancelled: "text-white/30",
  };

  return (
    <div className="glass-soft rounded-2xl p-4 transition-colors animate-row-in">
      <div className="flex items-start gap-3">
        <FileIcon extension={ext} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-white/90 truncate">
              {job.file.name}
            </p>
            <span
              className={`text-[11px] tracking-wide uppercase shrink-0 ${STATUS_COLOR[job.status]}`}
            >
              {t(`status.${job.status}` as const)}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-white/40 flex-wrap">
            <span>{formatFileSize(job.file.size)}</span>

            {isDone && job.result && (
              <>
                <span className="w-px h-3 bg-white/15" />
                <span className="text-emerald-300/70">
                  {formatFileSize(job.result.size)}
                </span>
                {job.result.width && job.result.height && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span>
                      {formatDimensions(job.result.width, job.result.height)}
                    </span>
                  </>
                )}
              </>
            )}

            {isError && (
              <>
                <span className="w-px h-3 bg-white/15" />
                <span className="text-red-300/70 truncate">
                  {job.error ?? "Unknown error"}
                </span>
                {job.attempts > 1 && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span className="text-white/30">
                      attempt {job.attempts}
                    </span>
                  </>
                )}
              </>
            )}
          </div>

          {isProcessing && (
            <div className="mt-3">
              <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-white/70 transition-all duration-300 rounded-full"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {isDone && job.result && (
            <button
              onClick={() => downloadBlob(job.result!.blob, job.result!.name)}
              aria-label={t("actions.download")}
              title={t("actions.download")}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v12M12 16l-4-4M12 16l4-4" />
                <path d="M4 18v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
            </button>
          )}

          {isError && (
            <button
              onClick={() => onConvertOne(job.id)}
              aria-label={t("actions.retry")}
              title={t("actions.retry")}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <path d="M21 4v5h-5" />
              </svg>
            </button>
          )}

          <button
            onClick={() => onRemove(job.id)}
            disabled={isProcessing}
            aria-label={t("actions.remove")}
            title={t("actions.remove")}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {isQueued && !job.result && <OriginalPreview file={job.file} />}
      {isDone && job.result && (
        <ComparePanel file={job.file} result={job.result} />
      )}
    </div>
  );
}

function OriginalPreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) return;

    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (!url) return null;

  return (
    <div className="mt-3 rounded-xl bg-black/40 border border-white/[0.05] p-2">
      <img
        src={url}
        alt="Original"
        className="w-full max-h-40 object-contain rounded-lg opacity-80"
      />
    </div>
  );
}