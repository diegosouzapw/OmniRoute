import WebSocket from "ws";
import type { VncProviderEntry } from "./manifest";

export interface HarvestCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}

export interface HarvestResult {
  cookies: HarvestCookie[];
  /** Declared values discovered in localStorage, sessionStorage, or page URLs. */
  localStorage: Record<string, string>;
  /** Full Cookie header for the provider origin, only when the canonical contract allows it. */
  cookieHeader: string;
  hasCredential: boolean;
}

interface Pending {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  cleanup: () => void;
}

export interface CdpTargetInfo {
  targetId: string;
  type: string;
  url?: string;
}

class CdpClient {
  private readonly ws: WebSocket;
  private nextId = 1;
  private readonly pending = new Map<number, Pending>();
  private sessionId: string | null = null;
  private closed = false;

  constructor(wsUrl: string) {
    this.ws = new WebSocket(wsUrl);
    this.ws.on("message", (data) => this.onMessage(data));
    this.ws.on("close", () => this.rejectAll(new Error("CDP websocket closed")));
    this.ws.on("error", (error) => this.rejectAll(toError(error, "CDP websocket error")));
  }

  ready(timeoutMs = 15_000, signal?: AbortSignal): Promise<void> {
    if (this.ws.readyState === WebSocket.OPEN) return Promise.resolve();
    if (this.ws.readyState === WebSocket.CLOSING || this.ws.readyState === WebSocket.CLOSED) {
      return Promise.reject(new Error("CDP websocket is closed"));
    }

    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (error?: Error) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (error) reject(error);
        else resolve();
      };
      const onOpen = () => finish();
      const onError = (error: Error) => finish(toError(error, "CDP websocket error"));
      const onAbort = () => {
        this.close();
        finish(new Error("CDP connection aborted"));
      };
      const timer = setTimeout(() => {
        this.close();
        finish(new Error("CDP open timeout"));
      }, timeoutMs);
      const cleanup = () => {
        clearTimeout(timer);
        this.ws.off("open", onOpen);
        this.ws.off("error", onError);
        signal?.removeEventListener("abort", onAbort);
      };

      this.ws.once("open", onOpen);
      this.ws.once("error", onError);
      if (signal) {
        if (signal.aborted) onAbort();
        else signal.addEventListener("abort", onAbort, { once: true });
      }
    });
  }

  private onMessage(data: WebSocket.RawData): void {
    let message: any;
    try {
      message = JSON.parse(data.toString());
    } catch {
      return;
    }

    if (typeof message.id !== "number") return;
    const pending = this.pending.get(message.id);
    if (!pending) return;

    this.pending.delete(message.id);
    pending.cleanup();
    if (message.error) {
      pending.reject(new Error(message.error.message || "CDP command failed"));
    } else {
      pending.resolve(message.result);
    }
  }

  private rejectAll(error: Error): void {
    for (const [id, pending] of this.pending) {
      this.pending.delete(id);
      pending.cleanup();
      pending.reject(error);
    }
  }

  send(
    method: string,
    params: Record<string, unknown> = {},
    sessionId?: string,
    timeoutMs = 10_000,
    signal?: AbortSignal
  ): Promise<any> {
    if (this.ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error("CDP websocket is not open"));
    }

    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      let settled = false;
      const finishReject = (error: Error) => {
        if (settled) return;
        settled = true;
        this.pending.delete(id);
        cleanup();
        reject(error);
      };
      const onAbort = () => finishReject(new Error(`CDP command aborted: ${method}`));
      const timer = setTimeout(
        () => finishReject(new Error(`CDP command timed out: ${method}`)),
        timeoutMs
      );
      const cleanup = () => {
        clearTimeout(timer);
        signal?.removeEventListener("abort", onAbort);
      };

      this.pending.set(id, {
        resolve: (value) => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve(value);
        },
        reject: finishReject,
        cleanup,
      });

      if (signal) {
        if (signal.aborted) {
          onAbort();
          return;
        }
        signal.addEventListener("abort", onAbort, { once: true });
      }

      try {
        this.ws.send(
          JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }),
          (error) => {
            if (error) finishReject(toError(error, `Failed to send CDP command: ${method}`));
          }
        );
      } catch (error) {
        finishReject(toError(error, `Failed to send CDP command: ${method}`));
      }
    });
  }

  async attachToPage(targetOrigin: string, signal?: AbortSignal): Promise<void> {
    const { targetInfos } = await this.send("Target.getTargets", {}, undefined, 10_000, signal);
    const page = selectPageTarget(targetInfos || [], targetOrigin);
    const { sessionId } = await this.send(
      "Target.attachToTarget",
      { targetId: page.targetId, flatten: true },
      undefined,
      10_000,
      signal
    );
    this.sessionId = sessionId;
  }

  async getCookies(url: string, signal?: AbortSignal): Promise<any[]> {
    if (!this.sessionId) throw new Error("CDP page target is not attached");
    const result = await this.send(
      "Network.getCookies",
      { urls: [url] },
      this.sessionId,
      10_000,
      signal
    );
    return result.cookies || [];
  }

  async getDeclaredStorage(
    keys: readonly string[],
    signal?: AbortSignal
  ): Promise<Record<string, string>> {
    if (!this.sessionId) throw new Error("CDP page target is not attached");

    const expression = `(() => {
      const keys = ${JSON.stringify([...keys])};
      const out = {};
      for (const store of [window.localStorage, window.sessionStorage]) {
        for (const key of keys) {
          const value = store.getItem(key);
          if (typeof value === "string" && value.length > 0) out[key] = value;
        }
      }
      const urls = [window.location.href, ...performance.getEntriesByType("resource").map((e) => e.name)];
      for (const raw of urls) {
        try {
          const url = new URL(raw, window.location.href);
          for (const key of keys) {
            const value = url.searchParams.get(key);
            if (value && !out[key]) out[key] = value;
          }
        } catch {}
      }
      return out;
    })()`;

    const result = await this.send(
      "Runtime.evaluate",
      { expression, returnByValue: true },
      this.sessionId,
      10_000,
      signal
    );
    const value = result?.result?.value;
    return value && typeof value === "object" ? value : {};
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    this.rejectAll(new Error("CDP client closed"));
    try {
      this.ws.close();
    } catch {
      // Best-effort close.
    }
  }
}

