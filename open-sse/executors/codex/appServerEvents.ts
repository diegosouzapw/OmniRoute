import type { AdapterEvent, CodexUsage } from "../../vendor/codex-chatgpt-web/types.ts";

/**
 * Map Codex app-server JSON-RPC notifications onto the AdapterEvent stream that
 * `bridgeToResponsesSSE` / `buildResponseJSON` consume.
 *
 * Wire method names are the slash-notation ServerNotification variants verified
 * from the real codex binary (see PROTOCOL-DIGEST.md). Only the handful needed for
 * a plain text turn are mapped; everything else is ignored.
 *
 * The `*Notification` param TYPES referenced below (adapted from the ts-rs bindings):
 *   AgentMessageDeltaNotification   { threadId, turnId, itemId, delta }
 *   ReasoningTextDeltaNotification  { threadId, turnId, itemId, delta, contentIndex }
 *   TurnCompletedNotification       { threadId, turn }  (turn carries usage)
 *   ErrorNotification               { error, willRetry, threadId, turnId }
 */

// Wire method names (slash-notation) → intent. Kept as named constants so a typo
// can't silently break the mapping.
export const CODEX_APPSERVER_METHODS = {
  agentMessageDelta: "item/agentMessage/delta",
  reasoningTextDelta: "item/reasoning/textDelta",
  reasoningSummaryTextDelta: "item/reasoning/summaryTextDelta",
  turnCompleted: "turn/completed",
  error: "error",
} as const;

/**
 * The app-server → client REQUEST method by which codex invokes a harness-defined
 * (dynamic) function tool. It is NOT a notification: it is a server→client
 * ServerRequest that BLOCKS the codex turn waiting for a `DynamicToolCallResponse`
 * with the tool's output.
 *
 * `params` shape = `DynamicToolCallParams` (ts-rs binding):
 *   { threadId, turnId, callId, namespace: string | null, tool: string, arguments: JsonValue }
 *
 * OmniRoute is a STATELESS ROUTER: it cannot execute the harness's tool (the tool
 * body lives in the harness downstream, not here). So instead of "executing" the
 * call, we PASS IT THROUGH: emit tool_call_* AdapterEvents so the bridge renders a
 * Responses `function_call` output item, then complete the turn. The harness runs
 * the tool and replays the result in a fresh /v1/responses request (the same
 * stateless-full-history contract every other OmniRoute provider uses).
 */
export const CODEX_APPSERVER_TOOL_CALL_METHOD = "item/tool/call";

/** Minimal shape of the DynamicToolCallParams we consume for the passthrough. */
export interface DynamicToolCallLike {
  callId?: unknown;
  namespace?: unknown;
  tool?: unknown;
  arguments?: unknown;
}

/**
 * The wire name the bridge's `toolNsMap` is keyed by: namespaced (MCP) tools are
 * flattened to "<namespace>__<name>". codex sends the namespace + tool separately
 * on DynamicToolCallParams, so we reconstruct the flat name for the round-trip.
 */
export function dynamicToolWireName(namespace: unknown, tool: unknown): string {
  const name = typeof tool === "string" ? tool : "";
  return typeof namespace === "string" && namespace.length > 0
    ? `${namespace}__${name}`
    : name;
}

/**
 * Translate ONE codex `item/tool/call` ServerRequest into the tool_call_* AdapterEvent
 * triple the bridge already knows how to turn into a Responses function_call /
 * custom_tool_call / tool_search_call (see bridge.ts:700-784). The `arguments` are
 * serialized to a JSON string (the bridge accumulates `tool_call_delta.arguments`
 * as a string and JSON.parses it at close).
 *
 * This emits the COMPLETE call in one shot (start → delta → end) because the
 * server-request carries the fully-formed arguments (codex does not stream dynamic
 * tool-call arguments to the client the way the chatgpt-web adapter streams native
 * ones). The caller is responsible for then completing the turn.
 */
