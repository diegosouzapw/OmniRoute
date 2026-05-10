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
import {
  buildAgentRequestBody,
  decodeAgentServerMessage,
  decodeExecServerEvent,
  decodeKvServerEvent,
  encodeRequestContextResponse,
  encodeKvGetBlobResult,
  encodeKvSetBlobResult,
  encodeExecReadRejected,
  encodeExecWriteRejected,
  encodeExecDeleteRejected,
  encodeExecLsRejected,
  encodeExecShellRejected,
  encodeExecBackgroundShellSpawnRejected,
  encodeExecGrepError,
  encodeExecFetchError,
  encodeExecWriteShellStdinError,
  encodeExecDiagnosticsResult,
  flattenMessages,
  openAIToolsToMcpDefs,
  type ChatMessage,
  type ExecServerEvent,
  type McpToolDefinition,
  type OpenAITool,
} from "../utils/cursorAgentProtobuf.ts";
import {
  estimateInputTokens,
  estimateOutputTokens,
  addBufferToUsage,
} from "../utils/usageTracking.ts";
import { getCursorVersion } from "../utils/cursorVersionDetector.ts";
import { generateToolCallId } from "../translator/helpers/toolCallHelper.ts";
import { cursorSessionManager, type CursorSession } from "../services/cursorSessionManager.ts";
import crypto from "crypto";
import * as fs from "node:fs";
import * as zlib from "node:zlib";

// Reject reason text aligned with kaitranntt/CLIProxyAPIPlus — proven to
// keep cursor's model from retrying the same built-in tool indefinitely.
// The model adapts and either answers from context or uses declared MCP tools.
const BUILTIN_TOOL_REJECT_REASON =
  "Tool not available in this environment. Use the MCP tools provided instead.";

/**
 * Build the ExecClientMessage frame that responds to a built-in tool request.
 * Returns null for the request_context handshake (caller handles separately
 * to inject MCP tools in Phase 3) and for exec_mcp (model is invoking a
 * declared MCP tool — Phase 5 surfaces this as an OpenAI tool_calls delta).
 */
