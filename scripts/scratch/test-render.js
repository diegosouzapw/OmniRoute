const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
  await page.goto("http://localhost:3000/dashboard/providers/codex", { waitUntil: "networkidle2" });
  const errorText = await page.evaluate(() => document.body.innerText);
  console.log(errorText.substring(0, 1000));
  await browser.close();
})();
