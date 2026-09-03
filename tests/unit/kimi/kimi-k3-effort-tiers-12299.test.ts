import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  buildSyncedCapabilities,
  mergeSyncedCapabilities,
} from "../../../src/app/api/v1/models/syncedCapabilities.ts";
import {
  shouldExposeSyncedEffortVariants,
  appendSyncedEffortVariants,
} from "../../../open-sse/utils/syncedEffortVariants.ts";

// #12299: Kimi K3's supportedThinkingEfforts (["low", "high", "max"]) were
// suppressed on the BASE model by isSkippedEffortProvider in
// effectiveEffortTiers(), leaving catalog-only clients with no tiers to copy.
// Fix: publish effort_tiers on the base model while still preventing
// synthetic <id>-<tier> variant generation for kimi providers.

const KIMI_K3_TIERS = ["low", "high", "max"];

test("Kimi K3 base model publishes effort_tiers via buildSyncedCapabilities (#12299)", () => {
  const caps = buildSyncedCapabilities(
    { id: "k3", supportsThinking: true, supportedThinkingEfforts: KIMI_K3_TIERS },
    "kimi-coding-apikey"
  );
  assert.ok(caps, "capabilities must be defined for kimi K3");
  assert.deepEqual(
    caps.effort_tiers,
    KIMI_K3_TIERS,
    "kimi K3 base model must publish effort_tiers low/high/max"
  );
});

test("Kimi K3-256k base model publishes effort_tiers via buildSyncedCapabilities (#12299)", () => {
  const caps = buildSyncedCapabilities(
    { id: "k3-256k", supportsThinking: true, supportedThinkingEfforts: KIMI_K3_TIERS },
    "kimi-coding-apikey"
  );
  assert.ok(caps, "capabilities must be defined for kimi K3-256k");
  assert.deepEqual(
    caps.effort_tiers,
    KIMI_K3_TIERS,
    "kimi K3-256k base model must publish effort_tiers low/high/max"
  );
});

test("Kimi K3 merge path also publishes effort_tiers (#12299)", () => {
  const merged = mergeSyncedCapabilities(
    { tool_calling: true },
    { id: "k3", supportsThinking: true, supportedThinkingEfforts: KIMI_K3_TIERS },
    "kimi-coding-apikey"
  );
  assert.ok(merged, "merged capabilities must be defined");
  assert.deepEqual(
    merged.effort_tiers,
    KIMI_K3_TIERS,
    "merge path must publish kimi K3 effort_tiers"
  );
  assert.equal(merged.tool_calling, true, "existing tool_calling must be preserved");
});

test("shouldExposeSyncedEffortVariants still prevents synthetic kimi variants", () => {
  // The base model should NOT generate synthetic <id>-<tier> entries
  assert.equal(
    shouldExposeSyncedEffortVariants({
      id: "kimi/k3",
      owned_by: "kimi-coding-apikey",
      capabilities: { effort_tiers: KIMI_K3_TIERS },
    }),
    false,
    "must not generate synthetic kimi/k3-low, kimi/k3-high, etc."
  );
});

test("appendSyncedEffortVariants does not create kimi variant entries", () => {
  const models = [
    {
      id: "kimi-coding-apikey/k3",
      owned_by: "kimi-coding-apikey",
      capabilities: { effort_tiers: KIMI_K3_TIERS },
    },
  ];
  const result = appendSyncedEffortVariants(models);
  assert.equal(result.length, 1, "must not add synthetic variant entries for kimi");
  assert.equal(result[0].id, "kimi-coding-apikey/k3", "original entry must be unchanged");
});

test("kimi K3 static registry tiers match synced metadata", () => {
  // Verify the static registry in runtime.ts has the correct tiers
  const runtimePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../open-sse/config/providers/registry/kimi/coding/runtime.ts"
  );
  const content = readFileSync(runtimePath, "utf8");

  // Verify the static thinking policies declare the same tiers
  assert.ok(
    content.includes('"low", "high", "max"'),
    "KIMI_CODE_STATIC_THINKING_POLICIES.k3 must declare low/high/max"
  );
});
