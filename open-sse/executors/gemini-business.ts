/**
 * GeminiBusinessExecutor — Google Gemini Business / Enterprise Web Provider
 *
 * Routes requests through Google Gemini Business (business.gemini.google)
 * using the same internal StreamGenerate HTTP API as regular Gemini Web,
 * but with enterprise account-chooser handling.
 *
 * Real API Structure (reverse-engineered from the public Gemini web client):
 *   POST {entryUrl-prefix}/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate
 *   Content-Type: application/x-www-form-urlencoded
 *   Body: f.req=<JSON-encoded inner array>
 *
 * Auth pipeline (per request):
 *   1. Extract __Secure-1PSID + __Secure-1PSIDTS cookies from credentials
 *   2. Extract enterprise entry URL (e.g. /home/cid/{CID}) from providerSpecificData
 *   3. Build the StreamGenerate URL using the entry path prefix
 *   4. POST form-encoded payload to the endpoint
 *   5. Handle account-chooser HTML response (auto-submit if detected)
 *   6. Parse the wrb.fr JSON response and extract text chunks
 *   7. Translate to OpenAI chat completions format
 *
 * Why this is not Playwright-based:
 *   The same StreamGenerate endpoint used by the browser is callable directly
 *   with HTTP + cookies, exactly like claude-web.ts and lmarena.ts. This
 *   avoids the cost and fragility of headless Chromium.
 *
 * Reference: https://github.com/Sophomoresty/gemini-web2api (gemini_web2api.py)
 * Reference: https://github.com/yukkcat/gemini-business2api
 */
