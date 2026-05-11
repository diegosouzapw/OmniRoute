import test from "node:test";
import assert from "node:assert/strict";

import {
  applyCodexGlobalFastServiceTier,
  getCodexEffectiveFastServiceTier,
  isCodexGlobalFastServiceTierEnabled,
} from "../../src/lib/providers/codexFastTier.ts";

test("Codex global fast tier recognizes legacy and current setting shapes", () => {
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexServiceTier: { enabled: true } }), true);
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexServiceTier: true }), true);
  assert.equal(isCodexGlobalFastServiceTierEnabled({ codexFastServiceTier: true }), true);
  assert.equal(
    isCodexGlobalFastServiceTierEnabled({ codexServiceTier: { enabled: false } }),
    false
  );
  assert.equal(isCodexGlobalFastServiceTierEnabled({}), false);
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
});

test("Codex global fast tier injects priority default without overwriting connection defaults", () => {
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
  assert.equal(
    applyCodexGlobalFastServiceTier("codex", existing, { codexServiceTier: { enabled: true } }),
    existing
  );
  assert.equal(
    applyCodexGlobalFastServiceTier("openai", existing, { codexServiceTier: { enabled: true } }),
    existing
  );
});
