/**
 * #3509 — the "auto" combo is broken on Codex (/v1/responses).
 *
 * Setting the Codex model to "auto" (OmniRoute's zero-config auto-routing keyword) returned
 * `[400] {"detail":"The 'auto' model is not supported when using Codex with a ChatGPT account."}`.
 * `resolveResponsesApiModel` only treated DB-stored combo NAMES as pass-through; the bare "auto"
 * keyword (handled by the isAutoRouting path in chat.ts, not a DB combo) fell through and was
 * rewritten to "codex/auto", which ChatGPT rejects. It must pass through untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveResponsesApiModel } from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";

// Mirrors the real resolver: bare ids resolve to a non-codex default, but codex accepts
// any string — so without a guard, "auto" → "codex/auto".
const resolver = async (modelStr: string) => {
  if (modelStr.startsWith("codex/")) return { provider: "codex", model: modelStr.slice(6) };
  return { provider: "openrouter", model: modelStr };
};

test("#3509 the bare 'auto' keyword is NOT rewritten to codex/auto", async () => {
  const isCombo = async () => false; // "auto" is not a DB-stored combo
  const out = await resolveResponsesApiModel("auto", resolver, isCombo);
  assert.equal(out.changed, false, "'auto' must pass through for zero-config auto-routing");
  assert.equal(out.model, "auto");
});

test("#3509 'auto/<strategy>' passes through unchanged (already handled by the slash guard)", async () => {
  const out = await resolveResponsesApiModel("auto/cost-optimized", resolver, async () => false);
  assert.equal(out.changed, false);
  assert.equal(out.model, "auto/cost-optimized");
});

test("#3509 a real ChatGPT model id is still codex-preferred (regression)", async () => {
  const out = await resolveResponsesApiModel("gpt-5.5", resolver, async () => false);
  assert.equal(out.changed, true);
  assert.equal(out.model, "codex/gpt-5.5");
});
