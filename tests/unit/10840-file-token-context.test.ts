import test from "node:test";
import assert from "node:assert/strict";
import {
  estimateTokens,
  isInlineBase64DocumentBlock,
  isInlineBase64ImageBlock,
  pruneOlderInlineImages,
} from "../../open-sse/services/contextManager.ts";

/**
 * #10840 — a base64 file payload (PDF and friends) was measured as ordinary
 * prompt text, so large documents were rejected on the context limit before
 * ever reaching a provider's native document pipeline.
 *
 * The estimate must not depend on which wire shape the document arrived in:
 * the Gemini `inlineData` matcher never inspected media type, so the SAME PDF
 * was already budgeted at the bounded image estimate there while the OpenAI
 * `file` and Claude `document` shapes were measured character by character.
 */

function base64Payload(approxBytes: number): string {
  return Buffer.alloc(approxBytes, 65).toString("base64");
}

const PDF_B64 = base64Payload(1_000_000); // ~1 MB document
const PDF_DATA_URL = `data:application/pdf;base64,${PDF_B64}`;

const SHAPES: Array<[string, Record<string, unknown>]> = [
  ["gemini inlineData", { inlineData: { mimeType: "application/pdf", data: PDF_B64 } }],
  [
    "claude document",
    { type: "document", source: { type: "base64", media_type: "application/pdf", data: PDF_B64 } },
  ],
  ["openai file.file_data", { type: "file", file: { filename: "d.pdf", file_data: PDF_DATA_URL } }],
  ["openai file.data", { type: "file", file: { filename: "d.pdf", data: PDF_DATA_URL } }],
  ["responses input_file", { type: "input_file", filename: "d.pdf", file_data: PDF_DATA_URL }],
];

test("#10840: a base64 document is never measured as raw prompt text", () => {
  for (const [name, block] of SHAPES) {
    const tokens = estimateTokens({
      messages: [{ role: "user", content: [{ type: "text", text: "Summarise this." }, block] }],
    });
    assert.ok(
      tokens < 5_000,
      `${name}: expected a bounded document estimate, got ${tokens} tokens for a ~1MB file`
    );
  }
});

test("#10840: every wire shape of the same document agrees", () => {
  const counts = SHAPES.map(([, block]) => estimateTokens(block));
  const unique = [...new Set(counts)];
  assert.equal(
    unique.length,
    1,
    `the same document must cost the same regardless of shape, got ${JSON.stringify(
      SHAPES.map(([n], i) => `${n}=${counts[i]}`)
    )}`
  );
});

test("#10840: a remote file URL still flows through the text path", () => {
  // Not base64 transport — nothing to exclude, and it is short anyway.
  const block = { type: "file", file: { filename: "d.pdf", file_data: "https://x.test/d.pdf" } };
  assert.equal(isInlineBase64DocumentBlock(block), false);
});

test("#10840: document detection stays separate from image detection", () => {
  const doc = SHAPES[2][1];
  const img = { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } };

  assert.equal(isInlineBase64DocumentBlock(doc), true);
  assert.equal(isInlineBase64ImageBlock(doc), false, "a document must not register as an image");
  assert.equal(isInlineBase64ImageBlock(img), true);
  assert.equal(isInlineBase64DocumentBlock(img), false);
});

test("#10840: pruneOlderInlineImages still ignores documents", () => {
  // Dropping an attached PDF is not the same decision as dropping an old
  // screenshot, so the pruner must keep its image-only scope.
  const messages = [
    {
      role: "user",
      content: [{ type: "file", file: { filename: "a.pdf", file_data: PDF_DATA_URL } }],
    },
    {
      role: "user",
      content: [{ type: "file", file: { filename: "b.pdf", file_data: PDF_DATA_URL } }],
    },
    {
      role: "user",
      content: [{ type: "file", file: { filename: "c.pdf", file_data: PDF_DATA_URL } }],
    },
  ];

  const { pruned, messages: after } = pruneOlderInlineImages(messages, { keepLatest: 1 });

  assert.equal(pruned, 0, "documents must not be pruned by the image pruner");
  assert.deepEqual(after, messages);
});
