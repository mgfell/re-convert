import Header from "./components/Header";
import Footer from "./components/Footer";
import DropZone from "./components/DropZone";
import FileCard from "./components/FileCard";
import FormatPicker from "./components/FormatPicker";
import ProgressBar from "./components/ProgressBar";
import ResultPanel from "./components/ResultPanel";
import ErrorBanner from "./components/ErrorBanner";
import Button from "./components/Button";
import { useConverter } from "./hooks/useConverter";

export default function App() {
  const {
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
  } = useConverter();

  const isProcessing = status === "processing";
  const isDone = status === "done" && result;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <Header />

        <main className="w-full max-w-2xl glass rounded-[28px] p-10 md:p-14">
        {!file ? (
          <DropZone onFile={selectFile} />
        ) : (
          <div className="space-y-6">
            <FileCard file={file} onRemove={reset} />

            <FormatPicker value={format} onChange={setFormat} />

            {isProcessing && <ProgressBar progress={progress} />}

            {error && <ErrorBanner message={error} />}

            {isDone && <ResultPanel result={result} />}

            {!isDone && (
              <Button onClick={convert} disabled={isProcessing}>
                {isProcessing
                  ? `Converting... ${Math.round(progress)}%`
                  : "🚀 Convert"}
              </Button>
            )}

            {isDone && (
              <Button variant="ghost" onClick={reset}>
                Convert another file
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}