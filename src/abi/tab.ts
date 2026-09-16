export type TabId = "images" | "data" | "pdf" | "media";

export type TabDefinition = {
  id: TabId;
  label: string;
  icon: string;
  enabled: boolean;
};