import type { Locale } from "../types";
import type { TranslationKey } from "../types";
import { en } from "./en";
import { ru } from "./ru";

export const locales: Record<Locale, Record<TranslationKey, string>> = {
  en,
  ru,
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};