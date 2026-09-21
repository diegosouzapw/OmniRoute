import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-candidate-bulk-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const overridesDb = await import("../../src/lib/db/autoCandidateOverrides.ts");
const candidateHandler = await import("../../open-sse/handlers/autoComboCandidates.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("candidate inspection performs one narrow bulk state read and one breaker read per provider", async () => {
  const tokenExpiresAt = new Date(Date.now() + 60_000).toISOString();
  const cooled = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "must-never-be-read-or-returned",
    tokenExpiresAt,
  });
  const available = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "also-must-never-be-read-or-returned",
    tokenExpiresAt,
  });
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET rate_limited_until = ?, test_status = ? WHERE id = ?")
    .run(new Date(Date.now() + 60_000).toISOString(), "unavailable", cooled.id);
  await overridesDb.setExcluded("inspector-key", "auto", available.id, true);

  let stateReads = 0;
  const stateReadIds: string[][] = [];
  const breakerReads = new Map<string, number>();
  const result = await candidateHandler.getAutoComboCandidates("auto", "inspector-key", {
    loadConnectionStates: async (ids) => {
      stateReads++;
      stateReadIds.push([...ids]);
      return candidateHandler.loadLiveConnectionStates(ids);
    },
    readBreakerState: (provider) => {
      breakerReads.set(provider, (breakerReads.get(provider) ?? 0) + 1);
      return { state: "CLOSED", reachable: true };
    },
  });

  assert.equal(stateReads, 1, "all candidate rows must share one fresh state read");
  assert.equal(
    new Set(stateReadIds[0]).size,
    stateReadIds[0].length,
    "the bulk read should receive unique connection ids"
  );
  assert.deepEqual(new Set(stateReadIds[0]), new Set([cooled.id, available.id]));
  assert.equal(breakerReads.get("antigravity"), 1);
  assert.ok(
    [...breakerReads.values()].every((count) => count === 1),
    "one provider-scoped breaker snapshot must serve every row"
  );

  const cooledRows = result.candidates.filter((row) => row.connectionId === cooled.id);
  const availableRows = result.candidates.filter((row) => row.connectionId === available.id);
  assert.ok(cooledRows.length > 1, "fixture must cover repeated rows for one connection");
  assert.ok(cooledRows.every((row) => row.connectionCooldown && !row.reachable));
  assert.ok(availableRows.length > 1);
  assert.ok(availableRows.every((row) => !row.connectionCooldown && row.reachable));
  assert.ok(
    availableRows.every((row) => row.excluded),
    "exclusion remains an annotation"
  );
});

test("bulk reachability projection contains no credential columns or values", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-projection-must-not-decrypt",
  });

  const metadata = await candidateHandler.loadLiveConnectionStates([connection.id]);
  assert.equal(metadata.length, 1);
  assert.deepEqual(Object.keys(metadata[0]).sort(), ["id", "rateLimitedUntil", "testStatus"]);
  const serialized = JSON.stringify(metadata);
  assert.equal(serialized.includes("sk-projection-must-not-decrypt"), false);
  for (const credentialField of ["apiKey", "accessToken", "refreshToken", "idToken"]) {
    assert.equal(serialized.includes(credentialField), false);
  }
});

test("missing and failed state reads remain fail-open", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "fake-access-token",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
  });

  const result = await candidateHandler.getAutoComboCandidates("auto", null, {
    loadConnectionStates: async () => {
      throw new Error("simulated metadata read failure");
    },
    readBreakerState: () => ({ state: "CLOSED", reachable: true }),
  });
  const rows = result.candidates.filter((row) => row.connectionId === connection.id);
  assert.ok(rows.length > 0);
  assert.ok(rows.every((row) => !row.connectionCooldown && row.reachable));
});

test("an open breaker is memoized and annotates every provider row unreachable", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "fake-access-token",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
  const reads = new Map<string, number>();

  const result = await candidateHandler.getAutoComboCandidates("auto", null, {
    loadConnectionStates: candidateHandler.loadLiveConnectionStates,
    readBreakerState: (provider) => {
      reads.set(provider, (reads.get(provider) ?? 0) + 1);
      return provider === "antigravity"
        ? { state: "OPEN", reachable: false }
        : { state: "CLOSED", reachable: true };
    },
  });
  const rows = result.candidates.filter((row) => row.connectionId === connection.id);
  assert.ok(rows.length > 1);
  assert.ok(rows.every((row) => row.breakerState === "OPEN" && !row.reachable));
  assert.equal(reads.get("antigravity"), 1);
});
