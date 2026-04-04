Absolutely — here’s a **detailed PRD for Dear Diary v2** built around the three focus areas you chose:

1. **Mood-based heatmap**
2. **Life chapters**
3. **UI/UX and emotional design refinement**

I’ve written it so it is usable as both:

* a real product requirements document
* a strong input for Codex / implementation planning

I’ve also made a few sensible assumptions so we can keep momentum.

---

# PRD — Dear Diary v2

## 1. Overview

Dear Diary v2 expands the product beyond a beautiful journaling timeline into a more emotionally intelligent and visually distinctive memory experience.

Version 1 establishes the core flow: users can create diary entries, store them in Notion, and browse them on an animated timeline. Version 2 builds on that foundation by introducing new ways for users to reflect on their lives, define meaningful periods of time, and feel emotionally safe and comfortable while using the product.

The three major areas of focus in v2 are:

* **Mood Heatmap**: a separate visual page that allows users to explore their emotional patterns over time and click into specific days to read the diary entries written on those days.
* **Life Chapters**: a feature that allows users to define meaningful periods in their life, such as “University”, “Healing Era”, or “New Beginnings”, and see those chapters integrated elegantly into the timeline experience.
* **UI/UX and Design Evolution**: a major refinement of the visual design, interaction quality, and emotional tone of the application so that Dear Diary feels warm, calming, safe, and visually memorable.

Dear Diary v2 should not feel like a feature dump. It should feel like a more mature expression of the same product vision: a diary app where time becomes something the user can see, feel, and reflect on.

---

## 2. Product Vision

Dear Diary helps users experience their memories as a living, beautiful flow through time rather than a stack of disconnected notes.

Version 2 deepens that vision by helping users:

* understand how they have felt over time
* assign meaning to periods of life
* interact with the application in a space that feels emotionally soft, warm, and safe

---

## 3. Problem Statement

Most journaling tools do one of two things:

* they focus on plain storage and text entry
* or they add analytics in a cold, clinical, or productivity-oriented way

This leaves a gap in the market for a journaling application that helps users reflect on their emotions and life periods in a visually rich, emotionally supportive environment.

Users need:

* a way to visually understand mood patterns over time
* a way to define and revisit meaningful “eras” of life
* a journaling interface that feels calming, private, and emotionally welcoming

Dear Diary v2 aims to solve this by combining visual reflection tools with emotionally thoughtful design.

---

## 4. Goals

### 4.1 Primary Goals

* Introduce a separate **Mood Heatmap page** that visualizes diary activity and emotional patterns across time
* Allow users to click a heatmap tile and view the diary entries for that selected day
* Introduce **Life Chapters**, enabling users to define named periods of time and see them visually integrated into the timeline
* Improve the overall **UI/UX and visual design** of the application so the app feels more emotionally comforting, premium, and cohesive

### 4.2 Secondary Goals

* Increase the emotional resonance of the product
* Encourage deeper reflection and repeat usage
* Improve the product’s visual identity and differentiation
* Create a stronger design foundation for future features such as yearly recaps, “On This Day”, and AI-generated reflection summaries

---

## 5. Non-Goals

The following are explicitly out of scope for v2 unless otherwise noted later:

* AI-generated summaries of entries
* semantic search
* audio diary support
* multi-user collaboration
* public sharing/social features
* notifications/reminders
* chapter analytics beyond basic counts
* advanced mood analysis beyond per-day mapping
* offline support
* major auth/platform rework

This version should remain focused on reflection, structure, and emotional design quality.

---

## 6. Target User

### Primary User

A user who journals for emotional reflection, memory keeping, or self-understanding, and who values beauty, calmness, and meaningful visual design.

### User Characteristics

* wants a private place to write and think
* may journal regularly or irregularly
* values emotional safety and comfort
* wants to revisit the past in a meaningful way
* responds positively to warm, premium, non-corporate design

### Core Emotional Need

The app must feel like a space where the user can safely place their thoughts and revisit their life without feeling judged, rushed, or overwhelmed.

---

## 7. Product Principles

Dear Diary v2 should follow these principles:

### 7.1 Emotional Softness

