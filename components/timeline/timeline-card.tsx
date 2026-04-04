"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Chip } from "@/components/ui/chip";
import type { DiaryEntry } from "@/lib/types";
import { getMoodTone } from "@/lib/theme/moods";
import { cn } from "@/lib/utils/cn";
import { formatEntryDate, getTimelineMarkerParts } from "@/lib/utils/date";

type TimelineCardProps = {
  entry: DiaryEntry;
  align: "left" | "right";
};

export function TimelineCard({ entry, align }: TimelineCardProps) {
  const reducedMotionPreference = useReducedMotion();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );
  const reduceMotion = isHydrated && reducedMotionPreference;
  const marker = getTimelineMarkerParts(entry.entryDate);

  return (
    <div className="relative grid md:grid-cols-[1fr_5rem_1fr]">
      <div className={cn("hidden md:block", align === "left" ? "" : "md:col-start-3")} />

      <div className="absolute left-[1.1rem] top-10 z-10 flex items-center md:static md:col-start-2 md:justify-center">
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface-primary)] text-[var(--text-secondary)] shadow-[var(--shadow-card)]">
          <span className="translate-y-[1px] text-[12px] leading-none tracking-[0.16em]">
            {marker.day}
          </span>
          <span className="mt-1 text-[10px] leading-none tracking-[0.2em]">
            {marker.month}
          </span>
        </div>
      </div>

      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
        whileTap={reduceMotion ? undefined : { scale: 0.995 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "ml-10 rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] p-5 shadow-[var(--shadow-card)] md:ml-0",
          align === "left" ? "md:col-start-1" : "md:col-start-3"
        )}
      >
        <Link href={`/entry/${entry.id}`} className="group block focus:outline-none">
          {entry.coverImageUrl ? (
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-soft)]">
              <Image
                src={entry.coverImageUrl}
                alt={entry.title}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,47,42,0.22)] via-transparent to-transparent" />
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
              {formatEntryDate(entry.entryDate)}
            </p>
            {entry.favorite ? (
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface-secondary)] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--text-primary)]">
                Favorite
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--text-primary)]">{entry.title}</h3>
          <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">{entry.excerpt}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {entry.mood ? (
              <Chip
                tone="accent"
                className="text-[var(--text-primary)]"
                style={{ "--chip-accent": getMoodTone(entry.mood) } as CSSProperties}
              >
                {entry.mood}
              </Chip>
            ) : null}
            {(entry.tags ?? []).map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </Link>
      </motion.article>
    </div>
  );
}
