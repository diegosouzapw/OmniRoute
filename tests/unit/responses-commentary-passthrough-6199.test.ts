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
  assert.ok(!output.includes("msg_commentary"), "commentary item events must be dropped entirely");
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

test("response.completed always includes total_tokens for strict Codex clients", async () => {
  const output = await readTransformed(
    [
      sse({
        type: "response.completed",
        response: {
          id: "resp_codex_usage",
          status: "completed",
          output: [],
          usage: {
            input_tokens: 88,
            output_tokens: 6,
            input_tokens_details: { cached_tokens: 0 },
            output_tokens_details: { reasoning_tokens: 0 },
          },
        },
      }),
    ],
    PASSTHROUGH_RESPONSES_OPTIONS
  );

  const completedLine = output
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:") && line.includes('"response.completed"'));
  assert.ok(completedLine, "the terminal Responses event must be forwarded");

  const completed = JSON.parse(completedLine.slice(5).trim());
  assert.deepEqual(completed.response.usage, {
    input_tokens: 88,
    output_tokens: 6,
    total_tokens: 94,
    input_tokens_details: { cached_tokens: 0 },
    output_tokens_details: { reasoning_tokens: 0 },
  });
});

test("response.completed normalizes usage when lifecycle echoes are stripped", async () => {
  const output = await readTransformed(
    [
      sse({
        type: "response.completed",
        response: {
          id: "resp_agentrouter_live_shape",
          status: "completed",
          instructions: "echoed upstream instructions",
          tools: [{ type: "function", name: "echoed_tool" }],
          output: [],
          usage: {
            prompt_tokens: 91,
            completion_tokens: 0,
            input_tokens: 91,
            output_tokens: 0,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0,
          },
        },
      }),
    ],
    PASSTHROUGH_RESPONSES_OPTIONS
  );

  const completedLine = output
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:") && line.includes('"response.completed"'));
  assert.ok(completedLine, "the terminal Responses event must be forwarded");

  const completed = JSON.parse(completedLine.slice(5).trim());
  assert.equal("instructions" in completed.response, false);
  assert.equal("tools" in completed.response, false);
  assert.equal(completed.response.usage.total_tokens, 91);
});

test("response.completed synthesizes zero usage when upstream omits usage", async () => {
  const completed = {
    type: "response.completed",
    response: { id: "resp_codex_no_usage", status: "completed", output: [] },
  };
  const output = await readTransformed(
    [`data: ${JSON.stringify(completed)}`],
    PASSTHROUGH_RESPONSES_OPTIONS
  );
  const completedLine = output
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:") && line.includes('"response.completed"'));
  assert.ok(completedLine, "the terminal Responses event must be forwarded");
  const forwarded = JSON.parse(completedLine.slice(5).trim());
  assert.deepEqual(forwarded.response.usage, {
    input_tokens: 0,
    output_tokens: 0,
    total_tokens: 0,
  });
});

test("buffered response.completed normalizes IDs and usage independently", async () => {
  const completed = {
    type: "response.completed",
    response: {
      id: 12345,
      status: "completed",
      output: [],
      usage: { input_tokens: 12, output_tokens: 3 },
    },
  };
  const output = await readTransformed(
    [`data: ${JSON.stringify(completed)}`],
    PASSTHROUGH_RESPONSES_OPTIONS
  );
  const completedLine = output
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:") && line.includes('"response.completed"'));
  assert.ok(completedLine, "the buffered terminal Responses event must be forwarded");

  const forwarded = JSON.parse(completedLine.slice(5).trim());
  assert.equal(forwarded.response.id, "12345");
  assert.deepEqual(forwarded.response.usage, {
    input_tokens: 12,
    output_tokens: 3,
    total_tokens: 15,
  });
});

test("Claude to Responses translation includes canonical Codex usage", async () => {
  const output = await readTransformed(
    [
      sse({
        type: "message_start",
        message: {
          id: "msg_agentrouter_claude",
          type: "message",
          role: "assistant",
          model: "gpt-5.6-sol",
          usage: { input_tokens: 88, output_tokens: 0 },
        },
      }),
      sse({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      }),
      sse({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "probe-ok" },
      }),
      sse({ type: "content_block_stop", index: 0 }),
      sse({
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 6 },
      }),
      sse({ type: "message_stop" }),
    ],
    {
      mode: "translate",
      targetFormat: "claude",
      sourceFormat: "openai-responses",
      provider: "agentrouter",
      body: { model: "agentrouter/gpt-5.6-sol" },
    }
  );
  const completedLine = output
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:") && line.includes('"response.completed"'));
  assert.ok(completedLine, "the translated terminal event must be emitted");
  const completed = JSON.parse(completedLine.slice(5).trim());
  assert.equal(completed.response.usage.input_tokens, 88);
  assert.equal(completed.response.usage.output_tokens, 6);
  assert.equal(completed.response.usage.total_tokens, 94);
});
