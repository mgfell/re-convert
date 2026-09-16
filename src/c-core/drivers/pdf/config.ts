import type {
  PdfDirection,
  PdfImageFormat,
  PdfPageSize,
  PdfSettings,
} from "./types";

export const PDF_INPUT_ACCEPT = ".pdf,application/pdf";

export const PDF_INPUT_EXTENSIONS = ["pdf"];

export const PDF_DEFAULT_SETTINGS: PdfSettings = {
  direction: "pdf-to-images",
  imageFormat: "png",
  quality: 92,
  scale: 2,
  pageSize: "auto",
  margin: 0,
};

export const PDF_DIRECTIONS: {
  id: PdfDirection;
  label: string;
  description: string;
}[] = [
  {
    id: "pdf-to-images",
    label: "PDF → Images",
    description: "Each page becomes an image",
  },
  {
    id: "images-to-pdf",
    label: "Images → PDF",
    description: "Combine images into a PDF",
  },
];

export const PDF_IMAGE_FORMATS: {
  id: PdfImageFormat;
  label: string;
  mime: string;
  extension: string;
  supportsQuality: boolean;
}[] = [
  {
    id: "png",
    label: "PNG",
    mime: "image/png",
    extension: "png",
    supportsQuality: false,
  },
  {
    id: "jpeg",
    label: "JPG",
    mime: "image/jpeg",
    extension: "jpg",
    supportsQuality: true,
  },
];

export const PDF_PAGE_SIZES: {
  id: PdfPageSize;
  label: string;
}[] = [
  { id: "auto", label: "Auto" },
  { id: "a4", label: "A4" },
  { id: "letter", label: "Letter" },
];

export const PDF_SCALES: { value: number; label: string }[] = [
  { value: 1, label: "1x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
];

export function getPdfImageFormat(id: PdfImageFormat) {
  const found = PDF_IMAGE_FORMATS.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown PDF image format: ${id}`);
  return found;
}