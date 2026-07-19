/**
 * NotionWebExecutor — Notion AI Web Session Provider (Unofficial/Experimental)
 *
 * Notion AI has no public, documented inference API (see issue #3272, closed
 * by the owner for that reason). This executor reverse-engineers the same
 * cookie-authenticated internal endpoint used by open-source bridges
 * (notion2api / Notion2API-go, cited in issue #6758): a `token_v2` session
 * cookie posted to `POST /api/v3/runInferenceTranscript`.
 *
 * Live capture (2026-07-19) against a Business workspace confirmed the
 * contract that actually works:
 *   - createThread: true + a fresh threadId (createThread:false → ValidationError 400)
 *   - transcript starts with config + context, then user/assistant steps
 *   - x-notion-space-id + x-notion-active-user-header required
 *   - response is NDJSON patch-start / patch / record-map (not legacy rich-text
 *     tuples alone). Text is extracted from agent-inference / markdown-chat.
 *
 * Streaming is still pseudo-streaming: read full body, parse, emit one SSE
 * chunk — safer than assuming unverified incremental-delta semantics.
 *
 * Auth: Cookie-based (token_v2 [+ optional space_id, notion_browser_id, user_id])
 * Method: Direct fetch — no browser automation required.
 */
import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  extractNotionUserIdFromCookie,
  resolveNotionCodename,
  resolveNotionRuntimeWorkspace,
} from "../services/notionWebModels.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

