import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  type DashboardChannel,
  CHANNEL_EVENTS,
  getChannelForEvent,
} from "../../../src/lib/events/types.ts";

describe("compression WS channel (U5)", () => {
  it("DashboardChannel includes 'compression'", () => {
    // The type must include 'compression' — we verify it at runtime by ensuring
    // CHANNEL_EVENTS has the key (TypeScript narrows keys to DashboardChannel).
    const channels = Object.keys(CHANNEL_EVENTS) as DashboardChannel[];
    assert.ok(
      channels.includes("compression" as DashboardChannel),
      "CHANNEL_EVENTS must have a 'compression' key"
    );
  });

  it("CHANNEL_EVENTS.compression contains 'compression.completed'", () => {
    const events = (CHANNEL_EVENTS as Record<string, string[]>)["compression"];
    assert.ok(Array.isArray(events), "CHANNEL_EVENTS.compression should be an array");
    assert.ok(
      events.includes("compression.completed"),
      "compression channel must list 'compression.completed'"
    );
  });

  it("getChannelForEvent maps 'compression.completed' → 'compression'", () => {
    const channel = getChannelForEvent(
      "compression.completed" as Parameters<typeof getChannelForEvent>[0]
    );
    assert.equal(channel, "compression");
  });

  it("existing channels still route correctly", () => {
    assert.equal(getChannelForEvent("request.started"), "requests");
    assert.equal(getChannelForEvent("combo.target.attempt"), "combo");
    assert.equal(getChannelForEvent("credential.health.changed"), "credentials");
  });
});
