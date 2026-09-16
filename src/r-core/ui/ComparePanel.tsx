import { useEffect, useState } from "react";
import type { ConvertResult } from "@/abi";
import {
  formatFileSize,
  formatDimensions,
  sizeDiffPercent,
  formatPercent,
} from "@/libc/format";
import { useT } from "@/libc/i18n/useT";

type Props = {
  file: File;
  result: ConvertResult;
};

export default function ComparePanel({ file, result }: Props) {
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (!isImage) return;
    const u = URL.createObjectURL(file);
    setOriginalUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file, isImage]);

  const diff = sizeDiffPercent(file.size, result.size);
  const isSmaller = diff < -0.5;
  const isLarger = diff > 0.5;

  const diffColor = isSmaller
    ? "text-emerald-300/90"
    : isLarger
    ? "text-amber-300/90"
    : "text-white/50";

  const diffLabel = isSmaller
    ? t("compare.smaller")
    : isLarger
    ? t("compare.larger")
    : t("compare.same");

  return (
    <div className="mt-3 rounded-xl bg-black/40 border border-white/[0.05] overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-2 text-[11px] tracking-wide uppercase text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          {t("compare.result")}
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className={`font-medium tabular-nums ${diffColor}`}>
            {formatPercent(diff)}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-white/40">{diffLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.05]">
        <Side label={t("compare.original")}>
          {isImage && originalUrl ? (
            <img
              src={originalUrl}
              alt="Original"
              className={`w-full object-contain rounded-lg transition-all duration-300 ${
                expanded ? "max-h-[400px]" : "max-h-32"
              }`}
            />
          ) : (
            <FilePlaceholder name={file.name} />
          )}
        </Side>

        <Side label={t("compare.result")}>
          {isImage ? (
            <img
              src={result.url}
              alt="Result"
              className={`w-full object-contain rounded-lg transition-all duration-300 ${
                expanded ? "max-h-[400px]" : "max-h-32"
              }`}
            />
          ) : (
            <TextPreview result={result} expanded={expanded} />
          )}
        </Side>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-white/30">{formatFileSize(file.size)}</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/20"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span
            className={
              isSmaller
                ? "text-emerald-300/90"
                : isLarger
                ? "text-amber-300/90"
                : "text-white/50"
            }
          >
            {formatFileSize(result.size)}
          </span>
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-white/40 hover:text-white/80 transition text-[11px] flex items-center gap-1"
        >
          {expanded ? t("compare.collapse") : t("compare.expand")}
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Side({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 bg-black/20">
      <p className="text-[10px] tracking-wider uppercase text-white/30 mb-2">
        {label}
      </p>
      <div className="rounded-lg overflow-hidden flex items-center justify-center min-h-[80px]">
        {children}
      </div>
    </div>
  );
}

function FilePlaceholder({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 text-white/30">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
      <p className="text-[10px] tracking-wider uppercase mt-2">{ext}</p>
    </div>
  );
}

function TextPreview({
  result,
  expanded,
}: {
  result: ConvertResult;
  expanded: boolean;
}) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    result.blob
      .text()
      .then((t) => {
        if (!cancelled) setText(t.slice(0, expanded ? 5000 : 500));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [result, expanded]);

  if (!text) {
    return (
      <div className="w-full flex items-center justify-center py-4 text-white/20 text-xs">
        …
      </div>
    );
  }

  const truncated = text.length >= (expanded ? 5000 : 500);

  return (
    <pre
      className={`w-full text-[10px] text-white/60 font-mono whitespace-pre-wrap break-all overflow-auto transition-all duration-300 ${
        expanded ? "max-h-[400px]" : "max-h-32"
      }`}
    >
      {text}
      {truncated ? "\n…" : ""}
    </pre>
  );
}