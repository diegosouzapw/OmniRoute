import { createHash } from "node:crypto";

import {
  BaseExecutor,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { getRotatingApiKey } from "../services/apiKeyRotator.ts";
import {
  normalizeSessionCookieHeader,
  normalizeSessionCookieHeaders,
} from "@/lib/providers/webCookieAuth";

const META_AI_GRAPHQL_API = "https://www.meta.ai/api/graphql";
// Meta rebranded the chat product from "Abra" to "Ecto"; the session cookie
// `abra_sess` was replaced by `ecto_1_sess`. `normalizeSessionCookieHeader`
// only uses this constant when the user pastes a bare cookie value with no
// `name=` prefix; full cookie lines (with any cookie names) pass through
// untouched, so users who paste their entire DevTools cookie line still work.
const META_AI_DEFAULT_COOKIE = "ecto_1_sess";
// Persisted-query id and friendly name for the current send-message
// operation. The previous Abra mutation (doc_id 078dfdff...) was retired
// when Meta removed the RewriteOptionsInput type from the schema; it now
// fails server-side validation with `Unknown type "RewriteOptionsInput"`.
// The new operation is a Subscription rather than a Mutation, but Meta's
// GraphQL endpoint still accepts it over POST and streams the response.
const META_AI_SEND_MESSAGE_DOC_ID = "29ae946c82d1f301196c6ca2226400b5";
const META_AI_ROOT_BRANCH_PATH = "0";
const META_AI_ENTRY_POINT = "KADABRA__CHAT__UNIFIED_INPUT_BAR";
const META_AI_FRIENDLY_NAME = "useEctoSendMessageSubscription";
const META_AI_REQUEST_ANALYTICS_TAGS = "graphservice";
const META_AI_ASBD_ID = "129477";
const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";
const BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

type MuseSparkModelInfo = {
  mode: string;
  isThinking: boolean;
};

const MODEL_MAP: Record<string, MuseSparkModelInfo> = {
  "muse-spark": { mode: "mode_fast", isThinking: false },
  "muse-spark-thinking": { mode: "mode_thinking", isThinking: true },
  "muse-spark-contemplating": { mode: "think_hard", isThinking: true },
};

type MetaSseFrame = {
  event: string;
  data: string;
};

type ParsedMetaAiResponse = {
  content: string;
  deltas: string[];
  reasoningContent: string;
  reasoningDeltas: string[];
  errorCode: string | null;
  errorMessage: string | null;
  status: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function extractMessageText(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((part) => {
      if (!isRecord(part)) return "";
      if (part.type === "text" && typeof part.text === "string") {
        return part.text;
      }
      if (part.type === "input_text" && typeof part.text === "string") {
        return part.text;
      }
      return "";
    })
    .filter((part) => part.trim().length > 0)
    .join("\n")
    .trim();
}

type NormalizedMessage = { role: string; content: string };

type ParsedHistory = {
  /** Whole history folded into one string (used when starting a new conversation). */
  foldedPrompt: string;
  /** Just the last user turn — sent on its own when we're continuing a cached conversation. */
  latestUserContent: string;
  /**
   * Index in `normalized` of the most recent assistant turn, or -1 if none.
   * Used to slice the prefix that anchors the continuation cache key (so two
   * separate chats with identical assistant responses but different
   * preceding history don't collide).
   */
  lastAssistantIndex: number;
  /**
   * The role+content of every non-empty message after normalization, in
   * order. The continuation-cache key hashes the prefix of this list ending
   * at the last assistant message, so the key is unique to a specific
   * (history → response) pair rather than just the response text alone.
   */
  normalized: NormalizedMessage[];
};

function parseOpenAIMessages(messages: Array<Record<string, unknown>>): ParsedHistory {
  const extracted: NormalizedMessage[] = [];

  for (const message of messages) {
    let role = String(message.role || "user");
    if (role === "developer") role = "system";

    const content = extractMessageText(message.content);
    if (!content) continue;
    extracted.push({ role, content });
  }

  if (extracted.length === 0) {
    return {
      foldedPrompt: "",
      latestUserContent: "",
      lastAssistantIndex: -1,
      normalized: [],
    };
  }

  let lastUserIndex = -1;
  for (let i = extracted.length - 1; i >= 0; i--) {
    if (extracted[i].role === "user") {
      lastUserIndex = i;
      break;
    }
  }

  let lastAssistantIndex = -1;
  for (let i = extracted.length - 1; i >= 0; i--) {
    if (extracted[i].role === "assistant") {
      lastAssistantIndex = i;
      break;
    }
  }

  const foldedPrompt = extracted
    .map((message, index) => {
      if (index === lastUserIndex) {
        return message.content;
      }
      return `${message.role}: ${message.content}`;
    })
    .join("\n\n")
    .trim();

  const latestUserContent = lastUserIndex >= 0 ? extracted[lastUserIndex].content : "";

  return { foldedPrompt, latestUserContent, lastAssistantIndex, normalized: extracted };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil((text || "").length / 4));
}

function encodeBase62(value: bigint, padLength: number): string {
  let remaining = value;
  let encoded = "";

  while (remaining > 0n) {
    encoded = BASE62_ALPHABET[Number(remaining % 62n)] + encoded;
    remaining /= 62n;
  }

  return encoded.padStart(padLength, "0");
}

function decodeBase62(value: string): bigint {
  let decoded = 0n;
  for (const char of value) {
    const index = BASE62_ALPHABET.indexOf(char);
    if (index < 0) {
      throw new Error(`Invalid base62 character: ${char}`);
    }
    decoded = decoded * 62n + BigInt(index);
  }
  return decoded;
}

function randomBigInt(byteLength: number): bigint {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

function generateMetaConversationId(): string {
  const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
  const random = randomBigInt(8) & ((1n << 64n) - 1n);
  const packed = (timestamp << 64n) | random;
  return `c.${encodeBase62(packed, 19)}`;
}

function generateMetaEventId(conversationId: string): string | null {
  if (!conversationId.startsWith("c.")) {
    return null;
  }

  try {
    const packedConversation = decodeBase62(conversationId.slice(2));
    const conversationRandom = packedConversation & ((1n << 64n) - 1n);
    const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
    const eventRandom = randomBigInt(4) & ((1n << 32n) - 1n);
    const packedEvent = (timestamp << (64n + 32n)) | (conversationRandom << 32n) | eventRandom;
    return `e.${encodeBase62(packedEvent, 25)}`;
  } catch {
    return null;
  }
}

function generateNumericMessageId(): string {
  return (
    BigInt(Date.now()) * 1000n +
    BigInt(Math.floor(Math.random() * 1000)) +
    (randomBigInt(2) & 0xfffn)
  ).toString();
}

function normalizeMetaLocale(): string {
  const locale =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().locale || "en-US"
      : "en-US";
  return locale.replace(/-/g, "_");
}

function getMuseSparkModelInfo(model: string): MuseSparkModelInfo {
  return MODEL_MAP[model] || MODEL_MAP["muse-spark"];
}

// ─── Conversation continuity cache ──────────────────────────────────────────
// The default behavior of /v1/chat/completions is stateless: the caller passes
// the full message history each turn. Without continuation, every turn would
// open a brand-new meta.ai conversation containing the OpenAI history folded
// into a single user prompt — three real chat turns become three separate
// conversations in the user's meta.ai history, each polluted with the prior
// turns rendered as "user: …" / "assistant: …" text.
//
// To present a clean single growing conversation in meta.ai, we cache the
// conversationId we created on the previous turn keyed by a hash of the
// (connectionId, model, normalized history through the last assistant turn).
// On the next turn, if the incoming OpenAI history's prefix-up-to-the-last-
// assistant-turn matches a cached entry, we reuse the cached conversationId,
// set isNewConversation=false, and send only the latest user turn — Meta
// appends to the existing conversation tree.
//
// Hashing the *full prefix* (not just the assistant text) is important: two
// independent chats from the same connection that happen to land on identical
// assistant text (e.g. a generic refusal or greeting) would otherwise collide
// and route the next turn into the wrong meta.ai conversation, mixing chat
// state across logical sessions. The differing preceding history makes the
// hashes distinct.
//
// TTL is 30 minutes (Meta's web client also expires idle conversations on a
// similar window). Cache cap is generous — entries are tiny (~250 B) so 5000
// entries is ~1.25 MB, plenty of headroom for multi-user setups.

type CachedConversation = {
  conversationId: string;
  branchPath: string;
  expiresAt: number;
};

const MUSE_CONV_CACHE_MAX = 5000;
const MUSE_CONV_CACHE_TTL_MS = 30 * 60 * 1000;
const conversationCache = new Map<string, CachedConversation>();

/**
 * Canonical-stringify a normalized message list so the same logical history
 * always produces the same hash. Uses ASCII Group Separator / Record
 * Separator characters as field delimiters so they can't appear inside
 * normal message content.
 */
function canonicalizeNormalizedHistory(messages: NormalizedMessage[]): string {
  return messages.map((m) => `${m.role}\x1e${m.content}`).join("\x1f");
}

function makeConversationCacheKey(
  connectionId: string,
  model: string,
  normalizedPrefix: NormalizedMessage[]
): string {
  return createHash("sha256")
    .update(`${connectionId}\x1f${model}\x1f${canonicalizeNormalizedHistory(normalizedPrefix)}`)
    .digest("hex");
}

function lookupCachedConversation(key: string): CachedConversation | null {
  const entry = conversationCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    conversationCache.delete(key);
    return null;
  }
  return entry;
}

function rememberConversation(
  key: string,
  context: { conversationId: string; branchPath: string }
): void {
  if (conversationCache.size >= MUSE_CONV_CACHE_MAX && !conversationCache.has(key)) {
    // Map iteration is insertion order, so the first key is the oldest.
    const oldest = conversationCache.keys().next().value;
    if (oldest) conversationCache.delete(oldest);
  }
  conversationCache.set(key, {
    conversationId: context.conversationId,
    branchPath: context.branchPath,
    expiresAt: Date.now() + MUSE_CONV_CACHE_TTL_MS,
  });
}

/** Test hook — exported for unit tests; not wired to runtime callers. */
export function __resetMuseSparkConversationCacheForTesting(): void {
  conversationCache.clear();
}

type ConversationContext = {
  conversationId: string;
  branchPath: string;
  isNewConversation: boolean;
};

function buildMetaAiRequestBody(prompt: string, model: string, conversation: ConversationContext) {
  const userUniqueMessageId = generateNumericMessageId();

  return {
    doc_id: META_AI_SEND_MESSAGE_DOC_ID,
    variables: {
      assistantMessageId: crypto.randomUUID(),
      attachments: null,
      clientLatitude: null,
      clientLongitude: null,
      clientTimezone:
        typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      clippyIp: null,
      content: prompt,
      conversationId: conversation.conversationId,
      conversationStarterId: null,
      currentBranchPath: conversation.branchPath,
      developerOverridesForMessage: null,
      devicePixelRatio: 1,
      entryPoint: META_AI_ENTRY_POINT,
      imagineOperationRequest: null,
      isNewConversation: conversation.isNewConversation,
      mentions: null,
      mode: getMuseSparkModelInfo(model).mode,
      promptEditType: null,
      promptSessionId: crypto.randomUUID(),
      promptType: null,
      qplJoinId: null,
      requestedToolCall: null,
      // `rewriteOptions` was removed from Meta's GraphQL schema (the
      // RewriteOptionsInput type is gone), so sending it — even as null —
      // makes the server reject the persisted query with
      // `Unknown type "RewriteOptionsInput"`. Omit it entirely; GraphQL
      // input fields are nullable-by-omission by default.
      turnId: crypto.randomUUID(),
      userAgent: META_AI_USER_AGENT,
      userEventId: generateMetaEventId(conversation.conversationId),
      userLocale: normalizeMetaLocale(),
      userMessageId: crypto.randomUUID(),
      userUniqueMessageId,
    },
  };
}

function parseMetaSseFrames(text: string): MetaSseFrame[] {
  const frames: MetaSseFrame[] = [];
  const lines = text.split(/\r?\n/);
  let currentEvent = "message";
  let dataLines: string[] = [];

  const flush = () => {
    if (dataLines.length === 0 && currentEvent === "message") {
      return;
    }

    frames.push({
      event: currentEvent,
      data: dataLines.join("\n").trim(),
    });

    currentEvent = "message";
    dataLines = [];
  };

  for (const line of lines) {
    if (!line) {
      flush();
      continue;
    }

    if (line.startsWith(":")) {
      continue;
    }

    if (line.startsWith("event:")) {
      currentEvent = line.slice("event:".length).trim() || "message";
      continue;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trimStart());
    }
  }

  flush();
  return frames;
}

