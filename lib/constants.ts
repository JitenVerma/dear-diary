export const moodOptions = [
  "Joyful",
  "Reflective",
  "Calm",
  "Hopeful",
  "Tender",
  "Melancholy",
  "Grateful",
  "Restless"
] as const;

import type { DiaryEntry } from "@/lib/types";

export const sampleEntriesFallback: DiaryEntry[] = [
  {
    id: "welcome-entry",
    title: "A quiet beginning",
    entryDate: "2026-04-04",
    excerpt:
      "The first page of this diary is waiting for a memory, a mood, and a small piece of who you were today.",
    body: "Your story starts here. Create your first Dear Diary entry to replace this placeholder with your own memory.",
    mood: "Reflective",
    tags: ["Beginnings", "Sample"],
    favorite: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-04T09:00:00.000Z",
    updatedAt: "2026-04-04T09:00:00.000Z"
  },
  {
    id: "healing-walk",
    title: "The long way home",
    entryDate: "2026-03-18",
    excerpt:
      "I walked without music tonight and the quiet felt less empty than it used to. The streetlights made everything gentler.",
    body: "I took the long way home and let the evening settle around me. There was no breakthrough, just a softer version of the same thoughts, and somehow that felt like progress.",
    mood: "Calm",
    tags: ["Evening", "Healing"],
    favorite: false,
    coverImageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-03-18T10:20:00.000Z",
    updatedAt: "2026-03-18T10:20:00.000Z"
  },
  {
    id: "small-joys",
    title: "A table by the window",
    entryDate: "2026-02-11",
    excerpt:
      "Coffee, rain on the glass, and the feeling that maybe ordinary days can still be lovely enough to remember.",
    body: "I found a table by the window and stayed longer than I meant to. There was rain, a notebook, and that lovely feeling that nothing urgent was asking anything of me.",
    mood: "Grateful",
    tags: ["Cafe", "Small joys"],
    favorite: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-02-11T03:10:00.000Z",
    updatedAt: "2026-02-11T03:10:00.000Z"
  }
];

export const chapterThemeOptions = [
  "#A8B89A",
  "#D8A7A0",
  "#E5B88A",
  "#A9BDD1",
  "#B9AEC7",
  "#D9C08D"
] as const;
