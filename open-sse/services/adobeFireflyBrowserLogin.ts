/**
 * Adobe Firefly browser login (packaged-backend safe).
 *
 * Firefly needs an Adobe IMS access_token JWT (Bearer) issued for
 * client_id `clio-playground-web`. That JWT is NEVER present in
 * cookies/localStorage — the SPA only holds it in memory and attaches it
 * as `Authorization: Bearer <jwt>` on XHRs to firefly-3p.ff.adobe.io.
 *
 * IMPORTANT: The standalone executable is a pkg-packaged Node binary.
 * Dynamic `import("playwright")` fails there (native bindings / browsers
 * are not in the package). This module launches the **system** Chrome or
 * Edge with `--remote-debugging-port` and talks pure Chrome DevTools
 * Protocol over WebSocket — zero Playwright dependency.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { decodeAdobeJwtPayload, isAdobeUserAccessToken } from "./adobeFireflyClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const FIREFLY_HOME_URL = "https://firefly.adobe.com/";
const FIREFLY_3P_HOST_SUFFIX = "firefly-3p.ff.adobe.io";
// Bounded quantifiers (Hard Rule: avoid ReDoS on adversarial Authorization headers).
const ADOBE_BEARER_REGEX =
  /^Bearer\s+(eyJ[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096})/i;

const DEFAULT_LOGIN_TIMEOUT_MS = 300_000;
const MIN_LOGIN_TIMEOUT_MS = 15_000;
const MAX_LOGIN_TIMEOUT_MS = 600_000;
const POLL_INTERVAL_MS = 400;
const CDP_READY_TIMEOUT_MS = 30_000;

export interface AdobeFireflyBrowserLoginResult {
  success: boolean;
  credentials?: { accessToken?: string; cookie?: string };
  arpSessionId?: string;
  /** Human-readable Adobe account label resolved from IMS userinfo. */
  account?: string;
  error?: string;
}

export interface AdobeFireflyCdpRefreshResult {
  accessToken: string;
  cookie: string;
  arpSessionId: string;
}

type AdobeFireflyBrowserLog = {
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
};

let cdpBrowserChain: Promise<void> = Promise.resolve();

function resolveAdobeFireflyDataRoot(): string {
  const dataRoot =
    String(process.env.DATA_DIR || process.env.OMNIROUTE_DATA_DIR || "").trim() ||
    (process.env.LOCALAPPDATA
      ? join(process.env.LOCALAPPDATA, "OmniRoute")
      : join(process.cwd(), ".data"));
  mkdirSync(dataRoot, { recursive: true });
  return dataRoot;
}

