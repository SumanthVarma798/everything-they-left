# Two-person split — Everything They Left

**A (Sumanth): the game.** The hero. index.html + lib/engine.js, RUNBOOK §6 prompts A→E.
**B (partner): the hangar + pause.** Everything you can *read and listen to* about what Bhoomi has found.

They meet at exactly one file: **`lib/progress.js`** (already written, tested, on main). Nobody else's files overlap,
so you can both commit all afternoon without stepping on each other.

---

## Who owns which files

| Owner | Files | Never touches |
|---|---|---|
| **A · game** | `index.html`, `lib/engine.js` | `lib/hangar.*`, `hangar.html` |
| **B · hangar** | `lib/hangar.js`, `lib/hangar.css`, `hangar.html` | `index.html`, `lib/engine.js` |
| **both, read-only** | `content.js`, `data/` (incl. `data/archive.js`), `assets/`, `lib/{stage3d,hud,interactions,notebook,era,archive-map,attempt-map}.js`, `check.mjs` | — |
| **shared, edit only by agreement** | `lib/progress.js` | — |

If you think you need a change in a read-only file, say so in chat first. It's almost always avoidable.

---

## The contract: `lib/progress.js`

The game unlocks; the hangar renders. Neither reaches into the other.

```js
import { PROGRESS, ids } from './lib/progress.js';

PROGRESS.unlock(ids.chapter('air'));   // → true if newly unlocked; fires 'etl:unlock' on document
PROGRESS.has(id) · PROGRESS.all() · PROGRESS.reset()
PROGRESS.entries(CONTENT, missions)    // → 75-entry catalogue, each { id, kind, unlocked, ... }

document.addEventListener('etl:unlock', e => { /* e.detail = { id, kind, count } */ });
```

**IDs are derived from content.js structure**, so adding story never means editing an unlock list:

| id | when A unlocks it |
|---|---|
| `chapter:air` | the chapter's alarm beat starts |
| `find:move:1` | the finds beat is shown |
| `fix:air` | the interaction is won (payoff beat) |
| `moment:signal:0` · `moment:opener:1` · `moment:finale:3` | that relive scene is shown |
| `artifact:drill-im2` (4 of them) | its chapter's payoff — these are the salvage pins |
| `mission:Chandrayaan-3` (17) | the salvage map scrub passes its beat |
| `screen:map` · `screen:epilogue` | that screen is reached |

**Catalogue kinds (107 entries):** `event` 31 · `moment` 23 · `find` 18 · `mission` 17 · `chapter` 6 · `fix` 6 ·
`artifact` 4 · `screen` 2. Call it as `PROGRESS.entries(CONTENT, missions, ARCHIVE)` — `ARCHIVE` is
`data/archive.js`, read-only like the rest of the data.
Every entry carries `title, text, year, img, audio, sources`, plus `mission` (the real data row) on artifacts/missions,
and `projected + basis` where it applies. Persistence: `localStorage['etl-progress']`.

**B builds fully unlocked:** `hangar.html?unlock=all`. `?unlock=none` clears. No need to wait for A's engine.

---

## B's job, in order

1. **`hangar.html` + `lib/hangar.js` + `lib/hangar.css`** — standalone page first, so it's testable alone.
   Model it on the artemis3-dashboard hangar (`~/myWorkshop/Projects/artemis3-dashboard/web-sim/rockets.js`):
   left list, right stage with a big visual, a spec grid, and the attribution line.
   - Filter tabs by kind; locked entries show as silhouettes with a hint of where they're found ("Chapter 3").
   - `moment` entries render with `eraFrame(img, year, {date, live})` from `lib/era.js` — each era keeps its own
     camera look. `find` entries render as pencil (`<img class="sketch">` + `ensurePencil()` from `lib/notebook.js`).
   - **Read or listen**: entries with `audio` get a play button (real NASA clips); everything has its text and sources.
   - `artifact` entries are the deep ones: the object, its mission row (year, country, outcome, note), why Bhoomi
     needed it, and what she did with it. These are the "more detailed versions" that unlock as she finds things.
