import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

import { extractChatMessage } from "../../../src/lib/telegram/botApi";
import { verifyInitData } from "../../../src/lib/telegram/initData";

const BOT_TOKEN = "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij";

function buildValidInitData(botToken: string, fields: Record<string, string>): string {
  const pairs = Object.entries(fields).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const dataCheckString = pairs.map(([k, v]) => `${k}=${v}`).join("\n");
  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const hash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  const withHash = [...pairs, ["hash", hash]];
  return withHash.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
}

test("extractChatMessage returns chatId/text/messageId for a text message", () => {
  const chat = extractChatMessage({
    update_id: 1,
    message: {
      message_id: 42,
      chat: { id: 123456789, type: "private" },
      text: "/start",
      from: { id: 123456789, first_name: "Benson" },
    },
  });
  assert.deepEqual(chat, { chatId: 123456789, text: "/start", messageId: 42 });
});

test("extractChatMessage returns null for non-message updates", () => {
  const chat = extractChatMessage({ update_id: 2, callback_query: { id: "q", from: { id: 1 } } });
  assert.equal(chat, null);
});

test("extractChatMessage returns null when text is missing", () => {
  const chat = extractChatMessage({
    update_id: 3,
    message: { message_id: 1, chat: { id: 1, type: "private" } },
  });
  assert.equal(chat, null);
});

test("Mini App initData with real user payload verifies end-to-end", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    query_id: "AAHdF6IQAAAAAN0XohDhrOrc",
    user: '{"id":279058397,"first_name":"Benson","last_name":"KB","username":"benzntech"}',
  });
  assert.equal(verifyInitData(initData, BOT_TOKEN), true);
  // The same initData must fail with a different token (route would 401).
  assert.equal(verifyInitData(initData, "9876543210:ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvu"), false);
});

test("Mini App initData fails when user field is swapped after signing", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: '{"id":279058397,"first_name":"Benson"}',
  });
  // Tamper with the user payload but keep the original hash.
  const parts = initData.split("&").filter((p) => !p.startsWith("hash="));
  const tampered = [...parts, "user=%7B%22id%22%3A1%2C%22first_name%22%3A%22Attacker%22%7D"].join(
    "&"
  );
  assert.equal(verifyInitData(tampered, BOT_TOKEN), false);
});
