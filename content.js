// Everything They Left — all story content (v4: “Bhoomi”). Pure data: the page reads this, nothing else does.
// Every real-world fact carries its source in a comment; CREDITS.md lists media licences.
// FICTION: Bhoomi, her family, the 2150 storm, the rescue. REAL: every mission, date, object, number she finds.
//
// NARRATOR — Bhoomi (Sanskrit: “the Earth”), a Lunarian born at Shackleton, 2150. The irony is the point:
// named for a planet she has ignored her whole life; in her time everyone who matters is headed to Mars.
// Voice: Andy Weir — practical, dry, does the maths out loud, never melodramatic.
//
// TWO RULES (see story.html)
// 1. Danger first, wonder after. Each chapter: alarm (2150 HUD) → finds (her pencil notebook) → interaction
//    → payoff (breath, safe for now) → relive (the people behind it, in colour) → wonder (one line).
// 2. Each time has its own camera (lib/era.js): finds are `.sketch` pencil; relive frames are graded by year:
//    ≤1899 engraving · ≤1965 16mm B&W · ≤1979 colour film · ≤1999 VHS · ≤2012 early digital · 2013+ HD/livestream.
//
// ARC: despair (prologue, ch1) → curiosity (ch2–4) → inspiration (ch5, ch6, epilogue). `mood` on each part.
// Her Mars dream dies in the prologue and comes back “rescheduled” in the last line.
//
// HUD: after the storm her visor is dead; each chapter she survives brings pieces back (hudUnlock).
// `plan` names one of her self-drawing notebook plans (lib/notebook.js).

