/**
 * TDD tests for the WebDAV server (PR2, issue #3485).
 *
 * Tests cover the PURE logic exported by scripts/dev/webdav-handler.mjs:
 *  - resolveVaultPath: path traversal guard
 *  - verifyBasicAuth: correct/wrong/malformed creds, constant-time path
 *  - decryptStored: values encrypted by src/lib/db/encryption.ts decrypt correctly
 *  - buildPropfindXml: structure, special-char escaping, collection vs file
 *  - PUT/GET round-trip, DELETE, MKCOL, MOVE via thin HTTP test harness
 *  - disabled/no-creds → 503 (not served)
 *
 * Uses Node's native test runner (no vitest dependency).
 * Filesystem operations use a real temp dir (fs.mkdtempSync).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { EventEmitter } from "node:events";
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import { pathToFileURL } from "node:url";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const HANDLER_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../scripts/dev/webdav-handler.mjs"
);

/** Import the handler module fresh (bust module cache for env-dependent tests). */
async function importHandler(): Promise<typeof import("../../scripts/dev/webdav-handler.mjs")> {
  const url = pathToFileURL(HANDLER_PATH).href;
  return import(`${url}?t=${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

/** Encrypt a string with the OmniRoute enc:v1: format using the given secret.
 *  Mirrors src/lib/db/encryption.ts: scrypt with static salt, AES-256-GCM. */
function encryptTs(secret: string, plaintext: string): string {
  const STATIC_SALT = "omniroute-field-encryption-v1";
  const key = scryptSync(secret, STATIC_SALT, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `enc:v1:${iv.toString("hex")}:${encrypted}:${authTag}`;
}

/** Create a simple IncomingMessage-like object for unit tests. */
function fakeReq(
  method: string,
  url: string,
  headers: Record<string, string> = {},
  body: Buffer | null = null
): http.IncomingMessage {
  const req = Object.assign(new EventEmitter(), {
    method,
    url,
    headers: Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v])),
    socket: { remoteAddress: "127.0.0.1" },
  }) as unknown as http.IncomingMessage;

  if (body !== null) {
    // Emit data/end on next tick so async consumers can wire listeners first
    setImmediate(() => {
      req.emit("data", body);
      req.emit("end");
    });
  } else {
    setImmediate(() => {
      req.emit("end");
    });
  }

  return req;
}

/** Capture a ServerResponse into { status, headers, body }. */
async function captureRes(
  req: http.IncomingMessage,
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => Promise<boolean>
): Promise<{ status: number; headers: http.OutgoingHttpHeaders; body: string }> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let status = 200;
    let headers: http.OutgoingHttpHeaders = {};

    const res = {
      headersSent: false,
      writeHead(s: number, h: http.OutgoingHttpHeaders) {
        status = s;
        headers = h ?? {};
        this.headersSent = true;
      },
      end(data?: Buffer | string) {
        if (data) chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
        resolve({ status, headers, body: Buffer.concat(chunks).toString("utf8") });
      },
      write(chunk: Buffer | string) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      },
      destroy() {
        resolve({ status, headers, body: Buffer.concat(chunks).toString("utf8") });
      },
      on() {
        return this;
      },
      pipe(dest: NodeJS.WritableStream) {
        dest.end();
        resolve({ status, headers, body: "" });
      },
    } as unknown as http.ServerResponse;

    handler(req, res).then(() => {
      // resolve was already called via res.end
    });
  });
}

/** Build a Basic-Auth Authorization header value. */
function basicAuth(user: string, pass: string): string {
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

// ─────────────────────────────────────────────────────────────────────────────
// Setup
// ─────────────────────────────────────────────────────────────────────────────

const VAULT_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-vault-"));
const ORIG_KEY = process.env.STORAGE_ENCRYPTION_KEY;

test.after(() => {
  fs.rmSync(VAULT_ROOT, { recursive: true, force: true });
  if (ORIG_KEY === undefined) {
    delete process.env.STORAGE_ENCRYPTION_KEY;
  } else {
    process.env.STORAGE_ENCRYPTION_KEY = ORIG_KEY;
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Path traversal guard (resolveVaultPath)
// ─────────────────────────────────────────────────────────────────────────────

test("resolveVaultPath: simple path inside vault resolves correctly", async () => {
  const { resolveVaultPath } = await importHandler();
  const { absPath } = resolveVaultPath(VAULT_ROOT, "/api/v1/webdav/notes/file.md");
  assert.equal(absPath, path.join(VAULT_ROOT, "notes", "file.md"));
});

test("resolveVaultPath: root path resolves to vaultRoot", async () => {
  const { resolveVaultPath } = await importHandler();
  const { absPath } = resolveVaultPath(VAULT_ROOT, "/api/v1/webdav/");
  assert.equal(absPath, path.resolve(VAULT_ROOT));
});

test("resolveVaultPath: ../ traversal is rejected with 403", async () => {
  const { resolveVaultPath } = await importHandler();
  assert.throws(
    () => resolveVaultPath(VAULT_ROOT, "/api/v1/webdav/../../../etc/passwd"),
    (err: { status: number }) => err.status === 403
  );
});

test("resolveVaultPath: encoded %2e%2e%2f traversal is rejected with 403", async () => {
  const { resolveVaultPath } = await importHandler();
  assert.throws(
    () => resolveVaultPath(VAULT_ROOT, "/api/v1/webdav/%2e%2e%2fetc/passwd"),
    (err: { status: number }) => err.status === 403
  );
});

test("resolveVaultPath: encoded %2e%2e traversal variant is rejected", async () => {
  const { resolveVaultPath } = await importHandler();
  assert.throws(
    () => resolveVaultPath(VAULT_ROOT, "/api/v1/webdav/%2e%2e/secret"),
    (err: { status: number }) => err.status === 403
  );
});

test("resolveVaultPath: absolute path injection outside vault is rejected", async () => {
  const { resolveVaultPath } = await importHandler();
  // The guard must catch paths that escape the vault root after resolution.
  // We test by passing a request path whose decoded form resolves outside VAULT_ROOT.
  // The URL segment /api/v1/webdav is stripped, then the remaining path is decoded
  // and resolved relative to vaultRoot. A path like /../../../outside must be caught.

  // Use an alternative vault root with a deeper subdir so we can craft an escape
  const deepVault = path.join(VAULT_ROOT, "sub", "deep");
  // /api/v1/webdav/../../secret: after prefix strip → /../../secret
  // stripped of leading slashes → ../../secret
  // path.resolve(deepVault, "../../secret") → VAULT_ROOT/secret which is OUTSIDE deepVault
  assert.throws(
    () => resolveVaultPath(deepVault, "/api/v1/webdav/../../secret"),
    (err: { status: number }) => err.status === 403
  );
});

test("resolveDestinationPath: raw path that escapes vault is rejected", async () => {
  const { resolveDestinationPath } = await importHandler();
  // Use a deep vault so we can craft an escape path.
  // Pass a raw path (not a full URL) so the URL parser does not normalise away the ..
  const deepVault = path.join(VAULT_ROOT, "sub", "deep");
  // A raw Destination header path that resolves outside deepVault
  assert.throws(
    () => resolveDestinationPath(deepVault, "/api/v1/webdav/../../escape-target"),
    (err: { status: number }) => err.status === 403
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. verifyBasicAuth
// ─────────────────────────────────────────────────────────────────────────────

test("verifyBasicAuth: correct credentials return true", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth(basicAuth("alice", "s3cr3t"), "alice", "s3cr3t"), true);
});

test("verifyBasicAuth: wrong password returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth(basicAuth("alice", "wrong"), "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: wrong username returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth(basicAuth("bob", "s3cr3t"), "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: missing header returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth(undefined, "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: empty header returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth("", "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: non-Basic scheme returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(
    verifyBasicAuth("Bearer some-token", "alice", "s3cr3t"),
    false
  );
});

test("verifyBasicAuth: malformed base64 returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  assert.equal(verifyBasicAuth("Basic !!!notbase64!!!", "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: base64 with no colon separator returns false", async () => {
  const { verifyBasicAuth } = await importHandler();
  const noColon = "Basic " + Buffer.from("alices3cr3t").toString("base64");
  assert.equal(verifyBasicAuth(noColon, "alice", "s3cr3t"), false);
});

test("verifyBasicAuth: constant-time path exercised (long password diff)", async () => {
  const { verifyBasicAuth } = await importHandler();
  const longPassword = "a".repeat(1000);
  // Should return false without throwing on length mismatch
  assert.equal(verifyBasicAuth(basicAuth("alice", longPassword), "alice", "short"), false);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. decryptStored (port of encryption.ts)
// ─────────────────────────────────────────────────────────────────────────────

test("decryptStored: plaintext passthrough when no enc: prefix", async () => {
  delete process.env.STORAGE_ENCRYPTION_KEY;
  const { decryptStored } = await importHandler();
  assert.equal(decryptStored("plaintext-password"), "plaintext-password");
});

test("decryptStored: null input returns null", async () => {
  delete process.env.STORAGE_ENCRYPTION_KEY;
  const { decryptStored } = await importHandler();
  assert.equal(decryptStored(null), null);
});

test("decryptStored: value encrypted by TS encrypt() decrypts correctly", async () => {
  const SECRET = "webdav-test-encryption-key-32chars-ok";
  process.env.STORAGE_ENCRYPTION_KEY = SECRET;
  const encrypted = encryptTs(SECRET, "my-vault-password");

  const { decryptStored } = await importHandler();
  const result = decryptStored(encrypted);
  assert.equal(result, "my-vault-password");
});

test("decryptStored: encrypted value with no key configured returns null", async () => {
  delete process.env.STORAGE_ENCRYPTION_KEY;
  // Even if a value has enc:v1: prefix, without the key we cannot decrypt
  const { decryptStored } = await importHandler();
  const fakeEncrypted = "enc:v1:aabbccdd:eeff0011:22334455";
  assert.equal(decryptStored(fakeEncrypted), null);
});

test("decryptStored: malformed enc:v1: format returns null", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "some-key-value-here";
  const { decryptStored } = await importHandler();
  assert.equal(decryptStored("enc:v1:onlytwoparts:missing"), null);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. buildPropfindXml
// ─────────────────────────────────────────────────────────────────────────────

test("buildPropfindXml: produces valid XML with entries", async () => {
  const { buildPropfindXml } = await importHandler();
  const now = new Date("2026-01-01T00:00:00Z");
  const xml = buildPropfindXml(
    [
      { name: "notes", href: "/api/v1/webdav/notes/", isDir: true, size: 0, mtime: now },
      {
        name: "file.md",
        href: "/api/v1/webdav/notes/file.md",
        isDir: false,
        size: 1234,
        mtime: now,
      },
    ],
    "/api/v1/webdav/"
  );

  assert.match(xml, /<?xml version="1.0"/);
  assert.match(xml, /D:multistatus/);
  assert.match(xml, /D:response/);
  assert.match(xml, /notes/);
  assert.match(xml, /file\.md/);
  assert.match(xml, /1234/); // content-length for file
  assert.match(xml, /D:collection/); // dir has collection resourcetype
});

test("buildPropfindXml: escapes XML special chars in names", async () => {
  const { buildPropfindXml } = await importHandler();
  const xml = buildPropfindXml(
    [
      {
        name: "a <b> & c 'quote' \"double\"",
        href: "/api/v1/webdav/a",
        isDir: false,
        size: 10,
        mtime: new Date(),
      },
    ],
    "/api/v1/webdav/"
  );

  // Unescaped < > & ' " must not appear inside element content
  assert.doesNotMatch(xml, /<D:displayname>[^<]*<[^/]/);
  assert.match(xml, /&lt;/);
  assert.match(xml, /&gt;/);
  assert.match(xml, /&amp;/);
});

test("buildPropfindXml: file entry has no D:collection resourcetype", async () => {
  const { buildPropfindXml } = await importHandler();
  const xml = buildPropfindXml(
    [{ name: "note.md", href: "/api/v1/webdav/note.md", isDir: false, size: 99, mtime: new Date() }],
    "/api/v1/webdav/"
  );
  // File should have empty resourcetype, not a collection
  assert.doesNotMatch(xml, /D:collection/);
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Integration: PUT/GET/DELETE/MKCOL/MOVE with real temp vault
// Uses maybeHandleWebdav via a fake DB config injected via loadWebdavConfig mock.
// We test the pure HTTP dispatch against the real filesystem here.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a partial handler that bypasses DB (loadWebdavConfig) and uses a
 * hard-coded config for integration tests. We do this by wrapping maybeHandleWebdav
 * through a thin shim that patches the module's DB loader.
 *
 * Because ES module mocking is complex, we instead test the HTTP method handlers
 * directly via the private functions. Since those are not exported, we use a
 * small in-process test server that wires up the real maybeHandleWebdav with
 * a SQLite DB pre-populated with our test config.
 */

// Create a minimal SQLite DB for integration tests
async function createTestDb(
  dataDir: string,
  opts: { enabled: boolean; username: string; password: string; vaultPath: string }
) {
  const { createRequire } = await import("node:module");
  const _require = createRequire(import.meta.url);
  const Database = _require("better-sqlite3");
  const dbPath = path.join(dataDir, "storage.sqlite");
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );
  `);

  const upsert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );

  upsert.run("obsidian", "webdav_enabled", JSON.stringify(opts.enabled));
  upsert.run("obsidian", "webdav_username", JSON.stringify(opts.username));
  upsert.run("obsidian", "webdav_password", JSON.stringify(opts.password));
  upsert.run("obsidian", "vault_path", JSON.stringify(opts.vaultPath));

  db.close();
  return dbPath;
}

