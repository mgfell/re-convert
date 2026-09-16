import { useEffect } from "react";
import type { SeoPageConfig } from "./config";
import { getSeoPagesByCategory } from "./config";
import { useT } from "@/libc/i18n/useT";
import { useTheme } from "../vga/hooks/useTheme";
import ThemeToggle from "../hw/ThemeToggle";
import LangToggle from "../hw/LangToggle";
import Footer from "../ui/Footer";

type Props = {
  page: SeoPageConfig;
  onEnterApp: () => void;
  onNavigateSlug: (slug: string) => void;
};

export default function SeoPage({ page, onEnterApp, onNavigateSlug }: Props) {
  const { t } = useT();
  useTheme();

  useEffect(() => {
    const title = `${page.from} to ${page.to} — Free Online Converter | re:convert`;
    document.title = title;

    setMeta("description", page.description);
    setMeta("keywords", page.keywords.join(", "));

    setOg("og:title", title);
    setOg("og:description", page.description);
    setOg("og:type", "website");

    setJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: `re:convert — ${page.from} to ${page.to}`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          description: page.description,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
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
    });

    return () => {
      setJsonLd(null);
    };
  }, [page]);

  const related = getSeoPagesByCategory(page.category).filter(
    (p) => p.slug !== page.slug
  );

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      <LangToggle />

      {/* Breadcrumbs */}
      <nav className="max-w-4xl w-full mx-auto px-6 pt-8 text-xs text-white/35">
        <button
          onClick={() => (window.location.hash = "")}
          className="hover:text-white/70 transition"
        >
          {t("nav.home")}
        </button>
        <span className="mx-2">/</span>
        <span className="text-white/60">{page.from} → {page.to}</span>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-10 pb-16">
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white/95 leading-[1.05]">
            <span className="text-white/40">{page.from}</span>
            <span className="text-white/25 mx-3">→</span>
            <span className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {page.to}
            </span>
          </h1>

          <p className="mt-6 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            {page.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-white/95 active:scale-[0.98] transition-all shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_12px_32px_-12px_rgba(255,255,255,0.3)]"
            >
              {t("seo.convertNow", { from: page.from, to: page.to })}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/40 flex-wrap">
            <span>✓ {t("seo.badges.private")}</span>
            <span>✓ {t("seo.badges.free")}</span>
            <span>✓ {t("seo.badges.noLimits")}</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/95 text-center mb-12">
            {t("seo.howItWorks")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Step
              num="1"
              title={t("seo.step1.title")}
              text={t("seo.step1.text")}
            />
            <Step
              num="2"
              title={t("seo.step2.title")}
              text={t("seo.step2.text")}
            />
            <Step
              num="3"
              title={t("seo.step3.title")}
              text={t("seo.step3.text")}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {page.faq.length > 0 && (
        <section className="px-6 py-16 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white/95 text-center mb-10">
              {t("seo.faq")}
            </h2>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <details
                  key={item.q}
                  className="group glass-soft rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                    <span className="text-white/85 font-medium">{item.q}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/40 transition-transform group-open:rotate-180 shrink-0"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-white/50 leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 py-16 border-t border-white/[0.05]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white/85 mb-6">
              {t("seo.related")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.slice(0, 12).map((r) => (
                <button
                  key={r.slug}
                  onClick={() => onNavigateSlug(r.slug)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-soft hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/15 transition-all text-xs active:scale-95"
                >
                  <span className="text-white/60">{r.from}</span>
                  <span className="text-white/25">→</span>
                  <span className="text-white/85 font-medium">{r.to}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-16 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/95">
            {t("seo.cta.title", { from: page.from, to: page.to })}
          </h2>
          <button
            onClick={onEnterApp}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-white/95 active:scale-[0.98] transition-all"
          >
            {t("seo.cta.button")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Step({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  return (
    <div className="glass-soft rounded-2xl p-5">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-semibold text-white/60 mb-4">
        {num}
      </div>
      <p className="text-white/90 font-medium mb-1.5">{title}</p>
      <p className="text-sm text-white/45 leading-relaxed">{text}</p>
    </div>
  );
}

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

function setJsonLd(data: unknown) {
  const id = "seo-jsonld";
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}