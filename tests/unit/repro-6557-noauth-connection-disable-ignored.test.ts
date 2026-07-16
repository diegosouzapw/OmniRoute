/**
 * Repro for #6557 — "disabled provider still used by router (opencode/big-pickle)"
 *
 * Root-cause hypothesis: OmniRoute exposes TWO different "disable this no-auth
 * provider" affordances that write to two DISCONNECTED places:
 *
 *  1. Main Providers grid page toggle (ProviderCard inside NoAuthProvidersSection)
 *     -> handleToggleProvider() -> PUT /api/providers/:id { isActive: false }
 *     This only works once a real `provider_connections` row exists for the
 *     no-auth provider (created e.g. via "Add Account" in NoAuthAccountCard for
 *     fingerprint-account providers like opencode/mimocode).
 *
 *  2. Provider detail page toggle (NoAuthProviderControls/NoAuthProviderToggle)
 *     -> handleEnabledChange() -> PATCH /api/settings { blockedProviders: [...] }
 *
 * getNoAuthCandidates() in open-sse/services/autoCombo/virtualFactory.ts (used to
 * build the "auto"/virtual-combo candidate pool) ONLY checks mechanism #2
 * (blockedProviders). It never looks at the no-auth provider's own
 * provider_connections row / isActive flag at all — so disabling via mechanism
 * #1 (the toggle switch shown on the main Providers grid card, which IS what
 * renders once an account/connection row exists) has ZERO effect on routing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-6557-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("#6557: disabling the opencode no-auth provider's own connection (isActive=false, the toggle on the main Providers grid card) does NOT remove it from the auto-combo candidate pool", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "no-auth",
    name: "OpenCode Free Account 1",
    providerSpecificData: { fingerprints: ["11111111111111111111111111111111"] },
  });

  const beforeCombo = await virtualFactory.createVirtualAutoCombo(undefined);
  assert.ok(
    beforeCombo.autoConfig.candidatePool.includes("opencode"),
    "baseline: opencode should be a candidate before any disable action"
  );

  // Simulates exactly what the main Providers grid toggle does:
  // PUT /api/providers/:id { isActive: false } -> updateProviderConnection(id, { isActive: false })
  await providersDb.updateProviderConnection(conn.id, { isActive: false });

  const updated = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(updated?.isActive, false, "the connection must actually be persisted as inactive");

  const afterCombo = await virtualFactory.createVirtualAutoCombo(undefined);
  assert.ok(
    !afterCombo.autoConfig.candidatePool.includes("opencode"),
    "BUG #6557: opencode must NOT be routed to after its connection was disabled via the " +
      "main Providers-grid toggle (isActive=false), but it still is — the no-auth candidate " +
      "builder ignores provider_connections.isActive entirely."
  );
});

test("#6557 regression guard: a no-auth provider with ZERO connection rows (default auto-generated account path) is still included in the auto-combo candidate pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  assert.ok(
    combo.autoConfig.candidatePool.includes("opencode"),
    "a no-auth provider with no connection row at all must still be included by default"
  );
});
