import type { ComponentType } from "react";
import type { TabId } from "./tab";
import type { ConvertContext, ConvertJob, ConvertResult } from "./converter";

export type CoreDriver<TSettings> = {
  id: TabId;
  label: string;
  icon: string;
  acceptedExtensions: string[];
  acceptedMime: string;
  defaultSettings: TSettings;
  convert: (
    job: ConvertJob,
    settings: TSettings,
    onProgress?: (p: number) => void,
    context?: ConvertContext
  ) => Promise<ConvertResult>;
  SettingsPanel: ComponentType<{
    settings: TSettings;
    onChange: (patch: Partial<TSettings>) => void;
  }>;
};