export const CONTENT = {
  title: 'EVERYTHING THEY LEFT',
  subtitle: 'Bhoomi, 2150',
  // FICTION: her great-grandmother came up with India’s lunar programme (the real goal: an Indian on the Moon
  // by 2040 — PM’s 2023 target, reaffirmed by ISRO 2026). Revealed only by the last plaque in the epilogue.
  narrator: { name: 'Bhoomi', meaning: 'the Earth', base: 'Shackleton Outpost 7', year: 2150 },

  // ── PROLOGUE · Eleven Minutes ─────────────────────────────────────────────────────────────
  prologue: {
    mood: 'despair',
    img: 'assets/img/watcher-farside-peek.jpg',
    lines: [
      'LOG — Bhoomi, Shackleton Outpost 7. The Moon. 2150.',
      // plausible: an extreme CME at ~2,000 km/s covers L1→Moon (~1.5M km) in ~12 min
      'The Sun-watcher at L1 gave us eleven minutes’ warning. Enough to reach the shelter. Not enough to save the machines.',
      'Suit computer. Habitat. Rover. The relay to Mars. All of it, dead.',
      'My transfer to Mars was nine days away. Now I’d settle for tomorrow.',
      'My backup oxygen regulator is purely mechanical. It doesn’t know it’s supposed to be dead too.',
      'It just jammed. Hold your breath while I clear it.',
    ],
  },

  opener: {
    prompt: 'Hold your breath. Press and hold SPACE (or the button) for as long as you can.',
    result: '{s} seconds.',
    lines: [
      'Got it. Regulator’s clear. Breathing again. You can too.',
      // NASA Bioastronautics Data Book: time of useful consciousness in vacuum ~9–12 s
      'If my suit had failed instead of the regulator, I’d have had about 9 to 12 seconds.',
    ],
    audio: 'assets/audio/ui-sputnik-beep.mp3',
    hudUnlock: ['o2-gauge'],
    relive: [
      // Space.com / History: 1 Sep 1859 flare seen by Carrington while sketching; telegraph fires; Boston–Portland on “auroral current”
      { year: 1859, img: 'assets/img/era-1859-carrington-sketch.jpg', text: 'September 1859. Richard Carrington is sketching sunspots when he sees the flare. Hours later telegraph paper catches fire, and operators between Boston and Portland keep talking with their batteries unplugged, running on the storm’s own current.' },
      // ISRO: Aditya-L1 launched 2 Sep 2023, halo orbit at L1 6 Jan 2024; Sep 2026: early-warning brightenings before flares
      { year: 2024, img: 'assets/img/era-2023-aditya-l1.jpg', text: 'January 2024. India parks Aditya-L1, its first Sun-watcher, at the L1 point to watch for storms coming at Earth. Its descendants gave us those eleven minutes.' },
    ],
    wonder: 'Earth got warned. More than once. It was in every school module I skipped.',
    sources: [['Carrington (Space.com)', 'https://www.space.com/the-carrington-event'], ['Carrington telegraphs (History)', 'https://www.history.com/articles/a-perfect-solar-superstorm-the-1859-carrington-event'], ['Aditya-L1 (ISRO)', 'https://www.isro.gov.in/Aditya_L1_Catches_the_Suns_Early_Warning_Signs.html']],
  },

  motivation: [
    'Nobody on the Moon is coming. Everyone who could help is on Mars, eight months away.',
    'That leaves Earth.',
    'I’ve never cared about Earth. It’s where history happened. Ancient stuff, like Rome.',
    'My name literally means Earth. I always assumed that was my family’s idea of a joke.',
  ],

  // ── THE SALVAGE MAP — unlocked in chapter 4, once she can read the Lunar Library ─────────────
  // Data: data/missions.json (Wikipedia “List of missions to the Moon”; 136 Moon-bound, 1958–2026:
  // 70 success · 11 partial · 55 failed). Beats with `salvage` drop a pin on her map.
  salvageMap: {
    img: 'assets/img/watcher-earthset-orion.jpg',
    intro: 'The library lists every machine Earth ever threw at the Moon. I’m reading it for spare parts.',
    scrubHint: 'Drag through the years',
    beats: [
      { year: 1958, match: 'Pioneer 0', log: 'Their first try. It exploded barely a minute after launch. They tried again. And again.', sketch: 'assets/img/finale-goddard-1926.jpg' },
      { year: 1959, match: 'Luna 2', log: 'First thing of theirs to reach the Moon. It hit. Nothing to salvage, but respect.' },
      // Houbolt’s 1961–62 case for lunar-orbit rendezvous (NASA history)
      { year: 1962, match: null, log: 'An engineer named John Houbolt kept telling his bosses to leave the big ship in orbit and land a tiny one. They thought he was mad. It’s how every Apollo landing worked.', sketch: 'assets/img/sketch-houbolt-lor.jpg' },
      { year: 1964, match: 'Ranger 7', log: 'Rangers 3, 4, 5 and 6 all failed. Number 7 finally sent pictures, right up until impact. Stubborn people.' },
      { year: 1966, match: 'Luna 9', log: 'First soft landing. Something of theirs, sitting here, still working.' },
      { year: 1968, match: 'Apollo 8', log: 'Three of them flew around the Moon and photographed their own planet rising.', img: 'assets/img/finale-earthrise.jpg' },
      { year: 1969, match: 'Apollo 11', log: 'Two of them walked here. They left a mirror behind. Earth still bounces lasers off it.', salvage: 'reflector-a11' },
      { year: 1969, match: 'Apollo 12', log: 'They left a nuclear battery. Plutonium-238, 88-year half-life. After 180 years it’s still warm.', salvage: 'rtg-a12', sketch: 'assets/img/sketch-apollo12-rtg.jpg' },
      { year: 1970, match: 'Apollo 13', log: 'An explosion. No landing. They made it home on cardboard and duct tape. I know this one.' },
      { year: 1972, match: 'Apollo 17', log: 'The last of them to walk here. Then they stopped coming.' },
      // data: no Moon missions between Luna 24 (1976) and Hiten (1990)
      { year: 1976, match: 'Luna 24', log: 'For fourteen years after this, nobody came at all. They got distracted. Sounds familiar.' },
      // Chandrayaan-1 Moon Impact Probe (with the Indian flag) hit near Shackleton, 14 Nov 2008
      { year: 2008, match: 'Chandrayaan-1', log: 'India dropped a probe with its flag on it right next to Shackleton, my crater. It helped find the water.' },
      { year: 2019, match: 'Chang\'e 4', log: 'China landed on the far side. First time anyone had.' },
      { year: 2019, match: 'Beresheet', log: 'Israel, tiny budget, crashed. It carried a library and thousands of dried-out tardigrades. Proud anyway. I like them.' },
      // PM, 26 Aug 2023: Chandrayaan-2 crash site named Tiranga Point
      { year: 2019, match: 'Chandrayaan-2', log: 'India’s lander, lost in the last minutes. The spot is called Tiranga Point now. The orbiter kept going.' },
      { year: 2023, match: 'Chandrayaan-3', log: 'India came back and landed near the south pole. On board: a NASA laser mirror the size of a biscuit. Closest mirror to me.', salvage: 'reflector-ch3' },
      { year: 2024, match: 'IM-1', log: 'The lander that tipped over carrying the library I’m reading this in.' },
      { year: 2024, match: 'SLIM', log: 'Japan landed within 100 metres of its target. Upside down. It worked anyway.' },
      // IM-2 Athena, Mons Mouton, 6 Mar 2025: tipped over; PRIME-1 drill deployed
      { year: 2025, match: 'IM-2', log: 'A company landed an ice drill near the pole. The lander fell over before it could drill in. The drill is still there.', salvage: 'drill-im2' },
      { year: 2026, match: 'Artemis II', log: 'Four of them flew around the Moon, farther from Earth than anyone ever had. The next era started here.' },
    ],
    summary: '136 tries. 55 failures. To them, every failure was a disaster. To me, it’s a parts catalogue.',
    handoff: 'Two problems left between me and a rescue: water, and a way to call Earth. They solved both before. Time to copy their homework.',
  },

  // ── THE SIX CHAPTERS (key kept as `crises` for lib/ + prototypes.html) ────────────────────────
  // Route: Shackleton → (drive) → Malapert A / IM-1 → Mons Mouton / IM-2 → Vikram / Chandrayaan-3
  crises: [
    // ── 1 · AIR · The Heritage Wall ──
    {
      id: 'air', name: 'AIR', chapter: 1, title: 'The Heritage Wall', mood: 'despair',
      objective: 'RESTORE AIR · CO₂ SCRUBBER OFFLINE',
      // Shackleton centre 89.67°S 129.78°E (Wikipedia / LPI South Pole Atlas)
      waypoint: { lat: -89.67, lon: 129.78, alt: 1.6, sunLon: 90 },
      alarm: {
        status: 'CO₂: RISING · SCRUBBER CONTROLLER: DEAD',
        log: 'The scrubber’s controller fried. The spare cartridges are fine. They’re square. The emergency port is round.',
        plan: 'scrubber-adapter',
      },
      finds: [
        { text: 'The Heritage Wall by the airlock. Etched plaques. I’ve walked past them every day for twenty years and never read one.' },
        { year: 1970, text: 'APOLLO 13. Square filter, round hole. Fixed with plastic bags, flight-plan cardboard, suit hoses and duct tape.', img: 'assets/img/air-co2-mailbox.jpg' },
      ],
      interaction: {
        verb: 'drag', label: 'BUILD THE ADAPTER', seconds: 12,
        items: [
          { id: 'card', label: 'Cardboard', icon: 'card' }, { id: 'bag', label: 'Plastic bag', icon: 'bag' },
          { id: 'hose', label: 'Suit hose', icon: 'hose' }, { id: 'tape', label: 'Duct tape', icon: 'tape' },
        ],
        target: { id: 'port', label: 'Round scrubber port' },
      },
      payoff: {
        lines: ['CO₂ falling. I’m going to sit down for a minute.', 'While I’m down here, I read the rest of the wall.'],
        solvedBefore: 'APOLLO 13 · 1970',
      },
      relive: [
        { year: 1970, img: 'assets/img/era-1970-mcc-apollo13.jpg', audio: 'assets/audio/air-houston-problem.mp3',
          // Wikipedia (John Aaron): Mattingly removed over rubella exposure, never contracted it; LM power fed back to the CM
          text: 'Mission Control, April 1970. Engineers tip the same scraps the crew has onto a table and build the fix. Ken Mattingly, pulled from the crew over measles he never caught, helps bring the dead command module back to life.' },
        // NASA: Columbia broke up on re-entry 1 Feb 2003, 16 min before landing; Chawla born in Karnal, flew STS-87 (1997) and STS-107
        { year: 2003, img: 'assets/img/era-2003-kalpana-chawla.jpg',
          text: 'The memorial plaque. Kalpana Chawla, born in Karnal, India. Flew twice. Died with six crewmates when Columbia broke apart sixteen minutes from home.' },
        // Britannica: Sarabhai died 30 Dec 1971, aged 52; Aryabhata launched 1975
        { year: 1951, img: 'assets/img/era-1951-vikram-sarabhai.jpg',
          text: 'Vikram Sarabhai. He started India’s space programme in a church by the sea. He died at 52, four years before India’s first satellite reached orbit.' },
      ],
      wonder: 'Twenty years I walked past their names. Some of them never saw it fly. Some of them never got home.',
      hook: 'The newest plaque: 2024, the Moon’s first library. Thirty million pages etched on nickel, on a lander near Malapert A. Three hundred kilometres away. Everything they ever knew, on metal. Storm-proof.',
      sources: [['Apollo 13 (NASA)', 'https://www.nasa.gov/missions/apollo/apollo-13-mission-details/'], ['John Aaron & Mattingly', 'https://en.wikipedia.org/wiki/John_Aaron'], ['Kalpana Chawla', 'https://en.wikipedia.org/wiki/Kalpana_Chawla'], ['Vikram Sarabhai (Britannica)', 'https://www.britannica.com/biography/Vikram-Sarabhai'], ['Lunar Library (Arch Mission)', 'https://medium.com/arch-mission-foundation/third-times-a-charm-lunar-library-successfully-lands-on-the-moon-backup-of-human-civilization-1ef424ebe4f2']],
      hudUnlock: ['o2-bar', 'objective'],
    },

    // ── 2 · MOVE · Motors Don’t Need Brains ──
    {
      id: 'move', name: 'MOVE', chapter: 2, title: 'Motors Don’t Need Brains', mood: 'curiosity',
      objective: 'REACH MALAPERT A · 300 KM · ROVER HOT-WIRED',
      waypoint: { lat: -85.5, lon: 60, alt: 1.5, sunLon: 100 },
      alarm: {
        status: 'ROVER CONTROLLER: DEAD · RANGE: UNKNOWN',
        log: 'Motors don’t need brains, so I hot-wired it. What I don’t have is anything that tells me how far each percent of battery goes. So I do the maths. In pencil. Then, 88 km out, a fender snaps and dust sprays over everything.',
      },
      finds: [
        // Space.com: Glenn asked for Katherine Johnson to check the IBM’s orbit by hand, Feb 1962
        { year: 1962, text: 'Katherine Johnson. John Glenn wouldn’t fly until “the girl” had checked the computer’s numbers by hand.', img: 'assets/img/era-1962-katherine-johnson.jpg' },
        // Smithsonian / NASA ALSJ: fender extension rebuilt from four laminated maps, two clamps and tape
        { year: 1972, text: 'Apollo 17’s rover lost a fender. Houston designed a new one overnight: four maps, two clamps, duct tape.', img: 'assets/img/era-1972-a17-fender.jpg' },
        // Wikipedia (APPLE): tested on a bullock cart for a non-magnetic antenna range; ₹150, ~5 hours
        { year: 1981, text: 'APPLE, India’s first communications satellite, was tested on a bullock cart, because wood doesn’t interfere with an antenna. The cart cost ₹150.' },
      ],
      interaction: {
        verb: 'drag', label: 'FIX THE FENDER', seconds: 12,
        items: [
          { id: 'map', label: 'Maps', icon: 'map' }, { id: 'clamp1', label: 'Clamp', icon: 'clamp' },
          { id: 'clamp2', label: 'Clamp', icon: 'clamp' }, { id: 'tape', label: 'Duct tape', icon: 'tape' },
        ],
        target: { id: 'fender', label: 'Broken fender' },
      },
      payoff: { lines: ['Fender holds. Dust stays down. 212 kilometres to go.'], solvedBefore: 'APOLLO 17 · 1972' },
      relive: [
        { year: 1962, img: 'assets/img/era-1962-katherine-johnson.jpg',
          text: 'Langley, 1962. Katherine Johnson checks the orbit equations on a desk calculator. Her numbers match the IBM, so Glenn flies.' },
        // Wikipedia (Tracy’s Rock): Cernan traced TDC, 14 Dec 1972
        { year: 1972, img: 'assets/img/era-1972-a17-rover.jpg',
          text: 'Taurus-Littrow, December 1972. Before leaving, Gene Cernan kneels and traces his daughter’s initials, TDC, in the dust. No wind here. They’re probably still there.' },
        // Wikipedia (TERLS): first launch 21 Nov 1963 from Thumba; church as office; parts moved by bicycle
        { year: 1963, img: 'assets/img/era-1963-thumba-nike-apache.jpg',
          text: 'Thumba, November 1963. India’s first rocket is put together in a church. The nose cone gets to the pad on a bicycle.' },
      ],
      wonder: 'They checked the machine with a person. They tested a satellite on a bullock cart. I’m navigating with a pencil. I’m in good company.',
      sources: [['“Get the girl” (Space.com)', 'https://www.space.com/35218-hidden-figures-when-did-john-glenn-ask-for-the-girl-to-check-the-numbers.html'], ['Map fender (Smithsonian)', 'https://airandspace.si.edu/stories/editorial/duct-tape-auto-repair-moon'], ['APPLE bullock cart', 'https://en.wikipedia.org/wiki/Ariane_Passenger_Payload_Experiment'], ['Thumba', 'https://en.wikipedia.org/wiki/Thumba_Equatorial_Rocket_Launching_Station'], ['Tracy’s Rock', 'https://en.wikipedia.org/wiki/Tracy%27s_Rock']],
      hudUnlock: ['compass'],
    },

    // ── 3 · POWER · Night Falls ──
    {
      id: 'night', name: 'NIGHT', chapter: 3, title: 'Night Falls', mood: 'curiosity',
      objective: 'SURVIVE THE NIGHT · BATTERIES 31%',
      waypoint: { lat: -83, lon: 20, alt: 2.2, sunLon: -80 },
      alarm: {
        status: 'SUNSET · BATTERIES 31% · BACKUP COMPUTER: 1202',
        // UCLA/Horvath 2022: surface swings to about −173 °C at night
        log: 'Sunset, mid-drive. Fourteen days of dark, heading for −173 °C. And my one surviving computer, an antique too dumb to die, is flashing overload alarms.',
        plan: 'power-budget',
      },
      finds: [
        { year: 1970, text: 'Apollo 13’s power-down: oxygen first, heat second, everything else off.', img: 'assets/img/cold-apollo13-sm.jpg' },
        // Wikipedia (Jack Garman) / AGC: 1201/1202 overload; priority scheduling shed low-priority jobs
        { year: 1969, text: 'Apollo 11’s 1202 alarms. The landing computer was overloaded. Margaret Hamilton’s software dropped the low-priority jobs and kept flying.' },
      ],
      interaction: {
        verb: 'balance', label: 'SURVIVE THE NIGHT', seconds: 12,
        available: { from: 100, to: 45, fallSeconds: 4 },
        loads: [
          { id: 'o2', label: 'Oxygen', start: 40, min: 15 },
          { id: 'heat', label: 'Heaters', start: 40, min: 15 },
          { id: 'radio', label: 'Radio', start: 20, min: 0 },
        ],
        winWhen: 'sum <= available && every load >= its min',
      },
      payoff: { lines: ['Heaters at minimum. Radio off. Oxygen first. Same order Apollo 13 chose. The alarms stop.'], solvedBefore: 'APOLLO 13 · 1970 · APOLLO 11 · 1969' },
      relive: [
        { year: 1969, img: 'assets/img/era-1969-mcc-apollo11.jpg', audio: 'assets/audio/home-eagle-landed-extended.mp3',
          // Wikipedia (Apollo insurance covers)
          text: 'Mission Control, July 1969. Jack Garman has every alarm code on a handwritten list. Steve Bales says go. The crew had signed hundreds of envelopes for their families to sell, because nobody would insure them.' },
        // Planetary Society / The Week: 1993 Russian deal cancelled under US/MTCR pressure; GSLV-D3 cryo stage failed ~1.5 s in 2010; GSLV-D5 flew 5 Jan 2014
        // Science (AAAS) 2018: Nambi Narayanan arrested 1994; CBI closure 1996; Supreme Court called the case concocted, awarded compensation
        { year: 2014, img: 'assets/img/era-2019-chandrayaan2-liftoff.jpg',
          text: 'India’s cryogenic engine. The deal to buy one was killed in 1993; India got seven engines and no drawings. It built its own. The first one failed after a second and a half, in 2010. It flew in 2014. Along the way one of its scientists, Nambi Narayanan, was falsely accused of spying and spent years clearing his name. The courts later called the case concocted.' },
      ],
      wonder: 'When they couldn’t buy the part, they built it. When it failed after a second and a half, they built it again.',
      sources: [['1202 & Garman', 'https://en.wikipedia.org/wiki/Jack_Garman'], ['Insurance covers', 'https://en.wikipedia.org/wiki/Apollo_insurance_covers'], ['Cryogenic GSLV (Planetary Society)', 'https://www.planetary.org/articles/20130729-india-prepares-to-return'], ['1993 deal (The Week)', 'https://www.theweek.in/news/defence/2026/06/03/opinion-the-indo-soviet-cryogenic-engine-deal-and-mtcr-the-tale-of-a-failed-partnership.amp.html'], ['Nambi Narayanan (Science)', 'https://www.science.org/content/article/indian-court-offers-final-vindication-innocent-space-scientist-who-was-arrested-and']],
      hudUnlock: ['power-bar'],
    },

    // ── 4 · KNOW · The Library ──
    {
      id: 'library', name: 'KNOW', chapter: 4, title: 'The Library', mood: 'curiosity',
      objective: 'READ THE LUNAR LIBRARY · IM-1 ODYSSEUS',
      // Wikipedia (IM-1): came to rest at 80.13°S 1.44°E, near Malapert A, ~300 km from the pole
      waypoint: { lat: -80.13, lon: 1.44, alt: 1.5, sunLon: 170, showEarth: true },
      alarm: {
        status: 'IM-1 ODYSSEUS · ON ITS SIDE · LIBRARY: UNDER DUST',
        log: 'Found it. Odysseus, on its side with a broken leg, exactly where the plaque said. The library is somewhere under the dust. It’s night. I’m working by earthshine.',
      },
      finds: [
        // New Atlas / Ad Astra: rangefinder safety switch not enabled; NASA NDL patched in; missed data flag; broken leg; tipped
        { year: 2024, text: 'How Odysseus fell: a safety switch on its laser rangefinders was never flipped before launch. They patched in NASA’s experimental lidar mid-flight, missed one data flag, came in fast, broke a leg and tipped over.' },
        // Space.com / Arch Mission: Lunar Library, ~30 million pages on nickel NanoFiche
        { year: 2024, text: 'The Lunar Library: thirty million pages etched on nickel. You read it with a magnifier.', img: 'assets/img/era-2024-im1-lroc.jpg' },
      ],
      // FOCUS: slide the magnifier until the etched page resolves (lib/interactions.js `focus`)
      interaction: {
        verb: 'focus', label: 'READ THE LIBRARY', seconds: 12,
        target: 62, tolerance: 4,
        page: ['THE LUNAR LIBRARY', 'A backup of human knowledge,', 'etched in nickel, 2024.', 'If you can read this,', 'keep reading.'],
      },
      payoff: {
        lines: ['There it is. Everything, in letters smaller than dust. I start reading.'],
        solvedBefore: 'ARCH MISSION · IM-1 · 2024',
        unlocks: 'salvageMap',
      },
      relive: [
        { year: 2024, img: 'assets/img/era-2024-im1-lroc.jpg', live: true,
          text: 'February 2024. A team on Earth rewrites its landing software overnight, for a lander 380,000 km away.' },
        // ISRO/PM 2019–2023: Vikram lost in final descent 7 Sep 2019; orbiter kept working; 21 Aug 2023 two-way link with Ch-3 lander: “Welcome, buddy!”
        { year: 2023, img: 'assets/img/cold-chandrayaan3-vikram.jpg', live: true,
          text: 'August 2023. India lost its Chandrayaan-2 lander in 2019, but the orbiter survived and kept watching. When the next lander arrives, the old orbiter becomes its backup radio. Its first message: “Welcome, buddy!”' },
      ],
      wonder: 'Somebody thought: what if everything falls apart? Leave a copy. Everything fell apart, and I’m reading it. I read until the battery warning. Then I read some more.',
      hook: 'The library has a list of every machine Earth ever threw at the Moon. Failures included. Especially the failures.',
      sources: [['What Odysseus carried (Space.com)', 'https://www.space.com/intuitive-machines-odysseus-moon-lander-payloads'], ['The missed switch (New Atlas)', 'https://newatlas.com/space/odysseus-broke-leg-landing/'], ['IM-1 landing site', 'https://en.wikipedia.org/wiki/IM-1'], ['“Welcome, buddy!” (India TV)', 'https://www.indiatvnews.com/science/chandrayaan-3-update-vikram-lander-communication-establishes-lander-module-with-chandrayaan-2-isro-2023-08-21-888008'], ['Beresheet tardigrades (EarthSky)', 'https://earthsky.org/human-world/tardigrades-lunar-library-beresheet-spacecraft-crash-moon/']],
      hudUnlock: ['salvage-tracker'],
    },

    // ── 5 · WATER · Finish Its Job ──
    {
      id: 'water', name: 'WATER', chapter: 5, title: 'Finish Its Job', mood: 'inspiration',
      objective: 'FIND WATER · RESERVE 9 L',
      // Wikipedia (IM-2): Athena on its side in a 20 m crater at 84.7906°S 29.1957°E, Mons Mouton
      waypoint: { lat: -84.79, lon: 29.2, alt: 1.6, sunLon: 60 },
      alarm: {
        status: 'WATER: 9 L · RECYCLER: DEAD · ICE MINE: DEAD',
        log: 'Nine litres. The library says the nearest ice drill is 125 years old and lying on its side on Mons Mouton.',
        plan: 'athena-tipped',
      },
      finds: [
        // Space.com: IM-2 Athena landed 6 Mar 2025 near Mons Mouton, tipped in a crater; PRIME-1 drill deployed
        { year: 2025, text: 'IM-2 Athena carried an ice drill to the pole, landed in a crater, fell on its side and never drilled.', img: 'assets/img/era-2025-im2-region.jpg' },
        // Chandrayaan-1 MIP (14 Nov 2008) + NASA M3 (2009); LCROSS (9 Oct 2009, ~5.6% water); ISS 98% recovery (NASA 2023)
        { year: 2008, text: 'Chandrayaan-1 and LCROSS found where the ice is. On their space station, they reused 98% of their water.', img: 'assets/img/water-ice-poles.jpg' },
      ],
      interaction: {
        verb: 'drag', label: 'FINISH ITS JOB', seconds: 8,
        items: [{ id: 'drill', label: 'Athena’s drill', icon: 'drill' }],
        target: { id: 'psr', label: 'Permanently shadowed crater', glow: '#7fd4ff' },
      },
      payoff: { lines: ['It fell over in 2025 before it could drill a single hole. I just finished its job.', 'Ice. Dig it, melt it, filter it.'], solvedBefore: 'CHANDRAYAAN-1 · 2008 · LCROSS · 2009' },
      relive: [
        { year: 2009, date: '2009-10-09', img: 'assets/img/era-2009-lcross-team.jpg', audio: 'assets/audio/water-lcross-found-water.mp3',
          text: 'NASA Ames, October 2009. The LCROSS team watches a spent rocket stage hit Cabeus: about 5.6% of what it throws up is water. A year earlier, India’s first Moon mission had dropped a probe carrying its flag right beside Shackleton.' },
        // EarthDate / Planetary Society: Shoemaker (Addison’s disease), ashes on Lunar Prospector, impact near S pole 31 Jul 1999
        { year: 1999, text: 'July 1999. Gene Shoemaker trained the Apollo crews to read rocks, but Addison’s disease kept him from flying. His ashes rode Lunar Prospector into a crater near the south pole. He is the only person buried on the Moon.' },
      ],
      wonder: 'He taught them how to read rocks and never got to come. He’s a few craters from my ice now. I think he’d like it.',
      sources: [['IM-2 tipped (Space.com)', 'https://www.space.com/the-universe/moon/private-intuitive-machines-moon-lander-fell-over-inside-crater-at-lunar-south-pole-photo-reveals'], ['IM-2 site', 'https://en.wikipedia.org/wiki/IM-2'], ['LCROSS (Science)', 'https://www.science.org/doi/10.1126/science.1186986'], ['Shoemaker (EarthDate)', 'https://www.earthdate.org/episodes/the-man-on-the-moon'], ['Shoemaker & Addison’s', 'https://www.planetary.org/profiles/eugene-shoemaker']],
      hudUnlock: ['water-bar'],
    },

    // ── 6 · SIGNAL · Call Earth ──
    {
      id: 'signal', name: 'SIGNAL', chapter: 6, title: 'Call Earth', mood: 'inspiration',
      objective: 'CALL EARTH · NO RADIO',
      // Chandrayaan-3 / Vikram, Statio Shiv Shakti: 69.37°S 32.32°E. sunLon 160: lunar night, Earth nearly full, earthshine
      waypoint: { lat: -69.37, lon: 32.32, alt: 1.6, sunLon: 160, showEarth: true },
      alarm: {
        status: 'RADIO: DEAD · MARS RELAY: DEAD · EARTH: 384,400 km',
        log: 'No radio. Nothing that transmits. But the library says Earth has been shooting lasers at mirrors on the Moon since 1969. If I can’t send light, I can block it.',
        plan: 'morse',
      },
      finds: [
        { year: 1969, text: 'Apollo 11 left a panel of 100 small mirrors. Observatories still aim lasers at it.', img: 'assets/img/signal-a11-reflector.jpg' },
        // Space.com: Lunokhod 1 reflector found with LRO’s help, ranged 22 Apr 2010, brighter than Lunokhod 2
        { year: 2010, text: 'Lunokhod 1’s mirror was lost for nearly 40 years, found in 2010, and bounced back brighter than expected.' },
        // Space.com/NASA: LRO’s LOLA pinged Vikram’s LRA, 12 Dec 2023; great-circle Shackleton→Vikram ≈ 627 km; hop test 3–4 Sep 2023
        { year: 2023, text: 'The closest mirror: a biscuit-sized one on India’s Vikram lander, 627 km away. Vikram even hopped 40 cm once, to prove a lander could take off again.', img: 'assets/img/cold-chandrayaan3-vikram.jpg' },
      ],
      interaction: {
        verb: 'morse', label: 'SEND SOS', seconds: 15,
        message: 'SOS', code: '... --- ...', dotMaxMs: 250, dashMinMs: 400,
        hint: 'Tap for a dot, hold for a dash.',
      },
      payoff: {
        lines: ['Now I wait. If anyone on Earth is still ranging these mirrors, my echoes will blink: three short, three long, three short.'],
        solvedBefore: 'APOLLO 11 · 1969 · CHANDRAYAAN-3 · 2023',
      },
      relive: [
        { year: 1957, img: 'assets/img/era-1957-sputnik.jpg', audio: 'assets/audio/ui-sputnik-beep.mp3',
          text: 'October 1957. Sputnik beeps, and anyone with a radio can hear it. The first message from space just said: someone is here.' },
        // Wikipedia (SLV): SLV-3 failed 10 Aug 1979; Dhawan took responsibility; Rohini RS-1 orbited 18 Jul 1980, Kalam fronted the press
        { year: 1979, text: 'August 1979. India’s first satellite launcher fails in public. ISRO’s chief, Satish Dhawan, takes the blame at the press conference. A year later it works, and he hands the press conference to the man who led it, Abdul Kalam.' },
        // PM, 26 Aug 2023: landing site = Shiv Shakti Point (Shakti honouring women scientists’ perseverance); 23 Aug = National Space Day
        { year: 2023, img: 'assets/img/cold-chandrayaan3-vikram.jpg', live: true,
          text: '23 August 2023. India lands near the south pole, with the mirror on board. The landing spot is named Shiv Shakti. The day becomes National Space Day.' },
      ],
      wonder: 'Every one of them failed in public first. Then came back.',
      hook: 'A faint green flicker on the dust, from 384,400 km away. Short, long, short. “R.” Received.',
      sources: [['Lunokhod 1 found (Space.com)', 'https://www.space.com/8295-lost-soviet-reflecting-device-rediscovered-moon.html'], ['LRO pings Vikram (Space.com)', 'https://www.space.com/laser-communications-moon-lro-india-vikram-chandrayaan-3-lander'], ['Vikram hop', 'https://en.wikipedia.org/wiki/Chandrayaan-3'], ['SLV-3 & Dhawan', 'https://en.wikipedia.org/wiki/Satellite_Launch_Vehicle'], ['Shiv Shakti (Space.com)', 'https://www.space.com/india-chandrayaan-3-moon-landing-site-name']],
      hudUnlock: ['all', 'link-earth'],
    },
  ],

  // ── EPILOGUE · Bhoomi ─────────────────────────────────────────────────────────────────────
  finale: {
    mood: 'inspiration',
    reply: [
      'The flicker again. Longer. It takes me an hour with the codebook.',
      '“WHO ARE YOU?”',
      'Bhoomi. Shackleton. Alive.',
      '“SHIP IN 14 DAYS. MARS OR EARTH?”',
      'Earth. I skipped a lot of homework.',
    ],
    relive: [
      // NASA: Anders quote, Earthrise, 24 Dec 1968
      { year: 1968, img: 'assets/img/finale-earthrise.jpg', audio: 'assets/audio/finale-apollo8-christmas.mp3',
        text: 'Christmas Eve 1968. Bill Anders photographs Earth rising over the Moon: “We came all this way to explore the Moon, and the most important thing is that we discovered the Earth.”' },
      // Wikipedia: Rakesh Sharma, Soyuz T-11, 3 Apr 1984
      { year: 1984, date: '1984-04-03', img: 'assets/img/era-1984-rakesh-sharma.jpg',
        text: 'April 1984. Asked how India looks from space, Rakesh Sharma answers: “Saare jahan se achha.” Better than the whole world.' },
      // CNN: Shukla, Axiom-4, docked 26 Jun 2025; first Indian on the ISS, 41 years after Sharma
      { year: 2025, img: 'assets/img/era-2025-shubhanshu-shukla.jpg',
        text: 'June 2025. Forty-one years later, Shubhanshu Shukla becomes the second Indian in space, and the first on a space station.' },
      // CNN: MOM entered Mars orbit 24 Sep 2014, first attempt, ~$74M (< Gravity’s $100M); women scientists in the control room
      { year: 2014, img: 'assets/img/era-2014-mangalyaan.jpg', live: true,
        text: 'September 2014. India reaches Mars on its first try, for less than it cost to make the film Gravity. The photo everyone remembers: the women scientists in the control room, in saris, cheering.' },
    ],
    heading: 'THINGS THEY SAID WERE IMPOSSIBLE',
    note: 'A page from Bhoomi’s notebook',
    rows: [
      { img: 'assets/img/finale-verne-1865.jpg', imagined: '1865 · Jules Verne: three men fired at the Moon from Florida, splashing down in the Pacific', real: '1969 · Apollo 11: three men, from Florida, down in the Pacific', gap: '104 years' },
      // NYT editorial 13 Jan 1920; correction 17 Jul 1969
      { img: 'assets/img/finale-goddard-1926.jpg', imagined: '1920 · The New York Times mocks Robert Goddard: rockets can’t work in a vacuum', real: '1969 · The day after Apollo 11 launches, the Times prints a correction: “The Times regrets the error.”', gap: '49 years' },
      { imagined: '1963 · A rocket carried to its launch pad on a bicycle', real: '2014 · The same country reaches Mars on its first try', gap: '51 years' },
      { img: 'assets/img/finale-falcon9-landing.jpg', imagined: '1950s · Every sci-fi cover shows rockets landing on their tails', real: '2015 · A Falcon 9 booster lands itself', gap: '~60 years' },
      { imagined: '2026 · “A Moon base is science fiction.”', real: '2150 · I was born in one.', gap: 'Bhoomi' },
    ],
    // FICTION: the plaque. Real anchor: India’s stated goal of an Indian on the Moon by 2040.
    plaque: {
      lead: 'Before the ship comes, I read the last plaque on the Heritage Wall. The small one by the floor that I never bothered with.',
      text: '2041 · FIRST INDIAN CREW TO LIVE AT SHACKLETON · Mission specialist Chandrika Devi',
      after: [
        'Chandrika Devi. I know that name. It’s on the first page of our family book, the paper one nobody reads.',
        'My great-grandmother. Chandrika means moonlight. She was born on Earth and named after the Moon, and she came to live on it.',
        'She named the first girl born up here after the planet she left. Every first daughter since has been called Bhoomi.',
        'It wasn’t a joke. It was a reminder. I think she planned this.',
      ],
    },
    choice: [
      // PRL founded by Vikram Sarabhai, 11 Nov 1947, Ahmedabad
      'So: Earth first. The Physical Research Laboratory in Ahmedabad, the lab Sarabhai started in 1947. I have a lot of reading to do.',
      'They did the Moon, then Mars. Same order for me. Mars isn’t cancelled. It’s rescheduled.',
    ],
    sources: [['Anders (NASA)', 'https://science.nasa.gov/missions/landsat/remembering-bill-anders/'], ['Rakesh Sharma', 'https://en.wikipedia.org/wiki/Rakesh_Sharma'], ['Shubhanshu Shukla (CNN)', 'https://www.cnn.com/2025/06/26/india/india-shubhanshu-shukla-axiom-space-mission-intl-hnk'], ['Mangalyaan (CNN)', 'https://www.cnn.com/2014/09/25/news/india-mars-cost'], ['India’s 2035/2040 goals (Tribune)', 'https://www.tribuneindia.com/news/india/space-station-by-2035-man-on-moon-by-2040-pm-modi-sets-lofty-space-mission-goals-554095']],
    closing: 'Everything I needed, they left here for me: their footprints, their failures, their junk. What will you leave?',
    last: 'We’ve done harder things.',
    audio: 'assets/audio/finale-jfk-we-choose.mp3',
    img: 'assets/img/watcher-earthset-limb.jpg',
  },

  memorial: [
    'Apollo 1 (1967): Gus Grissom, Ed White, Roger Chaffee',
    'Soyuz 1 (1967): Vladimir Komarov',
    'Soyuz 11 (1971): Georgy Dobrovolsky, Vladislav Volkov, Viktor Patsayev',
    'Challenger (1986): Dick Scobee, Michael Smith, Ronald McNair, Ellison Onizuka, Judith Resnik, Gregory Jarvis, Christa McAuliffe',
    'Columbia (2003): Rick Husband, William McCool, Michael Anderson, David Brown, Kalpana Chawla, Laurel Clark, Ilan Ramon',
  ],

  // Stretch beats — only if everything above ships early.
  stretch: {
    food: 'The Martian’s potatoes (2011 novel) → ISS lettuce, 10 Aug 2015 → Chang’e 4 cotton sprout, Jan 2019, froze within a week → plants grown in real Apollo 11/12/17 soil (Paul et al., 2022). img: food-veggie-lettuce.jpg',
    radiation: 'Apollo crews saw flashes with their eyes closed; Chang’e 4 measured ~2.6× the ISS dose (Science Advances 2020). Fix: 2–3 m of regolith overhead.',
    dust: 'Apollo 17: Schmitt’s “lunar hay fever” (img: dust-cernan-lm.jpg). Electrodynamic Dust Shield cleared regolith on Blue Ghost, Mar 2025.',
    spadex: 'SpaDeX, 16 Jan 2025: India becomes the 4th country to dock two spacecraft in orbit (ISRO).',
    gaganyaan: 'Gaganyaan: first uncrewed flight with the Vyommitra robot targeted Q4 2026; crewed by 2027; BAS station by 2035; Indian on the Moon by 2040 (ISRO/PIB).',
  },
};
