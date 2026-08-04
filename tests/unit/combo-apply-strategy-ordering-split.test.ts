import { test, after } from "node:test";
import assert from "node:assert/strict";

import { applyStrategyOrdering } from "@omniroute/open-sse/services/combo/applyStrategyOrdering.ts";
import { resetDbInstance } from "@/lib/db/core.ts";

// Split guard for Block J Task 3: the non-`auto` strategy-ordering chain
// (lkgp / strict-random / random / fill-first / p2c / ... / quota-share) was
// extracted verbatim into applyStrategyOrdering. These tests pin the exits that
// need no DB/deck state (random / fill-first / unknown); the DB-backed branches
// (lkgp, reset-*, quota-share) are covered end-to-end by the 47 consumer tests
// (router-strategies / combo-strategy-fallbacks / rr-session-stickiness).

after(() => {
  // some branches (lkgp/quota-share) may touch the DB singleton; release handles.
  resetDbInstance();
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

const target = (provider: string, modelStr: string): never =>
  ({
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  }) as never;

const deps = () =>
  ({
    combo: { id: "c1", name: "c1", config: {} },
    config: {},
    body: { messages: [] },
    log: noopLog,
    apiKeyAllowedConnections: null,
  }) as never;

const keys = (arr: Array<{ executionKey: string }>) => arr.map((t) => t.executionKey).sort();

test("exports applyStrategyOrdering", () => {
  assert.equal(typeof applyStrategyOrdering, "function");
});

test("unknown strategy -> input order unchanged (same reference contents)", async () => {
  const input = [target("openai", "gpt-4o"), target("anthropic", "claude-3")];
  const out = await applyStrategyOrdering("no-such-strategy", input, deps());
  assert.deepEqual(
    out.map((t: { executionKey: string }) => t.executionKey),
    ["openai>gpt-4o", "anthropic>claude-3"]
  );
});

test("fill-first -> preserves priority order", async () => {
  const input = [target("a", "m1"), target("b", "m2"), target("c", "m3")];
  const out = await applyStrategyOrdering("fill-first", input, deps());
  assert.deepEqual(
    out.map((t: { executionKey: string }) => t.executionKey),
    ["a>m1", "b>m2", "c>m3"]
  );
});

test("random -> same multiset of targets (a permutation)", async () => {
  const input = [target("a", "m1"), target("b", "m2"), target("c", "m3")];
  const out = await applyStrategyOrdering("random", input, deps());
  assert.equal(out.length, 3);
  assert.deepEqual(keys(out), keys(input));
});
