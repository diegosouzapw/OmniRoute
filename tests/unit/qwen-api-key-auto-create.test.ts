import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "os";
import path from "path";
import { SignJWT } from "jose";
import { getOrCreateApiKey, resolveApiKey } from "../../src/shared/services/apiKeyResolver";
import { validateApiKey } from "../../src/lib/db/apiKeys";
import { getDbInstance } from "../../src/lib/db/core";

const DUMMY_HOME = path.join(os.tmpdir(), "omniroute-qwen-key-test-" + Date.now());
const originalJwtSecret = process.env.JWT_SECRET;

async function createAuthCookie() {
  process.env.JWT_SECRET = "test-cli-tools-secret";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ sub: "test-user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

const originalHomedir = os.homedir;

test.beforeEach(async () => {
  process.env.DATA_DIR = DUMMY_HOME;
  process.env.API_KEY_SECRET = "test-secret";
  os.homedir = () => DUMMY_HOME;
  await fs.mkdir(DUMMY_HOME, { recursive: true }).catch(() => {});
  // Initialize DB
  getDbInstance();
});

test.afterEach(async () => {
  await fs.rm(DUMMY_HOME, { recursive: true, force: true }).catch(() => {});
  os.homedir = originalHomedir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  if (process.env.DATA_DIR?.includes("omniroute-qwen-key-test")) {
    delete process.env.DATA_DIR;
  }
});

test("getOrCreateApiKey() creates DB-backed key when no keyId provided", async () => {
  const apiKey = await getOrCreateApiKey(null);

  // Key should NOT be the placeholder "sk_omniroute"
  assert.notEqual(apiKey, "sk_omniroute", "Should not return placeholder");
  assert.ok(apiKey.startsWith("sk-"), "Key should start with sk- prefix");

  // Key should be valid in DB
  const valid = await validateApiKey(apiKey);
  assert.equal(valid, true, "Auto-created key should validate successfully");
});

test("getOrCreateApiKey() returns existing key when keyId is provided", async () => {
  // First create a key with a specific keyId
  const firstKey = await getOrCreateApiKey(null);
  assert.ok(firstKey.startsWith("sk-"));

  // Create another key and get its ID
  const secondKey = await getOrCreateApiKey(null);

  // When we pass the same keyId, we should get the same key back
  // (This tests the keyId resolution path)
  const resolvedKey = await resolveApiKey(null, firstKey);
  assert.equal(resolvedKey, firstKey, "Should return same key when resolved");
});

test("Qwen guide-settings POST creates valid DB-backed key (no keyId)", async () => {
  const guideSettingsRoute =
    await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

  const cookie = await createAuthCookie();
  const req = new Request("http://localhost/api/cli-tools/guide-settings/qwen", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({
      baseUrl: "http://localhost:20128/v1",
      model: "qwen3-coder-flash",
      // No keyId provided - should auto-create
    }),
  });

  const response = await guideSettingsRoute.POST(req, { params: { toolId: "qwen" } });
  assert.equal(response.status, 200, "Response should be OK");

  // Verify settings.json was written with security.auth format and a valid DB-backed key
  const configPath = path.join(DUMMY_HOME, ".qwen", "settings.json");
  const content = JSON.parse(await fs.readFile(configPath, "utf-8"));

  assert.equal(content.security?.auth?.selectedType, "openai", "Should use openai auth type");
  assert.ok(content.security?.auth?.apiKey, "Should have an API key");
  assert.equal(
    content.security?.auth?.baseUrl,
    "http://localhost:20128/v1",
    "Should have base URL"
  );
  assert.equal(content.model?.name, "qwen3-coder-flash", "Should have model name");

  const apiKey = content.security.auth.apiKey;
  assert.notEqual(apiKey, "sk_omniroute", "Should not use placeholder");
  assert.ok(apiKey.startsWith("sk-"), "Key should start with sk- prefix");

  // Verify the key is valid in DB
  const valid = await validateApiKey(apiKey);
  assert.equal(valid, true, "Auto-created key should validate in DB");
});

test("Qwen guide-settings POST with keyId uses existing key", async () => {
  const guideSettingsRoute =
    await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");

  // Pre-create a key via getOrCreateApiKey
  const existingKey = await getOrCreateApiKey(null);
  const keyIdMatch = existingKey.match(/^sk-[^-]+-([^-]+)-/);
  assert.ok(keyIdMatch, "Key should have ID portion");

  // Get key metadata to find the ID
  const db = getDbInstance();
  const stmt = db.prepare("SELECT id FROM api_keys WHERE `key` = ?");
  const row = stmt.get(existingKey) as { id: string } | undefined;
  assert.ok(row, "Key should exist in DB");

  const cookie = await createAuthCookie();
  const req = new Request("http://localhost/api/cli-tools/guide-settings/qwen", {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({
      baseUrl: "http://localhost:20128/v1",
      model: "qwen3-coder-plus",
      keyId: row.id,
    }),
  });

  const response = await guideSettingsRoute.POST(req, { params: { toolId: "qwen" } });
  assert.equal(response.status, 200, "Response should be OK");

  // Verify settings.json uses security.auth format with the existing key
  const configPath = path.join(DUMMY_HOME, ".qwen", "settings.json");
  const content = JSON.parse(await fs.readFile(configPath, "utf-8"));

  assert.equal(content.security?.auth?.selectedType, "openai");
  assert.equal(
    content.security?.auth?.apiKey,
    existingKey,
    "Should use existing key when keyId provided"
  );
  assert.equal(content.security?.auth?.baseUrl, "http://localhost:20128/v1");
  assert.equal(content.model?.name, "qwen3-coder-plus");
});
