import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getExecutorTimeoutMs,
  resolveConnectionTimeoutMs,
  executeWithUpstreamStartTimeout,
} from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { resolveTargetTimeoutMsForTarget } from "../../open-sse/services/combo.ts";

const GLOBAL = 600_000;

function fakeExecutor(timeoutMs?: number) {
  return { getTimeoutMs: () => timeoutMs ?? GLOBAL };
}

test("resolveConnectionTimeoutMs: returns floored integer for valid values", () => {
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: 1_800_000.9 }), 1_800_000);
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: 1 }), 1);
});

test("resolveConnectionTimeoutMs: undefined for absent/invalid values", () => {
  assert.equal(resolveConnectionTimeoutMs(undefined), undefined);
  assert.equal(resolveConnectionTimeoutMs(null), undefined);
  assert.equal(resolveConnectionTimeoutMs({}), undefined);
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: 0 }), undefined);
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: -5 }), undefined);
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: "60000" }), undefined);
  assert.equal(resolveConnectionTimeoutMs({ timeoutMs: 86_400_001 }), undefined);
});

test("getExecutorTimeoutMs: connection tier preempts model, provider and global", () => {
  const executor = fakeExecutor(30_000);
  // model override present (registry) + provider override + connection:
  // connection wins
  assert.equal(getExecutorTimeoutMs(executor, "openai", "gpt-5", 1_800_000), 1_800_000);
});

test("getExecutorTimeoutMs: invalid connection timeout falls through to model/provider/global", () => {
  const executor = fakeExecutor(30_000);
  assert.equal(getExecutorTimeoutMs(executor, "openai", "gpt-5", 0), 30_000);
  assert.equal(getExecutorTimeoutMs(executor, "openai", "gpt-5", undefined), 30_000);
  assert.equal(getExecutorTimeoutMs(fakeExecutor(), undefined, undefined, undefined), GLOBAL);
});

test("executeWithUpstreamStartTimeout: connection timeout aborts before the global", async () => {
  let signalAbortedAt = Number.POSITIVE_INFINITY;
  const started = Date.now();
  const result = await executeWithUpstreamStartTimeout({
    executor: fakeExecutor(600_000),
    provider: "openai",
    model: "gpt-5",
    connectionTimeoutMs: 50,
    signal: new AbortController().signal,
    log: null,
    execute: (signal) =>
      new Promise((resolve) => {
        signal.addEventListener("abort", () => {
          signalAbortedAt = Date.now() - started;
          resolve("aborted");
        });
      }),
  });
  assert.equal(result, "aborted");
  assert.ok(signalAbortedAt < 1_000, `aborted at ${signalAbortedAt}ms, expected < 1000ms`);
});
test("connection timeout extraction matches execCreds.providerSpecificData shape", () => {
  const execCreds = { providerSpecificData: { timeoutMs: 1_800_000, someOtherKey: 1 } };
  assert.equal(resolveConnectionTimeoutMs(execCreds?.providerSpecificData), 1_800_000);
  assert.equal(
    resolveConnectionTimeoutMs({ providerSpecificData: undefined }?.providerSpecificData),
    undefined
  );
});

test("resolveTargetTimeoutMsForTarget: undefined without connectionId", async () => {
  const result = await resolveTargetTimeoutMsForTarget(
    null,
    "fallback",
    { enabled: false, budgetMs: 0 },
    {
      kind: "model",
      stepId: "s",
      executionKey: "k",
      modelStr: "m",
      provider: "p",
      providerId: null,
      connectionId: null,
      weight: 1,
      label: null,
    }
  );
  assert.equal(result, undefined);
});

test("resolveTargetTimeoutMsForTarget: unknown connection -> undefined", async () => {
  const result = await resolveTargetTimeoutMsForTarget(
    null,
    "fallback",
    { enabled: false, budgetMs: 0 },
    {
      kind: "model",
      stepId: "s",
      executionKey: "k",
      modelStr: "m",
      provider: "p",
      providerId: null,
      connectionId: "conn-does-not-exist",
      weight: 1,
      label: null,
    }
  );
  assert.equal(result, undefined);
});

test("resolveTargetTimeoutMsForTarget: connection without timeoutMs -> undefined", async () => {
  const result = await resolveTargetTimeoutMsForTarget(
    null,
    "fallback",
    { enabled: false, budgetMs: 0 },
    {
      kind: "model",
      stepId: "s",
      executionKey: "k",
      modelStr: "m",
      provider: "p",
      providerId: null,
      connectionId: "conn-no-timeout",
      weight: 1,
      label: null,
    }
  );
  assert.equal(result, undefined);
});
