import test from "node:test";
import assert from "node:assert/strict";

// #4424 — opt-in low-noise /v1/models serialization. Pure helpers: parse the
// per-request mode param and collapse alias↔canonical cross-prefix duplicates to a
// single preferred-prefix entry per model, while preserving genuine same-id variants
// (e.g. audio transcription vs speech) and never dropping a model family entirely.

import {
  CATALOG_PREFIX_MODES,
  parsePrefixModeParam,
  normalizeCatalogPrefixes,
} from "../../src/app/api/v1/models/catalogPrefixMode.ts";

// ── parsePrefixModeParam ─────────────────────────────────────────────────

test("CATALOG_PREFIX_MODES lists exactly dual/alias/canonical", () => {
  assert.deepEqual([...CATALOG_PREFIX_MODES].sort(), ["alias", "canonical", "dual"]);
});

test("parsePrefixModeParam accepts the three modes case-insensitively", () => {
  assert.equal(parsePrefixModeParam("dual"), "dual");
  assert.equal(parsePrefixModeParam("alias"), "alias");
  assert.equal(parsePrefixModeParam("canonical"), "canonical");
  assert.equal(parsePrefixModeParam("ALIAS"), "alias");
  assert.equal(parsePrefixModeParam("  Canonical "), "canonical");
});

test("parsePrefixModeParam rejects anything else", () => {
  assert.equal(parsePrefixModeParam("bogus"), null);
  assert.equal(parsePrefixModeParam(""), null);
  assert.equal(parsePrefixModeParam(undefined), null);
  assert.equal(parsePrefixModeParam(123), null);
  assert.equal(parsePrefixModeParam(null), null);
});

// ── normalizeCatalogPrefixes ─────────────────────────────────────────────

const ALIAS_MAP = { providerIdToAlias: { "deepseek-web": "ds-web", codex: "cx" } };

function dsWebPair() {
  return [
    { id: "ds-web/deepseek-v4-pro", owned_by: "deepseek-web", root: "deepseek-v4-pro", parent: null },
    {
      id: "deepseek-web/deepseek-v4-pro",
      owned_by: "deepseek-web",
      root: "deepseek-v4-pro",
      parent: "ds-web/deepseek-v4-pro",
    },
  ];
}

test("dual mode is the identity (zero behavior change)", () => {
  const input = dsWebPair();
  const out = normalizeCatalogPrefixes(input, "dual", ALIAS_MAP);
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((m) => m.id),
    ["ds-web/deepseek-v4-pro", "deepseek-web/deepseek-v4-pro"]
  );
});

test("alias mode keeps the alias-prefixed entry, drops the canonical dupe", () => {
  const out = normalizeCatalogPrefixes(dsWebPair(), "alias", ALIAS_MAP);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "ds-web/deepseek-v4-pro");
});

test("canonical mode keeps the canonical-id-prefixed entry", () => {
  const out = normalizeCatalogPrefixes(dsWebPair(), "canonical", ALIAS_MAP);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "deepseek-web/deepseek-v4-pro");
});

test("alias mode collapses exact-duplicate ids (codex/gpt-5.5 twice → one)", () => {
  const input = [
    { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", parent: null },
    { id: "codex/gpt-5.5", owned_by: "codex", root: "gpt-5.5", parent: null },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", ALIAS_MAP);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "codex/gpt-5.5");
});

test("same-id audio variants (transcription vs speech) are preserved in alias mode", () => {
  const input = [
    { id: "prov/whisper", owned_by: "prov", root: "whisper", type: "audio", subtype: "transcription" },
    { id: "prov/whisper", owned_by: "prov", root: "whisper", type: "audio", subtype: "speech" },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", { providerIdToAlias: { prov: "prov" } });
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((m) => m.subtype).sort(),
    ["speech", "transcription"]
  );
});

test("entries without a root (combos) are never collapsed away", () => {
  const input = [
    { id: "combo/alpha", owned_by: "combo", parent: null },
    { id: "combo/beta", owned_by: "combo", parent: null },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", { providerIdToAlias: {} });
  assert.equal(out.length, 2);
});

test("a group with no alias-prefixed entry falls back to the first (never drops the family)", () => {
  // only canonical + bare exist; alias 'cx' is absent → keep the first entry
  const input = [
    { id: "codex/o4", owned_by: "codex", root: "o4", parent: null },
    { id: "o4", owned_by: "codex", root: "o4", parent: "codex/o4" },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", ALIAS_MAP);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "codex/o4");
});

test("openrouter-style ids whose root contains a slash collapse correctly", () => {
  const input = [
    { id: "or/anthropic/claude", owned_by: "openrouter", root: "anthropic/claude", parent: null },
    {
      id: "openrouter/anthropic/claude",
      owned_by: "openrouter",
      root: "anthropic/claude",
      parent: "or/anthropic/claude",
    },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", {
    providerIdToAlias: { openrouter: "or" },
  });
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "or/anthropic/claude");
});

test("relative order of kept entries is preserved", () => {
  const input = [
    { id: "ds-web/a", owned_by: "deepseek-web", root: "a", parent: null },
    { id: "deepseek-web/a", owned_by: "deepseek-web", root: "a", parent: "ds-web/a" },
    { id: "cx/b", owned_by: "codex", root: "b", parent: null },
    { id: "codex/b", owned_by: "codex", root: "b", parent: "cx/b" },
  ];
  const out = normalizeCatalogPrefixes(input, "alias", ALIAS_MAP);
  assert.deepEqual(
    out.map((m) => m.id),
    ["ds-web/a", "cx/b"]
  );
});
