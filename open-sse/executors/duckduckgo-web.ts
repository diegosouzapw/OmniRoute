import { Buffer } from "node:buffer";
import { generateKeyPairSync, randomUUID } from "node:crypto";
import vm from "node:vm";
import { solveDuckDuckGoChallenge, makeDuckDuckGoFeSignals } from "./duckduckgo-web/challenge.ts";
import {
  DUCKDUCKGO_DEFAULT_MODEL,
  DUCKDUCKGO_MODEL_ALIASES,
  FE_VERSION_PATTERN,
  extractFreeDuckDuckGoModelIds,
  normalizeDuckDuckGoModel,
  pickDuckDuckGoModel,
} from "./duckduckgo-web/models.ts";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";
import type { Session } from "../services/sessionPool/session.ts";
import { tryBackedChat } from "../services/browserBackedChat.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { normalizeSystemRole } from "../services/roleNormalizer.ts";

// Issue #6999: Lightweight circuit breaker for the DuckDuckGo executor.
// After CB_THRESHOLD consecutive failures (429, 5xx, or network errors),
// the breaker "opens" for CB_COOLDOWN_MS — during that window every request
// fast-fails with 503 instead of hammering the upstream. A single success
// resets the failure counter. Half-open probing happens naturally: once the
// cooldown expires the breaker closes and the next request is a real probe.
export const CB_THRESHOLD = 5;
export const CB_COOLDOWN_MS = 30_000;

interface CircuitBreakerState {
  failures: number;
  openedAt: number;
}

const circuitBreaker: CircuitBreakerState = { failures: 0, openedAt: 0 };

export function cbIsOpen(): boolean {
  if (circuitBreaker.openedAt === 0) return false;
  if (Date.now() - circuitBreaker.openedAt >= CB_COOLDOWN_MS) {
    // Cooldown elapsed — half-open: allow the next request through.
    circuitBreaker.openedAt = 0;
    return false;
  }
  return true;
}

export function cbRecordFailure(): void {
  circuitBreaker.failures++;
  if (circuitBreaker.failures >= CB_THRESHOLD && circuitBreaker.openedAt === 0) {
    circuitBreaker.openedAt = Date.now();
    console.warn(
      `[DDG-CB] Circuit breaker opened after ${circuitBreaker.failures} consecutive failures — fast-failing for ${CB_COOLDOWN_MS}ms`
    );
  }
}

export function cbRecordSuccess(): void {
  if (circuitBreaker.failures > 0) {
    circuitBreaker.failures = 0;
  }
}

// Test-only: direct read/write access to the module-level breaker singleton
// so tests can exercise open/half-open/closed transitions without waiting
// CB_COOLDOWN_MS in real time. Not used by production code.
export function __setDdgCircuitBreakerStateForTests(failures: number, openedAt: number): void {
  circuitBreaker.failures = failures;
  circuitBreaker.openedAt = openedAt;
}

export function __getDdgCircuitBreakerStateForTests(): CircuitBreakerState {
  return { ...circuitBreaker };
}

// Primary host moved to https://duck.ai (live-verified 2026-08-26): with the
// same-origin triplet kept consistent (host + Origin + Referer all duck.ai), the
// full status -> challenge -> chat flow returns 200 there, and the challenge solver
// already stamps meta.origin = https://duck.ai, so request host and token origin
// agree by construction. #4037's HTTP 400 came from a MIXED triplet (duck.ai host
// with duckduckgo.com Origin/Referer), not from the duck.ai host itself.
export const DUCKDUCKGO_BASE = "https://duck.ai";
const AUTH_TOKEN_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/auth/token`;
const COUNTRY_URL = `${DUCKDUCKGO_BASE}/country.json`;
export const STATUS_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/status`;
export const CHAT_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/chat`;
// Token-free model list (no VQD/challenge required) used to self-heal catalog drift.
export const MODELS_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/models`;
const DEFAULT_FE_VERSION = "serp_20260424_180649_ET-0bdc33b2a02ebf8f235def65d887787f694720a1";
// Live-served x-fe-version matcher moved to ./duckduckgo-web/models.ts; re-exported
// for existing importers.
export { FE_VERSION_PATTERN };
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

