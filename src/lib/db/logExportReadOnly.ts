import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { resolveDataDir } from "../dataPaths";

/** No singleton, migrations, backups, directory creation or write-capable connection. */
export function openLogExportReadOnlyDb() {
  const db = new DatabaseSync(path.join(resolveDataDir(), "storage.sqlite"), { readOnly: true });
  try {
    db.exec("PRAGMA busy_timeout = 5000; PRAGMA query_only = ON;");
    return db;
  } catch (error) {
    db.close();
    throw error;
  }
}
