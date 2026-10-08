/**
 * omni-code-sec 2026-09-21 run, LEDGER-2 (#14481) — every `/v1/files` and
 * `/v1/batches` handler must apply the caller's per-key operator policy
 * (endpoint allowlist, access schedule, usage cap, rate limit), the same way
 * `DELETE /v1/batches/delete-completed` already does
 * (`enforceApiKeyPolicy` right after the `getApiKeyRequestScope` rejection
 * check — see `batches-delete-completed-route-scope.test.ts`).
 *
 * Before this fix these 10 handlers authorized OWNERSHIP via
 * `getApiKeyRequestScope`/`canAccessOwnedRecord` but never called
 * `enforceApiKeyPolicy`, so an operator-restricted key (e.g.
 * `allowedEndpoints: ["chat"]`) could still upload/list/read/delete files and
 * create/list/read/cancel/delete batches:
 *
 *   - POST/GET /v1/files
 *   - GET/DELETE /v1/files/{id}
 *   - GET /v1/files/{id}/content
 *   - POST/GET /v1/batches
 *   - GET/DELETE /v1/batches/{id}
 *   - POST /v1/batches/{id}/cancel
 *
 * For each handler this file proves three things with the REAL route handler
 * and REAL credentials (API keys via `createApiKey`, a dashboard session via a
 * signed `auth_token` cookie), modelled on
 * tests/unit/files-batches-ownership-2jm2-m3hp.test.ts:
 *
 *   1. a key whose `allowedEndpoints` excludes the handler's category
 *      (`files` / `batches`) is rejected with the enforcer's own 403 and the
 *      handler's side effect never happens (no file/batch created, deleted or
 *      cancelled) — RED before the fix;
 *   2. the SAME key, once its `allowedEndpoints` includes that category,
 *      still works exactly as before (200/2xx);
 *   3. a session-only caller (dashboard cookie, no API key) passes the
 *      policy step untouched, because `enforceApiKeyPolicy` only evaluates a
 *      presented API key.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir BEFORE any `@/lib/db/*`
 * module loads (dynamic imports below), so this file never touches
 * ~/.omniroute.
 */
import { describe, it, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "files-batches-policy-14481-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "files-batches-policy-14481-api-secret";
process.env.JWT_SECRET = "files-batches-policy-14481-jwt-secret";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createApiKey, updateApiKeyPermissions, revokeApiKey } =
  await import("../../src/lib/db/apiKeys.ts");
const { createFile, getFile, countFiles } = await import("../../src/lib/db/files.ts");
const { createBatch, getBatch, countBatches } = await import("../../src/lib/db/batches.ts");

const filesRoute = await import("../../src/app/api/v1/files/route.ts");
const fileByIdRoute = await import("../../src/app/api/v1/files/[id]/route.ts");
const fileContentRoute = await import("../../src/app/api/v1/files/[id]/content/route.ts");
const batchesRoute = await import("../../src/app/api/v1/batches/route.ts");
const batchByIdRoute = await import("../../src/app/api/v1/batches/[id]/route.ts");
const batchCancelRoute = await import("../../src/app/api/v1/batches/[id]/cancel/route.ts");

type Headers = Record<string, string>;
type ErrorBody = { error?: { message: string; type?: string; code?: string } };

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

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

function assertPolicyRejection403(res: Response, body: ErrorBody, label: string) {
  assert.strictEqual(res.status, 403, `${label}: the enforcer's endpoint-allowlist rejection`);
  assert.strictEqual(body.error?.type, "permission_error", `${label}: buildErrorBody() shape`);
  assert.ok(!body.error?.message.includes("at /"), `${label}: stack trace leaked`);
}

async function uploadFileVia(headers: Headers) {
  const formData = new FormData();
  formData.set("purpose", "batch");
  formData.set(
    "file",
    new File([Buffer.from("policy-upload")], "upload.jsonl", {
      type: "application/json",
    })
  );
  const res = await filesRoute.POST(
    new Request("http://localhost/api/v1/files", { method: "POST", headers, body: formData })
  );
  return { res, body: (await res.json()) as ErrorBody & { id?: string } };
}

async function listFilesVia(headers: Headers) {
  const res = await filesRoute.GET(
    new Request("http://localhost/api/v1/files?limit=100", { headers })
  );
  return { res, body: (await res.json()) as ErrorBody & { data?: Array<{ id: string }> } };
}

