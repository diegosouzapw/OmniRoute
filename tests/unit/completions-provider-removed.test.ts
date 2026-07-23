import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

// Regression guard for discussion #3293: "Completions.me" (provider id `completions`,
// alias `cpl`, https://completions.me) was a bundled preset advertising free unlimited
// access to premium models. It is a Rickroll endpoint -- verified empirically on
// 2026-06-06: a real key against /api/v1/chat/completions returns the Rick Astley
// lyrics ("Never gonna give you up...") for every model/prompt, with zeroed usage.
// It must stay out of every provider catalog so nobody wires it up by accident.

test("completions (Completions.me) provider is removed from the chat registry", () => {
  assert.equal(REGISTRY["completions"], undefined);
});

test("completions (Completions.me) provider is removed from the API-key provider presets", () => {
  assert.equal((APIKEY_PROVIDERS as Record<string, unknown>)["completions"], undefined);
});

test("completions (Completions.me) has no entries in the free model catalog", () => {
  const offenders = FREE_MODEL_BUDGETS.filter((b) => b.provider === "completions");
  assert.deepEqual(offenders, []);
});
