import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { CHANNEL_EVENTS, getChannelForEvent } from "../../src/lib/events/types.ts";
import { emit, on } from "../../src/lib/events/eventBus.ts";

describe("agents WS channel (B1)", () => {
  it("agents channel maps agent.task.updated", () => {
    assert.deepEqual(CHANNEL_EVENTS.agents, ["agent.task.updated"]);
    assert.equal(getChannelForEvent("agent.task.updated"), "agents");
  });

  it("emit/on round-trip", () => {
    const seen: unknown[] = [];
    const off = on("agent.task.updated", (p) => seen.push(p));
    emit("agent.task.updated", { source: "a2a", taskId: "t1", state: "working", timestamp: 1 });
    off();
    assert.equal(seen.length, 1);
  });
});
