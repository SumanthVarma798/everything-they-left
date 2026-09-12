# EVERYTHING THEY LEFT — Saturday Runbook

Everything you need to **execute, test, improve** on Sat 12 Sep 2026, 12:00–15:00 IST (Cafe Cursor Hyderabad).
Nothing here needs deciding. If something isn't in this file, the answer is in `content.js` (story), `PLAN.md`
(why), `CREDITS.md` (licences), or `prototypes.html` (working code to copy from).

---

## 0. The one-paragraph version

A single-page web experience. **2150: Bhoomi (“the Earth”), born on the Moon, has ignored Earth her whole life.**
A solar superstorm kills every chip on the Moon; she has to survive long enough to call Earth, and the only
manual left is the history of how Earth got there: plaques she never read, a real Lunar Library on a tipped-over
lander, and the 56 failed missions that are now her spare parts. She goes from **despair → curiosity → inspiration**,
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
| P | **Eleven Minutes** | L1 Sun-watcher gave 11 min warning; every chip dead; Mars transfer was 9 days away; regulator jams | — | **HOLD** your breath | Carrington 1859 (engraving) · Starlink storm loss 2022 · Aditya-L1 2024 (HD) | “Earth got warned. More than once.” |
| 1 | **The Heritage Wall** · AIR | CO₂ rising, square cartridge / round port | Plaques she never read; Apollo 13 mailbox | **DRAG** 4 scraps → adapter | Apollo 13 MCC + Mattingly 1970 (film) · Kalpana Chawla 2003 (digital) · Sarabhai (B&W) | “Twenty years I walked past their names…” |
| 2 | **Motors Don’t Need Brains** · MOVE | 300 km drive, rover brain dead, maths in pencil, fender snaps | Katherine Johnson 1962 · Apollo 17 map fender 1972 · APPLE on a ₹150 bullock cart 1981 · Falcon boosters reused 20+ times | **DRAG** maps+clamps+tape → fender | Thumba 1963 (B&W) · Cernan’s “TDC” 1972 (film) · the Super Heavy tower catch 2024 (HD) | “…I’m navigating with a pencil. I’m in good company.” |
| 3 | **Night Falls** · POWER | Sunset, 31%, old computer flashing 1202 | Apollo 13 power-down · Apollo 11 1202 / Hamilton · the 2030 lunar reactor (PROJECTED) | **BALANCE** power as it falls | Apollo 11 MCC + insurance envelopes 1969 (film) · India's cryogenic engine 1993→2010→2014, one line on Nambi Narayanan (HD) | “When they couldn’t buy the part, they built it…” |
| 4 | **The Library** · KNOW | Odysseus on its side, library under dust, night, earthshine | How Odysseus fell (the switch) · Lunar Library, 30M pages on nickel | **FOCUS** the magnifier | IM-1 2024 (HD LIVE) · Chandrayaan-2 → “Welcome, buddy!” 2023 (HD LIVE) | “…I read until the battery warning. Then I read some more.” → **SALVAGE MAP** |
| 5 | **Finish Its Job** · WATER | 9 L left, recycler dead | IM-2’s tipped drill 2025 · Chandrayaan-1 + LCROSS ice · Moonbase Alpha, the fuel stop (PROJECTED) | **DRAG** the drill into the dark crater | LCROSS team + Chandrayaan-1 2009 (digicam) · Gene Shoemaker 1999 | “…He’s a few craters from my ice now.” |
| 6 | **Call Earth** · SIGNAL | No radio, 384,400 km | Lasers since 1969 · Lunokhod mirror lost & found · Vikram’s biscuit mirror (~470 km) + the 40 cm hop · Starlink’s 9,000 lasers | **MORSE** SOS on the mirror | Sputnik 1957 (B&W) · Dhawan & Kalam 1979 · Chandrayaan-3 / Shiv Shakti 2023 (HD LIVE) | “Every one of them failed in public first. Then came back.” → green flicker “R” |
| E | **Bhoomi** | “WHO ARE YOU?” … “MARS OR EARTH?” → “Earth. I skipped a lot of homework.” | The last plaque: **2041 · Chandrika Devi** | — | **Montage:** Earthrise 1968 · Rakesh Sharma 1984 (VHS) · Shukla’s Dragon 2025 · the Crew-9 ride home 2025 · Mangalyaan 2014 | Chandrika (“moonlight”), born on Earth, named for the Moon; Bhoomi, born on the Moon, named for the Earth. “It wasn’t a joke. It was a reminder.” → PRL Ahmedabad → “Mars isn’t cancelled. It’s rescheduled.” → **“Everything I needed, they left here for me… What will you leave?”** |

