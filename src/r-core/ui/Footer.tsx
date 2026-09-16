import { useT } from "@/libc/i18n/useT";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-10 text-white/25 text-xs tracking-wide text-center">
      {t("app.footer")}
    </footer>
  );
}