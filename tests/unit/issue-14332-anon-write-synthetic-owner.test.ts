/**
 * Regression test for issue #14332 — "anonymous writes still create a
 * null-owner row the writer can never read/delete".
 *
 * Owner decision (binding, plan-file frontmatter): option (b) — record an
 * anonymous write under a synthetic anonymous owner (`ANONYMOUS_OWNER_ID`,
 * `src/shared/constants/anonymousOwner.ts`) instead of `NULL`, so the SAME
 * anonymous caller can later read/delete what it wrote, and use it as a
 * batch input file.
 *
 * This file is the permanent, INVERTED version of the triage probe
 * (`issue-14332-anon-write-null-owner-repro.test.ts` in the plan-file, never
 * committed) — that draft encoded the pre-fix 404/400 behavior on purpose;
 * these assertions encode the FIXED contract:
 *
 *   - anonymous POST /v1/files persists `api_key_id = ANONYMOUS_OWNER_ID`,
 *     never `NULL`;
 *   - the SAME anonymous caller can GET and DELETE the file it just
 *     uploaded (200, not 404);
 *   - POST /v1/batches over that anonymously-uploaded file succeeds (200);
 *   - tenant isolation holds in BOTH directions: an authenticated tenant's
 *     key can never read/delete the anonymous owner's file, and the
 *     anonymous owner can never read/delete an authenticated tenant's file
 *     (`canAccessOwnedRecord()` is exercised directly for this — no route
 *     currently issues a real API key end-to-end in this suite).
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any @/lib/db/*
 * module loads.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "issue-14332-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "issue-14332-api-secret";
process.env.JWT_SECRET = "issue-14332-jwt-secret";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getFile, createFile } = await import("../../src/lib/db/files.ts");
const { ANONYMOUS_OWNER_ID } = await import("../../src/shared/constants/anonymousOwner.ts");
const { canAccessOwnedRecord, resolveEffectiveApiKeyId } =
  await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");
const fileByIdRoute = await import("../../src/app/api/v1/files/[id]/route.ts");
const batchesRoute = await import("../../src/app/api/v1/batches/route.ts");

const params = (id: string) => ({ params: Promise.resolve({ id }) });

async function anonUpload() {
  const form = new FormData();
  form.set(
    "file",
    new File([JSON.stringify({ prompt: "hi" })], "anon-upload.jsonl", {
      type: "application/jsonl",
    })
  );
  form.set("purpose", "batch");
  const res = await filesRoute.POST(
    new Request("http://localhost/api/v1/files", { method: "POST", body: form })
  );
  const body = await res.json();
  return { res, body };
}

describe("issue #14332 — anonymous write is stamped with the synthetic anonymous owner", () => {
  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  });

  it("POST /v1/files with NO credential (anonymous) succeeds and persists api_key_id = ANONYMOUS_OWNER_ID", async () => {
    const { res, body } = await anonUpload();

    assert.strictEqual(res.status, 200, `anonymous upload should succeed: ${JSON.stringify(body)}`);
    assert.ok(body.id, "response must carry the created file id");

    const row = getFile(body.id);
    assert.ok(row, "file row must exist in the DB");
    assert.strictEqual(
      row?.apiKeyId,
      ANONYMOUS_OWNER_ID,
      "#14332 fix: an anonymous write must be stamped with the synthetic anonymous owner, never NULL"
    );
  });

  it("the SAME anonymous caller can GET and DELETE the file it just uploaded", async () => {
    const { body: uploaded } = await anonUpload();
    const id = uploaded.id;

    const getRes = await fileByIdRoute.GET(
      new Request(`http://localhost/api/v1/files/${id}`),
      params(id)
    );
    assert.strictEqual(
      getRes.status,
      200,
      "#14332 fix: the anonymous writer must be able to read its own file back"
    );

    const delRes = await fileByIdRoute.DELETE(
      new Request(`http://localhost/api/v1/files/${id}`, { method: "DELETE" }),
      params(id)
    );
    assert.strictEqual(
      delRes.status,
      200,
      "#14332 fix: the anonymous writer must be able to delete its own file"
    );
    const delBody = await delRes.json();
    assert.strictEqual(delBody.deleted, true);
  });

  it("POST /v1/batches over the anonymously-uploaded file succeeds", async () => {
    const { body: uploaded } = await anonUpload();
    const id = uploaded.id;

    const res = await batchesRoute.POST(
      new Request("http://localhost/api/v1/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_file_id: id,
          endpoint: "/v1/chat/completions",
          completion_window: "24h",
        }),
      })
    );
    const body = await res.json();
    assert.strictEqual(
      res.status,
      200,
      `#14332 fix: the anonymous file->batch flow must succeed end to end: ${JSON.stringify(body)}`
    );
    assert.strictEqual(body.input_file_id, id);
  });

  it("resolveEffectiveApiKeyId() resolves a session-only caller (no key) to null, NOT the anonymous sentinel", () => {
    const effective = resolveEffectiveApiKeyId({ apiKeyId: null, isSessionAuth: true }, null);
    assert.strictEqual(
      effective,
      null,
      "a dashboard-session caller with no key must not be folded into the shared anonymous owner " +
        "(that would make session-created rows readable by any anonymous caller)"
    );
  });

  it("tenant isolation: an authenticated tenant's key can never read/delete the anonymous owner's file", () => {
    const anonFile = createFile({
      filename: "anon.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: ANONYMOUS_OWNER_ID,
    });

    const tenantScope = { isSessionAuth: false, apiKeyId: "tenant-a-real-key-id" };
    assert.strictEqual(
      canAccessOwnedRecord(tenantScope, anonFile.apiKeyId),
      false,
      "an authenticated tenant key must never be authorized against the anonymous owner's file"
    );
  });

  it("tenant isolation: the anonymous owner can never read/delete an authenticated tenant's file", () => {
    const tenantFile = createFile({
      filename: "tenant.jsonl",
      purpose: "batch",
      bytes: 10,
      apiKeyId: "tenant-a-real-key-id",
    });

    const anonScope = { isSessionAuth: false, apiKeyId: ANONYMOUS_OWNER_ID };
    assert.strictEqual(
      canAccessOwnedRecord(anonScope, tenantFile.apiKeyId),
      false,
      "the shared anonymous owner must never be authorized against an authenticated tenant's file"
    );
  });
});
