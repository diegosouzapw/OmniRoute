import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";

const serial = { concurrency: false };
const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  NEXT_PHASE: process.env.NEXT_PHASE,
  HOME: process.env.HOME,
  XDG_CONFIG_HOME: process.env.XDG_CONFIG_HOME,
  APPDATA: process.env.APPDATA,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

function cleanupGlobalDb() {
  try {
    if (globalThis.__omnirouteDb?.open) {
      globalThis.__omnirouteDb.close();
    }
  } catch {}

  delete globalThis.__omnirouteDb;
}

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function removePath(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function withEnv(overrides, fn) {
  const snapshot = {};
  for (const key of Object.keys(overrides)) {
    snapshot[key] = process.env[key];
    const value = overrides[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of Object.entries(snapshot)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

function createLegacySchemaDb(sqliteFile, { withData = false } = {}) {
  const seedDb = new Database(sqliteFile);
  seedDb.exec(`
    CREATE TABLE schema_migrations (version TEXT);
    CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      auth_type TEXT,
      name TEXT,
      email TEXT,
      priority INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      access_token TEXT,
      refresh_token TEXT,
      expires_at TEXT,
      token_expires_at TEXT,
      scope TEXT,
      project_id TEXT,
      test_status TEXT,
      error_code TEXT,
      last_error TEXT,
      last_error_at TEXT,
      last_error_type TEXT,
      last_error_source TEXT,
      backoff_level INTEGER DEFAULT 0,
      rate_limited_until TEXT,
      health_check_interval INTEGER,
      last_health_check_at TEXT,
      last_tested TEXT,
      api_key TEXT,
      id_token TEXT,
      provider_specific_data TEXT,
      expires_in INTEGER,
      display_name TEXT,
      global_priority INTEGER,
      default_model TEXT,
      token_type TEXT,
      consecutive_use_count INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX idx_pc_provider ON provider_connections(provider);
    CREATE INDEX idx_pc_active ON provider_connections(is_active);
    CREATE INDEX idx_pc_priority ON provider_connections(provider, priority);
  `);

  if (withData) {
    const now = new Date().toISOString();
    seedDb
      .prepare(
        "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .run("legacy-openai", "openai", "apikey", "Legacy", 1, now, now);
  }

  seedDb.close();
}

function createLegacyCallLogsDb(sqliteFile) {
  const seedDb = new Database(sqliteFile);
  seedDb.exec(`
    CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      auth_type TEXT,
      name TEXT,
      email TEXT,
      priority INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      access_token TEXT,
      refresh_token TEXT,
      expires_at TEXT,
      token_expires_at TEXT,
      scope TEXT,
      project_id TEXT,
      test_status TEXT,
      error_code TEXT,
      last_error TEXT,
      last_error_at TEXT,
      last_error_type TEXT,
      last_error_source TEXT,
      backoff_level INTEGER DEFAULT 0,
      rate_limited_until TEXT,
      health_check_interval INTEGER,
      last_health_check_at TEXT,
      last_tested TEXT,
      api_key TEXT,
      id_token TEXT,
      provider_specific_data TEXT,
      expires_in INTEGER,
      display_name TEXT,
      global_priority INTEGER,
      default_model TEXT,
      token_type TEXT,
      consecutive_use_count INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX idx_pc_provider ON provider_connections(provider);
    CREATE INDEX idx_pc_active ON provider_connections(is_active);
    CREATE INDEX idx_pc_priority ON provider_connections(provider, priority);

    CREATE TABLE call_logs (
      id TEXT PRIMARY KEY,
      timestamp TEXT NOT NULL,
      method TEXT,
      path TEXT,
      status INTEGER,
      model TEXT,
      provider TEXT,
      account TEXT,
      connection_id TEXT,
      duration INTEGER DEFAULT 0,
      tokens_in INTEGER DEFAULT 0,
      tokens_out INTEGER DEFAULT 0,
      source_format TEXT,
      target_format TEXT,
      api_key_id TEXT,
      api_key_name TEXT,
      combo_name TEXT,
      request_body TEXT,
      response_body TEXT,
      error TEXT
    );
    CREATE INDEX idx_cl_timestamp ON call_logs(timestamp);
    CREATE INDEX idx_cl_status ON call_logs(status);
  `);
  seedDb.close();
}

test.beforeEach(() => {
  restoreEnv();
  cleanupGlobalDb();
});

test.afterEach(() => {
  cleanupGlobalDb();
  restoreEnv();
});

test.after(() => {
  cleanupGlobalDb();
  restoreEnv();
});

test("getDbInstance creates sqlite schema, metadata and applies migrations", serial, async () => {
  const dataDir = makeTempDir("omniroute-db-core-");

  try {
    await withEnv({ DATA_DIR: dataDir, NEXT_PHASE: undefined }, async () => {
      const core = await importFresh("src/lib/db/core.ts");
      const db = core.getDbInstance();

      assert.equal(fs.existsSync(core.SQLITE_FILE), true);
      assert.ok(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("provider_connections")
      );
      assert.deepEqual(db.prepare("SELECT value FROM db_meta WHERE key = 'schema_version'").get(), {
        value: "1",
      });

      const versions = db
        .prepare("SELECT version FROM _omniroute_migrations ORDER BY version")
        .all()
        .map((row) => row.version);

      assert.equal(versions[0], "001");
      assert.ok(versions.includes("017"));
      assert.ok(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("version_manager")
      );

      core.resetDbInstance();
    });
  } finally {
    removePath(dataDir);
  }
});

test("getDbInstance reuses the singleton and closeDbInstance resets it", serial, async () => {
  const dataDir = makeTempDir("omniroute-db-core-");

  try {
    await withEnv({ DATA_DIR: dataDir, NEXT_PHASE: undefined }, async () => {
      const core = await importFresh("src/lib/db/core.ts");
      const firstDb = core.getDbInstance();
      const secondDb = core.getDbInstance();

      assert.strictEqual(secondDb, firstDb);
      assert.equal(core.closeDbInstance(), true);
      assert.equal(firstDb.open, false);
      assert.equal(core.closeDbInstance(), false);

      const reopenedDb = core.getDbInstance();
      assert.notStrictEqual(reopenedDb, firstDb);

      core.resetDbInstance();
    });
  } finally {
    removePath(dataDir);
  }
});

test("local sqlite configuration enables WAL and sane pragmas", serial, async () => {
  const dataDir = makeTempDir("omniroute-db-core-");

  try {
    await withEnv({ DATA_DIR: dataDir, NEXT_PHASE: undefined }, async () => {
      const core = await importFresh("src/lib/db/core.ts");
      const db = core.getDbInstance();

      assert.equal(db.pragma("journal_mode", { simple: true }), "wal");
      assert.equal(db.pragma("busy_timeout", { simple: true }), 5000);
      assert.equal(db.pragma("synchronous", { simple: true }), 1);
      assert.equal(core.closeDbInstance({ checkpointMode: null }), true);
    });
  } finally {
    removePath(dataDir);
  }
});

test("module exports honor DATA_DIR from the environment", serial, async () => {
  const dataDir = makeTempDir("omniroute-db-core-env-");

  try {
    await withEnv({ DATA_DIR: dataDir }, async () => {
      const core = await importFresh("src/lib/db/core.ts");

      assert.equal(core.DATA_DIR, path.resolve(dataDir));
      assert.equal(core.SQLITE_FILE, path.join(path.resolve(dataDir), "storage.sqlite"));
      assert.equal(core.DB_BACKUPS_DIR, path.join(path.resolve(dataDir), "db_backups"));
    });
  } finally {
    removePath(dataDir);
  }
});

test(
  "module falls back to the default home data directory when DATA_DIR is absent",
  serial,
  async () => {
    const fakeHome = makeTempDir("omniroute-home-");

    try {
      await withEnv(
        {
          DATA_DIR: undefined,
          XDG_CONFIG_HOME: undefined,
          HOME: fakeHome,
          APPDATA: undefined,
        },
        async () => {
          const core = await importFresh("src/lib/db/core.ts");
          const expectedDir =
            process.platform === "win32"
              ? path.join(fakeHome, "AppData", "Roaming", "omniroute")
              : path.join(fakeHome, ".omniroute");

          assert.equal(core.DATA_DIR, expectedDir);
          assert.equal(core.SQLITE_FILE, path.join(expectedDir, "storage.sqlite"));
        }
      );
    } finally {
      removePath(fakeHome);
    }
  }
);

test("build phase uses an in-memory database without creating sqlite files", serial, async () => {
  const dataDir = makeTempDir("omniroute-db-build-");

  try {
    await withEnv(
      {
        DATA_DIR: dataDir,
        NEXT_PHASE: "phase-production-build",
      },
      async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
            .get("provider_connections")
        );
        assert.equal(fs.existsSync(path.join(dataDir, "storage.sqlite")), false);
        assert.equal(db.pragma("journal_mode", { simple: true }), "memory");

        core.resetDbInstance();
      }
    );
  } finally {
    removePath(dataDir);
  }
});

test("getDbInstance surfaces invalid DATA_DIR paths as sqlite open failures", serial, async () => {
  const sandboxDir = makeTempDir("omniroute-db-bad-path-");
  const fileAsDir = path.join(sandboxDir, "not-a-directory");
  fs.writeFileSync(fileAsDir, "blocked");

  try {
    await withEnv({ DATA_DIR: fileAsDir }, async () => {
      const core = await importFresh("src/lib/db/core.ts");

      assert.throws(
        () => core.getDbInstance(),
        /unable to open database file|ENOTDIR|not a directory/i
      );
      assert.equal(core.closeDbInstance(), false);
    });
  } finally {
    removePath(sandboxDir);
  }
});

test(
  "legacy empty schema databases are renamed before a fresh sqlite database is created",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-legacy-empty-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    createLegacySchemaDb(sqliteFile);

    try {
      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.equal(fs.existsSync(`${sqliteFile}.old-schema`), true);
        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
            .get("_omniroute_migrations")
        );
        assert.equal(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
            .get("schema_migrations"),
          undefined
        );

        core.resetDbInstance();
      });
    } finally {
      removePath(dataDir);
    }
  }
);

