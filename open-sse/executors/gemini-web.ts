/**
 * GeminiWebExecutor — Gemini Web Session Provider
 *
 * Routes requests through Google Gemini's web interface using browser
 * cookies + Playwright automation. Translates between OpenAI chat
 * completions format and Gemini's web UI.
 *
 * Auth: Cookie-based (__Secure-1PSID + __Secure-1PSIDTS from gemini.google.com)
 * Method: Playwright browser automation
 *
 * Note: Streaming is pseudo-streaming — waits for full Gemini response then
 * sends as single SSE chunk. Gemini's StreamGenerate endpoint returns complete
 * responses, not chunked streams.
 */

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { prepareToolMessages } from "../translator/webTools.ts";
import { buildToolModeResponse } from "./chatgptWebTools.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const GEMINI_URL = "https://gemini.google.com/app";

/**
 * Whether an error came from Playwright failing to launch because the browser binary is not
 * installed (`chromium.launch: Executable doesn't exist at ...`). This is a host/config
 * problem, not a transient upstream fault, so the executor must NOT surface it as a retryable
 * 500 (which marks the account unavailable and loops / trips the provider breaker). See #3516.
 */
export function isMissingBrowserExecutable(message: string): boolean {
  if (!message) return false;
  return /executable doesn't exist|executablenotfound|playwright install|chromium.*download/i.test(
    message
  );
}
const GEMINI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

// ─── Types ──────────────────────────────────────────────────────────────────

interface GeminiMessage {
  role: string;
  content: string;
}

interface GeminiRequestBody {
  messages: GeminiMessage[];
  model?: string;
  stream?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatChatCompletion(content: string, model: string, finishReason = "stop") {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: finishReason }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

function formatStreamChunk(content: string, model: string, finishReason: string | null = null) {
  return {
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: content ? { content } : {}, finish_reason: finishReason }],
  };
}

/**
 * Build the plain-text prompt typed into the Gemini web UI when a tool
 * contract is active — the synthetic system message injected by
 * `prepareToolMessages()` prepended to the last user message. gemini-web
 * only ever sends a single flat string (no native message array), so the
 * tool contract and the user's ask are concatenated (#7286).
 */
export function buildGeminiToolPrompt(
  effectiveMessages: Array<{ role: string; content: unknown }>
): string {
  const toolSystemMsg = effectiveMessages.find((m) => m.role === "system");
  const lastUserMsg = [...effectiveMessages].reverse().find((m) => m.role === "user");
  const userText = typeof lastUserMsg?.content === "string" ? lastUserMsg.content : "";
  const toolPrompt = typeof toolSystemMsg?.content === "string" ? toolSystemMsg.content : "";
  return toolPrompt ? `${toolPrompt}\n\n${userText}` : userText;
}

/**
 * Tool mode: wrap the buffered Gemini response text in the standard OpenAI
 * completion shape, then delegate to the shared `buildToolModeResponse()`
 * (`chatgptWebTools.ts`) — parses `<tool>{...}</tool>` blocks out of the
 * text into `tool_calls` (malformed JSON degrades to ordinary `content`,
 * never throws) and replays either buffered JSON or a terminal SSE chunk
 * depending on `stream` (#7286). Exported standalone so the branching logic
 * is testable without a full Playwright mock.
 */
export async function buildGeminiToolResponse(
  responseText: string,
  requestedTools: unknown,
  stream: boolean,
  model: string,
  cid: string,
  created: number
): Promise<Response> {
  const bufferedJson = new Response(JSON.stringify(formatChatCompletion(responseText, model)), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  return buildToolModeResponse(bufferedJson, requestedTools, stream, {
    cid,
    created,
    model,
    idSeed: "gwe",
  });
}

/**
 * Parse cookie string, stripping attributes (Path, Domain, Expires, etc.)
 * Input: full browser cookie string or just "name=value; name2=value2"
 * Output: array of { name, value } pairs
 */
function parseCookies(raw: string): Array<{ name: string; value: string }> {
  return raw
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const eqIdx = part.indexOf("=");
      if (eqIdx === -1) return null;
      const name = part.substring(0, eqIdx).trim();
      const value = part.substring(eqIdx + 1).trim();
      // Skip cookie attributes that aren't name=value pairs
      if (!name || !value) return null;
      const lowerName = name.toLowerCase();
      if (
        ["path", "domain", "expires", "max-age", "secure", "httponly", "samesite"].includes(
          lowerName
        )
      ) {
        return null;
      }
      return { name, value };
    })
    .filter(Boolean) as Array<{ name: string; value: string }>;
}

