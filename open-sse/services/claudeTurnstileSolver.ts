/**
 * Cloudflare Turnstile Solver for Claude Web
 *
 * When cf_clearance expires, this service:
 * 1. Launches a headless Playwright browser
 * 2. Navigates to claude.ai
 * 3. Waits for Turnstile challenge to appear
 * 4. Waits for challenge to be solved (with retry)
 * 5. Extracts cf_clearance cookie
 * 6. Returns fresh cookie for tls-client-node
 */

import type { Browser, Page } from "playwright";
import {
  CLAUDE_WEB_FINGERPRINT,
  CLAUDE_WEB_FINGERPRINT_VERSION,
} from "../config/claudeWebFingerprint.ts";

const CLAUDE_WEB_URL = "https://claude.ai";
const CHALLENGE_TIMEOUT = 60000; // 60s to solve challenge
const CHALLENGE_CHECK_INTERVAL = 500; // Check every 500ms
const MAX_RETRIES = 3;

interface TurnstileSolveResult {
  cfClearance: string;
  timestamp: number;
}

/**
 * Check if Turnstile challenge is solved
 */
async function isTurnstileSolved(page: Page): Promise<boolean> {
  try {
    // Check if cf_clearance cookie exists
    const cookies = await page.context().cookies();
    const cfClearance = cookies.find((c) => c.name === "cf_clearance");
    return !!cfClearance?.value;
  } catch {
    return false;
  }
}

/**
 * Wait for Turnstile challenge to be solved
 */
async function waitForChallengeSolved(page: Page): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < CHALLENGE_TIMEOUT) {
    if (await isTurnstileSolved(page)) {
      return;
    }
    await page.waitForTimeout(CHALLENGE_CHECK_INTERVAL);
  }

  throw new Error(`Turnstile challenge not solved within ${CHALLENGE_TIMEOUT}ms`);
}

/**
 * Extract cf_clearance cookie from browser
 */
async function extractCfClearance(page: Page): Promise<string> {
  const cookies = await page.context().cookies();
  const cfClearance = cookies.find((c) => c.name === "cf_clearance");

  if (!cfClearance?.value) {
    throw new Error("cf_clearance cookie not found after challenge solve");
  }

  return cfClearance.value;
}

/**
 * Solve Turnstile challenge and return cf_clearance
 */
export async function solveTurnstile(options?: {
  headless?: boolean;
  timeout?: number;
}): Promise<TurnstileSolveResult> {
  const headless = options?.headless !== false;
  const timeout = options?.timeout ?? CHALLENGE_TIMEOUT;

  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    // Launch headless browser (lazy import — avoids crashing platforms
    // playwright-core doesn't support, e.g. Termux/Android, on module load)
    const { chromium } = await import("playwright");
    browser = await chromium.launch({ headless });
    const context = await browser.newContext({
      userAgent: CLAUDE_WEB_FINGERPRINT.userAgent,
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: process.env.OMNIROUTE_TURNSTILE_IGNORE_TLS_ERRORS === "true",
    });

    page = await context.newPage();

    // Navigate to claude.ai
    await page.goto(CLAUDE_WEB_URL, { waitUntil: "domcontentloaded" });

    // Wait for Turnstile challenge to appear and be solved
    // Sometimes it's instant, sometimes it takes a few seconds
    await waitForChallengeSolved(page);

    // Extract cf_clearance
    const cfClearance = await extractCfClearance(page);

    return {
      cfClearance,
      timestamp: Date.now(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to solve Turnstile: ${message}`);
  } finally {
    if (page) {
      await page.close().catch(() => {
        /* ignore */
      });
    }
    if (browser) {
      await browser.close().catch(() => {
        /* ignore */
      });
    }
  }
}

/**
 * Cache for recently solved cf_clearance tokens
 * Reduces unnecessary challenge solving for rapid requests
 */
const tokenCache = new Map<
  string,
  {
    token: string;
    expiresAt: number;
  }
>();

let cfClearanceTokenOverride: string | null = null;

export function setCfClearanceTokenForTesting(token: string | null): void {
  cfClearanceTokenOverride = token;
}

/**
 * Get or solve cf_clearance (with caching)
 */
export async function getCfClearanceToken(options?: {
  force?: boolean;
  headless?: boolean;
}): Promise<string> {
  const cacheKey = `claude-cf-clearance-${CLAUDE_WEB_FINGERPRINT_VERSION}`;
  const cached = tokenCache.get(cacheKey);

  if (cfClearanceTokenOverride) {
    tokenCache.set(cacheKey, {
      token: cfClearanceTokenOverride,
      expiresAt: Date.now() + 55 * 60 * 1000,
    });
    return cfClearanceTokenOverride;
  }

  // Return cached token if still valid (5 min buffer)
  if (cached && !options?.force && cached.expiresAt > Date.now() + 5 * 60 * 1000) {
    return cached.token;
  }

  // Solve new challenge
  const result = await solveTurnstile({
    headless: options?.headless !== false,
  });

  // Cache for 55 minutes (assuming 1 hour expiry)
  tokenCache.set(cacheKey, {
    token: result.cfClearance,
    expiresAt: Date.now() + 55 * 60 * 1000,
  });

  return result.cfClearance;
}

/**
 * Clear cache (useful for testing)
 */
export function clearCfClearanceCache(): void {
  tokenCache.clear();
}

/**
 * Get cache status (for diagnostics)
 */
export function getCacheStatus(): {
  hasCached: boolean;
  expiresIn?: number;
} {
  const cacheKey = `claude-cf-clearance-${CLAUDE_WEB_FINGERPRINT_VERSION}`;
  const cached = tokenCache.get(cacheKey);

  if (!cached) {
    return { hasCached: false };
  }

  const expiresIn = Math.max(0, cached.expiresAt - Date.now());
  return {
    hasCached: true,
    expiresIn,
  };
}
