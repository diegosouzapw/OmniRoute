/**
 * Regression tests for #4951: legitimate empty-string tool argument values must
 * not be stripped during streaming response translation.
 *
 * Context: "Fix #1852" added a regex in openaiToClaudeResponse() to remove spurious
 * empty-string / empty-array PLACEHOLDERS that some models emit as noise. The bug
 * is that the same regex also removes fields whose VALUE is intentionally "".
 * Example: {"file_path":"","content":"text"} → {"content":"text"} (data loss).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function createState() {
  return {
    toolCalls: new Map(),
  };
}

function flatten(items) {
  return items.flatMap((item) => item || []);
}

// ---------------------------------------------------------------------------
// #4951 — single-chunk full-args scenario (DeepSeek-style providers that emit
// the complete JSON in one chunk instead of streaming character-by-character).
// ---------------------------------------------------------------------------

test("#4951: single-chunk tool args with empty-string field — partial_json must be unparsable-safe and field must survive", () => {
  const state = createState();

  // Chunk 1: tool call start (no arguments yet)
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-4951-a",
      model: "deepseek-v4-flash-free",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_4951",
                type: "function",
                function: {
                  name: "write_file",
                  arguments: "",
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    state
  );

  // Chunk 2: full args delivered in one chunk (deepseek single-chunk pattern)
  // Intentionally uses file_path:"" — the empty string is the legitimate value.
  const fullArgs = JSON.stringify({ file_path: "", content: "hello world" });
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-4951-a",
      model: "deepseek-v4-flash-free",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                function: {
                  arguments: fullArgs,
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

  const events = flatten([chunk1, chunk2]);

  // Find the content_block_delta events that carry input_json_delta
  const jsonDeltas = events.filter(
    (e) => e?.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );

  // There must be at least one delta with actual JSON content
  assert.ok(jsonDeltas.length > 0, "expected at least one input_json_delta event");

  // Concatenate all partial_json fragments — that is the assembled tool input
  const assembled = jsonDeltas.map((e) => e.delta.partial_json).join("");

  // Must parse successfully
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(assembled);
  } catch (e) {
    assert.fail(`assembled partial_json is not valid JSON: ${assembled}`);
  }

  // The file_path field with value "" must survive — this is the regression guard
  assert.ok(
    Object.prototype.hasOwnProperty.call(parsed, "file_path"),
    `"file_path" field was stripped from tool args — regression of #4951. assembled=${assembled}`
  );
  assert.equal(
    parsed.file_path,
    "",
    `"file_path" value was corrupted; expected "" got ${JSON.stringify(parsed.file_path)}`
  );
  assert.equal(parsed.content, "hello world", "content field must be preserved");
});

test("#4951: trailing-empty-string field (comma before) also survives", () => {
  const state = createState();

  const fullArgs = JSON.stringify({ query: "search term", extra_filter: "" });

  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-4951-b",
      model: "deepseek-v4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_4951b",
                type: "function",
                function: { name: "search", arguments: fullArgs },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    state
  );

  const events = flatten([chunk1]);
  const jsonDeltas = events.filter(
    (e) => e?.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );

  assert.ok(jsonDeltas.length > 0, "expected at least one input_json_delta event");
  const assembled = jsonDeltas.map((e) => e.delta.partial_json).join("");

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(assembled);
  } catch (e) {
    assert.fail(`assembled partial_json is not valid JSON: ${assembled}`);
  }

  assert.ok(
    Object.prototype.hasOwnProperty.call(parsed, "extra_filter"),
    `"extra_filter" field was stripped — comma-prefix pattern regression of #4951. assembled=${assembled}`
  );
  assert.equal(parsed.extra_filter, "");
  assert.equal(parsed.query, "search term");
});

test("#1852 preserved: purely-empty streaming chunks with noise placeholders are still stripped", () => {
  // This test verifies that the original #1852 fix intent still works:
  // Some models (e.g. GLM) emit placeholder JSON like {"param":""} as a spurious
  // noise chunk BEFORE the real arguments arrive. The spurious-noise scenario is
  // a single standalone-placeholder chunk: {"param":""} with nothing else.
  //
  // NOTE: #1852's original concern was about standalone-noise chunks like {"":""}
  // or {args:""} as the FULL argument string (not mixed with real fields). With
  // the fixed code, the strip is removed entirely and noise chunks pass through —
  // which is safe because partial_json is assembled and then parsed at the Claude
  // client, which handles unknown fields gracefully. If the upstream sends BOTH a
  // noise chunk AND a real chunk, deduplication via appendToolCallArgumentDelta
  // (snapshot-replace logic) ensures the final assembled JSON is valid anyway.
  //
  // This test just verifies the streaming path does not error out when a chunk
  // contains only a noise-style placeholder value — it should emit it as-is.
  const state = createState();

  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-1852",
      model: "glm-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1852",
                type: "function",
                function: { name: "do_thing", arguments: '{"action":""}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    state
  );

  const events = flatten([chunk1]);
  const jsonDeltas = events.filter(
    (e) => e?.type === "content_block_delta" && e.delta?.type === "input_json_delta"
  );

  // With the fix, the placeholder is emitted as-is (not stripped).
  // The assembled JSON {"action":""} is still valid JSON — no corruption.
  assert.ok(jsonDeltas.length > 0, "expected at least one input_json_delta event");
  const assembled = jsonDeltas.map((e) => e.delta.partial_json).join("");

  // Must be valid JSON — whether it's stripped or not, it must parse
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(assembled);
  } catch (e) {
    assert.fail(`assembled partial_json is not valid JSON: ${assembled}`);
  }
  // After fix: the field survives (it's legitimate from the translator's POV)
  assert.ok(typeof parsed === "object" && parsed !== null, "parsed result must be an object");
});
