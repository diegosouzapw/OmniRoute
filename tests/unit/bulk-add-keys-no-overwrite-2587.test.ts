import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type ConnectionRow = Record<string, unknown> & { id: string; name?: string | null };

// #2587 — bulk-add API keys must APPEND connections, never silently overwrite
// an existing one. `createProviderConnection` upserts apikey connections BY
// NAME (src/lib/db/providers.ts): same provider + auth_type "apikey" + same
// `name` updates the existing row (replacing its apiKey/priority/testStatus)
// instead of inserting a new one. Bulk-add auto-names unnamed lines
// "Key 1", "Key 2", ... starting fresh on every request, blind to names
// already saved for the provider — so re-running a bulk paste against a
// provider that already has "Key 1" silently replaced it instead of adding a
// new connection alongside it.
//
// The fix (POST /api/providers/bulk, src/app/api/providers/bulk/route.ts)
// fetches existing connection names for the provider and runs
// `resolveBulkNameCollisions` (src/shared/utils/bulkApiKeyParser.ts) before
// calling createProviderConnection, gap-filling a free "<name> <n>" suffix so
// every entry reaches createProviderConnection as a genuine insert. This test
// exercises that exact production sequence — getProviderConnections ->
// resolveBulkNameCollisions -> createProviderConnection — against a real
// SQLite-backed db module.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bulk-add-2587-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveBulkNameCollisions } = await import("../../src/shared/utils/bulkApiKeyParser.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("bulk-add appends N+M connections and preserves the existing connection's state (the #2587 fix)", async () => {
  // Existing connection carries live resilience state: an active rate-limit
  // cooldown, a recorded error, and a non-default backoff level/priority.
  const future = new Date(Date.now() + 60_000).toISOString();
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Key 1",
    apiKey: "sk-existing",
    priority: 3,
    testStatus: "unavailable",
    lastError: "429 rate limited",
    lastErrorType: "rate_limit",
    rateLimitedUntil: future,
  });
  assert.ok(created, "existing connection must be created");
  // `backoffLevel` is set by the resilience/cooldown path (not at creation
  // time) — apply it the same way a real cooldown escalation would.
  const existing = await providersDb.updateProviderConnection(created!.id as string, {
    backoffLevel: 2,
  });
  assert.ok(existing, "existing connection must be updatable");

  const before = await providersDb.getProviderConnections({ provider: "openai" });
  assert.equal(before.length, 1);

  // Simulates a fresh bulk-add paste (parseBulkApiKeys restarts auto-naming at
  // "Key 1" every request) — this is exactly what collides with the existing
  // connection above.
  const rawEntries = [
    { name: "Key 1", apiKey: "sk-new-1" },
    { name: "Key 2", apiKey: "sk-new-2" },
  ];

  // Reproduces the route's fix: fetch existing apikey names for the provider,
  // then resolve collisions before ever calling createProviderConnection.
  const existingApikeyConnections = (await providersDb.getProviderConnections({
    provider: "openai",
    authType: "apikey",
  })) as ConnectionRow[];
  const existingNames = existingApikeyConnections
    .map((c) => (typeof c.name === "string" ? c.name : null))
    .filter((n): n is string => !!n);
  const resolvedEntries = resolveBulkNameCollisions(rawEntries, existingNames);

  // Neither new entry may reuse the existing connection's name.
  assert.ok(!resolvedEntries.some((e) => e.name === "Key 1"));

  for (const entry of resolvedEntries) {
    const created = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: entry.name,
      apiKey: entry.apiKey,
      priority: 1,
      testStatus: "unknown",
    });
    assert.ok(created);
  }

  const after = (await providersDb.getProviderConnections({
    provider: "openai",
  })) as ConnectionRow[];
  // N (1 existing) + M (2 new) = 3 connections — never 2 (an insert masquerading
  // as an overwrite) or 1 (both new entries collapsing into the existing row).
  assert.equal(after.length, before.length + rawEntries.length);

  const survivor = after.find((c) => c.id === (existing as ConnectionRow).id);
  assert.ok(survivor, "the pre-existing connection must still exist, unreplaced");
  assert.equal(survivor!.name, "Key 1");
  assert.equal(survivor!.apiKey, "sk-existing", "existing apiKey must not be overwritten");
  assert.equal(survivor!.priority, 3, "existing priority must survive the bulk-add");
  assert.equal(survivor!.testStatus, "unavailable", "existing testStatus must survive");
  assert.equal(survivor!.lastError, "429 rate limited", "existing lastError must survive");
  assert.equal(survivor!.rateLimitedUntil, future, "existing cooldown must survive");
  assert.equal(survivor!.backoffLevel, 2, "existing backoffLevel must survive");

  const newNames = after
    .filter((c) => c.id !== (existing as ConnectionRow).id)
    .map((c) => c.name);
  assert.equal(new Set(newNames).size, newNames.length, "no duplicate names among new entries");
  assert.ok(!newNames.includes("Key 1"));
});

test("without collision resolution, a colliding bulk entry silently replaces the existing connection (documents the pre-fix bug)", async () => {
  // This is the exact bug reported upstream: createProviderConnection's
  // name-based upsert is intentionally unchanged (other single-add/import
  // flows depend on it) — the guard lives one layer up, in the bulk route.
  // Skipping that guard reproduces the original data-loss behavior.
  const existing = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Key 1",
    apiKey: "sk-existing",
  });

  const collided = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Key 1", // same name, no collision resolution applied
    apiKey: "sk-overwritten",
  });

  assert.equal(collided!.id, existing!.id, "same name upserts into the same row");

  const rows = (await providersDb.getProviderConnections({
    provider: "anthropic",
  })) as ConnectionRow[];
  assert.equal(rows.length, 1, "no new connection was inserted — this is the bug");
  assert.equal(rows[0].apiKey, "sk-overwritten", "the original key was overwritten");
});
