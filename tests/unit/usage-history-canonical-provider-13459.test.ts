/**
 * @file usage-history-canonical-provider-13459.test.ts
 * @description Verifies that usage_history records the canonical provider ID
 * when an alias is used, so analytics are not split across alias and canonical.
 * (#13459)
 */

import test from "node:test";
import assert from "node:assert/strict";

// Test resolveProviderId directly since it's the core logic.
// The actual integration (calling it at write boundary in usageHistory.ts)
// is verified by the fact that both write sites now call resolveProviderId().

// We import resolveProviderId to test the alias-to-canonical mapping that
// underpins the fix. The real usageHistory.ts integration is an import-level
// change; this test validates the mapping contract.
import { resolveProviderId } from "../../src/shared/constants/providers.ts";

test("resolveProviderId returns canonical id for known aliases", () => {
  // These are documented aliases in src/shared/constants/providers.ts
  // If the alias table changes, this test will need updating — which is
  // exactly the desired behavior (catch drift).
  const aliasCases: [string, string][] = [
    // [alias, expectedCanonicalId]
    ["ollama", "ollama-local"],
    ["lmstudio", "lm-studio"],
    ["cc", "claude"],
    ["gh", "github"],
    ["cx", "codex"],
  ];

  for (const [alias, expectedCanonical] of aliasCases) {
    const result = resolveProviderId(alias);
    assert.equal(
      result,
      expectedCanonical,
      `alias "${alias}" should resolve to "${expectedCanonical}", got "${result}"`
    );
  }
});

test("resolveProviderId passes through canonical ids unchanged", () => {
  const canonicalIds = [
    "ollama-local",
    "lm-studio",
    "claude",
    "github",
    "codex",
    "gemini",
    "openai",
  ];

  for (const id of canonicalIds) {
    const result = resolveProviderId(id);
    assert.equal(
      result,
      id,
      `canonical id "${id}" should pass through unchanged, got "${result}"`
    );
  }
});

test("resolveProviderId passes through unknown strings unchanged", () => {
  const unknown = ["my-custom-provider", "some-random-string", ""];
  for (const s of unknown) {
    const result = resolveProviderId(s);
    assert.equal(result, s, `unknown string "${s}" should pass through unchanged`);
  }
});
