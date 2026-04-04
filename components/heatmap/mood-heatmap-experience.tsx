"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { DayDetailPanel } from "@/components/heatmap/day-detail-panel";
import { MoodLegend } from "@/components/heatmap/mood-legend";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { HeatmapDay } from "@/lib/types";
import { getMoodTone } from "@/lib/theme/moods";
import { getMonthLabel, getMonthShortLabel, getWeekdayLabel, parseDiaryDate } from "@/lib/utils/date";

type MoodHeatmapExperienceProps = {
  days: HeatmapDay[];
};

type MonthGroup = {
  key: string;
  label: string;
  days: HeatmapDay[];
};

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekdayColumn(date: string) {
  const day = parseDiaryDate(date).getUTCDay();
  return day === 0 ? 6 : day - 1;
}

function groupByMonth(days: HeatmapDay[]): MonthGroup[] {
  const months = new Map<string, MonthGroup>();

  for (const day of days) {
    const key = day.date.slice(0, 7);
    const existing = months.get(key);

    if (existing) {
      existing.days.push(day);
      continue;
    }

    months.set(key, {
      key,
      label: getMonthLabel(day.date),
      days: [day]
    });
  }

  return [...months.values()];
}

export function MoodHeatmapExperience({ days }: MoodHeatmapExperienceProps) {
  const [selectedDate, setSelectedDate] = useState(days.find((day) => day.entryCount > 0)?.date ?? days.at(-1)?.date);

  const months = useMemo(() => groupByMonth(days).reverse(), [days]);
  const selectedDay = useMemo(() => days.find((day) => day.date === selectedDate) ?? null, [days, selectedDate]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_28rem]">
        <div className="space-y-6">
          <MoodLegend />

          <SurfaceCard className="overflow-hidden p-5 md:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Recent months</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  Each tile holds the emotional tone of a day. Empty days remain visible so time still feels continuous.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] px-4 py-2 text-sm text-[var(--text-secondary)]">
                <CalendarDays className="h-4 w-4" />
                {days.filter((day) => day.entryCount > 0).length} written days
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {months.map((month) => (
                <section key={month.key} className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--bg-surface-secondary)] p-4">
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl leading-none text-[var(--text-primary)]">{month.label}</h2>
                      <p className="mt-1 text-sm text-[var(--text-tertiary)]">{month.days.filter((day) => day.entryCount > 0).length} written days</p>
                    </div>
                    <span className="text-sm uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                      {getMonthShortLabel(month.days[0].date)}
                    </span>
                  </div>

                  <div className="mb-3 grid grid-cols-7 gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
                    {weekdayLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {month.days[0] ? Array.from({ length: getWeekdayColumn(month.days[0].date) }).map((_, index) => <span key={`spacer-${index}`} aria-hidden="true" />) : null}
                    {month.days.map((day) => {
                      const isSelected = day.date === selectedDate;
                      const entryLabel =
                        day.entryCount > 0
                          ? `${day.entryCount} ${day.entryCount === 1 ? "entry" : "entries"}`
                          : "No entries";
                      const moodLabel = day.dominantMood ? ` Dominant mood: ${day.dominantMood}.` : "";

                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.date);
                          }}
                          className="group rounded-[14px] p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-peach)]"
                          aria-label={`${getWeekdayLabel(day.date)}, ${getMonthLabel(day.date)} ${parseDiaryDate(day.date).getUTCDate()}. ${entryLabel}.${moodLabel}`}
                        >
                          <span
                            className="flex h-10 w-full items-center justify-center rounded-[12px] border text-xs transition duration-[var(--motion-fast)] ease-[var(--ease-soft)] group-hover:scale-105"
                            style={{
                              backgroundColor:
                                day.entryCount > 0
                                  ? getMoodTone(day.dominantMood)
                                  : "var(--bg-surface-primary)",
                              borderColor: isSelected ? "var(--accent-peach)" : "var(--border-soft)",
                              boxShadow: isSelected ? "0 0 0 2px color-mix(in oklab, var(--accent-peach) 40%, transparent)" : "none",
                              color: "var(--text-primary)",
                              opacity: day.entryCount > 0 ? Math.min(0.8 + day.entryCount * 0.07, 1) : 1
                            }}
                          >
                            {parseDiaryDate(day.date).getUTCDate()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </SurfaceCard>
        </div>

        <DayDetailPanel day={selectedDay} />
      </div>
    </div>
  );
}
