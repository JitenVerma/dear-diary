import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { LifeChapter } from "@/lib/types";

const dataDirectory = path.join(process.cwd(), "data");
const chaptersPath = path.join(dataDirectory, "chapters.json");

async function ensureChaptersFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(chaptersPath, "utf8");
  } catch {
    await writeFile(chaptersPath, "[]", "utf8");
  }
}

export async function readChaptersStore() {
  await ensureChaptersFile();
  const content = await readFile(chaptersPath, "utf8");
  return JSON.parse(content) as LifeChapter[];
}

export async function writeChaptersStore(chapters: LifeChapter[]) {
  await ensureChaptersFile();
  await writeFile(chaptersPath, JSON.stringify(chapters, null, 2), "utf8");
}
