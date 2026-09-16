export type ImageFormat = "png" | "jpeg" | "webp";

export type ConvertStatus = "idle" | "processing" | "done" | "error";

export type ConvertResult = {
  url: string;
  name: string;
  blob: Blob;
  size: number;
};

export type Converter<TFormat extends string> = (
  file: File,
  format: TFormat,
  onProgress?: (progress: number) => void
) => Promise<ConvertResult>;