function readMetaJsonPayloads(text: string): Array<Record<string, unknown>> {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      return isRecord(parsed) ? [parsed] : [];
    } catch {
      return [];
    }
  }

  return parseMetaSseFrames(text)
    .filter((frame) => frame.data)
    .map((frame) => {
      try {
        const parsed = JSON.parse(frame.data);
        return isRecord(parsed) ? parsed : null;
      } catch {
        return null;
      }
    })
    .filter((frame): frame is Record<string, unknown> => !!frame);
}

const META_AI_REASONING_KEYS = [
  "reasoning",
  "reasoningContent",
  "reasoning_content",
  "reasoningText",
  "thinking",
  "thinkingContent",
  "thinkingText",
  "thought",
  "thoughtText",
  "thoughts",
  "internalThoughts",
  "chainOfThought",
  "thinkingTrace",
  "thinking_trace",
] as const;

const META_AI_NESTED_RENDERER_KEYS = [
  "contentRenderer",
  "textContent",
  "message",
  "mediaContent",
  "unified_response",
  "unifiedResponseContent",
  "sections",
  "view_model",
  "primitive",
  "primitives",
  "nested_responses",
] as const;

function collectRendererTexts(value: unknown, seen: Set<string>, depth = 0): string[] {
  if (depth > 8) {
    return [];
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) {
      return [];
    }
    seen.add(normalized);
    return [normalized];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectRendererTexts(item, seen, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const parts: string[] = [];
  if (typeof value.text === "string") {
    parts.push(...collectRendererTexts(value.text, seen, depth + 1));
  }

  for (const key of [
    "contentRenderer",
    "textContent",
    "message",
    "mediaContent",
    "unified_response",
    "unifiedResponseContent",
    "sections",
    "view_model",
    "primitive",
    "primitives",
    "nested_responses",
  ]) {
    if (key in value) {
      parts.push(...collectRendererTexts(value[key], seen, depth + 1));
    }
  }

  return parts;
}

function collectReasoningTexts(
  value: unknown,
  seen: Set<string>,
  depth = 0,
  force = false
): string[] {
  if (depth > 8) {
    return [];
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!force || !normalized || seen.has(normalized)) {
      return [];
    }
    seen.add(normalized);
    return [normalized];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectReasoningTexts(item, seen, depth + 1, force));
  }

  if (!isRecord(value)) {
    return [];
  }

  const typename = typeof value.__typename === "string" ? value.__typename : "";
  const localForce = force || /reasoning|thinking|thought/i.test(typename);
  const parts: string[] = [];

  if (typeof value.text === "string" && localForce) {
    parts.push(...collectReasoningTexts(value.text, seen, depth + 1, true));
  }

  for (const key of META_AI_REASONING_KEYS) {
    if (key in value) {
      parts.push(...collectReasoningTexts(value[key], seen, depth + 1, true));
    }
  }

  for (const key of META_AI_NESTED_RENDERER_KEYS) {
    if (key in value) {
      parts.push(...collectReasoningTexts(value[key], seen, depth + 1, localForce));
    }
  }

  return parts;
}