// Both app.notion.com and www.notion.so work; prefer the AI surface host.
const BASE_URL = "https://app.notion.com";
const NOTION_URL = `${BASE_URL}/api/v3/runInferenceTranscript`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36";
const NOTION_CLIENT_VERSION = "23.13.20260719.1125";

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
  const userId = readProviderSpecificString(providerSpecificData, [
    "notion_user_id",
    "notionUserId",
    "user_id",
    "userId",
  ]);
  const browserId = readProviderSpecificString(providerSpecificData, [
    "notion_browser_id",
    "notionBrowserId",
  ]);
  return [
    tokenV2 ? normalizeNotionCookieInput(tokenV2) : "",
    spaceId ? `space_id=${spaceId}` : "",
    userId ? `notion_user_id=${userId}` : "",
    browserId ? `notion_browser_id=${browserId}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Pull `space_id` out of an assembled cookie header, if present. */
export function extractSpaceIdFromCookie(cookie: string): string {
  const match = cookie.match(/(?:^|;\s*)space_id=([^;]+)/i);
  if (match) return match[1].trim();
  const camel = cookie.match(/(?:^|;\s*)spaceId=([^;]+)/);
  return camel ? camel[1].trim() : "";
}

function extractUserIdFromCookie(cookie: string): string {
  return extractNotionUserIdFromCookie(cookie);
}

function isoNow(): string {
  // Millisecond precision matches the browser client.
  return new Date().toISOString().replace(/\.\d{3}Z$/, (m) => m); // keep ms + Z
}

// ─── Helpers — request/response translation ────────────────────────────────

/**
 * Build a Notion `runInferenceTranscript` transcript array from OpenAI-style
 * chat messages.
 *
 * Live contract (verified 2026-07-19):
 * - Leading `config` (workflow + optional model food-codename)
 * - Leading `context` (spaceId / userId / surface / timezone)
 * - User turns as `type: "user"` (legacy `human` also works with createThread,
 *   but `user` matches the current web client)
 * - Assistant turns as `agent-inference` text parts
 */
function buildNotionConfigStep(model: string): Record<string, unknown> {
  const configValue: Record<string, unknown> = {
    type: "workflow",
    useWebSearch: false,
    searchScopes: [{ type: "everything" }],
    modelFromUser: Boolean(model),
    enableAgentAutomations: false,
    enableAgentIntegrations: false,
    enableCustomAgents: false,
    enableDatabaseAgents: false,
    enableUserSessionContext: false,
    isCustomAgent: false,
  };
  if (model) configValue.model = model;
  return { id: randomUUID(), type: "config", value: configValue };
}

function buildNotionContextValue(opts: {
  spaceId?: string;
  userId?: string;
  now: string;
}): Record<string, unknown> {
  const contextValue: Record<string, unknown> = {
    timezone: "UTC",
    surface: "ai_module",
    currentDatetime: opts.now,
  };
  if (opts.spaceId) contextValue.spaceId = opts.spaceId;
  if (opts.userId) contextValue.userId = opts.userId;
  return contextValue;
}

/** Converts one OpenAI-style message into a transcript step, or `null` when it
 * was folded into the context (system prompts). */
function buildNotionMessageStep(
  m: NotionMessage,
  contextValue: Record<string, unknown>,
  opts: { userId?: string; now: string }
): Record<string, unknown> | null {
  if (typeof m?.content !== "string" || m.content.length === 0) return null;
  const role = (m.role || "").toLowerCase();

  if (role === "system") {
    // Fold system prompts into context instructions rather than a separate step.
    const existing = typeof contextValue.instructions === "string" ? contextValue.instructions : "";
    contextValue.instructions = existing ? `${existing}\n${m.content}` : m.content;
    return null;
  }

  if (role === "assistant") {
    return {
      id: randomUUID(),
      type: "agent-inference",
      value: [{ type: "text", content: m.content }],
    };
  }

  // user (and anything else treated as user)
  const userStep: Record<string, unknown> = {
    id: randomUUID(),
    type: "user",
    value: [[m.content]],
    createdAt: opts.now,
  };
  if (opts.userId) userStep.userId = opts.userId;
  return userStep;
}

export function buildNotionTranscript(
  messages: NotionMessage[],
  opts: {
    notionModel?: string;
    spaceId?: string;
    userId?: string;
  } = {}
): Array<Record<string, unknown>> {
  const trimmedModel = typeof opts.notionModel === "string" ? opts.notionModel.trim() : "";
  const model = trimmedModel && trimmedModel !== "notion-ai" ? trimmedModel : "";
  const now = isoNow();

  const contextValue = buildNotionContextValue({ spaceId: opts.spaceId, userId: opts.userId, now });
  const entries: Array<Record<string, unknown>> = [
    buildNotionConfigStep(model),
    { id: randomUUID(), type: "context", value: contextValue },
  ];

  for (const m of messages) {
    const step = buildNotionMessageStep(m, contextValue, { userId: opts.userId, now });
    if (step) entries.push(step);
  }
  return entries;
}

/** Strip Notion's `<lang primary="…"/>` prefix and similar noise from answers. */
export function sanitizeNotionAssistantText(text: string): string {
  if (!text) return "";
  let clean = text.replace(/^\uFEFF/, "").trim();
  // Self-closing or paired lang tags at the start (and anywhere).
  clean = clean.replace(/<\/?lang\b[^>]*\/?>/gi, "");
  clean = clean.replace(/<\/lang>/gi, "");
  // Incomplete leading <lang… without close
  if (/^<lang\b/i.test(clean) && !clean.includes(">")) return "";
  return clean.trim();
}

/** Extract plain text from Notion's rich-text tuple value: `[[text, marks?]]`. */
function extractRichText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((segment) => (Array.isArray(segment) && typeof segment[0] === "string" ? segment[0] : ""))
    .join("");
}

function extractAgentInferenceText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  const parts: string[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const part = item as Record<string, unknown>;
    const t = typeof part.type === "string" ? part.type.toLowerCase() : "";
    if (t === "text" && typeof part.content === "string" && part.content) {
      parts.push(part.content);
    }
  }
  return parts.join("");
}

/** Unwraps `thread_message[key].value.value.step` from a Notion record-map entry. */
function extractThreadMessageStep(msg: unknown): Record<string, unknown> | null {
  if (!msg || typeof msg !== "object") return null;
  const valueWrapper = (msg as Record<string, unknown>).value;
  if (!valueWrapper || typeof valueWrapper !== "object") return null;
  const inner = (valueWrapper as Record<string, unknown>).value;
  if (!inner || typeof inner !== "object") return null;
  const step = (inner as Record<string, unknown>).step;
  if (!step || typeof step !== "object") return null;
  return step as Record<string, unknown>;
}

/** Extracts the text carried by a single thread-message step, or "" if none. */
function extractStepText(stepObj: Record<string, unknown>): string {
  const stepType = typeof stepObj.type === "string" ? stepObj.type : "";
  if (stepType === "agent-inference") {
    return extractAgentInferenceText(stepObj.value);
  }
  if (stepType === "markdown-chat" && typeof stepObj.value === "string") {
    return stepObj.value;
  }
  return "";
}

function extractFromRecordMap(recordMap: unknown): string {
  if (!recordMap || typeof recordMap !== "object" || Array.isArray(recordMap)) return "";
  const tm = (recordMap as Record<string, unknown>).thread_message;
  if (!tm || typeof tm !== "object" || Array.isArray(tm)) return "";
  let best = "";
  for (const msg of Object.values(tm as Record<string, unknown>)) {
    const stepObj = extractThreadMessageStep(msg);
    if (!stepObj) continue;
    const text = extractStepText(stepObj);
    if (text && text.length >= best.length) best = text;
  }
  return best;
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body.
 * Supports:
 * 1. Legacy rich-text tuples on `value` (cumulative snapshots)
 * 2. Modern patch-start / patch streams (text / markdown-chat ops)
 * 3. Terminal record-map with agent-inference steps (authoritative final)
 */
/** Accumulator threaded through {@link parseNotionInferenceStream}'s line parsing. */
type NotionStreamState = {
  lastLegacy: string;
  lastPatchFinal: string;
  lastIncremental: string;
  lastRecordMap: string;
};

/** Applies one `patch` op (full text-part append / step append / incremental string) to state. */
/** Full agent-inference text-part append: `o:"a", p:".../value/-"`. */
function applyNotionValuePartAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const part = v as Record<string, unknown>;
  if (part.type === "text" && typeof part.content === "string" && part.content) {
    state.lastPatchFinal = part.content;
  }
  if (part.type === "markdown-chat" && typeof part.value === "string" && part.value) {
    state.lastPatchFinal = part.value;
  }
}

/** Step append with markdown-chat / agent-inference: `o:"a", p:".../s/-"`. */
function applyNotionStepAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const step = v as Record<string, unknown>;
  if (step.type === "markdown-chat" && typeof step.value === "string" && step.value) {
    state.lastPatchFinal = step.value;
  }
  if (step.type === "agent-inference") {
    const text = extractAgentInferenceText(step.value);
    if (text) state.lastPatchFinal = text;
  }
}

function applyNotionPatchOp(rawOp: unknown, state: NotionStreamState): void {
  if (!rawOp || typeof rawOp !== "object") return;
  const op = rawOp as Record<string, unknown>;
  const o = typeof op.o === "string" ? op.o : "";
  const p = typeof op.p === "string" ? op.p : "";
  const v = op.v;

  if (o === "a" && p.endsWith("/value/-")) {
    applyNotionValuePartAppend(v, state);
  } else if (o === "a" && p.endsWith("/s/-")) {
    applyNotionStepAppend(v, state);
  } else if ((o === "x" || o === "p") && p.includes("/value") && typeof v === "string" && v) {
    // Incremental string patches
    state.lastIncremental += v;
  }
}

/** Applies one parsed NDJSON record (markdown-chat / agent-inference / patch / record-map / legacy). */
function applyNotionStreamRecord(rec: Record<string, unknown>, state: NotionStreamState): void {
  const type = typeof rec.type === "string" ? rec.type : "";

  // 1) Direct markdown-chat event
  if (type === "markdown-chat" && typeof rec.value === "string" && rec.value) {
    state.lastPatchFinal = rec.value;
    return;
  }

  // 2) Direct agent-inference event
  if (type === "agent-inference") {
    const text = extractAgentInferenceText(rec.value);
    if (text) state.lastPatchFinal = text;
    return;
  }

  // 3) Patch stream
  if (type === "patch" && Array.isArray(rec.v)) {
    for (const rawOp of rec.v) applyNotionPatchOp(rawOp, state);
    return;
  }

  // 4) record-map terminal
  if (type === "record-map" || rec.recordMap) {
    const text = extractFromRecordMap(rec.recordMap || rec);
    if (text) state.lastRecordMap = text;
    return;
  }

  // 5) Legacy rich-text value (cumulative)
  const rich = extractRichText(rec.value);
  if (rich) state.lastLegacy = rich;
}

/** Parses one raw NDJSON line (trims / strips SSE `data:` prefix / JSON-parses) into state. */
function applyNotionStreamLine(rawLine: string, state: NotionStreamState): void {
  const line = rawLine.trim();
  if (!line || line === "[DONE]") return;
  // Strip optional SSE "data:" prefix if a proxy rewrote it.
  const payloadLine = line.startsWith("data:") ? line.slice(5).trim() : line;
  if (!payloadLine) return;

  let record: unknown;
  try {
    record = JSON.parse(payloadLine);
  } catch {
    return;
  }
  if (!record || typeof record !== "object" || Array.isArray(record)) return;
  applyNotionStreamRecord(record as Record<string, unknown>, state);
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body.
 * Supports:
 * 1. Legacy rich-text tuples on `value` (cumulative snapshots)
 * 2. Modern patch-start / patch streams (text / markdown-chat ops)
 * 3. Terminal record-map with agent-inference steps (authoritative final)
 */
export function parseNotionInferenceStream(raw: string): string {
  if (!raw) return "";
  const state: NotionStreamState = {
    lastLegacy: "",
    lastPatchFinal: "",
    lastIncremental: "",
    lastRecordMap: "",
  };

  for (const rawLine of raw.split("\n")) {
    applyNotionStreamLine(rawLine, state);
  }

  const candidates = [state.lastRecordMap, state.lastPatchFinal, state.lastIncremental, state.lastLegacy]
    .map(sanitizeNotionAssistantText)
    .filter(Boolean);
  // Prefer the longest non-empty candidate; record-map usually wins.
  return candidates.sort((a, b) => b.length - a.length)[0] || "";
}

/**
 * Notion's undocumented inference API does not return token usage.
 * Emit a cheap char-based estimate so clients don't see a constant
 * `USAGE_TOKEN_BUFFER` (default 2000) from buffering an all-zero stub.
 * chatCore may still add the safety buffer on top of real estimates.
 */
export function estimateNotionUsage(
  messages: NotionMessage[] | undefined,
  content: string
): { prompt_tokens: number; completion_tokens: number; total_tokens: number; estimated: true } {
  const promptText = (messages || [])
    .map((m) => (typeof m?.content === "string" ? m.content : ""))
    .join("\n");
  // ~4 chars/token (English-ish); at least 1 when there is any text.
  const prompt_tokens = promptText
    ? Math.max(1, Math.ceil(promptText.length / 4))
    : 0;
  const completion_tokens = content
    ? Math.max(1, Math.ceil(content.length / 4))
    : 0;
  return {
    prompt_tokens,
    completion_tokens,
    total_tokens: prompt_tokens + completion_tokens,
    estimated: true,
  };
}

function chatCompletionResponse(
  content: string,
  model: string,
  messages?: NotionMessage[]
) {
  return new Response(
    JSON.stringify({
      id: `chatcmpl-notion-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        { index: 0, message: { role: "assistant", content }, finish_reason: "stop" },
      ],
      usage: estimateNotionUsage(messages, content),
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

