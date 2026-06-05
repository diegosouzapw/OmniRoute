import { BaseExecutor, type ExecuteInput } from "./base.ts";
import type { ProviderCredentials } from "./base.ts";

type BrowserRef = import("playwright").Browser;
type PageRef = import("playwright").Page;

const API_BASE = "https://theoldllm.vercel.app";
const API_PATH = "/api/chatgpt";
const API_URL = `${API_BASE}${API_PATH}`;
const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";

// ── Model name mapping ────────────────────────────────────────────────────

const GPT_MODELS: Record<string, string> = {
  "gpt-5.4": "GPT_5_4",
  "gpt-5.3": "GPT_5_3",
  "gpt-5.2": "GPT_5_2",
  "gpt-5.1": "GPT_5_1",
  "gpt-5": "GPT_5",
  "gpt5_4": "GPT_5_4",
  "gpt5_3": "GPT_5_3",
  "gpt5_2": "GPT_5_2",
  "gpt5_1": "GPT_5_1",
  "gpt_4o": "GPT_4O",
  "gpt-4o": "GPT_4O",
  "gpt_5_3": "GPT_5_3",
  "gpt_5_2": "GPT_5_2",
  "gpt_5_1": "GPT_5_1",
  "gpt_5": "GPT_5",
};

const CLAUDE_NAMES: Record<string, string> = {
  "claude-4.6-opus": "CLAUDE_4_6_OPUS",
  "claude-4.6-sonnet": "CLAUDE_4_6_SONNET",
  "claude-4.5-haiku": "CLAUDE_4_5_HAIKU",
  "claude_opus_4": "CLAUDE_4_6_OPUS",
  "claude_sonnet_4": "CLAUDE_4_6_SONNET",
  "claude_haiku_3_5": "CLAUDE_4_5_HAIKU",
  "claude opus 4": "CLAUDE_4_6_OPUS",
  "claude sonnet 4": "CLAUDE_4_6_SONNET",
  "claude haiku 3.5": "CLAUDE_4_5_HAIKU",
};

function mapModel(model: string): string {
  const n = model.toLowerCase().trim();
  const gptKey = n.replace(/[_\s]+/g, "-");
  if (GPT_MODELS[gptKey]) return GPT_MODELS[gptKey];
  const gptKey2 = n.replace(/[-\s]+/g, "_");
  if (GPT_MODELS[gptKey2]) return GPT_MODELS[gptKey2];
  if (CLAUDE_NAMES[n]) return CLAUDE_NAMES[n];
  if (n.includes("claude")) {
    if (n.includes("opus")) return "CLAUDE_4_6_OPUS";
    if (n.includes("sonnet")) return "CLAUDE_4_6_SONNET";
    if (n.includes("haiku")) return "CLAUDE_4_5_HAIKU";
  }
  if (n.includes("gpt") && n.includes("5")) return "GPT_5_4";
  return "GPT_5_4";
}

// ── Token cache (exported for test pre-population) ────────────────────────

const TOKEN_TTL_MS = 15 * 60 * 1000;

export const tokenCache: { value: string; expiresAt: number } = {
  value: "",
  expiresAt: 0,
};

let tokenLock: Promise<void> | null = null;

function getCachedToken(): string | null {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt) return tokenCache.value;
  return null;
}

function setCachedToken(token: string): void {
  tokenCache.value = token;
  tokenCache.expiresAt = Date.now() + TOKEN_TTL_MS;
}

function invalidateToken(): void {
  tokenCache.value = "";
  tokenCache.expiresAt = 0;
}

// ── Playwright token capture (fallback only) ──────────────────────────────

let _browser: Promise<BrowserRef> | null = null;
let _cleanupRegistered = false;

function registerCleanup(): void {
  if (_cleanupRegistered) return;
  _cleanupRegistered = true;
  const cleanup = () => {
    if (_browser) {
      _browser.then((b) => b.close().catch(() => {})).catch(() => {});
      _browser = null;
    }
  };
  process.on("exit", cleanup);
  process.on("SIGTERM", () => { cleanup(); process.exit(0); });
  process.on("SIGINT", () => { cleanup(); process.exit(0); });
}

async function getBrowser(): Promise<BrowserRef> {
  if (_browser) {
    try {
      const b = await _browser;
      if (b.isConnected()) return b;
    } catch {
      _browser = null;
    }
  }
  registerCleanup();
  _browser = (async () => {
    const { chromium } = await import("playwright");
    return await chromium.launch({
      headless: true,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--window-size=1280,1024",
      ],
    });
  })();
  return _browser;
}

