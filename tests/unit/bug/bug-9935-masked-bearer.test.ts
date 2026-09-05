import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { maskStoredApiKey } from "../../../src/lib/apiKeyExposure";

const COMPONENT_DIR = resolve("src/app/(dashboard)/dashboard/media-providers/components");
const EXAMPLE_CARDS = [
  "WebSearchExampleCard.tsx",
  "WebFetchExampleCard.tsx",
  "ImageExampleCard.tsx",
  "TtsExampleCard.tsx",
  "SttExampleCard.tsx",
  "OcrExampleCard.tsx",
  "MusicExampleCard.tsx",
  "EmbeddingExampleCard.tsx",
  "VideoExampleCard.tsx",
];
const FIXED_REFERENCE = "LlmChatCard.tsx";
const MASKED_BEARER = /\bBearer\s*\$?\{?\s*apiKey/;

test("every media ExampleCard avoids sending a masked apiKey as Bearer (#9935)", () => {
  for (const file of [...EXAMPLE_CARDS, FIXED_REFERENCE]) {
    const src = readFileSync(resolve(COMPONENT_DIR, file), "utf8");
    assert.ok(
      !MASKED_BEARER.test(src),
      `${file} still sends the (masked) apiKey as an Authorization: Bearer token — will 401 under REQUIRE_API_KEY`
    );
  }
});

test("masked value is never a real API key (repro of the 401 trigger)", () => {
  const real = "sk-abcdef0123456789wxyz";
  const masked = maskStoredApiKey(real);
  assert.notEqual(masked, real);
});
