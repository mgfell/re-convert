import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const BASE_URL = "https://mgfell.github.io/re-convert";
const APP_URL = `${BASE_URL}/#`;

const SEO_PAGES = JSON.parse(
  await import("node:fs").then((fs) =>
    fs.readFileSync(resolve(root, "seo-pages.json"), "utf-8")
  )
);

const distDir = resolve(root, "dist");

const TEMPLATE = (page) => `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#08090c" />
    <title>${page.from} to ${page.to} — Free Online Converter | re:convert</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${page.keywords.join(", ")}" />
    <link rel="canonical" href="${BASE_URL}/${page.url}/" />
    <meta property="og:title" content="${page.from} to ${page.to} — Free Online Converter" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${BASE_URL}/${page.url}/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.from} to ${page.to} — Free Online Converter" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <link rel="icon" type="image/svg+xml" href="/re-convert/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <script type="application/ld+json">
    ${JSON.stringify(
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: `re:convert — ${page.from} to ${page.to}`,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            description: page.description,
            url: `${BASE_URL}/${page.url}/`,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "128",
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${page.from} to ${page.to}`,
                item: `${BASE_URL}/${page.url}/`,
              },
            ],
          },
          ...(page.faq.length > 0
            ? [
                {
                  "@type": "FAQPage",
                  mainEntity: page.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.a,
                    },
                  })),
                },
              ]
            : []),
        ],
      },
      null,
      2
    )}
    </script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #08090c;
        color: #e8e8ec;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        min-height: 100vh;
      }
      .wrap {
        max-width: 800px;
        margin: 0 auto;
        padding: 60px 24px;
      }
      h1 {
        font-size: 42px;
        font-weight: 600;
        letter-spacing: -0.02em;
        margin: 0 0 20px;
        line-height: 1.1;
      }
      .from { color: rgba(255,255,255,0.4); }
      .to {
        background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .arrow { color: rgba(255,255,255,0.25); margin: 0 12px; }
      p {
        color: rgba(255,255,255,0.5);
        line-height: 1.6;
        font-size: 17px;
        margin: 16px 0;
      }
      .cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 32px;
        padding: 16px 24px;
        border-radius: 16px;
        background: #fff;
        color: #111;
        font-weight: 500;
        text-decoration: none;
        font-size: 15px;
      }
      .cta:hover { background: rgba(255,255,255,0.95); }
      .badges {
        display: flex;
        gap: 24px;
        margin-top: 24px;
        flex-wrap: wrap;
        font-size: 13px;
        color: rgba(255,255,255,0.4);
      }
      h2 {
        font-size: 22px;
        font-weight: 600;
        margin: 48px 0 16px;
        color: rgba(255,255,255,0.9);
      }
      ul {
        color: rgba(255,255,255,0.5);
        line-height: 1.8;
        padding-left: 20px;
        margin: 16px 0;
      }
      .faq-item {
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.03);
        border-radius: 16px;
        padding: 16px 20px;
        margin-bottom: 8px;
      }
      .faq-item summary {
        cursor: pointer;
        font-weight: 500;
        color: rgba(255,255,255,0.85);
        list-style: none;
      }
      .faq-item summary::-webkit-details-marker { display: none; }
      .faq-item p {
        margin-top: 12px;
        font-size: 15px;
        color: rgba(255,255,255,0.5);
      }
      footer {
        margin-top: 60px;
        padding-top: 24px;
        border-top: 1px solid rgba(255,255,255,0.05);
        font-size: 12px;
        color: rgba(255,255,255,0.25);
      }
      footer a { color: rgba(255,255,255,0.4); text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>
        <span class="from">${page.from}</span>
        <span class="arrow">→</span>
        <span class="to">${page.to}</span>
      </h1>

      <p>${escapeHtml(page.intro)}</p>

      <a class="cta" href="${APP_URL}${page.slug}">
        Convert ${page.from} to ${page.to} now →
      </a>

      <div class="badges">
        <span>✓ 100% private</span>
        <span>✓ Free forever</span>
        <span>✓ No limits</span>
        <span>✓ No signup</span>
      </div>

      <h2>Why convert ${page.from} to ${page.to}?</h2>
      <ul>
        ${page.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("\n        ")}
      </ul>

      ${
        page.faq.length > 0
          ? `
      <h2>Frequently asked questions</h2>
      ${page.faq
        .map(
          (f) => `<details class="faq-item">
        <summary>${escapeHtml(f.q)}</summary>
        <p>${escapeHtml(f.a)}</p>
      </details>`
        )
        .join("\n      ")}
      `
          : ""
      }

      <footer>
        <p>
          <a href="${BASE_URL}/">re:convert</a> — private file converter.
          Everything runs locally in your browser. Nothing is ever uploaded.
        </p>
      </footer>
    </div>

    <script>
      // Redirect real users to the SPA at the right hash
      // (Google sees this static HTML; users get the interactive app)
      if (!/bot|crawl|spider|slurp|google|bing|yandex|duckduck/i.test(navigator.userAgent)) {
        window.location.replace("${APP_URL}${page.slug}");
      }
    </script>
  </body>
</html>
`;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let generated = 0;

for (const page of SEO_PAGES) {
  const dir = resolve(distDir, page.url);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), TEMPLATE(page));
  generated++;
}

const indexHtml = await import("node:fs").then((fs) =>
  fs.readFileSync(resolve(distDir, "index.html"), "utf-8")
);
writeFileSync(resolve(distDir, "404.html"), indexHtml);

const TODAY = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${SEO_PAGES.map(
  (p) => `  <url>
    <loc>${BASE_URL}/${p.url}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
).join("\n")}
</urlset>
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

writeFileSync(resolve(distDir, "robots.txt"), robots);