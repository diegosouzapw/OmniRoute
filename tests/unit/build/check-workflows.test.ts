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
import { fileURLToPath } from "node:url";
import {
  parseActionlintOutput,
  parseZizmorOutput,
  collectWorkflowFiles,
  isBinaryAvailable,
  evaluateZizmorRatchet,
  readBaselineZizmorValue,
  runScheduledGuardCheck,
  findScheduledJobsWithoutGuard,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../../scripts/check/check-workflows.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluateZizmor = evaluateZizmorRatchet as (
  current: number,
  baseline: number
) => RatchetVerdict;
const readZizmorBaseline = readBaselineZizmorValue as (p?: string) => number | null;
const qualityWorkflowPath = new URL("../../../.github/workflows/quality.yml", import.meta.url);
const scheduledGuard = findScheduledJobsWithoutGuard as (
  files: string[]
) => { file: string; job: string; reason: string }[];

// ─────────────────────────────────────────────────────────────────────────────
// scheduled-run guard — every scheduled workflow runs only in the upstream repo
// ─────────────────────────────────────────────────────────────────────────────

const EXPECTED_SCHEDULED_WORKFLOWS = [
  "nightly-compat.yml",
  "nightly-llm-security.yml",
  "nightly-mutation.yml",
  "nightly-property.yml",
  "nightly-release-green.yml",
  "nightly-resilience.yml",
  "nightly-schemathesis.yml",
  "radar-export.yml",
  "scorecard.yml",
  "test-quarantine.yml",
];

function readWorkflowFiles(): string[] {
  return collectWorkflowFiles(
    fileURLToPath(new URL("../../../.github/workflows", import.meta.url))
  ) as unknown as string[];
}

test("scheduled runs carry the upstream-only guard on every job", () => {
  const dir = new URL("../../../.github/workflows/", import.meta.url);
  const files = EXPECTED_SCHEDULED_WORKFLOWS.map((f) => new URL(f, dir).pathname);
  assert.ok(readWorkflowFiles().length >= files.length);
  const findings = scheduledGuard(files);
  assert.deepEqual(findings, []);
});

test("a scheduled job without the guard is reported", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-guard-"));
  try {
    fs.writeFileSync(
      path.join(dir, "nightly-demo.yml"),
      "on:\n  schedule:\n    - cron: '0 0 * * *'\njobs:\n  demo:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hi\n"
    );
    const findings = scheduledGuard([path.join(dir, "nightly-demo.yml")]);
    assert.equal(findings.length, 1);
    assert.equal(findings[0].job, "demo");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("an unreadable scheduled workflow is reported, never silently accepted", () => {
  const findings = scheduledGuard([
    path.join(os.tmpdir(), "check-workflows-guard-missing-99999.yml"),
  ]);
  assert.equal(findings.length, 1);
});

test("invalid yaml and workflows without jobs are reported, never silently accepted", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-guard-"));
  try {
    fs.writeFileSync(path.join(dir, "broken.yml"), "on:\n  schedule:\n\t- broken: [unclosed\n");
    fs.writeFileSync(path.join(dir, "no-jobs.yml"), "on:\n  schedule:\n    - cron: '0 0 * * *'\n");
    assert.equal(scheduledGuard([path.join(dir, "broken.yml")]).length, 1);
    assert.equal(scheduledGuard([path.join(dir, "no-jobs.yml")]).length, 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the guard lets manual and push runs through anywhere, schedule only upstream", () => {
  const evaluate = (eventName: string, repository: string) =>
    eventName !== "schedule" || repository === "diegosouzapw/OmniRoute";
  assert.equal(evaluate("workflow_dispatch", "someone/else"), true);
  assert.equal(evaluate("push", "someone/else"), true);
  assert.equal(evaluate("schedule", "diegosouzapw/OmniRoute"), true);
  assert.equal(evaluate("schedule", "someone/else"), false);
});

test("a workflow without a schedule trigger reports nothing", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-guard-"));
  try {
    fs.writeFileSync(
      path.join(dir, "push-only.yml"),
      "on:\n  push:\n    branches: [main]\njobs:\n  demo:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hi\n"
    );
    assert.deepEqual(scheduledGuard([path.join(dir, "push-only.yml")]), []);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the scheduled-guard check reports repository-relative paths", () => {
  const runCheck = runScheduledGuardCheck as (files: string[]) => {
    file: string;
    job: string;
    reason: string;
  }[];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-guard-"));
  try {
    const file = path.join(dir, "nightly-demo.yml");
    fs.writeFileSync(
      file,
      "on:\n  schedule:\n    - cron: '0 0 * * *'\njobs:\n  demo:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hi\n"
    );
    const findings = runCheck([file]);
    assert.equal(findings.length, 1);
    assert.ok(!path.isAbsolute(findings[0].file));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function readQualityWorkflow(): string {
  return fs.readFileSync(qualityWorkflowPath, "utf8");
}

test("admission workflows do not enable setup-node's redundant package-manager cache", () => {
  for (const workflow of ["ci", "quality"]) {
    const source = fs.readFileSync(
      new URL(`../../../.github/workflows/${workflow}.yml`, import.meta.url),
      "utf8"
    );
    const steps = [
      ...source.matchAll(
        /(?:^|\n)      - uses: actions\/setup-node@[^\n]+\n        with:\n((?:          [^\n]*\n)+)/g
      ),
    ];
    assert.ok(steps.length > 0);
    assert.equal(
      steps.length,
      [...source.matchAll(/^      - uses: actions\/setup-node@/gm)].length
    );
    for (const [step, inputs] of steps) {
      assert.match(inputs, /package-manager-cache: false/, step);
      assert.doesNotMatch(inputs, /^\s*cache:/m, step);
    }
    const admission = source
      .slice(source.indexOf("\n  admission-verdict:\n"))
      .split("\n  ci-summary:")[0];
    for (const action of ["checkout", "setup-node", "upload-artifact"]) {
      assert.match(admission, new RegExp(`actions/${action}@[a-f0-9]{40}`));
    }
  }
});

test("integration candidates never restore PR dependency, lint or browser caches", () => {
  for (const workflow of ["ci", "quality"]) {
    const source = fs.readFileSync(
      new URL(`../../../.github/workflows/${workflow}.yml`, import.meta.url),
      "utf8"
    );
    const steps = source.split(/^      - /m).slice(1);
    const installers = steps.filter((step) =>
      step.includes("uses: ./.github/actions/npm-ci-retry")
    );
    assert.ok(installers.length > 0);
    for (const step of installers) {
      assert.match(step, /cache: \$\{\{ github\.event_name == 'pull_request' \}\}/);
    }
    const caches = steps.filter((step) => /uses: actions\/cache(?:\/restore)?@/.test(step));
    assert.ok(caches.length > 0);
    for (const step of caches) {
      assert.match(step, /if: github\.event_name == 'pull_request'/);
      assert.match(step, /uses: actions\/cache@[a-f0-9]{40}/);
    }
  }
});

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
    '.github/workflows/ci.yml:5:1: "on" is the key of workflow trigger. Use quoted "on" [syntax-check]',
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

test("parseZizmorOutput: empty output is not a measured zero", () => {
  assert.throws(() => parseZizmorOutput(""), /invalid.*JSON/);
});

test("parseZizmorOutput: JSON with empty diagnostics array returns count=0", () => {
  const result = parseZizmorOutput(JSON.stringify({ diagnostics: [] }));
  assert.equal(result.count, 0);
  assert.deepEqual(result.diagnostics, []);
});

test("parseZizmorOutput: JSON { diagnostics: [...] } counts correctly", () => {
  const diagnostics = [
    {
      id: "unpinned-uses",
      severity: "medium",
      message: "uses: actions/checkout@v4 is not pinned to a SHA",
    },
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

test("parseZizmorOutput: invalid JSON cannot be interpreted as frozen findings", () => {
  const textOutput = "warning: unpinned action\nerror: script injection risk\n";
  assert.throws(() => parseZizmorOutput(textOutput), /invalid.*JSON/);
});

test("parseZizmorOutput: unknown schema is incomplete, not zero findings", () => {
  assert.throws(() => parseZizmorOutput(JSON.stringify({ errors: [], warnings: [] })), /schema/);
});

test("parseZizmorOutput: whitespace-only is not a measured zero", () => {
  assert.throws(() => parseZizmorOutput("   \n\t\n   "), /invalid.*JSON/);
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
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("collectWorkflowFiles: empty directory returns empty array", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "check-workflows-test-"));
  try {
    const files = collectWorkflowFiles(dir);
    assert.deepEqual(files, []);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

// ─────────────────────────────────────────────────────────────────────────────
// evaluateZizmorRatchet — ratchet direction:down, zizmorFindings ONLY (Etapa 2)
// Regression when measured > baseline. actionlint is reported, not ratcheted.
// ─────────────────────────────────────────────────────────────────────────────

test("evaluateZizmorRatchet: measured == baseline passes (192 vs 192)", () => {
  const r = evaluateZizmor(192, 192);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateZizmorRatchet: one more than baseline is a regression (193 vs 192)", () => {
  const r = evaluateZizmor(193, 192);
  assert.equal(r.regressed, true, "a single new zizmor finding must block");
  assert.equal(r.improved, false);
});

test("evaluateZizmorRatchet: fewer than baseline is an improvement (190 vs 192)", () => {
  const r = evaluateZizmor(190, 192);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateZizmorRatchet: strict integer comparison — any increase regresses", () => {
  assert.equal(evaluateZizmor(193, 192).regressed, true);
  assert.equal(evaluateZizmor(192, 192).regressed, false);
  assert.equal(evaluateZizmor(191, 192).regressed, false);
});

// ─────────────────────────────────────────────────────────────────────────────
// readBaselineZizmorValue — tolerant read of quality-baseline.json
// ─────────────────────────────────────────────────────────────────────────────

function withTmpBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "workflows-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("readBaselineZizmorValue: reads metrics.zizmorFindings.value", () => {
  withTmpBaseline(JSON.stringify({ metrics: { zizmorFindings: { value: 192 } } }), (p) => {
    assert.equal(readZizmorBaseline(p), 192);
  });
});

test("readBaselineZizmorValue: missing file returns null (caller must reject incomplete ratchet)", () => {
  assert.equal(readZizmorBaseline("/tmp/does-not-exist-88888/quality-baseline.json"), null);
});

test("readBaselineZizmorValue: missing metric returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readZizmorBaseline(p), null);
  });
});

test("readBaselineZizmorValue: non-numeric value returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: { zizmorFindings: { value: "192" } } }), (p) => {
    assert.equal(readZizmorBaseline(p), null);
  });
});

test("readBaselineZizmorValue: invalid JSON returns null (does not throw)", () => {
  withTmpBaseline("{ broken", (p) => {
    assert.equal(readZizmorBaseline(p), null);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// quality.yml — release PR build gate regression coverage (#7307)
// ─────────────────────────────────────────────────────────────────────────────

test("quality admission covers both bases and delegates required build/package checks to CI", () => {
  const source = readQualityWorkflow();
  assert.match(source, /pull_request:\n\s+branches: \[main, "release\/\*\*"\]/);
  assert.match(source, /merge_group:\n\s+types: \[checks_requested\]/);
  assert.doesNotMatch(source, /\n  build:\n/, "no permanently skipped duplicate build job");
  const ci = fs.readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8");
  const policy = JSON.parse(
    fs.readFileSync(
      new URL("../../../config/quality/admission-policy.json", import.meta.url),
      "utf8"
    )
  );
  for (const job of ["build", "package-artifact", "electron-package-smoke"]) {
    assert.equal(policy.profiles.ci.jobs[job].disposition, "required", job);
    assert.match(ci, new RegExp("\\n  " + job + ":\\n"), "CI implements " + job);
  }
  assert.match(ci, /npm run build/);
  assert.match(ci, /npm run check:pack-boot/);
});
