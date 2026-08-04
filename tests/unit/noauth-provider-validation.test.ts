/**
 * Tests for noAuth provider validation:
 * - Bug 1: `theoldllm` and `chipotle` missing from providerAllowsOptionalApiKey
 * - `kimi` API key provider stays on the dedicated Moonshot executor
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  NOAUTH_PROVIDERS,
  providerAllowsOptionalApiKey,
  supportsNoAuthProviderProxy,
} from "../../src/shared/constants/providers.ts";
import { hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

// Bug 1: all noAuth providers should allow optional API key
for (const provider of [
  "theoldllm",
  "chipotle",
  "mimocode",
  "opencode",
  "duckduckgo-web",
  "veoaifree-web",
]) {
  test(`${provider} allows optional API key (noAuth provider)`, () => {
    assert.equal(providerAllowsOptionalApiKey(provider), true);
  });
}

// `kimi` is the hidden legacy id for Moonshot API compatibility, not Kimi Web.
test("kimi API key provider uses the specialized Moonshot executor", () => {
  assert.equal(hasSpecializedExecutor("kimi"), true);
});

// no regression: kimi-web and kimi-coding still have their executors
test("kimi-web still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-web"), true);
});

test("kimi-coding-apikey still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-coding-apikey"), true);
});

test("provider proxy controls use a centralized no-auth capability allowlist", () => {
  assert.equal(supportsNoAuthProviderProxy("opencode"), true);
  assert.equal(supportsNoAuthProviderProxy("theoldllm"), true);

  for (const providerId of Object.keys(NOAUTH_PROVIDERS)) {
    if (providerId !== "opencode" && providerId !== "theoldllm") {
      assert.equal(supportsNoAuthProviderProxy(providerId), false, providerId);
    }
  }
});
