/**
 * GrokWebExecutor — Grok Web Session Provider
 *
 * Routes requests through Grok's internal NDJSON API using an X/Grok
 * subscription SSO cookie, translating between OpenAI chat completions
 * format and Grok's internal protocol.
 *
 * Derived from:
 *   - grok2api-merged (model mappings, payload structure, statsig, processor)
 *   - GrokProxy / GrokBridge (cookie auth, streaming token extraction)
 *   - grok-web-api (response types, chat options)
 *   - Grok API Research Report (headers, Cloudflare bypass techniques)
 */

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  mergeAbortSignals,
  type ExecuteInput,
} from "./base.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

const GROK_CHAT_API = "https://grok.com/rest/app-chat/conversations/new";
const GROK_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

// ─── Model mappings ─────────────────────────────────────────────────────────
// Grok Web exposes UI modes, not stable public model IDs. Keep OmniRoute model
// IDs mapped directly to Grok's modeId field.

interface GrokModelInfo {
  modeId: string;
  isThinking: boolean;
}

const MODEL_MAP: Record<string, GrokModelInfo> = {
  auto: { modeId: "auto", isThinking: false },
  fast: { modeId: "fast", isThinking: false },
  expert: { modeId: "expert", isThinking: true },
  heavy: { modeId: "heavy", isThinking: true },
  "grok-420-computer-use-sa": { modeId: "grok-420-computer-use-sa", isThinking: true },

  // Legacy aliases retained for manually-entered model IDs.
  "grok-4": { modeId: "auto", isThinking: false },
  "grok-4.1-fast": { modeId: "fast", isThinking: false },
  "grok-4.1-expert": { modeId: "expert", isThinking: true },
  "grok-4-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.20": { modeId: "expert", isThinking: true },
  "grok-4.20-heavy": { modeId: "heavy", isThinking: true },
  "grok-4.3": { modeId: "grok-420-computer-use-sa", isThinking: true },
  "grok-4-3-thinking-1129": { modeId: "grok-420-computer-use-sa", isThinking: true },
};

// ─── Statsig ID generation ──────────────────────────────────────────────────

