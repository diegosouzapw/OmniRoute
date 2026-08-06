/**
 * pinnedKeys.ts — Pinned Ed25519 public keys for Radar feed signature verification.
 *
 * The private key lives ONLY on the signing server.  The public key is safe
 * to commit — it lets clients verify that a feed was signed by the real
 * OmniRoute Radar server without any CA or PKI infrastructure.
 *
 * Fork operators can override the key via the `RADAR_FEED_PUBKEY` env var
 * (base64-DER or PEM) so they can point at their own feed server.
 */

import crypto from "node:crypto";

/**
 * Pinned Ed25519 SPKI-DER public key (base64-encoded).
 *
 * This is the DEFAULT key used when `RADAR_FEED_PUBKEY` is not set.
 * Array allows key rotation (new keys are prepended; old ones remain
 * until all cached feeds have been re-signed).
 */
export const PINNED_FEED_PUBLIC_KEYS: readonly string[] = [
  "MCowBQYDK2VwAyEAgTRJp8E45rtMLo7LiigexGl230wGiV5/sZddXFfQUdY=",
];

/**
 * Return the active set of feed public keys.
 *
 * When `RADAR_FEED_PUBKEY` is set (base64-DER or PEM), that single key
 * is returned — this is the fork path.  Otherwise the pinned array is used.
 */
export function getFeedPublicKeys(): readonly string[] {
  const override = process.env.RADAR_FEED_PUBKEY;
  if (override && override.trim().length > 0) {
    return [override.trim()];
  }
  return PINNED_FEED_PUBLIC_KEYS;
}

/**
 * Convert a base64-DER or PEM string to a `crypto.KeyObject` suitable
 * for `crypto.verify()`.  Returns `null` if the input is malformed.
 */
export function toPublicKey(input: string): crypto.KeyObject | null {
  try {
    const trimmed = input.trim();

    // PEM path
    if (trimmed.startsWith("-----BEGIN")) {
      return crypto.createPublicKey(trimmed);
    }

    // base64-DER path
    const der = Buffer.from(trimmed, "base64");
    if (der.length === 0) return null;
    return crypto.createPublicKey({
      key: der,
      format: "der",
      type: "spki",
    });
  } catch {
    return null;
  }
}
