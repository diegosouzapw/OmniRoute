/**
 * Regression test for the "previous_response_id continuation never engages
 * through a passthrough Responses-API connection" bug.
 *
 * Root cause (three independent gaps, all in the client-facing path):
 *
 *   1. Passthrough mode's per-event loop only pushed each raw SSE event into
 *      providerPayloadCollector, never clientPayloadCollector -- so for a
 *      plain-text Responses-API reply (no tool calls, no textual-tool-call
 *      conversion), clientPayloadCollector.getEvents() was always empty.
 *   2. onComplete's `clientPayload` was unconditionally built from a
 *      synthesized chat-completions-shaped `responseBody` ({choices: [...]}),
 *      even for a Responses-API client -- so it never carried a real `id` or
 *      Responses-shaped `output`, unlike the sibling `providerPayload` builder
 *      right next to it (which already had the OPENAI_RESPONSES carve-out).
 *   3. clientPayloadCollector.build()'s returned object always nests the
 *      caller-supplied summary under `.summary` (see createStructuredSSECollector
 *      in streamPayloadCollector.ts) -- extractResponsesId in
 *      chatCore/attemptLogging.ts and resolvePreviousResponseState in
 *      src/lib/db/responsesContinuationStore.ts both read `.id`/`.output`
 *      directly, so even a correctly-populated events list produced a
 *      clientResponse whose id/output were invisible to them.
 *
 * Net effect: `call_logs.response_id` was NEVER populated for a passthrough
 * Responses-API reply, so every `previous_response_id` continuation attempt
 * against such a connection failed with a bare HTTP 400
 * ("previous_response_not_found") -- silently, since openclaw-style clients
 * recover by resending full history, so nothing user-visible looked broken.
 *
 * This test exercises only gap #1 and #2 (the stream.ts side) via the real
 * createSSEStream() transform, the same harness used by
 * responses-commentary-passthrough-6199.test.ts. Gap #3's two read-side fixes
 * are covered directly in responses-continuation-store.test.ts (the
 * `.summary.output` fallback) and would need their own extractResponsesId
 * unit coverage if that function is exported for testing.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

const textEncoder = new TextEncoder();

type OnCompletePayload = {
  status: number;
  clientPayload?: unknown;
  providerPayload?: unknown;
};

async function runPassthrough(
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
        mode: "passthrough",
        provider: "openai-compatible",
        clientResponseFormat: "openai-responses",
        sourceFormat: "openai-responses",
        model: "mock-model",
        onComplete: (payload: OnCompletePayload) => {
          onCompletePayload = payload;
        },
      })
    )
  ).text();
  return { output, onCompletePayload };
}

function sse(event: object): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

test("passthrough onComplete's clientPayload carries a real Responses id + output for a plain-text reply", async () => {
  // The minimal shape a real upstream (or a scripted test double) sends for a
  // plain-text reply: a single terminal response.completed frame, no
  // response.created/output_item.added lifecycle events first -- this is
  // exactly what tripped the bug, since it never touched the textual-tool-call
  // conversion path that happened to already push into clientPayloadCollector.
  const { onCompletePayload } = await runPassthrough([
    sse({
      type: "response.completed",
      response: {
        id: "resp_plain_text_1",
        status: "completed",
        output: [
          {
            id: "msg_resp_plain_text_1",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "hello there", annotations: [] }],
          },
        ],
        usage: { input_tokens: 5, output_tokens: 3, total_tokens: 8 },
      },
    }),
  ]);

  assert.ok(onCompletePayload, "onComplete must fire");
  const clientPayload = onCompletePayload!.clientPayload as
    | { id?: unknown; summary?: { id?: unknown; output?: unknown } }
    | undefined;
  assert.ok(clientPayload, "clientPayload must be present");

  // clientPayloadCollector.build() nests the summary; accept either shape so
  // this test survives a future change to the wrapping, but the id/output
  // MUST be findable one way or the other -- that's the actual contract
  // extractResponsesId / resolvePreviousResponseState depend on.
  const id = clientPayload!.id ?? clientPayload!.summary?.id;
  const output = clientPayload!.summary?.output;
  assert.equal(id, "resp_plain_text_1", "the real Responses id must survive into clientPayload");
  assert.ok(Array.isArray(output) && output.length === 1, "the real output array must survive too");
});

test("passthrough forwards the plain-text reply to the client unchanged (no regression)", async () => {
  const { output } = await runPassthrough([
    sse({
      type: "response.completed",
      response: {
        id: "resp_plain_text_2",
        status: "completed",
        output: [
          {
            id: "msg_resp_plain_text_2",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "hello again", annotations: [] }],
          },
        ],
        usage: { input_tokens: 5, output_tokens: 3, total_tokens: 8 },
      },
    }),
  ]);

  assert.ok(output.includes("hello again"), "the client-visible SSE stream must still carry the reply");
  assert.ok(output.includes("resp_plain_text_2"), "the client-visible response id must be unchanged");
});
