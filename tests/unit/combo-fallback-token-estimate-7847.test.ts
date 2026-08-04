// combo's fallback-compression trigger must estimate tokens from the request OBJECT (#7847).
//
// It used to call `estimateTokens(JSON.stringify(attemptBody))`, which takes the string branch of
// estimateTokens — `ceil(length / CHARS_PER_TOKEN)` over the raw JSON. An inline base64 image is
// then charged as if every character of the data URL were prose, the same over-count #8368/#8401
// fixed on the request path. On a 200 KB inline image that read ~50k tokens instead of ~1.2k,
// tripping fallback compression on a request nowhere near the context window.
//
// Passing the object instead routes through extractImageTokens, which charges images structurally.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-estimate-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

const imageBody = (base64Chars: number) => ({
  model: "claude-opus-5",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "describe this screenshot" },
        {
          type: "image_url",
          image_url: { url: `data:image/png;base64,${"A".repeat(base64Chars)}` },
        },
      ],
    },
  ],
});

const textBody = () => ({
  model: "claude-opus-5",
  max_tokens: 100,
  messages: [{ role: "user", content: "hello world ".repeat(500) }],
  tools: [{ type: "function", function: { name: "t", description: "does a thing" } }],
});

test("an inline image is charged structurally, not as raw data-URL text", () => {
  const small = estimateTokens(imageBody(10_000));
  const large = estimateTokens(imageBody(200_000));

  // A 20x larger base64 payload must not cost 20x the tokens — the image is charged as an image.
  assert.ok(
    large < small * 2,
    `estimate scaled with the base64 length (${small} -> ${large}); the data URL is being counted as text`
  );
  assert.ok(large < 10_000, `expected a bounded image charge, got ${large} tokens`);
});

test("the string path is what over-counts — this is why the call site must pass the object", () => {
  const body = imageBody(200_000);
  const viaObject = estimateTokens(body);
  const viaString = estimateTokens(JSON.stringify(body));

  assert.ok(
    viaString > viaObject * 10,
    `expected the string path to over-count heavily (object=${viaObject}, string=${viaString}) — ` +
      "if this ever stops being true, the regression guard below is measuring nothing"
  );
});

test("text-only bodies are unaffected: object and string paths agree", () => {
  const body = textBody();
  assert.equal(
    estimateTokens(body),
    estimateTokens(JSON.stringify(body)),
    "the switch to the object path must be a no-op for the common text-only request"
  );
});

test("estimateTokens still handles the plain shapes", () => {
  assert.equal(estimateTokens(null), 0);
  assert.equal(estimateTokens(undefined), 0);
  assert.equal(estimateTokens(""), 0);
  assert.equal(estimateTokens("abcd"), 1);
  assert.ok(estimateTokens({ a: "x".repeat(400) }) > 0);
});
