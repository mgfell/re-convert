import { useT } from "@/libc/i18n/useT";

export default function ShortcutsHint() {
  const { t } = useT();

  const shortcuts = [
    { keys: ["Ctrl", "V"], label: t("shortcuts.paste") },
    { keys: ["Ctrl", "Enter"], label: t("shortcuts.convert") },
    { keys: ["Esc"], label: t("shortcuts.clear") },
    { keys: ["T"], label: t("shortcuts.theme") },
    { keys: ["L"], label: t("shortcuts.language") },
  ];

  return (
    <div className="mt-6 hidden md:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/25">
      {shortcuts.map((s) => (
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