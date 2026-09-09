import type { SqliteAdapter } from "./adapters/types";
import { getDbInstance } from "./core";
import { redactPostgresUrl, resolvePostgresConfig } from "./postgresConfig";

export interface PostgresStatus {
  connection: string;
  database: string | null;
  schema: string | null;
  serverVersion: string | null;
  sizeBytes: number;
  tableCount: number;
  replicas: number;
}

function readValue<T>(db: SqliteAdapter, sql: string, column: string): T | null {
  try {
    const row = db.prepare(sql).get() as Record<string, T> | undefined;
    return row?.[column] ?? null;
  } catch {
    return null;
  }
}

function readNumber(db: SqliteAdapter, sql: string, column: string): number {
  return Number(readValue<number>(db, sql, column) ?? 0);
}

export function getPostgresStatus(db: SqliteAdapter = getDbInstance()): PostgresStatus | null {
  if (db.driver !== "postgres") return null;
  const config = resolvePostgresConfig(process.env);
  return {
    connection: config ? redactPostgresUrl(config.url) : db.name,
    database: readValue<string>(db, "SELECT current_database() AS database", "database"),
    schema: readValue<string>(db, "SELECT current_schema() AS schema", "schema"),
    serverVersion: readValue<string>(
      db,
      "SELECT current_setting('server_version') AS server_version",
      "server_version"
    ),
    sizeBytes: readNumber(
      db,
      "SELECT pg_database_size(current_database()) AS size_bytes",
      "size_bytes"
    ),
    tableCount: readNumber(
      db,
      "SELECT COUNT(*) AS tables FROM information_schema.tables WHERE table_schema = current_schema() AND table_type = 'BASE TABLE'",
      "tables"
    ),
    replicas: readNumber(
      db,
      "SELECT COUNT(DISTINCT application_name) AS replicas FROM pg_stat_activity WHERE application_name LIKE 'omniroute-%'",
      "replicas"
    ),
  };
}
