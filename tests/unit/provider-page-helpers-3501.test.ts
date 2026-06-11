// Phase 2 unit tests for Issue #3501: the pure helpers extracted from the
// provider-detail god-component into providerPageHelpers.ts. Beyond asserting
// behaviour, exercising EVERY exported function guards against a missing
// transitive import in the extracted module (the Phase 0 smoke test caught one
// such gap — isSelfHostedChatProvider — at mount time; this locks it down).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  providerText,
  providerCountText,
  readBooleanToggle,
  getLocalProviderMetadata,
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  parseRoutingTagsInput,
  parseExcludedModelsInput,
  formatRoutingTagsInput,
  formatExcludedModelsInput,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

const tStub = Object.assign((key: string) => key, { has: (_k: string) => false });

test("providerText falls back when key missing and interpolates values", () => {
  assert.equal(providerText(tStub, "missing.key", "Hello {name}", { name: "X" }), "Hello X");
  const tHas = Object.assign((key: string) => `T:${key}`, { has: (_k: string) => true });
  assert.equal(providerText(tHas, "present.key", "fallback"), "T:present.key");
});

test("providerCountText picks singular/plural by count", () => {
  assert.equal(providerCountText(tStub, "k", 1, "{count} item", "{count} items"), "1 item");
  assert.equal(providerCountText(tStub, "k", 3, "{count} item", "{count} items"), "3 items");
});

test("readBooleanToggle coerces booleans/numbers/strings with fallback", () => {
  assert.equal(readBooleanToggle(true, false), true);
  assert.equal(readBooleanToggle(1, false), true);
  assert.equal(readBooleanToggle("false", true), false);
  assert.equal(readBooleanToggle(undefined, true), true);
});

test("base-url helpers run without throwing (transitive imports present)", () => {
  // The key regression guard: isBaseUrlConfigurableProvider internally calls
  // isSelfHostedChatProvider — a transitive import that must be wired up.
  assert.doesNotThrow(() => isBaseUrlConfigurableProvider("openai"));
  assert.equal(typeof isBaseUrlConfigurableProvider("openai"), "boolean");
  assert.doesNotThrow(() => getLocalProviderMetadata("openai"));
  assert.doesNotThrow(() => getProviderBaseUrlDefault("openai"));
  assert.doesNotThrow(() => getProviderBaseUrlHint("openai", null));
  assert.doesNotThrow(() => getProviderBaseUrlPlaceholder("openai"));
  assert.equal(typeof isGlmProvider("glm"), "boolean");
  assert.doesNotThrow(() => isBaseUrlConfigurableProvider(null));
});

test("routing-tags / excluded-models parse + format round-trip", () => {
  assert.deepEqual(parseRoutingTagsInput("a, b ,c"), ["a", "b", "c"]);
  assert.equal(parseRoutingTagsInput("   "), undefined);
  assert.deepEqual(parseExcludedModelsInput("m1, m2"), ["m1", "m2"]);
  assert.equal(formatRoutingTagsInput(["x", "y"]), "x, y");
  assert.equal(formatExcludedModelsInput(["a", "b"]), "a, b");
  assert.equal(formatRoutingTagsInput(undefined), "");
});