export const FAKE_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  Origin: DUCKDUCKGO_BASE,
  Pragma: "no-cache",
  Referer: `${DUCKDUCKGO_BASE}/`,
  Priority: "u=1, i",
  "Sec-Ch-Ua": '"Chromium";v="149", "Not-A.Brand";v="24", "Google Chrome";v="149"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Linux"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent": DEFAULT_USER_AGENT,
};

const SEEDED_COOKIES: ReadonlyArray<readonly [string, string]> = [
  ["5", "1"],
  ["ah", "wt-wt"],
  ["dcs", "1"],
  ["dcm", "3"],
  ["isRecentChatOn", "1"],
];

// GET /duckchat/v1/models needs no VQD/challenge token; cache it briefly so combo
// fan-out doesn't refetch per request and never counts toward chat rate limits.
const MODEL_IDS_CACHE_TTL_MS = 10 * 60 * 1000;

function shouldUseBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

interface DuckDuckGoVqdHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
  // #6996: the real upstream HTTP status of the VQD-acquisition attempt (null when
  // no request was made / a network error was thrown). Lets execute() distinguish a
  // retryable 429 rate-limit from a genuine 5xx instead of collapsing both to 503.
  status: number | null;
  retryAfter: string | null;
}

interface DuckDuckGoAuthHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
  status: number | null;
  retryAfter: string | null;
}

interface DuckDuckGoModelCapabilities {
  reasoningEffort: string | null;
}

type DuckDuckGoRequestMessage = Record<string, unknown> & {
  role: string;
  content: unknown;
};

let durablePublicKey: JsonWebKey | null = null;

export function normalizeDuckDuckGoMessages(value: unknown): DuckDuckGoRequestMessage[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((message) => {
    if (!message || typeof message !== "object" || Array.isArray(message)) return [];
    const record = message as Record<string, unknown>;
    if (typeof record.role !== "string") return [];
    return [{ ...record, role: record.role, content: record.content }];
  });
}

function extractDuckDuckGoContent(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const record = data as Record<string, unknown>;
  const content = record.content;
  if (typeof content === "string") return content;
  const message = record.message;
  if (typeof message === "string") return message;
  return "";
}

function parseDuckDuckGoDataLine(line: string): unknown | null {
  if (!line.startsWith("data: ")) return null;
  try {
    return JSON.parse(line.slice(6));
  } catch (error) {
    void error;
    return null;
  }
}

function parseDuckDuckGoError(body: string): { type?: unknown; overrideCode?: unknown } | null {
  try {
    return JSON.parse(body) as { type?: unknown; overrideCode?: unknown };
  } catch (error) {
    void error;
    return null;
  }
}

function splitSetCookieHeader(header: string): string[] {
  const cookies: string[] = [];
  let start = 0;
  for (let index = 0; index < header.length; index++) {
    if (header[index] !== ",") continue;
    const rest = header.slice(index + 1);
    if (/^\s*[^=;\s]+\s*=/.test(rest)) {
      cookies.push(header.slice(start, index).trim());
      start = index + 1;
    }
  }
  cookies.push(header.slice(start).trim());
  return cookies.filter(Boolean);
}

