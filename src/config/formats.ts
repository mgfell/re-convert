import type { ImageFormat } from "../types/converter";

export type FormatOption = {
  id: ImageFormat;
  label: string;
  description: string;
  mime: string;
  extension: string;
  supportsTransparency: boolean;
};

export const IMAGE_FORMATS: FormatOption[] = [
  {
    id: "png",
    label: "PNG",
    description: "Transparency, lossless",
    mime: "image/png",
    extension: "png",
    supportsTransparency: true,
  },
  {
    id: "jpeg",
    label: "JPG",
    description: "Smaller size, photos",
    mime: "image/jpeg",
    extension: "jpg",
    supportsTransparency: false,
  },
  {
    id: "webp",
    label: "WEBP",
    description: "Modern, lightweight",
    mime: "image/webp",
    extension: "webp",
    supportsTransparency: true,
  },
];

export const ACCEPTED_IMAGE_TYPES = "image/*";