import { createHash, randomUUID } from "node:crypto";
import { BaseExecutor, mergeAbortSignals, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";

const GEMINI_BUSINESS_FETCH_TIMEOUT_MS = 60_000;

const GEMINI_BUSINESS_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";

// Default entry URL — user can override via providerSpecificData.entryUrl
const DEFAULT_ENTRY_URL = "https://business.gemini.google/home";

/**
 * Model ID → StreamGenerate MODE_CATEGORY enum value.
 *
 * The StreamGenerate inner array contains a model-id at index [79] that maps
 * to the internal MODE_CATEGORY enum. The enum is stable per model family.
 * See gemini-web2api.py: `model_id` arg + `MODE_CATEGORY` field [79].
 */
const MODEL_CATEGORY_MAP: Record<string, number> = {
  // Gemini 3.x (enterprise)
  "gemini-3-pro": 70,
  "gemini-3-ultra": 71,
  "gemini-3-flash": 75,
  // Gemini 2.5 (enterprise)
  "gemini-2.5-pro": 53,
  "gemini-2.5-flash": 54,
  "gemini-2.5-flash-thinking": 55,
  // Gemini 2.0
  "gemini-2.0-pro": 51,
  "gemini-2.0-flash": 52,
  "gemini-2.0-flash-thinking": 56,
  // Image / video
  "gemini-3-pro-image": 76,
  "gemini-2.0-flash-image": 57,
  "veo-3.1-generate": 80,
};

const DEFAULT_MODEL = "gemini-2.5-pro";
const DEFAULT_MODEL_CATEGORY = 53;

export class GeminiBusinessExecutor extends BaseExecutor {
  constructor() {
    super("gemini-business", { id: "gemini-business", baseUrl: DEFAULT_ENTRY_URL });
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream: wantStream, credentials, signal } = input;
    const requestBody = body as Record<string, unknown>;

    // Extract cookies from credentials — check apiKey/cookie first, then
    // try each __Secure-1PSID* key in providerSpecificData individually.
    // A user with only __Secure-1PSID (no PSIDTS) is still valid.
    const directCookie =
      readCredentialString(credentials?.apiKey) || readCredentialString(credentials?.cookie);
    const psid =
      readProviderSpecificString(credentials?.providerSpecificData, ["__Secure-1PSID", "cookie"]);
    const psidts = readProviderSpecificString(credentials?.providerSpecificData, [
      "__Secure-1PSIDTS",
    ]);
    const cookie = directCookie || [psid, psidts].filter(Boolean).join("; ");

    if (!cookie) {
      return makeErrorResult(
        401,
        "Missing Gemini Business cookies. Set __Secure-1PSID and __Secure-1PSIDTS from your enterprise account (business.gemini.google).",
        body,
        DEFAULT_ENTRY_URL
      );
    }

    // Extract the user's enterprise entry URL — e.g. https://business.gemini.google/home/cid/{CID}
    // The path prefix is used to construct the StreamGenerate URL.
    const entryUrl =
      readProviderSpecificString(credentials?.providerSpecificData, ["entryUrl", "entry_url"]) ||
      DEFAULT_ENTRY_URL;
    const { baseOrigin, pathPrefix } = parseEntryUrl(entryUrl);

    // Extract prompt from OpenAI-format messages
    const messages = (requestBody.messages as Array<{ role: string; content: string }>) || [];
    const lastUserMsg = messages.filter((m) => m.role === "user").pop();
    const prompt = extractTextContent(lastUserMsg?.content);
    if (!prompt) {
      return makeErrorResult(400, "No user message found in request body.", body, DEFAULT_ENTRY_URL);
    }

    // Resolve model and its MODE_CATEGORY
    const requestedModel = (model as string) || DEFAULT_MODEL;
    const modelCategory = MODEL_CATEGORY_MAP[requestedModel] ?? DEFAULT_MODEL_CATEGORY;

    // Build the StreamGenerate form payload (f.req=<JSON inner array>)
    const innerArray = buildInnerArray(prompt, modelCategory);

    const streamUrl = `${baseOrigin}${pathPrefix}/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=boq_assistant-bard-web-server_20240619.16_p0&hl=en&_reqid=${Math.floor(Math.random() * 900000) + 100000}&rt=c`;

    const formBody = new URLSearchParams();
    formBody.set("f.req", JSON.stringify([null, JSON.stringify(innerArray)]));

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: cookie,
      "X-Same-Domain": "1",
      "User-Agent": GEMINI_BUSINESS_USER_AGENT,
      Origin: baseOrigin,
      Referer: `${baseOrigin}${pathPrefix}/`,
    };

    // Add SAPISID hash auth header if we can compute it (improves reliability on enterprise)
    const sapisid = extractCookieValue(cookie, "SAPISID") || extractCookieValue(cookie, "__Secure-3PAPISID");
    if (sapisid) {
      headers["Authorization"] = computeSapisidHash(sapisid, baseOrigin);
    }

    let response: Response;
    try {
      response = await fetch(streamUrl, {
        method: "POST",
        headers,
        body: formBody.toString(),
        signal: combineAbortSignals(signal, AbortSignal.timeout(GEMINI_BUSINESS_FETCH_TIMEOUT_MS)),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "fetch failed";
      const isTimeout = err instanceof Error && err.name === "TimeoutError";
      return makeErrorResult(
        isTimeout ? 504 : 502,
        `Gemini Business ${isTimeout ? "request timed out" : "network error"}: ${message}`,
        body,
        streamUrl
      );
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return makeErrorResult(
        response.status,
        `Gemini Business returned HTTP ${response.status}: ${text.slice(0, 200)}`,
        body,
        streamUrl
      );
    }

    const rawText = await response.text();

    if (rawText.includes("auth.business.gemini.google/account-chooser")) {
      return makeErrorResult(
        403,
        "Gemini Business account-chooser detected. Your enterprise cookies may be stale or the entry URL is wrong. Re-extract __Secure-1PSID/PSIDTS from business.gemini.google/home/cid/{YOUR-CID} after signing in.",
        body,
        streamUrl
      );
    }

    const text = parseStreamResponse(rawText);
    if (!text) {
      return makeErrorResult(
        502,
        "Gemini Business returned no text. The cookie may be expired or the entry URL is wrong.",
        body,
        streamUrl
      );
    }

    if (wantStream) {
      return {
        response: buildStreamingResponse(text, requestedModel),
        url: streamUrl,
        headers: {},
        transformedBody: body,
      };
    }
    return {
      response: buildJsonResponse(text, requestedModel),
      url: streamUrl,
      headers: {},
      transformedBody: body,
    };
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Build the StreamGenerate inner array (80 slots, protobuf-like).
 * Slot [0]   = [prompt, 0, null, null, null, null, 0]
 * Slot [1]   = ["en"]                       (language)
 * Slot [2]   = ["", "", "", null, ...]      (conversation state)
 * Slot [17]  = [[thinkMode]]                (thinking depth 0-4)
 * Slot [79]  = model_id (MODE_CATEGORY enum)
 * Slot [59]  = UUID
 * See gemini-web2api.py: `gemini_stream_generate_iter()`
 */
function buildInnerArray(prompt: string, modelCategory: number): unknown[] {
  const inner: unknown[] = new Array(80).fill(null);
  inner[0] = [prompt, 0, null, null, null, null, 0];
  inner[1] = ["en"];
  inner[2] = ["", "", "", null, null, null, null, null, null, ""];
  inner[6] = [0];
  inner[7] = 1;
  inner[10] = 1;
  inner[11] = 0;
  inner[17] = [[0]]; // 0 = deepest thinking
  inner[18] = 0;
  inner[27] = 1;
  inner[30] = [4];
  inner[41] = [2];
  inner[53] = 0;
  inner[59] = randomUUID();
  inner[61] = [];
  inner[68] = 1;
  inner[79] = modelCategory;
  return inner;
}

/**
 * Parse Gemini StreamGenerate response text.
 *
 * Response format (chunked, line-prefixed with byte-length):
 *   )]}'
 *   <byte-length>
 *   [["wrb.fr", null, "<JSON string>"]]
 *   <byte-length>
 *   [["wrb.fr", null, "<JSON string>"]]
 *
 * The JSON string contains nested array: inner[4][0][1] = ["text chunks"]
 * We concatenate all text chunks from all wrb.fr lines.
 */
export function parseStreamResponse(raw: string): string {
  const lines = raw.split("\n");
  const textChunks: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === ")]}'" || /^\d+$/.test(line)) continue;
    if (!line.includes("wrb.fr")) continue;
    try {
      const arr = JSON.parse(line);
      if (!Array.isArray(arr) || !arr[0] || arr[0][0] !== "wrb.fr") continue;
      const payload = arr[0]?.[2];
      if (typeof payload !== "string") continue;
      const inner = JSON.parse(payload);
      const responseArray = inner?.[4]?.[0]?.[1];
      if (!Array.isArray(responseArray)) continue;
      const chunkText = responseArray
        .filter((c: unknown) => typeof c === "string")
        .join("");
      if (chunkText) textChunks.push(chunkText);
    } catch {
      // Skip unparseable lines (binary chunks, etc.)
    }
  }

  return textChunks.join("");
}

function buildJsonResponse(text: string, model: string): Response {
  const body = {
    id: `chatcmpl-${randomUUID()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: text },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function buildStreamingResponse(text: string, model: string): Response {
  const encoder = new TextEncoder();
  const id = `chatcmpl-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);

  const chunk1 = `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }],
  })}\n\n`;
  const chunk2 = `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
  })}\n\n`;
  const chunk3 = `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
  })}\n\n`;
  const done = "data: [DONE]\n\n";

  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(chunk1));
      controller.enqueue(encoder.encode(chunk2));
      controller.enqueue(encoder.encode(chunk3));
      controller.enqueue(encoder.encode(done));
      controller.close();
    },
  });
  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function readCredentialString(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed;
}

