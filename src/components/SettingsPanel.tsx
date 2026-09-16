import type { TabId } from "../types/tabs";
import type { ImageSettings } from "../types/images";
import type { DataSettings } from "../types/data";
import ImageSettingsPanel from "./panels/ImageSettings";
import DataSettingsPanel from "./panels/DataSettings";

type Props = {
  tab: TabId;
  imageSettings: ImageSettings;
  dataSettings: DataSettings;
  onImageFormatChange: (format: ImageSettings["format"]) => void;
  onImageUpdate: (patch: Partial<ImageSettings>) => void;
  onDataFormatChange: (format: DataSettings["format"]) => void;
  onDataUpdate: (patch: Partial<DataSettings>) => void;
};

const SETTINGS_ICON = (
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
);

export default function SettingsPanel({
  tab,
  imageSettings,
  dataSettings,
  onImageFormatChange,
  onImageUpdate,
  onDataFormatChange,
  onDataUpdate,
}: Props) {
  const header = (
    <div className="flex items-center gap-2">
      {SETTINGS_ICON}
      <p className="text-sm text-white/60">Settings</p>
    </div>
  );

  if (tab === "images") {
    return (
      <div className="space-y-6">
        {header}
        <ImageSettingsPanel
          settings={imageSettings}
          onFormatChange={onImageFormatChange}
          onUpdate={onImageUpdate}
        />
      </div>
    );
  }

  if (tab === "data") {
    return (
      <div className="space-y-6">
        {header}
        <DataSettingsPanel
          settings={dataSettings}
          onFormatChange={onDataFormatChange}
          onUpdate={onDataUpdate}
        />
      </div>
    );
  }

  return (
    <div className="glass-soft rounded-2xl p-6 text-center">
      <p className="text-white/50 text-sm">
        Settings for this tab will appear in a future update.
      </p>
    </div>
  );
}