/**
 * NotionWebExecutor — Notion AI Web Session Provider (Unofficial/Experimental)
 *
 * Notion AI has no public, documented inference API (see issue #3272, closed
 * by the owner for that reason). This executor instead reverse-engineers the
 * same cookie-authenticated internal endpoint two independent open-source
 * projects already ship (`notion2api`, `Notion-AI-to-OpenAI-Compatible`, both
 * cited in issue #6758): a `token_v2` session cookie posted to
 * `POST /api/v3/runInferenceTranscript`, whose response is a newline-delimited
 * JSON (NDJSON) stream of transcript-patch records. Each record's `value`
 * field carries Notion's standard rich-text tuple shape (`[[text, marks?]]`,
 * the same shape used by Notion's public page-property API) holding the
 * *current* (cumulative, not delta) assistant text — mirroring the snapshot
 * semantics `gemini-web.ts` already handles, so only the last non-empty frame
 * is kept rather than concatenating every frame (see #7163 for why
 * concatenating cumulative snapshots duplicates text).
 *
 * Because the endpoint is undocumented and can change without notice
 * (acknowledged risk in issue #6758), streaming here is pseudo-streaming —
 * the full response is read, parsed, then sent as a single SSE chunk. This is
 * the same conservative tradeoff `gemini-web.ts` makes and is safer than
 * assuming unverified incremental-delta semantics on a live, undocumented API.
 *
 * Auth: Cookie-based (token_v2 [+ optional space_id, notion_browser_id])
 * Method: Direct fetch — no browser automation required.
 */
import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const BASE_URL = "https://www.notion.so";
const NOTION_URL = `${BASE_URL}/api/v3/runInferenceTranscript`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

// ─── Types ──────────────────────────────────────────────────────────────────

interface NotionMessage {
  role: string;
  content: string;
}

interface NotionRequestBody {
  messages?: NotionMessage[];
  model?: string;
}

// ─── Helpers — credential resolution ───────────────────────────────────────

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

/** Normalize a pasted credential to a `name=value` cookie pair. Accepts a bare
 * token or an already-prefixed `token_v2=...` value. */
export function normalizeNotionCookieInput(raw: string, cookieName = "token_v2"): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed.includes("=") ? trimmed : `${cookieName}=${trimmed}`;
}

/**
 * Resolve the Cookie header to send upstream. Accepts, in priority order:
 * 1. A full cookie header pasted as `apiKey` or `credentials.cookie`.
 * 2. `providerSpecificData.cookie` (full header).
 * 3. Structured `providerSpecificData.token_v2` (+ optional `space_id`,
 *    `notion_browser_id`), assembled into a cookie header.
 */
