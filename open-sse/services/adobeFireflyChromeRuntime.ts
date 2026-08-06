/**
 * Adobe Firefly optional Chrome (CDP) session runtime.
 *
 * Default product path is the same as other OmniRoute web-cookie providers
 * (notion-web, perplexity-web, …): pure HTTP with the pasted Cookie/JWT — NO browser.
 *
 * Browser warm is OPT-IN for proactive use (`ADOBE_FIREFLY_BROWSER_REFRESH=1`) and may
 * also run mid-batch 408 recovery via `allowWithoutEnvOptIn`.
 *
 * **Mode (UI + colligo):** background warm defaults to **offscreen headed** (parked off
 * display + minimized) so Forter tokens work. True `--headless=new` is opt-in only
 * (`ADOBE_FIREFLY_CHROME_HEADLESS=1`) and typically yields generate HTTP 408 while a real
 * browser still works. Interactive sign-in uses modeOverride=visible.
 */

import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  buildAdobeArpSessionIdFromCookies,
  extractAdobeForterTimestampMs,
  mergeAdobeCookieHeaders,
  type AdobeFireflySession,
} from "./adobeFireflySession.ts";
import {
  extractAdobeCookieHeader,
  isAdobeUserAccessToken,
  looksLikeAdobeJwt,
  decodeAdobeJwtPayload,
} from "./adobeFireflyClient.ts";

const DEFAULT_CDP_PORT = Number(process.env.ADOBE_FIREFLY_CHROME_CDP_PORT || 9334);
const PROFILE_DIR_NAME = "adobe-chrome-profile";

type Log = { info?: (...a: unknown[]) => void; warn?: (...a: unknown[]) => void };

type RuntimeState = {
  port: number;
  profileDir: string;
  chromeProc: ChildProcess | null;
  browser: import("playwright").Browser | null;
  context: import("playwright").BrowserContext | null;
  page: import("playwright").Page | null;
  lastWarmAt: number;
  lastCookieSeed: string;
  /** "offscreen" | "visible" | "headless" */
  mode: string;
};

let runtime: RuntimeState | null = null;
let warmChain: Promise<void> = Promise.resolve();
let startingChrome: Promise<RuntimeState> | null = null;
/** Temporary mode override (e.g. force a visible window for interactive sign-in). */
let modeOverride: "offscreen" | "visible" | "headless" | null = null;

/**
 * Background cookie/JWT work should not flash a normal desktop window.
 * - default / HEADED / OFFSCREEN → offscreen headed (Forter-safe; colligo accepts)
 * - HEADLESS=1 → true headless (often 408 on generate — debug only)
 * - VISIBLE=1 → on-screen (debug only; interactive sign-in uses modeOverride)
 */
function resolveChromeMode(): "offscreen" | "visible" | "headless" {
  if (modeOverride) return modeOverride;
  if (process.env.ADOBE_FIREFLY_CHROME_VISIBLE === "1") return "visible";
  // True headless is opt-in only — colligo rejects its Forter tokens (API 408, browser OK).
  if (process.env.ADOBE_FIREFLY_CHROME_HEADLESS === "1") return "headless";
  return "offscreen";
}

async function safePageWait(page: import("playwright").Page, ms: number): Promise<void> {
  try {
    if (page.isClosed()) return;
    await page.waitForTimeout(ms);
  } catch {
    /* page closed / target destroyed — caller will re-acquire */
  }
}

async function ensureLivePage(
  context: import("playwright").BrowserContext,
  preferred: import("playwright").Page | null
): Promise<import("playwright").Page> {
  if (preferred && !preferred.isClosed()) {
    try {
      // Touch the page; if target is dead this throws
      void preferred.url();
      return preferred;
    } catch {
      /* fall through */
    }
  }
  const existing =
    context.pages().find((p) => !p.isClosed() && /firefly\.adobe\.com/i.test(p.url())) ||
    context.pages().find((p) => !p.isClosed());
  if (existing) return existing;
  return context.newPage();
}

function dataDir(): string {
  return (
    String(process.env.DATA_DIR || process.env.OMNIROUTE_DATA_DIR || "").trim() ||
    join(process.cwd(), ".data")
  );
}

function profileDir(): string {
  // Prefer LOCALAPPDATA when present so the managed Chrome profile survives restarts.
  const local = process.env.LOCALAPPDATA || process.env.HOME || process.env.USERPROFILE || "";
  if (local) {
    const p = join(local, "OmniRoute", PROFILE_DIR_NAME);
    try {
      mkdirSync(p, { recursive: true });
    } catch {
      /* ignore */
    }
    return p;
  }
  const p = join(dataDir(), PROFILE_DIR_NAME);
  try {
    mkdirSync(p, { recursive: true });
  } catch {
    /* ignore */
  }
  return p;
}

function findChromeExecutable(): string | null {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
    join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  return null;
}

async function waitForCdp(port: number, timeoutMs: number): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 350));
  }
  throw new Error(`Chrome CDP not ready on port ${port}`);
}

