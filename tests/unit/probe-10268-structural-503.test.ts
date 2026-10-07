// #10268: "[BUG] API call failed (attempt 1/3): InternalServerError [HTTP 503]" — Hermes
// Agent / Cursor coding-agent fan-out landed on the same structural admission gate as
// #10183 and burned its 3 retries on OmniRoute's own `chat_admission_busy` 503, which it
// misread as an upstream capacity error. Same root cause, same fix (heap-conditional
// shedding in `admitChatStructure`): this test is the permanent regression guard proving
// the exact reported 503 shape is still produced when heap pressure is GENUINELY high,
// so the #4380 heap-amplification shed path is preserved rather than removed outright.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  admitChatStructure,
  ChatAdmissionController,
  type ChatAdmissionLease,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

function heavyBody() {
  const messages = Array.from({ length: 201 }, (_, i) => ({
    role: "user",
    content: `prompt ${i}`,
  }));
  const tools = Array.from({ length: 32 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, description: "a".repeat(64), parameters: { type: "object" } },
  }));
  return { model: "grok-4.5-fast-high", messages, tools, stream: true };
}

test("#10268: 2nd structurally-heavy agent request is rejected 503 (chat_admission_busy) under real heap pressure", async () => {
  const controller = new ChatAdmissionController(1);
  const first = await admitChatStructure(heavyBody(), null, { controller, queueMs: 0 });
  assert.equal(first.admit, true);
  const lease = (first as { admit: true; lease: ChatAdmissionLease | null }).lease;
  assert.ok(lease);
  try {
    const second = await admitChatStructure(heavyBody(), null, {
      controller,
      queueMs: 0,
      // Simulate genuine heap pressure (#10183/#10268 fix: shedding is now
      // conditional on this, not unconditional on capacity alone).
      heapPressureCheck: () => true,
    });
    assert.equal(second.admit, false); // reported failure path, still reachable under real pressure
    const res = (second as { admit: false; response: Response }).response;
    assert.equal(res.status, 503); // client is shown HTTP 503
    const body = await res.json();
    assert.equal(
      body.error?.message,
      "Local chat admission capacity is busy for this structurally heavy request; upstream provider routing was not attempted. Retry shortly."
    );
    assert.equal(body.error?.code, "chat_admission_busy");
    assert.equal(body.error?.reason, "structure_limit");
  } finally {
    lease.release();
  }
});

test("#10268: 2nd structurally-heavy agent request is admitted on a healthy heap (the fix)", async () => {
  const controller = new ChatAdmissionController(1);
  const first = await admitChatStructure(heavyBody(), null, { controller, queueMs: 0 });
  assert.equal(first.admit, true);
  const lease = (first as { admit: true; lease: ChatAdmissionLease | null }).lease;
  assert.ok(lease);
  try {
    const second = await admitChatStructure(heavyBody(), null, {
      controller,
      queueMs: 0,
      // No override: default heap probe reads live process stats (healthy here),
      // reproducing legitimate Hermes/Cursor fan-out traffic that must no longer
      // be shed on ample free RAM.
    });
    assert.equal(second.admit, true, "healthy heap must admit legitimate agent fan-out");
    if (second.admit) second.lease?.release();
  } finally {
    lease.release();
  }
});
