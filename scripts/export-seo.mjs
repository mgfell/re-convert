import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const configPath = resolve(root, "src/r-core/seo/config.ts");
const config = readFileSync(configPath, "utf-8");

const match = config.match(/export const SEO_PAGES: SeoPageConfig\[\] = (\[[\s\S]*?\]);\s*$/m);
if (!match) {
  console.error("❌ Could not extract SEO_PAGES");
  process.exit(1);
}

const arrayCode = match[1];

let pages;
try {
  pages = eval(`(${arrayCode})`);
} catch (e) {
  console.error("❌ Failed to parse SEO_PAGES:", e.message);
  process.exit(1);
}

writeFileSync(
  resolve(root, "seo-pages.json"),
  JSON.stringify(pages, null, 2)
);

console.log(`✓ Exported ${pages.length} SEO pages to seo-pages.json`);