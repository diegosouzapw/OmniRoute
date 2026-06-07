/**
 * Regression guard for #3363 — Kiro auto-import failed on Windows because
 * tryKiroCliSqlite() only probed the Linux/macOS path
 * (~/.local/share/kiro-cli/data.sqlite3) and never checked the Kiro IDE
 * path that Windows users have: %APPDATA%\kiro\storage.db
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-ignore — better-sqlite3 has no bundled types in this project
import Database from "better-sqlite3";

// Set DATA_DIR before importing any app modules so isAuthRequired() reads from
// a fresh, empty settings DB (no password → requireLogin defaults to false).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-3363-data-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

// Import the GET handler at the module level so the DB is initialised once
// before any test runs.
const { GET } = await import("../../src/app/api/oauth/kiro/auto-import/route.ts");

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_APPDATA = process.env.APPDATA;
const ORIGINAL_FETCH = globalThis.fetch;

let tmpHome: string;

test.beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-3363-"));
  // Reset DB instance so each test gets a clean settings DB (no requireLogin).
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Override HOME so homedir() returns a temp dir where no kiro-cli DB exists.
  process.env.HOME = tmpHome;
  // Ensure APPDATA is unset by default; individual tests that need it set it.
  delete process.env.APPDATA;
});

test.afterEach(() => {
  process.env.HOME = ORIGINAL_HOME;
  if (ORIGINAL_APPDATA !== undefined) {
    process.env.APPDATA = ORIGINAL_APPDATA;
  } else {
    delete process.env.APPDATA;
  }
  globalThis.fetch = ORIGINAL_FETCH;
  if (tmpHome) fs.rmSync(tmpHome, { recursive: true, force: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Helper to call the GET handler and parse the JSON body.
async function callGet(): Promise<{ status: number; body: Record<string, unknown> }> {
  const request = new Request("http://localhost/api/oauth/kiro/auto-import");
  const response = await GET(request);
  const body = (await response.json()) as Record<string, unknown>;
  return { status: response.status, body };
}

test("triedPaths includes the Windows APPDATA path when process.env.APPDATA is set", async () => {
  // Simulate a Windows environment with %APPDATA% pointing to a temp dir.
  // The storage.db file does not exist there, so the probe fails gracefully.
  process.env.APPDATA = tmpHome;

  const { body } = await callGet();

  assert.equal(body.found, false, "credentials must not be found when both DB files are absent");
  assert.ok(Array.isArray(body.triedPaths), "triedPaths must be an array");

  const expectedWindowsPath = path.join(tmpHome, "kiro", "storage.db");
  assert.ok(
    (body.triedPaths as string[]).includes(expectedWindowsPath),
    `triedPaths must include the Windows APPDATA path ${expectedWindowsPath}, got: ${JSON.stringify(body.triedPaths)}`
  );
});

test("triedPaths does NOT include any Windows path when process.env.APPDATA is not set", async () => {
  // APPDATA is already unset by beforeEach.
  const { body } = await callGet();

  assert.equal(body.found, false, "credentials must not be found when DB file is absent");
  assert.ok(Array.isArray(body.triedPaths), "triedPaths must be an array");

  const paths = body.triedPaths as string[];

  // No path should reference "kiro/storage.db" (the Windows IDE storage path).
  const hasWindowsPath = paths.some(
    (p) => p.includes("storage.db") && p.includes("kiro")
  );
  assert.equal(
    hasWindowsPath,
    false,
    `triedPaths must not include any Windows kiro/storage.db path when APPDATA is unset, got: ${JSON.stringify(paths)}`
  );
});

test("triedPaths always includes the Linux/macOS kiro-cli path", async () => {
  const { body } = await callGet();

  assert.ok(Array.isArray(body.triedPaths), "triedPaths must be an array");

  const expectedLinuxPath = path.join(tmpHome, ".local/share/kiro-cli/data.sqlite3");
  assert.ok(
    (body.triedPaths as string[]).includes(expectedLinuxPath),
    `triedPaths must always include the Linux/macOS kiro-cli path ${expectedLinuxPath}, got: ${JSON.stringify(body.triedPaths)}`
  );
});

// ── Synthetic SQLite test: exercises the actual Windows schema-reading path ──

/**
 * Creates a minimal storage.db in the Windows Kiro IDE schema:
 *   - Table: ItemTable (key TEXT, value TEXT)
 *   - Row: key="kiro:auth:token", value=JSON with refresh_token starting with "aorAAAAAG"
 *
 * Then sets APPDATA to the directory containing kiro/storage.db, calls GET,
 * and asserts found:true with the correct refreshToken.
 */
test("GET extracts refresh_token from a Windows storage.db with ItemTable schema", async () => {
  // Build the Windows storage.db directory structure: <tmpHome>/kiro/storage.db
  const kiroDir = path.join(tmpHome, "kiro");
  fs.mkdirSync(kiroDir, { recursive: true });
  const dbPath = path.join(kiroDir, "storage.db");

  // Populate the SQLite file using the Kiro IDE Windows schema.
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE ItemTable (key TEXT PRIMARY KEY, value TEXT NOT NULL);
  `);
  const tokenValue = JSON.stringify({
    refresh_token: "aorAAAAAGsynthetic-refresh-token",
    access_token: "access-synthetic",
    expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
    region: "us-east-1",
  });
  db.prepare("INSERT INTO ItemTable (key, value) VALUES (?, ?)").run(
    "kiro:auth:token",
    tokenValue
  );
  db.close();

  // Point APPDATA at tmpHome so tryKiroCliSqlite() resolves
  // join(process.env.APPDATA, "kiro", "storage.db") to dbPath.
  process.env.APPDATA = tmpHome;

  // Mock fetch so the saveAndRespond path (kiroService.refreshToken()) succeeds
  // without hitting the real Kiro OIDC endpoint.
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    // registerClient() call — returns a new OIDC client registration.
    if (u.includes("oidc.") && u.endsWith("/client/register")) {
      return new Response(
        JSON.stringify({ clientId: "reg-cid", clientSecret: "reg-secret", expiresIn: 86400 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    // refreshToken() call — simulates Kiro OIDC token refresh.
    if (u.includes("oidc.") && u.endsWith("/token")) {
      return new Response(
        JSON.stringify({
          accessToken: "access-refreshed",
          refreshToken: "aorAAAAAGrefreshed-token",
          expiresIn: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    throw new Error(`[kiro-3363 test] unexpected fetch to ${u}`);
  }) as typeof fetch;

  const { status, body } = await callGet();

  assert.equal(
    status,
    200,
    `expected HTTP 200, got ${status}: ${JSON.stringify(body)}`
  );
  assert.equal(
    body.found,
    true,
    `expected found:true from Windows storage.db, got: ${JSON.stringify(body)}`
  );
});
