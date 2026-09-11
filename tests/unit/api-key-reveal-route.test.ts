import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-key-reveal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function maskKey(key) {
  return key.slice(0, 8) + "****" + key.slice(-4);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  delete process.env.ALLOW_API_KEY_REVEAL;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /api/keys stays masked even when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const response = await listRoute.GET(new Request("http://localhost/api/keys"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(Array.isArray(body.keys), true);
  // The key is redacted at rest now (see redactedKeyPlaceholder()), so the
  // list view falls back to the separately-stored, low-sensitivity
  // key_prefix for an identifying label instead of masking a nonexistent
  // secret — and either way, the real key value must never appear here.
  const listedKey = body.keys[0].key;
  assert.notEqual(listedKey, created.key);
  assert.equal(listedKey, `${created.key.slice(0, 12)}****`);
});

test("GET /api/keys falls back to default pagination for invalid query params", async () => {
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    new Request("http://localhost/api/keys?limit=abc&offset=xyz")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.allowKeyReveal, false);
  assert.equal(body.total, 2);
  assert.equal(body.keys.length, 2);
  assert.equal(
    body.keys.every((entry) => entry.key.includes("****")),
    true
  );
});

test("GET /api/keys returns 500 when key loading fails unexpectedly", async () => {
  await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql, ...args) => {
    if (typeof sql === "string" && sql.includes("SELECT * FROM api_keys")) {
      throw new Error("db exploded");
    }
    return originalPrepare(sql, ...args);
  };
  apiKeysDb.resetApiKeyState();

  try {
    const response = await listRoute.GET(new Request("http://localhost/api/keys"));
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error, "Failed to fetch keys");
  } finally {
    db.prepare = originalPrepare;
    apiKeysDb.resetApiKeyState();
  }
});

test("GET /api/keys/[id]/reveal rejects requests when reveal is disabled", async () => {
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 403);
  assert.equal(body.error, "API key reveal is disabled");
});

// Security fix: createApiKey() no longer persists a recoverable plaintext
// secret (see redactedKeyPlaceholder() in src/lib/db/apiKeys.ts) — the raw
// value is only ever shown once, at creation time, in the response object
// `created.key` returned in-memory to the caller. The DB row itself carries
// an inert `redacted:<id>` placeholder, so a *fresh* key can never be
// revealed again later. That is the intended, correct behavior now — verify
// the route reports it clearly (410, not a silent wrong value) rather than
// asserting the old "reveal returns the original key" contract.
test("GET /api/keys/[id]/reveal reports a redacted key as gone (410), not as a revealable value", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 410);
  assert.equal(body.redacted, true);
});

test("GET /api/keys/[id]/reveal honors the ALLOW_API_KEY_REVEAL feature flag override (still 410 for a redacted key)", async () => {
  featureFlagsDb.setFeatureFlagOverride("ALLOW_API_KEY_REVEAL", "true");
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);
  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  // The flag override controls whether the endpoint is reachable at all
  // (not 403) — it does not resurrect a plaintext secret that was never
  // persisted.
  assert.equal(response.status, 410);
  assert.equal(body.redacted, true);
});

test("GET /api/keys/[id]/reveal returns the real value for a legacy key that still has a usable (non-redacted) secret", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const created = await apiKeysDb.createApiKey("Primary Key", MACHINE_ID);

  // Simulate a pre-migration row (or one `encryptApiKeyPlaintext()` migrated
  // to ciphertext rather than a placeholder) that still carries a real,
  // resolvable secret in `api_keys.key`.
  const db = core.getDbInstance();
  const legacyKey = "sk-legacy-reveal-test-0123456789abcdef";
  db.prepare("UPDATE api_keys SET key = ? WHERE id = ?").run(legacyKey, created.id);

  const request = new Request(`http://localhost/api/keys/${created.id}/reveal`);
  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: created.id }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.key, legacyKey);
});

test("GET /api/keys/[id]/reveal returns 404 for unknown keys even when reveal is enabled", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const request = new Request("http://localhost/api/keys/missing/reveal");

  const response = await revealRoute.GET(request, {
    params: Promise.resolve({ id: "missing" }),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Key not found");
});

test("GET /api/keys/[id]/reveal returns 500 when params resolution fails", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const request = new Request("http://localhost/api/keys/broken/reveal");

  const response = await revealRoute.GET(request, {
    params: Promise.reject(new Error("params exploded")),
  });
  const body = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.equal(body.error, "Failed to reveal key");
});
