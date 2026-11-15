const TAGS = {
  grid: ['Grid', '#4aa3df'], solar: ['Solar', '#f2b233'], wind: ['Wind', '#62c7b8'], hydro: ['Hydro', '#3f7fd6'],
  community: ['Community', '#e57fa8'], nature: ['Nature', '#5fb36b'], build: ['Build', '#b08a5c'],
  policy: ['Policy', '#b66bdb'], finance: ['Finance', '#d8b84a'], research: ['Research', '#8f9bff'], geo: ['Geo', '#9aa0a6']
};
const EMIS = ['transport', 'industry', 'buildings', 'agriculture', 'fuel', 'waste'];
const EMI_NAME = { transport: 'Transport', industry: 'Industry', buildings: 'Buildings', agriculture: 'Agriculture', fuel: 'Fuel Extraction', waste: 'Waste' };
const RES = ['social', 'eco', 'infra'];
const RES_NAME = { social: 'Social', eco: 'Ecological', infra: 'Infrastructure', any: 'any' };
const ACT = {
  clean: { cost: 1, once: false }, cleanfree: { cost: 0, once: true }, phase: { cost: 0, once: true }, cut: { cost: 0, once: true },
  elec: { cost: 0, once: true }, res: { cost: 0, once: true }, draw: { cost: 1, once: true }, tree: { cost: 1, once: true },
  ocean: { cost: 1, once: true }, dac: { cost: 2, once: true }, eff: { cost: 0, once: true }, aid: { cost: 0, once: true, multi: true },
  aidres: { cost: 0, once: true, multi: true }, relief: { cost: 1, once: true }, geo: { cost: 0, once: true }
};
const CARD_DEFS = [
  ['Rooftop Solar Co-ops', 'solar,community', 'clean:solar'],
  ['Utility Solar Parks', 'solar,grid', 'clean:solar'],
  ['Offshore Wind Farms', 'wind,grid', 'clean:wind'],
  ['Community Wind', 'wind,community', 'clean:wind'],
  ['Smart Grid Upgrade', 'grid,research', 'clean:grid'],
  ['Long-Distance Transmission', 'grid,build', 'clean:grid'],
  ['Run-of-River Hydro', 'hydro,nature', 'clean:hydro'],
  ['Pumped Storage', 'hydro,grid', 'cleanfree:hydro'],
  ['Grid Batteries', 'grid,research', 'cleanfree:grid'],
  ['Agrivoltaics', 'solar,nature', 'cleanfree:solar'],
  ['Floating Solar', 'solar,hydro', 'clean:solar'],
  ['Repowered Wind Sites', 'wind,finance', 'cleanfree:wind'],
  ['Geothermal Plants', 'research,build', 'clean:research'],
  ['Green Hydrogen', 'research,wind', 'cut:industry:research'],
  ['Microgrids', 'grid,community', 'res:infra:grid'],
  ['Coal Plant Retirement', 'policy,grid', 'phase:policy'],
  ['Clean Power Standard', 'policy,solar', 'phase:policy'],
  ['Carbon Price', 'policy,finance', 'phase:finance'],
  ['Fossil Subsidy Reform', 'finance,policy', 'phase:finance'],
  ['Just Transition Fund', 'finance,community', 'phase:community'],
  ['Gas Plant Phaseout', 'policy,wind', 'phase:wind'],
  ['Methane Leak Rules', 'policy', 'cut:fuel:policy'],
  ['Well Plugging Programme', 'build,nature', 'cut:fuel:build'],
  ['No New Drilling', 'policy,nature', 'cut:fuel:nature'],
  ['Electric Bus Fleets', 'grid,community', 'elec:transport:grid'],
  ['EV Incentives', 'finance,grid', 'elec:transport:finance'],
  ['High-Speed Rail', 'build,grid', 'cut:transport:build'],
  ['Cycle Networks', 'build,community', 'cut:transport:community'],
  ['Fifteen-Minute Cities', 'community,policy', 'cut:transport:policy'],
  ['Clean Shipping Corridors', 'hydro,policy', 'cut:transport:hydro'],
  ['Sustainable Aviation Fuel', 'research,finance', 'cut:transport:research'],
  ['Freight Electrification', 'grid,build', 'elec:transport:build'],
  ['Green Steel', 'research,build', 'cut:industry:build'],
  ['Low-Carbon Cement', 'research,policy', 'cut:industry:research'],
  ['Industrial Heat Pumps', 'grid,research', 'elec:industry:grid'],
  ['Circular Manufacturing', 'policy,research', 'cut:industry:policy'],
  ['Carbon Border Tariff', 'policy,finance', 'cut:industry:finance'],
  ['Industrial Efficiency Audits', 'policy,build', 'eff:policy'],
  ['Heat Pump Rebates', 'finance,grid', 'elec:buildings:finance'],
  ['Deep Retrofits', 'build,community', 'cut:buildings:build'],
  ['Passive House Codes', 'policy,build', 'cut:buildings:policy'],
  ['District Heating', 'build,grid', 'elec:buildings:build'],
  ['Efficient Appliances', 'policy,research', 'eff:research'],
  ['Cool Roofs', 'build,solar', 'eff:build'],
  ['LED Streetlights', 'grid,build', 'eff:grid'],
  ['Regenerative Farming', 'nature,community', 'cut:agriculture:nature'],
  ['Plant-Rich Diets', 'community,nature', 'cut:agriculture:community'],
  ['Methane-Reducing Feed', 'research,nature', 'cut:agriculture:research'],
  ['Paddy Water Management', 'hydro,nature', 'cut:agriculture:hydro'],
  ['Food Waste Reduction', 'community,policy', 'cut:waste:community'],
  ['Landfill Gas Capture', 'build,research', 'cut:waste:build'],
  ['Composting Programmes', 'community,nature', 'cut:waste:nature'],
  ['Recycling Standards', 'policy,build', 'cut:waste:policy'],
  ['Reforestation', 'nature,community', 'tree:nature'],
  ['Urban Forests', 'nature,build', 'tree:nature'],
  ['Peatland Restoration', 'nature,hydro', 'tree:nature'],
  ['Mangrove Restoration', 'nature,hydro', 'ocean:nature'],
  ['Seagrass Meadows', 'nature,research', 'ocean:nature'],
  ['Kelp Forests', 'hydro,research', 'ocean:hydro'],
  ['Protected Areas', 'nature,policy', 'tree:policy'],
  ['Indigenous Land Rights', 'community,nature', 'tree:community'],
  ['Soil Carbon Farming', 'nature,finance', 'tree:finance'],
  ['Marine Reserves', 'policy,hydro', 'ocean:policy'],
  ['Direct Air Capture', 'geo,research', 'dac:geo'],
  ['Enhanced Weathering', 'geo,nature', 'dac:geo'],
  ['Biochar', 'geo,nature', 'dac:geo'],
  ['Ocean Alkalinity Trials', 'geo,hydro', 'geo:geo'],
  ['Cloud Brightening Study', 'geo,research', 'geo:geo'],
  ['Bioenergy With Capture', 'geo,build', 'dac:build'],
  ['Resilience Volunteers', 'community', 'res:social:community'],
  ['Citizen Assemblies', 'community,policy', 'res:social:community'],
  ['Public Health Systems', 'community,finance', 'res:social:finance'],
  ['Early Warning Systems', 'research,build', 'res:infra:research'],
  ['Flood Defences', 'build,hydro', 'res:infra:build'],
  ['Climate-Proof Infrastructure', 'build,finance', 'res:infra:build'],
  ['Wetland Buffers', 'nature,hydro', 'res:eco:nature'],
  ['Seed Banks', 'nature,research', 'res:eco:research'],
  ['Wildlife Corridors', 'nature,policy', 'res:eco:nature'],
  ['Drought-Resistant Crops', 'research,nature', 'res:eco:research'],
  ['Disaster Insurance Pools', 'finance,community', 'res:any:finance'],
  ['Climate Education', 'community,research', 'res:social:research'],
  ['Technology Transfer', 'research,finance', 'aid:research'],
  ['Clean Energy Exports', 'solar,finance', 'aid:solar'],
  ['Adaptation Finance', 'finance,community', 'aidres:finance'],
  ['Loss And Damage Fund', 'finance,policy', 'relief:finance'],
  ['Community Health Workers', 'community,nature', 'relief:community'],
  ['Housing Guarantee', 'build,community', 'relief:build'],
  ['Climate Research Network', 'research', 'draw:research'],
  ['Green Investment Bank', 'finance,grid', 'draw:finance'],
  ['Policy Labs', 'policy,research', 'draw:policy'],
  ['Open Climate Data', 'research,community', 'draw:research'],
  ['Mission-Driven Innovation', 'research,grid', 'cleanfree:research'],
  ['Public Transport Funding', 'finance,build', 'cut:transport:finance'],
  ['Behaviour Change Campaigns', 'community,policy', 'eff:community'],
  ['Demand Response', 'grid,community', 'eff:grid'],
  ['Tidal Power', 'hydro,research', 'clean:hydro']
];
const BLOCS = {
  atlantic: { name: 'Atlantic Union', colour: '#5aa9e6', demand: 11, growth: 1, dirty: 7, clean: 4, emis: { transport: 3, industry: 3, buildings: 3, agriculture: 1, fuel: 0, waste: 1 }, res: { social: 2, eco: 1, infra: 2 }, cic: 0,
    start: [['Offshore Wind Programme', 'wind,grid', 'clean:wind'], ['Emissions Trading', 'policy,finance', 'phase:policy'], ['Rail Renaissance', 'build,grid', 'cut:transport:build'], ['Social Safety Net', 'community,finance', 'res:social:community'], ['Green Deal Industry', 'research,finance', 'cut:industry:research']] },
  northern: { name: 'Northern Republic', colour: '#ef6f6c', demand: 16, growth: 1, dirty: 12, clean: 4, emis: { transport: 5, industry: 3, buildings: 3, agriculture: 1, fuel: 3, waste: 1 }, res: { social: 1, eco: 1, infra: 2 }, cic: 0,
    start: [['Solar Belt', 'solar,grid', 'clean:solar'], ['Infrastructure Act', 'build,finance', 'res:infra:build'], ['EV Manufacturing', 'grid,research', 'elec:transport:grid'], ['Clean Electricity Credits', 'finance,policy', 'phase:finance'], ['Innovation Labs', 'research', 'draw:research']] },
  eastern: { name: 'Eastern Commonwealth', colour: '#f2b233', demand: 13, growth: 2, dirty: 10, clean: 3, emis: { transport: 3, industry: 8, buildings: 3, agriculture: 1, fuel: 0, waste: 1 }, res: { social: 1, eco: 1, infra: 1 }, cic: 1,
    start: [['Mega Solar Bases', 'solar,grid', 'clean:solar'], ['Coal Retirement Quotas', 'policy,grid', 'phase:policy'], ['Industrial Upgrade', 'research,build', 'cut:industry:build'], ['Sponge Cities', 'build,nature', 'res:infra:build'], ['Green Tech Push', 'solar,research', 'cleanfree:solar']] },
  southern: { name: 'Southern Alliance', colour: '#6fcf7f', demand: 9, growth: 3, dirty: 7, clean: 2, emis: { transport: 1, industry: 3, buildings: 1, agriculture: 4, fuel: 1, waste: 1 }, res: { social: 1, eco: 1, infra: 0 }, cic: 2,
    start: [['Village Solar Minigrids', 'solar,community', 'cleanfree:solar'], ['Agroforestry', 'nature,community', 'tree:nature'], ['Community Resilience Hubs', 'community,build', 'res:social:community'], ['Climate Finance Access', 'finance,policy', 'relief:finance'], ['Clean Cooking', 'community,nature', 'cut:agriculture:community']] }
};
const BLOC_SETS = { 1: ['atlantic'], 2: ['eastern', 'northern'], 3: ['southern', 'atlantic', 'northern'], 4: ['southern', 'eastern', 'atlantic', 'northern'] };
const SINKS = { 1: [6, 4], 2: [16, 10], 3: [13, 9], 4: [20, 12] };
const DIFFS = { easier: { label: 'Easier', mul: 1.25 }, standard: { label: 'Standard', mul: 1 }, harder: { label: 'Harder', mul: 0.85 } };
const SOLO_START = { demand: 13, dirty: 10, clean: 3, emis: { transport: 3, industry: 4, buildings: 2, agriculture: 2, fuel: 2, waste: 1 }, growth: 2 };
const GLOBAL_DEFS = [
  ['Paris Rulebook', 'policy', 'emit1', 'Each bloc emits 1 less Carbon every round.'],
  ['Global Methane Pledge', 'policy', 'fuel1', 'Every round, each bloc removes 1 Fuel Extraction emission.'],
  ['Green Climate Fund', 'finance', 'draw1', 'Each bloc draws 1 extra card every round.'],
  ['Mission Innovation', 'research', 'clean1', 'Each bloc gains 1 Clean Energy every round.'],
  ['Great Green Wall', 'nature', 'trees', 'Add 2 Trees per bloc when this activates.'],
  ['High Seas Treaty', 'hydro', 'oceans', 'Add 2 Oceans per bloc when this activates.'],
  ['Global Adaptation Goal', 'community', 'shield', 'Every Crisis effect is reduced by 1 for each bloc.'],
  ['Super Grid Alliance', 'grid', 'demand', 'Energy Demand grows 1 less each round.'],
  ['International Solar Alliance', 'solar', 'clean1', 'Each bloc gains 1 Clean Energy every round.'],
  ['Wind Power Pact', 'wind', 'emit1', 'Each bloc emits 1 less Carbon every round.'],
  ['Carbon Removal Purchase Pact', 'geo', 'dac', 'Add 2 Direct Air Capture per bloc when this activates.'],
  ['Loss And Damage Facility', 'finance', 'relief', 'Every round, each bloc removes 1 Community in Crisis.'],
  ['Building Standards Accord', 'build', 'build1', 'Every round, each bloc removes 1 Buildings emission.'],
  ['Clean Transport Accord', 'grid', 'trans1', 'Every round, each bloc removes 1 Transport emission.'],
  ['Food Systems Pact', 'nature', 'agri1', 'Every round, each bloc removes 1 Agriculture emission.'],
  ['Zero Waste Charter', 'community', 'waste1', 'Every round, each bloc removes 1 Waste emission.'],
  ['Steel And Cement Club', 'research', 'ind1', 'Every round, each bloc removes 1 Industry emission.'],
  ['Debt-For-Climate Swaps', 'finance', 'res1', 'Every round, each bloc gains 1 Resilience of its weakest type.'],
  ['Forest Finance Facility', 'finance', 'trees', 'Add 2 Trees per bloc when this activates.'],
  ['Ocean Protection Alliance', 'policy', 'oceans', 'Add 2 Oceans per bloc when this activates.'],
  ['Early Warnings For All', 'research', 'shield', 'Every Crisis effect is reduced by 1 for each bloc.'],
  ['Just Energy Partnerships', 'finance', 'clean1', 'Each bloc gains 1 Clean Energy every round.'],
  ['Fossil Non-Proliferation Treaty', 'policy', 'phase1', 'Every round, each bloc removes 1 Dirty Energy if it can still meet demand.'],
  ['Open Science Accord', 'research', 'draw1', 'Each bloc draws 1 extra card every round.']
];
const CRISIS_DEFS = [
  ['Heatwave', 'all', 'cic', 'bands', 'social', 'community', 0],
  ['River Flooding', 'all', 'cic', 2, 'infra', 'build', 0],
  ['Drought', 'low:eco', 'loseres:eco', 2, '', 'hydro', 0],
  ['Wildfires', 'all', 'trees', 1, '', 'nature', 0],
  ['Crop Failure', 'all', 'cic', 2, 'eco', 'nature', 0],
  ['Storm Surge', 'high:carbon', 'cic', 3, 'infra', 'build', 0],
  ['Energy Price Shock', 'all', 'demand', 1, '', 'grid', 0],
  ['Disinformation Campaign', 'all', 'cards', 1, '', 'community', 0],
  ['Fossil Lobby Pushback', 'high:dirty', 'dirty', 2, '', 'policy', 0],
  ['Coral Bleaching', 'all', 'oceans', 1, '', 'hydro', 0],
  ['Climate Displacement', 'all', 'cic', 1, 'social', 'community', 0],
  ['Financial Turmoil', 'all', 'drawminus', 1, '', 'finance', 0],
  ['Grid Blackout', 'low:infra', 'loseres:infra', 2, '', 'grid', 0],
  ['Disease Outbreak', 'all', 'cic', 1, 'social', 'research', 0],
  ['Supply Chain Breakdown', 'all', 'cards', 1, '', 'build', 0],
  ['Glacier Retreat', 'all', 'cic', 1, 'eco', 'hydro', 0],
  ['Landslides', 'high:cic', 'cic', 2, 'infra', 'build', 0],
  ['Locust Swarms', 'low:eco', 'cic', 3, 'eco', 'research', 0],
  ['Water Scarcity', 'all', 'loseres:eco', 1, '', 'hydro', 0],
  ['Permafrost Subsidence', 'all', 'loseres:infra', 1, '', 'build', 0],
  ['Insurance Retreat', 'all', 'cic', 1, 'infra', 'finance', 0],
  ['Sea Level Rise', 'all', 'cic', 'halfbands', 'infra', 'build', 0],
  ['Hurricane Season', 'high:carbon', 'cic', 'bands', 'infra', 'build', 0],
  ['Oil Spill', 'high:dirty', 'oceans', 2, '', 'policy', 0],
  ['Smog Emergency', 'high:dirty', 'cic', 2, 'social', 'policy', 0],
  ['Fishery Collapse', 'all', 'cic', 1, 'eco', 'hydro', 0],
  ['Political Backlash', 'all', 'cards', 1, '', 'policy', 0],
  ['Dust Storms', 'all', 'trees', 1, '', 'nature', 0],
  ['Extreme Cold Snap', 'all', 'demand', 1, '', 'build', 0],
  ['Deadly Humid Heat', 'low:social', 'cic', 'bands', 'social', 'community', 0],
  ['Resource Conflict', 'high:cic', 'cic', 2, 'social', 'community', 1],
  ['Trade Disputes', 'all', 'drawminus', 1, '', 'finance', 1]
];
const PLANET = [
  ['weather', 'Storm Systems Shift', 'Draw 2 extra Crisis cards this round.'],
  ['desert', 'Drylands Spread', 'Remove 1 Tree per bloc.'],
  ['amazon', 'Rainforest Dieback', 'Add 1 Carbon per bloc to next round’s emissions and remove 1 Tree per bloc.'],
  ['ice', 'Sea Ice Loss', 'Add 2 Carbon per bloc to the Thermometer.'],
  ['thaw', 'Permafrost Thaw', 'Add 2 Carbon per bloc to next round’s emissions.'],
  ['acid', 'Ocean Acidification', 'Remove 1 Ocean per bloc.']
];
const TIPPING = [2, 4, 5];
const ROUNDS = 6;
const MAX_BANDS = 8;
const CIC_LOSS = 12;

