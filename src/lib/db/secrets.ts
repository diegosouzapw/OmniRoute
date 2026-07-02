import { getDbInstance } from "./core";

interface SecretRow {
  value?: string;
}

export function getPersistedSecret(key: string): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'secrets' AND key = ?")
      .get(key) as SecretRow | undefined;
    return typeof row?.value === "string" ? JSON.parse(row.value) : null;
  } catch {
    return null;
  }
}

export function persistSecret(key: string, value: string): void {
  try {
    const db = getDbInstance();
    db.prepare(
      "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('secrets', ?, ?)"
    ).run(key, JSON.stringify(value));
  } catch {
    // Non-fatal: secrets still work for the current process if persistence fails.
  }
}
