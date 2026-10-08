/**
 * #13882 — route-level regression guard for the `/api/files` and `/api/batches`
 * MANAGEMENT siblings' ownership model.
 *
 * These routes previously gated ONLY on `requireManagementAuth(request)`, which
 * returns `null` (auth waived) unconditionally when `settings.requireLogin===false`
 * (`requireManagementAuth.ts:59`), and never applied any per-record ownership
 * check — unlike the hardened `/api/v1/files` + `/api/v1/batches` siblings that
 * GHSA-2jm2-mpx8-6523 / GHSA-m3hp-hq9g-fpmv already fixed. On an instance with
 * login disabled, any unauthenticated caller could enumerate/download every
 * tenant's files and batches.
 *
 * The fix ports the exact `/v1` scoping pattern onto these 4 routes:
 * `getApiKeyRequestScope` + `resolveListScope` (list endpoints) and
 * `canAccessOwnedRecord` (single-item endpoints) from
 * `src/app/api/v1/_helpers/apiKeyScope.ts`.
 *
 * Modelled on tests/unit/files-batches-ownership-2jm2-m3hp.test.ts: drives the
 * REAL route handlers with REAL credentials (API keys via `createApiKey`, a
 * dashboard session via a signed `auth_token` cookie). Self-isolating: DATA_DIR
 * points at a fresh temp dir BEFORE any `@/lib/db/*` module loads, so this file
 * never touches ~/.omniroute.
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "mgmt-ownership-13882-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "mgmt-ownership-13882-api-secret";
process.env.JWT_SECRET = "mgmt-ownership-13882-jwt-secret";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
const { createFile } = await import("../../src/lib/db/files.ts");
const { createBatch } = await import("../../src/lib/db/batches.ts");

const filesListRoute = await import("../../src/app/api/files/route.ts");
const fileContentRoute = await import("../../src/app/api/files/[id]/content/route.ts");
const batchesListRoute = await import("../../src/app/api/batches/route.ts");
const batchByIdRoute = await import("../../src/app/api/batches/[id]/route.ts");

type Headers = Record<string, string>;

before(async () => {
  await updateSettings({ requireLogin: false });
});

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

function seedFile(apiKeyId: string, label: string) {
  return createFile({
    bytes: label.length,
    filename: `${label}.jsonl`,
    purpose: "batch",
    content: Buffer.from(label),
    mimeType: "application/jsonl",
    apiKeyId,
  });
}

function seedBatch(apiKeyId: string, label: string) {
  const file = seedFile(apiKeyId, `${label}-input`);
  const batch = createBatch({
    endpoint: "/v1/chat/completions",
    completionWindow: "24h",
    inputFileId: file.id,
    status: "validating",
    apiKeyId,
  });
  return { file, batch };
}

async function listFilesVia(headers: Headers) {
  const res = await filesListRoute.GET(
    new Request("http://localhost/api/files?limit=100", { headers })
  );
  return { res, body: (await res.json()) as { files?: Array<{ id: string }> } };
}

async function getFileContentVia(headers: Headers, id: string) {
  return fileContentRoute.GET(
    new Request(`http://localhost/api/files/${id}/content`, { headers }),
    { params: Promise.resolve({ id }) }
  );
}

async function listBatchesVia(headers: Headers) {
  const res = await batchesListRoute.GET(
    new Request("http://localhost/api/batches?limit=100", { headers })
  );
  return { res, body: (await res.json()) as { batches?: Array<{ id: string }> } };
}

async function getBatchVia(headers: Headers, id: string) {
  return batchByIdRoute.GET(new Request(`http://localhost/api/batches/${id}`, { headers }), {
    params: { id },
  });
}

describe("#13882 — /api/files management sibling ownership scoping", () => {
  it("anonymous caller (requireLogin=false, no credentials) cannot list a foreign file", async () => {
    const victim = await createApiKey("13882-files-victim-a", "machine-13882-files-a", []);
    const victimFile = seedFile(victim.id, "anon-list-victim");

    const { res, body } = await listFilesVia({});
    const leaked = res.status === 200 && (body.files?.some((f) => f.id === victimFile.id) ?? false);
    assert.strictEqual(leaked, false, "anonymous caller must not enumerate a foreign file");
  });

  it("a foreign API key cannot list another key's file", async () => {
    const owner = await createApiKey("13882-files-owner-b", "machine-13882-files-ob", []);
    const foreign = await createApiKey("13882-files-foreign-b", "machine-13882-files-fb", []);
    const ownerFile = seedFile(owner.id, "foreign-list-victim");

    const { res, body } = await listFilesVia({ Authorization: `Bearer ${foreign.key}` });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(
      body.files?.some((f) => f.id === ownerFile.id) ?? false,
      false,
      "a foreign key must not see another key's file in its own list"
    );
  });

  it("the owning API key can still list its own file", async () => {
    const owner = await createApiKey("13882-files-owner-c", "machine-13882-files-oc", []);
    const ownedFile = seedFile(owner.id, "owner-list-self");

    const { res, body } = await listFilesVia({ Authorization: `Bearer ${owner.key}` });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.files?.some((f) => f.id === ownedFile.id) ?? false, true);
  });

  it("a dashboard session (instance operator) still sees every tenant's file", async () => {
    const someKey = await createApiKey("13882-files-owner-d", "machine-13882-files-od", []);
    const someFile = seedFile(someKey.id, "session-list-visible");

    const { res, body } = await listFilesVia({ cookie: await sessionCookie() });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.files?.some((f) => f.id === someFile.id) ?? false, true);
  });

  it("anonymous caller cannot download a foreign file's content", async () => {
    const victim = await createApiKey("13882-files-victim-e", "machine-13882-files-ve", []);
    const victimFile = seedFile(victim.id, "anon-content-victim");

    const res = await getFileContentVia({}, victimFile.id);
    assert.notStrictEqual(res.status, 200, "anonymous caller must not download a foreign file");
  });

  it("a foreign API key cannot download another key's file content", async () => {
    const owner = await createApiKey("13882-files-owner-f", "machine-13882-files-of", []);
    const foreign = await createApiKey("13882-files-foreign-f", "machine-13882-files-ff", []);
    const ownerFile = seedFile(owner.id, "foreign-content-victim");

    const res = await getFileContentVia({ Authorization: `Bearer ${foreign.key}` }, ownerFile.id);
    assert.notStrictEqual(res.status, 200, "a foreign key must not download another key's file");
  });

  it("the owning API key can still download its own file content", async () => {
    const owner = await createApiKey("13882-files-owner-g", "machine-13882-files-og", []);
    const ownedFile = seedFile(owner.id, "owner-content-self");

    const res = await getFileContentVia({ Authorization: `Bearer ${owner.key}` }, ownedFile.id);
    assert.strictEqual(res.status, 200);
  });
});

describe("#13882 — /api/batches management sibling ownership scoping", () => {
  it("anonymous caller (requireLogin=false, no credentials) cannot list a foreign batch", async () => {
    const victim = await createApiKey("13882-batches-victim-a", "machine-13882-batches-a", []);
    const { batch: victimBatch } = seedBatch(victim.id, "anon-list-victim");

    const { res, body } = await listBatchesVia({});
    const leaked =
      res.status === 200 && (body.batches?.some((b) => b.id === victimBatch.id) ?? false);
    assert.strictEqual(leaked, false, "anonymous caller must not enumerate a foreign batch");
  });

  it("a foreign API key cannot list another key's batch", async () => {
    const owner = await createApiKey("13882-batches-owner-b", "machine-13882-batches-ob", []);
    const foreign = await createApiKey("13882-batches-foreign-b", "machine-13882-batches-fb", []);
    const { batch: ownerBatch } = seedBatch(owner.id, "foreign-list-victim");

    const { res, body } = await listBatchesVia({ Authorization: `Bearer ${foreign.key}` });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(
      body.batches?.some((b) => b.id === ownerBatch.id) ?? false,
      false,
      "a foreign key must not see another key's batch in its own list"
    );
  });

  it("the owning API key can still list its own batch", async () => {
    const owner = await createApiKey("13882-batches-owner-c", "machine-13882-batches-oc", []);
    const { batch: ownedBatch } = seedBatch(owner.id, "owner-list-self");

    const { res, body } = await listBatchesVia({ Authorization: `Bearer ${owner.key}` });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.batches?.some((b) => b.id === ownedBatch.id) ?? false, true);
  });

  it("a dashboard session (instance operator) still sees every tenant's batch", async () => {
    const someKey = await createApiKey("13882-batches-owner-d", "machine-13882-batches-od", []);
    const { batch: someBatch } = seedBatch(someKey.id, "session-list-visible");

    const { res, body } = await listBatchesVia({ cookie: await sessionCookie() });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.batches?.some((b) => b.id === someBatch.id) ?? false, true);
  });

  it("anonymous caller cannot read a foreign batch's metadata", async () => {
    const victim = await createApiKey("13882-batches-victim-e", "machine-13882-batches-ve", []);
    const { batch: victimBatch } = seedBatch(victim.id, "anon-getid-victim");

    const res = await getBatchVia({}, victimBatch.id);
    assert.notStrictEqual(res.status, 200, "anonymous caller must not read a foreign batch");
  });

  it("a foreign API key cannot read another key's batch metadata", async () => {
    const owner = await createApiKey("13882-batches-owner-f", "machine-13882-batches-of", []);
    const foreign = await createApiKey("13882-batches-foreign-f", "machine-13882-batches-ff", []);
    const { batch: ownerBatch } = seedBatch(owner.id, "foreign-getid-victim");

    const res = await getBatchVia({ Authorization: `Bearer ${foreign.key}` }, ownerBatch.id);
    assert.notStrictEqual(res.status, 200, "a foreign key must not read another key's batch");
  });

  it("the owning API key can still read its own batch metadata", async () => {
    const owner = await createApiKey("13882-batches-owner-g", "machine-13882-batches-og", []);
    const { batch: ownedBatch } = seedBatch(owner.id, "owner-getid-self");

    const res = await getBatchVia({ Authorization: `Bearer ${owner.key}` }, ownedBatch.id);
    assert.strictEqual(res.status, 200);
  });
});
