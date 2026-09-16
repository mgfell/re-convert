export type TabId = "images" | "pdf" | "data" | "media";

export type TabDefinition = {
  id: TabId;
  label: string;
  icon: string;
  enabled: boolean;
};