function collectSetCookieHeaders(headers: Headers): string[] {
  const getSetCookie = (headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  if (typeof getSetCookie === "function") return getSetCookie.call(headers);
  const combined = headers.get("set-cookie");
  return combined ? splitSetCookieHeader(combined) : [];
}

function applySetCookie(cookieJar: Map<string, string>, setCookie: string): void {
  const pair = setCookie.split(";", 1)[0]?.trim();
  if (!pair) return;
  const separator = pair.indexOf("=");
  if (separator <= 0) return;
  cookieJar.set(pair.slice(0, separator), pair.slice(separator + 1));
}

function serializeCookieJar(cookieJar: Map<string, string>): string {
  return Array.from(cookieJar.entries())
    .map(([name, value]) => `${name}=${value}`)
    .join("; ");
}

function mergeHeadersCaseInsensitive(
  ...sources: Array<Record<string, string> | undefined>
): Record<string, string> {
  const merged: Record<string, string> = {};
  const canonicalNames = new Map<string, string>();
  for (const source of sources) {
    if (!source) continue;
    for (const [name, value] of Object.entries(source)) {
      const lowerName = name.toLowerCase();
      const previousName = canonicalNames.get(lowerName);
      if (previousName) delete merged[previousName];
      canonicalNames.set(lowerName, name);
      merged[name] = value;
    }
  }
  return merged;
}

/**
 * #8000: DuckDuckGo's free Duck.ai lineup churns. The static alias map now lives in
 * ./duckduckgo-web/models.ts (wire ids re-captured live 2026-08-26 — gpt-5.4-nano
 * retired, gpt-5.6-luna added); re-exported here for existing importers. Runtime
 * validation against the token-free /duckchat/v1/models handles future churn
 * without shipping a new catalog snapshot every time.
 */
export {
  DUCKDUCKGO_DEFAULT_MODEL,
  DUCKDUCKGO_MODEL_ALIASES,
  extractFreeDuckDuckGoModelIds,
  normalizeDuckDuckGoModel,
};

function getDuckDuckGoModelCapabilities(model: string): DuckDuckGoModelCapabilities {
  // `reasoningEffort` is REQUIRED on every duckchat/v1/chat request. Omitting it
  // returns 400 ERR_BAD_REQUEST — A/B verified live against duck.ai with an
  // otherwise byte-identical payload (200 with the field, 400 without, repeated).
  // The live duck.ai bundle always sends one, so there is no "let the server
  // pick a default" path any more.
  if (model === "claude-haiku-4-5") return { reasoningEffort: "low" };
  if (model === "tinfoil/gpt-oss-120b") return { reasoningEffort: "low" };
  return { reasoningEffort: "none" };
}

function extractDuckDuckGoFeVersion(html: string): string | null {
  return html.match(FE_VERSION_PATTERN)?.[0] ?? null;
}

function getDurablePublicKey(): JsonWebKey {
  if (!durablePublicKey) {
    const { publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicExponent: 0x10001,
    });
    durablePublicKey = {
      ...publicKey.export({ format: "jwk" }),
      alg: "RSA-OAEP-256",
      ext: true,
      key_ops: ["encrypt"],
      use: "enc",
    };
  }
  return durablePublicKey;
}

function buildDuckDuckGoPayload(
  model: string,
  messages: Array<Record<string, unknown>>,
  canUseTools = true
): Record<string, unknown> {
  const capabilities = getDuckDuckGoModelCapabilities(model);
  const payload: Record<string, unknown> = {
    model,
    metadata: {
      toolChoice: {
        NewsSearch: false,
        VideosSearch: false,
        LocalSearch: false,
        WeatherForecast: false,
      },
    },
    messages,
    canUseTools,
    ...(capabilities.reasoningEffort ? { reasoningEffort: capabilities.reasoningEffort } : {}),
    canUseApproxLocation: null,
    canDelegateImageGeneration: null,
    durableStream: {
      messageId: randomUUID(),
      conversationId: randomUUID(),
      publicKey: getDurablePublicKey(),
    },
  };
  return payload;
}

function normalizeDuckDuckGoError(status: number, body: string): string {
  const parsed = parseDuckDuckGoError(body);
  if (parsed) {
    const type = typeof parsed.type === "string" ? parsed.type : "";
    const overrideCode = typeof parsed.overrideCode === "string" ? parsed.overrideCode : "";
    if (type === "ERR_CHALLENGE" || type === "ERR_BN_LIMIT") {
      const codeSuffix = overrideCode ? ` (${overrideCode})` : "";
      return (
        `DuckDuckGo AI Chat anti-abuse challenge failed: ${type}${codeSuffix}. ` +
        "Retry later or from a less rate-limited IP; DuckDuckGo is rejecting this anonymous session."
      );
    }
    if (type) return `DuckDuckGo AI Chat error: ${type}`;
  }

  return `DuckDuckGo AI Chat returned HTTP ${status}`;
}

