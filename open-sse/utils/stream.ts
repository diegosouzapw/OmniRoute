import { translateResponse, initState } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import {
  extractUsage,
  hasValidUsage,
  estimateUsage,
  logUsage,
  addBufferToUsage,
  filterUsageForFormat,
  COLORS,
} from "./usageTracking.ts";
import { parseSSELine, hasValuableContent, fixInvalidId, formatSSE } from "./streamHelpers.ts";
import { STREAM_IDLE_TIMEOUT_MS, HTTP_STATUS } from "../config/constants.ts";
import {
  sanitizeStreamingChunk,
  extractThinkingFromContent,
} from "../handlers/responseSanitizer.ts";

export { COLORS, formatSSE };

type JsonRecord = Record<string, unknown>;

type StreamLogger = {
  appendProviderChunk?: (value: string) => void;
  appendConvertedChunk?: (value: string) => void;
  appendOpenAIChunk?: (value: string) => void;
};

type StreamCompletePayload = {
  status: number;
  usage: unknown;
  /** Minimal response body for call log (streaming: usage + note; non-streaming not used) */
  responseBody?: unknown;
};

type StreamOptions = {
  mode?: string;
  targetFormat?: string;
  sourceFormat?: string;
  provider?: string | null;
  reqLogger?: StreamLogger | null;
  toolNameMap?: unknown;
  model?: string | null;
  connectionId?: string | null;
  apiKeyInfo?: unknown;
  body?: unknown;
  onComplete?: ((payload: StreamCompletePayload) => void) | null;
};

type TranslateState = ReturnType<typeof initState> & {
  provider?: string | null;
  toolNameMap?: unknown;
  usage?: unknown;
  finishReason?: unknown;
  /** Accumulated message content for call log response body */
  accumulatedContent?: string;
};

function getOpenAIIntermediateChunks(value: unknown): unknown[] {
  if (!value || typeof value !== "object") return [];
  const candidate = (value as JsonRecord)._openaiIntermediate;
  return Array.isArray(candidate) ? candidate : [];
}

// Note: TextDecoder/TextEncoder are created per-stream inside createSSEStream()
// to avoid shared state issues with concurrent streams (TextDecoder with {stream:true}
// maintains internal buffering state between decode() calls).

/**
 * Stream modes
 */
const STREAM_MODE = {
  TRANSLATE: "translate", // Full translation between formats
  PASSTHROUGH: "passthrough", // No translation, normalize output, extract usage
};

/**
 * Create unified SSE transform stream with idle timeout protection.
 * If the upstream provider stops sending data for STREAM_IDLE_TIMEOUT_MS,
 * the stream emits an error event and closes to prevent indefinite hanging.
 *
 * @param {object} options
 * @param {string} options.mode - Stream mode: translate, passthrough
 * @param {string} options.targetFormat - Provider format (for translate mode)
 * @param {string} options.sourceFormat - Client format (for translate mode)
 * @param {string} options.provider - Provider name
 * @param {object} options.reqLogger - Request logger instance
 * @param {string} options.model - Model name
 * @param {string} options.connectionId - Connection ID for usage tracking
 * @param {object|null} options.apiKeyInfo - API key metadata for usage attribution
 * @param {object} options.body - Request body (for input token estimation)
 * @param {function} options.onComplete - Callback when stream finishes: ({ status, usage }) => void
 */
