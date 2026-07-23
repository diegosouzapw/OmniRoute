import test from "node:test";
import assert from "node:assert/strict";

const webhookEvents = await import("../../src/lib/webhooks/eventDescriptions.ts");

test("webhook event descriptions expose event metadata without the unused payload builder", () => {
  const descriptions = webhookEvents.EVENT_DESCRIPTIONS;

  assert.ok(descriptions["request.completed"]);
  assert.equal(descriptions["request.completed"].label, "Request Completed");
  assert.equal(descriptions["test.ping"].exampleData.webhookId, "preview");
  assert.equal("buildExamplePayload" in webhookEvents, false);
});
