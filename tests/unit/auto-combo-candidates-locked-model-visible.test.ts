/**
 * #9133 — a model lockout on one account must not silently drop that
 * account's row from the auto-combo candidates inspector endpoint. The endpoint
 * is read-only transparency (#7819 Level 1): a locked/cooled-down candidate
 * must still be listed, decorated with `reachable:false` and an accurate
 * reason (`modelLocked`), not deleted from the pool before the inspector
 * ever sees it.
 *
 * Root cause (measured by community contributor ntdat812, ratified by the
 * owner 2026-08-22): `prepareVirtualAutoComboInputs` unconditionally ran
 * `filterResilienceBlockedCandidates` before the listing endpoint decorated
 * the pool, so `modelLocked`/`reachable:false` were dead fields — the rows
 * they would apply to were already gone.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-locked-visible-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const candidateHandler = await import("../../open-sse/handlers/autoComboCandidates.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnections() {
  const tokenExpiresAt = new Date(Date.now() + 60_000).toISOString();
  const first = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-locked@example.com",
    accessToken: "fake-antigravity-access-token-one",
    tokenExpiresAt,
  });
  const second = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "antigravity-clean@example.com",
    accessToken: "fake-antigravity-access-token-two",
    tokenExpiresAt,
  });
  return { first, second };
}

test.beforeEach(async () => {
  await resetStorage();
  accountFallback.clearAllModelLockouts();
});

test.after(async () => {
  accountFallback.clearAllModelLockouts();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("a model-locked account row stays in the listing with reachable:false + modelLocked:true", async () => {
  const { first, second } = await seedConnections();

  // Lock a single model on a single account — the bare model id, matching
  // every real lock writer (accountFallback.ts, resilienceCandidateFilter.ts).
  accountFallback.lockModel(
    "antigravity",
    first.id,
    "claude-sonnet-4-6",
    "rate_limit",
    60_000
  );

  const result = await candidateHandler.getAutoComboCandidates("auto", null);
  const sonnetRows = result.candidates.filter(
    (candidate) =>
      candidate.provider === "antigravity" && candidate.model === "antigravity/claude-sonnet-4-6"
  );

  // Baseline: both accounts must still be represented — the endpoint's
  // stated role is read-only transparency, so a lock must never make a row
  // disappear.
  assert.deepEqual(
    new Set(sonnetRows.map((candidate) => candidate.connectionId)),
    new Set([first.id, second.id]),
    "the locked account's row must remain listed, not be silently dropped"
  );

  const lockedRow = sonnetRows.find((candidate) => candidate.connectionId === first.id);
  assert.ok(lockedRow, "locked account row must be present");
  assert.equal(lockedRow?.modelLocked, true, "locked row must report modelLocked:true");
  assert.equal(lockedRow?.reachable, false, "locked row must report reachable:false");

  const cleanRow = sonnetRows.find((candidate) => candidate.connectionId === second.id);
  assert.ok(cleanRow, "unlocked account row must be present");
  assert.equal(cleanRow?.modelLocked, false, "unlocked row must not report modelLocked");
  assert.equal(cleanRow?.reachable, true, "unlocked row must remain reachable");
});
