import test from "node:test";
import assert from "node:assert/strict";

const { buildTelegramPayload, buildTelegramUrl } =
  await import("../../src/lib/webhooks/integrations/telegram.ts");

test("buildTelegramUrl constructs correct API URL from botToken", () => {
  const url = buildTelegramUrl("123456:ABC-DEF");
  assert.equal(url, "https://api.telegram.org/bot123456:ABC-DEF/sendMessage");
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
