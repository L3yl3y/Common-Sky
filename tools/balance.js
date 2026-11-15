const fs = require("fs");
const path = require("path");
eval(fs.readFileSync(path.join(__dirname, "..", "src", "engine.js"), "utf8") + "\nglobal.E = { newGame, reduce, botLocal, botGlobal, BLOCS, CARDS, GLOBALS, CRISES, SINKS, SOLO_START, carbonOf, capacity, shortfall };");
const N = Number(process.argv[2] || 100);
const em = Number(process.argv[4] || 1);
const dm = Number(process.argv[5] || 1);
Object.keys(E.BLOCS).forEach(k => { const b = E.BLOCS[k]; Object.keys(b.emis).forEach(e => { b.emis[e] = Math.round(b.emis[e] * em); }); const d = Math.round(b.dirty * dm); b.demand += d - b.dirty; b.dirty = d; });
if (process.argv[6]) Object.assign(E.SOLO_START, JSON.parse(process.argv[6]));
if (process.argv[7]) Object.assign(E.SINKS, JSON.parse(process.argv[7]));
const only = process.argv[3];
function check(s) {
  const seen = new Set();
  const mark = id => { if (seen.has(id)) throw new Error("card twice " + id); seen.add(id); };
  s.deck.forEach(mark); s.discard.forEach(mark);
  s.players.forEach(p => { p.hand.forEach(mark); p.stacks.forEach(st => st.forEach(mark)); });
  s.globals.forEach(g => g.tucked.forEach(mark));
  s.crises.forEach(c => c.tucked.forEach(mark));
  const expect = E.CARDS.filter(c => !c.bloc && !(s.players.length === 1 && c.act.multi)).length + s.players.length * 5;
  if (seen.size !== expect) throw new Error("cards missing " + seen.size + " of " + expect);
}
for (let n = 1; n <= 4; n++) {
  if (only && Number(only) !== n) continue;
  let wins = 0; const reasons = {}; let rounds = 0; let bandsSum = 0; const winRound = {}; let actions = 0;
  const t0 = Date.now();
  for (let g = 0; g < N; g++) {
    const players = [];
    for (let i = 0; i < n; i++) players.push({ name: "B" + i, kind: "bot", level: "normal", client: "" });
    let s = E.newGame(players, { solo: n === 1 }, null);
    let guard = 0;
    while (s.status === "playing") {
      if (++guard > 5000) throw new Error("stuck in phase " + s.phase);
      let a;
      if (s.phase === "global") a = E.botGlobal(s);
      else if (s.phase === "report") a = { type: "continue" };
      else {
        const seat = s.players.findIndex(p => !p.done);
        a = E.botLocal(s, seat);
      }
      const r = E.reduce(s, a);
      if (r.error) throw new Error("rejected: " + r.error + " " + JSON.stringify(a));
      s = r.state;
      actions++;
      check(s);
    }
    rounds += s.round;
    bandsSum += s.therm.bands;
    if (s.result === "win") { wins++; winRound[s.round] = (winRound[s.round] || 0) + 1; }
    else { const k = s.reason.split(" ").slice(0, 4).join(" "); reasons[k] = (reasons[k] || 0) + 1; }
  }
  console.log("em", em, "dm", dm, "sinks", JSON.stringify(E.SINKS[n]), "players", n, "win%", (100 * wins / N).toFixed(0), "win rounds", JSON.stringify(winRound), "avg final bands", (bandsSum / N).toFixed(1), "losses", JSON.stringify(reasons), "ms/game", ((Date.now() - t0) / N).toFixed(0));
}
