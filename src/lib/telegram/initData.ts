/**
 * Telegram WebApp initData verification.
 *
 * A Telegram Mini App authenticates by passing `initData` (from the
 * Telegram.WebApp SDK's `initData` property) to its backend. The only
 * trustworthy anchor is the `hash` field: an HMAC-SHA256 over the sorted
 * `key=value` pairs (minus `hash`), keyed with SHA256 of the bot token.
 *
 * Reference: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * This module is pure and dependency-free (node:crypto only) so it is
 * directly unit-testable. Never trust the client-side `initData` alone —
 * verification MUST happen server-side.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/** Parse a URLSearchParams-style initData string into a record. */
export function parseInitData(initData: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!initData) return out;
  for (const pair of initData.split("&")) {
    const eq = pair.indexOf("=");
    if (eq <= 0) continue;
    const key = decodeURIComponent(pair.slice(0, eq));
    const value = decodeURIComponent(pair.slice(eq + 1));
    if (key && !(key in out)) out[key] = value;
  }
  return out;
}

/**
 * Verify a Telegram WebApp initData string against the bot token.
 *
 * @param initData raw initData string from the Mini App (or `initDataUnsafe` reconstruction)
 * @param botToken Telegram bot token (`<id>:<secret>`) — the HMAC secret source
 * @param maxAgeSec optional freshness bound on `auth_date` (default 24h per Telegram docs)
 * @returns true when the signature matches AND (if maxAgeSec set) auth_date is fresh
 */
export function verifyInitData(
  initData: string,
  botToken: string,
  maxAgeSec = 24 * 60 * 60
): boolean {
  if (!initData || !botToken) return false;
  const data = parseInitData(initData);
  const providedHash = data["hash"];
  if (!providedHash) return false;

  // Optional freshness check on auth_date (unix seconds).
  if (maxAgeSec > 0) {
    const authDate = Number.parseInt(data["auth_date"] ?? "", 10);
    if (!Number.isFinite(authDate) || authDate <= 0) return false;
    const now = Math.floor(Date.now() / 1000);
    if (now - authDate > maxAgeSec) return false;
  }

  // Rebuild the data-check string: sorted key=value pairs, excluding hash.
  const pairs = Object.entries(data)
    .filter(([k]) => k !== "hash")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`);

  const dataCheckString = pairs.join("\n");

  // secret_key = HMAC_SHA256(key="WebAppData", bot_token)
  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();

  // expected_hash = HMAC_SHA256(secret_key, data_check_string) hex
  const expectedHash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  const provided = Buffer.from(providedHash, "utf8");
  const expected = Buffer.from(expectedHash, "utf8");
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}
