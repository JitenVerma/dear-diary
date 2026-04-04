# PRD — Dear Diary

## 1. Overview

Dear Diary is a visually immersive diary web application that uses time as the primary organizing principle. Instead of presenting entries as a plain list, the app displays them on an animated timeline that lets users experience their memories as a flowing journey through days, months, and years.

The product uses Notion as the backend content store for diary entries. A custom web application provides the visual experience, including animated timeline navigation, diary entry cards, filtering, and detailed entry views.

## 2. Product Vision

Help users experience their personal memories as a living, beautiful timeline rather than a static archive of notes.

## 3. Problem Statement

Most journaling tools are functionally useful but emotionally flat. They store text, but they do not make reflection feel meaningful, immersive, or visually memorable.

Users need a diary experience that:
- feels personal and beautiful
- makes it easy to revisit old memories
- emphasizes the passage of time
- encourages reflection through interaction and visual storytelling

## 4. Goals

### Primary Goals
- Allow users to write and save diary entries
- Store diary entries in Notion
- Display diary entries in a visually compelling animated timeline
- Make it easy to browse entries by date
- Make entries easy to revisit, filter, and open

### Secondary Goals
- Create a calm, premium, emotionally resonant user experience
- Make the app feel polished and memorable through animation and micro-interactions
- Establish a foundation for future features such as “On This Day”, mood analytics, and AI summaries

## 5. Non-Goals (MVP)
- Multi-user collaboration
- Public social sharing
- AI-generated diary content
- Audio journaling
- Offline mode
- Advanced analytics dashboards
- Push notifications or reminder systems

## 6. Target Users

### Primary User
A person who wants to keep a personal diary or reflective journal and values aesthetics, emotion, and the ability to revisit memories over time.

### User Needs
- A simple way to create entries
- A meaningful way to revisit old entries
- A beautiful visual representation of their life across time
- Smooth interaction across mobile and desktop

## 7. Core User Stories

### Entry Creation
- As a user, I want to create a diary entry for a specific date so I can record what happened that day.
- As a user, I want to add a title, body, mood, and tags to an entry so that I can structure my thoughts.

### Timeline Browsing
- As a user, I want to scroll through a timeline of my entries so I can visually explore my life across time.
- As a user, I want entries to appear as cards on their dates so that each memory feels anchored in time.
- As a user, I want to jump to a specific month or year so I can quickly revisit older periods.

### Entry Detail
- As a user, I want to click an entry card and open the full entry so I can read it comfortably.
- As a user, I want smooth transitions between the timeline view and full entry view.

### Filtering
- As a user, I want to filter entries by mood or tags so I can reflect on patterns in my life.

## 8. Functional Requirements

### 8.1 Diary Entry Data Model
Each diary entry must support:
- id
- title
- entryDate
- body
- mood
- tags
- createdAt
- updatedAt
- optional coverImage
- optional favorite flag

### 8.2 Entry Creation
- Provide a form for creating a new diary entry
- Allow user to select entry date
- Allow user to enter title and body
- Allow mood selection
- Allow tags
- Save entry to Notion

### 8.3 Timeline View
- Display entries on a vertical animated timeline
- Group entries by month and year
- Show date markers on the timeline
- Render each entry as a timeline card
- Animate cards into view on scroll
- Support smooth scroll and responsive layout

### 8.4 Timeline Card
Each card should display:
- entry date
- title
- short excerpt
- mood label
- tags
- optional image thumbnail

### 8.5 Entry Detail View
- Clicking a card opens a detail panel or page
- Display full diary content
- Show metadata such as date, mood, and tags
- Allow user to return to timeline without losing position if possible

### 8.6 Navigation
- Month and year jump navigation
- Sticky timeline progress indicator
- Optional “Today” / “Latest entry” shortcut

### 8.7 Filters
- Filter by mood
- Filter by tag
- Clear all filters
- Timeline updates dynamically when filters change

## 9. Non-Functional Requirements

### UX / UI
- Interface must feel calm, elegant, premium, and reflective
- Motion should be smooth and subtle, not overwhelming
- Responsive on desktop and mobile
- Preserve readability and accessibility despite heavy visual design

### Performance
- Initial timeline load should feel fast
- Paginate or incrementally render entries if needed for large histories
- Avoid excessive Notion API calls by using server-side caching where appropriate

### Accessibility
- Sufficient contrast
- Keyboard navigability
- Reduced motion mode
- Semantic structure for screen readers

## 10. Technical Architecture

### Frontend
- Next.js application
- Tailwind CSS for styling
- Framer Motion for timeline and card animation

### Backend
- Next.js route handlers or server-side functions
- Notion API integration via server only
- Environment variables for API secret

### Data Source
- Notion database/data source containing diary entry metadata
- Full diary content stored in Notion page body or structured property fields

## 11. Notion Schema Proposal

Database: `Diary Entries`

Properties:
- Title (title)
- Entry Date (date)
- Mood (select)
- Tags (multi_select)
- Favorite (checkbox)
- Cover Image URL (url or files)
- Created Time (created_time)
- Last Edited Time (last_edited_time)

Page body:
- Full diary content in rich blocks

## 12. API / Backend Requirements

Required backend capabilities:
- fetch all diary entries
- fetch entries grouped/sorted by date
- fetch single diary entry by id
- create diary entry
- update diary entry
- optionally cache timeline results

## 13. MVP Screens

### 13.1 Timeline Home
- main animated vertical timeline
- monthly separators
- diary entry cards
- filter controls
- jump-to-date navigation

### 13.2 New Entry Screen
- title
- date
- mood
- tags
- body editor
- save action

### 13.3 Entry Detail Screen
- full entry
- date metadata
- mood / tags
- smooth transition from timeline card

## 14. Visual Design Direction

Design keywords:
- dreamy
- warm
- elegant
- calm
- reflective
- slightly magical

Potential design motifs:
- glowing timeline spine
- soft gradients
- paper-like cards
- subtle blur and glass effects
- ambient movement
- month sections as chapters in life

## 15. Motion Design Requirements

- Scroll-triggered fade/slide reveal for cards
- Smooth transition when opening entry detail
- Animated date markers
- Sticky progress rail showing user’s current place in time
- Reduced motion fallback for accessibility

## 16. Success Metrics

### Product Metrics
- number of entries created
- weekly active journaling users
- average timeline sessions per week
- return visits to old entries
- filter/jump navigation usage

### UX Metrics
- time spent browsing timeline
- entry creation completion rate
- perceived delight from qualitative testing

## 17. Future Enhancements

- On This Day resurfacing
- mood heatmap by month/year
- yearly recap
- photo diary support
- audio diary support
- AI reflection summaries
- export to PDF / printable memory book
- private authentication for multiple users

## 18. Delivery Priorities

### Phase 1
- Notion integration
- timeline read view
- entry detail view
- create entry flow

### Phase 2
- filters
- date jump navigation
- favorite entries
- improved motion and theme polish

### Phase 3
- memory resurfacing
- analytics
- media support
- AI-assisted reflections