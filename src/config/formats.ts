import type { ImageFormat } from "../types/converter";

export type FormatOption = {
  id: ImageFormat;
  label: string;
  description: string;
  mime: string;
  extension: string;
  supportsTransparency: boolean;
  supportsQuality: boolean;
};

export const IMAGE_FORMATS: FormatOption[] = [
  {
    id: "png",
    label: "PNG",
    description: "Lossless, transparency",
    mime: "image/png",
    extension: "png",
    supportsTransparency: true,
    supportsQuality: false,
  },
  {
    id: "jpeg",
    label: "JPG",
    description: "Small size, photos",
    mime: "image/jpeg",
    extension: "jpg",
    supportsTransparency: false,
    supportsQuality: true,
  },
  {
    id: "webp",
    label: "WEBP",
    description: "Modern, efficient",
    mime: "image/webp",
    extension: "webp",
    supportsTransparency: true,
    supportsQuality: true,
  },
];

export const ACCEPTED_IMAGE_TYPES = "image/*";

export const DEFAULT_QUALITY = 92;
export const DEFAULT_MAX_WIDTH: number | null = null;

export function getFormat(id: ImageFormat): FormatOption {
  const found = IMAGE_FORMATS.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown format: ${id}`);
  return found;
}