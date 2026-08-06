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
import http from "node:http";
import { createServer } from "node:net";
import { join } from "node:path";
import {
  decodeAdobeJwtPayload,
  isAdobeUserAccessToken,
  looksLikeAdobeJwt,
} from "./adobeFireflyClient.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

/**
 * Loopback HTTP GET that MUST NOT use globalThis.fetch.
 * OmniRoute patches fetch with a proxy dispatcher (proxyFetch.ts); routing
 * 127.0.0.1 Chrome DevTools through that proxy yields PROXY_UNREACHABLE /
 * "Chrome DevTools did not become ready: fetch failed" while Chrome is fine.
 */
function loopbackHttpGetJson<T = unknown>(
  port: number,
  path: string,
  timeoutMs = 2000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        host: "127.0.0.1",
        port,
        path,
        timeout: Math.max(500, timeoutMs),
        headers: { Accept: "application/json" },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          if ((res.statusCode || 0) < 200 || (res.statusCode || 0) >= 300) {
            reject(new Error(`HTTP ${res.statusCode || 0} ${path}`));
            return;
          }
          try {
            resolve(JSON.parse(body || "null") as T);
          } catch (err) {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        });
      }
    );
    req.on("timeout", () => {
      req.destroy(new Error(`timeout ${timeoutMs}ms ${path}`));
    });
    req.on("error", reject);
  });
}

const FIREFLY_HOME_URL = "https://firefly.adobe.com/";
const FIREFLY_3P_HOST_SUFFIX = "firefly-3p.ff.adobe.io";
// Bounded quantifiers (Hard Rule: avoid ReDoS on adversarial Authorization headers).
const ADOBE_BEARER_REGEX =
  /^Bearer\s+(eyJ[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096})/i;
const ADOBE_JWT_IN_TEXT_REGEX =
  /eyJ[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096}\.[A-Za-z0-9_-]{1,4096}/g;

const DEFAULT_LOGIN_TIMEOUT_MS = 300_000;
const MIN_LOGIN_TIMEOUT_MS = 15_000;
const MAX_LOGIN_TIMEOUT_MS = 600_000;
const POLL_INTERVAL_MS = 400;
/** Interactive sign-in must surface Chrome quickly; 12s is enough if spawn works. */
const CDP_READY_TIMEOUT_MS = 12_000;
const CDP_READY_TIMEOUT_RETRY_MS = 20_000;
/** Risk cookies that go stale and must be re-minted by the SPA (never seed on force warm). */
const ADOBE_RISK_COOKIE_NAMES = new Set([
  "fortertoken",
  "forter",
  "arkose",
  "sherlocktoken",
  "x-arp-session-id",
]);

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

/**
 * Separate queues so a multi-minute background Forter warm cannot block
 * interactive "Sign in with browser" (and vice versa uses different profile dirs).
 */
let interactiveCdpChain: Promise<void> = Promise.resolve();
let backgroundCdpChain: Promise<void> = Promise.resolve();

/** @deprecated test alias — both chains reset together. */
export function __resetAdobeFireflyCdpChainsForTests(): void {
  interactiveCdpChain = Promise.resolve();
  backgroundCdpChain = Promise.resolve();
}

/** True when cookie name is a colligo/Forter risk token (must re-mint, never re-seed stale). */
export function isAdobeRiskCookieName(name: string): boolean {
  return ADOBE_RISK_COOKIE_NAMES.has(
    String(name || "")
      .trim()
      .toLowerCase()
  );
}

/** Epoch ms embedded in forterToken (`…_{ms}__UDF43…`), or 0. */
export function extractAdobeForterTimestampFromValue(value: string): number {
  const f = String(value || "").trim();
  if (!f) return 0;
  let decoded = f;
  try {
    if (/%[0-9A-Fa-f]{2}/.test(decoded)) decoded = decodeURIComponent(decoded);
  } catch {
    /* keep */
  }
  const m = decoded.match(/_(\d{13})__/);
  return m ? Number(m[1]) : 0;
}

