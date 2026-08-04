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

function createSqlJsLikeDb() {
  const db = createDb();

  return {
    driver: "sql.js",
    get open() {
      return true;
    },
    get name() {
      return ":memory:";
    },
    prepare(sql) {
      return db.prepare(sql);
    },
    exec(sql) {
      if (/fts5/i.test(sql)) {
        throw new Error("no such module: fts5");
      }
      db.exec(sql);
    },
    pragma(pragmaStr, options) {
      return db.pragma(pragmaStr, options);
    },
    transaction(fn) {
      const tx = db.transaction((...args) => fn(...args));
      return (...args) => tx(...args);
    },
    immediate(fn) {
      fn();
    },
    async backup() {},
    checkpoint() {},
    close() {
      db.close();
    },
    get raw() {
      return db;
    },
  };
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
  const originalExecArgv = [...process.execArgv];

  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.argv = process.argv.filter((arg) => !arg.includes("test"));
  // #7359 made isAutomatedTestProcess() also scan process.execArgv (so `node --test`
  // is caught even when NODE_ENV/VITEST/argv are clean). This harness runs under
  // `node --test`, so execArgv always carries `--test` — strip it here too, or the
  // "non-test" simulation is a no-op and the mass-migration safety checks under
  // test never actually exercise their real-environment code path.
  process.execArgv = process.execArgv.filter((arg) => !arg.includes("test"));

  try {
    return fn();
  } finally {
    process.argv = originalArgv;
    process.execArgv = originalExecArgv;

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
  "runMigrations defers optional FTS migrations when the current driver lacks fts5 support",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createSqlJsLikeDb();

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

      const count = withMockedMigrationFs(
        {
          "022_add_memory_fts5.sql": REAL_022_ADD_MEMORY_FTS5_SQL,
          "023_fix_memory_fts_uuid.sql": REAL_023_FIX_MEMORY_FTS_UUID_SQL,
          "024_after_fts.sql": "CREATE TABLE after_fts (id INTEGER PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 1);
      assert.deepEqual(
        db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "021" }, { version: "024" }]
      );
      assert.equal(
        db
          .prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("memory_fts").count,
        0
      );
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

test(
  "reconcileRenumberedMigrations resolves compression_settings 028→034 upgrade path",
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
      // Simulate a DB where compression_settings was applied at version 028
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "028",
        "compression_settings"
      );

      // Disk has compression_settings at 034 (current location) and create_files_and_batches at 028
      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        withMockedMigrationFs(
          {
            "028_create_files_and_batches.sql":
              "CREATE TABLE IF NOT EXISTS files (id TEXT PRIMARY KEY);",
            "034_compression_settings.sql":
              "CREATE TABLE IF NOT EXISTS compression_settings_table (id TEXT PRIMARY KEY);",
          },
          () => runner.runMigrations(db)
        );

        // The reconcile should have moved 028/compression_settings → 034/compression_settings
        const row028 = db
          .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
          .get("028") as { version: string; name: string } | undefined;
        const row034 = db
          .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
          .get("034") as { version: string; name: string } | undefined;

        // After reconciliation, 028 should be free (or have create_files_and_batches)
        // and 034 should have compression_settings
        assert.equal(row034?.name, "compression_settings");

        // No CRITICAL renumbering warning for version 028
        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations resolves compression_analytics 032→038 upgrade path",
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
      // Simulate DB where compression_analytics was applied at version 032
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "032",
        "compression_analytics"
      );

      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        db.exec(`
          CREATE TABLE api_keys (
            id TEXT PRIMARY KEY,
            key TEXT NOT NULL
          );
        `);
        withMockedMigrationFs(
          {
            "032_apikey_lifecycle.sql": "ALTER TABLE api_keys ADD COLUMN revoked_at TEXT;",
            "038_compression_analytics.sql":
              "CREATE TABLE IF NOT EXISTS compression_analytics (id TEXT PRIMARY KEY);",
          },
          () => runner.runMigrations(db)
        );

        const row038 = db
          .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
          .get("038") as { version: string; name: string } | undefined;

        assert.equal(row038?.name, "compression_analytics");

        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations resolves compression_cache_stats 033→039 upgrade path",
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
      // Simulate DB where compression_cache_stats was applied at version 033
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "033",
        "compression_cache_stats"
      );

      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        withMockedMigrationFs(
          {
            "033_create_reasoning_cache.sql":
              "CREATE TABLE IF NOT EXISTS reasoning_cache (id TEXT PRIMARY KEY);",
            "039_compression_cache_stats.sql":
              "CREATE TABLE IF NOT EXISTS compression_cache_stats_table (id TEXT PRIMARY KEY);",
          },
          () => runner.runMigrations(db)
        );

        const row039 = db
          .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
          .get("039") as { version: string; name: string } | undefined;

        assert.equal(row039?.name, "compression_cache_stats");

        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "runMigrations ignores superseded 041 session affinity duplicate when 050 exists",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();

    try {
      const count = withMockedMigrationFs(
        {
          "038_compression_analytics.sql": `
            CREATE TABLE compression_analytics (
              id TEXT PRIMARY KEY,
              request_id TEXT
            );
          `,
          "041_compression_receipts.sql": "-- handled by migrationRunner",
          "041_session_account_affinity.sql": `
            CREATE TABLE duplicate_041_session_account_affinity (id TEXT PRIMARY KEY);
          `,
          "050_session_account_affinity.sql": `
            CREATE TABLE IF NOT EXISTS session_account_affinity (
              session_key TEXT NOT NULL,
              provider TEXT NOT NULL,
              connection_id TEXT NOT NULL,
              created_at INTEGER NOT NULL,
              last_seen_at INTEGER NOT NULL,
              PRIMARY KEY (session_key, provider)
            );
          `,
        },
        () => runner.runMigrations(db)
      );

      assert.equal(count, 3);
      assert.equal(
        db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("041")?.name,
        "compression_receipts"
      );
      assert.equal(
        db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("050")?.name,
        "session_account_affinity"
      );
      assert.deepEqual(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (?, ?) ORDER BY name"
          )
          .all("duplicate_041_session_account_affinity", "session_account_affinity"),
        [{ name: "session_account_affinity" }]
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations moves legacy 041 session affinity marker to 050",
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
        CREATE TABLE compression_analytics (
          id TEXT PRIMARY KEY,
          request_id TEXT
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "041",
        "session_account_affinity"
      );

      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        const count = withMockedMigrationFs(
          {
            "041_compression_receipts.sql": "-- handled by migrationRunner",
            "041_session_account_affinity.sql": `
              CREATE TABLE duplicate_041_session_account_affinity (id TEXT PRIMARY KEY);
            `,
            "050_session_account_affinity.sql": `
              CREATE TABLE IF NOT EXISTS session_account_affinity (
                session_key TEXT NOT NULL,
                provider TEXT NOT NULL,
                connection_id TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                last_seen_at INTEGER NOT NULL,
                PRIMARY KEY (session_key, provider)
              );
            `,
          },
          () => runner.runMigrations(db)
        );

        assert.equal(count, 1);
        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("041")?.name,
          "compression_receipts"
        );
        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("050")?.name,
          "session_account_affinity"
        );

        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations moves legacy 056 manifest routing marker to 059",
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
        "056",
        "manifest_routing"
      );

      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        withMockedMigrationFs(
          {
            "056_mcp_accessibility_compression.sql":
              "CREATE TABLE IF NOT EXISTS mcp_accessibility_compression (id TEXT PRIMARY KEY);",
            "059_manifest_routing.sql":
              "CREATE TABLE IF NOT EXISTS manifest_routing (id TEXT PRIMARY KEY);",
          },
          () => runner.runMigrations(db)
        );

        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("056")?.name,
          "mcp_accessibility_compression"
        );
        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("059")?.name,
          "manifest_routing"
        );

        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations moves legacy 051 usage history service tier marker to 054",
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
        "051",
        "usage_history_service_tier"
      );
      db.exec(`
        CREATE TABLE usage_history (
          id TEXT PRIMARY KEY,
          api_key_id TEXT,
          timestamp TEXT
        );
      `);

      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        withMockedMigrationFs(
          {
            "051_hot_path_db_indexes.sql":
              "CREATE INDEX IF NOT EXISTS idx_usage_history_api_key_id_timestamp ON usage_history(api_key_id, timestamp);",
            "054_usage_history_service_tier.sql":
              "ALTER TABLE usage_history ADD COLUMN service_tier TEXT;",
          },
          () => runner.runMigrations(db)
        );

        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("051")?.name,
          "hot_path_db_indexes"
        );
        assert.equal(
          db.prepare("SELECT name FROM _omniroute_migrations WHERE version = ?").get("054")?.name,
          "usage_history_service_tier"
        );

        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

