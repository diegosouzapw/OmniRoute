/**
 * GHSA-wvxc-jp3v-5mg5 — DELETE /api/v1/batches/delete-completed dropped the
 * ownership predicate that every sibling batch operation keeps.
 *
 * `listBatches(apiKeyId?)` / `countBatches(apiKeyId?)` take the caller's key and
 * scope the SQL to `api_key_id = ?`, falling back to instance-wide only when the
 * caller is an authenticated dashboard session (which passes `undefined`).
 * `deleteCompletedBatches()` took no such argument, so any valid inference key —
 * including one with `scopes: []` — deleted every completed batch on the instance
 * and nulled the content of the files those batches referenced.
 *
 * These tests pin both halves of the contract: scoped deletion for a key, and the
 * unchanged instance-wide sweep for the dashboard session.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import { createFile, getFile } from "@/lib/db/files";
import { createBatch, getBatch, deleteCompletedBatches } from "@/lib/db/batches";
import { resetDbInstance } from "@/lib/db/core";

/** One completed batch owned by `apiKeyId`, with its input file. */
function seedCompletedBatch(apiKeyId: string | null, label: string) {
  const file = createFile({
    bytes: 8,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from(label),
    apiKeyId,
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

describe("deleteCompletedBatches — ownership boundary (GHSA-wvxc-jp3v-5mg5)", () => {
  after(() => {
    resetDbInstance();
  });

  it("deletes only the caller's completed batches, never another key's", () => {
    const attacker = seedCompletedBatch("key_attacker_wvxc", "wvxc-attacker");
    const victim = seedCompletedBatch("key_victim_wvxc", "wvxc-victim");

    const result = deleteCompletedBatches("key_attacker_wvxc");

    assert.strictEqual(
      getBatch(attacker.batch.id),
      null,
      "the caller's own completed batch should be deleted"
    );
    assert.ok(
      getBatch(victim.batch.id),
      "another key's completed batch must survive — this is the vulnerability"
    );
    assert.ok(
      getFile(victim.file.id),
      "another key's file content must not be cleared by a foreign caller"
    );
    assert.strictEqual(result.deletedBatches, 1, "only one batch belonged to the caller");
  });

  it("leaves a batch that is not completed alone, even when the caller owns it", () => {
    const own = seedCompletedBatch("key_owner_wvxc", "wvxc-owner");
    const inProgressFile = createFile({
      bytes: 8,
      filename: "wvxc-inprogress.jsonl",
      purpose: "batch",
      content: Buffer.from("running"),
      apiKeyId: "key_owner_wvxc",
    });
    const inProgress = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: inProgressFile.id,
      status: "in_progress",
      apiKeyId: "key_owner_wvxc",
    });

    deleteCompletedBatches("key_owner_wvxc");

    assert.strictEqual(getBatch(own.batch.id), null, "completed batch of the caller goes");
    assert.ok(getBatch(inProgress.id), "an in-progress batch is never swept");
  });

  it("keeps the instance-wide sweep for a dashboard session (no apiKeyId)", () => {
    const a = seedCompletedBatch("key_a_wvxc_global", "wvxc-global-a");
    const b = seedCompletedBatch("key_b_wvxc_global", "wvxc-global-b");

    deleteCompletedBatches();

    assert.strictEqual(getBatch(a.batch.id), null, "session sweep clears every key");
    assert.strictEqual(getBatch(b.batch.id), null, "session sweep clears every key");
  });
});
