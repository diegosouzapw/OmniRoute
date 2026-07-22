import fs from "node:fs";
import { resolveDataDir, resolveStoragePath } from "./data-dir.mjs";
import { ensureProviderSchema } from "./provider-store.mjs";
import { ensureSettingsSchema, hashManagementPassword, updateSettings } from "./settings-store.mjs";

async function loadSqlite() {
  if (process.versions.bun) {
    return (await import("bun:sqlite")).Database;
  }
  try {
    return (await import("better-sqlite3")).default;
  } catch {
    throw new Error("better-sqlite3 is not installed. Run npm install before using setup.");
  }
}

function openBunSqlite(Database, dbPath, options) {
  const raw = new Database(dbPath, options);
  const prepare = (sql) => {
    const statement = raw.query(sql);
    return {
      run: (...params) => statement.run(...normalizeBunSqliteParams(params)),
      get: (...params) => statement.get(...normalizeBunSqliteParams(params)),
      all: (...params) => statement.all(...normalizeBunSqliteParams(params)),
    };
  };
  return {
    prepare,
    query: (sql) => raw.query(sql),
    exec: (sql) => raw.exec(sql),
    transaction: (fn) => raw.transaction(fn),
    close: () => raw.close(),
    serialize: () => raw.serialize(),
    pragma: (pragmaStr, pragmaOptions) => {
      const statement = raw.query(`PRAGMA ${pragmaStr}`);
      if (pragmaOptions?.simple) {
        const row = statement.get();
        return row ? (Object.values(row)[0] ?? null) : null;
      }
      return statement.all();
    },
  };
}

export function normalizeBunSqliteParams(params) {
  if (
    params.length !== 1 ||
    params[0] === null ||
    typeof params[0] !== "object" ||
    Array.isArray(params[0]) ||
    params[0] instanceof Uint8Array ||
    (typeof Buffer !== "undefined" && Buffer.isBuffer(params[0]))
  ) {
    return params;
  }
  const expanded = {};
  for (const [key, value] of Object.entries(params[0])) {
    if (/^[:@$]/.test(key)) expanded[key] = value;
    else {
      expanded[`@${key}`] = value;
      expanded[`:${key}`] = value;
      expanded[`$${key}`] = value;
    }
  }
  return [expanded];
}

export function createSqliteNativeError(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("NODE_MODULE_VERSION") || message.includes("ERR_DLOPEN_FAILED")) {
    return new Error(
      "better-sqlite3 native binding is incompatible with this Node.js runtime. " +
        "Run `npm rebuild better-sqlite3` in the OmniRoute project and try again. " +
        "Or run: omniroute runtime repair  " +
        "(rebuilds into a user-writable runtime; works without a C++ toolchain)."
    );
  }
  if (
    message.includes("Could not locate the bindings file") ||
    message.includes("MODULE_NOT_FOUND") ||
    message.includes("Cannot find module 'better-sqlite3'")
  ) {
    return new Error(
      "better-sqlite3 native binding could not be found (no prebuilt addon for this platform). " +
        "This is common under `npx`, which runs a fresh, ephemeral install that never built the addon. " +
        "Run: omniroute runtime repair  " +
        "(rebuilds into a user-writable runtime; works without a C++ toolchain)."
    );
  }
  return error;
}

async function openSqliteDatabase(dbPath, options = {}) {
  const Database = await loadSqlite();
  if (process.versions.bun) {
    if (options.fileMustExist && !fs.existsSync(dbPath)) {
      throw new Error(`SQLite file does not exist: ${dbPath}`);
    }
    options = options.readonly
      ? { readonly: true }
      : { readwrite: true, create: options.fileMustExist !== true };
  }
  try {
    return process.versions.bun
      ? openBunSqlite(Database, dbPath, options)
      : new Database(dbPath, options);
  } catch (error) {
    throw createSqliteNativeError(error);
  }
}

export async function openOmniRouteDb() {
  const dataDir = resolveDataDir();
  const dbPath = resolveStoragePath(dataDir);
  fs.mkdirSync(dataDir, { recursive: true });

  const db = await openSqliteDatabase(dbPath);

  db.pragma("journal_mode = WAL");
  ensureSettingsSchema(db);
  ensureProviderSchema(db);

  return { db, dataDir, dbPath };
}

export async function withReadonlySqlite(dbPath, callback) {
  const db = await openSqliteDatabase(dbPath, { readonly: true, fileMustExist: true });
  try {
    return await callback(db);
  } finally {
    db.close();
  }
}

export async function backupSqliteFile(sourcePath, destPath) {
  const db = await openSqliteDatabase(sourcePath, { readonly: true });
  try {
    if (typeof db.backup === "function") {
      await db.backup(destPath);
    } else if (sourcePath === ":memory:" && typeof db.serialize === "function") {
      fs.writeFileSync(destPath, Buffer.from(db.serialize()));
    } else {
      try {
        db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
      } catch {}
      fs.copyFileSync(sourcePath, destPath);
    }
  } finally {
    db.close();
  }
}

export async function readDatabaseHealth(dbPath) {
  return withReadonlySqlite(dbPath, (db) => {
    const quickCheck = db.prepare("PRAGMA quick_check").get();
    const quickCheckValue = Object.values(quickCheck || {})[0];
    const hasMigrationTable = !!db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("_omniroute_migrations");
    const appliedMigrationVersions = hasMigrationTable
      ? db
          .prepare("SELECT version FROM _omniroute_migrations")
          .all()
          .map((row) => row.version)
      : [];

    return { quickCheckValue, hasMigrationTable, appliedMigrationVersions };
  });
}

export async function readEncryptedCredentialSamples(dbPath) {
  return withReadonlySqlite(dbPath, (db) => {
    const hasProviderTable = !!db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("provider_connections");
    if (!hasProviderTable) {
      return { hasProviderTable: false, encryptedValues: [] };
    }

    const rows = db
      .prepare(
        `SELECT api_key, access_token, refresh_token, id_token
         FROM provider_connections
         WHERE api_key LIKE 'enc:v1:%'
            OR access_token LIKE 'enc:v1:%'
            OR refresh_token LIKE 'enc:v1:%'
            OR id_token LIKE 'enc:v1:%'
         LIMIT 20`
      )
      .all();

    const encryptedValues = rows.flatMap((row) =>
      ["api_key", "access_token", "refresh_token", "id_token"]
        .filter((key) => typeof row[key] === "string" && row[key].startsWith("enc:v1:"))
        .map((key) => row[key])
    );

    return { hasProviderTable: true, encryptedValues };
  });
}

export async function readManagementPasswordState(dbPath = resolveStoragePath(resolveDataDir())) {
  if (!fs.existsSync(dbPath)) {
    return { exists: false, hasPassword: false };
  }

  return withReadonlySqlite(dbPath, (db) => {
    const hasSettingsTable = !!db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("key_value");
    if (!hasSettingsTable) {
      return { exists: true, hasPassword: false };
    }
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = ?")
      .get("password");
    let password = row?.value;
    if (typeof password === "string") {
      try {
        password = JSON.parse(password);
      } catch {}
    }
    return {
      exists: true,
      hasPassword: typeof password === "string" && password.length > 0,
    };
  });
}

export async function resetManagementPassword(
  password,
  dbPath = resolveStoragePath(resolveDataDir())
) {
  const db = await openSqliteDatabase(dbPath);
  try {
    db.pragma("journal_mode = WAL");
    ensureSettingsSchema(db);
    const hashedPassword = await hashManagementPassword(password);
    updateSettings(db, { password: hashedPassword, requireLogin: true, setupComplete: true });
  } finally {
    db.close();
  }
}
