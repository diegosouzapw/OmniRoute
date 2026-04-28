import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { refreshKiroToken } from "../services/tokenRefresh.ts";

type JsonRecord = Record<string, unknown>;

type UsageSummary = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
};

type KiroStreamState = {
  endDetected: boolean;
  finishEmitted: boolean;
  stopSeen: boolean;
  hasToolCalls: boolean;
  toolCallIndex: number;
  seenToolIds: Map<string, number>;
  totalContentLength?: number;
  contextUsagePercentage?: number;
  hasContextUsage?: boolean;
  hasMeteringEvent?: boolean;
  usage?: UsageSummary;
};

type EventFrame = {
  headers: Record<string, string>;
  payload: JsonRecord | null;
};

class ByteQueue {
  private chunks: Uint8Array[] = [];
  private headOffset = 0;
  length = 0;

  push(chunk: Uint8Array) {
    if (!(chunk instanceof Uint8Array) || chunk.length === 0) return;
    this.chunks.push(chunk);
    this.length += chunk.length;
  }

  peekUint32BE(offset = 0): number | null {
    if (this.length < offset + 4) return null;

    let value = 0;
    for (let i = 0; i < 4; i++) {
      value = (value << 8) | this.byteAt(offset + i);
    }
    return value >>> 0;
  }

  read(length: number): Uint8Array | null {
    if (length < 0 || this.length < length) return null;

    const output = new Uint8Array(length);
    let written = 0;

    while (written < length) {
      const head = this.chunks[0];
      const available = head.length - this.headOffset;
      const take = Math.min(available, length - written);
      output.set(head.subarray(this.headOffset, this.headOffset + take), written);
      written += take;
      this.headOffset += take;
      this.length -= take;

      if (this.headOffset >= head.length) {
        this.chunks.shift();
        this.headOffset = 0;
      }
    }

    return output;
  }

  private byteAt(offset: number): number {
    let remaining = offset;
    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i];
      const start = i === 0 ? this.headOffset : 0;
      const available = chunk.length - start;
      if (remaining < available) {
        return chunk[start + remaining];
      }
      remaining -= available;
    }
    return 0;
  }
}

// ── CRC32 lookup table (IEEE polynomial, no dependency) ──
const CRC32_TABLE = new Uint32Array(256);
const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC32_TABLE[i] = c >>> 0;
}

