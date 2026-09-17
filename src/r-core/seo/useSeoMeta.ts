import { useEffect } from "react";

export type SeoMeta = {
  title: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
};

const BASE_URL = "https://mgfell.github.io/re-convert";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

export function useSeoMeta(meta: SeoMeta) {
  useEffect(() => {
    document.title = meta.title;
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:type", "website");

    if (meta.description) {
      setMeta("name", "description", meta.description);
      setMeta("property", "og:description", meta.description);
    }
    if (meta.keywords && meta.keywords.length > 0) {
      setMeta("name", "keywords", meta.keywords.join(", "));
    }
    if (meta.canonical) {
      const fullUrl = meta.canonical.startsWith("http")
        ? meta.canonical
        : `${BASE_URL}${meta.canonical}`;
      setCanonical(fullUrl);
      setMeta("property", "og:url", fullUrl);
    }
  }, [meta]);
}