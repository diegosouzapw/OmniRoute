// Coverage for the #14208 DSML invoke/parameter normalization in
// open-sse/translator/deepseekWebTools.ts::normalizeDsmlInvokeMarkup (applied at the top of
// parseDeepSeekToolCalls). See issue-14208-deepseek-web-dsml-invoke-format.test.ts for the
// exact reported-payload repro; this file covers the surrounding contract.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDeepSeekToolCalls } from "../../open-sse/translator/deepseekWebTools.ts";

const WRITE_TOOL = [
  {
    type: "function",
    function: { name: "write", parameters: { properties: { file_path: {}, content: {} } } },
  },
];

test("deepseek-web DSML invoke: double-pipe DSML markup with Cyrillic content and a Windows path resolves to a write call", () => {
  const raw = `<｜｜DSML｜｜ calls> <｜｜DSML｜｜ invoke name="write"> <｜｜DSML｜｜ parameter name="file_path" string="true">D:\\Проекты\\файл.txt</｜｜DSML｜｜ parameter> <｜｜DSML｜｜ parameter name="content" string="true">Привет, мир.</｜｜DSML｜｜ parameter> </｜｜DSML｜｜ invoke> </｜｜DSML｜｜ calls>`;

  const { content, toolCalls } = parseDeepSeekToolCalls(raw, "call", WRITE_TOOL);

  assert.ok(toolCalls, "expected a parsed tool call");
  assert.equal(toolCalls!.length, 1);
  assert.equal(toolCalls![0].function.name, "write");
  const args = JSON.parse(toolCalls![0].function.arguments);
  assert.equal(args.file_path, "D:\\Проекты\\файл.txt");
  assert.equal(args.content, "Привет, мир.");
  assert.ok(!content.includes("DSML"), `raw DSML markup leaked into content: ${content}`);
});

test("deepseek-web DSML invoke: single-pipe defensive variant also resolves to a write call", () => {
  const raw = `<｜DSML｜ calls> <｜DSML｜ invoke name="write"> <｜DSML｜ parameter name="file_path" string="true">notes.txt</｜DSML｜ parameter> <｜DSML｜ parameter name="content" string="true">hello</｜DSML｜ parameter> </｜DSML｜ invoke> </｜DSML｜ calls>`;

  const { content, toolCalls } = parseDeepSeekToolCalls(raw, "call", WRITE_TOOL);

  assert.ok(toolCalls, "expected a parsed tool call for the single-pipe DSML variant");
  assert.equal(toolCalls!.length, 1);
  assert.equal(toolCalls![0].function.name, "write");
  const args = JSON.parse(toolCalls![0].function.arguments);
  assert.equal(args.file_path, "notes.txt");
  assert.equal(args.content, "hello");
  assert.ok(!content.includes("DSML"), `raw DSML markup leaked into content: ${content}`);
});

test("deepseek-web DSML invoke: an invoke naming a tool that was never requested degrades gracefully (no throw) and matches the canonical <tool> tag's existing contract", () => {
  // The DSML normalizer must not change the pre-existing name-resolution contract of the
  // canonical `<tool>` tag it rewrites into: an unresolved name still falls through via the
  // same raw-tag-name fallback `extractCall` already applies today (see #3260) — normalizing
  // must reproduce that behavior exactly, not invent a stricter one.
  const dsmlRaw = `<｜｜DSML｜｜ calls> <｜｜DSML｜｜ invoke name="delete_everything"> <｜｜DSML｜｜ parameter name="path" string="true">/</｜｜DSML｜｜ parameter> </｜｜DSML｜｜ invoke> </｜｜DSML｜｜ calls>`;
  const canonicalRaw = `<tool name="delete_everything"><parameter name="path">/</parameter></tool>`;

  let dsmlResult: ReturnType<typeof parseDeepSeekToolCalls> | undefined;
  assert.doesNotThrow(() => {
    dsmlResult = parseDeepSeekToolCalls(dsmlRaw, "call", WRITE_TOOL);
  });
  const canonicalResult = parseDeepSeekToolCalls(canonicalRaw, "call", WRITE_TOOL);

  assert.deepEqual(
    dsmlResult!.toolCalls?.map((c) => ({ name: c.function.name, args: c.function.arguments })),
    canonicalResult.toolCalls?.map((c) => ({ name: c.function.name, args: c.function.arguments })),
    "normalized DSML markup must resolve identically to the equivalent canonical <tool> tag"
  );
});
