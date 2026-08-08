/**
 * Telegram Bot API update webhook + Mini App proxy.
 *
 * Two callers share this endpoint:
 *   1. Telegram POSTs bot updates here when the bot's webhook is registered
 *      to {publicBase}/api/telegram/update (shape: TelegramUpdate).
 *   2. The Mini App frontend POSTs { initData, message } directly; the
 *      initData HMAC is verified server-side before proxying.
 *
 * The route:
 *   1. Rejects when TELEGRAM_BOT_TOKEN is unset (never silently no-op).
 *   2. Verifies initData when present (Mini App path).
 *   3. Handles /start (returns the Mini App deep link) and everything else
 *      as a chat prompt proxied through the OmniRoute pipeline.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import type { TelegramUpdate } from "@/lib/telegram/botApi";
import { extractChatMessage, sendTelegramMessage } from "@/lib/telegram/botApi";
import { getTelegramBotToken, isTelegramEnabled } from "@/lib/telegram/config";
import { verifyInitData, parseInitData } from "@/lib/telegram/initData";
import { proxyChat } from "@/lib/telegram/chatProxy";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

/**
 * Telegram update bodies are open-ended (many update types, evolving schema),
 * so validation is deliberately loose: a JSON object with optional string
 * fields for the two paths we handle. The initData HMAC check (Mini App path)
 * and bot-token gate (webhook path) provide the real security.
 */
const telegramBodySchema = z
  .object({
    initData: z.string().optional(),
    message: z.string().optional(),
    update_id: z.number().optional(),
    // allow unknown update fields
  })
  .passthrough();

/** Pull the numeric Telegram user id out of a verified initData string. */
function extractInitDataUserId(initData: string): number {
  try {
    const parsed = parseInitData(initData);
    const userRaw = parsed["user"];
    if (userRaw) {
      const user = JSON.parse(userRaw) as { id?: number };
      if (typeof user.id === "number" && user.id > 0) return user.id;
    }
  } catch {
    // fall through to default
  }
  return 0;
}

function buildMiniAppLink(botUsername?: string): string {
  const base = resolveOmniRouteBaseUrl();
  // Deep link: t.me/<bot>?startapp= opens the Mini App with start_param.
  const bot = botUsername || "YOUR_BOT";
  return `https://t.me/${bot}?startapp=miniapp`;
}

const START_HELP =
  "👋 Welcome! This bot bridges Telegram and your OmniRoute gateway.\n\n" +
  "• Send any message and I'll route it through your configured models.\n" +
  "• Open the Mini App for a full chat UI.";

export async function POST(request: Request) {
  if (!isTelegramEnabled()) {
    return NextResponse.json({ ok: false, error: "Telegram not configured" }, { status: 503 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateBody(telegramBodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const body = validation.data as Record<string, unknown>;

  // ── Mini App direct path: { initData, message } ──────────────────────────
  const initData = typeof body.initData === "string" ? body.initData : "";
  if (initData) {
    const botToken = getTelegramBotToken();
    if (!verifyInitData(initData, botToken)) {
      return NextResponse.json({ ok: false, error: "Invalid initData signature" }, { status: 401 });
    }
    const message = typeof body.message === "string" ? body.message : "";
    if (!message.trim()) {
      return NextResponse.json({ ok: false, error: "message is required" }, { status: 400 });
    }
    // Resolve the Telegram user id from the verified initData for key mapping.
    const telegramUserId = extractInitDataUserId(initData);
    // Proxy synchronously and return the reply (Mini App awaits the fetch).
    const reply = await proxyChat(telegramUserId, message);
    return NextResponse.json({ ok: true, reply: reply || "⚠️ Empty gateway response." });
  }

  // ── Bot webhook path: TelegramUpdate ─────────────────────────────────────
  const update = body as unknown as TelegramUpdate;
  const chat = extractChatMessage(update);
  if (!chat) {
    // Non-message updates (callback_query etc.) — acknowledge silently.
    return NextResponse.json({ ok: true });
  }

  // Fire-and-forget reply: Telegram retries on 5xx, so always 200 after
  // enqueueing the reply. Keep the handler non-blocking.
  void handleAndReply(chat.chatId, chat.text, chat.messageId);

  return NextResponse.json({ ok: true });
}

async function handleAndReply(chatId: number, text: string, messageId?: number): Promise<void> {
  try {
    const trimmed = text.trim();
    if (trimmed === "/start" || trimmed === "/start@") {
      const link = buildMiniAppLink();
      await sendTelegramMessage({
        chat_id: chatId,
        text: `${START_HELP}\n\n🚀 Open the Mini App: ${link}`,
        parse_mode: "Markdown",
      });
      return;
    }

    // Strip bot-command prefixes that aren't /start (e.g. /help).
    if (trimmed.startsWith("/")) {
      await sendTelegramMessage({
        chat_id: chatId,
        text: "Unsupported command. Try /start or just send a message.",
        reply_to_message_id: messageId,
      });
      return;
    }

    const answer = await proxyChat(chatId, trimmed);
    const reply = answer || "⚠️ The gateway returned an empty response.";
    await sendTelegramMessage({
      chat_id: chatId,
      text: reply.length > 4096 ? `${reply.slice(0, 4090)}…` : reply,
      parse_mode: "Markdown",
      reply_to_message_id: messageId,
    });
  } catch (err) {
    try {
      await sendTelegramMessage({
        chat_id: chatId,
        text: `⚠️ Gateway error: ${(err as Error)?.message || "unknown"}`,
      });
    } catch {
      // Nothing more we can do — the reply channel is down.
    }
  }
}