The UI should reduce emotional tension through warm colors, soft shapes, and calm interactions.

### 7.2 Time as Structure

The core organizing principle remains time. New features should deepen the user’s relationship with time, not distract from it.

### 7.3 Reflection over Productivity

The product should support reflection and introspection, not efficiency obsession.

### 7.4 Beauty with Restraint

The app should feel premium and memorable, but never loud, cluttered, or overdesigned.

### 7.5 Calm Interactions

Animations, transitions, and layout changes should feel slow, soft, and reassuring.

---

## 8. Feature Scope

---

# 8A. Mood Heatmap

## 8A.1 Feature Summary

The Mood Heatmap is a new, separate page that visualizes the user’s diary activity and emotional patterns over time using a heatmap-like calendar grid.

Each tile represents a day. The tile’s appearance communicates whether the user wrote on that day and what the dominant mood for that day was. Users can click a tile to open a detail view that displays the notes written on that day.

This feature is designed to give users a high-level emotional map of their recent life while preserving the warmth and calmness of the rest of the application.

---

## 8A.2 User Stories

* As a user, I want to see my diary activity across days so I can notice patterns in how often I write.
* As a user, I want to see the dominant mood associated with a day so I can better understand my emotional trends over time.
* As a user, I want to click a day on the heatmap and view the entries written on that date.
* As a user, I want the heatmap page to feel beautiful and emotionally readable, not like a sterile data dashboard.
* As a user, I want empty days to still appear so I can visually perceive the flow of time.

---

## 8A.3 Functional Requirements

### Heatmap Page

* Create a dedicated route/page for the Mood Heatmap
* Display a calendar-style heatmap showing days over time
* Support at least a rolling time period such as several recent months, with design flexibility to extend further later
* Visually represent days with and without entries

### Tile Behavior

* Each heatmap tile represents a single day
* Each tile must support:

  * date
  * whether entries exist
  * dominant mood for that date if entries exist
  * selected state
  * hover state on desktop
* Clicking a tile opens a day detail experience

### Day Detail Experience

* When a user selects a tile, open a modal, side panel, or equivalent focused view
* Display:

  * selected date
  * all diary entries from that date
  * mood summary for the date
  * title/excerpt/tags for entries
  * CTA to create a new entry for that date

### Mood Mapping

* The app should determine a **dominant mood** for a given day
* If multiple entries exist on the same day, the system should use a simple, deterministic rule for v2, such as:

  * most frequent mood among entries that day
  * or first mood entered for the day
* This rule should be implemented consistently and be easy to change later

### Empty Days

* Days with no entries should still appear in the grid
* Empty days should use a low-emphasis visual treatment rather than disappearing

---

## 8A.4 Non-Functional Requirements

* The heatmap must remain visually warm and cohesive with the rest of the app
* It must not resemble a productivity tool or engineering dashboard
* Heatmap tiles must be accessible and keyboard navigable
* Hover, focus, and selected states must be visually clear
* Performance should remain smooth even with large periods of displayed days

---

## 8A.5 Data / Logic Requirements

### Derived Heatmap Model

The frontend or backend should derive a heatmap-friendly structure such as:

```ts
type HeatmapDay = {
  date: string
  entries: DiaryEntrySummary[]
  dominantMood?: string
  entryCount: number
}
```

### DiaryEntrySummary

```ts
type DiaryEntrySummary = {
  id: string
  title: string
  excerpt: string
  mood?: string
  tags?: string[]
}
```

### Aggregation Rules

For each calendar day:

* group entries by entry date
* determine if entries exist
* determine dominant mood
* store entry summaries for day detail display

---

## 8A.6 UX Notes

* Heatmap tiles should be rounded, soft, and low-saturation
* The page should feel insight-oriented but emotionally gentle
* Selected-day interaction should feel elegant and focused, not abrupt
* Tooltips may be used for hover preview on desktop
* The detail view should feel like opening a small memory drawer for that day

---

# 8B. Life Chapters

## 8B.1 Feature Summary

Life Chapters allow users to define named periods of time in their life and see those periods represented visually in the timeline.

