# Dear Diary — UI Specification

This UI spec is designed to be handed to Codex or used as the design foundation for your v2 PRD and frontend implementation.

It covers:

* visual identity
* layout principles
* design tokens
* page-by-page UI behavior
* component specs
* interaction and motion rules
* accessibility expectations

---

# 1. Product UI Vision

## Desired emotional outcome

When a user opens Dear Diary, they should feel:

* safe
* warm
* calm
* emotionally held
* welcome to be vulnerable
* invited to reflect

## Product metaphor

Dear Diary should feel like:

* a private sanctuary
* a soft memory book
* a beautiful place where time is gently organized

## Design identity

The application should combine:

* **Warm Minimalism** for clarity
* **Soft Nature** for comfort
* **Editorial Elegance** for beauty

## Avoid

Do not make the app feel:

* like a productivity dashboard
* harsh, sterile, or overly technical
* cluttered
* gamified in a loud or childish way
* neon, cyberpunk, or aggressively trendy

---

# 2. Core UI Principles

## 2.1 Emotional softness

All visual choices should reduce tension:

* rounded edges
* low-saturation colors
* soft shadows
* calm typography
* generous spacing

## 2.2 Time-first structure

Time is the primary organizing system:

* timeline is a core identity feature
* heatmap is a complementary emotional map
* life chapters give meaning to time periods

## 2.3 Calm interaction

Interactions should feel:

* smooth
* gentle
* unhurried
* grounded

## 2.4 Reading comfort

Diary content must always feel highly readable:

* comfortable line lengths
* strong contrast without harshness
* breathing room around text
* minimal visual noise during writing/reading

## 2.5 Premium simplicity

The UI should feel refined, not overloaded:

* strong whitespace discipline
* few but polished interactions
* visually elegant hierarchy

---

# 3. Design Tokens

## 3.1 Color tokens

## Light theme

### Backgrounds

```txt
bg.canvas.primary      #F7F2EA   // warm cream page background
bg.canvas.secondary    #FFF8F1   // softer warm paper
bg.surface.primary     #FFFDF9   // main cards
bg.surface.secondary   #F5EDE3   // soft panels
bg.surface.tertiary    #EFE4D6   // alternate surfaces
bg.overlay.soft        rgba(58, 47, 42, 0.08)
```

### Text

```txt
text.primary           #3A2F2A
text.secondary         #6B5B54
text.tertiary          #988980
text.inverse           #FFFDF9
```

### Borders and dividers

```txt
border.soft            #E6DACC
border.default         #D9CAB8
border.strong          #C9B7A3
divider.soft           rgba(58, 47, 42, 0.10)
```

### Brand accents

```txt
accent.sage            #A8B89A
accent.rose            #D8A7A0
accent.peach           #E5B88A
accent.sky             #A9BDD1
accent.lavender        #B9AEC7
accent.gold            #D9C08D
```

### State colors

```txt
state.success          #9EB388
state.warning          #D5B07A
state.error            #C98F8A
state.info             #9CB4C8
```

---

## Dark theme

### Backgrounds

```txt
bg.canvas.primary      #1F1A18
bg.canvas.secondary    #2A2320
bg.surface.primary     #2C2522
bg.surface.secondary   #352C29
bg.surface.tertiary    #403632
bg.overlay.soft        rgba(0, 0, 0, 0.35)
```

### Text

```txt
text.primary           #F3EAE0
text.secondary         #D5C8BC
text.tertiary          #AB9A90
text.inverse           #1F1A18
```

### Borders and dividers

```txt
border.soft            #4A3D38
border.default         #5A4A44
border.strong          #6B5952
divider.soft           rgba(243, 234, 224, 0.12)
```

### Brand accents

```txt
accent.sage            #8FA186
accent.rose            #C08F89
accent.peach           #D1A073
accent.sky             #8EA8BC
accent.lavender        #9D91B3
accent.gold            #B49A69
```

---

## 3.2 Mood tokens

These are used for:

* mood chips
* heatmap tiles
* subtle card highlights
* optional chapter tinting

### Light

```txt
mood.happy             #F2D38B
mood.calm              #AFC6D9
mood.neutral           #CFC4BA
mood.sad               #B7A9C9
mood.stressed          #D9A5A0
mood.grateful          #B8C9A3
```

