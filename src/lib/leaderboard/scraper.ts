/**
 * LiveBench leaderboard scraper.
 *
 * Uses Playwright to render the livebench.ai SPA and extract the leaderboard
 * table. Results are cached in-memory with a configurable TTL (default 6h)
 * to avoid hammering the upstream on every request.
 */

import { chromium, type Browser, type Page } from "playwright";

export interface LeaderboardEntry {
  rank: number;
  model: string;
  overall: number;
  reasoning: number;
  coding: number;
  agenticCoding: number;
  mathematics: number;
  dataAnalysis: number;
  language: number;
  instructionFollowing: number;
  costPerSuccessfulTask: string;
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[];
  release: string;
  scrapedAt: string;
  source: string;
}

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const LIVEBENCH_URL = "https://livebench.ai/#/";

let cache: LeaderboardResult | null = null;
let cacheTimestamp = 0;

function parseScore(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

async function scrapeWithPlaywright(): Promise<LeaderboardResult> {
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: Page = await browser.newPage();

    await page.goto(LIVEBENCH_URL, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    // Wait for the leaderboard table to render
    await page.waitForSelector("table", { timeout: 15_000 });

    // Extract release info
    const release = await page.evaluate(() => {
      const el = document.querySelector('[class*="release"], [class*="Release"]');
      if (el) return el.textContent?.trim() || "";
      // Fallback: find the release text near the top
      const allText = document.body.innerText;
      const match = allText.match(/Showing LiveBench-([\d-]+)/);
      return match ? match[1] : "unknown";
    });

    // Extract table rows
    const entries: LeaderboardEntry[] = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tbody tr, table tr");
      const results: LeaderboardEntry[] = [];
      let rank = 1;

      for (const row of rows) {
        const cells = row.querySelectorAll("td");
        if (cells.length < 9) continue;

        // Skip header-like rows
        const firstCellText = cells[0]?.textContent?.trim() || "";
        if (firstCellText === "" || firstCellText.includes("MODEL")) continue;

        const model = cells[1]?.textContent?.trim() || "";
        if (!model) continue;

        results.push({
          rank: rank++,
          model,
          overall: parseFloat(cells[2]?.textContent?.trim() || "0") || 0,
          reasoning: parseFloat(cells[3]?.textContent?.trim() || "0") || 0,
          coding: parseFloat(cells[4]?.textContent?.trim() || "0") || 0,
          agenticCoding: parseFloat(cells[5]?.textContent?.trim() || "0") || 0,
          mathematics: parseFloat(cells[6]?.textContent?.trim() || "0") || 0,
          dataAnalysis: parseFloat(cells[7]?.textContent?.trim() || "0") || 0,
          language: parseFloat(cells[8]?.textContent?.trim() || "0") || 0,
          instructionFollowing: parseFloat(cells[9]?.textContent?.trim() || "0") || 0,
          costPerSuccessfulTask: cells[10]?.textContent?.trim() || "—",
        });
      }
      return results;
    });

    return {
      entries,
      release: release || "unknown",
      scrapedAt: new Date().toISOString(),
      source: "livebench.ai",
    };
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Get leaderboard data. Returns cached result if fresh enough,
 * otherwise re-scrapes livebench.ai via Playwright.
 */
export async function getLeaderboard(forceRefresh = false): Promise<LeaderboardResult> {
  const now = Date.now();
  if (!forceRefresh && cache && now - cacheTimestamp < CACHE_TTL_MS) {
    return cache;
  }

  try {
    const result = await scrapeWithPlaywright();
    cache = result;
    cacheTimestamp = now;
    return result;
  } catch (err) {
    // If scraping fails and we have stale data, return it
    if (cache) return cache;
    throw err;
  }
}