export function adobeFireflyBrowserSessionKey(value: unknown): string {
  const raw = String(value || "legacy-default").trim() || "legacy-default";
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

/** Chrome 136+ requires a non-default user-data-dir for remote debugging. */
export function resolveAdobeFireflyBrowserProfileDir(sessionKey?: string): string {
  const profile = join(
    resolveAdobeFireflyDataRoot(),
    "adobe-chrome-profiles",
    adobeFireflyBrowserSessionKey(sessionKey)
  );
  mkdirSync(profile, { recursive: true });
  return profile;
}

export function clampAdobeFireflyLoginTimeout(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_LOGIN_TIMEOUT_MS;
  return Math.max(MIN_LOGIN_TIMEOUT_MS, Math.min(MAX_LOGIN_TIMEOUT_MS, Math.trunc(value)));
}

/** Extract an IMS JWT from an Authorization header value. Exported for unit tests. */
export function extractAdobeBearerTokenFromAuthorization(authHeader: string): string {
  const m = String(authHeader || "").match(ADOBE_BEARER_REGEX);
  return m?.[1] || "";
}

/** Build a single cookie header from relevant Firefly cookies. Exported for unit tests. */
export function buildAdobeFireflyCookieHeader(
  cookies: Array<{ name: string; value: string; domain?: string }>
): string {
  const wanted = [
    "sherlockToken",
    "forterToken",
    "arkose",
    "ff_session_guid",
    "aux_sid",
    "bfp",
    "fpjs",
  ];
  const parts: string[] = [];
  for (const wantedName of wanted) {
    const c = cookies.find(
      (candidate) =>
        candidate.name === wantedName &&
        typeof candidate.value === "string" &&
        candidate.value.length > 0 &&
        !/[\r\n;]/.test(candidate.value)
    );
    if (c) parts.push(`${wantedName}=${c.value}`);
  }
  return parts.join("; ");
}

function humanAdobeLabel(value: unknown): string {
  const label = typeof value === "string" ? value.trim() : "";
  if (!label || /@(Adobe|Guest)ID$/i.test(label)) return "";
  return label;
}

/** Human-readable label claims only; opaque Adobe IDs are intentionally excluded. */
export function accountLabelFromAdobeJwt(token: string): string {
  const obj = decodeAdobeJwtPayload(token);
  if (!obj) return "";
  for (const key of ["email", "preferred_username", "name", "display_name"]) {
    const label = humanAdobeLabel(obj[key]);
    if (label) return label;
  }
  return "";
}

/** Resolve email/display name from Adobe IMS; never expose the opaque user_id as a label. */
export async function resolveAdobeAccountLabel(
  token: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const claimLabel = accountLabelFromAdobeJwt(token);
  const payload = decodeAdobeJwtPayload(token);
  const clientId = humanAdobeLabel(payload?.client_id) || "clio-playground-web";
  try {
    const response = await fetchImpl(
      `https://ims-na1.adobelogin.com/ims/userinfo/v2?client_id=${encodeURIComponent(clientId)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(10_000),
      }
    );
    if (response.ok) {
      const user = (await response.json()) as Record<string, unknown>;
      for (const key of ["email", "preferred_username", "name", "display_name"]) {
        const label = humanAdobeLabel(user[key]);
        if (label) return label;
      }
      const given = humanAdobeLabel(user.given_name);
      const family = humanAdobeLabel(user.family_name);
      const full = [given, family].filter(Boolean).join(" ").trim();
      if (full) return full;
    }
  } catch {
    // JWT label or generic fallback below keeps login successful if userinfo is unavailable.
  }
  return claimLabel || "Adobe account";
}

/** Resolve system Chrome/Edge executable. Exported for unit tests. */
export function resolveSystemBrowserExecutable(): string | null {
  const configured = process.env.OMNIROUTE_LOGIN_BROWSER_PATH?.trim();
  if (configured && existsSync(configured)) return configured;

  const pf = process.env.ProgramFiles || "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
  const local = process.env.LOCALAPPDATA || "";
  const candidates = [
    join(pf, "Google", "Chrome", "Application", "chrome.exe"),
    join(pf86, "Google", "Chrome", "Application", "chrome.exe"),
    join(local, "Google", "Chrome", "Application", "chrome.exe"),
    join(pf, "Microsoft", "Edge", "Application", "msedge.exe"),
    join(pf86, "Microsoft", "Edge", "Application", "msedge.exe"),
    join(local, "Microsoft", "Edge", "Application", "msedge.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "/usr/bin/microsoft-edge",
    "/usr/bin/microsoft-edge-stable",
  ];
  for (const path of candidates) {
    if (path && existsSync(path)) return path;
  }
  return null;
}

async function getFreeLoopbackPort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        server.close();
        reject(new Error("Could not allocate a free loopback port for Chrome DevTools"));
        return;
      }
      const { port } = addr;
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

async function waitForCdpReady(
  port: number,
  timeoutMs: number
): Promise<{ webSocketDebuggerUrl: string }> {
  const deadline = Date.now() + timeoutMs;
  let lastError = "CDP endpoint not ready";
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        const body = (await res.json()) as { webSocketDebuggerUrl?: string };
        if (body.webSocketDebuggerUrl) {
          return { webSocketDebuggerUrl: body.webSocketDebuggerUrl };
        }
      }
      lastError = `CDP /json/version HTTP ${res.status}`;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Chrome DevTools did not become ready: ${lastError}`);
}

export type AdobeBrowserCookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

type CdpCookie = AdobeBrowserCookie;

function isAdobeCookieDomain(domain: string | undefined): boolean {
  const value = String(domain || "")
    .trim()
    .replace(/^\./, "")
    .toLowerCase();
  return (
    value === "adobe.com" ||
    value.endsWith(".adobe.com") ||
    value === "adobelogin.com" ||
    value.endsWith(".adobelogin.com") ||
    value === "adobe.io" ||
    value.endsWith(".adobe.io")
  );
}

export function filterAdobeBrowserCookies(cookies: CdpCookie[]): AdobeBrowserCookie[] {
  return cookies
    .filter(
      (cookie) =>
        isAdobeCookieDomain(cookie.domain) &&
        Boolean(cookie.name && cookie.value) &&
        !/[\r\n\0]/.test(cookie.name + cookie.value)
    )
    .map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      ...(cookie.domain ? { domain: cookie.domain } : {}),
      path: cookie.path || "/",
      ...(typeof cookie.expires === "number" ? { expires: cookie.expires } : {}),
      ...(typeof cookie.httpOnly === "boolean" ? { httpOnly: cookie.httpOnly } : {}),
      ...(typeof cookie.secure === "boolean" ? { secure: cookie.secure } : {}),
      ...(cookie.sameSite ? { sameSite: cookie.sameSite } : {}),
    }));
}

