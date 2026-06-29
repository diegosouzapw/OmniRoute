/**
 * Inspired by upstream PR decolua/9router#398 — expand the static OpenAI and
 * Gemini model lists with current first-class variants.
 *
 * Scope (minimal): only models that OmniRoute already references throughout
 * its sibling subsystems (cost estimator, task fitness, free catalog, image
 * registry) but happens not to expose in the direct `openai` / `gemini`
 * provider registry. We do NOT restore models OmniRoute deliberately curated
 * out (e.g. o1, gpt-4-turbo) nor re-add embedding/TTS/image entries that
 * OmniRoute deliberately keeps in their own typed registries
 * (`embeddingRegistry.ts`, `audioRegistry.ts`, `imageRegistry.ts`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiProvider } = await import(
  "../../open-sse/config/providers/registry/openai/index.ts"
);
const { geminiProvider } = await import(
  "../../open-sse/config/providers/registry/gemini/index.ts"
);

const OPENAI_ADDED_IDS = [
  "gpt-4.1-mini",
  "gpt-4.1-nano",
  "o3-mini",
  "o4-mini",
] as const;

const GEMINI_ADDED_IDS = [
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash-lite",
] as const;

test("openai registry exposes gpt-4.1 mini/nano and o3-mini/o4-mini reasoning variants", () => {
  const ids = new Set(openaiProvider.models.map((m) => m.id));
  for (const id of OPENAI_ADDED_IDS) {
    assert.ok(ids.has(id), `openai registry must include ${id}`);
  }
});

test("openai reasoning variants declare REASONING_UNSUPPORTED params", () => {
  for (const id of ["o3-mini", "o4-mini"] as const) {
    const model = openaiProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} entry must exist`);
    assert.ok(
      Array.isArray(model.unsupportedParams) &&
        (model.unsupportedParams as readonly string[]).includes("temperature"),
      `${id} must mark temperature as unsupported (reasoning model)`
    );
  }
});

test("gemini registry exposes the flash-lite variants present in sibling subsystems", () => {
  const ids = new Set(geminiProvider.models.map((m) => m.id));
  for (const id of GEMINI_ADDED_IDS) {
    assert.ok(ids.has(id), `gemini registry must include ${id}`);
  }
});

test("port did not regress previously curated openai/gemini ids", () => {
  // Sanity guard: anchor models that must keep existing.
  const openaiIds = new Set(openaiProvider.models.map((m) => m.id));
  for (const id of ["gpt-5.4", "gpt-4o", "gpt-4.1", "o3"] as const) {
    assert.ok(openaiIds.has(id), `existing openai model ${id} must remain`);
  }
  const geminiIds = new Set(geminiProvider.models.map((m) => m.id));
  for (const id of [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-3.1-pro-preview",
    "gemini-3.5-flash",
  ] as const) {
    assert.ok(geminiIds.has(id), `existing gemini model ${id} must remain`);
  }
});
