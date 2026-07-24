import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargetsFromConnections,
  shouldProtectOriginalFirst,
} from "../../open-sse/services/combo/promptCacheAffinity.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

// #8370: a `priority` combo declares an explicit, operator-chosen model order.
// Cross-model prompt-cache affinity (a global rendezvous-hash sort over the
// fully expanded, model-blind target list) was silently reordering that
// declaration, letting a lower-priority model's single account jump ahead of
// every account belonging to the highest-priority model. This file is the
// permanent regression guard for that fix (`shouldProtectOriginalFirst` in
// `open-sse/services/combo/promptCacheAffinity.ts`, wired into
// `open-sse/services/combo.ts`'s `protectedOriginal` gate).

function modelTarget(
  stepId: string,
  modelStr: string,
  provider: string,
  allowedConnectionIds?: string[]
): ResolvedComboTarget {
  return {
    kind: "model",
    stepId,
    executionKey: stepId,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
    ...(allowedConnectionIds ? { allowedConnectionIds } : {}),
  } as ResolvedComboTarget;
}

// Mirrors combo.ts's exact application of the fix: expand model-level targets
// to concrete accounts, run affinity, then re-pin the strategy's declared
// first target ahead of the affinity-sorted list when the strategy warrants it.
function applyComboLikeAffinityPin(
  orderedTargets: ResolvedComboTarget[],
  connectionsByProvider: Map<string, Array<Record<string, unknown>>>,
  body: Record<string, unknown>,
  strategy: string
): ResolvedComboTarget[] {
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    orderedTargets,
    connectionsByProvider
  );
  const affinity = applyPromptCacheAffinity(expanded, body, true);
  if (!affinity.applied) return affinity.targets;

  const protectedOriginal = shouldProtectOriginalFirst(false, false, strategy) && orderedTargets[0];

  const protectedFirst = protectedOriginal
    ? (affinity.targets.find(
        (target) =>
          target === protectedOriginal ||
          target.executionKey === protectedOriginal.executionKey ||
          target.executionKey.startsWith(`${protectedOriginal.executionKey}@`)
      ) ?? protectedOriginal)
    : null;

  return protectedFirst
    ? [protectedFirst, ...affinity.targets.filter((target) => target !== protectedFirst)]
    : affinity.targets;
}

function buildCrossModelScenario() {
  // Model A (priority 1) has 5 accounts; models B and C (priority 2/3) have 1 each —
  // mirrors the issue's reported 3-models-expanded-to-N-accounts shape.
  const orderedTargets = [
    modelTarget("step-a", "antigravity/gemini-3-pro", "antigravity"),
    modelTarget("step-b", "ollamacloud/minimax-m3", "ollamacloud"),
    modelTarget("step-c", "oc/deepseek-v4", "oc"),
  ];
  const connectionsByProvider = new Map<string, Array<Record<string, unknown>>>([
    [
      "antigravity",
      [
        { id: "antigravity-acct-1" },
        { id: "antigravity-acct-2" },
        { id: "antigravity-acct-3" },
        { id: "antigravity-acct-4" },
        { id: "antigravity-acct-5" },
      ],
    ],
    ["ollamacloud", [{ id: "minimax-acct-1" }]],
    ["oc", [{ id: "deepseek-acct-1" }]],
  ]);
  return { orderedTargets, connectionsByProvider };
}

// Brute-force a prompt_cache_key whose rendezvous winner is NOT one of model
// A's accounts, so the bug (if unfixed) is guaranteed to reproduce rather
// than passing by chance of the hash landing on model A anyway.
function findKeyThatWinsOutsideModelA(
  connectionsByProvider: Map<string, Array<Record<string, unknown>>>,
  orderedTargets: ResolvedComboTarget[]
): string {
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    orderedTargets,
    connectionsByProvider
  );
  for (let i = 0; i < 500; i++) {
    const key = `probe-key-${i}`;
    const ranked = applyPromptCacheAffinity(expanded, { prompt_cache_key: key }, true);
    if (ranked.targets[0]?.provider !== "antigravity") return key;
  }
  throw new Error("could not find a probe key whose rendezvous winner is outside model A");
}

test("BUG #8370: priority combo keeps its declared model-1-first order despite cross-model affinity", () => {
  const { orderedTargets, connectionsByProvider } = buildCrossModelScenario();
  const key = findKeyThatWinsOutsideModelA(connectionsByProvider, orderedTargets);
  const body = { prompt_cache_key: key };

  // Sanity: without the fix's protection, raw affinity really does let a
  // model B/C account win the global sort (proves the scenario reproduces).
  const expanded = expandPromptCacheAffinityTargetsFromConnections(
    orderedTargets,
    connectionsByProvider
  );
  const rawAffinity = applyPromptCacheAffinity(expanded, body, true);
  assert.notEqual(
    rawAffinity.targets[0]?.provider,
    "antigravity",
    "test setup invariant: raw affinity must pick outside model A for this key"
  );

  const result = applyComboLikeAffinityPin(orderedTargets, connectionsByProvider, body, "priority");

  assert.equal(
    result[0]?.provider,
    "antigravity",
    "priority combo must keep its declared highest-priority model first, not the rendezvous winner"
  );
});

test("shouldProtectOriginalFirst covers priority, fill-first, and lkgp", () => {
  for (const strategy of ["priority", "fill-first", "lkgp"]) {
    assert.equal(
      shouldProtectOriginalFirst(false, false, strategy),
      true,
      `expected ${strategy} to be protected`
    );
  }
});

test("shouldProtectOriginalFirst still covers the pre-existing quota-share/weighted/sticky/auto-router cases", () => {
  assert.equal(shouldProtectOriginalFirst(false, false, "quota-share"), true);
  assert.equal(shouldProtectOriginalFirst(false, false, "weighted"), true);
  assert.equal(shouldProtectOriginalFirst(true, false, "round-robin"), true);
  assert.equal(shouldProtectOriginalFirst(false, true, "round-robin"), true);
});

test("round-robin combo is NOT protected — it still gets full cross-model affinity reordering", () => {
  const { orderedTargets, connectionsByProvider } = buildCrossModelScenario();
  const key = findKeyThatWinsOutsideModelA(connectionsByProvider, orderedTargets);
  const body = { prompt_cache_key: key };

  assert.equal(shouldProtectOriginalFirst(false, false, "round-robin"), false);

  const result = applyComboLikeAffinityPin(
    orderedTargets,
    connectionsByProvider,
    body,
    "round-robin"
  );

  assert.notEqual(
    result[0]?.provider,
    "antigravity",
    "round-robin combo must still let prompt-cache affinity pick the winning account across models"
  );
});
