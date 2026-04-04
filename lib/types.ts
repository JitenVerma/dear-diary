export type DiaryEntry = {
  id: string;
  title: string;
  entryDate: string;
  excerpt: string;
  body?: string;
  mood?: string;
  tags?: string[];
  favorite?: boolean;
  coverImageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type DiaryEntryPayload = {
  title: string;
  entryDate: string;
  mood?: string;
  tags?: string[];
  body: string;
  coverImageUrl?: string;
  favorite?: boolean;
};

export type DiaryEntrySummary = Pick<DiaryEntry, "id" | "title" | "excerpt" | "mood" | "tags" | "favorite">;

export type HeatmapDay = {
  date: string;
  entryCount: number;
  dominantMood?: string;
  entries: DiaryEntrySummary[];
};

export type LifeChapter = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
  themeColor?: string;
  createdAt: string;
  updatedAt: string;
};

export type LifeChapterPayload = {
  title: string;
  startDate: string;
  endDate?: string;
  description?: string;
  themeColor?: string;
};

export type TimelineGroup = {
  key: string;
  label: string;
  entries: DiaryEntry[];
  chapter?: LifeChapter;
};
