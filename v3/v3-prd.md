This is shaping into a genuinely differentiated product.
v3 is where Dear Diary becomes something *people build a relationship with*.

Below is a **complete v3 PRD** grounded in:

* your Daily Ritual flow
* your constraints (no AI, no gamification, no flashbacks)
* your emotional design direction

---

# PRD — Dear Diary v3

## 1. Overview

Dear Diary v3 introduces a new core experience called the **Daily Ritual**, transforming the product from a journaling tool into a structured, emotionally supportive space for daily reflection and gentle preparation for the next day.

While previous versions focused on recording (v1) and understanding (v2), v3 focuses on **processing, releasing, and resetting**.

The Daily Ritual provides users with a guided but flexible flow:

* arrive and check in emotionally
* choose how they want to use the space
* write with or without structure
* optionally plan for tomorrow
* close the day in a calm, intentional way

The goal is not to increase usage through habit loops, but to create a space users *want* to return to because it feels grounding, safe, and meaningful.

---

## 2. Product Vision

Dear Diary helps users move through their days with more awareness and intention by giving them a calm space to reflect, process, and gently prepare for what comes next.

v3 strengthens this by introducing a daily ritual that supports:

* emotional processing
* reflection
* release
* intention-setting

---

## 3. Problem Statement

Most journaling tools fall into two categories:

* blank writing tools with no guidance
* overly structured systems that feel rigid or clinical

Additionally, planning tools often:

* emphasize productivity over emotional clarity
* create pressure through tasks, reminders, and tracking

Users need a space where they can:

* reflect on their day without pressure
* express emotions freely or with light guidance
* gently prepare for tomorrow without turning it into a task system
* feel emotionally safe and unjudged

Dear Diary v3 addresses this gap by creating a ritual-based experience that balances **freedom and guidance**.

---

## 4. Goals

### 4.1 Primary Goals

* Introduce the **Daily Ritual flow** as a core product experience
* Provide multiple **Entry Modes** to support different emotional states
* Enable **guided reflection** through soft templates
* Allow **optional tomorrow planning** that supports both emotional and practical intention
* Introduce a **Closing the Day ritual** that provides emotional closure
* Maintain a warm, calm, and safe UI/UX throughout the flow

### 4.2 Secondary Goals

* Reduce friction for writing on difficult days
* Support both deep and minimal journaling
* Strengthen emotional connection to the product
* Create a signature experience that differentiates Dear Diary from other journaling apps

---

## 5. Non-Goals

The following are explicitly out of scope for v3:

* AI-generated prompts or summaries
* automated emotional analysis
* streaks, reminders, or habit loops
* push notifications
* gamification mechanics
* social sharing features
* memory resurfacing or “on this day”
* advanced productivity/task management systems

v3 must remain:

* human-authored
* emotionally grounded
* non-intrusive

---

## 6. Target User

### Primary User

A reflective individual who wants a calm, private space to process their day and occasionally prepare for tomorrow.

### Key Needs

* freedom to write without structure
* optional guidance when stuck
* emotional safety
* a sense of closure at the end of the day
* a way to gently think about tomorrow without pressure

---

## 7. Product Principles

### 7.1 Emotional Safety

The product must feel safe, calm, and non-judgmental at all times.

### 7.2 Optional Structure

Structure should be available but never forced.

### 7.3 Ritual over Habit

The product should feel like a ritual, not a habit tracker.

### 7.4 Slowness and Presence

Interactions should feel deliberate and unhurried.

### 7.5 Human Authenticity

All content is user-generated; no AI-generated writing in v3.

---

# 8. Core Feature — Daily Ritual

---

## 8.1 Feature Summary

The Daily Ritual is a guided flow that helps users:

1. arrive and check in
2. choose how they want to write
3. express their thoughts
4. optionally prepare for tomorrow
5. close the day

This flow is implemented as a **progressive, multi-step experience**, not a set of disconnected screens.

---

## 8.2 User Flow

```txt
Ritual Entry
→ Gentle Check-In (optional)
→ Mode Selection
→ Writing Experience
→ Tomorrow Panel (optional)
→ Closing Ritual
→ Completion State
```

---

# 8.3 Ritual Entry

## Purpose

Provide a calm starting point.

## Requirements

* Entry point labeled “Start Today’s Ritual”
* Option to continue an existing draft
* Minimal UI, strong emotional tone

---

# 8.4 Gentle Check-In

## Purpose

Help the user acknowledge their current state.

## Requirements

* Optional step
* Present a small set of emotional states (e.g. calm, overwhelmed, tired)
* Allow skip
* Store selected state for session context (optional future use)

---

# 8.5 Entry Modes

## Purpose

Allow users to choose how they want to use the space.

## Modes

### Reflect

Focus: understanding the day

### Unload

Focus: emotional release

### Plan

Focus: preparing for tomorrow

### Rest

Focus: minimal effort journaling

### Free Write

Focus: complete freedom

---

## Requirements

* Mode selection screen with clear descriptions
* Modes must influence writing template
* User can bypass structure (Free Write)
* Mode must be stored with entry metadata

---

## Data Model Addition

```ts
type EntryMode = "reflect" | "unload" | "plan" | "rest" | "free"
```

---

