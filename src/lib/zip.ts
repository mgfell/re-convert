import JSZip from "jszip";
import type { ConvertJob } from "../types/converter";

export type ZipResult = {
  blob: Blob;
  name: string;
  count: number;
};

export async function buildZip(
  jobs: ConvertJob[],
  zipName = "re-convert.zip"
): Promise<ZipResult> {
  const done = jobs.filter((j) => j.status === "done" && j.result);
  if (!done.length) throw new Error("No converted files to download");

  const zip = new JSZip();
  const used = new Map<string, number>();

  for (const job of done) {
    const result = job.result!;
    let name = result.name;

    if (used.has(name)) {
      const count = used.get(name)! + 1;
      used.set(name, count);
      const dot = name.lastIndexOf(".");
      const base = dot > 0 ? name.slice(0, dot) : name;
      const ext = dot > 0 ? name.slice(dot) : "";
      name = `${base} (${count})${ext}`;
    } else {
      used.set(name, 1);
    }

    zip.file(name, result.blob);
  }

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return { blob, name: zipName, count: done.length };
}