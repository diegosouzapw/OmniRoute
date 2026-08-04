import test from "node:test";
import assert from "node:assert/strict";
import { compressContext } from "../../open-sse/services/contextManager.ts";

// #8594 — six production call sites (compressContext layers + purifyHistory binary
// search + the combo.ts fallback threshold) pre-JSON.stringify the messages before
// handing them to estimateTokens(). Stringifying forces the char/4 text path and
// undoes the #8368 inline-base64-image bounded estimate, so an image-bearing request
// that fits comfortably is mis-measured as ~100× larger and compressed needlessly.

function makeFakePngBase64(approxBytes: number): string {
  return Buffer.alloc(approxBytes, 65).toString("base64");
}

test("#8594: compressContext does NOT compress a within-limit inline-image request", () => {
  // ~500KB image => ~666KB base64. As raw text that is ~166k tokens (over the limit);
  // as a bounded image estimate it is ~1.2k tokens (well under). maxTokens=20000 sits
  // between the two, so the bug (stringify) trips compression and the fix does not.
  const base64 = makeFakePngBase64(500_000);
  const body = {
    model: "gpt-image-vision",
    messages: [
      { role: "system", content: "You are a helpful vision assistant." },
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
        ],
      },
    ],
  };

  const result = compressContext(body, { maxTokens: 20000, reserveTokens: 0 });

  assert.equal(
    result.compressed,
    false,
    `BUG #8594 reproduced: within-limit image request was compressed. ` +
      `stats.original=${(result.stats as { original?: number }).original} tokens ` +
      `(should be a bounded ~1.2k image estimate, not the ~166k base64-as-text value)`
  );
  assert.ok(
    (result.stats as { original: number }).original < 5000,
    `expected bounded image-token estimate (<5000), got ${(result.stats as { original: number }).original}`
  );
});

test("#8594: purifyHistory keeps all image-bearing turns when they fit within the limit", () => {
  // Multiple image messages that, measured correctly, fit under the limit. The bug
  // makes the Layer-3 binary search over-estimate and prune turns; the fix preserves them.
  const base64 = makeFakePngBase64(200_000);
  const imageTurn = (n: number) => ({
    role: "user",
    content: [
      { type: "text", text: `Image number ${n}` },
      { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
    ],
  });
  const body = {
    model: "gpt-image-vision",
    messages: [
      { role: "system", content: "vision" },
      imageTurn(1),
      { role: "assistant", content: "ok 1" },
      imageTurn(2),
      { role: "assistant", content: "ok 2" },
      imageTurn(3),
      { role: "assistant", content: "ok 3" },
    ],
  };
  const originalCount = body.messages.length;

  const result = compressContext(body, { maxTokens: 20000, reserveTokens: 0 });

  assert.equal(result.compressed, false, "within-limit image history must not be compressed");
  assert.equal(
    (result.body as { messages: unknown[] }).messages.length,
    originalCount,
    "all image-bearing turns must be retained when they fit"
  );
});

test("#8594: control — an oversized text request is still compressed (no regression)", () => {
  const body = {
    model: "gpt-text",
    messages: [
      { role: "system", content: "s" },
      { role: "user", content: "a".repeat(200_000) }, // ~50k tokens, over a 20k limit
    ],
  };
  const result = compressContext(body, { maxTokens: 20000, reserveTokens: 0 });
  assert.equal(result.compressed, true, "oversized text must still trigger compression");
});