function buildExecRejection(event: ExecServerEvent): Buffer | null {
  switch (event.kind) {
    case "exec_request_context":
    case "exec_mcp":
      return null;
    case "exec_read":
      return encodeExecReadRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_write":
      return encodeExecWriteRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_delete":
      return encodeExecDeleteRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_ls":
      return encodeExecLsRejected(
        event.execMsgId,
        event.execId,
        event.path,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_grep":
      return encodeExecGrepError(event.execMsgId, event.execId, BUILTIN_TOOL_REJECT_REASON);
    case "exec_diagnostics":
      // Diagnostics has no rejection variant — return an empty success.
      return encodeExecDiagnosticsResult(event.execMsgId, event.execId);
    case "exec_shell":
    case "exec_shell_stream":
      return encodeExecShellRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_bg_shell":
      return encodeExecBackgroundShellSpawnRejected(
        event.execMsgId,
        event.execId,
        event.command,
        event.workingDir,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_fetch":
      return encodeExecFetchError(
        event.execMsgId,
        event.execId,
        event.url,
        BUILTIN_TOOL_REJECT_REASON
      );
    case "exec_write_shell_stdin":
      return encodeExecWriteShellStdinError(
        event.execMsgId,
        event.execId,
        BUILTIN_TOOL_REJECT_REASON
      );
  }
}

const CURSOR_AGENT_HOST = "agentn.global.api5.cursor.sh";
const CURSOR_AGENT_PATH = "/agent.v1.AgentService/Run";
const CURSOR_AGENT_URL = `https://${CURSOR_AGENT_HOST}${CURSOR_AGENT_PATH}`;

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

// Phase 8: max wall-clock time before we give up on the upstream and abort
// the stream. Cursor's longest-observed plain chat takes ~90s; tool-using
// turns can be longer. Five minutes is generous but bounded.
const CURSOR_STREAM_TIMEOUT_MS = parseInt(process.env.CURSOR_STREAM_TIMEOUT_MS || "300000", 10);

type CursorHttpResponse = {
  status: number;
  headers: Record<string, unknown>;
  body: Buffer;
};

function tryParseJsonError(payload: Buffer): { message: string; status: number } | null {
  if (payload.length < 2 || payload[0] !== 0x7b) return null;
  try {
    const text = payload.toString("utf8");
    if (!text.includes('"error"')) return null;
    const parsed = JSON.parse(text);
    const err = parsed?.error || {};
    const message =
      err?.details?.[0]?.debug?.details?.title ||
      err?.details?.[0]?.debug?.details?.detail ||
      err?.message ||
      text;
    const status =
      err?.code === "resource_exhausted" ? HTTP_STATUS.RATE_LIMITED : HTTP_STATUS.BAD_REQUEST;
    return { message, status };
  } catch {
    return null;
  }
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
  // End-signal tracking (Phase 8 hardens this further).
  receivedText: boolean;
  kvAfterTextSeen: boolean;
  endReason: "turn_ended" | "kv_after_text" | "tool_calls" | "server_end" | null;
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
};

export function newStreamCtx(model: string, emit: (chunk: string) => void): StreamCtx {
  return {
    responseId: `chatcmpl-cursor-${Date.now()}`,
    created: Math.floor(Date.now() / 1000),
    model,
    emit,
    emittedRoleChunk: false,
    totalText: "",
    thinkingText: "",
    tokenDelta: 0,
    receivedText: false,
    kvAfterTextSeen: false,
    endReason: null,
    midStreamError: null,
    emittedToolCallIndex: 0,
    toolCalls: [],
    pendingToolCalls: new Map(),
  };
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

export function buildCursorUsage(ctx: StreamCtx, body: { messages?: ChatMessage[] }) {
  const promptTokens = estimateInputTokens(body);
  const completionTokens =
    ctx.tokenDelta > 0
      ? ctx.tokenDelta
      : estimateOutputTokens(ctx.totalText.length + ctx.thinkingText.length);
  const usage: Record<string, unknown> = {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: promptTokens + completionTokens,
    estimated: true,
  };
  if (ctx.thinkingText.length > 0) {
    usage.completion_tokens_details = {
      reasoning_tokens: estimateOutputTokens(ctx.thinkingText.length),
    };
  }
  return addBufferToUsage(usage);
}

function emitUsage(ctx: StreamCtx, body: { messages?: ChatMessage[] }) {
  if (ctx.tokenDelta <= 0 && ctx.totalText.length === 0 && ctx.thinkingText.length === 0) return;
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
      } catch {}
    } else if (kvEvent.kind === "kv_set_blob") {
      if (opts.blobStore) {
        opts.blobStore.set(kvEvent.blobId.toString("hex"), kvEvent.blobData);
      }
      try {
        opts.h2Req.write(encodeKvSetBlobResult(kvEvent.kvId, kvEvent.requestMetadata));
      } catch {}
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
    if (event.kind === "exec_request_context") {
      if (opts.h2Req) {
        try {
          // Cursor receives tools via AgentRunRequest.mcp_tools (request body)
          // — sending them again in the request_context ack causes the
          // server to stall silently. Empty ack only.
          opts.h2Req.write(encodeRequestContextResponse(event.execMsgId, event.execId));
        } catch {}
      }
    } else if (event.kind === "exec_mcp") {
      // Phase 5: surface the model-invoked MCP tool as an OpenAI tool_calls
      // SSE delta. Two chunks are emitted per call: an init chunk with the
      // tool's id+name+empty args, then a chunk with the JSON-stringified
      // args. Parallel tool calls share one finish chunk (Phase 8 closes).
      if (!ctx.emittedRoleChunk) {
        emitChunk(ctx, { role: "assistant", content: "" });
        ctx.emittedRoleChunk = true;
      }
      const idx = ctx.emittedToolCallIndex++;
      const openAIToolCallId = generateToolCallId();
      const argumentsJson = JSON.stringify(event.args ?? {});
      emitChunk(ctx, {
        tool_calls: [
          {
            index: idx,
            id: openAIToolCallId,
            type: "function",
            function: { name: event.toolName, arguments: "" },
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
      ctx.toolCalls.push({
        id: openAIToolCallId,
        name: event.toolName,
        argumentsJson,
      });
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
      const rejection = buildExecRejection(event);
      if (rejection && opts.h2Req) {
        try {
          opts.h2Req.write(rejection);
        } catch {}
      }
    }
  }

  // 3. Interaction update deltas → OpenAI SSE chunks.
  let deltas;
  try {
    deltas = decodeAgentServerMessage(payload);
  } catch (err) {
    debugLog("[cursor-agent] decode failed:", (err as Error).message);
    return;
  }
  for (const d of deltas) {
    if (d.kind === "text" && d.text) {
      if (!ctx.emittedRoleChunk) {
        emitChunk(ctx, { role: "assistant", content: "" });
        ctx.emittedRoleChunk = true;
      }
      ctx.totalText += d.text;
      ctx.receivedText = true;
      emitChunk(ctx, { content: d.text });
    } else if (d.kind === "thinking" && d.text) {
      if (!ctx.emittedRoleChunk) {
        emitChunk(ctx, { role: "assistant", content: "" });
        ctx.emittedRoleChunk = true;
      }
      ctx.thinkingText += d.text;
      ctx.receivedText = true;
      emitChunk(ctx, { reasoning_content: d.text });
    } else if (d.kind === "token_delta") {
      ctx.tokenDelta += d.tokens;
    } else if (d.kind === "turn_ended") {
      ctx.endReason = "turn_ended";
    } else if (d.kind === "tool_call_completed" && ctx.toolCalls.length > 0) {
      // Phase 6: model paused awaiting tool result. driveH2 returns but the
      // h2 stream stays open — the session manager keeps it alive for the
      // next OpenAI call (which will arrive with role:"tool" results).
      ctx.endReason = "tool_calls";
    } else if (d.kind === "kv_server_message" && ctx.receivedText) {
      // Cursor short-circuits turn_ended for plain chats — kv_server_message
      // after text means the model finished and the server is saving the
      // turn. Phase 8 keeps both signals as defense-in-depth.
      ctx.kvAfterTextSeen = true;
      ctx.endReason = "kv_after_text";
    }
  }
}

export class CursorExecutor extends BaseExecutor {
  constructor() {
    super("cursor", PROVIDERS.cursor);
  }

  buildUrl() {
    return CURSOR_AGENT_URL;
  }

  buildHeaders(credentials) {
    const accessToken = credentials.accessToken;
    const ghostMode = credentials.providerSpecificData?.ghostMode !== false;
    const cleanToken = accessToken.includes("::") ? accessToken.split("::")[1] : accessToken;
    const requestId = crypto.randomUUID();
    const traceParent = `00-${crypto.randomBytes(16).toString("hex")}-${crypto.randomBytes(8).toString("hex")}-01`;

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
      "x-cursor-client-version": `cli-${getCursorVersion()}`,
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
  private buildRequest(
    model: string,
    body: { messages?: ChatMessage[]; tools?: unknown; conversation_id?: string }
  ): { body: Uint8Array; blobStore: Map<string, Buffer> } {
    const messages: ChatMessage[] = body.messages || [];
    const tools: OpenAITool[] | undefined = Array.isArray(body.tools)
      ? (body.tools as OpenAITool[])
      : undefined;

    // flattenMessages prepends any role:"system" messages into the user
    // text (proven path that cursor's models honor).
    const userText = flattenMessages(messages);

    const blobStore = new Map<string, Buffer>();
    const requestBody = buildAgentRequestBody({
      modelId: model,
      userText,
      conversationId: body.conversation_id,
      tools,
      blobStore,
    });
    return { body: requestBody, blobStore };
  }

  transformRequest(model, body, _stream, _credentials) {
    return this.buildRequest(model, body).body;
  }

  // ─── h2 lifecycle: open + drive (Phase 4 streaming refactor) ─────────────
  //
  // openH2 establishes the bidirectional stream and waits for the response
  // headers (so we can decide whether to commit to a streaming SSE Response
  // or return an error). driveH2 then consumes data events incrementally,
  // dispatching frames through processFrame so SSE chunks land on the
  // ReadableStream controller as the upstream produces them.
  //
  // The fetch fallback (cloud envs without http2) preserves the legacy
  // buffer-then-decode behavior — Connect-RPC bidirectional ack-on-same-stream
  // can't run over a one-shot fetch anyway.

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

    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const client = http2!.connect(`https://${urlObj.host}`);
      const earlyChunks: Buffer[] = [];
      let resolved = false;

      client.on("error", (err) => {
        if (!resolved) reject(err);
      });

      const req = client.request({
        ":method": "POST",
        ":path": urlObj.pathname,
        ":authority": urlObj.host,
        ":scheme": "https",
        ...headers,
      });

      const onAbort = () => {
        try {
          req.close();
          client.close();
        } catch {}
        if (!resolved) {
          resolved = true;
          reject(new Error("aborted"));
        }
      };
      if (signal) signal.addEventListener("abort", onAbort);

      req.on("response", (h) => {
        if (resolved) return;
        resolved = true;
        const status = Number(h[":status"] ?? HTTP_STATUS.SERVER_ERROR);
        // For non-200 statuses, drain the remaining body for an error message.
        // The caller calls consumeError() to await the full body.
        const consumeError = () =>
          new Promise<Buffer>((res) => {
            const out = [...earlyChunks];
            req.on("data", (c) => out.push(Buffer.from(c)));
            req.on("end", () => {
              try {
                req.close();
                client.close();
              } catch {}
              if (signal) signal.removeEventListener("abort", onAbort);
              res(Buffer.concat(out));
            });
            req.on("error", () => {
              try {
                req.close();
                client.close();
              } catch {}
              if (signal) signal.removeEventListener("abort", onAbort);
              res(Buffer.concat(out));
            });
          });
        resolve({
          status,
          headers: h as Record<string, string | number>,
          client,
          req,
          initialBytes: Buffer.concat(earlyChunks),
          consumeError,
        });
      });

      // Buffer any data that arrives before the response event resolves.
      // (In practice the response event fires first, but this guards against
      // implementation differences in node:http2.)
      req.on("data", (chunk) => {
        if (!resolved) earlyChunks.push(Buffer.from(chunk));
      });

      req.on("error", (err) => {
        if (!resolved) {
          resolved = true;
          if (signal) signal.removeEventListener("abort", onAbort);
          reject(err);
        }
      });

      // Bidirectional streaming: write the init message but DO NOT send
      // END_STREAM — cursor's server stops responding once we close our side.
      req.write(body);
    });
  }

  /**
   * Drive an open h2 stream to completion. processFrame populates ctx as
   * each Connect-RPC frame is decoded; the loop closes when ctx.endReason
   * is set (turn_ended, kv_after_text, server_end) or the stream errors.
   *
   * Phase 8 will add a max-stream safety timeout here.
   */
  private driveH2(
    h2: {
      req: import("http2").ClientHttp2Stream;
      client: import("http2").ClientHttp2Session;
      initialBytes: Buffer;
    },
    ctx: StreamCtx,
    mcpTools: McpToolDefinition[] | undefined,
    blobStore: Map<string, Buffer> | undefined,
    signal?: AbortSignal
  ): Promise<void> {
    const ackedExecIds = new Set<string>();
    // Rolling buffer: chunks arrive on `data`, get appended, and consumed
    // frames are sliced off so we don't re-scan + re-concat on every event
    // (avoids O(N²) for long-running streams).
    let buf: Buffer = h2.initialBytes.length > 0 ? h2.initialBytes : Buffer.alloc(0);

    return new Promise((resolve, reject) => {
      // Phase 8: safety timeout. If neither turn_ended, kv_after_text, nor
      // server-end fires within CURSOR_STREAM_TIMEOUT_MS, abort the stream
      // so a stuck upstream doesn't keep the response open indefinitely.
      const safetyTimer = setTimeout(() => {
        if (ctx.endReason) return;
        debugLog("[cursor-agent] stream safety timeout fired");
        teardown();
        reject(new Error("cursor-agent stream timed out"));
      }, CURSOR_STREAM_TIMEOUT_MS);

      const onData = (chunk: Buffer) => {
        if (CURSOR_DEBUG && process.env.CURSOR_DUMP_FILE) {
          fs.appendFileSync(process.env.CURSOR_DUMP_FILE, chunk);
        }
        buf = buf.length === 0 ? Buffer.from(chunk) : Buffer.concat([buf, chunk]);
        tryScan();
      };
      const onEnd = () => {
        if (!ctx.endReason) ctx.endReason = "server_end";
        detachListeners();
        resolve();
      };
      const onErr = (err: Error) => {
        teardown();
        reject(err);
      };
      const onAbort = () => {
        teardown();
        reject(new Error("aborted"));
      };

      // detachListeners removes data/end/error/abort handlers and clears the
      // safety timer. Called on successful resolve when the caller keeps the
      // h2 alive (Phase 6 session reuse).
      const detachListeners = () => {
        clearTimeout(safetyTimer);
        h2.req.off("data", onData);
        h2.req.off("end", onEnd);
        h2.req.off("error", onErr);
        if (signal) signal.removeEventListener("abort", onAbort);
      };
      // teardown additionally closes the h2 stream. Used on error / abort /
      // safety-timeout — the connection isn't worth keeping at that point.
      const teardown = () => {
        detachListeners();
        try {
          h2.req.close();
          h2.client.close();
        } catch {}
      };

      if (signal) signal.addEventListener("abort", onAbort);

      const tryScan = () => {
        let pos = 0;
        while (pos + 5 <= buf.length) {
          const length = buf.readUInt32BE(pos + 1);
          if (pos + 5 + length > buf.length) break; // partial frame; wait
          const flag = buf[pos];
          const raw = buf.subarray(pos + 5, pos + 5 + length);
          // Per-frame error isolation: if gunzip or processFrame throws on
          // one frame, log and skip past it instead of getting stuck on
          // the same offset and hanging until the safety timer fires.
          try {
            const payload = flag & 0x1 ? zlib.gunzipSync(raw) : raw;
            processFrame(payload, ctx, ackedExecIds, { h2Req: h2.req, mcpTools, blobStore });
          } catch (err) {
            debugLog("[cursor-agent] frame decode failed at pos", pos, ":", (err as Error).message);
          }
          pos += 5 + length;
          if (ctx.endReason) {
            buf = buf.subarray(pos);
            detachListeners();
            resolve();
            return;
          }
        }
        // Splice off processed bytes so the buffer stays bounded.
        if (pos > 0) buf = buf.subarray(pos);
      };

      h2.req.on("data", onData);
      h2.req.on("end", onEnd);
      h2.req.on("error", onErr);

      // Process any bytes already buffered from openH2.
      tryScan();
    });
  }

  async execute({ model, body, stream, credentials, signal, log, upstreamExtraHeaders }) {
    const url = this.buildUrl();
    const headers = this.buildHeaders(credentials);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const messages: ChatMessage[] = body.messages || [];
    const conversationId: string =
      typeof body.conversation_id === "string" && body.conversation_id
        ? body.conversation_id
        : crypto.randomUUID();
    const lastMessage = messages[messages.length - 1];
    const isToolFollowUp = lastMessage?.role === "tool";

    // Tools embedded in the RequestContext ack throughout the turn —
    // synced with mcp_tools in the encoded request body.
    const mcpTools: McpToolDefinition[] | undefined = Array.isArray(body.tools)
      ? openAIToolsToMcpDefs(body.tools as OpenAITool[])
      : undefined;

    const buildErrorResponse = (status: number, message: string, type = "invalid_request_error") =>
      new Response(JSON.stringify({ error: { message, type, code: "" } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });

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
        if (!session.pendingToolCalls.has(id)) continue;
        const content = typeof msg.content === "string" ? msg.content : "";
        if (cursorSessionManager.sendToolResult(session, id, content, false)) {
          matched++;
        } else {
          hadFailure = true;
          break;
        }
      }
      if (matched === 0 || hadFailure) {
        cursorSessionManager.close(session);
        session = undefined;
      } else {
        h2 = {
          client: session.h2Client,
          req: session.h2Req,
          initialBytes: Buffer.alloc(0),
        };
      }
    }

    if (!session) {
      // Cold path: open fresh h2 stream with the full message history
      // flattened into UserText (Phase 6 flattenMessages handles role:"tool"
      // and assistant.tool_calls).
      const built = this.buildRequest(model, body);
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
        const errBuf = await opened.consumeError();
        const errText = errBuf.toString("utf8") || "Unknown error";
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
      // Persist any new pendingToolCalls from this turn into the session.
      for (const [id, info] of ctx.pendingToolCalls) {
        sessionToUse.pendingToolCalls.set(id, info);
      }
      if (errored || ctx.endReason !== "tool_calls") {
        cursorSessionManager.close(sessionToUse);
      } else {
        cursorSessionManager.release(sessionToUse, "awaiting_tool_result");
      }
    };

    // Stream mode: ReadableStream that emits SSE chunks as they're decoded.
    if (stream !== false) {
      const enc = new TextEncoder();
      const sseStream = new ReadableStream({
        start: async (controller) => {
          const ctx = newStreamCtx(model, (s) => controller.enqueue(enc.encode(s)));
          try {
            await this.driveH2(h2, ctx, mcpTools, blobStore, signal);
            this.finalizeSseStream(ctx, body);
            finishLifecycle(ctx, false);
            controller.close();
          } catch (err) {
            finishLifecycle(ctx, true);
            controller.error(err);
          }
        },
      });
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
    try {
      await this.driveH2(h2, ctx, mcpTools, blobStore, signal);
    } catch (err) {
      finishLifecycle(ctx, true);
      const message = err instanceof Error ? err.message : String(err);
      return {
        response: buildErrorResponse(HTTP_STATUS.SERVER_ERROR, message, "connection_error"),
        url,
        headers,
        transformedBody: body,
      };
    }
    finishLifecycle(ctx, false);
    return {
      response: this.buildResponseFromCtx(ctx, body),
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
      const payload = {
        id: ctx.responseId,
        object: "chat.completion.chunk",
        created: ctx.created,
        model: ctx.model,
        choices: [],
        error: {
          message: ctx.midStreamError.message,
          type:
            ctx.midStreamError.status === HTTP_STATUS.RATE_LIMITED
              ? "rate_limit_error"
              : "api_error",
        },
      };
      ctx.emit(`data: ${JSON.stringify(payload)}\n\n`);
      ctx.emit("data: [DONE]\n\n");
      return;
    }
    if (!ctx.emittedRoleChunk) {
      // Edge case: empty response. Emit a role chunk so clients see at least
      // one delta before finish.
      emitChunk(ctx, { role: "assistant", content: "" });
    }
    // OpenAI finish_reason: "tool_calls" if the model invoked any declared
    // tool, else "stop". A turn with mixed text + tool_calls finishes with
    // "tool_calls" (the tool calls are the actionable signal for the client).
    const finishReason = ctx.toolCalls.length > 0 ? "tool_calls" : "stop";
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
      return new Response(
        JSON.stringify({
          error: {
            message: ctx.midStreamError.message,
            type:
              ctx.midStreamError.status === HTTP_STATUS.RATE_LIMITED
                ? "rate_limit_error"
                : "api_error",
          },
        }),
        {
          status: ctx.midStreamError.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Non-streaming: chat.completion shape. Include tool_calls in the
    // assistant message when the model invoked any (Phase 5).
    const usage = buildCursorUsage(ctx, body);
    const finishReason = ctx.toolCalls.length > 0 ? "tool_calls" : "stop";
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
      message.reasoning_content = ctx.thinkingText;
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

  async refreshCredentials() {
    return null;
  }
}

export default CursorExecutor;
