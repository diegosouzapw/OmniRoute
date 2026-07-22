import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";
import {
  resolveOrphanedUsageAccountIdentity,
  resolveUsageAccountIdentity,
} from "../../src/lib/usage/accountIdentity.ts";

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

  fs.readdirSync = ((
    target: fs.PathLike,
    options?: BufferEncoding | { encoding: BufferEncoding }
  ) => {
    if (files && isMigrationDir(target)) {
      return Object.keys(files);
    }

    return originalReaddirSync(target, options as never);
  }) as typeof fs.readdirSync;

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

test("migration 127 backfills account snapshots for historical rows", async () => {
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

    assert.equal(count, 1);
    assert.deepEqual(rows, [
      {
        account_key: resolveOrphanedUsageAccountIdentity("codex", "orphan-id").accountKey,
        account_label: "orphan-id",
      },
      {
        account_key: resolveUsageAccountIdentity({
          id: "empty-provider",
          provider: "",
          authType: "oauth",
          email: "member@example.com",
          providerSpecificData: { username: "member" },
        }).accountKey,
        account_label: "member@example.com",
      },
    ]);
  } finally {
    db.close();
  }
});

test("migration 128 promotes only user-proven snapshots after a fresh 127 backfill", async () => {
  const runner = await importFresh("src/lib/db/migrationRunner.ts");
  const db = createDb();
  const migration127 = fs.readFileSync(
    "src/lib/db/migrations/127_usage_history_account_identity.sql",
    "utf8"
  );
  const migration128 = fs.readFileSync(
    "src/lib/db/migrations/129_usage_history_codex_strong_identity.sql",
    "utf8"
  );

  const strong = (connection) =>
    resolveUsageAccountIdentity({
      id: connection.id,
      provider: "codex",
      authType: "oauth",
      email: connection.email,
      providerSpecificData: connection.providerSpecificData,
    }).accountKey;
  const weakUserEmail = (userId, email) =>
    JSON.stringify(["oauth", "codex", "user", userId, "email", email]);
  const weakWorkspaceEmail = (workspaceId, email) =>
    JSON.stringify(["oauth", "codex", "workspace", workspaceId, "email", email]);

  const connections = {
    promoted: {
      id: "promoted",
      email: "new@example.com",
      providerSpecificData: { workspaceId: "workspace-a", chatgptUserId: "user-a" },
    },
    userOnly: {
      id: "user-only",
      email: "new-solo@example.com",
      providerSpecificData: { chatgptUserId: "user-solo" },
    },
    ambiguousWorkspace: {
      id: "ambiguous-workspace",
      email: "member@example.com",
      providerSpecificData: { workspaceId: "workspace-b", chatgptUserId: "user-b" },
    },
    alreadyStrong: {
      id: "already-strong",
      email: "member@example.com",
      providerSpecificData: { workspaceId: "workspace-c", chatgptUserId: "user-c" },
    },
    historicalUserMismatch: {
      id: "historical-user-mismatch",
      email: "member@example.com",
      providerSpecificData: { chatgptUserId: "current-user" },
    },
    nonOauth: {
      id: "non-oauth",
      email: "member@example.com",
      providerSpecificData: { chatgptUserId: "user-d" },
    },
    malformedKey: {
      id: "malformed-key",
      email: "member@example.com",
      providerSpecificData: { chatgptUserId: "user-e" },
    },
    malformedConnection: {
      id: "malformed-connection",
      email: "member@example.com",
      providerSpecificData: null,
    },
  };

  const weakKeys = {
    // The current workspace cannot prove the historical workspace for this
    // shipped user+email snapshot, so migration 128 must leave it unchanged.
    promoted: weakUserEmail("user-a", "old@example.com"),
    // Email changes do not matter when the current OAuth connection has no
    // workspace and the embedded historical user ID matches.
    userOnly: weakUserEmail("user-solo", "old-solo@example.com"),
    ambiguousWorkspace: weakWorkspaceEmail("workspace-b", "member@example.com"),
    deleted: weakUserEmail("user-deleted", "deleted@example.com"),
    nonCodex: JSON.stringify(["oauth", "openai", "email", "member@example.com"]),
    nonOauth: weakUserEmail("user-d", "member@example.com"),
    malformedKey: "not valid JSON",
    malformedConnection: weakUserEmail("user-f", "member@example.com"),
    // Shipped historical input: the embedded user differs from the connection's
    // current ChatGPT user, so migration 128 must not rewrite this snapshot.
    historicalUserMismatch:
      '["oauth","codex","user","historical-user","email","member@example.com"]',
  };

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
        ('promoted', 'codex', 'oauth', 'new@example.com',
          '{"workspaceId":"workspace-a","chatgptUserId":"user-a"}'),
        ('user-only', 'codex', 'oauth', 'solo@example.com',
          '{"chatgptUserId":"user-solo"}'),
        ('ambiguous-workspace', 'codex', 'oauth', 'member@example.com',
          '{"workspaceId":"workspace-b","chatgptUserId":"user-b"}'),
        ('already-strong', 'codex', 'oauth', 'member@example.com',
          '{"workspaceId":"workspace-c","chatgptUserId":"user-c"}'),
        ('historical-user-mismatch', 'codex', 'oauth', 'member@example.com',
          '{"chatgptUserId":"current-user"}'),
        ('non-codex', 'openai', 'oauth', 'member@example.com',
          '{"username":"member"}'),
        ('non-oauth', 'codex', 'access_token', 'member@example.com',
          '{"chatgptUserId":"user-d"}'),
        ('malformed-key', 'codex', 'oauth', 'member@example.com',
          '{"chatgptUserId":"user-e"}'),
        ('malformed-connection', 'codex', 'oauth', 'member@example.com',
          '{bad json');

      -- Historical usage written before account snapshots existed. The
      -- literal weak keys model what the shipped migration 127 backfilled.
      INSERT INTO usage_history (provider, connection_id, account_key, account_label) VALUES
        ('codex', 'promoted', '${weakKeys.promoted}', 'Old email label'),
        ('codex', 'user-only', '${weakKeys.userOnly}', 'Solo label'),
        ('codex', 'ambiguous-workspace', '${weakKeys.ambiguousWorkspace}', 'Workspace label'),
        ('codex', 'deleted-connection', '${weakKeys.deleted}', 'Exported orphan'),
        ('openai', 'non-codex', '${weakKeys.nonCodex}', 'Generic label'),
        ('codex', 'non-oauth', '${weakKeys.nonOauth}', 'Token label'),
        ('codex', 'malformed-key', '${weakKeys.malformedKey}', 'Malformed key label'),
        ('codex', 'malformed-connection', '${weakKeys.malformedConnection}', 'Malformed connection label'),
        ('codex', 'already-strong', '${strong(connections.alreadyStrong)}', 'Strong label'),
        ('codex', 'historical-user-mismatch', '${weakKeys.historicalUserMismatch}', 'Historical mismatch label');
    `);

    // Fresh installs run the original shipped 127 first, then 128. The 127
    // backfill only touches rows without a snapshot, so the historical keys
    // above survive unchanged into 128.
    const applied = withMockedMigrationFs(
      {
        "127_usage_history_account_identity.sql": migration127,
        "129_usage_history_codex_strong_identity.sql": migration128,
      },
      () => runner.runMigrations(db)
    );
    assert.equal(applied, 2);

    const rows = db
      .prepare("SELECT connection_id, account_key, account_label FROM usage_history ORDER BY id")
      .all();

    assert.deepEqual(rows, [
      // The embedded historical user ID matches, but the current workspace
      // does not prove the historical workspace. Keep the snapshot and label.
      {
        connection_id: "promoted",
        account_key: weakKeys.promoted,
        account_label: "Old email label",
      },
      // With no current workspace, the matching embedded user ID is sufficient
      // even though the connection email changed since the snapshot.
      {
        connection_id: "user-only",
        account_key: strong(connections.userOnly),
        account_label: "Solo label",
      },
      // Same workspace and email, but no embedded user ID: the snapshot could
      // belong to any workspace member, so it must stay weak.
      {
        connection_id: "ambiguous-workspace",
        account_key: weakKeys.ambiguousWorkspace,
        account_label: "Workspace label",
      },
      // The connection is gone; nothing can prove who generated the usage.
      {
        connection_id: "deleted-connection",
        account_key: weakKeys.deleted,
        account_label: "Exported orphan",
      },
      {
        connection_id: "non-codex",
        account_key: weakKeys.nonCodex,
        account_label: "Generic label",
      },
      {
        connection_id: "non-oauth",
        account_key: weakKeys.nonOauth,
        account_label: "Token label",
      },
      {
        connection_id: "malformed-key",
        account_key: weakKeys.malformedKey,
        account_label: "Malformed key label",
      },
      {
        connection_id: "malformed-connection",
        account_key: weakKeys.malformedConnection,
        account_label: "Malformed connection label",
      },
      {
        connection_id: "already-strong",
        account_key: strong(connections.alreadyStrong),
        account_label: "Strong label",
      },
      // A historical embedded user that differs from the currently connected
      // user cannot be safely promoted; both historical key and label remain.
      {
        connection_id: "historical-user-mismatch",
        account_key: weakKeys.historicalUserMismatch,
        account_label: "Historical mismatch label",
      },
    ]);

    // Rerunning 128 on an up-to-date database must not rewrite anything.
    const rerun = withMockedMigrationFs(
      { "129_usage_history_codex_strong_identity.sql": migration128 },
      () => runner.runMigrations(db)
    );
    assert.equal(rerun, 0);
    assert.deepEqual(
      db.prepare("SELECT account_key FROM usage_history ORDER BY id").all(),
      rows.map(({ account_key }) => ({ account_key }))
    );
  } finally {
    db.close();
  }
});

test("migration 127 preserves exact dedup identity and ignores non-string JSON scalars", async () => {
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
        account_key: resolveUsageAccountIdentity({
          id: "generic",
          provider: "openai",
          authType: "oauth",
          email: " Member@example.com ",
          providerSpecificData: { username: " Member " },
        }).accountKey,
      },
      {
        connection_id: "workspace",
        account_key: resolveUsageAccountIdentity({
          id: "workspace",
          provider: "codex",
          authType: "oauth",
          email: " Member@example.com ",
          providerSpecificData: { workspaceId: " Workspace " },
        }).accountKey,
      },
      {
        connection_id: "numeric-workspace",
        account_key: resolveOrphanedUsageAccountIdentity("codex", "numeric-workspace").accountKey,
      },
      {
        connection_id: "object-user",
        account_key: resolveOrphanedUsageAccountIdentity("codex", "object-user").accountKey,
      },
      {
        connection_id: "array-username",
        account_key: resolveUsageAccountIdentity({
          id: "array-username",
          provider: "openai",
          authType: "oauth",
          email: "member@example.com",
          providerSpecificData: { username: ["member"] },
        }).accountKey,
      },
      {
        connection_id: "malformed-json",
        account_key: resolveUsageAccountIdentity({
          id: "malformed-json",
          provider: "openai",
          authType: "oauth",
          email: "member@example.com",
          providerSpecificData: "{bad json",
        }).accountKey,
      },
      {
        connection_id: "",
        account_key: resolveOrphanedUsageAccountIdentity("", "").accountKey,
      },
    ]);
  } finally {
    db.close();
  }
});
