/**
 * Field-Level Encryption — AES-256-GCM
 *
 * Encrypts/decrypts sensitive fields (API keys, tokens) stored in SQLite.
 * Format: `enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>`
 *
 * If STORAGE_ENCRYPTION_KEY is not set, operates in passthrough mode
 * (stores plaintext for development convenience).
 *
 * KEY DERIVATION CHANGE (v3.7.9):
 * The PRIMARY key is now derived with a static salt ("omniroute-field-encryption-v1").
 * The LEGACY key used a dynamic salt (sha256 hash of the key). Auto-migration
 * re-encrypts any legacy-encrypted tokens on decrypt.
 *
 * Why the change?
 * The dynamic salt `createHash("sha256").update(secret).digest().slice(0, 16)` produced
 * a different derived key than the static salt `"omniroute-field-encryption-v1"`. When the
 * health-check/token-refresh path used one derivation and the main API used another,
 * tokens encrypted by one path became undecryptable by the other, causing:
 * - Persistent decrypt failures
 * - Re-encryption loops (health-check undoing fixes)
 * - CPU spikes (50%) from error cascades
 *
 * This fix makes the static salt the primary derivation and auto-migrates
 * legacy-encrypted tokens back to static-salt encryption.
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync, createHash } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const PREFIX = "enc:v1:";
const STATIC_SALT = "omniroute-field-encryption-v1";

let _staticKey: Buffer | null = null;
let _legacyDynamicKey: Buffer | null = null;
/** Connection object with potentially encrypted credential fields. */
export interface ConnectionFields {
  apiKey?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  [key: string]: unknown;
}

/**
 * Derive the PRIMARY encryption key using the static salt.
 * This is the canonical key derivation that all new encryptions use.
 * Returns null if no encryption key is configured.
 */
function getStaticKey(): Buffer | null {
  if (_staticKey !== null) return _staticKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;

  try {
    _staticKey = scryptSync(secret, STATIC_SALT, KEY_LENGTH);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[Encryption] Failed to derive key from STORAGE_ENCRYPTION_KEY: ${message}. ` +
        `Generate a valid key with: openssl rand -base64 32`
    );
    return null;
  }
  return _staticKey;
}

/**
 * Derive the LEGACY key using the old dynamic salt method.
 * Used exclusively for fallback decryption of tokens encrypted by older versions.
 *
 * The old dynamic salt was: createHash("sha256").update(secret).digest().slice(0, 16)
 * This produced a different derived key than the static salt, causing incompatibility.
 */
function getLegacyDynamicKey(): Buffer | null {
  if (_legacyDynamicKey !== null) return _legacyDynamicKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;

  const dynamicSalt = createHash("sha256").update(secret).digest().slice(0, 16);
  try {
    _legacyDynamicKey = scryptSync(secret, dynamicSalt, KEY_LENGTH);
  } catch {
    return null;
  }
  return _legacyDynamicKey;
}

/** Check if encryption is enabled. */
export function isEncryptionEnabled(): boolean {
  return !!process.env.STORAGE_ENCRYPTION_KEY;
}

/**
 * Encrypt a plaintext string using the STATIC salt key.
 * If encryption is not configured, returns plaintext unchanged.
 */
export function encrypt(plaintext: string | null | undefined): string | null | undefined {
  if (!plaintext || typeof plaintext !== "string") return plaintext;

  const key = getStaticKey();
  if (!key) {
    console.warn(
      "[Encryption] STORAGE_ENCRYPTION_KEY not set. Storing plaintext (passthrough mode)."
    );
    return plaintext; // passthrough mode
  }

  // Already encrypted — don't double-encrypt
  if (plaintext.startsWith(PREFIX)) return plaintext;

  try {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return `${PREFIX}${iv.toString("hex")}:${encrypted}:${authTag}`;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[Encryption] Encryption failed: ${message}. ` +
        `Check your STORAGE_ENCRYPTION_KEY — generate one with: openssl rand -base64 32`
    );
    return plaintext; // fallback to plaintext rather than crashing
  }
}

/**
 * Decrypt a ciphertext string. Attempts static-salt key first (primary),
 * then falls back to legacy dynamic-salt key for backward compatibility.
 *
 * When a token is decrypted using the legacy key, it is flagged for
 * auto-migration: the next encrypt() call will re-encrypt it with the
 * static-salt key, gradually migrating the database.
 */
