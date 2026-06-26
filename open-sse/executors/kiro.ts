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
  startEmitted: boolean;
  stopSeen: boolean;
  hasToolCalls: boolean;
  toolCallIndex: number;
  seenToolIds: Map<string, number>;
  toolArgsEmitted: Map<string, string>;
  toolArgsBuffered: Map<string, { toolIndex: number; canonical: string }>;
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

// Full per-frame message-CRC validation is O(frame bytes) and runs for EVERY frame of
// every Kiro response on the main thread. The transport is TLS-protected and the 8-byte
// prelude CRC already guards framing, so the full-message CRC is redundant overhead that
// contributes to the CPU-runaway on large/long generations. Keep it opt-in for debugging.
const KIRO_VERIFY_FULL_CRC = process.env.KIRO_VERIFY_FULL_CRC === "true";

function crc32(buf: Uint8Array) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC32_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Flush buffered tool arguments at finish boundaries.
 *
 * Kiro/CodeWhisperer streams toolUseEvent.input as PARTIAL OBJECTS that grow over time
 * (e.g. {command:"cat /home"} then {command:"cat /home/wxsys"}). Re-stringifying each one
 * and emitting it as an OpenAI argument delta produces overlapping prefixes that
 * concatenate into unparseable garbage downstream ("Unterminated string").
 *
 * Fix: defer object-form payloads into state.toolArgsBuffered keyed by toolCallId, keep
 * only the latest canonical, and emit ONCE here as the complete arguments string (the
 * final object is the source of truth — intermediate states are noise). String-form
 * payloads are already concatenable deltas and are emitted incrementally.
 */