### Dark

```txt
mood.happy             #CFA85B
mood.calm              #7E9CB1
mood.neutral           #8C7F76
mood.sad               #8F7EA8
mood.stressed          #B37A75
mood.grateful          #8EA06E
```

### Usage rules

* never use highly saturated fills
* use mood colors mostly as accents, not full backgrounds
* heatmap may use slightly stronger mood fills than the rest of the app
* use opacity shifts for intensity when needed

---

## 3.3 Typography tokens

## Font pairing

Recommended:

* **Headings**: Cormorant Garamond or Playfair Display
* **Body/UI**: Inter, Manrope, or Plus Jakarta Sans

## Type scale

```txt
display.xl             64px / 72px / 500
display.lg             48px / 56px / 500
heading.h1             40px / 48px / 600
heading.h2             32px / 40px / 600
heading.h3             24px / 32px / 600
heading.h4             20px / 28px / 600
body.lg                18px / 30px / 400
body.md                16px / 28px / 400
body.sm                14px / 22px / 400
label.md               14px / 20px / 500
label.sm               12px / 16px / 500
meta.xs                11px / 16px / 500
```

## Typography usage

* page titles should feel literary and graceful
* body text must prioritize legibility
* metadata should be subtle and secondary
* avoid overly tight tracking or dense layouts

---

## 3.4 Spacing tokens

```txt
space.1    4px
space.2    8px
space.3    12px
space.4    16px
space.5    20px
space.6    24px
space.8    32px
space.10   40px
space.12   48px
space.16   64px
space.20   80px
space.24   96px
```

## 3.5 Radius tokens

```txt
radius.sm      10px
radius.md      16px
radius.lg      24px
radius.xl      32px
radius.pill    999px
```

## 3.6 Shadow tokens

```txt
shadow.card        0 8px 24px rgba(58, 47, 42, 0.08)
shadow.elevated    0 14px 36px rgba(58, 47, 42, 0.12)
shadow.modal       0 24px 60px rgba(58, 47, 42, 0.18)
shadow.dark.card   0 12px 30px rgba(0, 0, 0, 0.28)
```

## 3.7 Motion tokens

```txt
motion.fast        180ms
motion.base        280ms
motion.slow        420ms
motion.slower      600ms

ease.soft          cubic-bezier(0.22, 1, 0.36, 1)
ease.standard      ease-in-out
```

---

# 4. Layout System

## 4.1 Breakpoints

```txt
sm   640px
md   768px
lg   1024px
xl   1280px
2xl  1440px
```

## 4.2 App shell structure

All pages should follow:

```txt
AppShell
├── TopNavigation
├── OptionalAmbientBackground
├── MainContentContainer
└── FloatingActions / overlays if needed
```

## 4.3 Main content widths

```txt
reading width        720px max
timeline width       1100px max
heatmap width        1200px max
form width           760px max
modal width          720px max
side panel width     420–520px
```

## 4.4 Content rhythm

Page structure should typically be:

* hero/header
* supporting controls
* core content area
* optional contextual actions

Use vertical spacing generously:

* 24px minimum between stacked sections
* 48–64px between major sections

---

# 5. Navigation UI Spec

## Top navigation

Purpose:

* orient the user
* provide calm access to primary sections
* never dominate the experience

## Desktop

Contents:

* logo / wordmark: Dear Diary
* primary nav links:

  * Timeline
  * Heatmap
  * Chapters
  * New Entry
* theme toggle
* optional profile/settings avatar later

## Mobile

* top bar with logo
* compact menu icon or bottom nav if preferred
* floating new entry button remains available

## Styling

* semi-transparent warm panel
* subtle blur allowed if tasteful
* soft border and shadow
* sticky on scroll, but should feel light

## Interaction

* active nav item subtly highlighted
* hover uses soft tint, not loud underline
* no sharp movement

---

# 6. Timeline Page UI Spec

## 6.1 Purpose

The timeline is the emotional home of the app. It should feel like:

* a memory lane
* a visual history
* a graceful path through time

## 6.2 Page structure

