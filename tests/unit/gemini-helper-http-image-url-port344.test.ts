// Ported from upstream decolua/9router PR #344 by Ibrahim Ryan (East-rayyy).
// Regression test: HTTP/HTTPS image URLs in OpenAI-style `image_url` parts must
// reach Gemini as `fileData: { fileUri }` parts instead of being silently dropped
// with only a console.warn. Gemini's Part schema natively supports `fileData`
// for remote URIs, so we should not require clients to base64-encode first.

import test from "node:test";
import assert from "node:assert/strict";

const gemini = await import("../../open-sse/translator/helpers/geminiHelper.ts");

test("convertOpenAIContentToParts: passes https image_url through as fileData fileUri (port #344)", () => {
  const content = [
    { type: "text", text: "describe this picture" },
    { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
  ];

  const parts = gemini.convertOpenAIContentToParts(content);

  // Expect a text part + a fileData part. Before this fix the URL was dropped
  // (only a console.warn was emitted) so `parts.length` was 1.
  assert.equal(parts.length, 2, "expected text + fileData parts");
  const fileDataPart = parts.find((p: Record<string, unknown>) => p.fileData);
  assert.ok(fileDataPart, "expected a part containing `fileData`");
  const fileData = fileDataPart.fileData as Record<string, unknown>;
  assert.equal(fileData.fileUri, "https://example.com/cat.png");
  assert.ok(typeof fileData.mimeType === "string" && fileData.mimeType.length > 0);
});

test("convertOpenAIContentToParts: passes http image_url through as fileData fileUri (port #344)", () => {
  const content = [
    { type: "image_url", image_url: { url: "http://example.com/dog.jpg" } },
  ];

  const parts = gemini.convertOpenAIContentToParts(content);

  assert.equal(parts.length, 1);
  const fileDataPart = parts[0] as Record<string, unknown>;
  assert.ok(fileDataPart.fileData, "expected fileData on the emitted part");
  const fileData = fileDataPart.fileData as Record<string, unknown>;
  assert.equal(fileData.fileUri, "http://example.com/dog.jpg");
});

test("convertOpenAIContentToParts: still inlines data: URIs as inlineData (no regression)", () => {
  const content = [
    {
      type: "image_url",
      image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEA" },
    },
  ];

  const parts = gemini.convertOpenAIContentToParts(content);

  assert.equal(parts.length, 1);
  const inlineDataPart = parts[0] as Record<string, unknown>;
  assert.ok(inlineDataPart.inlineData, "data: URI must remain inlineData");
  const inlineData = inlineDataPart.inlineData as Record<string, unknown>;
  assert.equal(inlineData.mimeType, "image/png");
  assert.equal(inlineData.data, "iVBORw0KGgoAAAANSUhEUgAAAAEA");
});

test("convertOpenAIContentToParts: non-string and unsupported image_url shapes are ignored (no fileData)", () => {
  const content = [
    { type: "image_url", image_url: { url: "ftp://example.com/whatever.png" } },
    { type: "image_url", image_url: {} },
  ];

  const parts = gemini.convertOpenAIContentToParts(content);

  // ftp:// is neither data:, http:, nor https: — must not be passed through
  // (Gemini would reject it). Empty image_url is also dropped.
  const fileDataParts = parts.filter((p: Record<string, unknown>) => p.fileData);
  assert.equal(fileDataParts.length, 0);
});
