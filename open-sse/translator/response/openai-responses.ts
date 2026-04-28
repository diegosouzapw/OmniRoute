/**
 * Translator: OpenAI Chat Completions → OpenAI Responses API (response)
 * Converts streaming chunks from Chat Completions to Responses API events
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";

function normalizeToolName(value) {
  return typeof value === "string" ? value.trim() : "";
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

  // Handle reasoning_content
  if (delta.reasoning_content) {
    startReasoning(state, emit, idx);
    emitReasoningDelta(state, emit, delta.reasoning_content);
  }

  // Handle text content
  if (delta.content) {
    let content = delta.content;

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

    if (content) {
      emitTextContent(state, emit, idx, content);
    }
  }

  // Handle tool_calls
  if (delta.tool_calls) {
    closeMessage(state, emit, idx);
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

    emit("response.output_item.done", {
      type: "response.output_item.done",
      output_index: state.reasoningIndex,
      item: {
        id: state.reasoningId,
        type: "reasoning",
        summary: [{ type: "summary_text", text: state.reasoningBuf }],
      },
    });
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
    const msgId = `msg_${state.responseId}_${idx}`;

    emit("response.output_text.done", {
      type: "response.output_text.done",
      item_id: msgId,
      output_index: parseInt(idx),
      content_index: 0,
      text: fullText,
      logprobs: [],
    });

    emit("response.content_part.done", {
      type: "response.content_part.done",
      item_id: msgId,
      output_index: parseInt(idx),
      content_index: 0,
      part: { type: "output_text", annotations: [], logprobs: [], text: fullText },
    });

    emit("response.output_item.done", {
      type: "response.output_item.done",
      output_index: parseInt(idx),
      item: {
        id: msgId,
        type: "message",
        content: [{ type: "output_text", annotations: [], logprobs: [], text: fullText }],
        role: "assistant",
      },
    });
  }
}

function emitToolCall(state, emit, tc) {
  const tcIdx = tc.index ?? 0;
  const newCallId = tc.id;
  const funcName = tc.function?.name;

  // T37: If we already have a tool call at this index but the ID changed,
  // we must close the current one and start a new one to prevent merging.
  if (state.funcCallIds[tcIdx] && newCallId && state.funcCallIds[tcIdx] !== newCallId) {
    closeToolCall(state, emit, tcIdx);
    delete state.funcCallIds[tcIdx];
    delete state.funcNames[tcIdx];
    delete state.funcArgsBuf[tcIdx];
    delete state.funcArgsDone[tcIdx];
    delete state.funcItemDone[tcIdx];
  }

  if (funcName) state.funcNames[tcIdx] = funcName;

  if (!state.funcCallIds[tcIdx] && newCallId) {
    state.funcCallIds[tcIdx] = newCallId;

    emit("response.output_item.added", {
      type: "response.output_item.added",
      output_index: tcIdx,
      item: {
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
    if (refCallId) {
      emit("response.function_call_arguments.delta", {
        type: "response.function_call_arguments.delta",
        item_id: `fc_${refCallId}`,
        output_index: tcIdx,
        delta: tc.function.arguments,
      });
    }
    state.funcArgsBuf[tcIdx] += tc.function.arguments;
  }
}

function closeToolCall(state, emit, idx) {
  const callId = state.funcCallIds[idx];
  if (callId && !state.funcItemDone[idx]) {
    const args = state.funcArgsBuf[idx] || "{}";

    emit("response.function_call_arguments.done", {
      type: "response.function_call_arguments.done",
      item_id: `fc_${callId}`,
      output_index: parseInt(idx),
      arguments: args,
    });

    emit("response.output_item.done", {
      type: "response.output_item.done",
      output_index: parseInt(idx),
      item: {
        id: `fc_${callId}`,
        type: "function_call",
        arguments: args,
        call_id: callId,
        name: state.funcNames[idx] || "",
      },
    });

    state.funcItemDone[idx] = true;
    state.funcArgsDone[idx] = true;
  }
}

function sendCompleted(state, emit) {
  if (!state.completedSent) {
    state.completedSent = true;

    // Build output from accumulated state
    const output = [];
    if (state.reasoningId) {
      output.push({
        id: state.reasoningId,
        type: "reasoning",
        summary: [{ type: "summary_text", text: state.reasoningBuf }],
      });
    }
    for (const idx in state.msgItemAdded) {
      output.push({
        id: `msg_${state.responseId}_${idx}`,
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", annotations: [], text: state.msgTextBuf[idx] || "" }],
      });
    }
    for (const idx in state.funcCallIds) {
      const callId = state.funcCallIds[idx];
      output.push({
        id: `fc_${callId}`,
        type: "function_call",
        call_id: callId,
        name: state.funcNames[idx] || "",
        arguments: state.funcArgsBuf[idx] || "{}",
      });
    }

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

function normalizeUpstreamFailure(data, fallbackType = "server_error") {
  const response = data?.response && typeof data.response === "object" ? data.response : null;
  const error =
    response?.error && typeof response.error === "object"
      ? response.error
      : data?.error && typeof data.error === "object"
        ? data.error
        : null;

  const code = typeof error?.code === "string" ? error.code : "";
  const message =
    typeof error?.message === "string"
      ? error.message
      : typeof data?.message === "string"
        ? data.message
        : "Upstream failure";

  return {
    status: code === "rate_limit_exceeded" ? 429 : 502,
    type: code === "rate_limit_exceeded" ? "rate_limit_error" : fallbackType,
    code: code || (fallbackType === "rate_limit_error" ? "rate_limit_exceeded" : "bad_gateway"),
    message,
  };
}

/**
 * Translate OpenAI Responses API chunk to OpenAI Chat Completions format
 * This is for when Codex returns data and we need to send it to an OpenAI-compatible client
 */
