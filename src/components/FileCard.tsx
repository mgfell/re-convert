import { formatFileSize } from "../lib/download";

type Props = {
  file: File;
  onRemove: () => void;
};

export default function FileCard({ file, onRemove }: Props) {
  const ext = file.name.split(".").pop()?.toUpperCase().slice(0, 4) ?? "FILE";

  return (
    <div className="glass-soft rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[10px] font-semibold tracking-wider text-white/70 shrink-0">
          {ext}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/90 truncate">
            {file.name}
          </p>
          <p className="text-xs text-white/40">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        aria-label="Remove file"
        className="text-white/40 hover:text-white transition p-2 rounded-lg hover:bg-white/[0.06]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}