test(
  "full upgrade simulation: renumbered migrations are reconciled without CRITICAL warnings",
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
      // Simulate a user's DB that has all 3 old migration entries
      const oldMigrations = [
        ["027", "skill_mode_and_metadata"],
        ["028", "compression_settings"],
        ["029", "provider_connection_max_concurrent"],
        ["032", "compression_analytics"],
        ["033", "compression_cache_stats"],
        ["051", "usage_history_service_tier"],
        ["056", "manifest_routing"],
      ] as const;
      for (const [v, n] of oldMigrations) {
        db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(v, n);
      }

      // Disk has the current migration file layout
      const consoleErrors: string[] = [];
      const originalError = console.error;
      console.error = (...args: any[]) => {
        consoleErrors.push(args.map(String).join(" "));
      };

      try {
        db.exec(`
          CREATE TABLE api_keys (
            id TEXT PRIMARY KEY,
            key TEXT NOT NULL
          );
          CREATE TABLE usage_history (
            id TEXT PRIMARY KEY,
            api_key_id TEXT,
            timestamp TEXT
          );
        `);
        withMockedMigrationFs(
          {
            "027_skill_mode_and_metadata.sql":
              "CREATE TABLE IF NOT EXISTS skill_meta (id TEXT PRIMARY KEY);",
            "028_create_files_and_batches.sql":
              "CREATE TABLE IF NOT EXISTS files (id TEXT PRIMARY KEY);",
            "029_provider_connection_max_concurrent.sql":
              "ALTER TABLE provider_connections ADD COLUMN max_concurrent INTEGER;",
            "032_apikey_lifecycle.sql": "ALTER TABLE api_keys ADD COLUMN revoked_at TEXT;",
            "033_create_reasoning_cache.sql":
              "CREATE TABLE IF NOT EXISTS reasoning_cache (id TEXT PRIMARY KEY);",
            "034_compression_settings.sql":
              "CREATE TABLE IF NOT EXISTS compression_settings_table (id TEXT PRIMARY KEY);",
            "038_compression_analytics.sql":
              "CREATE TABLE IF NOT EXISTS compression_analytics (id TEXT PRIMARY KEY);",
            "039_compression_cache_stats.sql":
              "CREATE TABLE IF NOT EXISTS compression_cache_stats_table (id TEXT PRIMARY KEY);",
            "051_hot_path_db_indexes.sql":
              "CREATE INDEX IF NOT EXISTS idx_usage_history_api_key_id_timestamp ON usage_history(api_key_id, timestamp);",
            "054_usage_history_service_tier.sql":
              "ALTER TABLE usage_history ADD COLUMN service_tier TEXT;",
            "056_mcp_accessibility_compression.sql":
              "CREATE TABLE IF NOT EXISTS mcp_accessibility_compression (id TEXT PRIMARY KEY);",
            "059_manifest_routing.sql":
              "CREATE TABLE IF NOT EXISTS manifest_routing (id TEXT PRIMARY KEY);",
          },
          () => runner.runMigrations(db)
        );

        // No CRITICAL renumbering warnings
        const renumberingWarnings = consoleErrors.filter(
          (e) => e.includes("CRITICAL") && e.includes("renumbered")
        );
        assert.equal(
          renumberingWarnings.length,
          0,
          `Expected no renumbering warnings, got: ${renumberingWarnings.join("; ")}`
        );

        // Verify the reconciled entries
        const row034 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("034") as { name: string } | undefined;
        const row038 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("038") as { name: string } | undefined;
        const row039 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("039") as { name: string } | undefined;
        const row051 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("051") as { name: string } | undefined;
        const row054 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("054") as { name: string } | undefined;
        const row056 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("056") as { name: string } | undefined;
        const row059 = db
          .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
          .get("059") as { name: string } | undefined;

        assert.equal(row034?.name, "compression_settings");
        assert.equal(row038?.name, "compression_analytics");
        assert.equal(row039?.name, "compression_cache_stats");
        assert.equal(row051?.name, "hot_path_db_indexes");
        assert.equal(row054?.name, "usage_history_service_tier");
        assert.equal(row056?.name, "mcp_accessibility_compression");
        assert.equal(row059?.name, "manifest_routing");
      } finally {
        console.error = originalError;
      }
    } finally {
      db.close();
    }
  }
);

