// Repro for issue #14208 — deepseek-web "DSML" invoke/parameter markup is not parsed into
// tool_calls. Unlike the malformed-trailing-garbage shape fixed by PR #13226
// (`<tool>{json}` immediately followed by corrupted pseudo-tags), this shape is a
// COMPLETE, well-nested block using a different tag vocabulary entirely:
//   <｜｜DSML｜｜ calls> <｜｜DSML｜｜ invoke name="write">
//     <｜｜DSML｜｜ parameter name="file_path" string="true">...</｜｜DSML｜｜ parameter>
//     <｜｜DSML｜｜ parameter name="content" string="true">...</｜｜DSML｜｜ parameter>
//   </｜｜DSML｜｜ invoke> </｜｜DSML｜｜ calls>
//
// `parseDeepSeekToolCalls` only recognizes tags literally named `tool`/`tool_call`
// (TAG_TOKEN_RE in deepseekWebTools.ts), so it never tokenizes this text and falls back to
// the canonical `parseToolCallsFromText`, which requires a literal `<tool>`/`<tool_call`
// substring — also absent here. Net result: toolCalls stays null and the raw DSML text is
// returned as content, exactly matching the issue's reported symptom.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDeepSeekToolCalls } from "../../open-sse/translator/deepseekWebTools.ts";

const RAW = `<｜｜DSML｜｜ calls> <｜｜DSML｜｜ invoke name="write"> <｜｜DSML｜｜ parameter name="file_path" string="true">D:\\Projects\\maxnadeev.ru\\1.txt</｜｜DSML｜｜ parameter> <｜｜DSML｜｜ parameter name="content" string="true">Random text.</｜｜DSML｜｜ parameter> </｜｜DSML｜｜ invoke> </｜｜DSML｜｜ calls>`;

test("issue #14208: deepseek-web DSML invoke/parameter markup is parsed into a tool call", () => {
  const requestedTools = [
    {
      type: "function",
      function: { name: "write", parameters: { properties: { file_path: {}, content: {} } } },
    },
  ];
  const { content, toolCalls } = parseDeepSeekToolCalls(RAW, "call", requestedTools);

  assert.ok(toolCalls, "expected the DSML invoke block to be parsed into tool_calls, got null");
  assert.equal(toolCalls!.length, 1);
  assert.equal(toolCalls![0].function.name, "write");
  const args = JSON.parse(toolCalls![0].function.arguments);
  assert.equal(args.file_path, "D:\\Projects\\maxnadeev.ru\\1.txt");
  assert.equal(args.content, "Random text.");

  // The raw DSML markers must not leak into the content shown to the user.
  assert.ok(!content.includes("DSML"), `raw DSML markup leaked into content: ${content}`);
});
