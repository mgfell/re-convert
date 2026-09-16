import type { ImageSettings } from "../../types/images";
import { getImageFormat } from "../../config/formats";
import FormatPicker from "../FormatPicker";
import QualitySlider from "../QualitySlider";
import ResizeInput from "../ResizeInput";

type Props = {
  settings: ImageSettings;
  onFormatChange: (format: ImageSettings["format"]) => void;
  onUpdate: (patch: Partial<ImageSettings>) => void;
};

export default function ImageSettingsPanel({
  settings,
  onFormatChange,
  onUpdate,
}: Props) {
  const formatConfig = getImageFormat(settings.format);

  return (
    <div className="space-y-6">
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