# Everything They Left

*Bhoomi (“the Earth”) was born on the Moon and never cared about Earth. In 2150 a solar storm kills every
machine on the Moon, and the only manual left is the history of how Earth got there.*

A single-page story game built at **Cafe Cursor Hyderabad** (12 Sep 2026). Plain HTML, CSS and ES modules:
no framework, no build step. Every historical fact is real and sourced; Bhoomi, Chandrika Devi and the 2150 storm are fiction.

## Run it
```bash
python3 -m http.server 8765
```
- `http://localhost:8765/prototypes.html`: every working piece (3D stage, notebook, salvage map, all 6 chapter interactions)
- `http://localhost:8765/story.html`: the whole story, rendered from `content.js`
- `http://localhost:8765/index.html`: the game (built on the day, see below)

## Build it
Open this folder in Cursor and follow **[RUNBOOK.md](RUNBOOK.md) §6**: five paste-ready prompts (A → E), each with a
“done when” check. `.cursor/rules/everything-they-left.mdc` loads automatically with the stack rules, known traps,
direct links and the self-check.

## Where things are
| File | What |
|---|---|
| `content.js` | the whole story, facts, interaction configs, waypoints, sources: **the single source of truth** |
| `check.mjs` | `node check.mjs`: validates `content.js` and the data (missing assets, unknown verbs, wrong counts) |
| `data/missions.json` | 145 Moon missions (139 Moon-bound), outcomes normalised |
| `lib/` | pre-built, tested modules: `stage3d` · `hud` · `interactions` · `notebook` · `era` · `archive-map` · `attempt-map` · `game.css` |
| `vendor/` | three.js r170, rough.js 4.6.6 (offline) |
| `assets/` | photos, textures, NASA audio (all licensed: `CREDITS.md`) |
| `RUNBOOK.md` | story, layout, tech, assets, schedule, prompts, tests |
| `PLAN.md` | the design decisions and why |

## Credits
Media and data licences are in [CREDITS.md](CREDITS.md). Photos: NASA (public domain), ISRO (GODL-India),
Nathan Hughes Hamilton (CC BY 2.0), Wikimedia Commons. Textures © Solar System Scope (CC BY 4.0).
Mission data: Wikipedia contributors (CC BY-SA 4.0).
