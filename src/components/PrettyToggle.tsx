type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function PrettyToggle({
  value,
  onChange,
  label = "Pretty print",
}: Props) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-full flex items-center justify-between rounded-2xl glass-soft px-4 py-3 transition-all hover:bg-white/[0.05]"
    >
      <span className="text-sm text-white/70">{label}</span>
      <span
        className={`relative w-10 h-5 rounded-full transition-colors ${
          value ? "bg-white/80" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          } ${value ? "bg-neutral-900" : "bg-white"}`}
        />
      </span>
    </button>
  );
}