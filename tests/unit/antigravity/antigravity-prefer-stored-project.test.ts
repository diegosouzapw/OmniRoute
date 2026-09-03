/**
 * Regression guard for the #8894 import break: quotaStrategies.ts imported
 * `preferAntigravityConnectionsWithStoredProject` from a module that never
 * landed (`antigravityProjectPersistence.ts`), killing the whole combo module
 * graph with ERR_MODULE_NOT_FOUND on the release tip. The helper now lives in
 * the real persistence module (`antigravityProjectPersist.ts`); these tests pin
 * its selection semantics.
 *
 * Run: node --import tsx/esm --test tests/unit/antigravity-prefer-stored-project.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { preferAntigravityConnectionsWithStoredProject } from "../../../open-sse/services/antigravityProjectPersist.ts";

const withProject = { id: "a", projectId: "proj-1" };
const withNestedProject = { id: "b", providerSpecificData: { projectId: "proj-2" } };
const withStringPsd = { id: "c", providerSpecificData: '{"projectId":"proj-3"}' };
const withoutProject = { id: "d", projectId: null, providerSpecificData: {} };
const withBrokenPsd = { id: "e", providerSpecificData: "{not json" };

test("prefers connections that already carry a stored projectId", () => {
  const pool = [withoutProject, withProject, withNestedProject];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(pool).map((c) => c.id),
    ["a", "b"]
  );
});

test("reads projectId from a raw JSON-string providerSpecificData", () => {
  const pool = [withoutProject, withStringPsd];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(pool).map((c) => c.id),
    ["c"]
  );
});

test("never empties the pool: no stored project anywhere → unchanged", () => {
  const pool = [withoutProject, withBrokenPsd];
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject(pool), pool);
});

test("empty input passes through", () => {
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject([]), []);
});

test("the quota-strategy module graph resolves (the #8894 break shape)", async () => {
  // Importing quotaStrategies transitively exercises the fixed import path; the
  // pre-fix tip died here with ERR_MODULE_NOT_FOUND before any test could run.
  const mod = await import("../../../open-sse/services/combo/quotaStrategies.ts");
  assert.ok(mod, "quotaStrategies must be importable");
});
