import { getDbInstance } from "./core";
import { decrypt, encrypt } from "./encryption";

interface SecretRow {
  value?: string;
}

export function getPersistedSecret(key: string): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'secrets' AND key = ?")
      .get(key) as SecretRow | undefined;
    const stored = typeof row?.value === "string" ? JSON.parse(row.value) : null;
    if (typeof stored !== "string") return null;
    // SECURITY: JWT_SECRET / API_KEY_SECRET are persisted via encrypt() below.
    // decrypt() transparently returns plaintext unchanged when the stored
    // value does not carry the `enc:v1:` prefix (pre-existing rows written
    // before this fix, or STORAGE_ENCRYPTION_KEY passthrough mode).
    const decrypted = decrypt(stored);
    return typeof decrypted === "string" ? decrypted : null;
  } catch {
    return null;
  }
}

export function persistSecret(key: string, value: string): void {
  try {
    const db = getDbInstance();
    // SECURITY: encrypt with the project's AES-256-GCM field-encryption
    // helper before writing to key_value — matches the calling convention
    // used for provider credentials (encryptConnectionFields()/encrypt() in
    // core.ts). Falls back to plaintext passthrough only when
    // STORAGE_ENCRYPTION_KEY is not configured (encrypt()'s own behavior).
    const toStore = encrypt(value);
    db.prepare(
      "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('secrets', ?, ?)"
    ).run(key, JSON.stringify(toStore ?? value));
  } catch {
    // Non-fatal: secrets still work for the current process if persistence fails.
  }
}