function extractAssistantContent(message: Record<string, unknown>): string {
  if (typeof message.content === "string" && message.content.length > 0) {
    return message.content;
  }

  const contentRenderer = isRecord(message.contentRenderer) ? message.contentRenderer : null;
  if (!contentRenderer) {
    return "";
  }

  const parts = collectRendererTexts(contentRenderer, new Set());
  return parts.join("\n\n").trim();
}

function extractAssistantReasoning(message: Record<string, unknown>): string {
  const parts = collectReasoningTexts(message, new Set());
  return parts.join("\n\n").trim();
}

function extractAssistantError(message: Record<string, unknown>) {
  const error = isRecord(message.error) ? message.error : null;
  const streamingState =
    typeof message.streamingState === "string" ? message.streamingState.toUpperCase() : null;
  return {
    code: typeof error?.code === "string" ? error.code : null,
    message:
      typeof error?.message === "string"
        ? error.message.trim()
        : streamingState === "ERROR" &&
            typeof message.content === "string" &&
            message.content.trim()
          ? message.content.trim()
          : null,
  };
}

function classifyMetaAiError(errorMessage: string | null, content: string) {
  const combined = `${errorMessage || ""}\n${content}`.trim();
  if (!combined) {
    return null;
  }

  if (/authentication required to send messages|login is required|sign in/i.test(combined)) {
    return {
      status: 401,
      message: "Meta AI auth failed — your meta.ai abra_sess cookie may be missing or expired.",
    };
  }

  if (/limit exceeded|rate limit|too many requests/i.test(combined)) {
    return {
      status: 429,
      message: "Meta AI rate limited the session. Wait a moment and retry.",
    };
  }

  if (/blocked by our security system|security system/i.test(combined)) {
    return {
      status: 403,
      message:
        "Meta AI blocked the request through its web security checks. Refresh the session cookie and retry.",
    };
  }

  return null;
}

