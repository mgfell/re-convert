export default function Header() {
  return (
    <header className="text-center mb-10 sm:mb-14">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-soft text-[11px] tracking-[0.2em] uppercase text-white/50 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
        Runs offline
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white/95">
        re<span className="text-white/40">:</span>convert
      </h1>

      <p className="mt-4 text-white/45 text-base md:text-lg max-w-md mx-auto leading-relaxed px-2">
        A quiet file converter. Everything happens locally — nothing ever
        leaves your device.
      </p>
    </header>
  );
}