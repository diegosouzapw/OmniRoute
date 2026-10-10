/**
 * Regression test for #14481 — "/v1/files and /v1/batches authz residuals
 * after #13881/#13882" — item 1 (policy enforcement) is closed by #14495 and
 * covered by tests/unit/files-batches-api-key-policy.test.ts. This file
 * covers the three residuals this issue confirmed still open:
 *
 *   (A) item 2/LEDGER-5 — a `manage`/`admin`-scope key (the deployment-time
 *       env key, or any user key explicitly granted that scope) was demoted
 *       to an ordinary single-tenant key on /v1/files and /v1/batches:
 *       resolveListScope()/canAccessOwnedRecord() never consulted
 *       hasManageScope(). Fixed by branching on
 *       hasManageScope(scope.apiKeyMetadata?.scopes ?? []) in both, same as
 *       the isSessionAuth branch.
 *
 *   (B) item 4/LEDGER-19 — canAccessOwnedRecord() returned true the moment
 *       isSessionAuth was true, BEFORE checking the apiKeyId override the
 *       caller passed in — so a request carrying both a dashboard session
 *       cookie and a foreign tenant's API key was authorized against that
 *       tenant's file, even though the resulting batch/record is attributed
 *       to the KEY, not the session. Fixed by checking the apiKeyId override
 *       first; a pure session caller (no override) is still unrestricted.
 *
 *   (C) item 5/LEDGER-20/21 — listBatches()/listFiles() resolved the `after`
 *       cursor via getBatch()/getFile(), which apply NO owner filter, so a
 *       foreign tenant's id used as `after` still resolved and its
 *       created_at was used as the pagination bound — an existence +
 *       timestamp oracle for another tenant's record. Fixed by ignoring a
 *       resolved cursor whose owner does not match the caller's apiKeyId,
 *       exactly like an unknown/bogus cursor.
 *
 * Also guards the ordinary single-actor paths (session-only, key-only)
 * against regressing #13882/GHSA-2jm2 coverage, per the plan-file's ask.
 *
 * (A) and (B) are pure-function checks — no DB needed. (C) exercises the
 * real src/lib/db/{batches,files}.ts modules against an isolated SQLite
 * file. Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any
 * @/lib/db/* module loads.
 */
import { describe, it, after as afterAll } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "apikey-scope-manage-14481-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resolveListScope, canAccessOwnedRecord } =
  await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
type ApiKeyRequestScope = Awaited<
  ReturnType<typeof import("../../src/app/api/v1/_helpers/apiKeyScope.ts").getApiKeyRequestScope>
>;
const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");
const { createBatch, listBatches } = await import("../../src/lib/db/batches.ts");
const { createFile, listFiles } = await import("../../src/lib/db/files.ts");

// Test-only determinism helper: createFile()/createBatch() stamp created_at
// from Date.now() with second resolution, so two rows created back-to-back in
// the same test can land in the same second and then tie-break on `id`
// (random) — making a cursor/ordering assertion flaky in either direction.
// Force an explicit, distinct created_at directly (no update* helper exists
// for files; batches has updateBatch but this keeps both paths identical).
function setCreatedAt(table: "files" | "batches", id: string, createdAt: number): void {
  getDbInstance().prepare(`UPDATE ${table} SET created_at = ? WHERE id = ?`).run(createdAt, id);
}

