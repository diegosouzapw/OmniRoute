/**
 * Translator: OpenAI Chat Completions → OpenAI Responses API (response)
 * Converts streaming chunks from Chat Completions to Responses API events
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { appendToolCallArgumentDelta } from "../../utils/toolCallArguments.ts";
import { fallbackToolCallId } from "../helpers/toolCallHelper.ts";
import { shouldParseTextualReasoningTags } from "../../handlers/responseSanitizer.ts";
import {
  isInternalReasoningPlaceholder,
  stripInternalReasoningPlaceholder,
} from "../../utils/reasoningPlaceholder.ts";
import {
  normalizeToolName,
  stripEmptyOptionalToolArgs,
  normalizeOutputIndex,
  normalizeUpstreamFailure,
  getVisibleResponsesReasoningSummaryText,
} from "./openai-responses/pureHelpers.ts";
import { createEventEmitter } from "./openai-responses/eventEmitter.ts";
import { buildResponsesToolCallItem } from "./responsesToolItem.ts";
import { resolveRequestToolIdentity } from "./openai-responses/requestToolIdentity.ts";
import {
  synthesizeCompletedToolCalls,
  computeFinishReason,
  withAssistantRoleOnFirstDelta,
} from "./openai-responses/synthesizeCompletedToolCalls.ts";

// normalizeUpstreamFailure is re-exported for external importers (tests).
export { normalizeUpstreamFailure } from "./openai-responses/pureHelpers.ts";

/**
 * Escape control characters (newlines, tabs, carriage returns) that appear
 * inside JSON string values, ensuring the resulting string is valid JSON.
 * This handles upstream providers (e.g. Gemini/Gemma) that emit literal
 * newlines (0x0A) instead of \n escapes inside tool call argument JSON.
 * Only escapes characters inside string contexts to avoid double-escaping
 * already-proper JSON or corrupting structural newlines.
 */
function escapeJsonStringValues(json: string): string {
  let result = "";
  let inString = false;

  for (let i = 0; i < json.length; i++) {
    const ch = json[i];

    // Inside a string, skip over escape sequences
    if (inString && ch === "\\") {
      result += ch + (json[i + 1] ?? "");
      i++;
      continue;
    }

    // Toggle string state on unescaped double quotes
    if (ch === '"') {
      result += ch;
      inString = !inString;
      continue;
    }

    // Escape control characters only inside string values
    if (inString && (ch === "\n" || ch === "\r" || ch === "\t")) {
      result += ch === "\n" ? "\\n" : ch === "\r" ? "\\r" : "\\t";
      continue;
    }

    result += ch;
  }

  return result;
}

/**
 * Translate OpenAI chunk to Responses API events
 * @returns {Array} Array of events with { event, data } structure
 */
