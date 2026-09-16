import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DropZone from "./components/DropZone";
import FileList from "./components/FileList";
import SettingsPanel from "./components/SettingsPanel";
import Button from "./components/Button";
import ThemeToggle from "./components/ThemeToggle";
import ShortcutsHint from "./components/ShortcutsHint";
import { useBatchConverter } from "./hooks/useBatchConverter";
import { useToast } from "./hooks/useToast";
import { useKeyboard, type ShortcutMap } from "./hooks/useKeyboard";
import { usePasteFiles } from "./hooks/usePasteFiles";
import { useTheme } from "./hooks/useTheme";
import { buildZip } from "./lib/zip";
import { downloadBlob } from "./lib/download";

export default function App() {
  const {
    jobs,
    settings,
    stats,
    isBusy,
    addFiles,
    removeJob,
    clearAll,
    setFormat,
    updateSettings,
    convertAll,
    convertSingle,
  } = useBatchConverter();

  const { push } = useToast();
  const { toggle: toggleTheme } = useTheme();
  const [zipping, setZipping] = useState(false);

  const hasJobs = jobs.length > 0;
  const canConvert = stats.queued + stats.errors > 0 && !isBusy;
  const canZip = stats.done > 0 && !zipping;

  const handleZip = async () => {
    try {
      setZipping(true);
      const { blob, name, count } = await buildZip(jobs);
      downloadBlob(blob, name);
      push(`Zipping ${count} file${count > 1 ? "s" : ""}`, "success");
    } catch (e) {
      push(
        e instanceof Error ? e.message : "Failed to create archive",
        "error"
      );
    } finally {
      setZipping(false);
    }
  };

  usePasteFiles(addFiles);

  const shortcuts = useMemo<ShortcutMap>(
    () => ({
      "ctrl+enter": () => {
        if (canConvert) convertAll();
      },
      escape: () => {
        if (hasJobs && !isBusy) clearAll();
      },
      t: () => toggleTheme(),
    }),
    [canConvert, convertAll, hasJobs, isBusy, clearAll, toggleTheme]
  );

  useKeyboard(shortcuts);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
      <ThemeToggle />
      <Header />

      <main className="w-full max-w-2xl glass rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 md:p-10 animate-fade-in">
        {!hasJobs ? (
          <DropZone onFiles={addFiles} />
        ) : (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/40 tracking-wide flex-wrap">
                <span>
                  {stats.total} file{stats.total > 1 ? "s" : ""}
                </span>
                {stats.done > 0 && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span className="text-emerald-300/70">
                      {stats.done} done
                    </span>
                  </>
                )}
                {stats.errors > 0 && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span className="text-red-300/70">
                      {stats.errors} failed
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={clearAll}
                disabled={isBusy}
                className="text-xs text-white/40 hover:text-white/80 transition disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                Clear all
              </button>
            </div>

            <DropZone onFiles={addFiles} compact />

            <FileList
              jobs={jobs}
              onRemove={removeJob}
              onConvertOne={convertSingle}
            />

            <SettingsPanel
              settings={settings}
              onFormatChange={setFormat}
              onUpdate={updateSettings}
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={convertAll}
                disabled={!canConvert}
                className="flex-1"
              >
                {isBusy
                  ? `Converting… ${stats.done + stats.errors}/${stats.total}`
                  : stats.queued + stats.errors > 0
                  ? `Convert ${stats.queued + stats.errors} file${
                      stats.queued + stats.errors > 1 ? "s" : ""
                    }`
                  : "All converted"}
              </Button>

              {stats.done > 0 && (
                <Button
                  variant="ghost"
                  onClick={handleZip}
                  disabled={!canZip}
                  className="sm:shrink-0"
                >
                  {zipping ? "Zipping…" : `Download ZIP (${stats.done})`}
                </Button>
              )}
            </div>
          </div>
        )}
      </main>

      <ShortcutsHint />
      <Footer />
    </div>
  );
}