/** Run a single WebDAV request through the real handler with a test DB. */
async function webdavRequest(opts: {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: Buffer;
  dataDir: string;
}): Promise<{ status: number; headers: http.OutgoingHttpHeaders; body: string }> {
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = opts.dataDir;

  try {
    const handler = await importHandler();
    const req = fakeReq(opts.method, opts.url, opts.headers || {}, opts.body || null);
    return captureRes(req, (r, s) => handler.maybeHandleWebdav(r, s));
  } finally {
    if (origDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = origDataDir;
    }
  }
}

const TEST_USER = "obsidian";
const TEST_PASS = "test-password-123";
const AUTH_HEADER = basicAuth(TEST_USER, TEST_PASS);

// Create integration test environment
const intDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-int-"));
const intVaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-vault-int-"));

test.before(async () => {
  await createTestDb(intDataDir, {
    enabled: true,
    username: TEST_USER,
    password: TEST_PASS, // plaintext (no enc: prefix — backward compat)
    vaultPath: intVaultDir,
  });
});

test.after(() => {
  fs.rmSync(intDataDir, { recursive: true, force: true });
  fs.rmSync(intVaultDir, { recursive: true, force: true });
});

test("PUT then GET round-trips a file correctly", async () => {
  const content = Buffer.from("# Hello Obsidian\nThis is a test note.", "utf8");

  const putRes = await webdavRequest({
    method: "PUT",
    url: "/api/v1/webdav/hello.md",
    headers: { authorization: AUTH_HEADER, "content-length": String(content.length) },
    body: content,
    dataDir: intDataDir,
  });
  // 201 Created (new file)
  assert.ok([201, 204].includes(putRes.status), `PUT expected 201/204, got ${putRes.status}`);

  const getRes = await webdavRequest({
    method: "GET",
    url: "/api/v1/webdav/hello.md",
    headers: { authorization: AUTH_HEADER },
    dataDir: intDataDir,
  });
  assert.equal(getRes.status, 200);
  assert.equal(getRes.body, content.toString("utf8"));
});

