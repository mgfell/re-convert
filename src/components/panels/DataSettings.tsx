import type { DataSettings } from "../../types/data";
import DataFormatPicker from "../DataFormatPicker";
import PrettyToggle from "../PrettyToggle";

type Props = {
  settings: DataSettings;
  onFormatChange: (format: DataSettings["format"]) => void;
  onUpdate: (patch: Partial<DataSettings>) => void;
};

export default function DataSettingsPanel({
  settings,
  onFormatChange,
  onUpdate,
}: Props) {
  return (
    <div className="space-y-6">
      <DataFormatPicker value={settings.format} onChange={onFormatChange} />

      <PrettyToggle
        value={settings.pretty}
        onChange={(pretty) => onUpdate({ pretty })}
      />

      <div className="flex items-start gap-3 rounded-2xl glass-soft p-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-300/80"
          >
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-white/70 font-medium">
            Conversion happens locally
          </p>
          <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">
            Your data never leaves the browser. Parsing and serialization run
            entirely on your device.
          </p>
        </div>
      </div>
    </div>
  );
}