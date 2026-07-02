import { createRequire } from "module";
import { getTlsClientTimeoutConfig } from "@/shared/utils/runtimeTimeouts";

const require = createRequire(import.meta.url);

type WreqSession = {
  fetch: (url: string, options?: Record<string, unknown>) => Promise<Response>;
  close: () => Promise<void> | void;
};

type CreateSessionFn = (options: Record<string, unknown>) => Promise<WreqSession>;

let createSession: CreateSessionFn | null;
try {
  const loaded = require("wreq-js") as { createSession?: CreateSessionFn };
  createSession = typeof loaded.createSession === "function" ? loaded.createSession : null;
} catch {
  createSession = null;
}

/**
 * Get proxy URL from environment variables.
 * Priority: HTTPS_PROXY > HTTP_PROXY > ALL_PROXY
 */
function getProxyFromEnv(): string | undefined {
  return (
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.ALL_PROXY ||
    process.env.all_proxy ||
    undefined
  );
}

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
  redirect?: string;
  signal?: AbortSignal;
}

function normalizeHeaders(headers: HeadersInit | undefined): Record<string, string> | undefined {
  if (!headers) return undefined;

  if (headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers.map(([key, value]) => [key, String(value)]));
  }

  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value === "string") {
      normalized[key] = value;
    }
  }
  return normalized;
}

/**
 * TLS Client — Chrome 124 TLS fingerprint spoofing via wreq-js
 * Singleton instance used to disguise Node.js TLS handshake as Chrome browser.
 *
 * wreq-js natively supports proxy — TLS fingerprinting works through proxy.
 * Proxy URL is read from environment variables (HTTPS_PROXY, HTTP_PROXY, ALL_PROXY).
 */
class TlsClient {
  session: WreqSession | null = null;

  private _libraryAvailable: boolean;
  private failureCount: number = 0;
  private maxFailures: number = 3;
  private baseCooldownMs: number = 30_000;
  private cooldownMs: number = 30_000;
  private cooldownMultiplier: number = 1;
  private readonly MAX_COOLDOWN_MS = 600_000; // 10 min
  private circuitOpenUntil: number = 0;
  private circuitTripped: boolean = false;

  constructor() {
    this._libraryAvailable = !!createSession;
  }

  get available(): boolean {
    if (!this._libraryAvailable) return false;
    if (!this.circuitTripped) return true;
    return Date.now() >= this.circuitOpenUntil;
  }

  private recordFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.maxFailures) {
      this.circuitOpenUntil = Date.now() + this.cooldownMs;
      this.circuitTripped = true;
      // Close the stale session so the next half-open retry creates a
      // fresh one instead of reusing a broken connection.
      if (this.session) {
        Promise.resolve(this.session.close()).catch(() => {});
        this.session = null;
      }
      console.warn(
        `[TlsClient] Circuit opened after ${this.failureCount} consecutive failures, cooling down for ${this.cooldownMs}ms`
      );
      // Double cooldown for the next trip: 30s → 60s → 120s → ... → 10 min max
      this.escalateCooldown();
    }
  }

  private recordSuccess(): void {
    this.failureCount = 0;
    if (this.circuitTripped) {
      this.cooldownMultiplier = 1;
      this.cooldownMs = this.baseCooldownMs;
      console.log("[TlsClient] Circuit closed (success after cooldown)");
      this.circuitTripped = false;
    }
  }

  private escalateCooldown(): void {
    this.cooldownMultiplier = Math.min(this.cooldownMultiplier * 2, 20);
    this.cooldownMs = Math.min(this.baseCooldownMs * this.cooldownMultiplier, this.MAX_COOLDOWN_MS);
  }

  private checkCircuit(): boolean {
    if (!this.circuitTripped) return true;

    if (Date.now() >= this.circuitOpenUntil) {
      console.log("[TlsClient] Half-open: retrying after cooldown");
      // Don't call recordSuccess() here — that would reset failureCount.
      // Instead, let the fetch() call succeed or fail naturally.
      // If it succeeds, recordSuccess() in fetch() handles cleanup.
      // If it fails, recordFailure() finds failureCount still >= maxFailures
      // and re-opens with escalated cooldown.
      return true;
    }

    return false;
  }

  async getSession() {
    if (!this.checkCircuit()) return null;
    if (!this.available) return null;
    if (this.session) return this.session;
    const createSessionFn = createSession;
    if (!createSessionFn) return null;

    const proxy = getProxyFromEnv();
    const sessionOpts: Record<string, unknown> = {
      browser: "chrome_124",
      os: "macos",
    };
    if (proxy) {
      sessionOpts.proxy = proxy;
      console.log(`[TlsClient] Using proxy: ${proxy}`);
    }

    this.session = await createSessionFn(sessionOpts);
    console.log("[TlsClient] Session created (Chrome 124 TLS fingerprint)");
    return this.session;
  }

  /**
   * Fetch with Chrome 124 TLS fingerprint.
   * wreq-js Response is already fetch-compatible (headers, text(), json(), clone(), body).
   */
  async fetch(url: string, options: FetchOptions = {}) {
    if (!this.checkCircuit()) {
      throw new Error("wreq-js circuit open — skipping TLS request");
    }

    try {
      const session = await this.getSession();
      if (!session) throw new Error("wreq-js not available");
      const { timeoutMs } = getTlsClientTimeoutConfig(process.env, (message) => {
        console.warn(`[TlsClient] ${message}`);
      });

      const method = (options.method || "GET").toUpperCase();

      const wreqOptions: Record<string, unknown> = {
        method,
        headers: normalizeHeaders(options.headers),
        body: options.body,
        redirect: options.redirect === "manual" ? "manual" : "follow",
        timeout: timeoutMs,
      };

      if (options.signal) {
        wreqOptions.signal = options.signal;
      }

      const response = await session.fetch(url, wreqOptions);
      this.recordSuccess();
      return response;
    } catch (err) {
      const isAbort =
        err instanceof Error && (err.name === "AbortError" || err.message.includes("aborted"));
      if (!isAbort) {
        this.recordFailure();
      }
      throw err;
    }
  }

  async exit() {
    if (this.session) {
      await this.session.close();
      this.session = null;
    }
  }

  resetCircuit(): void {
    this.failureCount = 0;
    this.circuitTripped = false;
    this.circuitOpenUntil = 0;
  }

  getCircuitState(): {
    available: boolean;
    circuitTripped: boolean;
    failureCount: number;
    circuitOpenUntil: number;
    coolDownRemainingMs: number;
  } {
    return {
      available: this.available,
      circuitTripped: this.circuitTripped,
      failureCount: this.failureCount,
      circuitOpenUntil: this.circuitOpenUntil,
      coolDownRemainingMs:
        this.circuitOpenUntil > 0 ? Math.max(0, this.circuitOpenUntil - Date.now()) : 0,
    };
  }
}

const tlsClient = new TlsClient();

export default tlsClient;
