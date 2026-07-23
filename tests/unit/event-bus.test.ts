import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import {
  emit,
  getEventHistory,
  on,
  onAny,
  type HistoryEntry,
} from "../../src/lib/events/eventBus.ts";

import * as eventBusPublicApi from "../../src/lib/events/eventBus.ts";

const requestStartedPayload = {
  id: "req-1",
  model: "gpt-test",
  provider: "openai",
  timestamp: 123,
};

describe("eventBus", () => {
  beforeEach(() => {
    globalThis.__omnirouteEventBus = undefined;
  });

  it("public surface excludes unused listener management helpers", () => {
    assert.equal("off" in eventBusPublicApi, false);
    assert.equal("removeAllListeners" in eventBusPublicApi, false);
    assert.equal("getBusStats" in eventBusPublicApi, false);
  });

  it("emits to specific and wildcard listeners until unsubscribed", () => {
    const received: (typeof requestStartedPayload)[] = [];
    const wildcardEvents: string[] = [];

    const unsubscribe = on("request.started", (payload) => {
      received.push(payload);
    });
    const unsubscribeAny = onAny((event) => {
      wildcardEvents.push(event);
    });

    emit("request.started", requestStartedPayload);
    unsubscribe();
    unsubscribeAny();
    emit("request.started", { ...requestStartedPayload, id: "req-2" });

    assert.deepEqual(received, [requestStartedPayload]);
    assert.deepEqual(wildcardEvents, ["request.started"]);
  });

  it("keeps recent event history for late subscribers", () => {
    emit("request.started", requestStartedPayload);

    const history: HistoryEntry[] = getEventHistory(undefined, 1);

    assert.equal(history.length, 1);
    assert.equal(history[0]?.event, "request.started");
    assert.deepEqual(history[0]?.payload, requestStartedPayload);
  });
});
