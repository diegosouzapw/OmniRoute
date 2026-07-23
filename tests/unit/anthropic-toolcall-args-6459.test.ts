/**
 * Regression test for #6459: tool-call arguments render as
 * `[object Object][object Object]` in the user-visible transcript when the
 * upstream provider delivers the FULL `tool_calls[].function.arguments` value
 * as an already-parsed JSON object (not a JSON-encoded string), which is what
 * some Anthropic-shape-compatible backends do instead of following the OpenAI
 * streaming contract.
 *
 * Before the fix, `appendToolCallArgumentDelta()` treated any non-string
 * `incoming` fragment as an empty string, so the accumulated `argBuffer`
 * never picked up the object at all — `openaiToClaudeResponse()` (the
 * translator that builds the live /anthropic SSE stream, see
 * `open-sse/translator/response/openai-to-claude.ts`) then emitted no
 * `input_json_delta` for that chunk, and the client is left to coerce
 * whatever partial data it has via string concatenation/`String(object)`,
 * which is exactly how `[object Object]` sequences end up in the transcript.
 *
 * The fix: JSON.stringify() a non-string, non-null object/array fragment
 * instead of discarding it, so the assembled `partial_json` is always valid
 * JSON that parses back into the original structured value.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";

function createState() {
  return { toolCalls: new Map() };
}

function flatten(items: unknown[][]) {
  return items.flatMap((item) => item || []);
}

function assembleToolUseInput(events: Array<Record<string, unknown>>) {
  const jsonDeltas = events.filter(
    (e) => e?.type === "content_block_delta" && (e.delta as Record<string, unknown>)?.type === "input_json_delta"
  );
  const assembled = jsonDeltas
    .map((e) => (e.delta as Record<string, unknown>).partial_json as string)
    .join("");
  return assembled;
}

test("#6459: tool-call arguments delivered as a structured object (not a JSON string) render as the real object, not [object Object]", () => {
  const state = createState();

  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-6459",
      model: "auto/claude-opus",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_6459",
                type: "function",
                function: { name: "AskUserQuestion", arguments: "" },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    state
  );

  // Non-conformant upstream: the FULL arguments value arrives as an already-
  // parsed JS object (mirroring a nested tool_use.input structure), not a
  // JSON-encoded string fragment.
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-6459",
      model: "auto/claude-opus",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                function: {
                  arguments: {
                    questions: [
                      { header: "Deploy target", options: [{ label: "staging" }] },
                      { header: "Confirm rollback", options: [{ label: "yes" }, { label: "no" }] },
                    ],
                  },
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    state
  );

  const events = flatten([chunk1, chunk2]) as Array<Record<string, unknown>>;
  const assembled = assembleToolUseInput(events);

  assert.ok(assembled.length > 0, "expected at least one input_json_delta with the tool args");
  assert.ok(
    !assembled.includes("[object Object]"),
    `assembled partial_json leaked a stringified-object coercion: ${assembled}`
  );

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(assembled);
  } catch {
    assert.fail(`assembled partial_json is not valid JSON — arguments object was corrupted: ${assembled}`);
  }

  assert.ok(Array.isArray(parsed.questions), "questions array must survive as structured data");
  assert.equal(parsed.questions.length, 2);
  assert.equal((parsed.questions[0] as Record<string, unknown>).header, "Deploy target");
  assert.equal((parsed.questions[1] as Record<string, unknown>).header, "Confirm rollback");
});

test("#6459 no-regression: a plain text-only turn still translates normally", () => {
  const state = createState();

  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-6459-text",
      model: "auto/claude-opus",
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-6459-text",
      model: "auto/claude-opus",
      choices: [{ index: 0, delta: { content: "Hello, world!" }, finish_reason: null }],
    },
    state
  );
  const chunk3 = openaiToClaudeResponse(
    {
      id: "chatcmpl-6459-text",
      model: "auto/claude-opus",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    state
  );

  const events = flatten([chunk1, chunk2, chunk3]) as Array<Record<string, unknown>>;
  const textDeltas = events.filter(
    (e) => e?.type === "content_block_delta" && (e.delta as Record<string, unknown>)?.type === "text_delta"
  );

  assert.equal(textDeltas.length, 1);
  assert.equal((textDeltas[0].delta as Record<string, unknown>).text, "Hello, world!");
});
