/**
 * #7624 — explicit feature-flag defaults.
 *
 * The `features` block in opencode.json marks every toggle `.optional()` with
 * no default. The effective value was previously only knowable by tracing the
 * implicit `features.X !== false` (default-ON) / `features.X === true`
 * (default-OFF) convention scattered across each read site, which left
 * operators unsure whether combos / autoCombos / enrichment were enabled when
 * they omitted the block.
 *
 * `OMNIROUTE_FEATURE_DEFAULTS` declares those defaults explicitly and
 * `resolveEffectiveFeatureFlags(features)` derives the effective state for any
 * (possibly-undefined) features object, mirroring the read-site conventions
 * exactly. These are purely derived — runtime routing behaviour is unchanged.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  OMNIROUTE_FEATURE_DEFAULTS,
  resolveEffectiveFeatureFlags,
} from "../src/index.js";

const DEFAULT_ON = [
  "combos",
  "autoCombos",
  "enrichment",
  "diskCache",
  "providerTag",
  "fetchInterceptor",
  "geminiSanitization",
] as const;

const DEFAULT_OFF = [
  "compressionMetadata",
  "usableOnly",
  "mcpAutoEmit",
  "debugLog",
  "startupDebug",
] as const;

test("OMNIROUTE_FEATURE_DEFAULTS: declares each flag with its documented default", () => {
  for (const key of DEFAULT_ON) {
    assert.equal(OMNIROUTE_FEATURE_DEFAULTS[key], true, `${key} defaults ON`);
  }
  for (const key of DEFAULT_OFF) {
    assert.equal(OMNIROUTE_FEATURE_DEFAULTS[key], false, `${key} defaults OFF`);
  }
});

test("resolveEffectiveFeatureFlags: undefined features → full declared default set", () => {
  const flags = resolveEffectiveFeatureFlags(undefined);
  for (const key of DEFAULT_ON) {
    assert.equal(flags[key], true, `${key} effective ON when features omitted`);
  }
  for (const key of DEFAULT_OFF) {
    assert.equal(flags[key], false, `${key} effective OFF when features omitted`);
  }
});

test("resolveEffectiveFeatureFlags: empty features object → same as omitted", () => {
  assert.deepEqual(
    resolveEffectiveFeatureFlags({}),
    resolveEffectiveFeatureFlags(undefined)
  );
});

test("resolveEffectiveFeatureFlags: explicit false disables a default-ON flag", () => {
  const flags = resolveEffectiveFeatureFlags({ autoCombos: false });
  assert.equal(flags.autoCombos, false, "explicit autoCombos:false honoured");
  // Untouched flags keep their declared defaults.
  assert.equal(flags.combos, true);
  assert.equal(flags.enrichment, true);
});

test("resolveEffectiveFeatureFlags: explicit true enables a default-OFF flag", () => {
  const flags = resolveEffectiveFeatureFlags({ compressionMetadata: true });
  assert.equal(flags.compressionMetadata, true, "explicit compressionMetadata:true honoured");
  assert.equal(flags.usableOnly, false, "other opt-in flags stay OFF");
});

test("resolveEffectiveFeatureFlags: non-boolean sibling keys do not leak into flags", () => {
  // features may also carry mcpToken/logLevel/apiFormat — the resolver must
  // only ever return the boolean toggle keys.
  const flags = resolveEffectiveFeatureFlags({
    mcpAutoEmit: true,
    mcpToken: "sk-mcp-token-abc",
    logLevel: "debug",
  });
  assert.equal(flags.mcpAutoEmit, true);
  assert.equal(Object.keys(flags).length, Object.keys(OMNIROUTE_FEATURE_DEFAULTS).length);
  assert.equal("mcpToken" in flags, false);
  assert.equal("logLevel" in flags, false);
});
