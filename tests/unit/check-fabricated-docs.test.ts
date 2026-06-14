import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

import {
  runFabricatedDocsCheck,
  formatHumanReport,
} from "../../scripts/check/check-fabricated-docs.mjs";

// We can't easily mock the buildCodebaseIndex() which walks src/app/api etc.
// Instead, we test the report-formatting logic and the no-findings path on
// the real repo, which acts as a smoke test that the script runs end-to-end.

test("runFabricatedDocsCheck: runs without throwing on the real repo", () => {
  const result = runFabricatedDocsCheck();
  assert.ok(result);
  assert.ok(typeof result.totalFindings === "number");
  assert.ok(result.fileCount > 0, "should scan at least AGENTS.md");
  assert.ok(result.index);
  assert.ok(result.index.apiRoutes instanceof Set);
  assert.ok(result.index.envVars instanceof Set);
  assert.ok(result.index.cliCommands instanceof Set);
});

test("runFabricatedDocsCheck: index contains real OmniRoute routes", () => {
  const result = runFabricatedDocsCheck();
  // The real repo has /api/v1/chat/completions — a known truth
  assert.ok(result.index.apiRoutes.has("/api/v1/chat/completions"));
  // The real repo has /api/monitoring/health
  assert.ok(result.index.apiRoutes.has("/api/monitoring/health"));
  // The real repo reads PORT via process.env
  assert.ok(result.index.envVars.has("PORT"));
});

test("formatHumanReport: no-drift case produces a checkmark", () => {
  const result = {
    totalFindings: 0,
    files: [],
    fileCount: 10,
    index: {
      apiRoutes: new Set(),
      envVars: new Set(),
      cliCommands: new Set(),
    },
  };
  const out = formatHumanReport(result);
  assert.match(out, /No fabricated API\/env\/CLI\/hook\/file references found/);
});

test("formatHumanReport: groups findings by kind", () => {
  const result = {
    totalFindings: 3,
    files: [
      {
        rel: "docs/test.md",
        findings: [
          { kind: "api-path", value: "/api/fake/1", line: 1, msg: "fake" },
          { kind: "env-var", value: "FAKE_VAR_X", line: 2, msg: "fake" },
          { kind: "hook", value: "onFake", line: 3, msg: "fake" },
        ],
      },
    ],
    fileCount: 1,
    index: { apiRoutes: new Set(), envVars: new Set(), cliCommands: new Set() },
  };
  const out = formatHumanReport(result);
  assert.match(out, /API endpoint paths/);
  assert.match(out, /Env vars never read/);
  assert.match(out, /Hook names/);
  assert.match(out, /\/api\/fake\/1/);
  assert.match(out, /FAKE_VAR_X/);
  assert.match(out, /onFake/);
});
