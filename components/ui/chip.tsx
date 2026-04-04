import type { CSSProperties } from "react";

import { cn } from "@/lib/utils/cn";

export function Chip({
  children,
  className,
  tone = "default",
  style
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "soft" | "accent";
  style?: CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-sm",
        tone === "default" && "border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] text-[var(--text-secondary)]",
        tone === "soft" && "bg-[var(--bg-surface-secondary)] text-[var(--text-secondary)]",
        tone === "accent" && "bg-[color:var(--chip-accent,var(--accent-sage))]/18 text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
