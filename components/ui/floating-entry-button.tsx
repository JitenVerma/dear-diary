import Link from "next/link";
import { PenLine } from "lucide-react";

export function FloatingEntryButton() {
  return (
    <Link
      href="/entry/new"
      className="fixed bottom-6 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[var(--accent-rose)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[var(--shadow-modal)] transition duration-[var(--motion-base)] ease-[var(--ease-soft)] hover:-translate-y-1 md:bottom-8 md:right-8"
    >
      <PenLine className="h-4 w-4" />
      <span className="hidden sm:inline">Start Ritual</span>
    </Link>
  );
}
