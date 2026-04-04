import Link from "next/link";
import { BookHeart, LayoutGrid } from "lucide-react";

import { PageHero } from "@/components/ui/page-hero";
import { SurfaceCard } from "@/components/ui/surface-card";
import { TimelineExperience } from "@/components/timeline/timeline-experience";
import { getTimelineData } from "@/lib/diary/data";

type HomePageProps = {
  searchParams: Promise<{
    created?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const { entries, chapters, usingFallback, errorMessage } = await getTimelineData();

  return (
    <main className="pb-16 pt-10 md:pt-14">
      <PageHero
        eyebrow="Timeline"
        title="A gentle path through your days, moods, and meaningful eras."
        description="Dear Diary v2 keeps the timeline as home, but now your memories are accompanied by a mood map and the life chapters that made those days matter."
        aside={
          <SurfaceCard className="p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-tertiary)]">New in v2</p>
            <div className="mt-5 space-y-4 text-[var(--text-secondary)]">
              <div className="flex items-start gap-3">
                <LayoutGrid className="mt-1 h-4 w-4 text-[var(--text-primary)]" />
                <p>Mood heatmap tiles now make emotional patterns easier to revisit.</p>
              </div>
              <div className="flex items-start gap-3">
                <BookHeart className="mt-1 h-4 w-4 text-[var(--text-primary)]" />
                <p>Life chapters give whole seasons of your timeline names, tones, and narrative weight.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/entry/new"
                className="rounded-full bg-[var(--accent-peach)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
              >
                Start writing
              </Link>
              <a
                href="#timeline"
                className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface-secondary)]"
              >
                Explore timeline
              </a>
            </div>
          </SurfaceCard>
        }
      />

      {errorMessage ? (
        <div className="mx-auto mb-8 max-w-7xl px-5 md:px-8">
          <div className="rounded-[var(--radius-lg)] bg-[color:var(--accent-gold)]/18 px-5 py-4 text-sm leading-7 text-[var(--text-primary)] shadow-[var(--shadow-card)]">
            {errorMessage}
          </div>
        </div>
      ) : null}

      <section id="timeline">
        <TimelineExperience
          initialEntries={entries}
          chapters={chapters}
          created={params.created === "1"}
          usingFallback={usingFallback}
        />
      </section>
    </main>
  );
}