/** Drop stale risk cookies from a seed set so force-warm cannot re-inject a dead Forter. */
export function filterSeedCookiesForWarm(
  cookies: Array<{ name: string; value: string; domain?: string; path?: string }>,
  opts?: { dropRiskCookies?: boolean }
): Array<{ name: string; value: string; domain?: string; path?: string }> {
  const dropRisk = opts?.dropRiskCookies !== false;
  return cookies.filter((c) => {
    if (!c?.name || !c?.value) return false;
    if (dropRisk && isAdobeRiskCookieName(c.name)) return false;
    return true;
  });
}

/** Pull a user IMS JWT from sessionStorage-ish JSON / raw blobs. */
export function extractUserJwtFromStorageRaw(raw: string): string {
  const matches = String(raw || "").match(ADOBE_JWT_IN_TEXT_REGEX) || [];
  // Prefer longest user tokens (guest tokens are shorter / rejected by isAdobeUserAccessToken).
  const sorted = [...matches].sort((a, b) => b.length - a.length);
  for (const tok of sorted) {
    if (looksLikeAdobeJwt(tok) && isAdobeUserAccessToken(tok)) return tok;
  }
  return "";
}

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
      // Use node:http — never proxy-patched fetch (see loopbackHttpGetJson).
      const body = await loopbackHttpGetJson<{ webSocketDebuggerUrl?: string }>(
        port,
        "/json/version",
        2000
      );
      if (body?.webSocketDebuggerUrl) {
        return { webSocketDebuggerUrl: body.webSocketDebuggerUrl };
      }
      lastError = "CDP /json/version missing webSocketDebuggerUrl";
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

  send(
    method: string,
    params?: Record<string, unknown>,
    sessionId?: string,
    timeoutMs = 8_000
  ): Promise<unknown> {
    const id = this.nextId++;
    const msg: Record<string, unknown> = { id, method };
    if (params) msg.params = params;
    if (sessionId) msg.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => {
          if (!this.pending.has(id)) return;
          this.pending.delete(id);
          reject(new Error(`CDP timeout after ${timeoutMs}ms: ${method}`));
        },
        Math.max(500, timeoutMs)
      );
      this.pending.set(id, {
        resolve: (v) => {
          clearTimeout(timer);
          resolve(v);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      });
      try {
        this.ws.send(JSON.stringify(msg));
      } catch (err) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  close(): void {
    for (const [id, p] of this.pending) {
      this.pending.delete(id);
      p.reject(new Error("CDP socket closed"));
    }
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
 * Background warm (`waitForRiskRefresh`) REQUIRES a fresher forterToken — never returns
 * the same stale risk cookies as "success" (that caused false 408 recovery loops).
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
  let storageAccessToken = "";
  let capturedArpSessionId = "";
  let latestCookies: CdpCookie[] = [];
  /** Flatten auto-attach page sessions only — do NOT also open page WebSockets (double-attach freezes Chrome: "Debugger paused in another tab"). */
  const pageSessionIds = new Set<string>();
  let browserCdp: CdpSocket | null = null;
  let humanizeDone = false;
  let riskReloadDone = false;
  const requireFreshRisk = Boolean(opts.waitForRiskRefresh);
  // Force warm: after wiping Firefly cookies, any fresh forter (ts within last 10 min) counts.
  // Baseline from seed is only used for interactive partial-wait comparisons.
  const seedForterTs = extractAdobeForterTimestampFromValue(
    [...(opts.seedBrowserCookies || []), ...parseCookieHeader(opts.seedCookie || "")].find(
      (cookie) => cookie.name.toLowerCase() === "fortertoken"
    )?.value || ""
  );
  const baselineForterTs = requireFreshRisk ? 0 : Math.max(seedForterTs, 0);
  const startedAt = Date.now();

  const SPA_JWT_EXPR = `(() => {
          const out = [];
          try {
            for (const key of Object.keys(sessionStorage)) {
              if (!/adobeid_ims_access_token|clio-playground/i.test(key)) continue;
              out.push(sessionStorage.getItem(key) || "");
            }
            if (out.length === 0) {
              for (const key of Object.keys(sessionStorage)) {
                out.push(sessionStorage.getItem(key) || "");
              }
            }
          } catch (e) {}
          return out.join("\\n");
        })()`;

  /** MUST be awaited before other session commands or Google OAuth freezes yellow. */
  const resumeTargetIfNeeded = async (sessionId: string): Promise<void> => {
    if (!browserCdp || !sessionId) return;
    try {
      await browserCdp.send("Runtime.runIfWaitingForDebugger", {}, sessionId);
    } catch {
      /* ignore */
    }
  };

  const setupPageSession = async (sessionId: string): Promise<void> => {
    if (!browserCdp || !sessionId || pageSessionIds.has(sessionId)) {
      // Still resume if re-attached / re-entered waiting state.
      await resumeTargetIfNeeded(sessionId);
      return;
    }
    pageSessionIds.add(sessionId);
    // Order is critical: resume FIRST, then enable domains (never leave waitingForDebugger).
    await resumeTargetIfNeeded(sessionId);
    await browserCdp.send("Network.enable", {}, sessionId).catch(() => undefined);
    await resumeTargetIfNeeded(sessionId);
    // Runtime.enable only for force-warm (sessionStorage/JWT evaluate). Interactive login
    // primarily uses Network Authorization capture; Runtime is enabled on-demand when reading JWT.
    if (requireFreshRisk) {
      await browserCdp.send("Runtime.enable", {}, sessionId).catch(() => undefined);
      await resumeTargetIfNeeded(sessionId);
    }
  };

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
      if (!sessionId || !browserCdp) return;
      if (targetInfo?.type === "page" || targetInfo?.type === "iframe") {
        // Fire-and-forget async setup but resume is first awaited inside setupPageSession.
        void setupPageSession(sessionId).catch(() => undefined);
      } else {
        void resumeTargetIfNeeded(sessionId).catch(() => undefined);
      }
    } else if (method === "Target.detachedFromTarget") {
      const sessionId = String(params.sessionId || "");
      if (sessionId) pageSessionIds.delete(sessionId);
    }
  };

  const readSpaJwtFromSession = async (sessionId: string): Promise<string> => {
    if (!browserCdp || !sessionId) return "";
    try {
      await resumeTargetIfNeeded(sessionId);
      await browserCdp.send("Runtime.enable", {}, sessionId).catch(() => undefined);
      await resumeTargetIfNeeded(sessionId);
      const result = (await browserCdp.send(
        "Runtime.evaluate",
        {
          expression: SPA_JWT_EXPR,
          returnByValue: true,
          awaitPromise: false,
        },
        sessionId
      )) as { result?: { value?: string } };
      return extractUserJwtFromStorageRaw(String(result?.result?.value || ""));
    } catch {
      return "";
    }
  };

  const nudgeForterSession = async (sessionId: string): Promise<void> => {
    if (!browserCdp || !sessionId) return;
    try {
      await resumeTargetIfNeeded(sessionId);
      for (const [x, y] of [
        [140, 180],
        [420, 260],
        [700, 340],
        [520, 420],
      ] as const) {
        await browserCdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }, sessionId);
      }
      await browserCdp.send(
        "Input.dispatchMouseEvent",
        { type: "mousePressed", x: 640, y: 360, button: "left", clickCount: 1 },
        sessionId
      );
      await browserCdp.send(
        "Input.dispatchMouseEvent",
        { type: "mouseReleased", x: 640, y: 360, button: "left", clickCount: 1 },
        sessionId
      );
      await browserCdp.send(
        "Input.dispatchMouseEvent",
        { type: "mouseWheel", x: 400, y: 300, deltaX: 0, deltaY: 240 },
        sessionId
      );
    } catch {
      /* ignore */
    }
  };

  try {
    const browserWs = await openCdp(opts.browserWsUrl);
    browserCdp = new CdpSocket(browserWs, onEvent);
    // Force warm: never re-seed stale forter/arkose/sherlock — SSO cookies only.
    // Interactive sign-in: seed nothing when freshSession emptied the jar; otherwise full seed ok.
    const rawSeed: AdobeBrowserCookie[] = [
      ...(opts.seedBrowserCookies || []),
      ...parseCookieHeader(opts.seedCookie || "").map((cookie) => ({
        ...cookie,
        domain: "firefly.adobe.com",
        path: "/",
        secure: true as const,
      })),
    ];
    const seed: AdobeBrowserCookie[] = (
      requireFreshRisk ? filterSeedCookiesForWarm(rawSeed, { dropRiskCookies: true }) : rawSeed
    ) as AdobeBrowserCookie[];
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
    // Force warm: wipe Firefly origin storage so Forter cannot re-hydrate a hours-old token
    // from cookies/localStorage/IndexedDB. Keep adobelogin.com SSO (AdobeID) intact.
    if (requireFreshRisk) {
      try {
        for (const origin of [
          "https://firefly.adobe.com",
          "https://www.firefly.adobe.com",
          "https://firefly-3p.ff.adobe.io",
        ]) {
          await browserCdp
            .send("Storage.clearDataForOrigin", {
              origin,
              storageTypes:
                "cookies,local_storage,indexeddb,cache_storage,service_workers,shader_cache",
            })
            .catch(() => undefined);
        }
        const existing = (await browserCdp.send("Storage.getCookies")) as {
          cookies?: CdpCookie[];
        };
        for (const cookie of existing?.cookies || []) {
          const domain = String(cookie.domain || "")
            .replace(/^\./, "")
            .toLowerCase();
          const isFireflySite =
            domain === "firefly.adobe.com" ||
            domain.endsWith(".firefly.adobe.com") ||
            domain === "ff.adobe.io" ||
            domain.endsWith(".ff.adobe.io");
          if (!isFireflySite && !isAdobeRiskCookieName(cookie.name)) continue;
          if (domain.includes("adobelogin.com") && !isAdobeRiskCookieName(cookie.name)) continue;
          await browserCdp
            .send("Storage.deleteCookies", {
              name: cookie.name,
              ...(cookie.domain ? { domain: cookie.domain } : { url: FIREFLY_HOME_URL }),
              path: cookie.path || "/",
            })
            .catch(() => undefined);
        }
      } catch {
        /* best-effort */
      }
    }
    // Single browser-level CDP + flatten auto-attach only.
    // NEVER open /json/list page WebSockets (second debugger → yellow "Debugger paused").
    await browserCdp.send("Target.setDiscoverTargets", { discover: true }).catch(() => undefined);
    await browserCdp
      .send("Target.setAutoAttach", {
        autoAttach: true,
        // false = do not start targets paused; still resume defensively on attach.
        waitForDebuggerOnStart: false,
        flatten: true,
      })
      .catch(() => undefined);

    // Existing pages (Chrome already opened firefly URL) are NOT auto-attached as "new"
    // targets — attach once via Target.attachToTarget (still one session, no page WS).
    try {
      const { targetInfos } = (await browserCdp.send("Target.getTargets")) as {
        targetInfos?: Array<{ targetId?: string; type?: string; url?: string }>;
      };
      for (const t of targetInfos || []) {
        if ((t.type !== "page" && t.type !== "iframe") || !t.targetId) continue;
        try {
          const attached = (await browserCdp.send("Target.attachToTarget", {
            targetId: t.targetId,
            flatten: true,
          })) as { sessionId?: string };
          const sid = String(attached?.sessionId || "");
          if (sid) await setupPageSession(sid);
        } catch {
          /* target may vanish */
        }
      }
    } catch {
      /* getTargets may fail briefly */
    }

    const deadline = Date.now() + opts.timeoutMs;
    let lastJwtProbeAt = 0;
    let lastResumeSweepAt = 0;
    while (Date.now() < deadline) {
      const now = Date.now();
      // Resume periodically (not every 400ms spam) — enough to clear accidental waits.
      if (now - lastResumeSweepAt >= 1_500) {
        lastResumeSweepAt = now;
        for (const sid of [...pageSessionIds]) {
          await resumeTargetIfNeeded(sid);
        }
      }

      try {
        const result = (await browserCdp.send("Storage.getCookies")) as {
          cookies?: CdpCookie[];
        };
        if (Array.isArray(result?.cookies)) latestCookies = result.cookies;
      } catch {
        /* retry while Chrome is settling */
      }

      // Pull SPA sessionStorage JWT. Throttle evaluate so interactive Google login stays smooth
      // (network Authorization capture is preferred and does not touch the page).
      if (now - lastJwtProbeAt >= (requireFreshRisk ? 800 : 2_000)) {
        lastJwtProbeAt = now;
        for (const sid of pageSessionIds) {
          const fromStorage = await readSpaJwtFromSession(sid);
          if (fromStorage) {
            storageAccessToken = fromStorage;
            break;
          }
        }
      }

      if (requireFreshRisk && pageSessionIds.size > 0) {
        const elapsedWarm = Date.now() - startedAt;
        // Nudge Forter early, then hard-reload once so SDKs re-mint risk tokens.
        if (!humanizeDone && elapsedWarm >= 2_000) {
          humanizeDone = true;
          for (const sid of pageSessionIds) {
            await nudgeForterSession(sid);
            break;
          }
        } else if (!riskReloadDone && humanizeDone && elapsedWarm >= 12_000) {
          riskReloadDone = true;
          for (const sid of pageSessionIds) {
            await browserCdp.send("Page.reload", { ignoreCache: true }, sid).catch(() => undefined);
            await new Promise((r) => setTimeout(r, 1_500));
            await resumeTargetIfNeeded(sid);
            await nudgeForterSession(sid);
            break;
          }
        }
      }

      const fallbackToken = String(opts.fallbackAccessToken || "").trim();
      const accessToken =
        capturedAccessToken ||
        storageAccessToken ||
        (isAdobeUserAccessToken(fallbackToken) ? fallbackToken : "");
      if (accessToken) {
        const elapsed = Date.now() - startedAt;
        const forter = cookieValue(latestCookies, "forterToken");
        const forterTs = extractAdobeForterTimestampFromValue(forter);
        const forterAgeMs =
          forterTs > 0 ? Math.max(0, Date.now() - forterTs) : Number.POSITIVE_INFINITY;
        const hasRiskCookies = Boolean(
          forter &&
          cookieValue(latestCookies, "ff_session_guid") &&
          (cookieValue(latestCookies, "arkose") || cookieValue(latestCookies, "sherlockToken"))
        );
        // Fresh forter: either newer than baseline, or mint age under 10 minutes (force wipe path).
        const riskAdvanced =
          forterTs > 0 &&
          (baselineForterTs <= 0
            ? forterAgeMs < 10 * 60_000
            : forterTs > baselineForterTs || forterAgeMs < 10 * 60_000);

        if (!requireFreshRisk) {
          // Interactive Sign in: colligo 408s if we store JWT without forter/arkose/sherlock.
          // Prefer a full risk cookie jar (browser works when these are present). Soft-wait
          // up to 45s after JWT — WinUI login already allows minutes for OAuth.
          if (hasRiskCookies && riskAdvanced) {
            return {
              accessToken,
              cookies: latestCookies,
              arpSessionId: capturedArpSessionId,
            };
          }
          // Last resort: JWT only after 45s (generate will likely 408 until risk cookies exist).
          if (elapsed >= 45_000) {
            return {
              accessToken,
              cookies: latestCookies,
              arpSessionId: capturedArpSessionId,
            };
          }
        } else {
          const minWaitMs = 8_000;
          if (hasRiskCookies && elapsed >= minWaitMs && riskAdvanced) {
            return {
              accessToken,
              cookies: latestCookies,
              arpSessionId: capturedArpSessionId,
            };
          }
        }
      }

      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }

    // Force warm timed out without a fresher forter → hard fail (caller retries / surfaces error).
    // IMPORTANT: baselineForterTs===0 must NOT accept any timestamped forter — require age < 10 min
    // (or strictly newer than baseline). Old bug accepted 20h-old forter and colligo 408'd.
    if (requireFreshRisk) {
      const forter = cookieValue(latestCookies, "forterToken");
      const forterTs = extractAdobeForterTimestampFromValue(forter);
      const forterAgeMs =
        forterTs > 0 ? Math.max(0, Date.now() - forterTs) : Number.POSITIVE_INFINITY;
      const riskAdvanced =
        forterTs > 0 &&
        (baselineForterTs <= 0
          ? forterAgeMs < 10 * 60_000
          : forterTs > baselineForterTs || forterAgeMs < 10 * 60_000);
      if (!riskAdvanced) {
        throw new Error(
          "Adobe Firefly risk session did not refresh (forterToken stale). " +
            "Re-open Sign in with browser once, or wait and retry generate."
        );
      }
      const token =
        capturedAccessToken ||
        storageAccessToken ||
        (isAdobeUserAccessToken(String(opts.fallbackAccessToken || "").trim())
          ? String(opts.fallbackAccessToken).trim()
          : "");
      if (token) {
        return {
          accessToken: token,
          cookies: latestCookies,
          arpSessionId: capturedArpSessionId,
        };
      }
    }

    const fallbackRaw = String(opts.fallbackAccessToken || "").trim();
    const fallback = isAdobeUserAccessToken(fallbackRaw) ? fallbackRaw : "";
    if (fallback && latestCookies.length > 0 && !requireFreshRisk) {
      return {
        accessToken: capturedAccessToken || storageAccessToken || fallback,
        cookies: latestCookies,
        arpSessionId: capturedArpSessionId,
      };
    }
    throw new Error(
      "Adobe Firefly sign-in timed out. Complete sign-in at firefly.adobe.com and trigger an action " +
        "(open Generate) so the browser sends the Firefly request, then try again."
    );
  } finally {
    pageSessionIds.clear();
    browserCdp?.close();
  }
}

