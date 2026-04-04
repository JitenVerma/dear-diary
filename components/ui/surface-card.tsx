import { cn } from "@/lib/utils/cn";

export function SurfaceCard({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] shadow-[var(--shadow-card)]",
        className
      )}
    >
      {children}
    </div>
  );
}
