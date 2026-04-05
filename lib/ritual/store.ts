import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ArrivalState, DayClosure, EntryMode, TomorrowPlan } from "@/lib/types";

export type RitualEntryMetadata = {
  entryId: string;
  mode?: EntryMode;
  arrivalState?: ArrivalState;
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
  createdAt: string;
  updatedAt: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const ritualMetadataPath = path.join(dataDirectory, "entry-rituals.json");

async function ensureRitualMetadataFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(ritualMetadataPath, "utf8");
  } catch {
    await writeFile(ritualMetadataPath, "[]", "utf8");
  }
}

export async function readRitualMetadataStore() {
  await ensureRitualMetadataFile();
  const content = await readFile(ritualMetadataPath, "utf8");
  return JSON.parse(content) as RitualEntryMetadata[];
}

export async function writeRitualMetadataStore(items: RitualEntryMetadata[]) {
  await ensureRitualMetadataFile();
  await writeFile(ritualMetadataPath, JSON.stringify(items, null, 2), "utf8");
}