function crc32(buf: Uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC32_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildKiroFinishChunk(
  state: KiroStreamState,
  responseId: string,
  created: number,
  model: string,
  includeUsage: boolean
): JsonRecord {
  const finishChunk: JsonRecord = {
    id: responseId,
    object: "chat.completion.chunk",
    created,
    model,
    choices: [
      {
        index: 0,
        delta: {},
        finish_reason: state.hasToolCalls ? "tool_calls" : "stop",
      },
    ],
  };

  if (includeUsage && state.usage) {
    finishChunk.usage = state.usage;
  }

  return finishChunk;
}

function ensureKiroUsage(state: KiroStreamState) {
  if (state.usage) return;

  const estimatedOutputTokens =
    state.totalContentLength && state.totalContentLength > 0
      ? Math.max(1, Math.floor(state.totalContentLength / 4))
      : 0;

  const estimatedInputTokens =
    state.contextUsagePercentage && state.contextUsagePercentage > 0
      ? Math.floor((state.contextUsagePercentage * 200000) / 100)
      : 0;

  if (estimatedInputTokens <= 0 && estimatedOutputTokens <= 0) return;

  state.usage = {
    prompt_tokens: estimatedInputTokens,
    completion_tokens: estimatedOutputTokens,
    total_tokens: estimatedInputTokens + estimatedOutputTokens,
  };
}

/**
 * KiroExecutor - Executor for Kiro AI (AWS CodeWhisperer)
 * Uses AWS CodeWhisperer streaming API with AWS EventStream binary format
 */
export class KiroExecutor extends BaseExecutor {
  constructor(providerId = "kiro") {
    super(providerId, PROVIDERS[providerId] || PROVIDERS.kiro);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    void stream;
    const headers = {
      ...this.config.headers,
      "Amz-Sdk-Request": "attempt=1; max=3",
      "Amz-Sdk-Invocation-Id": uuidv4(),
      "x-amzn-bedrock-cache-control": "enable",
      "anthropic-beta": "prompt-caching-2024-07-31",
    };

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }

    return headers;
  }

  transformRequest(model: string, body: unknown, stream: boolean, credentials: unknown): unknown {
    void stream;
    void credentials;
    // Kiro uses conversationState.currentMessage.userInputMessage.modelId,
    // not a top-level "model" field. chatCore injects translatedBody.model
    // which Kiro API rejects as unknown top-level field.
    const { model: _model, ...rest } = body as Record<string, unknown>;
    return rest;
  }

  /**
   * Custom execute for Kiro - handles AWS EventStream binary response
   */
  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const url = this.buildUrl(model, stream, 0);
    const headers = this.buildHeaders(credentials, stream);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
    const transformedBody = await this.transformRequest(model, body, stream, credentials);

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal,
    });

    if (!response.ok) {
      return { response, url, headers, transformedBody };
    }

    // For Kiro, we need to transform the binary EventStream to SSE
    // Create a TransformStream to convert binary to SSE text
    const transformedResponse = this.transformEventStreamToSSE(response, model);

    return { response: transformedResponse, url, headers, transformedBody };
  }

  /**
   * Transform AWS EventStream binary response to SSE text stream
   * Using TransformStream instead of ReadableStream.pull() to avoid Workers timeout
   */
  transformEventStreamToSSE(response: Response, model: string) {
    const buffer = new ByteQueue();
    let chunkIndex = 0;
    const responseId = `chatcmpl-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);
    const state: KiroStreamState = {
      endDetected: false,
      finishEmitted: false,
      stopSeen: false,
      hasToolCalls: false,
      toolCallIndex: 0,
      seenToolIds: new Map(),
    };

    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        buffer.push(chunk);

        // Parse events from buffer
        let iterations = 0;
        const maxIterations = 1000;
        while (buffer.length >= 16 && iterations < maxIterations) {
          iterations++;
          const totalLength = buffer.peekUint32BE(0);

          if (!totalLength || totalLength < 16 || totalLength > buffer.length) break;

          const eventData = buffer.read(totalLength);
          if (!eventData) break;

          const event = parseEventFrame(eventData);
          if (!event) continue;

          const eventType = event.headers[":event-type"] || "";

          // Track total content length for token estimation
          if (!state.totalContentLength) state.totalContentLength = 0;
          if (!state.contextUsagePercentage) state.contextUsagePercentage = 0;

          // Handle assistantResponseEvent
          if (eventType === "assistantResponseEvent") {
            const content = typeof event.payload?.content === "string" ? event.payload.content : "";
            if (!content) {
              continue;
            }
            state.totalContentLength += content.length;

            const chunk: JsonRecord = {
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: chunkIndex === 0 ? { role: "assistant", content } : { content },
                  finish_reason: null,
                },
              ],
            };
            chunkIndex++;
            controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          }

          // Handle codeEvent
          if (eventType === "codeEvent" && event.payload?.content) {
            const chunk: JsonRecord = {
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [
                {
                  index: 0,
                  delta: { content: event.payload.content },
                  finish_reason: null,
                },
              ],
            };
            chunkIndex++;
            controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          }

          // Handle toolUseEvent
          if (eventType === "toolUseEvent" && event.payload) {
            state.hasToolCalls = true;
            const toolUse = event.payload;
            const toolUses = Array.isArray(toolUse) ? toolUse : [toolUse];

            for (const singleToolUse of toolUses) {
              const toolCallId = singleToolUse.toolUseId || `call_${Date.now()}`;
              const toolName = singleToolUse.name || "";
              const toolInput = singleToolUse.input;

              let toolIndex;
              const isNewTool = !state.seenToolIds.has(toolCallId);

              if (isNewTool) {
                toolIndex = state.toolCallIndex++;
                state.seenToolIds.set(toolCallId, toolIndex);

                const startChunk = {
                  id: responseId,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  choices: [
                    {
                      index: 0,
                      delta: {
                        ...(chunkIndex === 0 ? { role: "assistant" } : {}),
                        tool_calls: [
                          {
                            index: toolIndex,
                            id: toolCallId,
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
                chunkIndex++;
                controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(startChunk)}\n\n`));
              } else {
                toolIndex = state.seenToolIds.get(toolCallId);
              }

              if (toolInput !== undefined) {
                let argumentsStr;

                if (typeof toolInput === "string") {
                  argumentsStr = toolInput;
                } else if (typeof toolInput === "object") {
                  argumentsStr = JSON.stringify(toolInput);
                } else {
                  continue;
                }

                const argsChunk = {
                  id: responseId,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  choices: [
                    {
                      index: 0,
                      delta: {
                        tool_calls: [
                          {
                            index: toolIndex,
                            function: {
                              arguments: argumentsStr,
                            },
                          },
                        ],
                      },
                      finish_reason: null,
                    },
                  ],
                };
                chunkIndex++;
                controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(argsChunk)}\n\n`));
              }
            }
          }

          // Handle messageStopEvent
          if (eventType === "messageStopEvent") {
            state.stopSeen = true;
          }

          // Handle contextUsageEvent to extract contextUsagePercentage
          if (eventType === "contextUsageEvent") {
            const contextUsage =
              typeof event.payload?.contextUsagePercentage === "number"
                ? event.payload.contextUsagePercentage
                : 0;
            if (contextUsage <= 0) {
              continue;
            }
            state.contextUsagePercentage = contextUsage;
            // Mark that we received context usage event
            state.hasContextUsage = true;
          }

          // Handle meteringEvent - mark that we received it
          if (eventType === "meteringEvent") {
            state.hasMeteringEvent = true;
          }

          // Handle metricsEvent for token usage
          if (eventType === "metricsEvent") {
            // Extract usage data from metricsEvent payload
            const metrics = event.payload?.metricsEvent || event.payload;
            if (metrics && typeof metrics === "object") {
              const inputTokens =
                typeof (metrics as JsonRecord).inputTokens === "number"
                  ? ((metrics as JsonRecord).inputTokens as number)
                  : 0;
              const outputTokens =
                typeof (metrics as JsonRecord).outputTokens === "number"
                  ? ((metrics as JsonRecord).outputTokens as number)
                  : 0;

              const cacheReadTokens =
                typeof (metrics as JsonRecord).cacheReadTokens === "number"
                  ? ((metrics as JsonRecord).cacheReadTokens as number)
                  : 0;

              const cacheCreationTokens =
                typeof (metrics as JsonRecord).cacheCreationTokens === "number"
                  ? ((metrics as JsonRecord).cacheCreationTokens as number)
                  : 0;

              if (inputTokens > 0 || outputTokens > 0) {
                state.usage = {
                  prompt_tokens: inputTokens,
                  completion_tokens: outputTokens,
                  total_tokens: inputTokens + outputTokens,
                  ...(cacheReadTokens > 0 && { cache_read_input_tokens: cacheReadTokens }),
                  ...(cacheCreationTokens > 0 && {
                    cache_creation_input_tokens: cacheCreationTokens,
                  }),
                };
              }
            }
          }
        }

        if (iterations >= maxIterations) {
          console.warn("[Kiro] Max iterations reached in event parsing");
        }
      },

      flush(controller) {
        // Emit finish chunk if not already sent
        if (!state.finishEmitted) {
          state.finishEmitted = true;
          ensureKiroUsage(state);
          const finishChunk = buildKiroFinishChunk(state, responseId, created, model, true);
          controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(finishChunk)}\n\n`));
        }

        // Send final done message
        controller.enqueue(TEXT_ENCODER.encode("data: [DONE]\n\n"));
      },
    });

    // Pipe response body through transform stream
    const transformedStream = response.body.pipeThrough(transformStream);

    return new Response(transformedStream, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  async refreshCredentials(credentials: ProviderCredentials, log?: ExecutorLog | null) {
    if (!credentials.refreshToken) return null;

    try {
      // Use centralized refreshKiroToken function (handles both AWS SSO OIDC and Social Auth)
      const result = await refreshKiroToken(
        credentials.refreshToken,
        credentials.providerSpecificData,
        log
      );

      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      log?.error?.("TOKEN", `Kiro refresh error: ${err.message}`);
      return null;
    }
  }
}

