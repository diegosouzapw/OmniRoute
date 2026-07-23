import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-hci-zero-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Regression: the `_insertConnectionRow` and `_updateConnectionRow` bind helpers
// used `data.healthCheckInterval || null`, which collapses an explicit `0`
// ("disable the proactive sweep", see src/lib/tokenHealthCheck.ts:
// `if (intervalMin <= 0) return;`) to `null`. Once persisted as NULL, reading
// the row back yields `undefined`/`null`, and the dashboard's
// `connection.healthCheckInterval ?? 60` fallback renders a misleading `60`
// instead of the user's chosen `0`. Using `?? null` preserves `0`.
test("createProviderConnection persists healthCheckInterval=0 (not coerced to null)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity Disabled HC",
    email: "hc-zero-create@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    testStatus: "active",
    isActive: true,
    healthCheckInterval: 0,
  });

  const stored = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(stored?.healthCheckInterval, 0);
});

test("updateProviderConnection persists healthCheckInterval=0 (not coerced to null)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity Default HC",
    email: "hc-zero-update@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    testStatus: "active",
    isActive: true,
    // Start from the default (60). Updating to 0 below must round-trip.
    healthCheckInterval: 60,
  });

  await providersDb.updateProviderConnection((connection as any).id, {
    healthCheckInterval: 0,
  });

  const stored = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(stored?.healthCheckInterval, 0);
});

// Sanity: a nonzero value still round-trips (the `||` → `??` change preserves 60
// because 60 is truthy, and `?? null` also keeps it).
test("updateProviderConnection still persists a nonzero healthCheckInterval", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity Nonzero HC",
    email: "hc-nonzero-update@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    testStatus: "active",
    isActive: true,
    healthCheckInterval: 0,
  });

  await providersDb.updateProviderConnection((connection as any).id, {
    healthCheckInterval: 60,
  });

  const stored = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(stored?.healthCheckInterval, 60);
});