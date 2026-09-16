import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BASE_URL = "https://mgfell.github.io/re-convert";
const TODAY = new Date().toISOString().split("T")[0];

const SEO_SLUGS = [
  "heic-to-jpg",
  "heic-to-png",
  "png-to-jpg",
  "jpg-to-png",
  "webp-to-jpg",
  "webp-to-png",
  "png-to-webp",
  "jpg-to-webp",
  "png-to-ico",
  "png-to-avif",
  "jpg-to-avif",
  "svg-to-png",
  "gif-to-png",
  "json-to-csv",
  "csv-to-json",
  "json-to-yaml",
  "yaml-to-json",
  "json-to-xml",
  "xml-to-json",
  "json-to-tsv",
  "csv-to-yaml",
  "pdf-to-png",
  "pdf-to-jpg",
  "png-to-pdf",
  "jpg-to-pdf",
  "image-to-pdf",
];

const urls = [
  { loc: `${BASE_URL}/`, priority: "1.0" },
  { loc: `${BASE_URL}/#app`, priority: "0.9" },
  ...SEO_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/#${slug}`,
    priority: "0.8",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const publicDir = resolve(root, "public");
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

writeFileSync(resolve(publicDir, "robots.txt"), robots);

console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
console.log(`✓ Generated robots.txt`);