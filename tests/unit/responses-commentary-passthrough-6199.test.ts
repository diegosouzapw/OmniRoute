/**
 * TDD test for fix(sse) #6199: Responses API passthrough leaks commentary-phase
 * output text to clients.
 *
 * Background: #186 made the passthrough sanitizer format-aware and started SKIPPING
 * the chat sanitizer for `response.*` events. Side effect: the streaming passthrough
 * path never applied the commentary filter, so an assistant message item announced
 * with `phase: "commentary"` (internal-only) had its `response.output_text.delta`
 * chunks forwarded straight to the client.
 *
 * The commentary drop is STATEFUL: a `response.output_item.added` announcing a
 * commentary item records its `output_index` / item id, then the matching
 * `response.output_text.delta` / `response.output_item.done` events are dropped
 * together (the delta events do not carry the `phase` themselves).
 *
 * Gated by the RESPONSES_PASSTHROUGH_DROP_COMMENTARY feature flag (default ON). The
 * transform accepts an explicit `dropResponsesCommentary` boolean option so this test
 * can exercise both the flag-on (drop) and flag-off (passthrough) behavior without
 * touching env/DB state.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commentary-6199-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

const textEncoder = new TextEncoder();

async function readTransformed(chunks: string[], options: object): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(textEncoder.encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

const COMMENTARY_TEXT = "internal chain-of-thought commentary that must stay hidden";
const FINAL_TEXT = "The final answer visible to the user.";

function sse(event: object): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

// A realistic Responses SSE sequence: a commentary item (index 0) followed by a
// real assistant answer item (index 1).
function buildResponsesStream(): string[] {
  return [
    sse({ type: "response.created", response: { id: "resp_6199", output: [] } }),
    // --- commentary item (internal, must be dropped when filtering) ---
    sse({
      type: "response.output_item.added",
      output_index: 0,
      item: {
        id: "msg_commentary",
        type: "message",
        role: "assistant",
        phase: "commentary",
        content: [],
      },
    }),
    sse({
      type: "response.output_text.delta",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      delta: COMMENTARY_TEXT,
    }),
    sse({
      type: "response.output_text.done",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      text: COMMENTARY_TEXT,
    }),
    sse({
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "msg_commentary",
        type: "message",
        role: "assistant",
        phase: "commentary",
        content: [{ type: "output_text", text: COMMENTARY_TEXT }],
      },
    }),
    // --- final answer item (must always be forwarded) ---
    sse({
      type: "response.output_item.added",
      output_index: 1,
      item: {
        id: "msg_final",
        type: "message",
        role: "assistant",
        phase: "final",
        content: [],
      },
    }),
    sse({
      type: "response.output_text.delta",
      output_index: 1,
      item_id: "msg_final",
      content_index: 0,
      delta: FINAL_TEXT,
    }),
    sse({
      type: "response.output_text.done",
      output_index: 1,
      item_id: "msg_final",
      content_index: 0,
      text: FINAL_TEXT,
    }),
    sse({
      type: "response.output_item.done",
      output_index: 1,
      item: {
        id: "msg_final",
        type: "message",
        role: "assistant",
        phase: "final",
        content: [{ type: "output_text", text: FINAL_TEXT }],
      },
    }),
    sse({
      type: "response.completed",
      response: {
        id: "resp_6199",
        output: [
          {
            id: "msg_final",
            type: "message",
            role: "assistant",
            phase: "final",
            content: [{ type: "output_text", text: FINAL_TEXT }],
          },
        ],
      },
    }),
  ];
}

const PASSTHROUGH_RESPONSES_OPTIONS = {
  mode: "passthrough",
  provider: "openai",
  clientResponseFormat: "openai-responses",
};

test("commentary-phase output text is NOT forwarded when dropping is enabled (#6199)", async () => {
  const output = await readTransformed(buildResponsesStream(), {
    ...PASSTHROUGH_RESPONSES_OPTIONS,
    dropResponsesCommentary: true,
  });

  assert.ok(
    !output.includes(COMMENTARY_TEXT),
    "commentary-phase text must be dropped from the passthrough stream"
  );
  // The commentary item announcement / completion must not leak either.
  assert.ok(
    !output.includes("msg_commentary"),
    "commentary item events must be dropped entirely"
  );
  // The real answer must always be forwarded.
  assert.ok(output.includes(FINAL_TEXT), "the final answer text must be forwarded");
  assert.ok(output.includes("msg_final"), "the final answer item must be forwarded");
});

test("commentary passes through when dropping is disabled (gate/regression) (#6199)", async () => {
  const output = await readTransformed(buildResponsesStream(), {
    ...PASSTHROUGH_RESPONSES_OPTIONS,
    dropResponsesCommentary: false,
  });

  assert.ok(
    output.includes(COMMENTARY_TEXT),
    "with the flag disabled, commentary text must pass through untouched"
  );
  assert.ok(output.includes(FINAL_TEXT), "the final answer text must still be forwarded");
});
