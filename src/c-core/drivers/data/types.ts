export type DataFormat = "json" | "csv" | "tsv" | "yaml" | "xml";

export type DataSettings = {
  format: DataFormat;
  pretty: boolean;
};