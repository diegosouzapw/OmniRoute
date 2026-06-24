/**
 * TDD tests for /api/settings/obsidian/webdav route (PR1 of #3485).
 *
 * Covers:
 *  - GET: no config → disabled shape with null creds
 *  - POST: valid temp dir → enabled, returns { username, password }
 *  - POST: non-existent path → 400 with no stack trace leaked
 *  - DELETE: after enable → disabled, creds cleared
 *  - Unauthenticated → 401
 *  - Encryption round-trip: set password → raw DB value is NOT plaintext → get returns plaintext
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-obsidian-webdav-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;

// Set DATA_DIR before any module imports so the DB picks up the temp dir.
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
// Import settings to control auth requirements
const settingsDb = await import("../../src/lib/db/settings.ts");
// Import the route under test
const route = await import("../../src/app/api/settings/obsidian/webdav/route.ts");
// Import DB module to inspect raw stored values
const obsidianDb = await import("../../src/lib/db/obsidian.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(url: string, options?: RequestInit): NextRequest {
  return new Request(url, options) as unknown as NextRequest;
}

async function makeAuthenticatedRequest(
  url: string,
  options?: Parameters<typeof makeManagementSessionRequest>[1]
): Promise<NextRequest> {
  return (await makeManagementSessionRequest(url, options)) as unknown as NextRequest;
}

test.beforeEach(async () => {
  delete process.env.INITIAL_PASSWORD;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
  if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) {
    delete process.env.STORAGE_ENCRYPTION_KEY;
  } else {
    process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
});

// ── Auth is disabled by default (requireLogin not set) so requests succeed ──

test("GET with no config → webdavEnabled:false, all creds null", async () => {
  const req = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav");
  const res = await route.GET(req);

  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(body.webdavEnabled, false);
  assert.equal(body.webdavUsername, null);
  assert.equal(body.webdavPassword, null);
  assert.equal(body.vaultPath, null);
});

test("POST with a valid temp dir → returns { username, password }, GET shows enabled", async () => {
  const vaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vault-"));
  try {
    const req = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { vaultPath: vaultDir },
    });
    const res = await route.POST(req);

    assert.equal(res.status, 200);
    const body = (await res.json()) as Record<string, unknown>;
    assert.ok(
      typeof body.username === "string" && (body.username as string).length > 0,
      "username non-empty"
    );
    assert.ok(
      typeof body.password === "string" && (body.password as string).length > 0,
      "password non-empty"
    );
    assert.ok(typeof body.vaultPath === "string", "vaultPath returned");

    // GET should now reflect enabled state
    const getReq = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav");
    const getRes = await route.GET(getReq);
    assert.equal(getRes.status, 200);
    const getBody = (await getRes.json()) as Record<string, unknown>;
    assert.equal(getBody.webdavEnabled, true);
    assert.ok(
      typeof getBody.webdavUsername === "string" && (getBody.webdavUsername as string).length > 0
    );
    assert.ok(
      typeof getBody.webdavPassword === "string" && (getBody.webdavPassword as string).length > 0
    );
  } finally {
    fs.rmSync(vaultDir, { recursive: true, force: true });
  }
});

test("POST with a non-existent path → 400, body does NOT contain a stack trace", async () => {
  const nonExistentPath = path.join(os.tmpdir(), "omni-nonexistent-vault-" + Date.now());
  const req = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { vaultPath: nonExistentPath },
  });
  const res = await route.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as Record<string, unknown>;
  const errorMsg = (body.error as Record<string, unknown> | undefined)?.message as
    | string
    | undefined;
  // Must not leak stack trace
  assert.ok(
    !errorMsg || !errorMsg.includes("at /"),
    `Error message should not contain a stack trace, got: ${errorMsg}`
  );
});

test("POST with invalid body (missing vaultPath) → 400", async () => {
  const req = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: {},
  });
  const res = await route.POST(req);
  assert.equal(res.status, 400);
});

test("DELETE after enable → webdavEnabled:false, creds cleared in GET", async () => {
  const vaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vault2-"));
  try {
    // Enable first
    const enableReq = await makeAuthenticatedRequest(
      "http://localhost/api/settings/obsidian/webdav",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { vaultPath: vaultDir },
      }
    );
    const enableRes = await route.POST(enableReq);
    assert.equal(enableRes.status, 200);

    // Delete
    const deleteReq = await makeAuthenticatedRequest(
      "http://localhost/api/settings/obsidian/webdav",
      {
        method: "DELETE",
      }
    );
    const deleteRes = await route.DELETE(deleteReq);
    assert.equal(deleteRes.status, 200);
    const deleteBody = (await deleteRes.json()) as Record<string, unknown>;
    assert.equal(deleteBody.success, true);

    // GET should now show disabled
    const getReq = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav");
    const getRes = await route.GET(getReq);
    const getBody = (await getRes.json()) as Record<string, unknown>;
    assert.equal(getBody.webdavEnabled, false);
    assert.equal(getBody.webdavUsername, null);
    assert.equal(getBody.webdavPassword, null);
  } finally {
    fs.rmSync(vaultDir, { recursive: true, force: true });
  }
});

test("GET when disabled does not leak password even if stale data exists", async () => {
  const vaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vault3-"));
  try {
    // Enable, then disable
    const enableReq = await makeAuthenticatedRequest(
      "http://localhost/api/settings/obsidian/webdav",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: { vaultPath: vaultDir },
      }
    );
    await route.POST(enableReq);
    const deleteReq = await makeAuthenticatedRequest(
      "http://localhost/api/settings/obsidian/webdav",
      {
        method: "DELETE",
      }
    );
    await route.DELETE(deleteReq);

    // GET now: password must be null (not a stale value)
    const getReq = await makeAuthenticatedRequest("http://localhost/api/settings/obsidian/webdav");
    const getRes = await route.GET(getReq);
    const getBody = (await getRes.json()) as Record<string, unknown>;
    assert.equal(getBody.webdavEnabled, false);
    assert.equal(getBody.webdavPassword, null);
  } finally {
    fs.rmSync(vaultDir, { recursive: true, force: true });
  }
});

// ── Auth guard tests ──

test("Unauthenticated GET → 401 when auth is required", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });

  const req = makeRequest("http://localhost/api/settings/obsidian/webdav");
  const res = await route.GET(req);
  assert.equal(res.status, 401);
});

test("Unauthenticated POST → 401 when auth is required", async () => {
  const vaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vault4-"));
  try {
    process.env.INITIAL_PASSWORD = "bootstrap-password";
    await settingsDb.updateSettings({ requireLogin: true, password: "" });

    const req = makeRequest("http://localhost/api/settings/obsidian/webdav", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ vaultPath: vaultDir }),
    });
    const res = await route.POST(req);
    assert.equal(res.status, 401);
  } finally {
    fs.rmSync(vaultDir, { recursive: true, force: true });
  }
});

test("Unauthenticated DELETE → 401 when auth is required", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });

  const req = makeRequest("http://localhost/api/settings/obsidian/webdav", {
    method: "DELETE",
  });
  const res = await route.DELETE(req);
  assert.equal(res.status, 401);
});

// ── Encryption round-trip ──

test("encryption round-trip: setWebdavPassword stores encrypted, getWebdavPassword returns plaintext", async () => {
  // Enable encryption
  process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-webdav-route-tests";

  // Invalidate cached encryption keys so the new env var is picked up.
  // The encryption module caches keys in module-level vars; we reset via db instance.
  core.resetDbInstance();

  const plaintext = "super-secret-webdav-password-12345";
  obsidianDb.setWebdavPassword(plaintext);

  // Inspect raw DB row — it must NOT be the plaintext
  const db = core.getDbInstance();
  type KVRow = { value: string };
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("obsidian", "webdav_password") as KVRow | undefined;

  assert.ok(row !== undefined, "Row should exist");
  // The stored JSON string — parse to get inner value
  const storedInner = JSON.parse(row!.value) as string;
  assert.notEqual(
    storedInner,
    plaintext,
    "Raw DB value must NOT be plaintext when encryption is enabled"
  );
  assert.ok(
    storedInner.startsWith("enc:v1:"),
    `Raw DB value should start with enc:v1: prefix, got: ${storedInner.slice(0, 40)}`
  );

  // getWebdavPassword must round-trip back to plaintext
  const retrieved = obsidianDb.getWebdavPassword();
  assert.equal(retrieved, plaintext, "getWebdavPassword must return original plaintext");

  // Clean up env for other tests
  delete process.env.STORAGE_ENCRYPTION_KEY;
  core.resetDbInstance();
});

test("encryption graceful fallback: plaintext stored without key reads back correctly", async () => {
  // No encryption key set — store plaintext
  const plaintext = "plaintext-webdav-password";
  obsidianDb.setWebdavPassword(plaintext);

  // Must read back the same value
  const retrieved = obsidianDb.getWebdavPassword();
  assert.equal(
    retrieved,
    plaintext,
    "Plaintext value must read back unchanged when no encryption key"
  );
});
