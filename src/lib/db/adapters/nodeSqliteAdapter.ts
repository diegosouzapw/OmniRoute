import type { SqliteAdapter } from "./types";
import {
  createNodeSqliteAdapterFromDatabase,
  type NodeSqliteDatabaseLike,
} from "./nodeSqliteShared";

const CHECKPOINT_INTERVAL_MS = 60_000;

export async function createNodeSqliteAdapter(filePath: string): Promise<SqliteAdapter> {
  // Suprimir ExperimentalWarning
  const origEmit = process.emit.bind(process);
  (process as NodeJS.Process).emit = function (name: string, ...args: unknown[]) {
    if (
      name === "warning" &&
      args[0] !== null &&
      typeof args[0] === "object" &&
      "name" in (args[0] as object) &&
      (args[0] as { name: string }).name === "ExperimentalWarning"
    ) {
      return false;
    }
    return origEmit(name as never, ...(args as never[]));
  } as typeof process.emit;

  const { DatabaseSync } = (await import("node:sqlite" as never)) as {
    DatabaseSync: new (path: string) => NodeSqliteDatabaseLike;
  };

  const db = new DatabaseSync(filePath);

  const checkpointTimer = setInterval(() => {
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    } catch {}
  }, CHECKPOINT_INTERVAL_MS);
  (checkpointTimer as unknown as NodeJS.Timeout).unref?.();

  function gracefulClose() {
    clearInterval(checkpointTimer as unknown as NodeJS.Timeout);
    try {
      db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
    } catch {}
  }

  const adapter = createNodeSqliteAdapterFromDatabase(db, filePath, gracefulClose);

  process.once("beforeExit", () => {
    adapter.close();
  });
  process.once("SIGINT", () => {
    adapter.close();
    process.exit(0);
  });
  process.once("SIGTERM", () => {
    adapter.close();
    process.exit(0);
  });

  return adapter;
}