export function openaiToOpenAIResponsesResponse(chunk, state) {
  if (!chunk) {
    return flushEvents(state);
  }

  // Capture usage from all chunks that carry it (usage-only chunks OR final chunks with finish_reason)
  // Normalize Chat Completions format (prompt_tokens/completion_tokens) to Responses API format
  // (input_tokens/output_tokens) so response.completed always has the fields Codex expects.
  if (chunk.usage) {
    const u = chunk.usage;
    const input_tokens = u.input_tokens ?? u.prompt_tokens ?? 0;
    const output_tokens = u.output_tokens ?? u.completion_tokens ?? 0;
    state.usage = {
      input_tokens,
      output_tokens,
      total_tokens: u.total_tokens ?? input_tokens + output_tokens,
    };
    const cachedTokens =
      u.input_tokens_details?.cached_tokens ?? u.prompt_tokens_details?.cached_tokens;
    if (cachedTokens) {
      state.usage.input_tokens_details = { cached_tokens: cachedTokens };
    }
    const reasoningTokens =
      u.output_tokens_details?.reasoning_tokens ?? u.completion_tokens_details?.reasoning_tokens;
    if (reasoningTokens) {
      state.usage.output_tokens_details = { reasoning_tokens: reasoningTokens };
    }
  }

  if (!chunk.choices?.length) {
    // Mid-stream aggregator error: OpenRouter (and similar OpenAI-compatible
    // aggregators) can send an HTTP 200 SSE stream whose body carries a chunk with
    // empty `choices` and a top-level `error` object instead of any delta — e.g. the
    // underlying provider hitting its own capacity limit mid-request. Without this
    // branch the chunk has no choices, so it falls into the awaitingTrailingUsage/
    // no-op path below and the stream silently ends with a false "completed, empty
    // output" response, masking the failure and skipping combo fallback. Surface it
    // as state.upstreamError so stream.ts errors the stream out (mirrors the
    // Gemini-to-OpenAI translator's #4177 fix).
    if (chunk.error && typeof chunk.error === "object") {
      const rawCode = chunk.error.code;
      const status =
        typeof rawCode === "number" && rawCode >= 400 && rawCode <= 599 ? rawCode : 502;
      state.upstreamError = {
        status,
        type: status === 429 ? "rate_limit_error" : "server_error",
        code:
          typeof chunk.error.metadata?.error_type === "string"
            ? chunk.error.metadata.error_type
            : status === 429
              ? "rate_limit_exceeded"
              : "bad_gateway",
        message: typeof chunk.error.message === "string" ? chunk.error.message : "Upstream failure",
      };
      return [];
    }
    // #6906: a deferred finish_reason (awaitingTrailingUsage, see below) completes here —
    // the trailing usage-only chunk (choices: [], usage: {...}) is what real
    // stream_options.include_usage=true upstreams send after finish_reason (see the
    // "READ THIS" block in stream.ts); state.usage was already captured above.
    if (state.awaitingTrailingUsage && !state.completedSent) {
      const { events, emit } = createEventEmitter(state);
      sendCompleted(state, emit);
      return events;
    }
    return [];
  }

  const { events, emit } = createEventEmitter(state);

  const choice = chunk.choices[0];
  const idx = choice.index || 0;
  const delta = choice.delta || {};
  if (state.parseTextualReasoningTags !== true && typeof chunk.model === "string") {
    state.parseTextualReasoningTags = shouldParseTextualReasoningTags(undefined, chunk.model);
  }
  const parseTextualReasoningTags = state.parseTextualReasoningTags === true;
  // #3697: remember the upstream-resolved model so response.created/in_progress/completed
  // can carry a `model` field (the Responses API spec has one; this translator previously
  // omitted it). Codex CLI compatibility shim (chatCore's echoModel pipeline) rewrites this
  // field to the client-requested effort-suffixed id for codex-originated requests.
  if (!state.model && typeof chunk.model === "string" && chunk.model.trim()) {
    state.model = chunk.model.trim();
  }

  // Emit initial events
  if (!state.started) {
    state.started = true;
    state.responseId = chunk.id ? `resp_${chunk.id}` : state.responseId;

    const createdResponse: Record<string, unknown> = {
      id: state.responseId,
      object: "response",
      created_at: state.created,
      status: "in_progress",
      background: false,
      error: null,
      output: [],
    };
    if (state.model) createdResponse.model = state.model;
    emit("response.created", {
      type: "response.created",
      response: createdResponse,
    });

    const inProgressResponse: Record<string, unknown> = {
      id: state.responseId,
      object: "response",
      created_at: state.created,
      status: "in_progress",
    };
    if (state.model) inProgressResponse.model = state.model;
    emit("response.in_progress", {
      type: "response.in_progress",
      response: inProgressResponse,
    });
  }

  if (delta.reasoning_content && !isInternalReasoningPlaceholder(delta.reasoning_content)) {
    startReasoning(state, emit, idx);
    emitReasoningDelta(state, emit, delta.reasoning_content);
  }
  // Strip the internal reasoning placeholder if the model echoed it
  // through ordinary content (#8081). Only the text-content emission is
  // skipped when nothing meaningful remains; tool_calls / finish_reason
  // handling below must still run for this same chunk.
  if (delta.content) {
    const strippedContent = stripInternalReasoningPlaceholder(delta.content);
    if (strippedContent) {
      if (
        state.reasoningId &&
        !state.reasoningDone &&
        (!parseTextualReasoningTags || !state.inThinking)
      ) {
        closeReasoning(state, emit);
      }

      let content = strippedContent;

      if (parseTextualReasoningTags) {
        if (content.includes("<think>")) {
          state.inThinking = true;
          content = content.replaceAll("<think>", "");
          startReasoning(state, emit, idx);
        }

        if (content.includes("</think>")) {
          const parts = content.split("</think>");
          const thinkPart = parts[0];
          const textPart = parts.slice(1).join("</think>");
          if (thinkPart) emitReasoningDelta(state, emit, thinkPart);
          closeReasoning(state, emit);
          state.inThinking = false;
          content = textPart;
        }

        if (state.inThinking && content) {
          emitReasoningDelta(state, emit, content);
          // Pre-existing behaviour (unrelated to #8081): a still-open
          // textual <think> block ends this chunk's handling early.
          return events;
        }
      }

      if (content) {
        const msgIdx = state.reasoningId ? state.reasoningIndex + 1 : idx;
        emitTextContent(state, emit, msgIdx, content);
      }
    }
  }

  // Handle tool_calls
  if (delta.tool_calls) {
    // Close reasoning first so tool calls do not collide with an open
    // reasoning item, then close the message at its real index.
    if (state.reasoningId && !state.reasoningDone) {
      closeReasoning(state, emit);
    }
    const msgIdx = state.reasoningId ? state.reasoningIndex + 1 : idx;
    closeMessage(state, emit, msgIdx);
    for (const tc of delta.tool_calls) {
      emitToolCall(state, emit, tc);
    }
  }

  // Handle finish_reason
  if (choice.finish_reason) {
    for (const i in state.msgItemAdded) closeMessage(state, emit, i);
    closeReasoning(state, emit);
    for (const i in state.funcCallIds) closeToolCall(state, emit, i);
    // #6906: usage already captured (same chunk or earlier) completes now; otherwise
    // defer for a trailing usage-only chunk, handled above and in flushEvents().
    if (state.usage) {
      sendCompleted(state, emit);
    } else {
      state.awaitingTrailingUsage = true;
    }
  }

  return events;
}

