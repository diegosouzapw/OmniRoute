// tests/unit/build/check-workflows.test.ts
// TDD unit tests for scripts/check/check-workflows.mjs — Task 7.19.
//
// Strategy: test the exported pure functions without spawning actionlint,
// zizmor, or touching the real .github/workflows directory.
//   - parseActionlintOutput()  — line-based finding counting
//   - parseZizmorOutput()      — JSON / text parsing + counting
//   - collectWorkflowFiles()   — directory listing helper
//   - isBinaryAvailable()      — PATH probe (tested structurally, not by
//                                spawning real processes)
//
// All tests are fast and hermetic (no network, no child processes except where
// explicitly exercising the PATH probe against a non-existent binary name).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import {
  parseActionlintOutput,
  parseZizmorOutput,
  collectWorkflowFiles,
  isBinaryAvailable,
} from "../../../scripts/check/check-workflows.mjs";

// ─────────────────────────────────────────────────────────────────────────────
// parseActionlintOutput
// ─────────────────────────────────────────────────────────────────────────────

test("parseActionlintOutput: empty stdout returns count=0 and empty lines", () => {
  const result = parseActionlintOutput("");
  assert.equal(result.count, 0);
  assert.deepEqual(result.lines, []);
});

test("parseActionlintOutput: whitespace-only stdout returns count=0", () => {
  const result = parseActionlintOutput("  \n  \t  \n");
  assert.equal(result.count, 0);
  assert.deepEqual(result.lines, []);
});

test("parseActionlintOutput: one finding line returns count=1", () => {
  const stdout =
    ".github/workflows/ci.yml:12:7: shellcheck reported issue in this script: SC2086:info:1:12: Double quote to prevent globbing and word splitting. [shellcheck]\n";
  const result = parseActionlintOutput(stdout);
  assert.equal(result.count, 1);
  assert.equal(result.lines.length, 1);
  assert.ok(result.lines[0].includes("shellcheck"));
});

test("parseActionlintOutput: multiple finding lines returns correct count", () => {
  const stdout = [
    ".github/workflows/ci.yml:5:1: \"on\" is the key of workflow trigger. Use quoted \"on\" [syntax-check]",
    ".github/workflows/ci.yml:42:9: event name 'pull_request' is not available for 'workflow_dispatch' [events]",
    ".github/workflows/deploy.yml:8:5: unknown key 'runs-ons' in step config [syntax-check]",
  ].join("\n");
  const result = parseActionlintOutput(stdout);
  assert.equal(result.count, 3);
  assert.equal(result.lines.length, 3);
});

test("parseActionlintOutput: trailing newline does not add phantom finding", () => {
  const stdout = ".github/workflows/ci.yml:10:3: some issue [rule]\n\n\n";
  const result = parseActionlintOutput(stdout);
  assert.equal(result.count, 1);
});

test("parseActionlintOutput: preserves finding text exactly (trimmed)", () => {
  const finding = ".github/workflows/ci.yml:99:1: missing required key 'runs-on' [runner]";
  const result = parseActionlintOutput(`  ${finding}  \n`);
  assert.equal(result.lines[0], finding);
});

// ─────────────────────────────────────────────────────────────────────────────
// parseZizmorOutput
// ─────────────────────────────────────────────────────────────────────────────

test("parseZizmorOutput: empty string returns count=0", () => {
  const result = parseZizmorOutput("");
  assert.equal(result.count, 0);
  assert.deepEqual(result.diagnostics, []);
});

test("parseZizmorOutput: JSON with empty diagnostics array returns count=0", () => {
  const result = parseZizmorOutput(JSON.stringify({ diagnostics: [] }));
  assert.equal(result.count, 0);
  assert.deepEqual(result.diagnostics, []);
});

test("parseZizmorOutput: JSON { diagnostics: [...] } counts correctly", () => {
  const diagnostics = [
    { id: "unpinned-uses", severity: "medium", message: "uses: actions/checkout@v4 is not pinned to a SHA" },
    { id: "script-injection", severity: "high", message: "Untrusted input in run step" },
  ];
  const result = parseZizmorOutput(JSON.stringify({ diagnostics }));
  assert.equal(result.count, 2);
  assert.equal(result.diagnostics.length, 2);
});

