# CLAUDE.md — Totoro's Forest Academy

## Project Overview

Build "Totoro's Forest Academy," a complete English learning game for an 8-year-old ESL student named Adam. The game is themed around Miyazaki's My Neighbor Totoro. It's a React + Vite + Tailwind CSS web application that runs locally in a browser. No backend, no API calls during gameplay — all content is hardcoded in JSON files.

## Tech Stack

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context + useReducer
- **Persistence:** localStorage for save states
- **Fonts:** Google Fonts — "Fredoka One" (headings), "Nunito" (body)
- **No backend, no database, no API calls during gameplay**

## Target Player

- 8 years old
- ESL (English as a Second Language) student, native Spanish speaker
- Lives in Madrid, Spain
- All game UI text must be in simple English appropriate for this reading level
- Sentences max ~10–12 words
- Encouraging tone always: "Great job!", "Almost! Try again!", "You're doing amazing!"
- NEVER punitive: wrong answers say "Oops! Let's try another one" not "Wrong!"

## Source Material

The game content is based on the textbook "Gear Up 3rd Grade — Book 2" (Amco), Units 4, 5, and 6. The PDF pages are in the `/textbook` folder. Extract all vocabulary, grammar patterns, and reading passages from these pages to generate the game content.

## Game Hierarchy

```
Realm (3 total — one per textbook unit)
  └── Trail (4–5 per Realm — thematic sub-sections)
       └── Clearing (3–4 per Trail — individual challenge sets)
```

Total: 3 Realms × ~5 Trails × ~3.5 Clearings = ~54 Clearings, ~540 questions

## Onboarding & Tutorial

When Adam first opens the game, there must be a guided tutorial called "Totoro Shows You Around." This uses simple language and shows (not tells):

1. **Welcome screen:** "Hello! I'm Totoro. Welcome to my forest!" + big friendly Totoro SVG
2. **Explain Realms:** "The forest has 3 magical places. Each place has Trails for you to explore." (show the world map, highlight one Realm)
3. **Explain Trails:** "Each Trail has small missions called Clearings. Finish all the Clearings to complete a Trail!" (show a Trail with 3–4 Clearings)
4. **Explain Soot Sprites (lives):** "These little guys are Soot Sprites. They help you! If you make a mistake, one goes to sleep. Don't worry — you get more when you finish a Clearing!" (show 5 Soot Sprites, animate one falling asleep)
5. **Explain Acorns (score):** "Collect acorns by answering correctly! You can spend them in the shop." (show acorn counter going up)
6. **Explain Power-ups:** "Need help? Use a power-up!" Show each one with a simple one-line description:
   - 🍃 "Mei's Hint — Shows you a clue (10 acorns)"
   - 🌊 "Totoro's Roar — Removes two wrong answers (20 acorns)"
   - 🚌 "Catbus Skip — Skip a hard question (30 acorns)"
7. **Practice Clearing:** A mini-Clearing with 3 very easy questions so Adam can experience the gameplay loop before the real game starts.
8. **Finish:** "You're ready! Let's save the forest!" → transition to world map

The tutorial should be skippable (small "Skip" button) but defaults to playing on first launch. A "Replay Tutorial" button should be accessible from the Settings screen.

## The Three Realms (Detailed)

### REALM 1: The Forest Museum (Unit 4 — School Field Trip)

**Story:** A fog has rolled in and the creatures in the Forest Museum have forgotten their names and stories. Adam must restore them.

**Trail 1: "Creatures of the Forest"** — Animal names, physical descriptions, body parts
- Clearing 1-1: "Who Lives Here?" — Core animal vocab (Pick One, Match Up)
- Clearing 1-2: "Spots, Stripes & Scales" — Adjectives for animals (Fill the Gap, Sort It)
- Clearing 1-3: "Head, Tail, Claws" — Body parts vocab (Match Up, Word Build)
- Clearing 1-4: "The Animal Riddle" — Combined describe + guess (Pick One, Fix It)