```txt
TimelinePage
├── PageHero
├── FilterBar
├── TimelineContainer
│   ├── MonthSection
│   │   ├── OptionalLifeChapterDivider
│   │   ├── TimelineSpine
│   │   ├── TimelineNode
│   │   └── DiaryEntryCards
└── FloatingNewEntryButton
```

## 6.3 Hero section

Contents:

* page title, e.g. “Your Timeline”
* short supporting line, e.g. “A gentle path through your days”
* optional month/year summary or entry count

Layout:

* centered or slightly left aligned within content frame
* ample top spacing
* delicate typography

## 6.4 Filter bar

Controls:

* mood filter dropdown/chips
* tag filter dropdown
* chapter filter later if needed
* clear filters action

Styling:

* soft panel background
* rounded capsule controls
* should look like calm tools, not admin filters

## 6.5 Timeline spine

Visual:

* thin vertical line
* centered on desktop
* slightly offset or left aligned on mobile
* subtle glow or tonal contrast allowed

Do:

* keep it delicate
* use warm or chapter-tinted accent very lightly

Do not:

* make it thick or loud

## 6.6 Timeline nodes

Each entry gets a node:

* circular
* small
* slightly raised from spine
* can carry subtle mood tint

States:

* default
* hover
* selected
* chapter transition

## 6.7 Month section

Purpose:

* break timeline into readable chunks
* create “chapters in time” even before explicit life chapters

Contents:

* month and year label
* optional summary count
* grouped entries below

Style:

* elegant heading
* lots of breathing room before each section

## 6.8 Diary entry card

Contents:

* date
* title
* excerpt
* mood chip
* tags
* optional thumbnail
* optional favorite marker

Layout:

* desktop: cards alternate left/right or use staggered layout around spine
* mobile: cards stack in one column

Card style:

* warm surface
* soft border
* gentle shadow
* large radius
* hover lift and subtle brightening

Sizing:

* min height should feel substantial
* excerpt max 2–4 lines depending on viewport

Interaction:

* click opens detail view
* hover reveals slight motion
* card should feel inviting, not dense

## 6.9 Floating add button

Desktop/mobile:

* persistent floating button in lower right
* rounded, warm accent fill
* icon + optional label on larger screens

Behavior:

* lifts on hover
* opens new entry page or composer

---

# 7. Heatmap Page UI Spec

## 7.1 Purpose

The heatmap is a visual map of emotional patterns over time.
It should feel:

* insightful
* beautiful
* emotionally readable
* softer than a productivity graph

## 7.2 Page structure

```txt
HeatmapPage
├── PageHero
├── MoodLegend
├── HeatmapCard
│   └── HeatmapGrid
├── SelectedDayPanel or DayModal
└── OptionalInsightsSummary
```

## 7.3 Hero section

Contents:

* title, e.g. “Mood Map”
* support line, e.g. “A quiet view of how your days have felt”
* optional date range selector later

## 7.4 Mood legend

Shows:

* color dots/swatches
* label per mood

Style:

* small chips or legend row
* warm neutral container
* low emphasis but clear

## 7.5 Heatmap container

Structure:

* wrapped in large soft panel/card
* horizontally scrollable on smaller screens if needed
* month labels above grid
* weekday labels on side

## 7.6 Heatmap tiles

Each tile represents a day.

Shape:

* rounded square, not hard-edged
* 10–14px corners depending on size

Size:

* desktop 18–24px
* mobile 14–18px

States:

* no entry
* entry exists
* dominant mood
* selected
* hover

No-entry tile:

* soft neutral fill
* low contrast
* still visible enough to show passage of time

Entry tile:

* mood-based color
* optional intensity based on number of entries or mood strength later

Hover:

* slight scale up
* clearer border
* tooltip appears

Selected:

* ring outline
* soft glow
* opens day detail panel

## 7.7 Day detail panel

This can be a modal first, then later a side panel on desktop.

Contents:

* date title
* daily mood summary
* list of entries from that day
* add entry CTA

Each daily entry card should show:

* title
* excerpt
* mood chip
* tags

Style:

* panel should feel intimate and readable
* slightly elevated over rest of page
* smooth bloom/fade entrance

---

# 8. Life Chapters UI Spec

