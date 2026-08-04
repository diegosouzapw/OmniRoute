import { test } from "node:test";
import assert from "node:assert/strict";

import {
  CC_DISCOVERY_PREFIX,
  CC_DISCOVERY_COMBO_PREFIX,
  appendCcDiscoveryAliases,
} from "../../open-sse/utils/ccDiscoveryAliases.ts";

interface CatalogEntry {
  id: string;
  owned_by?: string;
  name?: string;
  root?: string;
  [key: string]: unknown;
}

const alwaysEnabled = (): boolean => true;

test("constants match the discovery prefixes", () => {
  assert.equal(CC_DISCOVERY_PREFIX, "claude/");
  assert.equal(CC_DISCOVERY_COMBO_PREFIX, "claude/combo/");
});

test("adds a claude/ mirror with display_name and root for an eligible model", () => {
  const models: CatalogEntry[] = [{ id: "kimi/kimi-k2.6", owned_by: "kimi", name: "Kimi K2.6" }];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);

  assert.equal(out.length, 2);
  assert.deepEqual(out[0], models[0]);
  const alias = out[1];
  assert.equal(alias.id, "claude/kimi/kimi-k2.6");
  assert.equal(alias.root, "kimi/kimi-k2.6");
  assert.equal(alias.display_name, "Kimi K2.6 (OmniRoute)");
  assert.equal(alias.owned_by, "kimi");
});

test("falls back to the id for display_name when name is missing", () => {
  const models: CatalogEntry[] = [{ id: "kimi/kimi-k2.6" }];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  assert.equal(out[1].display_name, "kimi/kimi-k2.6 (OmniRoute)");
});

test("never re-mirrors ids that already start with claude or anthropic", () => {
  const models: CatalogEntry[] = [
    { id: "claude/claude-fable-5", owned_by: "claude" },
    { id: "anthropic/claude-opus-4-8", owned_by: "anthropic" },
    { id: "claudeish/not-actually-claude", owned_by: "claudeish" },
  ];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  // "claudeish/..." does not match the anchored (claude|anthropic)(/|$) pattern,
  // so it is still eligible for mirroring — only exact claude/anthropic prefixes are excluded.
  assert.equal(out.length, models.length + 1);
  assert.equal(out[out.length - 1].id, "claude/claudeish/not-actually-claude");
});

test("never aliases no-think/ ids or effort-suffixed ids", () => {
  const models: CatalogEntry[] = [
    { id: "no-think/claude/claude-fable-5", owned_by: "claude" },
    { id: "claude/claude-fable-5-high", owned_by: "claude" },
    { id: "claude/claude-fable-5-xhigh", owned_by: "claude" },
    { id: "kimi/kimi-k2.6-medium", owned_by: "kimi" },
  ];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  assert.equal(out, models);
});

test("mirrors combo entries under claude/combo/", () => {
  const models: CatalogEntry[] = [
    { id: "custo-otimizado", owned_by: "combo", name: "Custo Otimizado" },
  ];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  assert.equal(out.length, 2);
  assert.equal(out[1].id, "claude/combo/custo-otimizado");
  assert.equal(out[1].root, "custo-otimizado");
  assert.equal(out[1].display_name, "Custo Otimizado (OmniRoute)");
});

test("mirrors combo names containing spaces (comboNameSchema allows them)", () => {
  const models: CatalogEntry[] = [
    { id: "Custo Otimizado BR", owned_by: "combo", name: "Custo Otimizado BR" },
  ];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  assert.equal(out.length, 2);
  assert.equal(out[1].id, "claude/combo/Custo Otimizado BR");
  assert.equal(out[1].root, "Custo Otimizado BR");
});

test("skips disabled entries and returns the same array reference when nothing is eligible", () => {
  const models: CatalogEntry[] = [{ id: "kimi/kimi-k2.6", owned_by: "kimi" }];
  const out = appendCcDiscoveryAliases(models, () => false);
  assert.equal(out, models);
});

test("does NOT mirror built-in auto/* combos (request path can't resolve them)", () => {
  // Built-in auto combos are synthesized by createBuiltinAutoCombo, not stored in
  // the DB combos table, so getComboByName() misses them at request time — mirroring
  // them would advertise an id the request path rejects. See ccDiscoveryAliasResolve.
  const models: CatalogEntry[] = [
    { id: "auto", owned_by: "combo", name: "Auto" },
    { id: "auto/glm", owned_by: "combo", name: "Auto GLM" },
    { id: "auto/pro:pro", owned_by: "combo", name: "Auto Pro" },
    { id: "real-combo", owned_by: "combo", name: "Real Combo" },
  ];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  const aliasIds = out.filter((m) => String(m.id).startsWith("claude/")).map((m) => m.id);
  assert.deepEqual(aliasIds, ["claude/combo/real-combo"]);
});

test("returns the same array reference when the input is empty", () => {
  const models: CatalogEntry[] = [];
  const out = appendCcDiscoveryAliases(models, alwaysEnabled);
  assert.equal(out, models);
});

test("idempotent: running twice never double-prefixes (alias entries are skipped as already-claude)", () => {
  const models: CatalogEntry[] = [
    { id: "kimi/kimi-k2.6", owned_by: "kimi", name: "Kimi K2.6" },
    { id: "custo-otimizado", owned_by: "combo", name: "Custo Otimizado" },
  ];
  const once = appendCcDiscoveryAliases(models, alwaysEnabled);
  const twice = appendCcDiscoveryAliases(once, alwaysEnabled);

  // The alias entries synthesized in `once` already start with "claude/", so the
  // second pass's ALREADY_CLAUDE_RE guard skips them — only the still-present
  // original entries are (re-)mirrored. Critically, no id is ever double-prefixed.
  const doublePrefixed = twice.filter(
    (m) => m.id.startsWith("claude/claude/") || m.id.startsWith("claude/combo/combo/")
  );
  assert.equal(doublePrefixed.length, 0);

  // Every alias id that resulted from re-processing `once` is a stable mirror of an
  // original entry, never a mirror of an already-mirrored one.
  const aliasIds = twice.filter((m) => m.id.startsWith(CC_DISCOVERY_PREFIX)).map((m) => m.id);
  for (const id of aliasIds) {
    assert.equal(id.startsWith("claude/claude/"), false);
  }
});

test("non-array input is returned unchanged", () => {
  const notAnArray = null as unknown as CatalogEntry[];
  assert.equal(appendCcDiscoveryAliases(notAnArray, alwaysEnabled), notAnArray);
});