test("parseZizmorOutput: bare JSON array (older zizmor format) counts correctly", () => {
  const findings = [
    { id: "unpinned-uses", workflow: "ci.yml" },
    { id: "excessive-permissions", workflow: "deploy.yml" },
    { id: "pull-request-target", workflow: "docker.yml" },
  ];
  const result = parseZizmorOutput(JSON.stringify(findings));
  assert.equal(result.count, 3);
  assert.equal(result.diagnostics.length, 3);
});

test("parseZizmorOutput: invalid JSON falls back to line counting", () => {
  // Non-JSON output (e.g. text format or error message) — each non-empty line = 1
  const textOutput = "warning: unpinned action\nerror: script injection risk\n";
  const result = parseZizmorOutput(textOutput);
  assert.equal(result.count, 2);
  // diagnostics is empty array in fallback mode
  assert.deepEqual(result.diagnostics, []);
});

test("parseZizmorOutput: JSON with unknown shape returns count=0 (graceful)", () => {
  // Unexpected but valid JSON — neither array nor { diagnostics }
  const result = parseZizmorOutput(JSON.stringify({ errors: [], warnings: [] }));
  assert.equal(result.count, 0);
});

test("parseZizmorOutput: whitespace-only returns count=0", () => {
  const result = parseZizmorOutput("   \n\t\n   ");
  assert.equal(result.count, 0);
});

test("parseZizmorOutput: large diagnostics array counted correctly", () => {
  const diagnostics = Array.from({ length: 47 }, (_, i) => ({
    id: "unpinned-uses",
    step: `step-${i}`,
  }));
  const result = parseZizmorOutput(JSON.stringify({ diagnostics }));
  assert.equal(result.count, 47);
});

// ─────────────────────────────────────────────────────────────────────────────
// collectWorkflowFiles
// ─────────────────────────────────────────────────────────────────────────────

test("collectWorkflowFiles: returns empty array for non-existent directory", () => {
  const result = collectWorkflowFiles("/this/path/does/not/exist/at/all-99999");
  assert.deepEqual(result, []);
});

test("collectWorkflowFiles: returns .yml files from directory", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-test-"));
  try {
    fs.writeFileSync(path.join(dir, "ci.yml"), "name: CI\n");
    fs.writeFileSync(path.join(dir, "deploy.yml"), "name: Deploy\n");
    fs.writeFileSync(path.join(dir, "README.md"), "# docs\n"); // not a workflow

    const files = collectWorkflowFiles(dir);
    assert.equal(files.length, 2);
    assert.ok(files.some((f) => f.endsWith("ci.yml")));
    assert.ok(files.some((f) => f.endsWith("deploy.yml")));
    assert.ok(!files.some((f) => f.endsWith("README.md")));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("collectWorkflowFiles: also collects .yaml extension", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-test-"));
  try {
    fs.writeFileSync(path.join(dir, "ci.yaml"), "name: CI\n");
    fs.writeFileSync(path.join(dir, "deploy.yml"), "name: Deploy\n");

    const files = collectWorkflowFiles(dir);
    assert.equal(files.length, 2);
    assert.ok(files.some((f) => f.endsWith(".yaml")));
    assert.ok(files.some((f) => f.endsWith(".yml")));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("collectWorkflowFiles: returns absolute paths", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-test-"));
  try {
    fs.writeFileSync(path.join(dir, "ci.yml"), "name: CI\n");
    const files = collectWorkflowFiles(dir);
    assert.equal(files.length, 1);
    assert.ok(path.isAbsolute(files[0]));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("collectWorkflowFiles: empty directory returns empty array", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-test-"));
  try {
    const files = collectWorkflowFiles(dir);
    assert.deepEqual(files, []);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// isBinaryAvailable
// ─────────────────────────────────────────────────────────────────────────────

test("isBinaryAvailable: returns false for a nonsense binary name", () => {
  // A binary named like this cannot exist in any real PATH.
  const result = isBinaryAvailable("__this_binary_definitely_does_not_exist_zzz99999__");
  assert.equal(result, false);
});

test("isBinaryAvailable: returns boolean (not null/undefined)", () => {
  const result = isBinaryAvailable("node");
  // node IS in PATH in this environment — but we only assert the type here
  // to avoid environment coupling.
  assert.equal(typeof result, "boolean");
});

test("isBinaryAvailable: node is available (sanity check for test environment)", () => {
  // node must be in PATH for this test suite to even run.
  assert.equal(isBinaryAvailable("node"), true);
});