async function getFileVia(headers: Headers, id: string) {
  const res = await fileByIdRoute.GET(
    new Request(`http://localhost/api/v1/files/${id}`, { headers }),
    params(id)
  );
  return { res, body: (await res.json()) as ErrorBody & { id?: string } };
}

async function deleteFileVia(headers: Headers, id: string) {
  const res = await fileByIdRoute.DELETE(
    new Request(`http://localhost/api/v1/files/${id}`, { method: "DELETE", headers }),
    params(id)
  );
  return { res, body: (await res.json()) as ErrorBody & { deleted?: boolean } };
}

async function getFileContentVia(headers: Headers, id: string) {
  const res = await fileContentRoute.GET(
    new Request(`http://localhost/api/v1/files/${id}/content`, { headers }),
    params(id)
  );
  return res;
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

async function listBatchesVia(headers: Headers) {
  const res = await batchesRoute.GET(
    new Request("http://localhost/api/v1/batches?limit=100", { headers })
  );
  return { res, body: (await res.json()) as ErrorBody & { data?: Array<{ id: string }> } };
}

async function getBatchVia(headers: Headers, id: string) {
  const res = await batchByIdRoute.GET(
    new Request(`http://localhost/api/v1/batches/${id}`, { headers }),
    params(id)
  );
  return { res, body: (await res.json()) as ErrorBody & { id?: string } };
}

async function deleteBatchVia(headers: Headers, id: string) {
  const res = await batchByIdRoute.DELETE(
    new Request(`http://localhost/api/v1/batches/${id}`, { method: "DELETE", headers }),
    params(id)
  );
  return { res, body: (await res.json()) as ErrorBody & { deleted?: boolean } };
}

async function cancelBatchVia(headers: Headers, id: string) {
  const res = await batchCancelRoute.POST(
    new Request(`http://localhost/api/v1/batches/${id}/cancel`, { method: "POST", headers }),
    params(id)
  );
  return { res, body: (await res.json()) as ErrorBody & { status?: string } };
}

describe("LEDGER-2 (#14481) — /v1/files and /v1/batches apply the caller's API-key policy", () => {
  it("POST /v1/files: a restricted key is rejected and uploads nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-files-post-a", "machine-policy-fp", []);
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await uploadFileVia({ Authorization: `Bearer ${keyA.key}` });
    assertPolicyRejection403(restricted.res, restricted.body, "POST /v1/files");
    assert.match(restricted.body.error?.message ?? "", /files/, "names the blocked category");
    assert.strictEqual(
      countFiles({ apiKeyId: keyA.id }),
      0,
      "no file is created when the policy rejects"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["files"] });
    const allowed = await uploadFileVia({ Authorization: `Bearer ${keyA.key}` });
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.ok(allowed.body.id, "a file was created");
    assert.strictEqual(getFile(allowed.body.id!)?.apiKeyId, keyA.id);

    const sessionOnly = await uploadFileVia({ cookie: await sessionCookie() });
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("POST /v1/files: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-files-post-xkey-a", "machine-policy-fpx", []);
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await uploadFileVia({ "x-api-key": keyA.key });
    assertPolicyRejection403(restricted.res, restricted.body, "POST /v1/files (x-api-key)");
    assert.strictEqual(
      countFiles({ apiKeyId: keyA.id }),
      0,
      "no file is created via x-api-key when the policy rejects"
    );
  });

  it("GET /v1/files: a restricted key is rejected and sees no listing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-files-get-a", "machine-policy-fg", []);
    seedFile(keyA.id, "policy-files-get-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await listFilesVia({ Authorization: `Bearer ${keyA.key}` });
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/files");
    assert.match(restricted.body.error?.message ?? "", /files/, "names the blocked category");
    assert.strictEqual(
      restricted.body.data,
      undefined,
      "no file rows leaked in the rejection body"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["files"] });
    const allowed = await listFilesVia({ Authorization: `Bearer ${keyA.key}` });
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.ok(allowed.body.data && allowed.body.data.length >= 1);

    const sessionOnly = await listFilesVia({ cookie: await sessionCookie() });
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("GET /v1/files: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-files-get-xkey-a", "machine-policy-fgx", []);
    seedFile(keyA.id, "policy-files-get-xkey-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await listFilesVia({ "x-api-key": keyA.key });
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/files (x-api-key)");
    assert.strictEqual(
      restricted.body.data,
      undefined,
      "no file rows leaked via x-api-key when the policy rejects"
    );
  });

  it("GET /v1/files/{id}: a restricted key is rejected and gets no metadata; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-files-byid-a", "machine-policy-fbi", []);
    const file = seedFile(keyA.id, "policy-files-byid-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getFileVia({ Authorization: `Bearer ${keyA.key}` }, file.id);
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/files/{id}");
    assert.strictEqual(
      restricted.body.id,
      undefined,
      "no file metadata leaked in the rejection body"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["files"] });
    const allowed = await getFileVia({ Authorization: `Bearer ${keyA.key}` }, file.id);
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.strictEqual(allowed.body.id, file.id);

    const sessionOnly = await getFileVia({ cookie: await sessionCookie() }, file.id);
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("GET /v1/files/{id}: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-files-byid-xkey-a", "machine-policy-fbix", []);
    const file = seedFile(keyA.id, "policy-files-byid-xkey-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getFileVia({ "x-api-key": keyA.key }, file.id);
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/files/{id} (x-api-key)");
    assert.strictEqual(
      restricted.body.id,
      undefined,
      "no file metadata leaked via x-api-key when the policy rejects"
    );
  });

  it("DELETE /v1/files/{id}: a restricted key is rejected and deletes nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-files-del-a", "machine-policy-fd", []);
    const restrictedTarget = seedFile(keyA.id, "policy-files-del-restricted");
    const allowedTarget = seedFile(keyA.id, "policy-files-del-allowed");
    const sessionTarget = seedFile(keyA.id, "policy-files-del-session");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await deleteFileVia(
      { Authorization: `Bearer ${keyA.key}` },
      restrictedTarget.id
    );
    assertPolicyRejection403(restricted.res, restricted.body, "DELETE /v1/files/{id}");
    assert.ok(getFile(restrictedTarget.id), "the file must survive when the policy rejects");

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["files"] });
    const allowed = await deleteFileVia({ Authorization: `Bearer ${keyA.key}` }, allowedTarget.id);
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.strictEqual(
      getFile(allowedTarget.id),
      null,
      "the file is deleted once the policy allows it"
    );

    const sessionOnly = await deleteFileVia({ cookie: await sessionCookie() }, sessionTarget.id);
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("DELETE /v1/files/{id}: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-files-del-xkey-a", "machine-policy-fdx", []);
    const target = seedFile(keyA.id, "policy-files-del-xkey-restricted");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await deleteFileVia({ "x-api-key": keyA.key }, target.id);
    assertPolicyRejection403(restricted.res, restricted.body, "DELETE /v1/files/{id} (x-api-key)");
    assert.ok(getFile(target.id), "the file must survive via x-api-key when the policy rejects");
  });

  it("GET /v1/files/{id}/content: a restricted key is rejected and reads nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-files-content-a", "machine-policy-fc", []);
    const file = seedFile(keyA.id, "policy-files-content-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getFileContentVia({ Authorization: `Bearer ${keyA.key}` }, file.id);
    const restrictedBody = (await restricted.json()) as ErrorBody;
    assertPolicyRejection403(restricted, restrictedBody, "GET /v1/files/{id}/content");

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["files"] });
    const allowed = await getFileContentVia({ Authorization: `Bearer ${keyA.key}` }, file.id);
    assert.strictEqual(allowed.status, 200, "the same key with the endpoint allowed still works");
    assert.strictEqual(await allowed.text(), "policy-files-content-owned");

    const sessionOnly = await getFileContentVia({ cookie: await sessionCookie() }, file.id);
    assert.strictEqual(
      sessionOnly.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("GET /v1/files/{id}/content: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-files-content-xkey-a", "machine-policy-fcx", []);
    const file = seedFile(keyA.id, "policy-files-content-xkey-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getFileContentVia({ "x-api-key": keyA.key }, file.id);
    const restrictedBody = (await restricted.json()) as ErrorBody;
    assertPolicyRejection403(restricted, restrictedBody, "GET /v1/files/{id}/content (x-api-key)");
  });

  it("POST /v1/batches: a restricted key is rejected and creates nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-batches-post-a", "machine-policy-bp", []);
    const inputFile = seedFile(keyA.id, "policy-batches-post-input");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await createBatchVia({ Authorization: `Bearer ${keyA.key}` }, inputFile.id);
    assertPolicyRejection403(restricted.res, restricted.body, "POST /v1/batches");
    assert.strictEqual(countBatches(keyA.id), 0, "no batch is created when the policy rejects");

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["batches"] });
    const allowed = await createBatchVia({ Authorization: `Bearer ${keyA.key}` }, inputFile.id);
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.ok(allowed.body.id, "a batch was created");
    assert.strictEqual(getBatch(allowed.body.id!)?.apiKeyId, keyA.id);

    const sessionInput = seedFile(null, "policy-batches-post-session-input");
    const sessionOnly = await createBatchVia({ cookie: await sessionCookie() }, sessionInput.id);
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("POST /v1/batches: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-batches-post-xkey-a", "machine-policy-bpx", []);
    const inputFile = seedFile(keyA.id, "policy-batches-post-xkey-input");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await createBatchVia({ "x-api-key": keyA.key }, inputFile.id);
    assertPolicyRejection403(restricted.res, restricted.body, "POST /v1/batches (x-api-key)");
    assert.strictEqual(
      countBatches(keyA.id),
      0,
      "no batch is created via x-api-key when the policy rejects"
    );
  });

  it("GET /v1/batches: a restricted key is rejected and sees no listing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-batches-get-a", "machine-policy-bg", []);
    seedBatch(keyA.id, "policy-batches-get-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await listBatchesVia({ Authorization: `Bearer ${keyA.key}` });
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/batches");
    assert.strictEqual(
      restricted.body.data,
      undefined,
      "no batch rows leaked in the rejection body"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["batches"] });
    const allowed = await listBatchesVia({ Authorization: `Bearer ${keyA.key}` });
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.ok(allowed.body.data && allowed.body.data.length >= 1);

    const sessionOnly = await listBatchesVia({ cookie: await sessionCookie() });
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("GET /v1/batches: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-batches-get-xkey-a", "machine-policy-bgx", []);
    seedBatch(keyA.id, "policy-batches-get-xkey-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await listBatchesVia({ "x-api-key": keyA.key });
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/batches (x-api-key)");
    assert.strictEqual(
      restricted.body.data,
      undefined,
      "no batch rows leaked via x-api-key when the policy rejects"
    );
  });

  it("GET /v1/batches/{id}: a restricted key is rejected and gets no metadata; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-batches-byid-a", "machine-policy-bbi", []);
    const { batch } = seedBatch(keyA.id, "policy-batches-byid-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getBatchVia({ Authorization: `Bearer ${keyA.key}` }, batch.id);
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/batches/{id}");
    assert.strictEqual(
      restricted.body.id,
      undefined,
      "no batch metadata leaked in the rejection body"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["batches"] });
    const allowed = await getBatchVia({ Authorization: `Bearer ${keyA.key}` }, batch.id);
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.strictEqual(allowed.body.id, batch.id);

    const sessionOnly = await getBatchVia({ cookie: await sessionCookie() }, batch.id);
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("GET /v1/batches/{id}: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-batches-byid-xkey-a", "machine-policy-bbix", []);
    const { batch } = seedBatch(keyA.id, "policy-batches-byid-xkey-owned");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await getBatchVia({ "x-api-key": keyA.key }, batch.id);
    assertPolicyRejection403(restricted.res, restricted.body, "GET /v1/batches/{id} (x-api-key)");
    assert.strictEqual(
      restricted.body.id,
      undefined,
      "no batch metadata leaked via x-api-key when the policy rejects"
    );
  });

  it("DELETE /v1/batches/{id}: a restricted key is rejected and deletes nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-batches-del-a", "machine-policy-bd", []);
    const restrictedTarget = seedBatch(keyA.id, "policy-batches-del-restricted", "completed");
    const allowedTarget = seedBatch(keyA.id, "policy-batches-del-allowed", "completed");
    const sessionTarget = seedBatch(keyA.id, "policy-batches-del-session", "completed");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await deleteBatchVia(
      { Authorization: `Bearer ${keyA.key}` },
      restrictedTarget.batch.id
    );
    assertPolicyRejection403(restricted.res, restricted.body, "DELETE /v1/batches/{id}");
    assert.ok(
      getBatch(restrictedTarget.batch.id),
      "the batch must survive when the policy rejects"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["batches"] });
    const allowed = await deleteBatchVia(
      { Authorization: `Bearer ${keyA.key}` },
      allowedTarget.batch.id
    );
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.strictEqual(
      getBatch(allowedTarget.batch.id),
      null,
      "the batch is deleted once the policy allows it"
    );

    const sessionOnly = await deleteBatchVia(
      { cookie: await sessionCookie() },
      sessionTarget.batch.id
    );
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("DELETE /v1/batches/{id}: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-batches-del-xkey-a", "machine-policy-bdx", []);
    const target = seedBatch(keyA.id, "policy-batches-del-xkey-restricted", "completed");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await deleteBatchVia({ "x-api-key": keyA.key }, target.batch.id);
    assertPolicyRejection403(
      restricted.res,
      restricted.body,
      "DELETE /v1/batches/{id} (x-api-key)"
    );
    assert.ok(
      getBatch(target.batch.id),
      "the batch must survive via x-api-key when the policy rejects"
    );
  });

  it("POST /v1/batches/{id}/cancel: a restricted key is rejected and cancels nothing; the same key allowed still works; a session-only caller is untouched", async () => {
    const keyA = await createApiKey("policy-batches-cancel-a", "machine-policy-bc", []);
    const restrictedTarget = seedBatch(keyA.id, "policy-batches-cancel-restricted", "validating");
    const allowedTarget = seedBatch(keyA.id, "policy-batches-cancel-allowed", "validating");
    const sessionTarget = seedBatch(keyA.id, "policy-batches-cancel-session", "validating");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await cancelBatchVia(
      { Authorization: `Bearer ${keyA.key}` },
      restrictedTarget.batch.id
    );
    assertPolicyRejection403(restricted.res, restricted.body, "POST /v1/batches/{id}/cancel");
    assert.strictEqual(
      getBatch(restrictedTarget.batch.id)?.status,
      "validating",
      "the batch is not cancelled when the policy rejects"
    );

    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["batches"] });
    const allowed = await cancelBatchVia(
      { Authorization: `Bearer ${keyA.key}` },
      allowedTarget.batch.id
    );
    assert.strictEqual(
      allowed.res.status,
      200,
      "the same key with the endpoint allowed still works"
    );
    assert.strictEqual(getBatch(allowedTarget.batch.id)?.status, "cancelling");

    const sessionOnly = await cancelBatchVia(
      { cookie: await sessionCookie() },
      sessionTarget.batch.id
    );
    assert.strictEqual(
      sessionOnly.res.status,
      200,
      "a session-only caller passes the policy step untouched"
    );
  });

  it("POST /v1/batches/{id}/cancel: a restricted key presented via x-api-key (no anthropic-version, plain UA) does not bypass the endpoint-allowlist policy (round-2 PoC against e543b64)", async () => {
    const keyA = await createApiKey("policy-batches-cancel-xkey-a", "machine-policy-bcx", []);
    const target = seedBatch(keyA.id, "policy-batches-cancel-xkey-restricted", "validating");
    await updateApiKeyPermissions(keyA.id, { allowedEndpoints: ["chat"] });

    const restricted = await cancelBatchVia({ "x-api-key": keyA.key }, target.batch.id);
    assertPolicyRejection403(
      restricted.res,
      restricted.body,
      "POST /v1/batches/{id}/cancel (x-api-key)"
    );
    assert.strictEqual(
      getBatch(target.batch.id)?.status,
      "validating",
      "the batch is not cancelled via x-api-key when the policy rejects"
    );
  });
});

