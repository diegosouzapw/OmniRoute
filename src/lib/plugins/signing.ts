/**
 * Plugin signing — Ed25519 signature verification for plugin packages.
 *
 * @module plugins/signing
 */

import { createHash, createPublicKey, verify } from "crypto";

/**
 * Compute SHA-256 hash of a buffer.
 */
export function sha256(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

/**
 * Verify SHA-256 hash matches expected value.
 */
export function verifySha256(data: Buffer, expectedHash: string): boolean {
  const actual = sha256(data);
  return actual === expectedHash;
}

/**
 * Verify Ed25519 signature.
 */
export function verifyEd25519(data: Buffer, signature: Buffer, publicKeyDer: Buffer): boolean {
  try {
    const key = createPublicKey(publicKeyDer);
    return verify(null, data, key, signature);
  } catch {
    return false;
  }
}
