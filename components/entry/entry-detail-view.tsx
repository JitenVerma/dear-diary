"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { Chip } from "@/components/ui/chip";
import type { DiaryEntry } from "@/lib/types";
import { getMoodTone } from "@/lib/theme/moods";
import { formatEntryDate } from "@/lib/utils/date";

type EntryDetailViewProps = {
  entry: DiaryEntry;
};

export function EntryDetailView({ entry }: EntryDetailViewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-4xl px-5 pb-20 md:px-8"
    >
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-soft)] bg-[var(--bg-surface-primary)] shadow-[var(--shadow-modal)]">
        {entry.coverImageUrl ? (
          <div className="relative aspect-[16/8]">
            <Image
              src={entry.coverImageUrl}
              alt={entry.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 960px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(58,47,42,0.52)] via-[rgba(58,47,42,0.16)] to-transparent" />
          </div>
        ) : (
          <div className="h-28 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--accent-peach)_22%,transparent),transparent_55%),linear-gradient(135deg,var(--bg-surface-secondary),var(--bg-surface-primary))]" />
        )}

        <div className="px-6 pb-8 pt-6 md:px-10 md:pb-10">
          <Link href="/" className="inline-flex text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
            Back to timeline
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Chip>{formatEntryDate(entry.entryDate)}</Chip>
            {entry.mood ? (
              <Chip tone="accent" style={{ "--chip-accent": getMoodTone(entry.mood) } as CSSProperties}>
                {entry.mood}
              </Chip>
            ) : null}
            {(entry.tags ?? []).map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
            {entry.favorite ? (
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface-secondary)] px-4 py-2 text-sm text-[var(--text-primary)]">
                Favorite memory
              </span>
            ) : null}
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-[var(--text-primary)] md:text-6xl">
            {entry.title}
          </h1>

          <div className="prose-diary mt-10 border-t border-[var(--divider-soft)] pt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {entry.body ?? entry.excerpt}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