This feature adds meaning to chronology. Instead of only seeing dates, the user can structure their life into emotionally meaningful eras such as:

* Healing Era
* First Job
* Gym Arc
* University
* 2026 Reset

Life Chapters should not be treated like generic categories or labels. They are user-defined periods of life and should feel significant, graceful, and integrated into the timeline experience.

---

## 8B.2 User Stories

* As a user, I want to define meaningful phases of my life so my timeline feels more personal and interpretive.
* As a user, I want to assign a name and date range to a chapter.
* As a user, I want to see these chapters represented visually as I browse my timeline.
* As a user, I want chapters to make the timeline feel like a story, not just a list of dates.
* As a user, I want chapter visuals to be elegant and subtle, not loud or distracting.

---

## 8B.3 Functional Requirements

### Chapter Creation

Users must be able to create a chapter with:

* title
* start date
* end date
* optional description
* optional theme color / tint
* optional icon or symbol later if desired, but not required for MVP of this feature

### Chapter Management

Users must be able to:

* view a list of created chapters
* edit chapter details
* delete a chapter
* preview its date range

### Timeline Integration

* Entries whose dates fall within a chapter range should visually appear under that chapter context
* The timeline should display chapter dividers, section bands, or equivalent visual structures to indicate chapter boundaries
* Chapter visuals should not overpower the diary content

### Chapter Display Content

Each chapter display element should support:

* title
* date range
* optional description
* optional soft tint or style treatment

### Chapter Boundaries

* The system must correctly determine whether an entry belongs to a chapter based on its entry date
* Basic v2 assumption: an entry belongs to a chapter if its date falls between start date and end date inclusive

---

## 8B.4 Design / UX Requirements

Life Chapters are one of the strongest differentiators of Dear Diary, so the UI must feel especially thoughtful.

Chapter visuals may include:

* soft horizontal dividers
* subtle background tint bands
* elegant chapter title sections
* scroll-based fade-in of chapter headings
* slight shift in accent tone while user is inside a chapter range

Allowed:

* subtle tinting
* restrained motion
* refined typography
* emotional symbolism

Not allowed:

* loud banners
* giant labels
* heavy skeuomorphic decoration
* cluttered chapter markers

---

## 8B.5 Suggested Data Model

```ts
type LifeChapter = {
  id: string
  title: string
  startDate: string
  endDate: string
  description?: string
  themeColor?: string
  createdAt: string
  updatedAt: string
}
```

---

## 8B.6 Storage Considerations

For v2, Life Chapters may be stored separately from Notion-based diary entries. A separate application-managed store is acceptable if that leads to cleaner implementation.

The key requirement is that chapter data be:

* stable
* editable
* easy to associate with timeline ranges
* flexible for future expansion

---

## 8B.7 Open Product Assumption

For v2, chapters are assumed to be:

* user-defined
* manually created
* non-overlapping unless a later decision explicitly allows overlap

This simplifies timeline rendering and chapter logic.

---

# 8C. UI/UX and Emotional Design Evolution

## 8C.1 Feature Summary

Dear Diary v2 includes a substantial design and experience refinement phase. This is not a small visual polish pass; it is a strategic product investment.

The goal is to make Dear Diary feel more emotionally aligned with its purpose. Users should feel warm, calm, and safe when they open the app. The product should visually communicate that it is a trusted place for reflection.

This work affects:

* color system
* typography
* layout rhythm
* motion quality
* interaction tone
* page composition
* writing experience
* empty states and microcopy

---

## 8C.2 Design Objectives

* Make the app feel warm and emotionally safe
* Increase visual beauty and premium quality
* Improve design cohesion across pages
* Ensure heatmap and chapters feel like natural extensions of the same world
* Preserve strong readability and usability

---

## 8C.3 Functional / Experience Requirements

### Global Design System

* Implement the approved warm, soft visual design system
* Support light and dark themes if already planned, with light mode prioritized as the emotional default
* Ensure consistent usage of tokens for:

  * color
  * spacing
  * radius
  * shadows
  * motion
  * typography

### Timeline Refinement

* Improve overall timeline polish
* Ensure cards, spine, nodes, and month sections feel premium and cohesive
* Integrate life chapters visually without making the page noisy

