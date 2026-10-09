declare const EdgeRuntime: string | undefined;
/**
 * CursorExecutor — talks to Cursor's agent.v1.AgentService/Run endpoint.
 *
 * cursor-agent (CLI) and the cursor IDE both use this RPC for every model id
 * (auto, composer-*, claude-*, gpt-*, gemini-*). The legacy
 * aiserver.v1.ChatService/StreamUnifiedChatWithTools rejects "auto" and
 * "composer-*" with errors, so we migrated this executor over.
 *
 * Wire format & schema details live in ../utils/cursorAgentProtobuf.ts.
 */

import { BaseExecutor, mergeUpstreamExtraHeaders } from "./base.ts";
import { PROVIDERS, HTTP_STATUS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import { currentAppliedProxySink } from "../utils/proxyFetch.ts";
import {
  buildAgentRequestBody,
  decodeAgentServerMessage,
  decodeExecServerEvent,
  decodeKvServerEvent,
  encodeRequestContextResponse,
  encodeMcpStateResponse,
  OMNIROUTE_MCP_SERVER_IDENTIFIER,
  encodeKvGetBlobResult,
  encodeKvSetBlobResult,
  encodeExecListMcpResourcesResult,
  flattenMessages,
  messageContentToText,
  openAIToolsToMcpDefs,
  type ChatMessage,
  type CursorTurnUsage,
  type EncodedImage,
  type ExecServerEvent,
  type McpToolDefinition,
  type OpenAITool,
} from "../utils/cursorAgentProtobuf.ts";
import { resolveCursorImages, extractImageUrls, CursorImageError } from "../utils/cursorImages.ts";
import {
  estimateInputTokens,
  estimateOutputTokens,
  addBufferToUsage,
} from "../utils/usageTracking.ts";
import {
  formatCursorAgentClientVersion,
  getCursorAgentCliVersionSync,
} from "../utils/cursorAgentCliVersion.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { generateToolCallId } from "../translator/helpers/toolCallHelper.ts";
import {
  parseComposerToolCalls,
  createStreamingState,
  feedStreamingChunk,
  type StreamingState as ComposerStreamingState,
} from "../utils/composerToolCalls.ts";
import { cursorSessionManager, type CursorSession } from "../services/cursorSessionManager.ts";
import { isPiExecEvent, type PiExecEvent } from "../utils/cursorAgentProtobuf/pi.ts";
import {
  CursorApiKeyExchangeError,
  invalidateCursorSessionToken,
  isCursorApiKey,
  resolveCursorBearerToken,
  stripCursorOAuthTokenPrefix,
} from "../services/cursorApiKeyAuth.ts";
import crypto from "crypto";
import { toolChoiceDirectiveLine, buildCursorOutputConstraints } from "./cursor/prompt.ts";
import {
  bridgeCursorBuiltinTool,
  bridgeCursorGitDiff,
  bridgeCursorPiTool,
  bridgeCursorNativeTodoWrite,
  extractLatestTodoHistory,
  selectCursorBridgeTools,
  type CursorClientPlatform,
  type CursorTodoHistoryItem,
} from "./cursor/builtinToolBridge.ts";
import {
  isComposerModel,
  visibleComposerContentFromThinking,
  composerReasoningRemainder,
} from "./cursor/composer.ts";
import { CursorServerConfigError, resolveCursorAgentUrl } from "./cursor/agentEndpoint.ts";
import { driveCursorH2 } from "./cursor/streamDriver.ts";
import { buildExecRejection } from "./cursor/execRejections.ts";
import { openCursorH2 } from "./cursor/h2AgentStream.ts";
import {
  classifyCursorError,
  isCursorBenignCancelError,
  isCursorStreamTimeoutError,
  resolveCursorEmptyTurnError,
  type ClassifiedCursorError,
} from "./cursor/cursorErrors.ts";
import { resolveCursorWireConversationId } from "./cursor/conversationId.ts";
import { extractEmbeddedCursorToolResults } from "./cursor/embeddedToolResults.ts";
import type { CursorReportedUsage } from "../services/cursorSessionManager.ts";
import type { CursorTtftBreakdown } from "../utils/cursorAgentProtobuf/ttft.ts";
import { getActiveSyncedCatalog } from "../../src/lib/db/models/activeSyncedCatalog.ts";
import {
  createNarrationStreamScrubber,
  finalizeKimiTurn,
  type NarrationStreamScrubber,
} from "../utils/kimiToolCallNarration.ts";
// Composer helpers re-exported for external importers (tests).
export {
  isComposerModel,
  visibleComposerContentFromThinking,
  composerReasoningRemainder,
} from "./cursor/composer.ts";

// Tool-commit directive — adapted from composer-api's TOOL_SYSTEM_DIRECTIVE.
// composer-2.5 otherwise narrates intent ("Checking the weather...") and ends
// the turn ~20% of the time instead of actually invoking a declared tool. This
// directive, prepended to the user text only when the request declares tools,
// tells the model to commit to the tool call rather than describe it as prose.
const TOOL_COMMIT_DIRECTIVE = [
  "You are serving an OpenAI-compatible API request and the client has provided executable tools.",
  "When a tool is needed to answer (real-time data, web/search lookups, file or project operations), you MUST issue the actual tool call. Do NOT describe what you are about to do as prose and then stop — call the tool.",
  "Answer directly only when no tool is needed.",
  "Do not emit duplicate tool calls: call each operation once, then continue after the tool result is returned.",
  "Never claim that tools are unavailable.",
].join("\n");

// NOTE: composer-api primes the model into "agent mode" with a fabricated
// prior switch_mode exchange (AGENT_MODE_PRIMER). On OmniRoute's native-tool
// agent endpoint that primer is counterproductive — it references a
// non-existent switch_mode tool and measurably LOWERED the tool-call rate in
// live A/B (56% vs 69%), so it is intentionally not ported.

/**
 * Build the ExecClientMessage frame that responds to a built-in tool request.
 * Returns null for the request_context handshake (caller handles separately
 * to inject MCP tools in Phase 3) and for exec_mcp (model is invoking a
 * declared MCP tool — Phase 5 surfaces this as an OpenAI tool_calls delta).
 */
/**
 * Built-in execs whose result can be expressed as a typed success once the
 * client answers. Everything else keeps the fail-closed rejection.
 */
function heldExecKind(
  kind: ExecServerEvent["kind"]
): "read" | "shell" | "shell_stream" | "mini_swe_bash" | "write" | "grep" | "ls" | "fetch" | null {
  if (kind === "exec_read") return "read";
  if (kind === "exec_write") return "write";
  if (kind === "exec_grep") return "grep";
  if (kind === "exec_ls") return "ls";
  if (kind === "exec_fetch") return "fetch";
  if (kind === "exec_shell") return "shell";
  if (kind === "exec_shell_stream") return "shell_stream";
  if (kind === "exec_mini_swe_bash") return "mini_swe_bash";
  return null;
}

// Detect cloud environment (Edge runtime, Cloudflare Workers, etc.)
const isCloudEnv = () => {
  if (typeof caches !== "undefined" && typeof caches === "object") return true;
  if (typeof EdgeRuntime !== "undefined") return true;
  return false;
};

// Lazy import http2 (only in Node.js environment)
let http2: typeof import("http2") | null = null;
if (!isCloudEnv()) {
  try {
    http2 = await import("http2");
  } catch {
    http2 = null;
  }
}

// Phase 10: CURSOR_DEBUG=1 enables verbose streaming debug logs (decoded
// frame summaries, exec router dispatches, session lifecycle events).
// CURSOR_STREAM_DEBUG is kept as a backward-compatible alias.
const CURSOR_DEBUG = process.env.CURSOR_DEBUG === "1" || process.env.CURSOR_STREAM_DEBUG === "1";
const debugLog = (...args: unknown[]) => {
  if (CURSOR_DEBUG) console.log(...args);
};

function tryParseJsonError(payload: Buffer): { message: string; status: number } | null {
  if (payload.length < 2 || payload[0] !== 0x7b) return null;
  try {
    const text = payload.toString("utf8");
    if (!text.includes('"error"')) return null;
    const parsed = JSON.parse(text);
    const err = parsed?.error || {};
    const rawMessage =
      err?.details?.[0]?.debug?.details?.title ||
      err?.details?.[0]?.debug?.details?.detail ||
      err?.message ||
      (typeof err?.code === "string" ? `${err.code}: ${text}` : text);
    const codeHint =
      typeof err?.code === "string" &&
      !String(rawMessage).toLowerCase().includes(err.code.toLowerCase())
        ? `${err.code}: ${rawMessage}`
        : String(rawMessage);
    const classified = classifyCursorError(codeHint);
    return { message: classified.message, status: classified.status };
  } catch {
    return null;
  }
}

/**
 * True when the turn produced no client-visible assistant payload.
 * A tool call counts only when `ctxProducedSignal` sees non-blank arguments.
 * `receivedText` is ignored: the narration scrubber sets it on an empty delta.
 */
export function isCursorEmptyTurn(ctx: StreamCtx): boolean {
  if (ctx.totalText.length > 0 || ctx.composerInlineToolCallsEmitted) return false;
  return !ctxProducedSignal({ ...ctx, receivedText: false });
}

// ─── Phase 4: streaming dispatch context ───────────────────────────────────
//
// One StreamCtx flows through a single execute() call. It owns the live
// SSE emission state (responseId, created timestamp, model id, role-chunk
// flag) plus aggregate state (totalText, tokenDelta) needed for the final
// usage chunk and JSON-mode aggregation. Phases 5 (tool calls) and 8
// (end-signal hardening) extend it.

export type StreamCtx = {
  responseId: string;
  created: number;
  model: string;
  emit: (chunk: string) => void;
  emittedRoleChunk: boolean;
  totalText: string;
  thinkingText: string;
  tokenDelta: number;
  // Cursor's metered counts from TurnEndedUpdate (unset until turn_ended carries them).
  // They total the whole run, including segments reported by earlier HTTP requests.
  turnUsage?: CursorTurnUsage;
  // Usage earlier segments of this run already reported (inline tool resume).
  priorReportedUsage: CursorReportedUsage | null;
  // Usage this segment reported, set by buildCursorUsage.
  reportedUsage: CursorReportedUsage | null;
  // Cursor's server-side TTFT split (AgentServerMessage.ttft_breakdown), when sent.
  ttftBreakdown: CursorTtftBreakdown | null;
  // End-signal tracking (Phase 8 hardens this further).
  receivedText: boolean;
  kvAfterTextSeen: boolean;
  // A tool call (Cursor-internal such as composer's get_mcp_tools, or a client
  // tool still streaming) started after the last text/thinking delta. A KV
  // checkpoint in that window is not the end of the turn.
  toolActivitySinceText: boolean;
  endReason: "turn_ended" | "kv_after_text" | "tool_calls" | "server_end" | null;
  // Safety timeout hit after partial content was streamed (#14727) → finish_reason "length".
  truncatedByTimeout?: boolean;
  // Mid-stream JSON error (rare; emitted once with the error code).
  midStreamError: { message: string; status: number } | null;
  // Phase 5: tool-call indexing for parallel calls. Each McpArgs gets a
  // monotonically-increasing index in the OpenAI delta. emittedToolCalls
  // tracks how many were emitted so finalizeSseStream picks the right
  // finish_reason ("tool_calls" vs "stop").
  emittedToolCallIndex: number;
  // Captured tool calls (for JSON-mode aggregation). Each entry maps to
  // one OpenAI tool_calls[] item.
  toolCalls: Array<{
    id: string;
    name: string;
    argumentsJson: string;
  }>;
  // Phase 6: maps OpenAI tool_call_id → cursor exec info, so a follow-up
  // role:"tool" message can be answered on the open h2 stream via
  // encodeExecMcpResult.
  pendingToolCalls: Map<string, { execMsgId: number; execId: string; toolName: string }>;
  /**
   * Bytes received but not yet consumed when the turn settled. Cursor often
   * puts the start of the next frame in the same TCP segment as the frame that
   * ends the turn; dropping them made the NEXT run read the stream from the
   * middle of a frame, so nothing decoded and it stalled until the safety
   * timeout. Carried into the session and replayed as the next run's prefix.
   */
  leftoverBytes: Buffer;
  /** Field number of the most recent exec variant this build cannot handle. */
  unknownExecField: number | null;
  lastUnknownUpdateField: number | null;
  pendingBuiltinExecs: Map<
    string,
    {
      execMsgId: number;
      execId: string;
      kind:
        | "read"
        | "shell"
        | "shell_stream"
        | "mini_swe_bash"
        | "git_diff"
        | "write"
        | "grep"
        | "ls"
        | "fetch"
        | PiExecEvent["kind"];
      path: string;
      command: string;
      workingDir: string;
      fileText: string;
      returnFileContentAfterWrite?: boolean;
      /** The offset/limit of a held read that was forwarded to the client. */
      readRange?: { offset?: number; limit?: number };
      pattern: string;
      outputMode?: string;
      url?: string;
    }
  >;
  // Built-in Cursor tools are bridged to external OpenAI tool calls by first
  // rejecting the native request. Their result therefore cannot resume on the
  // same h2 stream and must use the existing full-history cold-resume path.
  requiresColdResume: boolean;
  // Composer thinking-as-content (decolua/9router#1310): tracks how much of
  // the visible suffix (after the last `</think>`) has already been streamed
  // out as `content` deltas, so we only emit the incremental tail per frame.
  composerVisibleEmittedLength: number;
  // Composer DeepSeek-format inline tool-call parser state (decolua/9router#1335).
  // Null for non-Composer models (no overhead). When set, the streaming parser
  // holds back text inside `<｜tool▁calls▁begin｜>...<｜tool▁calls▁end｜>` markers
  // and emits structured tool_calls SSE chunks once the block closes.
  composerToolParserState: ComposerStreamingState | null;
  // True once we've emitted structured tool_calls from the inline Composer parser
  // (to avoid double-emitting if the block appears in multiple accumulated frames).
  composerInlineToolCallsEmitted: boolean;
  // History-dialect narration scrubber (PR #12723 follow-up): incrementally
  // holds back text that could start a flattenMessages dialect construct
  // ("Assistant called tool …", "Tool result (…):", "User: <tool_result>…")
  // so mimicry of the gateway's own serialization never streams to the client.
  // A finalize-time scrub alone cannot retract already-emitted deltas.
  narrationScrubber: NarrationStreamScrubber;
};

export function newStreamCtx(model: string, emit: (chunk: string) => void): StreamCtx {
  const ctx: StreamCtx = {
    responseId: `chatcmpl-cursor-${Date.now()}`,
    created: Math.floor(Date.now() / 1000),
    model,
    emit,
    emittedRoleChunk: false,
    totalText: "",
    thinkingText: "",
    tokenDelta: 0,
    priorReportedUsage: null,
    reportedUsage: null,
    ttftBreakdown: null,
    receivedText: false,
    kvAfterTextSeen: false,
    toolActivitySinceText: false,
    endReason: null,
    midStreamError: null,
    emittedToolCallIndex: 0,
    toolCalls: [],
    pendingToolCalls: new Map(),
    leftoverBytes: Buffer.alloc(0),
    unknownExecField: null,
    lastUnknownUpdateField: null,
    pendingBuiltinExecs: new Map(),
    requiresColdResume: false,
    composerVisibleEmittedLength: 0,
    composerToolParserState: isComposerModel(model) ? createStreamingState() : null,
    composerInlineToolCallsEmitted: false,
    // Assigned below (the scrubber's onToolCall callback closes over `ctx`).
    narrationScrubber: undefined as unknown as NarrationStreamScrubber,
  };
  ctx.narrationScrubber = createNarrationStreamScrubber((tc) => {
    // A narrated call surfaced by the scrubber mid-stream is emitted as a
    // structured tool_calls chunk right away; the finalize path
    // (applyKimiToolCallRecovery) will not re-add it because ctx.toolCalls
    // is non-empty by then.
    const index = ctx.emittedToolCallIndex++;
    ctx.toolCalls.push({ id: tc.id, name: tc.function.name, argumentsJson: tc.function.arguments });
    emitChunk(ctx, {
      tool_calls: [
        {
          index,
          id: tc.id,
          type: "function",
          function: { name: tc.function.name, arguments: tc.function.arguments },
        },
      ],
    });
  });
  return ctx;
}

export function ctxProducedSignal(ctx: StreamCtx): boolean {
  return (
    ctx.receivedText ||
    ctx.thinkingText.length > 0 ||
    // A tool call only counts as usable signal if it carried arguments. cursor
    // truncates tool calls under load (finish_reason:"tool_calls" with
    // arguments:"" and 0 completion tokens); treating a bare name as signal let
    // that empty turn finalize into a clean 200 the quality gate passes, and the
    // client then can't execute the argument-less call. Empty argumentsJson ===
    // no usable content, so the hop fails over instead.
    ctx.toolCalls.some((tc) => tc.argumentsJson && tc.argumentsJson.trim().length > 0) ||
    ctx.tokenDelta > 0
  );
}

function emitChunk(ctx: StreamCtx, delta: object, finishReason: string | null = null) {
  const payload = {
    id: ctx.responseId,
    object: "chat.completion.chunk",
    created: ctx.created,
    model: ctx.model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  };
  ctx.emit(`data: ${JSON.stringify(payload)}\n\n`);
}

/**
 * Emit a terminal OpenAI SSE error matching `buildStreamErrorChunks` shape
 * (`finish_reason: "error"` + `error.message`) so #8649 sawError stands down
 * and Model Test All keeps the classified Cursor message.
 */
export function emitCursorSseError(ctx: StreamCtx, classified: ClassifiedCursorError): void {
  const payload = {
    id: ctx.responseId,
    object: "chat.completion.chunk",
    created: ctx.created,
    model: ctx.model,
    choices: [{ index: 0, delta: {}, finish_reason: "error" }],
    error: {
      message: classified.message,
      type: classified.type,
    },
  };
  ctx.emit(`data: ${JSON.stringify(payload)}\n\n`);
  ctx.emit("data: [DONE]\n\n");
}

export function buildCursorUsage(ctx: StreamCtx, body: { messages?: ChatMessage[] }) {
  const metered = ctx.turnUsage;
  if (metered?.inputTokens !== undefined && metered.outputTokens !== undefined) {
    // Cursor's TurnEndedUpdate `input` already includes the cache reads (live:
    // input 56201 with cache_read 56192 on a ~57k prompt), which matches OpenAI's
    // prompt_tokens / prompt_tokens_details.cached_tokens. It totals the whole
    // run, so subtract what earlier tool-resume segments of the same run
    // reported; the segments then sum to Cursor's metering.
    const cacheRead = metered.cacheReadTokens ?? 0;
    const cacheWrite = metered.cacheWriteTokens ?? 0;
    const prior = ctx.priorReportedUsage ?? { prompt: 0, completion: 0, cached: 0 };
    const runInput = Math.max(metered.inputTokens, cacheRead + cacheWrite);
    const prompt = Math.max(0, runInput - prior.prompt);
    const completion = Math.max(0, metered.outputTokens - prior.completion);
    const cached = Math.min(prompt, Math.max(0, cacheRead - prior.cached));
    ctx.reportedUsage = { prompt, completion, cached };
    const usage: Record<string, unknown> = {
      prompt_tokens: prompt,
      completion_tokens: completion,
      total_tokens: prompt + completion,
      prompt_tokens_details: {
        cached_tokens: cached,
        ...(cacheWrite > 0 ? { cache_creation_tokens: cacheWrite } : {}),
      },
    };
    if (metered.reasoningTokens) {
      usage.completion_tokens_details = { reasoning_tokens: metered.reasoningTokens };
    }
    return addBufferToUsage(usage);
  }
  const promptTokens = estimateInputTokens(body);
  const completionTokens =
    metered?.outputTokens ??
    (ctx.tokenDelta > 0
      ? ctx.tokenDelta
      : estimateOutputTokens(ctx.totalText.length + ctx.thinkingText.length));
  ctx.reportedUsage = { prompt: promptTokens, completion: completionTokens, cached: 0 };
  const usage: Record<string, unknown> = {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: promptTokens + completionTokens,
    estimated: true,
  };
  if (metered?.cacheReadTokens !== undefined || metered?.cacheWriteTokens !== undefined) {
    usage.prompt_tokens_details = {
      ...(metered.cacheReadTokens !== undefined ? { cached_tokens: metered.cacheReadTokens } : {}),
      ...(metered.cacheWriteTokens !== undefined
        ? { cache_creation_tokens: metered.cacheWriteTokens }
        : {}),
    };
  }
  if (metered?.reasoningTokens !== undefined || ctx.thinkingText.length > 0) {
    usage.completion_tokens_details = {
      reasoning_tokens: metered?.reasoningTokens ?? estimateOutputTokens(ctx.thinkingText.length),
    };
  }
  return addBufferToUsage(usage);
}

/**
 * One log line per turn with Cursor's own TTFT split and metered cache usage,
 * so a slow turn can be attributed to the router or to Cursor. Null when
 * Cursor sent neither.
 */
export function formatCursorTurnMetrics(ctx: StreamCtx): string | null {
  const t = ctx.ttftBreakdown;
  const u = ctx.turnUsage;
  if (!t && !u) return null;
  const parts: string[] = [];
  if (t) {
    parts.push(
      `server_first_token=${Math.round(t.serverFirstTokenMs)}ms`,
      `provider_ttft=${Math.round(t.providerTtftMs)}ms`,
      `pre_stream=${Math.round(t.preStreamSetupMs)}ms`,
      `slow_pool=${Math.round(t.slowPoolWaitMs)}ms`
    );
  }
  if (u) {
    parts.push(
      `in=${u.inputTokens ?? 0}`,
      `cache_read=${u.cacheReadTokens ?? 0}`,
      `out=${u.outputTokens ?? 0}`
    );
  }
  return `[CURSOR] ${ctx.model} turn: ${parts.join(" ")}`;
}

function emitUsage(ctx: StreamCtx, body: { messages?: ChatMessage[] }) {
  // Always emit a usage chunk on the success path — the OpenAI streaming
  // contract is that every completed response carries usage. buildCursorUsage
  // already degrades cleanly to prompt-only counts when the model produced no
  // text/thinking (e.g. an empty turn), so there's no need to skip it. The
  // mid-stream-error path in finalizeSseStream returns before calling this, so
  // errored responses still don't get a spurious usage chunk.
  const usage = buildCursorUsage(ctx, body);
  const payload = {
    id: ctx.responseId,
    object: "chat.completion.chunk",
    created: ctx.created,
    model: ctx.model,
    choices: [],
    usage,
  };
  ctx.emit(`data: ${JSON.stringify(payload)}\n\n`);
}

function emitDone(ctx: StreamCtx) {
  ctx.emit("data: [DONE]\n\n");
}

export function inferCursorClientPlatform(
  messages: ChatMessage[]
): CursorClientPlatform | undefined {
  const systemMessages = messages.filter((message) => message.role === "system");
  if (systemMessages.length === 0) return undefined;
  const text = flattenMessages(systemMessages);
  const platforms = new Set<CursorClientPlatform>();
  const metadataPattern =
    /\b(?:client\s+)?(?:platform|os|operating\s+system)\s*[:=]\s*["']?(win32|windows|linux|darwin|macos|posix)\b/gi;
  for (const match of text.matchAll(metadataPattern)) {
    platforms.add(/^(?:win32|windows)$/i.test(match[1]) ? "windows" : "posix");
  }
  return platforms.size === 1 ? [...platforms][0] : undefined;
}

/** Emit one complete OpenAI-compatible structured tool call. */
function emitStructuredToolCall(
  ctx: StreamCtx,
  toolName: string,
  args: Record<string, unknown>
): string {
  if (!ctx.emittedRoleChunk) {
    emitChunk(ctx, { role: "assistant", content: "" });
    ctx.emittedRoleChunk = true;
  }
  const idx = ctx.emittedToolCallIndex++;
  const openAIToolCallId = generateToolCallId();
  const argumentsJson = JSON.stringify(args);
  emitChunk(ctx, {
    tool_calls: [
      {
        index: idx,
        id: openAIToolCallId,
        type: "function",
        function: { name: toolName, arguments: "" },
      },
    ],
  });
  emitChunk(ctx, {
    tool_calls: [
      {
        index: idx,
        function: { arguments: argumentsJson },
      },
    ],
  });
  ctx.toolCalls.push({ id: openAIToolCallId, name: toolName, argumentsJson });
  return openAIToolCallId;
}

/**
 * Process one decoded Connect-RPC frame payload: dispatch ExecServerMessage
 * events (rejection / context ack / mcp_args), decode AgentServerMessage
 * interaction updates, and emit OpenAI SSE deltas for any text content.
 *
 * Returns true if an end-of-response signal was observed.
 *
 * The h2 `req` (used to write rejection acks back on the same stream) is
 * passed via opts so this function works for both the streaming h2 path
 * and the buffered fetch fallback (where opts.req is undefined).
 *
 * Mutates `ackedExecIds` so each exec_id is dispatched exactly once even
 * when the same payload is seen multiple times during incremental decoding.
 */
export function processFrame(
  payload: Buffer,
  ctx: StreamCtx,
  ackedExecIds: Set<string>,
  opts: {
    h2Req?: import("http2").ClientHttp2Stream;
    mcpTools?: McpToolDefinition[];
    blobStore?: Map<string, Buffer>;
    clientPlatform?: CursorClientPlatform;
    todoHistory?: CursorTodoHistoryItem[];
  } = {}
): void {
  // 1. JSON error envelope (Connect-RPC style — usually status > 200).
  const jsonError = tryParseJsonError(payload);
  if (jsonError) {
    if (ctx.totalText.length === 0) {
      ctx.midStreamError = jsonError;
      ctx.endReason = "server_end";
    } else {
      // Already streamed content — terminate cleanly.
      ctx.endReason = "server_end";
    }
    return;
  }

  // 2a. KV server message: cursor requesting a blob (system prompt) or
  // saving an assistant turn. We reply on the same stream so the model
  // proceeds. The opaque request_metadata is echoed so cursor can match
  // request to response.
  const kvEvent = decodeKvServerEvent(payload);
  if (kvEvent && opts.h2Req) {
    if (kvEvent.kind === "kv_get_blob") {
      const hex = kvEvent.blobId.toString("hex");
      const blob = opts.blobStore?.get(hex) ?? Buffer.alloc(0);
      try {
        opts.h2Req.write(encodeKvGetBlobResult(kvEvent.kvId, blob, kvEvent.requestMetadata));
      } catch (e) {
        console.debug(`[CURSOR] KV get_blob write failed:`, e);
      }
    } else if (kvEvent.kind === "kv_set_blob") {
      if (opts.blobStore) {
        opts.blobStore.set(kvEvent.blobId.toString("hex"), kvEvent.blobData);
      }
      try {
        opts.h2Req.write(encodeKvSetBlobResult(kvEvent.kvId, kvEvent.requestMetadata));
      } catch (e) {
        console.debug(`[CURSOR] KV set_blob write failed:`, e);
      }
    }
  }

  // 2b. ExecServerMessage dispatch (request_context, built-in rejection, mcp).
  // Dedup by kind+execId+execMsgId — request_context and mcp_args both
  // arrive with empty execId in the current cursor schema, so a single
  // execId-only set would collapse them.
  const event = decodeExecServerEvent(payload);
  const dedupKey = event ? `${event.kind}:${event.execId}:${event.execMsgId}` : "";
  if (event && !ackedExecIds.has(dedupKey)) {
    ackedExecIds.add(dedupKey);
    // An exec event that lands after a composer kv_after_text checkpoint (or a
    // turn_ended with no text) was previously discarded by the scan loop as
    // "already ended". Under load the exec_mcp can arrive in the same TCP
    // segment as the KV checkpoint — the tool call must still be surfaced.
    const reopensTurn = !!ctx.endReason;
    debugLog(`[cursor-agent] exec kind=${event.kind} end=${ctx.endReason ?? "none"}`);
    if (event.kind === "exec_request_context") {
      if (opts.h2Req) {
        try {
          // The ack carries the tool set on RequestContext.tools (field 7) plus
          // the McpMetaToolOptions descriptors that make it discoverable through
          // Cursor's GetDynamicTools meta tool. An empty ack was previously
          // required only because the tools were being written to field 2
          // (`rules`), which the server silently stalled on.
          opts.h2Req.write(
            encodeRequestContextResponse(event.execMsgId, event.execId, opts.mcpTools ?? [])
          );
        } catch (e) {
          console.debug(`[CURSOR] request_context ack write failed:`, e);
        }
      }
    } else if (event.kind === "exec_unknown") {
      // Name the field so a new Cursor variant shows up as a clear log line
      // (and, via the idle watchdog below, a 502 that names it) instead of a
      // five-minute silent hang. Suggested by @QuangBlue on #14737.
      ctx.unknownExecField = event.variantField;
      debugLog(
        `[cursor-agent] unhandled exec variant field=${event.variantField} — no handler in this build`
      );
    } else if (event.kind === "exec_list_mcp_resources") {
      // Blocking exec: answer with an empty success (OmniRoute exposes tools,
      // not MCP resources) so the turn can finish.
      if (opts.h2Req) {
        try {
          opts.h2Req.write(encodeExecListMcpResourcesResult(event.execMsgId, event.execId));
        } catch (e) {
          console.debug(`[CURSOR] list_mcp_resources ack write failed:`, e);
        }
      }
    } else if (event.kind === "exec_mcp_state") {
      // mcp_state_exec_args (field 36) is a blocking request: the server asks
      // which MCP servers exist and emits only heartbeats until it is answered.
      if (opts.h2Req) {
        try {
          const serverIdentifier =
            event.serverIdentifiers.find((id) => id.trim().length > 0) ??
            OMNIROUTE_MCP_SERVER_IDENTIFIER;
          opts.h2Req.write(
            encodeMcpStateResponse(
              event.execMsgId,
              event.execId,
              serverIdentifier,
              opts.mcpTools ?? []
            )
          );
          debugLog(
            `[cursor-agent] answered mcp_state server=${serverIdentifier} tools=[${(opts.mcpTools ?? []).map((t) => t.name).join(",")}]`
          );
        } catch (e) {
          console.debug(`[CURSOR] mcp_state ack write failed:`, e);
        }
      }
    } else if (event.kind === "exec_mcp") {
      // Phase 5: surface the model-invoked MCP tool as an OpenAI tool_calls
      // SSE delta. Two chunks are emitted per call: an init chunk with the
      // tool's id+name+empty args, then a chunk with the JSON-stringified
      // args. Parallel tool calls share one finish chunk (Phase 8 closes).
      const openAIToolCallId = emitStructuredToolCall(ctx, event.toolName, event.args ?? {});
      if (reopensTurn) {
        // The turn was already terminated (kv_after_text / turn_ended) before
        // this frame was processed — re-open it so the scan loop keeps reading
        // instead of resolving away the buffered tail.
        ctx.endReason = "tool_calls";
      }
      // Phase 6: remember the cursor exec ids so a follow-up role:"tool"
      // message can be replied with encodeExecMcpResult on the open h2 stream.
      ctx.pendingToolCalls.set(openAIToolCallId, {
        execMsgId: event.execMsgId,
        execId: event.execId,
        toolName: event.toolName,
      });
      // Cursor pauses after mcp_args waiting for the client to either send
      // a tool result via ExecMcpResult or close the stream. We mark
      // endReason now so driveH2 returns; the session manager keeps the h2
      // alive for the next OpenAI call (which arrives with role:"tool").
      ctx.endReason = "tool_calls";
    } else {
      // Cursor/Fable frequently chooses its native Shell tool even when the
      // OpenAI client declared external tools. If a schema-compatible shell
      // tool exists, surface the native request as a structured OpenAI call.
      // Held execs receive the client tool's result on this h2 stream; tools
      // without a compatible result use a rejection and cold resume.
      const bridge =
        event.kind === "exec_git_diff"
          ? bridgeCursorGitDiff(event, opts.mcpTools ?? [])
          : isPiExecEvent(event)
            ? bridgeCursorPiTool(event, opts.mcpTools ?? [])
            : bridgeCursorBuiltinTool(event, opts.mcpTools ?? [], opts.clientPlatform);
      const heldKind = bridge
        ? event.kind === "exec_git_diff"
          ? "git_diff"
          : isPiExecEvent(event)
            ? event.kind
            : heldExecKind(event.kind)
        : null;
      if (
        (event.kind === "exec_git_diff" && !bridge) ||
        (event.kind === "exec_execute_hook" && !event.hookField)
      ) {
        ctx.unknownExecField = event.kind === "exec_git_diff" ? 44 : 27;
      }
      debugLog(
        `[cursor-agent] builtin kind=${event.kind} bridge=${bridge?.toolName ?? "none"} held=${heldKind ?? "no"}`
      );
      if (event.kind === "exec_grep") {
        debugLog(
          `[cursor-agent] grep mode=${event.outputMode || "unspecified"} patternLength=${event.pattern.length} pathPresent=${!!event.path}`
        );
      }
      const rejection = heldKind ? null : buildExecRejection(event);
      if (rejection && opts.h2Req) {
        try {
          opts.h2Req.write(rejection);
        } catch (e) {
          console.debug(`[CURSOR] exec rejection write failed:`, e);
        }
      }
      if (bridge) {
        const openAIToolCallId = emitStructuredToolCall(ctx, bridge.toolName, bridge.arguments);
        if (heldKind) {
          // Hold the exec open: the client's output comes back as a
          // role:"tool" message and is returned to Cursor as this exec's
          // SUCCESS. Telling Cursor the exec was rejected instead makes the
          // model believe its own tool never ran, so it retries the same step
          // forever (observed: an agent re-reading a missing file in a loop).
          ctx.pendingBuiltinExecs.set(openAIToolCallId, {
            execMsgId: event.execMsgId,
            execId: event.execId,
            kind: heldKind,
            path: "path" in event ? event.path : "",
            command: "command" in event ? event.command : "",
            workingDir: "workingDir" in event ? event.workingDir : "",
            fileText: "fileText" in event ? event.fileText : "",
            readRange:
              event.kind === "exec_read" &&
              ("offset" in bridge.arguments || "limit" in bridge.arguments)
                ? {
                    offset: "offset" in bridge.arguments ? event.offset : undefined,
                    limit: "limit" in bridge.arguments ? event.limit : undefined,
                  }
                : undefined,
            returnFileContentAfterWrite:
              event.kind === "exec_write" ? event.returnFileContentAfterWrite : undefined,
            pattern: "pattern" in event ? event.pattern : "",
            outputMode: event.kind === "exec_grep" ? event.outputMode : undefined,
            url: event.kind === "exec_fetch" ? event.url : undefined,
          });
        } else {
          ctx.requiresColdResume = true;
        }
        ctx.endReason = "tool_calls";
      }
    }
  }

  // 3. Interaction update deltas → OpenAI SSE chunks.
  let deltas;
  try {
    deltas = decodeAgentServerMessage(payload);
  } catch (err) {
    debugLog("[cursor-agent] decode failed:", (err as Error).message);
    throw err;
  }
  for (const d of deltas) {
    if (d.kind === "native_todo_write") {
      const dedupKey = `native_todo_write:${d.toolCallId}`;
      if (!ackedExecIds.has(dedupKey)) {
        ackedExecIds.add(dedupKey);
        const bridge = bridgeCursorNativeTodoWrite(d, opts.mcpTools ?? [], opts.todoHistory);
        if (bridge) {
          emitStructuredToolCall(ctx, bridge.toolName, bridge.arguments);
          ctx.requiresColdResume = true;
          ctx.endReason = "tool_calls";
        }
      }
    } else if (d.kind === "text" && d.text) {
      if (!ctx.emittedRoleChunk) {
        emitChunk(ctx, { role: "assistant", content: "" });
        ctx.emittedRoleChunk = true;
      }
      // History-dialect scrub (PR #12723 follow-up): hold back text that may
      // start a flattenMessages dialect construct so mimicry of the gateway's
      // own serialization ("Assistant called tool …", "Tool result (…):",
      // "User: <tool_result>…") never streams to the client. Only the
      // scrubber-cleared delta is emitted and accumulated into totalText —
      // totalText must equal what the client actually received.
      const safeDelta = ctx.narrationScrubber.feed(d.text);
      ctx.receivedText = true;
      ctx.toolActivitySinceText = false;
      if (safeDelta) {
        ctx.totalText += safeDelta;
        emitChunk(ctx, { content: safeDelta });
      }
    } else if (d.kind === "thinking" && d.text) {
      if (!ctx.emittedRoleChunk) {
        emitChunk(ctx, { role: "assistant", content: "" });
        ctx.emittedRoleChunk = true;
      }
      ctx.thinkingText += d.text;
      ctx.receivedText = true;
      ctx.toolActivitySinceText = false;
      // Composer (decolua/9router#1310) encodes the visible reply inside the
      // thinking field, after a final `</think>` marker. Emit the post-marker
      // suffix as plain `content` (so OpenAI-compatible clients see the reply)
      // and keep the pre-marker chain-of-thought out of `reasoning_content` —
      // it was never intended for the user.
      if (isComposerModel(ctx.model)) {
        const visible = visibleComposerContentFromThinking(ctx.thinkingText);
        if (visible.length > ctx.composerVisibleEmittedLength) {
          // Feed the full accumulated visible text into the DeepSeek inline
          // tool-call streaming parser (decolua/9router#1335). It tracks how
          // much has already been safely emitted and returns only the new
          // safe delta — i.e. text that precedes any `<｜tool▁calls▁begin｜>`
          // marker (or a partial prefix of one). When the closing marker
          // arrives, it sets ready=true and provides the parsed tool_calls.
          if (ctx.composerToolParserState) {
            const parseOut = feedStreamingChunk(ctx.composerToolParserState, visible);
            // composerVisibleEmittedLength tracks what the parser has "emitted"
            // — stays in sync via state.emitted.
            ctx.composerVisibleEmittedLength = ctx.composerToolParserState.emitted;
            if (parseOut.safeDelta) {
              ctx.totalText += parseOut.safeDelta;
              emitChunk(ctx, { content: parseOut.safeDelta });
            }
            if (
              parseOut.ready &&
              parseOut.toolCalls.length > 0 &&
              !ctx.composerInlineToolCallsEmitted
            ) {
              ctx.composerInlineToolCallsEmitted = true;
              for (const tc of parseOut.toolCalls) {
                const toolCallIndex = ctx.emittedToolCallIndex++;
                ctx.toolCalls.push({
                  id: tc.id,
                  name: tc.function.name,
                  argumentsJson: tc.function.arguments,
                });
                emitChunk(ctx, {
                  tool_calls: [
                    {
                      index: toolCallIndex,
                      id: tc.id,
                      type: "function",
                      function: { name: tc.function.name, arguments: tc.function.arguments },
                    },
                  ],
                });
              }
            }
          } else {
            // Non-composer or state not initialised — fall back to direct emit.
            const deltaContent = visible.slice(ctx.composerVisibleEmittedLength);
            ctx.composerVisibleEmittedLength = visible.length;
            ctx.totalText += deltaContent;
            emitChunk(ctx, { content: deltaContent });
          }
        }
      } else {
        emitChunk(ctx, { reasoning_content: d.text });
      }
    } else if (d.kind === "token_delta") {
      ctx.tokenDelta += d.tokens;
    } else if (d.kind === "turn_ended") {
      if (d.usage) ctx.turnUsage = d.usage;
      if (ctx.endReason !== "tool_calls") ctx.endReason = "turn_ended";
    } else if (d.kind === "ttft_breakdown") {
      const { kind: _kind, ...breakdown } = d;
      ctx.ttftBreakdown = breakdown;
    } else if (d.kind === "unknown") {
      // Field 7 is partial_tool_call: it streams a tool call before
      // tool_call_started, and Cursor can save KV blobs in between.
      if (d.field === 7) ctx.toolActivitySinceText = true;
      if (ctx.lastUnknownUpdateField !== d.field) {
        debugLog(`[cursor-agent] unhandled interaction update field=${d.field}`);
      }
      ctx.lastUnknownUpdateField = d.field;
    } else if (d.kind === "tool_call_started") {
      ctx.toolActivitySinceText = true;
    } else if (d.kind === "tool_call_completed" && ctx.toolCalls.length > 0) {
      // Phase 6: model paused awaiting tool result. driveH2 returns but the
      // h2 stream stays open — the session manager keeps it alive for the
      // next OpenAI call (which will arrive with role:"tool" results).
      ctx.endReason = "tool_calls";
    } else if (
      d.kind === "kv_server_message" &&
      ctx.receivedText &&
      ctx.endReason !== "tool_calls"
    ) {
      // Cursor short-circuits turn_ended for plain chats — kv_server_message
      // after text means the model finished and the server is saving the
      // turn. Phase 8 keeps both signals as defense-in-depth.
      //
      // Safe vs tool calls (composer family only): when the model invokes a
      // tool straight after text, the exec_mcp event always arrives at or
      // before this kv checkpoint (verified across many live composer-2.5
      // trials), so endReason is already "tool_calls" by the time we get here.
      // The exception is a Cursor-internal tool call in between (below).
      //
      // Non-composer models (cursor/grok-4.5-high, auto, ...) emit the KV
      // checkpoint as a blob-store side-channel frame (envelope field 4,
      // kv_get_blob/kv_set_blob) with NO turn-completion semantics, and it can
      // arrive while the model is still streaming a long preamble BEFORE a
      // pending exec_mcp. Ending the turn there drops that exec_mcp, leaving a
      // narration-only finish_reason "stop" with zero tool_calls (#10215). On
      // this family only the real terminal signals (turn_ended,
      // tool_call_completed, server_end) decide — kvAfterTextSeen is kept purely
      // as an observational flag, never as the turn terminator.
      //
      // Composer also runs Cursor-internal tools mid-turn (get_mcp_tools, served
      // through exec mcp_state) and saves KV blobs before it sends the exec_mcp
      // for the client tool. A KV checkpoint after such a tool, with no
      // text since, is that save — not the end of the turn.
      ctx.kvAfterTextSeen = true;
      if (isComposerModel(ctx.model) && !ctx.toolActivitySinceText) {
        ctx.endReason = "kv_after_text";
      }
    }
  }
}

/** Custom aliases are routing names, not exact wire ids reported by Cursor. */
export async function loadCursorWireModelIds(
  provider: string,
  loadCatalog: (
    id: string,
    includeCustomModels: boolean
  ) => Promise<{ models: Array<{ id: string }> }> = getActiveSyncedCatalog
): Promise<ReadonlySet<string> | undefined> {
  try {
    const catalog = await loadCatalog(provider, false);
    return catalog.models.length ? new Set(catalog.models.map((model) => model.id)) : undefined;
  } catch {
    return undefined;
  }
}

export class CursorExecutor extends BaseExecutor {
  constructor(provider: "cursor" | "cursor-api" = "cursor") {
    super(provider, PROVIDERS[provider]);
  }

  buildUrl() {
    return PROVIDERS.cursor.baseUrl;
  }

  /**
   * API-key connections carry a `crsr_…` key that api2.cursor.sh does not
   * accept as a Bearer; swap it for the exchanged session token before the
   * h2 stream is opened. OAuth/IDE-session connections pass through untouched.
   */
  async resolveExecutionCredentials(credentials) {
    if (!isCursorApiKey(credentials?.apiKey)) return credentials;
    try {
      const accessToken = await resolveCursorBearerToken(credentials);
      return { ...credentials, accessToken };
    } catch (err) {
      const status =
        err instanceof CursorApiKeyExchangeError ? err.status : HTTP_STATUS.SERVER_ERROR;
      const message = err instanceof Error ? err.message : String(err);
      return new Response(
        JSON.stringify({
          error: {
            message: sanitizeErrorMessage(message),
            type: status === HTTP_STATUS.UNAUTHORIZED ? "authentication_error" : "connection_error",
            code: "",
          },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  buildHeaders(credentials) {
    const ghostMode = credentials.providerSpecificData?.ghostMode !== false;
    const cleanToken = stripCursorOAuthTokenPrefix(credentials.accessToken ?? "");
    const requestId = crypto.randomUUID();
    const traceParent = `00-${crypto.randomBytes(16).toString("hex")}-${crypto.randomBytes(8).toString("hex")}-01`;
    const clientVersion = formatCursorAgentClientVersion(getCursorAgentCliVersionSync());

    // Mirrors cursor-agent's actual headers for agent.v1.AgentService/Run.
    // Notably: no x-cursor-checksum, no machineId, no x-amzn-trace-id.
    // Only advertise gzip (not brotli) — our Connect-RPC frame decoder
    // only handles gzip-compressed message bodies.
    return {
      authorization: `Bearer ${cleanToken}`,
      "backend-traceparent": traceParent,
      "connect-accept-encoding": "gzip",
      "connect-protocol-version": "1",
      "content-type": "application/connect+proto",
      traceparent: traceParent,
      "user-agent": "connect-es/1.6.1",
      "x-cursor-client-type": "cli",
      "x-cursor-client-version": clientVersion,
      "x-ghost-mode": ghostMode ? "true" : "false",
      "x-original-request-id": requestId,
      "x-request-id": requestId,
    };
  }

  /**
   * Build the request body and return it alongside the request-scoped
   * blobStore. cursor's models (auto, claude-*, gpt-*) don't reliably
   * follow system-role content delivered via the KV blob channel — even
   * though the blob is requested and our reply is accepted, the model
   * proceeds without applying the prompt.
   *
   * As a pragmatic workaround we prepend the system content into the
   * UserMessage text (the pre-Phase-7 behavior). The KV-blob handshake
   * machinery is still in place for any future schema where cursor honors
   * root_prompt_messages_json semantically — verified end-to-end with
   * wire-tap captures.
   */
  /**
   * Assemble the user text + resolved tools shared by the sync (transformRequest)
   * and async (buildRequest) request builders. Image resolution is intentionally
   * NOT done here — it's async and only the cold-path buildRequest needs it.
   */
  private assembleTextAndTools(body: {
    messages?: ChatMessage[];
    tools?: unknown;
    tool_choice?: unknown;
    max_tokens?: unknown;
    max_completion_tokens?: unknown;
    stop?: unknown;
    response_format?: unknown;
    reasoning_effort?: unknown;
    reasoning?: { effort?: unknown };
    output_config?: { effort?: unknown };
  }): { userText: string; tools: OpenAITool[] | undefined; reasoningEffort?: string } {
    const messages: ChatMessage[] = body.messages || [];
    const declaredTools: OpenAITool[] | undefined = Array.isArray(body.tools)
      ? (body.tools as OpenAITool[])
      : undefined;
    // tool_choice:"none" means "do not call any tool" — honor it by advertising
    // no tools at all (matches OpenAI semantics; composer-api does the same).
    const tools = body.tool_choice === "none" ? undefined : declaredTools;

    // flattenMessages prepends any role:"system" messages into the user
    // text (proven path that cursor's models honor). Image parts in the content
    // are ignored here (they carry no text) and resolved separately.
    let userText = flattenMessages(messages);

    // When the request declares tools, prepend the tool-commit directive so
    // composer-2.5 reliably invokes them instead of narrating intent and
    // stopping. Measured live: tool-call rate ~53% → ~88% with the directive.
    // tool_choice "required"/specific-function add a forcing line on top.
    // Default-on; set CURSOR_TOOL_DIRECTIVE=0 to opt out. See TOOL_COMMIT_DIRECTIVE.
    if (tools && tools.length > 0 && process.env.CURSOR_TOOL_DIRECTIVE !== "0") {
      userText = `${TOOL_COMMIT_DIRECTIVE}${toolChoiceDirectiveLine(body.tool_choice)}\n\n${userText}`;
    }

    // Surface OpenAI output params cursor ignores natively (response_format /
    // max_tokens / stop) as trailing prompt constraints.
    userText += buildCursorOutputConstraints(body);

    const effort = body.reasoning_effort ?? body.reasoning?.effort ?? body.output_config?.effort;
    return {
      userText,
      tools,
      reasoningEffort: typeof effort === "string" ? effort : undefined,
    };
  }

  /**
   * Resolve any OpenAI image_url parts in the request's user messages into
   * inlined cursor images. Returns undefined when the request carries no
   * images (keeps the request byte-identical to the text-only path). Throws
   * CursorImageError on invalid / oversized / SSRF-blocked input.
   */
  private async resolveRequestImages(body: {
    messages?: ChatMessage[];
  }): Promise<EncodedImage[] | undefined> {
    const messages: ChatMessage[] = body.messages || [];
    const imageUrls: string[] = [];
    for (const m of messages) {
      // Images only ride on user turns (the openai-to-cursor translator keeps
      // them only there). System/assistant/tool turns carry no vision input.
      if (m.role === "user") {
        for (const u of extractImageUrls(m.content)) imageUrls.push(u);
      }
    }
    if (imageUrls.length === 0) return undefined;
    return resolveCursorImages(imageUrls);
  }

  /**
   * Exact ids from the active Cursor synced catalog. Empty/unavailable →
   * undefined so resolveRequestedModel keeps #7289 offline splitting.
   */
  private async loadLiveCatalogIds(): Promise<ReadonlySet<string> | undefined> {
    return loadCursorWireModelIds(this.provider);
  }

  private async buildRequest(
    model: string,
    body: {
      messages?: ChatMessage[];
      tools?: unknown;
      tool_choice?: unknown;
      conversation_id?: string;
      max_tokens?: unknown;
      max_completion_tokens?: unknown;
      stop?: unknown;
      response_format?: unknown;
      reasoning_effort?: unknown;
      reasoning?: { effort?: unknown };
      output_config?: { effort?: unknown };
    },
    wireConversationId?: string
  ): Promise<{ body: Uint8Array; blobStore: Map<string, Buffer> }> {
    const { userText, tools, reasoningEffort } = this.assembleTextAndTools(body);
    const [images, liveCatalogIds] = await Promise.all([
      this.resolveRequestImages(body),
      this.loadLiveCatalogIds(),
    ]);

    const blobStore = new Map<string, Buffer>();
    const requestBody = buildAgentRequestBody({
      modelId: model,
      reasoningEffort,
      userText,
      conversationId: wireConversationId ?? body.conversation_id,
      tools,
      blobStore,
      images,
      liveCatalogIds,
    });
    return { body: requestBody, blobStore };
  }

  transformRequest(model, body, _stream, _credentials) {
    // Sync interface method (not used by cursor's own execute() path, which
    // uses the async buildRequest). Text-only — image resolution is async.
    const { userText, tools, reasoningEffort } = this.assembleTextAndTools(body);
    const blobStore = new Map<string, Buffer>();
    return buildAgentRequestBody({
      modelId: model,
      reasoningEffort,
      userText,
      conversationId: body.conversation_id,
      tools,
      blobStore,
    });
  }

  private async openH2(
    url: string,
    headers: Record<string, string>,
    body: Uint8Array,
    signal?: AbortSignal
  ): Promise<{
    status: number;
    headers: Record<string, string | number>;
    client: import("http2").ClientHttp2Session;
    req: import("http2").ClientHttp2Stream;
    initialBytes: Buffer;
    consumeError: () => Promise<Buffer>;
  }> {
    if (!http2) throw new Error("http2 module not available");
    return openCursorH2(http2, url, headers, body, signal);
  }

  /** Drive one Cursor turn while retaining the h2 stream for tool-result follow-ups. */
  private driveH2(
    h2: {
      req: import("http2").ClientHttp2Stream;
      client: import("http2").ClientHttp2Session;
      initialBytes: Buffer;
    },
    ctx: StreamCtx,
    mcpTools: McpToolDefinition[] | undefined,
    blobStore: Map<string, Buffer> | undefined,
    clientPlatform: CursorClientPlatform | undefined,
    todoHistory: CursorTodoHistoryItem[] | undefined,
    signal?: AbortSignal
  ): Promise<void> {
    return driveCursorH2(h2, ctx, {
      mcpTools,
      blobStore,
      clientPlatform,
      todoHistory,
      signal,
      debugEnabled: CURSOR_DEBUG,
      debugLog,
      onFrame: (payload, ids, opts) => processFrame(payload, ctx, ids, opts),
    });
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders, clientHeaders }) {
    const fallbackUrl = this.buildUrl();
    const executionCredentials = await this.resolveExecutionCredentials(credentials);
    if (executionCredentials instanceof Response) {
      return {
        response: executionCredentials,
        url: fallbackUrl,
        headers: {},
        transformedBody: body,
      };
    }
    let url: string;
    try {
      url = await resolveCursorAgentUrl(executionCredentials, signal);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const headers = this.buildHeaders(executionCredentials);
      return {
        response: new Response(
          JSON.stringify({
            error: {
              message: sanitizeErrorMessage(message),
              type: "connection_error",
              code: "",
            },
          }),
          {
            status: err instanceof CursorServerConfigError ? err.status : HTTP_STATUS.SERVER_ERROR,
            headers: { "Content-Type": "application/json" },
          }
        ),
        url: fallbackUrl,
        headers,
        transformedBody: body,
      };
    }
    const headers = this.buildHeaders(executionCredentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const messages: ChatMessage[] = body.messages || [];
    const conversationId: string =
      typeof body.conversation_id === "string" && body.conversation_id
        ? body.conversation_id
        : crypto.randomUUID();
    // conversationId above stays the per-request session-manager key; Cursor
    // gets a session-stable id so it keeps the prompt cache.
    const wireConversationId = resolveCursorWireConversationId(
      body,
      clientHeaders,
      credentials?.connectionId
    );
    const lastMessage = messages[messages.length - 1];
    // A tool follow-up is "this request carries tool results we may still owe
    // Cursor", not "the last message happens to be role:tool". The Responses
    // API path translates function_call_output into a role:"tool" message that
    // is NOT last (a user turn follows it), so keying off the last message
    // alone skipped session lookup entirely: every follow-up fell back to a
    // cold resume, the held exec was never answered, and the model kept
    // retrying the same built-in tool.
    const isToolFollowUp =
      lastMessage?.role === "tool" ||
      messages.some(
        (m) => m.role === "tool" && typeof m.tool_call_id === "string" && m.tool_call_id
      );
    if (isToolFollowUp) {
      debugLog(
        `[cursor-agent] history tail=${messages
          .slice(-8)
          .map(
            (m) =>
              `${m.role}:${messageContentToText(m.content).length}:${m.tool_call_id ? "tool-id" : "no-id"}`
          )
          .join(" ")}`
      );
    }

    // Tools embedded in the RequestContext ack throughout the turn —
    // synced with mcp_tools in the encoded request body.
    const declaredMcpTools: McpToolDefinition[] | undefined = Array.isArray(body.tools)
      ? openAIToolsToMcpDefs(body.tools as OpenAITool[])
      : undefined;
    const mcpTools = selectCursorBridgeTools(declaredMcpTools, body.tool_choice);
    const clientPlatform = inferCursorClientPlatform(messages);
    const todoHistory = extractLatestTodoHistory(messages);

    // Sanitize error messages: strip stack traces and absolute paths to
    // prevent information exposure. Shared helper in utils/error.ts.
    const buildErrorResponse = (status: number, message: string, type = "invalid_request_error") =>
      new Response(
        JSON.stringify({ error: { message: sanitizeErrorMessage(message), type, code: "" } }),
        { status, headers: { "Content-Type": "application/json" } }
      );

    // Cursor's agent.v1.AgentService/Run is a bidirectional Connect-RPC:
    // request_context, KV blob lookups, and exec rejections must be
    // written back on the same h2 stream while the response is still
    // being read. One-shot fetch can't do that, so cloud/edge runtimes
    // without node:http2 cannot drive cursor at all — fail fast with a
    // clear error rather than silently producing incomplete output.
    if (!http2) {
      return {
        response: buildErrorResponse(
          501,
          "Cursor provider requires Node.js http2, which is unavailable in this runtime (Edge / Cloudflare Workers / similar). Run OmniRoute on a Node.js runtime to use cursor.",
          "unsupported_runtime"
        ),
        url,
        headers,
        transformedBody: body,
      };
    }

    // ── h2 path with inline session manager (Phase 6) ──
    //
    // 1. If this is a tool-result follow-up (last message role:"tool") AND
    //    we have an alive session for the conversation, send the tool
    //    result on the existing h2 stream (inline resume).
    // 2. Otherwise, open a fresh h2 stream, send a new RunRequest, and
    //    register it as a session.
    //
    // Cold-resume fallback (acquire returns undefined, or sendToolResult
    // doesn't match): always lands on path #2, which now flattens the full
    // history (including role:"tool" messages) into UserText via
    // flattenMessages.

    type H2Like = {
      req: import("http2").ClientHttp2Stream;
      client: import("http2").ClientHttp2Session;
      initialBytes: Buffer;
    };

    let session: CursorSession | undefined;
    let h2: H2Like;
    let blobStore: Map<string, Buffer>;

    if (isToolFollowUp) {
      session = cursorSessionManager.acquire(conversationId);
      // #9029: content-based session match when client lacks conversation_id.
      if (!session && !body.conversation_id)
        session = cursorSessionManager.findByToolCallIds(
          messages.filter((m) => m.role === "tool" && m.tool_call_id).map((m) => m.tool_call_id!)
        );
    }

    if (session) {
      // Inline resume: send ExecMcpResult only for tool messages whose
      // tool_call_id is currently pending in this session. Older tool
      // messages from prior turns are already consumed by cursor and
      // sit in the request history harmlessly — sending them again
      // would either be a no-op or wedge the session, so we skip.
      // We require at least one match so we don't reuse the session
      // for a request that has no relevant tool results.
      blobStore = session.blobStore;
      let matched = 0;
      let hadFailure = false;
      for (const msg of messages) {
        if (msg.role !== "tool") continue;
        const id = msg.tool_call_id ?? "";
        if (!session.pendingToolCalls.has(id) && !session.pendingBuiltinExecs.has(id)) continue;
        debugLog(
          `[cursor-agent] tool result kind=${session.pendingBuiltinExecs.get(id)?.kind ?? "mcp"} contentType=${Array.isArray(msg.content) ? "parts" : typeof msg.content} textLength=${messageContentToText(msg.content).length}`
        );
        if (cursorSessionManager.sendToolResult(session, id, msg.content, false)) {
          matched++;
        } else {
          hadFailure = true;
          break;
        }
      }
      // The translator also embeds `<tool_result>` XML in user messages.
      // Those never appear as role:"tool", so send any id still pending.
      if (!hadFailure) {
        for (const { toolCallId, result } of extractEmbeddedCursorToolResults(messages)) {
          if (!session.pendingToolCalls.has(toolCallId)) continue;
          if (cursorSessionManager.sendToolResult(session, toolCallId, result, false)) {
            matched++;
          } else {
            hadFailure = true;
            break;
          }
        }
      }
      debugLog(`[cursor-agent] resume matched=${matched} failed=${hadFailure}`);
      if (matched === 0 || hadFailure) {
        cursorSessionManager.close(session);
        session = undefined;
      } else {
        h2 = {
          client: session.h2Client,
          req: session.h2Req,
          initialBytes: session.leftoverBytes,
        };
        session.leftoverBytes = Buffer.alloc(0);
      }
    }

    if (!session) {
      // Cold path: open fresh h2 stream with the full message history
      // flattened into UserText (Phase 6 flattenMessages handles role:"tool"
      // and assistant.tool_calls). buildRequest also resolves any image_url
      // parts (base64 / remote) into inlined cursor images.
      let built;
      try {
        built = await this.buildRequest(model, body, wireConversationId);
      } catch (err) {
        // Image resolution failures (invalid / oversized / SSRF-blocked) are
        // client errors — return a sanitized 400 rather than a 500.
        if (err instanceof CursorImageError) {
          return {
            response: buildErrorResponse(err.status, err.message, "invalid_request_error"),
            url,
            headers,
            transformedBody: body,
          };
        }
        const message = err instanceof Error ? err.message : String(err);
        return {
          response: buildErrorResponse(HTTP_STATUS.SERVER_ERROR, message, "connection_error"),
          url,
          headers,
          transformedBody: body,
        };
      }
      blobStore = built.blobStore;
      let opened;
      try {
        opened = await this.openH2(url, headers, built.body, signal);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          response: buildErrorResponse(HTTP_STATUS.SERVER_ERROR, message, "connection_error"),
          url,
          headers,
          transformedBody: body,
        };
      }
      if (opened.status !== 200) {
        // Publish the received status so proxy health counts it as upstream.
        const sink = currentAppliedProxySink();
        if (sink) sink.upstreamStatus = opened.status;
        let errBuf: Buffer;
        try {
          errBuf = await opened.consumeError();
        } catch {
          errBuf = Buffer.alloc(0);
        }
        const errText = errBuf.toString("utf8") || "Unknown error";
        if (opened.status === HTTP_STATUS.UNAUTHORIZED && isCursorApiKey(credentials.apiKey)) {
          invalidateCursorSessionToken(credentials.apiKey);
        }
        return {
          response: buildErrorResponse(opened.status, `[${opened.status}]: ${errText}`),
          url,
          headers,
          transformedBody: body,
        };
      }
      h2 = opened;
      session = cursorSessionManager.open(conversationId, opened.client, opened.req, blobStore);
    }

    // Closure to share the post-drive lifecycle between stream/non-stream paths.
    const sessionToUse = session;
    const finishLifecycle = (ctx: StreamCtx, errored: boolean) => {
      const turnMetrics = formatCursorTurnMetrics(ctx);
      if (turnMetrics) console.log(turnMetrics);
      // Persist any new pendingToolCalls from this turn into the session.
      for (const [id, info] of ctx.pendingToolCalls) {
        sessionToUse.pendingToolCalls.set(id, info);
      }
      // Held built-in execs must survive into the session too, or the client's
      // role:"tool" follow-up has nothing to answer and the exec stays open.
      for (const [id, info] of ctx.pendingBuiltinExecs) {
        sessionToUse.pendingBuiltinExecs.set(id, info);
      }
      sessionToUse.leftoverBytes = ctx.leftoverBytes;
      debugLog(
        `[cursor-agent] finish error=${errored} end=${ctx.endReason ?? "none"} cold=${ctx.requiresColdResume} held=${ctx.pendingBuiltinExecs.size} mcp=${ctx.pendingToolCalls.size}`
      );
      if (errored || ctx.endReason !== "tool_calls" || ctx.requiresColdResume) {
        cursorSessionManager.close(sessionToUse);
      } else {
        const prior = sessionToUse.reportedUsage;
        const now = ctx.reportedUsage;
        if (now) {
          sessionToUse.reportedUsage = {
            prompt: (prior?.prompt ?? 0) + now.prompt,
            completion: (prior?.completion ?? 0) + now.completion,
            cached: (prior?.cached ?? 0) + now.cached,
          };
        }
        cursorSessionManager.release(sessionToUse, "awaiting_tool_result");
      }
    };

    // Stream mode: ReadableStream that emits SSE chunks as they're decoded.
    if (stream !== false) {
      const enc = new TextEncoder();
      const sseStream = new ReadableStream(
        {
          start: async (controller) => {
            const ctx = newStreamCtx(model, (s) => controller.enqueue(enc.encode(s)));
            ctx.priorReportedUsage = sessionToUse.reportedUsage ?? null;
            try {
              await this.driveH2(h2, ctx, mcpTools, blobStore, clientPlatform, todoHistory, signal);
              this.finalizeSseStream(ctx, body);
              finishLifecycle(ctx, false);
              controller.close();
            } catch (err) {
              // OpenCodex: NGHTTP2_CANCEL after client-tool suspend is expected — finish
              // the SSE turn instead of surfacing a transport failure.
              if (
                (isCursorBenignCancelError(err) || isCursorStreamTimeoutError(err)) &&
                (ctx.totalText.length > 0 || ctx.pendingToolCalls.size > 0)
              ) {
                if (isCursorStreamTimeoutError(err)) ctx.truncatedByTimeout = true;
                this.finalizeSseStream(ctx, body);
                finishLifecycle(ctx, false);
                controller.close();
                return;
              }
              finishLifecycle(ctx, true);
              controller.error(err);
            }
          },
        },
        { highWaterMark: 16384 }
      );
      return {
        response: new Response(sseStream, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url,
        headers,
        transformedBody: body,
      };
    }

    // Non-streaming: drive to completion, return chat.completion JSON.
    const ctx = newStreamCtx(model, () => {});
    ctx.priorReportedUsage = sessionToUse.reportedUsage ?? null;
    try {
      await this.driveH2(h2, ctx, mcpTools, blobStore, clientPlatform, todoHistory, signal);
    } catch (err) {
      if (
        (isCursorBenignCancelError(err) || isCursorStreamTimeoutError(err)) &&
        (ctx.totalText.length > 0 || ctx.pendingToolCalls.size > 0)
      ) {
        if (isCursorStreamTimeoutError(err)) ctx.truncatedByTimeout = true;
        finishLifecycle(ctx, false);
        return {
          response: this.buildResponseFromCtx(ctx, body),
          url,
          headers,
          transformedBody: body,
        };
      }
      finishLifecycle(ctx, true);
      const message = err instanceof Error ? err.message : String(err);
      const classified = classifyCursorError(message);
      return {
        response: buildErrorResponse(classified.status, classified.message, classified.type),
        url,
        headers,
        transformedBody: body,
      };
    }
    // Build first: buildCursorUsage records ctx.reportedUsage for finishLifecycle.
    const response = this.buildResponseFromCtx(ctx, body);
    finishLifecycle(ctx, false);
    return {
      response,
      url,
      headers,
      transformedBody: body,
    };
  }

  /**
   * Emit the trailing SSE chunks (finish + usage + DONE) onto an already-open
   * stream. Called once driveH2 returns and ctx.endReason is set. The
   * mid-stream-error path emits an error chunk instead.
   */
  private finalizeSseStream(ctx: StreamCtx, body: { messages?: ChatMessage[] }) {
    if (ctx.midStreamError && ctx.totalText.length === 0) {
      emitCursorSseError(ctx, classifyCursorError(ctx.midStreamError.message));
      return;
    }

    // Silent empty turn (auth accepted, no text) — surface actionable error instead of
    // an empty assistant completion that chatCore maps to opaque "empty content" 502.
    if (isCursorEmptyTurn(ctx) && ctx.endReason) {
      emitCursorSseError(
        ctx,
        resolveCursorEmptyTurnError({
          upstreamMessage: ctx.midStreamError?.message,
        })
      );
      return;
    }

    if (!ctx.emittedRoleChunk) {
      // Edge case: empty response. Emit a role chunk so clients see at least
      // one delta before finish.
      emitChunk(ctx, { role: "assistant", content: "" });
    }

    // End-of-stream Composer inline tool-call fallback (decolua/9router#1335):
    // if the entire response arrived as a single big chunk (or the streaming
    // parser state never reached "ready"), try a full non-streaming parse on
    // the accumulated visible content so we still emit structured tool_calls
    // and don't leak the markers as plain text.
    if (isComposerModel(ctx.model) && !ctx.composerInlineToolCallsEmitted && ctx.totalText) {
      const parsed = parseComposerToolCalls(ctx.totalText);
      if (parsed.toolCalls.length > 0) {
        ctx.composerInlineToolCallsEmitted = true;
        // Replace totalText with the residual (markers stripped).
        ctx.totalText = parsed.content;
        for (const tc of parsed.toolCalls) {
          const toolCallIndex = ctx.emittedToolCallIndex++;
          ctx.toolCalls.push({
            id: tc.id,
            name: tc.function.name,
            argumentsJson: tc.function.arguments,
          });
          emitChunk(ctx, {
            tool_calls: [
              {
                index: toolCallIndex,
                id: tc.id,
                type: "function",
                function: { name: tc.function.name, arguments: tc.function.arguments },
              },
            ],
          });
        }
      }
    }

    finalizeKimiTurn(ctx, (chunk) => emitChunk(ctx, chunk));

    // OpenAI finish_reason: "tool_calls" if the model invoked any declared
    // tool, else "stop". A turn with mixed text + tool_calls finishes with
    // "tool_calls" (the tool calls are the actionable signal for the client).
    const finishReason =
      ctx.toolCalls.length > 0 ? "tool_calls" : ctx.truncatedByTimeout ? "length" : "stop";
    emitChunk(ctx, {}, finishReason);
    emitUsage(ctx, body);
    emitDone(ctx);
  }

  /**
   * Build a non-streaming chat.completion JSON Response from a fully-driven
   * StreamCtx. The streaming path emits chunks live via finalizeSseStream
   * and never calls this method.
   */
  private buildResponseFromCtx(ctx: StreamCtx, body: { messages?: ChatMessage[] }): Response {
    if (ctx.midStreamError && ctx.totalText.length === 0) {
      const classified = classifyCursorError(ctx.midStreamError.message);
      return new Response(
        JSON.stringify({
          error: {
            message: classified.message,
            type: classified.type,
          },
        }),
        {
          status: classified.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (isCursorEmptyTurn(ctx) && ctx.endReason) {
      const empty = resolveCursorEmptyTurnError({
        upstreamMessage: ctx.midStreamError?.message,
      });
      return new Response(
        JSON.stringify({
          error: {
            message: empty.message,
            type: empty.type,
          },
        }),
        {
          status: empty.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Non-streaming: chat.completion shape. Include tool_calls in the
    // assistant message when the model invoked any (Phase 5).

    // Composer DeepSeek inline tool-call fallback (decolua/9router#1335): for
    // non-streaming requests, the streaming parser never runs — parse the
    // accumulated visible content once here instead.
    if (isComposerModel(ctx.model) && !ctx.composerInlineToolCallsEmitted && ctx.totalText) {
      const parsed = parseComposerToolCalls(ctx.totalText);
      if (parsed.toolCalls.length > 0) {
        ctx.composerInlineToolCallsEmitted = true;
        ctx.totalText = parsed.content;
        for (const tc of parsed.toolCalls) {
          ctx.toolCalls.push({
            id: tc.id,
            name: tc.function.name,
            argumentsJson: tc.function.arguments,
          });
        }
      }
    }

    finalizeKimiTurn(ctx);

    const usage = buildCursorUsage(ctx, body);
    const finishReason =
      ctx.toolCalls.length > 0 ? "tool_calls" : ctx.truncatedByTimeout ? "length" : "stop";
    const message: {
      role: "assistant";
      content: string | null;
      reasoning_content?: string;
      tool_calls?: Array<{
        id: string;
        type: "function";
        function: { name: string; arguments: string };
      }>;
    } = {
      role: "assistant",
      content: ctx.totalText.length > 0 ? ctx.totalText : null,
    };
    if (ctx.thinkingText.length > 0) {
      // Composer: strip the visible reply (after `</think>`) from the reasoning
      // payload so it is not duplicated — it already lives in message.content
      // via the processFrame thinking handler.
      const reasoningPayload = isComposerModel(ctx.model)
        ? composerReasoningRemainder(ctx.thinkingText)
        : ctx.thinkingText;
      if (reasoningPayload.length > 0) {
        message.reasoning_content = reasoningPayload;
      }
    }
    if (ctx.toolCalls.length > 0) {
      message.tool_calls = ctx.toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: tc.argumentsJson },
      }));
    }
    return new Response(
      JSON.stringify({
        id: ctx.responseId,
        object: "chat.completion",
        created: ctx.created,
        model: ctx.model,
        choices: [
          {
            index: 0,
            message,
            finish_reason: finishReason,
          },
        ],
        usage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  async refreshCredentials(credentials, log) {
    if (!credentials?.refreshToken) {
      log?.warn?.(
        "TOKEN_REFRESH",
        "Cursor: no refresh token available, re-authentication required"
      );
      return null;
    }
    const result = await getAccessToken("cursor", credentials, log);
    if (!result || result.error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Cursor: token refresh failed${result?.error ? ` (${result.error})` : ""} — re-authentication required`
      );
      return null;
    }
    return result;
  }
}

export default CursorExecutor;