function clientFacingModelId(model: unknown): string {
  let clientFacingModel = typeof model === "string" ? model.trim() : "";
  if (clientFacingModel.startsWith("notion-web/")) {
    clientFacingModel = clientFacingModel.slice("notion-web/".length);
  } else if (clientFacingModel.startsWith("nw/")) {
    clientFacingModel = clientFacingModel.slice(3);
  }
  return clientFacingModel;
}

/** Resolves workspace + user (cached). Required for createThread payloads. */
async function resolveExecuteWorkspace(
  cookie: string,
  signal: ExecuteInput["signal"]
): Promise<{ spaceId: string; userId: string }> {
  let spaceId = extractSpaceIdFromCookie(cookie);
  let userId = extractUserIdFromCookie(cookie);
  try {
    const resolved = await resolveNotionRuntimeWorkspace({ cookie, signal });
    if (!spaceId) spaceId = resolved.spaceId;
    if (!userId) userId = resolved.userId;
  } catch {
    // keep cookie-derived values
  }
  return { spaceId, userId };
}

/** Live-verified working shape (createThread:false without threadId → 400 ValidationError). */
function buildNotionCreateThreadRequestBody(opts: {
  spaceId: string;
  userId: string;
  threadId: string;
  transcript: unknown;
}): Record<string, unknown> {
  const { spaceId, threadId, transcript } = opts;
  return {
    traceId: randomUUID(),
    spaceId,
    threadId,
    createThread: true,
    generateTitle: true,
    asPatchResponse: true,
    isPartialTranscript: false,
    saveAllThreadOperations: true,
    setUnreadState: true,
    createdSource: "ai_module",
    threadType: "workflow",
    transcript,
    threadParentPointer: {
      table: "space",
      id: spaceId,
      spaceId,
    },
    debugOverrides: {
      annotationInferences: {},
      cachedInferences: {},
      emitAgentSearchExtractedResults: true,
      emitInferences: false,
    },
  };
}

