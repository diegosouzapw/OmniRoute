import { appendToolCallArgumentDelta } from "../utils/toolCallArguments.ts";
import { shouldParseTextualReasoningTags } from "../handlers/responseSanitizer.ts";
import * as fs from "fs";
import * as path from "path";
/**
 * Responses API Transformer
 * Converts OpenAI Chat Completions SSE to Codex Responses API SSE format
 * Can be used in both Next.js and Cloudflare Workers
 */

// Dynamic import for Node.js-only modules (fs/path unavailable in Workers)
let _fs = null;
let _path = null;
async function getFs() {
  if (_fs === null) {
    try {
      _fs = (await import("fs")).default;
    } catch {
      _fs = false;
    }
  }
  return _fs || null;
}
async function getPath() {
  if (_path === null) {
    try {
      _path = (await import("path")).default;
    } catch {
      _path = false;
    }
  }
  return _path || null;
}

// Create log directory for responses (Node.js only)
export function createResponsesLogger(model, logsDir = null) {
  // Skip logging in worker environment (no fs)
  if (typeof fs.mkdirSync !== "function") {
    return null;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "").slice(0, 15);
  const uniqueId = Math.random().toString(36).slice(2, 8);
  const baseDir = logsDir || (typeof process !== "undefined" ? process.cwd() : ".");
  // previous: const baseDir = logsDir || resolveDataDir(); — reverted in #555 for Workers compat
  const logDir = path.join(baseDir, "logs", `responses_${model}_${timestamp}_${uniqueId}`);

  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch {
    return null;
  }

  let inputEvents = [];
  let outputEvents = [];

  return {
    logInput: (event) => {
      inputEvents.push(event);
    },
    logOutput: (event) => {
      outputEvents.push(event);
    },
    flush: () => {
      try {
        fs.writeFileSync(path.join(logDir, "1_input_stream.txt"), inputEvents.join("\n"));
        fs.writeFileSync(path.join(logDir, "2_output_stream.txt"), outputEvents.join("\n"));
      } catch (e) {
        console.log("[RESPONSES] Failed to write logs:", e.message);
      }
    },
  };
}

/**
 * Create TransformStream that converts Chat Completions SSE to Responses API SSE
 * @param {Object} logger - Optional logger instance
 * @param {number} [keepaliveIntervalMs=3000] - Heartbeat interval
 * @param {Object} [options] - Request-derived parity options
 * @param {Object} [options.request] - Original Responses API request body. Used to
 *   decide whether to emit Claude-style `tool_use` blocks alongside the Chat
 *   Completions `function_call` item, whether to echo back `prompt_cache_key`,
 *   and whether to attach a structured-output `output_format` to the response.
 * @param {boolean} [options.emitToolUse=false] - Force-emit a parallel
 *   `type: "tool_use"` block for every `function_call` item, regardless of
 *   the request shape. Set to `true` for Claude Code / Anthropic-shaped
 *   clients that expect Anthropic-style tool blocks in the output array.
 * @param {Object} [options.tools] - The original `tools[]` array from the
 *   request. Used to detect Anthropic-style entries (presence of
 *   `input_schema` without Chat-style `parameters`) so the transformer can
 *   auto-enable `tool_use` emission only for those.
 * @returns {TransformStream}
 */
