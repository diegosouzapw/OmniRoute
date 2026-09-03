import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import {
  EVENT_DESCRIPTIONS,
  WEBHOOK_EVENT_VALUES,
} from "../../../src/lib/webhooks/eventDescriptions.ts";

describe("webhook catalogue", () => {
  it("no longer declares provider.error/recovered/combo.switched", () => {
    const keys = Object.keys(EVENT_DESCRIPTIONS);
    assert.equal(keys.includes("provider.error"), false);
    assert.equal(keys.includes("provider.recovered"), false);
    assert.equal(keys.includes("combo.switched"), false);
    assert.equal(keys.length, 4); // completed, failed, quota.exceeded, test.ping
  });

  it("rejected legacy events via zod (400)", () => {
    const schema = z.enum(WEBHOOK_EVENT_VALUES as unknown as [string, ...string[]]);
    assert.equal(schema.safeParse("provider.error").success, false);
    assert.equal(schema.safeParse("provider.recovered").success, false);
    assert.equal(schema.safeParse("combo.switched").success, false);
    assert.equal(schema.safeParse("request.completed").success, true);
    assert.equal(schema.safeParse("request.failed").success, true);
    assert.equal(schema.safeParse("quota.exceeded").success, true);
    assert.equal(schema.safeParse("test.ping").success, true);
  });

  it("notifyWebhookEvent still available for remaining events", async () => {
    const { notifyWebhookEvent } = await import("../../../src/lib/webhookDispatcher.ts");
    assert.equal(typeof notifyWebhookEvent, "function");
  });

  it("every builder accepts every value in WEBHOOK_EVENT_VALUES without throwing", async () => {
    const { buildDiscordPayload } = await import("../../../src/lib/webhooks/integrations/discord.ts");
    const { buildSlackPayload } = await import("../../../src/lib/webhooks/integrations/slack.ts");
    const { buildTelegramPayload } =
      await import("../../../src/lib/webhooks/integrations/telegram.ts");
    for (const event of WEBHOOK_EVENT_VALUES) {
      assert.doesNotThrow(() => buildDiscordPayload(event, {}));
      assert.doesNotThrow(() => buildSlackPayload(event, {}));
      assert.doesNotThrow(() => buildTelegramPayload(event, {}, "99999"));
    }
  });
});