**Trail 2: "The Museum Map"** — Places, natural habitats, commands/rules
- Clearing 2-1: "Where Are We Going?" — Places vocab (Pick One, Match Up)
- Clearing 2-2: "Nature's Homes" — Habitats + which animals live where (Sort It, Fill the Gap)
- Clearing 2-3: "Follow the Signs" — Commands and safety rules (Fix It, Pick One)

**Trail 3: "What Happened Yesterday?"** — Past tense (regular + irregular), telling time
- Clearing 3-1: "Yesterday's Adventure" — Regular past tense (Fill the Gap, Pick One)
- Clearing 3-2: "The Tricky Ones" — Irregular past tense (Fill the Gap, Fix It)
- Clearing 3-3: "Tell the Story" — Mixed past tense in context (Order It, Fill the Gap)
- Clearing 3-4: "Time Check" — Telling time + ordinal numbers 1st–10th (Match Up, Pick One)

**Trail 4: "Who Likes What?"** — Object pronouns, like/don't like, adverbs
- Clearing 4-1: "Me, Him, Her, Them" — Object pronouns (Fill the Gap, Fix It)
- Clearing 4-2: "Likes and Don't Likes" — like/likes/don't like/doesn't like (Pick One, Fill the Gap)
- Clearing 4-3: "How Do They Do It?" — Adverbs of manner (Match Up, Fill the Gap)

**Trail 5: "The Field Trip" (Boss Trail)** — All Unit 4 skills combined
- Clearing 5-1: "The Museum Story" — Reading comprehension (Pick One, Order It)
- Clearing 5-2: "Kangaroo Facts" — Informational text (Pick One, Sort It)
- Clearing 5-3: "The Realm Challenge" — Mixed review rapid-fire (Snap Choice, Fill the Gap, Fix It)

### REALM 2: Totoro's Feast (Unit 5 — A Family Celebration)

**Story:** The forest spirits are preparing a feast but they've forgotten the recipes, family names, and how to set the table.

**Trail 1: "The Guest List"** — Family vocabulary
- Clearing 1-1: "Who's Who?" — Core family vocab (Match Up, Pick One)
- Clearing 1-2: "The Family Tree" — Relationships: X is Y's ___ (Fill the Gap, Pick One)
- Clearing 1-3: "Family Portraits" — Describe family members (Fix It, Fill the Gap)

**Trail 2: "The Shopping Trip"** — Food, quantities, house rooms
- Clearing 2-1: "What's on the List?" — Food vocab (Match Up, Word Build)
- Clearing 2-2: "How Much? How Many?" — Quantities (Fill the Gap, Pick One)
- Clearing 2-3: "Room by Room" — Rooms + furniture (Sort It, Match Up)
- Clearing 2-4: "Set the Table" — Table items + steps (Match Up, Order It)

**Trail 3: "What's Going to Happen?"** — Future tense, polite requests, prepositions
- Clearing 3-1: "Plans for the Party" — Future with "going to" (Fill the Gap, Pick One)
- Clearing 3-2: "Could You Help?" — Polite "could" requests (Fix It, Fill the Gap)
- Clearing 3-3: "Where Is Everything?" — Prepositions (Pick One, Fill the Gap)

**Trail 4: "Remember When?"** — Tenses, did, possession, weather
- Clearing 4-1: "What Did You Do?" — "Did" questions + short answers (Fill the Gap, Pick One)
- Clearing 4-2: "Now and Then" — Present vs. past mixed (Fix It, Snap Choice)
- Clearing 4-3: "It's Mom's Recipe" — Possessive 's (Fill the Gap, Fix It)
- Clearing 4-4: "What's the Weather?" — Weather + seasons vocab (Match Up, Pick One)

**Trail 5: "The Celebration" (Boss Trail)** — All Unit 5 combined
- Clearing 5-1: "Sophie's Family Time" — Story comprehension (Pick One, Order It)
- Clearing 5-2: "Thanksgiving" — Informational text (Pick One, Sort It)
- Clearing 5-3: "The Feast Challenge" — Mixed review (Snap Choice, Fill the Gap, Fix It)

