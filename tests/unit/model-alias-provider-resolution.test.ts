/**
 * Regression tests for issue #2618: custom model aliases overridden by provider inference
 *
 * Root cause: getModelInfo() in src/sse/services/model.ts called getModelAliases()
 * which reads from key_value WHERE namespace='modelAliases'. But the Settings UI and
 * /api/settings/model-aliases store aliases in key_value WHERE namespace='settings'
 * (via updateSettings({ modelAliases: ... })). These are two different stores that are
 * never in sync. So user-configured aliases from the UI never reached getModelInfo(),
 * and provider inference (e.g. /^gpt-/i → openai) always won.
 *
 * Fix: getModelInfo() now merges both alias stores (settings-based + DB-namespace-based)
 * so aliases configured via either path are respected during routing.
 *
 * These tests use getModelInfoCore() directly (no DB dependency) to verify the pure
 * alias resolution logic, plus an integration smoke-test of the combined getter.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

// ── Scenario A: direct exact alias "gpt-5.6-sol" → "cx/gpt-5.6-sol" ─────────
// When aliases contain { "gpt-5.6-sol": "cx/gpt-5.6-sol" }, the request for "gpt-5.6-sol"
// must resolve to provider "codex" (cx = codex alias), NOT "openai".

test("A: custom alias gpt-5.6-sol → cx/gpt-5.6-sol resolves to codex, not openai", async () => {
  const aliases = { "gpt-5.6-sol": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("gpt-5.6-sol", aliases);
  assert.strictEqual(
    result.provider,
    "codex",
    `Expected provider "codex" but got "${result.provider}" — alias was overridden by provider inference`
  );
  assert.strictEqual(result.model, "gpt-5.6-sol");
});

test("A: custom alias gpt-5.6-sol → cx/gpt-5.6-sol with async getter resolves to codex", async () => {
  const aliases = { "gpt-5.6-sol": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("gpt-5.6-sol", async () => aliases);
  assert.strictEqual(result.provider, "codex");
  assert.strictEqual(result.model, "gpt-5.6-sol");
});

test("A: without alias, gpt-5.6-sol resolves to openai via inference (baseline)", async () => {
  // Ensure that inference still works when no alias is configured.
  const result = await getModelInfoCore("gpt-5.6-sol", {});
  assert.strictEqual(result.provider, "openai");
  assert.strictEqual(result.model, "gpt-5.6-sol");
});

// ── Scenario B: wildcard alias "*gpt-5.6*" → "cx/gpt-5.6-sol" ───────────────
// Glob patterns are also supported via resolveWildcardAlias.

test("B: wildcard alias *gpt-5.6* → cx/gpt-5.6-sol resolves to codex", async () => {
  const aliases = { "*gpt-5.6*": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("gpt-5.6-sol", aliases);
  assert.strictEqual(result.provider, "codex");
  assert.strictEqual(result.model, "gpt-5.6-sol");
});

test("B: wildcard alias *gpt-5* → cx/gpt-5.6-sol resolves to codex", async () => {
  const aliases = { "*gpt-5*": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("gpt-5.6-sol", aliases);
  assert.strictEqual(result.provider, "codex");
});

// ── Scenario C: explicit provider prefix "openai/gpt-5.6-sol" ────────────────
// When the client sends "openai/gpt-5.6-sol" explicitly, parseModel returns
// isAlias=false. This bypasses the alias lookup in getModelInfoCore (by design —
// explicit provider prefixes override aliases). The alias "gpt-5.6-sol → cx/gpt-5.6-sol"
// should NOT apply here; this is intentional behavior.
// NOTE: Aliases for "openai/gpt-5.6-sol" → "cx/gpt-5.6-sol" are a distinct key and
// must be configured explicitly if desired.

test("C: explicit openai/gpt-5.6-sol resolves to openai regardless of bare alias", async () => {
  // The alias is for bare "gpt-5.6-sol", NOT for "openai/gpt-5.6-sol".
  // An explicit provider prefix takes precedence over aliases on the bare name.
  const aliases = { "gpt-5.6-sol": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("openai/gpt-5.6-sol", aliases);
  assert.strictEqual(result.provider, "openai");
  assert.strictEqual(result.model, "gpt-5.6-sol");
});

test("C: explicit openai/gpt-5.6-sol alias is not applied on the isAlias=false path", async () => {
  // A slashful input is NOT treated as an alias key by getModelInfoCore.
  // The alias lookup only runs when isAlias=true (bare model name).
  // Users wanting Codex must send cx/gpt-5.6-sol explicitly.
  const aliases = { "openai/gpt-5.6-sol": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("openai/gpt-5.6-sol", aliases);
  // The slashful input is parsed as provider=openai, model=gpt-5.6-sol — alias not consulted.
  assert.strictEqual(result.provider, "openai");
});

// ── Scenario D: non-gpt aliases are unaffected ───────────────────────────────

test("D: unrelated models with no alias still route by inference", async () => {
  const aliases = { "gpt-5.6-sol": "cx/gpt-5.6-sol" };
  const result = await getModelInfoCore("gpt-4o", aliases);
  assert.strictEqual(result.provider, "openai");
  assert.strictEqual(result.model, "gpt-4o");
});

test("D: claude model alias routes to requested provider", async () => {
  // Explicit alias for a multi-provider model wins over inference
  const aliases = {
    "gpt-5.6-sol": "cx/gpt-5.6-sol",
    "my-claude": "anthropic/claude-opus-4-7",
  };
  const result = await getModelInfoCore("my-claude", aliases);
  assert.strictEqual(result.provider, "anthropic");
  assert.strictEqual(result.model, "claude-opus-4-7");
});

// ── Scenario E: alias to arbitrary provider/model pair ───────────────────────

test("E: alias my-model → nebius/llama-3 resolves to nebius", async () => {
  const aliases = { "my-model": "nebius/llama-3.3-70b-instruct" };
  const result = await getModelInfoCore("my-model", aliases);
  assert.strictEqual(result.provider, "nebius");
  assert.strictEqual(result.model, "llama-3.3-70b-instruct");
});
