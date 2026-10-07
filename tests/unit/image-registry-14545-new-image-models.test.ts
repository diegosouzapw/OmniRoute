import test from "node:test";
import assert from "node:assert/strict";
import { getImageModelEntry } from "@omniroute/open-sse/config/imageRegistry.ts";

// #14545 — providers with image-generation capability that are missing from the
// static IMAGE_PROVIDERS registry are silently invisible to the image catalog
// and dropped as combo targets (open-sse/services/imageCombo.ts hard-filters on
// getImageModelEntry() !== null). Regression guard for the reported models.

test("#14545: openrouter/openai/gpt-image-2.5-sunburst resolves as an image model", () => {
  const entry = getImageModelEntry("openrouter/openai/gpt-image-2.5-sunburst");
  assert.notEqual(
    entry,
    null,
    "expected a working OpenRouter image model to resolve via getImageModelEntry (the combo filter in imageCombo.ts drops any target this returns null for)"
  );
});

test("#14545: openrouter/openai/gpt-image-2.5-flare resolves as an image model", () => {
  const entry = getImageModelEntry("openrouter/openai/gpt-image-2.5-flare");
  assert.notEqual(
    entry,
    null,
    "new OpenRouter image model missing from IMAGE_PROVIDERS.openrouter"
  );
});

test("#14545: openrouter/microsoft/mai-image-2.6 resolves as an image model", () => {
  const entry = getImageModelEntry("openrouter/microsoft/mai-image-2.6");
  assert.notEqual(
    entry,
    null,
    "new OpenRouter image model missing from IMAGE_PROVIDERS.openrouter"
  );
});

test("#14545: openrouter/microsoft/mai-image-2.6-flash resolves as an image model", () => {
  const entry = getImageModelEntry("openrouter/microsoft/mai-image-2.6-flash");
  assert.notEqual(
    entry,
    null,
    "new OpenRouter image model missing from IMAGE_PROVIDERS.openrouter"
  );
});

// The owner kept only the four OpenRouter models from #14545: the reporter could not
// validate the Gemini OpenAI-compat images endpoint live, so no IMAGE_PROVIDERS.gemini
// entry is declared until it is. Unregistered gemini image ids still reach the
// synthetic-provider fallback in open-sse/handlers/imageGeneration.ts on direct calls.
test("#14545: IMAGE_PROVIDERS declares no unvalidated gemini image entry", () => {
  assert.equal(getImageModelEntry("gemini/gemini-3-pro-image"), null);
  assert.equal(getImageModelEntry("gemini/gemini-3.1-flash-image"), null);
});

test("#14545 regression guard: existing IMAGE_PROVIDERS members still resolve", () => {
  assert.notEqual(getImageModelEntry("codex/gpt-5.6-luna"), null);
  assert.notEqual(getImageModelEntry("openrouter/black-forest-labs/flux.2-max"), null);
  // Existing antigravity/gemini alias must keep resolving to antigravity.
  const antigravityAlias = getImageModelEntry("gemini-3.1-flash-image-preview");
  assert.equal(antigravityAlias?.provider, "antigravity");
});
