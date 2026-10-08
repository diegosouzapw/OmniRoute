import test from "node:test";
import assert from "node:assert/strict";

const { awaitReactiveModelSync, __resetReactiveModelSyncForTests, __setReactiveSyncFnForTests } =
  await import("../../src/lib/providerModels/reactiveModelSync.ts");

test("awaitReactiveModelSync successfully resolves true when sync succeeds", async () => {
  __resetReactiveModelSyncForTests();
  let syncCalled = false;
  __setReactiveSyncFnForTests(async (connectionId, provider) => {
    syncCalled = true;
    assert.equal(connectionId, "conn-test-1");
    assert.equal(provider, "antigravity");
    return true;
  });

  const result = await awaitReactiveModelSync("antigravity", "conn-test-1");
  assert.equal(result, true);
  assert.equal(syncCalled, true);
});

test("awaitReactiveModelSync returns false on unsupported provider", async () => {
  __resetReactiveModelSyncForTests();
  let syncCalled = false;
  __setReactiveSyncFnForTests(async () => {
    syncCalled = true;
    return true;
  });

  const result = await awaitReactiveModelSync("openai", "conn-test-1");
  assert.equal(result, false);
  assert.equal(syncCalled, false);
});

test("awaitReactiveModelSync returns false on cooldown", async () => {
  __resetReactiveModelSyncForTests();
  __setReactiveSyncFnForTests(async () => true);

  const first = await awaitReactiveModelSync("antigravity", "conn-test-2");
  assert.equal(first, true);

  // Immediate second call should hit cooldown and return false
  const second = await awaitReactiveModelSync("antigravity", "conn-test-2");
  assert.equal(second, false);
});

test("awaitReactiveModelSync honors timeout if sync hangs", async () => {
  __resetReactiveModelSyncForTests();
  __setReactiveSyncFnForTests(() => new Promise((resolve) => setTimeout(() => resolve(true), 500)));

  const result = await awaitReactiveModelSync("antigravity", "conn-test-3", 50);
  assert.equal(result, false);
});