// Normalize output_index to a non-negative integer (replaces fragile parseInt calls)
// Record a finalized item keyed by output_index so buildDenseOutput can sort later
function recordCompletedItem(state, outputIndex, item) {
  if (!Array.isArray(state.completedOutputItems)) {
    state.completedOutputItems = [];
  }
  const normalized = normalizeOutputIndex(outputIndex);
  state.completedOutputItems.push({ output_index: normalized, item, seq: state.seq });
  return normalized;
}

// Build a dense, deterministic output array sorted by output_index then by seq
function buildDenseOutput(state) {
  const items = Array.isArray(state.completedOutputItems) ? state.completedOutputItems : [];
  return items
    .slice()
    .sort((left, right) => {
      if (left.output_index !== right.output_index) {
        return left.output_index - right.output_index;
      }
      return left.seq - right.seq;
    })
    .map(({ item }) => item);
}

// Helper functions
function startReasoning(state, emit, idx) {
  if (!state.reasoningId) {
    state.reasoningId = `rs_${state.responseId}_${idx}`;
    state.reasoningIndex = idx;

    emit("response.output_item.added", {
      type: "response.output_item.added",
      output_index: idx,
      item: { id: state.reasoningId, type: "reasoning", summary: [] },
    });

    emit("response.reasoning_summary_part.added", {
      type: "response.reasoning_summary_part.added",
      item_id: state.reasoningId,
      output_index: idx,
      summary_index: 0,
      part: { type: "summary_text", text: "" },
    });
    state.reasoningPartAdded = true;
  }
}

function emitReasoningDelta(state, emit, text) {
  if (!text) return;
  state.reasoningBuf += text;
  emit("response.reasoning_summary_text.delta", {
    type: "response.reasoning_summary_text.delta",
    item_id: state.reasoningId,
    output_index: state.reasoningIndex,
    summary_index: 0,
    delta: text,
  });
}

function closeReasoning(state, emit) {
  if (state.reasoningId && !state.reasoningDone) {
    state.reasoningDone = true;

    emit("response.reasoning_summary_text.done", {
      type: "response.reasoning_summary_text.done",
      item_id: state.reasoningId,
      output_index: state.reasoningIndex,
      summary_index: 0,
      text: state.reasoningBuf,
    });

    emit("response.reasoning_summary_part.done", {
      type: "response.reasoning_summary_part.done",
      item_id: state.reasoningId,
      output_index: state.reasoningIndex,
      summary_index: 0,
      part: { type: "summary_text", text: state.reasoningBuf },
    });

    const reasoningItem = {
      id: state.reasoningId,
      type: "reasoning",
      summary: [{ type: "summary_text", text: state.reasoningBuf }],
    };

    emit("response.output_item.done", {
      type: "response.output_item.done",
      output_index: state.reasoningIndex,
      item: reasoningItem,
    });

    recordCompletedItem(state, state.reasoningIndex, reasoningItem);
  }
}

function emitTextContent(state, emit, idx, content) {
  if (!state.msgItemAdded[idx]) {
    state.msgItemAdded[idx] = true;
    const msgId = `msg_${state.responseId}_${idx}`;

    emit("response.output_item.added", {
      type: "response.output_item.added",
      output_index: idx,
      item: { id: msgId, type: "message", content: [], role: "assistant" },
    });
  }

  if (!state.msgContentAdded[idx]) {
    state.msgContentAdded[idx] = true;

    emit("response.content_part.added", {
      type: "response.content_part.added",
      item_id: `msg_${state.responseId}_${idx}`,
      output_index: idx,
      content_index: 0,
      part: { type: "output_text", annotations: [], logprobs: [], text: "" },
    });
  }

  emit("response.output_text.delta", {
    type: "response.output_text.delta",
    item_id: `msg_${state.responseId}_${idx}`,
    output_index: idx,
    content_index: 0,
    delta: content,
    logprobs: [],
  });

  if (!state.msgTextBuf[idx]) state.msgTextBuf[idx] = "";
  state.msgTextBuf[idx] += content;
}

