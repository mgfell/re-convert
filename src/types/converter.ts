export type ImageFormat = "png" | "jpeg" | "webp";

export type ConvertStatus =
  | "queued"
  | "processing"
  | "done"
  | "error"
  | "cancelled";

export type ConvertSettings = {
  format: ImageFormat;
  quality: number;
  maxWidth: number | null;
};

export type ConvertResult = {
  blob: Blob;
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
};

export type ConvertJob = {
  id: string;
  file: File;
  status: ConvertStatus;
  progress: number;
  result: ConvertResult | null;
  error: string | null;
};

export type Converter<TFormat extends string> = (
  file: File,
  format: TFormat,
  settings: ConvertSettings,
  onProgress?: (progress: number) => void
) => Promise<ConvertResult>;