import type { TabId } from "@/abi";

const IMAGE_EXTS = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "bmp",
  "avif",
  "svg",
  "ico",
  "heic",
  "heif",
]);

const PDF_EXTS = new Set(["pdf"]);

const DATA_EXTS = new Set(["json", "csv", "tsv", "yaml", "yml", "xml"]);

const MEDIA_EXTS = new Set([
  "mp3",
  "wav",
  "ogg",
  "flac",
  "m4a",
  "mp4",
  "mov",
  "webm",
  "mkv",
  "avi",
]);

export function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  if (idx === -1) return "";
  return filename.slice(idx + 1).toLowerCase();
}

export function detectFileType(file: File): TabId | null {
  const ext = getExtension(file.name);
  if (IMAGE_EXTS.has(ext)) return "images";
  if (PDF_EXTS.has(ext)) return "pdf";
  if (DATA_EXTS.has(ext)) return "data";
  if (MEDIA_EXTS.has(ext)) return "media";
  if (file.type.startsWith("image/")) return "images";
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("audio/") || file.type.startsWith("video/"))
    return "media";
  return null;
}

export function isFileSupported(file: File): boolean {
  return detectFileType(file) !== null;
}