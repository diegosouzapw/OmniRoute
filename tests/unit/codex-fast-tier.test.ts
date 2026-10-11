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
import {
  expandVscodeServiceTierModels,
  resolveVscodeServiceTierRequest,
} from "../../src/lib/vscode/serviceTierVariants.ts";

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
    {
      enabled: true,
      tier: "default",
      supportedModels: [
        "gpt-6.1-sol",
        "gpt-6-astra",
        "gpt-6-sol",
        "gpt-6-luna",
        "gpt-5.6-sol",
        "gpt-5.6-terra",
        "gpt-5.6-luna",
        "gpt-5.5",
      ],
    }
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

test("GPT-6 global Fast defaults inject priority for base and prefixed effort models", () => {
  const settingsVariants = [
    { codexServiceTier: { enabled: true } },
    { codexServiceTier: { enabled: true, tier: "priority" } },
    { codexServiceTier: true },
    { codexFastServiceTier: true },
  ];
  for (const model of ["gpt-6-astra", "gpt-6-sol", "gpt-6-luna"]) {
    for (const id of [model, `cx/${model}`, `codex/${model}-high`]) {
      for (const settings of settingsVariants) {
        const body: Record<string, unknown> = {};
        const result = applyCodexGlobalFastServiceTier(
          "codex",
          { providerSpecificData: {} },
          settings,
          { model: id, body }
        );
        assert.equal(body.service_tier, "priority", id);
        assert.deepEqual(result.providerSpecificData, {
          requestDefaults: { serviceTier: "priority" },
        });
      }
    }
  }
});

test("GPT-6 Fast defaults preserve explicit tiers and operator model selections", () => {
  const credentials = { providerSpecificData: {} };
  const settings = { codexServiceTier: { enabled: true, tier: "priority" } };
  for (const tier of ["default", "flex", "priority"]) {
    const body: Record<string, unknown> = { service_tier: tier };
    assert.equal(
      applyCodexGlobalFastServiceTier("codex", credentials, settings, {
        model: "gpt-6-sol",
        body,
      }),
      credentials
    );
    assert.equal(body.service_tier, tier);
  }
  for (const [provider, override] of [
    ["codex", { codexServiceTier: { enabled: false } }],
    ["codex", { codexServiceTier: { enabled: true, supportedModels: ["gpt-5.5"] } }],
    ["openai", settings],
  ] as const) {
    const body: Record<string, unknown> = {};
    assert.equal(
      applyCodexGlobalFastServiceTier(provider, credentials, override, {
        model: "gpt-6-sol",
        body,
      }),
      credentials
    );
    assert.equal(body.service_tier, undefined);
  }
});

test("GPT-6 VS Code service-tier choices rewrite Fast variants to priority requests", () => {
  for (const model of ["gpt-6-astra", "gpt-6-sol", "gpt-6-luna"]) {
    const id = `codex/${model}`;
    const variants = expandVscodeServiceTierModels([{ id, owned_by: "codex" }]);
    assert.deepEqual(
      variants.map((entry) => entry.id),
      [id, `${id}__tier_priority`, `${id}__tier_flex`]
    );
    assert.deepEqual(resolveVscodeServiceTierRequest({ model: `${id}__tier_priority` }), {
      model: id,
      service_tier: "priority",
    });
  }
});
