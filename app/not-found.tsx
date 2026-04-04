import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-20 md:px-8">
      <SurfaceCard className="w-full p-8 text-center md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-tertiary)]">Memory not found</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--text-primary)]">This entry is no longer on the page.</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          It may have been removed, or the Notion connection may not have access to it.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Return to timeline</Button>
          </Link>
        </div>
      </SurfaceCard>
    </main>
  );
}
