export type ConvertStatus =
  | "queued"
  | "processing"
  | "done"
  | "error"
  | "cancelled";

export type ConvertResult = {
  blob: Blob;
  url: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
  meta?: Record<string, string | number>;
};

export type ConvertJob = {
  id: string;
  file: File;
  status: ConvertStatus;
  progress: number;
  result: ConvertResult | null;
  error: string | null;
};

export type BaseConverter<TSettings> = (
  job: ConvertJob,
  settings: TSettings,
  onProgress?: (p: number) => void
) => Promise<ConvertResult>;