test("PUT (update) returns 204, GET reflects updated content", async () => {
  // First create
  await webdavRequest({
    method: "PUT",
    url: "/api/v1/webdav/update-me.md",
    headers: { authorization: AUTH_HEADER },
    body: Buffer.from("original", "utf8"),
    dataDir: intDataDir,
  });

  // Then update
  const updated = Buffer.from("updated content", "utf8");
  const putRes2 = await webdavRequest({
    method: "PUT",
    url: "/api/v1/webdav/update-me.md",
    headers: { authorization: AUTH_HEADER },
    body: updated,
    dataDir: intDataDir,
  });
  assert.equal(putRes2.status, 204);

  const getRes = await webdavRequest({
    method: "GET",
    url: "/api/v1/webdav/update-me.md",
    headers: { authorization: AUTH_HEADER },
    dataDir: intDataDir,
  });
  assert.equal(getRes.body, "updated content");
});

test("DELETE removes a file, subsequent GET returns 404", async () => {
  await webdavRequest({
    method: "PUT",
    url: "/api/v1/webdav/delete-me.md",
    headers: { authorization: AUTH_HEADER },
    body: Buffer.from("temp", "utf8"),
    dataDir: intDataDir,
  });

  const delRes = await webdavRequest({
    method: "DELETE",
    url: "/api/v1/webdav/delete-me.md",
    headers: { authorization: AUTH_HEADER },
    dataDir: intDataDir,
  });
  assert.equal(delRes.status, 204);

  const getRes = await webdavRequest({
    method: "GET",
    url: "/api/v1/webdav/delete-me.md",
    headers: { authorization: AUTH_HEADER },
    dataDir: intDataDir,
  });
  assert.equal(getRes.status, 404);
});

