type Props = {
  value: number | null;
  onChange: (value: number | null) => void;
};

const PRESETS: { label: string; value: number | null }[] = [
  { label: "Original", value: null },
  { label: "1920", value: 1920 },
  { label: "1280", value: 1280 },
  { label: "800", value: 800 },
];

export default function ResizeInput({ value, onChange }: Props) {
  const isCustom = value !== null && !PRESETS.some((p) => p.value === value);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
          Max width
        </p>
        <span className="text-xs text-white/60 tabular-nums">
          {value === null ? "original" : `${value}px`}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {PRESETS.map((preset) => {
          const active = value === preset.value;
          return (
            <button
              key={preset.label}
              onClick={() => onChange(preset.value)}
              className={`rounded-xl py-2 text-xs transition-all duration-200 ${
                active
                  ? "bg-white/[0.09] text-white border border-white/15"
                  : "text-white/50 hover:text-white/80 border border-transparent glass-soft"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          min={64}
          max={10000}
          placeholder="Custom…"
          value={isCustom ? value ?? "" : ""}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") return onChange(null);
            const n = Number(v);
            if (!Number.isNaN(n) && n > 0) onChange(n);
          }}
          className={`flex-1 rounded-xl px-3 py-2 text-xs bg-white/[0.03] border outline-none transition placeholder:text-white/25 text-white/80 tabular-nums ${
            isCustom
              ? "border-white/20"
              : "border-white/[0.06] focus:border-white/15"
          }`}
        />
        <span className="text-xs text-white/30">px</span>
      </div>
    </div>
  );
}