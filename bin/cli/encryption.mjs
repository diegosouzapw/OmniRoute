import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const PREFIX = "enc:v1:";
// Keep this salt in sync with the app-side field encryption format so credentials written by
// CLI setup remain decryptable by the dashboard/server and vice versa.
const STATIC_SALT = "omniroute-field-encryption-v1";

let cachedKey = null;

function getEncryptionKey() {
  if (cachedKey !== null) return cachedKey;

  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret || typeof secret !== "string" || secret.trim().length === 0) {
    return null;
  }

  cachedKey = scryptSync(secret, STATIC_SALT, KEY_LENGTH);
  return cachedKey;
}

export function encryptCredential(value) {
  if (!value || typeof value !== "string" || value.startsWith(PREFIX)) return value || null;

  const key = getEncryptionKey();
  if (!key) return value;

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return `${PREFIX}${iv.toString("hex")}:${encrypted}:${authTag}`;
}

export function decryptCredential(value) {
  if (!value || typeof value !== "string") return value || null;
  if (!value.startsWith(PREFIX)) return value;

  const key = getEncryptionKey();
  if (!key) {
    throw new Error("STORAGE_ENCRYPTION_KEY is required to decrypt this provider credential.");
  }

  const body = value.slice(PREFIX.length);
  const parts = body.split(":");
  if (parts.length !== 3) {
    throw new Error("Malformed encrypted provider credential.");
  }

  const [ivHex, encryptedHex, authTagHex] = parts;
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
