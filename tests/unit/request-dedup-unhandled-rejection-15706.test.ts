import test from "node:test";
import assert from "node:assert/strict";

import { deduplicate, clearInflight } from "../../open-sse/services/requestDedup.ts";

test("#15706: leader failure with no joiners must not raise an unhandledRejection", async () => {
  clearInflight();
  const seen: unknown[] = [];
  const saved = process.listeners("unhandledRejection");
  process.removeAllListeners("unhandledRejection");
  const onUnhandled = (reason: unknown) => seen.push(reason);
  process.on("unhandledRejection", onUnhandled);
  try {
    const err = Object.assign(new Error("queue budget exceeded"), {
      code: "RATE_LIMIT_QUEUE_TIMEOUT",
      status: 503,
    });
    await assert.rejects(
      deduplicate("hash-15706", async () => {
        throw err;
      }),
      (e: unknown) => e === err
    );
    // unhandledRejection is emitted after the microtask queue drains / on process tick
    await new Promise((r) => setTimeout(r, 50));
    assert.equal(
      seen.length,
      0,
      `unhandledRejection raised: ${String((seen[0] as Error)?.message)}`
    );
  } finally {
    process.removeListener("unhandledRejection", onUnhandled);
    for (const l of saved) process.on("unhandledRejection", l as never);
    clearInflight();
  }
});

test("#15706: joiner still observes the leader's failure", async () => {
  clearInflight();
  let rejectFn!: (e: unknown) => void;
  const gate = new Promise<void>((_, rej) => (rejectFn = rej));
  const leader = deduplicate("hash-15706b", () => gate as Promise<string>);
  const joiner = deduplicate("hash-15706b", async () => "never");
  rejectFn(new Error("boom"));
  await assert.rejects(leader, /boom/);
  await assert.rejects(joiner, /boom/);
  clearInflight();
});
