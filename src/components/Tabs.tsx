import type { ReactNode } from "react";
import type { TabId } from "../types/tabs";
import { TABS } from "../config/tabs";

type Props = {
  active: TabId;
  onSelect: (tab: TabId) => void;
};

const ICONS: Record<string, ReactNode> = {
  image: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  file: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  ),
  code: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  video: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M22 8l-6 4 6 4V8z" />
    </svg>
  ),
};

export default function Tabs({ active, onSelect }: Props) {
  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-2xl glass-soft mb-6">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        const disabled = !tab.enabled;
        return (
          <button
            key={tab.id}
            onClick={() => !disabled && onSelect(tab.id)}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all ${
              isActive
                ? "bg-white/[0.09] text-white border border-white/15"
                : disabled
                ? "text-white/20 cursor-not-allowed"
                : "text-white/50 hover:text-white/80 border border-transparent"
            }`}
          >
            {ICONS[tab.icon]}
            <span className="font-medium tracking-wide">{tab.label}</span>
            {disabled && (
              <span className="text-[9px] uppercase tracking-wider text-white/25 ml-1">
                soon
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}