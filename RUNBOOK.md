# EVERYTHING THEY LEFT — Saturday Runbook

Everything you need to **execute, test, improve** on Sat 12 Sep 2026, 12:00–15:00 IST (Cafe Cursor Hyderabad).
Nothing here needs deciding. If something isn't in this file, the answer is in `content.js` (story), `PLAN.md`
(why), `CREDITS.md` (licences), or `prototypes.html` (working code to copy from).

---

## 0. The one-paragraph version

A single-page web experience. **2150: Bhoomi (“the Earth”), born on the Moon, has ignored Earth her whole life.**
A solar superstorm kills every chip on the Moon; she has to survive long enough to call Earth, and the only
manual left is the history of how Earth got there: plaques she never read, a real Lunar Library on a tipped-over
lander, and the 55 failed missions that are now her spare parts. She goes from **despair → curiosity → inspiration**,
ends by choosing Earth (PRL, Ahmedabad, to study), and keeps Mars “rescheduled”. Every historical fact is real
and sourced. The present is **pencil sketches**; the past she relives plays **in colour through each era's camera**.

**Start tomorrow with:**
```bash
cd ~/myWorkshop/Projects/everything-they-left && python3 -m http.server 8765
```
then open `http://localhost:8765/prototypes.html` (working pieces) and `http://localhost:8765/story.html` (the whole story).

---

## 1. The story

### Arc
| Part | Mood | What changes in her |
|---|---|---|
| Prologue, Ch 1 | **despair** | Storm, Mars dream dead, twenty years of names she never read |
| Ch 2–4 | **curiosity** | She starts to *want* to know how they did it; the library |
| Ch 5, Ch 6, Epilogue | **inspiration** | Failures became parts; they failed in public and came back; so will she |

**Rhythm inside every chapter:** DANGER (2150 HUD) → she searches (**pencil notebook**) → ACT (interaction) →
BREATH (safe for now) → WONDER (relives the people behind it, **in colour, era camera**) → one line.
People don't daydream in danger. They only wonder once they're safe.

**Route:** Shackleton (89.7°S) → drive → Malapert A / IM-1 Odysseus (80.13°S 1.44°E) → Mons Mouton / IM-2 (84.79°S
29.20°E) → Vikram / Chandrayaan-3 (69.37°S 32.32°E).

### Beat by beat (full text lives in `content.js`)
| # | Title | Danger (2150) | She finds (pencil) | Act | Relived (era) | Wonder |
|---|---|---|---|---|---|---|
| P | **Eleven Minutes** | L1 Sun-watcher gave 11 min warning; every chip dead; Mars transfer was 9 days away; regulator jams | — | **HOLD** your breath | Carrington 1859 (engraving) · Aditya-L1 2024 (HD) | “Earth got warned. More than once.” |
| 1 | **The Heritage Wall** · AIR | CO₂ rising, square cartridge / round port | Plaques she never read; Apollo 13 mailbox | **DRAG** 4 scraps → adapter | Apollo 13 MCC + Mattingly 1970 (film) · Kalpana Chawla 2003 (digital) · Sarabhai (B&W) | “Twenty years I walked past their names…” |
| 2 | **Motors Don’t Need Brains** · MOVE | 300 km drive, rover brain dead, maths in pencil, fender snaps | Katherine Johnson 1962 · Apollo 17 map fender 1972 · APPLE on a ₹150 bullock cart 1981 | **DRAG** maps+clamps+tape → fender | Johnson 1962 (B&W) · Cernan’s “TDC” 1972 (film) · Thumba 1963 (B&W) | “…I’m navigating with a pencil. I’m in good company.” |
| 3 | **Night Falls** · POWER | Sunset, 31%, old computer flashing 1202 | Apollo 13 power-down · Apollo 11 1202 / Hamilton | **BALANCE** power as it falls | Apollo 11 MCC + insurance envelopes 1969 (film) · India's cryogenic engine 1993→2010→2014, one line on Nambi Narayanan (HD) | “When they couldn’t buy the part, they built it…” |
| 4 | **The Library** · KNOW | Odysseus on its side, library under dust, night, earthshine | How Odysseus fell (the switch) · Lunar Library, 30M pages on nickel | **FOCUS** the magnifier | IM-1 2024 (HD LIVE) · Chandrayaan-2 → “Welcome, buddy!” 2023 (HD LIVE) | “…I read until the battery warning. Then I read some more.” → **SALVAGE MAP** |
| 5 | **Finish Its Job** · WATER | 9 L left, recycler dead | IM-2’s tipped drill 2025 · Chandrayaan-1 + LCROSS ice | **DRAG** the drill into the dark crater | LCROSS team + Chandrayaan-1 2009 (digicam) · Gene Shoemaker 1999 | “…He’s a few craters from my ice now.” |
| 6 | **Call Earth** · SIGNAL | No radio, 384,400 km | Lasers since 1969 · Lunokhod mirror lost & found · Vikram’s biscuit mirror (627 km) + the 40 cm hop | **MORSE** SOS on the mirror | Sputnik 1957 (B&W) · Dhawan & Kalam 1979 · Chandrayaan-3 / Shiv Shakti 2023 (HD LIVE) | “Every one of them failed in public first. Then came back.” → green flicker “R” |
| E | **Bhoomi** | “WHO ARE YOU?” … “MARS OR EARTH?” → “Earth. I skipped a lot of homework.” | The last plaque: **2041 · Chandrika Devi** | — | **Montage:** Earthrise 1968 · Rakesh Sharma 1984 (VHS) · Shubhanshu Shukla 2025 · Mangalyaan 2014 | Chandrika (“moonlight”), born on Earth, named for the Moon; Bhoomi, born on the Moon, named for the Earth. “It wasn’t a joke. It was a reminder.” → PRL Ahmedabad → “Mars isn’t cancelled. It’s rescheduled.” → **“Everything I needed, they left here for me… What will you leave?”** |

