import type { DataFormat } from "./types";

export type DataFormatOption = {
  id: DataFormat;
  label: string;
  description: string;
  mime: string;
  extension: string;
};

export const DATA_FORMATS: DataFormatOption[] = [
  {
    id: "json",
    label: "JSON",
    description: "JavaScript objects",
    mime: "application/json",
    extension: "json",
  },
  {
    id: "csv",
    label: "CSV",
    description: "Comma separated",
    mime: "text/csv",
    extension: "csv",
  },
  {
    id: "tsv",
    label: "TSV",
    description: "Tab separated",
    mime: "text/tab-separated-values",
    extension: "tsv",
  },
  {
    id: "yaml",
    label: "YAML",
    description: "Human-friendly",
    mime: "text/yaml",
    extension: "yaml",
  },
  {
    id: "xml",
    label: "XML",
    description: "Markup language",
    mime: "application/xml",
    extension: "xml",
  },
];

export const DATA_INPUT_ACCEPT =
  ".json,.csv,.tsv,.yaml,.yml,.xml,application/json,text/csv,text/yaml,application/xml";

export const DATA_INPUT_EXTENSIONS = [
  "json",
  "csv",
  "tsv",
  "yaml",
  "yml",
  "xml",
];

export function getDataFormat(id: DataFormat): DataFormatOption {
  const found = DATA_FORMATS.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown data format: ${id}`);
  return found;
}

export const DATA_EXT_TO_FORMAT: Record<string, DataFormat> = {
  json: "json",
  csv: "csv",
  tsv: "tsv",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
};