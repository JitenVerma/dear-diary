# Dear Diary v2

Dear Diary v2 is a warm, reflective journal built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and a server-only Notion integration. Entries still live in Notion, but the product now adds a mood heatmap, editable life chapters, and a broader sanctuary-style design system.

## Features

- Animated timeline home with month sections, sticky context, and life chapter dividers
- Dedicated `/heatmap` page with mood-colored day tiles and a day detail drawer
- Dedicated `/chapters` page with create, edit, and delete flows
- Refined `/entry/new` writing experience and calmer detail reading view
- Light and dark themes with light mode as the default emotional tone
- Notion-backed diary entries fetched only on the server
- Empty, loading, error, and fallback states throughout

## Tech stack

- Next.js `16.2.2`
- React `19.2.4`
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

4. Make sure the Notion integration has access to the diary database/data source and these capabilities:

- Read content
- Insert content
- Update content
- Read user information

5. Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Additional v2 storage

Life chapters are stored separately from Notion in [data/chapters.json](/c:/Users/jiten/Documents/software-projects/dear-diary/data/chapters.json). This keeps chapter editing lightweight for v2 and makes timeline integration simpler.

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
  error.tsx
  globals.css
  layout.tsx
  loading.tsx
  not-found.tsx
  page.tsx
components/
  chapters/chapter-studio.tsx
  entry/entry-detail-view.tsx
  form/new-entry-form.tsx
  heatmap/*
  timeline/*
  site-header.tsx
lib/
  chapters/*
  diary/*
  notion/client.ts
  notion/mappers.ts
  notion/service.ts
  theme/*
  utils/*
  constants.ts
  types.ts
  validation.ts
data/
  chapters.json
prd.md
```

## Notes

- The browser never calls Notion directly; only the Next.js server does.
- If Notion is not configured yet, the homepage falls back to a graceful sample entry so the UI is still explorable.
- The heatmap uses a deterministic dominant-mood rule: most frequent mood for a day, with a stable fallback.
- Chapter overlap is intentionally blocked in v2 to keep the timeline readable and the chapter logic simple.
- The list view still derives excerpts from the page markdown. For much larger journals, the next step would be storing or caching explicit summaries.
