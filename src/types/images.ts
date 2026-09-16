export type ImageFormat = "png" | "jpeg" | "webp" | "avif" | "ico";

export type ImageSettings = {
  format: ImageFormat;
  quality: number;
  maxWidth: number | null;
};

export const isImageFormat = (v: string): v is ImageFormat =>
  ["png", "jpeg", "webp", "avif", "ico"].includes(v);