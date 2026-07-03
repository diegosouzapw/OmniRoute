import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createIssueAgentRun,
  getIssueAgentRun,
  IssueAgentMode,
  listIssueAgentRuns,
  resetIssueAgentRunsForTests,
  saveIssueAgentRun,
} from "../../../../src/lib/issueAgent/runs.ts";

test.beforeEach(() => {
  resetIssueAgentRunsForTests();
});

test("run creation records report, triage, fix, and combined modes without executing git", () => {
  const modes: IssueAgentMode[] = ["report", "triage", "fix", "triage-and-fix"];
  const runs = modes.map((mode) =>
    createIssueAgentRun({
      issueRef: "owner/repo#123",
      mode,
      log: {
        method: "POST",
        path: "/v1/chat/completions",
        status: 500,
        authorization: "Bearer secret",
      },
      now: () => new Date("2026-06-30T12:00:00.000Z"),
      idFactory: () => `run-${mode}`,
    })
  );

  assert.deepEqual(
    runs.map((run) => run.mode),
    modes
  );
  assert.deepEqual(
    runs.map((run) => run.settings.mode),
    modes
  );
  assert.deepEqual(
    runs.map((run) => run.id),
    ["run-report", "run-triage", "run-fix", "run-triage-and-fix"]
  );
  assert.match(runs[0].diagnostics.summary, /POST/);
  assert.doesNotMatch(runs[0].diagnostics.redactedPreview, /secret/);
  assert.equal(runs[0].status, "recorded");
});

test("fix run is blocked when prerequisite checks fail", () => {
  const run = createIssueAgentRun({
    issueRef: "owner/repo#123",
    mode: "fix",
    prerequisiteCheck: { ok: false, missing: ["gh"] },
    now: () => new Date("2026-06-30T12:00:00.000Z"),
    idFactory: () => "run-fix-blocked",
  });

  assert.equal(run.status, "blocked");
  assert.deepEqual(run.prerequisiteCheck?.missing, ["gh"]);
});

test("run store prunes expired runs on write", () => {
  const oldRun = createIssueAgentRun({
    issueRef: "owner/repo#123",
    mode: "triage",
    settings: { retentionDays: 1 },
    now: () => new Date("2026-06-28T12:00:00.000Z"),
    idFactory: () => "old-run",
  });
  saveIssueAgentRun(oldRun);

  const freshRun = createIssueAgentRun({
    issueRef: "owner/repo#123",
    mode: "triage",
    settings: { retentionDays: 1 },
    now: () => new Date(),
    idFactory: () => "fresh-run",
  });
  saveIssueAgentRun(freshRun);

  assert.equal(getIssueAgentRun("old-run"), null);
  assert.equal(getIssueAgentRun("fresh-run")?.id, "fresh-run");
});

test("run store caps retained runs", () => {
  for (let i = 0; i < 205; i += 1) {
    saveIssueAgentRun(
      createIssueAgentRun({
        issueRef: "owner/repo#123",
        mode: "triage",
        now: () => new Date(2026, 5, 30, 12, 0, i),
        idFactory: () => `run-${i}`,
      })
    );
  }

  const runs = listIssueAgentRuns();
  assert.equal(runs.length, 200);
  assert.equal(getIssueAgentRun("run-0"), null);
  assert.equal(getIssueAgentRun("run-204")?.id, "run-204");
});
