import { useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/libc/i18n/useT";

export type CommandAction = {
  id: string;
  label: string;
  group: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onRun: () => void;
  when?: () => boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  actions: CommandAction[];
};

export default function CommandPalette({ open, onClose, actions }: Props) {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const available = actions.filter((a) => !a.when || a.when());
    if (!q) return available;
    return available.filter((a) =>
      a.label.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandAction[]>();
    for (const a of filtered) {
      if (!map.has(a.group)) map.set(a.group, []);
      map.get(a.group)!.push(a);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(flat.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flat.length) % Math.max(flat.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = flat[activeIndex];
        if (cmd) {
          cmd.onRun();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, flat, activeIndex, onClose]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" />

      <div
        className="relative w-full max-w-lg glass rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40 shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("command.placeholder")}
            className="flex-1 bg-transparent outline-none text-sm text-white/90 placeholder:text-white/30"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.06] text-[10px] text-white/40 font-sans">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-1.5">
          {flat.length === 0 && (
            <div className="py-10 text-center text-sm text-white/30">
              {t("command.noResults")}
            </div>
          )}

          {grouped.map(([group, items]) => (
            <div key={group} className="py-1">
              <p className="px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/30">
                {group}
              </p>
              {items.map((cmd) => {
                flatIndex++;
                const idx = flatIndex;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={cmd.id}
                    data-index={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      cmd.onRun();
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {cmd.icon && (
                      <span className="w-5 h-5 flex items-center justify-center text-white/40 shrink-0">
                        {cmd.icon}
                      </span>
                    )}
                    <span className="flex-1 text-sm text-white/85 truncate">
                      {cmd.label}
                    </span>
                    {cmd.shortcut && (
                      <span className="flex items-center gap-1 shrink-0">
                        {cmd.shortcut.map((k) => (
                          <kbd
                            key={k}
                            className="px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.06] text-[10px] text-white/40 font-sans"
                          >
                            {k}
                          </kbd>
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">
                ↑↓
              </kbd>
              {t("command.navigate")}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">
                ↵
              </kbd>
              {t("command.select")}
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">
              ESC
            </kbd>{" "}
            {t("command.close")}
          </span>
        </div>
      </div>
    </div>
  );
}