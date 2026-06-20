/**
 * Convert an OpenAI Chat Completions stream/response into the Gemini
 * `:streamGenerateContent` / `:generateContent` shape used by the
 * `@google/genai` SDK (Gemini CLI).
 *
 * Why this exists
 * ---------------
 * The `/v1beta/models/{model}:streamGenerateContent` route delegates the
 * actual LLM call to `handleChat`, which always returns OpenAI-format SSE:
 *
 *   data: {"choices":[{"delta":{"content":"Hi"},"finish_reason":null}],...}
 *   data: {"choices":[{"delta":{},"finish_reason":"stop"}],"usage":{...},...}
 *   data: [DONE]
 *
 * `@google/genai` expects Gemini SSE, which has a different chunk shape
 * AND no terminal sentinel — the stream simply closes:
 *
 *   data: {"candidates":[{"content":{"role":"model","parts":[{"text":"Hi"}]},"index":0}]}
 *   data: {"candidates":[{"content":{"role":"model","parts":[{"text":""}]},
 *            "finishReason":"STOP","index":0}],"usageMetadata":{...},"modelVersion":"..."}
 *   (stream closes — no [DONE])
 *
 * Forwarding the raw OpenAI SSE to Gemini CLI made it crash with
 * `SyntaxError: Unexpected token 'D', "[DONE]" is not valid JSON`, because
 * the SDK tries to `JSON.parse("[DONE]")`.
 *
 * Ported from upstream decolua/9router#225 by @SteelMorgan.
 */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/** Map OpenAI finish_reason → Gemini finishReason */
export const OPENAI_TO_GEMINI_FINISH_REASON: Record<string, string> = {
  stop: "STOP",
  length: "MAX_TOKENS",
  tool_calls: "STOP",
  content_filter: "SAFETY",
};

interface OpenAIChoiceDelta {
  content?: string | null;
  reasoning_content?: string | null;
  role?: string;
}

interface OpenAIChoice {
  delta?: OpenAIChoiceDelta;
  finish_reason?: string | null;
}

interface OpenAIUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  completion_tokens_details?: {
    reasoning_tokens?: number;
  };
}

interface OpenAIStreamChunk {
  choices?: OpenAIChoice[];
  usage?: OpenAIUsage | null;
  model?: string;
}

interface GeminiPart {
  text: string;
  thought?: boolean;
}

interface GeminiCandidate {
  content: { role: "model"; parts: GeminiPart[] };
  index: number;
  finishReason?: string;
}

interface GeminiUsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
  thoughtsTokenCount?: number;
}

interface GeminiStreamChunk {
  candidates: GeminiCandidate[];
  usageMetadata?: GeminiUsageMetadata;
  modelVersion?: string;
}

/**
 * Build a Gemini-shape chunk from a single OpenAI delta event.
 *
 * Returns `null` when the event has nothing to forward (pure role-only
 * delta with no content and no finish_reason) so the caller can skip it.
 *
 * Exported for unit testing the per-chunk mapping in isolation.
 */
export function openAIChunkToGeminiChunk(
  parsed: OpenAIStreamChunk,
  fallbackModel: string
): GeminiStreamChunk | null {
  const choice = parsed.choices?.[0];
  if (!choice) return null;

  const delta: OpenAIChoiceDelta = choice.delta || {};

  const parts: GeminiPart[] = [];
  if (delta.reasoning_content) {
    parts.push({ text: String(delta.reasoning_content), thought: true });
  }
  if (delta.content) {
    parts.push({ text: String(delta.content) });
  }

  // Skip pure role-only deltas with no content and no finish signal.
  if (parts.length === 0 && !choice.finish_reason) return null;

  const candidate: GeminiCandidate = {
    content: {
      role: "model",
      parts: parts.length > 0 ? parts : [{ text: "" }],
    },
    index: 0,
  };

  if (choice.finish_reason) {
    candidate.finishReason =
      OPENAI_TO_GEMINI_FINISH_REASON[choice.finish_reason] ?? "STOP";
  }

  const out: GeminiStreamChunk = { candidates: [candidate] };

  // Attach usage + modelVersion on the final chunk (when finish_reason is set).
  if (choice.finish_reason && parsed.usage) {
    const u = parsed.usage;
    const usageMetadata: GeminiUsageMetadata = {
      promptTokenCount: u.prompt_tokens || 0,
      candidatesTokenCount: u.completion_tokens || 0,
      totalTokenCount: u.total_tokens || 0,
    };
    const reasoningTokens = u.completion_tokens_details?.reasoning_tokens;
    if (reasoningTokens) {
      usageMetadata.thoughtsTokenCount = reasoningTokens;
    }
    out.usageMetadata = usageMetadata;
    out.modelVersion = parsed.model || fallbackModel;
  }

  return out;
}

/**
 * Wrap an OpenAI-SSE upstream `Response` and return a new `Response` whose
 * body is the equivalent Gemini SSE stream.
 *
 * Non-OK / no-body responses are passed through unchanged so that callers
 * upstream of the route can surface the error to the client untouched.
 */