Fiction: Bhoomi, Chandrika Devi, the family, the storm, the rescue. Real: everything else. **Projected** (after Sept 2026, flagged `projected: true` with a dated `basis`, drawn never photographed): NASA's 2030 lunar reactor, Artemis IV landing in 2028 on a Starship, SpaceX's Moonbase Alpha (from the Feb 2026 Moon-first pivot). SpaceX thread: the 2022 Starlink storm loss (prologue), booster reuse + the 2024 tower catch (ch2), Moonbase Alpha (ch5), the Starlink laser mesh (ch6), Shukla's Dragon + the ISS deorbit contract + the Crew-9 ride home (epilogue), and the 2026 pivot echoed in her last lines.

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


### The page (scroll spine)
The game is one section of a page, not the whole page. One scroll container, four sections, a fixed header and a footer.

```
╔═ header (fixed, 56px, always) ═══════════════════════════════════════════════╗
║ ⟡ EVERYTHING THEY LEFT              STORY · HANGAR · ARCHIVE · SOURCES        ║  ← mode switches (anchor links)
╚══════════════════════════════════════════════════════════════════════════════╝
 §1 CRAWL    200vh spacer, 100vh sticky stage. The title crawls up in perspective
             (Star Wars) while the Moon turns beneath it, ending framed on
             Shackleton — the exact camera chapter 1 starts from.
 §2 PLAY     100vh · scroll-snap-align:center · scroll-snap-stop:always — it
             CLICKS into place. The 16:9 stage + HUD + the control bar.
             Before the first start: "▶ PLAY AS BHOOMI" pulsing over the stage.
 §3 DOSSIER  the live strip: what she just discovered, in full, with images and
             sources. Scrolling here PAUSES the game. "↑ Back to the surface" returns.
 §4 HANGAR   the three rooms + the timeline rail, gated by what she has found.
 footer      memorial · every source · CREDITS · "What will you leave?"
```

**Scroll contract (get these five right and the rest is decoration):**
1. `html { scroll-snap-type: y proximity; scroll-behavior: smooth }`; only §2 snaps (`scroll-snap-align:center;
   scroll-snap-stop:always`). Proximity, not mandatory — mandatory fights the dossier and traps phone users.
2. **Crawl drive:** `t = clamp(scrollY / (crawlH - innerHeight), 0, 1)`, read in a `requestAnimationFrame` loop
   fed by a passive scroll listener (never compute layout inside the listener). Crawl text:
   `transform: perspective(420px) rotateX(24deg) translateY(calc(100% - ${t*190}%))`, opacity fading past t=0.85.
3. **Moon in sync:** the same `t` drives the stage — `stage.snap({ lat: lerp(-20,-89.67,t), lon: lerp(300,129.78,t),
   alt: lerp(4.4,1.6,t), sunLon: 90 })`. At t=1 that is exactly `crises[0].waypoint`, so the handover into
   chapter 1 is invisible. No WebGL → the still photo just parallaxes; check `stage` is non-null first.
4. **Auto-pause:** `IntersectionObserver` on the stage, `threshold:[0, 0.6]`. Below 0.6 → `engine.pause()` always.
   Coming back NEVER auto-resumes: show "▶ CONTINUE · Ch 3 · Night falls" over the stage and wait for a click
   (Life is Strange). Also pause on `visibilitychange` hidden.
5. **Never scroll-jack.** No wheel hijacking, no forced `scrollIntoView` except from the two explicit buttons.
   `prefers-reduced-motion` → skip the crawl transform and jump the Moon straight to the waypoint.

**Control bar (under the stage, inside the play section — the HUD stays uncluttered):**
`⏸ PAUSE · ⟲ CHECKPOINT · ⏭ SKIP · ⏱ timer (mirrors the visor switch) · ● ● ● ○ ○ ○ chapter pips`
The checkpoint chip flashes `CHECKPOINT SET · Ch 3 · Night falls` for 2 s whenever the engine sets one, and
`⟲ CHECKPOINT` replays the current chapter's act beat — the same path a timer miss takes.

