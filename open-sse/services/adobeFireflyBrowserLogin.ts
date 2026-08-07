/**
 * Adobe Firefly browser login (packaged-backend safe).
 *
 * Firefly needs an Adobe IMS access_token JWT (Bearer) issued for
 * client_id `clio-playground-web`. That JWT is NEVER present in
 * cookies/localStorage тАФ the SPA only holds it in memory and attaches it
 * as `Authorization: Bearer <jwt>` on XHRs to firefly-3p.ff.adobe.io.
 *
 * IMPORTANT: The VibeProxyServices.exe is a pkg-packaged Node binary.
 * Dynamic `import("playwright")` fails there (native bindings / browsers
 * are not in the package). This module launches the **system** Chrome or
 * Edge with `--remote-debugging-port` and talks pure Chrome DevTools
 * Protocol over WebSocket тАФ zero Playwright dependency.
 */
import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
  /** Best-effort Adobe account label (email or user id) decoded from the JWT. */
  account?: string;
  error?: string;
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
  const wanted = ["sherlockToken", "forterToken", "aux_sid", "ff_session_guid"];
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

/** Best-effort account label from an IMS JWT payload. Exported for unit tests. */
export function accountLabelFromAdobeJwt(token: string): string {
  try {
    const part = String(token || "").split(".")[1];
    if (!part) return "";
    const json = Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const obj = JSON.parse(json) as Record<string, unknown>;
    for (const key of ["email", "preferred_username", "user_id", "sub"]) {
      const v = obj[key];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  } catch {
    // ignore
  }
  return "";
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

type CdpCookie = { name: string; value: string; domain?: string };

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
}): Promise<{ accessToken: string; cookies: CdpCookie[] }> {
  let capturedAccessToken = "";
  const pageSockets = new Map<string, CdpSocket>();
  let browserCdp: CdpSocket | null = null;

  const onEvent = (method: string, params: Record<string, unknown>) => {
    if (method === "Network.requestWillBeSent") {
      if (capturedAccessToken) return;
      const request = params.request as
        { url?: string; headers?: Record<string, string> } | undefined;
      if (!request?.url) return;
      let host: string;
      try {
        host = new URL(request.url).hostname.toLowerCase();
      } catch {
        return;
      }
      if (host !== FIREFLY_3P_HOST_SUFFIX && !host.endsWith(`.${FIREFLY_3P_HOST_SUFFIX}`)) return;
      const headers = request.headers || {};
      const auth = headers.Authorization || headers.authorization || headers.AUTHORIZATION || "";
      const token = extractAdobeBearerTokenFromAuthorization(auth);
      if (token) capturedAccessToken = token;
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
            if (!t.url || t.url === "about:blank" || t.url.startsWith("chrome://")) {
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

      if (capturedAccessToken) {
        // Prefer cookies from any live page socket; fall back to empty.
        for (const cdp of pageSockets.values()) {
          if (!cdp.open) continue;
          try {
            const result = (await cdp.send("Network.getAllCookies")) as {
              cookies?: CdpCookie[];
            };
            return {
              accessToken: capturedAccessToken,
              cookies: Array.isArray(result?.cookies) ? result.cookies : [],
            };
          } catch {
            /* try next */
          }
        }
        return { accessToken: capturedAccessToken, cookies: [] };
      }

      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
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

/**
 * Launch system Chrome/Edge at firefly.adobe.com, intercept firefly-3p
 * Authorization Bearer via CDP, return JWT + useful cookies.
 */
export async function startAdobeFireflyBrowserLogin(
  requestedTimeout?: unknown
): Promise<AdobeFireflyBrowserLoginResult> {
  const timeout = clampAdobeFireflyLoginTimeout(requestedTimeout);
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

  let userDataDir: string | null = null;
  let child: ChildProcess | null = null;
  try {
    userDataDir = mkdtempSync(join(tmpdir(), "omniroute-firefly-login-"));
    const port = await getFreeLoopbackPort();

    const args = [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-sync",
      "--disable-background-networking",
      "--window-size=1280,800",
      FIREFLY_HOME_URL,
    ];

    child = spawn(browserPath, args, {
      stdio: "ignore",
      windowsHide: false,
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
        timeoutMs: timeout,
      }),
      earlyExit,
    ]);

    const cookie = buildAdobeFireflyCookieHeader(captured.cookies);
    const account = accountLabelFromAdobeJwt(captured.accessToken);
    return {
      success: true,
      credentials: {
        accessToken: captured.accessToken,
        ...(cookie ? { cookie } : {}),
      },
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
    if (userDataDir) {
      // Give Chrome a moment to release the profile directory.
      await new Promise((r) => setTimeout(r, 300));
      try {
        rmSync(userDataDir, { recursive: true, force: true });
      } catch {
        // Profile may still be locked; temp cleaner will reclaim later.
      }
    }
  }
}
