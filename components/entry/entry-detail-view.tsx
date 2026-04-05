"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { HeartHandshake, MoonStar } from "lucide-react";

import { Chip } from "@/components/ui/chip";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { DiaryEntry } from "@/lib/types";
import { getMoodTone } from "@/lib/theme/moods";
import { formatEntryDate } from "@/lib/utils/date";
import { arrivalStateOptions, entryModeDefinitions } from "@/lib/constants";

type EntryDetailViewProps = {
  entry: DiaryEntry;
};

export function EntryDetailView({ entry }: EntryDetailViewProps) {
  const reduceMotion = useReducedMotion();
  const modeLabel = entryModeDefinitions.find((definition) => definition.mode === entry.mode)?.title;
  const arrivalStateLabel = arrivalStateOptions.find((option) => option.value === entry.arrivalState)?.label;

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
            {modeLabel ? <Chip tone="soft">{modeLabel}</Chip> : null}
            {arrivalStateLabel ? <Chip tone="soft">Arrived: {arrivalStateLabel}</Chip> : null}
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

          {entry.tomorrowPlan ? (
            <SurfaceCard className="mt-8 p-6">
              <div className="flex items-start gap-3">
                <HeartHandshake className="mt-1 h-5 w-5 text-[var(--text-primary)]" />
                <div className="w-full">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Tomorrow</p>
                  {entry.tomorrowPlan.priorities && entry.tomorrowPlan.priorities.length > 0 ? (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">What matters most</p>
                      <ol className="mt-2 list-decimal space-y-2 pl-5 text-[var(--text-secondary)]">
                        {entry.tomorrowPlan.priorities.map((priority) => (
                          <li key={priority}>{priority}</li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                  {entry.tomorrowPlan.intention ? (
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">How I want to feel:</span> {entry.tomorrowPlan.intention}
                    </p>
                  ) : null}
                  {entry.tomorrowPlan.note ? (
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Note to tomorrow me:</span> {entry.tomorrowPlan.note}
                    </p>
                  ) : null}
                </div>
              </div>
            </SurfaceCard>
          ) : null}

          {entry.closure ? (
            <SurfaceCard className="mt-6 p-6">
              <div className="flex items-start gap-3">
                <MoonStar className="mt-1 h-5 w-5 text-[var(--text-primary)]" />
                <div className="w-full">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Closing the day</p>
                  {entry.closure.summary ? (
                    <div className="mt-4">
                      <Chip tone="accent" style={{ "--chip-accent": "var(--accent-peach)" } as CSSProperties}>
                        {entry.closure.summary}
                      </Chip>
                    </div>
                  ) : null}
                  {entry.closure.carryForward ? (
                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Carry forward:</span> {entry.closure.carryForward}
                    </p>
                  ) : null}
                  {entry.closure.release ? (
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Leave behind:</span> {entry.closure.release}
                    </p>
                  ) : null}
                  {entry.closure.finalNote ? (
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">Final note:</span> {entry.closure.finalNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </SurfaceCard>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
