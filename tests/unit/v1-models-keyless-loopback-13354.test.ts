// #13354 — #9320 regressed the keyless local-first posture: /v1/models 401s
// on pre-existing keyless installs (even loopback).
//
// Repro: a pre-existing install that completed onboarding WITHOUT ever
// configuring a password, OIDC, or INITIAL_PASSWORD (a deliberately keyless
// local-first setup). `settings.setupComplete` is true. A loopback request
// to GET /v1/models must NOT be rejected with 401 — this is the documented
// keyless local-first posture. #9320 changed getModelCatalogAuthRejection's
// opt-out from "requireAuthForModels !== true" to "requireAuthForModels ===
// false", but isAuthRequired() can return true purely because
// `setupComplete === true`, even with zero credential surface configured —
// so the opt-out no longer fires for these installs.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13354-keyless-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-13354";
delete process.env.INITIAL_PASSWORD;
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
// Give the catalog builder generous headroom under a contended shared runner —
// the default 8s bound (CATALOG_BUILD_TIMEOUT_MS_DEFAULT) is tuned for a real
// deployment, not a loaded CI/dev box; this test only cares about the auth
// gate's status code, not build latency.
process.env.CATALOG_BUILD_TIMEOUT_MS = process.env.CATALOG_BUILD_TIMEOUT_MS || "30000";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsModule = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  try {
    v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  } catch {}
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#13354: keyless install (setupComplete, no password/OIDC/INITIAL_PASSWORD) — loopback GET /v1/models must NOT 401", async () => {
  await settingsModule.updateSettings({ setupComplete: true });

  const settingsAfter = await settingsModule.getSettings();
  assert.equal(settingsAfter.setupComplete, true, "precondition: setupComplete must be true");
  assert.ok(
    !settingsAfter.password,
    "precondition: no password must be configured (keyless install)"
  );

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://127.0.0.1:20128/v1/models")
  );

  if (res.status === 401) {
    const body = await res.json();
    assert.fail(
      `BUG #13354 reproduced: loopback GET /v1/models on a keyless completed-onboarding ` +
        `install returned 401 instead of the model catalog. body=${JSON.stringify(body)}`
    );
  }

  assert.equal(res.status, 200, `expected 200 for keyless loopback request, got ${res.status}`);
});

test("#13354: keyless install with a password later configured — anonymous loopback GET /v1/models must still 401 (no #9320 regression)", async () => {
  await settingsModule.updateSettings({ setupComplete: true, password: "hashed-password-value" });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://127.0.0.1:20128/v1/models")
  );

  assert.equal(res.status, 401, `expected 401 once a password is configured, got ${res.status}`);
});

test("#13354: keyless install with one API key created — anonymous loopback GET /v1/models must still 401 without that key", async () => {
  await settingsModule.updateSettings({ setupComplete: true });
  const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
  await createApiKey("test-key", "test-machine-13354");

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://127.0.0.1:20128/v1/models")
  );

  assert.equal(res.status, 401, `expected 401 once an API key exists, got ${res.status}`);
});

// Rework (merge-batch 2026-09-23): the keyless bypass must be scoped to a
// TRUSTED loopback peer. A keyless install exposed on the network (public IP,
// LAN, or a Docker bridge gateway — which is NOT loopback, see #14296) must keep
// requiring a credential for the model catalog. These cases model the real
// runtime: a stamping server is in front (OMNIROUTE_PEER_STAMP_TOKEN set) and the
// authz pipeline hands the route handler its re-stamped locality verdict.
const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../src/server/authz/headers.ts");

async function withStampingServer<T>(fn: () => Promise<T>): Promise<T> {
  const previous = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "test-stamp-token-13354";
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
    else process.env.OMNIROUTE_PEER_STAMP_TOKEN = previous;
  }
}

function catalogRequestFrom(locality: "loopback" | "lan" | "remote", host: string): Request {
  return new Request(`http://${host}:20128/v1/models`, {
    headers: { [AUTHZ_HEADER_PEER_LOCALITY]: locality },
  });
}

test("#13354 rework: keyless install reached from a PUBLIC IP — anonymous GET /v1/models must 401", async () => {
  await settingsModule.updateSettings({ setupComplete: true });

  const res = await withStampingServer(() =>
    v1ModelsCatalog.getUnifiedModelsResponse(catalogRequestFrom("remote", "203.0.113.7"))
  );

  assert.equal(
    res.status,
    401,
    `keyless bypass must not serve the catalog to a public peer, got ${res.status}`
  );
});

test("#13354 rework: keyless install reached from the Docker gateway / LAN — anonymous GET /v1/models must 401", async () => {
  await settingsModule.updateSettings({ setupComplete: true });

  const res = await withStampingServer(() =>
    v1ModelsCatalog.getUnifiedModelsResponse(catalogRequestFrom("lan", "172.17.0.1"))
  );

  assert.equal(
    res.status,
    401,
    `a Docker-gateway/LAN peer is not loopback and must not get the keyless bypass, got ${res.status}`
  );
});

test("#13354 rework: keyless install, trusted loopback peer behind the stamping server — GET /v1/models is 200", async () => {
  await settingsModule.updateSettings({ setupComplete: true });

  const res = await withStampingServer(() =>
    v1ModelsCatalog.getUnifiedModelsResponse(catalogRequestFrom("loopback", "127.0.0.1"))
  );

  assert.equal(res.status, 200, `expected 200 for a trusted loopback peer, got ${res.status}`);
});
