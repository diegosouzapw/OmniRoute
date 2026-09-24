/**
 * markRateLimited() used to call getGate() without a limit, and getGate() writes its
 * argument into gate.max — so a round-robin target configured for 1 concurrent request
 * was reset to the default of 3 by its first transient error, and the drain after the
 * cooldown released three queued requests at a target that had just returned 429.
 */
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  acquire,
  getStats,
  markRateLimited,
  resetAll,
} from "../../open-sse/services/rateLimitSemaphore.ts";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

afterEach(() => {
  resetAll();
});

describe("rateLimitSemaphore cooldown keeps the configured limit", () => {
  it("drains a limit-1 gate one request at a time after the cooldown", async () => {
    const model = "combo:rr:glm/glm-4.6";
    const opts = { maxConcurrency: 1, timeoutMs: 1000 };

    const releaseFirst = await acquire(model, opts);
    const queued = [
      acquire(model, opts).catch(() => null),
      acquire(model, opts).catch(() => null),
      acquire(model, opts).catch(() => null),
    ];
    await wait(5);

    markRateLimited(model, 20);
    assert.equal(getStats()[model].max, 1);

    releaseFirst();
    await wait(120);

    const stats = getStats()[model];
    assert.equal(stats.max, 1);
    assert.equal(stats.running, 1);
    assert.equal(stats.queued, 2);

    resetAll();
    await Promise.all(queued);
  });

  it("keeps a limit above the default", async () => {
    const model = "combo:rr:openai/gpt-5";

    const release = await acquire(model, { maxConcurrency: 8 });
    markRateLimited(model, 20);

    assert.equal(getStats()[model].max, 8);
    release();
  });

  it("still gives an untracked model the default limit", () => {
    const model = "combo:rr:untracked/model";

    markRateLimited(model, 20);

    assert.equal(getStats()[model].max, 3);
  });
});
