/**
 * Telegram Mini App configuration.
 *
 * The bot token is read from the environment (TELEGRAM_BOT_TOKEN) so it is
 * never stored in the DB or committed. It doubles as the HMAC secret for
 * initData verification (see ./initData.ts).
 */

const DEFAULT_WEBHOOK_TIMEOUT_MS = 60_000;

/** Telegram bot token format: <numeric_id>:<alphanumeric_secret> (min 35 chars after colon). */
const BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{35,}$/;

export function getTelegramBotToken(): string {
  return process.env.TELEGRAM_BOT_TOKEN || "";
}

export function isTelegramEnabled(): boolean {
  return BOT_TOKEN_RE.test(getTelegramBotToken());
}

export function getTelegramWebhookTimeoutMs(): number {
  const raw = process.env.TELEGRAM_WEBHOOK_TIMEOUT_MS;
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_WEBHOOK_TIMEOUT_MS;
}

export function getTelegramBotApiBase(): string {
  return process.env.TELEGRAM_BOT_API_BASE || "https://api.telegram.org";
}
