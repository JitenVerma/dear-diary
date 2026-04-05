export type EntryMode = "reflect" | "unload" | "plan" | "rest" | "free";

export type ArrivalState = "calm" | "overwhelmed" | "tired" | "scattered" | "okay";

export type TomorrowPlan = {
  priorities?: string[];
  intention?: string;
  note?: string;
};

export type DayClosure = {
  summary?: string;
  carryForward?: string;
  release?: string;
  finalNote?: string;
};

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
  mode?: EntryMode;
  arrivalState?: ArrivalState;
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
};

export type DiaryEntryPayload = {
  title?: string;
  entryDate: string;
  mood?: string;
  tags?: string[];
  body: string;
  coverImageUrl?: string;
  favorite?: boolean;
  mode?: EntryMode;
  arrivalState?: ArrivalState;
  tomorrowPlan?: TomorrowPlan;
  closure?: DayClosure;
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
