import { generateKeyPairSync, randomUUID } from "node:crypto";
import vm from "node:vm";
import { solveDuckDuckGoChallenge, makeDuckDuckGoFeSignals } from "./duckduckgo-web/challenge.ts";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";
import type { Session } from "../services/sessionPool/session.ts";
import { tryBackedChat } from "../services/browserBackedChat.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const DUCKDUCKGO_BASE = "https://duckduckgo.com";
// #4037: the live DuckDuckGo AI Chat backend is served from duckduckgo.com. The
// status/chat fetches, Origin, and Referer must all use this host so the request's
// same-origin triplet (host + Origin + Referer) stays consistent with
// `Sec-Fetch-Site: same-origin`; pointing them at duck.ai produced an inconsistent
// triplet the backend rejected with HTTP 400.
const AUTH_TOKEN_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/auth/token`;
const COUNTRY_URL = `${DUCKDUCKGO_BASE}/country.json`;
export const STATUS_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/status`;
export const CHAT_URL = `${DUCKDUCKGO_BASE}/duckchat/v1/chat`;
const DEFAULT_FE_VERSION = "serp_20260424_180649_ET-0bdc33b2a02ebf8f235def65d887787f694720a1";
// #4037: the real served x-fe-version token has a 20-hex tail (e.g.
// `serp_20250401_100419_ET-19d438eb199b2bf7c300`); the previous `{40}` requirement
// never matched the live token, so the scrape silently fell back to DEFAULT_FE_VERSION.
// Bounded `{20,40}` keeps the pattern ReDoS-safe.
export const FE_VERSION_PATTERN = /serp_\d{8}_\d{6}_[A-Z]{2}-[0-9a-f]{20,40}/;
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

function shouldUseBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

interface DuckDuckGoVqdHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
}

interface DuckDuckGoAuthHeaders {
  vqd4: string | null;
  vqdHash1: string | null;
}

interface DuckDuckGoModelCapabilities {
  reasoningEffort: string | null;
}

type DuckDuckGoChallengeResult = {
  client_hashes?: unknown;
  [key: string]: unknown;
};

let durablePublicKey: JsonWebKey | null = null;

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

function normalizeDuckDuckGoModel(model: string | undefined): string {
  if (!model) return "gpt-4o-mini";
  const clean = model.startsWith("duckduckgo-web/") ? model.slice("duckduckgo-web/".length) : model;
  if (clean === "claude-3-5-haiku-20241022") return "claude-haiku-4-5";
  if (clean === "llama-4-scout") return "meta-llama/Llama-4-Scout-17B-16E-Instruct";
  if (clean === "mistral-small-2501") return "mistral-small-2603";
  if (clean === "gpt-oss-120b") return "tinfoil/gpt-oss-120b";
  return clean;
}

function getDuckDuckGoModelCapabilities(model: string): DuckDuckGoModelCapabilities {
  if (model === "gpt-5-mini") return { reasoningEffort: "minimal" };
  if (model === "claude-haiku-4-5") return { reasoningEffort: "low" };
  if (model === "tinfoil/gpt-oss-120b") return { reasoningEffort: "low" };
  return { reasoningEffort: null };
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
  private seeded = false;
  private feVersion = DEFAULT_FE_VERSION;
  private pendingVqdHash1: string | null = null;
  private readonly cookieJar = new Map<string, string>();

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
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

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

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, body, stream, signal, upstreamExtraHeaders } = input;
    const upstreamModel = normalizeDuckDuckGoModel(model);
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = Array.isArray((body as { messages?: unknown[] } | null)?.messages)
      ? ((body as { messages: unknown[] }).messages as Array<Record<string, unknown>>)
      : [];
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      bodyObj,
      rawMessages
    );
    const messages = effectiveMessages as Array<Record<string, unknown>>;
    const isStreaming = stream !== false;
    const upstreamHeaders = upstreamExtraHeaders || {};

    const errorResponse = (status: number, message: string): Response =>
      new Response(JSON.stringify({ error: { message } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });

    if (messages.length === 0) {
      return errorResponse(400, "No messages provided");
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
        const upstreamResp = new Response(result.body, {
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
      const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const sendChat = async (vqdHeaders: DuckDuckGoAuthHeaders): Promise<Response> => {
        const payload = buildDuckDuckGoPayload(upstreamModel, messages);
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
      await this.seedChallengeChain(upstreamModel, mergedSignal);
      const vqdHeaders = await this.acquireAuthHeaders(mergedSignal);
      if (!vqdHeaders.vqd4 && !vqdHeaders.vqdHash1) {
        clearTimeout(timeout);
        return errorResponse(503, "Failed to acquire VQD token");
      }

      let chatResponse = await sendChat(vqdHeaders);

      if (chatResponse.status === 418) {
        this.pendingVqdHash1 = null;
        const freshVqd = await this.acquireAuthHeaders(mergedSignal);
        if (freshVqd.vqd4 || freshVqd.vqdHash1) {
          chatResponse = await sendChat(freshVqd);
        }
      }

      clearTimeout(timeout);

      if (chatResponse.status === 429) {
        if (pool && session) pool.reportCooldown(session);
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

      return result;
    } catch (error) {
      if (pool && session) {
        pool.reportCooldown(session);
      }

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

      if (!resp.ok) return { vqd4: null, vqdHash1: null };
      return {
        vqd4: resp.headers.get("x-vqd-4"),
        vqdHash1: resp.headers.get("x-vqd-hash-1"),
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }
      return { vqd4: null, vqdHash1: null };
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
        };
      } catch (error) {
        void error;
        return headers;
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

  private async seedChallengeChain(model: string, signal: AbortSignal): Promise<void> {
    if (this.seeded || signal.aborted) return;
    this.seeded = true;
    const seedMessages = [{ role: "user", content: "hi" }];
    const previousPending = this.pendingVqdHash1;
    try {
      const vqdHeaders = await this.acquireAuthHeaders(signal);
      if (!vqdHeaders.vqd4 && !vqdHeaders.vqdHash1) {
        this.pendingVqdHash1 = previousPending;
        return;
      }
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: mergeHeadersCaseInsensitive(this.buildRequestHeaders(), {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
          "x-ddg-journey-id": randomUUID().replaceAll("-", ""),
          "x-fe-signals": makeDuckDuckGoFeSignals(),
          "x-fe-version": this.feVersion,
          ...(vqdHeaders.vqd4 ? { "x-vqd-4": vqdHeaders.vqd4 } : {}),
          ...(vqdHeaders.vqdHash1 ? { "x-vqd-hash-1": vqdHeaders.vqdHash1 } : {}),
        }),
        body: JSON.stringify(buildDuckDuckGoPayload(model, seedMessages, false)),
        signal,
      });
      this.rememberResponseCookies(response);
      if (response.ok) this.rememberChallengeHeader(response);
      else this.pendingVqdHash1 = previousPending;
      await response.body?.cancel().catch(() => {});
    } catch (error) {
      void error;
      this.pendingVqdHash1 = previousPending;
    }
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

      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          const text = new TextDecoder().decode(chunk);
          const lines = text.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;
            if (line === "[DONE]") {
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              continue;
            }

            const data = parseDuckDuckGoDataLine(line);
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
              const encoded = new TextEncoder().encode(`data: ${JSON.stringify(openaiFormat)}\n\n`);
              controller.enqueue(encoded);
            }
          }
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
