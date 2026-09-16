import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const base =
  "w-full rounded-2xl font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "py-4 text-[15px] bg-white text-neutral-900 hover:bg-white/90 active:scale-[0.99] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_12px_32px_-12px_rgba(255,255,255,0.25)]",
  ghost:
    "py-3 text-sm glass-soft text-white/70 hover:text-white hover:bg-white/[0.06]",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}