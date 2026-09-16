import { useEffect, useState } from "react";
import { useT } from "@/libc/i18n/useT";

type Props = {
  onClose: () => void;
};

const STORAGE_KEY = "re-convert:onboarded";

export function shouldShowOnboarding(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(STORAGE_KEY);
}

export function markOnboarded(): void {
  localStorage.setItem(STORAGE_KEY, "1");
}

export default function Onboarding({ onClose }: Props) {
  const { t } = useT();
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      ),
      title: t("onboarding.step1.title"),
      text: t("onboarding.step1.text"),
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title: t("onboarding.step2.title"),
      text: t("onboarding.step2.text"),
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: t("onboarding.step3.title"),
      text: t("onboarding.step3.text"),
    },
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleClose = () => {
    markOnboarded();
    onClose();
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-md glass rounded-3xl p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div key={step} className="text-center animate-slide-up">
          <div className="w-16 h-16 mx-auto rounded-2xl glass-soft flex items-center justify-center text-white/70 mb-6">
            {current.icon}
          </div>

          <h2 className="text-2xl font-semibold text-white/95 mb-3">
            {current.title}
          </h2>

          <p className="text-white/50 leading-relaxed text-sm">
            {current.text}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-8">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-6 bg-white/70"
                  : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 py-3 rounded-2xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition"
          >
            {t("onboarding.skip")}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-2xl text-sm bg-white text-neutral-900 font-medium hover:bg-white/95 active:scale-[0.98] transition-all"
          >
            {step < steps.length - 1
              ? t("onboarding.next")
              : t("onboarding.done")}
          </button>
        </div>
      </div>
    </div>
  );
}