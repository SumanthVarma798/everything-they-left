// The Lunar Library — everything Bhoomi can read that she didn't live through.
// These never appear in the game's six chapters; they unlock in the hangar alongside the story beat
// they rhyme with (`with:` is a progress id, see lib/progress.js). Real events, real dates, sourced.
// Anything after Sept 2026 must carry projected:true + a dated basis. No photographs in here by design:
// she is reading nickel plates, not looking at pictures.

export const ARCHIVE = [
  // ── AIR · the first breaths, the first public failures ────────────────────────────────────────
  { id: 'laika', year: 1957, title: 'Laika', org: 'USSR', with: 'chapter:air',
    text: 'Sputnik 2 carried a stray dog from the streets of Moscow into orbit on 3 November 1957. There was no plan to bring her back, and she died of overheating within hours of launch. Forty-one years later Oleg Gazenko, who had trained her, said the mission had not taught them enough to justify the death of the dog.',
    why: 'The first heartbeat in orbit belonged to someone who never agreed to go.',
    sources: [['Laika', 'https://en.wikipedia.org/wiki/Laika']] },

  { id: 'kaputnik', year: 1957, title: 'Kaputnik', org: 'US Navy', with: 'chapter:air',
    text: 'On 6 December 1957 Vanguard TV-3 rose about a metre off the pad, sank back and exploded, live on television. The newspapers called it Kaputnik and Flopnik. Eight weeks later Explorer 1 reached orbit and discovered the Van Allen radiation belts.',
    why: 'They failed in front of everyone and flew again in eight weeks. I keep forgetting that part.',
    sources: [['Vanguard TV-3', 'https://en.wikipedia.org/wiki/Vanguard_TV-3'], ['Explorer 1', 'https://en.wikipedia.org/wiki/Explorer_1']] },

  { id: 'sce-to-aux', year: 1969, title: 'SCE to AUX', org: 'NASA', with: 'chapter:air',
    text: 'Lightning struck Apollo 12 twice in the first minute of flight and every telemetry screen in Mission Control turned to nonsense. John Aaron, 24 years old, recognised the pattern of garbage from an obscure test a year earlier and called for an obscure switch: "Try SCE to auxiliary." Alan Bean was the only person aboard who knew where it was.',
    why: 'One person remembered one useless thing, and it turned out not to be useless.',
    sources: [['John Aaron', 'https://en.wikipedia.org/wiki/John_Aaron'], ['Apollo 12', 'https://en.wikipedia.org/wiki/Apollo_12']] },

  { id: 'vostok-1', year: 1961, title: '108 minutes', org: 'USSR', with: 'fix:air',
    text: 'Yuri Gagarin was sealed into a sphere he could not fly — the controls were locked, and the key to unlock them was in an envelope taped to the wall — for one orbit of the Earth on 12 April 1961. The capsule was not designed to land softly with him inside, so he ejected at about 7 km and came down under his own parachute.',
    why: 'The first man in space was cargo. He went anyway.',
    sources: [['Vostok 1', 'https://en.wikipedia.org/wiki/Vostok_1']] },

  { id: 'skylab-parasol', year: 1973, title: 'The parasol', org: 'NASA', with: 'fix:air',
    text: 'Skylab tore off its meteoroid shield and one solar wing during launch on 14 May 1973. The station cooked at around 52 °C until its first crew flew up with a parasol built in ten days, pushed it out through a small airlock and opened it like an umbrella over the hull; two weeks later they went outside and freed the jammed remaining wing by hand. Three crews then lived aboard the salvaged station for 171 days.',
    why: 'Their home was ruined before they arrived. They repaired it from the inside and stayed.',
    sources: [['Skylab', 'https://en.wikipedia.org/wiki/Skylab'], ['Skylab 2', 'https://en.wikipedia.org/wiki/Skylab_2']] },

  // ── MOVE · navigation, wheels, improvisation ──────────────────────────────────────────────────
  { id: 'mariner-4-pastels', year: 1965, title: 'The picture they coloured in by hand', org: 'NASA / JPL', with: 'chapter:move',
    text: 'Mariner 4 returned the first close-up data from another planet on 15 July 1965, as numbers on a teletype. Rather than wait hours for the image processor, the team pinned the paper strips to a wall, bought pastel chalks from an art shop and coloured each number by hand. That hand-drawn Mars is still framed at JPL.',
    why: 'The first picture of another planet was drawn by hand, by people who could not wait.',
    sources: [['Mariner 4', 'https://en.wikipedia.org/wiki/Mariner_4']] },

  { id: 'sojourner', year: 1997, title: 'Named by a twelve-year-old', org: 'NASA', with: 'chapter:move',
    text: 'The first wheels on Mars rolled off their lander on 6 July 1997. The rover was named by Valerie Ambroise, 12, of Bridgeport, Connecticut, who won a student essay contest by proposing Sojourner Truth. It travelled about a hundred metres in total, never more than a dozen metres from the lander.',
    why: 'A hundred metres. It was still the furthest anyone had driven on another world.',
    sources: [['Sojourner', 'https://en.wikipedia.org/wiki/Sojourner_(rover)']] },

  { id: 'ingenuity', year: 2021, title: 'The first flight on another world', org: 'NASA / JPL', with: 'chapter:move',
    text: 'Ingenuity lifted three metres off Mars for 39 seconds on 19 April 2021, carrying a postage-stamp of fabric from the 1903 Wright Flyer. Built for five flights, it made 72 over nearly three years before a rotor blade broke on landing in January 2024.',
    why: 'Five flights budgeted. Seventy-two flown. Everything here was built with more margin than anyone admitted.',
    sources: [['Ingenuity', 'https://en.wikipedia.org/wiki/Ingenuity_(helicopter)']] },

  { id: 'hayabusa-limp', year: 2010, title: 'Two broken engines make one', org: 'JAXA', with: 'fix:move',
    text: 'Hayabusa came home from the asteroid Itokawa with its ion engines dying one by one. Engineers used a cross-connection left in the design as a spare path, pairing the working ion source of one thruster with the working neutraliser of another, and flew the hybrid for seven months. The capsule returned about 1,500 grains of asteroid on 13 June 2010.',
    why: 'Two dead engines, wired into one living one. That is exactly what I have been doing.',
    sources: [['Hayabusa', 'https://en.wikipedia.org/wiki/Hayabusa']] },

  { id: 'falcon-1-flight-4', year: 2008, title: 'The fourth one', org: 'SpaceX', with: 'fix:move',
    text: 'The first three Falcon 1 flights failed — a corroded nut, a sloshing tank, a stage that bumped into the one above it. The fourth, on 28 September 2008, was the last the company could afford, and became the first privately developed liquid-fuelled rocket to reach orbit.',
    why: 'Three failures, then the one they could not pay to repeat. They launched it anyway.',
    sources: [['Falcon 1', 'https://en.wikipedia.org/wiki/Falcon_1']] },

  // ── NIGHT · power, cold, machines that stopped answering ──────────────────────────────────────
  { id: 'salyut-7', year: 1985, title: 'The station that froze', org: 'USSR', with: 'chapter:night',
    text: 'Salyut 7 lost power in February 1985 and went silent and tumbling. Vladimir Dzhanibekov and Viktor Savinykh flew up and docked with a dead station by eye and by hand, opened the hatch into darkness at about −10 °C, and found frost on the walls and ice in the water tanks. Working in fur-lined suits by torchlight, they traced the fault to a failed sensor, charged the batteries from the solar panels by hand, and brought the station back to life over several days.',
    why: 'Two men flew to a station that had stopped answering and switched it back on with their hands. I have been doing that for two days and thinking I invented it.',
    sources: [['Soyuz T-13', 'https://en.wikipedia.org/wiki/Soyuz_T-13'], ['Salyut 7', 'https://en.wikipedia.org/wiki/Salyut_7']] },

  { id: 'opportunity', year: 2018, title: 'Ninety days, fourteen years', org: 'NASA', with: 'chapter:night',
    text: 'Opportunity landed on Mars on 25 January 2004 with a 90-day mission and drove 45 kilometres over fourteen years, outliving its own solar-power predictions every winter. Its last transmission came during a planet-wide dust storm on 10 June 2018.',
    why: 'It was designed to die in ninety days. Nobody told it.',
    sources: [['Opportunity', 'https://en.wikipedia.org/wiki/Opportunity_(rover)']] },

  { id: 'philae', year: 2014, title: 'Landed in the shadow', org: 'ESA', with: 'fix:night',
    text: 'Philae reached comet 67P on 12 November 2014, but its harpoons never fired; it bounced about a kilometre and came to rest tilted in the shadow of a cliff, where its solar panels could not charge. It ran its instruments on battery for 57 hours and sent everything it had before going quiet. Rosetta photographed it wedged in a crack 22 months later.',
    why: 'It landed in the one place with no sunlight and still sent home everything it knew first.',
    sources: [['Philae', 'https://en.wikipedia.org/wiki/Philae_(spacecraft)']] },

  // ── KNOW · seeing, recording, keeping ─────────────────────────────────────────────────────────
  { id: 'hubble-mirror', year: 1993, title: 'Wrong by two microns', org: 'NASA / ESA', with: 'chapter:library',
    text: 'Hubble launched in April 1990 with a primary mirror ground to the wrong shape by about 2.2 micrometres at its edge — a fiftieth of a hair — which was enough to blur every image. In December 1993 the crew of STS-61 flew up and, over five spacewalks, fitted it with corrective optics: in effect, spectacles for a telescope.',
    why: 'The most precise mirror ever made was precisely wrong. They flew up and gave it glasses.',
    sources: [['STS-61', 'https://en.wikipedia.org/wiki/STS-61'], ['Hubble Space Telescope', 'https://en.wikipedia.org/wiki/Hubble_Space_Telescope']] },

  { id: 'pale-blue-dot', year: 1990, title: 'Turn the camera around', org: 'NASA', with: 'chapter:library',
    text: 'On 14 February 1990, at Carl Sagan’s urging and against objections that it risked the instrument and returned no science, Voyager 1 turned back and photographed the Earth from about six billion kilometres. The planet is less than a pixel across, caught in a band of scattered sunlight.',
    why: 'Everyone who ever failed and came back is in that one pixel. So is everyone who did not.',
    sources: [['Pale Blue Dot', 'https://en.wikipedia.org/wiki/Pale_Blue_Dot']] },

  { id: 'nisar', year: 2025, title: 'One radar, two countries', org: 'ISRO / NASA', with: 'chapter:library',
    text: 'NISAR launched on 30 July 2025 on a GSLV: an Earth-observing radar built jointly by ISRO and NASA, with an L-band radar from one country and an S-band radar from the other on a single 12-metre deployable antenna. It scans nearly all of the planet’s land and ice every twelve days, watching ground move by centimetres.',
    why: 'Two agencies that once could not share a docking port shared an antenna.',
    sources: [['NISAR', 'https://en.wikipedia.org/wiki/NISAR_(satellite)']] },

  { id: 'arecibo', year: 2020, title: 'The dish that fell', org: 'NSF', with: 'fix:library',
    text: 'For 57 years the Arecibo dish in Puerto Rico mapped Venus, found the first known exoplanets and sent the 1974 interstellar message. Support cables began snapping in August 2020, and on 1 December the 900-tonne instrument platform tore free and crashed into the dish below.',
    why: 'Knowing things is not permanent. Somebody has to keep the instrument standing.',
    sources: [['Arecibo Telescope', 'https://en.wikipedia.org/wiki/Arecibo_Telescope']] },

  { id: 'jwst-deployment', year: 2022, title: 'Three hundred and forty-four ways to fail', org: 'NASA / ESA / CSA', with: 'fix:library',
    text: 'The James Webb telescope launched folded on 25 December 2021 and spent two weeks unfolding — a tennis-court sunshield, 107 membrane release devices, 18 mirror segments — with about 344 single-point failures, any one of which would have ended the mission with no possibility of repair. Every one worked. The first images came on 12 July 2022.',
    why: 'Three hundred and forty-four chances to lose everything, and they took all of them at once.',
    sources: [['James Webb Space Telescope', 'https://en.wikipedia.org/wiki/James_Webb_Space_Telescope']] },

  // ── WATER · living off what is already there ──────────────────────────────────────────────────
  { id: 'venera-7', year: 1970, title: 'Twenty-three minutes on Venus', org: 'USSR', with: 'chapter:water',
    text: 'Venera 7 became the first spacecraft to send data from the surface of another planet on 15 December 1970. Its parachute tore on the way down and it hit hard; the signal was so faint that engineers only found the surface data weeks later, buried in the tape. It survived 23 minutes at about 475 °C and 90 atmospheres.',
    why: 'They nearly threw away the tape that proved it worked.',
    sources: [['Venera 7', 'https://en.wikipedia.org/wiki/Venera_7']] },

  { id: 'huygens-titan', year: 2005, title: 'Pebbles on Titan', org: 'ESA / NASA', with: 'chapter:water',
    text: 'Huygens parachuted onto Titan on 14 January 2005, the most distant landing ever made — about 1.2 billion kilometres away. Its photographs show rounded pebbles on a damp floodplain and channels cut by rivers, but the rain there is methane and the stones are water ice.',
    why: 'Rivers, pebbles, a shoreline — and not one drop of it water. Things can be familiar and still not be yours.',
    sources: [['Huygens', 'https://en.wikipedia.org/wiki/Huygens_(spacecraft)']] },

  { id: 'moxie', year: 2021, title: 'Air from the air', org: 'NASA', with: 'fix:water',
    text: 'MOXIE, a toaster-sized box on the Perseverance rover, ran for the first time on 20 April 2021 and pulled oxygen out of the Martian atmosphere at about 5.4 grams an hour. Over sixteen runs it made 122 grams — roughly what a small dog breathes in a day, and the first time anything was manufactured on another planet.',
    why: 'A hundred and twenty-two grams. The first thing humans ever made somewhere that was not Earth.',
    sources: [['MOXIE', 'https://en.wikipedia.org/wiki/MOXIE']] },

  { id: 'bennu-sample', year: 2023, title: 'Water in a spoonful of asteroid', org: 'NASA', with: 'fix:water',
    text: 'OSIRIS-REx dropped a capsule into the Utah desert on 24 September 2023 holding 121.6 grams of the asteroid Bennu. The sample turned out to be rich in carbon and in clays that hold water inside their crystal structure — water and organic chemistry from before the planets finished forming.',
    why: 'The water was in the rocks the whole time. It usually is.',
    sources: [['OSIRIS-REx', 'https://en.wikipedia.org/wiki/OSIRIS-REx']] },

  { id: 'orbital-refuelling', year: 2027, projected: true, title: 'Filling up in orbit', org: 'SpaceX / NASA',
    with: 'chapter:water',
    basis: 'SpaceX demonstrated internal propellant transfer between tanks on Starship flight 3 (14 March 2024); ship-to-ship transfer is the next milestone under NASA’s Human Landing System contract. Date and outcome are projected, not history.',
    text: 'A Starship cannot reach the Moon on one tank; the plan has always been to launch it nearly empty and fill it from tankers already in orbit. Transferring cryogenic propellant between two ships in freefall — with no gravity to settle the liquid — is the step the whole architecture waits on.',
    why: 'Nobody gets anywhere far by carrying everything from the start. You refill where you are.',
    sources: [['SpaceX Starship', 'https://en.wikipedia.org/wiki/SpaceX_Starship'], ['Human Landing System', 'https://en.wikipedia.org/wiki/Human_Landing_System']] },

  // ── SIGNAL · staying in touch ─────────────────────────────────────────────────────────────────
  { id: 'voyager-1-still-talking', year: 2024, title: 'Still answering', org: 'NASA', with: 'fix:signal',
    text: 'Voyager 1 launched on 5 September 1977 and crossed into interstellar space on 25 August 2012. In November 2023 it began sending back gibberish; engineers traced the fault to a single failed chip in a computer designed in the 1960s, rewrote the affected code around the damage and radioed the patch to a spacecraft 24 billion kilometres away, where a message takes almost a day each way. It resumed sending science data in 2024.',
    why: 'A machine older than my great-grandmother, repaired by people who could only send it words.',
    sources: [['Voyager 1', 'https://en.wikipedia.org/wiki/Voyager_1']] },

  { id: 'apollo-soyuz', year: 1975, title: 'The adapter', org: 'NASA / USSR', with: 'chapter:signal',
    text: 'The American and Soviet ships could not dock: incompatible latches, and incompatible air — 5 psi of pure oxygen on one side, sea-level pressure on the other. So they built a third thing, an androgynous docking module that was also an airlock, and on 17 July 1975 Tom Stafford and Alexei Leonov shook hands through it.',
    why: 'Neither side changed their ship. They built the piece in between.',
    sources: [['Apollo–Soyuz', 'https://en.wikipedia.org/wiki/Apollo%E2%80%93Soyuz']] },

  { id: 'deep-space-network', year: 1963, title: 'Three dishes, so Earth never turns away', org: 'NASA / JPL', with: 'chapter:signal',
    text: 'The Deep Space Network is three antenna complexes — Goldstone in California, Madrid, and Canberra — spaced about 120 degrees apart around the planet, so that as the Earth rotates, at least one of them is always facing any spacecraft in deep space. Every distant mission shares them, booked years in advance.',
    why: 'Somebody worked out, once, that the Earth should never be able to turn its back on you.',
    sources: [['Deep Space Network', 'https://en.wikipedia.org/wiki/NASA_Deep_Space_Network']] },

  { id: 'polaris-dawn', year: 2024, title: 'A door opened at 700 kilometres', org: 'SpaceX', with: 'fix:signal',
    text: 'Polaris Dawn flew four people, none of them career astronauts, to about 1,400 km — the furthest any crew had been from Earth since Apollo — and on 12 September 2024 depressurised the whole capsule and opened the hatch for the first commercial spacewalk, in suits developed in under three years.',
    why: 'The first people outside were government men with flags. Now anyone can be cold and far away.',
    sources: [['Polaris Dawn', 'https://en.wikipedia.org/wiki/Polaris_Dawn']] },

  // ── The record she is standing on ─────────────────────────────────────────────────────────────
  { id: 'pslv-c37', year: 2017, title: 'A hundred and four at once', org: 'ISRO', with: 'screen:map',
    text: 'On 15 February 2017 a single PSLV placed 104 satellites into orbit in about ten minutes, releasing them in pairs on opposite sides so they would drift apart instead of colliding. It held the record for a single launch for four years.',
    why: 'Cheap, careful, and ten minutes long. That was always how they did it.',
    sources: [['PSLV-C37', 'https://en.wikipedia.org/wiki/PSLV-C37']] },

  { id: 'pushpak', year: 2024, title: 'Landing practice', org: 'ISRO', with: 'screen:map',
    text: 'In 2024 ISRO dropped its winged Pushpak demonstrator from a helicopter three times over Chitradurga, each time releasing it off-course and off-centre on purpose, and each time it corrected itself and landed on the runway on its own.',
    why: 'They kept throwing it down wrong to make sure it could still land right.',
    sources: [['RLV Technology Demonstration Programme', 'https://en.wikipedia.org/wiki/RLV_Technology_Demonstration_Programme']] },

  { id: 'expedition-1', year: 2000, title: 'Nobody has been alone since', org: 'NASA / Roscosmos', with: 'screen:epilogue',
    text: 'Bill Shepherd, Yuri Gidzenko and Sergei Krikalev opened the International Space Station on 2 November 2000. From that day there has not been a single moment when every human being was on the Earth at the same time.',
    why: 'Somebody has been off the Earth, looking down at it, every minute for a hundred and fifty years.',
    sources: [['Expedition 1', 'https://en.wikipedia.org/wiki/Expedition_1']] },

  { id: 'bharatiya-antariksh-station', year: 2035, projected: true, title: 'A station of their own', org: 'ISRO',
    with: 'screen:epilogue',
    basis: 'India announced the Bharatiya Antariksh Station in 2024 — first module around 2028, complete around 2035 — alongside a stated goal of landing an Indian on the Moon by 2040. Dates and outcomes are projected, not history.',
    text: 'India’s plan after Gaganyaan is a station of its own, assembled over several launches, with a crewed lunar landing named for 2040. The same institutions that once moved a rocket cone on a bicycle wrote that date down and published it.',
    why: 'Somebody wrote 2040 on a piece of paper. My great-grandmother arrived here the year after.',
    sources: [['Bharatiya Antariksh Station', 'https://en.wikipedia.org/wiki/Bharatiya_Antariksh_Station']] },
];
