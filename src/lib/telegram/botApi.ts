/**
 * Minimal Telegram Bot API client — the two calls a Mini App backend needs.
 *
 * Deliberately tiny (fetch-based, no SDK dependency): sendMessage for chat
 * replies and setWebhook for webhook registration. Streaming is emulated
 * by the caller via progressive edits (sendMessage / editMessageText).
 */
import { getTelegramBotApiBase, getTelegramBotToken, getTelegramWebhookTimeoutMs } from "./config";

export interface TelegramSendMessageParams {
  chat_id: number | string;
  text: string;
  parse_mode?: "Markdown" | "HTML";
  reply_to_message_id?: number;
  disable_web_page_preview?: boolean;
}

export interface TelegramEditMessageParams {
  chat_id: number | string;
  message_id: number;
  text: string;
  parse_mode?: "Markdown" | "HTML";
}

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export interface TelegramMessage {
  message_id: number;
  chat: { id: number; type: string };
  text?: string;
  from?: TelegramUser;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  // Mini App payloads arrive as callback_query or message.web_app_data;
  // the common shape is message.text (commands) — start with those.
  callback_query?: {
    id: string;
    from: TelegramUser;
    message?: TelegramMessage;
    data?: string;
  };
}

async function botFetch<T>(method: string, body: unknown): Promise<T> {
  const token = getTelegramBotToken();
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not set");
  const url = `${getTelegramBotApiBase()}/bot${token}/${method}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(getTelegramWebhookTimeoutMs()),
  });
  const json = (await res.json().catch(() => null)) as {
    ok?: boolean;
    description?: string;
    result?: T;
  } | null;
  if (!res.ok || !json?.ok) {
    throw new Error(`Telegram API ${method} failed: ${json?.description || res.status}`);
  }
  return json.result as T;
}

export async function sendTelegramMessage(
  params: TelegramSendMessageParams
): Promise<TelegramMessage> {
  return botFetch<TelegramMessage>("sendMessage", params);
}

export async function editTelegramMessage(
  params: TelegramEditMessageParams
): Promise<TelegramMessage> {
  return botFetch<TelegramMessage>("editMessageText", params);
}

/**
 * Register (or unregister) the bot webhook. Returns the Bot API result.
 * Call this once per deployment (e.g. a CLI command or startup when
 * TELEGRAM_WEBHOOK_URL is set).
 */
export async function setTelegramWebhook(
  url: string | null,
  opts: { dropPending?: boolean } = {}
): Promise<{ url: string; pending_update_count?: number }> {
  if (url) {
    return botFetch("setWebhook", { url, drop_pending_updates: opts.dropPending ?? true });
  }
  return botFetch("deleteWebhook", { drop_pending_updates: opts.dropPending ?? true });
}

/** Extract a chat id + text from any update shape we care about. */
export function extractChatMessage(update: TelegramUpdate): {
  chatId: number;
  text: string;
  messageId?: number;
} | null {
  const msg = update.message;
  if (msg?.chat && typeof msg.text === "string") {
    return { chatId: msg.chat.id, text: msg.text, messageId: msg.message_id };
  }
  return null;
}