function parseMetaAiResponseText(text: string, isThinkingModel: boolean): ParsedMetaAiResponse {
  let lastContent = "";
  const deltas: string[] = [];
  let lastReasoning = "";
  const reasoningDeltas: string[] = [];
  let errorCode: string | null = null;
  let errorMessage: string | null = null;

  for (const payload of readMetaJsonPayloads(text)) {
    if (Array.isArray(payload.errors) && payload.errors.length > 0) {
      const firstError = payload.errors.find(
        (item) => isRecord(item) && typeof item.message === "string"
      );
      if (isRecord(firstError) && typeof firstError.message === "string") {
        errorMessage = firstError.message.trim();
      }
    }

    const data = isRecord(payload.data) ? payload.data : null;
    const sendMessageStream = isRecord(data?.sendMessageStream) ? data?.sendMessageStream : null;
    if (!sendMessageStream || sendMessageStream.__typename !== "AssistantMessage") {
      continue;
    }

    const content = extractAssistantContent(sendMessageStream);
    if (content && content !== lastContent) {
      deltas.push(content.startsWith(lastContent) ? content.slice(lastContent.length) : content);
      lastContent = content;
    }

    if (isThinkingModel) {
      const reasoning = extractAssistantReasoning(sendMessageStream);
      if (reasoning && reasoning !== content && reasoning !== lastReasoning) {
        reasoningDeltas.push(
          reasoning.startsWith(lastReasoning) ? reasoning.slice(lastReasoning.length) : reasoning
        );
        lastReasoning = reasoning;
      }
    }

    const upstreamError = extractAssistantError(sendMessageStream);
    if (upstreamError.message) {
      errorMessage = upstreamError.message;
      errorCode = upstreamError.code;
    }
  }

  const classifiedError = classifyMetaAiError(errorMessage, lastContent);
  if (classifiedError) {
    return {
      content: lastContent,
      deltas,
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode,
      errorMessage: classifiedError.message,
      status: classifiedError.status,
    };
  }

  if (errorMessage) {
    return {
      content: lastContent,
      deltas,
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode,
      errorMessage: `Meta AI returned an error: ${errorMessage}`,
      status: 502,
    };
  }

  if (!lastContent) {
    return {
      content: "",
      deltas: [],
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode: null,
      errorMessage: "Meta AI returned no assistant content",
      status: 502,
    };
  }

  return {
    content: lastContent,
    deltas: deltas.filter((delta) => delta.length > 0),
    reasoningContent: lastReasoning,
    reasoningDeltas: reasoningDeltas.filter((delta) => delta.length > 0),
    errorCode: null,
    errorMessage: null,
    status: 200,
  };
}

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildStreamingResponse(
  deltas: string[],
  reasoningDeltas: string[],
  model: string,
  id: string,
  created: number
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            system_fingerprint: null,
            choices: [
              {
                index: 0,
                delta: { role: "assistant" },
                finish_reason: null,
                logprobs: null,
              },
            ],
          })
        )
      );

      for (const delta of reasoningDeltas) {
        if (!delta) continue;
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: { reasoning_content: delta },
                  finish_reason: null,
                  logprobs: null,
                },
              ],
            })
          )
        );
      }

      for (const delta of deltas) {
        if (!delta) continue;
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: { content: delta },
                  finish_reason: null,
                  logprobs: null,
                },
              ],
            })
          )
        );
      }

      controller.enqueue(
        encoder.encode(
          sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            system_fingerprint: null,
            choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
          })
        )
      );
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

