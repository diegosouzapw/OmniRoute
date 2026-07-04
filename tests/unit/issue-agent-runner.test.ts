import test from "node:test";
import assert from "node:assert/strict";

import { createRecordedTriageRun } from "../../src/lib/issueAgent/recordedTriage.ts";

test("createRecordedTriageRun returns deterministic dry-run metadata", () => {
  const run = createRecordedTriageRun({
    issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/6059",
    dryRun: true,
  });

  assert.equal(run.mode, "recorded-triage");
  assert.equal(run.accepted, true);
  assert.equal(run.dryRun, true);
  assert.equal(run.repository, "KooshaPari/OmniRoute");
  assert.equal(run.issueNumber, 6059);
  assert.equal(run.runner, "deterministic-recorded-triage");
  assert.match(run.runId, /^issue-agent-recorded-triage-[a-f0-9]{16}$/);
  assert.deepEqual(run.steps, [
    "load-recorded-github-context",
    "classify-mention-intent",
    "draft-safe-response-plan",
    "emit-audit-record",
  ]);
});

test("createRecordedTriageRun redacts URL credentials before returning metadata", () => {
  const run = createRecordedTriageRun({
    issueUrl: "https://user:token12345678901234567890@github.com/KooshaPari/OmniRoute/issues/1",
  });

  assert.equal(run.issueUrl, "https://[REDACTED]@github.com/KooshaPari/OmniRoute/issues/1");
  assert.doesNotMatch(run.issueUrl, /token123/);
});

test("createRecordedTriageRun rejects non-GitHub issue URLs", () => {
  assert.throws(
    () => createRecordedTriageRun({ issueUrl: "https://example.com/not/github" }),
    /Expected a GitHub issue or pull request URL/
  );
});
