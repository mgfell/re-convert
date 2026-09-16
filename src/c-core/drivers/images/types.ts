export type ImageFormat = "png" | "jpeg" | "webp" | "avif" | "ico";

export type ImageSettings = {
  format: ImageFormat;
  quality: number;
  maxWidth: number | null;
};