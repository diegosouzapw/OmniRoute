/**
 * #7819 (Level 2) — mandatory regression guard (CLAUDE.md hard rule #18 /
 * acceptance criterion "Users with no overrides see behavior byte-identical
 * to today"): the `auto/*` candidate pool built by
 * `virtualFactory.createVirtualAutoCombo` must be UNCHANGED when
 *   (a) the caller doesn't pass apiKeyId/autoChannel at all (every caller
 *       that existed before #7819 — builtinCatalog.ts, app/api/combos/auto),
 *   (b) the caller DOES pass apiKeyId/autoChannel but no override row exists.
 *
 * A separate test proves the filter actually excludes a configured candidate
 * — the behavior the byte-identical guard above must NOT mask.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7819-regression-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const overridesDb = await import("../../src/lib/db/autoCandidateOverrides.ts");
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

async function seedTwoGlmConnections() {
  const first = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "GLM Account 1",
    apiKey: "glm-test-key-1",
  });
  const second = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "GLM Account 2",
    apiKey: "glm-test-key-2",
  });
  return { first, second };
}

function connectionIds(combo: {
  models: Array<{ connectionId: string | null; allowedConnectionIds?: string[] }>;
}) {
  return combo.models
    .flatMap((model) =>
      model.connectionId ? [model.connectionId] : (model.allowedConnectionIds ?? [])
    )
    .sort();
}

test("#7819 regression: pool is IDENTICAL whether or not apiKeyId/autoChannel are passed, with no overrides configured", async () => {
  const { first, second } = await seedTwoGlmConnections();

  const legacyCombo = await virtualFactory.createVirtualAutoCombo(undefined);
  const scopedComboNoOverrides = await virtualFactory.createVirtualAutoCombo(
    undefined,
    undefined,
    "key-1",
    "auto"
  );

  assert.deepEqual(
    connectionIds(legacyCombo),
    connectionIds(scopedComboNoOverrides),
    "candidate pool must be byte-identical when no overrides exist for the key+channel"
  );
  assert.ok(connectionIds(legacyCombo).includes(first.id));
  assert.ok(connectionIds(legacyCombo).includes(second.id));
});

test("#7819: an exclusion configured for one connection removes ONLY that connection from the pool", async () => {
  const { first, second } = await seedTwoGlmConnections();

  await overridesDb.setExcluded("key-1", "auto", first.id, true);

  const scopedCombo = await virtualFactory.createVirtualAutoCombo(
    undefined,
    undefined,
    "key-1",
    "auto"
  );

  const ids = connectionIds(scopedCombo);
  assert.ok(!ids.includes(first.id), `excluded connection ${first.id} must be absent`);
  assert.ok(ids.includes(second.id), `non-excluded connection ${second.id} must remain`);
});

test("#7819: an exclusion for key-1 does NOT affect key-2's pool for the same channel", async () => {
  const { first, second } = await seedTwoGlmConnections();

  await overridesDb.setExcluded("key-1", "auto", first.id, true);

  const otherKeyCombo = await virtualFactory.createVirtualAutoCombo(
    undefined,
    undefined,
    "key-2",
    "auto"
  );

  const ids = connectionIds(otherKeyCombo);
  assert.ok(ids.includes(first.id), "key-2 must still see the connection key-1 excluded");
  assert.ok(ids.includes(second.id));
});

test("#7819: fail-open — a DB lookup failure never breaks routing (pool falls back unfiltered)", async () => {
  const { first, second } = await seedTwoGlmConnections();

  // Force getExcludedConnectionIds() to throw by dropping the table out from
  // under it — proves the try/catch in virtualFactory.ts actually fires and
  // the candidate pool is still returned unfiltered, not a 500 or an empty
  // pool. (Not the "empty override set" no-op path — that's covered above.)
  const db = core.getDbInstance();
  db.exec("DROP TABLE auto_candidate_overrides");

  const combo = await virtualFactory.createVirtualAutoCombo(undefined, undefined, "key-1", "auto");
  const ids = connectionIds(combo);
  assert.ok(ids.includes(first.id));
  assert.ok(ids.includes(second.id));
});