describe("LEDGER-27 (omni-code-sec round 3) — x-api-key uploads are attributed to the key the policy resolved", () => {
  it("POST /v1/files: an ALLOWED key presented via x-api-key persists apiKeyId === key.id, not null", async () => {
    const keyA = await createApiKey("ledger27-files-post-a", "machine-ledger27-fp", []);

    const uploaded = await uploadFileVia({ "x-api-key": keyA.key });
    assert.strictEqual(uploaded.res.status, 200, "an unrestricted key via x-api-key still works");
    assert.ok(uploaded.body.id, "a file was created");

    const stored = getFile(uploaded.body.id!);
    assert.strictEqual(
      stored?.apiKeyId,
      keyA.id,
      "the stored file must be attributed to the key the policy resolved via x-api-key, not left ownerless"
    );
  });

  it("POST /v1/batches: an ALLOWED key presented via x-api-key persists apiKeyId === key.id, not null", async () => {
    const keyA = await createApiKey("ledger27-batches-post-a", "machine-ledger27-bp", []);
    const inputFile = seedFile(keyA.id, "ledger27-batches-post-input");

    const created = await createBatchVia({ "x-api-key": keyA.key }, inputFile.id);
    assert.strictEqual(created.res.status, 200, "an unrestricted key via x-api-key still works");
    assert.ok(created.body.id, "a batch was created");

    const stored = getBatch(created.body.id!);
    assert.strictEqual(
      stored?.apiKeyId,
      keyA.id,
      "the stored batch must be attributed to the key the policy resolved via x-api-key, not left ownerless"
    );
  });

  it("GET /v1/files/{id}: the owning key can read its own x-api-key upload; a different key gets 404", async () => {
    const keyA = await createApiKey("ledger27-files-owner-a", "machine-ledger27-fo-a", []);
    const keyB = await createApiKey("ledger27-files-owner-b", "machine-ledger27-fo-b", []);

    const uploaded = await uploadFileVia({ "x-api-key": keyA.key });
    assert.strictEqual(uploaded.res.status, 200);
    const fileId = uploaded.body.id!;

    const ownRead = await getFileVia({ "x-api-key": keyA.key }, fileId);
    assert.strictEqual(
      ownRead.res.status,
      200,
      "the key that uploaded via x-api-key must be able to read it back via x-api-key"
    );
    assert.strictEqual(ownRead.body.id, fileId);

    const foreignRead = await getFileVia({ "x-api-key": keyB.key }, fileId);
    assert.strictEqual(
      foreignRead.res.status,
      404,
      "a different key must not be able to read a row it does not own"
    );
  });
});

