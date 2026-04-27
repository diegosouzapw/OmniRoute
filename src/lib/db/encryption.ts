/**
 * Field-Level Encryption — AES-256-GCM
 *
 * Encrypts/decrypts sensitive fields (API keys, tokens) stored in SQLite.
 * Format: `enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>`
 *
 * If STORAGE_ENCRYPTION_KEY is not set, operates in passthrough mode
 * (stores plaintext for development convenience).
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync, createHash } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const PREFIX = "enc:v1:";

let _derivedKey: Buffer | null = null;
let _legacyDerivedKey: Buffer | null = null;

/** Connection object with potentially encrypted credential fields. */
export interface ConnectionFields {
  apiKey?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  [key: string]: unknown;
}

/**
 * Derive a 256-bit key from the env secret using scrypt.
 * Returns null if no encryption key is configured.
 */
function getKey(): Buffer | null {
  if (_derivedKey !== null) return _derivedKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret) return null;

  if (typeof secret !== "string" || secret.trim().length === 0) {
    console.error(
      "[Encryption] STORAGE_ENCRYPTION_KEY is set but empty or invalid. " +
        "Generate a valid key with: openssl rand -base64 32"
    );
    return null;
  }

  // Dynamic salt derived from key hash to prevent rainbow table attacks, while remaining deterministic
  const salt = createHash("sha256").update(secret).digest().slice(0, 16);
  try {
    _derivedKey = scryptSync(secret, salt, KEY_LENGTH);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      `[Encryption] Failed to derive key from STORAGE_ENCRYPTION_KEY: ${message}. ` +
        `Generate a valid key with: openssl rand -base64 32`
    );
    return null;
  }
  return _derivedKey;
}

/**
 * Derive legacy 256-bit key from the env secret using the old static salt.
 * Used exclusively for fallback decryption.
 */
function getLegacyKey(): Buffer | null {
  if (_legacyDerivedKey !== null) return _legacyDerivedKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) return null;

  const legacySalt = "omniroute-field-encryption-v1";
  try {
    _legacyDerivedKey = scryptSync(secret, legacySalt, KEY_LENGTH);
  } catch {
    return null;
  }
  return _legacyDerivedKey;
}

/** Check if encryption is enabled. */
export function isEncryptionEnabled(): boolean {
  return !!process.env.STORAGE_ENCRYPTION_KEY;
}

/**
 * Encrypt a plaintext string. Returns ciphertext with prefix.
 * If encryption is not configured, returns plaintext unchanged.
 */
export function encrypt(plaintext: string | null | undefined): string | null | undefined {
  if (!plaintext || typeof plaintext !== "string") return plaintext;

  const key = getKey();
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
 * Decrypt a ciphertext string. If not encrypted (no prefix), returns as-is.
 */
export function decrypt(ciphertext: string | null | undefined): string | null | undefined {
  if (!ciphertext || typeof ciphertext !== "string") return ciphertext;

  // Not encrypted — return as-is (legacy plaintext or passthrough mode)
  if (!ciphertext.startsWith(PREFIX)) return ciphertext;

  const key = getKey();
  if (!key) {
    console.warn(
      "[Encryption] Found encrypted data but STORAGE_ENCRYPTION_KEY is not set. Cannot decrypt."
    );
    // Return null instead of encrypted ciphertext to prevent sending encrypted tokens to providers
    return null;
  }

  const body = ciphertext.slice(PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) {
    console.error("[Encryption] Malformed encrypted value");
    // Return null instead of encrypted ciphertext to prevent sending malformed encrypted tokens to providers
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
    const decrypted = tryDecryptWithKey(key);
    if (decrypted !== null) {
      return decrypted;
    }

    const legacyKey = getLegacyKey();
    if (legacyKey) {
      const legacyDecrypted = tryDecryptWithKey(legacyKey);
      if (legacyDecrypted !== null) {
        return legacyDecrypted;
      }
    }

    console.error(
      `[Encryption] Decryption failed. Ciphertext prefix: ${ciphertext.slice(0, 30)}... ` +
        `Auth tag validation likely failed.`
    );
    return null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Encryption] Decryption failed:", message);
    // Return null instead of encrypted ciphertext to prevent sending encrypted tokens to providers
    return null;
  }
}

/**
 * Encrypt sensitive fields in a connection object (mutates in-place).
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
    scryptSync(secret, "omniroute-field-encryption-v1", KEY_LENGTH);
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
