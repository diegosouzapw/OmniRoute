// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
/**
 * Unit tests for src/lib/db/omp.ts — OMP (Oh My Pi) credential CRUD.
 *
 * omp.ts opens the third-party OMP CLI's OWN local sqlite database
 * (~/.omp/agent/agent.db) directly, per request — NOT OmniRoute's own DB.
 * These tests cover both the happy path (round trip against a fixture DB
 * with the omp CLI's real `auth_credentials` schema) and the missing-DB-file
 * path (omp CLI never run yet), which each exported function must handle
 * gracefully without throwing.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type Database from "better-sqlite3";
import {
  BETTER_SQLITE3_SKIP_REASON,
  loadBetterSqlite3,
} from "../_helpers/betterSqlite3Availability.ts";

const { getOmpCredentials, saveOmpCredentials, deleteOmpCredentials } =
  await import("../../../src/lib/db/omp.ts");

// #15107: load the native driver lazily so a missing addon skips these tests with a
// documented reason instead of failing the whole file at import time.
const BetterSqlite3 = loadBetterSqlite3();
const skip = BetterSqlite3 ? false : BETTER_SQLITE3_SKIP_REASON;

function openNativeDb(file: string, options?: Database.Options): Database.Database {
  if (!BetterSqlite3) throw new Error(BETTER_SQLITE3_SKIP_REASON);
  return new BetterSqlite3(file, options);
}

const PROVIDER_ID = "omniroute";

let tmpHome: string;
let origHome: string | undefined;

function getOmpDbPath() {
  return path.join(tmpHome, ".omp", "agent", "agent.db");
}

/** Simulate the omp CLI having already created its sqlite DB + schema. */
function seedOmpDb() {
  const dbPath = getOmpDbPath();
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = openNativeDb(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS auth_credentials (
      provider TEXT NOT NULL,
      credential_type TEXT NOT NULL,
      data TEXT,
      disabled_cause TEXT,
      identity_key TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )
  `);
  db.close();
}

beforeEach(() => {
  tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omp-db-test-"));
  origHome = process.env.HOME;
  process.env.HOME = tmpHome;
});

afterEach(() => {
  process.env.HOME = origHome;
  fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("db/omp.ts — getOmpCredentials", { skip }, () => {
  it("returns hasOmniRoute:false without throwing when the omp DB file does not exist", () => {
    assert.ok(!fs.existsSync(getOmpDbPath()), "precondition: no DB file yet");
    const creds = getOmpCredentials(PROVIDER_ID);
    assert.deepEqual(creds, { hasOmniRoute: false, baseUrl: null, apiKey: null });
  });

  it("returns hasOmniRoute:false when the DB exists but has no matching row", () => {
    seedOmpDb();
    const creds = getOmpCredentials(PROVIDER_ID);
    assert.deepEqual(creds, { hasOmniRoute: false, baseUrl: null, apiKey: null });
  });

  it("returns hasOmniRoute:false gracefully when the schema itself is missing (corrupt/foreign DB)", () => {
    const dbPath = getOmpDbPath();
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    // Valid sqlite file, but no auth_credentials table at all.
    const db = openNativeDb(dbPath);
    db.exec("CREATE TABLE unrelated (id INTEGER)");
    db.close();

    const creds = getOmpCredentials(PROVIDER_ID);
    assert.deepEqual(creds, { hasOmniRoute: false, baseUrl: null, apiKey: null });
  });
});

describe("db/omp.ts — saveOmpCredentials + getOmpCredentials round trip", { skip }, () => {
  it("persists apiKey/baseUrl so a subsequent read sees them", () => {
    seedOmpDb();

    saveOmpCredentials(PROVIDER_ID, "sk-test-omp-key", "http://localhost:20128/v1");

    const creds = getOmpCredentials(PROVIDER_ID);
    assert.equal(creds.hasOmniRoute, true);
    assert.equal(creds.apiKey, "sk-test-omp-key");
    assert.equal(creds.baseUrl, "http://localhost:20128/v1");
  });

  it("overwrites an existing row for the same provider instead of duplicating it", () => {
    seedOmpDb();

    saveOmpCredentials(PROVIDER_ID, "sk-old-key", "http://localhost:20128/v1");
    saveOmpCredentials(PROVIDER_ID, "sk-new-key", "http://localhost:20129/v1");

    const dbPath = getOmpDbPath();
    const db = openNativeDb(dbPath, { readonly: true });
    const rows = db
      .prepare("SELECT data FROM auth_credentials WHERE provider = ?")
      .all(PROVIDER_ID) as { data: string }[];
    db.close();

    assert.equal(rows.length, 1, "must not accumulate duplicate rows for the same provider");
    const parsed = JSON.parse(rows[0].data);
    assert.equal(parsed.apiKey, "sk-new-key");
    assert.equal(parsed.baseUrl, "http://localhost:20129/v1");
  });
});

describe("db/omp.ts — deleteOmpCredentials", { skip }, () => {
  it("removes the row so a subsequent get reports hasOmniRoute:false", () => {
    seedOmpDb();
    saveOmpCredentials(PROVIDER_ID, "sk-test-omp-key", "http://localhost:20128/v1");
    assert.equal(getOmpCredentials(PROVIDER_ID).hasOmniRoute, true);

    deleteOmpCredentials(PROVIDER_ID);

    assert.deepEqual(getOmpCredentials(PROVIDER_ID), {
      hasOmniRoute: false,
      baseUrl: null,
      apiKey: null,
    });
  });

  it("does not throw when deleting a provider that was never saved", () => {
    seedOmpDb();
    assert.doesNotThrow(() => deleteOmpCredentials(PROVIDER_ID));
  });
});