### REALM 3: The Catbus City Tour (Unit 6 — Family Visit)

**Story:** Catbus has a new route but a windstorm mixed up all the street signs, schedules, and building names.

**Trail 1: "Morning Routine"** — Daily routines, sequence words, time
- Clearing 1-1: "Wake Up!" — Daily routine vocab (Match Up, Order It)
- Clearing 1-2: "First, Then, Finally" — Sequence words (Order It, Fill the Gap)
- Clearing 1-3: "What Time Is It?" — Telling time expanded (Match Up, Pick One)

**Trail 2: "Around the City"** — Transportation, places, rooms, city vs country
- Clearing 2-1: "How Do You Get There?" — Transport vocab (Match Up, Pick One)
- Clearing 2-2: "City Landmarks" — Buildings and places (Match Up, Word Build)
- Clearing 2-3: "My House, Your House" — Rooms + upstairs/downstairs (Sort It, Fill the Gap)
- Clearing 2-4: "City vs. Country" — Comparing vocab (Sort It, Pick One)

**Trail 3: "Whose Is It?"** — Possessives, descriptive adjectives
- Clearing 3-1: "My, Your, His, Her" — Possessive adjectives (Fill the Gap, Fix It)
- Clearing 3-2: "Ralph's Mom, Uncle's Suitcase" — Possessive 's (Fill the Gap, Pick One)
- Clearing 3-3: "The Biggest Building" — Descriptive adjectives for places (Pick One, Fill the Gap)

**Trail 4: "What Happened on the Tour?"** — Was/were, there is/are, sentence types, dates
- Clearing 4-1: "It Was Rainy" — was/were (Fill the Gap, Fix It)
- Clearing 4-2: "There Is a Library" — There is/are/aren't (Fill the Gap, Pick One)
- Clearing 4-3: "Ask, Tell, Say No" — Sentence types (Fix It, Pick One)
- Clearing 4-4: "The Calendar" — Ordinal numbers 1st–31st, dates (Match Up, Fill the Gap)

**Trail 5: "The Big Tour" (Boss Trail)** — All Unit 6 + some callbacks
- Clearing 5-1: "A City Tour" — Story comprehension (Pick One, Order It)
- Clearing 5-2: "Different Houses" — Informational text (Pick One, Sort It)
- Clearing 5-3: "The Final Challenge" — Mixed review all units (Snap Choice, Fill the Gap, Fix It, Order It)

## Clearing Structure (Each Individual Challenge Set)

Every Clearing follows this 5-part flow:

```
1. INTRO (~15 sec) — Brief story moment in 1–2 sentences
2. WARM-UP ROUND (2–3 tasks) — Easy tasks to build confidence
3. CORE ROUND (4–5 tasks) — The main skill, mixed formats
4. CHALLENGE ROUND (2–3 tasks) — Harder versions or mixed skills
5. RESULTS (~15 sec) — Acorns earned, streak, badges, brief story outro
```

Each Clearing contains 8–12 tasks total and takes approximately 5–7 minutes.

## Challenge Format Definitions

### Pick One
- Display a question/prompt
- Show 4 options as large, tappable buttons
- One correct answer, three distractors
- Green flash + acorn animation on correct
- Red shake + Soot Sprite sleep animation on wrong

### Fill the Gap
- Display a sentence with one blank (shown as an underline: ___)
- Either show 3–4 option buttons to pick from, OR a text input for spelling-focused Clearings
- Sentence context makes the answer clear

### Match Up
- Display 4–6 items on the left and 4–6 items on the right
- Player draws lines / taps pairs to connect them
- Items shuffle on each attempt
- When a correct pair is matched, both items glow and lock

### Fix It
- Display a sentence with one error (the error is NOT highlighted — Adam must find it)
- Show 3–4 options: the original error word + 2–3 alternatives
- Example: "They was happy." → Options: [was, were, is, are]

### Sort It
- Display 6–8 items and 2–3 labeled buckets
- Drag items into the correct bucket
- Example: buckets "Land" and "Water" — items: dolphin, eagle, whale, parrot, crocodile, penguin

