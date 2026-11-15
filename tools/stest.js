const puppeteer = require("puppeteer-core");
const mock = require("./mockclaude.js");
const path = require("path");
const fs = require("fs");
const driverStep = require("./driver.js");
const base = process.argv[2] || "http://localhost:8793/";
const only = process.argv[3] || "all";
const shots = path.join(__dirname, "shots");
fs.mkdirSync(shots, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const errors = [];
function watch(name, p) {
  p.on("pageerror", e => errors.push(name + " pageerror: " + e.message));
  p.on("console", m => { if (m.type() === "error" && m.text().indexOf("404") < 0) errors.push(name + " console: " + m.text()); });
}
async function playAll(pages, maxSteps) {
  const counts = {};
  let idle = 0;
  for (let i = 0; i < maxSteps; i++) {
    let moved = false;
    let overs = 0;
    for (const [name, page] of pages) {
      const r = await page.evaluate(driverStep);
      const k = name + ":" + r.split(":")[0];
      counts[k] = (counts[k] || 0) + 1;
      if (r === "over") overs++;
      else if (r !== "wait") moved = true;
      if (r.indexOf("stuck") === 0) errors.push(name + " " + r);
    }
    if (overs === pages.length) return counts;
    if (!moved) { idle++; await sleep(50); } else { idle = 0; await sleep(25); }
    if (idle > 1500) { errors.push("idle too long"); return counts; }
  }
  errors.push("did not finish");
  return counts;
}
async function result(page) { return page.evaluate(() => { const s = window.__sky.peek().S; return s.result + " round " + s.round + " bands " + s.therm.bands + " seq " + s.seq; }); }
(async () => {
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
  if (only === "all" || only === "solo") {
    const page = await browser.newPage();
    watch("solo", page);
    await page.setViewport({ width: 1320, height: 900 });
    await page.goto(base + "index.html", { waitUntil: "networkidle2" });
    await sleep(400);
    await page.screenshot({ path: path.join(shots, "s1-home.png"), fullPage: true });
    await page.setViewport({ width: 390, height: 844 });
    await sleep(300);
    console.log("home phone overflow:", await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
    await page.setViewport({ width: 1320, height: 900 });
    await page.$eval("#my-name", e => { e.value = "Tester"; });
    await page.select("#pr-blocs", "3");
    await page.select("#pr-bloc", "atlantic");
    await page.click('[data-act="practice-start"]');
    await page.evaluate(() => window.__sky.setBotSpeed(0.05));
    await sleep(200);
    await page.click('[data-act="pick-global"]');
    await sleep(200);
    await page.click("[data-hand]");
    await sleep(150);
    await page.click('[data-act="hint"]');
    await sleep(200);
    console.log("coach:", await page.$eval(".coach", e => e.textContent).catch(() => "none"));
    await page.screenshot({ path: path.join(shots, "s2-local.png"), fullPage: true });
    await page.setViewport({ width: 390, height: 844 });
    await sleep(300);
    console.log("game phone overflow:", await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth));
    await page.screenshot({ path: path.join(shots, "s2-phone.png"), fullPage: true });
    await page.setViewport({ width: 1320, height: 900 });
    let c = await playAll([["solo", page]], 20000);
    console.log("practice 3 blocs", JSON.stringify(c), await result(page));
    await page.screenshot({ path: path.join(shots, "s3-final.png"), fullPage: true });
    await page.click('[data-act="leave"]');
    await sleep(200);
    await page.select("#pr-blocs", "1");
    await page.click('[data-act="practice-start"]');
    c = await playAll([["solo", page]], 20000);
    console.log("solo", JSON.stringify(c), await result(page));
    await page.click('[data-act="leave"]');
    await sleep(200);
    await page.click('[data-act="hotseat-start"]');
    await sleep(200);
    await page.screenshot({ path: path.join(shots, "s4-hotseat.png") });
    c = await playAll([["solo", page]], 20000);
    console.log("hotseat", JSON.stringify(c), await result(page));
    await page.close();
  }
  const modes = [];
  if (only === "all" || only === "peer") modes.push("peer");
  if (only === "all" || only === "cloud") modes.push("cloud");
  for (const mode of modes) {
    const host = await (await browser.createBrowserContext()).newPage();
    const guest = await (await browser.createBrowserContext()).newPage();
    watch(mode + "-host", host);
    watch(mode + "-guest", guest);
    for (const p of [host, guest]) await p.setViewport({ width: 1320, height: 900 });
    let url = base + "index.html";
    if (mode === "cloud") { url = base + "artifact.html"; await mock.wire(host, "u_hostA"); await mock.wire(guest, "u_guestB"); }
    await host.goto(url, { waitUntil: "networkidle2" });
    await guest.goto(url, { waitUntil: "networkidle2" });
    await sleep(500);
    await host.$eval("#my-name", e => { e.value = "Hostess"; });
    await host.click('[data-act="online-create"]');
    await host.waitForSelector(".code", { timeout: 20000 });
    const code = await host.$eval(".code", e => e.textContent);
    await guest.$eval("#my-name", e => { e.value = "Friend"; });
    await guest.$eval("#on-code", (e, v) => { e.value = v; }, code);
    await guest.click('[data-act="online-join"]');
    await host.waitForFunction(() => document.querySelectorAll(".seats li").length === 2, { timeout: 25000 });
    await host.click('[data-act="add-bot"]');
    await sleep(300);
    await host.click('[data-act="start"]');
    await host.evaluate(() => window.__sky.setBotSpeed(0.05));
    await guest.waitForSelector(".dash", { timeout: 20000 });
    console.log(mode, "room", code, "guest seat:", await guest.evaluate(() => window.__sky.peek().me));
    const c = await playAll([["host", host], ["guest", guest]], 30000);
    console.log(mode, JSON.stringify(c));
    const same = await Promise.all([host, guest].map(p => result(p)));
    console.log(mode, "host vs guest:", same.join(" | "));
    await guest.screenshot({ path: path.join(shots, "s5-" + mode + "-guest.png"), fullPage: true });
  }
  console.log("ERRORS:", errors.length ? errors.slice(0, 10).join("\n") : "none");
  await browser.close();
})();
