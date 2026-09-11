/**
 * GHSA-wvxc-jp3v-5mg5 — `DELETE /api/v1/batches/delete-completed` deleted the
 * completed batches of EVERY api key on the instance, and nulled the contents of
 * every file those batches referenced.
 *
 * Two defects in one endpoint:
 *   1. `deleteCompletedBatches()` carried no `api_key_id` predicate — the file
 *      SELECT, the checkpoint DELETE and the batch DELETE were all instance-wide.
 *   2. The route only checked that SOME key was present (`!scope.apiKeyId` →
 *      401), never that the caller owned anything. A key with `scopes: []` —
 *      an ordinary inference key — could wipe another tenant's batches.
 *
 * The ownership pattern this restores is not new: `listBatches(apiKeyId?)` and
 * `countBatches(apiKeyId?)` in the same module already scope by `api_key_id`,
 * and `batches/[id]/route.ts` already gates per-record access with `scopeCheck`
 * (session auth sees everything, a key sees only its own). This helper was the
 * one that never got it.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/batch-delete-completed-ownership-wvxc.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createFile, getFile } from "@/lib/db/files";
import { createBatch, getBatch, deleteCompletedBatches } from "@/lib/db/batches";

const KEY_A = "key-wvxc-aaaa";
const KEY_B = "key-wvxc-bbbb";

function seedCompletedBatch(apiKeyId: string | null, tag: string) {
  const file = createFile({
    bytes: 10,
    filename: `wvxc-${tag}.jsonl`,
    purpose: "batch",
    content: Buffer.from("{}"),
  });
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status: "completed",
    apiKeyId,
  });
  return { file, batch };
}

describe("deleteCompletedBatches — ownership scoping (GHSA-wvxc-jp3v-5mg5)", () => {
  it("scoped to one key deletes ONLY that key's completed batches", () => {
    const a = seedCompletedBatch(KEY_A, "a1");
    const b = seedCompletedBatch(KEY_B, "b1");

    const result = deleteCompletedBatches(KEY_A);

    assert.equal(getBatch(a.batch.id), null, "the caller's own batch should be gone");
    assert.ok(getBatch(b.batch.id), "another key's batch must survive");
    assert.equal(result.deletedBatches, 1, "must report only what it actually deleted");
  });

  it("scoped deletion does not touch another key's file contents", () => {
    const a = seedCompletedBatch(KEY_A, "a2");
    const b = seedCompletedBatch(KEY_B, "b2");

    deleteCompletedBatches(KEY_A);

    assert.equal(getFile(a.file.id), null, "the caller's own file should be gone");
    assert.ok(getFile(b.file.id), "another key's file must survive with its content intact");
  });

  it("a key with no completed batches deletes nothing at all", () => {
    const b = seedCompletedBatch(KEY_B, "b3");

    const result = deleteCompletedBatches("key-wvxc-with-nothing");

    assert.equal(result.deletedBatches, 0);
    assert.equal(result.deletedFiles, 0);
    assert.ok(getBatch(b.batch.id), "an unrelated key's batch must survive");
  });

  it("unscoped (dashboard session) still clears the whole instance", () => {
    // The operator's own dashboard legitimately cleans up everything; that is
    // the ONLY caller allowed to omit the key. Preserved deliberately.
    seedCompletedBatch(KEY_A, "a4");
    seedCompletedBatch(KEY_B, "b4");

    const result = deleteCompletedBatches();

    assert.ok(
      result.deletedBatches >= 2,
      `expected an instance-wide sweep, got ${result.deletedBatches}`
    );
  });
});

describe("the route passes the caller's key through", () => {
  it("delete-completed scopes by api key instead of calling the helper bare", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const src = readFileSync(
      fileURLToPath(
        new URL("../../src/app/api/v1/batches/delete-completed/route.ts", import.meta.url)
      ),
      "utf8"
    );
    assert.ok(
      !/deleteCompletedBatches\(\s*\)/.test(src),
      "the route still calls deleteCompletedBatches() with no owner — every tenant's batches go"
    );
    assert.ok(
      /deleteCompletedBatches\(\s*scope\./.test(src),
      "the route must pass the caller's scope into the helper"
    );
  });
});
