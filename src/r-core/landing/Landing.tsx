import { useT } from "@/libc/i18n/useT";
import { LangToggle } from "../hw";
import ThemeToggle from "../hw/ThemeToggle";
import Footer from "../ui/Footer";

type Props = {
  onEnter: () => void;
};

export default function Landing({ onEnter }: Props) {
  const { t } = useT();

  const features = [
    { id: "private", icon: ShieldIcon },
    { id: "fast", icon: BoltIcon },
    { id: "formats", icon: LayersIcon },
    { id: "free", icon: HeartIcon },
    { id: "pwa", icon: DownloadIcon },
    { id: "i18n", icon: GlobeIcon },
  ] as const;

  const faq = [
    { q: "landing.faq.q1", a: "landing.faq.a1" },
    { q: "landing.faq.q2", a: "landing.faq.a2" },
    { q: "landing.faq.q3", a: "landing.faq.a3" },
    { q: "landing.faq.q4", a: "landing.faq.a4" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      <LangToggle />

      {/* HERO */}
      <section className="relative flex-1 flex items-center justify-center px-6 pt-20 pb-16">
        <div className="w-full max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-[11px] tracking-[0.2em] uppercase text-white/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            {t("landing.hero.badge")}
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white/95 leading-[1.05]">
            <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
              {t("landing.hero.title")}
            </span>
          </h1>

          <p className="mt-6 text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            {t("landing.hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onEnter}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-white/95 active:scale-[0.98] transition-all shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_12px_32px_-12px_rgba(255,255,255,0.3)]"
            >
              {t("landing.hero.cta")}
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
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-soft text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              {t("landing.hero.cta2")}
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-white/40 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckIcon />
              {t("landing.hero.noUpload")}
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon />
              {t("landing.hero.noLimits")}
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon />
              {t("landing.hero.noAds")}
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/95">
              {t("landing.features.title")}
            </h2>
            <p className="mt-3 text-white/45 max-w-xl mx-auto">
              {t("landing.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  className="glass-soft rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl glass-soft flex items-center justify-center text-white/60 mb-4">
                    <Icon />
                  </div>
                  <p className="text-white/90 font-medium mb-1.5">
                    {t(`landing.feature.${f.id}.title` as const)}
                  </p>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {t(`landing.feature.${f.id}.text` as const)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="px-6 py-20 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/95">
              {t("landing.formats.title")}
            </h2>
            <p className="mt-3 text-white/45 max-w-xl mx-auto">
              {t("landing.formats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormatCard
              title={t("landing.formats.images")}
              items={["HEIC", "PNG", "JPG", "WEBP", "AVIF", "ICO", "SVG", "GIF"]}
            />
            <FormatCard
              title={t("landing.formats.data")}
              items={["JSON", "CSV", "TSV", "YAML", "XML"]}
            />
            <FormatCard
              title={t("landing.formats.pdf")}
              items={["PDF ↔ PNG", "PDF ↔ JPG", "PNG → PDF", "JPG → PDF"]}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/95 text-center mb-14">
            {t("landing.faq.title")}
          </h2>

          <div className="space-y-3">
            {faq.map(({ q, a }) => (
              <details
                key={q}
                className="group glass-soft rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
                  <span className="text-white/85 font-medium">
                    {t(q)}
                  </span>
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
                  {t(a)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white/95">
            {t("landing.cta.title")}
          </h2>
          <p className="mt-3 text-white/45">{t("landing.cta.subtitle")}</p>
          <button
            onClick={onEnter}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-white/95 active:scale-[0.98] transition-all shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_12px_32px_-12px_rgba(255,255,255,0.3)]"
          >
            {t("landing.cta.button")}
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

function FormatCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-soft rounded-2xl p-5">
      <p className="text-white/90 font-medium mb-3">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-400/80"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l10 6-10 6L2 8l10-6zM2 16l10 6 10-6M2 12l10 6 10-6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}