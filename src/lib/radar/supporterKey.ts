/**
 * supporterKey.ts — pure, client-safe validation for the Radar supporter-key
 * format: "omr_" + 40 lowercase hex chars.
 *
 * Kept free of any server-only import (db, sync) — same pattern as
 * autoSync.ts — so the "use client" Radar activation screen can import it
 * directly for a UX-only pre-check before calling POST /api/radar/settings.
 *
 * This is NOT a security boundary: the server (src/app/api/radar/settings/
 * route.ts) re-validates with the same shape via its Zod schema, which is
 * the authoritative check. Client-side rejection only saves a round trip.
 */

/** "omr_" followed by exactly 40 lowercase hex characters. */
export const SUPPORTER_KEY_REGEX = /^omr_[0-9a-f]{40}$/;

/** Whether `key` matches the supporter-key format. No trimming is performed. */
export function isValidSupporterKeyFormat(key: string): boolean {
  return SUPPORTER_KEY_REGEX.test(key);
}
