const SHORTCUTS = [
  { keys: ["Ctrl", "V"], label: "Paste files" },
  { keys: ["Ctrl", "Enter"], label: "Convert all" },
  { keys: ["Esc"], label: "Clear all" },
  { keys: ["T"], label: "Toggle theme" },
];

export default function ShortcutsHint() {
  return (
    <div className="mt-6 hidden md:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/25">
      {SHORTCUTS.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            {s.keys.map((k) => (
              <kbd
                key={k}
                className="px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.06] text-white/50 font-sans text-[10px]"
              >
                {k}
              </kbd>
            ))}
          </span>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}