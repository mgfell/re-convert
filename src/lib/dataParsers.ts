import Papa from "papaparse";
import * as yaml from "js-yaml";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import type { DataFormat } from "../types/data";

export type ParsedData = unknown;

export function parseData(text: string, format: DataFormat): ParsedData {
  switch (format) {
    case "json":
      return JSON.parse(text);

    case "csv": {
      const result = Papa.parse(text.trim(), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });
      if (result.errors.length) {
        throw new Error(result.errors[0].message);
      }
      return result.data;
    }

    case "tsv": {
      const result = Papa.parse(text.trim(), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        delimiter: "\t",
      });
      if (result.errors.length) {
        throw new Error(result.errors[0].message);
      }
      return result.data;
    }

    case "yaml": {
      const parsed = yaml.load(text);
      return parsed ?? null;
    }

    case "xml": {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        parseAttributeValue: true,
        trimValues: true,
      });
      return parser.parse(text);
    }
  }
}

export function serializeData(
  data: ParsedData,
  format: DataFormat,
  pretty: boolean
): string {
  switch (format) {
    case "json":
      return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

    case "csv":
    case "tsv": {
      const rows = normalizeToRows(data);
      return Papa.unparse(rows, {
        delimiter: format === "csv" ? "," : "\t",
      });
    }

    case "yaml":
      return yaml.dump(data, {
        indent: 2,
        lineWidth: pretty ? 100 : -1,
        noRefs: true,
      });

    case "xml": {
      const builder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        format: pretty,
        indentBy: "  ",
        suppressEmptyNode: true,
      });
      const wrapped = wrapForXml(data);
      return builder.build(wrapped);
    }
  }
}

function normalizeToRows(data: ParsedData): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data.map((row) =>
      typeof row === "object" && row !== null
        ? (row as Record<string, unknown>)
        : { value: row }
    );
  }
  if (typeof data === "object" && data !== null) {
    return [data as Record<string, unknown>];
  }
  return [{ value: data }];
}

function wrapForXml(data: ParsedData): Record<string, unknown> {
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }
  return { root: data };
}