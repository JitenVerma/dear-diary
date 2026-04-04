import type { DiaryEntry, DiaryEntrySummary, HeatmapDay, LifeChapter, TimelineGroup } from "@/lib/types";
import {
  compareDiaryDates,
  endOfMonth,
  enumerateDays,
  getMonthKey,
  getMonthLabel,
  isDateInRange,
  startOfMonth
} from "@/lib/utils/date";

function toEntrySummary(entry: DiaryEntry): DiaryEntrySummary {
  return {
    id: entry.id,
    title: entry.title,
    excerpt: entry.excerpt,
    mood: entry.mood,
    tags: entry.tags,
    favorite: entry.favorite
  };
}

export function getDominantMood(entries: DiaryEntry[]) {
  const moods = new Map<string, { count: number; firstSeen: string }>();

  for (const entry of entries) {
    if (!entry.mood) {
      continue;
    }

    const normalized = entry.mood;
    const current = moods.get(normalized);

    if (current) {
      current.count += 1;
      continue;
    }

    moods.set(normalized, { count: 1, firstSeen: entry.createdAt ?? entry.entryDate });
  }

  return [...moods.entries()]
    .sort((a, b) => {
      if (b[1].count !== a[1].count) {
        return b[1].count - a[1].count;
      }

      return compareDiaryDates(a[1].firstSeen, b[1].firstSeen);
    })[0]?.[0];
}

export function buildHeatmapDays(entries: DiaryEntry[], monthsBack = 6): HeatmapDay[] {
  const sortedEntries = [...entries].sort((a, b) => compareDiaryDates(a.entryDate, b.entryDate));
  const latestEntryDate = sortedEntries.at(-1)?.entryDate ?? new Date().toISOString().slice(0, 10);
  const latestDate = endOfMonth(latestEntryDate);
  const earliestDate = startOfMonth(addMonths(latestDate, -(monthsBack - 1)));

  const entryMap = new Map<string, DiaryEntry[]>();

  for (const entry of sortedEntries) {
    const bucket = entryMap.get(entry.entryDate);
    if (bucket) {
      bucket.push(entry);
      continue;
    }

    entryMap.set(entry.entryDate, [entry]);
  }

  return enumerateDays(earliestDate, latestDate).map((date) => {
    const dayEntries = entryMap.get(date) ?? [];

    return {
      date,
      entryCount: dayEntries.length,
      dominantMood: getDominantMood(dayEntries),
      entries: dayEntries.map(toEntrySummary)
    };
  });
}

export function groupEntriesIntoTimeline(entries: DiaryEntry[], chapters: LifeChapter[]): TimelineGroup[] {
  const chapterByMonth = new Map<string, LifeChapter>();

  for (const chapter of chapters) {
    const rangeEnd = chapter.endDate ?? new Date().toISOString().slice(0, 10);
    for (const date of enumerateDays(startOfMonth(chapter.startDate), endOfMonth(rangeEnd))) {
      chapterByMonth.set(getMonthKey(date), chapter);
    }
  }

  const map = new Map<string, TimelineGroup>();

  for (const entry of entries) {
    const key = getMonthKey(entry.entryDate);
    const existing = map.get(key);

    if (existing) {
      existing.entries.push(entry);
      continue;
    }

    map.set(key, {
      key,
      label: getMonthLabel(entry.entryDate),
      entries: [entry],
      chapter: chapterByMonth.get(key)
    });
  }

  return [...map.values()];
}

export function getChapterForEntry(entryDate: string, chapters: LifeChapter[]) {
  return chapters.find((chapter) => isDateInRange(entryDate, chapter.startDate, chapter.endDate));
}

export function countEntriesInChapter(chapter: LifeChapter, entries: DiaryEntry[]) {
  return entries.filter((entry) => isDateInRange(entry.entryDate, chapter.startDate, chapter.endDate)).length;
}

function addMonths(date: string, amount: number) {
  const [year, month] = date.split("-").map(Number);
  const next = new Date(Date.UTC(year, month - 1 + amount, 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}-01`;
}