export function openaiResponsesToOpenAIResponse(chunk, state) {
  if (!chunk) {
    // Flush: send final chunk with finish_reason
    if (!state.finishReasonSent && state.started) {
      state.finishReasonSent = true;
      const hadToolCalls = (state.toolCallIndex || 0) > 0;
      return {
        id: state.chatId || `chatcmpl-${Date.now()}`,
        object: "chat.completion.chunk",
        created: state.created || Math.floor(Date.now() / 1000),
        model: state.model || "gpt-4",
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: hadToolCalls ? "tool_calls" : "stop",
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
    state.currentToolCallId = item.call_id || `call_${Date.now()}`;
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
    const callId = item.call_id || state.currentToolCallId || `call_${Date.now()}`;
    const toolName = normalizeToolName(item.name);

    if (state.currentToolCallDeferred) {
      state.currentToolCallDeferred = false;
      state.currentToolCallArgsBuffer = "";
      state.currentToolCallId = null;

      if (!toolName) {
        return null;
      }

      state.toolCallIndex++;

      let argsToEmit = item.arguments;
      if (argsToEmit != null && typeof argsToEmit === "object" && !Array.isArray(argsToEmit)) {
        // Fix #1674: Strip empty string placeholders emitted by GPT-5.5 for optional fields
        const cleaned = { ...argsToEmit };
        for (const [k, v] of Object.entries(cleaned)) {
          if (v === "") delete cleaned[k];
        }
        argsToEmit = cleaned;
      }

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
      let argsToEmit = item.arguments;
      if (argsToEmit != null && typeof argsToEmit === "object" && !Array.isArray(argsToEmit)) {
        const cleaned = { ...argsToEmit };
        for (const [k, v] of Object.entries(cleaned)) {
          if (v === "") delete cleaned[k];
        }
        argsToEmit = cleaned;
      }

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
      const hadToolCalls = (state.toolCallIndex || 0) > 0;
      const reason = hadToolCalls ? "tool_calls" : "stop";
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

  // Handle true reasoning summary ("Thought for 15s")
  if (eventType === "response.reasoning_summary_text.delta") {
    const reasoningDelta = data.delta || "";
    if (!reasoningDelta) return null;
    return {
      id: state.chatId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "gpt-4",
      choices: [
        {
          index: 0,
          delta: { reasoning: { summary: reasoningDelta } },
          finish_reason: null,
        },
      ],
    };
  }

  // Ignore other events
  return null;
}

// Register both directions
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, null, openaiToOpenAIResponsesResponse);
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, null, openaiResponsesToOpenAIResponse);
