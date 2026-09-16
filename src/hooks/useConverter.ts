import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ConvertResult,
  ConvertStatus,
  ImageFormat,
} from "../types/converter";
import { convertImage } from "../converters/image";

export function useConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImageFormat>("png");
  const [status, setStatus] = useState<ConvertStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cleanup object URLs to avoid memory leaks
  const resultUrlRef = useRef<string | null>(null);

  const revokeResult = useCallback(() => {
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    revokeResult();
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setResult(null);
    setError(null);
  }, [revokeResult]);

  const selectFile = useCallback(
    (next: File) => {
      revokeResult();
      setFile(next);
      setStatus("idle");
      setProgress(0);
      setResult(null);
      setError(null);
    },
    [revokeResult]
  );

  const convert = useCallback(async () => {
    if (!file) return;

    revokeResult();
    setStatus("processing");
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const output = await convertImage(file, format, setProgress);
      resultUrlRef.current = output.url;
      setResult(output);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Conversion error");
      setStatus("error");
    }
  }, [file, format, revokeResult]);

  // Cleanup on unmount
  useEffect(() => revokeResult, [revokeResult]);

  return {
    file,
    format,
    status,
    progress,
    result,
    error,
    setFormat,
    selectFile,
    convert,
    reset,
  };
}