### Screen flow (the engine plays this list top to bottom)
```
title → prologue → opener(HOLD) → relive×2 → wonder → motivation → notebook (first paper card: CONTENT.notebook)
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
| `finds` | paper card slides up; handwriting (Caveat); photos with `.sketch` pencil filter, **rendered ≥ 320 px wide** (the hatching is in CSS px and turns to noise smaller) | click |
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
  The pencil has a real origin (`CONTENT.notebook`): the base's Bosch CO₂ reactor grows solid carbon on a regolith bed; carbon + regolith fines writes; paper is greenhouse trimmings. The `#pencil` filter draws outline + tone hatching + cross-hatch in the shadows, with a hand wobble.
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
  `data/missions.json` = 145 missions (139 Moon-bound).

### File tree
```
index.html            ← BUILD THIS SATURDAY (the game)
lib/engine.js         ← BUILD THIS SATURDAY (beat list + renderers + router)
content.js            story + facts + configs (single source of truth)
data/missions.json    every Moon mission, outcome-normalised
storyboard.html       v1 frames + feel lab (10 Sep). Specs still apply; the story there is superseded by story.html
data/archive.js       the Lunar Library: 31 real events outside the six chapters, for the hangar
HANDOFF.md            two-person split: who owns which files, the unlock contract, B's brief
lib/progress.js       shared unlock contract between the game and the hangar (PROGRESS.unlock / .entries / 'etl:unlock')
check.mjs             `node check.mjs` — validates content.js + data (assets exist, verbs/icons known, counts match)
lib/stage3d.js        createStage(canvas, {moon, earth, stars}) → { flyTo(wp, s), snap(wp), destroy } | null
lib/hud.js            mountHud(frame, { waypoints, onTimer }) → { panel, unlock(keys), setObjective, setPower, fail, toast, timer, destroy }
lib/interactions.js   mountInteraction(root, spec, { onWin, onMiss, timerOn }) → { setTimer, restart, destroy }
                      verbs: drag · balance · focus · morse;  wireTimerSwitch(btn, onChange)
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
CONTENT.notebook   { lines[], sources[] }   the first paper card: where the pencil and paper come from
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
| **13:40–13:55** | **The page: header, crawl, snap, dossier, footer.** Prompt G. | The title crawls, the Moon turns to Shackleton, the play section clicks into place, scrolling away pauses |
| **13:55–14:10** | **Pause + hangar merge.** Prompt F. | Esc pauses; the pause view lists what she's found; Hangar opens |
| **14:10–14:25** | **Polish pass.** Prompt E + your own eye. | Skip works, phone layout works, no console errors, nothing overlaps |
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
Import { PROGRESS, ids } from './progress.js' and unlock as beats are SHOWN, so the pause/hangar view fills up as
she discovers things: alarm → PROGRESS.unlock(ids.chapter(c.id)); finds → ids.find(c.id, i) for each find;
relive → ids.moment(part, i) where part is 'opener' | the chapter id | 'finale'. Never edit content.js or lib/progress.js.
```
### Prompt C: interactions + HUD + checkpoints
```
Wire the act beat: mountInteraction(hud.panel, chapter.interaction, { timerOn: hud.timer.on, onWin: next,
onMiss }) (see prototypes.html crisis view for the exact pattern). onMiss: hud.fail(); count misses; on the 3rd
miss hud.toast('Want to read at your own pace? Turn off the timer ↗'); the interaction restarts itself
(checkpoint). hud.onTimer → active.setTimer(on). On payoff call hud.unlock(chapter.hudUnlock) and
setObjective. Also PROGRESS.unlock(ids.fix(chapter.id)) on the win. Start with the HUD dead except o2-gauge
(after the opener). Support ?misses=N and ?timer=off.
```
### Prompt D: camera, audio, map, epilogue
```
Camera: on each chapter's first beat call stage.flyTo(chapter.waypoint, 3) (snap on deep links). Audio: unlock on
the title hold; relive beats with `audio` play the first 5 s (new Audio). After chapter 4's payoff insert the map
beat: mountSalvageMap(#cut, {...CONTENT.salvageMap, missions from data/missions.json, moonTexture:
'assets/textures/moon_2k.jpg', earthTexture: 'assets/textures/earth_day.jpg'}). Epilogue: reply lines, montage
(finale.relive, 4 s each, auto), impossible-things page (finale.rows, paper style), plaque (etched card),
choice, closing + last, then credits (memorial + every sources[] link + CREDITS.md media credits).
Unlocks: on the map beat PROGRESS.unlock(ids.screen('map')) and, as the year scrub passes each beat,
ids.mission(beat.match-ed mission name) — plus ids.artifact(beat.salvage) for the four salvage pins;
on the epilogue ids.screen('epilogue').
```
### Prompt G: the page — header, crawl, snap, dossier, footer (run after D)
```
Read RUNBOOK §2 "The page (scroll spine)" and follow it exactly. Restructure index.html from one full-screen game
into one scroll container with a fixed header, four sections and a footer — the game becomes §2, unchanged.

Header: thin, fixed, ⟡ EVERYTHING THEY LEFT left, anchor links STORY / HANGAR / ARCHIVE / SOURCES right, current
section highlighted by IntersectionObserver. Footer: memorial lines from CONTENT.memorial, a source count, a link
to CREDITS.md, and CONTENT.finale.closing as the last line.

§1 crawl: 200vh spacer with a 100vh sticky stage. Drive both the crawl transform and stage.snap() from one
scroll-derived t in a single rAF loop (passive scroll listener sets a flag, the loop reads it) — the numbers and
the lerp endpoints are in RUNBOOK §2 point 3, ending exactly on crises[0].waypoint.

§2 play: the existing stage + HUD, scroll-snap-align:center, scroll-snap-stop:always. Before the first start show
a pulsing "▶ PLAY AS BHOOMI" button over it; the engine does not run until it is clicked. Add the control bar
described in §2 (pause, checkpoint, skip, timer mirror, chapter pips) directly under the stage, and a checkpoint
chip that flashes for 2 s when the engine sets a checkpoint.

Pause rules: IntersectionObserver threshold [0, 0.6] — under 0.6 visible, always pause; on return show
"▶ CONTINUE · Ch N · <title>" and wait for a click, never auto-resume. Pause on visibilitychange hidden too.
Expose window.__game.pause() / .resume() / .onCheckpoint(cb).

§3 dossier: an empty <section id="dossier"> with "↑ Back to the surface" (scrolls §2 into view). Populate it with
`const { mountDossier } = await import('./lib/hangar.js')` inside a try/catch — if that file is not merged yet the
section stays empty and nothing breaks. Do not create or edit lib/hangar.*; that is the other builder's file.

§4 hangar: an empty <section id="hangar"> mounted the same lazy way via mountHangar.

No scroll-jacking, no wheel handlers. prefers-reduced-motion skips the crawl animation. Keep the console clean and
test ?screen= deep links still land on §2 with the page scrolled to it.
```
### Prompt F: pause + hangar (only once your partner has pushed lib/hangar.js — see HANDOFF.md)
```
git pull. In lib/engine.js: Esc (or the ⏸ button) pauses — freeze the timer, stop audio, and
mountPause(#cut, { onResume }) from lib/hangar.js so she can read or listen to everything found so far;
a "Hangar ▸" button inside it calls mountHangar(...). Import both lazily (await import) and no-op if the
module isn't there yet, so the game never breaks if that work isn't merged. Don't edit lib/hangar.*.
```
### Prompt E: polish
```
Run the self-check from .cursor/rules on every direct link in RUNBOOK §4 with &debug=1. Then: phone layout
(390×844) — interaction panel full width, nothing overlaps the HUD; add a ⏭ skip button bottom-right; ensure
focus lands on each interaction; prefers-reduced-motion disables Ken Burns/grain. Fix everything you list.
```

---

## 7. Testing
**Every slot:** run `node check.mjs` (content and data sanity, no browser needed), then paste the self-check (it's in `.cursor/rules`): open each direct link with `&debug=1`, read the
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
4. **GitHub + Pages: done.** Repo: https://github.com/SumanthVarma798/everything-they-left · Pages (from `main`, root):
   https://sumanthvarma798.github.io/everything-they-left/ (`story.html` and `prototypes.html` are live now; the
   root URL shows the game once `index.html` exists). Every `git push` redeploys in about a minute.
5. **Cursor:** open the folder; confirm it picks up `.cursor/rules/everything-they-left.mdc`; pick your strongest model.
6. Charger, phone hotspot, leave by 11:15 (Jubilee Hills on a Saturday).

---

## 9. Demo (≈ 2 minutes)
1. Title on the big screen: *“Everyone, take a breath and hold it.”* → hold SPACE together → the result line.
2. `?screen=map` → ▶ Play from 1958 → the tally climbs to **56 failed** → *“to her, a parts catalogue”* → **Look up ▸**.
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
