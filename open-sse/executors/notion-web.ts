/**
 * NotionWebExecutor — Notion AI Web Session Provider (Unofficial/Experimental)
 *
 * Notion AI has no public, documented inference API (see issue #3272, closed
 * by the owner for that reason). This executor reverse-engineers the same
 * cookie-authenticated internal endpoint used by open-source bridges
 * (notion2api / Notion2API-go, cited in issue #6758): a `token_v2` session
 * cookie posted to `POST /api/v3/runInferenceTranscript`.
 *
 * Live capture (2026-07-19 / 2026-07-20) against a Business workspace confirmed:
 *   - First turn: createThread: true + a fresh threadId
 *     (createThread:false without a known threadId → ValidationError 400)
 *   - Follow-ups: createThread: false + the SAME threadId + full transcript
 *     (OpenAI multi-turn messages[] maps to one Notion AI chat; a new UUID
 *     every request forces a new chat and breaks agent/tool continuity)
 *   - transcript starts with config + context, then user/assistant steps
 *   - x-notion-space-id + x-notion-active-user-header required
 *   - response is NDJSON patch-start / patch / record-map (not legacy rich-text
 *     tuples alone). Text is extracted from agent-inference / markdown-chat.
 *
 * Streaming is still pseudo-streaming: read full body, parse, emit one SSE
 * chunk — safer than assuming unverified incremental-delta semantics.
 *
 * Auth: Cookie-based (token_v2 [+ optional space_id, notion_browser_id, user_id])
 * Method: Browser-TLS impersonation via tls-client-node (Chrome JA3). Plain
 * Node/undici fetch is rejected by Notion's edge with in-band
 * `temporarily-unavailable` (HTTP 200, empty assistant text) — curl/Schannel
 * and Chrome work with the same cookie + body. See services/notionTlsClient.ts.
 */
import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  BROWSER_HEADERS,
  extractNotionUserIdFromCookie,
  resolveNotionCodename,
  resolveNotionRuntimeWorkspace,
} from "../services/notionWebModels.ts";
import {
  __resetNotionThreadSessionsForTests,
  conversationPrefixBeforeLastUser,
  extractNotionMessageText,
  hashNotionConversation,
  notionThreadMarkConfirmed,
  notionThreadMarkCreateAttempted,
  notionThreadSessionLookup,
  notionThreadSessionStore,
  readClientThreadId,
  hashNotionCallerCookie,
  resolveNotionThreadBinding,
  type NotionMessage,
} from "../services/notionThreadSessions.ts";
import {
  extractNotionUpstreamError,
  parseNotionInferenceStream,
  sanitizeNotionAssistantText,
} from "../services/notionStreamParser.ts";
import {
  buildNotionTranscript,
  messagesForNotionTranscript,
  type NotionAgentOptions,
} from "../services/notionTranscriptBuilder.ts";
import {
  tlsFetchNotion,
  TlsClientUnavailableError,
} from "../services/notionTlsClient.ts";

// Re-exported for unit tests that destructure `mod.<name>` on this module.
export {
  __resetNotionThreadSessionsForTests,
  buildNotionTranscript,
  conversationPrefixBeforeLastUser,
  extractNotionUpstreamError,
  hashNotionConversation,
  notionThreadSessionLookup,
  notionThreadSessionStore,
  parseNotionInferenceStream,
  resolveNotionThreadBinding,
  notionThreadMarkCreateAttempted,
  sanitizeNotionAssistantText,
};

// ─── Constants ──────────────────────────────────────────────────────────────

// Both app.notion.com and www.notion.so work; prefer the AI surface host.
const BASE_URL = "https://app.notion.com";
const NOTION_URL = `${BASE_URL}/api/v3/runInferenceTranscript`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36";
// Match a recent live browser capture (web_providers/notion.txt, 2026-07-20).
const NOTION_CLIENT_VERSION = "23.13.20260720.1949";

// ─── Types ──────────────────────────────────────────────────────────────────

