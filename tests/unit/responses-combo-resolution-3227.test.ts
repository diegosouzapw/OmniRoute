/**
 * #3227 / #3233 — combo names broke on /v1/responses in v3.8.9+.
 *
 * The Codex CLI WS→HTTP fallback added `resolveResponsesApiModel`, which rewrites a bare
 * model id to `codex/<id>` whenever `codex/<id>` resolves to the codex provider. Codex
 * accepts ANY model string, so a *combo* name with no slash (e.g. `n8n-text`,
 * `paid-premium`) was force-rewritten to `codex/<combo>` and sent to Codex —
 * "No credentials for provider: codex" / "model not supported" — instead of being
 * resolved as a combo. The fix skips the codex rewrite when the bare name is a combo.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveResponsesApiModel } from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";

// Resolver where bare ids resolve to a non-codex default, but codex accepts anything
// (mirrors real getModelInfo: the codex provider passes arbitrary model strings).
const resolver = async (modelStr: string) => {
  if (modelStr.startsWith("codex/")) return { provider: "codex", model: modelStr.slice(6) };
  if (modelStr === "gpt-5.5") return { provider: "openrouter", model: "gpt-5.5" };
  return { provider: "openrouter", model: modelStr };
};

test("a bare combo name is NOT rewritten to codex/ (it must resolve as a combo)", async () => {
  const isCombo = async (name: string) => name === "n8n-text" || name === "paid-premium";

  for (const combo of ["n8n-text", "paid-premium"]) {
    const out = await resolveResponsesApiModel(combo, resolver, isCombo);
    assert.equal(out.changed, false, `${combo} must not be codex-prefixed`);
    assert.equal(out.model, combo);
  }
});

test("a bare ChatGPT model id is still codex-preferred (Codex CLI WS→HTTP fallback preserved)", async () => {
  const isCombo = async () => false;
  const out = await resolveResponsesApiModel("gpt-5.5", resolver, isCombo);
  assert.equal(out.changed, true);
  assert.equal(out.model, "codex/gpt-5.5");
});

test("provider-prefixed ids pass through unchanged", async () => {
  const out = await resolveResponsesApiModel("anthropic/claude-opus-4-8", resolver, async () => false);
  assert.equal(out.changed, false);
  assert.equal(out.model, "anthropic/claude-opus-4-8");
});
