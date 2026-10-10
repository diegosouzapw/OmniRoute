import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

type Step = { run?: string; uses?: string; if?: string; with?: Record<string, unknown> };
const workflow: {
  jobs: Record<string, { permissions: Record<string, string>; steps: Step[] }>;
} = parse(
  readFileSync(
    new URL("../../../.github/workflows/nightly-release-green.yml", import.meta.url),
    "utf8"
  )
);
const headroom = workflow.jobs["baseline-headroom"];

test("headroom reporting cannot reopen a permanent issue or modify issue metadata", () => {
  assert.notEqual(headroom.permissions.issues, "write");
  for (const step of headroom.steps) {
    assert.doesNotMatch(step.run || "", /\bgh\s+issue\s+(?:create|comment|edit|reopen)\b/);
  }
});

test("headroom measurements remain available in the run summary and retained artifacts", () => {
  const scripts = headroom.steps.map((step) => step.run || "").join("\n");
  assert.match(scripts, /node scripts\/quality\/baseline-headroom\.mjs/);
  assert.match(scripts, /cat reports\/quality\/headroom\.md >> "\$GITHUB_STEP_SUMMARY"/);
  const artifact = headroom.steps.find((step) => step.uses?.startsWith("actions/upload-artifact@"));
  assert.ok(artifact);
  assert.equal(artifact.if, "always()");
  assert.equal(artifact.with?.path, "reports/quality/headroom.*");
  assert.equal(artifact.with?.["retention-days"], 90);
});
