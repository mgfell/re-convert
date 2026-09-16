import type { ConvertResult } from "../types/converter";
import { downloadFile, formatFileSize } from "../lib/download";
import Button from "./Button";

type Props = {
  result: ConvertResult;
};

export default function ResultPanel({ result }: Props) {
  return (
    <div className="glass-soft rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-2 text-emerald-300/90">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Converted
        </span>
        <span className="text-white/40">{formatFileSize(result.size)}</span>
      </div>
      <div className="rounded-xl bg-black/40 border border-white/[0.05] p-3">
        <img
          src={result.url}
          alt="Converted result"
          className="w-full max-h-64 object-contain rounded-lg"
        />
      </div>
      <Button onClick={() => downloadFile(result.url, result.name)}>
        Download {result.name}
      </Button>
    </div>
  );
}