function randomString(length: number, alphanumeric = false): string {
  const chars = alphanumeric
    ? "abcdefghijklmnopqrstuvwxyz0123456789"
    : "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateStatsigId(): string {
  const msg =
    Math.random() < 0.5
      ? `e:TypeError: Cannot read properties of null (reading 'children["${randomString(5, true)}"]')`
      : `e:TypeError: Cannot read properties of undefined (reading '${randomString(10)}')`;
  return btoa(msg);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── OpenAI message → Grok query translation ───────────────────────────────

function parseOpenAIMessages(messages: Array<Record<string, unknown>>): string {
  const parts: string[] = [];
  let lastUserIdx = -1;

  // Extract text from each message
  const extracted: Array<{ role: string; text: string }> = [];

  for (const msg of messages) {
    let role = String(msg.role || "user");
    if (role === "developer") role = "system";

    let content = "";
    if (typeof msg.content === "string") {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = (msg.content as Array<Record<string, unknown>>)
        .filter((c) => c.type === "text")
        .map((c) => String(c.text || ""))
        .join(" ");
    }
    if (!content.trim()) continue;
    extracted.push({ role, text: content });
  }

  // Find last user message index
  for (let i = extracted.length - 1; i >= 0; i--) {
    if (extracted[i].role === "user") {
      lastUserIdx = i;
      break;
    }
  }

  // Build combined message — last user message is raw, others are prefixed
  for (let i = 0; i < extracted.length; i++) {
    const { role, text } = extracted[i];
    if (i === lastUserIdx) {
      parts.push(text);
    } else {
      parts.push(`${role}: ${text}`);
    }
  }

  return parts.join("\n\n");
}

// ─── NDJSON stream types ────────────────────────────────────────────────────

interface GrokStreamResponse {
  token?: string;
  responseId?: string;
  llmInfo?: { modelHash?: string };
  modelResponse?: {
    message?: string;
    responseId?: string;
    generatedImageUrls?: string[];
    metadata?: { llm_info?: { modelHash?: string } };
    pipelineToken?: string;
  };
}

interface GrokStreamEvent {
  result?: { response?: GrokStreamResponse };
  error?: { message?: string; code?: string };
}

// ─── NDJSON parsing ─────────────────────────────────────────────────────────

async function* readGrokNdjsonEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<GrokStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);

        if (!line) continue;
        try {
          yield JSON.parse(line) as GrokStreamEvent;
        } catch {
          // Skip non-JSON lines
        }
      }
    }

    // Flush remaining buffer
    buffer += decoder.decode();
    const remaining = buffer.trim();
    if (remaining) {
      try {
        yield JSON.parse(remaining) as GrokStreamEvent;
      } catch {
        // ignore
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// ─── Content extraction ─────────────────────────────────────────────────────

interface ContentChunk {
  delta?: string;
  thinking?: string;
  fingerprint?: string;
  responseId?: string;
  fullMessage?: string;
  error?: string;
  done?: boolean;
}

async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  isThinkingModel: boolean,
  signal?: AbortSignal | null
): AsyncGenerator<ContentChunk> {
  let fingerprint = "";
  let responseId = "";
  let thinkOpened = false;

  for await (const event of readGrokNdjsonEvents(eventStream, signal)) {
    // Error handling
    if (event.error) {
      yield { error: event.error.message || `Grok error: ${event.error.code}`, done: true };
      return;
    }

    const resp = event.result?.response;
    if (!resp) continue;

    // Extract metadata
    if (resp.llmInfo?.modelHash && !fingerprint) {
      fingerprint = resp.llmInfo.modelHash;
    }
    if (resp.responseId) {
      responseId = resp.responseId;
    }

    // modelResponse = final/complete response
    if (resp.modelResponse) {
      const mr = resp.modelResponse;

      // Close thinking block if open
      if (thinkOpened && isThinkingModel) {
        if (mr.message) {
          yield { thinking: mr.message };
        }
        thinkOpened = false;
      }

      // Extract final message
      if (mr.message) {
        yield { fullMessage: mr.message, fingerprint, responseId };
      }

      // Extract fingerprint from metadata
      if (mr.metadata?.llm_info?.modelHash) {
        fingerprint = mr.metadata.llm_info.modelHash;
      }
      continue;
    }

    // Streaming token
    if (resp.token != null) {
      yield { delta: resp.token, fingerprint, responseId };
    }
  }

  yield { done: true, fingerprint, responseId };
}

// ─── OpenAI SSE format builders ─────────────────────────────────────────────

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  isThinkingModel: boolean,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        // Initial role chunk
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                { index: 0, delta: { role: "assistant" }, finish_reason: null, logprobs: null },
              ],
            })
          )
        );

        let fp = "";

        for await (const chunk of extractContent(eventStream, isThinkingModel, signal)) {
          if (chunk.fingerprint) fp = chunk.fingerprint;

          if (chunk.error) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: `[Error: ${chunk.error}]` },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            break;
          }

          if (chunk.thinking) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { reasoning_content: chunk.thinking },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
            continue;
          }

          if (chunk.done) break;

          if (chunk.delta) {
            controller.enqueue(
              encoder.encode(
                sseChunk({
                  id: cid,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  system_fingerprint: fp || null,
                  choices: [
                    {
                      index: 0,
                      delta: { content: chunk.delta },
                      finish_reason: null,
                      logprobs: null,
                    },
                  ],
                })
              )
            );
          }
        }

        // Stop chunk
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: fp || null,
              choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            sseChunk({
              id: cid,
              object: "chat.completion.chunk",
              created,
              model,
              system_fingerprint: null,
              choices: [
                {
                  index: 0,
                  delta: {
                    content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                  },
                  finish_reason: "stop",
                  logprobs: null,
                },
              ],
            })
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } finally {
        controller.close();
      }
    },
  });
}

