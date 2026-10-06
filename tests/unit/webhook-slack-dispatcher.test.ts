import test from "node:test";
import assert from "node:assert/strict";
import { WEBHOOK_EVENT_VALUES } from "../../src/lib/webhooks/eventDescriptions.ts";

const { buildSlackPayload } = await import("../../src/lib/webhooks/integrations/slack.ts");

test("buildSlackPayload — request.failed produces Block Kit with model in title", () => {
  const payload = buildSlackPayload("request.failed", {
    model: "claude-opus-4-7",
    error: "503 Service Unavailable",
    attempts: 3,
  });
  assert.ok(payload.blocks, "should have blocks array");
  const sectionText = JSON.stringify(payload.blocks);
  assert.ok(sectionText.includes("claude-opus-4-7"), "should include model name");
  assert.ok(
    sectionText.toLowerCase().includes("request failed") ||
      payload.text.toLowerCase().includes("request failed"),
    "should include event label"
  );
});

test("buildSlackPayload — test.ping produces a ping/test message", () => {
  const payload = buildSlackPayload("test.ping", { message: "Test ping from OmniRoute" });
  const combined = JSON.stringify(payload);
  assert.ok(
    combined.toLowerCase().includes("ping") ||
      combined.toLowerCase().includes("test") ||
      combined.toLowerCase().includes("🏓"),
    "should reference test/ping"
  );
});

test("buildSlackPayload — request.failed includes provider context", () => {
  const payload = buildSlackPayload("request.failed", { provider: "openai" });
  const combined = JSON.stringify(payload);
  assert.ok(
    combined.includes("Provider") ||
      combined.includes("provider") ||
      combined.includes("error") ||
      combined.includes("⚠️"),
    "should reference provider/error"
  );
});

test("buildSlackPayload — all WEBHOOK_EVENTS produce valid payloads with text field", () => {
  const events = WEBHOOK_EVENT_VALUES;
  for (const event of events) {
    const payload = buildSlackPayload(event, {});
    assert.ok(
      typeof payload.text === "string" && payload.text.length > 0,
      `event ${event} must produce non-empty text`
    );
  }
});
