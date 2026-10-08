/**
 * GHSA-2jm2-mpx8-6523 + GHSA-m3hp-hq9g-fpmv — route-level regression guard for the
 * `/api/v1/files` and `/api/v1/batches` ownership model.
 *
 * Both advisories share one root cause: `getApiKeyRequestScope` resolves three
 * different callers to the SAME `{ apiKeyId: null, isSessionAuth: false }` shape —
 * an anonymous request, a request presenting an invalid/rotated bearer, and (with
 * `isSessionAuth: true`) the operator's dashboard session — and the routes then
 * treated "no key" as "no restriction":
 *
 *   - the list routes coerced `apiKeyId || undefined`, which the DB layer reads as
 *     "instance-wide" — every tenant's file and batch metadata to an anonymous
 *     caller (GHSA-m3hp);
 *   - the single-item routes short-circuited to ALLOW when the record's own
 *     `api_key_id` was null, so a null-owner file (dashboard upload, anonymous
 *     upload, batch output inheriting a null owner) was readable, downloadable and
 *     deletable by anybody, and a foreign key could run a batch over it (GHSA-2jm2).
 *
 * The fix is one shared 3-way rule (`canAccessOwnedRecord` in
 * `_helpers/apiKeyScope.ts`): a dashboard session is the instance operator and may
 * act on any record; an API key may act on its own records only; a null-owner
 * record is unattributable and is denied to every non-session caller. The list
 * routes apply the same explicit 3-way scope as `delete-completed` and fail closed
 * with a `buildErrorBody()` 401 when the caller is neither a key nor a session.
 *
 * Modelled on tests/unit/batches-delete-completed-route-scope.test.ts: drives the
 * REAL route handlers with REAL credentials (API keys via `createApiKey`, a dashboard
 * session via a signed `auth_token` cookie). Self-isolating: DATA_DIR points at a
 * fresh temp dir BEFORE any `@/lib/db/*` module loads, so this file never touches
 * ~/.omniroute.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "ownership-2jm2-m3hp-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ownership-2jm2-api-secret";
process.env.JWT_SECRET = "ownership-2jm2-jwt-secret";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { createFile, getFile, getFileContent } = await import("../../src/lib/db/files.ts");
const { createBatch, getBatch } = await import("../../src/lib/db/batches.ts");
const { canAccessOwnedRecord } = await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");
const fileByIdRoute = await import("../../src/app/api/v1/files/[id]/route.ts");
const fileContentRoute = await import("../../src/app/api/v1/files/[id]/content/route.ts");
const batchesRoute = await import("../../src/app/api/v1/batches/route.ts");
const batchByIdRoute = await import("../../src/app/api/v1/batches/[id]/route.ts");
const batchCancelRoute = await import("../../src/app/api/v1/batches/[id]/cancel/route.ts");

type Headers = Record<string, string>;
type ErrorBody = { error?: { message: string; type?: string; code?: string } };
type ListBody = ErrorBody & { object?: string; data?: Array<{ id: string }>; total_count?: number };

async function sessionCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${jwt}`;
}

function seedFile(apiKeyId: string | null, label: string) {
  return createFile({
    bytes: label.length,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from(label),
    mimeType: "application/jsonl",
    apiKeyId,
  });
}

function seedBatch(
  apiKeyId: string | null,
  label: string,
  status: "validating" | "completed" = "validating"
) {
  const file = seedFile(apiKeyId, label);
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status,
    apiKeyId,
  });
  return { file, batch };
}

const params = (id: string) => ({ params: Promise.resolve({ id }) });

async function listFilesVia(headers: Headers) {
  const res = await filesRoute.GET(
    new Request("http://localhost/api/v1/files?limit=100", { headers })
  );
  return { res, body: (await res.json()) as ListBody };
}

async function listBatchesVia(headers: Headers) {
  const res = await batchesRoute.GET(
    new Request("http://localhost/api/v1/batches?limit=100", { headers })
  );
  return { res, body: (await res.json()) as ListBody };
}

async function getFileVia(headers: Headers, id: string) {
  return fileByIdRoute.GET(
    new Request(`http://localhost/api/v1/files/${id}`, { headers }),
    params(id)
  );
}

async function getFileContentVia(headers: Headers, id: string) {
  return fileContentRoute.GET(
    new Request(`http://localhost/api/v1/files/${id}/content`, { headers }),
    params(id)
  );
}

async function deleteFileVia(headers: Headers, id: string) {
  return fileByIdRoute.DELETE(
    new Request(`http://localhost/api/v1/files/${id}`, { method: "DELETE", headers }),
    params(id)
  );
}

async function getBatchVia(headers: Headers, id: string) {
  return batchByIdRoute.GET(
    new Request(`http://localhost/api/v1/batches/${id}`, { headers }),
    params(id)
  );
}

async function deleteBatchVia(headers: Headers, id: string) {
  return batchByIdRoute.DELETE(
    new Request(`http://localhost/api/v1/batches/${id}`, { method: "DELETE", headers }),
    params(id)
  );
}

async function cancelBatchVia(headers: Headers, id: string) {
  return batchCancelRoute.POST(
    new Request(`http://localhost/api/v1/batches/${id}/cancel`, { method: "POST", headers }),
    params(id)
  );
}

async function createBatchVia(headers: Headers, inputFileId: string) {
  const res = await batchesRoute.POST(
    new Request("http://localhost/api/v1/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        input_file_id: inputFileId,
        endpoint: "/v1/chat/completions",
        completion_window: "24h",
      }),
    })
  );
  return { res, body: (await res.json()) as ErrorBody & { id?: string } };
}

function assertAuthRequired401(res: Response, body: ErrorBody, label: string) {
  assert.strictEqual(res.status, 401, `${label}: anonymous caller must be rejected`);
  assert.strictEqual(body.error?.message, "Authentication required", label);
  assert.strictEqual(body.error?.type, "authentication_error", `${label}: buildErrorBody() shape`);
  assert.strictEqual(body.error?.code, "invalid_api_key", label);
  assert.ok(!body.error?.message.includes("at /"), `${label}: stack trace leaked`);
}

function assertInvalidKey401(res: Response, body: ErrorBody, label: string) {
  assert.strictEqual(res.status, 401, `${label}: an unresolvable bearer must fail closed`);
  assert.strictEqual(body.error?.message, "Invalid API key", label);
  assert.strictEqual(body.error?.type, "authentication_error", `${label}: buildErrorBody() shape`);
  assert.ok(!body.error?.message.includes("at /"), `${label}: stack trace leaked`);
}

describe("canAccessOwnedRecord — the shared 3-way ownership rule", () => {
  it("a PURE dashboard session (no apiKeyId override) may act on any record, owned or not", () => {
    assert.strictEqual(
      canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: null }, "key-1"),
      true
    );
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: null }, null), true);
    assert.strictEqual(
      canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: null }, undefined),
      true
    );
  });

  // #14481 item 4/LEDGER-19: a session that ALSO carries an apiKeyId override
  // (e.g. a dashboard session cookie alongside a presented API key) used to
  // bypass ownership entirely — isSessionAuth short-circuited to true BEFORE
  // the apiKeyId override was ever checked, so this shape was authorized
  // against ANY tenant's record even though the record it acts on is
  // attributed to the KEY, not the session. Fixed: the override is checked
  // FIRST, so a session+key only reaches its OWN records — a genuine
  // regression test lives in apikey-scope-manage-demotion-14481.test.ts.
  it("a session+key request is scoped to that KEY's own records, not every tenant", () => {
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: "k" }, "k"), true);
    assert.strictEqual(
      canAccessOwnedRecord({ isSessionAuth: true, apiKeyId: "k" }, "key-1"),
      false
    );
  });

  it("a null-owner record is denied to every non-session caller — anonymous AND any key", () => {
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: null }, null), false);
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: "k" }, null), false);
    assert.strictEqual(
      canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: null }, undefined),
      false
    );
    assert.strictEqual(
      canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: "k" }, undefined),
      false
    );
  });

  it("a key may act on its own records only", () => {
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: "k1" }, "k1"), true);
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: "k2" }, "k1"), false);
    assert.strictEqual(canAccessOwnedRecord({ isSessionAuth: false, apiKeyId: null }, "k1"), false);
  });
});

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("GET /api/v1/files + GET /api/v1/batches — caller scope (GHSA-m3hp-hq9g-fpmv)", () => {
  it("(a) no credential at all → 401 on both lists, nothing enumerated", async () => {
    const keyA = await createApiKey("m3hp-a-key", "machine-m3hp-a", []);
    seedBatch(keyA.id, "m3hp-a-victim");

    const files = await listFilesVia({});
    assertAuthRequired401(files.res, files.body, "GET /v1/files");
    assert.strictEqual(files.body.data, undefined, "no file rows in a 401 body");

    const batches = await listBatchesVia({});
    assertAuthRequired401(batches.res, batches.body, "GET /v1/batches");
    assert.strictEqual(batches.body.data, undefined, "no batch rows in a 401 body");
  });

  it("(b) an invalid/rotated bearer → 401 on both lists — even alongside a session cookie", async () => {
    const keyA = await createApiKey("m3hp-b-key", "machine-m3hp-b", []);
    seedBatch(keyA.id, "m3hp-b-victim");
    const bogus = { Authorization: "Bearer sk-omni-this-key-was-rotated-away-m3hp" };

    const files = await listFilesVia(bogus);
    assertInvalidKey401(files.res, files.body, "GET /v1/files");
    const batches = await listBatchesVia(bogus);
    assertInvalidKey401(batches.res, batches.body, "GET /v1/batches");

    const withSession = { ...bogus, cookie: await sessionCookie() };
    const files2 = await listFilesVia(withSession);
    assertInvalidKey401(files2.res, files2.body, "GET /v1/files + session cookie");
    const batches2 = await listBatchesVia(withSession);
    assertInvalidKey401(batches2.res, batches2.body, "GET /v1/batches + session cookie");
  });

  it("(c) key A lists only A's rows — B's and null-owner rows never appear", async () => {
    const keyA = await createApiKey("m3hp-c-key-a", "machine-m3hp-ca", []);
    const keyB = await createApiKey("m3hp-c-key-b", "machine-m3hp-cb", []);
    const own = seedBatch(keyA.id, "m3hp-c-own");
    const other = seedBatch(keyB.id, "m3hp-c-other");
    const unowned = seedBatch(null, "m3hp-c-unowned");
    const headers = { Authorization: `Bearer ${keyA.key}` };

    const files = await listFilesVia(headers);
    assert.strictEqual(files.res.status, 200);
    const fileIds = new Set(files.body.data!.map((f) => f.id));
    assert.ok(fileIds.has(own.file.id), "key A sees its own file");
    assert.ok(!fileIds.has(other.file.id), "key B's file must not leak to key A");
    assert.ok(!fileIds.has(unowned.file.id), "the null-owner file must not leak to key A");
    assert.strictEqual(files.body.total_count, files.body.data!.length);
    assert.ok(files.body.data!.every((f) => getFile(f.id)?.apiKeyId === keyA.id));

    const batches = await listBatchesVia(headers);
    assert.strictEqual(batches.res.status, 200);
    const batchIds = new Set(batches.body.data!.map((b) => b.id));
    assert.ok(batchIds.has(own.batch.id), "key A sees its own batch");
    assert.ok(!batchIds.has(other.batch.id), "key B's batch must not leak to key A");
    assert.ok(!batchIds.has(unowned.batch.id), "the null-owner batch must not leak to key A");
    assert.strictEqual(batches.body.total_count, batches.body.data!.length);
    assert.ok(batches.body.data!.every((b) => getBatch(b.id)?.apiKeyId === keyA.id));
  });

  it("(d) a dashboard session WITHOUT a key lists the whole instance", async () => {
    const keyA = await createApiKey("m3hp-d-key-a", "machine-m3hp-da", []);
    const keyB = await createApiKey("m3hp-d-key-b", "machine-m3hp-db", []);
    const a = seedBatch(keyA.id, "m3hp-d-a");
    const b = seedBatch(keyB.id, "m3hp-d-b");
    const unowned = seedBatch(null, "m3hp-d-unowned");
    const headers = { cookie: await sessionCookie() };

    const files = await listFilesVia(headers);
    assert.strictEqual(files.res.status, 200);
    const fileIds = new Set(files.body.data!.map((f) => f.id));
    for (const f of [a.file, b.file, unowned.file]) {
      assert.ok(fileIds.has(f.id), `session sees ${f.filename}`);
    }

    const batches = await listBatchesVia(headers);
    assert.strictEqual(batches.res.status, 200);
    const batchIds = new Set(batches.body.data!.map((x) => x.id));
    for (const x of [a.batch, b.batch, unowned.batch]) {
      assert.ok(batchIds.has(x.id), `session sees batch ${x.id}`);
    }
  });

  it("(e) a request carrying BOTH a session cookie and key A stays scoped to key A (the key wins)", async () => {
    const keyA = await createApiKey("m3hp-e-key-a", "machine-m3hp-ea", []);
    const keyB = await createApiKey("m3hp-e-key-b", "machine-m3hp-eb", []);
    const own = seedBatch(keyA.id, "m3hp-e-own");
    const other = seedBatch(keyB.id, "m3hp-e-other");
    const unowned = seedBatch(null, "m3hp-e-unowned");
    const headers = { Authorization: `Bearer ${keyA.key}`, cookie: await sessionCookie() };

    const files = await listFilesVia(headers);
    assert.strictEqual(files.res.status, 200);
    const fileIds = new Set(files.body.data!.map((f) => f.id));
    assert.ok(fileIds.has(own.file.id));
    assert.ok(!fileIds.has(other.file.id), "a session cookie never widens a key's file list");
    assert.ok(!fileIds.has(unowned.file.id));

    const batches = await listBatchesVia(headers);
    assert.strictEqual(batches.res.status, 200);
    const batchIds = new Set(batches.body.data!.map((b) => b.id));
    assert.ok(batchIds.has(own.batch.id));
    assert.ok(!batchIds.has(other.batch.id), "a session cookie never widens a key's batch list");
    assert.ok(!batchIds.has(unowned.batch.id));
  });
});

describe("single-item routes — null-owner records (GHSA-2jm2-mpx8-6523)", () => {
  it("(f) files: a null-owner file is 404 (metadata, content, delete) for a foreign key and for anonymous; 200 for a session", async () => {
    const keyB = await createApiKey("2jm2-f-key-b", "machine-2jm2-fb", []);
    const file = seedFile(null, "2jm2-f-null-owner");
    const foreign = { Authorization: `Bearer ${keyB.key}` };
    const anon = {};

    for (const [label, headers] of [
      ["foreign key", foreign],
      ["anonymous", anon],
    ] as const) {
      const meta = await getFileVia(headers, file.id);
      assert.strictEqual(meta.status, 404, `${label}: GET /v1/files/{id} on a null-owner file`);

      const content = await getFileContentVia(headers, file.id);
      assert.strictEqual(content.status, 404, `${label}: GET /v1/files/{id}/content`);
      const contentBody = (await content.json()) as ErrorBody;
      assert.strictEqual(contentBody.error?.message, "File not found", label);

      const del = await deleteFileVia(headers, file.id);
      assert.strictEqual(del.status, 404, `${label}: DELETE /v1/files/{id}`);
      assert.ok(getFile(file.id), `${label}: the null-owner file must survive`);
      assert.strictEqual(
        getFileContent(file.id)?.toString(),
        "2jm2-f-null-owner",
        `${label}: the null-owner file content must not be nulled`
      );
    }

    const session = { cookie: await sessionCookie() };
    const meta = await getFileVia(session, file.id);
    assert.strictEqual(meta.status, 200, "session: GET /v1/files/{id} on a null-owner file");
    const content = await getFileContentVia(session, file.id);
    assert.strictEqual(content.status, 200, "session: GET /v1/files/{id}/content");
    assert.strictEqual(await content.text(), "2jm2-f-null-owner");
    const del = await deleteFileVia(session, file.id);
    assert.strictEqual(del.status, 200, "session: DELETE /v1/files/{id}");
    assert.strictEqual(getFile(file.id), null, "session delete takes effect");
  });

  it("(f) files: key-owned files keep the owner-only rule — owner 200, foreign key 404, anonymous 404, session 200", async () => {
    const keyA = await createApiKey("2jm2-f2-key-a", "machine-2jm2-f2a", []);
    const keyB = await createApiKey("2jm2-f2-key-b", "machine-2jm2-f2b", []);
    const file = seedFile(keyA.id, "2jm2-f2-owned");

    assert.strictEqual(
      (await getFileVia({ Authorization: `Bearer ${keyA.key}` }, file.id)).status,
      200
    );
    assert.strictEqual(
      (await getFileVia({ Authorization: `Bearer ${keyB.key}` }, file.id)).status,
      404
    );
    assert.strictEqual((await getFileVia({}, file.id)).status, 404);
    assert.strictEqual((await getFileVia({ cookie: await sessionCookie() }, file.id)).status, 200);
    assert.strictEqual(
      (await getFileContentVia({ Authorization: `Bearer ${keyB.key}` }, file.id)).status,
      404
    );
    assert.strictEqual((await deleteFileVia({}, file.id)).status, 404);
    assert.ok(getFile(file.id), "an anonymous delete on a key-owned file is a no-op");
  });

  it("(f) batches: a null-owner batch is 404 (get, delete, cancel) for a foreign key and for anonymous; 200 for a session", async () => {
    const keyB = await createApiKey("2jm2-fb-key-b", "machine-2jm2-fbb", []);
    const terminal = seedBatch(null, "2jm2-fb-null-terminal", "completed");
    const live = seedBatch(null, "2jm2-fb-null-live", "validating");
    const foreign = { Authorization: `Bearer ${keyB.key}` };

    for (const [label, headers] of [
      ["foreign key", foreign],
      ["anonymous", {}],
    ] as const) {
      assert.strictEqual(
        (await getBatchVia(headers, terminal.batch.id)).status,
        404,
        `${label}: GET /v1/batches/{id} on a null-owner batch`
      );
      assert.strictEqual(
        (await deleteBatchVia(headers, terminal.batch.id)).status,
        404,
        `${label}: DELETE /v1/batches/{id} on a null-owner batch`
      );
      assert.ok(getBatch(terminal.batch.id), `${label}: the null-owner batch must survive`);
      assert.ok(getFile(terminal.file.id), `${label}: its input file must survive`);
      assert.strictEqual(
        (await cancelBatchVia(headers, live.batch.id)).status,
        404,
        `${label}: POST /v1/batches/{id}/cancel on a null-owner batch`
      );
      assert.strictEqual(getBatch(live.batch.id)?.status, "validating", `${label}: not cancelled`);
    }

    const session = { cookie: await sessionCookie() };
    assert.strictEqual((await getBatchVia(session, terminal.batch.id)).status, 200);
    assert.strictEqual((await cancelBatchVia(session, live.batch.id)).status, 200);
    assert.strictEqual(
      getBatch(live.batch.id)?.status,
      "cancelling",
      "session cancel takes effect"
    );
    assert.strictEqual((await deleteBatchVia(session, terminal.batch.id)).status, 200);
    assert.strictEqual(getBatch(terminal.batch.id), null, "session delete takes effect");
  });

  it("(g) POST /api/v1/batches: a foreign key or an anonymous caller cannot run a batch over a null-owner input file; the owner and a session can", async () => {
    const keyA = await createApiKey("2jm2-g-key-a", "machine-2jm2-ga", []);
    const keyB = await createApiKey("2jm2-g-key-b", "machine-2jm2-gb", []);
    const unownedInput = seedFile(null, "2jm2-g-null-input");
    const ownedInput = seedFile(keyA.id, "2jm2-g-owned-input");

    for (const [label, headers] of [
      ["foreign key", { Authorization: `Bearer ${keyB.key}` }],
      ["anonymous", {}],
    ] as const) {
      const { res, body } = await createBatchVia(headers, unownedInput.id);
      assert.strictEqual(res.status, 400, `${label}: batch over a null-owner input file`);
      assert.strictEqual(body.error?.message, "Input file not found", label);
      assert.strictEqual(body.id, undefined, `${label}: no batch created`);
    }

    // Key B still cannot use key A's file (the pre-existing owner rule).
    const foreignOwned = await createBatchVia(
      { Authorization: `Bearer ${keyB.key}` },
      ownedInput.id
    );
    assert.strictEqual(foreignOwned.res.status, 400, "key B over key A's input file");

    // The owner can.
    const owner = await createBatchVia({ Authorization: `Bearer ${keyA.key}` }, ownedInput.id);
    assert.strictEqual(owner.res.status, 200, "key A over its own input file");
    assert.strictEqual(getBatch(owner.body.id!)?.apiKeyId, keyA.id);

    // The operator's session can — over the null-owner file AND over a key-owned one.
    const session = { cookie: await sessionCookie() };
    const sessionUnowned = await createBatchVia(session, unownedInput.id);
    assert.strictEqual(sessionUnowned.res.status, 200, "session over the null-owner input file");
    const sessionOwned = await createBatchVia(session, ownedInput.id);
    assert.strictEqual(sessionOwned.res.status, 200, "session over key A's input file");
  });

  it("(h) POST /api/v1/batches/{id}/cancel: a dashboard session cancels a KEY-owned batch (#13683); the owner can; a foreign key cannot", async () => {
    const keyA = await createApiKey("2jm2-h-key-a", "machine-2jm2-ha", []);
    const keyB = await createApiKey("2jm2-h-key-b", "machine-2jm2-hb", []);
    const bySession = seedBatch(keyA.id, "2jm2-h-session", "validating");
    const byOwner = seedBatch(keyA.id, "2jm2-h-owner", "validating");

    assert.strictEqual(
      (await cancelBatchVia({ Authorization: `Bearer ${keyB.key}` }, bySession.batch.id)).status,
      404,
      "a foreign key cannot cancel key A's batch"
    );
    assert.strictEqual(getBatch(bySession.batch.id)?.status, "validating");

    const session = await cancelBatchVia({ cookie: await sessionCookie() }, bySession.batch.id);
    assert.strictEqual(session.status, 200, "the operator's dashboard cancels any batch");
    assert.strictEqual(getBatch(bySession.batch.id)?.status, "cancelling");

    const owner = await cancelBatchVia({ Authorization: `Bearer ${keyA.key}` }, byOwner.batch.id);
    assert.strictEqual(owner.status, 200, "the owning key cancels its own batch");
    assert.strictEqual(getBatch(byOwner.batch.id)?.status, "cancelling");
  });
});