function parseAct(s) {
  const a = s.split(':');
  let arg = '';
  let tag;
  if (a.length === 3) { arg = a[1]; tag = a[2]; } else tag = a[1];
  return { kind: a[0], arg: arg, tag: tag, cost: ACT[a[0]].cost, once: ACT[a[0]].once, multi: !!ACT[a[0]].multi };
}
const CARDS = [];
CARD_DEFS.forEach(function (d) { CARDS.push({ id: CARDS.length, title: d[0], tags: d[1].split(','), act: parseAct(d[2]), bloc: '' }); });
const DECK_SIZE = CARDS.length;
Object.keys(BLOCS).forEach(function (k) {
  BLOCS[k].startIds = BLOCS[k].start.map(function (d) { CARDS.push({ id: CARDS.length, title: d[0], tags: d[1].split(','), act: parseAct(d[2]), bloc: k }); return CARDS.length - 1; });
});
const GLOBALS = GLOBAL_DEFS.map(function (d, i) { return { id: i, title: d[0], tag: d[1], eff: d[2], text: d[3] }; });
const CRISES = CRISIS_DEFS.map(function (d, i) { return { id: i, title: d[0], target: d[1], eff: d[2], amt: d[3], reduce: d[4], ignore: d[5], multi: !!d[6] }; });

