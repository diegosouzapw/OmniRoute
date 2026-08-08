/**
 * verify.ts — Ed25519 signature verification for Radar feed bytes.
 *
 * Critical invariant: verifies the EXACT bytes received over the wire.
 * Never re-serializes JSON before verifying.
 *
 * Returns `false` on any error (malformed input, bad key, bad sig) —
 * never throws.
 */

import crypto from "node:crypto";
import { getFeedPublicKeys, toPublicKey } from "./pinnedKeys";

/**
 * Verify that `signatureB64` is a valid Ed25519 signature over `bytes`
 * using at least one of the active feed public keys.
 *
 * @returns `true` if ANY key verifies the signature; `false` otherwise.
 */
export function verifyFeedBytes(bytes: Buffer, signatureB64: string): boolean {
  if (!bytes || bytes.length === 0) return false;
  if (!signatureB64 || signatureB64.trim().length === 0) return false;

  let sigBytes: Buffer;
  try {
    sigBytes = Buffer.from(signatureB64, "base64");
    if (sigBytes.length === 0) return false;
  } catch {
    return false;
  }

  const keys = getFeedPublicKeys();

  for (const keyB64 of keys) {
    const keyObj = toPublicKey(keyB64);
    if (!keyObj) continue;

    try {
      const valid = crypto.verify(null, bytes, keyObj, sigBytes);
      if (valid) return true;
    } catch {
      // malformed key/sig — try next
    }
  }

  return false;
}
