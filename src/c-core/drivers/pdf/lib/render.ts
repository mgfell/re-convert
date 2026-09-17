import type { PDFPageProxy } from "pdfjs-dist";
import { pdfjsLib } from "./pdfjs";

export type RenderedPage = {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
};

export async function renderPage(
  page: PDFPageProxy,
  scale: number
): Promise<RenderedPage> {
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to create canvas context");

  await page.render({
    canvas,
    canvasContext: ctx,
    viewport,
  }).promise;

  return { canvas, width: canvas.width, height: canvas.height };
}

export async function loadPdf(file: File) {
  const buffer = await file.arrayBuffer();
  return pdfjsLib.getDocument({ data: buffer }).promise;
}