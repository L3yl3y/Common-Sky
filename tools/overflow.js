const puppeteer = require("puppeteer-core");
(async () => {
  const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(process.argv[2], { waitUntil: "networkidle2" });
  const wide = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("body *").forEach(el => { const r = el.getBoundingClientRect(); if (r.right > window.innerWidth + 1 && r.width > 0) out.push(el.tagName + "." + el.className.baseVal + el.className + " right=" + Math.round(r.right) + " w=" + Math.round(r.width)); });
    return out.slice(0, 12);
  });
  console.log(wide.join("\n"));
  await browser.close();
})();
