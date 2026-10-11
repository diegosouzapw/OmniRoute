import assert from "node:assert/strict";
import test from "node:test";

import {
  getEligibleFreeOnboardingProviders,
  selectUnconfiguredFreeOnboardingProviders,
} from "../../src/lib/providers/freeOnboarding.ts";

test("free onboarding candidates come from the no-auth registry and exclude local/non-LLM entries", () => {
  const providers = getEligibleFreeOnboardingProviders();
  const ids = providers.map((provider) => provider.id);

  assert.deepEqual(
    ids,
    [...ids].sort((a, b) => a.localeCompare(b))
  );
  assert.ok(ids.includes("uncloseai"));
  assert.ok(!ids.includes("opencode"), "the removed keyless OpenCode provider is not offered");
  assert.ok(ids.includes("duckduckgo-web"));
  assert.ok(!ids.includes("felo-web"));
  assert.ok(ids.includes("cloudflare-playground"));
  assert.ok(ids.includes("aihorde"));
  assert.ok(!ids.includes("devin-cli-agentic"));
  assert.ok(!ids.includes("auggie"));
  assert.ok(!ids.includes("veoaifree-web"));
  assert.ok(providers.every((provider) => provider.caution.length > 0));
  assert.ok(providers.every((provider) => provider.website.startsWith("https://")));
});

test("already configured providers are removed without changing registry candidates", () => {
  const all = getEligibleFreeOnboardingProviders();
  const available = selectUnconfiguredFreeOnboardingProviders(all, [
    { provider: "uncloseai" },
    { provider: "openai" },
  ]);

  assert.ok(!available.some((provider) => provider.id === "uncloseai"));
  assert.equal(
    all.some((provider) => provider.id === "uncloseai"),
    true
  );
});
