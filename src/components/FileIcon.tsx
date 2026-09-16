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
  svg: { bg: "#1f2937", fg: "#fb923c", label: "SVG" },
  bmp: { bg: "#1f2937", fg: "#f87171", label: "BMP" },
  avif: { bg: "#1f2937", fg: "#22d3ee", label: "AVIF" },
};

const FALLBACK = { bg: "#1f2937", fg: "#94a3b8", label: "IMG" };

export default function FileIcon({ extension, size = 40 }: Props) {
  const { bg, fg, label } = COLORS[extension.toLowerCase()] ?? FALLBACK;

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
        style={{ color: fg, fontSize: label.length > 3 ? 8 : 10 }}
      >
        {label}
      </span>
    </div>
  );
}