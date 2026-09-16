import type { ConvertJob, ConvertResult } from "../types/converter";
import type { DataSettings } from "../types/data";
import {
  DATA_EXT_TO_FORMAT,
  getDataFormat,
} from "../config/dataFormats";
import { parseData, serializeData } from "../lib/dataParsers";
import { getExtension } from "../lib/detectFileType";

export async function convertData(
  job: ConvertJob,
  settings: DataSettings,
  onProgress?: (p: number) => void
): Promise<ConvertResult> {
  onProgress?.(10);

  const sourceExt = getExtension(job.file.name);
  const sourceFormat = DATA_EXT_TO_FORMAT[sourceExt];
  if (!sourceFormat) {
    throw new Error(`Unsupported source format: .${sourceExt}`);
  }

  const text = await job.file.text();
  onProgress?.(40);

  let parsed: unknown;
  try {
    parsed = parseData(text, sourceFormat);
  } catch (e) {
    throw new Error(
      `Parse error: ${e instanceof Error ? e.message : "invalid input"}`
    );
  }

  onProgress?.(60);

  let output: string;
  try {
    output = serializeData(parsed, settings.format, settings.pretty);
  } catch (e) {
    throw new Error(
      `Serialize error: ${e instanceof Error ? e.message : "invalid output"}`
    );
  }

  onProgress?.(85);

  const formatConfig = getDataFormat(settings.format);
  const blob = new Blob([output], { type: formatConfig.mime });

  const url = URL.createObjectURL(blob);
  const baseName = job.file.name.replace(/\.[^.]+$/, "");
  const name = `${baseName}.${formatConfig.extension}`;

  onProgress?.(100);

  return {
    blob,
    url,
    name,
    size: blob.size,
    meta: { lines: output.split("\n").length },
  };
}