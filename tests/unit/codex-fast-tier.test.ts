import test from "node:test";
import assert from "node:assert/strict";

import {
  applyCodexGlobalFastServiceTier,
  getCodexEffectiveServiceTier,
  getCodexEffectiveFastServiceTier,
  getCodexGlobalServiceMode,
  isCodexGlobalFastServiceTierEnabled,
  resolveCodexGlobalFastServiceTier,
} from "../../src/lib/providers/codexFastTier.ts";

test("Codex global fast tier recognizes legacy and current setting shapes", () => {
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexServiceTier: { enabled: true } }), true);
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexServiceTier: true }), true);
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexFastServiceTier: true }), true);
  assert.equal(
    isCodexGlobalFastServiceTierEnabled({ codexServiceTier: { enabled: true, tier: "default" } }),
    false
  );
  assert.equal(
    isCodexGlobalFastServiceTierEnabled({ codexServiceTier: { enabled: false } }),
    false
  );
  assert.equal(isCodexGlobalFastServiceTierEnabled({}), false);
});

test("Codex global service mode distinguishes no setting from explicit tiers", () => {
  assert.equal(getCodexGlobalServiceMode({ codexServiceTier: { enabled: false } }), "none");
  assert.equal(getCodexGlobalServiceMode({ codexServiceTier: { enabled: true } }), "priority");
  assert.equal(
    getCodexGlobalServiceMode({ codexServiceTier: { enabled: true, tier: "default" } }),
    "default"
  );
  assert.equal(
    getCodexGlobalServiceMode({ codexServiceTier: { enabled: true, tier: "flex" } }),
    "flex"
  );
  assert.deepEqual(
    resolveCodexGlobalFastServiceTier({ codexServiceTier: { enabled: true, tier: "default" } }),
    { enabled: true, tier: "default", supportedModels: ["gpt-5.5", "gpt-5.4"] }
  );
});

test("Codex effective fast tier combines global and per-connection defaults", () => {
  assert.equal(getCodexEffectiveFastServiceTier({}, false), false);
  assert.equal(getCodexEffectiveFastServiceTier({}, true), true);
  assert.equal(
    getCodexEffectiveFastServiceTier({ requestDefaults: { serviceTier: "priority" } }, false),
    true
  );
  assert.equal(
    getCodexEffectiveFastServiceTier({ requestDefaults: { serviceTier: "fast" } }, false),
    true
  );
  assert.equal(
    getCodexEffectiveFastServiceTier({ requestDefaults: { serviceTier: "flex" } }, false),
    true
  );
  assert.equal(
    getCodexEffectiveServiceTier({ requestDefaults: { serviceTier: "flex" } }, "none"),
    "flex"
  );
  assert.equal(
    getCodexEffectiveServiceTier({ requestDefaults: { serviceTier: "priority" } }, "default"),
    "default"
  );
  assert.equal(getCodexEffectiveServiceTier({}, "flex"), "flex");
});

test("Codex global service tier injects selected mode and can override connection defaults", () => {
  const injected = applyCodexGlobalFastServiceTier(
    "codex",
    { providerSpecificData: { workspaceId: "ws-1" } },
    { codexServiceTier: { enabled: true } }
  );

  assert.deepEqual(injected.providerSpecificData, {
    workspaceId: "ws-1",
    requestDefaults: { serviceTier: "priority" },
  });

  const existing = { providerSpecificData: { requestDefaults: { serviceTier: "fast" } } };
  assert.deepEqual(
    applyCodexGlobalFastServiceTier("codex", existing, {
      codexServiceTier: { enabled: true, tier: "flex" },
    }),
    { providerSpecificData: { requestDefaults: { serviceTier: "flex" } } }
  );
  assert.deepEqual(
    applyCodexGlobalFastServiceTier(
      "codex",
      {
        providerSpecificData: {
          requestDefaults: { serviceTier: "priority", reasoningEffort: "high" },
        },
      },
      { codexServiceTier: { enabled: true, tier: "default" } }
    ),
    { providerSpecificData: { requestDefaults: { reasoningEffort: "high" } } }
  );
  assert.equal(
    applyCodexGlobalFastServiceTier("openai", existing, { codexServiceTier: { enabled: true } }),
    existing
  );
});

test("Codex global service tier matches provider-prefixed combo model ids", () => {
  const body: Record<string, unknown> = {};
  assert.deepEqual(
    applyCodexGlobalFastServiceTier(
      "codex",
      { providerSpecificData: {} },
      { codexServiceTier: { enabled: true, tier: "priority" } },
      { model: "codex/gpt-5.5", body }
    ),
    { providerSpecificData: { requestDefaults: { serviceTier: "priority" } } }
  );
  assert.equal(body.service_tier, "priority");

  const unsupported = { providerSpecificData: {} };
  assert.equal(
    applyCodexGlobalFastServiceTier(
      "codex",
      unsupported,
      { codexServiceTier: { enabled: true, tier: "priority" } },
      { model: "codex/gpt-5.3-codex" }
    ),
    unsupported
  );
});

test("Codex global flex writes body service_tier when available", () => {
  const body: Record<string, unknown> = {};
  const credentials = { providerSpecificData: {} };
  const injected = applyCodexGlobalFastServiceTier(
    "codex",
    credentials,
    { codexServiceTier: { enabled: true, tier: "flex" } },
    { model: "gpt-5.5", body }
  );
  assert.equal(body.service_tier, "flex");
  assert.deepEqual(injected, {
    providerSpecificData: { requestDefaults: { serviceTier: "flex" } },
  });
});

test("Codex global service tier only short-circuits on valid body service_tier", () => {
  const invalidBody: Record<string, unknown> = { service_tier: "invalid" };
  const injected = applyCodexGlobalFastServiceTier(
    "codex",
    { providerSpecificData: {} },
    { codexServiceTier: { enabled: true, tier: "priority" } },
    { model: "gpt-5.5", body: invalidBody }
  );

  assert.deepEqual(injected, {
    providerSpecificData: { requestDefaults: { serviceTier: "priority" } },
  });
  assert.equal(invalidBody.service_tier, "priority");

  const validBody: Record<string, unknown> = { service_tier: " Flex " };
  const unchanged = { providerSpecificData: {} };
  assert.equal(
    applyCodexGlobalFastServiceTier(
      "codex",
      unchanged,
      { codexServiceTier: { enabled: true, tier: "priority" } },
      { model: "gpt-5.5", body: validBody }
    ),
    unchanged
  );
  assert.equal(validBody.service_tier, "flex");
});
