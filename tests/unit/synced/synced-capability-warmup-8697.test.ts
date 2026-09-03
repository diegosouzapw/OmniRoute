import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getSyncedCapabilities,
  getSyncedCapability,
  loadAllSyncedCapabilitiesUncached,
} from "../../../src/lib/modelsDevSync.ts";

// #8697 guarded the cold /v1/models catalog build against one SQLite round-trip per
// distinct model lookup. #9199 deliberately moved that contract: getSyncedCapability()
// no longer self-warms the module cache — bulk callers (catalog builds) must pass a
// build-local snapshot (`bulk`, from loadAllSyncedCapabilitiesUncached()), and warm
// runtime lookups are served from the module cache. Both paths must stay off SQLite
// per model, otherwise the #8697 cold-catalog freeze regresses.
describe("getSyncedCapability bulk/warm lookups (#8697-adjacent, contract per #9199)", () => {
  it("does not touch SQLite per model when a bulk snapshot is supplied (catalog build path)", () => {
    const bulk = loadAllSyncedCapabilitiesUncached();

    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    const N = 200;
    for (let i = 0; i < N; i++) {
      getSyncedCapability("openai", `synthetic-model-${i}`, bulk);
    }

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    assert.equal(
      callsAfter - callsBefore,
      0,
      `expected 0 db.prepare() calls across ${N} distinct model lookups with a bulk ` +
        `snapshot, got ${callsAfter - callsBefore} — the catalog build path may have ` +
        `regressed to a per-model SQLite round-trip (#8697)`
    );
  });

  it("does not touch SQLite per model once the whole-table cache is warm", () => {
    // Warm the module cache the way runtime callers do (one bulk read + table guard).
    getSyncedCapabilities();

    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    const N = 200;
    for (let i = 0; i < N; i++) {
      getSyncedCapability("openai", `synthetic-model-${i}`);
    }

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    assert.equal(
      callsAfter - callsBefore,
      0,
      `expected 0 db.prepare() calls across ${N} distinct model lookups on a warm ` +
        `cache, got ${callsAfter - callsBefore} — warm-path lookups may have regressed ` +
        `to a per-model SQLite round-trip (#8697)`
    );
  });
});
