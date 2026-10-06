/**
 * tests/unit/ui/orchestrationHistory.test.ts
 * Pure model tests for the Orchestration Canvas "History" tab (Task C4, PR-B2).
 * Run: node --import tsx/esm --test tests/unit/ui/orchestrationHistory.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildHistoryGrid,
  historyItemFromA2A,
  historyItemFromCloudAgent,
  historyRangeFromPreset,
  type HistoryItem,
} from "../../../src/app/(dashboard)/dashboard/orchestration/model/historyModel.ts";
import type { CloudAgentTask } from "../../../src/lib/cloudAgent/types.ts";

function ts(ms: number): string {
  return new Date(ms).toISOString();
}

describe("historyItemFromA2A", () => {
  it("maps a2a states, keeps the a2a: prefix, and uses skill as identity/label", () => {
    const item = historyItemFromA2A({
      id: "t1",
      state: "completed",
      skill: "smart-routing",
      createdAt: ts(0),
      completedAt: ts(5_000),
    });
    assert.equal(item.id, "a2a:t1");
    assert.equal(item.source, "a2a");
    assert.equal(item.identity, "smart-routing");
    assert.equal(item.label, "smart-routing");
    assert.equal(item.state, "succeeded");
    assert.equal(item.durationMs, 5_000);
    assert.equal(item.cost, null);
  });

  it("maps submitted/working/failed/cancelled and falls back an unknown state to failed", () => {
    const base = { id: "x", skill: "s", createdAt: ts(0), completedAt: null };
    assert.equal(historyItemFromA2A({ ...base, state: "submitted" }).state, "queued");
    assert.equal(historyItemFromA2A({ ...base, state: "working" }).state, "running");
    assert.equal(historyItemFromA2A({ ...base, state: "failed" }).state, "failed");
    assert.equal(historyItemFromA2A({ ...base, state: "cancelled" }).state, "cancelled");
    assert.equal(historyItemFromA2A({ ...base, state: "bogus" }).state, "failed");
  });

  it("durationMs is null when completedAt is null", () => {
    const item = historyItemFromA2A({
      id: "t2",
      state: "working",
      skill: "s",
      createdAt: ts(0),
      completedAt: null,
    });
    assert.equal(item.durationMs, null);
    assert.equal(item.completedAt, null);
  });

  it("falls back identity/label to 'unknown' when skill is null", () => {
    const item = historyItemFromA2A({
      id: "t3",
      state: "completed",
      skill: null,
      createdAt: ts(0),
      completedAt: ts(1000),
    });
    assert.equal(item.identity, "unknown");
    assert.equal(item.label, "unknown");
  });
});

describe("historyItemFromCloudAgent", () => {
  function task(overrides: Partial<CloudAgentTask> = {}): CloudAgentTask {
    return {
      id: "ca1",
      providerId: "devin",
      status: "completed",
      prompt: "do the thing",
      source: { repoName: "r", repoUrl: "https://x" },
      options: {},
      activities: [],
      createdAt: ts(0),
      updatedAt: ts(1000),
      completedAt: ts(1000),
      ...overrides,
    } as CloudAgentTask;
  }

  it("maps state via the STATE_MAP, keeps the cloud-agent: prefix, identity=providerId", () => {
    const item = historyItemFromCloudAgent(task());
    assert.equal(item.id, "cloud-agent:ca1");
    assert.equal(item.source, "cloud-agent");
    assert.equal(item.identity, "devin");
    assert.equal(item.state, "succeeded");
    assert.equal(item.durationMs, 1000);
  });

  it("truncates a long prompt for the label", () => {
    const longPrompt = "x".repeat(80);
    const item = historyItemFromCloudAgent(task({ prompt: longPrompt }));
    assert.ok(item.label.length <= 60);
    assert.ok(item.label.endsWith("…"));
  });

  it("durationMs is null without completedAt; cost reads result.cost when present", () => {
    const item = historyItemFromCloudAgent(
      task({ completedAt: undefined, result: { cost: 0.42 } as CloudAgentTask["result"] })
    );
    assert.equal(item.durationMs, null);
    assert.equal(item.cost, 0.42);
  });

  it("unknown status falls back to failed", () => {
    const item = historyItemFromCloudAgent(task({ status: "bogus" as CloudAgentTask["status"] }));
    assert.equal(item.state, "failed");
  });
});

describe("buildHistoryGrid", () => {
  const FROM = 0;
  const TO = 10_000;

  function item(overrides: Partial<HistoryItem> = {}): HistoryItem {
    return {
      id: "a2a:1",
      source: "a2a",
      identity: "skill-a",
      state: "succeeded",
      label: "skill-a",
      createdAt: ts(5000),
      completedAt: null,
      durationMs: null,
      cost: null,
      raw: null,
      ...overrides,
    };
  }

  it("buckets an item into the correct slice by createdAt", () => {
    // range 0..10000ms, 10 buckets of 1000ms each; createdAt=5000 -> bucket index 5
    const grid = buildHistoryGrid([item({ createdAt: ts(5000) })], { fromMs: FROM, toMs: TO }, 10);
    assert.equal(grid.buckets.length, 10);
    assert.equal(grid.rows.length, 1);
    assert.equal(grid.rows[0].cells[5].length, 1);
    for (let i = 0; i < 10; i++) {
      if (i !== 5) assert.equal(grid.rows[0].cells[i].length, 0);
    }
  });

  it("an item exactly on an internal bucket boundary lands in the bucket that starts there", () => {
    // 10 buckets of 1000ms; createdAt=3000 is the boundary between bucket 2 and bucket 3.
    const grid = buildHistoryGrid([item({ createdAt: ts(3000) })], { fromMs: FROM, toMs: TO }, 10);
    assert.equal(grid.rows[0].cells[3].length, 1);
    assert.equal(grid.rows[0].cells[2].length, 0);
  });

  it("an item exactly at range.toMs lands in the last bucket instead of being dropped", () => {
    const grid = buildHistoryGrid([item({ createdAt: ts(TO) })], { fromMs: FROM, toMs: TO }, 10);
    assert.equal(grid.rows[0].cells[9].length, 1);
  });

  it("items outside the range are discarded — no row is created for them", () => {
    const before = item({ id: "a2a:before", createdAt: ts(-1) });
    const after = item({ id: "a2a:after", createdAt: ts(TO + 1) });
    const grid = buildHistoryGrid([before, after], { fromMs: FROM, toMs: TO }, 10);
    assert.equal(grid.rows.length, 0);
  });

  it("groups by identity, keeping distinct sources with the same identity in separate rows", () => {
    const a2aItem = item({ id: "a2a:1", source: "a2a", identity: "shared", createdAt: ts(1000) });
    const cloudItem = item({
      id: "cloud-agent:1",
      source: "cloud-agent",
      identity: "shared",
      createdAt: ts(1000),
    });
    const grid = buildHistoryGrid([a2aItem, cloudItem], { fromMs: FROM, toMs: TO }, 10);
    assert.equal(grid.rows.length, 2);
    const sources = grid.rows.map((r) => r.source).sort();
    assert.deepEqual(sources, ["a2a", "cloud-agent"]);
  });

  it("sorts items within a cell by createdAt", () => {
    const later = item({ id: "a2a:later", createdAt: ts(5500) });
    const earlier = item({ id: "a2a:earlier", createdAt: ts(5100) });
    const grid = buildHistoryGrid([later, earlier], { fromMs: FROM, toMs: TO }, 10);
    assert.deepEqual(
      grid.rows[0].cells[5].map((i) => i.id),
      ["a2a:earlier", "a2a:later"]
    );
  });
});

describe("historyRangeFromPreset", () => {
  it("computes fromMs/toMs for 1d/7d/30d relative to nowMs", () => {
    const now = 1_000_000_000_000;
    assert.deepEqual(historyRangeFromPreset("1d", now), {
      fromMs: now - 24 * 60 * 60 * 1000,
      toMs: now,
    });
    assert.deepEqual(historyRangeFromPreset("7d", now), {
      fromMs: now - 7 * 24 * 60 * 60 * 1000,
      toMs: now,
    });
    assert.deepEqual(historyRangeFromPreset("30d", now), {
      fromMs: now - 30 * 24 * 60 * 60 * 1000,
      toMs: now,
    });
  });
});
