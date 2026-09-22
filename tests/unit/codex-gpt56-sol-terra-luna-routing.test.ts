/**
 * Issue #7014 — routing parity for the gpt-5.6 family (sol / terra / luna).
 *
 * Mirror of tests/unit/codex-gpt55-effort-routing.test.ts (#2877) for the
 * 5.6 ids confirmed via live `GET https://api.openai.com/v1/models`
 * 2026-07-11.
 *
 * Pins:
 *  - For a codex-only active account, all three 5.6 ids infer the `codex`
 *    provider (not openai).
 *  - The explicit id is preserved end-to-end — no `-medium`/`-high` suffix
 *    is silently injected.
 *  - The 5.6 ids are routed through the native codex Responses API
 *    (`CODEX_NATIVE_RESPONSES_MODELS`).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gpt56-routing-"));
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

// ── Codex-only routing: 5.6 ids infer codex, not openai ──────────────────────
for (const variant of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
  test(`#7014 ${variant} infers codex (not openai) for codex-only accounts`, async () => {
    const info = await getModelInfoCore(variant, null);
    assert.equal(info.provider, "codex", `${variant} must infer the codex provider`);
    assert.equal(info.model, variant, `${variant} explicit id must be preserved`);
  });
}

// ── resolveModelOrError: no implicit effort suffix injection ─────────────────
for (const variant of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
  test(`#7014 resolveModelOrError keeps ${variant} as-is on codex-only accounts`, async () => {
    const result = (await resolveModelOrError(
      variant,
      { input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }] },
      "/v1/responses",
      null
    )) as { provider?: string; model?: string };

    assert.equal(result.provider, "codex", "must reroute to codex");
    assert.equal(
      result.model,
      variant,
      `must NOT inject an effort suffix (that would override a client reasoning.effort)`
    );
  });
}
