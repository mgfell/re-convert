import { useT } from "@/libc/i18n/useT";

type QuickAction = {
  from: string;
  to: string;
  tab: "images" | "data" | "pdf";
  popular?: boolean;
};

const ACTIONS: QuickAction[] = [
  { from: "HEIC", to: "JPG", tab: "images", popular: true },
  { from: "PNG", to: "WEBP", tab: "images" },
  { from: "WEBP", to: "PNG", tab: "images" },
  { from: "JPG", to: "AVIF", tab: "images" },
  { from: "PDF", to: "PNG", tab: "pdf", popular: true },
  { from: "PNG", to: "PDF", tab: "pdf" },
  { from: "JSON", to: "CSV", tab: "data", popular: true },
  { from: "CSV", to: "JSON", tab: "data" },
  { from: "YAML", to: "JSON", tab: "data" },
];

type Props = {
  onSelect: (tab: "images" | "data" | "pdf") => void;
};

export default function QuickActions({ onSelect }: Props) {
  const { t } = useT();

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/30">
          {t("quick.title")}
        </p>
        <div className="flex-1 divider-x" />
      </div>

      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={`${action.from}-${action.to}`}
            onClick={() => onSelect(action.tab)}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-soft hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/15 transition-all text-xs active:scale-95"
          >
            <span className="text-white/60 group-hover:text-white/90 transition">
              {action.from}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/25 group-hover:text-white/50 transition"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="text-white/80 group-hover:text-white font-medium transition">
              {action.to}
            </span>
            {action.popular && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}