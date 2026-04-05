import type { DiaryEntryPayload, EntryMode } from "@/lib/types";

const modeLabels: Record<EntryMode, string> = {
  reflect: "Reflect",
  unload: "Unload",
  plan: "Plan",
  rest: "Rest",
  free: "Free Write"
};

function firstMeaningfulLine(body: string) {
  return body
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.endsWith("..."));
}

export function deriveEntryTitle(payload: DiaryEntryPayload) {
  const explicitTitle = payload.title?.trim();

  if (explicitTitle) {
    return explicitTitle;
  }

  const firstLine = firstMeaningfulLine(payload.body);

  if (firstLine) {
    return firstLine.length > 72 ? `${firstLine.slice(0, 69).trimEnd()}...` : firstLine;
  }

  if (payload.mode) {
    return `${modeLabels[payload.mode]} · ${payload.entryDate}`;
  }

  return `Entry · ${payload.entryDate}`;
}