## 8.1 Purpose

Life chapters help users define meaningful eras in their life.
They transform time from raw dates into emotional periods.

Examples:

* Healing Era
* First Job
* University
* New Beginnings

## 8.2 Core UX expectations

Users should be able to:

* create a life chapter
* define title
* choose date range
* add optional description
* assign a soft theme color
* see that chapter integrated elegantly across the timeline

## 8.3 Timeline rendering

Life chapters appear as full-width dividers or section bands that interrupt the timeline gracefully.

## 8.4 Chapter divider component

Contents:

* optional icon or symbol
* chapter title
* date range
* optional short description

Layout:

* centered or offset elegantly above corresponding entries
* full-width soft band or framed divider

Styling:

* chapter tint background with low opacity
* title in refined serif
* description in secondary body text
* chapter band may softly influence nearby timeline accents

## 8.5 Chapter visual effects

Allowed:

* slight background tint shift
* subtle section glow
* card accent harmonized with chapter tint
* divider fade-in on scroll

Not allowed:

* loud gradients
* giant banners
* heavy ornamentation
* anything that competes with diary content

## 8.6 Chapter creation modal/page

Fields:

* chapter title
* start date
* end date
* optional description
* chapter color/theme
* preview

Preview should show:

* chapter chip
* divider style
* approximate timeline appearance

---

# 9. New Entry Page UI Spec

## 9.1 Purpose

The writing page must feel sacred, calm, and frictionless.

## 9.2 Page structure

```txt
NewEntryPage
├── PageHeader
├── MetadataRow
├── TitleField
├── BodyEditor
├── OptionalAttachments / image field
└── SaveActions
```

## 9.3 Page header

Contents:

* title, e.g. “New Entry”
* optional gentle support text, e.g. “Take your time”

## 9.4 Metadata row

Includes:

* entry date picker
* mood selector
* tag selector
* favorite toggle if included

Layout:

* responsive chip-like input controls
* should feel like polished tools, not form bureaucracy

## 9.5 Title field

Style:

* prominent
* borderless or ultra-light border
* large type
* generous padding
* blends into the page naturally

## 9.6 Body editor

Style:

* warm paper writing surface
* large inner padding
* high line-height
* focus state should be calm and elegant

Behavior:

* autosize vertically
* preserve whitespace
* easy to write long-form content

## 9.7 Save actions

Buttons:

* Save entry
* Cancel / return
* optional Save draft later if needed

Primary button:

* warm accent fill
* rounded
* clear but not loud

Secondary actions:

* subtle text button or outlined button

---

# 10. Entry Detail Page UI Spec

## 10.1 Purpose

This page is for slow reading and reflection.

## 10.2 Structure

```txt
EntryDetailPage
├── BackLink
├── EntryHeader
├── EntryMetadata
├── EntryBody
└── OptionalRelatedNavigation
```

## 10.3 Header

Contents:

* title
* date
* optional mood chip
* optional favorite
* tags

Typography:

* elegant and quiet
* should feel like opening a memory

## 10.4 Body

Layout:

* centered reading width
* excellent readability
* large margins
* minimal distractions

Optional enhancements:

* subtle fade-in
* contextual chapter badge
* soft transition from card into page

---

# 11. Chapters Page UI Spec

If you create a dedicated chapters page, it should act like a management and preview area.

## Structure

```txt
ChaptersPage
├── PageHero
├── ChapterList
│   └── ChapterCards
├── CreateChapterCTA
└── ChapterPreviewRail
```

## Chapter card contents

* title
* date range
* description
* color preview
* count of entries in chapter
* edit action

Style:

* visually cohesive with timeline cards
* slightly more decorative use of tint allowed

---

# 12. Reusable Component Specs

## 12.1 Button

Variants:

* primary
* secondary
* ghost
* icon
* floating

Primary:

* warm accent fill
* text.primary/inverse depending on contrast
* rounded large radius
* soft shadow

## 12.2 Chip

Used for:

* mood
* tags
* chapter labels
* filters

Style:

* pill shape
* soft fill
* medium text
* subtle border

## 12.3 Card

Base card primitive used throughout.
Variants:

* diary card
* panel card
* chapter card
* heatmap container