export function translateToolCall(
  params: DynamicToolCallLike,
  push: (event: AdapterEvent) => void
): void {
  const callId =
    typeof params.callId === "string" && params.callId.length > 0
      ? params.callId
      : `call_${Math.random().toString(36).slice(2)}`;
  const name = dynamicToolWireName(params.namespace, params.tool);
  let argsStr = "{}";
  const rawArgs = params.arguments;
  if (typeof rawArgs === "string") {
    argsStr = rawArgs.length > 0 ? rawArgs : "{}";
  } else if (rawArgs !== undefined && rawArgs !== null) {
    try {
      argsStr = JSON.stringify(rawArgs);
    } catch {
      argsStr = "{}";
    }
  }
  push({ type: "tool_call_start", id: callId, name });
  if (argsStr.length > 0) push({ type: "tool_call_delta", arguments: argsStr });
  push({ type: "tool_call_end" });
}

interface RawUsage {
  input_tokens?: number;
  cached_input_tokens?: number;
  output_tokens?: number;
  reasoning_output_tokens?: number;
  total_tokens?: number;
}

/** Extract a numeric field defensively (the wire may omit or null it). */
function num(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/**
 * Convert the app-server usage shape (snake_case token counts) into the canonical
 * CodexUsage the bridge expects. Returns undefined when nothing usable is present.
 */
export function mapUsage(raw: unknown): CodexUsage | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const u = raw as RawUsage;
  const inputTokens = num(u.input_tokens) ?? 0;
  const outputTokens = num(u.output_tokens) ?? 0;
  const usage: CodexUsage = { inputTokens, outputTokens };
  const cached = num(u.cached_input_tokens);
  if (cached !== undefined) {
    usage.cachedInputTokens = cached;
    usage.cacheReadInputTokens = cached;
  }
  const reasoning = num(u.reasoning_output_tokens);
  if (reasoning !== undefined) usage.reasoningOutputTokens = reasoning;
  const total = num(u.total_tokens);
  if (total !== undefined) usage.totalTokens = total;
  return usage;
}

/**
 * Pull a usage object out of a `turn/completed` param. The Turn payload carries
 * token counts; different app-server builds nest it under `usage` or `tokenUsage`,
 * so probe both before giving up.
 */
function extractTurnUsage(params: Record<string, unknown>): CodexUsage | undefined {
  const turn = params.turn;
  if (turn && typeof turn === "object") {
    const t = turn as Record<string, unknown>;
    return mapUsage(t.usage) ?? mapUsage(t.tokenUsage) ?? mapUsage(t.token_usage);
  }
  return mapUsage(params.usage);
}

function errorMessage(params: Record<string, unknown>): string {
  const err = params.error;
  if (err && typeof err === "object") {
    const m = (err as Record<string, unknown>).message;
    if (typeof m === "string" && m.length > 0) return m;
  }
  if (typeof params.message === "string" && params.message.length > 0) return params.message;
  return "Codex app-server reported an error";
}

/**
 * Translate one notification into AdapterEvent(s) and push them into the queue.
 *
 * Returns `true` when the notification is terminal (turn/completed or error), so
 * the caller can close the event queue after draining.
 */
export function translateNotification(
  method: string,
  params: unknown,
  push: (event: AdapterEvent) => void
): boolean {
  const p = (params && typeof params === "object" ? params : {}) as Record<string, unknown>;

  switch (method) {
    case CODEX_APPSERVER_METHODS.agentMessageDelta: {
      const delta = p.delta;
      if (typeof delta === "string" && delta.length > 0) {
        push({ type: "text_delta", text: delta });
      }
      return false;
    }
    case CODEX_APPSERVER_METHODS.reasoningTextDelta:
    case CODEX_APPSERVER_METHODS.reasoningSummaryTextDelta: {
      const delta = p.delta;
      if (typeof delta === "string" && delta.length > 0) {
        push({ type: "thinking_delta", thinking: delta });
      }
      return false;
    }
    case CODEX_APPSERVER_METHODS.turnCompleted: {
      push({ type: "done", usage: extractTurnUsage(p), endTurn: true });
      return true;
    }
    case CODEX_APPSERVER_METHODS.error: {
      push({
        type: "error",
        message: errorMessage(p),
        status: 502,
        errorType: "provider_error",
        code: "codex_app_server_turn_failed",
      });
      return true;
    }
    default:
      return false;
  }
}