export function flushBufferedToolArgs(
  state: Pick<KiroStreamState, "toolArgsBuffered" | "toolArgsEmitted">,
  controller: { enqueue: (chunk: Uint8Array) => void },
  ctx: { responseId: string; created: number; model: string }
): void {
  if (!state.toolArgsBuffered || state.toolArgsBuffered.size === 0) return;
  const { responseId, created, model } = ctx;
  for (const [toolCallId, info] of state.toolArgsBuffered) {
    const alreadyEmitted = state.toolArgsEmitted.get(toolCallId) || "";
    if (info.canonical && info.canonical !== alreadyEmitted) {
      const argsChunk: JsonRecord = {
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
                  index: info.toolIndex,
                  function: { arguments: info.canonical },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      };
      controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(argsChunk)}\n\n`));
      state.toolArgsEmitted.set(toolCallId, info.canonical);
    }
  }
  state.toolArgsBuffered.clear();
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
 * Resolve the AWS region for a Kiro/CodeWhisperer connection. Enterprise AWS IAM Identity
 * Center accounts are region-bound: the access token, the Q Developer profile ARN and the
 * runtime endpoint must all match the region the IdC instance lives in (e.g. eu-central-1).
 * A request signed for one region is rejected by another ("bearer token is invalid"), and a
 * regional profileArn sent to us-east-1 fails with "Improperly formed request". Falls back to
 * the region embedded in the profileArn, then us-east-1 (the AWS Builder ID default).
 */
export function resolveKiroRegion(
  credentials: { providerSpecificData?: unknown } | null | undefined
): string {
  const psd = (credentials?.providerSpecificData || {}) as Record<string, unknown>;
  const region = typeof psd.region === "string" ? psd.region.trim().toLowerCase() : "";
  if (region) return region;
  const arn = typeof psd.profileArn === "string" ? psd.profileArn.toLowerCase() : "";
  const match = arn.match(/^arn:aws:codewhisperer:([a-z0-9-]+):/);
  return match ? match[1] : "us-east-1";
}

/**
 * CodeWhisperer/Amazon Q runtime host for a region. us-east-1 keeps the legacy
 * codewhisperer.us-east-1 host (AWS Builder ID); other regions use the regional Amazon Q
 * endpoint q.{region}.amazonaws.com — codewhisperer.{region}.amazonaws.com does not resolve
 * for non-us-east-1 regions.
 */
export function kiroRuntimeHost(region: string): string {
  return region === "us-east-1"
    ? "https://codewhisperer.us-east-1.amazonaws.com"
    : `https://q.${region}.amazonaws.com`;
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
    const b = body as Record<string, unknown>;

    // Kiro API is strict and rejects any unknown top-level fields (like 'tools', 'stream', 'model', etc.)
    // We only preserve the fields specifically built by the openai-to-kiro translator.
    const kiroPayload: Record<string, unknown> = {};
    if (b.conversationState !== undefined) kiroPayload.conversationState = b.conversationState;
    if (b.profileArn !== undefined) kiroPayload.profileArn = b.profileArn;
    if (b.inferenceConfig !== undefined) kiroPayload.inferenceConfig = b.inferenceConfig;

    // Fallback: if somehow conversationState isn't there, return the rest without model
    // (for backward compatibility if something else bypasses the translator)
    if (!kiroPayload.conversationState) {
      const { model: _model, ...rest } = b;
      return rest;
    }

    return kiroPayload;
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
    // Route to the region-specific CodeWhisperer/Amazon Q endpoint. Enterprise IAM Identity
    // Center accounts (e.g. eu-central-1) are rejected by the default us-east-1 host; only the
    // regional endpoint accepts the region-bound token + profileArn.
    const region = resolveKiroRegion(credentials);
    const url = `${kiroRuntimeHost(region)}/generateAssistantResponse`;
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
      startEmitted: false,
      stopSeen: false,
      hasToolCalls: false,
      toolCallIndex: 0,
      seenToolIds: new Map(),
      toolArgsEmitted: new Map(),
      toolArgsBuffered: new Map(),
    };

    const transformStream = new TransformStream(
      {
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

            // Emit a role-only start chunk on the FIRST successfully-parsed AWS
            // EventStream frame. CodeWhisperer sends framing/metadata events before
            // the first content token, and on large/agentic contexts the gap before
            // that first `assistantResponseEvent` can be many seconds. The backend
            // stream-readiness gate (ensureStreamReadiness) holds the ENTIRE response
            // from the client until it observes a useful SSE frame, so without an
            // early frame the client sees a frozen connection for that whole window
            // (up to STREAM_READINESS_TIMEOUT_MS — 180s as configured by VibeProxy),
            // then a burst — the "minutes instead of seconds, not streaming" symptom.
            // A role-only `chat.completion.chunk` is a non-ping structured payload, so
            // it satisfies hasStreamReadinessSignal and hands the stream off
            // immediately. Mirrors the early lifecycle frame other executors already
            // emit (Claude message_start / OpenAI response.created). The downstream
            // idle timeout still guards genuine post-start stalls.
            if (!state.startEmitted) {
              state.startEmitted = true;
              const startChunk: JsonRecord = {
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  {
                    index: 0,
                    delta: { role: "assistant" },
                    finish_reason: null,
                  },
                ],
              };
              chunkIndex++;
              controller.enqueue(TEXT_ENCODER.encode(`data: ${JSON.stringify(startChunk)}\n\n`));
            }

            const eventType = event.headers[":event-type"] || "";

            // Track total content length for token estimation
            if (!state.totalContentLength) state.totalContentLength = 0;
            if (!state.contextUsagePercentage) state.contextUsagePercentage = 0;

            // Handle assistantResponseEvent
            if (eventType === "assistantResponseEvent") {
              const content =
                typeof event.payload?.content === "string" ? event.payload.content : "";
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
                  controller.enqueue(
                    TEXT_ENCODER.encode(`data: ${JSON.stringify(startChunk)}\n\n`)
                  );
                } else {
                  toolIndex = state.seenToolIds.get(toolCallId);
                }

                if (toolInput !== undefined) {
                  if (typeof toolInput === "string") {
                    // String-form payloads are already concatenable incremental deltas —
                    // emit immediately and track what we've sent.
                    state.toolArgsEmitted.set(
                      toolCallId,
                      (state.toolArgsEmitted.get(toolCallId) || "") + toolInput
                    );

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
                                  arguments: toolInput,
                                },
                              },
                            ],
                          },
                          finish_reason: null,
                        },
                      ],
                    };
                    chunkIndex++;
                    controller.enqueue(
                      TEXT_ENCODER.encode(`data: ${JSON.stringify(argsChunk)}\n\n`)
                    );
                  } else if (typeof toolInput === "object" && toolInput !== null) {
                    // Object-form payloads are PARTIAL OBJECTS that grow over time. Buffer
                    // the latest canonical and flush once at a finish boundary, otherwise the
                    // overlapping JSON prefixes concatenate into unparseable garbage.
                    state.toolArgsBuffered.set(toolCallId, {
                      toolIndex,
                      canonical: JSON.stringify(toolInput),
                    });
                  }
                }
              }
            }

            // Handle messageStopEvent
            if (eventType === "messageStopEvent") {
              flushBufferedToolArgs(state, controller, { responseId, created, model });
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
          // Flush any buffered tool arguments (partial-object payloads) before finishing —
          // idempotent against toolArgsEmitted if messageStopEvent already flushed them.
          flushBufferedToolArgs(state, controller, { responseId, created, model });

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
      },
      { highWaterMark: 16384 },
      { highWaterMark: 16384 }
    );

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

      if (!result || result.error) return result;

      // If client was re-registered (expired/invalid clientId/clientSecret after DB import,
      // TTL expiry, or browser conflict), update providerSpecificData with new credentials (#2524).
      if (result._newClientId) {
        const updatedPsd = {
          ...(credentials.providerSpecificData || {}),
          clientId: result._newClientId,
          clientSecret: result._newClientSecret,
          clientSecretExpiresAt: result._newClientSecretExpiresAt,
        };
        return {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn,
          providerSpecificData: updatedPsd,
        };
      }

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

    // Message CRC covers bytes [0..totalLength-5] (everything except the CRC itself).
    // Skipped by default (O(frame bytes) per frame) — the prelude CRC above already
    // validates framing and the stream is TLS-protected. Enable KIRO_VERIFY_FULL_CRC=true
    // to restore full validation for debugging corrupted-stream issues.
    if (KIRO_VERIFY_FULL_CRC) {
      const messageCRC = view.getUint32(data.length - 4, false);
      const computedMessageCRC = crc32(data.slice(0, data.length - 4));
      if (messageCRC !== computedMessageCRC) {
        console.warn(
          `[Kiro] Message CRC mismatch: expected ${messageCRC}, got ${computedMessageCRC} — skipping corrupted frame`
        );
        return null;
      }
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