export function resolveNotionWebCookie(credentials: ExecuteInput["credentials"]): string {
  const directCookie =
    readCredentialString(credentials?.apiKey) ||
    readCredentialString((credentials as Record<string, unknown> | undefined)?.cookie);
  if (directCookie) return normalizeNotionCookieInput(directCookie);

  const providerSpecificData = credentials?.providerSpecificData;
  const cookie = readProviderSpecificString(providerSpecificData, ["cookie"]);
  if (cookie) return normalizeNotionCookieInput(cookie);

  const tokenV2 = readProviderSpecificString(providerSpecificData, ["token_v2", "tokenV2"]);
  const spaceId = readProviderSpecificString(providerSpecificData, ["space_id", "spaceId"]);
  const browserId = readProviderSpecificString(providerSpecificData, [
    "notion_browser_id",
    "notionBrowserId",
  ]);
  return [
    tokenV2 ? normalizeNotionCookieInput(tokenV2) : "",
    spaceId ? `space_id=${spaceId}` : "",
    browserId ? `notion_browser_id=${browserId}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Pull `space_id` out of an assembled cookie header, if present. Notion's
 * transcript endpoint accepts an explicit `spaceId` field in the body; when
 * the operator supplied it via cookie we forward it rather than relying on
 * Notion to infer it from the session alone. */
export function extractSpaceIdFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)space_id=([^;]+)/i);
  return match ? match[1].trim() : "";
}

// ─── Helpers — request/response translation ────────────────────────────────

/**
 * Build a Notion `runInferenceTranscript` transcript array from OpenAI-style
 * chat messages. When `notionModel` is set (and not the synthetic `notion-ai`
 * default), a leading `config` entry carries `value.model` so Notion routes the
 * request to the selected codename from getAvailableModels.
 */
export function buildNotionTranscript(
  messages: NotionMessage[],
  notionModel?: string
): Array<Record<string, unknown>> {
  const entries: Array<Record<string, unknown>> = [];
  const trimmedModel = typeof notionModel === "string" ? notionModel.trim() : "";
  const model = trimmedModel && trimmedModel !== "notion-ai" ? trimmedModel : "";
  if (model) {
    entries.push({
      id: randomUUID(),
      type: "config",
      value: {
        type: "workflow",
        model,
        modelFromUser: true,
        useWebSearch: false,
        searchScopes: [{ type: "everything" }],
      },
    });
  }
  for (const m of messages) {
    if (typeof m?.content !== "string" || m.content.length === 0) continue;
    entries.push({
      id: randomUUID(),
      type: m.role === "assistant" ? "ai" : m.role === "system" ? "context" : "human",
      value: [[m.content]],
    });
  }
  return entries;
}

/** Extract plain text from Notion's rich-text tuple value: `[[text, marks?]]`. */
function extractRichText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((segment) => (Array.isArray(segment) && typeof segment[0] === "string" ? segment[0] : ""))
    .join("");
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body. Each line is
 * an independent JSON record; the assistant text lives under a `value` field
 * using the rich-text tuple shape. Frames are cumulative snapshots (mirroring
 * `gemini-web.ts`'s `parseStreamResponse`), so only the last non-empty frame
 * is kept — never concatenated.
 */
export function parseNotionInferenceStream(raw: string): string {
  if (!raw) return "";
  const lines = raw.split("\n");
  let lastText = "";
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    let record: unknown;
    try {
      record = JSON.parse(line);
    } catch {
      continue; // Skip unparseable lines (keep-alive pings, partial frames)
    }
    if (!record || typeof record !== "object" || Array.isArray(record)) continue;
    const text = extractRichText((record as Record<string, unknown>).value);
    if (text) lastText = text;
  }
  return lastText;
}

function chatCompletionResponse(content: string, model: string) {
  return new Response(
    JSON.stringify({
      id: `chatcmpl-notion-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        { index: 0, message: { role: "assistant", content }, finish_reason: "stop" },
      ],
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function pseudoStreamResponse(content: string, model: string) {
  const encoder = new TextEncoder();
  const chunk = (delta: string, finishReason: string | null) => ({
    id: `chatcmpl-notion-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: delta ? { content: delta } : {}, finish_reason: finishReason }],
  });
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk(content, null))}\n\n`));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk("", "stop"))}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
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

// ─── Executor ───────────────────────────────────────────────────────────────

export class NotionWebExecutor extends BaseExecutor {
  constructor() {
    super("notion-web", { id: "notion-web", baseUrl: NOTION_URL });
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream: wantStream, credentials, signal } = input;
    const requestBody = (body || {}) as NotionRequestBody;

    const cookie = resolveNotionWebCookie(credentials);
    if (!cookie) {
      return makeErrorResult(
        401,
        "Missing Notion token_v2 cookie — paste it from notion.so DevTools → Application → Cookies",
        body,
        NOTION_URL
      );
    }

    const messages = requestBody.messages || [];
    if (!messages.some((m) => m.role === "user")) {
      return makeErrorResult(400, "No user message found", body, NOTION_URL);
    }

    const spaceId = extractSpaceIdFromCookie(cookie);
    const modelId = model || "notion-ai";
    const reqBody: Record<string, unknown> = {
      traceId: randomUUID(),
      transcript: buildNotionTranscript(messages, modelId),
      createThread: false,
      asPatchResponse: true,
      threadType: "workflow",
      createdSource: "ai_module",
    };
    if (spaceId) reqBody.spaceId = spaceId;

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: "application/x-ndjson",
      Cookie: cookie,
      Origin: BASE_URL,
      Referer: `${BASE_URL}/`,
    };

    let upstream: Response;
    try {
      upstream = await fetch(NOTION_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal: signal ?? undefined,
      });
    } catch (err) {
      return makeErrorResult(
        502,
        `Notion fetch failed: ${err instanceof Error ? err.message : "unknown error"}`,
        reqBody,
        NOTION_URL
      );
    }

    if (upstream.status === 401 || upstream.status === 403) {
      return makeErrorResult(
        upstream.status,
        "Notion session expired or invalid — re-paste token_v2 from notion.so",
        reqBody,
        NOTION_URL
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Notion error: ${errText}`, reqBody, NOTION_URL);
    }

    const rawText = await upstream.text();
    const finalText = parseNotionInferenceStream(rawText);
    if (!finalText) {
      return makeErrorResult(502, "No response from Notion AI", reqBody, NOTION_URL);
    }

    const response = wantStream
      ? pseudoStreamResponse(finalText, modelId)
      : chatCompletionResponse(finalText, modelId);

    return { response, url: NOTION_URL, headers: reqHeaders, transformedBody: reqBody };
  }
}
