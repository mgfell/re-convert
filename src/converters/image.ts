import type {
  ConvertResult,
  Converter,
  ImageFormat,
} from "../types/converter";
import { getFormat } from "../config/formats";
import { loadImage } from "../lib/loadImage";

export const convertImage: Converter<ImageFormat> = async (
  file,
  format,
  settings,
  onProgress
) => {
  onProgress?.(5);

  const formatConfig = getFormat(format);
  const img = await loadImage(file);
  onProgress?.(25);

  let width = img.width;
  let height = img.height;

  if (settings.maxWidth && width > settings.maxWidth) {
    const ratio = settings.maxWidth / width;
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to create canvas context");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (!formatConfig.supportsTransparency) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img.element, 0, 0, width, height);
  onProgress?.(65);

  const quality = formatConfig.supportsQuality
    ? Math.min(Math.max(settings.quality, 1), 100) / 100
    : undefined;

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
      formatConfig.mime,
      quality
    );
  });

  onProgress?.(100);

  const url = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const name = `${baseName}.${formatConfig.extension}`;

  return {
    blob,
    url,
    name,
    size: blob.size,
    width,
    height,
  } satisfies ConvertResult;
};