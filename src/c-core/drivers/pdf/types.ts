export type PdfDirection = "pdf-to-images" | "images-to-pdf";

export type PdfImageFormat = "png" | "jpeg";

export type PdfPageSize = "auto" | "a4" | "letter";

export type PdfSettings = {
  direction: PdfDirection;
  imageFormat: PdfImageFormat;
  quality: number;
  scale: number;
  pageSize: PdfPageSize;
  margin: number;
};