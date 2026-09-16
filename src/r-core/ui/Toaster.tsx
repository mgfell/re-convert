import { useToast, type Toast } from "./toast/useToast";

const ICONS: Record<Toast["variant"], string> = {
  success: "✓",
  error: "!",
  info: "i",
};

const COLORS: Record<
  Toast["variant"],
  { bg: string; text: string; border: string }
> = {
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    border: "border-emerald-400/20",
  },
  error: {
    bg: "bg-red-500/10",
    text: "text-red-300",
    border: "border-red-400/20",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-300",
    border: "border-blue-400/20",
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
            className="pointer-events-auto w-full glass rounded-2xl px-4 py-3 flex items-center gap-3 animate-toast-in"
          >
            <div
              className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 ${c.bg} ${c.text} ${c.border}`}
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
        );
      })}
    </div>
  );
}