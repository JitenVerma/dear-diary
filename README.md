# Dear Diary v3

Dear Diary v3 is a calm, reflective journal built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a server-only Notion integration. Entries still live in Notion, while the app now centers everything around a guided Daily Ritual for arriving, writing, releasing, and gently preparing for tomorrow.

## Features

- Animated timeline home with month sections, sticky context, life chapter dividers, and ritual-aware entry cards
- Guided `/entry/new` Daily Ritual flow with check-in, mode selection, writing, tomorrow planning, closing, and completion
- Dedicated `/heatmap` page with mood-colored day tiles and a day detail panel
- Dedicated `/chapters` page with create, edit, and delete flows for life chapters
- Ritual metadata rendered in entry detail views, including arrival state, mode, tomorrow planning, and closing notes
- Notion-backed diary entries fetched only on the server
- Draft persistence for in-progress rituals, plus empty, loading, error, and fallback states throughout

## Tech stack

- Next.js `16.2.2`
- React `19.2.4`
- TypeScript
- Tailwind CSS `4.2.2`
- Framer Motion `12.38.0`
- next-themes `0.4.6`
- lucide-react `1.7.0`
- Notion API `2026-03-11`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and add your Notion credentials:

```bash
cp .env.example .env.local
```

3. Fill in the environment variables:

- `NOTION_API_KEY`: your internal integration secret
- `NOTION_DATA_SOURCE_ID`: recommended, the specific Notion data source ID for the diary
- `NOTION_DATABASE_ID`: optional fallback if you only have the database ID
- `NOTION_VERSION`: optional override, defaults to `2026-03-11`

4. Make sure the Notion integration has access to the diary data source and these capabilities:

- Read content
- Insert content
- Update content
- Read user information

5. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Storage

- Diary entries are stored in Notion.
- The ritual's `Tomorrow` and `Closing the Day` sections are appended into the Notion page body as structured markdown headings, lists, and notes.
- Life chapters are stored in [data/chapters.json](/c:/Users/jiten/Documents/software-projects/dear-diary/data/chapters.json).
- Ritual metadata that does not fit the current Notion schema cleanly, such as mode and arrival state, is stored in [data/entry-rituals.json](/c:/Users/jiten/Documents/software-projects/dear-diary/data/entry-rituals.json).

## Daily Ritual model

The v3 ritual flow extends entries with:

- `mode`: `reflect | unload | plan | rest | free`
- `arrivalState`: `calm | overwhelmed | tired | scattered | okay`
- `tomorrowPlan`: up to 3 priorities, an intention, and an optional note
- `closure`: summary, carry-forward, release, and final note

This metadata is saved server-side and merged into frontend entry models when entries are loaded from Notion.

## Expected Notion schema

Use a Notion data source with these properties:

- `Title` (`title`)
- `Entry Date` (`date`)
- `Mood` (`select`)
- `Tags` (`multi_select`)
- `Favorite` (`checkbox`)
- `Cover Image URL` (`url`)
- `Created Time` (`created_time`)
- `Last Edited Time` (`last_edited_time`)

The full diary content is stored in the Notion page body as markdown.

## Routes

- `/` timeline home
- `/entry/new` Daily Ritual
- `/ritual` alias redirect to the Daily Ritual
- `/entry/[id]` entry detail
- `/heatmap` mood heatmap
- `/chapters` life chapters
- `/new` compatibility redirect

## Project structure

```text
app/
  api/chapters/*
  api/entries/route.ts
  chapters/page.tsx
  entry/[id]/page.tsx
  entry/new/page.tsx
  heatmap/page.tsx
  new/page.tsx
  ritual/page.tsx
  error.tsx
  globals.css
  layout.tsx
  loading.tsx
  not-found.tsx
  page.tsx
components/
  chapters/*
  entry/entry-detail-view.tsx
  form/new-entry-form.tsx
  heatmap/*
  ritual/daily-ritual-flow.tsx
  timeline/*
  ui/*
  site-header.tsx
lib/
  chapters/*
  diary/*
  notion/client.ts
  notion/mappers.ts
  notion/service.ts
  ritual/*
  theme/*
  utils/*
  constants.ts
  types.ts
  validation.ts
data/
  chapters.json
  entry-rituals.json
prd.md
v2/
v3/
```

## Notes

- The browser never calls Notion directly; only the Next.js server does.
- If Notion is not configured yet, the app falls back to graceful sample content so the experience is still explorable.
- Ritual drafts are stored locally in the browser until completion.
- Chapters remain app-managed to keep chapter editing simple and timeline integration lightweight.
- The list view still derives excerpts from Notion markdown. For larger journals, the next step would be storing or caching explicit summaries.
