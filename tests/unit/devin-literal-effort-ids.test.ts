// tests/unit/devin-literal-effort-ids.test.ts
// Devin CLI providers (devin-cli / devin-cli-agentic / devin-desktop, aliases dv / dva)
// serve catalogs whose model ids EMBED the reasoning tier (`claude-opus-5-low`,
// `gpt-5-6-sol-max` are distinct upstream models — see
// open-sse/config/providers/registry/devin/catalog.ts). Locks the three gates that
// must treat those ids as literal:
//   1. applyClaudeEffortVariant never strips the suffix for devin providers;
//   2. appendClaudeEffortVariants never synthesizes `-<level>` variants on top of
//      them (no phantom `dva/claude-opus-5-max-low` ids in /v1/models);
//   3. appendSyncedEffortVariants / isSkippedEffortProvider treat devin providers
//      as owning their own suffix mechanism (no second variant layer).
import { test } from "node:test";
import assert from "node:assert/strict";

import { isDevinLiteralModelIdProvider } from "../../open-sse/utils/devinLiteralModelIds.ts";
import { appendClaudeEffortVariants } from "../../open-sse/utils/claudeEffortVariants.ts";
import {
  appendSyncedEffortVariants,
  isSkippedEffortProvider,
} from "../../open-sse/utils/syncedEffortVariants.ts";

test("isDevinLiteralModelIdProvider matches ids, aliases, and qualified prefixes", () => {
  for (const hit of [
    "devin-cli",
    "devin-cli-agentic",
    "devin-desktop",
    "dv",
    "dva",
    "dva/claude-opus-5-low",
    "devin-cli-agentic/claude-opus-5-max",
  ]) {
    assert.equal(isDevinLiteralModelIdProvider(hit), true, hit);
  }
  for (const miss of ["claude", "cc", "vertex", "", null, undefined, "codex", "deepseek"]) {
    assert.equal(
      isDevinLiteralModelIdProvider(miss as string | null | undefined),
      false,
      String(miss)
    );
  }
});

test("appendClaudeEffortVariants adds no tier variants for devin-prefixed models", () => {
  const models = [
    { id: "dva/claude-opus-5-max", root: "claude-opus-5-max" },
    { id: "devin-cli-agentic/claude-5-fable-max", root: "claude-5-fable-max" },
  ];
  const out = appendClaudeEffortVariants(models);
  assert.equal(out.length, models.length);
  assert.deepEqual(
    out.map((m) => m.id),
    ["dva/claude-opus-5-max", "devin-cli-agentic/claude-5-fable-max"]
  );
});

test("appendSyncedEffortVariants adds no tier variants for devin-owned models", () => {
  const models = [
    {
      id: "dva/gpt-5-6-sol-max",
      owned_by: "devin-cli-agentic",
      capabilities: { effort_tiers: ["low", "medium", "high", "xhigh"] },
    },
  ];
  const out = appendSyncedEffortVariants(models as never);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, "dva/gpt-5-6-sol-max");
});

test("isSkippedEffortProvider covers devin providers and aliases", () => {
  for (const provider of ["devin-cli", "devin-cli-agentic", "devin-desktop", "dva", "dv"]) {
    assert.equal(isSkippedEffortProvider(provider), true, provider);
  }
  assert.equal(isSkippedEffortProvider("claude"), false);
  assert.equal(isSkippedEffortProvider("codex"), true); // pre-existing skip stays
});
