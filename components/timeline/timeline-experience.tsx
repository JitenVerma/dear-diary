"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookHeart, Sparkles } from "lucide-react";

import { groupEntriesIntoTimeline } from "@/lib/diary/aggregations";
import type { DiaryEntry, LifeChapter } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FloatingEntryButton } from "@/components/ui/floating-entry-button";

import { ChapterDivider } from "./chapter-divider";
import { EmptyState } from "./empty-state";
import { FilterBar } from "./filter-bar";
import { MonthJumpNav } from "./month-jump-nav";
import { TimelineCard } from "./timeline-card";

type TimelineExperienceProps = {
  initialEntries: DiaryEntry[];
  chapters: LifeChapter[];
  created?: boolean;
  usingFallback?: boolean;
};

export function TimelineExperience({
  initialEntries,
  chapters,
  created = false,
  usingFallback = false
}: TimelineExperienceProps) {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [activeMonth, setActiveMonth] = useState<string | undefined>(undefined);

  const moods = [...new Set(initialEntries.map((entry) => entry.mood).filter(Boolean))] as string[];
  const tags = [...new Set(initialEntries.flatMap((entry) => entry.tags ?? []))];

  const filteredEntries = initialEntries.filter((entry) => {
    const moodMatch = selectedMood ? entry.mood === selectedMood : true;
    const tagMatch = selectedTag ? (entry.tags ?? []).includes(selectedTag) : true;
    return moodMatch && tagMatch;
  });

  const monthGroups = groupEntriesIntoTimeline(filteredEntries, chapters);
  const displayedActiveMonth = monthGroups.some((group) => group.key === activeMonth)
    ? activeMonth
    : monthGroups[0]?.key;

  useEffect(() => {
    if (monthGroups.length === 0) {
      return undefined;
    }

    const sections = monthGroups
      .map((group) => document.getElementById(`month-${group.key}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id.startsWith("month-")) {
          setActiveMonth(visible.target.id.replace("month-", ""));
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.4, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [monthGroups]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <div className="space-y-4 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-5 shadow-[var(--shadow-card)]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--text-tertiary)]">Current chapter</p>
              <h2 className="mt-3 font-display text-4xl text-[var(--text-primary)]">
                {monthGroups.find((group) => group.key === displayedActiveMonth)?.label ?? "Timeline"}
              </h2>
            </div>

            <MonthJumpNav
              months={monthGroups.map((group) => ({ key: group.key, label: group.label }))}
              activeMonth={displayedActiveMonth}
            />

            <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] p-4">
              <p className="text-sm leading-7 text-[var(--text-secondary)]">
                Scroll through the months, revisit a feeling, or follow a thread through the tags that stay with you.
              </p>
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[color:var(--accent-sage)]/12 p-4">
              <div className="flex items-start gap-3">
                <BookHeart className="mt-0.5 h-5 w-5 text-[var(--text-primary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Meaning now sits beside time.</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    Life chapters soften the timeline into eras you can recognize, not just dates you can scroll past.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          {created ? (
            <div className="rounded-[var(--radius-lg)] border border-transparent bg-[color:var(--accent-sage)]/18 px-5 py-4 text-sm text-[var(--text-primary)] shadow-[var(--shadow-card)]">
              Your entry was saved to Notion and woven back into the timeline.
            </div>
          ) : null}

          {usingFallback ? (
            <div className="rounded-[var(--radius-lg)] border border-transparent bg-[color:var(--accent-gold)]/18 px-5 py-4 text-sm leading-7 text-[var(--text-primary)] shadow-[var(--shadow-card)]">
              Dear Diary is showing graceful fallback content because Notion is not connected yet. Add your Notion credentials to start using real entries.
            </div>
          ) : null}

          <FilterBar
            moods={moods}
            tags={tags}
            selectedMood={selectedMood}
            selectedTag={selectedTag}
            onMoodChange={setSelectedMood}
            onTagChange={setSelectedTag}
            onClear={() => {
              setSelectedMood("");
              setSelectedTag("");
            }}
          />

          {monthGroups.length === 0 ? (
            <EmptyState description="No entries match those filters yet. Clear the filters or add a new page to your story." />
          ) : (
            <div className="relative space-y-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[color:var(--bg-surface-primary)]/96 px-4 py-6 shadow-[var(--shadow-elevated)] md:px-8 md:py-8">
              <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-gold)_55%,transparent),transparent)] md:left-1/2" />

              {monthGroups.map((group) => (
                <section key={group.key} id={`month-${group.key}`} className="relative scroll-mt-32">
                  {group.chapter ? <ChapterDivider chapter={group.chapter} /> : null}

                  <div className="sticky top-20 z-20 mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[color:var(--bg-surface-primary)]/92 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)] backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    {group.label}
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    {group.entries.map((entry, index) => (
                      <TimelineCard key={entry.id} entry={entry} align={index % 2 === 0 ? "left" : "right"} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Link href="/entry/new">
              <Button variant="secondary">Capture a new memory</Button>
            </Link>
          </div>
        </div>
      </section>

      <FloatingEntryButton />
    </div>
  );
}
