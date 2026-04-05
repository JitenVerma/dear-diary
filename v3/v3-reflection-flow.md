🌙 Daily Ritual — UI Screen Flow
🎯 Core Experience

A calm, guided journey from arrival → reflection → intention → closure

🧭 FULL FLOW OVERVIEW
1. Ritual Entry (Start)
2. Gentle Check-In (optional)
3. Mode Selection
4. Writing Experience (based on mode)
5. Tomorrow Panel (optional)
6. Closing Ritual
7. Completion State

Each step must feel like a natural transition, not a hard navigation.

🪶 1. Ritual Entry Screen
Purpose

A soft entry into the experience — no pressure, no overwhelm.

Layout
-------------------------------------
Dear Diary

A quiet place to land.

[ Start Today’s Ritual ]

(or)
Continue writing
-------------------------------------
UI Details
Background: warm gradient (cream → soft peach)
Centered content
Large breathing space
Minimal navigation visible
Tone
welcoming
slow
grounding
Interaction
button fades into next screen
subtle background shift
🌊 2. Gentle Check-In Screen (Optional)
Purpose

Help user “arrive” emotionally

Layout
-------------------------------------
How are you arriving today?

[ calm ]
[ overwhelmed ]
[ tired ]
[ scattered ]
[ okay ]

(skip)
-------------------------------------
UI Details
pill buttons
soft hover glow
no harsh selection states
multiple or single select (you decide later)
Interaction
selecting option → subtle visual feedback
continue automatically OR with button
Optional Enhancement

Selected emotion can:

influence background tone slightly
influence prompt tone later
🎭 3. Mode Selection Screen
Purpose

Give control without overwhelming

Layout
-------------------------------------
How do you want to use this space today?

[ Reflect ]
Make sense of your day

[ Unload ]
Let things out

[ Plan ]
Prepare for tomorrow

[ Rest ]
Keep it light

[ Free Write ]
Just write freely
-------------------------------------
UI Details
large soft cards
stacked vertically (mobile)
grid (desktop)
rounded (24px+)
subtle shadows
Interaction
hover → slight lift
click → smooth expand into writing screen
Design Note

👉 This screen should feel like choosing a mood, not a feature.

✍️ 4. Writing Screen (CORE SCREEN)

This is the most important screen.

Layout
-------------------------------------
[ Back ]

Mode: Reflect

Title (optional)

-------------------------------------

Today felt like...

I keep thinking about...

Something that stayed with me...

-------------------------------------

[ Continue → ]
-------------------------------------
Structure
top nav (minimal)
mode indicator
optional title field
body sections OR blank (based on mode)
UI Behavior
Template Modes
soft section headings
spacing between sections
no boxes or form fields
feels like guided writing, not input
Free Write Mode
blank canvas
optional “add prompts” toggle
Editor Style
warm paper background
large padding
comfortable typing area
no harsh borders
cursor soft blinking
Interaction
typing should feel smooth and distraction-free
no autosave notifications (silent save preferred)
continue button appears naturally
🌅 5. Tomorrow Panel (Optional Step)
Purpose

Bridge reflection → intention

Layout
-------------------------------------
Tomorrow

What matters most...

1.
2.
3.

How I want to feel...

A note for tomorrow me...
-------------------------------------
UI Details
appears as continuation (not new page)
soft divider between sections
slightly lighter background panel
Interaction
fully optional
user can skip
flows naturally into closing
Design Note

👉 Must NOT feel like a to-do list app

🌙 6. Closing Ritual Screen (SIGNATURE)

This is where the magic happens.

Layout
-------------------------------------
Close the day

Today felt...

[ peaceful ]
[ heavy ]
[ unfinished ]
[ meaningful ]
[ tiring ]
[ hopeful ]

-------------------------------------

What am I carrying into tomorrow?

What am I leaving behind tonight?

-------------------------------------

A quiet note to myself...

-------------------------------------

[ Close the Day ]
-------------------------------------
UI Details
softer background than writing screen
more vertical spacing
slower animations
Interaction
selecting feeling → subtle glow
typing → calm experience
final button → transition to completion
Emotional Goal

👉 This should feel like:
exhaling after a long day

🎬 7. Completion State (VERY IMPORTANT)
Purpose

Give emotional closure

Layout
-------------------------------------
The day is complete.

Take your rest.

-------------------------------------
Visual Effects
background slightly dims
subtle fade
timeline preview in background
entry gently “locks in”
Optional Enhancements
faint animation of timeline node appearing
ambient glow fades out
Interaction
auto return to timeline OR
button: “Return to timeline”
🧠 TRANSITION DESIGN (CRITICAL)

Between each step:

no hard page reloads
use progressive transitions
subtle fade + slide
maintain continuity of background
Suggested Pattern

Each step = section in a flow container

Not:
👉 separate pages

But:
👉 one continuous ritual experience

📱 MOBILE vs DESKTOP BEHAVIOR
Mobile
full-screen stacked flow
single column
large touch targets
Desktop
centered column
optional side breathing space
slight width expansion for comfort
🎨 VISUAL MOOD ACROSS FLOW
Stage	Feel
Entry	welcoming
Check-in	grounding
Mode select	empowering
Writing	expressive
Tomorrow	intentional
Closing	releasing
Completion	peaceful
💎 KEY UX RULES (DO NOT BREAK)
1. No pressure
everything optional
skip always available
2. No clutter
one focus per screen
3. No harsh transitions
everything must feel smooth
4. No productivity vibes
avoid task-heavy UI
5. Respect emotional state
copy must be gentle
🔥 MOST IMPORTANT SCREEN

If you perfect ONLY ONE:

👉 Writing + Closing flow

That’s the heart of the product.