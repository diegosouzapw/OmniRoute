// Per-model concurrency gate: generic, opt-in, per-connection.
// Same-connection + same-model requests serialize at the configured cap;
// different models gate independently; no map means unchanged behavior.
import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";

const semaphore = await import("../../open-sse/services/accountSemaphore.ts");
const helpers = await import("../../open-sse/handlers/chatCore/executorHelpers.ts");
const columns = await import("../../src/lib/db/providers/columns.ts");

const { acquireMany, buildModelSemaphoreKey, resetAll } = semaphore;
const {
  resolveModelSemaphoreKey,
  resolveModelSemaphoreMaxConcurrency,
  resolveAccountSemaphoreKey,
} = helpers;
const { normalizeModelConcurrencyMap } = columns;

afterEach(() => {
  resetAll();
});

function credsWithMap(map: unknown) {
  return { connectionId: "conn-1", modelConcurrency: map };
}

describe("resolveModelSemaphoreMaxConcurrency", () => {
  it("exact-matches the upstream model id", () => {
    const creds = credsWithMap({ "glm-5": 1, "glm-4.7": 3 });
    assert.equal(resolveModelSemaphoreMaxConcurrency(creds, "glm-5"), 1);
    assert.equal(resolveModelSemaphoreMaxConcurrency(creds, "glm-4.7"), 3);
  });

  it("fails open on missing, malformed, or non-positive data", () => {
    assert.equal(resolveModelSemaphoreMaxConcurrency(null, "glm-5"), null);
    assert.equal(resolveModelSemaphoreMaxConcurrency({}, "glm-5"), null);
    assert.equal(resolveModelSemaphoreMaxConcurrency({ modelConcurrency: null }, "glm-5"), null);
    assert.equal(resolveModelSemaphoreMaxConcurrency({ modelConcurrency: [] }, "glm-5"), null);
    assert.equal(
      resolveModelSemaphoreMaxConcurrency({ modelConcurrency: { "glm-5": 0 } }, "glm-5"),
      null
    );
    assert.equal(
      resolveModelSemaphoreMaxConcurrency({ modelConcurrency: { "glm-5": -2 } }, "glm-5"),
      null
    );
    assert.equal(
      resolveModelSemaphoreMaxConcurrency({ modelConcurrency: { other: 1 } }, "glm-5"),
      null
    );
    // A client-side provider/model alias is NOT the executor model id.
    assert.equal(
      resolveModelSemaphoreMaxConcurrency(credsWithMap({ "glm-5": 1 }), "zai/glm-5"),
      null
    );
  });
});

describe("resolveModelSemaphoreKey", () => {
  it("builds a collision-safe key scoped to provider+connection+model", () => {
    const creds = credsWithMap({ "glm-5": 1 });
    const key = resolveModelSemaphoreKey({
      provider: "zai",
      model: "glm-5",
      connectionId: "conn-1",
      credentials: creds,
    });
    assert.equal(key, "zai:conn-1:model:glm-5");
    assert.equal(
      key,
      buildModelSemaphoreKey({ provider: "zai", accountKey: "conn-1", model: "glm-5" })
    );
  });

  it("returns null when no cap applies, so chatCore adds no requirement", () => {
    assert.equal(
      resolveModelSemaphoreKey({
        provider: "zai",
        model: "glm-5",
        connectionId: "conn-1",
        credentials: { connectionId: "conn-1" },
      }),
      null
    );
    assert.equal(
      resolveModelSemaphoreKey({
        provider: null,
        model: "glm-5",
        connectionId: "conn-1",
        credentials: credsWithMap({ "glm-5": 1 }),
      }),
      null
    );
  });

  it("stays disjoint from the account gate key", () => {
    const creds = credsWithMap({ "glm-5": 1 });
    const accountKey = resolveAccountSemaphoreKey({
      provider: "zai",
      model: "glm-5",
      connectionId: "conn-1",
      credentials: creds,
    });
    const modelKey = resolveModelSemaphoreKey({
      provider: "zai",
      model: "glm-5",
      connectionId: "conn-1",
      credentials: creds,
    });
    assert.ok(accountKey && modelKey && accountKey !== modelKey);
  });
});