/**
 * DuckDuckGoWebExecutor handles anonymous, free access to DuckDuckGo AI Chat.
 *
 * Authentication flow:
 * 1. GET /duckchat/v1/status → get x-vqd-hash-1 header (VQD token)
 * 2. POST /duckchat/v1/chat with VQD header + model + messages
 * 3. Parse NDJSON SSE stream and transform to OpenAI format
 *
 * VQD tokens are per-request; no caching or cleanup needed.
 */
export class DuckDuckGoWebExecutor extends BaseExecutor {
  protected poolConfig = {
    minSessions: 2,
    maxSessions: 5,
    cooldownBase: 1000,
    cooldownMax: 10000,
    cooldownJitter: 500,
    requestTimeout: 30000,
    requestJitter: 50,
  };

  constructor() {
    super("duckduckgo-web", { baseUrl: DUCKDUCKGO_BASE });
  }

  private warmed = false;
  private feVersion = DEFAULT_FE_VERSION;
  private pendingVqdHash1: string | null = null;
  private readonly cookieJar = new Map<string, string>();
  private modelsCache: { ids: Set<string>; fetchedAt: number } | null = null;

  private buildRequestHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers = { ...FAKE_HEADERS, ...extra };
    const cookie = serializeCookieJar(this.cookieJar);
    return cookie ? { ...headers, Cookie: cookie } : headers;
  }

  private rememberResponseCookies(response: Response): void {
    for (const cookie of collectSetCookieHeaders(response.headers)) {
      applySetCookie(this.cookieJar, cookie);
    }
  }

  private seedBrowserCookies(): void {
    for (const [name, value] of SEEDED_COOKIES) {
      if (!this.cookieJar.has(name)) this.cookieJar.set(name, value);
    }
  }

  private async warmFetch(
    url: string,
    headers: Record<string, string>,
    signal: AbortSignal
  ): Promise<Response | null> {
    try {
      const response = await fetch(url, { headers, signal });
      this.rememberResponseCookies(response);
      return response;
    } catch (error) {
      void error;
      return null;
    }
  }

  async testConnection(
    _credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const controller = new AbortController();
      const ddgTestMs = FETCH_TIMEOUT_MS;
      const timeout = setTimeout(() => {
        const err = new Error(`duckduckgo-web testConnection timeout after ${ddgTestMs}ms`);
        err.name = "TimeoutError";
        controller.abort(err);
      }, ddgTestMs);

      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: this.buildRequestHeaders({
          Accept: "*/*",
          "Cache-Control": "no-store",
          "x-vqd-accept": "1",
        }),
        signal: mergedSignal,
      });
      this.rememberResponseCookies(resp);

      clearTimeout(timeout);

      return (
        resp.ok &&
        (resp.headers.get("x-vqd-4") !== null || resp.headers.get("x-vqd-hash-1") !== null)
      );
    } catch {
      return false;
    }
  }

  // No explicit return type, matching BaseExecutor and the other ~38 executors: this
  // method legitimately returns either a bare `Response` (error paths, processResponse)
  // or the richer `{ response, url, headers, transformedBody }` capture object.
  // `normalizeExecutorResult()` accepts exactly that union and wraps the bare form, so
  // pinning the signature to only the object shape was wrong — it reported 14 valid
  // `return` statements as errors.
  async execute(input: ExecuteInput) {
    const { model, body, stream, signal, upstreamExtraHeaders } = input;
    const requestedModel = normalizeDuckDuckGoModel(model);
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = normalizeDuckDuckGoMessages(bodyObj.messages);
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      bodyObj,
      rawMessages
    );
    const messages = effectiveMessages;
    const isStreaming = stream !== false;
    const upstreamHeaders = upstreamExtraHeaders || {};

    const errorResponse = (status: number, message: string, retryAfter?: string | null): Response =>
      new Response(JSON.stringify({ error: { message } }), {
        status,
        headers: {
          "Content-Type": "application/json",
          ...(retryAfter ? { "Retry-After": retryAfter } : {}),
        },
      });

    if (messages.length === 0) {
      return errorResponse(400, "No messages provided");
    }

    // Issue #6999: Circuit breaker fast-fail. If DDG has been consistently
    // failing, short-circuit with 503 so the combo engine can immediately
    // fail over to the next provider instead of waiting for timeouts.
    if (cbIsOpen()) {
      return errorResponse(503, "DuckDuckGo circuit breaker open — upstream unavailable");
    }

    // Browser-backed path: opt-in via OMNIROUTE_BROWSER_POOL=on or
    // WEB_COOKIE_USE_BROWSER=1. Routes the chat through a shared
    // Playwright/Cloakbrowser page so DDG's VQD challenge is solved by
    // a real browser. Latency is dominated by page navigation + AI wait
    // (~10-25s), but it's the only way to get HTTP 200 from this
    // environment once the Node vm solver hits its anti-bot ceiling.
    if (shouldUseBrowserBacked()) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      const userText = extractDuckDuckGoContent(lastUser ?? { content: "" });
      const result = await tryBackedChat({
        poolKey: "duckduckgo-web",
        chatPageUrl: "https://duck.ai/chat",
        chatUrl: CHAT_URL,
        chatUrlMatchDomain: "duck.ai",
        userMessage: userText || "Reply with OK",
        inputSelector: "textarea",
        submitButtonSelector: "button[aria-label='Ask']",
        signal: signal ?? null,
        postSubmitWaitMs: 15000,
      });
      if (result.status > 0) {
        // Wrap the captured body as a Response so processResponse
        // (already a streaming/non-streaming transformer) can be
        // reused unchanged.
        const upstreamResp = new Response(Buffer.from(result.body), {
          status: result.status,
          headers: {
            "Content-Type": result.contentType || "text/event-stream",
          },
        });
        return await this.processResponse(upstreamResp, isStreaming, hasTools, requestedTools);
      }
      // status 0 means no response captured (selector/navigation error).
      return errorResponse(502, "Browser-backed chat captured no upstream response");
    }

    // Acquire session from pool for fingerprint rotation
    const pool = this.getPool();
    let session: Session | null;
    try {
      session = pool ? await pool.acquireBlocking(10_000) : null;
    } catch {
      session = null;
    }
    const sessionHeaders = session ? session.buildHeaders() : {};

    try {
      const controller = new AbortController();
      const ddgExecMs = FETCH_TIMEOUT_MS;
      const timeout = setTimeout(() => {
        const err = new Error(`duckduckgo-web execute timeout after ${ddgExecMs}ms`);
        err.name = "TimeoutError";
        controller.abort(err);
      }, ddgExecMs);
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      // Self-heal against catalog churn (#8000 recurred with gpt-5.4-nano): when the
      // resolved id isn't in the live token-free /models list, reroute through the
      // alias map / default instead of burning a doomed chat call (400/429 fodder).
      let upstreamModel = requestedModel;
      const liveModelIds = await this.getLiveModelIds(mergedSignal);
      if (liveModelIds && !liveModelIds.has(upstreamModel)) {
        const fallbackModel = pickDuckDuckGoModel(upstreamModel, liveModelIds);
        if (fallbackModel !== upstreamModel) {
          console.warn(
            `[duckduckgo-web] model "${upstreamModel}" absent from the live duckchat catalog — routing as "${fallbackModel}"`
          );
          upstreamModel = fallbackModel;
        }
      }

      // #ddgw defense-in-depth: duckchat/v1/chat accepts only user/assistant roles.
      // Normalize after catalog resolution so the effective upstream model is used.
      // This also shields the system tool prompt injected by prepareToolMessages.
      const normalizedMessages = normalizeSystemRole(
        messages,
        "duckduckgo-web",
        upstreamModel
      ) as typeof messages;

      const sendChat = async (vqdHeaders: DuckDuckGoAuthHeaders): Promise<Response> => {
        const payload = buildDuckDuckGoPayload(upstreamModel, normalizedMessages);
        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: mergeHeadersCaseInsensitive(
            sessionHeaders,
            this.buildRequestHeaders(),
            upstreamHeaders,
            {
              Accept: "text/event-stream",
              "Content-Type": "application/json",
              "x-ddg-journey-id": randomUUID().replaceAll("-", ""),
              "x-fe-signals": makeDuckDuckGoFeSignals(),
              "x-fe-version": this.feVersion,
              ...(vqdHeaders.vqd4 ? { "x-vqd-4": vqdHeaders.vqd4 } : {}),
              ...(vqdHeaders.vqdHash1 ? { "x-vqd-hash-1": vqdHeaders.vqdHash1 } : {}),
            }
          ),
          body: JSON.stringify(payload),
          signal: mergedSignal,
        });
        this.rememberResponseCookies(response);
        this.rememberChallengeHeader(response);
        return response;
      };

      if (mergedSignal.aborted) {
        clearTimeout(timeout);
        return errorResponse(499, "Request cancelled");
      }

      await this.warmSession(mergedSignal);
      // NOTE: the throwaway "seed" chat POST that used to run here has been removed.
      // It existed to coax a usable challenge out of the upstream while the solver
      // was broken; now that the solver reproduces a real browser's probe vectors
      // exactly, the first real request succeeds on its own. Keeping it only doubled
      // the chat calls per user request against an IP-rate-limited endpoint, which
      // showed up as spurious 429 ERR_RATE_LIMIT.
      const vqdHeaders = await this.acquireAuthHeaders(mergedSignal);
      if (!vqdHeaders.vqd4 && !vqdHeaders.vqdHash1) {
        clearTimeout(timeout);
        // #6996: surface the real upstream status instead of a hardcoded 503 so a
        // 429 rate-limit gets a connection-cooldown, not a whole-provider circuit
        // breaker trip (see CLAUDE.md "Provider Circuit Breaker" — only
        // 408/500/502/503/504 should trip it, not 429). Any other non-2xx status
        // (403 anti-bot challenge, genuine 5xx, or a thrown network error where
        // status is null) keeps the existing 503 fallback.
        if (vqdHeaders.status === 429) {
          return errorResponse(
            429,
            "Failed to acquire VQD token: upstream rate limited",
            vqdHeaders.retryAfter
          );
        }
        return errorResponse(503, "Failed to acquire VQD token");
      }

      let chatResponse = await sendChat(vqdHeaders);

      if (chatResponse.status === 418) {
        // Check if this is ERR_BN_LIMIT (rate limit/ban) — cannot be solved by retrying with fresh VQD
        const bodyText = await chatResponse.clone().text();
        const parsedError = parseDuckDuckGoError(bodyText);
        const errorType = parsedError ? String(parsedError.type) : "";
        if (errorType === "ERR_BN_LIMIT") {
          // ERR_BN_LIMIT means the IP/session is banned/rate-limited — retrying won't help
          // Return the error immediately without burning another VQD acquisition
          clearTimeout(timeout);
          return await this.processResponse(chatResponse, isStreaming, hasTools, requestedTools);
        }
        // ERR_CHALLENGE: the challenge was unsolved or expired — try once with fresh VQD
        this.pendingVqdHash1 = null;
        const freshVqd = await this.acquireAuthHeaders(mergedSignal);
        if (freshVqd.vqd4 || freshVqd.vqdHash1) {
          chatResponse = await sendChat(freshVqd);
        }
      }

      clearTimeout(timeout);

      if (chatResponse.status === 429) {
        if (pool && session) pool.reportCooldown(session);
        cbRecordFailure();
        return await this.processResponse(chatResponse, isStreaming, hasTools, requestedTools);
      }

      if (chatResponse.status === 401 || chatResponse.status === 403) {
        this.pendingVqdHash1 = null;
        const freshVqd = await this.acquireAuthHeaders(mergedSignal);
        if (freshVqd.vqd4 || freshVqd.vqdHash1) {
          const retryResponse = await sendChat(freshVqd);
          return await this.processResponse(retryResponse, isStreaming, hasTools, requestedTools);
        }
        return errorResponse(503, "Service unavailable");
      }

      if (chatResponse.status >= 500) {
        if (pool && session) pool.reportDead(session);
        cbRecordFailure();
        return errorResponse(502, "Upstream error");
      }

      const result = await this.processResponse(
        chatResponse,
        isStreaming,
        hasTools,
        requestedTools
      );

      // Report pool status based on response
      if (pool && session) {
        if (chatResponse.status === 429) {
          pool.reportCooldown(session);
        } else if (chatResponse.status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      }

      cbRecordSuccess();
      return result;
    } catch (error) {
      if (pool && session) {
        pool.reportCooldown(session);
      }
      cbRecordFailure();

      if (error instanceof DOMException && error.name === "AbortError") {
        return errorResponse(499, "Request cancelled");
      }

      return errorResponse(
        500,
        sanitizeErrorMessage(error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      session?.release();
    }
  }

  private async getLiveModelIds(signal: AbortSignal): Promise<Set<string> | null> {
    const now = Date.now();
    if (this.modelsCache && now - this.modelsCache.fetchedAt < MODEL_IDS_CACHE_TTL_MS) {
      return this.modelsCache.ids;
    }
    try {
      const resp = await fetch(MODELS_URL, {
        method: "GET",
        headers: this.buildRequestHeaders({ Accept: "application/json" }),
        signal,
      });
      if (!resp.ok) return null;
      const ids = extractFreeDuckDuckGoModelIds(await resp.json());
      if (ids.size === 0) return null;
      this.modelsCache = { ids, fetchedAt: now };
      return ids;
    } catch (error) {
      void error;
      return null;
    }
  }

  private async acquireVqdHeaders(signal: AbortSignal): Promise<DuckDuckGoVqdHeaders> {
    try {
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");

      const resp = await fetch(STATUS_URL, {
        method: "GET",
        headers: this.buildRequestHeaders({
          Accept: "*/*",
          "Cache-Control": "no-store",
          "x-vqd-accept": "1",
        }),
        signal,
      });
      this.rememberResponseCookies(resp);

      if (!resp.ok) {
        return {
          vqd4: null,
          vqdHash1: null,
          status: resp.status,
          retryAfter: resp.headers.get("Retry-After"),
        };
      }
      return {
        vqd4: resp.headers.get("x-vqd-4"),
        vqdHash1: resp.headers.get("x-vqd-hash-1"),
        status: resp.status,
        retryAfter: null,
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      return { vqd4: null, vqdHash1: null, status: null, retryAfter: null };
    }
  }

  private async acquireAuthHeaders(signal: AbortSignal): Promise<DuckDuckGoAuthHeaders> {
    if (this.pendingVqdHash1) {
      const challenge = this.pendingVqdHash1;
      this.pendingVqdHash1 = null;
      try {
        return {
          vqd4: null,
          vqdHash1: await solveDuckDuckGoChallenge(challenge, FAKE_HEADERS["User-Agent"]),
          status: null,
          retryAfter: null,
        };
      } catch (error) {
        void error;
      }
    }

    const headers = await this.acquireVqdHeaders(signal);
    if (headers.vqdHash1) {
      try {
        return {
          vqd4: headers.vqd4,
          vqdHash1: await solveDuckDuckGoChallenge(headers.vqdHash1, FAKE_HEADERS["User-Agent"]),
          status: headers.status,
          retryAfter: headers.retryAfter,
        };
      } catch (error) {
        void error;
        // NEVER forward the raw unsolved x-vqd-hash-1: upstream answers it with
        // 418 ERR_CHALLENGE and the wasted call still counts toward the IP rate
        // limit (spurious 429s). Retry once with a fresh /status challenge, then
        // fail cleanly — a null vqdHash1 makes execute() surface 503/429 without
        // another doomed call. A standalone x-vqd-4 is still passed through for
        // the legacy header path.
        const retry = await this.acquireVqdHeaders(signal);
        if (retry.vqdHash1) {
          try {
            return {
              vqd4: retry.vqd4,
              vqdHash1: await solveDuckDuckGoChallenge(retry.vqdHash1, FAKE_HEADERS["User-Agent"]),
              status: retry.status,
              retryAfter: retry.retryAfter,
            };
          } catch (retryError) {
            void retryError;
          }
        }
        return {
          vqd4: retry.vqd4 ?? headers.vqd4,
          vqdHash1: null,
          status: retry.status ?? headers.status,
          retryAfter: retry.retryAfter ?? headers.retryAfter,
        };
      }
    }
    return headers;
  }

  private rememberChallengeHeader(response: Response): void {
    const nextHash = response.headers.get("x-vqd-hash-1");
    if (nextHash) this.pendingVqdHash1 = nextHash;
  }

  private async warmSession(signal: AbortSignal): Promise<void> {
    if (this.warmed || signal.aborted) return;
    this.warmed = true;
    this.seedBrowserCookies();
    const homepageResponse = await this.warmFetch(
      `${DUCKDUCKGO_BASE}/`,
      this.buildRequestHeaders({
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      }),
      signal
    );
    if (homepageResponse) {
      try {
        const homepageHtml = await homepageResponse.clone().text();
        const feVersion = extractDuckDuckGoFeVersion(homepageHtml);
        if (feVersion) this.feVersion = feVersion;
      } catch (error) {
        void error;
      }
    }
    await this.warmFetch(COUNTRY_URL, this.buildRequestHeaders({ Accept: "*/*" }), signal);
    await this.warmFetch(AUTH_TOKEN_URL, this.buildRequestHeaders({ Accept: "*/*" }), signal);
    await this.warmFetch(
      `${DUCKDUCKGO_BASE}/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1`,
      this.buildRequestHeaders({
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Origin: DUCKDUCKGO_BASE,
        Referer: `${DUCKDUCKGO_BASE}/`,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      }),
      signal
    );
  }

  private async processResponse(
    response: Response,
    streaming: boolean,
    hasTools?: boolean,
    requestedTools?: unknown
  ): Promise<Response> {
    if (!response.ok) {
      const body = await response.text();
      return new Response(
        JSON.stringify({ error: { message: normalizeDuckDuckGoError(response.status, body) } }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (streaming) {
      if (!response.body) {
        return new Response(JSON.stringify({ error: { message: "No response body" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let pendingLine = "";

      const enqueueLine = (line: string, controller: TransformStreamDefaultController) => {
        const normalizedLine = line.endsWith("\r") ? line.slice(0, -1) : line;
        if (!normalizedLine.trim()) return;
        if (normalizedLine === "[DONE]") {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          return;
        }

        const data = parseDuckDuckGoDataLine(normalizedLine);
        const content = extractDuckDuckGoContent(data);
        if (content) {
          const openaiFormat = {
            choices: [
              {
                delta: { content },
                index: 0,
              },
            ],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(openaiFormat)}\n\n`));
        }
      };

      const transformStream = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
          const lines = `${pendingLine}${decoder.decode(chunk, { stream: true })}`.split("\n");
          pendingLine = lines.pop() ?? "";
          for (const line of lines) enqueueLine(line, controller);
        },
        flush(controller) {
          pendingLine += decoder.decode();
          if (pendingLine) enqueueLine(pendingLine, controller);
        },
      });

      const transformedBody = response.body.pipeThrough(transformStream);
      return new Response(transformedBody, {
        headers: { "Content-Type": "text/event-stream" },
      });
    } else {
      const text = await response.text();
      let fullContent = "";

      const lines = text.split("\n");
      for (const line of lines) {
        if (!line.trim() || line === "[DONE]") continue;

        fullContent += extractDuckDuckGoContent(parseDuckDuckGoDataLine(line));
      }

      const openaiResponse = hasTools
        ? (() => {
            const { content, toolCalls, finishReason } = buildToolAwareResult(
              fullContent,
              requestedTools,
              "ddg"
            );
            const message: Record<string, unknown> = { role: "assistant", content };
            if (toolCalls) {
              message.tool_calls = toolCalls;
              message.content = null;
            }
            return { choices: [{ index: 0, message, finish_reason: finishReason }] };
          })()
        : {
            choices: [
              {
                message: { content: fullContent, role: "assistant" },
                index: 0,
                finish_reason: "stop",
              },
            ],
          };

      return new Response(JSON.stringify(openaiResponse), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

export const duckduckgoWebExecutor = new DuckDuckGoWebExecutor();