async function captureTokenViaBrowser(): Promise<string> {
  const browser = await getBrowser();
  const context = await browser.newContext({
    userAgent: CHROME_UA,
    viewport: { width: 1280, height: 1024 },
  });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    (window as any).chrome = { runtime: {} };
  });

  const page = await context.newPage();
  const navTimeout = Number(process.env.THEOLDLLM_NAV_TIMEOUT_MS) || 30_000;

  try {
    await page.goto(API_BASE, { waitUntil: "domcontentloaded", timeout: navTimeout });

    const textareaFound = await page
      .waitForSelector("textarea", { timeout: navTimeout })
      .then(() => true)
      .catch(() => false);

    if (!textareaFound) {
      const newChat = page.locator("button", { hasText: "New chat" });
      await newChat.first().waitFor({ state: "visible", timeout: 5_000 }).catch(() => {});
      if (await newChat.first().isVisible().catch(() => false)) {
        await newChat.first().click();
        await page.waitForTimeout(1_500);
        await page.waitForSelector("textarea", { timeout: 10_000 }).catch(() => {});
      }
    }

    await page.waitForTimeout(3_000);

    const capturedToken = await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Token capture timed out")), 25_000);

      page.route("**/api/chatgpt", async (route) => {
        clearTimeout(timeout);
        const t = route.request().headers()["x-request-token"];
        try { await route.abort("blockedbyclient"); } catch {}
        resolve(t);
      });

      (async () => {
        try {
          const ta = page.locator("textarea").first();
          await ta.waitFor({ state: "visible", timeout: 10_000 });
          await ta.click();
          await ta.fill("hello");
          await page.waitForTimeout(300);
          await ta.press("Enter");
        } catch (err) {
          clearTimeout(timeout);
          reject(new Error(`SPA send failed: ${err instanceof Error ? err.message : String(err)}`));
        }
      })();
    });

    return capturedToken;
  } finally {
    await page.close().catch(() => {});
  }
}

// Serialize concurrent token refreshes so only one Playwright capture runs
async function acquireToken(): Promise<string> {
  const cached = getCachedToken();
  if (cached) return cached;

  // Wait for in-flight refresh
  if (tokenLock) {
    await tokenLock;
    const retry = getCachedToken();
    if (retry) return retry;
  }

  // Perform refresh under lock
  let resolveLock!: () => void;
  tokenLock = new Promise<void>((r) => { resolveLock = r; });

  try {
    const t = await captureTokenViaBrowser();
    setCachedToken(t);
    return t;
  } finally {
    tokenLock = null;
    resolveLock();
  }
}

// ── Direct Node.js fetch (fast path) ──────────────────────────────────────

async function directFetch(
  token: string,
  reqBody: Record<string, unknown>,
  signal?: AbortSignal | null,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);
  const onSignal = signal
    ? () => controller.abort(signal.reason)
    : undefined;
  signal?.addEventListener("abort", onSignal!, { once: true });

  try {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Version": "3.8.4",
        "X-Request-Token": token,
        "User-Agent": CHROME_UA,
      },
      body: JSON.stringify(reqBody),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
    if (onSignal) signal?.removeEventListener("abort", onSignal);
  }
}

function isTokenRejected(status: number, body: string): boolean {
  if (status === 401 || status === 403) return true;
  try {
    const p = JSON.parse(body);
    return (
      p?.error?.type === "access_denied" ||
      (typeof p?.error === "string" && /blocked|denied|invalid/i.test(p.error))
    );
  } catch {
    return false;
  }
}

// ── SSE helpers ───────────────────────────────────────────────────────────

function parseSseContent(sseText: string): string {
  let content = "";
  for (const line of sseText.split("\n")) {
    if (line.startsWith("data: ") && line !== "data: [DONE]") {
      try {
        const d = JSON.parse(line.slice(6));
        content += d.choices?.[0]?.delta?.content || d.choices?.[0]?.delta?.text || "";
      } catch {}
    }
  }
  return content;
}

function buildChatCompletion(content: string, model: string): string {
  return JSON.stringify({
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: mapModel(model),
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  });
}

