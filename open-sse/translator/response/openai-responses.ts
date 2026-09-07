/**
 * Translator: OpenAI Chat Completions → OpenAI Responses API (response)
 * Converts streaming chunks from Chat Completions to Responses API events
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { appendToolCallArgumentDelta } from "../../utils/toolCallArguments.ts";
import { projectCompletedStreamError } from "../../utils/streamErrorFormat.ts";
import { fallbackToolCallId } from "../helpers/toolCallHelper.ts";
import { shouldParseTextualReasoningTags } from "../../handlers/responseSanitizer.ts";
import { getReadableReasoningValue } from "../../utils/reasoningFields.ts";
import {
  isInternalReasoningPlaceholder,
  stripInternalReasoningPlaceholder,
} from "../../utils/reasoningPlaceholder.ts";
import { extractReplayableResponsesReasoningText } from "../../services/reasoningInputPolicy.ts";
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
import { resolveLocalToolCallIndex } from "./openai-responses/toolCallLocalIndex.ts";
import {
  synthesizeCompletedToolCalls,
  computeFinishReason,
  withAssistantRoleOnFirstDelta,
} from "./openai-responses/synthesizeCompletedToolCalls.ts";
// normalizeUpstreamFailure is re-exported for external importers (tests).
export { normalizeUpstreamFailure } from "./openai-responses/pureHelpers.ts";

/** Carries escapeJsonStringValues's scan state (whether we're inside a JSON
 * string, and whether the fragment ended mid-escape-sequence) across calls
 * for the SAME tool call — see escapeJsonStringValues's own doc comment for
 * why this must persist across chunks rather than reset per call. */
interface JsonStringEscapeState {
  inString: boolean;
  pendingEscape: boolean;
}

function createJsonStringEscapeState(): JsonStringEscapeState {
  return { inString: false, pendingEscape: false };
}

/**
 * Escape control characters (newlines, tabs, carriage returns) that appear
 * inside JSON string values, ensuring the resulting string is valid JSON.
 * This handles upstream providers (e.g. Gemini/Gemma) that emit literal
 * newlines (0x0A) instead of \n escapes inside tool call argument JSON.
 * Only escapes characters inside string contexts to avoid double-escaping
 * already-proper JSON or corrupting structural newlines.
 *
 * `arguments` deltas arrive as arbitrary fragments of one continuous JSON
 * string (OpenAI's Chat Completions streaming contract only guarantees each
 * `tool_calls[].function.arguments` delta is the next slice, not that it
 * starts/ends on a quote or escape boundary) — a large multi-line argument
 * value routinely gets split mid-string. `escapeState` must therefore be the
 * SAME object passed in on every call for a given tool call index, not a
 * fresh `{inString: false}` each time: resetting per call made the
 * in-string/out-of-string decision (and therefore whether a raw newline
 * gets escaped) depend on where a chunk boundary happened to fall, which
 * produced a real, reported bug — a single reassembled arguments string
 * with a mix of real newlines and literal two-character `\n` sequences,
 * breaking generated code (e.g. Python) that embeds multi-line content.
 */
