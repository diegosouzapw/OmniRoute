import test from "node:test";
import assert from "node:assert/strict";
import { estimateTokens, getTokenLimit } from "../../open-sse/services/contextManager.ts";

function makeFakePngBase64(approxBytes: number): string {
  return Buffer.alloc(approxBytes, 65).toString("base64");
}

test("#8368: inline base64 PNG image_url is NOT counted as raw text (bounded image-token estimate)", () => {
  const base64 = makeFakePngBase64(1_900_000); // ~1.9MB, matches issue repro
  const messages = [
    { role: "user", content: "Please describe this image." },
    {
      role: "user",
      content: [
        { type: "input_text", text: "Please describe this image." },
        { type: "input_image", image_url: `data:image/png;base64,${base64}` },
      ],
    },
  ];
  const estimated = estimateTokens(messages);
  assert.ok(
    estimated < 5000,
    `BUG #8368 reproduced: image-bearing message estimated at ${estimated} tokens (limit ${getTokenLimit(
      "codex"
    )})`
  );
});

test("#8368: plain text estimation is unaffected by the image-token fix (control)", () => {
  const text = "a".repeat(4000); // 4000 chars => ~1000 tokens at CHARS_PER_TOKEN=4
  const estimated = estimateTokens(text);
  assert.equal(estimated, 1000);
});

test("#8368: OpenAI chat.completions image_url object shape is bounded", () => {
  const base64 = makeFakePngBase64(500_000);
  const messages = [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } },
      ],
    },
  ];
  const estimated = estimateTokens(messages);
  assert.ok(estimated < 5000, `expected bounded estimate, got ${estimated}`);
});

test("#8368: Claude source.base64 image block shape is bounded", () => {
  const base64 = makeFakePngBase64(500_000);
  const messages = [
    {
      role: "user",
      content: [
        { type: "text", text: "Describe this." },
        {
          type: "image",
          source: { type: "base64", media_type: "image/png", data: base64 },
        },
      ],
    },
  ];
  const estimated = estimateTokens(messages);
  assert.ok(estimated < 5000, `expected bounded estimate, got ${estimated}`);
});

test("#8368: Gemini inlineData image block shape is bounded", () => {
  const base64 = makeFakePngBase64(500_000);
  const messages = [
    {
      role: "user",
      parts: [{ text: "Describe this." }, { inlineData: { mimeType: "image/png", data: base64 } }],
    },
  ];
  const estimated = estimateTokens(messages);
  assert.ok(estimated < 5000, `expected bounded estimate, got ${estimated}`);
});

test("#8368: multiple images accumulate a bounded sum, not one flat cap", () => {
  const base64 = makeFakePngBase64(200_000);
  const oneImageMessages = [
    { role: "user", content: [{ type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } }] },
  ];
  const threeImageMessages = [
    {
      role: "user",
      content: [
        { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
        { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
        { type: "image_url", image_url: { url: `data:image/png;base64,${base64}` } },
      ],
    },
  ];
  const one = estimateTokens(oneImageMessages);
  const three = estimateTokens(threeImageMessages);
  assert.ok(three > one, `expected 3 images to cost more than 1 (one=${one}, three=${three})`);
  assert.ok(three < one * 4, `expected roughly linear scaling, got one=${one} three=${three}`);
});

test("#8368: remote http(s) image URLs are unaffected (still measured as text)", () => {
  const messages = [
    {
      role: "user",
      content: [{ type: "image_url", image_url: { url: "https://example.com/cat.png" } }],
    },
  ];
  const estimated = estimateTokens(messages);
  // Should just be the JSON-length/4 heuristic for the short URL string, not near-zero
  // and not a bounded image-token substitute — remote URLs stay on the text path.
  assert.ok(estimated > 0 && estimated < 100, `expected small text-based estimate, got ${estimated}`);
});

test("#8368: generic long base64 text (not an image field) still uses the text path", () => {
  const genericBase64 = makeFakePngBase64(100_000);
  const estimated = estimateTokens(genericBase64);
  const expectedTextEstimate = Math.ceil(genericBase64.length / 4);
  assert.equal(estimated, expectedTextEstimate);
});
