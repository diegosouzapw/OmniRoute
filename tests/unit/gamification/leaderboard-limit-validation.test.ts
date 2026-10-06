import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import { getTopN, LEADERBOARD_MAX_LIMIT } from "../../../src/lib/db/gamification";
import { getDbInstance } from "../../../src/lib/db/core";

// Regression for the unvalidated `?limit` that reached the SQLite LIMIT bind on
// the leaderboard endpoints. In SQLite a negative LIMIT means "no limit", so a
// caller passing limit=-1 would read the entire leaderboard; a non-integer would
// throw a datatype mismatch. getTopN must clamp the bind as a backstop.
describe("getTopN limit/offset clamping", () => {
  const scope = "global";
  const keys: string[] = [];

  before(() => {
    const db = getDbInstance();
    for (let i = 0; i < 5; i++) {
      const k = `test-lb-${Date.now()}-${i}`;
      keys.push(k);
      db
        .prepare(
          "INSERT OR REPLACE INTO leaderboard (api_key_id, scope, score, updated_at) VALUES (?, ?, ?, ?)"
        )
        .run(k, scope, 100 - i, new Date().toISOString());
    }
  });

  after(() => {
    const db = getDbInstance();
    for (const k of keys) {
      db.prepare("DELETE FROM leaderboard WHERE api_key_id = ?").run(k);
    }
  });

  it("returns at most the requested number of rows", () => {
    assert.equal(getTopN(scope, 2).length, 2);
  });

  it("treats a negative limit as empty, never as unbounded", () => {
    // Pre-fix this returned every row (SQLite LIMIT -1 == no limit).
    assert.equal(getTopN(scope, -1).length, 0);
    assert.equal(getTopN(scope, -100).length, 0);
  });

  it("treats a non-integer limit as empty instead of throwing", () => {
    assert.equal(getTopN(scope, Number.NaN).length, 0);
  });

  it("caps the limit at LEADERBOARD_MAX_LIMIT", () => {
    const rows = getTopN(scope, LEADERBOARD_MAX_LIMIT + 5000);
    assert.ok(rows.length <= LEADERBOARD_MAX_LIMIT);
  });

  it("never binds a negative offset", () => {
    // Would throw or behave oddly if a negative offset reached SQLite.
    assert.doesNotThrow(() => getTopN(scope, 2, -10));
  });
});