### Order It
- Display 4–6 sentence fragments or events
- Player drags them into the correct sequence
- Numbered slots (1, 2, 3, 4...) to drag items into

### Snap Choice
- Rapid-fire true/false or pick-one questions
- 10 questions, timer counts down (8 seconds per question)
- Faster = more bonus acorns
- Fun pressure without being stressful (timer bar is a friendly color, not red)

### Word Build
- Display a definition or clue
- Display scrambled letters of the answer word
- Player taps letters in order to spell the word
- Wrong letter shakes; correct letter locks in place

## Scoring & Economy

### Acorns
| Action | Acorns |
|---|---|
| Correct answer (first try) | 3 |
| Correct answer (second try) | 1 |
| Streak bonus (5 in a row) | +5 |
| Streak bonus (10 in a row) | +15 |
| Clearing completed | +10 |
| Trail completed | +25 |
| Realm completed | +100 |

### Power-Up Shop
| Power-Up | Cost | Effect |
|---|---|---|
| Mei's Hint | 10 | Shows a clue or eliminates 1 wrong answer |
| Totoro's Roar | 20 | Eliminates 2 wrong answers |
| Catbus Skip | 30 | Skip 1 question, no penalty |
| Soot Sprite Rescue | 40 | Restore 1 lost life |

### Lives (Soot Sprites)
- Start each Trail with 5
- Lose 1 per wrong answer (can retry, but no first-try bonus)
- If all lost → restart current Clearing only (not whole Trail)
- Earn 1 bonus Soot Sprite at each Clearing completion

### Stars
Each Clearing awards 1–3 stars:
- ⭐ Completed
- ⭐⭐ 80%+ correct on first try
- ⭐⭐⭐ 100% correct on first try

### Achievements
- "Forest Scholar" — Complete all Trails in Realm 1
- "Feast Helper" — Complete all Trails in Realm 2
- "City Guide" — Complete all Trails in Realm 3
- "Perfect Trail" — Any Trail with no wrong answers
- "Speed Runner" — Complete a Clearing in under 3 minutes
- "Word Collector" — Encounter 100 unique vocabulary words
- "Grammar Guardian" — 50 grammar questions correct in a row
- "Streak Legend" — 15-answer streak
- "Acorn Millionaire" — Collect 500 total acorns
- "Totoro's Friend" — Complete the entire game
- "Perfectionist" — 3-star every Clearing

## Game Screens

### 1. Title Screen
- "Totoro's Forest Academy" title in Fredoka One
- Large CSS/SVG Totoro silhouette against a forest background
- "Play" button (or "Continue" if save exists)
- "Settings" button (small, bottom corner)
- Soft floating particle animation (leaves, acorns)

### 2. World Map
- Shows 3 Realms as distinct areas on a hand-drawn style map
- Completed Realms: bright, colorful, animated (leaves blowing, birds flying)
- Current Realm: pulsing glow, accessible
- Locked Realms: covered in fog, greyed out
- Click/tap a Realm to enter its Trail view

### 3. Trail View (inside a Realm)
- Shows 4–5 Trails as paths through the landscape
- Each Trail shows its name, Clearing count, and star progress
- Completed Trails: path is clear, glowing
- Current Trail: accessible, slightly animated
- Locked Trails: foggy, but visible

### 4. Clearing Screen (Gameplay)
- Top bar: Soot Sprites (lives), Acorn counter, power-up buttons, pause button
- Center: the current task (format varies — see Challenge Formats above)
- Bottom: progress dots showing which task in the Clearing you're on (like ● ● ○ ○ ○)
- Animated transitions between tasks

### 5. Results Screen (after each Clearing)
- Stars earned (animate each star appearing)
- Acorns earned (counter animation)
- Streak info
- Any new achievements (popup with badge)
- "Next Clearing" button or "Back to Trail" button

