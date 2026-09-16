import type { ConvertContext, ConvertJob, ConvertResult } from "@/abi";
import type { ImageSettings } from "./types";
import { getImageFormat } from "./config";
import { loadImage } from "./lib/loadImage";
import { canvasToIco } from "./lib/ico";

function checkAbort(context?: ConvertContext) {
  if (context?.signal?.aborted) {
    const err = new Error("Aborted");
    err.name = "AbortError";
    throw err;
  }
}

export async function convertImage(
  job: ConvertJob,
  settings: ImageSettings,
  onProgress?: (p: number) => void,
  context?: ConvertContext
): Promise<ConvertResult> {
  checkAbort(context);
  onProgress?.(5);

  const formatConfig = getImageFormat(settings.format);
  const img = await loadImage(job.file);
  checkAbort(context);
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
  checkAbort(context);
  onProgress?.(65);

  const quality = formatConfig.supportsQuality
    ? Math.min(Math.max(settings.quality, 1), 100) / 100
    : undefined;

  let blob: Blob;

  if (settings.format === "ico") {
    blob = await canvasToIco(canvas);
  } else {
    blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
        formatConfig.mime,
        quality
      );
    });
  }

  checkAbort(context);
  onProgress?.(100);

  const url = URL.createObjectURL(blob);
  const baseName = job.file.name.replace(/\.[^.]+$/, "");
  const name = `${baseName}.${formatConfig.extension}`;

  return {
    blob,
    url,
    name,
    size: blob.size,
    width,
    height,
  };
}