import type { WebhookEvent } from "../eventDescriptions";
import { EVENT_DESCRIPTIONS } from "../eventDescriptions";
import { getAccountDisplayName } from "@/lib/display/names";

export interface TelegramSendMessagePayload {
  chat_id: string;
  text: string;
  parse_mode: "Markdown";
}

function escapeMd(s: string): string {
  // Escape Telegram Markdown v1 special chars: _ * [ ] `
  // Hyphens and parentheses are safe in Markdown v1
  return s.replace(/[_*[\]`]/g, (c) => `\\${c}`);
}

// Telegram bot token format: <numeric_id>:<alphanumeric_secret> (min 35 chars after colon)
const BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{35,}$/;

export function buildTelegramUrl(botToken: string): string {
  if (!BOT_TOKEN_RE.test(botToken)) {
    throw new Error("Invalid Telegram bot token format (expected <id>:<secret>)");
  }
  return `https://api.telegram.org/bot${botToken}/sendMessage`;
}

export function buildTelegramPayload(
  event: WebhookEvent,
  data: Record<string, unknown>,
  chatId: string
): TelegramSendMessagePayload {
  const desc = EVENT_DESCRIPTIONS[event];
  const model = typeof data.model === "string" ? escapeMd(data.model) : null;
  const error = typeof data.error === "string" ? escapeMd(data.error) : null;
  const provider = typeof data.provider === "string" ? escapeMd(data.provider) : null;
  const combo = typeof data.combo === "string" ? escapeMd(data.combo) : null;
  const account =
    typeof data.account === "string" && data.account.trim().length > 0
      ? escapeMd(data.account)
      : null;
  const accountId = typeof data.accountId === "string" ? data.accountId.trim() : null;
  const accountDisplay =
    account ||
    (accountId ? escapeMd(getAccountDisplayName({ id: accountId, name: null })) : null);
  const latencyMs =
    typeof data.latencyMs === "number" && Number.isFinite(data.latencyMs) ? data.latencyMs : null;
  const fallbackCount =
    typeof data.fallbackCount === "number" && Number.isFinite(data.fallbackCount)
      ? data.fallbackCount
      : null;

  const lines: string[] = [`${desc.emoji} *${desc.label}*`];
  if (model) lines.push(`Model: \`${model}\``);
  if (provider) lines.push(`Provider: \`${provider}\``);
  if (accountDisplay) lines.push(`Account: \`${accountDisplay}\``);
  if (combo) lines.push(`Combo: \`${combo}\``);
  if (latencyMs !== null) lines.push(`Latency: \`${latencyMs}ms\``);
  if (fallbackCount !== null) lines.push(`Fallbacks: \`${fallbackCount}\``);
  if (error) lines.push(`Error: \`${error}\``);
  lines.push(`_OmniRoute · ${new Date().toISOString()}_`);

  return {
    chat_id: chatId,
    text: lines.join("\n"),
    parse_mode: "Markdown",
  };
}
