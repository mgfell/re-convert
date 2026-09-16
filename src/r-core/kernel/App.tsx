import { useCallback, useMemo, useState } from "react";
import type { TabId } from "@/abi";
import { Button, Tabs, ThemeToggle, LangToggle } from "../hw";
import { Header, Footer, FileList, ShortcutsHint } from "../ui";
import {
  DropZone,
  useKeyboard,
  usePasteFiles,
  type ShortcutMap,
} from "../input";
import { useTheme } from "../vga/hooks/useTheme";
import { useActiveTab } from "./useActiveTab";
import { useBatchConverter } from "@/c-core/scheduler/useBatchConverter";
import { buildZip } from "@/c-core/fs/zip";
import { downloadBlob } from "@/c-core/fs/download";
import { detectFileType } from "@/c-core/fs/detectType";
import { useToast } from "../ui/toast/useToast";
import { useT } from "@/libc/i18n/useT";
import {
  IMAGE_INPUT_ACCEPT,
  IMAGE_INPUT_EXTENSIONS,
  IMAGE_FORMATS,
  getImageFormat,
} from "@/c-core/drivers/images/config";
import {
  DATA_INPUT_ACCEPT,
  DATA_INPUT_EXTENSIONS,
  DATA_FORMATS,
} from "@/c-core/drivers/data/config";
import {
  PDF_INPUT_ACCEPT,
  PDF_INPUT_EXTENSIONS,
  PDF_DIRECTIONS,
  PDF_IMAGE_FORMATS,
  PDF_PAGE_SIZES,
  PDF_SCALES,
} from "@/c-core/drivers/pdf/config";
import type { ImageSettings } from "@/c-core/drivers/images/types";
import type { DataSettings } from "@/c-core/drivers/data/types";
import type { PdfSettings } from "@/c-core/drivers/pdf/types";

type TabMeta = {
  accept: string;
  extensions: string[];
  labelKey: "drop.images" | "drop.data" | "drop.pdf" | "drop.media";
};

const TAB_META: Record<TabId, TabMeta> = {
  images: {
    accept: IMAGE_INPUT_ACCEPT,
    extensions: IMAGE_INPUT_EXTENSIONS,
    labelKey: "drop.images",
  },
  data: {
    accept: DATA_INPUT_ACCEPT,
    extensions: DATA_INPUT_EXTENSIONS,
    labelKey: "drop.data",
  },
  pdf: {
    accept: PDF_INPUT_ACCEPT,
    extensions: PDF_INPUT_EXTENSIONS,
    labelKey: "drop.pdf",
  },
  media: {
    accept: "audio/*,video/*",
    extensions: ["mp3", "mp4", "wav", "mov", "webm", "ogg"],
    labelKey: "drop.media",
  },
};