function killProcessTree(child: ChildProcess | null): void {
  if (!child?.pid) return;
  const pid = child.pid;
  // Never taskkill our own Node/pkg process or its parent (would kill the backend mid-login).
  if (pid === process.pid || (typeof process.ppid === "number" && pid === process.ppid)) {
    return;
  }
  try {
    if (process.platform === "win32") {
      // /T kills only this PID's descendants — not system Chrome profiles we did not spawn.
      const killer = spawn("taskkill", ["/pid", String(pid), "/T", "/F"], {
        stdio: "ignore",
        windowsHide: true,
        detached: true,
      });
      killer.unref?.();
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

/**
 * Background cookie/JWT refresh visibility.
 *
 * Default = **offscreen headed** (window parked off-display + minimized + windowsHide).
 * True `--headless=new` mints Forter/ARP risk sessions colligo rejects → HTTP 408 on
 * generate while a normal browser still works. Only opt into true headless with
 * ADOBE_FIREFLY_CHROME_HEADLESS=1 (known-broken for media; debug only).
 */
export function adobeFireflyBackgroundUsesHeadlessChrome(): boolean {
  return process.env.ADOBE_FIREFLY_CHROME_HEADLESS === "1";
}

export function buildAdobeFireflyBrowserArgs(opts: {
  port: number;
  userDataDir: string;
  interactive: boolean;
  freshSession?: boolean;
}): string[] {
  const interactive = opts.interactive === true;
  // Interactive "Sign in with browser" = real headed UI. Everything else = headless
  // (or rare opt-in offscreen headed) so image gen / 408 recovery never pops a window.
  const backgroundHeadless = !interactive && adobeFireflyBackgroundUsesHeadlessChrome();

  return [
    `--remote-debugging-port=${opts.port}`,
    // Force loopback bind so waitForCdpReady (node:http → 127.0.0.1) can connect.
    "--remote-debugging-address=127.0.0.1",
    // Chrome 111+ may refuse CDP HTTP (/json/version) without an allow-list.
    "--remote-allow-origins=*",
    `--user-data-dir=${opts.userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    // NOTE: do NOT use --incognito here. Unique user-data-dir already isolates the
    // session; incognito + remote-debugging is flaky on recent Chrome (CDP port
    // never binds → ECONNREFUSED while a chrome.exe process still exists).
    ...(interactive
      ? [
          // Prevent attaching to an existing Chrome instance (would drop remote-debugging).
          "--new-window",
          "--window-size=1280,800",
        ]
      : backgroundHeadless
        ? [
            // Silent cookie/JWT warm — ZERO visible window (user requirement).
            "--headless=new",
            "--disable-gpu",
            "--window-size=1280,800",
          ]
        : [
            // Rare Forter debug: headed but parked far off-screen + minimized.
            "--window-position=-32000,-32000",
            "--window-size=1280,800",
            "--start-minimized",
          ]),
    // Start on Firefly so risk SDKs load (especially important for background warm).
    FIREFLY_HOME_URL,
  ];
}

/**
 * Launch system Chrome/Edge at firefly.adobe.com, intercept firefly-3p
 * Authorization Bearer via CDP, return JWT + useful cookies.
 *
 * IMPORTANT: never mass-kill system Chrome via WMI/PowerShell from this path —
 * that wedged the packaged backend event loop and made login show
 * "VibeProxy backend is not ready for Adobe Firefly sign-in."
 * Only kill the child we spawn (killProcessTree in finally / retry).
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
    // Isolate interactive sign-in profiles so a prior hung CDP instance cannot lock the dir.
    // freshSession uses a per-attempt suffix; background warm keeps the stable key for SSO reuse.
    const launchUserDataDir =
      opts.interactive && opts.freshSession !== false
        ? `${userDataDir}-login-${Date.now().toString(36)}`
        : userDataDir;
    try {
      mkdirSync(launchUserDataDir, { recursive: true });
    } catch {
      /* parent resolve already mkdir'd base */
    }

    let lastError = "Browser failed to start";
    for (let launchAttempt = 1; launchAttempt <= 2; launchAttempt++) {
      if (child) {
        killProcessTree(child);
        child = null;
        await new Promise((r) => setTimeout(r, 300));
      }
      const port = await getFreeLoopbackPort();
      // Unique profile per launch attempt so a half-dead previous Chrome cannot lock the dir.
      const attemptUserDataDir =
        opts.interactive && opts.freshSession !== false
          ? `${launchUserDataDir}-a${launchAttempt}`
          : launchUserDataDir;
      try {
        mkdirSync(attemptUserDataDir, { recursive: true });
      } catch {
        /* best-effort */
      }
      const args = buildAdobeFireflyBrowserArgs({
        port,
        userDataDir: attemptUserDataDir,
        interactive: opts.interactive,
        freshSession: opts.freshSession,
      });

      // Interactive: keep attached (reliable CDP bind on Windows). Background warm may
      // detach so a long Forter wait does not pin the Node process refcount.
      // Host job SILENT_BREAKAWAY_OK still prevents Chrome from joining the backend job
      // (that was killing/wedging VibeProxyServices on Sign in with browser).
      child = spawn(browserPath, args, {
        stdio: "ignore",
        // Interactive sign-in: show Chrome. Background warm: hide spawn console/window
        // host; headless flags already suppress the browser UI.
        windowsHide: !opts.interactive,
        detached: !opts.interactive,
      });
      if (!opts.interactive) {
        try {
          child.unref?.();
        } catch {
          /* ignore */
        }
      }

      let exitedEarly = false;
      let exitCode: number | null = null;
      const onExit = (code: number | null) => {
        exitedEarly = true;
        exitCode = code;
      };
      const onErr = (err: Error) => {
        exitedEarly = true;
        lastError = `Failed to launch browser: ${err.message}`;
      };
      // Attach listeners BEFORE any delay so we never miss a fast exit.
      child.once("exit", onExit);
      child.once("error", onErr);
      // Give Chrome a beat to bind --remote-debugging-port before the first CDP probe.
      await new Promise((r) => setTimeout(r, 600));
      if (exitedEarly) {
        lastError = `Browser exited early (code ${exitCode}). Retrying…`;
        opts.log?.warn?.("ADOBE-FIREFLY", lastError);
        continue;
      }

      try {
        const cdpWaitMs = launchAttempt === 1 ? CDP_READY_TIMEOUT_MS : CDP_READY_TIMEOUT_RETRY_MS;
        const { webSocketDebuggerUrl } = await waitForCdpReady(port, cdpWaitMs);
        if (exitedEarly) {
          lastError = `Browser exited early (code ${exitCode}). Retrying…`;
          continue;
        }
        child.removeListener("exit", onExit);
        child.removeListener("error", onErr);

        opts.log?.info?.(
          "ADOBE-FIREFLY",
          opts.interactive
            ? "Chrome ready — complete Adobe/Google sign-in in the window (do not close it)"
            : "headless CDP warm attached"
        );

        // Interactive: capture JWT as soon as firefly-3p auth is seen. Soft-wait for risk
        // cookies is handled inside captureViaCdp; do NOT force risk refresh for interactive
        // (that blocked login when Forter did not advance).
        const captured = await captureViaCdp({
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
        });

        const cookie = buildAdobeFireflyCookieHeader(captured.cookies);
        // Persist risk cookies under the stable session key (not the -login- temp dir).
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
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        if (launchAttempt < 2) {
          opts.log?.warn?.(
            "ADOBE-FIREFLY",
            `Chrome CDP launch attempt ${launchAttempt} failed: ${lastError}; retrying…`
          );
          continue;
        }
        break;
      }
    }
    return {
      success: false,
      error: sanitizeErrorMessage(lastError),
    };
  } catch (error) {
    return {
      success: false,
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    };
  } finally {
    // Interactive sign-in: leave the window open briefly is not possible after return —
    // we must kill the CDP-debug Chrome we spawned (it is a dedicated profile instance).
    // Only our child PID tree is killed — never a system-wide Chrome sweep.
    killProcessTree(child);
    child = null;
  }
}

export async function startAdobeFireflyBrowserLogin(
  requestedTimeout?: unknown,
  opts?: { sessionKey?: string; freshSession?: boolean }
): Promise<AdobeFireflyBrowserLoginResult> {
  // Interactive queue is independent of background warm — long 408 recovery must not
  // prevent "Sign in with browser" from launching Chrome.
  const run = interactiveCdpChain.then(() =>
    runAdobeFireflyCdpBrowser({
      timeoutMs: clampAdobeFireflyLoginTimeout(requestedTimeout),
      interactive: true,
      sessionKey: String(opts?.sessionKey || "legacy-default"),
      freshSession: opts?.freshSession !== false,
    })
  );
  interactiveCdpChain = run.then(
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
  const run = backgroundCdpChain.then(async () => {
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
    if (!result.success || !accessToken || !cookie) {
      opts.log?.warn?.(
        "ADOBE-FIREFLY",
        `CDP background refresh incomplete: ${result.error || "missing token/cookie"}`
      );
      return null;
    }
    return {
      accessToken,
      cookie,
      arpSessionId: String(result.arpSessionId || "").trim(),
    };
  });
  backgroundCdpChain = run.then(
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