function rnd(n) { return Math.floor(Math.random() * n); }
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); const x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function plural(n, word) { if (n === 1) return n + ' ' + word; return n + ' ' + word + 's'; }
function rowSize(st) { return 5 * st.players.length; }
function crisisCount(bands) { if (bands >= 6) return 5; if (bands >= 4) return 4; return 3; }
function degrees(bands) { return (1.2 + bands * 0.1).toFixed(1); }
function sumEmis(p) { let s = 0; EMIS.forEach(function (e) { s += p.emis[e]; }); return s; }
function activeCount(st, eff) { let n = 0; st.globals.forEach(function (g) { if (g.active && GLOBALS[g.id].eff === eff) n++; }); return n; }
function carbonOf(st, p) { return Math.max(0, p.dirty + sumEmis(p) - activeCount(st, 'emit1')); }
function capacity(st) { return st.trees + st.oceans + st.dac; }
function tagCount(ids, tag) { let n = 0; ids.forEach(function (id) { CARDS[id].tags.forEach(function (t) { if (t === tag) n++; }); }); return n; }
function globalReq(st) { return 2 + st.players.length; }
function ignoreNeed(st) { return 1 + Math.floor(st.players.length / 2); }
function weakest(p) { let w = RES[0]; RES.forEach(function (r) { if (p.res[r] < p.res[w]) w = r; }); return w; }
function shortfall(p) { return Math.max(0, p.demand - p.dirty - p.clean); }
function blocName(st, i) { return BLOCS[st.players[i].bloc].name; }
function addLog(st, txt, k) { st.logN = (st.logN || 0) + 1; st.log.push({ n: st.logN, txt: txt, k: k || '' }); if (st.log.length > 120) st.log.shift(); }
function report(st, txt, k) { st.report.push({ txt: txt, k: k || '' }); addLog(st, txt, k); }
function basePlayer(p) { return { name: p.name, kind: p.kind, level: p.level || '', client: p.client || '' }; }

