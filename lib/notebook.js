// Bhoomi’s notebook: the screens are dead, so history and plans live on paper.
// Lore (real): the base’s CO₂ reactor (a Bosch reactor, NASA MSFC) grows solid carbon on a regolith bed; carbon +
// regolith fines = her pencil. Paper = greenhouse trimmings. See CONTENT.notebook.
// ensurePencil()              — injects the #pencil SVG filter once; then <img class="sketch"> looks pencil-drawn.
// drawPlan(svg, name, opts)   — his hand-drawn plan (rough.js) drawing itself stroke by stroke. → Promise (resolves when drawn)
// Needs vendor/rough.js loaded as a classic <script> (global `rough`). Without it, plans quietly skip.
import { SPEED } from './interactions.js';

// The pencil look (tuned 2026-09-11 against real NASA photos). Stages:
// grey → hand wobble (low-frequency displacement so nothing is photo-straight) → outline (colour-dodge with
// its own blurred negative; in = negative, in2 = grey; swapped = embossed) → tone hatching (diagonal stroke
// tile screened with the tone map: strokes appear only where it's dark, darker where it's darker) →
// cross-hatch in the deepest shadows (opposite diagonal) → graphite grain → tinted onto paper inside the
// filter (rotated/taped photos create a stacking context that blocks mix-blend-mode).
// The hatch tiles are in CSS px, so stroke spacing stays the same whatever the image's resolution.
// Render sketches at least ~320 px wide: below that the hatching turns to noise.
const PENCIL = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" id="pencil-defs">
  <filter id="pencil" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
    <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="g0"/><feGaussianBlur in="g0" stdDeviation="0.5" result="g"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="11" result="wob"/>
    <feDisplacementMap in="g" in2="wob" scale="4" xChannelSelector="R" yChannelSelector="G" result="gw"/>
    <feComponentTransfer in="gw" result="neg"><feFuncR type="table" tableValues="1 0"/><feFuncG type="table" tableValues="1 0"/><feFuncB type="table" tableValues="1 0"/></feComponentTransfer>
    <feGaussianBlur in="neg" stdDeviation="1.8" result="negb"/><feBlend in="negb" in2="gw" mode="color-dodge" result="dodge"/>
    <feComponentTransfer in="dodge" result="lines"><feFuncR type="gamma" exponent="3.2"/><feFuncG type="gamma" exponent="3.2"/><feFuncB type="gamma" exponent="3.2"/></feComponentTransfer>
    <feComponentTransfer in="gw" result="tone"><feFuncR type="table" tableValues="0.18 0.42 0.72 0.96 1"/><feFuncG type="table" tableValues="0.18 0.42 0.72 0.96 1"/><feFuncB type="table" tableValues="0.18 0.42 0.72 0.96 1"/></feComponentTransfer>
    <feImage href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15'><rect width='15' height='15' fill='white'/><path d='M0 15L15 0' stroke='black' stroke-width='1.25' stroke-opacity='0.88' stroke-linecap='round'/></svg>" x="0" y="0" width="15" height="15" result="tileA"/><feTile in="tileA" result="hatchA0"/><feDisplacementMap in="hatchA0" in2="wob" scale="3" xChannelSelector="G" yChannelSelector="R" result="hatchA"/>
    <feBlend in="hatchA" in2="tone" mode="screen" result="shadeA"/>
    <feComponentTransfer in="tone" result="deep"><feFuncR type="table" tableValues="0.35 0.92 1 1 1"/><feFuncG type="table" tableValues="0.35 0.92 1 1 1"/><feFuncB type="table" tableValues="0.35 0.92 1 1 1"/></feComponentTransfer>
    <feImage href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='21' height='21'><rect width='21' height='21' fill='white'/><path d='M0 0L21 21' stroke='black' stroke-width='1.05' stroke-opacity='0.7' stroke-linecap='round'/></svg>" x="0" y="0" width="21" height="21" result="tileB"/><feTile in="tileB" result="hatchB0"/><feDisplacementMap in="hatchB0" in2="wob" scale="3" xChannelSelector="R" yChannelSelector="G" result="hatchB"/>
    <feBlend in="hatchB" in2="deep" mode="screen" result="shadeB"/>
    <feBlend in="lines" in2="shadeA" mode="multiply" result="m1"/><feBlend in="m1" in2="shadeB" mode="multiply" result="m2"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="gr"/>
    <feColorMatrix in="gr" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.0 1.08" result="grm"/>
    <feBlend in="m2" in2="grm" mode="multiply" result="s"/>
    <feColorMatrix in="s" type="matrix" values="0.757 0 0 0 0.176  0.733 0 0 0 0.173  0.682 0 0 0 0.165  0 0 0 1 0"/>
  </filter></svg>`;
export function ensurePencil() { if (!document.getElementById('pencil-defs')) document.body.insertAdjacentHTML('afterbegin', PENCIL); }

const G = '#2d2c2a', RED = '#b0392b', BLUE = '#2a4b7c';
// Each plan draws into a 520×300 viewBox. `r` = rough.svg(svg); returns an array of nodes in drawing order.
const PLANS = {
  'scrubber-adapter': r => { const o = { stroke: G, strokeWidth: 1.6, roughness: 1.6, bowing: 1.4 }; return [
    r.rectangle(40, 90, 120, 120, { ...o, hachureGap: 7, fill: 'rgba(45,44,42,.18)', fillStyle: 'hachure' }),
    r.line(160, 150, 300, 150, o), r.line(160, 110, 300, 125, o), r.line(160, 190, 300, 175, o),
    r.circle(360, 150, 90, o), r.circle(360, 150, 50, { ...o, fill: 'rgba(45,44,42,.28)', fillStyle: 'cross-hatch', hachureGap: 6 }),
    r.line(210, 118, 250, 182, { ...o, stroke: RED }), r.line(250, 118, 210, 182, { ...o, stroke: RED }),
    r.linearPath([[405, 150], [470, 110], [500, 60]], o)]; },
  'power-budget': r => { const o = { stroke: G, strokeWidth: 1.5, roughness: 1.4 }; return [
    r.line(40, 250, 480, 250, o),
    r.rectangle(70, 110, 90, 140, { ...o, fill: 'rgba(42,75,124,.3)', fillStyle: 'hachure', hachureGap: 6 }),   // O2
    r.rectangle(210, 150, 90, 100, { ...o, fill: 'rgba(176,57,43,.25)', fillStyle: 'hachure', hachureGap: 6 }), // heat
    r.rectangle(350, 200, 90, 50, o),                                                                             // radio
    r.line(345, 195, 445, 255, { ...o, stroke: RED, strokeWidth: 2.2 }), r.line(445, 195, 345, 255, { ...o, stroke: RED, strokeWidth: 2.2 }),
    r.line(40, 140, 480, 140, { ...o, stroke: BLUE, strokeLineDash: [8, 6] })]; },                              // what’s left
  'athena-tipped': r => { const o = { stroke: G, strokeWidth: 1.6, roughness: 1.5 }; return [
    r.arc(260, 250, 440, 120, Math.PI, 2 * Math.PI, false, o),                                                    // crater
    r.polygon([[190, 205], [330, 170], [345, 215], [205, 250]], { ...o, fill: 'rgba(45,44,42,.2)', fillStyle: 'hachure', hachureGap: 6 }), // body on its side
    r.line(330, 170, 380, 130, o), r.line(345, 215, 400, 205, o), r.line(205, 250, 180, 280, o),                  // legs in the air
    r.line(250, 180, 300, 110, { ...o, stroke: BLUE, strokeWidth: 2.4 }),                                         // the drill, pointing at nothing
    r.circle(300, 108, 10, { ...o, stroke: BLUE })]; },
  'drill': r => { const o = { stroke: G, strokeWidth: 1.6, roughness: 1.4 }; return [
    r.arc(300, 250, 360, 130, Math.PI, 2 * Math.PI, false, { ...o, fill: 'rgba(42,75,124,.25)', fillStyle: 'cross-hatch', hachureGap: 7 }),
    r.rectangle(80, 150, 70, 50, o), r.circle(95, 210, 22, o), r.circle(135, 210, 22, o),                         // hot-wired rover
    r.linearPath([[150, 170], [230, 150], [300, 200]], { ...o, strokeLineDash: [6, 6] }),
    r.line(300, 200, 300, 262, { ...o, stroke: BLUE, strokeWidth: 3 })]; },                                        // drill into the ice
  'morse': r => { const o = { stroke: G, strokeWidth: 1.6, roughness: 1.3 }; return [
    r.rectangle(60, 170, 70, 70, { ...o, fill: 'rgba(42,75,124,.22)', fillStyle: 'zigzag', hachureGap: 6 }),     // Vikram’s mirror
    r.circle(460, 70, 70, { ...o, stroke: BLUE, fill: 'rgba(42,75,124,.2)', fillStyle: 'hachure', hachureGap: 5 }),// Earth
    r.line(130, 190, 425, 85, { ...o, stroke: '#3a8a3a', strokeLineDash: [3, 7] }),                              // their laser
    ...[[170, 260], [200, 260], [230, 260]].map(([x, y]) => r.circle(x, y, 8, { ...o, fill: G, fillStyle: 'solid' })),
    ...[[265, 260], [310, 260], [355, 260]].map(([x, y]) => r.line(x, y, x + 30, y, { ...o, strokeWidth: 4 })),
    ...[[410, 260], [440, 260], [470, 260]].map(([x, y]) => r.circle(x, y, 8, { ...o, fill: G, fillStyle: 'solid' }))]; },
};

export function drawPlan(svg, name, { animate = true } = {}) {
  const build = PLANS[name];
  svg.replaceChildren();
  if (!build || !window.rough) return Promise.resolve();
  svg.setAttribute('viewBox', '0 0 520 300');
  build(window.rough.svg(svg)).forEach(n => svg.appendChild(n));
  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
  let delay = 0; const anims = [];
  svg.querySelectorAll('path').forEach(p => {
    const len = p.getTotalLength(), dur = Math.max(0.25, Math.min(1.2, len / 500)) / SPEED;
    p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
    anims.push(p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: dur * 1000, delay: delay * 1000, fill: 'forwards', easing: 'ease-in-out' }).finished);
    delay += dur * 0.6;
  });
  return Promise.all(anims);
}

export const PLAN_NAMES = Object.keys(PLANS);
