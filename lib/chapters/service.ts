import "server-only";

import type { LifeChapter, LifeChapterPayload } from "@/lib/types";

import { compareDiaryDates } from "@/lib/utils/date";

import { readChaptersStore, writeChaptersStore } from "./store";

function ensureNoOverlap(chapters: LifeChapter[], nextChapter: LifeChapter, ignoreId?: string) {
  const nextEndDate = nextChapter.endDate ?? "9999-12-31";

  const overlapping = chapters.find((chapter) => {
    if (chapter.id === ignoreId) {
      return false;
    }

    const chapterEndDate = chapter.endDate ?? "9999-12-31";

    return !(nextEndDate < chapter.startDate || nextChapter.startDate > chapterEndDate);
  });

  if (overlapping) {
    throw new Error(`"${nextChapter.title}" overlaps with the existing chapter "${overlapping.title}".`);
  }
}

export async function getLifeChapters() {
  const chapters = await readChaptersStore();
  return [...chapters].sort((a, b) => compareDiaryDates(b.startDate, a.startDate));
}

export async function createLifeChapter(payload: LifeChapterPayload) {
  const chapters = await readChaptersStore();
  const timestamp = new Date().toISOString();

  const chapter: LifeChapter = {
    id: crypto.randomUUID(),
    title: payload.title,
    startDate: payload.startDate,
    endDate: payload.endDate || undefined,
    description: payload.description || undefined,
    themeColor: payload.themeColor || undefined,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  ensureNoOverlap(chapters, chapter);
  chapters.push(chapter);
  await writeChaptersStore(chapters);

  return chapter;
}

export async function updateLifeChapter(id: string, payload: LifeChapterPayload) {
  const chapters = await readChaptersStore();
  const index = chapters.findIndex((chapter) => chapter.id === id);

  if (index === -1) {
    throw new Error("That chapter could not be found.");
  }

  const updatedChapter: LifeChapter = {
    ...chapters[index],
    title: payload.title,
    startDate: payload.startDate,
    endDate: payload.endDate || undefined,
    description: payload.description || undefined,
    themeColor: payload.themeColor || undefined,
    updatedAt: new Date().toISOString()
  };

  ensureNoOverlap(chapters, updatedChapter, id);
  chapters[index] = updatedChapter;
  await writeChaptersStore(chapters);

  return updatedChapter;
}

export async function deleteLifeChapter(id: string) {
  const chapters = await readChaptersStore();
  const nextChapters = chapters.filter((chapter) => chapter.id !== id);

  if (nextChapters.length === chapters.length) {
    throw new Error("That chapter could not be found.");
  }

  await writeChaptersStore(nextChapters);
}
