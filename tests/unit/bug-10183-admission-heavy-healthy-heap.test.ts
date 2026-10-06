// #10183: regression 3.8.48 → 3.8.49 — chat admission rejected a second concurrent
// "heavy" request even on a healthy heap. `admitChatStructure`'s CHAT_MAX_HEAVY_IN_FLIGHT=1
// cap (#9654/#9940) sheds unconditionally once busy; this test proves shedding must be
// gated on real heap pressure (restoring 3.8.48's `heapUsed/heapLimit >= shedRatio`
// semantics) instead of firing regardless of free memory.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ChatAdmissionController,
  admitChatStructure,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

function heavyBody() {
  return {
    messages: Array.from({ length: 200 }, () => ({
      role: "user",
      content: "x".repeat(400),
    })),
    tools: [] as unknown[],
  };
}

test("bug-10183: second concurrent heavy request admitted on a healthy heap", async () => {
  const controller = new ChatAdmissionController(1); // default CHAT_MAX_HEAVY_IN_FLIGHT=1
  const first = await admitChatStructure(heavyBody(), null, { controller });
  assert.equal(first.admit, true);
  assert.ok(first.admit && first.lease, "first heavy request should hold the lease");

  try {
    const second = await admitChatStructure(heavyBody(), null, {
      controller,
      queueMs: 50,
      // No override: default heap probe reads live process stats, which are
      // healthy in the test process — proves the fix without mocking away the
      // real check.
    });
    assert.equal(second.admit, true, "healthy heap must not shed a 2nd heavy request");
    if (second.admit) second.lease?.release();
  } finally {
    if (first.admit) first.lease?.release();
  }
});

test("bug-10183: a genuinely pressured heap still sheds the 2nd heavy request", async () => {
  const controller = new ChatAdmissionController(1);
  const first = await admitChatStructure(heavyBody(), null, { controller });
  assert.equal(first.admit, true);
  assert.ok(first.admit && first.lease);

  try {
    const second = await admitChatStructure(heavyBody(), null, {
      controller,
      queueMs: 0,
      heapPressureCheck: () => true, // simulate real heap pressure
    });
    assert.equal(second.admit, false, "real heap pressure must still shed the 2nd request");
    if (!second.admit) {
      assert.equal(second.response.status, 503);
      const payload = await second.response.json();
      assert.equal(payload.error.code, "chat_admission_busy");
      assert.equal(payload.error.reason, "structure_limit");
    }
  } finally {
    if (first.admit) first.lease?.release();
  }
});
