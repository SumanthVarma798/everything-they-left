// node check.mjs — validates content.js and data/missions.json without a browser.
// Fails (exit 1) on: missing assets, unknown interaction verbs/icons/scenes, salvage beats that match no
// mission, relive scenes without a year, missing sources, or a salvage-map summary whose numbers don't match the data.
import { readFileSync, existsSync } from 'node:fs';

const { CONTENT: C } = await import('./content.js');
const { ARCHIVE } = await import('./data/archive.js');
const M = JSON.parse(readFileSync('data/missions.json', 'utf8'));
const VERBS = ['drag', 'balance', 'focus', 'morse'];
const ICONS = ['card', 'bag', 'hose', 'tape', 'map', 'clamp', 'drill'];
const SCENES = ['port', 'fender', 'psr'];
const HUD = ['o2-gauge', 'objective', 'o2-bar', 'compass', 'power-bar', 'water-bar', 'salvage-tracker', 'link-earth', 'all'];
const bad = [];
const check = (ok, msg) => { if (!ok) bad.push(msg); };

// 1. every referenced asset exists
for (const p of new Set(JSON.stringify(C).match(/assets\/[^"]+/g))) check(existsSync(p), `missing asset: ${p}`);

// 2. relive scenes: year + text, and a plausible era
// anything after Sept 2026 must be flagged projected with a dated basis, and must not carry a photo
const future = (x, where) => { if ((x.year || 0) > 2026) { check(x.projected === true && typeof x.basis === 'string' && x.basis.length > 20, `${where}: year ${x.year} needs projected:true + basis`); check(!x.img, `${where}: projected items get no photo`); } };
const relive = (part, name) => (part.relive || []).forEach((r, i) => {
  check(Number.isInteger(r.year) && r.year >= 1800 && r.year <= 2150, `${name} relive[${i}]: bad year ${r.year}`);
  check(typeof r.text === 'string' && r.text.length > 20, `${name} relive[${i}]: no text`);
  future(r, `${name} relive[${i}]`);
});
relive(C.opener, 'opener'); relive(C.finale, 'finale');

// 3. chapters
const ids = new Set();
for (const c of C.crises) {
  const n = `chapter ${c.chapter} (${c.id})`;
  check(!ids.has(c.id), `${n}: duplicate id`); ids.add(c.id);
  for (const k of ['title', 'mood', 'objective', 'alarm', 'interaction', 'payoff', 'relive', 'wonder', 'sources', 'hudUnlock']) check(c[k] != null, `${n}: missing ${k}`);
  check(['despair', 'curiosity', 'inspiration'].includes(c.mood), `${n}: mood "${c.mood}"`);
  check(typeof c.waypoint?.lat === 'number' && typeof c.waypoint?.lon === 'number', `${n}: waypoint needs lat/lon`);
  check(VERBS.includes(c.interaction?.verb), `${n}: unknown verb "${c.interaction?.verb}"`);
  if (c.interaction?.verb === 'drag') {
    for (const it of c.interaction.items) check(ICONS.includes(it.icon), `${n}: unknown icon "${it.icon}"`);
    check(SCENES.includes(c.interaction.target?.id) || c.interaction.target?.slots, `${n}: unknown drag target "${c.interaction.target?.id}"`);
  }
  check(Array.isArray(c.payoff?.lines) && c.payoff.lines.length, `${n}: payoff.lines empty`);
  check(Array.isArray(c.sources) && c.sources.length, `${n}: no sources`);
  for (const k of c.hudUnlock || []) check(HUD.includes(k), `${n}: unknown hudUnlock "${k}"`);
  (c.finds || []).forEach((f, i) => future(f, `${n} finds[${i}]`));
  relive(c, n);
}
check(C.crises.length === 6, `expected 6 chapters, got ${C.crises.length}`);

// 4. salvage map beats vs data, and the numbers she quotes
const moon = M.filter(m => !m.transit), tries = moon.length, fails = moon.filter(m => m.result === 'fail').length;
const seen = new Set();
for (const b of C.salvageMap.beats) {
  if (b.match) check(M.some(m => m.name.startsWith(b.match)), `salvage beat: no mission starts with "${b.match}"`);
  if (b.salvage) { check(!seen.has(b.salvage), `salvage id "${b.salvage}" used twice`); seen.add(b.salvage); }
}
check(C.salvageMap.summary.includes(`${tries} tries`) && C.salvageMap.summary.includes(`${fails} failures`),
  `salvageMap.summary says "${C.salvageMap.summary.slice(0, 30)}…" but data has ${tries} tries · ${fails} failures`);

C.finale.rows.forEach((r, i) => { const y = +(r.real.match(/^(\d{4})/) || [])[1]; if (y > 2026 && y < 2150) check(r.projected && r.basis, `finale row ${i}: "${r.real.slice(0, 40)}" needs projected:true + basis`); });

// 5. the Lunar Library archive: unique ids, every `with` resolves to a real unlock id, sourced, no photos
const { PROGRESS } = await import('./lib/progress.js');
const known = new Set(PROGRESS.entries(C, M).map(e => e.id));
const aIds = new Set();
for (const e of ARCHIVE) {
  const n = `archive "${e.id}"`;
  check(!aIds.has(e.id), `${n}: duplicate id`); aIds.add(e.id);
  for (const k of ['title', 'text', 'why', 'with', 'org']) check(typeof e[k] === 'string' && e[k].length > 2, `${n}: missing ${k}`);
  check(known.has(e.with), `${n}: with "${e.with}" is not a real unlock id`);
  check(Array.isArray(e.sources) && e.sources.length, `${n}: no sources`);
  check(!e.img, `${n}: the library has no photographs`);
  future(e, n);
}
check(ARCHIVE.length >= 24, `archive is thin: ${ARCHIVE.length} events`);

// 6. finale shape
for (const k of ['reply', 'relive', 'rows', 'plaque', 'choice', 'closing', 'last', 'sources']) check(C.finale[k] != null, `finale: missing ${k}`);

if (bad.length) { console.error(`✗ ${bad.length} problem(s):\n- ` + bad.join('\n- ')); process.exit(1); }
console.log(`✓ content.js ok · ${C.crises.length} chapters · ${ARCHIVE.length} library events · ${[C.opener, ...C.crises, C.finale].reduce((a, p) => a + (p.relive?.length || 0), 0)} relive scenes · ${tries} Moon-bound missions (${fails} failed)`);