function adobeBrowserCookieJarPath(sessionKey: string): string {
  const dir = join(resolveAdobeFireflyDataRoot(), "adobe-browser-sessions");
  mkdirSync(dir, { recursive: true });
  return join(dir, `${adobeFireflyBrowserSessionKey(sessionKey)}.json`);
}

function loadAdobeBrowserCookies(sessionKey: string): AdobeBrowserCookie[] {
  try {
    const path = adobeBrowserCookieJarPath(sessionKey);
    if (!existsSync(path)) return [];
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return Array.isArray(parsed) ? filterAdobeBrowserCookies(parsed as CdpCookie[]) : [];
  } catch {
    return [];
  }
}

function saveAdobeBrowserCookies(sessionKey: string, cookies: CdpCookie[]): void {
  try {
    writeFileSync(
      adobeBrowserCookieJarPath(sessionKey),
      JSON.stringify(filterAdobeBrowserCookies(cookies)),
      "utf8"
    );
  } catch {
    // Best-effort: login still returns the portable JWT + Firefly risk cookies.
  }
}

function parseCookieHeader(cookieHeader: string): Array<{ name: string; value: string }> {
  const cookies: Array<{ name: string; value: string }> = [];
  for (const part of String(cookieHeader || "").split(";")) {
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!name || !value || /[\r\n\0]/.test(name + value)) continue;
    cookies.push({ name, value });
  }
  return cookies;
}

function cookieValue(cookies: CdpCookie[], name: string): string {
  return cookies.find((cookie) => cookie.name.toLowerCase() === name.toLowerCase())?.value || "";
}

class CdpSocket {
  private ws: WebSocket;
  private nextId = 1;
  private pending = new Map<
    number,
    { resolve: (v: unknown) => void; reject: (e: Error) => void }
  >();
  private onEvent: (method: string, params: Record<string, unknown>) => void;