/**
 * Parse AWS EventStream frame
 */
function parseEventFrame(data: Uint8Array): EventFrame | null {
  try {
    const view = new DataView(data.buffer, data.byteOffset);
    const totalLength = view.getUint32(0, false);
    const headersLength = view.getUint32(4, false);

    // ── CRC32 validation ──
    // Prelude CRC covers bytes [0..7] (totalLength + headersLength)
    const preludeCRC = view.getUint32(8, false);
    const computedPreludeCRC = crc32(data.slice(0, 8));
    if (preludeCRC !== computedPreludeCRC) {
      console.warn(
        `[Kiro] Prelude CRC mismatch: expected ${preludeCRC}, got ${computedPreludeCRC} — skipping corrupted frame`
      );
      return null;
    }

    // Message CRC covers bytes [0..totalLength-5] (everything except the CRC itself)
    const messageCRC = view.getUint32(data.length - 4, false);
    const computedMessageCRC = crc32(data.slice(0, data.length - 4));
    if (messageCRC !== computedMessageCRC) {
      console.warn(
        `[Kiro] Message CRC mismatch: expected ${messageCRC}, got ${computedMessageCRC} — skipping corrupted frame`
      );
      return null;
    }
    // Parse headers
    const headers: Record<string, string> = {};
    let offset = 12; // After prelude
    const headerEnd = 12 + headersLength;

    while (offset < headerEnd && offset < data.length) {
      const nameLen = data[offset];
      offset++;
      if (offset + nameLen > data.length) break;

      const name = TEXT_DECODER.decode(data.subarray(offset, offset + nameLen));
      offset += nameLen;

      const headerType = data[offset];
      offset++;

      if (headerType === 7) {
        // String type
        const valueLen = (data[offset] << 8) | data[offset + 1];
        offset += 2;
        if (offset + valueLen > data.length) break;

        const value = TEXT_DECODER.decode(data.subarray(offset, offset + valueLen));
        offset += valueLen;
        headers[name] = value;
      } else {
        break;
      }
    }

    // Parse payload
    const payloadStart = 12 + headersLength;
    const payloadEnd = data.length - 4; // Exclude message CRC

    let payload: JsonRecord | null = null;
    if (payloadEnd > payloadStart) {
      const payloadStr = TEXT_DECODER.decode(data.subarray(payloadStart, payloadEnd));

      // Skip empty or whitespace-only payloads
      if (!payloadStr || !payloadStr.trim()) {
        return { headers, payload: null };
      }

      try {
        payload = JSON.parse(payloadStr);
      } catch (parseError) {
        const err = parseError instanceof Error ? parseError : new Error(String(parseError));
        // Log parse error for debugging
        console.warn(
          `[Kiro] Failed to parse payload: ${err.message} | payload: ${payloadStr.substring(0, 100)}`
        );
        payload = { raw: payloadStr };
      }
    }

    return { headers, payload };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.warn(`[Kiro] Frame parse error: ${error.message}`);
    return null;
  }
}

export default KiroExecutor;
