import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyPromptCacheAffinity,
  resolvePromptCacheAffinityKey,
} from "../../open-sse/services/combo/promptCacheAffinity.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

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