function escapeJsonStringValues(json: string, escapeState: JsonStringEscapeState): string {
  let result = "";
  let { inString, pendingEscape } = escapeState;

  for (let i = 0; i < json.length; i++) {
    const ch = json[i];

    // This char is the one immediately following a backslash from a
    // previous iteration (possibly in a prior fragment) — it's already
    // "consumed" by that escape sequence, pass it through untouched.
    if (pendingEscape) {
      result += ch;
      pendingEscape = false;
      continue;
    }

    // Inside a string, an unescaped backslash starts an escape sequence —
    // the char AFTER it (next iteration, possibly in the next fragment)
    // must not be reinterpreted as a quote/control-char in its own right.
    if (inString && ch === "\\") {
      result += ch;
      pendingEscape = true;
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

  escapeState.inString = inString;
  escapeState.pendingEscape = pendingEscape;
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

  // Normalize usage from any chunk so response.completed has Responses token fields.
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

  const reasoning = getReadableReasoningValue(delta);
  if (reasoning && !isInternalReasoningPlaceholder(reasoning)) {
    startReasoning(state, emit, idx);
    emitReasoningDelta(state, emit, reasoning);
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

// Tool calls sit after reasoning (if any) AND after a text message (if one was
// actually emitted this turn) — a model commonly emits a short preamble before
// calling a tool (e.g. "Kör nu, på riktigt — apply_patch..."), and that message
// claims the same reasoningIndex+1 slot the old per-call math (`reasoningIndex
// + 1 + tcIdx`) assumed was free for tcIdx=0. Not accounting for the message
// item collided the tool call's added/delta/done events onto the same
// output_index as the just-closed message, which a client keying per-item
// state by output_index can silently drop (live incident 2026-08-08).
function toolCallOutputIndexBase(state) {
  const msgIdx = state.reasoningId ? normalizeOutputIndex(state.reasoningIndex) + 1 : 0;
  return state.msgItemAdded[msgIdx] ? msgIdx + 1 : msgIdx;
}

function emitToolCall(state, emit, tc) {
  const tcIdx = tc.index ?? 0;
  const outputIndex = toolCallOutputIndexBase(state) + resolveLocalToolCallIndex(state, tcIdx);
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
    delete state.funcArgsEscapeState?.[tcIdx];
  }

  if (funcName) state.funcNames[tcIdx] = funcName;

  // Custom tools are surfaced as custom_tool_call items and stream raw input instead of the
  // function_call_arguments.* events used for regular function tools. (#1007)
  //
  // apply_patch defaults to custom (native Codex CLI convention: the model emits it
  // without the client ever declaring it as a tool) UNLESS the client's own request
  // explicitly declared it with a `parameters` JSON schema — i.e. as a plain
  // `type:"function"` tool (state.toolSchemas, populated from body.tools by
  // extractToolSchemaMap()). Live incident: a client that registers apply_patch as a
  // function tool and only implements function_call dispatch never recognized the
  // custom_tool_call item this produced, so the tool call was silently never executed
  // and no follow-up request ever carried a result back. PR #7905 already intended this
  // precedence ("...while preserving explicit function-tool precedence") but its
  // unconditional `toolName === "apply_patch"` OR never actually implemented the carve-out.
  const toolName = state.funcNames[tcIdx] || funcName || "";
  const lowerName = toolName.toLowerCase();
  const isCustomTool =
    ((lowerName === "apply_patch" || lowerName === "applypatch") &&
      !state.toolSchemas?.has?.(toolName)) ||
    state.customToolNames?.has?.(toolName) === true;

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
    if (!state.funcArgsEscapeState) state.funcArgsEscapeState = {};
    if (!state.funcArgsEscapeState[tcIdx]) {
      state.funcArgsEscapeState[tcIdx] = createJsonStringEscapeState();
    }
    const sanitized = escapeJsonStringValues(
      tc.function.arguments,
      state.funcArgsEscapeState[tcIdx]
    );
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
    const normalizedIndex = toolCallOutputIndexBase(state) + resolveLocalToolCallIndex(state, idx);
    const args = state.funcArgsBuf[idx] || "{}";
    const toolName = state.funcNames[idx] || "";
    // See emitToolCall()'s isCustomTool comment — must stay in sync (both compute the
    // same classification independently for their respective add/close call sites).
    const lowerName = toolName.toLowerCase();
    const isCustomTool =
      ((lowerName === "apply_patch" || lowerName === "applypatch") &&
        !state.toolSchemas?.has?.(toolName)) ||
      state.customToolNames?.has?.(toolName) === true;

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
      // Mirror into the shared state.toolCalls map (populated by the other response
      // translators) so stream.ts's completion-log summary reports finish_reason
      // "tool_calls" and message.tool_calls instead of "stop" with no tool calls.
      if (state.toolCalls instanceof Map) {
        state.toolCalls.set(idx, {
          id: callId,
          index: normalizedIndex,
          type: isCustomTool ? "custom_tool_call" : "function",
          function: { name: funcItem.name, arguments: args },
        });
      }
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
    const publicUpstreamError = projectCompletedStreamError(upstreamErr);

    const response: Record<string, unknown> = {
      id: state.responseId,
      object: "response",
      created_at: state.created,
      status: upstreamErr ? "failed" : "completed",
      background: false,
      error: publicUpstreamError,
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

// #9500 — streaming separator helper. When summary_index increments mid-stream
// for a given item_id, a new reasoning segment begins; prefix "\n\n" so segments
// don't arrive back-to-back. Only prefixes when a delta was already emitted for
// the item AND the index advanced — never on the first segment. Lives here (not
// in pureHelpers.ts) because it reads and mutates stream state, which the pure
// leaf must not hold.
function buildResponsesReasoningSummaryDelta(state, data, reasoningDelta) {
  const itemId = data.item_id != null ? String(data.item_id) : "";
  const summaryIndex = typeof data.summary_index === "number" ? data.summary_index : null;
  if (!(state.reasoningSummaryIndex instanceof Map)) {
    state.reasoningSummaryIndex = new Map();
  }
  const lastIndex = itemId ? state.reasoningSummaryIndex.get(itemId) : undefined;
  const alreadyEmittedForItem = itemId
    ? state.reasoningItemsWithDelta instanceof Set && state.reasoningItemsWithDelta.has(itemId)
    : Boolean(state.reasoningDeltaEmitted);
  let deltaText = reasoningDelta;
  if (
    summaryIndex !== null &&
    lastIndex !== undefined &&
    summaryIndex > lastIndex &&
    alreadyEmittedForItem
  ) {
    deltaText = `\n\n${reasoningDelta}`;
  }
  if (itemId && (lastIndex === undefined || summaryIndex > lastIndex)) {
    state.reasoningSummaryIndex.set(itemId, summaryIndex);
  }
  return deltaText;
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
    // Iterate every still-open call with a buffered argument payload — argument
    // deltas are buffered for every tool, so an incomplete stream must flush every
    // buffered call, not only the historical uppercase Agent path.
    const pendingNormalized: Array<{ index: number; argsStr: string }> = [];
    if (state.toolCallByCallId instanceof Map) {
      for (const entry of state.toolCallByCallId.values()) {
        if (entry.argsBuffer) {
          const toolSchema = state.toolSchemas?.get(entry.name);
          const argsToEmit = stripEmptyOptionalToolArgs(entry.argsBuffer, entry.name, toolSchema);
          pendingNormalized.push({
            index: entry.index,
            argsStr: typeof argsToEmit === "string" ? argsToEmit : JSON.stringify(argsToEmit ?? {}),
          });
          entry.argsBuffer = "";
          entry.needsNormalization = false;
        }
      }
    }
    if (pendingNormalized.length > 0) {
      state.finishReasonSent = true;
      state.finishReason = "tool_calls";
      const common = {
        id: state.chatId,
        object: "chat.completion.chunk",
        created: state.created,
        model: state.model || "gpt-4",
      };
      const chunks: Record<string, unknown>[] = pendingNormalized.map(({ index, argsStr }) => ({
        ...common,
        choices: [
          {
            index: 0,
            delta: { tool_calls: [{ index, function: { arguments: argsStr } }] },
            finish_reason: null,
          },
        ],
      }));
      chunks.push({
        ...common,
        choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      });
      return chunks;
    }
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
    // Kept for computeFinishReason (synthesizeCompletedToolCalls.ts) compatibility —
    // that snapshot path mutates it directly and expects it to exist. In a turn with
    // multiple parallel calls this only ever reflects the LAST one opened/closed, so
    // it must never be used to identify a specific call — only as the "is at least
    // one tool call in flight this turn" signal computeFinishReason needs, which
    // toolCallIndex > 0 already covers on its own once any call has been added.
    state.currentToolCallId = null;
    // Per-call state keyed by call_id (replaces the old singular
    // currentToolCallId/ArgsBuffer/Name/NeedsNormalization/Deferred fields, which
    // assumed only one function_call could ever be in flight at a time).
    state.toolCallByCallId = new Map();
    // response.function_call_arguments.delta carries `item_id`/`output_index`, not
    // `call_id` — resolve either one back to the call_id key used by
    // toolCallByCallId (two independent reverse maps, since some upstreams omit
    // item_id on delta events but still send output_index).
    state.toolCallItemToCallId = new Map();
    state.toolCallOutputIndexToCallId = new Map();
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
    const callId = item.call_id || fallbackToolCallId();
    // Kept for computeFinishReason (synthesizeCompletedToolCalls.ts) compatibility.
    state.currentToolCallId = callId;

    const toolName = normalizeToolName(item.name);
    // Assign this call's index NOW, at .added, not at .done — two calls opened before
    // either closes (a genuine parallel dispatch) must never share an index. Deferred
    // (still-nameless) calls are the one exception: they don't claim an index until
    // .done resolves a real name, so a call that never gets one never burns a slot
    // another call could have used.
    let index: number | null = null;
    if (toolName) {
      index = state.toolCallIndex ?? 0;
      state.toolCallIndex = index + 1;
    }

    if (!(state.toolCallByCallId instanceof Map)) state.toolCallByCallId = new Map();
    state.toolCallByCallId.set(callId, {
      index,
      name: toolName,
      argsBuffer: "",
      deferred: !toolName,
      needsNormalization: toolName === "Agent",
    });
    if (!(state.toolCallItemToCallId instanceof Map)) state.toolCallItemToCallId = new Map();
    if (item.id) state.toolCallItemToCallId.set(item.id, callId);
    // `output_index` is a top-level field on every Responses API streamed event
    // (response.output_item.added/.done AND function_call_arguments.delta alike) —
    // an identifier independent of item_id, for upstreams that omit item_id on delta
    // events.
    if (!(state.toolCallOutputIndexToCallId instanceof Map)) {
      state.toolCallOutputIndexToCallId = new Map();
    }
    if (data.output_index != null) state.toolCallOutputIndexToCallId.set(data.output_index, callId);

    // Track this call_id so response.completed doesn't synthesize a duplicate
    if (!state.toolCallIdsSeen) state.toolCallIdsSeen = new Set();
    state.toolCallIdsSeen.add(callId);

    if (!toolName) {
      // Some Responses providers briefly emit placeholder/empty tool names.
      // Defer emission until output_item.done in case the final name is populated there.
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
                index,
                id: callId,
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

    // Resolve which in-flight call this delta belongs to. Try item_id first (the
    // field the Responses API documents for this event), then output_index (also a
    // top-level field on this event, and independent of item_id — covers upstreams
    // that omit item_id on delta events but still send output_index). Only once both
    // identifying fields are absent/unresolved do we fall back to guessing (the
    // single open call, or the most recently opened one as a last resort).
    const map = state.toolCallByCallId instanceof Map ? state.toolCallByCallId : null;
    let callId = data.item_id ? state.toolCallItemToCallId?.get(data.item_id) : undefined;
    if (!callId && data.output_index != null) {
      callId = state.toolCallOutputIndexToCallId?.get(data.output_index);
    }
    if (!callId && map) {
      callId = map.size === 1 ? [...map.keys()][0] : state.currentToolCallId;
    }
    const entry = callId ? map?.get(callId) : undefined;
    if (!entry) return null;

    // #9168: buffer arguments until output_item.done for schema-aware null normalization
    // Previously emitted raw null values for optional enum fields (e.g. isolation: null).
    entry.argsBuffer = (entry.argsBuffer || "") + argsDelta;
    return null;
  }

  if (eventType === "response.output_item.done" && data.item?.type === "reasoning") {
    const replayableReasoning = extractReplayableResponsesReasoningText(data.item);
    if (replayableReasoning) {
      const accumulated =
        typeof state.accumulatedReasoning === "string" ? state.accumulatedReasoning : "";
      state.accumulatedReasoning = accumulated
        ? `${accumulated}\n\n${replayableReasoning}`
        : replayableReasoning;
    }
  }

  // Function call done — emit args chunk from item.arguments when no deltas were received,
  // then advance the tool-call index. This handles Codex Responses API payloads that
  // carry the complete arguments only in output_item.done (no preceding delta events).
  if (eventType === "response.output_item.done" && data.item?.type === "function_call") {
    const item = data.item;
    const map = state.toolCallByCallId instanceof Map ? state.toolCallByCallId : null;
    let callId = item.call_id;
    if (!callId && item.id) callId = state.toolCallItemToCallId?.get(item.id);
    if (!callId) callId = state.currentToolCallId || fallbackToolCallId();
    const trackedEntry = callId ? map?.get(callId) : undefined;
    // Some upstreams (e.g. Codex) send the complete payload only in output_item.done,
    // with no preceding output_item.added at all — there is no tracked entry to read an
    // index from.
    const entry = trackedEntry || { index: null, argsBuffer: "", deferred: false };

    const buffered = entry.argsBuffer || "";
    const toolName = normalizeToolName(item.name);

    // Claim (and advance) this call's index now if it wasn't assigned at .added — either
    // a deferred call whose name has just now resolved, or a Codex-style done-only
    // payload that never had an .added at all. A deferred call whose name is STILL empty
    // never claims an index (nothing was ever emitted for it either way).
    if (entry.index == null && toolName) {
      entry.index = state.toolCallIndex ?? 0;
      state.toolCallIndex = entry.index + 1;
    }
    const currentIndex = entry.index;
    const toolSchema = state.toolSchemas?.get(toolName);
    const shouldNormalizeArguments = toolName === "Agent";

    if (toolName && state.toolCalls instanceof Map) {
      const completedArguments =
        typeof item.arguments === "string" && item.arguments.length > 0 ? item.arguments : buffered;
      const normalizedArguments = stripEmptyOptionalToolArgs(
        completedArguments,
        toolName,
        toolSchema
      );
      // Keyed by index, not insertion order — readers that need call order for
      // parallel calls closed out of order should sort by this key rather than
      // relying on Map iteration order.
      // Responses→Claude uses this same shared map for Claude block lifecycle
      // state. Preserve those fields when adding the completed-call summary;
      // replacing the entry makes the arguments chunk look like a new unnamed
      // tool and emits a duplicate empty content_block_start.
      state.toolCalls.set(currentIndex, {
        ...state.toolCalls.get(currentIndex),
        id: callId,
        index: currentIndex,
        type: "function",
        function: {
          name: toolName,
          arguments:
            typeof normalizedArguments === "string"
              ? normalizedArguments
              : JSON.stringify(normalizedArguments ?? {}),
        },
      });
    }

    // Track this call_id so response.completed doesn't synthesize a duplicate
    if (!state.toolCallIdsSeen) state.toolCallIdsSeen = new Set();
    if (callId) state.toolCallIdsSeen.add(callId);

    // This call is fully closed — remove it from the in-flight map (bounds the map
    // to genuinely in-flight calls, and keeps the single-open-call fallback in the
    // function_call_arguments.delta handler correct for whichever call opens next).
    if (map && callId) map.delete(callId);
    if (state.currentToolCallId === callId) state.currentToolCallId = null;

    if (entry.deferred) {
      if (!toolName) {
        return null;
      }

      const terminalArguments =
        typeof item.arguments === "string"
          ? item.arguments.length > 0
            ? item.arguments
            : buffered
          : (item.arguments ?? buffered);
      const argsToEmit = stripEmptyOptionalToolArgs(terminalArguments, toolName, toolSchema);

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

    const needsNormalization = shouldNormalizeArguments;

    // Nullable omission sentinels must be normalized before any argument bytes reach the client.
    // Other tool calls retain immediate argument streaming.
    if ((needsNormalization || !buffered) && (item.arguments != null || buffered)) {
      const terminalArguments =
        typeof item.arguments === "string"
          ? item.arguments.length > 0
            ? item.arguments
            : buffered
          : (item.arguments ?? buffered);
      const argsToEmit = stripEmptyOptionalToolArgs(terminalArguments, toolName, toolSchema);

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
    } else if (buffered) {
      // #9168: deltas were buffered — normalize against the original client schema
      // and emit the cleaned arguments once, stripping optional null values that
      // would otherwise reach the client raw.
      const argsToEmit = stripEmptyOptionalToolArgs(buffered, toolName, toolSchema);

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

      const promptTokens =
        inputTokens +
        ("cache_read_input_tokens" in responseUsage ? cacheReadTokens + cacheCreationTokens : 0);

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

  // Handle true reasoning summary ("Thought for 15s"). Emit as `delta.reasoning_content`
  // — matches the `reasoning_content_text.delta` branch above and is what Chat clients
  // (OpenCode, Claude Code, Cursor, etc.) render in their thinking panel. A nested
  // `delta.reasoning.summary` object is swallowed by most stream mergers.
  if (eventType === "response.reasoning_summary_text.delta") {
    const reasoningDelta = data.delta || "";
    if (!reasoningDelta) return null;
    markResponsesReasoningDeltaEmitted(state, data.item_id);
    const deltaText = buildResponsesReasoningSummaryDelta(state, data, reasoningDelta);
    return buildResponsesReasoningDeltaChunk(state, deltaText);
  }

  // Some providers expose completed reasoning only on `response.output_item.done`.
  // Synthesize one Chat reasoning delta only when no delta was already emitted.
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

    const replayableReasoning = extractReplayableResponsesReasoningText(item);
    if (replayableReasoning) {
      return buildResponsesReasoningDeltaChunk(state, replayableReasoning);
    }

    // #7176/#7243: only synthesize from real upstream plaintext — never mutate
    // `item` and never fabricate placeholder text for encrypted-only reasoning.
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
