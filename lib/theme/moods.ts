import type { CSSProperties } from "react";

import type { DiaryEntry, LifeChapter } from "@/lib/types";

const moodToneMap: Record<string, string> = {
  joyful: "var(--mood-happy)",
  hopeful: "var(--mood-happy)",
  calm: "var(--mood-calm)",
  reflective: "var(--mood-neutral)",
  tender: "var(--mood-rose)",
  melancholy: "var(--mood-sad)",
  restless: "var(--mood-stressed)",
  grateful: "var(--mood-grateful)"
};

export function getMoodTone(mood?: string) {
  if (!mood) {
    return "var(--mood-neutral)";
  }

  return moodToneMap[mood.toLowerCase()] ?? "var(--mood-neutral)";
}

export function getChapterTone(chapter?: LifeChapter) {
  return chapter?.themeColor ?? "var(--accent-sage)";
}

export function entryAccentStyle(entry: DiaryEntry, chapter?: LifeChapter) {
  return {
    "--entry-accent": chapter?.themeColor ?? getMoodTone(entry.mood)
  } as CSSProperties;
}
