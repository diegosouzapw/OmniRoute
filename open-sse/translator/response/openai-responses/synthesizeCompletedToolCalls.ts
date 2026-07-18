// Extracted from response/openai-responses.ts (file-size ratchet) — synthesizes
// tool_calls chunks from a response.completed event's output[] snapshot, for
// upstream providers that send a single batched completed event WITHOUT first
// emitting the individual response.output_item.added/.delta/.done events.
// Without this, state.toolCallIndex stays 0 and state.currentToolCallId stays
// null, so computeFinishReason returns "stop" instead of "tool_calls",
// breaking the agent loop for downstream Chat Completions clients.
import { fallbackToolCallId } from "../../helpers/toolCallHelper.ts";
import { normalizeToolName, stripEmptyOptionalToolArgs } from "./pureHelpers.ts";

/**
 * Resolve the terminal finish_reason for a Responses→Chat stream.
 *
 * `currentToolCallId` is intentionally sticky for the current turn: it is set when a
 * function_call item is announced (`response.output_item.added`) and is only cleared once
 * the matching `response.output_item.done` advances `toolCallIndex`. If the stream ends
 * (flush or `response.completed`) after a tool call was emitted but BEFORE its
 * `output_item.done` arrived, `toolCallIndex` is still 0 while `currentToolCallId` is set.
 * Guarding on it as well lets us still finalize as `tool_calls` instead of `stop`, so
 * OpenAI-compatible clients continue tool-result processing instead of stopping prematurely.
 *
 * Lives here (not pureHelpers.ts) because it takes stream `state` — pureHelpers.ts is
 * guarded (tests/unit/response-openai-responses-purehelpers-split.test.ts) to have NO
 * state coupling at all.
 */
export function computeFinishReason(state): "tool_calls" | "stop" {
  return (state.toolCallIndex || 0) > 0 || state.currentToolCallId ? "tool_calls" : "stop";
}

/**
 * OpenAI Chat Completions streams announce the assistant role on the FIRST delta
 * (e.g. `{ "role": "assistant", "content": "" }` or `{ "role": "assistant",
 * "tool_calls": [...] }`). The Responses API has no role-announcement event, so when
 * translating Responses → Chat we must synthesize it on the first emitted chunk.
 *
 * Strict streaming clients — notably @langchain/openai's `_convertDeltaToMessageChunk`
 * (used by n8n's AI Agent) — key off the first chunk's role to build an AIMessageChunk.
 * Without it, streamed tool_call deltas are dropped and the agent returns an empty
 * response, even though the underlying tool call is well-formed.
 */
// Shared by both branches of withAssistantRoleOnFirstDelta below: stamps
// role: "assistant" onto a single delta object when eligible, returning
// whether it did so (used to short-circuit the array branch's loop).
function setAssistantRoleIfEligible(state, delta) {
  if (delta && typeof delta === "object" && !Array.isArray(delta)) {
    delta.role = "assistant";
    state.roleEmitted = true;
    return true;
  }
  return false;
}

export function withAssistantRoleOnFirstDelta(state, result) {
  if (!result || state.roleEmitted) return result;

  // Handle arrays of chunks (e.g. synthesized from response.completed output[])
  if (Array.isArray(result)) {
    for (const chunk of result) {
      if (setAssistantRoleIfEligible(state, chunk?.choices?.[0]?.delta)) break;
    }
    return result;
  }

  setAssistantRoleIfEligible(state, result.choices?.[0]?.delta);
  return result;
}

function baseChunk(state): Record<string, unknown> {
  return {
    id: state.chatId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "gpt-4",
  };
}

/** Resolve the arguments string to emit — may arrive as a string or object. */
function resolveArgsStr(rawArgs, toolName, toolSchema): string {
  const argsToEmit = stripEmptyOptionalToolArgs(rawArgs, toolName, toolSchema);
  if (argsToEmit != null) {
    return typeof argsToEmit === "string" ? argsToEmit : JSON.stringify(argsToEmit);
  }
  if (rawArgs != null) {
    return typeof rawArgs === "string" ? rawArgs : JSON.stringify(rawArgs);
  }
  return "";
}