  constructor(ws: WebSocket, onEvent: (method: string, params: Record<string, unknown>) => void) {
    this.ws = ws;
    this.onEvent = onEvent;
    this.ws.addEventListener("message", (ev) => {
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(String(ev.data)) as Record<string, unknown>;
      } catch {
        return;
      }
      if (typeof data.id === "number" && this.pending.has(data.id)) {
        const p = this.pending.get(data.id)!;
        this.pending.delete(data.id);
        if (data.error) {
          const errObj = data.error as { message?: string };
          p.reject(new Error(errObj.message || "CDP error"));
        } else {
          p.resolve(data.result);
        }
        return;
      }
      if (typeof data.method === "string") {
        this.onEvent(data.method, (data.params || {}) as Record<string, unknown>);
      }
    });
  }

  send(method: string, params?: Record<string, unknown>, sessionId?: string): Promise<unknown> {
    const id = this.nextId++;
    const msg: Record<string, unknown> = { id, method };
    if (params) msg.params = params;
    if (sessionId) msg.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      try {
        this.ws.send(JSON.stringify(msg));
      } catch (err) {
        this.pending.delete(id);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  close(): void {
    try {
      this.ws.close();
    } catch {
      /* ignore */
    }
  }

  get open(): boolean {
    return this.ws.readyState === WebSocket.OPEN;
  }
}

async function openCdp(url: string): Promise<WebSocket> {
  const WebSocketCtor = (globalThis as { WebSocket?: typeof WebSocket }).WebSocket;
  if (!WebSocketCtor) {
    throw new Error("WebSocket is unavailable in this Node runtime");
  }
  return new Promise((resolve, reject) => {
    const ws = new WebSocketCtor(url);
    const onErr = () => reject(new Error(`Failed to connect CDP: ${url}`));
    ws.addEventListener("error", onErr);
    ws.addEventListener("open", () => {
      ws.removeEventListener("error", onErr);
      resolve(ws);
    });
  });
}

/**
 * Capture Firefly IMS JWT by watching Network.requestWillBeSent on all page targets.
 */
async function captureViaCdp(opts: {
  port: number;
  browserWsUrl: string;
  timeoutMs: number;
  fallbackAccessToken?: string;
  seedCookie?: string;
  seedBrowserCookies?: AdobeBrowserCookie[];
  waitForRiskRefresh?: boolean;
}): Promise<{
  accessToken: string;
  cookies: CdpCookie[];
  arpSessionId: string;
}> {
  let capturedAccessToken = "";
  let capturedArpSessionId = "";
  let latestCookies: CdpCookie[] = [];
  const pageSockets = new Map<string, CdpSocket>();
  let browserCdp: CdpSocket | null = null;
  const initialForter =
    [...(opts.seedBrowserCookies || []), ...parseCookieHeader(opts.seedCookie || "")].find(
      (cookie) => cookie.name.toLowerCase() === "fortertoken"
    )?.value || "";
  const startedAt = Date.now();

  const onEvent = (method: string, params: Record<string, unknown>) => {
    if (method === "Network.requestWillBeSent") {
      const request = params.request as
        { url?: string; headers?: Record<string, string> } | undefined;
      if (!request?.url || !request.url.includes(FIREFLY_3P_HOST_SUFFIX)) return;
      const headers = request.headers || {};
      const auth = headers.Authorization || headers.authorization || headers.AUTHORIZATION || "";
      const token = extractAdobeBearerTokenFromAuthorization(auth);
      if (token && isAdobeUserAccessToken(token)) capturedAccessToken = token;
      const arp =
        headers["x-arp-session-id"] ||
        headers["X-Arp-Session-Id"] ||
        headers["X-ARP-SESSION-ID"] ||
        "";
      if (typeof arp === "string" && arp.trim()) capturedArpSessionId = arp.trim();
    } else if (method === "Target.attachedToTarget") {
      const sessionId = String(params.sessionId || "");
      const targetInfo = params.targetInfo as { type?: string; targetId?: string } | undefined;
      if (sessionId && targetInfo?.type === "page" && browserCdp) {
        void browserCdp.send("Network.enable", {}, sessionId).catch(() => undefined);
      }
    }
  };

  try {
    const browserWs = await openCdp(opts.browserWsUrl);
    browserCdp = new CdpSocket(browserWs, onEvent);
    const seed: AdobeBrowserCookie[] = [
      ...(opts.seedBrowserCookies || []),
      ...parseCookieHeader(opts.seedCookie || "").map((cookie) => ({
        ...cookie,
        domain: "firefly.adobe.com",
        path: "/",
        secure: true,
      })),
    ];
    if (seed.length > 0) {
      await browserCdp
        .send("Storage.setCookies", {
          cookies: seed.map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
            ...(cookie.domain ? { domain: cookie.domain } : { url: FIREFLY_HOME_URL }),
            path: cookie.path || "/",
            ...(typeof cookie.expires === "number" && cookie.expires > 0
              ? { expires: cookie.expires }
              : {}),
            ...(typeof cookie.httpOnly === "boolean" ? { httpOnly: cookie.httpOnly } : {}),
            ...(typeof cookie.sameSite === "string" ? { sameSite: cookie.sameSite } : {}),
            secure: cookie.secure !== false,
          })),
        })
        .catch(() => undefined);
    }
    await browserCdp.send("Target.setDiscoverTargets", { discover: true }).catch(() => undefined);
    await browserCdp
      .send("Target.setAutoAttach", {
        autoAttach: true,
        waitForDebuggerOnStart: false,
        flatten: true,
      })
      .catch(() => undefined);

    const deadline = Date.now() + opts.timeoutMs;
    while (Date.now() < deadline) {
      // Attach to every page target listed by the DevTools HTTP API.
      try {
        const list = (await fetch(`http://127.0.0.1:${opts.port}/json/list`, {
          signal: AbortSignal.timeout(2000),
        }).then((r) => r.json())) as Array<{
          id?: string;
          type?: string;
          url?: string;
          webSocketDebuggerUrl?: string;
        }>;
        for (const t of list) {
          if (t.type !== "page" || !t.webSocketDebuggerUrl || !t.id) continue;
          if (pageSockets.has(t.id)) continue;
          try {
            const ws = await openCdp(t.webSocketDebuggerUrl);
            const cdp = new CdpSocket(ws, onEvent);
            pageSockets.set(t.id, cdp);
            await cdp.send("Network.enable");
            if (
              seed.length > 0 ||
              !t.url ||
              t.url === "about:blank" ||
              t.url.startsWith("chrome://")
            ) {
              await cdp.send("Page.enable").catch(() => undefined);
              await cdp.send("Page.navigate", { url: FIREFLY_HOME_URL }).catch(() => undefined);
            }
          } catch {
            // page may navigate away mid-connect
          }
        }
      } catch {
        // list may fail briefly while Chrome starts
      }

      try {
        const result = (await browserCdp.send("Storage.getCookies")) as {
          cookies?: CdpCookie[];
        };
        if (Array.isArray(result?.cookies)) latestCookies = result.cookies;
      } catch {
        /* retry while Chrome is settling */
      }

      const fallbackToken = String(opts.fallbackAccessToken || "").trim();
      const accessToken =
        capturedAccessToken || (isAdobeUserAccessToken(fallbackToken) ? fallbackToken : "");
      if (accessToken) {
        if (!opts.waitForRiskRefresh) {
          return {
            accessToken,
            cookies: latestCookies,
            arpSessionId: capturedArpSessionId,
          };
        }
        const elapsed = Date.now() - startedAt;
        const forter = cookieValue(latestCookies, "forterToken");
        const hasRiskCookies = Boolean(
          forter &&
          cookieValue(latestCookies, "ff_session_guid") &&
          (cookieValue(latestCookies, "arkose") || cookieValue(latestCookies, "sherlockToken"))
        );
        const riskAdvanced = Boolean(forter && initialForter && forter !== initialForter);
        if (hasRiskCookies && elapsed >= 8_000 && (riskAdvanced || elapsed >= 30_000)) {
          return {
            accessToken,
            cookies: latestCookies,
            arpSessionId: capturedArpSessionId,
          };
        }
      }

      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }

    const fallbackRaw = String(opts.fallbackAccessToken || "").trim();
    const fallback = isAdobeUserAccessToken(fallbackRaw) ? fallbackRaw : "";
    if (fallback && latestCookies.length > 0) {
      return {
        accessToken: capturedAccessToken || fallback,
        cookies: latestCookies,
        arpSessionId: capturedArpSessionId,
      };
    }
    throw new Error(
      "Adobe Firefly sign-in timed out. Complete sign-in at firefly.adobe.com and trigger an action " +
        "(open Generate) so the browser sends the Firefly request, then try again."
    );
  } finally {
    for (const cdp of pageSockets.values()) cdp.close();
    browserCdp?.close();
  }
}

