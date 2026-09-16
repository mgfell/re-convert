import type { TabId } from "../types/tabs";
import type { ImageSettings } from "../types/images";
import type { DataSettings } from "../types/data";
import { convertImage } from "./images";
import { convertData } from "./data";

export const converterRegistry = {
  images: convertImage,
  data: convertData,
  pdf: null,
  media: null,
} as const;

export const hasConverter = (tab: TabId): boolean =>
  converterRegistry[tab] !== null;

export type { ImageSettings, DataSettings };