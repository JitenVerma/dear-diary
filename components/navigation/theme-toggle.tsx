"use client";

import { useTheme } from "next-themes";
import { MoonStar, SunMedium } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition duration-[var(--motion-base)] ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  );
}