### Heatmap Styling

* Ensure the heatmap page remains warm and inviting
* Use rounded tiles, elegant spacing, and soft color usage
* Avoid chart-like harshness

### Writing Experience

* Improve the new entry / writing interface so it feels calm, welcoming, and readable
* Reduce “form” feeling and increase “writing” feeling

### Interaction Quality

* Make animations gentle, slow, and intentional
* Improve hover, focus, modal, and page transition quality
* Respect reduced motion preferences

### Empty States and Microcopy

* Use supportive and emotionally soft copy
* Avoid robotic or productivity-focused language
* Make empty states feel inviting rather than barren

---

## 8C.4 Emotional Tone Requirements

The product should feel:

* safe
* warm
* personal
* reflective
* beautiful
* intimate
* reassuring

The product should not feel:

* stressful
* sterile
* hyper-optimized
* gamified
* loud
* childish

---

## 8C.5 Success Criteria for Design Work

The user should be able to say:

* “This feels like my space.”
* “This feels calming.”
* “This feels beautiful.”
* “I feel comfortable writing here.”
* “The app feels emotionally thoughtful.”

---

## 8C.6 Design Dependency

The v2 UI work should follow the design specification already prepared and copied into the project.

That design spec should act as the source of truth for:

* tokens
* layout language
* page behavior
* interaction style
* page hierarchy
* component style

---

## 9. Assumptions

The following assumptions are being made for v2:

* diary entries continue to be stored in Notion
* entry dates are already available and reliable
* moods already exist in the diary entry model
* tags remain optional metadata
* users primarily interact with a single-user personal journaling experience
* life chapters can be stored outside Notion if needed
* chapter overlap is not required in v2
* a single dominant mood per day is enough for the heatmap in v2
* the design system defined in the UI spec is adopted as implementation direction

---

## 10. User Flows

### 10.1 Mood Heatmap Flow

1. User opens Heatmap page
2. User sees a mood-colored calendar heatmap
3. User hovers or focuses a day to preview date/mood state
4. User clicks a tile
5. A day detail panel or modal opens
6. User reads entries from that date
7. User optionally opens a full entry or adds a new one

### 10.2 Create Life Chapter Flow

1. User opens Chapters area or chapter creation action
2. User enters chapter title
3. User selects date range
4. User optionally adds description and color
5. User saves the chapter
6. User returns to timeline and sees the chapter visually integrated

### 10.3 Browse Timeline with Chapters Flow

1. User opens timeline
2. User scrolls through months
3. User encounters chapter divider
4. User understands they have entered a meaningful life period
5. Entries within that chapter feel grouped by context and time

---

## 11. Information Architecture / Routing

Suggested v2 routes:

```txt
/                       -> Timeline Home
/entry/new              -> New Entry
/entry/[id]             -> Entry Detail
/heatmap                -> Mood Heatmap
/chapters               -> Chapter Management / Overview
```

Optional:

```txt
/chapters/new
/chapters/[id]/edit
```

---

## 12. Data Models

### 12.1 DiaryEntry

```ts
type DiaryEntry = {
  id: string
  title: string
  entryDate: string
  body: string
  mood?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
  coverImage?: string
  favorite?: boolean
}
```

### 12.2 HeatmapDay

```ts
type HeatmapDay = {
  date: string
  entryCount: number
  dominantMood?: string
  entries: DiaryEntrySummary[]
}
```

### 12.3 DiaryEntrySummary

```ts
type DiaryEntrySummary = {
  id: string
  title: string
  excerpt: string
  mood?: string
  tags?: string[]
}
```

### 12.4 LifeChapter

```ts
type LifeChapter = {
  id: string
  title: string
  startDate: string
  endDate: string
  description?: string
  themeColor?: string
  createdAt: string
  updatedAt: string
}
```

---

## 13. Technical Considerations

### 13.1 Data Aggregation

The application will likely need a transformation layer that:

* fetches diary entries from Notion
* groups them by calendar day
* calculates dominant mood
* maps entries to heatmap data
* maps entries to life chapters based on date range

