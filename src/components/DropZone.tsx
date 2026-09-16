import { useRef, useState, type DragEvent } from "react";
import { ACCEPTED_IMAGE_TYPES } from "../config/formats";

type Props = {
  onFile: (file: File) => void;
};

export default function DropZone({ onFile }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
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
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`
        cursor-pointer rounded-3xl p-16 text-center transition-all duration-300 outline-none
        ${
          isDragging
            ? "bg-white/[0.05] border border-white/20"
            : "glass-soft hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/15"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />

      <div className="mx-auto w-14 h-14 rounded-2xl glass-soft flex items-center justify-center mb-6">
        <svg
          width="22"
          height="22"
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

      <p className="text-white/85 text-lg font-medium">
        {isDragging ? "Drop to upload" : "Drop a file here"}
      </p>
      <p className="text-white/40 text-sm mt-2">
        or <span className="text-white/70 underline underline-offset-4 decoration-white/20">browse your device</span>
      </p>

      <div className="mt-8 flex items-center justify-center gap-3 text-[11px] tracking-wider uppercase text-white/25">
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