function buildErrorResponse(status: number, body: string): string {
  let detail = body;
  for (const line of body.split("\n")) {
    if (line.startsWith("data: ") && line !== "data: [DONE]") {
      try {
        const p = JSON.parse(line.slice(6));
        if (p.error) { detail = JSON.stringify(p.error); break; }
      } catch {}
    }
  }
  return JSON.stringify({
    error: { message: detail, type: "upstream_error", code: `HTTP_${status}` },
  });
}

// ── Executor ──────────────────────────────────────────────────────────────

export class TheOldLlmExecutor extends BaseExecutor {
  constructor() {
    super("theoldllm", { format: "openai" });
  }

  buildUrl(_model: string, _stream: boolean): string {
    return API_URL;
  }

  buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Client-Version": "3.8.4",
      "User-Agent": CHROME_UA,
    };
  }

  transformRequest(model: string, body: unknown, _stream: boolean): unknown {
    if (typeof body === "object" && body !== null) {
      return { ...(body as Record<string, unknown>), model: mapModel(model) };
    }
    return body;
  }

  async testConnection(
    _credentials: ProviderCredentials,
    _signal?: AbortSignal | null,
    log?: ExecuteInput["log"],
  ): Promise<boolean> {
    const token = getCachedToken();
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-Version": "3.8.4",
          ...(token ? { "X-Request-Token": token } : {}),
          "User-Agent": CHROME_UA,
        },
        body: JSON.stringify({
          model: "GPT_5_4",
          messages: [{ role: "user", content: "ping" }],
          stream: false,
        }),
        signal: _signal ?? undefined,
      });
      return resp.status === 200;
    } catch {
      log?.warn?.("THEOLDLLM", "testConnection network error");
      return false;
    }
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, stream, body, signal, log } = input;
    const encoder = new TextEncoder();

    if (signal?.aborted) {
      return {
        response: new Response(encoder.encode(JSON.stringify({
          error: { message: "Request aborted", type: "abort", code: "ABORTED" },
        })), { status: 499, headers: { "Content-Type": "application/json" } }),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    }

    try {
      const reqBody = {
        ...(body as Record<string, unknown>),
        model: mapModel(model),
        stream: true,
      };

      let token = getCachedToken();
      let upstream: Response;

      if (token) {
        log?.debug?.("THEOLDLLM", "Using cached token — direct fetch");
        upstream = await directFetch(token, reqBody, signal);
      } else {
        log?.info?.("THEOLDLLM", "No cached token — capturing via Playwright…");
        try {
          token = await acquireToken();
        } catch (capErr) {
          throw new Error(
            `Token capture failed: ${capErr instanceof Error ? capErr.message : String(capErr)}`,
          );
        }
        log?.info?.("THEOLDLLM", `Token captured: ${token.slice(0, 20)}…`);
        upstream = await directFetch(token, reqBody, signal);
      }

      const upstreamBody = await upstream.text();

      if (isTokenRejected(upstream.status, upstreamBody)) {
        log?.warn?.("THEOLDLLM", `Token rejected (${upstream.status}), refreshing…`);
        invalidateToken();
        try {
          token = await acquireToken();
          log?.info?.("THEOLDLLM", `Token refreshed: ${token.slice(0, 20)}…`);
        } catch {
          log?.warn?.("THEOLDLLM", "Token refresh failed, retrying with existing token");
        }
        upstream = await directFetch(token, reqBody, signal);
      }

      const finalBody = await upstream.text();

      if (upstream.status === 200 && finalBody) {
        const payload = stream
          ? finalBody
          : buildChatCompletion(parseSseContent(finalBody), model);
        return {
          response: new Response(encoder.encode(payload), {
            status: 200,
            headers: {
              "Content-Type": stream ? "text/event-stream" : "application/json",
              "Cache-Control": "no-cache",
            },
          }),
          url: API_URL,
          headers: this.buildHeaders(input.credentials),
          transformedBody: body,
        };
      }

      return {
        response: new Response(encoder.encode(buildErrorResponse(upstream.status, finalBody)), {
          status: upstream.status,
          headers: { "Content-Type": "application/json" },
        }),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.error?.("THEOLDLLM", `Executor error: ${msg}`);
      return {
        response: new Response(
          encoder.encode(
            JSON.stringify({
              error: { message: msg, type: "upstream_error", code: "EXECUTOR_ERROR" },
            }),
          ),
          { status: 502, headers: { "Content-Type": "application/json" } },
        ),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    }
  }
}

export default TheOldLlmExecutor;