export async function waitForCdpReady(cdpPort: number, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let lastError: Error | null = null;

  while (Date.now() < deadline) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2_000);
    try {
      const version = await fetchJson(`http://127.0.0.1:${cdpPort}/json/version`, controller.signal);
      if (version?.webSocketDebuggerUrl) return;
      lastError = new Error("CDP endpoint did not return a websocket URL");
    } catch (error) {
      lastError = toError(error, "CDP endpoint is not ready");
    } finally {
      clearTimeout(timer);
    }
    await delay(500);
  }

  throw new Error(`Browser did not become ready: ${lastError?.message || "CDP timeout"}`);
}

export async function harvestFromContainer(
  cdpPort: number,
  provider: VncProviderEntry,
  timeoutMs = 20_000
): Promise<HarvestResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let client: CdpClient | null = null;

  try {
    const version = await fetchJson(
      `http://127.0.0.1:${cdpPort}/json/version`,
      controller.signal
    );
    const debuggerUrl = version?.webSocketDebuggerUrl;
    if (typeof debuggerUrl !== "string" || !debuggerUrl) {
      throw new Error("No CDP websocket endpoint from browser container");
    }

    client = new CdpClient(rewriteDebuggerUrl(debuggerUrl, cdpPort));
    await client.ready(Math.min(timeoutMs, 15_000), controller.signal);

    const origin = new URL(provider.url).origin;
    await client.attachToPage(origin, controller.signal);
    const [cookiesRaw, declaredStorage] = await Promise.all([
      client.getCookies(provider.url, controller.signal),
      client.getDeclaredStorage(provider.requirement.storageKeys, controller.signal),
    ]);

    const cookies = cookiesRaw
      .filter((cookie: any) => domainMatches(cookie.domain, origin))
      .map((cookie: any) => ({
        name: String(cookie.name || ""),
        value: String(cookie.value || ""),
        domain: String(cookie.domain || ""),
        path: String(cookie.path || "/"),
      }))
      .filter((cookie: HarvestCookie) => cookie.name.length > 0 && cookie.value.length > 0);

    const cookieHeader = provider.requirement.acceptsFullCookieHeader
      ? cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ")
      : "";

    const baseResult: HarvestResult = {
      cookies,
      localStorage: declaredStorage,
      cookieHeader,
      hasCredential: false,
    };
    const credentials = harvestToCredentials(baseResult, provider);
    const hasCredential =
      typeof credentials.apiKey === "string" ||
      Object.values(credentials.providerSpecificData).some(
        (value) => typeof value === "string" && value.length > 0
      );

    return { ...baseResult, hasCredential };
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`Browser credential harvest timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
    client?.close();
  }
}

export function harvestToCredentials(
  harvest: HarvestResult,
  provider: VncProviderEntry
): { providerSpecificData: Record<string, string>; apiKey: string | null } {
  const requirement = provider.requirement;
  const providerSpecificData: Record<string, string> = {};

  for (const key of requirement.storageKeys) {
    if (key === "cookie") continue;
    const value =
      harvest.localStorage[key] || harvest.cookies.find((cookie) => cookie.name === key)?.value;
    if (value) providerSpecificData[key] = value;
  }

  if (requirement.kind === "token") {
    const tokenValue =
      requirement.storageKeys.map((key) => providerSpecificData[key]).find(Boolean) || null;
    if (tokenValue && requirement.storageKeys.includes("token")) {
      providerSpecificData.token = tokenValue;
    }
    return { providerSpecificData, apiKey: tokenValue };
  }

  if (
    requirement.acceptsFullCookieHeader &&
    requirement.storageKeys.includes("cookie") &&
    harvest.cookieHeader
  ) {
    providerSpecificData.cookie = harvest.cookieHeader;
  }

  return { providerSpecificData, apiKey: null };
}

export function rewriteDebuggerUrl(debuggerUrl: string, cdpPort: number): string {
  const url = new URL(debuggerUrl);
  url.protocol = "ws:";
  url.hostname = "127.0.0.1";
  url.port = String(cdpPort);
  return url.toString();
}

export function selectPageTarget(
  targetInfos: CdpTargetInfo[],
  targetOrigin: string
): CdpTargetInfo {
  const pages = targetInfos.filter((target) => target.type === "page");
  const matching = pages.find((target) => safeOrigin(target.url) === targetOrigin);
  if (matching) return matching;
  throw new Error(`No browser page is open for ${targetOrigin}`);
}

function safeOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

async function fetchJson(url: string, signal: AbortSignal): Promise<any> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`CDP endpoint returned HTTP ${response.status}`);
  return response.json();
}

function domainMatches(cookieDomain: string, origin: string): boolean {
  try {
    const host = new URL(origin).hostname;
    const domain = cookieDomain.startsWith(".") ? cookieDomain.slice(1) : cookieDomain;
    return host === domain || host.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toError(error: unknown, fallback: string): Error {
  if (error instanceof Error) return error;
  return new Error(typeof error === "string" && error ? error : fallback);
}
