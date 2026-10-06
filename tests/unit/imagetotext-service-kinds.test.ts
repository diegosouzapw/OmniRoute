import { test } from "node:test";
import assert from "node:assert/strict";

import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { resolveProviderServiceKinds } from "../../open-sse/config/mediaServiceKinds.ts";

/**
 * The Image-to-Text category (/dashboard/media-providers/imageToText) fills from
 * providers whose resolved serviceKinds include "imageToText". It has no backing
 * registry, so major vision-capable providers must declare it explicitly.
 */
const IMAGE_TO_TEXT_PROVIDERS = [
  "openai",
  "anthropic",
  "gemini",
  "openrouter",
  "mistral",
  "xai",
  "groq",
] as const;

test("major vision providers declare the imageToText serviceKind", () => {
  for (const id of IMAGE_TO_TEXT_PROVIDERS) {
    const provider = AI_PROVIDERS[id] as { serviceKinds?: string[] } | undefined;
    assert.ok(provider, `provider "${id}" missing from AI_PROVIDERS`);
    const kinds = resolveProviderServiceKinds(id, provider.serviceKinds);
    assert.ok(kinds.includes("imageToText"), `"${id}" must resolve the imageToText serviceKind`);
  }
});

test("declaring imageToText keeps the llm kind (inline Test button + playground default)", () => {
  // ProviderCard treats an EMPTY serviceKinds as "regular LLM provider"; once a
  // provider declares any kind, "llm" must be declared too or the Test button
  // and the playground default silently disappear.
  for (const id of IMAGE_TO_TEXT_PROVIDERS) {
    const provider = AI_PROVIDERS[id] as { serviceKinds?: string[] };
    assert.ok(
      (provider.serviceKinds ?? []).includes("llm"),
      `"${id}" declares serviceKinds without "llm" — this hides the inline Test button`
    );
  }
});