function killProcessTree(child: ChildProcess | null): void {
  if (!child?.pid) return;
  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } else {
      child.kill("SIGTERM");
      setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {
          /* ignore */
        }
      }, 2000).unref?.();
    }
  } catch {
    try {
      child.kill();
    } catch {
      /* ignore */
    }
  }
}

export function buildAdobeFireflyBrowserArgs(opts: {
  port: number;
  userDataDir: string;
  interactive: boolean;
  freshSession?: boolean;
}): string[] {
  return [
    `--remote-debugging-port=${opts.port}`,
    `--user-data-dir=${opts.userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    ...(opts.interactive && opts.freshSession !== false ? ["--incognito"] : []),
    ...(opts.interactive ? [] : ["--window-position=-32000,-32000"]),
    "--window-size=1280,800",
    opts.interactive ? FIREFLY_HOME_URL : "about:blank",
  ];
}

/**
 * Launch system Chrome/Edge at firefly.adobe.com, intercept firefly-3p
 * Authorization Bearer via CDP, return JWT + useful cookies.
 */
async function runAdobeFireflyCdpBrowser(opts: {
  timeoutMs: number;
  interactive: boolean;
  sessionKey: string;
  freshSession?: boolean;
  seedCookie?: string;
  accessToken?: string;
  log?: AdobeFireflyBrowserLog;
}): Promise<AdobeFireflyBrowserLoginResult> {
  const browserPath = resolveSystemBrowserExecutable();
  if (!browserPath) {
    return {
      success: false,
      error:
        "No Chrome or Edge browser found for Adobe Firefly sign-in. " +
        "Install Google Chrome or Microsoft Edge, or set OMNIROUTE_LOGIN_BROWSER_PATH, " +
        "or paste the IMS Bearer JWT from firefly-3p.ff.adobe.io.",
    };
  }

  let child: ChildProcess | null = null;
  try {
    const userDataDir = resolveAdobeFireflyBrowserProfileDir(opts.sessionKey);
    const port = await getFreeLoopbackPort();

    const args = buildAdobeFireflyBrowserArgs({
      port,
      userDataDir,
      interactive: opts.interactive,
      freshSession: opts.freshSession,
    });

    child = spawn(browserPath, args, {
      stdio: "ignore",
      windowsHide: !opts.interactive,
      detached: false,
    });

    // If Chrome exits immediately, fail fast with a clear message.
    const earlyExit = new Promise<never>((_, reject) => {
      child?.once("exit", (code) => {
        reject(new Error(`Browser exited early (code ${code}). Is the executable runnable?`));
      });
      child?.once("error", (err) => {
        reject(new Error(`Failed to launch browser: ${err.message}`));
      });
    });

    const ready = waitForCdpReady(port, CDP_READY_TIMEOUT_MS);
    const { webSocketDebuggerUrl } = await Promise.race([ready, earlyExit]);

    // Detach exit handler so normal user close after capture is fine
    child.removeAllListeners("exit");
    child.removeAllListeners("error");

    const captured = await Promise.race([
      captureViaCdp({
        port,
        browserWsUrl: webSocketDebuggerUrl,
        timeoutMs: opts.timeoutMs,
        fallbackAccessToken: opts.accessToken,
        seedCookie: opts.seedCookie,
        seedBrowserCookies:
          opts.interactive && opts.freshSession !== false
            ? []
            : loadAdobeBrowserCookies(opts.sessionKey),
        waitForRiskRefresh: !opts.interactive,
      }),
      earlyExit,
    ]);

    const cookie = buildAdobeFireflyCookieHeader(captured.cookies);
    saveAdobeBrowserCookies(opts.sessionKey, captured.cookies);
    const account = await resolveAdobeAccountLabel(captured.accessToken);
    opts.log?.info?.(
      "ADOBE-FIREFLY",
      `CDP ${opts.interactive ? "sign-in" : "refresh"} captured durable session ` +
        `(cookieCount=${captured.cookies.length}, arpLen=${captured.arpSessionId.length})`
    );
    return {
      success: true,
      credentials: {
        accessToken: captured.accessToken,
        ...(cookie ? { cookie } : {}),
      },
      ...(captured.arpSessionId ? { arpSessionId: captured.arpSessionId } : {}),
      ...(account ? { account } : {}),
    };
  } catch (error) {
    return {
      success: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    };
  } finally {
    killProcessTree(child);
    child = null;
  }
}

export async function startAdobeFireflyBrowserLogin(
  requestedTimeout?: unknown,
  opts?: { sessionKey?: string; freshSession?: boolean }
): Promise<AdobeFireflyBrowserLoginResult> {
  const run = cdpBrowserChain.then(() =>
    runAdobeFireflyCdpBrowser({
      timeoutMs: clampAdobeFireflyLoginTimeout(requestedTimeout),
      interactive: true,
      sessionKey: String(opts?.sessionKey || "legacy-default"),
      freshSession: opts?.freshSession !== false,
    })
  );
  cdpBrowserChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

/** Packaged-safe background renewal. Reuses the durable sign-in profile; never imports Playwright. */
export async function refreshAdobeFireflyViaCdp(opts: {
  cookie?: string;
  accessToken?: string;
  timeoutMs?: number;
  log?: AdobeFireflyBrowserLog;
  sessionKey?: string;
}): Promise<AdobeFireflyCdpRefreshResult | null> {
  const run = cdpBrowserChain.then(async () => {
    const result = await runAdobeFireflyCdpBrowser({
      timeoutMs: Math.max(15_000, Math.min(120_000, Number(opts.timeoutMs) || 75_000)),
      interactive: false,
      sessionKey: String(opts.sessionKey || "legacy-default"),
      seedCookie: opts.cookie,
      accessToken: opts.accessToken,
      log: opts.log,
    });
    const accessToken = String(result.credentials?.accessToken || "").trim();
    const cookie = String(result.credentials?.cookie || "").trim();
    if (!result.success || !accessToken || !cookie) return null;
    return {
      accessToken,
      cookie,
      arpSessionId: String(result.arpSessionId || "").trim(),
    };
  });
  cdpBrowserChain = run.then(
    () => undefined,
    () => undefined
  );
  try {
    return await run;
  } catch (error) {
    opts.log?.warn?.(
      "ADOBE-FIREFLY",
      `CDP background refresh failed: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
