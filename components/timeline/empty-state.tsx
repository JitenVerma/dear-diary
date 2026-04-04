import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "Your story starts here",
  description = "A first entry is enough. You can always come back later and let the rest of the story arrive gently."
}: EmptyStateProps) {
  return (
    <SurfaceCard className="p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-tertiary)]">A blank chapter</p>
        <h2 className="mt-4 font-display text-4xl text-[var(--text-primary)] md:text-5xl">{title}</h2>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{description}</p>
        <div className="mt-8 flex justify-center">
          <Link href="/entry/new">
            <Button>Write your first entry</Button>
          </Link>
        </div>
      </div>
    </SurfaceCard>
  );
}
