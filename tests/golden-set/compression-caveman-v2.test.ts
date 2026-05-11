import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cavemanCompress } from "../../open-sse/services/compression/caveman.ts";
import { estimateCompressionTokens } from "../../open-sse/services/compression/stats.ts";

function compressText(text: string, intensity: "lite" | "full" | "ultra" = "full"): string {
  const result = cavemanCompress(
    { messages: [{ role: "user", content: text }] },
    {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 0,
      preservePatterns: [],
      intensity,
    }
  );
  return (result.body.messages[0].content as string) ?? text;
}

const verbosePrompts = [
  "Sure, I will make sure to provide a detailed explanation of the database connection issue because the application is currently creating a new connection for every request.",
  "Of course, I would be happy to help. You should make sure to validate the request body before the handler calls the downstream API.",
  "The reason is because the authentication middleware is being used before the token refresh function, and this creates a race condition.",
  "I was wondering if you could explain why the response object is actually being generated twice in the implementation.",
];

describe("Caveman v3.7.9 golden set", () => {
  it("compresses verbose model-style responses while preserving technical substance", () => {
    const compressed = compressText(verbosePrompts[0]);
    assert.doesNotMatch(compressed, /\bSure\b/i);
    assert.doesNotMatch(compressed, /\bI will\b/i);
    assert.match(compressed, /database connection issue/i);
    assert.match(compressed, /new connection/i);
    assert.match(compressed, /request/i);
  });

  it("preserves code blocks, URLs, paths, versions, and CONST_CASE", () => {
    const input = [
      "Please make sure to review the following code.",
      "```ts",
      "const API_KEY_VALUE = process.env.API_KEY_VALUE;",
      "```",
      "See https://example.com/the/api and /src/the/file.ts for version 3.7.9.",
    ].join("\n");
    const compressed = compressText(input);
    assert.match(compressed, /```ts\nconst API_KEY_VALUE = process\.env\.API_KEY_VALUE;\n```/);
    assert.match(compressed, /https:\/\/example\.com\/the\/api/);
    assert.match(compressed, /\/src\/the\/file\.ts/);
    assert.match(compressed, /3\.7\.9/);
  });

  it("preserves document structures, inline math, and multimodal text boundaries", () => {
    const input = [
      "---",
      "title: The Report",
      "---",
      "# The Heading",
      "Please make sure to keep $the value$ exact.",
      "| The Key | The Value |",
      "| --- | --- |",
      "| The row | The value |",
    ].join("\n");
    const compressed = compressText(input);
    assert.match(compressed, /^---\ntitle: The Report\n---/);
    assert.match(compressed, /^# The Heading/m);
    assert.match(compressed, /\$the value\$/);
    assert.match(compressed, /^\| The Key \| The Value \|/m);
  });

  it("achieves >35% average savings on verbose Caveman prompts", () => {
    const savings = verbosePrompts.map((prompt) => {
      const compressed = compressText(prompt);
      const before = estimateCompressionTokens(prompt);
      const after = estimateCompressionTokens(compressed);
      return ((before - after) / before) * 100;
    });
    const avg = savings.reduce((sum, value) => sum + value, 0) / savings.length;
    assert.ok(avg > 35, `Expected >35% average savings, got ${avg.toFixed(1)}%`);
  });

  it("keeps short clean messages readable", () => {
    assert.equal(compressText("Fix auth bug."), "Fix auth bug.");
  });
});
