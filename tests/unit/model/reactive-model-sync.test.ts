/**
 * Reactive model sync — a model-not-found 404 on a discovery-capable provider
 * kicks a discovery sync for that connection so freshly shipped upstream
 * models land in the synced catalog (pinned-catalog staleness self-heal).
 * Guardrails under test: provider allow-list, per-connection cooldown,
 * in-flight dedup.
 */

import test from "node:test";
import assert from "node:assert/strict";

const {
  maybeTriggerReactiveModelSync,
  __resetReactiveModelSyncForTests,
  __setReactiveSyncFnForTests,
} = await import("../../../src/lib/providerModels/reactiveModelSync.ts");

type SyncCall = { connectionId: string; provider: string; baseUrl: string };

function installCountingSync() {
  const calls: SyncCall[] = [];
  __setReactiveSyncFnForTests(async (connectionId, provider, baseUrl) => {
    calls.push({ connectionId, provider, baseUrl });
    return true;
  });
  return calls;
}

function flushMicrotasks(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

test("allowed provider triggers a discovery sync with the right arguments", async () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();

  const triggered = maybeTriggerReactiveModelSync("antigravity", "conn-aaa-111");
  assert.equal(triggered, true);
  await flushMicrotasks();

  assert.equal(calls.length, 1);
  assert.equal(calls[0].connectionId, "conn-aaa-111");
  assert.equal(calls[0].provider, "antigravity");
  assert.equal(typeof calls[0].baseUrl, "string");
});

test("agy provider id is also allowed and normalized", async () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();

  assert.equal(maybeTriggerReactiveModelSync("AGY ", "conn-bbb-222"), true);
  await flushMicrotasks();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].provider, "agy");
});

test("providers without discovery support never trigger", async () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();

  assert.equal(maybeTriggerReactiveModelSync("openai", "conn-ccc-333"), false);
  assert.equal(maybeTriggerReactiveModelSync("", "conn-ccc-333"), false);
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "  "), false);
  await flushMicrotasks();
  assert.equal(calls.length, 0);
});

test("second trigger inside the cooldown window is a no-op", async () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();

  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-ddd-444"), true);
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-ddd-444"), false);
  await flushMicrotasks();
  assert.equal(calls.length, 1);
});

test("cooldown is per connection — a different connection still triggers", async () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();

  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-eee-555"), true);
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-fff-666"), true);
  await flushMicrotasks();
  assert.equal(calls.length, 2);
});

test("trigger is allowed again once the cooldown expires", async () => {
  __resetReactiveModelSyncForTests(1); // 1ms cooldown
  const calls = installCountingSync();

  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-ggg-777"), true);
  await flushMicrotasks();
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-ggg-777"), true);
  await flushMicrotasks();
  assert.equal(calls.length, 2);
});

test("in-flight dedup: concurrent triggers collapse into one sync", async () => {
  __resetReactiveModelSyncForTests();
  let releaseSync: ((value: boolean) => void) | null = null;
  const calls: SyncCall[] = [];
  __setReactiveSyncFnForTests(
    (connectionId, provider, baseUrl) =>
      new Promise<boolean>((resolve) => {
        calls.push({ connectionId, provider, baseUrl });
        releaseSync = resolve;
      })
  );

  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-hhh-888"), true);
  // First sync still pending — the second trigger must be dropped, not queued.
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-hhh-888"), false);
  assert.equal(calls.length, 1);

  assert.ok(releaseSync);
  releaseSync(true);
  await flushMicrotasks();
  assert.equal(calls.length, 1);
});

test("a sync failure does not break subsequent triggers after cooldown", async () => {
  __resetReactiveModelSyncForTests(1);
  let attempts = 0;
  __setReactiveSyncFnForTests(async () => {
    attempts += 1;
    return false; // sync endpoint reported failure
  });

  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-iii-999"), true);
  await flushMicrotasks();
  await new Promise((resolve) => setTimeout(resolve, 5));
  assert.equal(maybeTriggerReactiveModelSync("antigravity", "conn-iii-999"), true);
  await flushMicrotasks();
  assert.equal(attempts, 2);
});

test("cleanup restores the default loopback sync implementation", () => {
  __setReactiveSyncFnForTests(null);
  __resetReactiveModelSyncForTests();
  assert.ok(true);
});
