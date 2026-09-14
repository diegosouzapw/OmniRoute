import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PreparedStatement, SqliteAdapter } from "./types";
import type { PostgresConfig } from "../postgresConfig";
import { redactPostgresUrl } from "../postgresConfig";
import { ensureBootstrapped } from "./postgres/postgresBootstrap";
import { PostgresSession } from "./postgres/postgresSession";
import { PostgresSyncChannel } from "./postgres/postgresSyncChannel";
import { locateWorker } from "./postgres/postgresWorkerPath";
import { SchemaCatalog } from "./postgres/schemaCatalog";
import { StatementExecutor } from "./postgres/statementExecutor";

export interface PostgresAdapterOptions {
  resetSchema?: boolean;
}

function resolveWorkerPath(): string {
  const roots: string[] = [];
  try {
    roots.push(path.dirname(fileURLToPath(import.meta.url)));
  } catch {}
  return locateWorker(roots);
}

function openChannel(
  config: PostgresConfig,
  resetSchema: boolean,
  displayName: string
): PostgresSyncChannel {
  const channel = new PostgresSyncChannel(config, resetSchema, resolveWorkerPath());
  try {
    channel.connect(config.connectTimeoutMs + 15_000);
  } catch (error) {
    channel.terminate();
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`[DB] Cannot connect to PostgreSQL at ${displayName}: ${message}`);
  }
  return channel;
}

export function createPostgresAdapter(
  config: PostgresConfig,
  options: PostgresAdapterOptions = {}
): SqliteAdapter {
  const displayName =
    redactPostgresUrl(config.url) + (config.schema ? ` (schema ${config.schema})` : "");
  const channel = openChannel(config, options.resetSchema === true, displayName);
  const session = new PostgresSession(channel, config.statementTimeoutMs);
  ensureBootstrapped(session);
  const catalog = new SchemaCatalog((sql, params) => session.rawQuery(sql, params, false));
  const executor = new StatementExecutor(session, catalog);
  let isOpen = true;

  return {
    driver: "postgres",

    get open() {
      return isOpen && channel.isAlive;
    },

    get name() {
      return displayName;
    },

    get inTransaction() {
      return session.inTransaction;
    },

    prepare(sql: string): PreparedStatement {
      return executor.prepare(sql);
    },

    exec(sql: string): void {
      executor.exec(sql);
    },

    pragma(pragmaStr: string, options?: { simple?: boolean }): unknown {
      return executor.pragma(pragmaStr, options?.simple === true);
    },

    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T {
      return (...args: unknown[]) => session.runInTransaction(() => fn(...args), false);
    },

    immediate(fn: () => void): void {
      session.runInTransaction(fn, true);
    },

    async backup(): Promise<void> {
      throw new Error(
        "[DB] File backups are not available on the PostgreSQL backend; use pg_dump against the database instead"
      );
    },

    checkpoint(): void {},

    close(): void {
      if (!isOpen) return;
      isOpen = false;
      channel.close();
    },

    get raw() {
      return null;
    },
  };
}
