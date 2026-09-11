// tests/unit/moonshot-k3-unsupported-params-aliases.test.ts
//
// Live incident (2026-09-07): every `moonshot/k3-256k` hop in the `judge` and
// `best-reasoning-paid` combos hard-400'd with
//   "invalid temperature: only 1 is allowed for this model"
// because the registry catalogues the model as `kimi-k3` while Moonshot's live
// catalogue serves it as `k3` / `k3-256k`. `getUnsupportedParams` matched on the
// canonical id only, returned [], and temperature was forwarded upstream.
//
// The kimi-coding provider (`kmc`/`kmca`) serves its OWN `k3`/`k3-256k` over the
// Anthropic-format path and DOES accept temperature — verified live: temp=0
// returns 200 there. So the resolution must stay provider-scoped; a global
// alias index would wrongly strip temperature for kimi-coding.
import { test } from "node:test";
import assert from "node:assert/strict";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

const stripsTemperature = (provider: string, modelId: string): boolean =>
  getUnsupportedParams(provider, modelId).includes("temperature");

test("moonshot live K3 ids resolve to the kimi-k3 reasoning restrictions", () => {
  for (const modelId of ["k3", "k3-256k", "kimi-k3"]) {
    assert.equal(
      stripsTemperature("moonshot", modelId),
      true,
      `moonshot/${modelId} must strip temperature`
    );
  }
});

test("the kimi provider shares the moonshot catalogue and resolves the same aliases", () => {
  assert.equal(stripsTemperature("kimi", "k3-256k"), true);
  assert.equal(stripsTemperature("kimi", "k3"), true);
});

test("full REASONING_UNSUPPORTED set resolves via alias, not just temperature", () => {
  const viaAlias = getUnsupportedParams("moonshot", "k3-256k");
  const viaCanonical = getUnsupportedParams("moonshot", "kimi-k3");
  assert.deepEqual([...viaAlias], [...viaCanonical]);
  for (const param of ["temperature", "top_p", "frequency_penalty", "n"]) {
    assert.ok(viaAlias.includes(param), `expected ${param} in alias-resolved params`);
  }
});

test("kimi-coding keeps temperature — its k3 ids are a DIFFERENT upstream that accepts it", () => {
  for (const provider of ["kimi-coding", "kmc", "kimi-coding-apikey", "kmca"]) {
    for (const modelId of ["k3", "k3-256k"]) {
      assert.equal(
        stripsTemperature(provider, modelId),
        false,
        `${provider}/${modelId} must NOT strip temperature`
      );
    }
  }
});

test("non-K3 moonshot models are unaffected by the alias resolution", () => {
  // kimi-for-coding has no unsupportedParams and accepts temperature live.
  assert.equal(stripsTemperature("moonshot", "kimi-for-coding"), false);
  // Sibling reasoning models keep their existing restrictions.
  assert.equal(stripsTemperature("moonshot", "kimi-k2.7-code"), true);
  assert.equal(stripsTemperature("moonshot", "kimi-k2.6"), true);
});

test("an unknown model id still resolves to no restrictions", () => {
  assert.deepEqual([...getUnsupportedParams("moonshot", "definitely-not-a-model")], []);
});
