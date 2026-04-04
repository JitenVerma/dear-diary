import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "floating";
  icon?: ReactNode;
  href?: string;
  style?: CSSProperties;
};

export function Button({
  className,
  variant = "primary",
  icon,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-[var(--motion-base)] ease-[var(--ease-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-peach)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas-primary)] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-[var(--accent-peach)] text-[var(--text-primary)] shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]",
        variant === "secondary" &&
          "border border-[var(--border-default)] bg-[var(--bg-surface-primary)] text-[var(--text-primary)] shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:bg-[var(--bg-surface-secondary)]",
        variant === "ghost" &&
          "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-primary)]",
        variant === "floating" &&
          "bg-[var(--accent-rose)] text-[var(--text-primary)] shadow-[var(--shadow-elevated)] hover:-translate-y-1 hover:shadow-[var(--shadow-modal)]",
        className
      )}
      style={style}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
