import { timingSafeEqual } from "crypto";

/**
 * Constant-time string comparison for secrets, tokens and single-use nonces.
 *
 * `===` short-circuits on the first differing byte, so rejection time
 * correlates with how much of the value the caller already guessed (CWE-208).
 * That is the comparison this repo already avoids in every OAuth callback, the
 * A2A token check, the Telegram initData HMAC and the CLI token check — each of
 * which grew its own private copy of these five lines. This is the shared one:
 * reach for it instead of writing a ninth copy, and instead of `===`.
 *
 * Length is not secret here (it leaks through the early return, as it does in
 * every other copy) — the value being protected is the content, not its size.
 * `null`/`undefined` compare by identity so a missing secret never matches a
 * present one.
 */
export function timingSafeCompare(
  a: string | null | undefined,
  b: string | null | undefined
): boolean {
  if (a == null || b == null) return a === b;
  const bufA = Buffer.from(String(a), "utf8");
  const bufB = Buffer.from(String(b), "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
