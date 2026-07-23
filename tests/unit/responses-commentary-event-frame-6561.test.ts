/**
 * Regression test for #6561 (follow-up to #6199 / #6232).
 *
 * The upstream Responses-compatible SSE stream is a real `event: <type>\ndata:
 * <json>\n\n` frame, not a bare `data:` line. The passthrough loop in
 * open-sse/utils/stream.ts buffers the `event:` line into
 * `passthroughEventPrefix` (via `.remember()`) and only clears/prefixes it when
 * a `data:` line is actually forwarded (`prefixData()`/`clearPendingPassthroughEvent()`).
 *
 * The #6199 commentary-drop `continue;` branches (stream.ts ~1337 / ~1351) never
 * called `clearPendingPassthroughEvent()` before skipping the `data:` line. So the
 * buffered `event:` line survived and got flushed alone on the next blank line
 * (stream.ts ~1200-1207), producing an event-only SSE frame with NO `data:` line
 * — which is exactly what the OpenAI Python SDK chokes on (`json.loads("")`).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commentary-6561-"));
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

// Real upstream frames carry BOTH an `event:` line and a `data:` line, unlike
// the #6199 regression test's bare `data:`-only helper.
function sseFrame(eventType: string, payload: object): string {
  return `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
}

function buildResponsesStreamWithEventLines(): string[] {
  return [
    sseFrame("response.created", {
      type: "response.created",
      response: { id: "resp_6561", output: [] },
    }),
    // --- commentary item (internal, must be dropped when filtering) ---
    sseFrame("response.output_item.added", {
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
    sseFrame("response.content_part.added", {
      type: "response.content_part.added",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      part: { type: "output_text", text: "" },
    }),
    sseFrame("response.output_text.delta", {
      type: "response.output_text.delta",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      delta: COMMENTARY_TEXT,
    }),
    sseFrame("response.output_text.done", {
      type: "response.output_text.done",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      text: COMMENTARY_TEXT,
    }),
    sseFrame("response.output_item.done", {
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
    sseFrame("response.output_item.added", {
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
    sseFrame("response.output_text.delta", {
      type: "response.output_text.delta",
      output_index: 1,
      item_id: "msg_final",
      content_index: 0,
      delta: FINAL_TEXT,
    }),
    sseFrame("response.output_item.done", {
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
  ];
}

const PASSTHROUGH_RESPONSES_OPTIONS = {
  mode: "passthrough",
  provider: "openai",
  clientResponseFormat: "openai-responses",
};

test("#6561: dropping commentary via event+data frames must not leave event-only frames", async () => {
  const output = await readTransformed(buildResponsesStreamWithEventLines(), {
    ...PASSTHROUGH_RESPONSES_OPTIONS,
    dropResponsesCommentary: true,
  });

  // Sanity: the original #6199 leak is indeed fixed — no commentary text leaks.
  assert.ok(!output.includes(COMMENTARY_TEXT), "commentary text must not leak");

  // Split the raw SSE text into frames (separated by a blank line) and find any
  // frame that has an `event:` line but NO `data:` line — that is the bug.
  const frames = output.split("\n\n").filter((f) => f.trim().length > 0);
  const eventOnlyFrames = frames.filter((f) => /^event:/m.test(f) && !/^data:/m.test(f));

  assert.deepEqual(
    eventOnlyFrames,
    [],
    `expected no event-only (data-less) SSE frames, got:\n${JSON.stringify(eventOnlyFrames, null, 2)}`
  );

  // The final answer must still be forwarded correctly with its data line intact.
  assert.ok(output.includes(FINAL_TEXT), "final answer text must be forwarded");
});