// ── #3416: OMNIROUTE_MAX_PENDING_MIGRATIONS env override ─────────────────────
// The mass-migration safety threshold must be overridable at runtime so a user
// restoring a backup can raise (or lower) the limit without code changes. The
// resolver reads the env var at CALL TIME inside runMigrations(), so these tests
// set/delete the env around the call and assert the abort message reflects the
// resolved threshold.

// Build an "existing DB" with only the migrations table + one applied row and no
// physical-schema sentinel tables, so inferPhysicalSchemaBaseline() returns null
// and the abort decision depends purely on the resolved threshold.
function seedExistingDbWithoutPhysicalBaseline(db) {
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
}

test(
  "runMigrations aborts when OMNIROUTE_MAX_PENDING_MIGRATIONS lowers the threshold (#3416)",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();
    const original = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;

    try {
      seedExistingDbWithoutPhysicalBaseline(db);
      process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "5";

      // 1 applied (001) + files 001..011 → 10 actionable pending > threshold 5.
      assert.throws(
        () =>
          withNonTestEnvironment(() =>
            withMockedMigrationFs(buildMockMigrationFiles(1, 11, "lower_threshold"), () =>
              runner.runMigrations(db)
            )
          ),
        /threshold is 5/i
      );
    } finally {
      if (original === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = original;
      db.close();
    }
  }
);

