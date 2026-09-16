import type { TabDefinition } from "../types/tabs";

export const TABS: TabDefinition[] = [
  {
    id: "images",
    label: "Images",
    icon: "image",
    enabled: true,
  },
  {
    id: "data",
    label: "Data",
    icon: "code",
    enabled: true,
  },
  {
    id: "pdf",
    label: "PDF",
    icon: "file",
    enabled: false,
  },
  {
    id: "media",
    label: "Media",
    icon: "video",
    enabled: false,
  },
];