export function createResponsesApiTransformStream(
  logger = null,
  keepaliveIntervalMs = 3000,
  options = {}
) {
  const opts = options || {};
  const toolsList = Array.isArray(opts.tools) ? opts.tools : [];
  // Auto-enable tool_use emission when ANY tool entry looks Anthropic-shaped
  // (has `input_schema` and lacks Chat-Completions `parameters`). This lets
  // Claude Code and other Anthropic-shaped clients consume the same stream
  // without an explicit opt-in header.
  const requestWantsToolUse = toolsList.some(
    (t) =>
      t &&
      typeof t === "object" &&
      t.input_schema &&
      typeof t.input_schema === "object" &&
      !t.parameters
  );
  const emitToolUse = Boolean(opts.emitToolUse) || requestWantsToolUse;

  // Cache-control passthrough: the request may carry a `prompt_cache_key`
  // (Anthropic) or a `cache_control` marker on an input item. Surface both
  // on the response so the client can correlate cache hits/creation.
  const promptCacheKey =
    typeof opts.request?.prompt_cache_key === "string"
      ? opts.request.prompt_cache_key
      : typeof opts.request?.promptCacheKey === "string"
        ? opts.request.promptCacheKey
        : null;

  // Structured outputs: echo the declared json_schema so the client can
  // validate the emitted `message` content without a second round-trip.
  const requestFormat = opts.request?.response_format || opts.request?.output_format;
  let outputFormat = null;
  if (requestFormat && typeof requestFormat === "object") {
    if (requestFormat.type === "json_schema" && requestFormat.json_schema) {
      const schema = requestFormat.json_schema;
      outputFormat = {
        type: "json_schema",
        name: typeof schema.name === "string" ? schema.name : "response",
        schema: schema.schema || {},
        strict: schema.strict !== false,
      };
    } else if (requestFormat.type === "json_object") {
      outputFormat = { type: "json_object" };
    } else if (requestFormat.type === "text") {
      outputFormat = { type: "text" };
    }
  }

  const state = {
    seq: 0,
    responseId: `resp_${Date.now()}`,
    created: Math.floor(Date.now() / 1000),
    started: false,
    msgTextBuf: {},
    msgItemAdded: {},
    msgContentAdded: {},
    msgItemDone: {},
    reasoningId: "",
    reasoningIndex: -1,
    reasoningBuf: "",
    reasoningPartAdded: false,
    reasoningDone: false,
    inThinking: false,
    parseTextualReasoningTags: false,
    funcArgsBuf: {},
    funcNames: {},
    funcCallIds: {},
    funcArgsDone: {},
    funcItemDone: {},
    completedOutputItems: [] as Array<{
      output_index: number;
      item: Record<string, unknown>;
      seq: number;
    }>,
    buffer: "",
    completedSent: false,
    usage: null,
    keepaliveTimer: null,
    emitToolUse,
    promptCacheKey,
    outputFormat,
    // Track tools that have been "added" (output_item.added emitted) for the
    // parallel tool_use stream. Keyed by the same `fc_<callId>` id so the
    // emitted `tool_use` reuses the same id (clients correlate on id).
    toolUseItemAdded: {},
  };

  const encoder = new TextEncoder();
  const nextSeq = () => ++state.seq;

  // Normalize output_index to a non-negative integer (replaces fragile parseInt calls)
  const normalizeOutputIndex = (outputIndex: number | string): number => {
    const normalized = Number(outputIndex);
    return Number.isInteger(normalized) && normalized >= 0 ? normalized : 0;
  };

  // Record a finalized item as it is emitted in output_item.done so buildDenseOutput
  // can later sort by the actual output_index rather than rebuilding from state dicts.
  const recordCompletedItem = (
    outputIndex: number | string,
    item: Record<string, unknown>
  ): number => {
    const normalized = normalizeOutputIndex(outputIndex);
    state.completedOutputItems.push({ output_index: normalized, item, seq: state.seq });
    return normalized;
  };

  // Build a dense, deterministic output array sorted by output_index then by seq
  // (emission order within the same index) — mirrors upstream PR #721.
  const buildDenseOutput = (): Array<Record<string, unknown>> =>
    state.completedOutputItems
      .slice()
      .sort((left, right) => {
        if (left.output_index !== right.output_index) {
          return left.output_index - right.output_index;
        }
        return left.seq - right.seq;
      })
      .map(({ item }) => item);

  const emit = (controller, eventType, data) => {
    data.sequence_number = nextSeq();
    const output = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    logger?.logOutput(output.trim());
    controller.enqueue(encoder.encode(output));
  };

  // Helper to start reasoning
  const startReasoning = (controller, idx) => {
    if (!state.reasoningId) {
      state.reasoningId = `rs_${state.responseId}_${idx}`;
      state.reasoningIndex = idx;

      emit(controller, "response.output_item.added", {
        type: "response.output_item.added",
        output_index: idx,
        item: {
          id: state.reasoningId,
          type: "reasoning",
          summary: [],
        },
      });

      emit(controller, "response.reasoning_summary_part.added", {
        type: "response.reasoning_summary_part.added",
        item_id: state.reasoningId,
        output_index: idx,
        summary_index: 0,
        part: { type: "summary_text", text: "" },
      });
      state.reasoningPartAdded = true;
    }
  };

  const emitReasoningDelta = (controller, text) => {
    if (!text) return;
    state.reasoningBuf += text;
    emit(controller, "response.reasoning_summary_text.delta", {
      type: "response.reasoning_summary_text.delta",
      item_id: state.reasoningId,
      output_index: state.reasoningIndex,
      summary_index: 0,
      delta: text,
    });
  };

  const closeReasoning = (controller) => {
    if (state.reasoningId && !state.reasoningDone) {
      state.reasoningDone = true;

      emit(controller, "response.reasoning_summary_text.done", {
        type: "response.reasoning_summary_text.done",
        item_id: state.reasoningId,
        output_index: state.reasoningIndex,
        summary_index: 0,
        text: state.reasoningBuf,
      });

      emit(controller, "response.reasoning_summary_part.done", {
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

      emit(controller, "response.output_item.done", {
        type: "response.output_item.done",
        output_index: state.reasoningIndex,
        item: reasoningItem,
      });

      recordCompletedItem(state.reasoningIndex, reasoningItem);
    }
  };

  const closeMessage = (controller, idx) => {
    if (state.msgItemAdded[idx] && !state.msgItemDone[idx]) {
      state.msgItemDone[idx] = true;
      const fullText = state.msgTextBuf[idx] || "";
      const normalizedIndex = normalizeOutputIndex(idx);
      const msgId = `msg_${state.responseId}_${normalizedIndex}`;

      emit(controller, "response.output_text.done", {
        type: "response.output_text.done",
        item_id: msgId,
        output_index: normalizedIndex,
        content_index: 0,
        text: fullText,
        logprobs: [],
      });

      emit(controller, "response.content_part.done", {
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

      emit(controller, "response.output_item.done", {
        type: "response.output_item.done",
        output_index: normalizedIndex,
        item: msgItem,
      });

      recordCompletedItem(normalizedIndex, msgItem);
    }
  };

  const closeToolCall = (controller, idx, recordAsCompleted = true) => {
    const callId = state.funcCallIds[idx];
    if (callId && !state.funcItemDone[idx]) {
      const normalizedIndex = normalizeOutputIndex(idx);
      let args = state.funcArgsBuf[idx] || "{}";

      // Fix #1674 & #1852: Final cleanup of empty string and empty array placeholders
      try {
        const parsed = JSON.parse(args);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          let modified = false;
          for (const [k, v] of Object.entries(parsed)) {
            if (v === "" || (Array.isArray(v) && v.length === 0)) {
              delete parsed[k];
              modified = true;
            }
          }
          if (modified) {
            args = JSON.stringify(parsed);
            state.funcArgsBuf[idx] = args;
          }
        }
      } catch (e) {
        // Ignore malformed JSON
      }

      emit(controller, "response.function_call_arguments.done", {
        type: "response.function_call_arguments.done",
        item_id: `fc_${callId}`,
        output_index: normalizedIndex,
        arguments: args,
      });

      const funcItem = {
        id: `fc_${callId}`,
        type: "function_call",
        arguments: args,
        call_id: callId,
        name: state.funcNames[idx] || "",
      };

      emit(controller, "response.output_item.done", {
        type: "response.output_item.done",
        output_index: normalizedIndex,
        item: funcItem,
      });

      // Parallel Anthropic-style `tool_use` block — same `id`, parsed `input`.
      // The on-the-wire `arguments` is a JSON string; `input` must be an object,
      // so we attempt a parse and fall back to an empty object (the safe default
      // for partial / invalid JSON; the function_call item is the source of truth).
      if (state.emitToolUse) {
        let input = {};
        try {
          const parsed = JSON.parse(args);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            input = parsed;
          }
        } catch {
          // Leave as `{}` — the function_call item carries the full string.
        }
        const toolUseItem = {
          id: `fc_${callId}`,
          type: "tool_use",
          name: state.funcNames[idx] || "",
          input,
        };
        emit(controller, "response.output_item.done", {
          type: "response.output_item.done",
          output_index: normalizedIndex,
          item: toolUseItem,
        });
        // Only record as completed when the function_call is also recorded
        // as the final output (mirrors the recordAsCompleted gate above).
        if (recordAsCompleted) {
          recordCompletedItem(normalizedIndex, toolUseItem);
        }
      }

      // Only record as a completed output item when this is a final close (not a
      // superseded-call eviction where a new call replaced this one at the same index).
      if (recordAsCompleted) {
        recordCompletedItem(normalizedIndex, funcItem);
      }

      state.funcItemDone[idx] = true;
      state.funcArgsDone[idx] = true;
    }
  };

  const sendCompleted = (controller) => {
    if (!state.completedSent) {
      state.completedSent = true;

      // Build a dense, deterministic output array from items recorded as they were emitted.
      // Sorted by output_index then by emission sequence for stable ordering.
      const output = buildDenseOutput();

      const response: Record<string, unknown> = {
        id: state.responseId,
        object: "response",
        created_at: state.created,
        status: "completed",
        background: false,
        error: null,
        output,
      };

      if (state.outputFormat) {
        response.output_format = state.outputFormat;
      }
      if (state.promptCacheKey) {
        response.prompt_cache_key = state.promptCacheKey;
      }

      if (state.usage) {
        // Forward prompt-cache counters from the upstream usage envelope into
        // the Responses API usage object. The transformer is a passthrough
        // here — we never invent cache numbers; we only surface what the
        // upstream reported under the names Anthropic uses
        // (cache_creation_input_tokens / cache_read_input_tokens) and the
        // OpenAI-compatible name (cached_tokens / cache_creation_input_tokens).
        const usage = { ...state.usage };
        if (
          typeof usage.cache_creation_input_tokens !== "number" &&
          typeof usage.cache_creation === "object" &&
          usage.cache_creation
        ) {
          usage.cache_creation_input_tokens = 0;
        }
        response.usage = usage;
      }

      emit(controller, "response.completed", {
        type: "response.completed",
        response,
      });
    }
  };

  return new TransformStream(
    {
      start(controller) {
        // Periodic keepalive heartbeat to prevent client timeouts (Codex CLI #2544)
        state.keepaliveTimer = setInterval(() => {
          // If the stream has already been torn down (client disconnected, downstream
          // cancelled), enqueue() throws on the closed/errored controller. Without this
          // guard the interval keeps firing — and throwing — every keepaliveIntervalMs
          // forever, leaking one live timer per aborted /v1/responses stream and burning
          // CPU as these accumulate over time. Self-clear on the first failed enqueue.
          try {
            controller.enqueue(encoder.encode(": keepalive\n\n"));
          } catch {
            if (state.keepaliveTimer) {
              clearInterval(state.keepaliveTimer);
              state.keepaliveTimer = null;
            }
          }
        }, keepaliveIntervalMs);
        // Don't let the keepalive timer keep the event loop (process) alive on its own.
        (state.keepaliveTimer as { unref?: () => void })?.unref?.();
      },
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        logger?.logInput(text.trim());
        state.buffer += text;

        const messages = state.buffer.split("\n\n");
        state.buffer = messages.pop() || "";

        for (const msg of messages) {
          if (!msg.trim()) continue;

          const dataMatch = msg.match(/^data:\s*(.+)$/m);
          if (!dataMatch) continue;

          const dataStr = dataMatch[1].trim();
          if (dataStr === "[DONE]") continue;

          let parsed;
          try {
            parsed = JSON.parse(dataStr);
          } catch {
            continue;
          }

          if (!parsed.choices?.length) {
            if (parsed.usage) {
              state.usage = parsed.usage;
            }
            continue;
          }

          const choice = parsed.choices[0];
          const idx = choice.index || 0;
          const delta = choice.delta || {};
          if (state.parseTextualReasoningTags !== true && typeof parsed.model === "string") {
            state.parseTextualReasoningTags = shouldParseTextualReasoningTags(
              undefined,
              parsed.model
            );
          }
          const parseTextualReasoningTags = state.parseTextualReasoningTags === true;

          // Emit initial events
          if (!state.started) {
            state.started = true;
            state.responseId = parsed.id ? `resp_${parsed.id}` : state.responseId;

            const baseResponse = {
              id: state.responseId,
              object: "response",
              created_at: state.created,
              status: "in_progress",
              background: false,
              error: null,
              output: [],
            };
            if (state.outputFormat) {
              baseResponse.output_format = state.outputFormat;
            }
            if (state.promptCacheKey) {
              baseResponse.prompt_cache_key = state.promptCacheKey;
            }

            emit(controller, "response.created", {
              type: "response.created",
              response: { ...baseResponse },
            });

            emit(controller, "response.in_progress", {
              type: "response.in_progress",
              response: {
                id: state.responseId,
                object: "response",
                created_at: state.created,
                status: "in_progress",
              },
            });
          }

          // Handle reasoning_content (OpenAI native format)
          if (delta.reasoning_content) {
            startReasoning(controller, idx);
            emitReasoningDelta(controller, delta.reasoning_content);
          }

          // Handle text content. Generic prompt-format tags are visible text;
          // only tag-native models opt into textual reasoning extraction.
          if (delta.content) {
            // Close reasoning if it was opened via native reasoning_content
            // and is still open, before emitting message content. Without this
            // the reasoning item is never closed and the message reuses the
            // reasoning output_index, producing a protocol-invalid stream.
            if (
              state.reasoningId &&
              !state.reasoningDone &&
              (!parseTextualReasoningTags || !state.inThinking)
            ) {
              closeReasoning(controller);
            }

            let content = delta.content;

            if (parseTextualReasoningTags) {
              if (content.includes("<think>")) {
                state.inThinking = true;
                content = content.replaceAll("<think>", "");
                startReasoning(controller, idx);
              }

              if (content.includes("</think>")) {
                const parts = content.split("</think>");
                const thinkPart = parts[0];
                const textPart = parts.slice(1).join("</think>");

                if (thinkPart) emitReasoningDelta(controller, thinkPart);
                closeReasoning(controller);
                state.inThinking = false;
                content = textPart;
              }

              if (state.inThinking && content) {
                emitReasoningDelta(controller, content);
                continue;
              }
            }

            // Regular text content
            if (content) {
              // Use a distinct output_index for the message when reasoning was
              // emitted, so the message item does not collide with the
              // reasoning item's output_index.
              const msgIdx = state.reasoningId ? state.reasoningIndex + 1 : idx;

              // Fix for #1211: Strip leading double-newlines / blank spaces from the very first text chunk
              if (!state.msgTextBuf[msgIdx]) {
                content = content.trimStart();
              }

              if (!content) continue;

              if (!state.msgItemAdded[msgIdx]) {
                state.msgItemAdded[msgIdx] = true;
                const msgId = `msg_${state.responseId}_${msgIdx}`;

                emit(controller, "response.output_item.added", {
                  type: "response.output_item.added",
                  output_index: msgIdx,
                  item: { id: msgId, type: "message", content: [], role: "assistant" },
                });
              }

              if (!state.msgContentAdded[msgIdx]) {
                state.msgContentAdded[msgIdx] = true;

                emit(controller, "response.content_part.added", {
                  type: "response.content_part.added",
                  item_id: `msg_${state.responseId}_${msgIdx}`,
                  output_index: msgIdx,
                  content_index: 0,
                  part: { type: "output_text", annotations: [], logprobs: [], text: "" },
                });
              }

              emit(controller, "response.output_text.delta", {
                type: "response.output_text.delta",
                item_id: `msg_${state.responseId}_${msgIdx}`,
                output_index: msgIdx,
                content_index: 0,
                delta: content,
                logprobs: [],
              });

              if (!state.msgTextBuf[msgIdx]) state.msgTextBuf[msgIdx] = "";
              state.msgTextBuf[msgIdx] += content;
            }
          }

          // Handle tool_calls
          if (delta.tool_calls) {
            // Close reasoning first so tool calls do not collide with an
            // open reasoning item, then close the message at its real index.
            if (state.reasoningId && !state.reasoningDone) {
              closeReasoning(controller);
            }
            const msgIdx = state.reasoningId ? state.reasoningIndex + 1 : idx;
            closeMessage(controller, msgIdx);

            for (const tc of delta.tool_calls) {
              const tcIdx = tc.index ?? 0;
              const newCallId = tc.id;
              const funcName = tc.function?.name;

              // T37: Prevent merging if a new tool_call uses the same index
              if (state.funcCallIds[tcIdx] && newCallId && state.funcCallIds[tcIdx] !== newCallId) {
                // Superseded call: close and emit output_item.done but do NOT record as final output
                // since this call was replaced by a new one at the same index.
                closeToolCall(controller, tcIdx, false);
                delete state.funcCallIds[tcIdx];
                delete state.funcNames[tcIdx];
                delete state.funcArgsBuf[tcIdx];
                delete state.funcArgsDone[tcIdx];
                delete state.funcItemDone[tcIdx];
              }

              if (funcName) state.funcNames[tcIdx] = funcName;

              if (!state.funcCallIds[tcIdx] && newCallId) {
                state.funcCallIds[tcIdx] = newCallId;

                emit(controller, "response.output_item.added", {
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

                // Emit a parallel Anthropic-style `tool_use` block in the SAME
                // output slot. Claude Code and other Anthropic-shaped clients
                // expect items with `type: "tool_use"` and `input` (parsed JSON)
                // rather than `type: "function_call"` and `arguments` (string).
                // The shared `id` lets the client correlate the two shapes.
                if (state.emitToolUse) {
                  state.toolUseItemAdded[tcIdx] = true;
                  emit(controller, "response.output_item.added", {
                    type: "response.output_item.added",
                    output_index: tcIdx,
                    item: {
                      id: `fc_${newCallId}`,
                      type: "tool_use",
                      name: state.funcNames[tcIdx] || "",
                      input: {},
                    },
                  });
                }
              }

              if (!state.funcArgsBuf[tcIdx]) state.funcArgsBuf[tcIdx] = "";

              if (tc.function?.arguments) {
                const refCallId = state.funcCallIds[tcIdx] || newCallId;
                let deltaStr = tc.function.arguments;

                // Fix #1674 & #1852: Strip empty strings and empty arrays from streaming deltas
                if (
                  deltaStr.includes('""') ||
                  deltaStr.includes("[]") ||
                  deltaStr.includes("[ ]")
                ) {
                  deltaStr = deltaStr
                    .replace(/,"[a-zA-Z0-9_]+":""/g, "")
                    .replace(/"[a-zA-Z0-9_]+":"",/g, "")
                    .replace(/,"[a-zA-Z0-9_]+":\s*\[\s*\]/g, "")
                    .replace(/"[a-zA-Z0-9_]+":\s*\[\s*\],?/g, "");
                }

                const existingArgs = state.funcArgsBuf[tcIdx] || "";
                const nextArgs = appendToolCallArgumentDelta(existingArgs, deltaStr);
                const emittedDelta = nextArgs.slice(existingArgs.length);
                state.funcArgsBuf[tcIdx] = nextArgs;

                if (refCallId && emittedDelta) {
                  emit(controller, "response.function_call_arguments.delta", {
                    type: "response.function_call_arguments.delta",
                    item_id: `fc_${refCallId}`,
                    output_index: tcIdx,
                    delta: emittedDelta,
                  });
                }
              }
            }
          }

          // Handle finish_reason
          if (choice.finish_reason) {
            for (const i in state.msgItemAdded) closeMessage(controller, i);
            closeReasoning(controller);
            for (const i in state.funcCallIds) closeToolCall(controller, i);
            sendCompleted(controller);
          }
        }
      },

      flush(controller) {
        // Clear keepalive timer
        if (state.keepaliveTimer) {
          clearInterval(state.keepaliveTimer);
          state.keepaliveTimer = null;
        }
        for (const i in state.msgItemAdded) closeMessage(controller, i);
        closeReasoning(controller);
        for (const i in state.funcCallIds) closeToolCall(controller, i);
        sendCompleted(controller);

        logger?.logOutput("data: [DONE]");
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        logger?.flush();
      },

      // flush() only runs when the writable side closes NORMALLY. When the client
      // disconnects mid-stream the writable side is aborted and flush() never runs, so
      // the keepalive timer must also be cleared here to avoid leaking it on cancellation.
      cancel() {
        if (state.keepaliveTimer) {
          clearInterval(state.keepaliveTimer);
          state.keepaliveTimer = null;
        }
      },
    },
    { highWaterMark: 16384 },
    { highWaterMark: 16384 }
  );
}