function closeMessage(state, emit, idx) {
  if (state.msgItemAdded[idx] && !state.msgItemDone[idx]) {
    state.msgItemDone[idx] = true;
    const fullText = state.msgTextBuf[idx] || "";
    const normalizedIndex = normalizeOutputIndex(idx);
    const msgId = `msg_${state.responseId}_${normalizedIndex}`;

    emit("response.output_text.done", {
      type: "response.output_text.done",
      item_id: msgId,
      output_index: normalizedIndex,
      content_index: 0,
      text: fullText,
      logprobs: [],
    });

    emit("response.content_part.done", {
      type: "response.content_part.done",
      item_id: msgId,
      output_index: normalizedIndex,
      content_index: 0,
      part: { type: "output_text", annotations: [], logprobs: [], text: fullText },
    });

    const msgItem = {
      id: msgId,
      type: "message",
      content: [{ type: "output_text", annotations: [], logprobs: [], text: fullText }],
      role: "assistant",
    };

    emit("response.output_item.done", {
      type: "response.output_item.done",
      output_index: normalizedIndex,
      item: msgItem,
    });

    recordCompletedItem(state, normalizedIndex, msgItem);
  }
}

function emitToolCall(state, emit, tc) {
  const tcIdx = tc.index ?? 0;
  const outputIndex = state.reasoningId
    ? normalizeOutputIndex(state.reasoningIndex) + 1 + normalizeOutputIndex(tcIdx)
    : normalizeOutputIndex(tcIdx);
  const newCallId = tc.id;
  const funcName = tc.function?.name;

  // T37: If we already have a tool call at this index but the ID changed,
  // we must close the current one and start a new one to prevent merging.
  if (state.funcCallIds[tcIdx] && newCallId && state.funcCallIds[tcIdx] !== newCallId) {
    // Superseded call: close and emit output_item.done but do NOT record as final output
    // since this call was replaced by a new one at the same index.
    closeToolCall(state, emit, tcIdx, false);
    delete state.funcCallIds[tcIdx];
    delete state.funcNames[tcIdx];
    delete state.funcArgsBuf[tcIdx];
    delete state.funcArgsDone[tcIdx];
    delete state.funcItemAdded[tcIdx];
    delete state.funcItemDone[tcIdx];
  }

  if (funcName) state.funcNames[tcIdx] = funcName;

  // Custom tools are surfaced as custom_tool_call items and stream raw input instead of the
  // function_call_arguments.* events used for regular function tools. (#1007)
  const toolName = state.funcNames[tcIdx] || funcName || "";
  const isCustomTool =
    toolName === "apply_patch" || state.customToolNames?.has?.(toolName) === true;

  if (!state.funcCallIds[tcIdx] && newCallId) state.funcCallIds[tcIdx] = newCallId;
  const callId = state.funcCallIds[tcIdx];

  if (callId && toolName && !state.funcItemAdded[tcIdx]) {
    // #7936 — restore the codex-side `{namespace, name}` pair when the bare
    // leaf on the Chat wire was flattened from a Responses namespace sub-tool.
    // Codex dispatches from `namespace` independently of `name` (no `__` split).
    const identity = resolveRequestToolIdentity(state.requestToolIdentityMap, toolName);
    emit("response.output_item.added", {
      type: "response.output_item.added",
      output_index: outputIndex,
      item: buildResponsesToolCallItem({
        callId,
        toolName: identity ? identity.name : toolName,
        custom: isCustomTool,
        namespace: identity ? identity.namespace : null,
      }),
    });
    state.funcItemAdded[tcIdx] = true;

    const bufferedArgs = state.funcArgsBuf[tcIdx] || "";
    if (bufferedArgs && !isCustomTool) {
      emit("response.function_call_arguments.delta", {
        type: "response.function_call_arguments.delta",
        item_id: `fc_${callId}`,
        output_index: outputIndex,
        delta: bufferedArgs,
      });
    }
  }

  if (!state.funcArgsBuf[tcIdx]) state.funcArgsBuf[tcIdx] = "";

  if (tc.function?.arguments) {
    const refCallId = state.funcCallIds[tcIdx] || newCallId;
    const existingArgs = state.funcArgsBuf[tcIdx] || "";
    const sanitized = escapeJsonStringValues(tc.function.arguments);
    const nextArgs = appendToolCallArgumentDelta(existingArgs, sanitized);
    const emittedDelta = nextArgs.slice(existingArgs.length);
    state.funcArgsBuf[tcIdx] = nextArgs;

    if (refCallId && emittedDelta && !isCustomTool && state.funcItemAdded[tcIdx]) {
      emit("response.function_call_arguments.delta", {
        type: "response.function_call_arguments.delta",
        item_id: `fc_${refCallId}`,
        output_index: outputIndex,
        delta: emittedDelta,
      });
    }
  }
}

