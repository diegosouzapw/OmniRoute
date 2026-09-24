import test from "node:test";
import assert from "node:assert/strict";

// Integration: DSML markers that DeepSeek-V4-Flash leaks into the content
// delta must be parsed/scrubbed by the openai-to-claude response translator
// before they reach the Claude client as visible text. Complete <｜DSML｜:Tool>
// blocks become tool_use blocks; stray closing markers (the broken
// 1787566395384-bab9ab case — closers only, finish_reason "stop", no
// tool_calls) are stripped so the client never sees the markers.
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

const FW = "\u{FF5C}"; // full-width vertical line ｜

function createState() {
  return {
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
  };
}

function flatten(items) {
  return items.flatMap((item) => item || []);
}

function allText(result) {
  return result
    .filter((e) => e?.delta?.type === "text_delta")
    .map((e) => e.delta.text)
    .join("");
}

test("translator strips stray DSML closing markers from content delta", () => {
  // The 2026-08-24 broken case: content is ONLY the three stray closers, no
  // opener, tool_calls absent, finish_reason "stop". The client must not
  // receive the markers as visible text.
  const state = createState();
  const markers = `</${FW}DSML${FW}parameter>\n</${FW}DSML${FW}invoke>\n</${FW}DSML${FW}tool_calls>`;
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-stray",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: { content: markers }, finish_reason: null }],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-stray",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    },
    state
  );
  const result = flatten([first, final]);
  const text = allText(result);

  assert.ok(
    !text.includes("DSML"),
    `DSML markers must not reach client, got: ${JSON.stringify(text)}`
  );
  assert.ok(
    !text.includes("｜"),
    `full-width pipe must not reach client, got: ${JSON.stringify(text)}`
  );
});

test("translator keeps echoed preamble and strips only trailing DSML closers", () => {
  // 2026-08-20 case: a real (echoed) text preamble precedes the stray closers.
  // The preamble must be preserved; only the trailing markers removed.
  const state = createState();
  const echo = "# Harness CWD note\n\nsome echoed text.\n";
  const markers = `</${FW}DSML${FW}parameter>\n</${FW}DSML${FW}invoke>\n</${FW}DSML${FW}tool_calls>`;
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-echo",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: { content: echo + markers }, finish_reason: null }],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-echo",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    },
    state
  );
  const result = flatten([first, final]);
  const text = allText(result);

  assert.ok(
    text.includes("# Harness CWD note"),
    `echo preamble preserved, got: ${JSON.stringify(text)}`
  );
  assert.ok(!text.includes("DSML"), `DSML markers stripped, got: ${JSON.stringify(text)}`);
});

test("translator parses a complete DSML block into a tool_use block", () => {
  // 2026-08-18 complete case: <｜DSML｜:Read><path>...</path></｜DSML｜:Read>
  // should become a tool_use block, not visible text.
  const state = createState();
  const block = `<${FW}DSML${FW}:Read>\n<path>images/omniroute.png</path>\n</${FW}DSML${FW}:Read>`;
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-complete",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: { content: block }, finish_reason: null }],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-dsml-complete",
      model: "deepseek-v4-flash",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    },
    state
  );
  const result = flatten([first, final]);
  const text = allText(result);
  const toolUseStarts = result.filter((e) => e?.content_block?.type === "tool_use");

  assert.ok(
    !text.includes("DSML"),
    `DSML markers must not reach client as text, got: ${JSON.stringify(text)}`
  );
  assert.ok(
    toolUseStarts.length >= 1,
    `complete DSML block should produce a tool_use block, got ${JSON.stringify(result.map((e) => e?.type))}`
  );
  assert.equal(toolUseStarts[0].content_block.name, "Read");
});