export function transformOpenAISSEToGeminiSSE(
  upstreamResponse: Response,
  model: string
): Response {
  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return upstreamResponse;
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  // OpenAI SSE events are delimited by a blank line. A single `chunk` may
  // contain partial lines; carry the trailing fragment over to the next
  // chunk so we never JSON.parse a half-event.
  let buffer = "";

  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      // Last entry may be a partial line — keep it for the next chunk.
      buffer = lines.pop() ?? "";

      for (const rawLine of lines) {
        // Strip a trailing CR from CRLF-terminated upstreams.
        const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
        if (!line.startsWith("data:")) continue;

        const data = line.slice(5).trim();
        // Drop empty lines and the OpenAI `[DONE]` sentinel — Gemini SSE
        // ends by stream close, no sentinel needed.
        if (!data || data === "[DONE]") continue;

        let parsed: OpenAIStreamChunk;
        try {
          parsed = JSON.parse(data) as OpenAIStreamChunk;
        } catch {
          continue;
        }

        const geminiChunk = openAIChunkToGeminiChunk(parsed, model);
        if (!geminiChunk) continue;

        controller.enqueue(encoder.encode("data: " + JSON.stringify(geminiChunk) + "\r\n\r\n"));
      }
    },
    flush(controller) {
      // Drain any final buffered line. Gemini SSE ends on stream close —
      // no `[DONE]` sentinel is emitted.
      const line = buffer.endsWith("\r") ? buffer.slice(0, -1) : buffer;
      buffer = "";
      if (!line.startsWith("data:")) return;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") return;
      let parsed: OpenAIStreamChunk;
      try {
        parsed = JSON.parse(data) as OpenAIStreamChunk;
      } catch {
        return;
      }
      const geminiChunk = openAIChunkToGeminiChunk(parsed, model);
      if (!geminiChunk) return;
      controller.enqueue(encoder.encode("data: " + JSON.stringify(geminiChunk) + "\r\n\r\n"));
    },
  });

  return new Response(upstreamResponse.body.pipeThrough(transform), {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

interface OpenAIMessage {
  content?: string | null;
  reasoning_content?: string | null;
  role?: string;
}

interface OpenAINonStreamChoice {
  message?: OpenAIMessage;
  finish_reason?: string | null;
}

interface OpenAINonStreamResponse {
  candidates?: unknown;
  error?: unknown;
  choices?: OpenAINonStreamChoice[];
  usage?: OpenAIUsage | null;
  model?: string;
}

interface GeminiNonStreamResponse {
  candidates: Array<{
    content: { role: "model"; parts: GeminiPart[] };
    finishReason: string;
    index: number;
  }>;
  modelVersion: string;
  usageMetadata?: GeminiUsageMetadata;
}

/**
 * Convert an OpenAI Chat Completions JSON response into a Gemini
 * `GenerateContentResponse` JSON. Used by the non-streaming
 * `:generateContent` path.
 */
export async function convertOpenAIResponseToGemini(
  response: Response,
  model: string
): Promise<Response> {
  if (!response.ok) return response;

  let body: OpenAINonStreamResponse;
  try {
    body = (await response.json()) as OpenAINonStreamResponse;
  } catch (err) {
    // Body wasn't JSON. Surface a Gemini-shape error so the SDK doesn't
    // choke on an unexpected payload.
    return Response.json(
      { error: { message: sanitizeErrorMessage(err), code: response.status } },
      {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );
  }

  // Already Gemini-shape (some upstreams may pre-translate) — pass through.
  if (body.candidates) {
    return Response.json(body, {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // Surface upstream error objects untouched.
  if (body.error) {
    return Response.json(body, {
      status: response.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const choice = body.choices?.[0];
  if (!choice || !choice.message) {
    return Response.json(body, {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const { message, finish_reason } = choice;

  const parts: GeminiPart[] = [];
  if (message.reasoning_content) {
    parts.push({ text: String(message.reasoning_content), thought: true });
  }
  parts.push({ text: String(message.content ?? "") });

  const finishReason =
    OPENAI_TO_GEMINI_FINISH_REASON[finish_reason ?? "stop"] ?? "STOP";

  const geminiResponse: GeminiNonStreamResponse = {
    candidates: [
      {
        content: { role: "model", parts },
        finishReason,
        index: 0,
      },
    ],
    modelVersion: body.model || model,
  };

  if (body.usage) {
    const u = body.usage;
    const usageMetadata: GeminiUsageMetadata = {
      promptTokenCount: u.prompt_tokens || 0,
      candidatesTokenCount: u.completion_tokens || 0,
      totalTokenCount: u.total_tokens || 0,
    };
    const reasoningTokens = u.completion_tokens_details?.reasoning_tokens;
    if (reasoningTokens) {
      usageMetadata.thoughtsTokenCount = reasoningTokens;
    }
    geminiResponse.usageMetadata = usageMetadata;
  }

  return Response.json(geminiResponse, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}