### 13.2 Performance

* heatmap rendering should be efficient even for long ranges
* timeline chapter grouping should not cause noticeable lag
* modal/panel opening should feel immediate
* data fetching should avoid unnecessary duplicate calls

### 13.3 Theming / Tokens

The frontend should centralize token usage for:

* color
* spacing
* typography
* radius
* motion
* shadows

### 13.4 Accessibility

* heatmap tiles must be keyboard accessible
* focus states must be visible
* mood colors must not be the sole source of meaning
* motion must respect reduced-motion settings

---

## 14. Metrics / Success Measures

Because this is a journaling app, success should not only be measured with generic engagement metrics. It should also reflect emotional usefulness and product resonance.

### Product Metrics

* heatmap page usage
* number of heatmap tile clicks
* number of chapters created
* timeline session duration
* return visits to old entries
* new entry creation rate after viewing heatmap/day detail

### Qualitative Success Signals

* users describe the app as calming or beautiful
* users say the chapter feature makes the timeline feel more meaningful
* users understand the heatmap quickly
* users feel comfortable writing in the app
* users feel emotionally connected to the interface

---

## 15. Risks and Mitigations

### Risk 1: Heatmap feels too analytical

**Mitigation:** keep visual language warm, soft, and journal-like; avoid harsh chart styling

### Risk 2: Life chapters become visually noisy

**Mitigation:** use restrained section dividers and soft tinting; prioritize content readability

### Risk 3: Too many visual ideas reduce usability

**Mitigation:** preserve whitespace, keep hierarchy strong, avoid decorative clutter

### Risk 4: Chapter logic becomes complex

**Mitigation:** keep v2 chapter model simple; no overlap by default

### Risk 5: UI polish scope becomes too large

**Mitigation:** tie design work to the approved UI spec and prioritize core screens first

---

## 16. Rollout Priorities

### Phase 1 — Heatmap Foundations

* build heatmap route
* aggregate entries by day
* render heatmap tiles
* support day detail interaction

### Phase 2 — Life Chapters

* create chapter data model
* chapter creation/edit flow
* timeline chapter rendering
* chapter visuals

### Phase 3 — Design Refinement

* implement token system
* refine timeline screen
* refine writing page
* refine detail and modal surfaces
* improve microcopy, transitions, and empty states

### Phase 4 — Polish and QA

* accessibility pass
* responsive design pass
* reduced motion pass
* edge case testing for empty dates, many entries, and long chapter titles

---

## 17. Out-of-Scope for This PRD But Good Future Extensions

* AI-generated month summaries
* “On This Day”
* mood recap by week/month/year
* chapter-based recaps
* semantic memory search
* media attachments and richer memory cards
* yearly emotional recap experiences

---

## 18. Implementation Guidance for Codex

Codex should interpret this version as:

* a feature-focused product evolution
* not a full platform rewrite
* an experience-first release centered on warmth, reflection, and meaning

Implementation should preserve:

* current diary entry flow
* current timeline foundation
* Notion as the diary content source

Implementation should add:

* a dedicated heatmap experience
* life chapter creation and rendering
* stronger emotional design consistency

---

## 19. Questions / Decisions to Confirm

I made a few assumptions to keep this moving. These are the main product decisions I’d want you to confirm next:

1. **Where should Life Chapters be stored?**
   My recommendation: keep them outside Notion in app-managed storage for now.

2. **How should dominant mood be calculated for a day with multiple entries?**
   My recommendation: use the most frequent mood for that day, with a deterministic fallback.

3. **Should clicking a heatmap tile open a modal or a side panel on desktop?**
   My recommendation: side panel on desktop, modal on mobile.

4. **Do you want a dedicated Chapters page in v2, or just a create/edit modal accessible from the timeline?**
   My recommendation: dedicated `/chapters` page for clarity and future scalability.

5. **Do you want chapters to require both start and end dates, or allow open-ended active chapters?**
   My recommendation: allow end date to be optional for current/ongoing chapters.

---

If you want, the next step I’d recommend is for me to turn this into a **Codex-ready implementation prompt for v2**, grounded directly in this PRD and your UI spec.
