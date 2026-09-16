import type { TabDefinition } from "@/abi";

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
    enabled: true,
  },
  {
    id: "media",
    label: "Media",
    icon: "video",
    enabled: false,
  },
];