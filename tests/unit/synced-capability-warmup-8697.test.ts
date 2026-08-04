import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { getSyncedCapability } from "../../src/lib/modelsDevSync.ts";

describe("getSyncedCapability warm-up (#8697-adjacent)", () => {
  it("does not run a DB round-trip per distinct model lookup (regression guard for the missing bulk warm-up)", () => {
    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    // A catalog rebuild calls getSyncedCapability() once per distinct model — this
    // used to run one SQLite SELECT per call on a cold cache (no warm-up caller sits
    // in the /v1/models build path). Self-warmed, only the one-time bulk load (plus
    // its CREATE TABLE IF NOT EXISTS guard) should touch the DB, regardless of how
    // many distinct models are looked up afterward.
    const N = 200;
    for (let i = 0; i < N; i++) {
      getSyncedCapability("openai", `synthetic-model-${i}`);
    }

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    assert.ok(
      callsAfter - callsBefore <= 2,
      `expected at most 2 db.prepare() calls (bulk load + table guard) across ${N} distinct ` +
        `model lookups, got ${callsAfter - callsBefore} — getSyncedCapability() may have regressed ` +
        `to a per-model SQLite round-trip`
    );
  });
});
