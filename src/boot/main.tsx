import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "@/r-core/kernel/App";
import { Landing } from "@/r-core/landing";
import { SeoPage, getSeoPage } from "@/r-core/seo";
import { ToastProvider } from "@/r-core/ui/toast/ToastProvider";
import { I18nProvider } from "@/libc/i18n/I18nProvider";
import { useRoute } from "@/libc/router/useRoute";
import { useT } from "@/libc/i18n/useT";
import Toaster from "@/r-core/ui/Toaster";

registerSW({ immediate: true });

function Root() {
  const { route, navigate } = useRoute();
  const { t } = useT();

  const seoPage = useMemo(() => {
    if (route.name !== "seo") return null;
    return getSeoPage(route.slug);
  }, [route]);

  const goToApp = () => navigate({ name: "app" });
  const goHome = () => navigate({ name: "landing" });

  if (route.name === "app") {
    return <App onBack={goHome} />;
  }

  if (seoPage) {
    return (
      <SeoPage
        page={seoPage}
        onEnterApp={goToApp}
        onNavigateSlug={(slug) => navigate({ name: "seo", slug })}
      />
    );
  }

  if (route.name === "notFound") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-6xl font-semibold text-white/20 mb-4">404</p>
        <p className="text-white/60 mb-8">{t("seo.notFound")}</p>
        <button
          onClick={goHome}
          className="px-6 py-3 rounded-2xl bg-white text-neutral-900 font-medium hover:bg-white/95 transition"
        >
          {t("nav.home")}
        </button>
      </div>
    );
  }

  return <Landing onEnter={goToApp} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ToastProvider>
        <Root />
        <Toaster />
      </ToastProvider>
    </I18nProvider>
  </StrictMode>
);