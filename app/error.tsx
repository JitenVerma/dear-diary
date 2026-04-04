"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-5 py-20 md:px-8">
      <SurfaceCard className="w-full p-8 text-center md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-tertiary)]">A gentle interruption</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--text-primary)]">The page slipped away for a moment.</h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{error.message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Link href="/">
            <Button variant="secondary">Back home</Button>
          </Link>
        </div>
      </SurfaceCard>
    </main>
  );
}
