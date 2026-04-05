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

import type { ArrivalState, DiaryEntry, EntryMode } from "@/lib/types";

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
    mode: "reflect",
    arrivalState: "okay",
    tomorrowPlan: {
      priorities: ["Begin gently", "Write one honest paragraph"],
      intention: "Steady",
      note: "Let small progress count."
    },
    closure: {
      summary: "meaningful",
      carryForward: "The reminder that a beginning can be quiet.",
      release: "The pressure to make the first page perfect.",
      finalNote: "A first sentence is enough tonight."
    },
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
    mode: "unload",
    arrivalState: "overwhelmed",
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
    mode: "rest",
    arrivalState: "calm",
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

export const arrivalStateOptions: Array<{
  value: ArrivalState;
  label: string;
}> = [
  { value: "calm", label: "Calm" },
  { value: "overwhelmed", label: "Overwhelmed" },
  { value: "tired", label: "Tired" },
  { value: "scattered", label: "Scattered" },
  { value: "okay", label: "Okay" }
];

export const closureSummaryOptions = [
  "peaceful",
  "heavy",
  "unfinished",
  "meaningful",
  "tiring",
  "hopeful"
] as const;

export const entryModeDefinitions: Array<{
  mode: EntryMode;
  title: string;
  description: string;
  shortDescription: string;
}> = [
  {
    mode: "reflect",
    title: "Reflect",
    description: "Make sense of your day",
    shortDescription: "Understanding the day with gentle structure."
  },
  {
    mode: "unload",
    title: "Unload",
    description: "Let things out",
    shortDescription: "Release what feels heavy without filtering."
  },
  {
    mode: "plan",
    title: "Plan",
    description: "Prepare for tomorrow",
    shortDescription: "Step toward tomorrow with care and intention."
  },
  {
    mode: "rest",
    title: "Rest",
    description: "Keep it light",
    shortDescription: "A softer, lower-effort ritual for tired days."
  },
  {
    mode: "free",
    title: "Free Write",
    description: "Just write freely",
    shortDescription: "A blank page with no structure unless you ask for it."
  }
];

export const ritualTemplates: Record<EntryMode, string> = {
  reflect: [
    "Today felt like...",
    "",
    "I keep thinking about...",
    "",
    "Something that stayed with me...",
    "",
    "One thing I appreciated...",
    "",
    "Something I am still processing..."
  ].join("\n"),
  unload: [
    "What is on my mind right now...",
    "",
    "I need to get this out...",
    "",
    "What has been weighing on me...",
    "",
    "If I could say anything without filtering..."
  ].join("\n"),
  plan: [
    "Tomorrow, I want to focus on...",
    "",
    "What matters most tomorrow...",
    "",
    "One thing I want to get done...",
    "",
    "How I want to feel tomorrow...",
    "",
    "Something I want to be mindful of..."
  ].join("\n"),
  rest: [
    "Today in one sentence...",
    "",
    "Right now I feel...",
    "",
    "One small thing for tomorrow..."
  ].join("\n"),
  free: ""
};

export const promptLibrary = {
  Reflection: [
    "What surprised me about today?",
    "What did I need more of today?",
    "What felt true underneath the surface?"
  ],
  "Difficult days": [
    "What feels hardest to hold tonight?",
    "What would I say if I did not need to make this sound okay?",
    "What do I need to forgive myself for today?"
  ],
  Gratitude: [
    "One gentle thing I want to remember from today...",
    "Where did I feel supported?",
    "What made the day softer?"
  ],
  Growth: [
    "What am I learning about myself lately?",
    "Where did I show up with more care than usual?",
    "What feels different in me now?"
  ],
  "Tomorrow planning": [
    "If tomorrow could feel simpler, what would help?",
    "What matters most for tomorrow me?",
    "What can I release so tomorrow starts lighter?"
  ]
} as const;