test(
  "legacy databases with data preserve rows while removing the old migration table",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-legacy-data-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    createLegacySchemaDb(sqliteFile, { withData: true });

    try {
      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.deepEqual(
          db
            .prepare("SELECT id, provider FROM provider_connections WHERE id = ?")
            .get("legacy-openai"),
          { id: "legacy-openai", provider: "openai" }
        );
        assert.equal(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
            .get("schema_migrations"),
          undefined
        );
        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('provider_connections') WHERE name = ?")
            .get("rate_limit_protection")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('provider_connections') WHERE name = ?")
            .get("last_used_at")
        );

        core.resetDbInstance();
      });
    } finally {
      removePath(dataDir);
    }
  }
);

test(
  "legacy call_logs schemas are upgraded before combo target indexes are created",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-legacy-call-logs-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    createLegacyCallLogsDb(sqliteFile);

    try {
      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('call_logs') WHERE name = ?")
            .get("requested_model")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('call_logs') WHERE name = ?")
            .get("request_type")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('call_logs') WHERE name = ?")
            .get("combo_step_id")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('call_logs') WHERE name = ?")
            .get("combo_execution_key")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
            .get("idx_call_logs_requested_model")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
            .get("idx_call_logs_request_type")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
            .get("idx_cl_combo_target")
        );

        core.resetDbInstance();
      });
    } finally {
      removePath(dataDir);
    }
  }
);