/**
 * Parse Gemini StreamGenerate response text.
 *
 * Response format:
 *   )]}'
 *   <length>
 *   [["wrb.fr", null, "<JSON string>"]]
 *   <length>
 *   [["wrb.fr", null, "<JSON string>"]]
 *
 * The JSON string contains nested array: inner[4][0][1] = ["text chunks"].
 * Each wrb.fr line is a CUMULATIVE snapshot of the whole answer generated so
 * far (not an independent delta), so we keep only the text from the LAST
 * frame that yields non-empty text instead of concatenating every frame —
 * concatenating would reproduce the same growing text with each snapshot
 * (see #7163).
 */
export function parseStreamResponse(raw: string): string {
  const lines = raw.split("\n");
  let lastText = "";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === ")]}'" || /^\d+$/.test(line)) continue;
    if (!line.includes("wrb.fr")) continue;
    try {
      const arr = JSON.parse(line);
      if (!Array.isArray(arr) || !Array.isArray(arr[0]) || arr[0][0] !== "wrb.fr") continue;
      const payload = arr[0]?.[2];
      if (typeof payload !== "string") continue;
      const inner = JSON.parse(payload);
      // Defensive: check each level before accessing
      const responseArray = inner?.[4]?.[0]?.[1];
      if (!Array.isArray(responseArray)) continue;
      const text = responseArray.filter((c: unknown) => typeof c === "string").join("");
      if (text) lastText = text;
    } catch {
      // Skip unparseable lines
    }
  }
  return lastText;
}

function readCredentialString(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "";
}

function readProviderSpecificString(
  providerSpecificData: unknown,
  keys: readonly string[]
): string {
  if (
    !providerSpecificData ||
    typeof providerSpecificData !== "object" ||
    Array.isArray(providerSpecificData)
  ) {
    return "";
  }
  const data = providerSpecificData as Record<string, unknown>;
  for (const key of keys) {
    const value = readCredentialString(data[key]);
    if (value) return value;
  }
  return "";
}

/**
 * Merge rotated __Secure-1PSID* cookies read back from the live Playwright
 * cookie jar into the original cookie string. Only the three long-lived
 * Gemini auth cookies are considered — pulling in the entire jar would risk
 * treating short-lived Google analytics/consent cookies as credentials
 * (#7676). Cookies the jar didn't return, or that are unchanged, are left
 * untouched in the original string.
 */
export function mergeRotatedGeminiCookies(
  originalCookie: string,
  jarCookies: Array<{ name: string; value: string }>
): string {
  const ROTATABLE_NAMES = ["__Secure-1PSID", "__Secure-1PSIDTS", "__Secure-1PSIDCC"];
  const jarByName = new Map(jarCookies.map((c) => [c.name, c.value]));

  const pairs = parseCookies(originalCookie);
  const seen = new Set<string>();
  const merged = pairs.map(({ name, value }) => {
    seen.add(name);
    if (ROTATABLE_NAMES.includes(name) && jarByName.has(name)) {
      return { name, value: jarByName.get(name) as string };
    }
    return { name, value };
  });

  for (const name of ROTATABLE_NAMES) {
    if (!seen.has(name) && jarByName.has(name)) {
      merged.push({ name, value: jarByName.get(name) as string });
    }
  }

  return merged.map(({ name, value }) => `${name}=${value}`).join("; ");
}

function normalizeGeminiCookieInput(raw: string, cookieName = "__Secure-1PSID"): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed.includes("=") ? trimmed : `${cookieName}=${trimmed}`;
}