2. **`mountHangar(root, { filter, onClose })`** exported from `lib/hangar.js`, so A can mount it inside the game
   later with one line. Same for **`mountPause(root, { onResume })`** — the pause overlay is the compact view of
   the same catalogue (what you've found so far, read or listen, resume).
3. **Live updates:** listen for `etl:unlock` and light up the new entry (a badge, a soft flash). Never poll.

**Acceptance (run these yourself):** `node check.mjs` passes · console clean · `hangar.html?unlock=all` shows all 107 ·
`?unlock=none` shows all locked · audio plays on click, never on load · works at 390×844 · no frameworks, no build step.

---

## Git flow

- A works on `main`. B works on `hangar` and opens a PR (or pushes to `main` if you'd rather — the file split means
  conflicts are near-impossible; the only risk is both editing `lib/progress.js`).
- Both: `git pull --rebase` before you push. Small commits. `node check.mjs` before every push.
- Add B as a collaborator: `gh repo add-collaborator SumanthVarma798/everything-they-left <their-github-username> --permission push`

## Optional assets for the hangar
A CC-BY Starship glTF exists in the old prep folder if B wants a 3D piece in the stage:
`cp -R ~/myWorkshop/Projects/hold-your-breath/assets/models/starship assets/models/`
Credit required, exactly: *"SpaceX Starship - Spaceship" by MOJackal (sketchfab.com/MOJackal), CC BY 4.0*. Add it to CREDITS.md.

---

## How the hangar is designed

**One idea:** the hangar is not a menu, it is *what she has and what she now knows*. It has three rooms, and each
room already has a rendering style built for it — so this is assembly, not invention.

### 1 · SALVAGE BAY — what she physically has (`artifact` 4, `fix` 6)
The artemis3-dashboard treatment: list left, big stage right, spec grid under it. These are the only entries that
get the full three-column spec panel, because they're the only ones that are *objects*.

Every artifact card answers four questions in this order, and nothing else:

| Row | Source |
|---|---|
| **THE OBJECT** — what it is, what it's made of | `entry.title` + `entry.text` |
| **THE MISSION** — year · country · outcome · why it stopped | `entry.mission` (the real row from `data/missions.json`) |
| **HOW IT GOT THERE** — the failure that left it on the ground | `entry.text` (salvage beat log) |
| **WHAT SHE DID WITH IT** — the fix it became | the matching `fix:<chapter>` entry |

One control: a **dead ⇄ alive** toggle. Dead = the wreck, shown through `eraFrame()` in its own year's camera
(IM-2 2025 is HD, Apollo 11 1970 is film). Alive = her pencil sketch of the same object doing its new job,
through `ensurePencil()`. That single toggle *is* the story of the game in one gesture; it's worth more than any
3D model, so build it before you even think about `<model-viewer>`.

### 2 · THE LOG — what she saw (`moment` 23, `find` 18, `mission` 17, `chapter` 6, `screen` 2)
Chronological by chapter, not by year — this is her run, in order. `moment` entries keep their era camera
(`eraFrame`), `find` entries stay pencil (`ensurePencil`), `mission` entries are one-line rows with the data
behind them. This room is a reading view: text, sources, and a play button wherever `entry.audio` exists.

### Whose voice the library is in
`CONTENT.companion` is **SARATHI-7**, the outpost school's teaching unit: 400 lessons, a burnt index, and the
reason every flashback happens (RUNBOOK §1). It matters to you in two places: `companion.cues['air:0']` is the
line that surfaced that memory — show it on `moment` cards in the dossier and the log, in SARATHI's voice, so the
player can see *why* she remembered it. And the Lunar Library room is the contrast to SARATHI: its 400 lessons
against 30 million pages. A line at the top of that room — "SARATHI-7 had four hundred lessons. This is the rest."
— earns the whole room.

### 3 · THE LUNAR LIBRARY — what she read (`event` 31, `data/archive.js`)
The 31 things that never happen in the six chapters: Salyut 7 thawed by hand, Skylab's parasol, the Mars picture
coloured in with pastels, Hayabusa's two broken engines wired into one, Voyager 1 patched from 24 billion km,
MOXIE, Venera 7, Polaris Dawn, PSLV's 104, Pushpak, the 2040 Indian landing her great-grandmother beat by a year.

**These have no photographs, by design** — in-story she is reading the Lunar Library, 30 million pages etched on
nickel plates. So render them as *plates*: etched type on metal, no images, ever (`check.mjs` enforces `img: null`).
Under each plate, her own line about it in Caveat handwriting (`entry.why`) — the record is theirs, the margin note
is hers.

**They unlock by rhyme, not by list.** Each archive entry names one story id in `entry.with`; it appears the moment
that id unlocks. Salyut 7 arrives when she survives the lunar night. Hayabusa arrives when she fixes the rover.
So the library visibly grows *because* of what she just did — that's the whole "unlock more detailed versions"
mechanic, and it costs you no state of your own: `unlocked` is already computed for you.

### Locked entries
Show the plate, not the fact: correct size, title replaced by a row of struck-through blocks, and one grey line —
`Found in Chapter 3`. Never render the text or the `why` of a locked entry; the hangar must not spoil a chapter
nobody has played. A newly unlocked entry (from the `etl:unlock` event) gets one soft flash and a `NEW` dot.

### Counts on the shell
`WHAT I'VE FOUND · 12 / 107` at the top, and per-room counts in the left rail. The number climbing is the reward.

---

## B's prompts (paste into Cursor, in order)

Before prompt H1: `git clone https://github.com/SumanthVarma798/everything-they-left.git && cd everything-they-left && python3 -m http.server 8765`

### Prompt H0: orientation (paste this first, before H1)
```
You're joining a two-person, three-hour build at Cafe Cursor Hyderabad. Read HANDOFF.md, RUNBOOK.md §0-§2 and
.cursor/rules/everything-they-left.mdc before writing anything, then tell me in three lines what you understood
about (a) the story, (b) which files are yours, (c) how unlocking works. Don't write code in this first step.

The project: "Everything They Left". 2150 - Bhoomi, born on the Moon, named for the Earth she has never cared
about. A solar superstorm kills every chip on the Moon; to survive long enough to call Earth she has to use
humanity's space history as her survival manual and its 56 failed Moon missions as her parts catalogue. Six
chapters: air, move, night, library, water, signal. Every historical fact is real and sourced (content.js);
anything dated after Sept 2026 is flagged projected:true and is drawn, never photographed.

Stack: plain HTML + CSS + ES modules. No framework, no bundler, no build step, no npm install. Serve over http
(python3 -m http.server 8765) - ES modules break on file://. three.js and rough.js are already vendored.

The split: Sumanth is building the game (index.html + lib/engine.js). YOU are building the second half - the
pause view and the hangar: everything the player can read or listen to about what Bhoomi has discovered so far,
and the deeper versions that unlock as she finds more. You own exactly three files:
lib/hangar.js, lib/hangar.css, hangar.html. Create them; they don't exist yet.

Do NOT edit: index.html, lib/engine.js, content.js, data/, assets/, check.mjs, or any other lib/*.js. Those are
either his or shared read-only. If you think you need a change in one, say so instead of making it.

The contract between the two halves is one file, lib/progress.js (read it now, don't edit it):
  PROGRESS.entries(CONTENT, missions, ARCHIVE) -> 107 catalogue entries, each { id, kind, unlocked, title, text,
    year, img, audio, sources } and, on artifacts and missions, the real `mission` row from data/missions.json.
    kinds: event 31, moment 23, find 18, mission 17, chapter 6, fix 6, artifact 4, screen 2.
    data/archive.js is the Lunar Library: 31 real events that never appear in the six chapters, each unlocking
    alongside the story beat named in its `with` field.
  document 'etl:unlock' event -> fires when the game unlocks something; detail = { id, kind, count }.
His engine calls PROGRESS.unlock(id); you only read and listen. Because of that you never need his build to
test yours: hangar.html?unlock=all shows everything, ?unlock=none shows it all locked.

Git: work on a branch called `hangar`, `git pull --rebase` before every push, and run `node check.mjs` before
every push (it validates content and assets with no browser). Small commits.

Then do Prompt H1, then Prompt H2, both in HANDOFF.md.
```
### Prompt H1: the hangar page
```
Read HANDOFF.md and .cursor/rules first. You own lib/hangar.js, lib/hangar.css and hangar.html — do not edit
index.html, lib/engine.js, content.js or any other lib/*.js (another person is building the game in those).

Build hangar.html + lib/hangar.js + lib/hangar.css: a full-screen catalogue of everything Bhoomi has discovered.
Data comes from PROGRESS.entries(CONTENT, missions, ARCHIVE) in lib/progress.js — 107 entries of kind
event/moment/find/mission/chapter/fix/artifact/screen, each with { id, kind, unlocked, title, text, year, img,
audio, sources } and, on artifacts and missions, a real `mission` row from data/missions.json. Import ARCHIVE
from data/archive.js; load missions with fetch('data/missions.json'). Develop against hangar.html?unlock=all
(?unlock=none clears). Build the three rooms exactly as the "How the hangar is designed" section above describes
— salvage bay (with the dead/alive toggle), the log, and the Lunar Library of etched plates.

Layout, modelled on the artemis3-dashboard hangar: left a scrollable list grouped by kind with filter chips;
right a stage with the big visual, the title, the year, the text, the spec grid and the source links.
- moment entries: render the image through eraFrame(img, year, {date, live}) from lib/era.js so each era keeps
  its own camera look (engraving / 16mm / film / VHS / early digital / HD).
- find entries: <img class="sketch"> plus ensurePencil() from lib/notebook.js (pencil look). Render ≥320px wide.
- artifact entries are the deep ones: the object, its mission row (year · country · outcome · note), what Bhoomi
  used it for, and the dead/alive toggle (wreck through eraFrame ⇄ her pencil sketch of its new job).
- event entries (the Lunar Library) are etched nickel plates: no images ever, her `why` line under the record in
  Caveat. They unlock by their `with` field — the catalogue has already worked that out for you.
- entries with `audio`: a play button (never autoplay). Everything: its text + sources, so it can be read.
- locked entries: silhouette + where it's found ("Chapter 3"), never the spoiler text.
Export mountHangar(root, { filter, onClose }) so the game can mount it later. Listen for document 'etl:unlock'
and light up newly unlocked entries live. Plain HTML/CSS/ES modules, no framework, no build step.

Self-check before you say done: node check.mjs passes · console clean · ?unlock=all shows all 107 and every image
loads · ?unlock=none shows everything locked · audio only on click · works at 390×844.
```
### Prompt H2: the pause view
```
Add mountPause(root, { onResume }) to lib/hangar.js + styles in lib/hangar.css: a compact overlay over the
paused game — dimmed backdrop, "WHAT I'VE FOUND · 23 of 75", the unlocked entries newest-first as a compact
list (read or listen inline), a "Hangar ▸" button that calls mountHangar, and Resume. Esc resumes. Same data
source, same files; still do not touch index.html or lib/engine.js. Test it on hangar.html?pause=1&unlock=all.
```
### Prompt H3: the dossier strip + the timeline (after H1)
```
The game page is now a scroll spine (RUNBOOK §2 "The page"): §2 is the play window, §3 is a dossier strip
directly below it, §4 is your hangar. Add two things to lib/hangar.js + lib/hangar.css, same ownership rules.

1. mountDossier(root, { onBack }) — the live strip under the play area. The most recently unlocked entries,
newest first, as a horizontally scrollable row of cards; click a card to expand it in place to the full record
(image in its era frame or pencil, text, her `why` line for library plates, sources, audio button). It listens
for document 'etl:unlock' and prepends the new entry with a flash and a NEW dot, so it updates while the player
watches. A persistent "↑ Back to the surface" button calls onBack. Empty state before anything is unlocked:
"Whatever she finds down there will show up here." Nothing in this strip ever autoplays audio or video.

2. The timeline rail in mountHangar: a horizontal rail from 1857 to 2150. Every unlocked entry lights its year;
everything else stays dark. Use PROGRESS.reach(catalogue) -> { count, total, years[], first, last } — years[] is
the sorted list of years she has actually reached. Clicking a lit year filters the list to that year. Show
"WHAT I'VE FOUND · {count} / {total}" above it.

Note on why it is not a simple "everything up to year X" gate: the prologue relives 1859, 2022 and 2024 in the
first minute, so a max-year gate would open almost the whole library before chapter 1. Lighting the years she has
actually touched gives the same in-sync feeling and stays honest to a story told out of order.

Self-check: node check.mjs · console clean · ?unlock=all lights the whole rail · ?unlock=none leaves it dark ·
the strip grows when you fire document.dispatchEvent(new CustomEvent('etl:unlock',{detail:{id:"chapter:air"}})) ·
390x844 works · no autoplay.
```
