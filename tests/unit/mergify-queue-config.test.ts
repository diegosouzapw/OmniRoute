// Contract for .mergify.yml (rail G11, v3.8.54). Mergify silently ignores or
// rejects a bad config, so the queue's load-bearing keys are pinned here.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as yaml from "js-yaml";

type QueueRule = Record<string, unknown> & { name: string };
type MergifyConfig = {
  merge_protections_settings?: { auto_merge_conditions?: unknown[] };
  queue_rules?: QueueRule[];
  pull_request_rules?: unknown[];
};

const config = yaml.load(
  readFileSync(new URL("../../.mergify.yml", import.meta.url), "utf8")
) as MergifyConfig;

// p95 wall-clock (createdAt -> updatedAt) of the last 100 successful quality.yml
// runs, measured 2026-10-09 over 2026-09-28..2026-10-08: 119.75 min. The queue's
// checks_timeout must be at least 2x this so a slow-but-healthy run is not dequeued.
const MEASURED_QUALITY_P95_MINUTES = 119.75;

function durationToMinutes(value: unknown): number {
  assert.equal(typeof value, "string", "checks_timeout must be a duration string");
  const match = /^(\d+)\s*(seconds?|s|min|minutes?|m|hours?|h)$/i.exec(String(value).trim());
  assert.ok(match, `unparseable duration: ${String(value)}`);
  const n = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (unit.startsWith("s")) return n / 60;
  if (unit.startsWith("h")) return n * 60;
  return n;
}

const release = config.queue_rules?.find((rule) => rule.name === "release");

test("release queue rule exists and keeps squash merges", () => {
  assert.ok(release, "queue_rules must define the `release` queue");
  assert.equal(release.merge_method, "squash");
});

test("release queue only accepts owner-labelled, non-draft, conflict-free release PRs", () => {
  const conditions = release?.queue_conditions as string[];
  assert.ok(conditions.includes("label=queue"));
  assert.ok(conditions.includes("-draft"));
  assert.ok(conditions.includes("-conflict"));
  assert.ok(conditions.some((c) => c.startsWith("base~=^release/")));
  assert.deepEqual(config.merge_protections_settings?.auto_merge_conditions, ["label = queue"]);
});

test("merge conditions stay fail-closed on the always-on anchor check", () => {
  const conditions = JSON.stringify(release?.merge_conditions);
  assert.match(conditions, /#check-pending=0/);
  assert.match(conditions, /#check-success>=1/);
  assert.match(conditions, /check-success=Merge integrity \(changelog \+ generated skills\)/);
});

test("checks_timeout is at least 2x the measured quality.yml p95", () => {
  const minutes = durationToMinutes(release?.checks_timeout);
  assert.ok(
    minutes >= 2 * MEASURED_QUALITY_P95_MINUTES,
    `checks_timeout ${minutes} min < 2 x p95 (${2 * MEASURED_QUALITY_P95_MINUTES} min)`
  );
  // Mergify's floor is 60 s; an absurd ceiling would make the timeout meaningless.
  assert.ok(minutes <= 8 * 60, "checks_timeout above 8 h no longer protects the queue");
});

test("no paid-tier batch keys (free plan dequeues every PR with them, #7220)", () => {
  for (const key of [
    "batch_size",
    "batch_max_wait_time",
    "batch_max_failure_resolution_attempts",
  ]) {
    assert.equal(key in (release ?? {}), false, `${key} requires a paid Mergify tier`);
  }
});

test("deprecated queue keys are not used", () => {
  for (const key of [
    "allow_inplace_checks",
    "allow_queue_branch_edit",
    "autoqueue",
    "speculative_checks",
  ]) {
    assert.equal(key in (release ?? {}), false, `${key} is deprecated/removed in Mergify`);
  }
});