async function buildNonStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  isThinkingModel: boolean,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullContent = "";
  let fingerprint = "";
  const thinkingParts: string[] = [];

  for await (const chunk of extractContent(eventStream, isThinkingModel, signal)) {
    if (chunk.fingerprint) fingerprint = chunk.fingerprint;

    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "GROK_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.thinking) {
      thinkingParts.push(chunk.thinking);
      continue;
    }
    if (chunk.done) break;
    if (chunk.fullMessage) {
      fullContent = chunk.fullMessage;
    } else if (chunk.delta) {
      fullContent += chunk.delta;
    }
  }

  const msg: Record<string, unknown> = { role: "assistant", content: fullContent };
  if (thinkingParts.length > 0) {
    msg.reasoning_content = thinkingParts.join("\n");
  }

  const promptTokens = Math.ceil(fullContent.length / 4);
  const completionTokens = Math.ceil(fullContent.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: fingerprint || null,
      choices: [{ index: 0, message: msg, finish_reason: "stop", logprobs: null }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class GrokWebExecutor extends BaseExecutor {
  constructor() {
    super("grok-web", { id: "grok-web", baseUrl: GROK_CHAT_API });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    upstreamExtraHeaders,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown>).messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Missing or empty messages array", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Resolve model → Grok Web mode
    const modelInfo = MODEL_MAP[model];
    if (!modelInfo) {
      log?.info?.("GROK-WEB", `Unmapped model ${model}, defaulting to auto mode`);
    }
    const { modeId, isThinking } = modelInfo || MODEL_MAP.auto;

    // Parse OpenAI messages → single Grok message string
    const message = parseOpenAIMessages(messages);
    if (!message.trim()) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Empty query after processing", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers: {}, transformedBody: body };
    }

    // Build Grok request payload
    const grokPayload: Record<string, unknown> = {
      temporary: true,
      modeId,
      message: message,
      fileAttachments: [],
      imageAttachments: [],
      disableSearch: false,
      enableImageGeneration: false,
      returnImageBytes: false,
      returnRawGrokInXaiRequest: false,
      enableImageStreaming: false,
      imageGenerationCount: 0,
      forceConcise: false,
      toolOverrides: {},
      enableSideBySide: true,
      sendFinalMetadata: true,
      isReasoning: false,
      disableTextFollowUps: false,
      disableMemory: true,
      forceSideBySide: false,
      isAsyncChat: false,
      disableSelfHarmShortCircuit: false,
      deviceEnvInfo: {
        darkModeEnabled: false,
        devicePixelRatio: 2,
        screenWidth: 2056,
        screenHeight: 1329,
        viewportWidth: 2056,
        viewportHeight: 1083,
      },
    };

    // Build headers
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    const headers: Record<string, string> = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Baggage:
        "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Origin: "https://grok.com",
      Pragma: "no-cache",
      Referer: "https://grok.com/",
      "Sec-Ch-Ua": '"Google Chrome";v="147", "Chromium";v="147", "Not(A:Brand";v="24"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"macOS"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": GROK_USER_AGENT,
      "x-statsig-id": generateStatsigId(),
      "x-xai-request-id": crypto.randomUUID(),
      traceparent: `00-${traceId}-${spanId}-00`,
    };

    // Cookie auth — strip "sso=" prefix if user included it
    if (credentials.apiKey) {
      let token = credentials.apiKey;
      if (token.startsWith("sso=")) token = token.slice(4);
      headers["Cookie"] = `sso=${token}`;
    }

    // Apply upstream extra headers
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    log?.info?.("GROK-WEB", `Query to ${model} (modeId=${modeId}), len=${message.length}`);

    // Apply fetch timeout
    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;

    // Fetch from Grok
    const fetchOptions: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(grokPayload),
      signal: combinedSignal,
    };

    let response: Response;
    try {
      response = await fetch(GROK_CHAT_API, fetchOptions);
    } catch (err) {
      log?.error?.("GROK-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const errResp = new Response(
        JSON.stringify({
          error: {
            message: `Grok connection failed: ${err instanceof Error ? err.message : String(err)}`,
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    if (!response.ok) {
      const status = response.status;
      let errMsg = `Grok returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        errMsg =
          "Grok auth failed — SSO cookie may be expired. Re-paste your sso cookie value from grok.com.";
      } else if (status === 429) {
        errMsg = "Grok rate limited. Wait a moment and retry, or rotate cookies.";
      }
      log?.warn?.("GROK-WEB", errMsg);
      const errResp = new Response(
        JSON.stringify({
          error: { message: errMsg, type: "upstream_error", code: `HTTP_${status}` },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    if (!response.body) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Grok returned empty response body", type: "upstream_error" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-grok-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        response.body,
        model,
        cid,
        created,
        isThinking,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        response.body,
        model,
        cid,
        created,
        isThinking,
        signal
      );
    }

    return { response: finalResponse, url: GROK_CHAT_API, headers, transformedBody: grokPayload };
  }
}
