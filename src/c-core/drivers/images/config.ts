    import type { ImageFormat } from "./types";

export type ImageFormatOption = {
  id: ImageFormat;
  label: string;
  description: string;
  mime: string;
  extension: string;
  supportsTransparency: boolean;
  supportsQuality: boolean;
};

export const IMAGE_FORMATS: ImageFormatOption[] = [
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
  {
    id: "avif",
    label: "AVIF",
    description: "Next-gen, tiny",
    mime: "image/avif",
    extension: "avif",
    supportsTransparency: true,
    supportsQuality: true,
  },
  {
    id: "ico",
    label: "ICO",
    description: "Favicon, icons",
    mime: "image/x-icon",
    extension: "ico",
    supportsTransparency: true,
    supportsQuality: false,
  },
];

export const IMAGE_INPUT_EXTENSIONS = [
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
];

export const IMAGE_INPUT_ACCEPT = "image/*,.heic,.heif,.avif,.svg,.ico";

export const DEFAULT_QUALITY = 92;
export const DEFAULT_MAX_WIDTH: number | null = null;

export function getImageFormat(id: ImageFormat): ImageFormatOption {
  const found = IMAGE_FORMATS.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown image format: ${id}`);
  return found;
}