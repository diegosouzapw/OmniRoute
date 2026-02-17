import { translateResponse, initState } from "../translator/index.js";
import { FORMATS } from "../translator/formats.js";
import { trackPendingRequest, appendRequestLog } from "@/lib/usageDb";
import {
  extractUsage,
  hasValidUsage,
  estimateUsage,
  logUsage,
  addBufferToUsage,
  filterUsageForFormat,
  COLORS,
} from "./usageTracking.js";
import { parseSSELine, hasValuableContent, fixInvalidId, formatSSE } from "./streamHelpers.js";
import { STREAM_IDLE_TIMEOUT_MS, HTTP_STATUS } from "../config/constants.js";

export { COLORS, formatSSE };

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
/** @param {any} options */
export function createSSEStream(options: any = {}) {
  const {
    mode = STREAM_MODE.TRANSLATE,
    targetFormat,
    sourceFormat,
    provider = null,
    reqLogger = null,
    /** @type {any} */
    toolNameMap = null,
    model = null,
    connectionId = null,
    apiKeyInfo = null,
    body = null,
    onComplete = null,
  } = options;

  let buffer = "";
  let usage = null;

  // State for translate mode
  const state =
    mode === STREAM_MODE.TRANSLATE ? { ...initState(sourceFormat), provider, toolNameMap } : null;

  // Track content length for usage estimation (both modes)
  let totalContentLength = 0;

  // Guard against duplicate [DONE] events — ensures exactly one per stream
  let doneSent = false;

  // Per-stream instances to avoid shared state with concurrent streams
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // Idle timeout state — closes stream if provider stops sending data
  let lastChunkTime = Date.now();
  let idleTimer = null;
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
                const parsed = JSON.parse(trimmed.slice(5).trim());

                const idFixed = fixInvalidId(parsed);

                if (!hasValuableContent(parsed, FORMATS.OPENAI)) {
                  continue;
                }

                const delta = parsed.choices?.[0]?.delta;
                const content = delta?.content || delta?.reasoning_content;
                if (content && typeof content === "string") {
                  totalContentLength += content.length;
                }

                const extracted = extractUsage(parsed);
                if (extracted) {
                  usage = extracted;
                }

                const isFinishChunk = parsed.choices?.[0]?.finish_reason;
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

          // Track content length for estimation (from various formats)
          // Include both regular content and reasoning/thinking content

          // Claude format
          if (parsed.delta?.text) {
            totalContentLength += parsed.delta.text.length;
          }
          if (parsed.delta?.thinking) {
            totalContentLength += parsed.delta.thinking.length;
          }

          // OpenAI format
          if (parsed.choices?.[0]?.delta?.content) {
            totalContentLength += parsed.choices[0].delta.content.length;
          }
          if (parsed.choices?.[0]?.delta?.reasoning_content) {
            totalContentLength += parsed.choices[0].delta.reasoning_content.length;
          }

          // Gemini format - may have multiple parts
          if (parsed.candidates?.[0]?.content?.parts) {
            for (const part of parsed.candidates[0].content.parts) {
              if (part.text && typeof part.text === "string") {
                totalContentLength += part.text.length;
              }
            }
          }

          // Extract usage
          const extracted = extractUsage(parsed);
          if (extracted) state.usage = extracted; // Keep original usage for logging

          // Translate: targetFormat -> openai -> sourceFormat
          const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

          // Log OpenAI intermediate chunks (if available)
          if ((translated as any)?._openaiIntermediate) {
            for (const item of (translated as any)._openaiIntermediate) {
              const openaiOutput = formatSSE(item, FORMATS.OPENAI);
              reqLogger?.appendOpenAIChunk?.(openaiOutput);
            }
          }

          if (translated?.length > 0) {
            for (const item of translated) {
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

            // Estimate usage if provider didn't return valid usage (PASSTHROUGH is always OpenAI format)
            if (!hasValidUsage(usage) && totalContentLength > 0) {
              usage = estimateUsage(body, totalContentLength, FORMATS.OPENAI);
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
            // Notify caller for call log persistence
            if (onComplete) {
              try {
                onComplete({ status: 200, usage });
              } catch {}
            }
            return;
          }

          // Translate mode: process remaining buffer
          if (buffer.trim()) {
            const parsed = parseSSELine(buffer.trim());
            if (parsed && !parsed.done) {
              const translated = translateResponse(targetFormat, sourceFormat, parsed, state);

              // Log OpenAI intermediate chunks
              if ((translated as any)?._openaiIntermediate) {
                for (const item of (translated as any)._openaiIntermediate) {
                  const openaiOutput = formatSSE(item, FORMATS.OPENAI);
                  reqLogger?.appendOpenAIChunk?.(openaiOutput);
                }
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
          if ((flushed as any)?._openaiIntermediate) {
            for (const item of (flushed as any)._openaiIntermediate) {
              const openaiOutput = formatSSE(item, FORMATS.OPENAI);
              reqLogger?.appendOpenAIChunk?.(openaiOutput);
            }
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
          // Notify caller for call log persistence
          if (onComplete) {
            try {
              onComplete({ status: 200, usage: state?.usage });
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
  targetFormat,
  sourceFormat,
  provider = null,
  reqLogger = null,
  toolNameMap = null,
  model = null,
  connectionId = null,
  body = null,
  onComplete = null,
  apiKeyInfo = null
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
  provider = null,
  reqLogger = null,
  model = null,
  connectionId = null,
  body = null,
  onComplete = null,
  apiKeyInfo = null
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
