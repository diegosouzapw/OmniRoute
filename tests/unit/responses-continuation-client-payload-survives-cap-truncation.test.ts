/**
 * Live incident (2026-09-04): a reasoning-heavy stream pushed 3013 SSE events
 * (mostly tiny reasoning deltas) before its terminal response.completed --
 * blowing past createStructuredSSECollector's 2000-event default cap. The
 * client itself received the real, complete reply (forwarding is unbounded),
 * but onComplete's clientPayload/providerPayload were still being rebuilt
 * from `collector.getEvents()` -- the collector's own RETAINED (cap-dropped)
 * array -- for a Responses-API client, via
 * buildStreamSummaryFromEvents(collector.getEvents(), format, model). The
 * dropped completion event meant that rebuild permanently produced
 * status:"in_progress" / output:[] for a response the client actually
 * received in full: src/lib/db/responsesContinuationStore.ts then had
 * nothing real to reconstruct a later continuation turn from, and
 * /dashboard/conversations had no way to tell this apart from a healthy
 * conversation.
 *
 * Root-cause fix: both stream.ts collectors now read `.getSummary()`
 * (fed live on EVERY push(), see createStructuredSSECollector's
 * CollectorOptions.format doc comment) instead of re-deriving from
 * `.getEvents()` -- strictly equivalent for a stream that never hits the
 * cap, correct instead of silently empty for one that does. This test
 * proves it by genuinely exceeding the real production cap (2000 events),
 * through the real createSSEStream() pipeline, not a shrunk test-only cap.
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
        // Matches the real incident: a chat-completions-native upstream
        // (targetFormat) translated into Responses shape for a Responses-API
        // client (sourceFormat) -- see responses-continuation-translate-client-payload.test.ts's
        // own comment on why this is the real production shape, not passthrough.
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        provider: "openrouter",
        model: "nemotron-3.5-lightning-free",
        body: { input: [{ type: "message", role: "user", content: "think hard" }] },
        onComplete: (payload: OnCompletePayload) => {
          onCompletePayload = payload;
        },
      })
    )
  ).text();
  return { output, onCompletePayload };
}

function reasoningDeltaChunk(i: number) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-real-provider-id",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { reasoning_content: `r${i} ` } }],
  })}\n\n`;
}

test("translate mode's clientPayload/providerPayload survive a stream that exceeds the real production event cap", async () => {
  // 2005 tiny reasoning-delta events: 5 over createStructuredSSECollector's
  // real default (maxEvents=2000) -- the exact live-incident mechanism, not
  // a shrunk test-only cap. The genuine content/finish sequence lands entirely
  // in the dropped tail.
  const reasoningDeltas = Array.from({ length: 2005 }, (_, i) => reasoningDeltaChunk(i));

  const { onCompletePayload } = await runTranslate([
    ...reasoningDeltas,
    `data: ${JSON.stringify({
      id: "chatcmpl-real-provider-id",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { role: "assistant", content: "the real answer" } }],
    })}\n\n`,
    `data: ${JSON.stringify({
      id: "chatcmpl-real-provider-id",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n\n`,
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 2006, total_tokens: 2011 },
    })}\n\n`,
    "data: [DONE]\n\n",
  ]);

  assert.ok(onCompletePayload, "onComplete must fire");
  const clientPayload = onCompletePayload!.clientPayload as
    | { id?: unknown; summary?: { id?: unknown; status?: unknown; output?: unknown } }
    | undefined;
  assert.ok(clientPayload, "clientPayload must be present");

  const status = clientPayload!.summary?.status;
  const output = clientPayload!.summary?.output as Array<Record<string, unknown>> | undefined;
  assert.equal(
    status,
    "completed",
    "status must be the real terminal state, not stuck at in_progress from a dropped completion event"
  );
  assert.ok(
    Array.isArray(output) && output.length > 0,
    "output must reflect the real reply, not the empty array a cap-truncated getEvents() rebuild would produce"
  );
  const text = JSON.stringify(output);
  assert.ok(
    text.includes("the real answer"),
    "the actual final content must be present, not lost to the collector's storage cap"
  );

  // providerPayload gets the identical treatment at the same call site.
  const providerPayload = onCompletePayload!.providerPayload as
    | { summary?: { status?: unknown } }
    | undefined;
  assert.ok(providerPayload, "providerPayload must be present");
});
