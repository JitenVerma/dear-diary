import "server-only";

type NotionRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type NotionDatabaseResponse = {
  id: string;
  data_sources?: Array<{
    id: string;
    name?: string;
  }>;
};

export type NotionMarkdownResponse = {
  object: "page_markdown";
  id: string;
  markdown: string;
  truncated: boolean;
  unknown_block_ids: string[];
};

export type NotionPageResponse = {
  object: "page";
  id: string;
  url: string;
  created_time: string;
  last_edited_time: string;
  cover?: {
    type: "external" | "file";
    external?: { url: string };
    file?: { url: string };
  } | null;
  properties: Record<string, unknown>;
};

export type NotionQueryResponse = {
  object: "list";
  results: NotionPageResponse[];
  next_cursor: string | null;
  has_more: boolean;
};

const NOTION_API_BASE_URL = "https://api.notion.com/v1";
const DEFAULT_NOTION_VERSION = process.env.NOTION_VERSION ?? "2026-03-11";
const DIARY_ENTRIES_TAG = "diary-entries";

class NotionApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "NotionApiError";
    this.status = status;
  }
}

function getNotionConfig() {
  const apiKey = process.env.NOTION_API_KEY;
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey) {
    throw new Error("Missing `NOTION_API_KEY`. Add it to your environment to connect Dear Diary to Notion.");
  }

  if (!dataSourceId && !databaseId) {
    throw new Error(
      "Missing `NOTION_DATA_SOURCE_ID` or `NOTION_DATABASE_ID`. Add one of them so the app knows where your diary lives."
    );
  }

  return { apiKey, dataSourceId, databaseId };
}

async function notionFetch<T>(path: string, init?: NotionRequestInit): Promise<T> {
  const { apiKey } = getNotionConfig();

  const response = await fetch(`${NOTION_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": DEFAULT_NOTION_VERSION,
      ...init?.headers
    }
  });

  const json = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    const message =
      typeof json.message === "string"
        ? json.message
        : "Something went wrong while talking to Notion.";
    throw new NotionApiError(message, response.status);
  }

  return json as T;
}

let resolvedDataSourcePromise: Promise<string> | null = null;

async function resolveDataSourceFromDatabase(databaseId: string) {
  const response = await notionFetch<NotionDatabaseResponse>(`/databases/${databaseId}`, {
    next: {
      revalidate: 3600,
      tags: [DIARY_ENTRIES_TAG]
    }
  });

  const dataSourceId = response.data_sources?.[0]?.id;

  if (!dataSourceId) {
    throw new Error(
      "The Notion database is missing a readable data source. Copy the data source ID from Notion and set `NOTION_DATA_SOURCE_ID`."
    );
  }

  return dataSourceId;
}

export async function getDiaryDataSourceId() {
  const { dataSourceId, databaseId } = getNotionConfig();

  if (dataSourceId) {
    return dataSourceId;
  }

  if (!databaseId) {
    throw new Error("No Notion parent ID was provided.");
  }

  if (!resolvedDataSourcePromise) {
    resolvedDataSourcePromise = resolveDataSourceFromDatabase(databaseId);
  }

  return resolvedDataSourcePromise;
}

export async function queryDiaryPages() {
  const dataSourceId = await getDiaryDataSourceId();
  const filterProperties = [
    "Title",
    "Entry Date",
    "Mood",
    "Tags",
    "Favorite",
    "Cover Image URL",
    "Created Time",
    "Last Edited Time"
  ];
  const searchParams = new URLSearchParams();

  filterProperties.forEach((property) => {
    searchParams.append("filter_properties[]", property);
  });

  return notionFetch<NotionQueryResponse>(`/data_sources/${dataSourceId}/query?${searchParams.toString()}`, {
    method: "POST",
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        {
          property: "Entry Date",
          direction: "descending"
        },
        {
          timestamp: "created_time",
          direction: "descending"
        }
      ]
    }),
    next: {
      revalidate: 300,
      tags: [DIARY_ENTRIES_TAG]
    }
  });
}

export async function retrieveDiaryPage(pageId: string) {
  return notionFetch<NotionPageResponse>(`/pages/${pageId}`, {
    next: {
      revalidate: 300,
      tags: [DIARY_ENTRIES_TAG, `diary-entry-${pageId}`]
    }
  });
}

export async function retrieveDiaryMarkdown(pageId: string) {
  return notionFetch<NotionMarkdownResponse>(`/pages/${pageId}/markdown`, {
    next: {
      revalidate: 300,
      tags: [DIARY_ENTRIES_TAG, `diary-entry-${pageId}`]
    }
  });
}

export async function createDiaryPage(payload: {
  title: string;
  entryDate: string;
  mood?: string;
  tags?: string[];
  body: string;
  coverImageUrl?: string;
  favorite?: boolean;
}) {
  const dataSourceId = await getDiaryDataSourceId();

  return notionFetch<NotionPageResponse>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: {
        data_source_id: dataSourceId
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: payload.title
              }
            }
          ]
        },
        "Entry Date": {
          date: {
            start: payload.entryDate
          }
        },
        Mood: {
          select: payload.mood ? { name: payload.mood } : null
        },
        Tags: {
          multi_select: (payload.tags ?? []).map((tag) => ({ name: tag }))
        },
        Favorite: {
          checkbox: payload.favorite ?? false
        },
        "Cover Image URL": {
          url: payload.coverImageUrl || null
        }
      },
      markdown: payload.body
    }),
    next: {
      revalidate: 0
    }
  });
}

export { DIARY_ENTRIES_TAG, NotionApiError };
