import test from "node:test";
import assert from "node:assert/strict";

import { resolveComboTargets } from "../../open-sse/services/combo/comboStructure.ts";
import { resolveComboTargetModelStr } from "../../open-sse/services/combo/opencodeTargetAlias.ts";
import { parseModel } from "../../open-sse/services/model.ts";

// Issue #11912: a round-robin combo built from several "opencode" (free /
// dynamic no-auth) targets plus one "opencode-zen" (authenticated api-key)
// target routed 100% of upstream traffic to the opencode-zen connection.
//
// Root cause: open-sse/services/model.ts's manual ALIAS_TO_PROVIDER_ID
// override canonicalizes ANY "opencode/<model>" string to provider
// "opencode-zen" before dispatch, so every declared "opencode/<model>"
// combo target and the explicit "opencode-zen/<model>" target resolved to
// the identical provider identity — round-robin's "7 targets" were never 7
// distinct upstream accounts.
//
// Fix: combo target resolution (comboStructure.ts's normalizeRuntimeStep)
// now rewrites an ambiguous "opencode/<model>" combo target to the "oc/"
// no-auth alias, mirroring the combo builder's existing #2901 guard, before
// the model string reaches dispatch — so it resolves to the true no-auth
// "opencode" provider and stays distinct from an "opencode-zen/<model>"
// sibling target.

test("issue #11912: round-robin combo keeps opencode and opencode-zen targets on distinct providers", () => {
  const targets = resolveComboTargets(
    {
      name: "opencode-round-robin",
      strategy: "round-robin",
      models: [
        { kind: "model", model: "opencode/mimo-v2.5-free" },
        { kind: "model", model: "opencode/mimo-v2.5-free" },
        { kind: "model", model: "opencode-zen/mimo-v2.5-free" },
      ],
    },
    null
  );

  assert.equal(targets.length, 3);
  const [dynamicA, dynamicB, authenticated] = targets;

  assert.notEqual(
    dynamicA.provider,
    authenticated.provider,
    `combo target "opencode/<model>" resolved to provider "${dynamicA.provider}" — it collapsed ` +
      `onto the same identity as the explicit "opencode-zen/<model>" target instead of routing ` +
      `to the free/dynamic no-auth pool`
  );
  assert.equal(dynamicA.provider, dynamicB.provider);
  assert.equal(authenticated.provider, "opencode-zen");

  // The rewritten model string must still resolve to the genuine no-auth
  // provider identity when it later reaches dispatch (parseModel is exactly
  // what open-sse/services/combo/roundRobinCombo.ts and
  // resolveModelOrError() call on the resolved target's modelStr).
  assert.equal(parseModel(dynamicA.modelStr).provider, "opencode");
  assert.equal(parseModel(authenticated.modelStr).provider, "opencode-zen");
});

test("resolveComboTargetModelStr rewrites the ambiguous opencode/ prefix to oc/", () => {
  assert.equal(resolveComboTargetModelStr("opencode/mimo-v2.5-free"), "oc/mimo-v2.5-free");
  // Siblings and the explicit api-key gateway must pass through untouched.
  assert.equal(resolveComboTargetModelStr("opencode-zen/mimo-v2.5-free"), "opencode-zen/mimo-v2.5-free");
  assert.equal(resolveComboTargetModelStr("opencode-go/mimo-v2.5-free"), "opencode-go/mimo-v2.5-free");
  assert.equal(resolveComboTargetModelStr("oc/mimo-v2.5-free"), "oc/mimo-v2.5-free");
  // Non-slashed / non-opencode strings are untouched.
  assert.equal(resolveComboTargetModelStr("bare-model"), "bare-model");
  assert.equal(resolveComboTargetModelStr("anthropic/claude"), "anthropic/claude");
});
