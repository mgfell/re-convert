type Props = {
  extension: string;
  size?: number;
};

const COLORS: Record<string, { bg: string; fg: string; label: string }> = {
  png: { bg: "#1f2937", fg: "#93c5fd", label: "PNG" },
  jpg: { bg: "#1f2937", fg: "#fbbf24", label: "JPG" },
  jpeg: { bg: "#1f2937", fg: "#fbbf24", label: "JPG" },
  webp: { bg: "#1f2937", fg: "#34d399", label: "WEBP" },
  gif: { bg: "#1f2937", fg: "#f472b6", label: "GIF" },
  heic: { bg: "#1f2937", fg: "#a78bfa", label: "HEIC" },
  heif: { bg: "#1f2937", fg: "#a78bfa", label: "HEIF" },
  avif: { bg: "#1f2937", fg: "#22d3ee", label: "AVIF" },
  svg: { bg: "#1f2937", fg: "#fb923c", label: "SVG" },
  ico: { bg: "#1f2937", fg: "#facc15", label: "ICO" },
  bmp: { bg: "#1f2937", fg: "#f87171", label: "BMP" },
  pdf: { bg: "#1f2937", fg: "#f87171", label: "PDF" },
  json: { bg: "#1f2937", fg: "#facc15", label: "JSON" },
  csv: { bg: "#1f2937", fg: "#34d399", label: "CSV" },
  tsv: { bg: "#1f2937", fg: "#34d399", label: "TSV" },
  yaml: { bg: "#1f2937", fg: "#c084fc", label: "YAML" },
  yml: { bg: "#1f2937", fg: "#c084fc", label: "YML" },
  xml: { bg: "#1f2937", fg: "#fb923c", label: "XML" },
  mp3: { bg: "#1f2937", fg: "#22d3ee", label: "MP3" },
  mp4: { bg: "#1f2937", fg: "#22d3ee", label: "MP4" },
  webm: { bg: "#1f2937", fg: "#22d3ee", label: "WEBM" },
  mov: { bg: "#1f2937", fg: "#22d3ee", label: "MOV" },
};

const FALLBACK = { bg: "#1f2937", fg: "#94a3b8", label: "FILE" };

export default function FileIcon({ extension, size = 40 }: Props) {
  const key = extension.toLowerCase();
  const { bg, fg, label } = COLORS[key] ?? {
    ...FALLBACK,
    label: key.slice(0, 4).toUpperCase() || "FILE",
  };

  return (
    <div
      className="rounded-xl flex items-center justify-center shrink-0 border border-white/[0.06]"
      style={{
        width: size,
        height: size,
        background: bg,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <span
        className="font-semibold tracking-wider"
        style={{
          color: fg,
          fontSize: label.length > 4 ? 7 : label.length > 3 ? 9 : 10,
        }}
      >
        {label}
      </span>
    </div>
  );
}