function buildNonStreamingResponse(
  content: string,
  reasoningContent: string,
  model: string,
  id: string,
  created: number
) {
  const completionTokens = estimateTokens(content);
  const message: Record<string, unknown> = { role: "assistant", content };
  if (reasoningContent) {
    message.reasoning_content = reasoningContent;
  }

  return new Response(
    JSON.stringify({
      id,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [
        {
          index: 0,
          message,
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: completionTokens,
        completion_tokens: completionTokens,
        total_tokens: completionTokens * 2,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function buildErrorResponse(status: number, message: string, code?: string | null) {
  return new Response(
    JSON.stringify({
      error: {
        message,
        type: "upstream_error",
        ...(code ? { code } : {}),
      },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

async function readTextResponse(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let text = "";

  try {
    while (true) {
      if (signal?.aborted) {
        throw signal.reason ?? new DOMException("Aborted", "AbortError");
      }

      const { value, done } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  } finally {
    reader.releaseLock();
  }
}

export function normalizeMetaAiCookieHeader(apiKey: string): string {
  return normalizeSessionCookieHeader(apiKey, META_AI_DEFAULT_COOKIE);
}

function selectMetaAiCookieHeader(credentials: ExecuteInput["credentials"]): string {
  const extraCookieValues = Array.isArray(credentials.providerSpecificData?.extraApiKeys)
    ? credentials.providerSpecificData.extraApiKeys.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0
      )
    : [];

  const normalizedPool = normalizeSessionCookieHeaders(
    [credentials.apiKey || "", ...extraCookieValues],
    META_AI_DEFAULT_COOKIE
  );

  if (normalizedPool.length === 0) {
    return "";
  }

  if (normalizedPool.length === 1 || !credentials.connectionId) {
    return normalizedPool[0];
  }

  return getRotatingApiKey(credentials.connectionId, normalizedPool[0], normalizedPool.slice(1));
}

function buildMetaAiHeaders(cookieHeader: string): Record<string, string> {
  return {
    Accept: "text/event-stream",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json",
    Cookie: cookieHeader,
    Origin: "https://www.meta.ai",
    Referer: "https://www.meta.ai/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": META_AI_USER_AGENT,
    "X-ASBD-ID": META_AI_ASBD_ID,
    "X-FB-Friendly-Name": META_AI_FRIENDLY_NAME,
    "X-FB-Request-Analytics-Tags": META_AI_REQUEST_ANALYTICS_TAGS,
  };
}

type MuseSparkExecuteResult = {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
};

function resultWithResponse(
  response: Response,
  headers: Record<string, string>,
  transformedBody: unknown
): MuseSparkExecuteResult {
  return {
    response,
    url: META_AI_GRAPHQL_API,
    headers,
    transformedBody,
  };
}

function errorResult(
  status: number,
  message: string,
  code: string,
  headers: Record<string, string>,
  transformedBody: unknown
): MuseSparkExecuteResult {
  return resultWithResponse(buildErrorResponse(status, message, code), headers, transformedBody);
}

function getOpenAiMessages(body: unknown): Array<Record<string, unknown>> | null {
  const messages = (body as Record<string, unknown>).messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) return null;
  return messages as Array<Record<string, unknown>>;
}

function getContinuationCacheKey(
  parsedHistory: ParsedHistory,
  credentials: ExecuteInput["credentials"],
  model: string
): string | null {
  if (
    parsedHistory.lastAssistantIndex < 0 ||
    !credentials.connectionId ||
    parsedHistory.latestUserContent.length === 0
  ) {
    return null;
  }

  return makeConversationCacheKey(
    credentials.connectionId,
    model,
    parsedHistory.normalized.slice(0, parsedHistory.lastAssistantIndex + 1)
  );
}

function getConversationContext(cached: CachedConversation | null): ConversationContext {
  if (!cached) {
    return {
      conversationId: generateMetaConversationId(),
      branchPath: META_AI_ROOT_BRANCH_PATH,
      isNewConversation: true,
    };
  }

  return {
    conversationId: cached.conversationId,
    branchPath: cached.branchPath,
    isNewConversation: false,
  };
}

function evictContinuationIfNeeded(
  cached: CachedConversation | null,
  cacheKey: string | null
): void {
  if (cached && cacheKey) {
    conversationCache.delete(cacheKey);
  }
}

async function postMetaAiRequest(
  headers: Record<string, string>,
  transformedBody: unknown,
  signal: AbortSignal,
  log: ExecuteInput["log"]
): Promise<{ ok: true; response: Response } | { ok: false; result: MuseSparkExecuteResult }> {
  try {
    const response = await fetch(META_AI_GRAPHQL_API, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal,
    });
    return { ok: true, response };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.error?.("MUSE-SPARK-WEB", `Fetch failed: ${message}`);
    return {
      ok: false,
      result: errorResult(
        502,
        `Meta AI connection failed: ${message}`,
        "meta_ai_fetch_failed",
        headers,
        transformedBody
      ),
    };
  }
}

function buildHttpErrorResult(
  upstreamResponse: Response,
  headers: Record<string, string>,
  transformedBody: unknown,
  cached: CachedConversation | null,
  cacheKey: string | null
): MuseSparkExecuteResult {
  evictContinuationIfNeeded(cached, cacheKey);

  let message = `Meta AI returned HTTP ${upstreamResponse.status}`;
  if (upstreamResponse.status === 401 || upstreamResponse.status === 403) {
    message = "Meta AI auth failed — your meta.ai ecto_1_sess cookie may be missing or expired.";
  } else if (upstreamResponse.status === 429) {
    message = "Meta AI rate limited the session. Wait a moment and retry.";
  }

  return errorResult(
    upstreamResponse.status,
    message,
    `HTTP_${upstreamResponse.status}`,
    headers,
    transformedBody
  );
}

function buildParsedErrorResult(
  parsed: ParsedMetaAiResponse,
  headers: Record<string, string>,
  transformedBody: unknown,
  cached: CachedConversation | null,
  cacheKey: string | null
): MuseSparkExecuteResult {
  evictContinuationIfNeeded(cached, cacheKey);
  return errorResult(
    parsed.status,
    parsed.errorMessage || "Meta AI returned an unknown error",
    parsed.errorCode || "meta_ai_unknown_error",
    headers,
    transformedBody
  );
}

function rememberAssistantTurn(
  parsed: ParsedMetaAiResponse,
  credentials: ExecuteInput["credentials"],
  model: string,
  parsedHistory: ParsedHistory,
  conversationContext: ConversationContext
): void {
  if (!parsed.content || !credentials.connectionId) return;

  const writePrefix: NormalizedMessage[] = [
    ...parsedHistory.normalized,
    { role: "assistant", content: parsed.content },
  ];
  rememberConversation(makeConversationCacheKey(credentials.connectionId, model, writePrefix), {
    conversationId: conversationContext.conversationId,
    branchPath: conversationContext.branchPath,
  });
}

function buildSuccessResult(
  parsed: ParsedMetaAiResponse,
  stream: boolean,
  model: string,
  headers: Record<string, string>,
  transformedBody: unknown
): MuseSparkExecuteResult {
  const id = `chatcmpl-meta-${crypto.randomUUID().slice(0, 12)}`;
  const created = Math.floor(Date.now() / 1000);
  const deltas = parsed.deltas.length > 0 ? parsed.deltas : [parsed.content];
  const reasoningDeltas = parsed.reasoningDeltas;
  const response = stream
    ? new Response(buildStreamingResponse(deltas, reasoningDeltas, model, id, created), {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      })
    : buildNonStreamingResponse(parsed.content, parsed.reasoningContent, model, id, created);

  return resultWithResponse(response, headers, transformedBody);
}

export class MuseSparkWebExecutor extends BaseExecutor {
  constructor() {
    super("muse-spark-web", { id: "muse-spark-web", baseUrl: META_AI_GRAPHQL_API });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const messages = getOpenAiMessages(body);
    if (!messages) {
      return errorResult(400, "Missing or empty messages array", "invalid_request", {}, body);
    }

    const parsedHistory = parseOpenAIMessages(messages);
    if (!parsedHistory.foldedPrompt) {
      return errorResult(400, "Empty query after processing messages", "invalid_request", {}, body);
    }

    // Look up a prior meta.ai conversation we created for this caller +
    // model + chat thread. The lookup key is the connection + model + the
    // SHA-256 of the normalized history prefix ending at the last assistant
    // turn — that prefix is exactly what we hashed when we cached on the
    // previous turn, so a real continuation hits and two parallel chats
    // with coincidentally-identical assistant text do not.
    //
    // We also require `latestUserContent` to be non-empty before using a
    // cached entry: if the incoming history has no `user` role (e.g. an
    // assistant-prefill payload), the cache-hit path would otherwise POST
    // empty content with `isNewConversation: false`, an avoidable upstream
    // failure. Falling through to the fresh-conversation path uses the
    // folded history instead, which contains real content.
    const continuationCacheKey = getContinuationCacheKey(parsedHistory, credentials, model);
    const cached = continuationCacheKey ? lookupCachedConversation(continuationCacheKey) : null;
    const conversationContext = getConversationContext(cached);

    const prompt = cached ? parsedHistory.latestUserContent : parsedHistory.foldedPrompt;

    const modelInfo = getMuseSparkModelInfo(model);
    const transformedBody = buildMetaAiRequestBody(prompt, model, conversationContext);
    const cookieHeader = selectMetaAiCookieHeader(credentials);
    const headers = buildMetaAiHeaders(cookieHeader);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    const fetchResult = await postMetaAiRequest(headers, transformedBody, combinedSignal, log);
    if (!fetchResult.ok) return fetchResult.result;

    const upstreamResponse = fetchResult.response;
    if (!upstreamResponse.ok) {
      return buildHttpErrorResult(
        upstreamResponse,
        headers,
        transformedBody,
        cached,
        continuationCacheKey
      );
    }

    if (!upstreamResponse.body) {
      return errorResult(
        502,
        "Meta AI returned an empty response body",
        "meta_ai_empty_body",
        headers,
        transformedBody
      );
    }

    const responseText = await readTextResponse(upstreamResponse.body, signal);
    const parsed = parseMetaAiResponseText(responseText, modelInfo.isThinking);
    if (parsed.status !== 200 || parsed.errorMessage) {
      return buildParsedErrorResult(parsed, headers, transformedBody, cached, continuationCacheKey);
    }

    rememberAssistantTurn(parsed, credentials, model, parsedHistory, conversationContext);
    return buildSuccessResult(parsed, stream, model, headers, transformedBody);
  }
}
