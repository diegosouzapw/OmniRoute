/**
 * effort_tiers loop — learned set overrides synced metadata in catalog
 * capabilities (design 2026-08-23, decisions: appris > sync, in-memory).
 * Records go through the REAL record path (executor-style connection keys)
 * then read back through the catalog builders — proves the key-space bridge,
 * unlike a unit injection of the same string on both sides.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  recordLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../../open-sse/services/learnedReasoningEffortCaps.ts";
import {
  buildSyncedCapabilities,
  mergeSyncedCapabilities,
} from "../../../src/app/api/v1/models/syncedCapabilities.ts";

beforeEach(() => __test_resetLearnedReasoningEffortCaps());
after(() => __test_resetLearnedReasoningEffortCaps());

const SYNC_TIERS = ["none", "low", "medium", "high", "xhigh"];

test("learned set replaces synced effort_tiers", () => {
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", "x-preview-f-free", [
    "low",
    "high",
    "max",
  ]);
  const caps = buildSyncedCapabilities(
    { id: "x-preview-f-free", supportedThinkingEfforts: SYNC_TIERS },
    "huggingface"
  );
  assert.deepEqual(caps?.effort_tiers, ["low", "high", "max"]);
});

test("nothing learned keeps synced metadata untouched", () => {
  const caps = buildSyncedCapabilities(
    { id: "some-synced-model", supportedThinkingEfforts: SYNC_TIERS },
    "huggingface"
  );
  assert.deepEqual(caps?.effort_tiers, SYNC_TIERS);
});

test("neither learned nor synced yields undefined", () => {
  const caps = buildSyncedCapabilities({ id: "plain-model" }, "huggingface");
  assert.equal(caps, undefined);
});

test("merge path keeps vision AND applies the learned override", () => {
  recordLearnedReasoningEffort("conn-a", "vision-model", ["low", "max"]);
  const merged = mergeSyncedCapabilities(
    { tool_calling: true },
    { id: "vision-model", supportsVision: true, supportedThinkingEfforts: SYNC_TIERS },
    "huggingface"
  );
  assert.equal(merged?.vision, true);
  assert.equal(merged?.tool_calling, true);
  assert.deepEqual(merged?.effort_tiers, ["low", "max"]);
});

// Exclusion gate (#7694): codex/glm/kimi already own a conflicting
// `-{effort}` suffix mechanism — the blind opencode-plugin mapping must never
// see effort_tiers for them, learned or synced, or it double-handles the suffix.
// #12299 exempts only Kimi K3's BASE model entries (asserted in
// tests/unit/kimi-k3-effort-tiers-12299.test.ts) — non-K3 kimi models such as
// "excluded-model" below stay excluded alongside codex/glm.
for (const ownedBy of ["codex", "glm", "glm-cn", "glmt", "kimi", "kimi-coding-apikey"]) {
  test(`build: excluded provider "${ownedBy}" never gets effort_tiers (synced)`, () => {
    const caps = buildSyncedCapabilities(
      { id: "excluded-model", supportedThinkingEfforts: SYNC_TIERS },
      ownedBy
    );
    assert.equal(caps?.effort_tiers, undefined);
  });

  test(`build: excluded provider "${ownedBy}" never gets effort_tiers (learned)`, () => {
    recordLearnedReasoningEffort(`conn-${ownedBy}`, "excluded-model", ["low", "max"]);
    const caps = buildSyncedCapabilities(
      { id: "excluded-model", supportedThinkingEfforts: SYNC_TIERS },
      ownedBy
    );
    assert.equal(caps?.effort_tiers, undefined);
  });
}

test("excluded provider still gets vision through buildSyncedCapabilities", () => {
  const caps = buildSyncedCapabilities({ id: "codex-vision-model", supportsVision: true }, "codex");
  assert.deepEqual(caps, { vision: true });
});

test("merge path also excludes codex/glm/kimi from effort_tiers", () => {
  recordLearnedReasoningEffort("conn-glm", "glm-model", ["low", "max"]);
  const merged = mergeSyncedCapabilities(
    { tool_calling: true },
    { id: "glm-model", supportsVision: true, supportedThinkingEfforts: SYNC_TIERS },
    "glm"
  );
  assert.equal(merged?.vision, true);
  assert.equal(merged?.effort_tiers, undefined);
});
