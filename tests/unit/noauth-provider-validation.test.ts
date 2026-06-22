/**
 * Tests for noAuth provider validation:
 * - Bug 1: `theoldllm` and `chipotle` missing from providerAllowsOptionalApiKey
 * - Bug 2: `kimi` API key provider incorrectly routed through KimiWebExecutor
 */
import test from "node:test";
import assert from "node:assert/strict";

import { providerAllowsOptionalApiKey } from "../../src/shared/constants/providers.ts";
import { hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

// Bug 1: all noAuth providers should allow optional API key
for (const provider of ["theoldllm", "chipotle", "mimocode", "opencode", "duckduckgo-web", "veoaifree-web"]) {
  test(`${provider} allows optional API key (noAuth provider)`, () => {
    assert.equal(providerAllowsOptionalApiKey(provider), true);
  });
}

// Bug 2: kimi API key provider should NOT have a specialized web executor
test("kimi API key provider falls through to DefaultExecutor", () => {
  assert.equal(hasSpecializedExecutor("kimi"), false);
});

// no regression: kimi-web and kimi-coding still have their executors
test("kimi-web still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-web"), true);
});

test("kimi-coding-apikey still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-coding-apikey"), true);
});
