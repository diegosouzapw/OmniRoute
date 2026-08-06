import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FairCostQueue, type QueueEntry } from "../../open-sse/services/admission/queue.ts";

describe("FairCostQueue removeById cursor preservation", () => {
  function qEntry(id: string, tenantKey: string, cost = 1): QueueEntry<{ id: string }> {
    return {
      id,
      tenantKey,
      cost,
      enqueuedAtMs: 0,
      deadlineMs: Number.MAX_SAFE_INTEGER,
      payload: { id },
    };
  }

  it("preserves the logical successor when removing a bucket before the cursor", () => {
    const q = new FairCostQueue<{ id: string }>(10, 100);
    assert.equal(q.enqueue(qEntry("a1", "a")), true);
    assert.equal(q.enqueue(qEntry("a2", "a")), true);
    assert.equal(q.enqueue(qEntry("b1", "b")), true);
    assert.equal(q.enqueue(qEntry("c1", "c")), true);

    // Dequeue a1 leaves cursor at b while tenant a still has a2.
    assert.equal(q.dequeue()?.id, "a1");
    assert.equal(q.removeById("a2")?.id, "a2");
    // Successor of the pre-removal cursor must remain b, not skip to c.
    assert.equal(q.dequeue()?.id, "b1");
    assert.equal(q.dequeue()?.id, "c1");
    assert.equal(q.size, 0);
  });

  it("preserves the logical successor when removing the bucket at the cursor", () => {
    const q = new FairCostQueue<{ id: string }>(10, 100);
    assert.equal(q.enqueue(qEntry("a1", "a")), true);
    assert.equal(q.enqueue(qEntry("b1", "b")), true);
    assert.equal(q.enqueue(qEntry("c1", "c")), true);

    assert.equal(q.dequeue()?.id, "a1"); // cursor now at b
    assert.equal(q.removeById("b1")?.id, "b1");
    assert.equal(q.dequeue()?.id, "c1");
    assert.equal(q.size, 0);
  });

  it("preserves the cursor when removing a bucket after the cursor", () => {
    const q = new FairCostQueue<{ id: string }>(10, 100);
    assert.equal(q.enqueue(qEntry("a1", "a")), true);
    assert.equal(q.enqueue(qEntry("b1", "b")), true);
    assert.equal(q.enqueue(qEntry("c1", "c")), true);

    assert.equal(q.dequeue()?.id, "a1"); // cursor now at b
    assert.equal(q.removeById("c1")?.id, "c1");
    assert.equal(q.dequeue()?.id, "b1");
    assert.equal(q.size, 0);
  });

  it("resets the cursor when the final bucket is removed", () => {
    const q = new FairCostQueue<{ id: string }>(10, 100);
    assert.equal(q.enqueue(qEntry("a1", "a")), true);
    assert.equal(q.enqueue(qEntry("b1", "b")), true);
    assert.equal(q.dequeue()?.id, "a1"); // cursor at b
    assert.equal(q.removeById("b1")?.id, "b1");
    assert.equal(q.size, 0);
    assert.equal(q.enqueue(qEntry("d1", "d")), true);
    assert.equal(q.dequeue()?.id, "d1");
  });
});