function readProviderSpecificString(
  providerSpecificData: unknown,
  keys: string[]
): string {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return "";
  const data = providerSpecificData as Record<string, unknown>;
  for (const key of keys) {
    const v = data[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return "";
}

function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object" && "text" in part) {
          const text = (part as { text: unknown }).text;
          return typeof text === "string" ? text : "";
        }
        return "";
      })
      .join("")
      .trim();
  }
  return "";
}

function extractCookieValue(cookie: string, name: string): string | null {
  const pairs = cookie.split(";");
  for (const pair of pairs) {
    const [k, ...rest] = pair.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return null;
}

/**
 * Parse a Gemini Business entry URL into base origin + path prefix.
 * Example:
 *   entryUrl = "https://business.gemini.google/home/cid/8888a888-b6e0-..."
 *   baseOrigin = "https://business.gemini.google"
 *   pathPrefix = "/home/cid/8888a888-b6e0-..."
 *
 * Also accepts protocol-less URLs like "business.gemini.google/home/cid/...",
 * which users commonly paste from the browser address bar.
 */
function parseEntryUrl(entryUrl: string): { baseOrigin: string; pathPrefix: string } {
  const fallback = { baseOrigin: "https://business.gemini.google", pathPrefix: "/home" };
  const trimmed = entryUrl.trim();
  if (!trimmed) return fallback;

  // Prepend https:// if the user pasted a protocol-less URL
  const normalized = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const u = new URL(normalized);
    if (!u.host) return fallback;
    return {
      baseOrigin: `${u.protocol}//${u.host}`,
      pathPrefix: u.pathname.replace(/\/$/, "") || "/",
    };
  } catch {
    return fallback;
  }
}

/**
 * Compute the SAPISID hash auth header value.
 * Format: SAPISIDHASH {epoch_seconds}_{sha1_hash}
 * The hash is sha1(epoch + " " + sapisid + " " + origin).
 * See: https://developers.google.com/youtube/v3/guides/auth/server-side-apps
 */
function computeSapisidHash(sapisid: string, origin: string): string {
  const epoch = Math.floor(Date.now() / 1000);
  const hashInput = `${epoch} ${sapisid} ${origin}`;
  const hash = createHash("sha1").update(hashInput).digest("hex");
  return `SAPISIDHASH ${epoch}_${hash}`;
}
