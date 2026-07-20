import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";

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

test("migration 123 backfills account snapshots and creates its index", async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();
  const migrationSql = fs.readFileSync(
    "src/lib/db/migrations/127_usage_history_account_identity.sql",
    "utf8"
  );

  try {
    db.exec(`
      CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT,
        auth_type TEXT,
        name TEXT,
        email TEXT,
        display_name TEXT,
        provider_specific_data TEXT
      );
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider TEXT,
        connection_id TEXT,
        account_key TEXT,
        account_label TEXT,
        account_label_priority INTEGER DEFAULT 0
      );
      INSERT INTO provider_connections
        (id, provider, auth_type, email, provider_specific_data)
      VALUES
        ('empty-provider', '', 'oauth', 'member@example.com', '{"username":"member"}');
      INSERT INTO usage_history (provider, connection_id)
      VALUES ('codex', 'orphan-id'), ('', 'empty-provider');
    `);

    const count = withMockedMigrationFs(
      { "127_usage_history_account_identity.sql": migrationSql },
      () => runner.runMigrations(db)
    );
    const rows = db
      .prepare("SELECT account_key, account_label FROM usage_history ORDER BY id")
      .all();
    const index = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_uh_account_key'"
      )
      .get();

    assert.equal(count, 1);
    assert.deepEqual(rows, [
      {
        account_key: '["connection","codex","orphan-id"]',
        account_label: "orphan-id",
      },
      {
        account_key: '["oauth","unknown","email","member@example.com","username","member"]',
        account_label: "member@example.com",
      },
    ]);
    assert.deepEqual(index, { name: "idx_uh_account_key" });
  } finally {
    db.close();
  }
});

test("migration 123 preserves exact dedup identity and ignores non-string JSON scalars", async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();
  const sql = fs.readFileSync(
    "src/lib/db/migrations/127_usage_history_account_identity.sql",
    "utf8"
  );

  try {
    db.exec(`
      CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT,
        auth_type TEXT,
        name TEXT,
        email TEXT,
        display_name TEXT,
        provider_specific_data TEXT
      );
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider TEXT,
        connection_id TEXT,
        account_key TEXT,
        account_label TEXT,
        account_label_priority INTEGER DEFAULT 0
      );
      INSERT INTO provider_connections
        (id, provider, auth_type, email, provider_specific_data)
      VALUES
        ('generic', 'openai', 'oauth', ' Member@example.com ', '{"username":" Member "}'),
        ('workspace', 'codex', 'oauth', ' Member@example.com ', '{"workspaceId":" Workspace "}'),
        ('numeric-workspace', 'codex', 'oauth', 'member@example.com', '{"workspaceId":42}'),
        ('object-user', 'codex', 'oauth', 'member@example.com', '{"chatgptUserId":{"id":"user-a"}}'),
        ('array-username', 'openai', 'oauth', 'member@example.com', '{"username":["member"]}'),
        ('malformed-json', 'openai', 'oauth', 'member@example.com', '{bad json');
      INSERT INTO usage_history (provider, connection_id) VALUES
        ('openai', 'generic'),
        ('codex', 'workspace'),
        ('codex', 'numeric-workspace'),
        ('codex', 'object-user'),
        ('openai', 'array-username'),
        ('openai', 'malformed-json'),
        ('', '');
    `);

    const count = withMockedMigrationFs({ "127_usage_history_account_identity.sql": sql }, () =>
      runner.runMigrations(db)
    );
    const rows = db
      .prepare("SELECT connection_id, account_key FROM usage_history ORDER BY id")
      .all();

    assert.equal(count, 1);
    assert.deepEqual(rows, [
      {
        connection_id: "generic",
        account_key: '["oauth","openai","email"," Member@example.com ","username"," Member "]',
      },
      {
        connection_id: "workspace",
        account_key: '["oauth","codex","workspace"," Workspace ","email"," Member@example.com "]',
      },
      {
        connection_id: "numeric-workspace",
        account_key: '["connection","codex","numeric-workspace"]',
      },
      {
        connection_id: "object-user",
        account_key: '["connection","codex","object-user"]',
      },
      {
        connection_id: "array-username",
        account_key: '["oauth","openai","email","member@example.com"]',
      },
      {
        connection_id: "malformed-json",
        account_key: '["oauth","openai","email","member@example.com"]',
      },
      {
        connection_id: "",
        account_key: '["connection","unknown","unknown"]',
      },
    ]);
  } finally {
    db.close();
  }
});
