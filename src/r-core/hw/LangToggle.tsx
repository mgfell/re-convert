import { useT } from "@/libc/i18n/useT";
import { LOCALE_LABELS } from "@/libc/i18n/locales";

export default function LangToggle() {
  const { locale, toggle, t } = useT();

  return (
    <button
      onClick={toggle}
      aria-label={t("lang.toggle")}
      title={t("lang.toggle")}
      className="fixed top-5 right-20 sm:top-6 sm:right-24 z-40 h-10 px-3 rounded-2xl glass-soft flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] transition-all active:scale-95 text-xs font-medium tracking-wider"
    >
      <span key={locale} className="animate-scale-in inline-block">
        {LOCALE_LABELS[locale]}
      </span>
    </button>
  );
}