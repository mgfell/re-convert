type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function QualitySlider({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] tracking-[0.18em] uppercase text-white/40">
          Quality
        </p>
        <span className="text-xs text-white/60 tabular-nums">{value}%</span>
      </div>

      <input
        type="range"
        min={1}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.5)]
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:cursor-grab"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) ${value}%, rgba(255,255,255,0.08) ${value}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />

      <div className="flex justify-between mt-2 text-[10px] text-white/25">
        <span>Smaller</span>
        <span>Better</span>
      </div>
    </div>
  );
}