Fiction: Bhoomi, Chandrika Devi, the family, the storm, the rescue. Real: everything else (38 source links in `content.js`).

---

## 2. The website: layout and flow

### Layers (one full-viewport 16:9 stage, bottom to top)
```
┌──────────────────────────────────────────────────────────────┐
│ 5  #dev        ?debug=1 element-name labels                   │
│ 4  .visor-panel  timed interaction (lower third, glass)       │  ← mountInteraction()
│ 3  #cut        cutscene layer: letterbox, typed lines,        │  ← engine renderers
│                notebook paper cards, full-bleed era frames    │
│ 2  .visor-frame  HUD (edges only, centre clear)               │  ← mountHud()
│ 1  #stage      three.js Moon / Earth / stars                  │  ← createStage()  (no WebGL → .still photo)
└──────────────────────────────────────────────────────────────┘
```
HUD positions: objective top-left · O₂ bar + compass top-centre · O₂ clock + **timer switch** top-right ·
salvage radar bottom-left · power/water bottom-right. Fail = red edge pulse, never full-screen.

### Screen flow (the engine plays this list top to bottom)
```
title → prologue → opener(HOLD) → relive×2 → wonder → motivation
  → [chapter ×6: fly → alarm(+plan sketch) → finds → act → payoff(+SOLVED BEFORE) → relive×2–3 → wonder → hook]
      (after chapter 4: salvage map — paper page → "Look up ▸" → cinematic)
  → epilogue: reply → montage(4 × 4 s) → impossible-things page → plaque → choice → closing → credits
```
### Beat renderers (what each beat looks like)
| Beat | Looks like | Advances on |
|---|---|---|
| `title` | 3D Moon slowly spinning, “EVERYTHING THEY LEFT” + “Bhoomi, 2150”, then “Hold your breath.” [PRESS & HOLD SPACE] | the hold (also unlocks audio) |
| `line` | letterbox bars; mono text typed at 45 ch/s | click / Enter / Space, or auto after text + 1.5 s |
| `alarm` | HUD objective + red status, 3-beep Web Audio alarm, log typed, plan sketch draws itself (`drawPlan`) | click |
| `finds` | paper card slides up; handwriting (Caveat); photos with `.sketch` pencil filter | click |
| `act` | `mountInteraction(hud.panel, interaction)` | win (miss → `hud.fail()`, checkpoint replay, toast on 3rd miss) |
| `payoff` | green mono lines + stamp “SOLVED BEFORE · APOLLO 13 · 1970”; `hud.unlock(hudUnlock)` | click |
| `relive` | full-bleed `eraFrame(img, year)`, slow Ken Burns, caption, audio clip (first 5 s) | auto 8 s, or click; **Esc / ⏭ skips all** |
| `wonder` | one big italic Spectral line, centre | click |
| `map` | `mountSalvageMap()` full screen | “Look up ▸” then click |
| `plaque` | etched metal card, text reveals | click |
| `credits` | memorial names + all `sources` links + media credits | — |

