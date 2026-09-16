export type SeoPageConfig = {
  slug: string;
  from: string;
  to: string;
  fromLong: string;
  toLong: string;
  category: "images" | "data" | "pdf";
  description: string;
  keywords: string[];
  faq: { q: string; a: string }[];
};

export const SEO_PAGES: SeoPageConfig[] = [
  // ============ IMAGES ============
  {
    slug: "heic-to-jpg",
    from: "HEIC",
    to: "JPG",
    fromLong: "HEIC",
    toLong: "JPG",
    category: "images",
    description:
      "Convert HEIC photos from your iPhone to JPG right in your browser. No uploads, no signup, no limits.",
    keywords: [
      "heic to jpg",
      "heic to jpeg",
      "convert heic",
      "iphone photo converter",
      "heic converter online",
    ],
    faq: [
      {
        q: "Is this HEIC to JPG converter free?",
        a: "Yes, completely free. No signup, no limits, no hidden fees.",
      },
      {
        q: "Are my photos uploaded to a server?",
        a: "No. All conversion happens locally in your browser. Your photos never leave your device.",
      },
      {
        q: "How many HEIC files can I convert?",
        a: "As many as you want. There are no daily or batch limits.",
      },
      {
        q: "Will I lose quality?",
        a: "You control the quality slider (1–100%). At 92% most photos are visually identical to the original.",
      },
    ],
  },
  {
    slug: "heic-to-png",
    from: "HEIC",
    to: "PNG",
    fromLong: "HEIC",
    toLong: "PNG",
    category: "images",
    description:
      "Convert iPhone HEIC photos to PNG losslessly. Runs entirely in your browser.",
    keywords: ["heic to png", "convert heic to png", "heic png converter"],
    faq: [
      {
        q: "HEIC to PNG or JPG — which is better?",
        a: "PNG preserves transparency and is lossless but larger. JPG is smaller but lossy. For photos, JPG is usually best.",
      },
      {
        q: "Are files uploaded?",
        a: "No. Everything runs locally in your browser.",
      },
    ],
  },
  {
    slug: "png-to-jpg",
    from: "PNG",
    to: "JPG",
    fromLong: "PNG",
    toLong: "JPG",
    category: "images",
    description:
      "Convert PNG images to JPG. Reduce file size dramatically while keeping quality.",
    keywords: ["png to jpg", "png to jpeg", "convert png"],
    faq: [
      {
        q: "Will transparency be lost?",
        a: "Yes, JPG doesn't support transparency. Transparent areas become white.",
      },
    ],
  },
  {
    slug: "jpg-to-png",
    from: "JPG",
    to: "PNG",
    fromLong: "JPG",
    toLong: "PNG",
    category: "images",
    description: "Convert JPG images to PNG for lossless editing.",
    keywords: ["jpg to png", "jpeg to png", "convert jpg"],
    faq: [
      {
        q: "Will quality improve?",
        a: "No, PNG can't recover data JPG already lost. But it prevents further compression.",
      },
    ],
  },
  {
    slug: "webp-to-jpg",
    from: "WEBP",
    to: "JPG",
    fromLong: "WEBP",
    toLong: "JPG",
    category: "images",
    description:
      "Convert WEBP images to JPG for universal compatibility.",
    keywords: ["webp to jpg", "webp to jpeg", "convert webp"],
    faq: [
      {
        q: "Why convert WEBP to JPG?",
        a: "Some older software doesn't support WEBP. JPG works everywhere.",
      },
    ],
  },
  {
    slug: "webp-to-png",
    from: "WEBP",
    to: "PNG",
    fromLong: "WEBP",
    toLong: "PNG",
    category: "images",
    description: "Convert WEBP to PNG with transparency support.",
    keywords: ["webp to png", "convert webp to png"],
    faq: [],
  },
  {
    slug: "png-to-webp",
    from: "PNG",
    to: "WEBP",
    fromLong: "PNG",
    toLong: "WEBP",
    category: "images",
    description:
      "Convert PNG to WEBP for smaller files without losing quality.",
    keywords: ["png to webp", "convert png to webp"],
    faq: [
      {
        q: "WEBP vs PNG — which is smaller?",
        a: "WEBP is typically 25–35% smaller than PNG at similar quality.",
      },
    ],
  },
  {
    slug: "jpg-to-webp",
    from: "JPG",
    to: "WEBP",
    fromLong: "JPG",
    toLong: "WEBP",
    category: "images",
    description: "Convert JPG to WEBP to reduce file size.",
    keywords: ["jpg to webp", "jpeg to webp"],
    faq: [],
  },
  {
    slug: "png-to-ico",
    from: "PNG",
    to: "ICO",
    fromLong: "PNG",
    toLong: "ICO",
    category: "images",
    description:
      "Convert PNG to ICO favicon. Generates 16×16, 32×32 and 48×48 variants.",
    keywords: ["png to ico", "favicon generator", "ico converter"],
    faq: [
      {
        q: "Which sizes are included?",
        a: "16×16, 32×32 and 48×48 pixels — standard favicon sizes.",
      },
    ],
  },
  {
    slug: "png-to-avif",
    from: "PNG",
    to: "AVIF",
    fromLong: "PNG",
    toLong: "AVIF",
    category: "images",
    description: "Convert PNG to AVIF — the next-gen image format.",
    keywords: ["png to avif", "avif converter"],
    faq: [],
  },
  {
    slug: "jpg-to-avif",
    from: "JPG",
    to: "AVIF",
    fromLong: "JPG",
    toLong: "AVIF",
    category: "images",
    description: "Convert JPG to AVIF for maximum compression.",
    keywords: ["jpg to avif", "jpeg to avif"],
    faq: [],
  },
  {
    slug: "svg-to-png",
    from: "SVG",
    to: "PNG",
    fromLong: "SVG",
    toLong: "PNG",
    category: "images",
    description: "Convert SVG vector graphics to PNG raster images.",
    keywords: ["svg to png", "convert svg"],
    faq: [],
  },
  {
    slug: "gif-to-png",
    from: "GIF",
    to: "PNG",
    fromLong: "GIF",
    toLong: "PNG",
    category: "images",
    description: "Convert GIF to PNG (first frame).",
    keywords: ["gif to png", "convert gif"],
    faq: [
      {
        q: "Will animation be preserved?",
        a: "No, only the first frame is converted.",
      },
    ],
  },

  // ============ DATA ============
  {
    slug: "json-to-csv",
    from: "JSON",
    to: "CSV",
    fromLong: "JSON",
    toLong: "CSV",
    category: "data",
    description:
      "Convert JSON to CSV instantly. Perfect for spreadsheets and data analysis.",
    keywords: ["json to csv", "convert json to csv", "json csv converter"],
    faq: [
      {
        q: "Does it handle nested JSON?",
        a: "Top-level arrays of objects work best. Deeply nested structures are flattened to columns.",
      },
      {
        q: "Is there a size limit?",
        a: "No. Files are processed locally, so size is limited only by your device's memory.",
      },
    ],
  },
  {
    slug: "csv-to-json",
    from: "CSV",
    to: "JSON",
    fromLong: "CSV",
    toLong: "JSON",
    category: "data",
    description: "Convert CSV to JSON with automatic type detection.",
    keywords: ["csv to json", "convert csv to json"],
    faq: [],
  },
  {
    slug: "json-to-yaml",
    from: "JSON",
    to: "YAML",
    fromLong: "JSON",
    toLong: "YAML",
    category: "data",
    description: "Convert JSON to YAML for cleaner config files.",
    keywords: ["json to yaml", "convert json to yaml"],
    faq: [],
  },
  {
    slug: "yaml-to-json",
    from: "YAML",
    to: "JSON",
    fromLong: "YAML",
    toLong: "JSON",
    category: "data",
    description: "Convert YAML to JSON.",
    keywords: ["yaml to json", "convert yaml"],
    faq: [],
  },
  {
    slug: "json-to-xml",
    from: "JSON",
    to: "XML",
    fromLong: "JSON",
    toLong: "XML",
    category: "data",
    description: "Convert JSON to XML.",
    keywords: ["json to xml", "convert json to xml"],
    faq: [],
  },
  {
    slug: "xml-to-json",
    from: "XML",
    to: "JSON",
    fromLong: "XML",
    toLong: "JSON",
    category: "data",
    description: "Convert XML to JSON.",
    keywords: ["xml to json", "convert xml"],
    faq: [],
  },
  {
    slug: "json-to-tsv",
    from: "JSON",
    to: "TSV",
    fromLong: "JSON",
    toLong: "TSV",
    category: "data",
    description: "Convert JSON to TSV (tab-separated values).",
    keywords: ["json to tsv", "convert json"],
    faq: [],
  },
  {
    slug: "csv-to-yaml",
    from: "CSV",
    to: "YAML",
    fromLong: "CSV",
    toLong: "YAML",
    category: "data",
    description: "Convert CSV to YAML.",
    keywords: ["csv to yaml", "convert csv to yaml"],
    faq: [],
  },

  // ============ PDF ============
  {
    slug: "pdf-to-png",
    from: "PDF",
    to: "PNG",
    fromLong: "PDF",
    toLong: "PNG",
    category: "pdf",
    description:
      "Convert PDF pages to PNG images. High resolution, per-page export.",
    keywords: ["pdf to png", "pdf to image", "convert pdf to png"],
    faq: [
      {
        q: "Does it work for multi-page PDFs?",
        a: "Yes. Each page is exported as a separate PNG. You get a ZIP if there's more than one page.",
      },
      {
        q: "What resolution is used?",
        a: "You control it: 1x, 1.5x, 2x or 3x. Higher = sharper but larger files.",
      },
    ],
  },
  {
    slug: "pdf-to-jpg",
    from: "PDF",
    to: "JPG",
    fromLong: "PDF",
    toLong: "JPG",
    category: "pdf",
    description: "Convert PDF pages to JPG images.",
    keywords: ["pdf to jpg", "pdf to jpeg", "convert pdf to jpg"],
    faq: [],
  },
  {
    slug: "png-to-pdf",
    from: "PNG",
    to: "PDF",
    fromLong: "PNG",
    toLong: "PDF",
    category: "pdf",
    description: "Convert PNG images to PDF documents.",
    keywords: ["png to pdf", "convert png to pdf"],
    faq: [],
  },
  {
    slug: "jpg-to-pdf",
    from: "JPG",
    to: "PDF",
    fromLong: "JPG",
    toLong: "PDF",
    category: "pdf",
    description: "Convert JPG images to PDF documents.",
    keywords: ["jpg to pdf", "jpeg to pdf", "convert jpg to pdf"],
    faq: [],
  },
  {
    slug: "image-to-pdf",
    from: "Image",
    to: "PDF",
    fromLong: "images",
    toLong: "PDF",
    category: "pdf",
    description:
      "Convert any image (PNG, JPG, WEBP, HEIC) to PDF.",
    keywords: ["image to pdf", "photo to pdf", "convert image to pdf"],
    faq: [],
  },
];

export function getSeoPage(slug: string): SeoPageConfig | null {
  return SEO_PAGES.find((p) => p.slug === slug) ?? null;
}

export function getSeoPagesByCategory(
  category: SeoPageConfig["category"]
): SeoPageConfig[] {
  return SEO_PAGES.filter((p) => p.category === category);
}