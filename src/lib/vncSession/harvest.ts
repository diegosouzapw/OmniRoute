/**
 * vncSession cookie harvester.
 *
 * Connects to the VNC container's browser via the DevTools Protocol and reads
 * the live cookie jar for the target origin plus any localStorage bearer/token
 * values, then returns a normalized structure the session service writes back
 * into `provider_connections`.
 *
 * The default container image (jlesage/firefox) exposes the remote-debugging
 * port on 0.0.0.0, so the harvester talks to the plain host-published CDP port.
 * With a Chromium-based image (Chrome ≥130 forces the debugger to 127.0.0.1) an
 * in-container TCP bridge is required to republish it — see docker/README.
 *
 * We use a raw WebSocket (`ws`, a dependency OmniRoute already ships) instead
 * of Playwright's CDP client: Playwright's connectOverCDP transport can hang
 * when tunneled through a simple TCP bridge, whereas raw CDP over a single
 * WebSocket works reliably.
 */

import WebSocket from "ws";
import type { VncProviderEntry } from "./manifest";

export interface HarvestResult {
  cookies: Array<{ name: string; value: string; domain: string; path: string }>;
  localStorage: Record<string, string>;
  cookieHeader: string;
  hasCredential: boolean;
}

interface Pending {
  res: (v: any) => void;
  rej: (e: any) => void;
}

class CdpClient {
  private ws: WebSocket;
  private nextId = 1;
  private pending = new Map<number, Pending>();
  private sessionId: string | null = null;

  constructor(wsUrl: string) {
    this.ws = new WebSocket(wsUrl);
    this.ws.on("message", (d) => this.onMessage(d));
  }

  ready(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws.on("open", () => resolve());
      this.ws.on("error", (e) => reject(e));
      const to = setTimeout(() => reject(new Error("cdp open timeout")), 15_000);
      this.ws.on("open", () => clearTimeout(to));
    });
  }

  private onMessage(d: WebSocket.RawData) {
    let msg: any;
    try {
      msg = JSON.parse(d.toString());
    } catch {
      return;
    }
    if (msg.id && this.pending.has(msg.id)) {
      const p = this.pending.get(msg.id)!;
      this.pending.delete(msg.id);
      msg.error ? p.rej(new Error(msg.error.message)) : p.res(msg.result);
    }
  }

  send(method: string, params: Record<string, any> = {}, sessionId?: string): Promise<any> {
    return new Promise((res, rej) => {
      const id = this.nextId++;
      this.pending.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  async attachToPage(): Promise<void> {
    const { targetInfos } = await this.send("Target.getTargets");
    const page = (targetInfos || []).find((t: any) => t.type === "page") || targetInfos?.[0];
    if (!page) throw new Error("no page target in browser");
    const { sessionId } = await this.send("Target.attachToTarget", {
      targetId: page.targetId,
      flatten: true,
    });
    this.sessionId = sessionId;
  }

  async getCookies(): Promise<any[]> {
    const r = await this.send("Network.getCookies", {}, this.sessionId!);
    return r.cookies || [];
  }

  async getLocalStorage(): Promise<Record<string, string>> {
    try {
      const r = await this.send(
        "Runtime.evaluate",
        { expression: "JSON.stringify(Object.fromEntries(Object.entries(localStorage)))" },
        this.sessionId!
      );
      const raw = r?.result?.result?.value;
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  close(): void {
    try {
      this.ws.close();
    } catch {
      /* noop */
    }
  }
}

/**
 * Harvest cookies + tokens from a running VNC container's Chromium.
 * @param cdpPort  Host port the container maps 9223 → (bridged CDP).
 * @param provider Provider manifest entry (url + cookieNames + kind).
 */
export async function harvestFromContainer(
  cdpPort: number,
  provider: VncProviderEntry,
  timeoutMs = 20_000
): Promise<HarvestResult> {
  const version = await fetchJson(`http://127.0.0.1:${cdpPort}/json/version`);
  const browserWs = version.webSocketDebuggerUrl;
  if (!browserWs) throw new Error("no CDP websocket endpoint from container");
  const client = new CdpClient(browserWs);
  await client.ready();
  try {
    await client.attachToPage();
    const cookiesRaw = await client.getCookies();
    const localStorage = await client.getLocalStorage();
    client.close();

    const origin = new URL(provider.url).origin;
    const cookies = cookiesRaw
      .filter((c: any) => domainMatches(c.domain, origin))
      .map((c: any) => ({ name: c.name, value: c.value, domain: c.domain, path: c.path }));

    const cookieHeader = cookies.length
      ? cookies.map((c) => `${c.name}=${c.value}`).join("; ")
      : "";

    const hasCredential =
      provider.kind === "token"
        ? Object.keys(localStorage).length > 0 ||
          cookies.some((c) => ["access_token", "userToken", "token"].includes(c.name))
        : cookieHeader.length > 0;

    return { cookies, localStorage, cookieHeader, hasCredential };
  } finally {
    client.close();
  }
}

function fetchJson(url: string): Promise<any> {
  // Node 22 global fetch.
  return fetch(url).then((r) => r.json());
}

function domainMatches(cookieDomain: string, origin: string): boolean {
  try {
    const o = new URL(origin);
    const host = o.host;
    const d = cookieDomain.startsWith(".") ? cookieDomain.slice(1) : cookieDomain;
    return host === d || host.endsWith("." + d);
  } catch {
    return false;
  }
}

/**
 * Convert a HarvestResult into the { providerSpecificData, apiKey } the
 * provider_connections row expects, per the provider's credential kind.
 */
export function harvestToCredentials(
  harvest: HarvestResult,
  provider: VncProviderEntry
): { providerSpecificData: Record<string, string>; apiKey: string | null } {
  const psd: Record<string, string> = {};

  if (provider.kind === "token") {
    const tokenKey =
      provider.cookieNames.find((n) => harvest.localStorage[n]) ||
      harvest.cookies.find((c) => ["access_token", "userToken", "token"].includes(c.name))?.name;
    const tokenVal =
      (tokenKey && harvest.localStorage[tokenKey]) ||
      harvest.cookies.find((c) => ["access_token", "userToken", "token"].includes(c.name))?.value ||
      "";
    if (tokenVal) psd.token = tokenVal;
    for (const [k, v] of Object.entries(harvest.localStorage)) psd[k] = v;
    return { providerSpecificData: psd, apiKey: tokenVal || null };
  }

  for (const c of harvest.cookies) {
    if (provider.cookieNames.length === 0 || provider.cookieNames.includes(c.name)) {
      psd[c.name] = c.value;
    }
  }
  if (harvest.cookieHeader) psd.cookie = harvest.cookieHeader;
  return { providerSpecificData: psd, apiKey: null };
}
