/**
 * Reactive model sync — a model-not-found 404 on a discovery-capable provider
 * kicks a discovery sync for that connection so freshly shipped upstream
 * models land in the synced catalog (pinned-catalog staleness self-heal).
 * Guardrails under test: provider allow-list, per-connection cooldown,
 * in-flight dedup.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

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

test("test 13: claude/codex/github do not trigger reactive sync", () => {
  __resetReactiveModelSyncForTests();
  const calls = installCountingSync();
  assert.equal(maybeTriggerReactiveModelSync("claude", "conn-claude"), false);
  assert.equal(maybeTriggerReactiveModelSync("codex", "conn-codex"), false);
  assert.equal(maybeTriggerReactiveModelSync("github", "conn-github"), false);
  assert.equal(calls.length, 0);
});

test("test 13: antigravity executor still calls maybeTriggerReactiveModelSync", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "open-sse/executors/antigravity/executeAttempt.ts"),
    "utf8",
  );
  assert.match(src, /maybeTriggerReactiveModelSync\(\s*provider,\s*credentials\.connectionId\s*\)/);
});

test("test 14: claude live non-200 uses catalog fallback, not empty 502", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/providers/[id]/models/route.ts"),
    "utf8",
  );
  // Task 2 deleted the claude static early return. Claude is a
  // PROVIDER_MODELS_CONFIG live provider and must land in generic live.
  assert.doesNotMatch(
    src,
    /if\s*\(\s*provider\s*===\s*"claude"\s*\)[\s\S]{0,400}getStaticModelsForProvider\(\s*"claude"/,
  );
  const assembleIdx = src.lastIndexOf("assembleProviderModelsHeaders");
  assert.ok(assembleIdx >= 0, "generic live must assemble provider-models headers");
  const tail = src.slice(assembleIdx);
  // Generic live 401/non-200: warning + cached/local catalog, not a 502 empty body.
  assert.match(
    tail,
    /if\s*\(\s*!response\.ok\s*\)[\s\S]{0,400}buildDiscoveryFallbackResponse\(\s*\)/,
  );
  assert.doesNotMatch(
    tail,
    /if\s*\(\s*!response\.ok\s*\)[\s\S]{0,500}status:\s*502/,
  );
});
