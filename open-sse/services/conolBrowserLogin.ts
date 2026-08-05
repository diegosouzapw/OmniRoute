import { CONOL_SESSION_COOKIE_NAME } from "./conolAuth.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const CONOL_HOME_URL = "https://conol.ai/home";
const DEFAULT_LOGIN_TIMEOUT_MS = 300_000;
const MIN_LOGIN_TIMEOUT_MS = 15_000;
const MAX_LOGIN_TIMEOUT_MS = 600_000;
const POLL_INTERVAL_MS = 1_000;

interface BrowserCookieLike {
  name: string;
  value: string;
  domain?: string;
}

export interface ConolBrowserLoginResult {
  success: boolean;
  credentials?: { cookie: string };
  error?: string;
}

type BrowserLauncher = Pick<typeof import("playwright"), "chromium">;

function clampTimeout(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_LOGIN_TIMEOUT_MS;
  return Math.max(MIN_LOGIN_TIMEOUT_MS, Math.min(MAX_LOGIN_TIMEOUT_MS, Math.trunc(value)));
}

export function extractConolBrowserCredentials(
  cookies: BrowserCookieLike[]
): { cookie: string } | null {
  const session = cookies.find(
    (candidate) =>
      candidate.name === CONOL_SESSION_COOKIE_NAME &&
      (!candidate.domain || candidate.domain === "conol.ai" || candidate.domain.endsWith(".conol.ai"))
  );
  const value = session?.value?.trim() || "";
  if (!value || /[\r\n;]/.test(value)) return null;
  return { cookie: `${CONOL_SESSION_COOKIE_NAME}=${value}` };
}

export async function launchConolLoginBrowser(
  playwright: BrowserLauncher
): Promise<import("playwright").Browser> {
  const configuredPath = process.env.OMNIROUTE_LOGIN_BROWSER_PATH?.trim();
  const attempts: Array<Record<string, unknown>> = [
    ...(configuredPath ? [{ headless: false, executablePath: configuredPath }] : []),
    { headless: false, channel: "chrome" },
    { headless: false, channel: "msedge" },
    { headless: false },
  ];

  let lastError: unknown;
  for (const options of attempts) {
    try {
      return await playwright.chromium.launch(options);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("No compatible browser is available for sign-in");
}

export async function startConolBrowserLogin(
  requestedTimeout?: unknown
): Promise<ConolBrowserLoginResult> {
  const timeout = clampTimeout(requestedTimeout);
  let playwright: typeof import("playwright");
  try {
    playwright = await import("playwright");
  } catch {
    return {
      success: false,
      error: "Browser sign-in is unavailable. Paste the Conol Cookie header instead.",
    };
  }

  let browser: import("playwright").Browser | null = null;
  try {
    browser = await launchConolLoginBrowser(playwright);
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      locale: "en-US",
    });
    const page = await context.newPage();
    await page.goto(CONOL_HOME_URL, {
      waitUntil: "domcontentloaded",
      timeout: Math.min(timeout, 60_000),
    });

    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const credentials = extractConolBrowserCredentials(
        await context.cookies(["https://conol.ai"])
      );
      if (credentials) return { success: true, credentials };
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    return {
      success: false,
      error: "Conol sign-in timed out. Complete login in the opened browser and try again.",
    };
  } catch (error) {
    return {
      success: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    };
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        // The user may close the login window before extraction completes.
      }
    }
  }
}
