// #10945 — `fallbackStrategy: "least-used"` never rotated on a fresh pool.
//
// The strategy sorts on `lastUsedAt` but was the only lastUsedAt-reading
// strategy that never wrote it: `planLastUsedCommit()` was called from the
// round-robin branch only. With every row's `last_used_at` still NULL the
// tie-break fell through to `priority` ascending, so the same connection came
// back on every dispatch — silently, with no error or warning.
//
// Measured on the pre-fix build, three sequential dispatches over a 3-account
// pool:
//
//   least-used   picked [0, 0, 0]   last_used_at [null, null, null]
//   round-robin  picked [0, 1, 2]   last_used_at [ts,   ts,   ts  ]
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-least-used-10945-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Three active apikey connections, distinct priorities, all last_used_at NULL. */
async function seedFreshPool(): Promise<string[]> {
  const ids: string[] = [];
  for (const [index, apiKey] of ["sk-lu-a", "sk-lu-b", "sk-lu-c"].entries()) {
    const connection = (await providersDb.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      apiKey,
      isActive: true,
      testStatus: "active",
      priority: index + 1,
    })) as { id: string };
    ids.push(connection.id);
  }
  return ids;
}

test("#10945 least-used rotates across a fresh pool instead of pinning one account", async () => {
  await resetStorage();
  const ids = await seedFreshPool();
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });

  const picked: string[] = [];
  for (let i = 0; i < ids.length; i++) {
    const selected = (await auth.getProviderCredentials("glm", null, null, "glm-4.6")) as {
      connectionId: string;
    } | null;
    assert.ok(selected, `dispatch ${i + 1} should resolve a connection`);
    picked.push(selected.connectionId);
  }

  assert.equal(
    new Set(picked).size,
    ids.length,
    `least-used must visit every account before repeating; got ${JSON.stringify(
      picked.map((id) => ids.indexOf(id))
    )}`
  );
});

test("#10945 least-used persists last_used_at so the next process keeps rotating", async () => {
  await resetStorage();
  const ids = await seedFreshPool();
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });

  for (let i = 0; i < ids.length; i++) {
    await auth.getProviderCredentials("glm", null, null, "glm-4.6");
  }

  const rows = await Promise.all(
    ids.map((id) => providersDb.getProviderConnectionById(id) as Promise<{ lastUsedAt?: string }>)
  );
  for (const [index, row] of rows.entries()) {
    assert.ok(
      row?.lastUsedAt,
      `connection ${index} must have last_used_at written; in-memory-only rotation is lost on restart`
    );
  }
});

test("#10945 least-used still honours an existing lastUsedAt ordering", async () => {
  await resetStorage();
  const ids = await seedFreshPool();
  // Deliberately inverse to `priority`: the lowest-priority account is the most
  // recently used, so a fix that merely fell back to priority order would fail.
  await providersDb.updateProviderConnection(ids[0], {
    lastUsedAt: new Date(Date.now() - 1_000).toISOString(),
  });
  await providersDb.updateProviderConnection(ids[1], {
    lastUsedAt: new Date(Date.now() - 60_000).toISOString(),
  });
  await providersDb.updateProviderConnection(ids[2], {
    lastUsedAt: new Date(Date.now() - 3_600_000).toISOString(),
  });
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });

  const selected = (await auth.getProviderCredentials("glm", null, null, "glm-4.6")) as {
    connectionId: string;
  } | null;
  assert.ok(selected);
  assert.equal(selected.connectionId, ids[2], "must pick the least recently used account");
});

test("#10945 a single-account pool keeps resolving that account", async () => {
  await resetStorage();
  const connection = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-lu-solo",
    isActive: true,
    testStatus: "active",
    priority: 1,
  })) as { id: string };
  await settingsDb.updateSettings({ fallbackStrategy: "least-used" });

  for (let i = 0; i < 3; i++) {
    const selected = (await auth.getProviderCredentials("glm", null, null, "glm-4.6")) as {
      connectionId: string;
    } | null;
    assert.equal(selected?.connectionId, connection.id);
  }
});
