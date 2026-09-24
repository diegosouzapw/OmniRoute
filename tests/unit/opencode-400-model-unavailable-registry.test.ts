import test from "node:test";
import assert from "node:assert/strict";
import {
  getProviderErrorRuleMatch,
  getOpencodeModelUnavailableMatch,
  honorsRuleLockScope,
} from "../../open-sse/config/providerErrorRules.ts";

/**
 * Registry-level pin of the `opencode-400-model-unavailable` catalog rule.
 *
 * The end-to-end path (checkFallbackError → persistence → combo) is covered by
 * `opencode-400-model-unavailable.test.ts`; this file asserts the registry
 * contract directly: marker 400 → model-scope lock with the rule-owned
 * cooldown, any other 400 → null (terminal, locks nothing), helper fenced to
 * the opencode family. Never imports accountFallback (registry/behavior
 * boundary).
 */

const MARKER = "Upstream request failed: Model is unavailable.";
const FAMILY = ["opencode", "opencode-zen", "opencode-go", "opencode-cli"];
const NON_FAMILY = ["agentrouter", "openrouter", "minimax", "unknown-vendor"];

test("marker 400 returns the model-scope lock with the rule-owned cooldown", () => {
  for (const provider of FAMILY) {
    const match = getProviderErrorRuleMatch(provider, 400, {}, { error: { message: MARKER } });
    assert.deepStrictEqual(match, {
      reason: "model_capacity",
      scope: "model",
      cooldownMs: 3_600_000,
    });
  }
  // String envelope + canonical-case provider (lookup is case-insensitive).
  const stringEnvelope = getProviderErrorRuleMatch(
    "OpenCode",
    400,
    null,
    `{"message":"${MARKER}"}`
  );
  assert.equal(stringEnvelope?.scope, "model");
  assert.equal(stringEnvelope?.reason, "model_capacity");
  assert.equal(stringEnvelope?.cooldownMs, 3_600_000);
});

test("any other 400 stays terminal and locks nothing", () => {
  for (const body of [
    "improperly formed request: invalid message format",
    "invalid api key",
    "{}",
    "",
  ]) {
    assert.equal(getProviderErrorRuleMatch("opencode", 400, {}, body), null, body);
  }
  // Right marker, wrong status: the rule is 400-only.
  assert.equal(getProviderErrorRuleMatch("opencode", 429, {}, MARKER), null);
});

test("helper is fenced to the opencode family and the allowlist honors it", () => {
  for (const provider of FAMILY) {
    assert.equal(honorsRuleLockScope(provider), true, provider);
  }
  assert.deepStrictEqual(getOpencodeModelUnavailableMatch("opencode", 400, null, MARKER), {
    reason: "model_capacity",
    scope: "model",
    cooldownMs: 3_600_000,
  });
  for (const provider of NON_FAMILY) {
    assert.equal(getOpencodeModelUnavailableMatch(provider, 400, null, MARKER), null, provider);
  }
  assert.equal(getOpencodeModelUnavailableMatch("opencode", 429, null, MARKER), null);
});
