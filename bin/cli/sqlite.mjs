import fs from "node:fs";
import { resolveDataDir, resolveStoragePath } from "./data-dir.mjs";
import { ensureProviderSchema } from "./provider-store.mjs";
import { ensureSettingsSchema } from "./settings-store.mjs";

export async function openOmniRouteDb() {
  const dataDir = resolveDataDir();
  const dbPath = resolveStoragePath(dataDir);
  fs.mkdirSync(dataDir, { recursive: true });

  let Database;
  try {
    Database = (await import("better-sqlite3")).default;
  } catch {
    throw new Error("better-sqlite3 is not installed. Run npm install before using setup.");
  }

  let db;
  try {
    db = new Database(dbPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("NODE_MODULE_VERSION") || message.includes("ERR_DLOPEN_FAILED")) {
      throw new Error(
        "better-sqlite3 native binding is incompatible with this Node.js runtime. " +
          "Run `npm rebuild better-sqlite3` in the OmniRoute project and try again."
      );
    }
    throw error;
  }

  db.pragma("journal_mode = WAL");
  ensureSettingsSchema(db);
  ensureProviderSchema(db);

  return { db, dataDir, dbPath };
}
