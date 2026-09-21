/**
 * `POST /api/v1/batches/[id]/cancel` rejected the dashboard's own
 * session-authenticated caller as "Batch not found" (404) for any batch
 * owned by a non-null api_key_id -- which in practice is every batch created
 * through the default `env-key`, i.e. every real batch on the instance.
 * Cancelling from the dashboard silently did nothing.
 *
 * Root cause: the route carried its own inline ownership check
 * (`batch.apiKeyId !== null && batch.apiKeyId !== apiKeyId`) instead of the
 * canonical rule that `batches/[id]/route.ts` (GET/DELETE) and
 * `deleteCompletedBatches()` (GHSA-wvxc-jp3v-5mg5) already share: session auth
 * is the instance-wide operator, able to act on any record regardless of which
 * API key owns it. The inline check never granted that exemption, so a
 * session-authenticated caller (`apiKeyId === null`) was treated as a mismatched
 * key the instant `batch.apiKeyId` was non-null.
 *
 * This test proves the fix at the ownership-decision boundary — the rule now
 * shared as `canAccessOwnedRecord()` in `_helpers/apiKeyScope.ts` — against a
 * batch shaped exactly like the two that were actually stuck in production
 * (`api_key_id: "env-key"`), and proves the route source no longer contains the
 * buggy inline check. The route-level proof (a real session cookie against the
 * real handler) lives in tests/unit/files-batches-ownership-2jm2-m3hp.test.ts.
 *
 * Originally contributed in PR #13683 (@hartmark); folded into the
 * GHSA-2jm2-mpx8-6523 / GHSA-m3hp-hq9g-fpmv fix, which subsumes it.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/batch-cancel-session-auth-scope.test.ts
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
// module loads, so this file never touches ~/.omniroute.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "batch-cancel-session-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { createBatch } = await import("../../src/lib/db/batches.ts");
const { canAccessOwnedRecord } = await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");

function seedBatch(apiKeyId: string | null, status: "validating" | "in_progress", tag: string) {
  const file = createFile({
    bytes: 10,
    filename: `cancel-scope-${tag}.jsonl`,
    purpose: "batch",
    content: Buffer.from("{}"),
    apiKeyId,
  });
  return createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status,
    apiKeyId,
  });
}

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("cancel route ownership scoping", () => {
  it("session auth (dashboard) may cancel a batch owned by an API key", () => {
    const batch = seedBatch("env-key", "in_progress", "a1");

    // Exactly the check cancel/route.ts now runs: `!canAccessOwnedRecord(scope, batch.apiKeyId)`
    const allowed = canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: null }, batch.apiKeyId);

    assert.equal(allowed, true, "the operator's dashboard must be able to cancel any batch");
  });

  it("an unrelated API key may not cancel someone else's batch", () => {
    const batch = seedBatch("env-key", "validating", "a2");

    const allowed = canAccessOwnedRecord(
      { isSessionAuth: false, apiKeyId: "other-key" },
      batch.apiKeyId
    );

    assert.equal(allowed, false, "a foreign API key must not be able to cancel this batch");
  });

  it("the owning API key may cancel its own batch", () => {
    const batch = seedBatch("key-owns-this", "validating", "a3");

    const allowed = canAccessOwnedRecord(
      { isSessionAuth: false, apiKeyId: "key-owns-this" },
      batch.apiKeyId
    );

    assert.equal(allowed, true, "the owning API key must be able to cancel its own batch");
  });

  it("the original buggy inline check would have rejected the session-auth caller", () => {
    const batch = seedBatch("env-key", "in_progress", "a4");

    // This is the exact predicate cancel/route.ts used to run before the fix.
    const apiKeyId: string | null = null; // session auth
    const rejectedByOldCheck = !batch || (batch.apiKeyId !== null && batch.apiKeyId !== apiKeyId);

    assert.equal(
      rejectedByOldCheck,
      true,
      "documents the regression: the old inline check 404'd every dashboard cancel"
    );
  });
});

describe("the route uses the shared ownership rule instead of its old inline predicate", () => {
  it("cancel/route.ts no longer carries the buggy apiKeyId !== null inline check", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const src = readFileSync(
      fileURLToPath(new URL("../../src/app/api/v1/batches/[id]/cancel/route.ts", import.meta.url)),
      "utf8"
    );
    assert.ok(
      !/batch\.apiKeyId\s*!==\s*null\s*&&\s*batch\.apiKeyId\s*!==\s*apiKeyId/.test(src),
      "the route still carries the old inline ownership check that 404s session auth"
    );
    assert.ok(
      /canAccessOwnedRecord\(\s*scope\s*,\s*batch\.apiKeyId\s*\)/.test(src),
      "the route must delegate ownership to the shared canAccessOwnedRecord helper"
    );
  });
});
