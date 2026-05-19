import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emitGamificationEvent } from "../../../src/lib/gamification/events";

describe("Gamification Events", () => {
  it("does not throw for valid event", async () => {
    await assert.doesNotReject(emitGamificationEvent({ apiKeyId: "test-user", action: "request" }));
  });

  it("does not throw for missing apiKeyId", async () => {
    await assert.doesNotReject(emitGamificationEvent({ apiKeyId: "", action: "request" }));
  });

  it("does not throw for unknown action", async () => {
    await assert.doesNotReject(
      emitGamificationEvent({ apiKeyId: "test-user", action: "unknown" as any })
    );
  });
});
