/**
 * Queued requests keep the async context of the caller that scheduled them.
 *
 * Bug: Bottleneck invokes a queued job in the async context of whichever job
 * frees the slot, so a queued request saw the context (ALS store) of the
 * request ahead of it (B saw A at job start and after await).
 * Repro: three callers (A, B, C) through one limiter with maxConcurrent 1;
 * each job reads its own store value at start and again after an await.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";

import * as rateLimitManager from "../../open-sse/services/rateLimitManager.ts";

const store = new AsyncLocalStorage<string>();

function readAfterTick(): Promise<string | undefined> {
  return new Promise((resolve) => {
    setImmediate(() => resolve(store.getStore()));
  });
}

test("queued jobs see their own async context, not the slot-freer's", async (t) => {
  const conn = "queue-context-conn";
  rateLimitManager.enableRateLimitProtection(conn);
  rateLimitManager.refreshConnectionRateLimits(conn, { maxConcurrent: 1 });
  t.after(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
  });

  let releaseA: (() => void) | null = null;
  const gateA = new Promise<void>((resolve) => {
    releaseA = resolve;
  });

  async function job(label: string) {
    const atStart = store.getStore();
    const afterAwait = await readAfterTick();
    return { atStart, afterAwait, label };
  }

  let pB;
  let pC;
  try {
    const pA = store.run("A", () =>
      rateLimitManager.withRateLimit("openai", conn, null, () =>
        gateA.then(() => job("A"))
      )
    );

    // Wait until A holds the only slot before queueing B and C.
    for (let i = 0; i < 200; i++) {
      const state = await rateLimitManager.__getLimiterStateForTests("openai", conn, null);
      if (state && state.running + state.executing >= 1) break;
      await new Promise((r) => setTimeout(r, 5));
    }

    pB = store.run("B", () =>
      rateLimitManager.withRateLimit("openai", conn, null, () => job("B"), null, 10_000)
    );
    pC = store.run("C", () =>
      rateLimitManager.withRateLimit("openai", conn, null, () => job("C"), null, 10_000)
    );

    // Let B and C park in QUEUED, then release A.
    await new Promise((r) => setTimeout(r, 50));
    releaseA!();

    const [rA, rB, rC] = await Promise.all([pA, pB, pC]);
    assert.equal(rA.atStart, "A");
    assert.equal(rA.afterAwait, "A");
    assert.equal(rB.atStart, "B", `B saw ${rB.atStart} at job start (expected B)`);
    assert.equal(rB.afterAwait, "B", `B saw ${rB.afterAwait} after await (expected B)`);
    assert.equal(rC.atStart, "C", `C saw ${rC.atStart} at job start (expected C)`);
    assert.equal(rC.afterAwait, "C", `C saw ${rC.afterAwait} after await (expected C)`);
  } finally {
    releaseA?.();
    await Promise.allSettled([pB, pC].filter(Boolean));
    await rateLimitManager.__resetRateLimitManagerForTests();
  }
});

test("a job scheduled outside any context sees no store", async (t) => {
  const conn = "queue-context-no-store-conn";
  rateLimitManager.enableRateLimitProtection(conn);
  t.after(async () => {
    await rateLimitManager.__resetRateLimitManagerForTests();
  });

  try {
    const seen = await rateLimitManager.withRateLimit(
      "openai",
      conn,
      null,
      async () => ({ atStart: store.getStore(), afterAwait: await readAfterTick() }),
      null,
      10_000
    );
    assert.equal(seen.atStart, undefined);
    assert.equal(seen.afterAwait, undefined);
  } finally {
    await rateLimitManager.__resetRateLimitManagerForTests();
  }
});
