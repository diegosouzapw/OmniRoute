// @ts-check
/**
 * Field-Level Encryption — AES-256-GCM
 *
 * Encrypts/decrypts sensitive fields (API keys, tokens) stored in SQLite.
 * Format: `enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>`
 *
 * If STORAGE_ENCRYPTION_KEY is not set, operates in passthrough mode
 * (stores plaintext for development convenience).
 *
 * @module lib/db/encryption
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const PREFIX = "enc:v1:";

/** @type {Buffer|null} */
let _derivedKey = null;

/**
 * Derive a 256-bit key from the env secret using scrypt.
 * Returns null if no encryption key is configured.
 * @returns {Buffer|null}
 */
function getKey() {
  if (_derivedKey !== null) return _derivedKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret) return null;

  // Fixed salt derived from app name — deterministic so same key always produces same derived key
  const salt = "omniroute-field-encryption-v1";
  _derivedKey = scryptSync(secret, salt, KEY_LENGTH);
  return _derivedKey;
}

/**
 * Check if encryption is enabled.
 * @returns {boolean}
 */
export function isEncryptionEnabled() {
  return !!process.env.STORAGE_ENCRYPTION_KEY;
}

/**
 * Encrypt a plaintext string. Returns ciphertext with prefix.
 * If encryption is not configured, returns plaintext unchanged.
 * @param {string|null|undefined} plaintext
 * @returns {string|null|undefined}
 */
export function encrypt(plaintext) {
  if (!plaintext || typeof plaintext !== "string") return plaintext;

  const key = getKey();
  if (!key) return plaintext; // passthrough mode

  // Already encrypted — don't double-encrypt
  if (plaintext.startsWith(PREFIX)) return plaintext;

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${PREFIX}${iv.toString("hex")}:${encrypted}:${authTag}`;
}

/**
 * Decrypt a ciphertext string. If not encrypted (no prefix), returns as-is.
 * @param {string|null|undefined} ciphertext
 * @returns {string|null|undefined}
 */
export function decrypt(ciphertext) {
  if (!ciphertext || typeof ciphertext !== "string") return ciphertext;

  // Not encrypted — return as-is (legacy plaintext or passthrough mode)
  if (!ciphertext.startsWith(PREFIX)) return ciphertext;

  const key = getKey();
  if (!key) {
    console.warn(
      "[Encryption] Found encrypted data but STORAGE_ENCRYPTION_KEY is not set. Cannot decrypt."
    );
    return ciphertext;
  }

  const body = ciphertext.slice(PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) {
    console.error("[Encryption] Malformed encrypted value");
    return ciphertext;
  }

  const [ivHex, encryptedHex, authTagHex] = parts;

  try {
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.error("[Encryption] Decryption failed:", err.message);
    return ciphertext;
  }
}

/**
 * Encrypt sensitive fields in a connection object (mutates in-place).
 * @param {object} conn
 * @returns {object} The same object with encrypted fields
 */
export function encryptConnectionFields(conn) {
  if (!isEncryptionEnabled()) return conn;

  if (conn.apiKey) conn.apiKey = encrypt(conn.apiKey);
  if (conn.accessToken) conn.accessToken = encrypt(conn.accessToken);
  if (conn.refreshToken) conn.refreshToken = encrypt(conn.refreshToken);
  if (conn.idToken) conn.idToken = encrypt(conn.idToken);
  return conn;
}

/**
 * Decrypt sensitive fields in a connection row (returns new object).
 * @param {object|null} row
 * @returns {object|null}
 */
export function decryptConnectionFields(row) {
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