describe("LEDGER-28 (omni-code-sec round 3) — direct coverage of the 401 fold on the files/batches handlers", () => {
  it("POST /v1/files: a revoked key via Authorization Bearer returns 401 authentication_error and creates nothing", async () => {
    const keyA = await createApiKey("ledger28-files-post-revoked", "machine-ledger28-fpr", []);
    await revokeApiKey(keyA.id);
    const before = countFiles({});

    const { res, body } = await uploadFileVia({ Authorization: `Bearer ${keyA.key}` });

    assert.strictEqual(res.status, 401);
    assert.strictEqual(body.error?.type, "authentication_error", "buildErrorBody(401, …) shape");
    assert.strictEqual(countFiles({}), before, "no file is created for a revoked key");
  });

  it("POST /v1/files: an unresolvable bearer token returns 401 authentication_error and creates nothing", async () => {
    const before = countFiles({});

    const { res, body } = await uploadFileVia({ Authorization: "Bearer sk-not-a-key" });

    assert.strictEqual(res.status, 401);
    assert.strictEqual(body.error?.type, "authentication_error", "buildErrorBody(401, …) shape");
    assert.strictEqual(countFiles({}), before, "no file is created for an unresolvable bearer");
  });

  it("GET /v1/files/{id}: a revoked key via Authorization Bearer returns 401 authentication_error", async () => {
    const keyA = await createApiKey("ledger28-files-get-revoked", "machine-ledger28-fgr", []);
    const file = seedFile(keyA.id, "ledger28-files-get-revoked-owned");
    await revokeApiKey(keyA.id);

    const { res, body } = await getFileVia({ Authorization: `Bearer ${keyA.key}` }, file.id);

    assert.strictEqual(res.status, 401);
    assert.strictEqual(body.error?.type, "authentication_error", "buildErrorBody(401, …) shape");
    assert.strictEqual(body.id, undefined, "no file metadata leaked for a revoked key");
  });

  it("GET /v1/files/{id}: an unresolvable bearer token returns 401 authentication_error", async () => {
    const keyA = await createApiKey("ledger28-files-get-unresolvable", "machine-ledger28-fgu", []);
    const file = seedFile(keyA.id, "ledger28-files-get-unresolvable-owned");

    const { res, body } = await getFileVia({ Authorization: "Bearer sk-not-a-key" }, file.id);

    assert.strictEqual(res.status, 401);
    assert.strictEqual(body.error?.type, "authentication_error", "buildErrorBody(401, …) shape");
    assert.strictEqual(body.id, undefined, "no file metadata leaked for an unresolvable bearer");
  });
});
