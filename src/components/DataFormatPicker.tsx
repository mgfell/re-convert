import { DATA_FORMATS } from "../config/dataFormats";
import type { DataFormat } from "../types/data";

type Props = {
  value: DataFormat;
  onChange: (format: DataFormat) => void;
};

export default function DataFormatPicker({ value, onChange }: Props) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.18em] uppercase text-white/40 mb-3">
        Output format
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-1 rounded-2xl glass-soft">
        {DATA_FORMATS.map((format) => {
          const active = value === format.id;
          return (
            <button
              key={format.id}
              onClick={() => onChange(format.id)}
              className={`rounded-xl py-2.5 px-2 transition-all duration-200 text-center ${
                active
                  ? "bg-white/[0.09] text-white border border-white/15"
                  : "text-white/50 hover:text-white/80 border border-transparent"
              }`}
            >
              <p className="font-medium text-sm tracking-wide">
                {format.label}
              </p>
              <p className="text-[10px] text-white/35 mt-0.5 truncate">
                {format.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}