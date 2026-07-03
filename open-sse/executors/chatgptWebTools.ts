// Tool-call emulation helpers for web-cookie executors (#5240, #5927).
//
// Web-cookie providers (chatgpt-web, perplexity-web, ...) have no native
// function calling. When the OpenAI request carries `tools`, the prompt-side
// shim (`prepareToolMessages` in ../translator/webTools.ts) injects a `<tool>`
// contract; on the response side we parse `<tool>{...}</tool>` blocks back
// into OpenAI `tool_calls`.
//
// The whole tool-mode orchestration lives here — provider-agnostic — so each
// (frozen) executor only gains an import + a single delegating call. Despite
// the filename (kept for git-blame continuity from #5240, the first caller),
// this module is shared: `buildToolModeResponse()` accepts an `idSeed` so
// every provider gets its own `tool_calls[].id` prefix.

import { buildToolAwareResult } from "../translator/webTools.ts";

const SSE_HEADERS: Record<string, string> = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no",
};

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

/**
 * Parse any `<tool>` blocks in a buffered JSON completion's assistant content
 * into OpenAI tool_calls and rewrite the choice. On parse failure the original
 * body passes through untouched.
 */
async function applyToolCallsToJsonResponse(
  response: Response,
  requestedTools: unknown,
  idSeed: string
): Promise<Response> {
  const bodyText = await response.text();
  try {
    const json = JSON.parse(bodyText);
    const rawContent = json?.choices?.[0]?.message?.content || "";
    const { content, toolCalls, finishReason } = buildToolAwareResult(
      rawContent,
      requestedTools,
      idSeed
    );
    if (toolCalls) {
      json.choices[0].message = { role: "assistant", content: null, tool_calls: toolCalls };
      json.choices[0].finish_reason = finishReason;
    } else {
      json.choices[0].message.content = content;
    }
    return new Response(JSON.stringify(json), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(bodyText, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * Replay an already-built OpenAI `chat.completion` object as a buffered SSE
 * stream: a role chunk, then a single terminal chunk carrying either
 * `delta.tool_calls` + `finish_reason: "tool_calls"` or plain content +
 * `finish_reason: "stop"`. No token-by-token streaming while tools are active.
 */
function toolCompletionToSseStream(
  completion: Record<string, unknown>,
  cid: string,
  created: number,
  model: string
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const choice = (completion?.choices as Array<Record<string, unknown>> | undefined)?.[0] ?? {};
  const message = (choice.message as Record<string, unknown>) ?? {};
  const finishReason = (choice.finish_reason as string) ?? "stop";
  const chunk = (delta: Record<string, unknown>, fr: string | null): Uint8Array =>
    encoder.encode(
      sseChunk({
        id: cid,
        object: "chat.completion.chunk",
        created,
        model,
        system_fingerprint: null,
        choices: [{ index: 0, delta, finish_reason: fr, logprobs: null }],
      })
    );

  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(chunk({ role: "assistant" }, null));
      const delta = message.tool_calls
        ? { tool_calls: message.tool_calls }
        : { content: (message.content as string) ?? "" };
      controller.enqueue(chunk(delta, finishReason));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

/**
 * Tool mode: parse `<tool>` blocks in an already-buffered JSON completion into
 * tool_calls, then return either the JSON completion (non-streaming) or a
 * terminal SSE replay of it (streaming).
 */
export async function buildToolModeResponse(
  bufferedJson: Response,
  requestedTools: unknown,
  stream: boolean,
  meta: { cid: string; created: number; model: string; idSeed?: string }
): Promise<Response> {
  const jsonResponse = await applyToolCallsToJsonResponse(
    bufferedJson,
    requestedTools,
    meta.idSeed ?? "cgpt"
  );
  if (!stream) return jsonResponse;
  const completion = await jsonResponse.json();
  return new Response(toolCompletionToSseStream(completion, meta.cid, meta.created, meta.model), {
    status: 200,
    headers: SSE_HEADERS,
  });
}
