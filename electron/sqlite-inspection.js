const fs = require("fs");

function formatLoadError(error) {
  return error instanceof Error ? error.message : String(error);
}

function openBetterSqliteReadOnly(dbPath) {
  const Database = require("better-sqlite3");
  return new Database(dbPath, { readonly: true, fileMustExist: true });
}

function openNodeSqliteReadOnly(dbPath) {
  const { DatabaseSync } = require("node:sqlite");
  return new DatabaseSync(dbPath, { readOnly: true });
}

function openReadOnlySqliteDatabase(dbPath) {
  const errors = [];

  try {
    return openBetterSqliteReadOnly(dbPath);
  } catch (error) {
    errors.push(`better-sqlite3: ${formatLoadError(error)}`);
  }

  try {
    return openNodeSqliteReadOnly(dbPath);
  } catch (error) {
    errors.push(`node:sqlite: ${formatLoadError(error)}`);
  }

  throw new Error(errors.join("; "));
}

function hasEncryptedCredentials(dbPath, openDatabase = openReadOnlySqliteDatabase) {
  if (!fs.existsSync(dbPath)) return false;

  let db = null;
  try {
    db = openDatabase(dbPath);
    const row = db
      .prepare(
        `SELECT 1
           FROM provider_connections
          WHERE access_token LIKE 'enc:v1:%'
             OR refresh_token LIKE 'enc:v1:%'
             OR api_key LIKE 'enc:v1:%'
             OR id_token LIKE 'enc:v1:%'
          LIMIT 1`
      )
      .get();
    return !!row;
  } catch (error) {
    const message = formatLoadError(error);
    throw new Error(`Unable to inspect existing database at ${dbPath}: ${message}`);
  } finally {
    if (db) {
      db.close();
    }
  }
}

module.exports = {
  hasEncryptedCredentials,
  openNodeSqliteReadOnly,
  openReadOnlySqliteDatabase,
};
