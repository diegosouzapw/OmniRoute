import test from "node:test";
import assert from "node:assert/strict";

const { buildTelegramPayload, buildTelegramUrl } =
  await import("../../src/lib/webhooks/integrations/telegram.ts");

const VALID_TOKEN = "123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi";

test("buildTelegramUrl constructs correct API URL from valid botToken", () => {
  const url = buildTelegramUrl(VALID_TOKEN);
  assert.equal(url, `https://api.telegram.org/bot${VALID_TOKEN}/sendMessage`);
});

test("buildTelegramUrl throws on invalid botToken format", () => {
  assert.throws(() => buildTelegramUrl("123456:SHORT"), /Invalid Telegram bot token/);
  assert.throws(
    () => buildTelegramUrl("notanumber:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi"),
    /Invalid Telegram bot token/
  );
  assert.throws(() => buildTelegramUrl(""), /Invalid Telegram bot token/);
});

test("buildTelegramPayload — request.failed includes model and event label", () => {
  const payload = buildTelegramPayload(
    "request.failed",
    { model: "claude-opus-4-7", error: "503" },
    "-100123"
  );
  assert.equal(payload.chat_id, "-100123");
  assert.ok(payload.text.includes("claude-opus-4-7"), "should include model name");
  assert.ok(
    payload.text.toLowerCase().includes("request failed") ||
      payload.text.toLowerCase().includes("failed"),
    "should include event label"
  );
  assert.equal(payload.parse_mode, "Markdown");
});

test("buildTelegramPayload — chat_id matches provided value for groups", () => {
  const payload = buildTelegramPayload("test.ping", { message: "ping" }, "-1001234567890");
  assert.equal(payload.chat_id, "-1001234567890");
});

test("buildTelegramPayload — all WEBHOOK_EVENTS produce valid payloads with chat_id", () => {
  const events = [
    "request.completed",
    "request.failed",
    "provider.error",
    "provider.recovered",
    "quota.exceeded",
    "combo.switched",
    "test.ping",
  ] as const;
  for (const event of events) {
    const payload = buildTelegramPayload(event, {}, "99999");
    assert.equal(payload.chat_id, "99999");
    assert.ok(
      typeof payload.text === "string" && payload.text.length > 0,
      `event ${event} must produce non-empty text`
    );
  }
});