describe("normalizeModelConcurrencyMap (credential propagation, fail-open)", () => {
  it("keeps valid entries", () => {
    assert.deepEqual(normalizeModelConcurrencyMap({ "glm-5": 1, "glm-4.7": 3 }), {
      "glm-5": 1,
      "glm-4.7": 3,
    });
  });

  it("drops malformed entries and collapses to null when empty", () => {
    assert.equal(normalizeModelConcurrencyMap(null), null);
    assert.equal(normalizeModelConcurrencyMap("nope"), null);
    assert.equal(normalizeModelConcurrencyMap({ "glm-5": 0, bad: -1 }), null);
    assert.deepEqual(normalizeModelConcurrencyMap({ "glm-5": 2, bad: 0 }), { "glm-5": 2 });
  });
});

describe("composite gate behavior", () => {
  it("serializes same connection + same model at cap 1", async () => {
    const key = buildModelSemaphoreKey({ provider: "z", accountKey: "c1", model: "glm-5" });
    const first = await acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 1000 });
    let secondAcquired = false;
    const second = acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 1000 }).then(
      (release) => {
        secondAcquired = true;
        return release;
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(secondAcquired, false);
    first();
    const releaseSecond = await second;
    assert.equal(secondAcquired, true);
    releaseSecond();
  });

  it("keeps sibling-model gates independent while the shared account cap still binds", async () => {
    const accountKey = "z:c1";
    const modelA = buildModelSemaphoreKey({ provider: "z", accountKey: "c1", model: "a" });
    const modelB = buildModelSemaphoreKey({ provider: "z", accountKey: "c1", model: "b" });
    const holdA = await acquireMany(
      [
        { key: accountKey, maxConcurrency: 1 },
        { key: modelA, maxConcurrency: 1 },
      ],
      { timeoutMs: 1000 }
    );
    // Model B's own gate is free, but the shared account gate (cap 1) blocks it.
    await assert.rejects(
      () =>
        acquireMany(
          [
            { key: accountKey, maxConcurrency: 1 },
            { key: modelB, maxConcurrency: 5 },
          ],
          { timeoutMs: 40 }
        ),
      (error: unknown) =>
        error instanceof Error && (error as { code?: string }).code === "SEMAPHORE_TIMEOUT"
    );
    holdA();
    // After release, model B acquires.
    const holdB = await acquireMany(
      [
        { key: accountKey, maxConcurrency: 1 },
        { key: modelB, maxConcurrency: 5 },
      ],
      { timeoutMs: 1000 }
    );
    holdB();
  });

  it("no model map means only the existing gates apply", async () => {
    const accountKey = "z:c2";
    const hold = await acquireMany([{ key: accountKey, maxConcurrency: 1 }], {
      timeoutMs: 1000,
    });
    hold();
    const again = await acquireMany([{ key: accountKey, maxConcurrency: 1 }], {
      timeoutMs: 1000,
    });
    again();
  });

  it("releases the model slot on failure paths without leaking", async () => {
    const key = buildModelSemaphoreKey({ provider: "z", accountKey: "c3", model: "glm-5" });
    const release = await acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 1000 });
    release();
    release(); // idempotent — second call is a no-op
    const stats = semaphore.getStats();
    // Re-acquire must succeed immediately; a leaked slot would time out.
    const reacquire = await acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 200 });
    reacquire();
    assert.ok(stats[key] === undefined || stats[key].running <= 1);
  });

  it("queue timeout and abort stay bounded with no unhandled rejections", async () => {
    const key = buildModelSemaphoreKey({ provider: "z", accountKey: "c4", model: "glm-5" });
    const hold = await acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 1000 });
    await assert.rejects(() => acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 30 }), {
      name: "Error",
    });
    const controller = new AbortController();
    const pending = acquireMany([{ key, maxConcurrency: 1 }], {
      timeoutMs: 5000,
      signal: controller.signal,
    });
    controller.abort(new Error("test abort"));
    await assert.rejects(() => pending, /test abort/);
    await assert.rejects(
      () => acquireMany([{ key, maxConcurrency: 1 }], { timeoutMs: 1000, maxQueueSize: 1 }),
      (error: unknown) =>
        error instanceof Error &&
        ["SEMAPHORE_QUEUE_FULL", "SEMAPHORE_TIMEOUT"].includes(
          (error as { code?: string }).code ?? ""
        )
    );
    hold();
  });
});
