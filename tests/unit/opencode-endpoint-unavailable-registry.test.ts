import test from "node:test";
import assert from "node:assert/strict";
import {
  getProviderErrorRuleMatch,
  getOpencodeModelUnavailableMatch,
  honorsRuleLockScope,
} from "../../open-sse/config/providerErrorRules.ts";

/**
 * Registry-level pin of the `opencode-endpoint-unavailable` catalog rule.
 *
 * The end-to-end path (checkFallbackError → persistence → combo) is covered by
 * `opencode-endpoint-unavailable.test.ts`; this file asserts the registry
 * contract directly: marker 400/429 → model-scope lock with the rule-owned
 * cooldown, any other 400/429 → null (locks nothing), helper fenced to the
 * opencode family. Never imports accountFallback (registry/behavior boundary).
 */

const MARKER = "Upstream request failed: Endpoint is unavailable.";
const BARE_MARKER = "Endpoint is unavailable";
const FAMILY = ["opencode", "opencode-zen", "opencode-go", "opencode-cli"];
const NON_FAMILY = ["agentrouter", "openrouter", "minimax", "unknown-vendor"];

test("marker 400 and 429 return the model-scope lock with the rule-owned cooldown", () => {
  for (const provider of FAMILY) {
    for (const status of [400, 429]) {
      const match = getProviderErrorRuleMatch(provider, status, {}, { error: { message: MARKER } });
      assert.deepStrictEqual(match, {
        reason: "model_capacity",
        scope: "model",
        cooldownMs: 300_000,
      });
    }
  }
  // Bare envelope without the upstream prefix + canonical-case provider
  // (lookup is case-insensitive).
  const bareEnvelope = getProviderErrorRuleMatch("OpenCode", 429, null, BARE_MARKER);
  assert.equal(bareEnvelope?.scope, "model");
  assert.equal(bareEnvelope?.reason, "model_capacity");
  assert.equal(bareEnvelope?.cooldownMs, 300_000);
  const bareObject = getProviderErrorRuleMatch(
    "opencode",
    400,
    {},
    { error: { message: BARE_MARKER } }
  );
  assert.deepStrictEqual(bareObject, {
    reason: "model_capacity",
    scope: "model",
    cooldownMs: 300_000,
  });
});

test("any other 400 or 429 locks nothing", () => {
  for (const body of [
    "improperly formed request: invalid message format",
    "invalid api key",
    "{}",
    "",
  ]) {
    assert.equal(getProviderErrorRuleMatch("opencode", 400, {}, body), null, body);
  }
  // Generic 429 without the marker stays in rotation.
  assert.equal(getProviderErrorRuleMatch("opencode", 429, {}, "Rate limit exceeded"), null);
  // Right marker, wrong status: the rule covers 400/429 only.
  assert.equal(getProviderErrorRuleMatch("opencode", 503, {}, MARKER), null);
});

test("helper is fenced to the opencode family and the allowlist honors it", () => {
  for (const provider of FAMILY) {
    assert.equal(honorsRuleLockScope(provider), true, provider);
  }
  assert.deepStrictEqual(getOpencodeModelUnavailableMatch("opencode", 429, null, MARKER), {
    reason: "model_capacity",
    scope: "model",
    cooldownMs: 300_000,
  });
  for (const provider of NON_FAMILY) {
    assert.equal(getOpencodeModelUnavailableMatch(provider, 400, null, MARKER), null, provider);
    assert.equal(getOpencodeModelUnavailableMatch(provider, 429, null, MARKER), null, provider);
  }
});
