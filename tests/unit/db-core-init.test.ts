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
        process.env[key] = value as string;
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

function createRecoverableDb(sqliteFile) {
  const seedDb = new Database(sqliteFile);
  const now = new Date().toISOString();
  seedDb.exec(`
    CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      auth_type TEXT,
      name TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE provider_nodes (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      prefix TEXT,
      api_type TEXT,
      base_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );

    CREATE TABLE combos (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      data TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE api_keys (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      key TEXT NOT NULL UNIQUE,
      machine_id TEXT,
      allowed_models TEXT DEFAULT '[]',
      no_log INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
  `);

  seedDb
    .prepare(
      "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run("recover-openai", "openai", "apikey", "Recover Me", 1, now, now);
  seedDb
    .prepare(
      "INSERT INTO provider_nodes (id, type, name, prefix, api_type, base_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      "recover-node",
      "custom",
      "Recover Node",
      "recover",
      "openai",
      "https://example.com",
      now,
      now
    );
  seedDb
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("settings", "globalFallbackModel", JSON.stringify("openai/gpt-4o-mini"));
  seedDb
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("modelAliases", "fast-default", JSON.stringify("openai/gpt-4o-mini"));
  seedDb
    .prepare(
      "INSERT INTO combos (id, name, data, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(
      "recover-combo",
      "Recover Combo",
      JSON.stringify({
        id: "recover-combo",
        name: "Recover Combo",
        models: ["openai/gpt-4o-mini"],
      }),
      1,
      now,
      now
    );
  seedDb
    .prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, allowed_models, no_log, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      "recover-key",
      "Recover Key",
      "sk-recover-key",
      "machine-recover",
      JSON.stringify(["openai/gpt-4o-mini"]),
      1,
      now
    );
  seedDb.close();
}

