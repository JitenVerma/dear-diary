import "server-only";

import type { DiaryEntry, DiaryEntryPayload } from "@/lib/types";

import {
  createDiaryPage,
  queryDiaryPages,
  retrieveDiaryMarkdown,
  retrieveDiaryPage
} from "./client";
import { mapNotionPageToDiaryEntry } from "./mappers";

async function fetchEntryMarkdown(pageId: string) {
  const markdown = await retrieveDiaryMarkdown(pageId);
  return markdown.markdown;
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  const response = await queryDiaryPages();

  const markdownResults = await Promise.allSettled(
    response.results.map(async (page) => ({
      id: page.id,
      markdown: await fetchEntryMarkdown(page.id)
    }))
  );

  const markdownById = new Map<string, string>();

  for (const result of markdownResults) {
    if (result.status === "fulfilled") {
      markdownById.set(result.value.id, result.value.markdown);
    }
  }

  return response.results.map((page) => mapNotionPageToDiaryEntry(page, markdownById.get(page.id)));
}

export async function getDiaryEntryById(id: string): Promise<DiaryEntry | null> {
  try {
    const [page, markdown] = await Promise.all([retrieveDiaryPage(id), fetchEntryMarkdown(id)]);
    return mapNotionPageToDiaryEntry(page, markdown);
  } catch {
    return null;
  }
}

export async function createDiaryEntry(payload: DiaryEntryPayload): Promise<DiaryEntry> {
  const createdPage = await createDiaryPage(payload);
  const markdown = await fetchEntryMarkdown(createdPage.id);
  return mapNotionPageToDiaryEntry(createdPage, markdown);
}
