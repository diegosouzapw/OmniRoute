/**
 * #15567 review follow-ups for Muse session ownership:
 *  - the key_value SQL lives in src/lib/db/museSessionOwnership.ts, not in the service;
 *  - recorded opaque/reference rows are bounded: an idle session is pruned with its pins;
 *  - a single OAuth account (nothing to rotate to) keeps working without a session id.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  claimMuseSession,
  bindMuseGeneration,
  recordMuseOutput,
  museSessionScope,
  museSessionScopeFor,
} from "../../src/sse/services/museSessionOwnership.ts";
import {
  MUSE_SESSION_IDLE_TTL_MS,
  pruneIdleMuseOwnershipScopes,
  readMuseOwnershipValue,
  touchMuseOwnershipScope,
} from "../../src/lib/db/museSessionOwnership.ts";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";

const NAMESPACE = "muse_session_ownership";
const candidates = [{ id: "account-a" }, { id: "account-b" }];

function rowsFor(scope: string): number {
  return (
    getDbInstance()
      .prepare("SELECT COUNT(*) AS n FROM key_value WHERE namespace = ? AND key LIKE ?")
      .get(NAMESPACE, `%${scope}%`) as { n: number }
  ).n;
}

async function serve(scope: string, generation: string) {
  const body = JSON.stringify({
    output: [
      { type: "reasoning", id: "rs_1", encrypted_content: `opaque-${scope.slice(0, 6)}` },
      { type: "function_call", id: "fc_1", call_id: `call-${scope.slice(0, 6)}`, name: "x" },
    ],
  });
  await recordMuseOutput(
    new Response(body, { headers: { "content-type": "application/json" } }),
    scope,
    generation
  ).text();
}

test("service keeps no raw SQL: persistence goes through src/lib/db", () => {
  const source = readFileSync(
    new URL("../../src/sse/services/museSessionOwnership.ts", import.meta.url),
    "utf8"
  );
  assert.doesNotMatch(source, /getDbInstance|\.prepare\(|key_value/);
});

test("an idle session is pruned with its owner pin and recorded items; active ones stay", async () => {
  getDbInstance().prepare("DELETE FROM key_value WHERE namespace = ?").run(NAMESPACE);
  const idle = museSessionScope({ prompt_cache_key: "idle" }, undefined, "client");
  const active = museSessionScope({ prompt_cache_key: "active" }, undefined, "client");
  for (const scope of [idle, active]) {
    const owner = claimMuseSession(scope, { input: "hi" }, candidates);
    const generation = bindMuseGeneration(scope, owner.connectionId, `key-${scope}`, "identity");
    await serve(scope, generation);
    assert.ok(readMuseOwnershipValue(`touched:${scope}`), "activity is recorded");
    assert.ok(rowsFor(scope) >= 5, "session, served, touched, opaque and reference rows exist");
  }
  const now = Date.now();
  touchMuseOwnershipScope(idle, now - MUSE_SESSION_IDLE_TTL_MS - 1);

  assert.equal(pruneIdleMuseOwnershipScopes(now), 1);
  assert.equal(rowsFor(idle), 0);
  assert.ok(rowsFor(active) >= 5);
  assert.ok(readMuseOwnershipValue("cursor"), "the rotation cursor is not a session row");
});

test("one OAuth account and no session id falls back to unpinned routing instead of a 400", () => {
  assert.equal(museSessionScopeFor({ input: "hi" }, undefined, "client", 1), null);
  assert.equal(museSessionScopeFor({ input: "hi" }, undefined, "client", 0), null);
  assert.throws(
    () => museSessionScopeFor({ input: "hi" }, undefined, "client", 2),
    (error: { status?: number }) => error.status === 400
  );
  assert.equal(
    museSessionScopeFor({ prompt_cache_key: "s" }, undefined, "client", 1),
    museSessionScope({ prompt_cache_key: "s" }, undefined, "client")
  );
});

test.after(() => resetDbInstance());
