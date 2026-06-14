/**
 * Issue #2877 — two routing/effort defects for the gpt-5.5 Codex family:
 *
 * (B) `gpt-5.5-xhigh` (and -high/-low) misrouted to the `openai` provider
 *     because only bare `gpt-5.5` was in CODEX_PREFERRED_UNPREFIXED_MODELS — the
 *     suffixed variants fell through to the `/^gpt-/` → openai fallback, so a
 *     Codex-OAuth-only user got "No credentials for provider: openai". Fixed by
 *     adding the variants to the set (`open-sse/services/model.ts`).
 *
 * (A) For a Codex-only account, a bare `gpt-5.5` Responses request was rerouted
 *     to codex but with the model hardcoded to `gpt-5.5-medium`
 *     (`src/sse/handlers/chatHelpers.ts`). The Codex executor reads that `-medium`
 *     suffix as an explicit `modelEffort`, which (per #2331) overrides the
 *     client's `reasoning.effort=xhigh` — silently demoting it. Fixed by keeping
 *     the bare `gpt-5.5` id; the executor's modelEffort-first precedence (#2331)
 *     is left untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gpt55-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

test.before(async () => {
  // Codex-only active account (no openai connection).
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex@example.com",
    providerSpecificData: { workspaceId: "ws-1" },
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Defect B: suffixed bare names infer codex, not openai ─────────────────────
for (const variant of ["gpt-5.5-xhigh", "gpt-5.5-high", "gpt-5.5-low"]) {
  test(`#2877(B) ${variant} infers codex (not openai)`, async () => {
    const info = await getModelInfoCore(variant, null);
    assert.equal(info.provider, "codex", `${variant} must infer the codex provider`);
    assert.equal(info.model, variant, "the explicit effort suffix must be preserved");
  });
}

// ── Defect A: Codex-only bare gpt-5.5 reroute must NOT bake a -medium suffix ───
test("#2877(A) Codex-only bare gpt-5.5 Responses request keeps the bare model id", async () => {
  const result = (await resolveModelOrError(
    "gpt-5.5",
    { input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }] },
    "/v1/responses",
    null
  )) as { provider?: string; model?: string };

  assert.equal(result.provider, "codex", "Codex-only account must reroute gpt-5.5 to codex");
  assert.equal(
    result.model,
    "gpt-5.5",
    "must NOT inject a -medium suffix (that would override a client reasoning.effort=xhigh)"
  );
});
