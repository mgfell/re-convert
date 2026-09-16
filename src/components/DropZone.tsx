import { useRef, useState, type DragEvent } from "react";
import { ACCEPTED_IMAGE_TYPES } from "../config/formats";

type Props = {
  onFiles: (files: File[]) => void;
  compact?: boolean;
};

export default function DropZone({ onFiles, compact = false }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length) onFiles(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      className={`
        cursor-pointer rounded-3xl text-center transition-all duration-300 outline-none
        ${compact ? "p-6 sm:p-8" : "p-10 sm:p-16"}
        ${
          isDragging
            ? "bg-white/[0.06] border border-white/25"
            : "glass-soft border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/15"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />

      <div
        className={`mx-auto rounded-2xl glass-soft flex items-center justify-center mb-4 sm:mb-6 ${
          compact ? "w-11 h-11" : "w-14 h-14"
        }`}
      >
        <svg
          width={compact ? 18 : 22}
          height={compact ? 18 : 22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60"
        >
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      </div>

      <p
        className={`text-white/85 font-medium ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {isDragging ? "Drop to upload" : "Drop files here"}
      </p>
      <p className="text-white/40 text-sm mt-2">
        or{" "}
        <span className="text-white/70 underline underline-offset-4 decoration-white/20">
          browse your device
        </span>
      </p>

      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] tracking-wider uppercase text-white/25">
        <span>PNG</span>
        <span className="w-px h-3 bg-white/15" />
        <span>JPG</span>
        <span className="w-px h-3 bg-white/15" />
        <span>WEBP</span>
        <span className="w-px h-3 bg-white/15" />
        <span>GIF</span>
        <span className="w-px h-3 bg-white/15" />
        <span>HEIC</span>
      </div>
    </div>
  );
}