/**
 * Build the header + args chunks for one synthesized function_call item,
 * mutating `state` exactly as the incremental output_item.added/.done path
 * would (currentToolCallId, currentToolCallArgsBuffer, currentToolCallDeferred,
 * toolCallIndex), so downstream chunk math (computeFinishReason, subsequent
 * incremental events in the same turn) stays consistent.
 */
function buildToolCallChunks(state, fcItem): Record<string, unknown>[] {
  const chunks: Record<string, unknown>[] = [];
  const callId = fcItem.call_id || fallbackToolCallId(state.toolCallIndex);
  const toolName = normalizeToolName(fcItem.name);
  const toolSchema = state.toolSchemas?.get(toolName);

  // Set state as output_item.added would
  state.currentToolCallId = callId;
  state.currentToolCallArgsBuffer = "";
  state.currentToolCallDeferred = false;

  // Emit the tool call header chunk (id, type, function.name)
  const currentIndex = state.toolCallIndex;
  chunks.push({
    ...baseChunk(state),
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: currentIndex,
              id: callId,
              type: "function",
              function: { name: toolName || "", arguments: "" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  });

  const argsStr = resolveArgsStr(fcItem.arguments, toolName, toolSchema);
  if (argsStr) {
    state.currentToolCallArgsBuffer = argsStr;
    chunks.push({
      ...baseChunk(state),
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: currentIndex, function: { arguments: argsStr } }] },
          finish_reason: null,
        },
      ],
    });
  }

  // Advance state as output_item.done would
  state.toolCallIndex++;
  state.currentToolCallArgsBuffer = "";
  state.currentToolCallId = null;

  return chunks;
}

/** Build the terminal chunk (finish_reason + usage) once all tool calls are synthesized. */
function buildFinalChunk(state): Record<string, unknown> {
  state.finishReasonSent = true;
  const reason = computeFinishReason(state);
  state.finishReason = reason;

  const finalChunk: Record<string, unknown> = {
    ...baseChunk(state),
    choices: [{ index: 0, delta: {}, finish_reason: reason }],
  };
  if (state.usage && typeof state.usage === "object") {
    finalChunk.usage = state.usage;
  }
  return finalChunk;
}

/**
 * Synthesize chat-completion-style tool_calls chunks for any `function_call`
 * items in `output` whose call_id was NOT already tracked via incremental
 * `output_item.added`/`.done` events (`state.toolCallIdsSeen`). This dedup
 * guard prevents double-emission when a provider streams incrementally AND
 * `response.completed` also echoes the same function_call items in its
 * output[] snapshot (standard Responses-API snapshot behavior).
 *
 * Mutates `state` exactly as the incremental path would (toolCallIndex,
 * currentToolCallId, currentToolCallArgsBuffer, currentToolCallDeferred,
 * finishReasonSent, finishReason), so downstream chunk math stays consistent.
 *
 * Returns the array of synthesized chunks, or `null` when there is nothing to
 * synthesize (no un-seen function_call items, or finish_reason already sent)
 * — the caller falls through to its own default finish_reason handling.
 */
export function synthesizeCompletedToolCalls(state, output): Record<string, unknown>[] | null {
  const outputItems = Array.isArray(output) ? output : [];
  const functionCallItems = outputItems.filter(
    (item) => item?.type === "function_call" && !state.toolCallIdsSeen?.has(item.call_id)
  );

  if (functionCallItems.length === 0 || state.finishReasonSent) return null;

  const synthesizedChunks: Record<string, unknown>[] = [];
  for (const fcItem of functionCallItems) {
    synthesizedChunks.push(...buildToolCallChunks(state, fcItem));
  }
  synthesizedChunks.push(buildFinalChunk(state));
  return synthesizedChunks;
}
