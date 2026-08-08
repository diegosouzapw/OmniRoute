/**
 * #9473 — Model allowlist/blocklist for the opencode-plugin.
 *
 * Tests for the pure filter helpers (`compileModelListFilter`,
 * `passesModelAllowlist`, `passesComboAllowlist`) and the schema + hook-level
 * integration. The allowlist/blocklist composes with `usableOnly` (all filters
 * AND together), blocklist wins over allowlist (deny takes precedence), and
 * bare-suffix entries (e.g. "claude-opus-4-7") match any "{prefix}/claude-opus-4-7".
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  compileModelListFilter,
  passesModelAllowlist,
  passesComboAllowlist,
  parseOmniRoutePluginOptions,
  buildStaticProviderEntry,
  resolveOmniRoutePluginOptions,
  type OmniRouteRawCombo,
  type OmniRouteRawModelEntry,
} from "../src/index.js";

// ─────────────────────────────────────────────────────────────────────────
// compileModelListFilter
// ─────────────────────────────────────────────────────────────────────────

test("compileModelListFilter: undefined list → undefined", () => {
  assert.equal(compileModelListFilter(undefined), undefined);
});

test("compileModelListFilter: empty array → undefined", () => {
  assert.equal(compileModelListFilter([]), undefined);
});

test("compileModelListFilter: raw IDs with slash → exact set populated", () => {
  const f = compileModelListFilter(["cc/claude-opus-4-7", "glm/gpt-5"]);
  assert.ok(f);
  assert.equal(f.exact.has("cc/claude-opus-4-7"), true);
  assert.equal(f.exact.has("glm/gpt-5"), true);
  assert.equal(f.suffixes.size, 0);
});

test("compileModelListFilter: bare IDs (no slash) → suffixes set populated", () => {
  const f = compileModelListFilter(["claude-opus-4-7", "gpt-5"]);
  assert.ok(f);
  assert.equal(f.suffixes.has("claude-opus-4-7"), true);
  assert.equal(f.suffixes.has("gpt-5"), true);
  assert.equal(f.exact.size, 0);
});

test("compileModelListFilter: mixed raw + bare → both sets populated", () => {
  const f = compileModelListFilter(["cc/claude-opus-4-7", "gpt-5"]);
  assert.ok(f);
  assert.equal(f.exact.has("cc/claude-opus-4-7"), true);
  assert.equal(f.suffixes.has("gpt-5"), true);
});

// ─────────────────────────────────────────────────────────────────────────
// passesModelAllowlist
// ─────────────────────────────────────────────────────────────────────────

test("passesModelAllowlist: no visible, no hidden → keep (passthrough)", () => {
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", undefined, undefined), true);
});

test("passesModelAllowlist: visible undefined, hidden undefined → keep", () => {
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", undefined, undefined), true);
});

test("passesModelAllowlist: visible set, id matches exact → keep", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", vis, undefined), true);
});

test("passesModelAllowlist: visible set, id matches suffix → keep", () => {
  const vis = compileModelListFilter(["claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", vis, undefined), true);
});

test("passesModelAllowlist: visible set, id does NOT match → drop", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("glm/gpt-5", vis, undefined), false);
});

test("passesModelAllowlist: visible set, bare suffix matches different prefix → keep", () => {
  const vis = compileModelListFilter(["claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("kr/claude-opus-4-7", vis, undefined), true);
});

test("passesModelAllowlist: hidden set, id matches exact → drop", () => {
  const hid = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", undefined, hid), false);
});

test("passesModelAllowlist: hidden set, id matches suffix → drop", () => {
  const hid = compileModelListFilter(["claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", undefined, hid), false);
});

test("passesModelAllowlist: hidden set, id does NOT match → keep", () => {
  const hid = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("glm/gpt-5", undefined, hid), true);
});

test("passesModelAllowlist: id in BOTH visible and hidden → DROP (deny wins)", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  const hid = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", vis, hid), false);
});

test("passesModelAllowlist: visible allows, hidden blocks different id → keep the visible one", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  const hid = compileModelListFilter(["glm/gpt-5"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", vis, hid), true);
  assert.equal(passesModelAllowlist("glm/gpt-5", vis, hid), false);
});

test("passesModelAllowlist: bare-suffix hidden blocks exact match too", () => {
  const hid = compileModelListFilter(["claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("cc/claude-opus-4-7", undefined, hid), false);
  assert.equal(passesModelAllowlist("kr/claude-opus-4-7", undefined, hid), false);
});

test("passesModelAllowlist: no-slash id, visible set has bare match → keep", () => {
  const vis = compileModelListFilter(["claude-primary"]);
  assert.equal(passesModelAllowlist("claude-primary", vis, undefined), true);
});

test("passesModelAllowlist: no-slash id, visible set has no match → drop", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesModelAllowlist("claude-primary", vis, undefined), false);
});

// ─────────────────────────────────────────────────────────────────────────
// passesComboAllowlist
// ─────────────────────────────────────────────────────────────────────────

function combo(models: OmniRouteRawCombo["models"]): OmniRouteRawCombo {
  return { id: "c1", name: "Test Combo", models };
}

test("passesComboAllowlist: visible undefined → keep", () => {
  const c = combo([{ kind: "model", model: "cc/claude-opus-4-7" }]);
  assert.equal(passesComboAllowlist(c, undefined), true);
});

test("passesComboAllowlist: ≥1 member matches visible → keep", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  const c = combo([
    { kind: "model", model: "dead/legacy" },
    { kind: "model", model: "cc/claude-opus-4-7" },
  ]);
  assert.equal(passesComboAllowlist(c, vis), true);
});

test("passesComboAllowlist: zero members match visible → drop", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  const c = combo([
    { kind: "model", model: "glm/gpt-5" },
    { kind: "model", model: "kr/claude-opus-4-7" },
  ]);
  assert.equal(passesComboAllowlist(c, vis), false);
});

test("passesComboAllowlist: bare suffix matches any prefix → keep", () => {
  const vis = compileModelListFilter(["claude-opus-4-7"]);
  const c = combo([{ kind: "model", model: "kr/claude-opus-4-7" }]);
  assert.equal(passesComboAllowlist(c, vis), true);
});

test("passesComboAllowlist: zero members → keep", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  assert.equal(passesComboAllowlist(combo([]), vis), true);
  assert.equal(passesComboAllowlist(combo(undefined), vis), true);
});

test("passesComboAllowlist: only combo-ref steps → keep", () => {
  const vis = compileModelListFilter(["cc/claude-opus-4-7"]);
  const c = combo([{ kind: "combo-ref", comboName: "nested" }]);
  assert.equal(passesComboAllowlist(c, vis), true);
});

// ─────────────────────────────────────────────────────────────────────────
// Schema — visibleModels / hiddenModels
// ─────────────────────────────────────────────────────────────────────────

test("parseOmniRoutePluginOptions: visibleModels string[] → preserved", () => {
  const r = parseOmniRoutePluginOptions({
    features: { visibleModels: ["cc/claude-opus-4-7", "gpt-5"] },
  });
  assert.deepEqual(r.features?.visibleModels, ["cc/claude-opus-4-7", "gpt-5"]);
});

test("parseOmniRoutePluginOptions: hiddenModels string[] → preserved", () => {
  const r = parseOmniRoutePluginOptions({
    features: { hiddenModels: ["glm/gpt-5"] },
  });
  assert.deepEqual(r.features?.hiddenModels, ["glm/gpt-5"]);
});

test("parseOmniRoutePluginOptions: both lists together → preserved", () => {
  const r = parseOmniRoutePluginOptions({
    features: {
      visibleModels: ["cc/claude-opus-4-7"],
      hiddenModels: ["glm/gpt-5"],
    },
  });
  assert.deepEqual(r.features?.visibleModels, ["cc/claude-opus-4-7"]);
  assert.deepEqual(r.features?.hiddenModels, ["glm/gpt-5"]);
});

test("parseOmniRoutePluginOptions: empty string in visibleModels → rejects", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        features: { visibleModels: [""] },
      }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

test("parseOmniRoutePluginOptions: empty string in hiddenModels → rejects", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        features: { hiddenModels: [""] },
      }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

test("parseOmniRoutePluginOptions: unknown features key still rejects (strict invariant)", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        features: { visibleModels: ["x"], unknownKey: true },
      }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

// ─────────────────────────────────────────────────────────────────────────
// buildStaticProviderEntry — allowlist/blocklist integration
// ─────────────────────────────────────────────────────────────────────────

const FAKE_RAW_MODELS: OmniRouteRawModelEntry[] = [
  { id: "cc/claude-opus-4-7", owned_by: "anthropic" },
  { id: "glm/gpt-5", owned_by: "openai" },
  { id: "kr/claude-opus-4-7", owned_by: "anthropic" },
  { id: "claude-primary", owned_by: "combo" },
];

test("buildStaticProviderEntry: no allowlist → all models emitted", () => {
  const opts = resolveOmniRoutePluginOptions({ features: {} });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.ok(ids.includes("cc/claude-opus-4-7"), "cc/claude-opus-4-7 should be present");
  assert.ok(ids.includes("glm/gpt-5"), "glm/gpt-5 should be present");
  assert.ok(ids.includes("kr/claude-opus-4-7"), "kr/claude-opus-4-7 should be present");
});

test("buildStaticProviderEntry: visibleModels filters to only listed IDs", () => {
  const opts = resolveOmniRoutePluginOptions({
    features: { visibleModels: ["cc/claude-opus-4-7"] },
  });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.ok(ids.includes("cc/claude-opus-4-7"), "cc/claude-opus-4-7 should be present");
  assert.equal(ids.includes("glm/gpt-5"), false, "glm/gpt-5 should be filtered out");
  assert.equal(ids.includes("kr/claude-opus-4-7"), false, "kr/claude-opus-4-7 should be filtered out");
});

test("buildStaticProviderEntry: hiddenModels drops listed IDs", () => {
  const opts = resolveOmniRoutePluginOptions({
    features: { hiddenModels: ["glm/gpt-5"] },
  });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.ok(ids.includes("cc/claude-opus-4-7"), "cc/claude-opus-4-7 should be present");
  assert.equal(ids.includes("glm/gpt-5"), false, "glm/gpt-5 should be hidden");
  assert.ok(ids.includes("kr/claude-opus-4-7"), "kr/claude-opus-4-7 should be present");
});

test("buildStaticProviderEntry: bare-suffix visibleModels matches any prefix", () => {
  const opts = resolveOmniRoutePluginOptions({
    features: { visibleModels: ["claude-opus-4-7"] },
  });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.ok(ids.includes("cc/claude-opus-4-7"), "cc/claude-opus-4-7 should match via suffix");
  assert.ok(ids.includes("kr/claude-opus-4-7"), "kr/claude-opus-4-7 should match via suffix");
  assert.equal(ids.includes("glm/gpt-5"), false, "glm/gpt-5 should be filtered out");
});

test("buildStaticProviderEntry: id in both visible and hidden → hidden wins", () => {
  const opts = resolveOmniRoutePluginOptions({
    features: {
      visibleModels: ["cc/claude-opus-4-7"],
      hiddenModels: ["cc/claude-opus-4-7"],
    },
  });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.equal(ids.includes("cc/claude-opus-4-7"), false, "deny takes precedence");
});

test("buildStaticProviderEntry: empty visibleModels → no filter (passthrough)", () => {
  const opts = resolveOmniRoutePluginOptions({
    features: { visibleModels: [] },
  });
  const entry = buildStaticProviderEntry(FAKE_RAW_MODELS, [], opts, "http://localhost:20128/v1", "sk-test");
  const ids = Object.keys(entry.models);
  assert.ok(ids.includes("cc/claude-opus-4-7"), "empty visibleModels should not filter");
  assert.ok(ids.includes("glm/gpt-5"), "empty visibleModels should not filter");
});
