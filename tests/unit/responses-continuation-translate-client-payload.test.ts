/**
 * Regression test for the "previous_response_id continuation never engages
 * for a real Ping-style default-combo request" gap -- the translate-mode
 * sibling of responses-continuation-passthrough-client-payload.test.ts.
 *
 * Verified against real production traffic (2026-08-21): every "default"
 * combo request sampled from Ping's live gateway had sourceFormat
 * "openai-responses" / targetFormat "openai" -- i.e. translate mode, not
 * passthrough, because the pooled combo's actual upstreams (OpenRouter,
 * Mistral, Gemini, NVIDIA, ...) are chat-completions-native, not
 * Responses-API-native. The passthrough fix alone does not help this path.
 *
 * Unlike passthrough, translate mode's emitTranslatedClientItem() (the sole
 * place a translated, client-visible item is ever sent) already pushes
 * every item into clientPayloadCollector unconditionally -- so gap #1 from
 * the passthrough bug (missing collection) does not apply here. Only gap #2
 * applied: onComplete's clientPayload was still built from the synthesized
 * chat-completions-shaped responseBody regardless of what the client
 * actually requested, exactly like the passthrough sibling before its fix.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

const textEncoder = new TextEncoder();

type OnCompletePayload = {
  status: number;
  clientPayload?: unknown;
  providerPayload?: unknown;
};

async function runTranslate(
  chunks: string[]
): Promise<{ output: string; onCompletePayload: OnCompletePayload | undefined }> {
  let onCompletePayload: OnCompletePayload | undefined;
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
      controller.close();
    },
  });
  const output = await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        // Matches real production traffic exactly: a chat-completions-native
        // upstream (targetFormat) translated into Responses shape for a
        // Responses-API client (sourceFormat).
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        provider: "openrouter",
        model: "nemotron-3-ultra-free",
        body: { input: [{ type: "message", role: "user", content: "hi" }] },
        onComplete: (payload: OnCompletePayload) => {
          onCompletePayload = payload;
        },
      })
    )
  ).text();
  return { output, onCompletePayload };
}

function chatCompletionsChunk(delta: Record<string, unknown>, finishReason: string | null = null) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-real-provider-id",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

test("translate mode's onComplete.clientPayload carries a real Responses id + output for a plain-text reply", async () => {
  const { onCompletePayload } = await runTranslate([
    chatCompletionsChunk({ role: "assistant", content: "" }),
    chatCompletionsChunk({ content: "hello there" }),
    chatCompletionsChunk({}, "stop"),
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
    })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  assert.ok(onCompletePayload, "onComplete must fire");
  const clientPayload = onCompletePayload!.clientPayload as
    | { id?: unknown; summary?: { id?: unknown; output?: unknown } }
    | undefined;
  assert.ok(clientPayload, "clientPayload must be present");

  const id = clientPayload!.id ?? clientPayload!.summary?.id;
  const output = clientPayload!.summary?.output;
  assert.ok(
    typeof id === "string" && id.length > 0,
    "a real Responses id must survive into clientPayload, not be missing"
  );
  assert.ok(
    Array.isArray(output) && output.length > 0,
    "a real output array must survive into clientPayload"
  );
});

test("translate mode still forwards the translated reply to the client unchanged (no regression)", async () => {
  const { output } = await runTranslate([
    chatCompletionsChunk({ role: "assistant", content: "" }),
    chatCompletionsChunk({ content: "hello again" }),
    chatCompletionsChunk({}, "stop"),
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
    })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  assert.ok(
    output.includes("hello again"),
    "the client-visible translated Responses SSE stream must still carry the reply"
  );
  assert.match(output, /response\.completed/, "a terminal Responses event must still be emitted");
});
