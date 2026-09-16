import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "@/r-core/kernel/App";
import { Landing } from "@/r-core/landing";
import { ToastProvider } from "@/r-core/ui/toast/ToastProvider";
import { I18nProvider } from "@/libc/i18n/I18nProvider";
import Toaster from "@/r-core/ui/Toaster";

registerSW({ immediate: true });

function Root() {
  const [view, setView] = useState<"landing" | "app">(() => {
    const hash = window.location.hash.slice(1);
    return hash === "app" ? "app" : "landing";
  });

  const handleEnter = () => {
    window.location.hash = "app";
    setView("app");
  };

  const handleBack = () => {
    window.location.hash = "";
    setView("landing");
  };

  return view === "app" ? <App onBack={handleBack} /> : <Landing onEnter={handleEnter} />;
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