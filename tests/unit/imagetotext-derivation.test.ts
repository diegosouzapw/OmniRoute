import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveProviderServiceKinds } from "../../open-sse/config/mediaServiceKinds.ts";
import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";

test("OCR-registry providers derive imageToText without manual declaration", () => {
  assert.ok(resolveProviderServiceKinds("mistral", undefined).includes("imageToText"));
  assert.ok(
    resolveProviderServiceKinds("azure-document-intelligence", undefined).includes("imageToText")
  );
});

test("non-OCR providers do not gain imageToText implicitly", () => {
  assert.ok(!resolveProviderServiceKinds("groq", undefined).includes("imageToText"));
});

test("chutes declares llm + imageToText (dots.ocr seed, served via passthrough discovery)", () => {
  const kinds = resolveProviderServiceKinds("chutes", AI_PROVIDERS.chutes.serviceKinds);
  assert.ok(kinds.includes("imageToText"));
  assert.ok(kinds.includes("llm"));
});