function closeToolCall(state, emit, idx, recordAsCompleted = true) {
  const callId = state.funcCallIds[idx];
  if (callId && !state.funcItemDone[idx]) {
    const normalizedIndex = state.reasoningId
      ? normalizeOutputIndex(state.reasoningIndex) + 1 + normalizeOutputIndex(idx)
      : normalizeOutputIndex(idx);
    const args = state.funcArgsBuf[idx] || "{}";
    const toolName = state.funcNames[idx] || "";
    const isCustomTool =
      toolName === "apply_patch" || state.customToolNames?.has?.(toolName) === true;

    let funcItem;
    if (isCustomTool) {
      // The model produced JSON {"input":"..."} against the normalized custom-tool schema.
      // Unwrap it back to the raw patch string the Codex runtime expects. (#1007)
      let rawInput = args;
      try {
        const parsed = JSON.parse(args);
        if (parsed && typeof parsed.input === "string") rawInput = parsed.input;
      } catch {
        // Not JSON — fall back to the raw buffered arguments.
      }

      emit("response.custom_tool_call_input.delta", {
        type: "response.custom_tool_call_input.delta",
        item_id: `fc_${callId}`,
        output_index: normalizedIndex,
        delta: rawInput,
      });

      emit("response.custom_tool_call_input.done", {
        type: "response.custom_tool_call_input.done",
        item_id: `fc_${callId}`,
        output_index: normalizedIndex,
        input: rawInput,
      });

      funcItem = {
        id: `fc_${callId}`,
        type: "custom_tool_call",
        input: rawInput,
        call_id: callId,
        name: state.funcNames[idx] || "",
        status: "completed",
      };

      // #7936 identity closure for custom_tool_call items (apply_patch stays
      // bare; namespace sub-tools get back their `namespace` + `name`).
      const customIdentity = resolveRequestToolIdentity(
        state.requestToolIdentityMap,
        state.funcNames[idx] || ""
      );
      if (customIdentity) {
        funcItem.namespace = customIdentity.namespace;
        funcItem.name = customIdentity.name;
      }

      emit("response.output_item.done", {
        type: "response.output_item.done",
        output_index: normalizedIndex,
        item: funcItem,
      });
    } else {
      emit("response.function_call_arguments.done", {
        type: "response.function_call_arguments.done",
        item_id: `fc_${callId}`,
        output_index: normalizedIndex,
        arguments: args,
      });

      funcItem = {
        id: `fc_${callId}`,
        type: "function_call",
        arguments: args,
        call_id: callId,
        name: state.funcNames[idx] || "",
        status: "completed",
      };

      // #7936 identity closure: rewrite the function_call item's `name` back to
      // its bare leaf and stamp the original `namespace` alongside it, matching
      // the codex ResponseItem::FunctionCall schema (independent `namespace`
      // field, NOT a `__` split on `name`).
      const fnIdentity = resolveRequestToolIdentity(
        state.requestToolIdentityMap,
        state.funcNames[idx] || ""
      );
      if (fnIdentity) {
        funcItem.namespace = fnIdentity.namespace;
        funcItem.name = fnIdentity.name;
      }

      emit("response.output_item.done", {
        type: "response.output_item.done",
        output_index: normalizedIndex,
        item: funcItem,
      });
    }

    // Only record as a completed output item when this is a final close (not a
    // superseded-call eviction where a new call replaced this one at the same index).
    if (recordAsCompleted) {
      recordCompletedItem(state, normalizedIndex, funcItem);
    }

    state.funcItemDone[idx] = true;
    state.funcArgsDone[idx] = true;
  }
}

function sendCompleted(state, emit) {
  if (!state.completedSent) {
    state.completedSent = true;

    // Build a dense, deterministic output array from items recorded as they were emitted
    // (each close*() call records its item via recordCompletedItem — including the
    // #1007 custom_tool_call shape for apply_patch). Sorted by output_index then by
    // emission sequence for stable ordering.
    const output = buildDenseOutput(state);

    // Surface upstream mid-stream errors (e.g. Gemini 503) in the
    // Responses-API `response.completed` event instead of silently emitting
    // `status: "completed"`. The error is set by the Gemini-to-OpenAI
    // translator or the OpenAI-Responses translator itself when the upstream
    // SSE stream emits a JSON error object after partial content.
    const upstreamErr = state.upstreamError;

    const response: Record<string, unknown> = {
      id: state.responseId,
      object: "response",
      created_at: state.created,
      status: upstreamErr ? "failed" : "completed",
      background: false,
      error: upstreamErr
        ? { code: String(upstreamErr.status ?? ""), message: upstreamErr.message ?? "" }
        : null,
      output,
    };

    // #3697: same model echo as response.created/in_progress above.
    if (state.model) {
      response.model = state.model;
    }

    if (state.usage) {
      response.usage = state.usage;
    }

    emit("response.completed", {
      type: "response.completed",
      response,
    });
  }
}

