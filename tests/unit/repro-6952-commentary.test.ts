/**
 * TDD repro for #6952: commentary-phase output leaks in TRANSLATE mode.
 *
 * Background: #6199/#6561 added a stateful commentary-phase filter
 * (`shouldDropResponsesCommentaryEvent`) but wired it only into
 * `createSSEStream`'s PASSTHROUGH branch. The TRANSLATE-mode branch (an
 * openai-responses upstream translated into another client format, e.g.
 * codex routes streaming into Claude Code) called `translateResponse()` on
 * every raw chunk without checking `phase`, so `phase: "commentary"`
 * scratchpad text — duplicate prose and narrated tool-call arguments — leaked
 * into the client-visible text block, right alongside the real final answer
 * and the real function_call.
 *
 * This test drives `createSSEStream({ mode: "translate", targetFormat:
 * "openai-responses", sourceFormat: "claude" })` with a realistic upstream
 * sequence: a commentary item (duplicate prose + narrated tool-call JSON),
 * a real final-answer item, and a real function_call — then asserts the
 * translated Claude-shaped SSE stream contains the final prose exactly once,
 * never the commentary text, and still carries the real tool call.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commentary-6952-"));
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

const COMMENTARY_TEXT = "narrating the tool call before actually making it";
const COMMENTARY_ARGS_JSON = '{"path":"/etc/passwd","reason":"scratchpad narration"}';
const FINAL_TEXT = "Here is the final answer for the user.";
const TOOL_NAME = "read_file";
const TOOL_ARGS_JSON = '{"path":"/tmp/real.txt"}';

function sse(event: object): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

// Upstream openai-responses sequence: commentary item (prose + narrated tool
// args) -> real final-answer item -> real function_call.
function buildResponsesStream(): string[] {
  return [
    sse({ type: "response.created", response: { id: "resp_6952", output: [] } }),
    // --- commentary item (internal scratchpad, must never reach the client) ---
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
      type: "response.output_text.delta",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      delta: COMMENTARY_ARGS_JSON,
    }),
    sse({
      type: "response.output_text.done",
      output_index: 0,
      item_id: "msg_commentary",
      content_index: 0,
      text: COMMENTARY_TEXT + COMMENTARY_ARGS_JSON,
    }),
    sse({
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "msg_commentary",
        type: "message",
        role: "assistant",
        phase: "commentary",
        content: [{ type: "output_text", text: COMMENTARY_TEXT + COMMENTARY_ARGS_JSON }],
      },
    }),
    // --- real final-answer item (must always be forwarded, exactly once) ---
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
    // --- real function_call (must always be forwarded) ---
    sse({
      type: "response.output_item.added",
      output_index: 2,
      item: {
        id: "fc_real",
        type: "function_call",
        call_id: "call_real_1",
        name: TOOL_NAME,
        arguments: "",
      },
    }),
    sse({
      type: "response.function_call_arguments.delta",
      output_index: 2,
      item_id: "fc_real",
      delta: TOOL_ARGS_JSON,
    }),
    sse({
      type: "response.output_item.done",
      output_index: 2,
      item: {
        id: "fc_real",
        type: "function_call",
        call_id: "call_real_1",
        name: TOOL_NAME,
        arguments: TOOL_ARGS_JSON,
      },
    }),
    sse({
      type: "response.completed",
      response: {
        id: "resp_6952",
        output: [
          {
            id: "msg_final",
            type: "message",
            role: "assistant",
            phase: "final",
            content: [{ type: "output_text", text: FINAL_TEXT }],
          },
          {
            id: "fc_real",
            type: "function_call",
            call_id: "call_real_1",
            name: TOOL_NAME,
            arguments: TOOL_ARGS_JSON,
          },
        ],
        usage: { input_tokens: 10, output_tokens: 20 },
      },
    }),
  ];
}

const TRANSLATE_RESPONSES_TO_CLAUDE_OPTIONS = {
  mode: "translate",
  targetFormat: "openai-responses",
  sourceFormat: "claude",
  provider: "openai",
};

test("TRANSLATE mode drops commentary-phase text before translateResponse (#6952)", async () => {
  const output = await readTransformed(buildResponsesStream(), {
    ...TRANSLATE_RESPONSES_TO_CLAUDE_OPTIONS,
    dropResponsesCommentary: true,
  });

  assert.ok(
    !output.includes(COMMENTARY_TEXT),
    "commentary-phase prose must not reach the translated client stream"
  );
  assert.ok(
    !output.includes(COMMENTARY_ARGS_JSON),
    "commentary-phase narrated tool-call JSON must not reach the translated client stream"
  );

  // The final prose must appear exactly once — not once from commentary
  // duplication and once from the real final item.
  const finalTextOccurrences = output.split(FINAL_TEXT).length - 1;
  assert.equal(
    finalTextOccurrences,
    1,
    `expected prose exactly once in the translated stream, got ${finalTextOccurrences}`
  );

  // The real tool call must still be forwarded (arguments are JSON-escaped inside
  // an `input_json_delta` SSE frame, so match on the unescaped path fragment).
  assert.ok(
    output.includes("/tmp/real.txt"),
    "the real function_call arguments must be forwarded"
  );
  assert.ok(output.includes(TOOL_NAME), "the real function_call name must be forwarded");
});

test("TRANSLATE mode passes commentary through when dropping is disabled (gate/regression) (#6952)", async () => {
  const output = await readTransformed(buildResponsesStream(), {
    ...TRANSLATE_RESPONSES_TO_CLAUDE_OPTIONS,
    dropResponsesCommentary: false,
  });

  assert.ok(
    output.includes(COMMENTARY_TEXT),
    "with the flag disabled, commentary text must still pass through untouched"
  );
  assert.ok(output.includes(FINAL_TEXT), "the final answer text must still be forwarded");
});
