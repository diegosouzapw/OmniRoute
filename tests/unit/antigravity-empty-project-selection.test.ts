/**
 * #11284 — Selection-side safety net for Antigravity accounts with no stored
 * Cloud Code projectId.
 *
 * Production evidence (VPS docker `omniroute`, 2026-08-24): a pool can hold
 * healthy accounts WITH projectIds alongside accounts whose projectId is
 * empty and which were never confirmed missing (no errorCode) — those
 * empty-but-unconfirmed rows still win round-robin slots, burn the request on
 * loadCodeAssist discovery + 422, and drag the whole combo circuit down.
 *
 * Contract pinned here (`antigravityProjectPersist.ts`, quota-strategy copy):
 *   - connections with an EMPTY stored projectId are skipped whenever at
 *     least one sibling carries one;
 *   - when NO connection has a stored project the pool passes through
 *     unchanged (fresh installs keep their lazy-discovery path — #2334);
 *   - confirmed-missing rows (errorCode="missing_project_id") stay excluded
 *     even when they carry a stale stored id (regression guard for the
 *     persistence-module twin `antigravityProjectPersistence.ts`).
 *
 * Run: node --import tsx/esm --test tests/unit/antigravity-empty-project-selection.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { preferAntigravityConnectionsWithStoredProject } from "../../open-sse/services/antigravityProjectPersist.ts";

const withProject = { id: "a", projectId: "proj-1" };
const withoutProject = { id: "d", projectId: null, providerSpecificData: {} };
const confirmedMissingWithStaleId = {
  id: "f",
  errorCode: "missing_project_id",
  projectId: "stale-proj",
};

test("#11284: skips empty-projectId siblings when a healthier account exists", () => {
  const pool = [withoutProject, withProject];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(pool).map((c) => c.id),
    ["a"]
  );
});

test("#11284: skips confirmed-missing rows even with a stale stored id", () => {
  const pool = [confirmedMissingWithStaleId, withProject];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(pool).map((c) => c.id),
    ["a"]
  );
});

test("#11284: keeps the full pool when ONLY confirmed-missing rows exist (never empty)", () => {
  const pool = [confirmedMissingWithStaleId];
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(pool), pool);
});

test("#11284: never empties the pool when every row lacks a projectId", () => {
  const pool = [withoutProject, { id: "e", providerSpecificData: {} }];
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(pool), pool);
});

test("#11284: single connection passes through untouched (lazy discovery still applies)", () => {
  const pool = [withoutProject];
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(pool), pool);
});
