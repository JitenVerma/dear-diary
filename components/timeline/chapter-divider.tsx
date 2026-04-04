"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { LifeChapter } from "@/lib/types";
import { formatEntryDate } from "@/lib/utils/date";

type ChapterDividerProps = {
  chapter: LifeChapter;
};

export function ChapterDivider({ chapter }: ChapterDividerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-soft)] shadow-[var(--shadow-card)]"
      style={{ "--chapter-accent": chapter.themeColor ?? "var(--accent-sage)", backgroundColor: "color-mix(in oklab, var(--chapter-accent) 12%, var(--bg-surface-primary))" } as CSSProperties}
    >
      <div className="border-b border-[color:var(--chapter-accent)]/18 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[var(--text-tertiary)]">
        Life chapter
      </div>
      <div className="grid gap-3 px-6 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <h3 className="font-display text-4xl leading-none text-[var(--text-primary)]">{chapter.title}</h3>
          {chapter.description ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{chapter.description}</p>
          ) : null}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          {formatEntryDate(chapter.startDate)}
          {" - "}
          {chapter.endDate ? formatEntryDate(chapter.endDate) : "Ongoing"}
        </p>
      </div>
    </motion.div>
  );
}
