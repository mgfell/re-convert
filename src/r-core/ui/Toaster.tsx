import { useToast, type Toast } from "./toast/useToast";

import type { ReactNode } from "react";

const ICONS: Record<Toast["variant"], ReactNode> = {
  success: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
};

const COLORS: Record<
  Toast["variant"],
  { bg: string; text: string; border: string; progress: string }
> = {
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-400/20",
    progress: "bg-emerald-400/60",
  },
  error: {
    bg: "bg-red-500/10",
    text: "text-red-300",
    border: "border-red-400/20",
    progress: "bg-red-400/60",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/20",
    progress: "bg-blue-400/60",
  },
};

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-md">
      {toasts.map((toast) => {
        const c = COLORS[toast.variant];
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto w-full glass rounded-2xl overflow-hidden animate-toast-in"
          >
            <div className="px-4 py-3 flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${c.bg} ${c.text} ${c.border}`}
              >
                {ICONS[toast.variant]}
              </div>
              <p className="text-sm text-white/85 flex-1 leading-snug">
                {toast.message}
              </p>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss"
                className="text-white/30 hover:text-white/70 transition p-1"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {toast.duration > 0 && (
              <div className="h-[2px] bg-white/[0.04] overflow-hidden">
                <div
                  className={`h-full ${c.progress} origin-left`}
                  style={{
                    animation: `toast-progress ${toast.duration}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}