afterAll(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function manageScopeKeyScope(): ApiKeyRequestScope {
  return {
    apiKey: "env-configured-key-value",
    apiKeyId: "env-key",
    apiKeyMetadata: { scopes: ["manage"] } as ApiKeyRequestScope["apiKeyMetadata"],
    keyState: "valid",
    rejection: null,
    isSessionAuth: false,
  };
}

describe("#14481 (A) manage-scope key gets instance-wide access on /v1/files and /v1/batches", () => {
  it("resolveListScope() grants instance-wide visibility to a manage-scope key", () => {
    const result = resolveListScope(manageScopeKeyScope());
    assert.strictEqual(result.mode, "instance");
  });

  it("canAccessOwnedRecord() allows a manage-scope key to access another tenant's record", () => {
    const scope = manageScopeKeyScope();
    assert.strictEqual(canAccessOwnedRecord(scope, "some-other-tenant-api-key-id"), true);
  });

  it("an ordinary (non-manage) key is still denied instance-wide visibility (no over-widening)", () => {
    const scope: ApiKeyRequestScope = {
      apiKey: "ordinary-key-value",
      apiKeyId: "ordinary-key-id",
      apiKeyMetadata: { scopes: [] } as unknown as ApiKeyRequestScope["apiKeyMetadata"],
      keyState: "valid",
      rejection: null,
      isSessionAuth: false,
    };
    const result = resolveListScope(scope);
    assert.deepStrictEqual(result, { mode: "api_key", apiKeyId: "ordinary-key-id" });
    assert.strictEqual(canAccessOwnedRecord(scope, "some-other-tenant-api-key-id"), false);
  });
});

describe("#14481 (B) session+key precedence — the apiKeyId override is checked before isSessionAuth", () => {
  it("DENIES a session+foreign-key request access to a file it does not own", () => {
    const scope: ApiKeyRequestScope = {
      apiKey: "tenant-a-key-value",
      apiKeyId: "tenant-a-key-id",
      apiKeyMetadata: { scopes: [] } as unknown as ApiKeyRequestScope["apiKeyMetadata"],
      keyState: "valid",
      rejection: null,
      isSessionAuth: true,
    };
    assert.strictEqual(canAccessOwnedRecord(scope, "tenant-b-key-id"), false);
  });

  it("still ALLOWS a session+key request access to that key's OWN file", () => {
    const scope: ApiKeyRequestScope = {
      apiKey: "tenant-a-key-value",
      apiKeyId: "tenant-a-key-id",
      apiKeyMetadata: { scopes: [] } as unknown as ApiKeyRequestScope["apiKeyMetadata"],
      keyState: "valid",
      rejection: null,
      isSessionAuth: true,
    };
    assert.strictEqual(canAccessOwnedRecord(scope, "tenant-a-key-id"), true);
  });

  it("regression guard: a PURE session caller (no apiKeyId override) keeps unrestricted access", () => {
    const scope: ApiKeyRequestScope = {
      apiKey: null,
      apiKeyId: null,
      apiKeyMetadata: null,
      keyState: "none",
      rejection: null,
      isSessionAuth: true,
    };
    assert.strictEqual(canAccessOwnedRecord(scope, "any-tenant-key-id"), true);
  });

  it("regression guard: a PURE key caller (no session) is still scoped to its own records only", () => {
    const scope: ApiKeyRequestScope = {
      apiKey: "tenant-a-key-value",
      apiKeyId: "tenant-a-key-id",
      apiKeyMetadata: { scopes: [] } as unknown as ApiKeyRequestScope["apiKeyMetadata"],
      keyState: "valid",
      rejection: null,
      isSessionAuth: false,
    };
    assert.strictEqual(canAccessOwnedRecord(scope, "tenant-a-key-id"), true);
    assert.strictEqual(canAccessOwnedRecord(scope, "tenant-b-key-id"), false);
  });
});

describe("#14481 (C) an owner-scoped `after` cursor ignores a foreign tenant's id", () => {
  it("listBatches() ignores an `after` cursor that belongs to a different tenant", () => {
    // Two tenant-a batches straddling a tenant-b batch in time: 1000 < 2000 < 3000.
    // Pre-fix, getBatch() applies no owner filter, so `after: foreignBatch.id`
    // resolves and its created_at (2000) is trusted as the pagination bound —
    // it would incorrectly EXCLUDE the newer tenant-a batch (3000), leaking
    // the foreign batch's created_at as an existence+timestamp oracle.
    // Fixed: a foreign-owned cursor must be ignored, same as an unknown one.
    const fileA = createFile({
      filename: "a.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-a",
    });
    const fileB = createFile({
      filename: "b.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-b",
    });

    const older = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: fileA.id,
      apiKeyId: "tenant-a",
    });
    const foreign = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: fileB.id,
      apiKeyId: "tenant-b",
    });
    const newer = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: fileA.id,
      apiKeyId: "tenant-a",
    });
    setCreatedAt("batches", older.id, 1000);
    setCreatedAt("batches", foreign.id, 2000);
    setCreatedAt("batches", newer.id, 3000);

    const rowsWithForeignCursor = listBatches("tenant-a", 20, foreign.id);
    const rowsWithBogusCursor = listBatches("tenant-a", 20, "definitely-does-not-exist");

    assert.deepStrictEqual(
      rowsWithForeignCursor.map((r) => r.id).sort(),
      rowsWithBogusCursor.map((r) => r.id).sort(),
      "a foreign tenant's batch id must resolve exactly like an unknown cursor, not leak created_at"
    );
    assert.deepStrictEqual(
      rowsWithForeignCursor.map((r) => r.id).sort(),
      [newer.id, older.id].sort(),
      "ignoring the foreign cursor must return every tenant-a batch, not just the ones older than it"
    );
  });

  it("listBatches() still honors an `after` cursor belonging to the SAME tenant", () => {
    const file = createFile({
      filename: "c.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-c",
    });
    const older = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: "tenant-c",
    });
    const newer = createBatch({
      endpoint: "/v1/chat/completions",
      completionWindow: "24h",
      inputFileId: file.id,
      apiKeyId: "tenant-c",
    });
    setCreatedAt("batches", older.id, 1000);
    setCreatedAt("batches", newer.id, 2000);

    const page = listBatches("tenant-c", 20, newer.id);
    assert.deepStrictEqual(
      page.map((r) => r.id),
      [older.id]
    );
  });

  it("listFiles() ignores an `after` cursor that belongs to a different tenant", () => {
    const older = createFile({
      filename: "d1.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-d",
    });
    const foreign = createFile({
      filename: "e.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-e",
    });
    const newer = createFile({
      filename: "d2.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-d",
    });
    setCreatedAt("files", older.id, 1000);
    setCreatedAt("files", foreign.id, 2000);
    setCreatedAt("files", newer.id, 3000);

    const rowsWithForeignCursor = listFiles({ apiKeyId: "tenant-d", after: foreign.id });
    const rowsWithBogusCursor = listFiles({
      apiKeyId: "tenant-d",
      after: "definitely-does-not-exist",
    });

    assert.deepStrictEqual(
      rowsWithForeignCursor.map((r) => r.id).sort(),
      rowsWithBogusCursor.map((r) => r.id).sort()
    );
    assert.deepStrictEqual(
      rowsWithForeignCursor.map((r) => r.id).sort(),
      [newer.id, older.id].sort()
    );
  });

  it("listFiles() still honors an `after` cursor belonging to the SAME tenant", () => {
    const older = createFile({
      filename: "f1.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-f",
    });
    const newer = createFile({
      filename: "f2.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-f",
    });
    setCreatedAt("files", older.id, 1000);
    setCreatedAt("files", newer.id, 2000);

    const page = listFiles({ apiKeyId: "tenant-f", after: newer.id });
    assert.deepStrictEqual(
      page.map((r) => r.id),
      [older.id]
    );
  });
});
