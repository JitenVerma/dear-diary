import "server-only";

import { getLifeChapters } from "@/lib/chapters/service";
import { sampleEntriesFallback } from "@/lib/constants";
import { getDiaryEntries } from "@/lib/notion/service";

export async function getTimelineData() {
  let usingFallback = false;
  let errorMessage = "";

  const chapters = await getLifeChapters();

  try {
    const entries = await getDiaryEntries();
    return { entries, chapters, usingFallback, errorMessage };
  } catch (error) {
    usingFallback = true;
    errorMessage =
      error instanceof Error ? error.message : "Dear Diary could not load entries from Notion right now.";

    return {
      entries: [...sampleEntriesFallback],
      chapters,
      usingFallback,
      errorMessage
    };
  }
}