### 6. Trail Completion Cutscene
- 2–3 panels with CSS/SVG illustrations
- Simple narrative text (1 short sentence per panel)
- Shows the forest changing (fog clearing, new area lighting up)
- Auto-advance with tap/click, or after a few seconds

### 7. Realm Completion Cutscene
- 4–5 panels, more elaborate than Trail cutscenes
- Totoro celebration animation
- "Realm Restored!" announcement
- Unlock animation for next Realm

### 8. Shop Screen
- Grid of power-ups with icons, names, one-line descriptions, and prices
- Current acorn balance at the top
- "Buy" buttons (disabled if not enough acorns)
- Friendly: "These will help you on hard questions!"

### 9. Achievements Screen
- Grid of all achievement badges
- Unlocked: full color with name and description
- Locked: greyed out silhouette with "???" description
- Simple, satisfying layout

### 10. Settings Screen
- Toggle music/sound effects (if implemented)
- "Replay Tutorial" button
- "Reset Progress" button (with "Are you sure?" confirmation)
- Player name display

## Visual Design

### Color Palette
```css
--forest-green-dark: #2D5016;
--forest-green: #4A7C28;
--forest-green-light: #6AAF35;
--earth-brown: #8B6914;
--sky-blue: #87CEEB;
--cream: #FFF8DC;
--warm-gray: #D3D3C7;
--acorn-gold: #DAA520;
--soot-black: #2C2C2C;
--error-soft: #FF6B6B;
--success-green: #4CAF50;
```