function flushEvents(state) {
  if (state.completedSent) return [];

  const { events, emit } = createEventEmitter(state);

  for (const i in state.msgItemAdded) closeMessage(state, emit, i);
  closeReasoning(state, emit);
  for (const i in state.funcCallIds) closeToolCall(state, emit, i);
  sendCompleted(state, emit);

  return events;
}

// #5786 — remember that a reasoning delta was streamed for a given reasoning item, so
// the terminal `response.output_item.done` snapshot for that item is NOT re-emitted
// (which would duplicate the reasoning channel). Keyed by item_id when present, with a
// global fallback for streams whose deltas carry no item_id.
function markResponsesReasoningDeltaEmitted(state, itemId) {
  state.reasoningDeltaEmitted = true;
  const id = itemId != null ? String(itemId) : "";
  if (!id) return;
  if (!(state.reasoningItemsWithDelta instanceof Set)) {
    state.reasoningItemsWithDelta = new Set();
  }
  state.reasoningItemsWithDelta.add(id);
}

// #5786 — build a Chat-format reasoning delta chunk in the shape the client renders in
// its thinking panel (`reasoning_content`, or `reasoning_text` for Copilot-compatible
// clients). Mirrors the `response.reasoning_summary_text.delta` branch.
function buildResponsesReasoningDeltaChunk(state, text) {
  if (isInternalReasoningPlaceholder(text)) return null;
  const delta = state.copilotCompatibleReasoning
    ? { reasoning_text: text }
    : { reasoning_content: text };
  return {
    id: state.chatId,
    object: "chat.completion.chunk",
    created: state.created,
    model: state.model || "gpt-4",
    choices: [
      {
        index: 0,
        delta,
        finish_reason: null,
      },
    ],
  };
}

/**
 * Translate OpenAI Responses API chunk to OpenAI Chat Completions format
 * This is for when Codex returns data and we need to send it to an OpenAI-compatible client
 */
export function openaiResponsesToOpenAIResponse(chunk, state) {
  return withAssistantRoleOnFirstDelta(state, openaiResponsesToOpenAIResponseStream(chunk, state));
}

