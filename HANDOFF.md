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
| **both, read-only** | `content.js`, `data/`, `assets/`, `lib/{stage3d,hud,interactions,notebook,era,archive-map,attempt-map}.js`, `check.mjs` | — |
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

**Catalogue kinds:** `moment` 23 · `find` 18 · `mission` 17 · `chapter` 6 · `fix` 6 · `artifact` 4 · `screen` 1.
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

**Acceptance (run these yourself):** `node check.mjs` passes · console clean · `hangar.html?unlock=all` shows all 75 ·
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

## B's prompts (paste into Cursor, in order)

Before prompt H1: `git clone https://github.com/SumanthVarma798/everything-they-left.git && cd everything-they-left && python3 -m http.server 8765`

### Prompt H1: the hangar page
```
Read HANDOFF.md and .cursor/rules first. You own lib/hangar.js, lib/hangar.css and hangar.html — do not edit
index.html, lib/engine.js, content.js or any other lib/*.js (another person is building the game in those).

Build hangar.html + lib/hangar.js + lib/hangar.css: a full-screen catalogue of everything Bhoomi has discovered.
Data comes from PROGRESS.entries(CONTENT, missions) in lib/progress.js — 75 entries of kind moment/find/mission/
chapter/fix/artifact/screen, each with { id, kind, unlocked, title, text, year, img, audio, sources } and, on
artifacts and missions, a real `mission` row from data/missions.json. Load missions with
fetch('data/missions.json'). Develop against hangar.html?unlock=all (?unlock=none clears).

Layout, modelled on the artemis3-dashboard hangar: left a scrollable list grouped by kind with filter chips;
right a stage with the big visual, the title, the year, the text, the spec grid and the source links.
- moment entries: render the image through eraFrame(img, year, {date, live}) from lib/era.js so each era keeps
  its own camera look (engraving / 16mm / film / VHS / early digital / HD).
- find entries: <img class="sketch"> plus ensurePencil() from lib/notebook.js (pencil look). Render ≥320px wide.
- artifact entries are the deep ones: the object, its mission row (year · country · outcome · note), what Bhoomi
  used it for. These are the "more detailed versions" that unlock as she finds things.
- entries with `audio`: a play button (never autoplay). Everything: its text + sources, so it can be read.
- locked entries: silhouette + where it's found ("Chapter 3"), never the spoiler text.
Export mountHangar(root, { filter, onClose }) so the game can mount it later. Listen for document 'etl:unlock'
and light up newly unlocked entries live. Plain HTML/CSS/ES modules, no framework, no build step.

Self-check before you say done: node check.mjs passes · console clean · ?unlock=all shows all 75 and every image
loads · ?unlock=none shows everything locked · audio only on click · works at 390×844.
```
### Prompt H2: the pause view
```
Add mountPause(root, { onResume }) to lib/hangar.js + styles in lib/hangar.css: a compact overlay over the
paused game — dimmed backdrop, "WHAT I'VE FOUND · 23 of 75", the unlocked entries newest-first as a compact
list (read or listen inline), a "Hangar ▸" button that calls mountHangar, and Resume. Esc resumes. Same data
source, same files; still do not touch index.html or lib/engine.js. Test it on hangar.html?pause=1&unlock=all.
```