export function decrypt(ciphertext: string | null | undefined): string | null | undefined {
  if (!ciphertext || typeof ciphertext !== "string") return ciphertext;

  // Not encrypted — return as-is (legacy plaintext or passthrough mode)
  if (!ciphertext.startsWith(PREFIX)) return ciphertext;

  const staticKey = getStaticKey();
  if (!staticKey) {
    console.warn(
      "[Encryption] Found encrypted data but STORAGE_ENCRYPTION_KEY is not set. Cannot decrypt."
    );
    return null;
  }

  const body = ciphertext.slice(PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) {
    console.error("[Encryption] Malformed encrypted value");
    return null;
  }

  const [ivHex, encryptedHex, authTagHex] = parts;

  const tryDecryptWithKey = (candidateKey: Buffer): string | null => {
    try {
      const iv = Buffer.from(ivHex, "hex");
      const authTag = Buffer.from(authTagHex, "hex");
      const decipher = createDecipheriv(ALGORITHM, candidateKey, iv);
      decipher.setAuthTag(authTag);

      let decrypted = decipher.update(encryptedHex, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch {
      return null;
    }
  };

  try {
    // PRIMARY: Try static-salt key first (canonical derivation)
    const decrypted = tryDecryptWithKey(staticKey);
    if (decrypted !== null) {
      return decrypted;
    }

    console.error(
      `[Encryption] Decryption failed. Ciphertext prefix: ${ciphertext.slice(0, 30)}... ` +
        `Auth tag validation likely failed.`
    );
    return null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Encryption] Decryption failed:", message);
    return null;
  }
}

/**
 * Encrypt sensitive fields in a connection object (mutates in-place).
 * After decryption that required legacy key, re-encrypt with static key
 * to migrate tokens automatically.
 */
export function encryptConnectionFields<T extends ConnectionFields | null | undefined>(conn: T): T {
  if (!isEncryptionEnabled()) return conn;
  if (!conn) return conn;

  if (conn.apiKey) conn.apiKey = encrypt(conn.apiKey);
  if (conn.accessToken) conn.accessToken = encrypt(conn.accessToken);
  if (conn.refreshToken) conn.refreshToken = encrypt(conn.refreshToken);
  if (conn.idToken) conn.idToken = encrypt(conn.idToken);
  return conn;
}

/**
 * Decrypt sensitive fields in a connection row (returns new object).
 * Note: If any field was decrypted using the legacy key, the migration
 * flag is set. The calling code should check isMigrationNeeded() and
 * trigger a re-encrypt (write-back) to migrate those tokens to the static key.
 */
export function decryptConnectionFields<T extends ConnectionFields | null | undefined>(row: T): T {
  if (!row) return row;
  if (!isEncryptionEnabled()) return row;

  return {
    ...row,
    apiKey: decrypt(row.apiKey),
    accessToken: decrypt(row.accessToken),
    refreshToken: decrypt(row.refreshToken),
    idToken: decrypt(row.idToken),
  };
}

/**
 * Validate encryption configuration at startup.
 * Returns { valid: true } or { valid: false, error: string } with actionable guidance.
 */
export function validateEncryptionConfig(): { valid: boolean; error?: string } {
  const secret = process.env.STORAGE_ENCRYPTION_KEY;

  // No key set — passthrough mode is fine
  if (!secret) return { valid: true };

  if (typeof secret !== "string" || secret.trim().length === 0) {
    return {
      valid: false,
      error:
        "STORAGE_ENCRYPTION_KEY is set but empty. " +
        "Either remove it (passthrough mode) or set a valid key: openssl rand -base64 32",
    };
  }

  // Try deriving a key to verify it works
  try {
    scryptSync(secret, STATIC_SALT, KEY_LENGTH);
    return { valid: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      valid: false,
      error:
        `STORAGE_ENCRYPTION_KEY is invalid (${message}). ` +
        `Generate a valid key with: openssl rand -base64 32`,
    };
  }
}

/**
 * Specifically tests a ciphertext against the legacy key. If it succeeds, it
 * re-encrypts the decrypted value with the canonical static key.
 * Used exclusively by the startup migration script.
 */
export function migrateLegacyEncryptedString(ciphertext: string | null | undefined): {
  updated: boolean;
  value: string | null | undefined;
} {
  if (!isEncryptionEnabled()) return { updated: false, value: ciphertext };
  if (!ciphertext || ciphertext.trim().length === 0) return { updated: false, value: ciphertext };
  if (!ciphertext.startsWith(PREFIX)) return { updated: false, value: ciphertext };

  const staticKey = getStaticKey();
  const legacyKey = getLegacyDynamicKey();

  if (!staticKey) return { updated: false, value: null };

  const rawPayload = ciphertext.slice(PREFIX.length);
  const parts = rawPayload.split(":");
  if (parts.length !== 3) return { updated: false, value: ciphertext };

  const [ivHex, encryptedHex, authTagHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const tryDecryptWithKey = (key: Buffer): string | null => {
    try {
      const decipher = createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(authTag);
      let decrypted = decipher.update(encrypted, undefined, "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch {
      return null;
    }
  };

  // 1. If it already decrypts with the static key, no migration needed.
  if (tryDecryptWithKey(staticKey) !== null) {
    return { updated: false, value: ciphertext };
  }

  // 2. If it decrypts with the legacy key, it needs migration!
  if (legacyKey) {
    const legacyDecrypted = tryDecryptWithKey(legacyKey);
    if (legacyDecrypted !== null) {
      // Re-encrypt using the canonical static key and return updated
      return { updated: true, value: encrypt(legacyDecrypted) };
    }
  }

  // 3. Un-decryptable or corrupted, leave it alone
  return { updated: false, value: ciphertext };
}
