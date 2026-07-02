import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1327: Codex deprecated the `[features].codex_hooks`
// flag in favor of `[features].hooks`. The codex-settings generator parses an existing
// config.toml and writes it back but never migrated the deprecated key, so users with an
// old config kept a key recent Codex CLI versions ignore.
const { migrateCodexFeatureFlags } = await import("../../src/shared/utils/codexConfig.ts");

test("#1327: renames deprecated [features].codex_hooks to [features].hooks", () => {
  const parsed = { _root: {}, _sections: { features: { codex_hooks: true } } };
  migrateCodexFeatureFlags(parsed);
  assert.deepEqual(parsed._sections.features, { hooks: true });
});

test("#1327: keeps an existing hooks value and removes the deprecated key", () => {
  const parsed = { _root: {}, _sections: { features: { codex_hooks: true, hooks: false } } };
  migrateCodexFeatureFlags(parsed);
  assert.deepEqual(parsed._sections.features, { hooks: false });
});

test("#1327: leaves a config that already uses hooks untouched", () => {
  const parsed = { _root: {}, _sections: { features: { hooks: true } } };
  migrateCodexFeatureFlags(parsed);
  assert.deepEqual(parsed._sections.features, { hooks: true });
});

test("#1327: no-op when there is no [features] section", () => {
  const parsed = { _root: { model: "x" }, _sections: {} };
  migrateCodexFeatureFlags(parsed);
  assert.deepEqual(parsed._sections, {});
});
