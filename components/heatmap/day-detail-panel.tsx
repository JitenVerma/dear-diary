"use client";

import type { CSSProperties } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import type { HeatmapDay } from "@/lib/types";
import { getMoodTone } from "@/lib/theme/moods";
import { formatEntryDate } from "@/lib/utils/date";

type DayDetailPanelProps = {
  day: HeatmapDay | null;
};

export function DayDetailPanel({ day }: DayDetailPanelProps) {
  if (!day) {
    return null;
  }

  return (
    <div className="lg:sticky lg:top-28">
      <div className="rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-5 shadow-[var(--shadow-elevated)]">
        <PanelBody day={day} />
      </div>
    </div>
  );
}

function PanelBody({ day }: { day: HeatmapDay }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Selected day</p>
          <h2 className="mt-2 font-display text-4xl leading-none text-[var(--text-primary)]">
            {formatEntryDate(day.date)}
          </h2>
        </div>
        <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)]">
          {day.entryCount > 0 ? "Memory drawer" : "Quiet day"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Chip>
          {day.entryCount} {day.entryCount === 1 ? "entry" : "entries"}
        </Chip>
        {day.dominantMood ? (
          <Chip tone="accent" style={{ "--chip-accent": getMoodTone(day.dominantMood) } as CSSProperties}>
            Dominant mood: {day.dominantMood}
          </Chip>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">
        {day.entries.length > 0 ? (
          day.entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/entry/${entry.id}`}
              className="block rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl text-[var(--text-primary)]">{entry.title}</h3>
                {entry.mood ? (
                  <Chip tone="accent" style={{ "--chip-accent": getMoodTone(entry.mood) } as CSSProperties}>
                    {entry.mood}
                  </Chip>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{entry.excerpt}</p>
              {(entry.tags ?? []).length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(entry.tags ?? []).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              ) : null}
            </Link>
          ))
        ) : (
          <p className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-default)] bg-[var(--bg-surface-secondary)] p-4 text-sm leading-7 text-[var(--text-secondary)]">
            No entries live on this day yet, but it still belongs on the map.
          </p>
        )}
      </div>

      <div className="mt-6">
        <Link href={`/entry/new?date=${day.date}`}>
          <Button className="w-full">Write for this day</Button>
        </Link>
      </div>
    </div>
  );
}
