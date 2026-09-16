export type DataFormat = "json" | "csv" | "tsv" | "yaml" | "xml";

export type DataSettings = {
  format: DataFormat;
  pretty: boolean;
};

export const isDataFormat = (v: string): v is DataFormat =>
  ["json", "csv", "tsv", "yaml", "xml"].includes(v);