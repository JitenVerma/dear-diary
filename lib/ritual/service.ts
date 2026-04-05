import "server-only";

import type { DiaryEntry, DiaryEntryPayload } from "@/lib/types";

import type { RitualEntryMetadata } from "./store";
import { readRitualMetadataStore, writeRitualMetadataStore } from "./store";

function hasMeaningfulContent(payload: DiaryEntryPayload) {
  return Boolean(payload.mode || payload.arrivalState || payload.tomorrowPlan || payload.closure);
}

export async function getRitualMetadataByEntryId(entryId: string) {
  const items = await readRitualMetadataStore();
  return items.find((item) => item.entryId === entryId);
}

export async function getRitualMetadataMap() {
  const items = await readRitualMetadataStore();
  return new Map(items.map((item) => [item.entryId, item]));
}

export async function saveRitualMetadata(entryId: string, payload: DiaryEntryPayload) {
  if (!hasMeaningfulContent(payload)) {
    return null;
  }

  const items = await readRitualMetadataStore();
  const timestamp = new Date().toISOString();
  const nextItem: RitualEntryMetadata = {
    entryId,
    mode: payload.mode,
    arrivalState: payload.arrivalState,
    tomorrowPlan: payload.tomorrowPlan,
    closure: payload.closure,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  const index = items.findIndex((item) => item.entryId === entryId);

  if (index >= 0) {
    nextItem.createdAt = items[index].createdAt;
    items[index] = nextItem;
  } else {
    items.push(nextItem);
  }

  await writeRitualMetadataStore(items);
  return nextItem;
}

export function enrichEntryWithRitualMetadata(entry: DiaryEntry, metadata?: RitualEntryMetadata | null): DiaryEntry {
  if (!metadata) {
    return entry;
  }

  return {
    ...entry,
    mode: metadata.mode ?? entry.mode,
    arrivalState: metadata.arrivalState ?? entry.arrivalState,
    tomorrowPlan: entry.tomorrowPlan ?? metadata.tomorrowPlan,
    closure: entry.closure ?? metadata.closure
  };
}