## 12.4 Modal

Used for:

* daily notes
* create chapter
* settings later

Style:

* large rounded corners
* elevated shadow
* warm panel background
* animation should bloom/fade in

## 12.5 Tooltip

Used on:

* heatmap tiles
* icons
* metadata

Style:

* compact
* warm dark or warm light depending on theme
* not sharp black

---

# 13. Interaction Specification

## Hover behavior

Allowed:

* 1–2px lift
* subtle shadow increase
* slight brightness change
* node/tile gentle enlargement

Avoid:

* aggressive bounce
* fast transforms
* loud glow effects

## Focus behavior

* always visible
* keyboard accessible
* use warm border ring rather than harsh blue default
* maintain accessibility contrast

## Click/tap behavior

* tactile but soft
* no harsh scale-down
* use opacity/scale very lightly

---

# 14. Motion Specification

## Entry card reveal

On scroll into view:

* opacity 0 → 1
* translateY 12–20px → 0
* duration 420ms
* ease.soft

## Modal open

* opacity fade
* slight scale from 0.98 → 1
* duration 280–360ms

## Page transition

* subtle fade/slide
* never dramatic
* preserve calmness

## Heatmap tile hover

* scale 1 → 1.05
* duration 180ms

## Chapter divider entrance

* opacity 0 → 1
* translateY 10px → 0
* duration 500–600ms

## Reduced motion

When reduced motion is enabled:

* remove scroll animations
* keep only basic fades or instant state changes

---

# 15. Accessibility Specification

## Must support

* full keyboard navigation
* visible focus states
* good semantic structure
* readable contrast in both themes
* reduced motion support
* tap targets at least 40x40 where interactive

## Reading accessibility

* body text should not be cramped
* line length should stay in readable range
* mood colors must not be the only cue; include labels

## Heatmap accessibility

* each tile must expose:

  * date
  * whether an entry exists
  * mood summary if available

Example aria label:
“March 18, 2026. Two entries. Dominant mood: calm.”

---

# 16. Empty States

These are very important emotionally.

## Timeline empty state

Message:
“Your story starts here.”

Support:
“A first entry is enough.”

Visual:

* subtle timeline spine still visible
* soft illustration/ambient shape optional
* CTA to add entry

## Heatmap empty state

Message:
“Your mood map will grow with each day you write.”

## Chapters empty state

Message:
“Some parts of life deserve a name.”

Support:
“Create your first chapter to mark an era.”

---

# 17. Content Tone Guidelines

Microcopy should feel:

* warm
* reassuring
* respectful
* non-judgmental

Examples:

* “Take your time”
* “Write what feels true”
* “A quiet place for your thoughts”
* “You can always come back later”

Avoid:

* gamified pressure
* robotic tooltips
* overly clever copy
* clinical or corporate wording

---

# 18. Implementation Notes for Frontend

## Recommended frontend stack

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui primitives where useful, customized heavily

## Tailwind direction

Use tokens via:

* custom colors in theme extension
* spacing/radius/shadow mapped to token system
* semantic class names or design token object where possible

## Component structure

```txt
components/
  layout/
  navigation/
  timeline/
  heatmap/
  chapters/
  entry/
  ui/
lib/
  theme/
  utils/
  mappers/
```

---

# 19. Priority Order for UI Build

## Phase 1

* app shell
* nav
* timeline page
* diary entry card
* new entry page
* entry detail page

## Phase 2

* heatmap page
* heatmap tile interactions
* daily notes modal

## Phase 3

* life chapter visuals
* chapter creation flow
* timeline chapter integration

## Phase 4

* polish
* motion refinement
* dark mode refinement
* accessibility pass

---

# 20. Final Visual Recommendation

The best execution for Dear Diary is:

## Base visual mode:

**Cozy Sanctuary**

With:

* the restraint of a premium editorial app
* the softness of a wellness product
* the elegance of a memory book

That means:

* warm cream backgrounds
* soft nature accents
* generous spacing
* serif-led headers
* gentle rounded surfaces
* slow and reassuring motion

---

If you want, the next best step is for me to turn this into a **Codex-ready frontend implementation spec** with routes, component names, props, and state behavior.
