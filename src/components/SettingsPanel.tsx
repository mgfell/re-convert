import type { ConvertSettings } from "../types/converter";
import { getFormat } from "../config/formats";
import FormatPicker from "./FormatPicker";
import QualitySlider from "./QualitySlider";
import ResizeInput from "./ResizeInput";

type Props = {
  settings: ConvertSettings;
  onFormatChange: (format: ConvertSettings["format"]) => void;
  onUpdate: (patch: Partial<ConvertSettings>) => void;
};

export default function SettingsPanel({
  settings,
  onFormatChange,
  onUpdate,
}: Props) {
  const formatConfig = getFormat(settings.format);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <p className="text-sm text-white/60">Settings</p>
      </div>

      <FormatPicker value={settings.format} onChange={onFormatChange} />

      {formatConfig.supportsQuality && (
        <QualitySlider
          value={settings.quality}
          onChange={(quality) => onUpdate({ quality })}
        />
      )}

      <ResizeInput
        value={settings.maxWidth}
        onChange={(maxWidth) => onUpdate({ maxWidth })}
      />

      <div className="flex items-start gap-3 rounded-2xl glass-soft p-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-300/80"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-white/70 font-medium">
            Metadata is stripped automatically
          </p>
          <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">
            EXIF, GPS and camera info are removed during conversion. Nothing
            ever leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
}