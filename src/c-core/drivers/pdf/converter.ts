import { PDFDocument } from "pdf-lib";
import type { ConvertContext, ConvertJob, ConvertResult } from "@/abi";
import type { PdfSettings } from "./types";
import { getPdfImageFormat } from "./config";
import { loadPdf, renderPage } from "./lib/render";
import { loadImage } from "@/c-core/drivers/images/lib/loadImage";
import { getExtension } from "@/c-core/fs/detectType";

function checkAbort(context?: ConvertContext) {
  if (context?.signal?.aborted) {
    const err = new Error("Aborted");
    err.name = "AbortError";
    throw err;
  }
}

export async function convertPdf(
  job: ConvertJob,
  settings: PdfSettings,
  onProgress?: (p: number) => void,
  context?: ConvertContext
): Promise<ConvertResult> {
  const ext = getExtension(job.file.name);

  if (settings.direction === "pdf-to-images") {
    if (ext !== "pdf") {
      throw new Error("Expected a PDF file");
    }
    return pdfToImages(job, settings, onProgress, context);
  }

  if (settings.direction === "images-to-pdf") {
    if (ext === "pdf") {
      throw new Error("Expected an image file");
    }
    return imagesToPdf(job, settings, onProgress, context);
  }

  throw new Error("Unknown PDF direction");
}

async function pdfToImages(
  job: ConvertJob,
  settings: PdfSettings,
  onProgress?: (p: number) => void,
  context?: ConvertContext
): Promise<ConvertResult> {
  checkAbort(context);
  onProgress?.(5);

  const pdf = await loadPdf(job.file);
  const numPages = pdf.numPages;
  onProgress?.(15);

  const formatConfig = getPdfImageFormat(settings.imageFormat);
  const quality = formatConfig.supportsQuality
    ? Math.min(Math.max(settings.quality, 1), 100) / 100
    : undefined;

  const blobs: Blob[] = [];
  const baseName = job.file.name.replace(/\.[^.]+$/, "");

  for (let i = 1; i <= numPages; i++) {
    checkAbort(context);

    const page = await pdf.getPage(i);
    const rendered = await renderPage(page, settings.scale);

    const blob = await new Promise<Blob>((resolve, reject) => {
      rendered.canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Page export failed"))),
        formatConfig.mime,
        quality
      );
    });

    blobs.push(blob);
    onProgress?.(15 + (i / numPages) * 80);
  }

  onProgress?.(100);

  if (blobs.length === 1) {
    const blob = blobs[0];
    const url = URL.createObjectURL(blob);
    return {
      blob,
      url,
      name: `${baseName}.${formatConfig.extension}`,
      size: blob.size,
      meta: { pages: 1 },
    };
  }

  const zipModule = await import("@/c-core/fs/zip");
  const fakeJobs: ConvertJob[] = blobs.map((blob, i) => ({
    id: `${job.id}-page-${i}`,
    file: job.file,
    status: "done",
    progress: 100,
    error: null,
    attempts: 1,
    result: {
      blob,
      url: "",
      name: `${baseName}-page-${String(i + 1).padStart(3, "0")}.${formatConfig.extension}`,
      size: blob.size,
    },
  }));

  const { blob: zipBlob } = await zipModule.buildZip(
    fakeJobs,
    `${baseName}.zip`
  );

  const url = URL.createObjectURL(zipBlob);
  return {
    blob: zipBlob,
    url,
    name: `${baseName}.zip`,
    size: zipBlob.size,
    meta: { pages: numPages },
  };
}

async function imagesToPdf(
  job: ConvertJob,
  settings: PdfSettings,
  onProgress?: (p: number) => void,
  context?: ConvertContext
): Promise<ConvertResult> {
  checkAbort(context);
  onProgress?.(10);

  const pdf = await PDFDocument.create();
  const img = await loadImage(job.file);
  checkAbort(context);
  onProgress?.(40);

  const blob = img.blob;
  let embedded;

  if (blob.type === "image/png") {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    embedded = await pdf.embedPng(bytes);
  } else if (blob.type === "image/jpeg") {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    embedded = await pdf.embedJpg(bytes);
  } else {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to create canvas context");
    ctx.drawImage(img.element, 0, 0);
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
        "image/png"
      );
    });
    const bytes = new Uint8Array(await pngBlob.arrayBuffer());
    embedded = await pdf.embedPng(bytes);
  }

  checkAbort(context);
  onProgress?.(70);

  const { width, height } = getPageSize(
    settings.pageSize,
    embedded.width,
    embedded.height
  );

  const page = pdf.addPage([width, height]);

  const margin = settings.margin;
  const availableW = width - margin * 2;
  const availableH = height - margin * 2;

  const scale = Math.min(
    availableW / embedded.width,
    availableH / embedded.height
  );
  const drawW = embedded.width * scale;
  const drawH = embedded.height * scale;

  page.drawImage(embedded, {
    x: (width - drawW) / 2,
    y: (height - drawH) / 2,
    width: drawW,
    height: drawH,
  });

  onProgress?.(90);

  const pdfBytes = await pdf.save();
  const pdfBlob = new Blob([pdfBytes as BlobPart], {
    type: "application/pdf",
  });

  onProgress?.(100);

  const url = URL.createObjectURL(pdfBlob);
  const baseName = job.file.name.replace(/\.[^.]+$/, "");

  return {
    blob: pdfBlob,
    url,
    name: `${baseName}.pdf`,
    size: pdfBlob.size,
    meta: { pages: 1 },
  };
}

function getPageSize(
  size: "auto" | "a4" | "letter",
  imgW: number,
  imgH: number
): { width: number; height: number } {
  if (size === "a4") return { width: 595.28, height: 841.89 };
  if (size === "letter") return { width: 612, height: 792 };
  return { width: imgW, height: imgH };
}