### Totoro Art Style (CSS/SVG)
- Totoro: large rounded gray (#777) body, pointed ears, wide belly with chevrons, large round eyes, whiskers — made from CSS shapes or inline SVG
- Soot Sprites: small black circles (#2C2C2C) with two white dot eyes — very simple
- Catbus: simplified to an orange/brown bus shape with cat ears and eyes
- Acorn: simple brown oval with a cap on top
- All art should be achievable with CSS shapes, gradients, and inline SVG — no external image files required

### Typography
- Headings: "Fredoka One", cursive — rounded, playful, large
- Body text: "Nunito", sans-serif — clean, readable, friendly
- Minimum body text size: 18px (this is for an 8-year-old)
- Button text: 20px minimum
- Question text: 22px minimum

### Animations
- Correct answer: green border flash, subtle confetti burst, acorn flies to counter
- Wrong answer: gentle red shake (not violent), Soot Sprite slowly closes its eyes
- Streak: golden glow that intensifies with each consecutive correct answer
- Level up / Trail complete: burst of leaves
- Realm complete: big celebration — confetti, leaves, Totoro jumping

## JSON Schema for Clearing Content

Each Clearing is a JSON file at `src/data/realm-{N}/trail-{N}/clearing-{N}-{N}.json`:

```json
{
  "id": "clearing-1-1",
  "name": "Who Lives Here?",
  "realm": 1,
  "trail": 1,
  "focus": "Core animal vocabulary",
  "storyIntro": "The forest animals have lost their names! Can you help them remember?",
  "storyOutro": "The animals are so happy! They remember their names now!",
  "tasks": [
    {
      "id": "t1",
      "type": "pick_one",
      "round": "warmup",
      "prompt": "What animal has a very long neck?",
      "options": ["giraffe", "snake", "dolphin", "eagle"],
      "correctIndex": 0,
      "hint": "It's very tall and lives in Africa.",
      "acornValue": 3
    },
    {
      "id": "t2",
      "type": "match_up",
      "round": "core",
      "prompt": "Match each animal to its home.",
      "pairs": [
        { "left": "dolphin", "right": "ocean" },
        { "left": "parrot", "right": "forest" },
        { "left": "camel", "right": "desert" },
        { "left": "penguin", "right": "ice" }
      ],
      "hint": "Think about where each animal lives.",
      "acornValue": 3
    },
    {
      "id": "t3",
      "type": "fill_the_gap",
      "round": "core",
      "prompt": "The ___ has a long tail and lives in trees.",
      "options": ["monkey", "whale", "penguin", "shark"],
      "correctIndex": 0,
      "hint": "It likes to climb.",
      "acornValue": 3
    },
    {
      "id": "t4",
      "type": "sort_it",
      "round": "challenge",
      "prompt": "Sort these animals!",
      "buckets": ["Land", "Water"],
      "items": [
        { "text": "eagle", "correctBucket": "Land" },
        { "text": "dolphin", "correctBucket": "Water" },
        { "text": "lion", "correctBucket": "Land" },
        { "text": "whale", "correctBucket": "Water" },
        { "text": "bear", "correctBucket": "Land" },
        { "text": "shark", "correctBucket": "Water" }
      ],
      "hint": "Does it live on land or in water?",
      "acornValue": 3
    }
  ]
}
```

Note: The examples above are illustrative. The actual content must come from Adam's textbook (the PDFs in the /textbook folder). Extract real vocabulary, real grammar patterns, and real reading passages.

## Project File Structure

```
totoro-forest-academy/
├── textbook/                    ← Adam's textbook PDFs (input only)
├── public/
│   └── favicon.ico
├── src/
│   ├── data/
│   │   ├── realm-1/
│   │   │   ├── trail-1/
│   │   │   │   ├── clearing-1-1.json
│   │   │   │   ├── clearing-1-2.json
│   │   │   │   ├── clearing-1-3.json
│   │   │   │   └── clearing-1-4.json
│   │   │   ├── trail-2/
│   │   │   ├── trail-3/
│   │   │   ├── trail-4/
│   │   │   └── trail-5/
│   │   ├── realm-2/  (same structure)
│   │   ├── realm-3/  (same structure)
│   │   ├── cutscenes.json
│   │   └── achievements.json
│   ├── context/
│   │   └── GameContext.jsx       ← Global state, save/load
│   ├── components/
│   │   ├── TitleScreen.jsx
│   │   ├── Tutorial.jsx
│   │   ├── WorldMap.jsx
│   │   ├── TrailView.jsx
│   │   ├── ClearingScreen.jsx
│   │   ├── ResultsScreen.jsx
│   │   ├── Cutscene.jsx
│   │   ├── Shop.jsx
│   │   ├── Achievements.jsx
│   │   ├── Settings.jsx
│   │   ├── HUD.jsx               ← Top bar (lives, acorns, power-ups)
│   │   └── challenges/
│   │       ├── PickOne.jsx
│   │       ├── FillTheGap.jsx
│   │       ├── MatchUp.jsx
│   │       ├── FixIt.jsx
│   │       ├── SortIt.jsx
│   │       ├── OrderIt.jsx
│   │       ├── SnapChoice.jsx
│   │       └── WordBuild.jsx
│   ├── art/
│   │   ├── Totoro.jsx            ← SVG/CSS Totoro component
│   │   ├── SootSprite.jsx
│   │   ├── Catbus.jsx
│   │   ├── Acorn.jsx
│   │   └── ForestBackground.jsx
│   ├── hooks/
│   │   ├── useGameState.js
│   │   ├── useTimer.js
│   │   └── useAchievements.js
│   ├── utils/
│   │   ├── scoring.js
│   │   └── contentLoader.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── CLAUDE.md                     ← This file
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Build Instructions for Claude Code

1. **First:** Read all PDFs in `/textbook` to understand the textbook content.
2. **Second:** Generate all clearing JSON files based on the textbook content + the structure above. Every word, sentence, and passage must come from the actual textbook.
3. **Third:** Initialize the project with `npm create vite@latest . -- --template react`, then `npm install`, then add Tailwind CSS.
4. **Fourth:** Build GameContext.jsx first (the entire state management + localStorage save/load).
5. **Fifth:** Build screens in this order: TitleScreen → Tutorial → WorldMap → TrailView → ClearingScreen (with all 8 challenge components) → ResultsScreen → Cutscene → Shop → Achievements → Settings.
6. **Sixth:** Add all visual art components (Totoro, Soot Sprites, etc.).
7. **Seventh:** Add animations and polish.
8. **Eighth:** Test the full game flow from title screen through Realm 1 completion.
