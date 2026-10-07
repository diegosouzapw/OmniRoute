import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildPrecisionComboModelStep,
  buildGlobalModelList,
  buildManualComboModelStep,
} from "../../src/lib/combos/builderDraft.ts";
import { resolveProviderAlias, parseModel } from "../../open-sse/services/model.ts";

// Issue #11433: the combo builder's precision-select path builds a step's
// `model` string as `${providerId}/${modelId}` using the CANONICAL provider id.
// For the no-auth "opencode" (OpenCode Free) provider this produces
// `model: "opencode/<modelId>"`, but `opencode` is ALSO a manual routing-prefix
// override (`ALIAS_TO_PROVIDER_ID["opencode"] = "opencode-zen"`) intended only
// for user-typed `opencode/` prefixes referring to the OpenCode Zen (api-key)
// tier. Parsing the step's own `model` string therefore resolves to a
// DIFFERENT provider than the one recorded in `step.providerId`.

test('sanity: resolveProviderAlias("opencode") is the manual override causing the collision', () => {
  // Documents the root cause directly: the manual alias override in
  // open-sse/services/model.ts unconditionally rewrites "opencode" to
  // "opencode-zen", even though "opencode" is also a registered canonical
  // provider id (src/shared/constants/providers/noauth.ts).
  assert.equal(resolveProviderAlias("opencode"), "opencode-zen");
});

test("issue #11433 fix: buildPrecisionComboModelStep honors an explicit modelPrefix override", () => {
  // The combo builder call sites now thread through the already-computed
  // routing-alias prefix (e.g. "oc") instead of letting the step default to
  // the raw providerId, so the serialized `model` field round-trips to the
  // correct provider.
  const step = buildPrecisionComboModelStep({
    providerId: "opencode",
    modelId: "big-pickle",
    modelPrefix: "oc",
  });

  assert.equal(step.providerId, "opencode");
  assert.equal(step.model, "oc/big-pickle");

  const parsed = parseModel(step.model);
  assert.equal(parsed.provider, step.providerId);
});

test("issue #11433 fix: buildGlobalModelList derives modelPrefix from qualifiedModel for the no-auth OpenCode Free provider", () => {
  // Mirrors what src/lib/combos/builderOptions.ts::rewriteQualifiedModelPrefix
  // produces for the no-auth "opencode" provider entry: `qualifiedModel` is
  // already rewritten to the "oc/" alias prefix, but (pre-fix)
  // buildGlobalModelList ignored it and rebuilt `model` from the raw
  // providerId, producing "opencode/big-pickle" which parses back to the
  // wrong provider ("opencode-zen").
  const [entry] = buildGlobalModelList([
    {
      providerId: "opencode",
      displayName: "OpenCode Free",
      connectionCount: 0,
      connections: [],
      models: [{ id: "big-pickle", name: "Big Pickle", qualifiedModel: "oc/big-pickle" }],
    },
  ]);

  assert.equal(entry.step.providerId, "opencode");
  assert.equal(entry.step.model, "oc/big-pickle");
  assert.equal(parseModel(entry.step.model).provider, entry.step.providerId);
});

test("issue #11433 fix: buildManualComboModelStep preserves a user-typed oc/<model> prefix", () => {
  // buildManualComboModelStep resolves the typed alias ("oc") back to the
  // canonical providerId ("opencode") before building the step. Pre-fix, it
  // then handed that canonical id straight to buildPrecisionComboModelStep,
  // which rebuilt `model` from it and collapsed "oc/<model>" back down to
  // "opencode/<model>" — reproducing the same collision for manual entry.
  const step = buildManualComboModelStep({
    value: "oc/big-pickle",
    providers: [{ providerId: "opencode", alias: "oc" }],
  });

  assert.ok(step);
  assert.equal(step?.providerId, "opencode");
  assert.equal(step?.model, "oc/big-pickle");
  assert.equal(parseModel(step!.model).provider, step!.providerId);
});
