// repro-9550-amazon-q-alias-resolution.test.ts
// Issue #9550: amazon-q provider silently falls back to OpenAI's endpoint
// because the "aq" alias is never resolved to "amazon-q".

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { resolveProviderAlias, parseModel } from "../../open-sse/services/model.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";

describe("Issue #9550 - amazon-q alias resolution", () => {
  it("resolveProviderAlias('aq') should return 'amazon-q'", () => {
    const provider = resolveProviderAlias("aq");
    assert.equal(
      provider,
      "amazon-q",
      `Expected "amazon-q" but got "${provider}" — ALIAS_TO_PROVIDER_ID["aq"] is missing`
    );
  });

  it('parseModel("aq/amazon-q") should resolve provider to "amazon-q"', () => {
    const parsed = parseModel("aq/amazon-q");
    assert.equal(
      parsed.provider,
      "amazon-q",
      `parseModel("aq/amazon-q") provider should be "amazon-q" but got "${parsed.provider}"`
    );
    assert.equal(parsed.model, "amazon-q");
  });

  it('getExecutor("amazon-q") should exist and be a KiroExecutor', () => {
    const executor = getExecutor("amazon-q");
    assert.ok(executor, "getExecutor('amazon-q') should return an executor");
    assert.equal(
      executor.constructor.name,
      "KiroExecutor",
      "amazon-q executor should be a KiroExecutor"
    );
  });
});
