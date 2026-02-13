/**
 * Cursor Checksum Utility (Jyh Cipher)
 *
 * Generates the x-cursor-checksum header required for Cursor API authentication.
 * Based on the JavaScript implementation from Cursor IDE.
 */

import crypto from "crypto";
import { v5 as uuidv5 } from "uuid";

/**
 * Generate SHA-256 hash like generateHashed64Hex
 * @param {string} input - Input string
 * @param {string} salt - Optional salt
 * @returns {string} - 64-character hex string
 */
export function generateHashed64Hex(input, salt = "") {
  return crypto
    .createHash("sha256")
    .update(input + salt)
    .digest("hex");
}

/**
 * Generate session ID using UUID v5 with DNS namespace
 * @param {string} authToken - Auth token
 * @returns {string} - UUID string
 */
export function generateSessionId(authToken) {
  return uuidv5(authToken, uuidv5.DNS);
}

/**
 * Generate cursor checksum (Jyh cipher)
 *
 * Algorithm:
 * 1. Get Unix timestamp in specific format
 * 2. XOR each byte with key (starting 165)
 * 3. Update key: key = (key + byte) & 0xFF
 * 4. URL-safe base64 encode
 * 5. Format: {base64_encoded}{machineId}
 *
 * @param {string} machineId - Machine ID from Cursor storage or generated
 * @returns {string} - Checksum string
 */
export function generateCursorChecksum(machineId) {
  // Math.floor(Date.now() / 1e6) - same as Python implementation
  const timestamp = Math.floor(Date.now() / 1000000);

  // Create byte array from timestamp (6 bytes, big-endian)
  const byteArray = new Uint8Array([
    (timestamp >> 40) & 0xff,
    (timestamp >> 32) & 0xff,
    (timestamp >> 24) & 0xff,
    (timestamp >> 16) & 0xff,
    (timestamp >> 8) & 0xff,
    timestamp & 0xff,
  ]);

  // Jyh cipher obfuscation
  let t = 165;
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = ((byteArray[i] ^ t) + (i % 256)) & 0xff;
    t = byteArray[i];
  }

  // URL-safe base64 encode (without padding)
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let encoded = "";

  for (let i = 0; i < byteArray.length; i += 3) {
    const a = byteArray[i];
    const b = i + 1 < byteArray.length ? byteArray[i + 1] : 0;
    const c = i + 2 < byteArray.length ? byteArray[i + 2] : 0;

    encoded += alphabet[a >> 2];
    encoded += alphabet[((a & 3) << 4) | (b >> 4)];

    if (i + 1 < byteArray.length) {
      encoded += alphabet[((b & 15) << 2) | (c >> 6)];
    }
    if (i + 2 < byteArray.length) {
      encoded += alphabet[c & 63];
    }
  }

  return `${encoded}${machineId}`;
}

/**
 * Build all Cursor API headers
 *
 * @param {string} accessToken - Bearer token
 * @param {string} machineId - Machine ID (or will be generated from token)
 * @param {boolean} ghostMode - Enable ghost mode (privacy)
 * @returns {Object} - Headers object
 */
export function buildCursorHeaders(accessToken, machineId = null, ghostMode = true) {
  // Clean token if it has prefix
  const cleanToken = accessToken.includes("::") ? accessToken.split("::")[1] : accessToken;

  // Generate machine ID if not provided
  const effectiveMachineId = machineId || generateHashed64Hex(cleanToken, "machineId");

  // Generate derived values
  const sessionId = generateSessionId(cleanToken);
  const clientKey = generateHashed64Hex(cleanToken);
  const checksum = generateCursorChecksum(effectiveMachineId);

  return {
    Authorization: `Bearer ${cleanToken}`,
    "connect-accept-encoding": "gzip",
    "connect-protocol-version": "1",
    "Content-Type": "application/connect+proto",
    "User-Agent": "connect-es/1.6.1",
    "x-amzn-trace-id": `Root=${crypto.randomUUID()}`,
    "x-client-key": clientKey,
    "x-cursor-checksum": checksum,
    "x-cursor-client-version": "1.1.3",
    "x-cursor-config-version": crypto.randomUUID(),
    "x-cursor-timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    "x-ghost-mode": ghostMode ? "true" : "false",
    "x-request-id": crypto.randomUUID(),
    "x-session-id": sessionId,
    Host: "api2.cursor.sh",
  };
}

const cursorChecksumUtils = {
  generateCursorChecksum,
  buildCursorHeaders,
  generateHashed64Hex,
  generateSessionId,
};

export default cursorChecksumUtils;