function openaiResponsesToOpenAIResponseStream(chunk, state) {
  if (!chunk) {
    // Flush: send final chunk with finish_reason
    if (!state.finishReasonSent && state.started) {
      state.finishReasonSent = true;
      const finishReason = computeFinishReason(state);
      return {
        id: state.chatId || `chatcmpl-${Date.now()}`,
        object: "chat.completion.chunk",
        created: state.created || Math.floor(Date.now() / 1000),
        model: state.model || "gpt-4",
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: finishReason,
          },
        ],
      };
    }
    return null;
  }

  // Handle different event types from Responses API
  const eventType = chunk.type || chunk.event;
  const data = chunk.data || chunk;

  if (!state.model) {
    const upstreamModel =
      (data?.response && typeof data.response === "object" && data.response.model) ||
      data?.model ||
      data?.modelVersion ||
      data?.model_version ||
      null;

    if (typeof upstreamModel === "string" && upstreamModel.trim().length > 0) {
      state.model = upstreamModel.trim();
    }
  }

  // Initialize state
  if (!state.started) {
    state.started = true;
    state.chatId = `chatcmpl-${Date.now()}`;
    state.created = Math.floor(Date.now() / 1000);
    state.toolCallIndex = 0;
    state.currentToolCallId = null;
  }

  // Text content delta
  if (eventType === "response.output_text.delta") {
    const delta = data.delta || "";
    if (!delta) return null;

    return {
      id: state.chatId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "gpt-4",
      choices: [
        {
          index: 0,
          delta: { content: delta },
          finish_reason: null,
        },
      ],
    };
  }

  // Text content done (ignore, we handle via delta)
  if (eventType === "response.output_text.done") {
    return null;
  }

  // Function call started
  if (eventType === "response.output_item.added" && data.item?.type === "function_call") {
    const item = data.item;
    state.currentToolCallId = item.call_id || fallbackToolCallId();
    state.currentToolCallArgsBuffer = ""; // reset per-call arg buffer
    state.currentToolCallDeferred = false;

    // Track this call_id so response.completed doesn't synthesize a duplicate
    if (!state.toolCallIdsSeen) state.toolCallIdsSeen = new Set();
    if (state.currentToolCallId) state.toolCallIdsSeen.add(state.currentToolCallId);

    const toolName = normalizeToolName(item.name);
    if (!toolName) {
      // Some Responses providers briefly emit placeholder/empty tool names.
      // Defer emission until output_item.done in case the final name is populated there.
      state.currentToolCallDeferred = true;
      return null;
    }

    return {
      id: state.chatId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: state.toolCallIndex,
                id: state.currentToolCallId,
                type: "function",
                function: {
                  name: toolName,
                  arguments: "",
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    };
  }

  // Function call arguments delta
  // NOTE: Do NOT include `id` or `type` here - only first chunk (response.output_item.added)
  // should have them. Including `id` on every chunk causes openai-to-claude.ts to emit
  // a new content_block_start for each delta, breaking Claude Code ACP sessions.
  if (eventType === "response.function_call_arguments.delta") {
    const argsDelta = data.delta || "";
    if (!argsDelta) return null;

    state.currentToolCallArgsBuffer = (state.currentToolCallArgsBuffer || "") + argsDelta;
    if (state.currentToolCallDeferred) return null;

    return {
      id: state.chatId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: state.toolCallIndex,
                function: { arguments: argsDelta },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    };
  }

  // Function call done — emit args chunk from item.arguments when no deltas were received,
  // then advance the tool-call index. This handles Codex Responses API payloads that
  // carry the complete arguments only in output_item.done (no preceding delta events).
  if (eventType === "response.output_item.done" && data.item?.type === "function_call") {
    const item = data.item;
    const buffered = state.currentToolCallArgsBuffer || "";
    const currentIndex = state.toolCallIndex; // capture before increment
    const callId = item.call_id || state.currentToolCallId || fallbackToolCallId();
    const toolName = normalizeToolName(item.name);
    const toolSchema = state.toolSchemas?.get(toolName);

    // Track this call_id so response.completed doesn't synthesize a duplicate
    if (!state.toolCallIdsSeen) state.toolCallIdsSeen = new Set();
    if (callId) state.toolCallIdsSeen.add(callId);

    if (state.currentToolCallDeferred) {
      state.currentToolCallDeferred = false;
      state.currentToolCallArgsBuffer = "";
      state.currentToolCallId = null;

      if (!toolName) {
        return null;
      }

      state.toolCallIndex++;

      const argsToEmit = stripEmptyOptionalToolArgs(item.arguments, toolName, toolSchema);

      const argsStr =
        argsToEmit != null
          ? typeof argsToEmit === "string"
            ? argsToEmit
            : JSON.stringify(argsToEmit)
          : buffered;

      return {
        id: state.chatId,
        object: "chat.completion.chunk",
        created: state.created,
        model: state.model || "gpt-4",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: currentIndex,
                  id: callId,
                  type: "function",
                  function: {
                    name: toolName,
                    arguments: argsStr || "",
                  },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      };
    }

    state.toolCallIndex++;
    state.currentToolCallArgsBuffer = ""; // reset for next tool call
    state.currentToolCallId = null;

    // Only emit if arguments exist in the done event AND they weren't already streamed via deltas
    if (item.arguments != null && !buffered) {
      const argsToEmit = stripEmptyOptionalToolArgs(item.arguments, toolName, toolSchema);

      const argsStr = typeof argsToEmit === "string" ? argsToEmit : JSON.stringify(argsToEmit);
      if (argsStr) {
        return {
          id: state.chatId,
          object: "chat.completion.chunk",
          created: state.created,
          model: state.model || "gpt-4",
          choices: [
            {
              index: 0,
              delta: {
                tool_calls: [
                  {
                    index: currentIndex,
                    function: { arguments: argsStr },
                  },
                ],
              },
              finish_reason: null,
            },
          ],
        };
      }
    }

    return null;
  }

  // Response completed
  if (eventType === "response.completed") {
    // Extract usage from response.completed event
    const responseUsage = data.response?.usage;
    if (responseUsage && typeof responseUsage === "object") {
      const inputTokens = responseUsage.input_tokens || responseUsage.prompt_tokens || 0;
      const outputTokens = responseUsage.output_tokens || responseUsage.completion_tokens || 0;
      const cacheReadTokens =
        responseUsage.cache_read_input_tokens ||
        responseUsage.input_tokens_details?.cached_tokens ||
        responseUsage.prompt_tokens_details?.cached_tokens ||
        0;
      const cacheCreationTokens = responseUsage.cache_creation_input_tokens || 0;
      const reasoningTokens =
        responseUsage.output_tokens_details?.reasoning_tokens ||
        responseUsage.completion_tokens_details?.reasoning_tokens ||
        responseUsage.reasoning_tokens ||
        0;

      // prompt_tokens = input_tokens + cache_read + cache_creation (all prompt-side tokens)
      const promptTokens = inputTokens + cacheReadTokens + cacheCreationTokens;

      state.usage = {
        prompt_tokens: promptTokens,
        completion_tokens: outputTokens,
        total_tokens: promptTokens + outputTokens,
      };

      // Add prompt_tokens_details if cache tokens exist
      if (cacheReadTokens > 0 || cacheCreationTokens > 0) {
        state.usage.prompt_tokens_details = {};
        if (cacheReadTokens > 0) {
          state.usage.prompt_tokens_details.cached_tokens = cacheReadTokens;
        }
        if (cacheCreationTokens > 0) {
          state.usage.prompt_tokens_details.cache_creation_tokens = cacheCreationTokens;
        }
      }

      // Add completion_tokens_details if reasoning tokens exist
      if (reasoningTokens > 0) {
        state.usage.completion_tokens_details = {
          reasoning_tokens: reasoningTokens,
        };
      }
    }

    // #fix: synthesize tool call chunks from response.completed output[] for
    // providers that batch everything into response.completed without prior
    // incremental output_item.* events — including the dedup guard against
    // providers that DO stream incrementally and also echo the same
    // function_call items here. See synthesizeCompletedToolCalls's own
    // doc-comment for the full rationale.
    const synthesized = synthesizeCompletedToolCalls(state, data.response?.output);
    if (synthesized) return synthesized;

    if (!state.finishReasonSent) {
      state.finishReasonSent = true;
      const reason = computeFinishReason(state);
      state.finishReason = reason; // Mark for usage injection in stream.js

      const finalChunk: Record<string, unknown> = {
        id: state.chatId,
        object: "chat.completion.chunk",
        created: state.created,
        model: state.model || "gpt-4",
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: reason,
          },
        ],
      };

      // Include usage in final chunk if available
      if (state.usage && typeof state.usage === "object") {
        finalChunk.usage = state.usage;
      }

      return finalChunk;
    }
    return null;
  }

  if (eventType === "response.failed" || eventType === "error") {
    state.upstreamError = normalizeUpstreamFailure(data);
    state.finishReasonSent = true;
    return null;
  }

  // Reasoning events — emit as reasoning_content in Chat format
  if (
    eventType === "response.reasoning_content_text.delta" ||
    eventType === "response.reasoning_text.delta"
  ) {
    const reasoningDelta = data.delta || "";
    if (!reasoningDelta) return null;
    markResponsesReasoningDeltaEmitted(state, data.item_id);
    return {
      id: state.chatId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "gpt-4",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: reasoningDelta },
          finish_reason: null,
        },
      ],
    };
  }

  // Handle true reasoning summary ("Thought for 15s").
  // Emit as `delta.reasoning_content` — matches the shape used by the
  // `reasoning_content_text.delta` branch above and is what Chat clients
  // (OpenCode, Claude Code, Cursor, etc.) actually render in their thinking
  // panel. A nested `delta.reasoning.summary` object is swallowed by most
  // stream mergers and never reaches the user.
  if (eventType === "response.reasoning_summary_text.delta") {
    const reasoningDelta = data.delta || "";
    if (!reasoningDelta) return null;
    markResponsesReasoningDeltaEmitted(state, data.item_id);
    return buildResponsesReasoningDeltaChunk(state, reasoningDelta);
  }

  // #5786 — reasoning summary exposed ONLY as a terminal snapshot on
  // `response.output_item.done` (no preceding reasoning_summary_text.delta events — e.g.
  // Codex reasoning models that surface the summary once at item close). Without this the
  // reasoning channel is silently dropped and never reaches the client's thinking panel.
  // Only synthesize when NO reasoning delta was already streamed for this item, so normal
  // delta streams are never duplicated.
  if (eventType === "response.output_item.done" && data.item?.type === "reasoning") {
    const item = data.item;
    const itemId = item.id != null ? String(item.id) : "";
    const emittedForItem =
      state.reasoningItemsWithDelta instanceof Set &&
      itemId &&
      state.reasoningItemsWithDelta.has(itemId);
    // Deltas were streamed but carried no item_id: fall back to the global flag and
    // suppress synthesis to avoid duplicating that same reasoning text.
    const emittedWithoutItemId =
      state.reasoningDeltaEmitted &&
      !(state.reasoningItemsWithDelta instanceof Set && state.reasoningItemsWithDelta.size > 0);
    if (emittedForItem || emittedWithoutItemId) return null;

    // #7095/#7176 reconciliation: computed WITHOUT mutating `item`, so an
    // encrypted-only reasoning item (and its `encrypted_content`) is never
    // rewritten with a fabricated `summary` — the placeholder only feeds this
    // synthetic client-facing delta chunk.
    const summaryText = getVisibleResponsesReasoningSummaryText(item);
    if (!summaryText) return null;
    return buildResponsesReasoningDeltaChunk(state, summaryText);
  }

  // Ignore other events
  return null;
}

// Register both directions
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, null, openaiToOpenAIResponsesResponse);
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, null, openaiResponsesToOpenAIResponse);