function listProbeFailedBackups(sqliteFile) {
  const directory = path.dirname(sqliteFile);
  const prefix = `${path.basename(sqliteFile)}.probe-failed-`;
  return fs
    .readdirSync(directory)
    .filter((name) => name.startsWith(prefix))
    .map((name) => path.join(directory, name))
    .sort();
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
          USERPROFILE: fakeHome,
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
  "provider connection max_concurrent column is healed even if migration 029 was already recorded",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-missing-max-concurrent-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    const seedDb = new Database(sqliteFile);
    const now = new Date().toISOString();

    seedDb.exec(`
      CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        auth_type TEXT,
        name TEXT,
        priority INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
      INSERT INTO _omniroute_migrations (version, name) VALUES ('029', 'webhooks_templates');
    `);
    seedDb
      .prepare(
        "INSERT INTO provider_connections (id, provider, auth_type, name, priority, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .run("missing-max-openai", "openai", "apikey", "Missing max", 0, 1, now, now);
    seedDb.close();

    try {
      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.ok(
          db
            .prepare("SELECT name FROM pragma_table_info('provider_connections') WHERE name = ?")
            .get("max_concurrent")
        );
        assert.ok(
          db
            .prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = ?")
            .get("idx_pc_max_concurrent")
        );

        db.prepare(
          "INSERT INTO provider_connections (id, provider, auth_type, name, priority, is_active, max_concurrent, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        ).run("healed-openai", "openai", "apikey", "Healed", 0, 1, 2, now, now);

        assert.deepEqual(
          db
            .prepare(
              "SELECT max_concurrent AS maxConcurrent FROM provider_connections WHERE id = ?"
            )
            .get("healed-openai"),
          { maxConcurrent: 2 }
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

test(
  "legacy 022 call_logs_cache_source tracking is rehomed so 022_add_memory_fts5 still applies",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-calllogs-cache-source-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    const seedDb = new Database(sqliteFile);
    seedDb.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
      INSERT INTO _omniroute_migrations (version, name) VALUES ('022', 'call_logs_cache_source');

      CREATE TABLE call_logs (
        id TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        status INTEGER,
        combo_name TEXT,
        cache_source TEXT DEFAULT 'semantic'
      );

      CREATE TABLE memories (
        id TEXT PRIMARY KEY,
        api_key_id TEXT NOT NULL,
        session_id TEXT,
        type TEXT NOT NULL,
        key TEXT,
        content TEXT NOT NULL,
        metadata TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        expires_at TEXT
      );

      INSERT INTO memories (id, api_key_id, type, key, content, metadata)
      VALUES ('550e8400-e29b-41d4-a716-446655440000', 'key-1', 'factual', 'topic', 'memory content', '{}');
    `);
    seedDb.close();

    try {
      await withEnv({ DATA_DIR: dataDir, DISABLE_SQLITE_AUTO_BACKUP: "true" }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.ok(
          db.prepare("SELECT version FROM _omniroute_migrations WHERE version = ?").get("022")
        );
        assert.ok(
          db.prepare("SELECT version FROM _omniroute_migrations WHERE version = ?").get("023")
        );
        assert.ok(
          db.prepare("SELECT version FROM _omniroute_migrations WHERE version = ?").get("026")
        );
        assert.ok(
          db.prepare("SELECT version FROM _omniroute_migrations WHERE version = ?").get("027")
        );
        assert.equal(
          db
            .prepare("SELECT version FROM _omniroute_migrations WHERE version = ? AND name = ?")
            .get("022", "call_logs_cache_source"),
          undefined
        );
        assert.deepEqual(db.prepare("SELECT memory_id FROM memories").get(), { memory_id: 1 });
        assert.deepEqual(db.prepare("SELECT rowid, content FROM memory_fts").get(), {
          rowid: 1,
          content: "memory content",
        });

        core.resetDbInstance();
      });
    } finally {
      removePath(dataDir);
    }
  }
);

test(
  "probe failures restore preserved critical state instead of booting with an empty database",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-probe-recover-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    createRecoverableDb(sqliteFile);

    const originalPrepare = Database.prototype.prepare;

    try {
      Database.prototype.prepare = function patchedPrepare(sql, ...args) {
        if (String(sql).includes("schema_migrations")) {
          throw new Error("forced probe failure");
        }
        return originalPrepare.call(this, sql, ...args);
      };

      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");
        const db = core.getDbInstance();

        assert.deepEqual(
          db
            .prepare("SELECT id, provider, name FROM provider_connections WHERE id = ?")
            .get("recover-openai"),
          { id: "recover-openai", provider: "openai", name: "Recover Me" }
        );
        assert.deepEqual(
          db.prepare("SELECT id, name FROM provider_nodes WHERE id = ?").get("recover-node"),
          { id: "recover-node", name: "Recover Node" }
        );
        assert.deepEqual(
          db.prepare("SELECT id, name FROM combos WHERE id = ?").get("recover-combo"),
          { id: "recover-combo", name: "Recover Combo" }
        );
        assert.deepEqual(
          db.prepare("SELECT id, name, no_log FROM api_keys WHERE id = ?").get("recover-key"),
          { id: "recover-key", name: "Recover Key", no_log: 1 }
        );
        assert.deepEqual(
          db
            .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = ?")
            .get("globalFallbackModel"),
          { value: JSON.stringify("openai/gpt-4o-mini") }
        );
        assert.equal(listProbeFailedBackups(sqliteFile).length >= 1, true);

        core.resetDbInstance();
      });
    } finally {
      Database.prototype.prepare = originalPrepare;
      removePath(dataDir);
    }
  }
);

test(
  "probe failures without a safe snapshot abort startup and keep manual recovery explicit",
  serial,
  async () => {
    const dataDir = makeTempDir("omniroute-db-probe-abort-");
    const sqliteFile = path.join(dataDir, "storage.sqlite");
    fs.writeFileSync(sqliteFile, "not-a-valid-sqlite-database");

    try {
      await withEnv({ DATA_DIR: dataDir }, async () => {
        const core = await importFresh("src/lib/db/core.ts");

        assert.throws(() => core.getDbInstance(), /Manual recovery required after probe failure/i);
        assert.equal(fs.existsSync(sqliteFile), false);
        assert.equal(listProbeFailedBackups(sqliteFile).length >= 1, true);

        const restartedCore = await importFresh("src/lib/db/core.ts");
        assert.throws(
          () => restartedCore.getDbInstance(),
          /Manual recovery required before startup/i
        );
        assert.equal(fs.existsSync(sqliteFile), false);
        core.resetDbInstance();
      });
    } finally {
      removePath(dataDir);
    }
  }
);