test("MKCOL creates a directory", async () => {
  const mkcolRes = await webdavRequest({
    method: "MKCOL",
    url: "/api/v1/webdav/newdir",
    headers: { authorization: AUTH_HEADER },
    dataDir: intDataDir,
  });
  assert.equal(mkcolRes.status, 201);

  const stat = fs.statSync(path.join(intVaultDir, "newdir"));
  assert.ok(stat.isDirectory());
});

test("MOVE renames a file", async () => {
  // Create source
  await webdavRequest({
    method: "PUT",
    url: "/api/v1/webdav/move-src.md",
    headers: { authorization: AUTH_HEADER },
    body: Buffer.from("move me", "utf8"),
    dataDir: intDataDir,
  });

  const moveRes = await webdavRequest({
    method: "MOVE",
    url: "/api/v1/webdav/move-src.md",
    headers: {
      authorization: AUTH_HEADER,
      destination: "http://localhost/api/v1/webdav/move-dst.md",
    },
    dataDir: intDataDir,
  });
  assert.ok([201, 204].includes(moveRes.status), `MOVE expected 201/204, got ${moveRes.status}`);

  assert.ok(!fs.existsSync(path.join(intVaultDir, "move-src.md")), "Source should not exist");
  assert.ok(fs.existsSync(path.join(intVaultDir, "move-dst.md")), "Dest should exist");
});

