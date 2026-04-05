import Link from "next/link";
import { BookHeart, LayoutGrid, PencilLine, Route, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/navigation/theme-toggle";

export function SiteHeader() {
  const links = [
    { href: "/", label: "Timeline", icon: Route },
    { href: "/heatmap", label: "Heatmap", icon: LayoutGrid },
    { href: "/chapters", label: "Chapters", icon: BookHeart },
    { href: "/entry/new", label: "Start Ritual", icon: PencilLine }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--divider-soft)] bg-[color:var(--bg-canvas-primary)]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface-primary)] text-[var(--text-primary)] shadow-[var(--shadow-card)] transition duration-[var(--motion-base)] ease-[var(--ease-soft)] group-hover:-translate-y-0.5">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-2xl text-[var(--text-primary)]">Dear Diary</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-tertiary)]">A quiet place for your thoughts</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--text-secondary)] transition duration-[var(--motion-base)] ease-[var(--ease-soft)] hover:bg-[var(--bg-surface-secondary)] hover:text-[var(--text-primary)]"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/entry/new"
            className="hidden rounded-full bg-[var(--accent-peach)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] shadow-[var(--shadow-card)] transition duration-[var(--motion-base)] ease-[var(--ease-soft)] hover:-translate-y-0.5 md:inline-flex"
          >
            Start Ritual
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
