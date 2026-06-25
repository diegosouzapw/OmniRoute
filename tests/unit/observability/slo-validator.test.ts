/**
 * Tests for scripts/validate-prometheus-rules.mjs (PR-008).
 *
 * The validator is a standalone Node ESM script. We exercise it via
 * `node:child_process.spawnSync` against throwaway rule files written
 * under a temp directory so we don't have to mutate the repo's own
 * deploy/prometheus/ files just to test error paths.
 *
 * Coverage:
 *  1. valid ruleset passes (exit 0).
 *  2. alert with missing summary annotation → exit 1.
 *  3. alert with unparseable PromQL expression → exit 1.
 *  4. alert with missing runbook_url annotation → exit 1.
 *  5. alert whose runbook_url points to a non-existent file → exit 1.
 *
 * The script reads `process.cwd()` to locate files, so we set CWD to
 * the temp dir before spawning it.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, "../../..");
const VALIDATOR = path.join(REPO_ROOT, "scripts/validate-prometheus-rules.mjs");

function makeTempWorkspace() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "slo-validator-test-"));
  // The script's RULE_FILES list is hard-coded to deploy/prometheus/*.
  // Build a matching layout under the temp dir.
  fs.mkdirSync(path.join(dir, "deploy/prometheus/rules"), { recursive: true });
  fs.mkdirSync(path.join(dir, "deploy/prometheus/alerts"), { recursive: true });
  fs.mkdirSync(path.join(dir, "docs/runbooks"), { recursive: true });
  // Stub runbook that valid cases will reference.
  fs.writeFileSync(
    path.join(dir, "docs/runbooks/StubRunbook.md"),
    "# Stub runbook\n"
  );
  return dir;
}

function writeValidRuleset(dir) {
  // Minimal valid alert + recording + SLO objective.
  const slos = `groups:
  - name: stub-group
    rules:
      - alert: StubAlert
        expr: rate(omniroute_http_requests_total[5m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: stub alert fired
          description: stub description
          runbook_url: docs/runbooks/StubRunbook.md
`;
  const recording = `groups:
  - name: stub-recording
    rules:
      - record: stub:metric:rate_5m
        expr: rate(omniroute_http_requests_total[5m])
        annotations:
          summary: stub recording
          description: stub description
          runbook_url: docs/runbooks/StubRunbook.md
`;
  const objectives = `groups:
  - name: stub-objectives
    rules:
      - record: stub:slo:availability
        expr: vector(0.999)
        labels:
          window: 30d
          indicator: availability
        annotations:
          name: stub-availability
          description: stub availability SLO
          objective: "0.999"
`;
  fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-slos.yaml"), slos);
  fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-recording.yaml"), recording);
  fs.writeFileSync(path.join(dir, "deploy/prometheus/alerts/slo-objectives.yaml"), objectives);
}

function runValidator(dir) {
  return spawnSync("node", [VALIDATOR], {
    cwd: dir,
    encoding: "utf8",
    // js-yaml is bundled in the repo's node_modules; the validator resolves
    // it via its own CWD's node_modules. To avoid a global install we copy
    // or symlink the repo's node_modules into the temp dir. Spawning the
    // validator with NODE_PATH pointing at the repo's node_modules avoids
    // any filesystem mutations.
    env: {
      ...process.env,
      NODE_PATH: path.join(REPO_ROOT, "node_modules"),
    },
  });
}

test("slo-validator: valid ruleset passes", () => {
  const dir = makeTempWorkspace();
  try {
    writeValidRuleset(dir);
    const result = runValidator(dir);
    assert.equal(result.status, 0, `expected exit 0, got ${result.status}\nstderr: ${result.stderr}`);
    assert.match(result.stdout, /Prometheus rule validation OK/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("slo-validator: alert with missing summary fails", () => {
  const dir = makeTempWorkspace();
  try {
    writeValidRuleset(dir);
    // Drop `summary` from the alert annotations.
    const broken = `groups:
  - name: stub-group
    rules:
      - alert: StubAlert
        expr: rate(omniroute_http_requests_total[5m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          description: stub description
          runbook_url: docs/runbooks/StubRunbook.md
`;
    fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-slos.yaml"), broken);
    const result = runValidator(dir);
    assert.notEqual(result.status, 0, "expected non-zero exit");
    assert.match(result.stderr, /missing or empty annotation 'summary'/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("slo-validator: alert with invalid PromQL fails", () => {
  const dir = makeTempWorkspace();
  try {
    writeValidRuleset(dir);
    // Two invalid PromQL shapes are exercised here:
    //   (a) expr present but with unbalanced parentheses (rate(...),
    //       missing the close paren) — a syntax error the validator's
    //       paren-balance check catches.
    //   (b) expr field omitted entirely — caught by the empty-expr check.
    // The validator must fail with a non-zero exit on either.
    const broken = `groups:
  - name: stub-group
    rules:
      - alert: StubAlertUnbalanced
        expr: rate(omniroute_http_requests_total[5m]
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: stub alert unbalanced
          description: stub description
          runbook_url: docs/runbooks/StubRunbook.md
      - alert: StubAlertMissing
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: stub alert missing expr
          description: stub description
          runbook_url: docs/runbooks/StubRunbook.md
`;
    fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-slos.yaml"), broken);
    const result = runValidator(dir);
    assert.notEqual(result.status, 0, "expected non-zero exit for invalid PromQL");
    assert.match(
      result.stderr,
      /unbalanced parentheses|missing or empty 'expr'/,
      `expected expr-related error, got stderr: ${result.stderr}`
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("slo-validator: alert with missing runbook_url fails", () => {
  const dir = makeTempWorkspace();
  try {
    writeValidRuleset(dir);
    const broken = `groups:
  - name: stub-group
    rules:
      - alert: StubAlert
        expr: rate(omniroute_http_requests_total[5m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: stub alert
          description: stub description
`;
    fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-slos.yaml"), broken);
    const result = runValidator(dir);
    assert.notEqual(result.status, 0, "expected non-zero exit");
    assert.match(result.stderr, /runbook_url/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("slo-validator: runbook_url pointing to non-existent file fails", () => {
  const dir = makeTempWorkspace();
  try {
    writeValidRuleset(dir);
    const broken = `groups:
  - name: stub-group
    rules:
      - alert: StubAlert
        expr: rate(omniroute_http_requests_total[5m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: stub alert
          description: stub description
          runbook_url: docs/runbooks/DoesNotExist.md
`;
    fs.writeFileSync(path.join(dir, "deploy/prometheus/rules/omniroute-slos.yaml"), broken);
    const result = runValidator(dir);
    assert.notEqual(result.status, 0, "expected non-zero exit");
    assert.match(result.stderr, /DoesNotExist\.md/);
    assert.match(result.stderr, /does not exist on disk/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
