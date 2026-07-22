import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyPromptCacheAffinity,
  calculatePromptCacheAffinityScores,
  expandPromptCacheAffinityTargetsFromConnections,
  promptCacheTargetIdentity,
  resolvePromptCacheAffinityKey,
} from "../../open-sse/services/combo/promptCacheAffinity.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";
import { applyStrategyOrdering } from "../../open-sse/services/combo/applyStrategyOrdering.ts";

function target(
  executionKey: string,
  connectionId: string,
  modelStr = "codex/gpt-5"
): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: executionKey,
    executionKey,
    modelStr,
    provider: "codex",
    providerId: connectionId,
    connectionId,
    weight: 1,
    label: null,
  };
}

test("uses explicit prompt_cache_key and never exposes it in the fingerprint", () => {
  const body = { prompt_cache_key: "private-cache-key" };
  const resolution = resolvePromptCacheAffinityKey(body);
  assert.equal(resolution?.source, "explicit");
  assert.notEqual(resolution?.fingerprint, body.prompt_cache_key);
  assert.equal(resolution?.fingerprint?.length, 12);
});

test("derives a stable key from Responses input when explicit key is absent", () => {
  const first = resolvePromptCacheAffinityKey({
    input: [
      { role: "system", content: "tools" },
      { role: "user", content: "hello" },
    ],
  });
  const second = resolvePromptCacheAffinityKey({
    input: [
      { role: "system", content: "tools" },
      { role: "user", content: "hello" },
    ],
  });
  assert.equal(first?.source, "prefix");
  assert.deepEqual(first, second);
});

test("rendezvous ordering is deterministic and distinguishes same-model accounts", () => {
  const targets = [target("step-a", "account-a"), target("step-b", "account-b")];
  const body = { prompt_cache_key: "stable" };
  const first = applyPromptCacheAffinity(targets, body);
  const second = applyPromptCacheAffinity([...targets].reverse(), body);
  assert.deepEqual(
    first.targets.map((item) => item.connectionId),
    second.targets.map((item) => item.connectionId)
  );
  assert.equal(first.applied, true);
});

test("disabled affinity and missing keys preserve the eligible order", () => {
  const targets = [target("step-a", "account-a"), target("step-b", "account-b")];
  assert.deepEqual(
    applyPromptCacheAffinity(targets, { input: [{ role: "user", content: "hello" }] }, true)
      .targets,
    targets
  );
  assert.deepEqual(
    applyPromptCacheAffinity([...targets], { prompt_cache_key: "stable" }, false).targets,
    targets
  );
});

test("auto scoring assigns the cache winner to exactly one account", () => {
  const targets = [target("step-a", "account-a"), target("step-b", "account-b")];
  const scores = calculatePromptCacheAffinityScores(targets, {
    prompt_cache_key: "stable-auto-key",
  });
  assert.equal(scores.size, 2);
  assert.equal(
    targets.reduce((sum, item) => sum + (scores.get(promptCacheTargetIdentity(item)) ?? 0), 0),
    1
  );
});

test("expands unbound targets to active allowed accounts before cache routing", () => {
  const unbound = { ...target("step-a", ""), connectionId: null };
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [{ ...unbound, allowedConnectionIds: ["account-b"] }],
    new Map([["codex", [{ id: "account-a" }, { id: "account-b" }, { id: "account-c" }]]])
  );
  assert.deepEqual(
    expanded.map((item) => item.connectionId),
    ["account-b"]
  );
  assert.equal(expanded[0].executionKey, "step-a@account-b");
});

test("expanded auto candidates receive exactly one concrete account cache score", () => {
  const unbound = { ...target("step-a", ""), connectionId: null };
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    [unbound],
    new Map([["codex", [{ id: "account-a" }, { id: "account-b" }]]])
  );
  const scores = calculatePromptCacheAffinityScores(expanded, {
    prompt_cache_key: "expanded-auto-key",
  });
  assert.equal(
    expanded.reduce((sum, item) => sum + (scores.get(promptCacheTargetIdentity(item)) ?? 0), 0),
    1
  );
  assert.ok(expanded.every((item) => item.connectionId));
});

test("cache-optimized strategy routes a stable prompt key to the same account", async () => {
  const targets = [target("step-a", "account-a"), target("step-b", "account-b")];
  const deps = {
    combo: { id: "cache-combo", name: "cache-combo" },
    config: {},
    body: { prompt_cache_key: "stable-strategy-key" },
    log: { info() {}, warn() {} },
    apiKeyAllowedConnections: null,
  };
  const first = await applyStrategyOrdering("cache-optimized", targets, deps);
  const second = await applyStrategyOrdering("cache-optimized", [...targets].reverse(), deps);
  assert.equal(first[0].connectionId, second[0].connectionId);
});