export default function App() {
  const { tab, select, auto } = useActiveTab("images");
  const { t, toggle: toggleLocale } = useT();

  const {
    jobs,
    stats,
    isBusy,
    imageSettings,
    dataSettings,
    pdfSettings,
    updateImageSettings,
    updateDataSettings,
    updatePdfSettings,
    addFiles,
    removeJob,
    reorderJobs,
    clearAll,
    cancelAll,
    convertAll,
    convertSingle,
    downloadAllSeparate,
  } = useBatchConverter(tab);

  const { push } = useToast();
  const { toggle: toggleTheme } = useTheme();
  const [zipping, setZipping] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const hasJobs = jobs.length > 0;
  const canConvert = stats.queued + stats.errors > 0 && !isBusy;
  const canZip = stats.done > 0 && !zipping;

  const handleZip = async () => {
    try {
      setZipping(true);
      const { blob, name, count } = await buildZip(jobs);
      downloadBlob(blob, name);
      push(t("toast.zipping", { n: count }), "success");
    } catch (e) {
      push(
        e instanceof Error ? e.message : "Failed to create archive",
        "error"
      );
    } finally {
      setZipping(false);
      setDownloadOpen(false);
    }
  };

  const handleDownloadSeparate = () => {
    downloadAllSeparate();
    setDownloadOpen(false);
  };

  const handleFiles = useCallback(
    (files: File[]) => {
      if (!files.length) return;

      const detected = detectFileType(files[0]);
      if (detected) auto(detected);

      addFiles(files);
    },
    [addFiles, auto]
  );

  usePasteFiles(handleFiles);

  const shortcuts = useMemo<ShortcutMap>(
    () => ({
      "ctrl+enter": () => {
        if (canConvert) convertAll();
      },
      escape: () => {
        if (isBusy) {
          cancelAll();
        } else if (hasJobs) {
          clearAll();
        }
      },
      t: () => toggleTheme(),
      l: () => toggleLocale(),
    }),
    [
      canConvert,
      convertAll,
      isBusy,
      cancelAll,
      hasJobs,
      clearAll,
      toggleTheme,
      toggleLocale,
    ]
  );

  useKeyboard(shortcuts);

  const meta = TAB_META[tab];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
      <ThemeToggle />
      <LangToggle />
      <Header />

      <main className="w-full max-w-2xl glass rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 md:p-10 animate-fade-in">
        <Tabs active={tab} onSelect={select} />

        {!hasJobs ? (
          <DropZone
            onFiles={handleFiles}
            tab={tab}
            acceptedExtensions={meta.extensions}
            acceptedMime={meta.accept}
            labelKey={meta.labelKey}
          />
        ) : (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/40 tracking-wide flex-wrap">
                <span>
                  {stats.total} {t("stats.files")}
                  {stats.total > 1 && t("stats.files") === "file" ? "s" : ""}
                </span>
                {stats.done > 0 && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span className="text-emerald-300/70">
                      {stats.done} {t("stats.done")}
                    </span>
                  </>
                )}
                {stats.errors > 0 && (
                  <>
                    <span className="w-px h-3 bg-white/15" />
                    <span className="text-red-300/70">
                      {stats.errors} {t("stats.failed")}
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={clearAll}
                disabled={isBusy}
                className="text-xs text-white/40 hover:text-white/80 transition disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                {t("actions.clearAll")}
              </button>
            </div>

            <DropZone
              onFiles={handleFiles}
              compact
              tab={tab}
              acceptedExtensions={meta.extensions}
              acceptedMime={meta.accept}
              labelKey={meta.labelKey}
            />

            <FileList
              jobs={jobs}
              onRemove={removeJob}
              onConvertOne={convertSingle}
              onReorder={reorderJobs}
              disabled={isBusy}
            />

            {tab === "images" && (
              <ImageSettingsView
                settings={imageSettings}
                onUpdate={updateImageSettings}
              />
            )}

            {tab === "data" && (
              <DataSettingsView
                settings={dataSettings}
                onUpdate={updateDataSettings}
              />
            )}

            {tab === "pdf" && (
              <PdfSettingsView
                settings={pdfSettings}
                onUpdate={updatePdfSettings}
              />
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              {isBusy ? (
                <Button onClick={cancelAll} className="flex-1">
                  {t("actions.cancel")}
                </Button>
              ) : (
                <Button
                  onClick={convertAll}
                  disabled={!canConvert}
                  className="flex-1"
                >
                  {stats.queued + stats.errors > 0
                    ? t("actions.convertN", {
                        n: stats.queued + stats.errors,
                      })
                    : t("actions.allConverted")}
                </Button>
              )}

              {stats.done > 0 && (
                <div className="relative sm:shrink-0">
                  <Button
                    variant="ghost"
                    onClick={() => setDownloadOpen((v) => !v)}
                    disabled={!canZip}
                  >
                    {zipping
                      ? t("actions.zipping")
                      : `${t("actions.downloadAll")} (${stats.done})`}
                  </Button>
                  {downloadOpen && (
                    <div className="absolute right-0 bottom-full mb-2 z-30 glass rounded-2xl p-1.5 min-w-[160px] shadow-xl">
                      <button
                        onClick={handleZip}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/80 hover:bg-white/[0.06] transition"
                      >
                        {t("actions.downloadZip")}
                      </button>
                      <button
                        onClick={handleDownloadSeparate}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/80 hover:bg-white/[0.06] transition"
                      >
                        {t("actions.downloadSeparate")}
                      </button>
                    </div>
                  )}
                </div>
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

function ImageSettingsView({
  settings,
  onUpdate,
}: {
  settings: ImageSettings;
  onUpdate: (patch: Partial<ImageSettings>) => void;
}) {
  const { t } = useT();
  const formatConfig = getImageFormat(settings.format);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <p className="text-sm text-white/60">{t("settings.title")}</p>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
          {t("settings.format")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-1 rounded-2xl glass-soft">
          {IMAGE_FORMATS.map((format) => {
            const active = settings.format === format.id;
            return (
              <button
                key={format.id}
                onClick={() => onUpdate({ format: format.id })}
                className={`rounded-xl py-2.5 px-2 transition-all duration-200 text-center ${
                  active
                    ? "bg-white/[0.09] text-white border border-white/15"
                    : "text-white/50 hover:text-white/80 border border-transparent"
                }`}
              >
                <p className="font-medium text-sm tracking-wide">
                  {format.label}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5 truncate">
                  {format.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {formatConfig.supportsQuality && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
              {t("settings.quality")}
            </p>
            <span className="text-xs text-white/60 tabular-nums">
              {settings.quality}%
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={settings.quality}
            onChange={(e) => onUpdate({ quality: Number(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.5)]
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) ${settings.quality}%, rgba(255,255,255,0.08) ${settings.quality}%, rgba(255,255,255,0.08) 100%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-[10px] text-white/25">
            <span>{t("settings.quality.smaller")}</span>
            <span>{t("settings.quality.better")}</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
            {t("settings.maxWidth")}
          </p>
          <span className="text-xs text-white/60 tabular-nums">
            {settings.maxWidth === null
              ? t("settings.original")
              : `${settings.maxWidth}px`}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: t("settings.original"), value: null },
            { label: "1920", value: 1920 },
            { label: "1280", value: 1280 },
            { label: "800", value: 800 },
          ].map((preset) => {
            const active = settings.maxWidth === preset.value;
            return (
              <button
                key={preset.label}
                onClick={() => onUpdate({ maxWidth: preset.value })}
                className={`rounded-xl py-2 text-xs transition-all duration-200 ${
                  active
                    ? "bg-white/[0.09] text-white border border-white/15"
                    : "text-white/50 hover:text-white/80 border border-transparent glass-soft"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DataSettingsView({
  settings,
  onUpdate,
}: {
  settings: DataSettings;
  onUpdate: (patch: Partial<DataSettings>) => void;
}) {
  const { t } = useT();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <p className="text-sm text-white/60">{t("settings.title")}</p>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
          {t("settings.format")}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-1 rounded-2xl glass-soft">
          {DATA_FORMATS.map((format) => {
            const active = settings.format === format.id;
            return (
              <button
                key={format.id}
                onClick={() => onUpdate({ format: format.id })}
                className={`rounded-xl py-2.5 px-2 transition-all duration-200 text-center ${
                  active
                    ? "bg-white/[0.09] text-white border border-white/15"
                    : "text-white/50 hover:text-white/80 border border-transparent"
                }`}
              >
                <p className="font-medium text-sm tracking-wide">
                  {format.label}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5 truncate">
                  {format.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onUpdate({ pretty: !settings.pretty })}
        className="w-full flex items-center justify-between rounded-2xl glass-soft px-4 py-3 transition-all hover:bg-white/[0.05]"
      >
        <span className="text-sm text-white/70">{t("settings.pretty")}</span>
        <span
          className={`relative w-10 h-5 rounded-full transition-colors ${
            settings.pretty ? "bg-white/80" : "bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${
              settings.pretty
                ? "translate-x-5 bg-neutral-900"
                : "translate-x-0.5 bg-white"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

function PdfSettingsView({
  settings,
  onUpdate,
}: {
  settings: PdfSettings;
  onUpdate: (patch: Partial<PdfSettings>) => void;
}) {
  const { t } = useT();

  const isPdfToImages = settings.direction === "pdf-to-images";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <p className="text-sm text-white/60">{t("settings.title")}</p>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
          {t("pdf.direction")}
        </p>
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl glass-soft">
          {PDF_DIRECTIONS.map((dir) => {
            const active = settings.direction === dir.id;
            return (
              <button
                key={dir.id}
                onClick={() => onUpdate({ direction: dir.id })}
                className={`rounded-xl py-2.5 px-2 transition-all duration-200 text-center ${
                  active
                    ? "bg-white/[0.09] text-white border border-white/15"
                    : "text-white/50 hover:text-white/80 border border-transparent"
                }`}
              >
                <p className="font-medium text-sm tracking-wide">
                  {dir.label}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5 truncate">
                  {dir.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {isPdfToImages && (
        <>
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
              {t("pdf.imageFormat")}
            </p>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl glass-soft">
              {PDF_IMAGE_FORMATS.map((fmt) => {
                const active = settings.imageFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => onUpdate({ imageFormat: fmt.id })}
                    className={`rounded-xl py-2.5 px-2 transition-all duration-200 text-center ${
                      active
                        ? "bg-white/[0.09] text-white border border-white/15"
                        : "text-white/50 hover:text-white/80 border border-transparent"
                    }`}
                  >
                    <p className="font-medium text-sm tracking-wide">
                      {fmt.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
              {t("pdf.resolution")}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {PDF_SCALES.map((scale) => {
                const active = settings.scale === scale.value;
                return (
                  <button
                    key={scale.value}
                    onClick={() => onUpdate({ scale: scale.value })}
                    className={`rounded-xl py-2 text-xs transition-all duration-200 ${
                      active
                        ? "bg-white/[0.09] text-white border border-white/15"
                        : "text-white/50 hover:text-white/80 border border-transparent glass-soft"
                    }`}
                  >
                    {scale.label}
                  </button>
                );
              })}
            </div>
          </div>

          {settings.imageFormat === "jpeg" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
                  {t("settings.quality")}
                </p>
                <span className="text-xs text-white/60 tabular-nums">
                  {settings.quality}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={settings.quality}
                onChange={(e) =>
                  onUpdate({ quality: Number(e.target.value) })
                }
                className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.5)]
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-0"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) ${settings.quality}%, rgba(255,255,255,0.08) ${settings.quality}%, rgba(255,255,255,0.08) 100%)`,
                }}
              />
            </div>
          )}
        </>
      )}

      {!isPdfToImages && (
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
            {t("pdf.pageSize")}
          </p>
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl glass-soft">
            {PDF_PAGE_SIZES.map((size) => {
              const active = settings.pageSize === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => onUpdate({ pageSize: size.id })}
                  className={`rounded-xl py-2.5 text-xs transition-all duration-200 ${
                    active
                      ? "bg-white/[0.09] text-white border border-white/15"
                      : "text-white/50 hover:text-white/80 border border-transparent"
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}