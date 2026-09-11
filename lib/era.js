// Time looks (v4). The present (2150) is Bhoomi's pencil notebook. When she relives the past, it plays
// in colour through the camera of its own era, so the audience can tell the times apart at a glance.
// eraOf(year) → { key, label }        eraFrame(src, year, { alt, stamp, live }) → <figure>
// Styles live in lib/era.css. Pre-1980 is film, not VHS: VHS didn't exist yet, and film grain reads as "old" just as well.
export const ERAS = [
  { key: 'etching', until: 1899, label: 'ENGRAVING' },
  { key: 'film-bw', until: 1965, label: '16MM B&W FILM' },
  { key: 'film', until: 1979, label: 'COLOUR FILM' },
  { key: 'vhs', until: 1999, label: 'VHS · BROADCAST TV' },
  { key: 'digicam', until: 2012, label: 'EARLY DIGITAL' },
  { key: 'hd', until: Infinity, label: 'HD · LIVESTREAM' },
];
export const eraOf = year => ERAS.find(e => year <= e.until);

// One shared SVG filter for the VHS colour bleed (red channel slides right).
const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" id="era-defs">
  <filter id="era-vhs" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
    <feOffset in="r" dx="3" result="rs"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/>
    <feBlend in="rs" in2="gb" mode="screen"/>
  </filter></svg>`;
function ensureDefs() { if (!document.getElementById('era-defs')) document.body.insertAdjacentHTML('afterbegin', DEFS); }

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// default on-screen stamp for the era (VHS date, digicam date, LIVE bug); pass stamp:'' to hide
function defaultStamp(key, date) {
  const d = date ? new Date(date + 'T12:00:00') : null;
  if (key === 'vhs') return `PLAY ▶  ${d ? `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, ' ')} ${d.getFullYear()}` : ''}`;
  if (key === 'digicam') return d ? `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}` : '';
  return '';
}

export function eraFrame(src, year, { alt = '', stamp, date, live = false, tag = true } = {}) {
  ensureDefs();
  const e = eraOf(year), fig = document.createElement('figure');
  fig.className = `era era-${e.key}`;
  const s = stamp ?? defaultStamp(e.key, date);
  fig.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy"><i class="era-grain" aria-hidden="true"></i><i class="era-fx" aria-hidden="true"></i>`
    + (s ? `<span class="era-stamp">${s}</span>` : '')
    + (live && e.key === 'hd' ? '<span class="era-live">● LIVE</span>' : '')
    + (tag ? `<span class="era-tag">${e.label} · ${year}</span>` : '');
  return fig;
}
