import { useEffect } from "react";

export type SeoMeta = {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
};

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOg(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeoMeta(meta: SeoMeta) {
  useEffect(() => {
    document.title = meta.title;
    setOg("og:title", meta.title);
    setOg("og:type", "website");

    if (meta.description) {
      setMeta("description", meta.description);
      setOg("og:description", meta.description);
    }
    if (meta.keywords && meta.keywords.length > 0) {
      setMeta("keywords", meta.keywords.join(", "));
    }
    if (meta.ogImage) {
      setOg("og:image", meta.ogImage);
    }
  }, [meta]);
}