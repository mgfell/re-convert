import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "subtle";
type Size = "md" | "sm";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-neutral-900 hover:bg-white/95 active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_12px_32px_-12px_rgba(255,255,255,0.3)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_16px_40px_-12px_rgba(255,255,255,0.45)]",
  ghost:
    "glass-soft text-white/70 hover:text-white hover:bg-white/[0.06] active:scale-[0.98]",
  subtle:
    "text-white/50 hover:text-white hover:bg-white/[0.05] active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  md: "py-4 px-5 text-[15px]",
  sm: "py-2.5 px-4 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}