interface NotionRequestBody {
  messages?: NotionMessage[];
  model?: string;
  /** Optional client-supplied Notion thread continuity (also via X-Notion-Thread-Id). */
  notion_thread_id?: string;
  thread_id?: string;
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
    .map((m) => extractNotionMessageText(m?.content))
    .join("\n");
  // ~4 chars/token (English-ish); at least 1 when there is any text.
  const prompt_tokens = promptText ? Math.max(1, Math.ceil(promptText.length / 4)) : 0;
  const completion_tokens = content ? Math.max(1, Math.ceil(content.length / 4)) : 0;
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
  messages?: NotionMessage[],
  threadId?: string
) {
  const id = threadId ? `chatcmpl-notion-${threadId}` : `chatcmpl-notion-${Date.now()}`;
  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: estimateNotionUsage(messages, content),
      // Non-standard but useful for clients that want to pin continuity explicitly
      notion_thread_id: threadId || undefined,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...(threadId ? { "X-Notion-Thread-Id": threadId } : {}),
      },
    }
  );
}

function pseudoStreamResponse(content: string, model: string, threadId?: string) {
  const encoder = new TextEncoder();
  const id = threadId ? `chatcmpl-notion-${threadId}` : `chatcmpl-notion-${Date.now()}`;
  const chunk = (delta: string, finishReason: string | null) => ({
    id,
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
      ...(threadId ? { "X-Notion-Thread-Id": threadId } : {}),
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

/**
 * Live-verified shape:
 * - First turn: createThread true + new threadId
 * - Follow-up: createThread false + same threadId (false without threadId → 400)
 */
function buildNotionInferenceRequestBody(opts: {
  spaceId: string;
  userId: string;
  threadId: string;
  transcript: unknown;
  createThread: boolean;
  agent?: NotionAgentOptions;
}): Record<string, unknown> {
  const { spaceId, threadId, transcript, createThread, agent } = opts;
  const isCustom = Boolean(agent?.workflowId);
  const workflowId = agent?.workflowId || "";
  // Follow-ups: isPartialTranscript true matches open-source Notion bridges and
  // avoids re-validating the entire prior transcript (a source of transient errors).
  const isFollowUp = !createThread;
  return {
    traceId: randomUUID(),
    spaceId,
    threadId,
    createThread,
    // Only generate a title when starting a new Notion AI chat
    generateTitle: createThread,
    asPatchResponse: true,
    patchResponseVersion: 2,
    isPartialTranscript: isFollowUp,
    saveAllThreadOperations: true,
    setUnreadState: createThread,
    createdSource: isCustom ? "custom_agent" : "ai_module",
    threadType: "workflow",
    supportsCustomAgentNudgeTranscriptStep: true,
    isUserInAnySalesAssistedSpace: false,
    isSpaceSalesAssisted: false,
    transcript,
    // Default AI is parented by the workspace; custom agents by the workflow id.
    threadParentPointer: isCustom
      ? { table: "workflow", id: workflowId, spaceId }
      : { table: "space", id: spaceId, spaceId },
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
  agent?: NotionAgentOptions;
}): Record<string, string> {
  const isCustom = Boolean(opts.agent?.workflowId);
  // Browser uses /agent/<workflowId without dashes>?wfv=chat for custom agents.
  const agentPathId = (opts.agent?.workflowId || "").replace(/-/g, "");
  const referer = isCustom && agentPathId
    ? `${BASE_URL}/agent/${agentPathId}?wfv=chat`
    : `${BASE_URL}/ai`;
  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Accept: "application/x-ndjson",
    Cookie: opts.cookie,
    Origin: BASE_URL,
    Referer: referer,
    "notion-client-version": NOTION_CLIENT_VERSION,
    "notion-audit-log-platform": "web",
    "x-notion-space-id": opts.spaceId,
    "Accept-Language": "en-US,en;q=0.9",
    ...BROWSER_HEADERS,
  };
  if (opts.userId) reqHeaders["x-notion-active-user-header"] = opts.userId;
  return reqHeaders;
}

/** Normalize a pasted workflow/agent id (with or without dashes). */
export function normalizeNotionWorkflowId(raw: string | undefined | null): string {
  const s = String(raw || "").trim();
  if (!s) return "";
  // URL path segment …/agent/<id>?… or bare hex
  const fromUrl = s.match(/\/agent\/([a-f0-9-]{20,})/i);
  let id = fromUrl ? fromUrl[1]! : s;
  id = id.replace(/[^a-f0-9-]/gi, "");
  // Insert dashes if 32 hex chars (no dashes)
  const hex = id.replace(/-/g, "");
  if (/^[a-f0-9]{32}$/i.test(hex)) {
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`.toLowerCase();
  }
  // Already UUID-like
  if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)) {
    return id.toLowerCase();
  }
  return id;
}

/**
 * Read custom-agent workflow id + optional context page from credentials.
 * Sources (priority): providerSpecificData → cookie pairs on apiKey
 * (`workflow_id=…`, `notion_workflow_id=…`, `context_page_id=…`).
 */
export function resolveNotionAgentOptions(
  credentials: ExecuteInput["credentials"],
  cookie: string
): NotionAgentOptions {
  const ps = credentials?.providerSpecificData;
  const workflowFromPs =
    readProviderSpecificString(ps, [
      "workflowId",
      "workflow_id",
      "notionWorkflowId",
      "notion_workflow_id",
      "agentId",
      "agent_id",
    ]) || "";
  const pageFromPs =
    readProviderSpecificString(ps, [
      "contextPageId",
      "context_page_id",
      "notionContextPageId",
    ]) || "";

  const readCookie = (name: string): string => {
    const m = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`, "i"));
    if (!m) return "";
    const raw = m[1]!.trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  };

  const workflowId = normalizeNotionWorkflowId(
    workflowFromPs ||
      readCookie("workflow_id") ||
      readCookie("notion_workflow_id") ||
      readCookie("agent_id")
  );
  const contextPageId =
    pageFromPs ||
    readCookie("context_page_id") ||
    readCookie("notion_context_page_id") ||
    "";

  return {
    workflowId: workflowId || undefined,
    contextPageId: contextPageId ? contextPageId.trim() : undefined,
  };
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
  // Notion's edge rejects Node/undici TLS fingerprints with in-band
  // temporarily-unavailable (HTTP 200, no assistant text). Always use the
  // Chrome-JA3 tls-client path for runInferenceTranscript.
  let status = 0;
  let rawText = "";
  try {
    const tlsRes = await tlsFetchNotion(NOTION_URL, {
      method: "POST",
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
      signal: signal ?? undefined,
      // Inference can take a while (tool-autoload + LLM first token).
      timeoutMs:
        Number.parseInt(process.env.OMNIROUTE_NOTION_TLS_TIMEOUT_MS || "", 10) || 180_000,
    });
    status = tlsRes.status;
    rawText = tlsRes.text ?? "";
  } catch (err) {
    if (err instanceof TlsClientUnavailableError) {
      // Fall back to plain fetch only when the native TLS sidecar is missing —
      // better a degraded path than a hard crash on platforms without the binary.
      try {
        const upstream = await fetch(NOTION_URL, {
          method: "POST",
          headers: reqHeaders,
          body: JSON.stringify(reqBody),
          signal: signal ?? undefined,
        });
        status = upstream.status;
        rawText = await upstream.text().catch(() => "");
      } catch (fallbackErr) {
        return {
          errorResult: makeErrorResult(
            502,
            `Notion fetch failed: ${fallbackErr instanceof Error ? fallbackErr.message : "unknown error"}`,
            reqBody,
            NOTION_URL
          ),
        };
      }
    } else {
      return {
        errorResult: makeErrorResult(
          502,
          `Notion fetch failed: ${err instanceof Error ? err.message : "unknown error"}`,
          reqBody,
          NOTION_URL
        ),
      };
    }
  }

  if (status === 401 || status === 403) {
    return {
      errorResult: makeErrorResult(
        status,
        "Notion session expired or invalid — re-paste token_v2 from notion.so",
        reqBody,
        NOTION_URL
      ),
    };
  }

  if (status < 200 || status >= 300) {
    return {
      errorResult: makeErrorResult(
        status || 502,
        `Notion error: ${rawText.slice(0, 500)}`,
        reqBody,
        NOTION_URL
      ),
    };
  }

  return { rawText };
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

    // Optional custom agent (workflowId). Empty → default Notion AI (not agentic-specific).
    const agent = resolveNotionAgentOptions(credentials, cookie);

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

    // Thread continuity (sticky):
    // - Prefer X-Notion-Thread-Id / body pin from the client
    // - Else sticky root key from first user message (UREW-normalized, durable on disk)
    // - Bind threadId *before* the upstream call so error retries never mint a new chat
    // - createThread:true only for brand-new roots; never again for that root
    const inboundHeaders =
      (input.clientHeaders as Record<string, string> | null | undefined) ??
      ((input as { headers?: Record<string, string> }).headers as
        | Record<string, string>
        | undefined);
    const clientThreadId = readClientThreadId(requestBody, inboundHeaders ?? undefined);
    // Namespace the thread cache PER CALLER (hash of the caller's cookie) AND by custom
    // agent, so (a) two users of the same Notion space never share a cached thread
    // (cross-tenant IDOR, #7900 review) and (b) default AI and agents never share threads.
    const callerScope = hashNotionCallerCookie(cookie);
    const threadSpaceKey = agent.workflowId
      ? `caller:${callerScope}|${spaceId}|wf:${agent.workflowId}`
      : `caller:${callerScope}|${spaceId}`;
    const binding = resolveNotionThreadBinding(threadSpaceKey, messages, clientThreadId);
    let { threadId, createThread, rootKey } = binding;

    const reqHeaders = buildNotionExecuteHeaders({ cookie, spaceId, userId, agent });

    const runOnce = async (opts: {
      createThread: boolean;
      threadId: string;
    }): Promise<
      | { ok: true; finalText: string; reqBody: Record<string, unknown> }
      | { ok: false; errorResult: ReturnType<typeof makeErrorResult>; retryable: boolean; reqBody: Record<string, unknown> }
    > => {
      const transcript = buildNotionTranscript(messages, {
        notionModel: notionCodename || undefined,
        spaceId,
        userId: userId || undefined,
        agent,
        isFollowUp: !opts.createThread,
      });
      const reqBody = buildNotionInferenceRequestBody({
        spaceId,
        userId,
        threadId: opts.threadId,
        transcript,
        createThread: opts.createThread,
        agent,
      });

      if (opts.createThread) {
        notionThreadMarkCreateAttempted(rootKey, opts.threadId);
      }

      const { rawText, errorResult } = await sendNotionInferenceRequest({
        reqBody,
        reqHeaders,
        signal,
      });

      if (errorResult) {
        // HTTP-level failure — keep sticky binding so the next turn reuses threadId
        const status = errorResult.response?.status ?? 502;
        const retryable = status === 429 || status === 503 || status >= 500;
        return { ok: false, errorResult, retryable, reqBody };
      }

      const raw = rawText || "";
      const upstreamErr = extractNotionUpstreamError(raw);
      if (upstreamErr) {
        // In-band Notion error (often HTTP 200 NDJSON). Sticky thread stays bound.
        const status = upstreamErr.isRetryable ? 503 : 502;
        return {
          ok: false,
          retryable: upstreamErr.isRetryable,
          reqBody,
          errorResult: makeErrorResult(
            status,
            `Notion ${upstreamErr.subType || "error"}: ${upstreamErr.message}`,
            reqBody,
            NOTION_URL
          ),
        };
      }

      const finalText = parseNotionInferenceStream(raw);
      if (!finalText) {
        return {
          ok: false,
          retryable: true,
          reqBody,
          errorResult: makeErrorResult(502, "No response from Notion AI", reqBody, NOTION_URL),
        };
      }

      return { ok: true, finalText, reqBody };
    };

    // First attempt
    let attempt = await runOnce({ createThread, threadId });

    // One automatic retry for transient Notion faults — same threadId, never create again
    if (!attempt.ok && attempt.retryable) {
      const delayMs = process.env.NODE_ENV === "test" || process.env.VITEST ? 20 : 700 + Math.floor(Math.random() * 400);
      await new Promise((r) => setTimeout(r, delayMs));
      attempt = await runOnce({ createThread: false, threadId });
    }

    if (!attempt.ok) {
      return attempt.errorResult;
    }

    // Confirm sticky binding + prefix keys for multi-turn continuity
    notionThreadMarkConfirmed(rootKey, threadId);
    notionThreadSessionStore(threadSpaceKey, messages, attempt.finalText, threadId);

    const response = wantStream
      ? pseudoStreamResponse(attempt.finalText, modelId, threadId)
      : chatCompletionResponse(attempt.finalText, modelId, messages, threadId);

    return {
      response,
      url: NOTION_URL,
      headers: reqHeaders,
      transformedBody: attempt.reqBody,
    };
  }
}