test("PROPFIND on vault root returns 207 with entries", async () => {
  // Ensure at least one file exists
  fs.writeFileSync(path.join(intVaultDir, "propfind-test.md"), "content");

  const propfindRes = await webdavRequest({
    method: "PROPFIND",
    url: "/api/v1/webdav/",
    headers: { authorization: AUTH_HEADER, depth: "1" },
    dataDir: intDataDir,
  });
  assert.equal(propfindRes.status, 207);
  assert.match(propfindRes.body, /D:multistatus/);
  assert.match(propfindRes.body, /propfind-test\.md/);
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Auth failure paths
// ─────────────────────────────────────────────────────────────────────────────

test("GET without auth returns 401 with WWW-Authenticate", async () => {
  const res = await webdavRequest({
    method: "GET",
    url: "/api/v1/webdav/hello.md",
    headers: {},
    dataDir: intDataDir,
  });
  assert.equal(res.status, 401);
  const wwwAuth = res.headers["WWW-Authenticate"] || res.headers["www-authenticate"];
  assert.ok(typeof wwwAuth === "string" && wwwAuth.includes("Basic"), "WWW-Authenticate missing");
});

test("GET with wrong password returns 401", async () => {
  const res = await webdavRequest({
    method: "GET",
    url: "/api/v1/webdav/hello.md",
    headers: { authorization: basicAuth(TEST_USER, "wrong-pass") },
    dataDir: intDataDir,
  });
  assert.equal(res.status, 401);
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Disabled / no-creds → not served
// ─────────────────────────────────────────────────────────────────────────────

test("disabled WebDAV returns 503", async () => {
  const disabledDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-disabled-"));
  const disabledVaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-disabled-vault-"));

  try {
    await createTestDb(disabledDataDir, {
      enabled: false,
      username: TEST_USER,
      password: TEST_PASS,
      vaultPath: disabledVaultDir,
    });

    const res = await webdavRequest({
      method: "GET",
      url: "/api/v1/webdav/file.md",
      headers: { authorization: AUTH_HEADER },
      dataDir: disabledDataDir,
    });
    assert.equal(res.status, 503);
  } finally {
    fs.rmSync(disabledDataDir, { recursive: true, force: true });
    fs.rmSync(disabledVaultDir, { recursive: true, force: true });
  }
});

test("no DB / missing config returns 503", async () => {
  const emptyDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-empty-"));

  try {
    // No DB file at all
    const res = await webdavRequest({
      method: "GET",
      url: "/api/v1/webdav/file.md",
      headers: { authorization: AUTH_HEADER },
      dataDir: emptyDataDir,
    });
    assert.equal(res.status, 503);
  } finally {
    fs.rmSync(emptyDataDir, { recursive: true, force: true });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Non-WebDAV paths are not handled (returns false)
// ─────────────────────────────────────────────────────────────────────────────

test("non-webdav path returns false (not handled)", async () => {
  const origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = intDataDir;

  try {
    const handler = await importHandler();
    const req = fakeReq("GET", "/api/v1/chat/completions", {});

    let capturedResult: boolean | undefined;
    const fakeRes = {
      headersSent: false,
      writeHead() {},
      end() {},
      write() {},
    } as unknown as http.ServerResponse;

    capturedResult = await handler.maybeHandleWebdav(req, fakeRes);
    assert.equal(capturedResult, false);
  } finally {
    if (origDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = origDataDir;
    }
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Encrypted password round-trip in integration
// ─────────────────────────────────────────────────────────────────────────────

test("encrypted password in DB is decrypted and auth works", async () => {
  const encSecret = "integration-enc-key-value-32chars!";
  process.env.STORAGE_ENCRYPTION_KEY = encSecret;

  const encDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-enc-"));
  const encVaultDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-webdav-enc-vault-"));

  try {
    const encryptedPass = encryptTs(encSecret, TEST_PASS);

    await createTestDb(encDataDir, {
      enabled: true,
      username: TEST_USER,
      password: encryptedPass,
      vaultPath: encVaultDir,
    });

    const res = await webdavRequest({
      method: "OPTIONS",
      url: "/api/v1/webdav/",
      headers: { authorization: AUTH_HEADER },
      dataDir: encDataDir,
    });
    // OPTIONS with correct creds should succeed (200 or 207)
    assert.ok(res.status < 400, `Expected success with encrypted password, got ${res.status}`);
  } finally {
    fs.rmSync(encDataDir, { recursive: true, force: true });
    fs.rmSync(encVaultDir, { recursive: true, force: true });
    // Restore encryption key state
    if (ORIG_KEY === undefined) {
      delete process.env.STORAGE_ENCRYPTION_KEY;
    } else {
      process.env.STORAGE_ENCRYPTION_KEY = ORIG_KEY;
    }
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DATA_DIR resolution parity: the .mjs handler MUST resolve the same SQLite file
// the app does, or WebDAV silently reads the wrong DB and 503s. Pin parity against
// the real resolveDataDir() in src/lib/dataPaths.ts across env combinations.
// ─────────────────────────────────────────────────────────────────────────────
test("resolveDataDir: parity with src/lib/dataPaths.ts across env combos", async () => {
  const { resolveDataDir: mjsResolve } = await importHandler();
  const { resolveDataDir: tsResolve } = await import("../../src/lib/dataPaths.ts");

  const ORIG_DATA = process.env.DATA_DIR;
  const ORIG_XDG = process.env.XDG_CONFIG_HOME;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ddir-"));
  try {
    const combos: Array<Record<string, string | undefined>> = [
      { DATA_DIR: tmp, XDG_CONFIG_HOME: undefined },
      { DATA_DIR: `  ${tmp}  `, XDG_CONFIG_HOME: undefined }, // trims + resolves
      { DATA_DIR: undefined, XDG_CONFIG_HOME: path.join(tmp, "xdg") },
      { DATA_DIR: undefined, XDG_CONFIG_HOME: undefined }, // bare default
    ];
    for (const combo of combos) {
      if (combo.DATA_DIR === undefined) delete process.env.DATA_DIR;
      else process.env.DATA_DIR = combo.DATA_DIR;
      if (combo.XDG_CONFIG_HOME === undefined) delete process.env.XDG_CONFIG_HOME;
      else process.env.XDG_CONFIG_HOME = combo.XDG_CONFIG_HOME;

      const fromMjs = mjsResolve();
      const fromTs = tsResolve();
      assert.equal(
        fromMjs,
        fromTs,
        `DATA_DIR resolver diverged for ${JSON.stringify(combo)}: mjs=${fromMjs} ts=${fromTs}`
      );
    }
  } finally {
    if (ORIG_DATA === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIG_DATA;
    if (ORIG_XDG === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = ORIG_XDG;
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
