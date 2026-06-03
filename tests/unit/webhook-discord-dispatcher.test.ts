import test from "node:test";
import assert from "node:assert/strict";

const { buildDiscordPayload } = await import("../../src/lib/webhooks/integrations/discord.ts");

test("buildDiscordPayload — request.failed produces embed with model", () => {
  const payload = buildDiscordPayload("request.failed", {
    model: "claude-opus-4-7",
    error: "503",
  });
  assert.ok(payload.content || payload.embeds, "should have content or embeds");
  const combined = JSON.stringify(payload);
  assert.ok(combined.includes("claude-opus-4-7"), "should include model name");
});

test("buildDiscordPayload — all WEBHOOK_EVENTS return object with content or embeds", () => {
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
    const payload = buildDiscordPayload(event, {});
    assert.ok(
      payload.content || (Array.isArray(payload.embeds) && payload.embeds.length > 0),
      `event ${event} must have content or embeds`
    );
  }
});

test("buildDiscordPayload — embeds have title and color fields", () => {
  const payload = buildDiscordPayload("provider.error", { provider: "openai" });
  assert.ok(Array.isArray(payload.embeds) && payload.embeds.length > 0, "should have embeds");
  const embed = payload.embeds![0];
  assert.ok(typeof embed.title === "string" && embed.title.length > 0, "embed must have title");
  assert.ok(typeof embed.color === "number", "embed must have color");
});
