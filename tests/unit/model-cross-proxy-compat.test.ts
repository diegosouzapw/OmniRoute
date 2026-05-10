import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

test("cross-proxy aliases normalize to canonical model ids without bypassing local aliases", async () => {
  const localAliasWins = await getModelInfoCore("gpt-oss:120b", {
    "gpt-oss:120b": "openai/gpt-4o",
  });
  assert.deepEqual(localAliasWins, {
    provider: "openai",
    model: "gpt-4o",
    extendedContext: false,
  });

  const crossProxyAlias = await getModelInfoCore("gpt-oss:120b", {});
  assert.equal(crossProxyAlias.model, "gpt-oss-120b");
  if (crossProxyAlias.errorType === "ambiguous_model") {
    assert.equal(crossProxyAlias.provider, null);
  } else {
    // If an active connection exists, it dynamically resolves the provider
    assert.ok(typeof crossProxyAlias.provider === "string");
  }
});

test("slashful canonical model ids are treated as exact model ids when provider pairing is invalid", async () => {
  const slashfulCanonical = await getModelInfoCore("openai/gpt-oss-120b", {});
  assert.equal(slashfulCanonical.model, "openai/gpt-oss-120b");
  if (slashfulCanonical.errorType === "ambiguous_model") {
    assert.equal(slashfulCanonical.provider, null);
  } else {
    assert.ok(typeof slashfulCanonical.provider === "string");
  }
});

test("explicit provider routes can still normalize cross-proxy model dialects", async () => {
  const explicitProviderCompat = await getModelInfoCore("nvidia/gpt-oss:120b", {});
  assert.deepEqual(explicitProviderCompat, {
    provider: "nvidia",
    model: "openai/gpt-oss-120b",
    extendedContext: false,
  });

  const aliasTargetCompat = await getModelInfoCore("sf-qwen", {
    "sf-qwen": { provider: "siliconflow", model: "qwen3-coder:480b" },
  });
  assert.deepEqual(aliasTargetCompat, {
    provider: "siliconflow",
    model: "Qwen/Qwen3-Coder-480B-A35B-Instruct",
    extendedContext: false,
  });
});
