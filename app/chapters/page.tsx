import { BookHeart } from "lucide-react";

import { ChapterStudio } from "@/components/chapters/chapter-studio";
import { PageHero } from "@/components/ui/page-hero";
import { SurfaceCard } from "@/components/ui/surface-card";
import { getLifeChapters } from "@/lib/chapters/service";
import { countEntriesInChapter } from "@/lib/diary/aggregations";
import { getTimelineData } from "@/lib/diary/data";

export default async function ChaptersPage() {
  const [{ entries }, chapters] = await Promise.all([getTimelineData(), getLifeChapters()]);
  const chaptersWithCounts = chapters.map((chapter) => ({
    ...chapter,
    entryCount: countEntriesInChapter(chapter, entries)
  }));

  return (
    <main className="pb-16 pt-10 md:pt-14">
      <PageHero
        eyebrow="Life Chapters"
        title="Name the eras that shaped you."
        description="Life chapters turn raw chronology into something gentler and more meaningful. They help the timeline feel less like an archive and more like a story."
        aside={
          <SurfaceCard className="p-6">
            <div className="flex items-start gap-3">
              <BookHeart className="mt-1 h-5 w-5 text-[var(--text-primary)]" />
              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                Chapters are app-managed in v2 so they can stay lightweight, editable, and easy to integrate across the timeline.
              </p>
            </div>
          </SurfaceCard>
        }
      />
      <ChapterStudio initialChapters={chaptersWithCounts} />
    </main>
  );
}