function resolveGeminiWebCookie(credentials: ExecuteInput["credentials"]): string {
  const directCookie =
    readCredentialString(credentials?.apiKey) ||
    readCredentialString((credentials as Record<string, unknown> | undefined)?.cookie);
  if (directCookie) return normalizeGeminiCookieInput(directCookie);

  const providerSpecificData = credentials?.providerSpecificData;
  const cookie = readProviderSpecificString(providerSpecificData, ["cookie"]);
  if (cookie) return normalizeGeminiCookieInput(cookie);

  const psid = readProviderSpecificString(providerSpecificData, ["__Secure-1PSID"]);
  const psidts = readProviderSpecificString(providerSpecificData, ["__Secure-1PSIDTS"]);
  return [
    psid ? normalizeGeminiCookieInput(psid, "__Secure-1PSID") : "",
    psidts ? normalizeGeminiCookieInput(psidts, "__Secure-1PSIDTS") : "",
  ]
    .filter(Boolean)
    .join("; ");
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class GeminiWebExecutor extends BaseExecutor {
  constructor() {
    super("gemini-web", { id: "gemini-web", baseUrl: GEMINI_URL });
  }

  /**
   * Read the live Playwright cookie jar back after a successful run and, if
   * Google rotated any of the __Secure-1PSID* cookies, forward the merged
   * cookie string through onCredentialsRefreshed so it gets persisted to the
   * encrypted provider_connections.api_key field. Mirrors the rotate-and-
   * persist pattern already shipped in chatgpt-web.ts. A persistence failure
   * must never fail the user-facing response (#7676).
   */
  private async persistRotatedCookies(
    context: import("playwright").BrowserContext,
    cookie: string,
    credentials: ExecuteInput["credentials"],
    onCredentialsRefreshed: ExecuteInput["onCredentialsRefreshed"],
    log: ExecuteInput["log"]
  ): Promise<void> {
    if (!onCredentialsRefreshed) return;
    try {
      const jarCookies = await context.cookies();
      const mergedCookie = mergeRotatedGeminiCookies(cookie, jarCookies);
      if (mergedCookie && mergedCookie !== cookie) {
        await onCredentialsRefreshed({ ...credentials, apiKey: mergedCookie });
      }
    } catch (err) {
      log?.warn?.(
        "GEMINI-WEB",
        `Failed to persist rotated cookie: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal, log, onCredentialsRefreshed } = input;
    const requestBody = body as GeminiRequestBody;

    const cookie = resolveGeminiWebCookie(credentials);
    if (!cookie) {
      return {
        response: new Response(JSON.stringify({ error: "Missing Gemini cookies" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
        url: GEMINI_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const messages = requestBody.messages || [];
    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(
      body as Record<string, unknown>,
      messages
    );

    // hasTools === false: byte-for-byte the original prompt derivation
    // (regression guard — #7286 must not touch the no-tools path).
    const prompt = hasTools
      ? buildGeminiToolPrompt(effectiveMessages)
      : messages.filter((m) => m.role === "user").pop()?.content || "";

    if (!prompt) {
      return {
        response: new Response(JSON.stringify({ error: "No user message found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }),
        url: GEMINI_URL,
        headers: {},
        transformedBody: body,
      };
    }

    let browser: any = null;
    let abortBrowser: (() => void) | null = null;
    try {
      if (signal?.aborted) {
        throw signal.reason instanceof Error ? signal.reason : new Error("Request aborted");
      }
      const { chromium } = await import("playwright");
      browser = await chromium.launch({ headless: true });
      abortBrowser = () => {
        void browser?.close().catch(() => {});
      };
      signal?.addEventListener("abort", abortBrowser, { once: true });

      const context = await browser.newContext({ userAgent: GEMINI_USER_AGENT });

      // Parse cookies — strips attributes like Path, Domain, Expires
      const cookiePairs = parseCookies(cookie);
      await context.addCookies(
        cookiePairs.map(({ name, value }) => ({
          name,
          value,
          domain: ".google.com",
          path: "/",
          secure: true,
        }))
      );

      const page = await context.newPage();

      // Capture first StreamGenerate response
      let responseText = "";
      let captured = false;
      const responsePromise = new Promise<void>((resolve) => {
        page.on("response", async (resp: any) => {
          if (captured || !resp.url().includes("StreamGenerate")) return;
          captured = true;
          try {
            const raw = await resp.text();
            responseText = parseStreamResponse(raw);
          } catch {
            /* ignore */
          }
          resolve();
        });
      });

      await page.goto(GEMINI_URL, { waitUntil: "domcontentloaded", timeout: 20000 });
      if (signal?.aborted) {
        throw signal.reason instanceof Error ? signal.reason : new Error("Request aborted");
      }
      await page.waitForTimeout(3000);

      // Type and send message
      const inputEl = await page.waitForSelector(".ql-editor, [contenteditable='true']", {
        timeout: 10000,
      });
      await inputEl.click();
      await page.keyboard.type(prompt, { delay: 10 });
      await page.waitForTimeout(300);
      await page.keyboard.press("Enter");

      // Wait for response or timeout
      await Promise.race([responsePromise, page.waitForTimeout(30000)]);
      if (signal?.aborted) {
        throw signal.reason instanceof Error ? signal.reason : new Error("Request aborted");
      }

      if (!responseText) {
        return {
          response: new Response(JSON.stringify({ error: "No response from Gemini" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
          }),
          url: GEMINI_URL,
          headers: {},
          transformedBody: body,
        };
      }

      await this.persistRotatedCookies(context, cookie, credentials, onCredentialsRefreshed, log);

      const modelId = model || "gemini-2.5-pro";

      if (hasTools) {
        const cid = `chatcmpl-gwe-${crypto.randomUUID().slice(0, 12)}`;
        const created = Math.floor(Date.now() / 1000);
        const toolResponse = await buildGeminiToolResponse(
          responseText,
          requestedTools,
          Boolean(stream),
          modelId,
          cid,
          created
        );
        return { response: toolResponse, url: GEMINI_URL, headers: {}, transformedBody: body };
      }

      if (stream) {
        // Pseudo-streaming: send complete response as single SSE chunk
        // Gemini's StreamGenerate returns complete responses, not chunked streams
        const encoder = new TextEncoder();
        const readable = new ReadableStream(
          {
            start(controller) {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify(formatStreamChunk(responseText, modelId))}\n\n`
                )
              );
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify(formatStreamChunk("", modelId, "stop"))}\n\n`
                )
              );
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
            },
          },
          { highWaterMark: 16384 }
        );
        return {
          response: new Response(readable, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          }),
          url: GEMINI_URL,
          headers: {},
          transformedBody: body,
        };
      }

      return {
        response: new Response(JSON.stringify(formatChatCompletion(responseText, modelId)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url: GEMINI_URL,
        headers: {},
        transformedBody: body,
      };
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : "Unknown error";
      // #3516: a missing Playwright browser is a host/config problem, not a transient upstream
      // fault. Surface an actionable error and tag it with the connection-cooldown hint so
      // accountFallback skips the provider circuit breaker and applies a short, non-exponential
      // cooldown instead of looping on a retryable 500.
      if (isMissingBrowserExecutable(rawMessage)) {
        return {
          response: new Response(
            JSON.stringify({
              error:
                "Gemini Web requires the Playwright Chromium browser, which is not installed. " +
                "Run `npx playwright install chromium` on the host (or rebuild the Docker image with browsers).",
            }),
            {
              status: 503,
              headers: {
                "Content-Type": "application/json",
                "X-Omni-Fallback-Hint": "connection_cooldown",
              },
            }
          ),
          url: GEMINI_URL,
          headers: {},
          transformedBody: body,
        };
      }
      return {
        response: new Response(
          JSON.stringify({
            error: sanitizeErrorMessage(rawMessage),
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        ),
        url: GEMINI_URL,
        headers: {},
        transformedBody: body,
      };
    } finally {
      if (abortBrowser) signal?.removeEventListener("abort", abortBrowser);
      // Always close browser to prevent resource leaks
      if (browser) {
        try {
          await browser.close();
        } catch {
          /* ignore close errors */
        }
      }
    }
  }
}
