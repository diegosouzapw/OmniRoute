import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";

const serial = { concurrency: false };

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function withMockedMigrationFs(files, fn) {
  const originalExistsSync = fs.existsSync;
  const originalReaddirSync = fs.readdirSync;
  const originalReadFileSync = fs.readFileSync;

  const isMigrationDir = (target) =>
    String(target).replaceAll("\\", "/").endsWith("/src/lib/db/migrations") ||
    String(target).replaceAll("\\", "/").endsWith("/migrations");

  fs.existsSync = (target) => {
    if (files === null && isMigrationDir(target)) return false;
    if (files && isMigrationDir(target)) return true;

    const fileName = path.basename(String(target));
    if (files && Object.hasOwn(files, fileName)) return true;

    return originalExistsSync(target);
  };

  fs.readdirSync = ((target: string, options?: any) => {
    if (files && isMigrationDir(target)) {
      return Object.keys(files);
    }

    return originalReaddirSync(target, options);
  }) as any;

  fs.readFileSync = (target, options) => {
    const fileName = path.basename(String(target));
    if (files && Object.hasOwn(files, fileName)) {
      return files[fileName];
    }

    return originalReadFileSync(target, options);
  };

  try {
    return fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

function createDb() {
  return new Database(":memory:");
}

function createInitialSchemaTables(db) {
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    CREATE TABLE combos (id TEXT PRIMARY KEY);
    CREATE TABLE call_logs (id TEXT PRIMARY KEY);
  `);
}

function buildMockMigrationFiles(startVersion, endVersion, prefix) {
  const files = {};

  for (let version = startVersion; version <= endVersion; version++) {
    const padded = String(version).padStart(3, "0");
    const fileName = version === 1 ? "001_initial_schema.sql" : `${padded}_${prefix}_${padded}.sql`;
    files[fileName] = `CREATE TABLE ${prefix}_${padded} (id INTEGER);`;
  }

  return files;
}

function withNonTestEnvironment(fn) {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalVitest = process.env.VITEST;
  const originalDisableAutoBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
  const originalArgv = [...process.argv];

  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.argv = process.argv.filter((arg) => !arg.includes("test"));

  try {
    return fn();
  } finally {
    process.argv = originalArgv;

    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;

    if (originalVitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = originalVitest;

    if (originalDisableAutoBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
    else process.env.DISABLE_SQLITE_AUTO_BACKUP = originalDisableAutoBackup;
  }
}

const REAL_022_ADD_MEMORY_FTS5_SQL = fs.readFileSync(
  path.resolve("src/lib/db/migrations/022_add_memory_fts5.sql"),
  "utf8"
);
const REAL_023_FIX_MEMORY_FTS_UUID_SQL = fs.readFileSync(
  path.resolve("src/lib/db/migrations/023_fix_memory_fts_uuid.sql"),
  "utf8"
);

test("migration infrastructure avoids cwd-based repo tracing fallbacks", () => {
  const runnerSource = fs.readFileSync(path.resolve("src/lib/db/migrationRunner.ts"), "utf8");
  const dataPathsSource = fs.readFileSync(path.resolve("src/lib/dataPaths.ts"), "utf8");

  // dataPaths must never use process.cwd() — it resolves via import.meta.url
  assert.doesNotMatch(dataPathsSource, /process\.cwd\(\)/);
  // migrationRunner uses import.meta.url as the primary strategy (process.cwd is
  // only a last-resort fallback for Windows/CI-built bundles with leaked paths)
  assert.match(runnerSource, /fileURLToPath\(import\.meta\.url\)/);
});

test("runMigrations applies pending files sequentially in version order", serial, async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();

  try {
    const appliedCount = withMockedMigrationFs(
      {
        "010_last.sql": "CREATE TABLE migration_last (id INTEGER);",
        "002_middle.sql": "CREATE TABLE migration_middle (id INTEGER);",
        "001_first.sql": "CREATE TABLE migration_first (id INTEGER);",
      },
      () => runner.runMigrations(db)
    );

    assert.equal(appliedCount, 3);
    assert.deepEqual(
      db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
      [{ version: "001" }, { version: "002" }, { version: "010" }]
    );
    assert.ok(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("migration_first")
    );
    assert.ok(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("migration_last")
    );
  } finally {
    db.close();
  }
});

test("runMigrations skips versions that are already tracked as applied", serial, async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();

  try {
    withMockedMigrationFs(
      {
        "001_first.sql": "CREATE TABLE skip_first (id INTEGER);",
        "002_second.sql": "CREATE TABLE skip_second (id INTEGER);",
      },
      () => runner.runMigrations(db)
    );

    const secondRun = withMockedMigrationFs(
      {
        "001_first.sql": "CREATE TABLE skip_first (id INTEGER);",
        "002_second.sql": "CREATE TABLE skip_second (id INTEGER);",
      },
      () => runner.runMigrations(db)
    );

    assert.equal(secondRun, 0);
    assert.equal(
      (
        db
          .prepare("SELECT COUNT(*) AS count FROM _omniroute_migrations WHERE version = ?")
          .get("001") as any
      ).count,
      1
    );
    assert.equal(
      (
        db
          .prepare("SELECT COUNT(*) AS count FROM _omniroute_migrations WHERE version = ?")
          .get("002") as any
      ).count,
      1
    );
  } finally {
    db.close();
  }
});

test(
  "runMigrations applies api key lifecycle migration idempotently when columns already exist",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE api_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL,
        revoked_at TEXT
      );
    `);

      const appliedCount = withMockedMigrationFs(
        {
          "032_apikey_lifecycle.sql": "ALTER TABLE api_keys ADD COLUMN revoked_at TEXT;",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(appliedCount, 1);
      const columns = db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>;
      const names = new Set(columns.map((column) => column.name));
      for (const expected of [
        "revoked_at",
        "expires_at",
        "last_used_at",
        "key_prefix",
        "ip_allowlist",
        "scopes",
      ]) {
        assert.equal(names.has(expected), true, `${expected} should exist`);
      }
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?").get("032"),
        { version: "032", name: "apikey_lifecycle" }
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations applies api key lifecycle hardening by version even if filename suffix changes",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE api_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL
      );
    `);

      const appliedCount = withMockedMigrationFs(
        {
          "032_renamed_lifecycle_patch.sql": "ALTER TABLE api_keys ADD COLUMN should_not_run TEXT;",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(appliedCount, 1);
      const columns = db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>;
      const names = new Set(columns.map((column) => column.name));
      assert.equal(names.has("revoked_at"), true);
      assert.equal(names.has("expires_at"), true);
      assert.equal(names.has("should_not_run"), false);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?").get("032"),
        { version: "032", name: "renamed_lifecycle_patch" }
      );
    } finally {
      db.close();
    }
  }
);

test("getMigrationStatus reports applied and pending migrations", serial, async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();

  try {
    db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
      "001",
      "first"
    );

    const status = withMockedMigrationFs(
      {
        "001_first.sql": "CREATE TABLE status_first (id INTEGER);",
        "002_second.sql": "CREATE TABLE status_second (id INTEGER);",
        "003_third.sql": "CREATE TABLE status_third (id INTEGER);",
      },
      () => runner.getMigrationStatus(db)
    );

    assert.deepEqual(
      status.applied.map((row) => row.version),
      ["001"]
    );
    assert.deepEqual(
      status.pending.map((row) => row.version),
      ["002", "003"]
    );
  } finally {
    db.close();
  }
});

test(
  "failed migrations roll back their transaction and do not record the version",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      assert.throws(
        () =>
          withMockedMigrationFs(
            {
              "001_ok.sql": "CREATE TABLE rollback_ok (id INTEGER);",
              "002_broken.sql":
                "CREATE TABLE rollback_broken (id INTEGER); INSERT INTO missing_table VALUES (1);",
            },
            () => runner.runMigrations(db)
          ),
        /missing_table/i
      );

      assert.ok(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("rollback_ok")
      );
      assert.equal(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("rollback_broken"),
        undefined
      );
      assert.equal(
        (
          db
            .prepare("SELECT COUNT(*) AS count FROM _omniroute_migrations WHERE version = ?")
            .get("002") as any
        ).count,
        0
      );
    } finally {
      db.close();
    }
  }
);

test("missing or empty migration directories are treated as a no-op", serial, async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const missingDb = createDb();
  const emptyDb = createDb();

  try {
    assert.equal(
      withMockedMigrationFs(null, () => runner.runMigrations(missingDb)),
      0
    );
    assert.equal(
      withMockedMigrationFs({}, () => runner.runMigrations(emptyDb)),
      0
    );
    assert.deepEqual(
      withMockedMigrationFs({}, () => runner.getMigrationStatus(emptyDb)),
      {
        applied: [],
        pending: [],
      }
    );
  } finally {
    missingDb.close();
    emptyDb.close();
  }
});

test("invalid file names are ignored while valid migrations still run", serial, async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();

  try {
    const count = withMockedMigrationFs(
      {
        "README.md": "# ignored",
        "not-a-migration.sql": "CREATE TABLE should_not_exist (id INTEGER);",
        "003_valid.sql": "CREATE TABLE valid_migration (id INTEGER);",
      },
      () => runner.runMigrations(db)
    );

    assert.equal(count, 1);
    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [{ version: "003", name: "valid" }]
    );
    assert.equal(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("should_not_exist"),
      undefined
    );
  } finally {
    db.close();
  }
});

test(
  "new migrations are detected on subsequent runs without replaying old ones",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      withMockedMigrationFs(
        {
          "001_first.sql": "CREATE TABLE rerun_first (id INTEGER);",
          "002_second.sql": "CREATE TABLE rerun_second (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      const count = withMockedMigrationFs(
        {
          "001_first.sql": "CREATE TABLE rerun_first (id INTEGER);",
          "002_second.sql": "CREATE TABLE rerun_second (id INTEGER);",
          "003_third.sql": "CREATE TABLE rerun_third (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 1);
      assert.deepEqual(
        db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "001" }, { version: "002" }, { version: "003" }]
      );
    } finally {
      db.close();
    }
  }
);

test(
  "unknown rows in the migration table do not block pending real migrations",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "999",
        "ghost"
      );

      const count = withMockedMigrationFs(
        {
          "001_first.sql": "CREATE TABLE recover_first (id INTEGER);",
          "002_second.sql": "CREATE TABLE recover_second (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 2);
      assert.deepEqual(
        db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "001" }, { version: "002" }, { version: "999" }]
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations rehomes legacy call_logs_summary_storage tracking so 022_add_memory_fts5 can still apply",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "022",
        "call_logs_summary_storage"
      );

      const count = withMockedMigrationFs(
        {
          "022_add_memory_fts5.sql": "CREATE TABLE memory_fts_shadow (id INTEGER);",
          "025_call_logs_summary_storage.sql": "CREATE TABLE call_log_summary_shadow (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 1);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "022", name: "add_memory_fts5" },
          { version: "025", name: "call_logs_summary_storage" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("memory_fts_shadow")
      );
      assert.equal(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("call_log_summary_shadow"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations drops stale 022 call_logs_summary_storage rows when 025 is already tracked",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "022",
        "call_logs_summary_storage"
      );
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "025",
        "call_logs_summary_storage"
      );

      const count = withMockedMigrationFs(
        {
          "022_add_memory_fts5.sql": "CREATE TABLE memory_fts_shadow_dupe (id INTEGER);",
          "025_call_logs_summary_storage.sql":
            "CREATE TABLE call_log_summary_shadow_dupe (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 1);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "022", name: "add_memory_fts5" },
          { version: "025", name: "call_logs_summary_storage" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("memory_fts_shadow_dupe")
      );
      assert.equal(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("call_log_summary_shadow_dupe"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations rehomes legacy reasoning cache tracking so api key lifecycle can apply",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE api_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL
      );
    `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "032",
        "create_reasoning_cache"
      );

      const count = withMockedMigrationFs(
        {
          "032_apikey_lifecycle.sql": "ALTER TABLE api_keys ADD COLUMN should_not_run TEXT;",
          "033_create_reasoning_cache.sql": "CREATE TABLE reasoning_cache_shadow (id INTEGER);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 1);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "032", name: "apikey_lifecycle" },
          { version: "033", name: "create_reasoning_cache" },
        ]
      );

      const columns = db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>;
      const names = new Set(columns.map((column) => column.name));
      assert.equal(names.has("revoked_at"), true);
      assert.equal(names.has("expires_at"), true);
      assert.equal(names.has("should_not_run"), false);
      assert.equal(
        db
          .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("reasoning_cache_shadow"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations rehomes legacy 028-033 version slots before applying current migrations",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL
      );

      CREATE TABLE api_keys (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL
      );
    `);

      const legacyRows = [
        ["028", "evals_tables"],
        ["029", "webhooks_templates"],
        ["030", "mcp_scopes_api_keys"],
        ["031", "api_keys_expires"],
        ["032", "detailed_logs_warnings"],
        ["033", "provider_connections_block_extra_usage"],
      ];
      for (const row of legacyRows) {
        db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
          row[0],
          row[1]
        );
      }

      const count = withMockedMigrationFs(
        {
          "028_create_files_and_batches.sql": `
            CREATE TABLE files (id TEXT PRIMARY KEY);
            CREATE TABLE batches (id TEXT PRIMARY KEY);
          `,
          "029_provider_connection_max_concurrent.sql":
            "ALTER TABLE provider_connections ADD COLUMN should_not_run INTEGER;",
          "030_create_eval_runs.sql": "CREATE TABLE eval_runs (id TEXT PRIMARY KEY);",
          "031_create_eval_suites.sql": `
            CREATE TABLE eval_suites (id TEXT PRIMARY KEY);
            CREATE TABLE eval_cases (id TEXT PRIMARY KEY);
          `,
          "032_apikey_lifecycle.sql": "ALTER TABLE api_keys ADD COLUMN should_not_run TEXT;",
          "033_create_reasoning_cache.sql": "CREATE TABLE reasoning_cache (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 6);
      const rows = db.prepare("SELECT version, name FROM _omniroute_migrations").all() as Array<{
        version: string;
        name: string;
      }>;
      const byVersion = new Map(rows.map((row) => [row.version, row.name]));

      assert.equal(byVersion.get("028"), "create_files_and_batches");
      assert.equal(byVersion.get("029"), "provider_connection_max_concurrent");
      assert.equal(byVersion.get("030"), "create_eval_runs");
      assert.equal(byVersion.get("031"), "create_eval_suites");
      assert.equal(byVersion.get("032"), "apikey_lifecycle");
      assert.equal(byVersion.get("033"), "create_reasoning_cache");
      for (const [version, name] of legacyRows) {
        assert.equal(byVersion.get(`legacy-${version}-${name}`), name);
      }

      for (const table of [
        "files",
        "batches",
        "eval_runs",
        "eval_suites",
        "eval_cases",
        "reasoning_cache",
      ]) {
        assert.ok(
          db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table),
          `${table} should exist`
        );
      }

      const providerColumns = db.prepare("PRAGMA table_info(provider_connections)").all() as Array<{
        name: string;
      }>;
      const providerColumnNames = new Set(providerColumns.map((column) => column.name));
      assert.equal(providerColumnNames.has("max_concurrent"), true);
      assert.equal(providerColumnNames.has("should_not_run"), false);

      const apiKeyColumns = db.prepare("PRAGMA table_info(api_keys)").all() as Array<{
        name: string;
      }>;
      const apiKeyColumnNames = new Set(apiKeyColumns.map((column) => column.name));
      for (const expected of [
        "revoked_at",
        "expires_at",
        "last_used_at",
        "key_prefix",
        "ip_allowlist",
        "scopes",
      ]) {
        assert.equal(apiKeyColumnNames.has(expected), true, `${expected} should exist`);
      }
      assert.equal(apiKeyColumnNames.has("should_not_run"), false);
    } finally {
      db.close();
    }
  }
);

test(
  "memory FTS migrations upgrade existing UUID memories without datatype mismatches",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
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
    `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "021",
        "combo_call_log_targets"
      );
      db.prepare(
        "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).run(
        "550e8400-e29b-41d4-a716-446655440000",
        "key-1",
        "session-1",
        "factual",
        "topic",
        "memory content",
        "{}"
      );

      const count = withMockedMigrationFs(
        {
          "022_add_memory_fts5.sql": REAL_022_ADD_MEMORY_FTS5_SQL,
          "023_fix_memory_fts_uuid.sql": REAL_023_FIX_MEMORY_FTS_UUID_SQL,
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 2);
      assert.deepEqual(
        db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "021" }, { version: "022" }, { version: "023" }]
      );
      assert.deepEqual(db.prepare("SELECT memory_id, content FROM memories").get(), {
        memory_id: 1,
        content: "memory content",
      });
      assert.deepEqual(db.prepare("SELECT rowid, content, key FROM memory_fts").get(), {
        rowid: 1,
        content: "memory content",
        key: "topic",
      });
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations allows a large pending set when the physical schema still looks like 001",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      createInitialSchemaTables(db);
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "001",
        "initial_schema"
      );

      const count = withNonTestEnvironment(() =>
        withMockedMigrationFs(buildMockMigrationFiles(1, 7, "legacy_allow"), () =>
          runner.runMigrations(db)
        )
      );

      assert.equal(count, 6);
      assert.deepEqual(
        db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "001" },
          { version: "002" },
          { version: "003" },
          { version: "004" },
          { version: "005" },
          { version: "006" },
          { version: "007" },
        ]
      );
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations aborts large pending sets when the physical schema proves a newer baseline",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      createInitialSchemaTables(db);
      db.exec(`
        CREATE TABLE request_detail_logs (id TEXT PRIMARY KEY);
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "001",
        "initial_schema"
      );

      assert.throws(
        () =>
          withNonTestEnvironment(() =>
            withMockedMigrationFs(buildMockMigrationFiles(1, 60, "legacy_abort"), () =>
              runner.runMigrations(db)
            )
          ),
        /Physical schema already shows 006/i
      );
    } finally {
      db.close();
    }
  }
);