Controls: **click / Enter / Space = next** (except during `act`) · **Esc or ⏭ = skip relives** · **timer switch** top-right.
Phone: same flow; interaction panel full-width; HUD shrinks (container units).

---

## 3. Visual system
- **Present (2150):** HUD (cyan `#6ff3ff`, thin, translucent) + **pencil notebook** (paper `#eee7d8`, graphite `#2d2c2a`, Caveat).
- **Past (relived):** `lib/era.js` picks the camera by year: ≤1899 **engraving** · ≤1965 **16mm B&W** · ≤1979
  **colour film** · ≤1999 **VHS** (PLAY + date) · ≤2012 **early digital** (orange date) · 2013+ **HD** (● LIVE for control rooms).
- **Type:** Spectral (story/display) · Barlow Condensed (HUD labels) · mono (logs) · Caveat (notebook).
- **Tokens:** `lib/game.css :root` (from artemis3-dashboard). Don't invent colours.

---

## 4. Tech and format
- **Static site, no framework, no build step.** Plain HTML + CSS + ES modules. Serve over http (modules don't work from `file://`).
- **Libraries (vendored, work offline):** `vendor/three.module.min.js` (r170, via import map `"three"`),
  `vendor/rough.js` (4.6.6, classic `<script>`, global `rough`). Fonts from Google Fonts (fallbacks defined).
- **Content = data:** `content.js` exports `CONTENT` (story, facts, interactions, waypoints, HUD unlocks, sources).
  `data/missions.json` = 145 missions (136 Moon-bound).

### File tree
```
index.html            ← BUILD THIS SATURDAY (the game)
lib/engine.js         ← BUILD THIS SATURDAY (beat list + renderers + router)
content.js            story + facts + configs (single source of truth)
data/missions.json    every Moon mission, outcome-normalised
lib/stage3d.js        createStage(canvas, {moon, earth, stars}) → { flyTo(wp, s), snap(wp), destroy } | null
lib/hud.js            mountHud(frame, { waypoints, onTimer }) → { panel, unlock(keys), setObjective, setPower, fail, toast, timer, destroy }
lib/interactions.js   mountInteraction(root, spec, { onWin, onMiss, timerOn }) → { setTimer, restart, destroy }
                      verbs: drag · balance · focus · morse · hold · ratio · sequence;  wireTimerSwitch(btn, onChange)
lib/notebook.js       ensurePencil() · drawPlan(svg, name) → Promise   (plans: scrubber-adapter, power-budget, athena-tipped, drill, morse)
lib/era.js/.css       eraOf(year) · eraFrame(src, year, { date, live, stamp, tag }) → <figure>
lib/archive-map.js    mountSalvageMap(root, cfg) → { lift, destroy }   (paper page → cinematic)
lib/attempt-map.js    mountAttemptMap(root, cfg) → { setYear, destroy } (cinematic view from the Moon)
lib/game.css          tokens + every component style
prototypes.html       working test bench: ?p=stage|notebook|map|air|move|night|library|water|signal
story.html            the story rendered from content.js (review surface)
assets/               img 7.5 MB · textures 7.2 MB · audio 2.0 MB   (≈18 MB total)
README.md · RUNBOOK.md · PLAN.md · CREDITS.md · .cursor/rules/everything-they-left.mdc · .gitignore
```

### content.js shape (what the engine reads)
```js
CONTENT.prologue   { mood, img, lines[] }
CONTENT.opener     { prompt, result, lines[], audio, hudUnlock[], relive[], wonder, sources[] }
CONTENT.motivation [ lines ]
CONTENT.salvageMap { intro, scrubHint, beats[{year, match, log, sketch?, img?, salvage?}], summary, handoff }
CONTENT.crises[6]  { id, name, chapter, title, mood, objective, waypoint{lat,lon,alt,sunLon,showEarth?},
                     alarm{status, log, plan?}, finds[{text, year?, img?}], interaction{verb, label, seconds, …},
                     payoff{lines[], solvedBefore, unlocks?}, relive[{year, img?, text, audio?, date?, live?}],
                     wonder, hook?, sources[[label,url]], hudUnlock[] }
CONTENT.finale     { mood, reply[], relive[], heading, note, rows[], plaque{lead, text, after[]}, choice[],
                     sources[], closing, last, audio, img }
CONTENT.memorial   [ names ]
```

### Direct links (the router: build first, test with these)
```
?screen=title | prologue | opener | map | epilogue | credits
?c=air|move|night|library|water|signal  &beat=alarm|finds|act|payoff|relive|wonder
&timer=off   &misses=2   &speed=4   &debug=1
```
Deep links **snap** the camera (`stage.snap`); normal play **flies** (`stage.flyTo`).

### Audio
- Unlocked by the title hold (browsers block sound until a gesture).
- Clips: `new Audio(src)`, play the first 5 s (`audioStart/audioDur` optional per relive).
- Alarm + quindar beeps: Web Audio oscillators (no files). Alarm: 3 × 880/660 Hz. Quindar: 2525 Hz 250 ms.

### Hosting
GitHub Pages (repo root, branch `main`). Commands in §8. Re-deploy = `git push`.

---

## 5. Assets (all in `assets/`, all licensed; see `CREDITS.md`)
| Part | Pencil (finds) | Era frames (relive) | Audio |
|---|---|---|---|
| Prologue | — | era-1859-carrington-sketch · era-2023-aditya-l1 | ui-sputnik-beep |
| 1 Air | air-co2-mailbox | era-1970-mcc-apollo13 · era-2003-kalpana-chawla · era-1951-vikram-sarabhai | air-houston-problem |
| 2 Move | era-1962-katherine-johnson · era-1972-a17-fender | era-1962-katherine-johnson · era-1972-a17-rover · era-1963-thumba-nike-apache | — |
| 3 Night | cold-apollo13-sm | era-1969-mcc-apollo11 · era-2019-chandrayaan2-liftoff | home-eagle-landed-extended |
| 4 Library | era-2024-im1-lroc | era-2024-im1-lroc · cold-chandrayaan3-vikram | — |
| Map | finale-goddard-1926 · sketch-houbolt-lor · sketch-apollo12-rtg · finale-earthrise | (data/missions.json) | — |
| 5 Water | era-2025-im2-region · water-ice-poles | era-2009-lcross-team | water-lcross-found-water |
| 6 Signal | signal-a11-reflector · cold-chandrayaan3-vikram | era-1957-sputnik · cold-chandrayaan3-vikram | ui-sputnik-beep |
| Epilogue | finale-verne-1865 · finale-goddard-1926 · finale-falcon9-landing | finale-earthrise · era-1984-rakesh-sharma · era-2025-shubhanshu-shukla · era-2014-mangalyaan | finale-apollo8-christmas · finale-jfk-we-choose |
| Stage | textures: moon_4k (desktop) · moon_2k (phone) · earth_day · stars_milky_way | stills: watcher-* (fallback + title) | — |

**Credits that are legally required on screen:** Solar System Scope (CC BY 4.0), **Nathan Hughes Hamilton** (Sarabhai photo, CC BY 2.0), ISRO/GODL-India images (“ISRO”), Wikipedia
contributors (missions data, CC BY-SA). Put `CREDITS.md` content on the credits screen.

---

## 6. Saturday: 12:00–15:00
Paste the prompt, let Cursor work, run the check, fix, move on. **Deploy at the end of every slot.**

| Time | Build | Done when |
|---|---|---|
| **12:00–12:15** | **Shell + router + deploy.** Prompt A. | `index.html` loads the 3D Moon with the HUD over it; `?screen=title` and `?c=air&beat=act` both work; live URL on GitHub Pages |
| **12:15–12:50** | **Engine: beat list + text renderers.** Prompt B. | Clicking through goes title → prologue → opener → chapter 1 alarm/finds/payoff/wonder with typed text; relive frames show in the right era look |
| **12:50–13:30** | **Interactions + HUD unlocks + checkpoints.** Prompt C. | All 6 chapters playable end to end; misses replay the interaction; 3rd miss shows the toast; HUD grows chapter by chapter |
| **13:30–13:55** | **Camera + audio + salvage map + epilogue.** Prompt D. | Camera flies between waypoints; clips play; the map appears after chapter 4; epilogue montage, plaque, credits |
| **13:55–14:25** | **Polish pass.** Prompt E + your own eye. | Skip works, phone layout works, no console errors, nothing overlaps |
| **14:25–14:45** | **Full playthrough ×2** (timer on, timer off) + phone. | No blockers; list of nits |
| **14:45–15:00** | **Freeze. Deploy. Rehearse the demo twice.** | Live URL works on your phone |

**If you're behind at 14:10, cut in this order:** epilogue montage → 2 frames · relive → 1 per chapter ·
map lift (keep paper only) · camera fly (use `snap`) · audio. Never cut: the hold-your-breath opener, the 6 interactions, the plaque.

### Prompt A: shell + router
```
Read RUNBOOK.md sections 2 and 4 and .cursor/rules. Create index.html: full-viewport 16:9 stage with the
layer stack from RUNBOOK §2 (#stage canvas via lib/stage3d.js createStage — fall back to a .still div with
assets/img/watcher-earthset-limb.jpg if it returns null; .visor-frame via lib/hud.js mountHud; #cut layer;
#dev layer). Load lib/game.css, lib/era.css, vendor/rough.js, import map for three → vendor/three.module.min.js,
Google Fonts (Spectral, Barlow Condensed, Caveat). Create lib/engine.js with a router that parses the
direct-link params in RUNBOOK §4 and exposes window.__game = { go(screen|chapter,beat), state }. For now
render the beat name in #cut. No frameworks, no build step. Check the browser console is clean.
```
### Prompt B: beats and renderers
```
In lib/engine.js build the flat beat list from CONTENT exactly as RUNBOOK §2 "Screen flow" describes, and a
renderer per beat type from the "Beat renderers" table: line (typewriter 45 ch/s in letterbox), alarm
(hud.setObjective + red status + Web Audio 3-beep alarm + drawPlan if alarm.plan), finds (paper card, Caveat,
<img class="sketch">, call ensurePencil()), payoff (+ SOLVED BEFORE stamp), relive (eraFrame(img, year, {date, live})
full-bleed with slow Ken Burns + caption; text-only relive = caption card), wonder, hook. Click/Enter/Space
advances; Esc skips remaining relive beats of the chapter. Keep all text in content.js — never hard-code story text.
```
### Prompt C: interactions + HUD + checkpoints
```
Wire the act beat: mountInteraction(hud.panel, chapter.interaction, { timerOn: hud.timer.on, onWin: next,
onMiss }) (see prototypes.html crisis view for the exact pattern). onMiss: hud.fail(); count misses; on the 3rd
miss hud.toast('Want to read at your own pace? Turn off the timer ↗'); the interaction restarts itself
(checkpoint). hud.onTimer → active.setTimer(on). On payoff call hud.unlock(chapter.hudUnlock) and
setObjective. Start with the HUD dead except o2-gauge (after the opener). Support ?misses=N and ?timer=off.
```
### Prompt D: camera, audio, map, epilogue
```
Camera: on each chapter's first beat call stage.flyTo(chapter.waypoint, 3) (snap on deep links). Audio: unlock on
the title hold; relive beats with `audio` play the first 5 s (new Audio). After chapter 4's payoff insert the map
beat: mountSalvageMap(#cut, {...CONTENT.salvageMap, missions from data/missions.json, moonTexture:
'assets/textures/moon_2k.jpg', earthTexture: 'assets/textures/earth_day.jpg'}). Epilogue: reply lines, montage
(finale.relive, 4 s each, auto), impossible-things page (finale.rows, paper style), plaque (etched card),
choice, closing + last, then credits (memorial + every sources[] link + CREDITS.md media credits).
```
### Prompt E: polish
```
Run the self-check from .cursor/rules on every direct link in RUNBOOK §4 with &debug=1. Then: phone layout
(390×844) — interaction panel full width, nothing overlaps the HUD; add a ⏭ skip button bottom-right; ensure
focus lands on each interaction; prefers-reduced-motion disables Ken Burns/grain. Fix everything you list.
```

---

## 7. Testing
**Every slot:** paste the self-check (it's in `.cursor/rules`): open each direct link with `&debug=1`, read the
console, screenshot, compare with `story.html` / `prototypes.html`, list mismatches as `beat · element · expected → actual`, fix, repeat.

**Bug reports are one line:** `c=night&beat=act · power bar · expected red over available → stays cyan`.

**Known traps (all hit already; don't rediscover them):**
1. Timer border: set the SVG `viewBox` to the panel's pixel size (ResizeObserver); never `vector-effect: non-scaling-stroke` + `pathLength`.
2. `display:grid/flex` beats `[hidden]`; `[hidden]{display:none!important}` is in game.css line 2.
3. Every HTML file needs `<meta charset="utf-8">` (curly quotes → `â€”`).
4. Timers: CSS animation + `animationend`, not `setInterval` (throttled in background tabs).
5. A `const` used before its declaration kills the whole module silently (TDZ). Read the console.
6. Pencil filter: `color-dodge` is `in=blurred negative, in2=grey`; swapped = embossed.
7. Rotated/taped elements create a stacking context → `mix-blend-mode` stops working (tint inside the filter instead).
8. ES modules need http, not `file://`. Browsers cache modules hard: hard-reload after edits.
9. Headless browsers have no WebGL; the stage falls back to the still photo by design. Test 3D in a real browser.
10. Audio only after a user gesture (the title hold).

**Manual checklist before 14:45:** full run timer ON · full run timer OFF · 3 deliberate misses (toast appears once) ·
phone portrait · every relive frame shows its era tag · credits list the CC BY names · no console errors.

---

## 8. Tonight (Friday) — 30 minutes
1. **Read** `story.html` once, top to bottom (it's the whole script).
2. **Play** `prototypes.html` tabs; note anything that bugs you in `RUNBOOK.md §9`.
3. **Optional:** listen to the 7 clips in `assets/audio/`; if a clip's best moment isn't in its first 5 s, add
   `audioStart: <seconds>` to that relive entry in `content.js`.
4. **Put it on GitHub + Pages (so the live URL exists before you arrive).** The folder is already a git repo
   with a first commit; if the GitHub repo isn't created yet:
   ```bash
   cd ~/myWorkshop/Projects/hold-your-breath-app
   ```
   ```bash
   gh repo create hold-your-breath --public --source . --push
   ```
   ```bash
   gh api -X POST repos/{owner}/hold-your-breath/pages -f "source[branch]=main" -f "source[path]=/"
   ```
   Live at `https://<your-github-username>.github.io/hold-your-breath/story.html` in about a minute.
5. **Cursor:** open the folder; confirm it picks up `.cursor/rules/everything-they-left.mdc`; pick your strongest model.
6. Charger, phone hotspot, leave by 11:15 (Jubilee Hills on a Saturday).

---

## 9. Demo (≈ 2 minutes)
1. Title on the big screen: *“Everyone, take a breath and hold it.”* → hold SPACE together → the result line.
2. `?screen=map` → ▶ Play from 1958 → the tally climbs to **55 failed** → *“to her, a parts catalogue”* → **Look up ▸**.
3. `?c=signal&beat=act` → tap SOS on Vikram’s mirror → the green flicker, **“R”**.
4. `?screen=epilogue` → the plaque: **Chandrika Devi** → *“Mars isn’t cancelled. It’s rescheduled.”*
5. Close with the line: *“Everything I needed, they left here for me. What will you leave?”*

## 10. Risks and kill switches
| If… | Then… |
|---|---|
| WebGL missing / 3D ugly | stage returns null → still photo (automatic). Or use `snap` only. |
| Venue Wi-Fi dies | everything is local except Google Fonts (falls back to Georgia/Helvetica). Deploy from phone hotspot. |
| An interaction breaks | `?timer=off` + the click alternative (every drag has click-to-place; morse has dot/dash buttons). |
| Running late | cut list in §6. |
| Audio blocked | it's optional; captions carry the story. |
