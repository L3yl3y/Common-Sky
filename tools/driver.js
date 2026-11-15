module.exports = function driverStep() {
  const K = window.__sky;
  const pk = K.peek();
  const S = pk.S;
  const q = s => document.querySelector(s);
  const click = s => { const el = q(s); if (!el || el.disabled) return false; el.dispatchEvent(new MouseEvent("click", { bubbles: true })); return true; };
  const cover = q("#cover");
  if (cover && !cover.hidden) { if (click('#cover [data-act="reveal"]')) return "reveal"; }
  if (!S || S.status === "over") { if (S && S.status === "over") return "over"; return "wait"; }
  if (S.status !== "playing") return "wait";
  if (pk.pending) return "wait";
  if (window.__lastSeq === S.seq && window.__lastSel === pk.sel && !pk.pay) return "wait";
  window.__lastSeq = S.seq;
  window.__lastSel = pk.sel;
  if (S.phase === "global") {
    if (S.globals.length >= 4 && S.offer.length) click('[data-act="replace"]');
    if (click('[data-act="pick-global"]')) return "global";
    return "wait";
  }
  if (S.phase === "report") { if (click('[data-act="continue"]')) return "continue"; return "wait"; }
  const me = pk.me;
  if (me < 0 || S.phase !== "local" || S.players[me].done) return "wait";
  if (pk.pay) {
    const a = window.__pending;
    if (a && a.pay) a.pay.forEach(id => { if (!q('[data-hand="' + id + '"].pay')) click('[data-hand="' + id + '"]'); });
    if (a && a.to >= 0) click('[data-act="pay-to"][data-i="' + a.to + '"]');
    if (click('[data-act="pay-go"]')) { window.__lastSeq = -1; return "pay"; }
    click('[data-act="pay-cancel"]');
    window.__lastSeq = -1;
    return "stuck-pay";
  }
  if (Math.random() < 0.05 && click('[data-act="hint"]')) { window.__lastSeq = -1; return "hint"; }
  const a = K.botLocal(S, me);
  window.__pending = a;
  if (a.type === "done") { if (click('[data-act="done"]')) return "done"; return "stuck-done"; }
  if (a.type === "take") {
    if (click('[data-act="take"][data-i="' + a.stack + '"]')) { window.__lastSeq = -1; return "take"; }
    return "stuck-take";
  }
  if (pk.sel !== a.card) { click('[data-hand="' + a.card + '"]'); window.__lastSeq = -1; return "select"; }
  let sel = "";
  if (a.type === "play" || a.type === "tuck") sel = '[data-act="' + a.type + '"][data-i="' + a.stack + '"]';
  if (a.type === "support") sel = '[data-act="support"][data-i="' + a.g + '"]';
  if (a.type === "ctuck") sel = '[data-act="ctuck"][data-i="' + a.c + '"]';
  if (click(sel)) return a.type;
  window.__lastSeq = -1;
  return "stuck-" + a.type;
};