function buildNotionExecuteHeaders(opts: {
  cookie: string;
  spaceId: string;
  userId: string;
}): Record<string, string> {
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Accept: "application/x-ndjson",
    Cookie: opts.cookie,
    Origin: BASE_URL,
    Referer: `${BASE_URL}/ai`,
    "notion-client-version": NOTION_CLIENT_VERSION,
    "notion-audit-log-platform": "web",
    "x-notion-space-id": opts.spaceId,
    "Accept-Language": "en-US,en;q=0.9",
  };
  if (opts.userId) reqHeaders["x-notion-active-user-header"] = opts.userId;
  return reqHeaders;
}

/**
 * Sends the createThread request to Notion and returns either the raw
 * inference text or an error result — callers just check `.errorResult`.
 */
async function sendNotionInferenceRequest(opts: {
  reqBody: Record<string, unknown>;
  reqHeaders: Record<string, string>;
  signal: ExecuteInput["signal"];
}): Promise<{ rawText?: string; errorResult?: ReturnType<typeof makeErrorResult> }> {
  const { reqBody, reqHeaders, signal } = opts;
  let upstream: Response;
  try {
    upstream = await fetch(NOTION_URL, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
      signal: signal ?? undefined,
    });
  } catch (err) {
    return {
      errorResult: makeErrorResult(
        502,
        `Notion fetch failed: ${err instanceof Error ? err.message : "unknown error"}`,
        reqBody,
        NOTION_URL
      ),
    };
  }

  if (upstream.status === 401 || upstream.status === 403) {
    return {
      errorResult: makeErrorResult(
        upstream.status,
        "Notion session expired or invalid — re-paste token_v2 from notion.so",
        reqBody,
        NOTION_URL
      ),
    };
  }

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return {
      errorResult: makeErrorResult(upstream.status, `Notion error: ${errText}`, reqBody, NOTION_URL),
    };
  }

  return { rawText: await upstream.text() };
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

    const { spaceId, userId } = await resolveExecuteWorkspace(cookie, signal);

    if (!spaceId) {
      return makeErrorResult(
        400,
        "Could not resolve Notion spaceId — paste space_id from cookies or ensure token_v2 can call getSpaces",
        body,
        NOTION_URL
      );
    }

    // Client may send notion-web/fable-5, nw/fable-5, fable-5, "Fable 5", or the
    // legacy food codename (acai-budino-high). Notion only accepts the food codename
    // on the wire; we echo the client-facing id in the OpenAI response.
    const notionCodename = resolveNotionCodename(model);
    const clientFacing = clientFacingModelId(model);
    const modelId = clientFacing || notionCodename || "notion-ai";

    const threadId = randomUUID();
    const transcript = buildNotionTranscript(messages, {
      notionModel: notionCodename || undefined,
      spaceId,
      userId: userId || undefined,
    });

    const reqBody = buildNotionCreateThreadRequestBody({ spaceId, userId, threadId, transcript });
    const reqHeaders = buildNotionExecuteHeaders({ cookie, spaceId, userId });

    const { rawText, errorResult } = await sendNotionInferenceRequest({ reqBody, reqHeaders, signal });
    if (errorResult) return errorResult;

    const finalText = parseNotionInferenceStream(rawText || "");
    if (!finalText) {
      return makeErrorResult(502, "No response from Notion AI", reqBody, NOTION_URL);
    }

    const response = wantStream
      ? pseudoStreamResponse(finalText, modelId)
      : chatCompletionResponse(finalText, modelId, messages);

    return { response, url: NOTION_URL, headers: reqHeaders, transformedBody: reqBody };
  }
}
