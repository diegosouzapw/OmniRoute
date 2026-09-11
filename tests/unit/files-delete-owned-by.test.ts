// tests/unit/files-delete-owned-by.test.ts
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "files-owned-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createFile, getFile, getFileContent, deleteFileOwnedBy } =
  await import("../../src/lib/db/files.ts");

const seed = (apiKeyId: string | null, label: string) =>
  createFile({
    bytes: label.length,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from(label),
    apiKeyId,
  });

describe("deleteFileOwnedBy — owner-scoped soft delete", () => {
  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("soft-deletes the owner's own file and nulls its content", () => {
    const own = seed("key-A", "own");
    assert.strictEqual(deleteFileOwnedBy(own.id, "key-A"), true);
    assert.strictEqual(getFile(own.id), null, "metadata read hides a soft-deleted file");
    assert.strictEqual(getFileContent(own.id), null);
  });

  it("returns false and leaves another key's file intact", () => {
    const other = seed("key-B", "other");
    assert.strictEqual(deleteFileOwnedBy(other.id, "key-A"), false);
    assert.ok(getFile(other.id));
    assert.strictEqual(getFileContent(other.id)?.toString(), "other");
  });

  it("returns false for an unowned file (api_key_id NULL) — only the instance sweep reaches those", () => {
    const unowned = seed(null, "unowned");
    assert.strictEqual(deleteFileOwnedBy(unowned.id, "key-A"), false);
    assert.strictEqual(getFileContent(unowned.id)?.toString(), "unowned");
  });

  it("throws on an empty apiKeyId instead of widening", () => {
    const own = seed("key-A", "guard");
    assert.throws(() => deleteFileOwnedBy(own.id, ""), /apiKeyId/);
    assert.throws(() => deleteFileOwnedBy(own.id, undefined as unknown as string), /apiKeyId/);
    assert.strictEqual(getFileContent(own.id)?.toString(), "guard");
  });
});
