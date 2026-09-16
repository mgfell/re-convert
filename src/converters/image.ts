import type { Converter, ConvertResult, ImageFormat } from "../types/converter";
import { IMAGE_FORMATS } from "../config/formats";
import { loadImage } from "../lib/loadImage";

export const convertImage: Converter<ImageFormat> = async (
  file,
  format,
  onProgress
) => {
  onProgress?.(10);

  const img = await loadImage(file);
  onProgress?.(40);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to create canvas context");

  const formatConfig = IMAGE_FORMATS.find((f) => f.id === format);
  if (!formatConfig) throw new Error(`Unsupported format: ${format}`);

  // JPEG doesn't support transparency — fill with white
  if (!formatConfig.supportsTransparency) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);
  onProgress?.(70);

  const quality = format === "png" ? undefined : 0.92;

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

  return { url, name, blob, size: blob.size } satisfies ConvertResult;
};