test(
  "runMigrations allows a large pending set when OMNIROUTE_MAX_PENDING_MIGRATIONS raises the threshold (#3416)",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();
    const original = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;

    try {
      seedExistingDbWithoutPhysicalBaseline(db);
      process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "500";

      // 1 applied (001) + 60 plain pending files at versions 100..159 (chosen to
      // avoid the special-cased migration versions 032/041/042). All 60 exceed the
      // default 50 threshold but stay well under the raised 500 limit, so they apply.
      const pendingFiles = {};
      for (let v = 100; v < 160; v++) {
        pendingFiles[`${v}_raise_threshold_${v}.sql`] =
          `CREATE TABLE raise_threshold_${v} (id INTEGER);`;
      }

      const count = withNonTestEnvironment(() =>
        withMockedMigrationFs(pendingFiles, () => runner.runMigrations(db))
      );

      assert.equal(count, 60);
    } finally {
      if (original === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = original;
      db.close();
    }
  }
);

test(
  "runMigrations keeps the default 50 threshold when OMNIROUTE_MAX_PENDING_MIGRATIONS is unset or invalid (#3416)",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const original = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;

    try {
      // Case 1: env unset → default 50 abort message.
      delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      const dbUnset = createDb();
      try {
        seedExistingDbWithoutPhysicalBaseline(dbUnset);
        assert.throws(
          () =>
            withNonTestEnvironment(() =>
              withMockedMigrationFs(buildMockMigrationFiles(1, 60, "default_unset"), () =>
                runner.runMigrations(dbUnset)
              )
            ),
          /threshold is 50/i
        );
      } finally {
        dbUnset.close();
      }

      // Case 2: invalid (non-numeric) → fall back to default 50.
      process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "abc";
      const dbInvalid = createDb();
      try {
        seedExistingDbWithoutPhysicalBaseline(dbInvalid);
        assert.throws(
          () =>
            withNonTestEnvironment(() =>
              withMockedMigrationFs(buildMockMigrationFiles(1, 60, "default_invalid"), () =>
                runner.runMigrations(dbInvalid)
              )
            ),
          /threshold is 50/i
        );
      } finally {
        dbInvalid.close();
      }
    } finally {
      if (original === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = original;
    }
  }
);
