import assert from "node:assert/strict";
import { test } from "node:test";

import { createIssueAgentRun, IssueAgentMode } from "../../../../src/lib/issueAgent/runs.ts";

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
