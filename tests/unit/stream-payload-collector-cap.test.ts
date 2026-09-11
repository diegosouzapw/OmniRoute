import test from "node:test";
import assert from "node:assert/strict";

const { createStructuredSSECollector } =
  await import("../../open-sse/utils/streamPayloadCollector.ts");

// Live incident (2026-09-02): a reasoning-heavy response streams reasoning
// token-by-token as hundreds to thousands of tiny SSE deltas before the real
// output/tool_calls ever arrive. At the old defaults (200 events / 48KB),
// the cap was routinely exhausted during the reasoning phase alone,
// dropping the completion event entirely -- for a caller with no `format`
// (no live reducer), the logged summary is reconstructed from getEvents()
// (see open-sse/utils/stream.ts), so the dropped completion silently
// produced a served-successfully response logged as _truncated with an
// empty output array. src/lib/db/responsesContinuationStore.ts then had
// nothing real to reconstruct a later continuation turn from. Measured
// live: ~22% of a sample of recent successful responses hit this.
test("createStructuredSSECollector retains a realistic reasoning-heavy event burst without dropping (regression for the 2026-09-02 truncated-continuation incident)", () => {
  const collector = createStructuredSSECollector({ stage: "client_response" });

  // Anonymized, real-incident shape: ~1600 small reasoning deltas (the
  // observed volume for a genuinely reasoning-heavy turn) followed by the
  // actual completion event -- exactly the ordering that exhausted the old
  // 200-event/48KB cap before the completion event ever arrived.
  for (let i = 0; i < 1600; i++) {
    collector.push({
      type: "response.reasoning_summary_text.delta",
      delta: "token ",
      sequence_number: i,
    });
  }
  collector.push({
    type: "response.completed",
    response: { id: "resp_test", status: "completed", output: [{ type: "message" }] },
  });

  const built = collector.build(undefined, { includeEvents: true });
  assert.equal(built._truncated, undefined, "a realistic reasoning burst must not hit the cap");
  assert.equal(built._droppedEvents, undefined);

  const events = collector.getEvents();
  const completedEvent = events.find((e) => e.data?.type === "response.completed");
  assert.ok(completedEvent, "the completion event must survive to build()'s retained events");
});

test("createStructuredSSECollector still reports _truncated once a stream genuinely exceeds the (raised) cap", () => {
  // The cap protects against a truly pathological/runaway stream -- raising
  // it must not remove that protection, only its false-positive rate on
  // realistic reasoning-heavy traffic.
  const collector = createStructuredSSECollector({ stage: "client_response", maxEvents: 5 });
  for (let i = 0; i < 10; i++) {
    collector.push({ type: "response.output_text.delta", delta: "x", sequence_number: i });
  }
  const built = collector.build(undefined, { includeEvents: false });
  assert.equal(built._truncated, true);
  assert.equal(built._droppedEvents, 5);
});
