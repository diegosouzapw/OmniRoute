import { test } from "node:test";
import assert from "node:assert/strict";

import {
  describeReclaim,
  type ReclaimFreedPagesResult,
} from "../../src/lib/db/reclaimFreedPages.ts";

function result(overrides: Partial<ReclaimFreedPagesResult>): ReclaimFreedPagesResult {
  return {
    mode: "incremental",
    autoVacuum: 2,
    pageSize: 4096,
    freelistBefore: 0,
    freelistAfter: 0,
    batches: 0,
    durationMs: 0,
    ...overrides,
  };
}

test("skipped mode reports the freelist was already empty", () => {
  assert.equal(describeReclaim(result({ mode: "skipped" })), "freelist already empty");
});

test("auto mode names auto_vacuum=FULL and the pending page count before the pass", () => {
  assert.equal(
    describeReclaim(result({ mode: "auto", freelistBefore: 42 })),
    "auto_vacuum=FULL reclaims on commit (42 page(s) pending)"
  );
});

test("deferred mode names auto_vacuum=NONE and the pages left for the scheduled VACUUM", () => {
  assert.equal(
    describeReclaim(result({ mode: "deferred", freelistBefore: 17 })),
    "auto_vacuum=NONE — 17 free page(s) left for the scheduled VACUUM"
  );
});

test("incremental mode with a drained freelist omits the tail clause", () => {
  const msg = describeReclaim(
    result({
      mode: "incremental",
      freelistBefore: 1000,
      freelistAfter: 0,
      pageSize: 4096,
      batches: 4,
      durationMs: 120,
      stopReason: "drained",
    })
  );
  assert.equal(msg, "reclaimed 1000 page(s) (~3.9 MiB) in 4 batch(es) over 120ms");
});

test("incremental mode that stops early adds the tail clause naming the stop reason and remaining pages", () => {
  const msg = describeReclaim(
    result({
      mode: "incremental",
      freelistBefore: 1000,
      freelistAfter: 300,
      pageSize: 4096,
      batches: 64,
      durationMs: 30000,
      stopReason: "time-budget",
    })
  );
  assert.equal(
    msg,
    "reclaimed 700 page(s) (~2.7 MiB) in 64 batch(es) over 30000ms, 300 left for the next pass (time-budget)"
  );
});

test("the reclaimed MiB figure is derived from pageSize, not a fixed 4 KiB assumption", () => {
  const msg = describeReclaim(
    result({
      mode: "incremental",
      pageSize: 65536,
      freelistBefore: 100,
      freelistAfter: 0,
      batches: 1,
      durationMs: 10,
      stopReason: "drained",
    })
  );
  // 100 pages * 65536 bytes = 6,553,600 bytes = 6.25 MiB
  assert.match(msg, /~6\.3 MiB/);
});
