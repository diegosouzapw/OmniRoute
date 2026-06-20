/**
 * Cryptographically-secure RNG helpers for load-balancing / routing selection.
 *
 * OmniRoute's combo target selection (weighted / random / power-of-two-choices), the
 * credential-deck rotation, and shadow-routing sampling pick among upstream
 * providers/connections. CodeQL's `js/insecure-randomness` flags `Math.random()` in these
 * paths as "randomness in a security context" — a false positive (provider load-balancing
 * is not a secret, token, nonce or session id). Routing these few, non-hot-path selections
 * through `node:crypto` removes the finding at negligible cost. These are drop-in
 * replacements with identical ranges and semantics:
 *
 *   secureRandomInt(n)   === Math.floor(Math.random() * n)   // integer in [0, n)
 *   secureRandomFloat()  === Math.random()                   // float   in [0, 1)
 */
import { randomBytes } from "node:crypto";

/** Default source: uniform float in [0, 1) from 48 bits of crypto entropy. */
function cryptoRandomFloat(): number {
  const buf = randomBytes(6);
  let value = 0;
  for (let i = 0; i < buf.length; i++) {
    value = value * 256 + buf[i];
  }
  return value / 2 ** 48;
}

// Swappable source — production always uses the crypto source; tests inject a deterministic
// sequence via _setSecureRandomFloatSource (mirrors the `_resetAllDecks` test-only export in
// shuffleDeck.ts). secureRandomInt derives from the same float source, so a given injected
// value picks the exact same index that `Math.floor(Math.random() * n)` would have.
let floatSource: () => number = cryptoRandomFloat;

/** Uniform float in [0, 1) — drop-in for `Math.random()`. */
export function secureRandomFloat(): number {
  return floatSource();
}

/**
 * Uniform integer in [0, maxExclusive) — drop-in for `Math.floor(Math.random() * maxExclusive)`.
 * Returns 0 for any `maxExclusive <= 1` (matching `Math.floor(Math.random() * {0,1})`), so
 * single-element / empty selections behave exactly as before.
 */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isFinite(maxExclusive) || maxExclusive <= 1) return 0;
  const max = Math.floor(maxExclusive);
  // Scale [0, 1) → [0, max); clamp defends the probability-0 case of a source returning ~1.
  return Math.min(max - 1, Math.floor(floatSource() * max));
}

/**
 * TEST ONLY — replace the underlying RNG with a deterministic source so selection logic can
 * be asserted; pass `null` to restore the crypto source. Mirrors the `_resetAllDecks`
 * test-only export convention in shuffleDeck.ts.
 */
export function _setSecureRandomFloatSource(source: (() => number) | null): void {
  floatSource = source ?? cryptoRandomFloat;
}
