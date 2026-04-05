import type { DiaryEntry } from "@/lib/types";
import { extractRitualMarkdown } from "@/lib/ritual/markdown";

import type { NotionPageResponse } from "./client";

type RichTextItem = {
  plain_text?: string;
};

type TitleProperty = {
  title?: RichTextItem[];
};

type DateProperty = {
  date?: {
    start?: string;
  } | null;
};

type SelectProperty = {
  select?: {
    name?: string;
  } | null;
};

type MultiSelectProperty = {
  multi_select?: Array<{
    name?: string;
  }>;
};

type CheckboxProperty = {
  checkbox?: boolean;
};

type UrlProperty = {
  url?: string | null;
};

function getProperty<T>(page: NotionPageResponse, propertyName: string) {
  return page.properties[propertyName] as T | undefined;
}

function plainText(items?: RichTextItem[]) {
  return (items ?? []).map((item) => item.plain_text ?? "").join("").trim();
}

function normalizeNotionMarkdown(markdown?: string) {
  if (!markdown) {
    return undefined;
  }

  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/(?:\n?\s*<empty-block\/>\s*)+$/g, "")
    .trimEnd();
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#~\-]+/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFromMarkdown(markdown?: string) {
  const content = stripMarkdown(markdown ?? "");
  if (!content) {
    return "A quiet page waiting to be revisited.";
  }

  return content.length > 180 ? `${content.slice(0, 177).trimEnd()}...` : content;
}

function resolveCoverImage(page: NotionPageResponse) {
  const coverProperty = getProperty<UrlProperty>(page, "Cover Image URL");

  if (coverProperty?.url) {
    return coverProperty.url;
  }

  if (page.cover?.type === "external") {
    return page.cover.external?.url ?? null;
  }

  if (page.cover?.type === "file") {
    return page.cover.file?.url ?? null;
  }

  return null;
}

export function mapNotionPageToDiaryEntry(page: NotionPageResponse, markdown?: string): DiaryEntry {
  const titleProperty = getProperty<TitleProperty>(page, "Title");
  const entryDateProperty = getProperty<DateProperty>(page, "Entry Date");
  const moodProperty = getProperty<SelectProperty>(page, "Mood");
  const tagsProperty = getProperty<MultiSelectProperty>(page, "Tags");
  const favoriteProperty = getProperty<CheckboxProperty>(page, "Favorite");

  const title = plainText(titleProperty?.title) || "Untitled Memory";
  const normalizedMarkdown = normalizeNotionMarkdown(markdown);
  const ritualAwareContent = extractRitualMarkdown(normalizedMarkdown);
  const body = ritualAwareContent.body?.trim() || undefined;

  return {
    id: page.id,
    title,
    entryDate: entryDateProperty?.date?.start ?? page.created_time,
    excerpt: excerptFromMarkdown(body),
    body,
    mood: moodProperty?.select?.name,
    tags:
      tagsProperty?.multi_select
        ?.map((tag) => tag.name)
        .filter((tag): tag is string => Boolean(tag && tag.trim())) ?? [],
    favorite: favoriteProperty?.checkbox ?? false,
    coverImageUrl: resolveCoverImage(page),
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
    tomorrowPlan: ritualAwareContent.tomorrowPlan,
    closure: ritualAwareContent.closure
  };
}