async function killPortOwner(port: number): Promise<void> {
  if (process.platform !== "win32") return;
  try {
    const { execSync } = await import("node:child_process");
    execSync(
      `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
      { stdio: "ignore", timeout: 8000 }
    );
  } catch {
    /* ignore */
  }
}

function parseCookieHeader(cookieHeader: string): Array<{ name: string; value: string }> {
  const out: Array<{ name: string; value: string }> = [];
  for (const part of String(cookieHeader || "").split(";")) {
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    let name = part.slice(0, idx).trim();
    let value = part.slice(idx + 1).trim();
    try {
      name = decodeURIComponent(name);
    } catch {
      /* keep */
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!name || /[\r\n\0]/.test(value)) continue;
    out.push({ name, value });
  }
  return out;
}

/** Detect whether the process listening on `port` was started with --headless. */
async function isPortChromeHeadless(port: number): Promise<boolean | null> {
  if (process.platform !== "win32") return null;
  try {
    const { execSync } = await import("node:child_process");
    const out = execSync(
      `powershell -NoProfile -Command "$c=Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1; if(-not $c){exit 2}; $p=Get-CimInstance Win32_Process -Filter (\\"ProcessId=$($c.OwningProcess)\\"); if($p.CommandLine -match 'headless'){Write-Output 'headless'}else{Write-Output 'headed'}"`,
      { encoding: "utf8", timeout: 8000, stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (out === "headless") return true;
    if (out === "headed") return false;
    return null;
  } catch {
    return null;
  }
}

async function tryConnectExistingCdp(
  chromium: typeof import("playwright").chromium,
  port: number,
  dir: string,
  desiredMode: string,
  log?: Log
): Promise<RuntimeState | null> {
  try {
    const r = await fetch(`http://127.0.0.1:${port}/json/version`);
    if (!r.ok) return null;

    // Match process headless-ness to desiredMode:
    // - headless desired: never reuse a headed process (would flash a real window).
    // - offscreen/visible desired: never reuse headless (wrong Forter/profile mode).
    const headless = await isPortChromeHeadless(port);
    if (desiredMode === "headless" && headless === false) {
      log?.warn?.(
        "ADOBE-FIREFLY",
        `existing CDP on ${port} is headed — killing and restarting as headless (no UI)`
      );
      await killPortOwner(port);
      return null;
    }
    if (desiredMode !== "headless" && headless === true) {
      log?.warn?.(
        "ADOBE-FIREFLY",
        `existing CDP on ${port} is headless — killing and restarting as ${desiredMode}`
      );
      await killPortOwner(port);
      return null;
    }

    const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
    const context = browser.contexts()[0] || (await browser.newContext());
    const page = await ensureLivePage(context, null);
    log?.info?.(
      "ADOBE-FIREFLY",
      `reused existing Chrome CDP port=${port} desiredMode=${desiredMode} pages=${context.pages().length}`
    );
    return {
      port,
      profileDir: dir,
      chromeProc: null,
      browser,
      context,
      page,
      lastWarmAt: 0,
      lastCookieSeed: "",
      mode: desiredMode,
    };
  } catch {
    return null;
  }
}

/**
 * Chrome remembers last window bounds in the profile. Off-screen warms park the window at
 * ~(-32000,-32000) / secondary-monitor coords — a later "visible" sign-in then opens Firefly
 * off-screen and the user sees nothing. Reset placement on disk before a visible spawn.
 */
function resetChromeWindowPlacementOnDisk(dir: string, log?: Log): void {
  const candidates = [join(dir, "Default", "Preferences"), join(dir, "Preferences")];
  const onScreen = {
    bottom: 960,
    left: 80,
    maximized: false,
    right: 1360,
    top: 60,
    work_area_bottom: 1080,
    work_area_left: 0,
    work_area_right: 1920,
    work_area_top: 0,
  };
  for (const path of candidates) {
    if (!existsSync(path)) continue;
    try {
      const raw = readFileSync(path, "utf8");
      const obj = JSON.parse(raw) as Record<string, unknown>;
      const browser = (
        obj.browser && typeof obj.browser === "object"
          ? (obj.browser as Record<string, unknown>)
          : {}
      ) as Record<string, unknown>;
      browser.window_placement = onScreen;
      browser.window_placement_popup = onScreen;
      obj.browser = browser;
      // Avoid session restore putting us back off-screen.
      if (obj.profile && typeof obj.profile === "object") {
        (obj.profile as Record<string, unknown>).exit_type = "Normal";
        (obj.profile as Record<string, unknown>).exited_cleanly = true;
      }
      writeFileSync(path, JSON.stringify(obj), "utf8");
      log?.info?.("ADOBE-FIREFLY", `reset Chrome window_placement on disk (${path})`);
    } catch (err) {
      log?.warn?.(
        "ADOBE-FIREFLY",
        `could not reset window_placement: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}

/** After CDP connect, force the browser window onto the primary work area (visible sign-in). */
async function forceChromeWindowOnScreen(
  browser: import("playwright").Browser,
  page: import("playwright").Page,
  log?: Log
): Promise<void> {
  try {
    const cdp = await page.context().newCDPSession(page);
    const { windowId } = (await cdp.send(
      "Browser.getWindowForTarget" as "Browser.getWindowForTarget"
    )) as {
      windowId: number;
    };
    await cdp.send("Browser.setWindowBounds" as "Browser.setWindowBounds", {
      windowId,
      bounds: {
        left: 80,
        top: 60,
        width: 1280,
        height: 900,
        windowState: "normal",
      },
    });
    await page.bringToFront().catch(() => {});
    // Best-effort Windows focus (Chrome can open behind the host app).
    if (process.platform === "win32") {
      try {
        const { execSync } = await import("node:child_process");
        execSync(
          `powershell -NoProfile -Command "$p=Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Firefly|Adobe|Chrome' } | Select-Object -First 1; if($p){ Add-Type -Name W -Namespace N -MemberDefinition '[DllImport(\\\"user32.dll\\\")] public static extern bool SetForegroundWindow(IntPtr h); [DllImport(\\\"user32.dll\\\")] public static extern bool ShowWindow(IntPtr h,int n);'; [N.W]::ShowWindow($p.MainWindowHandle,9) | Out-Null; [N.W]::SetForegroundWindow($p.MainWindowHandle) | Out-Null }"`,
          { stdio: "ignore", timeout: 5000 }
        );
      } catch {
        /* ignore */
      }
    }
    log?.info?.("ADOBE-FIREFLY", "forced Chrome window on-screen (80,60 1280x900)");
  } catch (err) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `forceChromeWindowOnScreen failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

async function ensureChromeStarted(
  log?: Log,
  opts?: { forceRestart?: boolean }
): Promise<RuntimeState> {
  const mode = resolveChromeMode();

  // Always kill the CDP port on forceRestart (even if in-memory runtime is null — leftover
  // off-screen Chrome from a prior warm is the usual "browser didn't appear" case).
  if (opts?.forceRestart) {
    try {
      await runtime?.browser?.close();
    } catch {
      /* ignore */
    }
    runtime = null;
    await killPortOwner(DEFAULT_CDP_PORT);
  }

  if (runtime?.browser && runtime.context) {
    // Mode mismatch: always restart so we never keep a headed UI when silent headless
    // is required, and never keep headless when offscreen/visible is required.
    if (runtime.mode !== mode) {
      log?.warn?.(
        "ADOBE-FIREFLY",
        `cached Chrome mode=${runtime.mode} desired=${mode} — restarting`
      );
      try {
        await runtime.browser?.close();
      } catch {
        /* ignore */
      }
      runtime = null;
      await killPortOwner(DEFAULT_CDP_PORT);
    } else {
      try {
        await fetch(`http://127.0.0.1:${runtime.port}/json/version`);
        // Live process must still match headless/headed expectation.
        const hl = await isPortChromeHeadless(runtime.port);
        const mismatch =
          (mode === "headless" && hl === false) || (mode !== "headless" && hl === true);
        if (mismatch) {
          log?.warn?.("ADOBE-FIREFLY", `live CDP headless=${hl} desired=${mode} — restarting`);
          try {
            await runtime.browser?.close();
          } catch {
            /* ignore */
          }
          runtime = null;
          await killPortOwner(DEFAULT_CDP_PORT);
        } else {
          runtime.page = await ensureLivePage(runtime.context, runtime.page);
          return runtime;
        }
      } catch {
        try {
          await runtime.browser?.close();
        } catch {
          /* ignore */
        }
        runtime = null;
      }
    }
  }

  if (startingChrome) return startingChrome;

  if (process.env.ADOBE_FIREFLY_BROWSER_REFRESH === "0") {
    throw new Error("ADOBE_FIREFLY_BROWSER_REFRESH=0");
  }

  startingChrome = (async () => {
    const chromePath = findChromeExecutable();
    if (!chromePath) throw new Error("Google Chrome not found (set CHROME_PATH)");

    let chromium: typeof import("playwright").chromium;
    try {
      chromium = (await import("playwright")).chromium;
    } catch {
      throw new Error("playwright package not available for CDP connect");
    }

    const port = DEFAULT_CDP_PORT;
    const dir = profileDir();

    // Prefer reusing a healthy CDP only when mode matches (headless vs headed).
    // Mismatched reuse is rejected inside tryConnectExistingCdp.
    if (!opts?.forceRestart) {
      const existing = await tryConnectExistingCdp(chromium, port, dir, mode, log);
      if (existing) {
        runtime = existing;
        return existing;
      }
    }

    // Kill stale listener before spawn (headless leftover / force restart).
    await killPortOwner(port);

    // Visible sign-in: wipe off-screen bounds left by prior off-screen warms.
    if (mode === "visible") {
      resetChromeWindowPlacementOnDisk(dir, log);
    }

    // Default headless: zero UI for cookie/JWT warm. Offscreen/visible are opt-in only.
    const args = [
      `--remote-debugging-port=${port}`,
      "--remote-debugging-address=127.0.0.1",
      "--remote-allow-origins=*",
      `--user-data-dir=${dir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-blink-features=AutomationControlled",
      "--disable-features=TranslateUI",
      "--disable-session-crashed-bubble",
      "--hide-crash-restore-bubble",
      ...(mode === "headless"
        ? ["--headless=new", "--disable-gpu", "--window-size=1280,900"]
        : mode === "offscreen"
          ? [
              "--window-position=-32000,-32000",
              "--window-size=1280,900",
              // Start minimized as extra belt-and-suspenders (Windows may still create a taskbar entry).
              "--start-minimized",
            ]
          : [
              // Explicit on-screen position — profile restore alone is not enough.
              "--window-position=80,60",
              "--window-size=1280,900",
              "--start-maximized",
            ]),
      mode === "visible"
        ? "https://firefly.adobe.com/"
        : "https://firefly.adobe.com/generate/image",
    ];

    log?.info?.(
      "ADOBE-FIREFLY",
      `starting Chrome CDP profile=${dir} port=${port} mode=${mode} (headless=silent; offscreen=headed parked; visible=on-screen sign-in)`
    );
    const chromeProc = spawn(chromePath, args, {
      stdio: "ignore",
      detached: true,
      // Only interactive sign-in may show a window host; silent refresh stays hidden.
      windowsHide: mode !== "visible",
    });
    chromeProc.unref();

    await waitForCdp(port, 45_000);
    const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
    const context = browser.contexts()[0] || (await browser.newContext());
    const page = await ensureLivePage(context, null);

    if (mode === "visible") {
      await forceChromeWindowOnScreen(browser, page, log);
    }

    runtime = {
      port,
      profileDir: dir,
      chromeProc,
      browser,
      context,
      page,
      lastWarmAt: 0,
      lastCookieSeed: "",
      mode,
    };
    return runtime;
  })();

  try {
    return await startingChrome;
  } finally {
    startingChrome = null;
  }
}

async function seedCookies(
  context: import("playwright").BrowserContext,
  cookieHeader: string
): Promise<number> {
  const pairs = parseCookieHeader(cookieHeader);
  let n = 0;
  for (const { name, value } of pairs) {
    for (const domain of [".adobe.com", "firefly.adobe.com", ".firefly.adobe.com"]) {
      try {
        await context.addCookies([
          { name, value, domain, path: "/", secure: true, sameSite: "Lax" },
        ]);
        n++;
        break;
      } catch {
        /* try next domain */
      }
    }
  }
  return n;
}

function extractUserJwtFromStorageRaw(raw: string): string {
  const matches =
    String(raw || "").match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [];
  for (const tok of matches) {
    if (looksLikeAdobeJwt(tok) && isAdobeUserAccessToken(tok)) return tok;
  }
  return "";
}

async function readSpaUserJwt(page: import("playwright").Page): Promise<string> {
  const tokens = await page.evaluate(() => {
    const out: string[] = [];
    for (const key of Object.keys(sessionStorage)) {
      if (!/adobeid_ims_access_token|clio-playground/i.test(key)) continue;
      out.push(sessionStorage.getItem(key) || "");
    }
    return out;
  });
  for (const raw of tokens) {
    const tok = extractUserJwtFromStorageRaw(raw);
    if (tok) return tok;
  }
  // broader scan
  const all = await page.evaluate(() => {
    const out: string[] = [];
    for (const key of Object.keys(sessionStorage)) out.push(sessionStorage.getItem(key) || "");
    return out;
  });
  for (const raw of all) {
    const tok = extractUserJwtFromStorageRaw(raw);
    if (tok) return tok;
  }
  return "";
}

async function injectUserJwt(page: import("playwright").Page, token: string): Promise<void> {
  if (!token) return;
  await page
    .evaluate((t) => {
      for (const key of Object.keys(sessionStorage)) {
        if (!key.includes("adobeid_ims_access_token")) continue;
        try {
          const obj = JSON.parse(sessionStorage.getItem(key) || "{}") as Record<string, unknown>;
          obj.tokenValue = t;
          obj.access_token = t;
          obj.valid = true;
          obj.expire = Date.now() + 20 * 3600 * 1000;
          obj.expires_in = 86400000;
          obj.client_id = "clio-playground-web";
          sessionStorage.setItem(key, JSON.stringify(obj));
        } catch {
          /* skip */
        }
      }
    }, token)
    .catch(() => {});
}

async function humanize(page: import("playwright").Page): Promise<void> {
  try {
    if (page.isClosed()) return;
    for (let i = 0; i < 16; i++) {
      if (page.isClosed()) return;
      await page.mouse.move(100 + i * 45, 160 + (i % 5) * 35, { steps: 4 });
      await safePageWait(page, 80);
    }
    // Light scroll nudges Forter / passive listeners on real headed Chrome.
    await page.mouse.wheel(0, 240).catch(() => {});
    await safePageWait(page, 200);
    await page.mouse.wheel(0, -120).catch(() => {});
  } catch {
    /* ignore */
  }
}

/** Poll jar until forterToken timestamp advances past `minTs`, or timeout. */
async function waitForFresherForter(
  context: import("playwright").BrowserContext,
  minTs: number,
  timeoutMs: number,
  log?: Log
): Promise<number> {
  const start = Date.now();
  let best = 0;
  while (Date.now() - start < timeoutMs) {
    const cookie = await jarCookieHeader(context);
    const ts = extractAdobeForterTimestampMs(cookie);
    if (ts > best) best = ts;
    if (ts > minTs) {
      log?.info?.("ADOBE-FIREFLY", `Chrome forter refreshed (ts=${ts}, deltaMs=${ts - minTs})`);
      return ts;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  log?.warn?.(
    "ADOBE-FIREFLY",
    `Chrome forter did not advance past ${minTs} within ${timeoutMs}ms (best=${best})`
  );
  return best;
}

async function jarCookieHeader(context: import("playwright").BrowserContext): Promise<string> {
  const jar = await context.cookies();
  // Prefer firefly-relevant cookies; keep full jar for rebuild pieces
  return jar.map((c) => `${c.name}=${c.value}`).join("; ");
}

async function buildArpFromContext(
  context: import("playwright").BrowserContext,
  page: import("playwright").Page
): Promise<{ arp: string; cookie: string }> {
  const cookie = await jarCookieHeader(context);
  const ls = await page
    .evaluate(() => ({
      bfp: localStorage.getItem("bfp") || "",
      fpjs: localStorage.getItem("fpjs") || "",
    }))
    .catch(() => ({ bfp: "", fpjs: "" }));
  let blob = cookie;
  if (ls.bfp && !/(?:^|;\s*)bfp=/.test(blob)) blob = mergeAdobeCookieHeaders(blob, `bfp=${ls.bfp}`);
  if (ls.fpjs && !/(?:^|;\s*)fpjs=/.test(blob)) {
    blob = mergeAdobeCookieHeaders(blob, `fpjs=${encodeURIComponent(ls.fpjs)}`);
  }
  const arp =
    buildAdobeArpSessionIdFromCookies(blob, {
      bfp: ls.bfp || undefined,
      fpjs: ls.fpjs || undefined,
    }) || "";
  return { arp, cookie: extractAdobeCookieHeader(blob) || blob };
}

/**
 * Warm (or create) the durable Chrome Firefly session.
 * Returns accessToken + cookie + arpSessionId ready for generate-async.
 */
export async function warmAdobeFireflyViaChrome(opts: {
  cookie: string;
  accessToken?: string;
  log?: Log;
  /** Wait for interactive login if only guest JWT is present (ms, 0 = don't wait). */
  waitForLoginMs?: number;
  /**
   * Mid-batch 408 recovery: allow warm without ADOBE_FIREFLY_BROWSER_REFRESH=1.
   * Uses headless Chrome by default (no UI). Opt into headed offscreen with
   * ADOBE_FIREFLY_CHROME_HEADED=1 if diagnosing colligo.
   */
  allowWithoutEnvOptIn?: boolean;
  /** When true (or ADOBE_FIREFLY_CHROME_PING=1), prove ARP with in-page generate-async. */
  proveWithPing?: boolean;
}): Promise<AdobeFireflySession | null> {
  // Kill switch
  if (process.env.ADOBE_FIREFLY_BROWSER_REFRESH === "0") return null;
  // Default OFF for proactive use; recovery may pass allowWithoutEnvOptIn.
  if (!opts.allowWithoutEnvOptIn && process.env.ADOBE_FIREFLY_BROWSER_REFRESH !== "1") return null;
  if (process.env.NODE_ENV === "test" || process.env.VITEST || process.env.NODE_TEST_CONTEXT) {
    return null;
  }

  const run = warmChain.then(async () => {
    const log = opts.log;
    const cookieIn = extractAdobeCookieHeader(opts.cookie) || opts.cookie;
    if (!cookieIn?.trim() && !opts.accessToken) return null;

    const forterBefore = extractAdobeForterTimestampMs(cookieIn);
    // Force restart on recovery so we never reuse a half-dead CDP; mode is still headless
    // by default (no popup). ADOBE_FIREFLY_CHROME_HEADED=1 opts into offscreen headed.
    const rt = await ensureChromeStarted(log, {
      forceRestart:
        Boolean(opts.allowWithoutEnvOptIn) ||
        process.env.ADOBE_FIREFLY_CHROME_FORCE_RESTART === "1",
    });
    const context = rt.context!;
    let page = await ensureLivePage(context, rt.page);

    if (cookieIn && cookieIn !== rt.lastCookieSeed) {
      const n = await seedCookies(context, cookieIn);
      rt.lastCookieSeed = cookieIn;
      log?.info?.("ADOBE-FIREFLY", `Chrome seeded ${n} cookie entries`);
    }

    // Navigate / reload with page-closed recovery (prior flaky "Target page closed").
    const gotoFirefly = async () => {
      page = await ensureLivePage(context, page);
      if (!/firefly\.adobe\.com/i.test(page.url())) {
        await page.goto("https://firefly.adobe.com/generate/image", {
          waitUntil: "domcontentloaded",
          timeout: 90_000,
        });
      } else {
        await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 }).catch(async () => {
          page = await ensureLivePage(context, null);
          await page.goto("https://firefly.adobe.com/generate/image", {
            waitUntil: "domcontentloaded",
            timeout: 90_000,
          });
        });
      }
    };

    await gotoFirefly();
    await safePageWait(page, 8_000);
    await humanize(page);

    let jwt = await readSpaUserJwt(page).catch(() => "");
    if (!jwt && opts.accessToken && isAdobeUserAccessToken(opts.accessToken)) {
      page = await ensureLivePage(context, page);
      await injectUserJwt(page, opts.accessToken);
      await page.reload({ waitUntil: "domcontentloaded", timeout: 90_000 }).catch(() => {});
      await safePageWait(page, 6_000);
      await humanize(page);
      jwt = (await readSpaUserJwt(page).catch(() => "")) || opts.accessToken;
      log?.info?.("ADOBE-FIREFLY", "Chrome injected cached user JWT into SPA sessionStorage");
    }

    // Wait for interactive login if still no user JWT (one-time profile SSO)
    const waitMs = opts.waitForLoginMs ?? Number(process.env.ADOBE_FIREFLY_LOGIN_WAIT_MS || 0);
    if (!jwt && waitMs > 0) {
      log?.warn?.(
        "ADOBE-FIREFLY",
        `No user JWT yet — sign in to Firefly in the Chrome window (wait ${Math.round(waitMs / 1000)}s)`
      );
      const start = Date.now();
      while (Date.now() - start < waitMs) {
        await safePageWait(page, 2000);
        page = await ensureLivePage(context, page);
        jwt = await readSpaUserJwt(page).catch(() => "");
        if (jwt) break;
      }
    }

    if (!jwt && opts.accessToken && isAdobeUserAccessToken(opts.accessToken)) {
      jwt = opts.accessToken;
    }
    if (!jwt || !isAdobeUserAccessToken(jwt)) {
      log?.warn?.("ADOBE-FIREFLY", "Chrome warm: still no AdobeID user JWT (cookie-only guest)");
      // Still return ARP if possible — caller may already have JWT
      if (!opts.accessToken) return null;
      jwt = opts.accessToken;
    }

    // Give Forter SDK time to mint a NEW forterToken (stale paste is the usual 408 root cause).
    const forterWaitMs = Number(process.env.ADOBE_FIREFLY_FORTER_WAIT_MS || 45_000);
    await waitForFresherForter(context, forterBefore, forterWaitMs, log);

    // Second humanize + short settle after token land
    page = await ensureLivePage(context, page);
    await humanize(page);
    await safePageWait(page, 2_000);

    let { arp, cookie } = await buildArpFromContext(context, page);
    if (!arp) {
      log?.warn?.("ADOBE-FIREFLY", "Chrome warm: could not rebuild ARP from jar — one more reload");
      await gotoFirefly();
      await safePageWait(page, 8_000);
      await humanize(page);
      await waitForFresherForter(context, forterBefore, 20_000, log);
      ({ arp, cookie } = await buildArpFromContext(context, page));
    }
    if (!arp) {
      log?.warn?.("ADOBE-FIREFLY", "Chrome warm: could not rebuild ARP from jar");
      return null;
    }

    // Prove colligo accepts this ARP. Default ON for recovery path; env can force either way.
    const shouldPing =
      opts.proveWithPing === true ||
      process.env.ADOBE_FIREFLY_CHROME_PING === "1" ||
      (opts.allowWithoutEnvOptIn && process.env.ADOBE_FIREFLY_CHROME_PING !== "0");
    if (shouldPing) {
      page = await ensureLivePage(context, page);
      const ok = await pingGenerateInPage(page, jwt, arp, log);
      if (!ok) {
        log?.warn?.(
          "ADOBE-FIREFLY",
          "Chrome ping generate failed — waiting for forter once more and rebuilding ARP"
        );
        await waitForFresherForter(context, extractAdobeForterTimestampMs(cookie), 20_000, log);
        ({ arp, cookie } = await buildArpFromContext(context, page));
        if (arp) {
          page = await ensureLivePage(context, page);
          const ok2 = await pingGenerateInPage(page, jwt, arp, log);
          if (!ok2) {
            log?.warn?.("ADOBE-FIREFLY", "Chrome ping still failed — returning ARP for node retry");
          }
        }
      }
    }

    rt.page = page;
    rt.lastWarmAt = Date.now();
    const ftrTs = extractAdobeForterTimestampMs(cookie);
    log?.info?.(
      "ADOBE-FIREFLY",
      `Chrome warm OK (mode=${rt.mode}, arpLen=${arp.length}, forterTs=${ftrTs || 0}, forterDeltaMs=${ftrTs && forterBefore ? ftrTs - forterBefore : "n/a"}, user=${String(decodeAdobeJwtPayload(jwt)?.user_id || "").slice(0, 20)})`
    );

    return {
      accessToken: jwt,
      cookie,
      arpSessionId: arp,
      tokenExpiresAt: (() => {
        const p = decodeAdobeJwtPayload(jwt);
        const created = Number(p?.created_at || 0);
        const exp = Number(p?.expires_in || 0);
        return created && exp ? created + exp : Date.now() + 20 * 3600_000;
      })(),
      updatedAt: Date.now(),
      fingerprint: "chrome",
      source: "browser" as const,
    };
  });

  // Serialize warms
  warmChain = run.then(
    () => undefined,
    () => undefined
  );
  try {
    return await run;
  } catch (err) {
    opts.log?.warn?.(
      "ADOBE-FIREFLY",
      `Chrome warm failed: ${err instanceof Error ? err.message : String(err)}`
    );
    // Soft-reset page/browser handle but do not kill Chrome process — reuse next warm.
    if (runtime) {
      runtime.page = null;
      try {
        await runtime.browser?.close();
      } catch {
        /* ignore */
      }
      runtime.browser = null;
      runtime.context = null;
    }
    runtime = null;
    return null;
  }
}

/**
 * Wipe Adobe SSO from the managed profile so "Add Account" can log into a *new* identity
 * instead of silently reusing the previous Adobe session.
 */
async function clearAdobeBrowserSession(
  context: import("playwright").BrowserContext,
  page: import("playwright").Page,
  log?: Log
): Promise<void> {
  try {
    await context.clearCookies();
  } catch {
    /* ignore */
  }
  try {
    await page.goto("https://firefly.adobe.com/", {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await page
      .evaluate(() => {
        try {
          sessionStorage.clear();
        } catch {
          /* ignore */
        }
        try {
          localStorage.clear();
        } catch {
          /* ignore */
        }
      })
      .catch(() => {});
  } catch {
    /* ignore */
  }
  // Best-effort IMS logout so the next load shows the sign-in UI.
  try {
    await page.goto(
      "https://auth.services.adobe.com/en_US/index.html?callback=https%3A%2F%2Ffirefly.adobe.com%2F",
      {
        waitUntil: "domcontentloaded",
        timeout: 45_000,
      }
    );
    await safePageWait(page, 1500);
  } catch {
    /* ignore */
  }
  log?.info?.("ADOBE-FIREFLY", "sign-in: cleared prior Adobe session for a fresh login");
}

/**
 * Interactive one-time sign-in for the "browser session" credential model.
 * Opens a VISIBLE managed Chrome (persistent profile), navigates to Firefly, and waits for the
 * user to log in. Returns the IMS JWT + cookie jar so generate works immediately without
 * depending on sessionStorage surviving a browser close.
 * Never throws — returns { success:false } on timeout / unavailable.
 */
export async function loginAdobeFireflyViaChrome(opts: {
  cookie?: string;
  /** Max time to wait for the user to complete login (ms). Default 5 min. */
  waitForLoginMs?: number;
  /**
   * When true (default for "Add Account"), wipe the prior Adobe SSO so a *new* account can be
   * signed in instead of reopening the previous logged-in profile.
   */
  freshSession?: boolean;
  log?: Log;
}): Promise<{
  success: boolean;
  account?: string;
  accessToken?: string;
  cookie?: string;
  arpSessionId?: string;
}> {
  if (process.env.ADOBE_FIREFLY_BROWSER_REFRESH === "0") {
    return { success: false };
  }
  const log = opts.log;
  const prev = modeOverride;
  modeOverride = "visible";
  const fresh = opts.freshSession !== false; // default true for multi-account Add Account
  try {
    // Fresh visible window (a cached off-screen CDP would be parked off-display for login).
    // forceRestart ALWAYS kills port 9334 + restarts with on-screen bounds.
    const rt = await ensureChromeStarted(log, { forceRestart: true });
    const context = rt.context!;
    let page = await ensureLivePage(context, rt.page);

    // Re-assert on-screen + foreground (profile may re-apply bad bounds after first paint).
    await forceChromeWindowOnScreen(rt.browser!, page, log);

    if (fresh) {
      await clearAdobeBrowserSession(context, page, log);
      page = await ensureLivePage(context, null);
      rt.lastCookieSeed = "";
    } else {
      const cookieIn = opts.cookie ? extractAdobeCookieHeader(opts.cookie) || opts.cookie : "";
      if (cookieIn) {
        const n = await seedCookies(context, cookieIn);
        rt.lastCookieSeed = cookieIn;
        log?.info?.("ADOBE-FIREFLY", `sign-in: seeded ${n} cookie entries as a hint`);
      }
    }

    await page
      .goto("https://firefly.adobe.com/", { waitUntil: "domcontentloaded", timeout: 90_000 })
      .catch(() => {});
    page = await ensureLivePage(context, page);
    await forceChromeWindowOnScreen(rt.browser!, page, log);
    log?.info?.(
      "ADOBE-FIREFLY",
      `sign-in: Chrome window open ON-SCREEN (fresh=${fresh}) — waiting for Adobe login…`
    );

    const waitMs =
      opts.waitForLoginMs ?? Number(process.env.ADOBE_FIREFLY_LOGIN_WAIT_MS || 300_000);
    const start = Date.now();
    let jwt = "";
    while (Date.now() - start < waitMs) {
      await safePageWait(page, 2500);
      page = await ensureLivePage(context, page);
      jwt = await readSpaUserJwt(page).catch(() => "");
      if (jwt && isAdobeUserAccessToken(jwt)) break;
    }
    const ok = Boolean(jwt && isAdobeUserAccessToken(jwt));
    const account = ok ? String(decodeAdobeJwtPayload(jwt)?.user_id || "") : undefined;

    // Capture durable credentials BEFORE closing the window (sessionStorage JWT dies with the tab).
    let cookie = "";
    let arpSessionId = "";
    if (ok) {
      try {
        const built = await buildArpFromContext(context, page);
        cookie = extractAdobeCookieHeader(built.cookie) || built.cookie || "";
        arpSessionId = built.arp || "";
      } catch {
        cookie = (await jarCookieHeader(context).catch(() => "")) || "";
      }
    }

    log?.info?.(
      "ADOBE-FIREFLY",
      ok
        ? `sign-in OK (account=${account?.slice(0, 24)}, cookieLen=${cookie.length}, arpLen=${arpSessionId.length})`
        : "sign-in timed out — no AdobeID session"
    );

    // Close the visible window; the persistent profile keeps the SSO for later headless warms.
    try {
      await rt.browser?.close();
    } catch {
      /* ignore */
    }
    runtime = null;
    return {
      success: ok,
      account,
      accessToken: ok ? jwt : undefined,
      cookie: ok ? cookie : undefined,
      arpSessionId: ok ? arpSessionId : undefined,
    };
  } catch (err) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `sign-in failed: ${err instanceof Error ? err.message : String(err)}`
    );
    try {
      await runtime?.browser?.close();
    } catch {
      /* ignore */
    }
    runtime = null;
    return { success: false };
  } finally {
    modeOverride = prev;
  }
}

async function pingGenerateInPage(
  page: import("playwright").Page,
  token: string,
  arp: string,
  log?: Log
): Promise<boolean> {
  try {
    const res = await page.evaluate(
      async ({ token, arp }) => {
        const claims = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        ) as { user_id?: string };
        const prompt = "ping";
        const data = new TextEncoder().encode(String(claims.user_id || "") + "-" + prompt);
        const hash = await crypto.subtle.digest("SHA-256", data);
        const nonce = [...new Uint8Array(hash)]
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        const r = await fetch("https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "x-api-key": "clio-playground-web",
            "content-type": "application/json",
            accept: "*/*",
            "x-nonce": nonce,
            "x-arp-session-id": arp,
          },
          credentials: "include",
          body: JSON.stringify({
            n: 1,
            seeds: [1],
            output: { storeInputs: true },
            prompt,
            referenceBlobs: [],
            modelSpecificPayload: { size: "auto" },
            modelId: "gpt-image",
            modelVersion: "2",
            generationMetadata: { module: "text2image", submodule: "ff-image-generate" },
            generationSettings: { detailLevel: 1 },
          }),
        });
        return { status: r.status, body: (await r.text()).slice(0, 120) };
      },
      { token, arp }
    );
    log?.info?.("ADOBE-FIREFLY", `Chrome ping generate status=${res.status}`);
    return res.status === 200 || res.status === 202;
  } catch (e) {
    log?.warn?.(
      "ADOBE-FIREFLY",
      `Chrome ping error: ${e instanceof Error ? e.message : String(e)}`
    );
    return false;
  }
}

/**
 * Submit generate-async inside the warmed Chrome page (same TLS/cookie jar as SPA).
 * Falls back to null so caller can use node fetch with the warmed ARP.
 */
export async function adobeFireflyGenerateInChrome(opts: {
  accessToken: string;
  arpSessionId: string;
  payload: Record<string, unknown>;
  prompt: string;
  log?: Log;
}): Promise<{ status: number; body: string; headers: Record<string, string> } | null> {
  if (!runtime?.page) return null;
  try {
    const res = await runtime.page.evaluate(
      async ({ token, arp, payload, prompt }) => {
        const claims = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        ) as { user_id?: string };
        const data = new TextEncoder().encode(
          String(claims.user_id || "") + "-" + String(prompt || "").slice(0, 256)
        );
        const hash = await crypto.subtle.digest("SHA-256", data);
        const nonce = [...new Uint8Array(hash)]
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        const r = await fetch("https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "x-api-key": "clio-playground-web",
            "content-type": "application/json",
            accept: "*/*",
            "x-nonce": nonce,
            "x-arp-session-id": arp,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        const headers: Record<string, string> = {};
        r.headers.forEach((v, k) => {
          headers[k] = v;
        });
        return { status: r.status, body: await r.text(), headers };
      },
      {
        token: opts.accessToken,
        arp: opts.arpSessionId,
        payload: opts.payload,
        prompt: opts.prompt,
      }
    );
    return res;
  } catch (e) {
    opts.log?.warn?.(
      "ADOBE-FIREFLY",
      `in-Chrome generate failed: ${e instanceof Error ? e.message : String(e)}`
    );
    return null;
  }
}

/** Test helper */
export function __resetAdobeFireflyChromeRuntimeForTests(): void {
  runtime = null;
  warmChain = Promise.resolve();
}
