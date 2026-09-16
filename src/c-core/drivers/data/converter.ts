import type { ConvertContext, ConvertJob, ConvertResult } from "@/abi";
import type { DataSettings } from "./types";
import { DATA_EXT_TO_FORMAT, getDataFormat } from "./config";
import { parseData, serializeData } from "./parsers";
import { getExtension } from "@/c-core/fs/detectType";

function checkAbort(context?: ConvertContext) {
  if (context?.signal?.aborted) {
    const err = new Error("Aborted");
    err.name = "AbortError";
    throw err;
  }
}

export async function convertData(
  job: ConvertJob,
  settings: DataSettings,
  onProgress?: (p: number) => void,
  context?: ConvertContext
): Promise<ConvertResult> {
  checkAbort(context);
  onProgress?.(10);

  const sourceExt = getExtension(job.file.name);
  const sourceFormat = DATA_EXT_TO_FORMAT[sourceExt];
  if (!sourceFormat) {
    throw new Error(`Unsupported source format: .${sourceExt}`);
  }

  const text = await job.file.text();
  checkAbort(context);
  onProgress?.(40);

  let parsed: unknown;
  try {
    parsed = parseData(text, sourceFormat);
  } catch (e) {
    throw new Error(
      `Parse error: ${e instanceof Error ? e.message : "invalid input"}`
    );
  }

  checkAbort(context);
  onProgress?.(60);

  let output: string;
  try {
    output = serializeData(parsed, settings.format, settings.pretty);
  } catch (e) {
    throw new Error(
      `Serialize error: ${e instanceof Error ? e.message : "invalid output"}`
    );
  }

  checkAbort(context);
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