export function createSSEStream(options: StreamOptions = {}) {
  const {
    mode = STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    provider = null,
    reqLogger = null,
    toolNameMap = null,
    model = null,
    connectionId = null,
    apiKeyInfo = null,
    body = null,
    onComplete = null,
  } = options;

  let buffer = "";
  let usage = null;

  // State for translate mode (accumulatedContent for call log response body)
  const state: TranslateState | null =
    mode === STREAM_MODE.TRANSLATE
      ? {
          ...(initState(sourceFormat) as TranslateState),
          provider,
          toolNameMap,
          accumulatedContent: "",
        }
      : null;

  // Track content length for usage estimation (both modes)
  let totalContentLength = 0;
  // Passthrough: accumulate content for call log response body
  let passthroughAccumulatedContent = "";

  // Guard against duplicate [DONE] events — ensures exactly one per stream
  let doneSent = false;

  // Per-stream instances to avoid shared state with concurrent streams
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // Idle timeout state — closes stream if provider stops sending data
  let lastChunkTime = Date.now();
  let idleTimer: ReturnType<typeof setInterval> | null = null;
  let streamTimedOut = false;

  return new TransformStream(
    {
      start(controller) {
        // Start idle watchdog — checks every 10s if provider has stopped sending
        if (STREAM_IDLE_TIMEOUT_MS > 0) {
          idleTimer = setInterval(() => {
            if (!streamTimedOut && Date.now() - lastChunkTime > STREAM_IDLE_TIMEOUT_MS) {
              streamTimedOut = true;
              clearInterval(idleTimer);
              idleTimer = null;
              const timeoutMsg = `[STREAM] Idle timeout: no data from ${provider || "provider"} for ${STREAM_IDLE_TIMEOUT_MS}ms (model: ${model || "unknown"})`;
              console.warn(timeoutMsg);
              trackPendingRequest(model, provider, connectionId, false);
              appendRequestLog({
                model,
                provider,
                connectionId,
                status: `FAILED ${HTTP_STATUS.GATEWAY_TIMEOUT}`,
              }).catch(() => {});
              const timeoutError = new Error(timeoutMsg);
              timeoutError.name = "StreamIdleTimeoutError";
              controller.error(timeoutError);
            }
          }, 10_000);
        }
      },

      transform(chunk, controller) {
        if (streamTimedOut) return;
        lastChunkTime = Date.now();
        const text = decoder.decode(chunk, { stream: true });
        buffer += text;
        reqLogger?.appendProviderChunk?.(text);

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          // Passthrough mode: normalize and forward
          if (mode === STREAM_MODE.PASSTHROUGH) {
            let output;
            let injectedUsage = false;

            if (trimmed.startsWith("data:") && trimmed.slice(5).trim() !== "[DONE]") {
              try {
                let parsed = JSON.parse(trimmed.slice(5).trim());

                // Detect Responses SSE payloads (have a `type` field like "response.created",
                // "response.output_item.added", etc.) and skip Chat Completions-specific
                // sanitization to avoid corrupting the stream for Responses-native clients.
                const isResponsesSSE =
                  parsed.type &&
                  typeof parsed.type === "string" &&
                  parsed.type.startsWith("response.");

                // Detect Claude SSE payloads. Includes "ping" and "error" to ensure
                // they bypass the Chat Completions sanitization path which would
                // incorrectly process or drop them.
                const isClaudeSSE =
                  parsed.type &&
                  typeof parsed.type === "string" &&
                  (parsed.type.startsWith("message") ||
                    parsed.type.startsWith("content_block") ||
                    parsed.type === "ping" ||
                    parsed.type === "error");

                if (isResponsesSSE) {
                  // Responses SSE: only extract usage, forward payload as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }
                  // Track content length and accumulate for call log
                  if (parsed.delta && typeof parsed.delta === "string") {
                    totalContentLength += parsed.delta.length;
                    passthroughAccumulatedContent += parsed.delta;
                  }
                } else if (isClaudeSSE) {
                  // Claude SSE: extract usage, track content, forward as-is
                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    // Non-destructive merge: never overwrite a positive value with 0
                    // message_start carries input_tokens, message_delta carries output_tokens;
                    if (!usage) usage = {} as any;
                    const u = usage as Record<string, number>;
                    const eu = extracted as Record<string, number>;
                    if (eu.prompt_tokens > 0) u.prompt_tokens = eu.prompt_tokens;
                    if (eu.completion_tokens > 0) u.completion_tokens = eu.completion_tokens;
                    if (eu.total_tokens > 0) u.total_tokens = eu.total_tokens;
                    if (eu.cache_read_input_tokens)
                      u.cache_read_input_tokens = eu.cache_read_input_tokens;
                    if (eu.cache_creation_input_tokens)
                      u.cache_creation_input_tokens = eu.cache_creation_input_tokens;
                  }
                  // Track content length and accumulate from Claude format
                  if (parsed.delta?.text) {
                    totalContentLength += parsed.delta.text.length;
                    passthroughAccumulatedContent += parsed.delta.text;
                  }
                  if (parsed.delta?.thinking) {
                    totalContentLength += parsed.delta.thinking.length;
                    passthroughAccumulatedContent += parsed.delta.thinking;
                  }
                } else {
                  // Chat Completions: full sanitization pipeline
                  parsed = sanitizeStreamingChunk(parsed);

                  const idFixed = fixInvalidId(parsed);

                  if (!hasValuableContent(parsed, FORMATS.OPENAI)) {
                    continue;
                  }

                  const delta = parsed.choices?.[0]?.delta;

                  // Extract <think> tags from streaming content
                  if (delta?.content && typeof delta.content === "string") {
                    const { content, thinking } = extractThinkingFromContent(delta.content);
                    delta.content = content;
                    if (thinking && !delta.reasoning_content) {
                      delta.reasoning_content = thinking;
                    }
                  }

                  // T18: Track if we saw tool calls
                  if (delta?.tool_calls && delta.tool_calls.length > 0) {
                    (state as any).passthroughHasToolCalls = true;
                  }

                  const content = delta?.content || delta?.reasoning_content;
                  if (content && typeof content === "string") {
                    totalContentLength += content.length;
                  }
                  if (typeof delta?.content === "string")
                    passthroughAccumulatedContent += delta.content;
                  if (typeof delta?.reasoning_content === "string")
                    passthroughAccumulatedContent += delta.reasoning_content;

                  const extracted = extractUsage(parsed);
                  if (extracted) {
                    usage = extracted;
                  }

                  const isFinishChunk = parsed.choices?.[0]?.finish_reason;

                  // T18: Normalize finish_reason to 'tool_calls' if tool calls were used
                  if (
                    isFinishChunk &&
                    (state as any).passthroughHasToolCalls &&
                    parsed.choices[0].finish_reason !== "tool_calls"
                  ) {
                    parsed.choices[0].finish_reason = "tool_calls";
                    // If we modify it, we must output the modified object
                    if (!injectedUsage && hasValidUsage(parsed.usage)) {
                      output = `data: ${JSON.stringify(parsed)}\n`;
                      injectedUsage = true;
                    }
                  }
                  if (isFinishChunk && !hasValidUsage(parsed.usage)) {
                    const estimated = estimateUsage(body, totalContentLength, FORMATS.OPENAI);
                    parsed.usage = filterUsageForFormat(estimated, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    usage = estimated;
                    injectedUsage = true;
                  } else if (isFinishChunk && usage) {
                    const buffered = addBufferToUsage(usage);
                    parsed.usage = filterUsageForFormat(buffered, FORMATS.OPENAI);
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  } else if (idFixed) {
                    output = `data: ${JSON.stringify(parsed)}\n`;
                    injectedUsage = true;
                  }
                }
              } catch {}
            }

            if (!injectedUsage) {
              if (line.startsWith("data:") && !line.startsWith("data: ")) {
                output = "data: " + line.slice(5) + "\n";
              } else {
                output = line + "\n";
              }
            }

            reqLogger?.appendConvertedChunk?.(output);
            controller.enqueue(encoder.encode(output));
            continue;
          }

          // Translate mode
          if (!trimmed) continue;

          const parsed = parseSSELine(trimmed);
          if (!parsed) continue;

          if (parsed && parsed.done) {
            if (!doneSent) {
              doneSent = true;
              const output = "data: [DONE]\n\n";
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }
            continue;
          }

          // Track content length and accumulate for call log (from raw provider chunk, so content is never missed)
          // Do this before translation so we capture content regardless of translator output shape

          // Claude format
          if (parsed.delta?.text) {
            const t = parsed.delta.text;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent += t;
          }
          if (parsed.delta?.thinking) {
            const t = parsed.delta.thinking;
            totalContentLength += t.length;
            if (state?.accumulatedContent !== undefined && typeof t === "string")
              state.accumulatedContent += t;
          }

          // OpenAI format
          if (parsed.choices?.[0]?.delta?.content) {
            const c = parsed.choices[0].delta.content;
            if (typeof c === "string") {
              totalContentLength += c.length;
              if (state?.accumulatedContent !== undefined) state.accumulatedContent += c;
            } else if (Array.isArray(c)) {
              for (const part of c) {
                if (part?.text && typeof part.text === "string") {
                  totalContentLength += part.text.length;
                  if (state?.accumulatedContent !== undefined)
                    state.accumulatedContent += part.text;
                }
              }
            }
          }
          if (parsed.choices?.[0]?.delta?.reasoning_content) {
            const r = parsed.choices[0].delta.reasoning_content;
            if (typeof r === "string") {
              totalContentLength += r.length;
              if (state?.accumulatedContent !== undefined) state.accumulatedContent += r;
            }
          }

          // Gemini format - may have multiple parts
          if (parsed.candidates?.[0]?.content?.parts) {
            for (const part of parsed.candidates[0].content.parts) {
              if (part.text && typeof part.text === "string") {
                totalContentLength += part.text.length;
                if (state?.accumulatedContent !== undefined) state.accumulatedContent += part.text;
              }
            }
          }

          // Generic fallback: delta string, top-level content/text (e.g. some SSE payloads)
          if (state?.accumulatedContent !== undefined) {
            if (typeof (parsed as JsonRecord).delta === "string") {
              const d = (parsed as JsonRecord).delta as string;
              state.accumulatedContent += d;
              totalContentLength += d.length;
            }
            if (typeof (parsed as JsonRecord).content === "string") {
              const c = (parsed as JsonRecord).content as string;
              state.accumulatedContent += c;
              totalContentLength += c.length;
            }
            if (typeof (parsed as JsonRecord).text === "string") {
              const t = (parsed as JsonRecord).text as string;
              state.accumulatedContent += t;
              totalContentLength += t.length;
            }
          }

          // Extract usage
          const extracted = extractUsage(parsed);
          if (extracted) state.usage = extracted; // Keep original usage for logging

          // Translate: targetFormat -> openai -> sourceFormat
          const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

          // Log OpenAI intermediate chunks (if available)
          for (const item of getOpenAIIntermediateChunks(translated)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (translated?.length > 0) {
            for (const item of translated) {
              // Content for call log is accumulated only from parsed (above) to avoid double-counting;
              // do not add again from item here.

              // Filter empty chunks
              if (!hasValuableContent(item, sourceFormat)) {
                continue; // Skip this empty chunk
              }

              // Inject estimated usage if finish chunk has no valid usage
              const isFinishChunk =
                item.type === "message_delta" || item.choices?.[0]?.finish_reason;
              if (
                state.finishReason &&
                isFinishChunk &&
                !hasValidUsage(item.usage) &&
                totalContentLength > 0
              ) {
                const estimated = estimateUsage(body, totalContentLength, sourceFormat);
                item.usage = filterUsageForFormat(estimated, sourceFormat); // Filter + already has buffer
                state.usage = estimated;
              } else if (state.finishReason && isFinishChunk && state.usage) {
                // Add buffer and filter usage for client (but keep original in state.usage for logging)
                const buffered = addBufferToUsage(state.usage);
                item.usage = filterUsageForFormat(buffered, sourceFormat);
              }

              const output = formatSSE(item, sourceFormat);
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }
          }
        }
      },

      flush(controller) {
        // Clean up idle watchdog timer
        if (idleTimer) {
          clearInterval(idleTimer);
          idleTimer = null;
        }
        if (streamTimedOut) {
          return;
        }
        trackPendingRequest(model, provider, connectionId, false);
        try {
          const remaining = decoder.decode();
          if (remaining) buffer += remaining;

          if (mode === STREAM_MODE.PASSTHROUGH) {
            if (buffer) {
              let output = buffer;
              if (buffer.startsWith("data:") && !buffer.startsWith("data: ")) {
                output = "data: " + buffer.slice(5);
              }
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }

            // Estimate usage if provider didn't return valid usage
            if (!hasValidUsage(usage) && totalContentLength > 0) {
              usage = estimateUsage(body, totalContentLength, sourceFormat || FORMATS.OPENAI);
            }

            if (hasValidUsage(usage)) {
              logUsage(provider, usage, model, connectionId, apiKeyInfo);
            } else {
              appendRequestLog({
                model,
                provider,
                connectionId,
                tokens: null,
                status: "200 OK",
              }).catch(() => {});
            }
            // Notify caller for call log persistence (include full response body with accumulated content)
            if (onComplete) {
              try {
                const u = usage as Record<string, unknown> | null;
                const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
                const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
                const content = passthroughAccumulatedContent.trim() || "";
                const responseBody = {
                  choices: [
                    {
                      message: {
                        role: "assistant",
                        content,
                      },
                    },
                  ],
                  usage: {
                    prompt_tokens: prompt,
                    completion_tokens: completion,
                    total_tokens: prompt + completion,
                  },
                  _streamed: true,
                };
                onComplete({ status: 200, usage, responseBody });
              } catch {}
            }
            return;
          }

          // Translate mode: process remaining buffer
          if (buffer.trim()) {
            const parsed = parseSSELine(buffer.trim());
            if (parsed && !parsed.done) {
              // Extract usage from remaining buffer — if the usage-bearing event
              // (e.g. response.completed) is the last SSE line, it ends up here
              // in the flush handler where extractUsage was not called.
              // Non-destructive merge: some providers send usage across multiple
              // events (e.g. prompt_tokens in message_start, completion_tokens
              // in message_delta). Direct assignment would lose earlier data.
              const extracted = extractUsage(parsed);
              if (extracted) {
                if (!state.usage) {
                  state.usage = extracted;
                } else {
                  const su = state.usage as Record<string, number>;
                  const eu = extracted as Record<string, number>;
                  if (eu.prompt_tokens > 0) su.prompt_tokens = eu.prompt_tokens;
                  if (eu.completion_tokens > 0) su.completion_tokens = eu.completion_tokens;
                  if (eu.total_tokens > 0) su.total_tokens = eu.total_tokens;
                  if (eu.cache_read_input_tokens > 0)
                    su.cache_read_input_tokens = eu.cache_read_input_tokens;
                  if (eu.cache_creation_input_tokens > 0)
                    su.cache_creation_input_tokens = eu.cache_creation_input_tokens;
                  if (eu.cached_tokens > 0) su.cached_tokens = eu.cached_tokens;
                  if (eu.reasoning_tokens > 0) su.reasoning_tokens = eu.reasoning_tokens;
                }
              }

              const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

              // Log OpenAI intermediate chunks
              for (const item of getOpenAIIntermediateChunks(translated)) {
                const openaiOutput = formatSSE(item, FORMATS.OPENAI);
                reqLogger?.appendOpenAIChunk?.(openaiOutput);
              }

              if (translated?.length > 0) {
                for (const item of translated) {
                  const output = formatSSE(item, sourceFormat);
                  reqLogger?.appendConvertedChunk?.(output);
                  controller.enqueue(encoder.encode(output));
                }
              }
            }
          }

          // Flush remaining events (only once at stream end)
          const flushed = translateResponse(targetFormat, sourceFormat, null, state);

          // Log OpenAI intermediate chunks for flushed events
          for (const item of getOpenAIIntermediateChunks(flushed)) {
            const openaiOutput = formatSSE(item, FORMATS.OPENAI);
            reqLogger?.appendOpenAIChunk?.(openaiOutput);
          }

          if (flushed?.length > 0) {
            for (const item of flushed) {
              const output = formatSSE(item, sourceFormat);
              reqLogger?.appendConvertedChunk?.(output);
              controller.enqueue(encoder.encode(output));
            }
          }

          /**
           * Usage injection strategy:
           * Usage data (input/output tokens) is injected into the last content chunk
           * or the finish_reason chunk rather than sent as a separate SSE event.
           * This ensures all major clients (Claude CLI, Continue, Cursor) receive
           * usage data even if they stop reading after the finish signal.
           * The usage buffer (state.usage) accumulates across chunks and is only
           * emitted once at stream end when merged into the final translated chunk.
           */

          // Send [DONE] (only if not already sent during transform)
          if (!doneSent) {
            doneSent = true;
            const doneOutput = "data: [DONE]\n\n";
            reqLogger?.appendConvertedChunk?.(doneOutput);
            controller.enqueue(encoder.encode(doneOutput));
          }

          // Estimate usage if provider didn't return valid usage (for translate mode)
          if (!hasValidUsage(state?.usage) && totalContentLength > 0) {
            state.usage = estimateUsage(body, totalContentLength, sourceFormat);
          }

          if (hasValidUsage(state?.usage)) {
            logUsage(state.provider || targetFormat, state.usage, model, connectionId, apiKeyInfo);
          } else {
            appendRequestLog({
              model,
              provider,
              connectionId,
              tokens: null,
              status: "200 OK",
            }).catch(() => {});
          }
          // Notify caller for call log persistence (include full response body with accumulated content)
          if (onComplete) {
            try {
              const u = state?.usage as Record<string, unknown> | null | undefined;
              const prompt = Number(u?.prompt_tokens ?? u?.input_tokens ?? 0);
              const completion = Number(u?.completion_tokens ?? u?.output_tokens ?? 0);
              const content = (state?.accumulatedContent ?? "").trim() || "";
              const responseBody = {
                choices: [
                  {
                    message: {
                      role: "assistant",
                      content,
                    },
                  },
                ],
                usage: {
                  prompt_tokens: prompt,
                  completion_tokens: completion,
                  total_tokens: prompt + completion,
                },
                _streamed: true,
              };
              onComplete({ status: 200, usage: state?.usage, responseBody });
            } catch {}
          }
        } catch (error) {
          console.log(`[STREAM] Error in flush (${model || "unknown"}):`, error.message || error);
        }
      },
    },
    // Writable side backpressure — limit buffered chunks to avoid unbounded memory
    { highWaterMark: 16 },
    // Readable side backpressure — limit queued output chunks
    { highWaterMark: 16 }
  );
}

// Convenience functions for backward compatibility
export function createSSETransformStreamWithLogger(
  targetFormat: string,
  sourceFormat: string,
  provider: string | null = null,
  reqLogger: StreamLogger | null = null,
  toolNameMap: unknown = null,
  model: string | null = null,
  connectionId: string | null = null,
  body: unknown = null,
  onComplete: ((payload: StreamCompletePayload) => void) | null = null,
  apiKeyInfo: unknown = null
) {
  return createSSEStream({
    mode: STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    provider,
    reqLogger,
    toolNameMap,
    model,
    connectionId,
    apiKeyInfo,
    body,
    onComplete,
  });
}

export function createPassthroughStreamWithLogger(
  provider: string | null = null,
  reqLogger: StreamLogger | null = null,
  model: string | null = null,
  connectionId: string | null = null,
  body: unknown = null,
  onComplete: ((payload: StreamCompletePayload) => void) | null = null,
  apiKeyInfo: unknown = null
) {
  return createSSEStream({
    mode: STREAM_MODE.PASSTHROUGH,
    provider,
    reqLogger,
    model,
    connectionId,
    apiKeyInfo,
    body,
    onComplete,
  });
}
