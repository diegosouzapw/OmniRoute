import { getDbInstance } from "./core";
import { encrypt, decrypt } from "./encryption";

export function getPersistedSecret(key: string): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'secrets' AND key = ?")
      .get(key) as { value: string } | undefined;
    if (!row?.value) return null;
    const raw = JSON.parse(row.value);
    if (typeof raw !== "string") return null;
    const decrypted = decrypt(raw);
    // decrypt() returns the original ciphertext on failure (wrong key, malformed).
    // Detect failure by checking if the result still looks encrypted.
    if (typeof decrypted === "string" && decrypted.startsWith("enc:v1:")) return null;
    return decrypted ?? null;
  } catch {
    return null;
  }
}

export function persistSecret(key: string, value: string): void {
  try {
    const db = getDbInstance();
    const encrypted = encrypt(value) ?? value;
    // INSERT OR IGNORE: secrets are write-once — the first value persisted is kept.
    // This prevents unexpected overwrites during startup re-runs or concurrent processes.
    // To update a secret, delete the row first then re-persist.
    db.prepare(
      "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('secrets', ?, ?)"
    ).run(key, JSON.stringify(encrypted));
  } catch {
    // Non-fatal: secrets still work for the current process if persistence fails.
  }
}
