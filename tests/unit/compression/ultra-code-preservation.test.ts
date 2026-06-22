/**
 * Regression guard for B-ULTRA-CODE: the ultra heuristic must NOT corrupt fenced code
 * blocks / inline code / URLs. It used to call pruneByScore on raw text (no tombstoning),
 * so code tokens like `b)` / `{` / `+` scored < minScore and were pruned, turning
 * `add(a, b) { return a + b; }` into `add(a, return`. caveman + llmlingua both
 * extract/restore preserved blocks first; ultra must too.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { ultraCompress } from "@omniroute/open-sse/services/compression/ultra.ts";

test("ultraCompress preserves fenced code, inline code, and URLs byte-identical", async () => {
  const code = "```ts\nexport function add(a, b) {\n  return a + b;\n}\n```";
  const inline = "`add(x, y)`";
  const url = "https://example.com/api/v1/auth?id=42";
  const filler =
    "Here is a fairly long explanatory paragraph that should be pruned heavily because " +
    "it contains lots of low information filler words and redundant phrasing repeated " +
    "many times over and over again to ensure the heuristic actually triggers pruning. ";
  // Realistic layout: fenced code block sits on its own line (markdown convention).
  const text = `${filler}\n\n${code}\n\nThen call ${inline} and see ${url} for details.\n\n${filler}`;

  const { messages } = await ultraCompress([{ role: "user", content: text }], {
    maxTokensPerMessage: 0,
  });
  const out = typeof messages[0].content === "string" ? messages[0].content : "";

  assert.ok(out.includes(code), `fenced code block must survive byte-identical:\n${out}`);
  assert.ok(out.includes(inline), `inline code must survive byte-identical:\n${out}`);
  assert.ok(out.includes(url), `URL must survive byte-identical:\n${out}`);
  assert.ok(out.length < text.length, "prose must still be compressed");
});
