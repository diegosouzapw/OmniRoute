import test from "node:test";
import assert from "node:assert/strict";

import { sortTargetsByUsage } from "../../open-sse/services/combo/targetSorters.ts";
import {
  recordComboRequest,
  resetComboMetrics,
  getComboMetrics,
} from "../../open-sse/services/comboMetrics.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

function target(modelStr: string, executionKey: string, provider = "codex"): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: executionKey,
    executionKey,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test("least-used distributes across distinct accounts of the same model (#7015)", () => {
  const combo = "test-7015-least-used";
  resetComboMetrics(combo);

  // Same model, two accounts. Account A serves 5 requests, account B serves 0.
  for (let i = 0; i < 5; i++) {
    recordComboRequest(combo, "codex/gpt-5.5", {
      success: true,
      latencyMs: 10,
      strategy: "least-used",
      target: { executionKey: "acct-a", provider: "codex" },
    });
  }

  const metrics = getComboMetrics(combo);
  assert.equal(metrics?.byTarget["acct-a"]?.requests, 5, "acct-a usage recorded");
  // The shared modelStr usage is aggregated; the per-account bug ignores it for B.
  assert.equal(metrics?.byModel["codex/gpt-5.5"]?.requests, 5);

  const targets = [
    target("codex/gpt-5.5", "acct-a"),
    target("codex/gpt-5.5", "acct-b"),
  ];
  const ordered = sortTargetsByUsage(targets, combo);

  // The unused account (B, 0 requests) must be selected first — not always A.
  assert.equal(ordered[0].executionKey, "acct-b", "unused account should be first");
  assert.equal(ordered[1].executionKey, "acct-a");

  resetComboMetrics(combo);
});

test("least-used orders three same-model accounts by ascending per-account usage (#7015)", () => {
  const combo = "test-7015-least-used-3";
  resetComboMetrics(combo);

  const counts: Record<string, number> = { "acct-a": 3, "acct-b": 1, "acct-c": 7 };
  for (const [key, n] of Object.entries(counts)) {
    for (let i = 0; i < n; i++) {
      recordComboRequest(combo, "codex/gpt-5.5", {
        success: true,
        latencyMs: 10,
        strategy: "least-used",
        target: { executionKey: key, provider: "codex" },
      });
    }
  }

  const targets = [
    target("codex/gpt-5.5", "acct-a"),
    target("codex/gpt-5.5", "acct-b"),
    target("codex/gpt-5.5", "acct-c"),
  ];
  const ordered = sortTargetsByUsage(targets, combo);
  assert.deepEqual(
    ordered.map((t) => t.executionKey),
    ["acct-b", "acct-a", "acct-c"]
  );

  resetComboMetrics(combo);
});
