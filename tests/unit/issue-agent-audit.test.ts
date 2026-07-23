import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { appendIssueAgentAuditRecord } from "../../src/lib/issueAgent/audit.ts";
import { createRecordedTriageRun } from "../../src/lib/issueAgent/recordedTriage.ts";

test("appendIssueAgentAuditRecord writes redacted JSONL under explicit data dir", async () => {
  const dataDir = mkdtempSync(join(tmpdir(), "issue-agent-audit-"));
  const run = createRecordedTriageRun({
    issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/42",
    recordedContext: {
      title: "Need fix",
      body: "Authorization: Bearer sk-secret1234567890abcd",
    },
  });

  const result = await appendIssueAgentAuditRecord(run, { dataDir });
  const payload = readFileSync(result.path, "utf8");
  const row = JSON.parse(payload.trim()) as Record<string, unknown>;

  assert.equal(result.path, join(dataDir, "issue-agent", "audit.jsonl"));
  assert.equal(row.runId, run.runId);
  assert.equal(row.repository, "KooshaPari/OmniRoute");
  assert.equal(row.issueNumber, 42);
  assert.equal(row.dryRun, true);
  assert.doesNotMatch(payload, /sk-secret/);
  assert.match(payload, /\[REDACTED\]/);
});
