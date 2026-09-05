import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

import { parseInitData, verifyInitData } from "../../../src/lib/telegram/initData";

const BOT_TOKEN = "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij";

/** Build a *valid* initData string for a given bot token (test helper). */
function buildValidInitData(botToken: string, fields: Record<string, string>): string {
  const pairs = Object.entries(fields).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const dataCheckString = pairs.map(([k, v]) => `${k}=${v}`).join("\n");
  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const hash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  const withHash = [...pairs, ["hash", hash]];
  return withHash.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
}

test("parseInitData decodes URL-encoded key/value pairs", () => {
  const parsed = parseInitData("user=%7B%22id%22%3A42%7D&auth_date=1700000000&hash=abc");
  assert.equal(parsed.user, '{"id":42}');
  assert.equal(parsed.auth_date, "1700000000");
  assert.equal(parsed.hash, "abc");
});

test("verifyInitData accepts a valid signature", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    query_id: "AAHdF6IQAAAAAN0XohDhrOrc",
    user: '{"id":279058397,"first_name":"Benson","last_name":"KB","username":"benzntech"}',
  });
  assert.equal(verifyInitData(initData, BOT_TOKEN), true);
});

test("verifyInitData rejects a tampered user field", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: '{"id":279058397,"first_name":"Benson"}',
  });
  const tampered = initData.replace("Benson", "Attacker");
  assert.equal(verifyInitData(tampered, BOT_TOKEN), false);
});

test("verifyInitData rejects a wrong bot token", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: '{"id":1}',
  });
  assert.equal(verifyInitData(initData, "999:WRONGTOKENWRONGTOKENWRONGTOKENWRONG"), false);
});

test("verifyInitData rejects missing hash", () => {
  const initData = "auth_date=1700000000&user=%7B%22id%22%3A1%7D";
  assert.equal(verifyInitData(initData, BOT_TOKEN), false);
});

test("verifyInitData rejects stale auth_date beyond maxAge", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000) - 48 * 60 * 60), // 48h old
    user: '{"id":1}',
  });
  assert.equal(verifyInitData(initData, BOT_TOKEN, 24 * 60 * 60), false);
  // But passes when the window is generous
  assert.equal(verifyInitData(initData, BOT_TOKEN, 7 * 24 * 60 * 60), true);
});

test("verifyInitData handles chunked/encoded keys", () => {
  const initData = buildValidInitData(BOT_TOKEN, {
    auth_date: String(Math.floor(Date.now() / 1000)),
    "some-key with spaces": "value with & specials",
  });
  assert.equal(verifyInitData(initData, BOT_TOKEN), true);
});