function drawCards(st, p, n) {
  for (let i = 0; i < n; i++) {
    if (!st.deck.length) {
      if (!st.discard.length) return;
      st.deck = shuffle(st.discard);
      st.discard = [];
    }
    p.hand.push(st.deck.pop());
  }
}
function drawCrisis(st, face) {
  if (!st.cdeck.length) { st.cdeck = shuffle(st.cdiscard); st.cdiscard = []; }
  if (!st.cdeck.length) return;
  st.crises.push({ id: st.cdeck.pop(), face: face, tucked: [] });
}
function addThermo(st, x) {
  const before = st.therm.bands;
  st.therm.cubes += x;
  while (st.therm.cubes >= rowSize(st)) { st.therm.cubes -= rowSize(st); st.therm.bands++; }
  return st.therm.bands - before;
}
function removeThermo(st, x) {
  let removed = 0;
  while (x > 0) {
    if (st.therm.cubes > 0) { const d = Math.min(st.therm.cubes, x); st.therm.cubes -= d; x -= d; removed += d; }
    else if (st.therm.bands > 0) { st.therm.bands--; st.therm.cubes = rowSize(st); }
    else break;
  }
  return removed;
}
function loseSinks(st, kind, k) {
  if (st[kind] >= k) { st[kind] -= k; return 0; }
  const missing = k - st[kind];
  st[kind] = 0;
  st.players.forEach(function (p) { p.cic += missing; });
  return missing;
}
function sinkStart(settings, n, k) {
  let m = 1;
  if (settings && DIFFS[settings.diff]) m = DIFFS[settings.diff].mul;
  return Math.round(SINKS[n][k] * m);
}
function newGame(players, settings, prev) {
  const n = players.length;
  let set = BLOC_SETS[n];
  if (n === 1 && settings.bloc && BLOCS[settings.bloc]) set = [settings.bloc];
  const ps = players.map(function (p, i) {
    const b = BLOCS[set[i]];
    const np = basePlayer(p);
    np.bloc = set[i];
    np.demand = b.demand; np.growth = b.growth; np.dirty = b.dirty; np.clean = b.clean;
    np.emis = clone(b.emis); np.res = clone(b.res); np.cic = b.cic;
    if (n === 1) { np.demand = SOLO_START.demand; np.dirty = SOLO_START.dirty; np.clean = SOLO_START.clean; np.emis = clone(SOLO_START.emis); np.growth = SOLO_START.growth; }
    np.hand = []; np.stacks = b.startIds.map(function (id) { return [id]; }); np.used = {}; np.done = false; np.drawMinus = 0;
    return np;
  });
  const deck = [];
  for (let i = 0; i < DECK_SIZE; i++) { if (n === 1 && CARDS[i].act.multi) continue; deck.push(i); }
  const cdeck = [];
  CRISES.forEach(function (c) { if (n === 1 && c.multi) return; cdeck.push(c.id); });
  const st = { v: 1, status: 'playing', phase: 'global', settings: settings, players: ps, deck: shuffle(deck), discard: [], gdeck: shuffle(GLOBALS.map(function (g) { return g.id; })), gdiscard: [], globals: [], offer: [], cdeck: shuffle(cdeck), cdiscard: [], crises: [], crisisAdded: 0, trees: sinkStart(settings, n, 0), oceans: sinkStart(settings, n, 1), dac: 0, therm: { bands: 0, cubes: 0 }, carry: 0, tracks: {}, round: 0, drawdown: false, report: [], lastReport: [], log: [], logN: 0, result: '', reason: '', seq: 0, hostClient: '', acks: {}, game: 1, history: [] };
  PLANET.forEach(function (pl) { st.tracks[pl[0]] = 0; });
  if (prev) { st.hostClient = prev.hostClient || ''; st.acks = prev.acks || {}; st.game = (prev.game || 0) + 1; }
  startRound(st);
  return st;
}
function startRound(st) {
  st.round++;
  st.phase = 'global';
  st.report = [];
  st.crises = [];
  const k = crisisCount(st.therm.bands);
  for (let i = 0; i < k; i++) drawCrisis(st, i === 0);
  st.crisisAdded = k;
  st.offer = [];
  for (let i = 0; i < 2; i++) {
    if (!st.gdeck.length) { st.gdeck = shuffle(st.gdiscard); st.gdiscard = []; }
    if (st.gdeck.length) st.offer.push(st.gdeck.pop());
  }
  st.players.forEach(function (p) { p.done = false; p.used = {}; });
  let fc = '';
  if (st.crises.length) fc = ' The forecast crisis is ' + CRISES[st.crises[0].id].title + '.';
  addLog(st, 'Round ' + st.round + ' begins at ' + degrees(st.therm.bands) + '°C.' + fc, 'round');
}
function startLocal(st) {
  st.phase = 'local';
  st.players.forEach(function (p) {
    let n = 5 + activeCount(st, 'draw1') - p.drawMinus;
    if (p.cic >= 8) n -= 2;
    else if (p.cic >= 4) n -= 1;
    p.drawMinus = 0;
    drawCards(st, p, Math.max(0, n));
    p.clean += activeCount(st, 'clean1');
    p.done = false;
    p.used = {};
  });
}
function activate(st, g) {
  g.active = true;
  const gl = GLOBALS[g.id];
  const n = st.players.length;
  if (gl.eff === 'trees') st.trees += 2 * n;
  if (gl.eff === 'oceans') st.oceans += 2 * n;
  if (gl.eff === 'dac') st.dac += 2 * n;
  addLog(st, gl.title + ' is now active. ' + gl.text, 'global');
}
function applyTake(st, seat, a, n, params) {
  const p = st.players[seat];
  const k = a.kind;
  if (k === 'clean' || k === 'cleanfree') p.clean += n;
  else if (k === 'phase') p.dirty = Math.max(0, p.dirty - n);
  else if (k === 'cut') p.emis[a.arg] = Math.max(0, p.emis[a.arg] - n);
  else if (k === 'elec') { const r = Math.min(n, p.emis[a.arg]); p.emis[a.arg] -= r; p.demand += r; }
  else if (k === 'res') { let r = a.arg; if (r === 'any') { r = params.res; if (RES.indexOf(r) < 0) r = weakest(p); } p.res[r] += n; }
  else if (k === 'draw') drawCards(st, p, n);
  else if (k === 'tree') st.trees += n;
  else if (k === 'ocean') st.oceans += n;
  else if (k === 'dac') st.dac += n;
  else if (k === 'eff') p.demand = Math.max(0, p.demand - n);
  else if (k === 'aid') st.players[params.to].clean += n;
  else if (k === 'aidres') { const t = st.players[params.to]; t.res[weakest(t)] += n; }
  else if (k === 'relief') p.cic = Math.max(0, p.cic - n);
  else if (k === 'geo') {
    const removed = removeThermo(st, 2 * n);
    const roll = 1 + rnd(6);
    let msg = blocName(st, seat) + ' tried geoengineering, removing ' + removed + ' Carbon from the Thermometer';
    if (roll === 1) { p.cic += 2; msg += ', but side effects added 2 Communities in Crisis'; }
    addLog(st, msg + '.', 'geo');
  }
}
function finish(st, result, reason) {
  st.status = 'over';
  st.phase = 'over';
  st.result = result;
  st.reason = reason;
  report(st, reason, result);
}
function lossCheck(st) {
  if (st.therm.bands >= MAX_BANDS) { finish(st, 'lose', 'The Thermometer reached 2.0°C. The climate has tipped beyond recovery.'); return true; }
  for (let i = 0; i < st.players.length; i++) {
    if (st.players[i].cic >= CIC_LOSS) { finish(st, 'lose', blocName(st, i) + ' has ' + CIC_LOSS + ' Communities in Crisis. Society can no longer hold together.'); return true; }
  }
  return false;
}
function topUpCrises(st) {
  while (crisisCount(st.therm.bands) > st.crisisAdded) { drawCrisis(st, false); st.crisisAdded++; report(st, 'Warming brought an extra Crisis card this round.', 'crisis'); }
}
function rollPlanet(st) {
  const face = rnd(6);
  const pl = PLANET[face];
  const prev = st.tracks[pl[0]];
  let now = prev;
  if (now < 5) now++;
  st.tracks[pl[0]] = now;
  const tip = prev === 5 || TIPPING.indexOf(now) >= 0;
  if (!tip) { report(st, 'Planetary die: ' + pl[1] + ' advanced, with no tipping point yet.', 'planet'); return; }
  const n = st.players.length;
  let extra = '';
  if (pl[0] === 'weather') { drawCrisis(st, false); drawCrisis(st, false); }
  else if (pl[0] === 'desert') { if (loseSinks(st, 'trees', n)) extra = ' There were not enough Trees, so every bloc gained Communities in Crisis.'; }
  else if (pl[0] === 'amazon') { st.carry += n; if (loseSinks(st, 'trees', n)) extra = ' There were not enough Trees, so every bloc gained Communities in Crisis.'; }
  else if (pl[0] === 'ice') addThermo(st, 2 * n);
  else if (pl[0] === 'thaw') st.carry += 2 * n;
  else if (pl[0] === 'acid') { if (loseSinks(st, 'oceans', n)) extra = ' There were not enough Oceans, so every bloc gained Communities in Crisis.'; }
  report(st, 'Tipping point! ' + pl[1] + ': ' + pl[2] + extra, 'planet');
}
function crisisTargets(st, cr) {
  const all = st.players.map(function (p, i) { return i; });
  if (cr.target === 'all') return all;
  const parts = cr.target.split(':');
  const metric = function (p) {
    if (parts[1] === 'carbon') return carbonOf(st, p);
    if (parts[1] === 'dirty') return p.dirty;
    if (parts[1] === 'cic') return p.cic;
    return p.res[parts[1]];
  };
  let best = null;
  st.players.forEach(function (p) { const m = metric(p); if (best === null || (parts[0] === 'low' && m < best) || (parts[0] === 'high' && m > best)) best = m; });
  const tied = all.filter(function (i) { return metric(st.players[i]) === best; });
  if (tied.length === 1) return tied;
  return [tied[rnd(tied.length)]];
}
function resolveCrisis(st, c) {
  const cr = CRISES[c.id];
  c.face = true;
  if (tagCount(c.tucked, cr.ignore) >= ignoreNeed(st)) { report(st, cr.title + ' was averted by the projects tucked under it.', 'saved'); return; }
  let amt = cr.amt;
  if (amt === 'bands') amt = Math.max(1, st.therm.bands);
  if (amt === 'halfbands') amt = Math.max(1, Math.ceil(st.therm.bands / 2));
  const shield = activeCount(st, 'shield');
  crisisTargets(st, cr).forEach(function (seat) {
    const p = st.players[seat];
    let a = amt - shield;
    let note = '';
    if (cr.reduce) { a -= p.res[cr.reduce]; if (p.res[cr.reduce]) note = ' after ' + RES_NAME[cr.reduce] + ' Resilience'; }
    const who = blocName(st, seat);
    if (a <= 0) { report(st, cr.title + ': ' + who + ' was protected' + note + '.', 'saved'); return; }
    const parts = cr.eff.split(':');
    let what = '';
    if (parts[0] === 'cic') { p.cic += a; what = 'gained ' + plural(a, 'Community') + ' in Crisis'; what = what.replace('Communitys', 'Communities'); }
    else if (parts[0] === 'loseres') { const lose = Math.min(p.res[parts[1]], a); p.res[parts[1]] -= lose; p.cic += a - lose; what = 'lost ' + lose + ' ' + RES_NAME[parts[1]] + ' Resilience'; if (a - lose) what += ' and gained ' + (a - lose) + ' Communities in Crisis'; }
    else if (parts[0] === 'trees') { const m = loseSinks(st, 'trees', a); what = 'lost ' + plural(a, 'Tree') + ' from the shared forests'; if (m) what += ', and missing Trees put communities everywhere in crisis'; }
    else if (parts[0] === 'oceans') { const m = loseSinks(st, 'oceans', a); what = 'lost ' + plural(a, 'Ocean') + ' of carbon storage'; if (m) what += ', and missing Oceans put communities everywhere in crisis'; }
    else if (parts[0] === 'demand') { p.demand += a; what = 'saw Energy Demand rise by ' + a; }
    else if (parts[0] === 'cards') { let k = 0; for (let i = 0; i < a && p.hand.length; i++) { st.discard.push(p.hand.splice(rnd(p.hand.length), 1)[0]); k++; } what = 'lost ' + plural(k, 'card') + ' from hand'; }
    else if (parts[0] === 'dirty') { p.dirty += a; what = 'added ' + a + ' Dirty Energy'; }
    else if (parts[0] === 'drawminus') { p.drawMinus += a; what = 'will draw ' + plural(a, 'fewer card').replace('fewer cards', 'fewer cards') + ' next round'; }
    report(st, cr.title + ': ' + who + ' ' + what + note + '.', 'crisis');
  });
}
function runEnd(st) {
  st.report = [];
  const before = { bands: st.therm.bands, cubes: st.therm.cubes };
  st.players.forEach(function (p) {
    [['fuel1', 'fuel'], ['build1', 'buildings'], ['trans1', 'transport'], ['agri1', 'agriculture'], ['waste1', 'waste'], ['ind1', 'industry']].forEach(function (e) {
      const k = activeCount(st, e[0]);
      if (k) p.emis[e[1]] = Math.max(0, p.emis[e[1]] - k);
    });
    const ph = activeCount(st, 'phase1');
    for (let i = 0; i < ph; i++) if (p.dirty > 0 && p.dirty - 1 + p.clean >= p.demand) p.dirty--;
  });
  st.players.forEach(function (p, i) {
    const s = shortfall(p);
    if (s > 0) { p.cic += s; report(st, blocName(st, i) + ' fell ' + s + ' short of its Energy Demand and gained ' + s + ' Communities in Crisis.', 'crisis'); }
  });
  let recent = st.carry;
  const carried = st.carry;
  st.carry = 0;
  const byBloc = [];
  st.players.forEach(function (p, i) { const c = carbonOf(st, p); recent += c; byBloc.push(blocName(st, i) + ' ' + c); });
  const cap = capacity(st);
  let line = 'Emissions: ' + byBloc.join(', ');
  if (carried) line += ', plus ' + carried + ' from thawing and dieback';
  line += ', ' + recent + ' Carbon in total. Trees, Oceans and capture absorbed ' + Math.min(recent, cap) + ' of ' + cap + '.';
  report(st, line, 'emit');
  st.drawdown = false;
  if (recent < cap) {
    const removed = removeThermo(st, cap - recent);
    st.drawdown = true;
    report(st, 'Drawdown! The world now removes more Carbon than it emits. ' + removed + ' Carbon was pulled back off the Thermometer. Survive this Crisis stage to win.', 'win');
  } else if (recent > cap) {
    const added = addThermo(st, recent - cap);
    let msg = (recent - cap) + ' Carbon went onto the Thermometer';
    if (added) msg += ', adding ' + plural(added, 'Temperature Band') + '. It is now ' + degrees(st.therm.bands) + '°C';
    report(st, msg + '.', 'heat');
  } else report(st, 'Emissions exactly matched what the planet absorbed.', 'emit');
  st.history.push({ round: st.round, emitted: recent, absorbed: Math.min(recent, cap), bands: st.therm.bands });
  if (lossCheck(st)) return;
  topUpCrises(st);
  let rolls = st.therm.bands;
  for (let i = 0; i < rolls; i++) {
    const b = st.therm.bands;
    rollPlanet(st);
    if (st.therm.bands > b) rolls += st.therm.bands - b;
    if (lossCheck(st)) return;
  }
  topUpCrises(st);
  for (let c = 0; c < st.crises.length; c++) {
    resolveCrisis(st, st.crises[c]);
    if (lossCheck(st)) return;
  }
  st.crises.forEach(function (c) { st.cdiscard.push(c.id); c.tucked.forEach(function (id) { st.discard.push(id); }); });
  st.crises = [];
  if (st.drawdown) { finish(st, 'win', 'Daybreak for the planet: you reached drawdown and survived the crises that followed. Everyone wins.'); return; }
  if (st.round >= ROUNDS) { finish(st, 'lose', 'Round ' + ROUNDS + ' ended without reaching drawdown.'); return; }
  st.players.forEach(function (p) {
    p.demand += Math.max(0, p.growth - activeCount(st, 'demand'));
    const rl = activeCount(st, 'relief');
    if (rl) p.cic = Math.max(0, p.cic - rl);
    const rs = activeCount(st, 'res1');
    if (rs) p.res[weakest(p)] += rs;
  });
  report(st, 'Growth: every bloc’s Energy Demand rose.', 'grow');
  st.phase = 'report';
}
function step(st, a) {
  if (a.type === 'join') {
    const name = String(a.name || 'Guest').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 18) || 'Guest';
    const i = st.players.findIndex(function (p) { return p.client && p.client === a.client; });
    if (i >= 0) { if (st.status === 'lobby') st.players[i].name = name; return ''; }
    if (st.status !== 'lobby') return 'The game has already started.';
    if (st.players.length >= 4) return 'The room is full.';
    st.players.push({ name: name, kind: 'human', level: '', client: String(a.client) });
    return '';
  }
  if (a.type === 'addBot') {
    if (st.status === 'playing') return 'Add bots between games.';
    if (st.players.length >= 4) return 'The room is full.';
    const names = ['Ines', 'Kofi', 'Mei', 'Lars'];
    const used = st.players.map(function (q) { return q.name; });
    let nm = names.find(function (x) { return used.indexOf(x) < 0; });
    if (!nm) nm = 'Bot';
    st.players.push({ name: nm, kind: 'bot', level: 'normal', client: '' });
    return '';
  }
  if (a.type === 'removePlayer') {
    if (st.status === 'playing') return 'Remove players between games.';
    if (!(a.index > 0 && a.index < st.players.length)) return 'That seat cannot be removed.';
    st.players.splice(a.index, 1);
    return '';
  }
  if (st.status !== 'playing') return 'The game is not running.';
  if (a.type === 'pickGlobal') {
    if (st.phase !== 'global') return 'The summit is over for this round.';
    if (a.pick >= 0) {
      if (a.pick >= st.offer.length) return 'Choose one of the offered projects.';
      if (st.globals.length >= 4) {
        if (!(a.replace >= 0 && a.replace < st.globals.length)) return 'Four projects are in play. Choose one to replace.';
        const old = st.globals.splice(a.replace, 1)[0];
        st.gdiscard.push(old.id);
        old.tucked.forEach(function (id) { st.discard.push(id); });
      }
      const gid = st.offer[a.pick];
      st.globals.push({ id: gid, tucked: [], active: false });
      st.offer.forEach(function (id, i) { if (i !== a.pick) st.gdiscard.push(id); });
      addLog(st, 'The summit chose ' + GLOBALS[gid].title + '. It needs ' + globalReq(st) + ' ' + TAGS[GLOBALS[gid].tag][0] + ' tags to activate.', 'global');
    } else {
      st.offer.forEach(function (id) { st.gdiscard.push(id); });
      addLog(st, 'The summit chose not to start a new Global Project.', 'global');
    }
    st.offer = [];
    startLocal(st);
    return '';
  }
  if (a.type === 'continue') {
    if (st.phase !== 'report') return 'Nothing to continue.';
    st.lastReport = st.report.slice();
    startRound(st);
    return '';
  }
  const p = st.players[a.seat];
  if (!p) return 'Unknown bloc.';
  if (st.phase !== 'local') return 'Projects are played in the Local stage.';
  if (a.type === 'done') {
    p.done = a.done !== false;
    if (st.players.every(function (q) { return q.done; })) runEnd(st);
    return '';
  }
  if (p.done) return 'You have already finished this round. Tap Keep Working to make changes.';
  if (a.type === 'play' || a.type === 'tuck' || a.type === 'support' || a.type === 'ctuck') {
    if (p.hand.indexOf(a.card) < 0) return 'That card is not in your hand.';
    const c = CARDS[a.card];
    if (a.type === 'play') {
      if (a.stack === -1) { if (p.stacks.length >= 5) return 'You already have 5 stacks.'; p.hand.splice(p.hand.indexOf(a.card), 1); p.stacks.push([a.card]); return ''; }
      if (!p.stacks[a.stack]) return 'Choose a stack.';
      p.hand.splice(p.hand.indexOf(a.card), 1);
      p.stacks[a.stack].push(a.card);
      return '';
    }
    if (a.type === 'tuck') {
      if (!p.stacks[a.stack]) return 'Choose a stack.';
      p.hand.splice(p.hand.indexOf(a.card), 1);
      p.stacks[a.stack].unshift(a.card);
      return '';
    }
    if (a.type === 'support') {
      const g = st.globals[a.g];
      if (!g || g.active) return 'Choose a Global Project that still needs support.';
      if (c.tags.indexOf(GLOBALS[g.id].tag) < 0) return 'That card has no ' + TAGS[GLOBALS[g.id].tag][0] + ' tag.';
      p.hand.splice(p.hand.indexOf(a.card), 1);
      g.tucked.push(a.card);
      if (tagCount(g.tucked, GLOBALS[g.id].tag) >= globalReq(st)) activate(st, g);
      return '';
    }
    const cr = st.crises[a.c];
    if (!cr || !cr.face) return 'Cards can only go under the forecast crisis.';
    if (c.tags.indexOf(CRISES[cr.id].ignore) < 0) return 'That card has no ' + TAGS[CRISES[cr.id].ignore][0] + ' tag.';
    p.hand.splice(p.hand.indexOf(a.card), 1);
    cr.tucked.push(a.card);
    return '';
  }
  if (a.type === 'take') {
    const stack = p.stacks[a.stack];
    if (!stack) return 'Choose a stack.';
    const front = stack[stack.length - 1];
    const act = CARDS[front].act;
    if (act.multi && st.players.length < 2) return 'That action needs another bloc.';
    if (act.once && p.used[front]) return 'That action has already been used this round.';
    const n = tagCount(stack, act.tag);
    if (n <= 0) return 'This stack has no ' + TAGS[act.tag][0] + ' tags.';
    let pay = [];
    if (Array.isArray(a.pay)) pay = a.pay;
    if (pay.length !== act.cost) return 'Discard ' + plural(act.cost, 'card') + ' from your hand to take this action.';
    const seen = {};
    for (let i = 0; i < pay.length; i++) { if (seen[pay[i]] || p.hand.indexOf(pay[i]) < 0) return 'Pay with cards from your hand.'; seen[pay[i]] = 1; }
    if (act.multi && !(a.to >= 0 && a.to < st.players.length && a.to !== a.seat)) return 'Choose another bloc to help.';
    pay.forEach(function (id) { p.hand.splice(p.hand.indexOf(id), 1); st.discard.push(id); });
    applyTake(st, a.seat, act, n, a);
    if (act.once) p.used[front] = true;
    return '';
  }
  return 'Unknown action.';
}
function reduce(st0, a) {
  if (!st0 || !a || typeof a.type !== 'string') return { error: 'Unknown action.' };
  let st;
  if (a.type === 'start' || a.type === 'again') {
    if (st0.status === 'playing') return { error: 'The game is already running.' };
    st = newGame(st0.players, st0.settings, st0);
  } else {
    st = clone(st0);
    const err = step(st, a);
    if (err) return { error: err };
  }
  st.seq = (st0.seq || 0) + 1;
  return { state: st };
}

