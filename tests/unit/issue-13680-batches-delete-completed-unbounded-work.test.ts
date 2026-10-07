/**
 * #13680 — DELETE /v1/batches/delete-completed does unbounded work per request.
 *
 * `deleteCompletedBatches` commits in chunks of `INSTANCE_SWEEP_CHUNK` (200), but
 * the outer `sweepLoop` is a plain synchronous `for (;;)` that only stops when the
 * table has no completed batch left — there is no cap on how many chunks a single
 * request may run. better-sqlite3 is synchronous, so one request can hold the
 * Node.js event loop for as long as it takes to sweep the ENTIRE table, and the
 * caller has no way to ask for a bounded amount of work per call (no `hasMore`).
 *
 * This test seeds one row past the issue's own proposed cap
 * (`MAX_CHUNKS_PER_REQUEST = 25` × `INSTANCE_SWEEP_CHUNK` = 5000) and asserts a
 * single call stays within that bound and reports a continuation flag.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "issue13680-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { createFile } = await import("../../src/lib/db/files.ts");
const { createBatch, deleteCompletedBatches, INSTANCE_SWEEP_CHUNK, MAX_CHUNKS_PER_REQUEST } =
  await import("../../src/lib/db/batches.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

function seedCompletedBatch(label: string, apiKeyId: string | null = null) {
  const file = createFile({
    bytes: 1,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from("x"),
    apiKeyId,
  });
  return createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status: "completed",
    apiKeyId,
  });
}

describe("#13680 — deleteCompletedBatches has a per-request chunk cap", () => {
  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("stops after MAX_CHUNKS_PER_REQUEST chunks and reports hasMore instead of sweeping the whole table in one synchronous call", () => {
    const cap = MAX_CHUNKS_PER_REQUEST * INSTANCE_SWEEP_CHUNK;
    const total = cap + 1; // one row past the cap: proves the loop stops at it

    for (let i = 0; i < total; i++) seedCompletedBatch(`issue13680-${i}`);

    const result = deleteCompletedBatches({ allTenants: true }) as {
      deletedBatches: number;
      deletedFiles: number;
      hasMore?: boolean;
    };

    assert.ok(
      result.deletedBatches <= cap,
      `expected a single request to sweep at most ${cap} batches (MAX_CHUNKS_PER_REQUEST=${MAX_CHUNKS_PER_REQUEST} × INSTANCE_SWEEP_CHUNK=${INSTANCE_SWEEP_CHUNK}), ` +
        `but one call deleted ${result.deletedBatches} of ${total} in one synchronous pass — no per-request cap exists`
    );
    assert.strictEqual(
      result.hasMore,
      true,
      "the result carries no continuation signal (`hasMore`), so a caller cannot tell more completed batches remain to sweep"
    );
  });

  it("resumes across repeated calls until hasMore is false, sweeping the entire backlog", () => {
    // Key-scoped on purpose: isolates this test's count from the leftover
    // unowned batch the previous test's `allTenants` sweep may not have caught
    // (its cap+1 seed leaves exactly one row past MAX_CHUNKS_PER_REQUEST), so
    // the expected call count here stays exact regardless of test order.
    const apiKeyId = "resume-key-13680";
    const cap = MAX_CHUNKS_PER_REQUEST * INSTANCE_SWEEP_CHUNK;
    const total = cap + 50;
    for (let i = 0; i < total; i++) seedCompletedBatch(`issue13680-resume-${i}`, apiKeyId);

    let totalDeleted = 0;
    let hasMore = true;
    let calls = 0;
    while (hasMore) {
      calls++;
      if (calls > 10) throw new Error("resumption did not converge within 10 calls");
      const result = deleteCompletedBatches({ apiKeyId }) as {
        deletedBatches: number;
        hasMore: boolean;
      };
      totalDeleted += result.deletedBatches;
      hasMore = result.hasMore;
    }

    assert.strictEqual(
      calls,
      2,
      "50 extra rows past one cap should resume in exactly one more call"
    );
    assert.strictEqual(
      totalDeleted,
      total,
      "every seeded batch must be swept across the resumed calls"
    );
  });
});
