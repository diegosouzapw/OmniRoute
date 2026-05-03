import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateCompression } from "../../../open-sse/services/compression/validation.ts";
import {
  extractPreservedBlocks,
  restorePreservedBlocks,
} from "../../../open-sse/services/compression/preservation.ts";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";

describe("compression preservation and validation", () => {
  it("parses backtick and tilde fences with nested shorter fences", () => {
    const input = [
      "Before",
      "````markdown",
      "```js",
      "const theValue = 1;",
      "```",
      "````",
      "~~~ts",
      "const x = `the`;",
      "~~~",
      "After",
    ].join("\n");
    const { text, blocks } = extractPreservedBlocks(input);
    assert.equal(blocks.filter((block) => block.kind === "fenced_code").length, 2);
    assert.equal(restorePreservedBlocks(text, blocks), input);
  });

  it("uses collision-resistant sentinels instead of predictable placeholders", () => {
    const input = "User literal [PRESERVED_0] and `inline code` stay separate.";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.ok(blocks.length > 0);
    assert.doesNotMatch(text, /\[PRESERVED_0\]/);
    assert.equal(restorePreservedBlocks(text, blocks), input);
  });

  it("preserves caveman-shrink protected identifiers and versions", () => {
    const input =
      "Set API_KEY_VALUE in process.env.API_KEY_VALUE before calling config.api.endpoint() on 3.7.9.";
    const output = cavemanCompress(
      { messages: [{ role: "user", content: input }] },
      {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 0,
        preservePatterns: [],
        intensity: "full",
      }
    ).body.messages[0].content as string;

    assert.match(output, /API_KEY_VALUE/);
    assert.match(output, /process\.env\.API_KEY_VALUE/);
    assert.match(output, /config\.api\.endpoint\(\)/);
    assert.match(output, /3\.7\.9/);
  });

  it("preserves Typst, LaTeX, frontmatter, headings, and markdown tables", () => {
    const input = [
      "---",
      "title: The Test",
      "---",
      "# The Heading",
      "| Column | Value |",
      "| --- | --- |",
      "| The key | The value |",
      "$$",
      "E = mc^2",
      "$$",
      "\\begin{align}a &= b\\end{align}",
      "#set text(size: 12pt)",
      "Please make sure to explain the document.",
    ].join("\n");
    const output = cavemanCompress(
      { messages: [{ role: "user", content: input }] },
      {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 0,
        preservePatterns: [],
        intensity: "full",
      }
    ).body.messages[0].content as string;

    assert.match(output, /^---\ntitle: The Test\n---/);
    assert.match(output, /^# The Heading/m);
    assert.match(output, /^\| Column \| Value \|/m);
    assert.match(output, /\$\$\nE = mc\^2\n\$\$/);
    assert.match(output, /\\begin\{align\}a &= b\\end\{align\}/);
    assert.match(output, /^#set text\(size: 12pt\)/m);
  });

  it("preserves inline math and ignores normal dollar amounts", () => {
    const input = "Please make sure to keep $the value$ exact and the cost as $10.";
    const output = cavemanCompress(
      { messages: [{ role: "user", content: input }] },
      {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 0,
        preservePatterns: [],
        intensity: "full",
      }
    ).body.messages[0].content as string;

    assert.match(output, /\$the value\$/);
    assert.match(output, /\$10/);
  });

  it("reports validation failure when protected content is lost", () => {
    const original = "Use `exact_token` and https://example.com/the/path.";
    const validation = validateCompression(original, "Use token.");
    assert.equal(validation.valid, false);
    assert.equal(validation.fallbackApplied, true);
    assert.ok(validation.errors.length >= 2);
  });

  it("falls back to original when validation detects structural loss", () => {
    const original = "Please make sure to use `the exact token` in the request.";
    const result = cavemanCompress(
      { messages: [{ role: "user", content: original }] },
      {
        enabled: true,
        compressRoles: ["user"],
        skipRules: [],
        minMessageLength: 0,
        preservePatterns: ["`[^`]+"],
        intensity: "full",
      }
    );
    const output = result.body.messages[0].content as string;
    assert.match(output, /`the exact token`/);
  });
});
