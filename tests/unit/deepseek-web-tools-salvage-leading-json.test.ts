import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { parseDeepSeekToolCalls } from "../../open-sse/translator/deepseekWebTools.ts";

// DeepSeek's web session occasionally leaks malformed/internal formatting tokens right after
// an otherwise-complete `<tool>{json}` body, instead of a clean `</tool>` close. The strict
// `JSON.parse` inside `parseLooseJsonObject` rejects the whole block over that trailing
// garbage even though a perfectly valid object sits at the start. `salvageLeadingJsonObject`
// recovers it by scanning for the first balanced `{...}` (quote/escape aware) and parsing
// just that slice.

const TOOLS = [
  {
    type: "function",
    function: {
      name: "create_file",
      parameters: {
        type: "object",
        properties: { filePath: { type: "string" }, content: { type: "string" } },
      },
    },
  },
];

describe("deepseekWebTools — salvage leading JSON on malformed close", () => {
  test("recovers a valid <tool>{json} block whose closing tag was replaced by garbled tokens", () => {
    // Reproduces production content observed from the deepseek-web provider: valid JSON
    // immediately followed by corrupted pseudo-tags instead of `</tool>`.
    const text =
      'Let me create that file.\n\n<tool>{"name": "create_file", "arguments": ' +
      '{"filePath":"C:\\\\Users\\\\me\\\\script.mjs","content":"console.log(1)"}}' +
      "<｜｜DSML｜｜ parameter>\n</｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>" +
      "This response is AI-generated, for reference only.";

    const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.ok(toolCalls && toolCalls.length === 1, "expected the malformed block to be recovered");
    assert.equal(toolCalls![0].function.name, "create_file");
    const args = JSON.parse(toolCalls![0].function.arguments);
    assert.equal(args.filePath, "C:\\Users\\me\\script.mjs");
    assert.equal(args.content, "console.log(1)");
  });

  test("recovers a valid block even with escaped quotes and nested braces before the garbage", () => {
    const text =
      '<tool>{"name": "create_file", "arguments": {"filePath":"a.txt",' +
      '"content":"line one\\nline \\"two\\" {not json}"}}' +
      "<｜｜DSML｜｜ calls>trailing junk that is not valid JSON at all {{{";

    const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.ok(toolCalls && toolCalls.length === 1);
    const args = JSON.parse(toolCalls![0].function.arguments);
    assert.equal(args.content, 'line one\nline "two" {not json}');
  });

  test("still returns null (no promotion) when the JSON itself is genuinely truncated", () => {
    // No balanced closing brace anywhere — nothing to salvage, must not be promoted.
    const text = '<tool>{"name": "create_file", "arguments": {"filePath":"a.txt able to nev';
    const { toolCalls, content } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.equal(toolCalls, null, "a truly truncated object must not be salvaged into a call");
    assert.equal(content, text, "unrecovered content is returned unchanged");
  });

  test("normal, well-formed <tool>{json}</tool> blocks are unaffected (no regression)", () => {
    const text =
      '<tool>{"name": "create_file", "arguments": {"filePath":"a.txt","content":"x"}}</tool>';
    const { toolCalls, content } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.equal(toolCalls?.length, 1);
    assert.equal(toolCalls![0].function.name, "create_file");
    assert.ok(!content.includes("<tool>"), "well-formed block is still stripped from content");
  });
});
