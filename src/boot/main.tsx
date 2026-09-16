import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "@/r-core/kernel/App";
import { ToastProvider } from "@/r-core/ui/toast/ToastProvider";
import { I18nProvider } from "@/libc/i18n/I18nProvider";
import Toaster from "@/r-core/ui/Toaster";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ToastProvider>
        <App />
        <Toaster />
      </ToastProvider>
    </I18nProvider>
  </StrictMode>
);