/**
 * Auto-combo no-auth allowlist — the `auto`/`auto-*` candidate pool must only
 * pull in no-auth (keyless) providers verified to work without any credential on
 * our reference egress. As of this change that allowlist is narrowed to
 * `opencode` and `felo-web`: on the reference VPS (.15) they are the only no-auth
 * backends that answer 200 with zero configuration. The other no-auth providers
 * (duckduckgo-web, theoldllm, chipotle, aihorde) stay OUT of every auto/* pool
 * until re-verified — they remain usable via direct `<alias>/<model>` calls, they
 * are just not auto-routed to.
 *
 * Regression guard: AUTO_COMBO_NOAUTH_ALLOWLIST in
 * open-sse/services/autoCombo/virtualFactory.ts drives what belongs here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-noauth-allowlist-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
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

const ALLOWED_NOAUTH_PROVIDERS = ["opencode", "felo-web"];
const EXCLUDED_NOAUTH_PROVIDERS = ["duckduckgo-web", "theoldllm", "chipotle", "aihorde"];

test("fresh install: the allowlisted no-auth providers are present in the auto-combo pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  for (const providerId of ALLOWED_NOAUTH_PROVIDERS) {
    const models = combo.models.filter((m: { providerId: string }) => m.providerId === providerId);
    assert.ok(
      models.length >= 1,
      `allowlisted no-auth provider "${providerId}" must be present in the fresh-install ` +
        `auto-combo pool. Pool providers: ${JSON.stringify([...new Set(combo.models.map((m: { providerId: string }) => m.providerId))])}`
    );
    assert.ok(
      models.every((m: { connectionId: string }) => m.connectionId === "noauth"),
      `all "${providerId}" models must use the synthetic noauth connection`
    );
    assert.ok(
      combo.autoConfig.candidatePool.includes(providerId),
      `"${providerId}" must be in the candidatePool`
    );
  }
});

test("fresh install: non-allowlisted no-auth providers are EXCLUDED from the auto-combo pool", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  for (const providerId of EXCLUDED_NOAUTH_PROVIDERS) {
    const present = combo.models.some((m: { providerId: string }) => m.providerId === providerId);
    assert.equal(
      present,
      false,
      `no-auth provider "${providerId}" must NOT be auto-routed to (not in allowlist), ` +
        `but it appeared in the pool. Pool: ${JSON.stringify(combo.models.map((m: { model: string }) => m.model))}`
    );
    assert.ok(
      !combo.autoConfig.candidatePool.includes(providerId),
      `"${providerId}" must not be in the candidatePool`
    );
  }
});

test("fresh install: EVERY synthetic-noauth candidate belongs to an allowlisted provider (no other keyless provider leaks in)", async () => {
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);

  const noauthProviders = [
    ...new Set(
      combo.models
        .filter((m: { connectionId: string }) => m.connectionId === "noauth")
        .map((m: { providerId: string }) => m.providerId)
    ),
  ].sort();
  assert.deepEqual(
    noauthProviders,
    [...ALLOWED_NOAUTH_PROVIDERS].sort(),
    `only the allowlisted providers may be no-auth (connectionId="noauth") candidates on a ` +
      `fresh install, but found: ${JSON.stringify(noauthProviders)}`
  );
});
