import "server-only";

import type { DiaryEntry, DiaryEntryPayload } from "@/lib/types";
import { appendRitualMarkdown } from "@/lib/ritual/markdown";
import {
  enrichEntryWithRitualMetadata,
  getRitualMetadataByEntryId,
  getRitualMetadataMap,
  saveRitualMetadata
} from "@/lib/ritual/service";

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
  const ritualMetadataMap = await getRitualMetadataMap();

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

  return response.results.map((page) =>
    enrichEntryWithRitualMetadata(
      mapNotionPageToDiaryEntry(page, markdownById.get(page.id)),
      ritualMetadataMap.get(page.id)
    )
  );
}

export async function getDiaryEntryById(id: string): Promise<DiaryEntry | null> {
  try {
    const [page, markdown, ritualMetadata] = await Promise.all([
      retrieveDiaryPage(id),
      fetchEntryMarkdown(id),
      getRitualMetadataByEntryId(id)
    ]);
    return enrichEntryWithRitualMetadata(mapNotionPageToDiaryEntry(page, markdown), ritualMetadata);
  } catch {
    return null;
  }
}

export async function createDiaryEntry(payload: DiaryEntryPayload): Promise<DiaryEntry> {
  const createdPage = await createDiaryPage({
    ...payload,
    body: appendRitualMarkdown({
      body: payload.body,
      tomorrowPlan: payload.tomorrowPlan,
      closure: payload.closure
    })
  });
  const [markdown, ritualMetadata] = await Promise.all([
    fetchEntryMarkdown(createdPage.id),
    saveRitualMetadata(createdPage.id, payload)
  ]);

  return enrichEntryWithRitualMetadata(mapNotionPageToDiaryEntry(createdPage, markdown), ritualMetadata);
}