/* Bots */
function tryOn(st, a) { const r = reduce(st, a); if (r.error) return null; return r.state; }
function blocValue(st, seat) {
  const p = st.players[seat];
  const bands = st.therm.bands;
  let v = 0;
  v -= (p.dirty + sumEmis(p)) * (1.3 + bands * 0.15);
  v -= shortfall(p) * 4.6;
  RES.forEach(function (r) { v += Math.min(p.res[r], bands + 2) * 0.7; });
  v -= p.cic * 2.4;
  v += p.hand.length * 0.3;
  v += capacity(st) * 1.2;
  v -= (st.therm.bands * rowSize(st) + st.therm.cubes) * 0.45;
  v -= p.demand * 0.55;
  st.players.forEach(function (q, i) { if (i !== seat) v -= shortfall(q) * 1.6; });
  return v;
}
function usefulness(st, p, id) {
  let u = 0;
  CARDS[id].tags.forEach(function (t) {
    p.stacks.forEach(function (s) { if (CARDS[s[s.length - 1]].act.tag === t) u += 1; });
    st.globals.forEach(function (g) { if (!g.active && GLOBALS[g.id].tag === t) u += 0.6; });
  });
  return u;
}
function payFor(st, seat, cost, exclude) {
  const p = st.players[seat];
  const opts = p.hand.filter(function (id) { return exclude.indexOf(id) < 0; });
  if (opts.length < cost) return null;
  opts.sort(function (a, b) { return usefulness(st, p, a) - usefulness(st, p, b); });
  return opts.slice(0, cost);
}
function takeAct(st, seat, si, exclude) {
  const p = st.players[seat];
  const stack = p.stacks[si];
  if (!stack) return null;
  const front = stack[stack.length - 1];
  const a = CARDS[front].act;
  if (a.once && p.used[front]) return null;
  if (a.multi && st.players.length < 2) return null;
  if (tagCount(stack, a.tag) <= 0) return null;
  const pay = payFor(st, seat, a.cost, exclude || []);
  if (!pay) return null;
  const act = { type: 'take', seat: seat, stack: si, pay: pay };
  if (a.kind === 'res' && a.arg === 'any') act.res = weakest(p);
  if (a.multi) {
    let best = -1;
    let need = -1;
    st.players.forEach(function (q, i) {
      if (i === seat) return;
      let w = shortfall(q) * 3 + (q.dirty + sumEmis(q)) * 0.1;
      if (a.kind === 'aidres') w = 10 - q.res[weakest(q)];
      if (w > need) { need = w; best = i; }
    });
    act.to = best;
  }
  return act;
}
function freshUse(st, seat) { const s = clone(st); s.players[seat].used = {}; return s; }
function botLocal(st, seat) {
  const p = st.players[seat];
  const base = blocValue(st, seat);
  const ff = Math.min(3, ROUNDS - st.round) * 0.45;
  let best = null;
  let bestV = 0.35;
  function consider(a, v) { if (v > bestV) { bestV = v; best = a; } }
  function delta(s) { if (!s) return -99; return blocValue(s, seat) - base; }
  p.stacks.forEach(function (s, i) {
    const t = takeAct(st, seat, i);
    if (t) consider(t, delta(tryOn(st, t)));
  });
  const freshBase = freshUse(st, seat);
  const frontValue = p.stacks.map(function (s, i) {
    const t = takeAct(freshBase, seat, i);
    if (!t) return 0;
    return Math.max(0, delta(tryOn(freshBase, t)));
  });
  p.hand.forEach(function (card) {
    const targets = p.stacks.map(function (s, i) { return i; });
    if (p.stacks.length < 5) targets.push(-1);
    targets.forEach(function (si) {
      const play = { type: 'play', seat: seat, card: card, stack: si };
      const s1 = tryOn(st, play);
      if (!s1) return;
      let idx = si;
      if (si === -1) idx = s1.players[seat].stacks.length - 1;
      const t = takeAct(s1, seat, idx);
      if (!t) return;
      const now = delta(tryOn(s1, t));
      const fs = freshUse(s1, seat);
      const ft = takeAct(fs, seat, idx);
      let fut = 0;
      if (ft) fut = Math.max(0, delta(tryOn(fs, ft)));
      let loss = 0;
      if (si >= 0) {
        const front = p.stacks[si][p.stacks[si].length - 1];
        loss = frontValue[si] * ff;
        if (!p.used[front]) loss += frontValue[si] * 0.5;
      }
      consider(play, now + fut * ff - loss - 0.2);
    });
    p.stacks.forEach(function (s, si) {
      if (frontValue[si] <= 0) return;
      const tuck = { type: 'tuck', seat: seat, card: card, stack: si };
      const s1 = tryOn(freshBase, tuck);
      if (!s1) return;
      const t = takeAct(s1, seat, si);
      if (!t) return;
      const inc = delta(tryOn(s1, t)) - frontValue[si];
      if (inc <= 0) return;
      const front = s[s.length - 1];
      let mult = ff;
      if (!p.used[front]) mult += 1;
      consider(tuck, inc * mult - 0.3);
    });
    st.globals.forEach(function (g, gi) {
      if (g.active) return;
      const tag = GLOBALS[g.id].tag;
      const has = CARDS[card].tags.filter(function (t) { return t === tag; }).length;
      if (!has) return;
      const s1 = tryOn(st, { type: 'support', seat: seat, card: card, g: gi });
      if (!s1) return;
      const need = globalReq(st) - tagCount(g.tucked, tag);
      let v = 1.1 * has + Math.max(0, 3 - need) * 0.6;
      if (s1.globals[gi].active) v += 4 + delta(s1);
      consider({ type: 'support', seat: seat, card: card, g: gi }, v - usefulness(st, p, card) * 0.5 - 0.3);
    });
    st.crises.forEach(function (c, ci) {
      if (!c.face) return;
      const cr = CRISES[c.id];
      const has = CARDS[card].tags.filter(function (t) { return t === cr.ignore; }).length;
      if (!has || tagCount(c.tucked, cr.ignore) >= ignoreNeed(st)) return;
      let amt = cr.amt;
      if (amt === 'bands') amt = Math.max(1, st.therm.bands);
      if (amt === 'halfbands') amt = Math.max(1, Math.ceil(st.therm.bands / 2));
      let hits = 1;
      if (cr.target === 'all') hits = st.players.length;
      let harm = amt * hits * 2.2;
      if (cr.reduce) harm -= p.res[cr.reduce] * hits * 1.5;
      if (harm <= 0) return;
      consider({ type: 'ctuck', seat: seat, card: card, c: ci }, harm * has / ignoreNeed(st) - usefulness(st, p, card) * 0.5 - 0.3);
    });
  });
  if (best) return best;
  return { type: 'done', seat: seat, done: true };
}
function botGlobal(st) {
  if (!st.offer.length) return { type: 'pickGlobal', pick: -1 };
  const order = ['emit1', 'clean1', 'shield', 'draw1', 'ind1', 'trans1', 'build1', 'trees', 'oceans', 'dac', 'relief', 'agri1', 'fuel1', 'demand', 'phase1', 'res1', 'waste1'];
  let pick = 0;
  if (st.offer.length > 1 && order.indexOf(GLOBALS[st.offer[1]].eff) < order.indexOf(GLOBALS[st.offer[0]].eff)) pick = 1;
  if (st.globals.length < 4) return { type: 'pickGlobal', pick: pick };
  let worst = -1;
  let least = 1e9;
  st.globals.forEach(function (g, i) { if (!g.active && g.tucked.length < least) { least = g.tucked.length; worst = i; } });
  if (worst < 0) return { type: 'pickGlobal', pick: -1 };
  return { type: 'pickGlobal', pick: pick, replace: worst };
}