# 8.6 Writing Experience

## Purpose

Core journaling experience

---

## Requirements

### General

* Large, comfortable writing area
* Distraction-free UI
* warm design

### Template-Based Modes

Each mode injects soft structured prompts:

#### Reflect

* Today felt like…
* I keep thinking about…
* Something that stayed with me…

#### Unload

* What’s on my mind…
* I need to get this out…
* What’s been weighing on me…

#### Plan

* Tomorrow, I want to focus on…
* What matters most…

#### Rest

* Today in one sentence…
* Right now I feel…

#### Free Write

* blank page

---

### Behavior

* Templates are editable text, not locked fields
* Users can ignore prompts
* Autosave should be silent

---

# 8.7 Tomorrow Planning

## Purpose

Bridge reflection and intention

---

## Requirements

* Optional step after writing
* Integrated into flow (not separate feature)

### Structure

* What matters most tomorrow
* Up to 3 priorities (optional)
* How I want to feel
* Note to tomorrow self

---

## Design Constraints

* Must not resemble a task manager
* Must support both:

  * emotional intentions
  * practical notes

---

## Data Model Addition

```ts
type TomorrowPlan = {
  priorities?: string[]
  intention?: string
  note?: string
}
```

---

# 8.8 Closing the Day

## Purpose

Provide emotional closure

---

## Requirements

### Step 1: Day Summary

User selects or writes:

* how the day felt

### Step 2: Carry / Release

* what to carry into tomorrow
* what to leave behind

### Step 3: Final Note

* optional closing message

### Step 4: Completion Action

* “Close the Day” button

---

## Experience Requirements

* slower animations than rest of app
* softer visuals
* clear emotional transition

---

## Data Model Addition

```ts
type DayClosure = {
  summary?: string
  carryForward?: string
  release?: string
  finalNote?: string
}
```

---

# 8.9 Completion State

## Purpose

Provide a sense of finality and calm

---

## Requirements

* simple message (e.g. “The day is complete.”)
* subtle visual transition
* return to timeline or home

---

# 9. Prompt Library

## Purpose

Help users who struggle to start writing

---

## Requirements

* accessible during writing
* categorized prompts
* optional usage only

---

## Categories

* reflection
* difficult days
* gratitude
* growth
* tomorrow planning

---

# 10. Data Model Updates

## Updated DiaryEntry

```ts
type DiaryEntry = {
  id: string
  title?: string
  entryDate: string
  body: string
  mood?: string
  tags?: string[]
  mode?: EntryMode
  tomorrowPlan?: TomorrowPlan
  closure?: DayClosure
  createdAt: string
  updatedAt: string
}
```

---

# 11. Information Architecture

## Routes

```txt
/                     -> Timeline
/entry/new            -> Ritual Flow Entry
/entry/[id]           -> Entry Detail
/heatmap              -> Mood Heatmap
/chapters             -> Life Chapters
/ritual               -> Daily Ritual Flow (optional dedicated route)
```

---

# 12. Technical Considerations

## Flow Architecture

* Ritual should be implemented as a **single stateful flow**
* Avoid full page reloads between steps
* Use progressive UI transitions

## State Management

* Maintain in-session ritual state
* Persist partial progress safely

## Storage

* Extend existing entry storage to include:

  * mode
  * tomorrowPlan
  * closure

## Performance

* Writing experience must feel instant
* No lag during transitions
* Autosave must be silent and reliable

---

# 13. UX Requirements

* No pressure to complete all steps
* All steps must be skippable
* Copy must be warm and non-directive
* Writing experience must feel uninterrupted
* Flow must feel continuous and cohesive

---

# 14. Success Metrics

## Behavioral

* % of entries created via ritual
* completion rate of ritual flow
* usage of different modes
* usage of tomorrow planning
* usage of closing ritual

## Qualitative

* users describe experience as calming
* users feel comfortable writing
* users feel a sense of closure after use
* users return without reminders

---

# 15. Risks

## Risk: Too much structure

Mitigation:

* all steps optional
* Free Write always available

## Risk: Feels like therapy tool

Mitigation:

* keep prompts light and optional
* avoid clinical tone

## Risk: Feels like productivity tool

Mitigation:

* limit task structure
* emphasize emotional language

## Risk: Flow feels long

Mitigation:

* allow skipping at any step
* support quick completion (Rest mode)

---

# 16. Rollout Plan

## Phase 1

* Entry modes
* Writing templates
* Ritual flow skeleton

## Phase 2

* Tomorrow planning
* Closing ritual

## Phase 3

* Prompt library
* UI polish and motion refinement

## Phase 4

* UX tuning and accessibility

---

# 17. Final Product Statement

Dear Diary v3 introduces a daily ritual that helps users gently process their day, release what they need to, and step into tomorrow with intention.

It is not designed to be addictive.

It is designed to feel like a place users can return to when they need stillness, clarity, and space to think.

---

# 🚀 Next Step

We now have:

* v2 PRD
* v3 PRD
* UI spec
* Daily Ritual flow

The next high-leverage step is:

👉 **Codex implementation prompt for v3 (flow + components + state machine)**
or
👉 **Frontend architecture (React + state design for ritual flow)**

Tell me which direction you want 👍
