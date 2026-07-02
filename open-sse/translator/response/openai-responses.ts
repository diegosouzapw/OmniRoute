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
  normalizeToolName,
  stripEmptyOptionalToolArgs,
  normalizeOutputIndex,
  normalizeUpstreamFailure,
  extractResponsesReasoningSummaryText,
} from "./openai-responses/pureHelpers.ts";

// normalizeUpstreamFailure is re-exported for external importers (tests).
export { normalizeUpstreamFailure } from "./openai-responses/pureHelpers.ts";

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
    return [];
  }

  const events = [];
  const nextSeq = () => ++state.seq;

  const emit = (eventType, data) => {
    data.sequence_number = nextSeq();
    events.push({ event: eventType, data });
  };

  const choice = chunk.choices[0];
  const idx = choice.index || 0;
  const delta = choice.delta || {};
  if (state.parseTextualReasoningTags !== true && typeof chunk.model === "string") {
    state.parseTextualReasoningTags = shouldParseTextualReasoningTags(undefined, chunk.model);
  }
  const parseTextualReasoningTags = state.parseTextualReasoningTags === true;

  // Emit initial events
  if (!state.started) {
    state.started = true;
    state.responseId = chunk.id ? `resp_${chunk.id}` : state.responseId;

    emit("response.created", {
      type: "response.created",
      response: {
        id: state.responseId,
        object: "response",
        created_at: state.created,
        status: "in_progress",
        background: false,
        error: null,
        output: [],
      },
    });

    emit("response.in_progress", {
      type: "response.in_progress",
      response: {
        id: state.responseId,
        object: "response",
        created_at: state.created,
        status: "in_progress",
      },
    });
  }

  if (delta.reasoning_content) {
    startReasoning(state, emit, idx);
    emitReasoningDelta(state, emit, delta.reasoning_content);
  }
  if (delta.content) {
    if (
      state.reasoningId &&
      !state.reasoningDone &&
      (!parseTextualReasoningTags || !state.inThinking)
    ) {
      closeReasoning(state, emit);
    }

    let content = delta.content;

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
        return events;
      }
    }

    if (content) {
      const msgIdx = state.reasoningId ? state.reasoningIndex + 1 : idx;
      emitTextContent(state, emit, msgIdx, content);
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
    sendCompleted(state, emit);
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
    delete state.funcItemDone[tcIdx];
  }

  if (funcName) state.funcNames[tcIdx] = funcName;

  // Codex custom tools (apply_patch) are surfaced to the client as custom_tool_call items
  // and stream their raw patch via custom_tool_call_input.* events instead of the
  // function_call_arguments.* events used for regular function tools. (#1007)
  const isCustomTool = (state.funcNames[tcIdx] || funcName) === "apply_patch";

  if (!state.funcCallIds[tcIdx] && newCallId) {
    state.funcCallIds[tcIdx] = newCallId;

    emit("response.output_item.added", {
      type: "response.output_item.added",
      output_index: tcIdx,
      item: isCustomTool
        ? {
            id: `fc_${newCallId}`,
            type: "custom_tool_call",
            input: "",
            call_id: newCallId,
            name: state.funcNames[tcIdx] || "",
          }
        : {
            id: `fc_${newCallId}`,
            type: "function_call",
            arguments: "",
            call_id: newCallId,
            name: state.funcNames[tcIdx] || "",
          },
    });
  }

  if (!state.funcArgsBuf[tcIdx]) state.funcArgsBuf[tcIdx] = "";

  if (tc.function?.arguments) {
    const refCallId = state.funcCallIds[tcIdx] || newCallId;
    const existingArgs = state.funcArgsBuf[tcIdx] || "";
    const nextArgs = appendToolCallArgumentDelta(existingArgs, tc.function.arguments);
    const emittedDelta = nextArgs.slice(existingArgs.length);
    state.funcArgsBuf[tcIdx] = nextArgs;

    if (refCallId && emittedDelta) {
      const deltaEvent = isCustomTool
        ? "response.custom_tool_call_input.delta"
        : "response.function_call_arguments.delta";
      emit(deltaEvent, {
        type: deltaEvent,
        item_id: `fc_${refCallId}`,
        output_index: tcIdx,
        delta: emittedDelta,
      });
    }
  }
}

function closeToolCall(state, emit, idx, recordAsCompleted = true) {
  const callId = state.funcCallIds[idx];
  if (callId && !state.funcItemDone[idx]) {
    const normalizedIndex = normalizeOutputIndex(idx);
    const args = state.funcArgsBuf[idx] || "{}";
    const isCustomTool = (state.funcNames[idx] || "") === "apply_patch";

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
      };

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
      };

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

    const response: Record<string, unknown> = {
      id: state.responseId,
      object: "response",
      created_at: state.created,
      status: "completed",
      background: false,
      error: null,
      output,
    };

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

  const events = [];
  const nextSeq = () => ++state.seq;
  const emit = (eventType, data) => {
    data.sequence_number = nextSeq();
    events.push({ event: eventType, data });
  };

  for (const i in state.msgItemAdded) closeMessage(state, emit, i);
  closeReasoning(state, emit);
  for (const i in state.funcCallIds) closeToolCall(state, emit, i);
  sendCompleted(state, emit);

  return events;
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
function withAssistantRoleOnFirstDelta(state, result) {
  if (!result || state.roleEmitted) return result;
  const delta = result.choices?.[0]?.delta;
  if (delta && typeof delta === "object" && !Array.isArray(delta)) {
    delta.role = "assistant";
    state.roleEmitted = true;
  }
  return result;
}

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
 */
function computeFinishReason(state): "tool_calls" | "stop" {
  return (state.toolCallIndex || 0) > 0 || state.currentToolCallId ? "tool_calls" : "stop";
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

    if (state.currentToolCallDeferred) {
      state.currentToolCallDeferred = false;
      state.currentToolCallArgsBuffer = "";
      state.currentToolCallId = null;

      if (!toolName) {
        return null;
      }

      state.toolCallIndex++;

      const argsToEmit = stripEmptyOptionalToolArgs(item.arguments, toolName);

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
      const argsToEmit = stripEmptyOptionalToolArgs(item.arguments, toolName);

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

    const summaryText = extractResponsesReasoningSummaryText(item);
    if (!summaryText) return null;
    return buildResponsesReasoningDeltaChunk(state, summaryText);
  }

  // Ignore other events
  return null;
}

// Register both directions
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, null, openaiToOpenAIResponsesResponse);
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, null, openaiResponsesToOpenAIResponse);
