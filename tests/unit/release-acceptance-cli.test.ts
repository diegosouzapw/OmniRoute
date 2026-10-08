import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  exitFor,
  reduceManifests,
  main,
} from "../../scripts/quality/validate-release-acceptance.mjs";

const SHA = "30b5bf18fbe827a0283ce17e91bda22cc8b4c13e";
function key(id) {
  return { gate_id: id, suite_id: null, shard_index: null, shard_total: null };
}
function gate(id, status) {
  return {
    gate_id: id,
    suite_id: null,
    shard_index: null,
    shard_total: null,
    tested_sha: SHA,
    run_id: "1",
    run_attempt: 1,
    command_id: id,
    gate_type: "static",
    status,
    cause: null,
    exit_code: status === "PASS" ? 0 : 1,
    duration_ms: 1,
    evidence: [
      {
        artifact_id: "logs",
        member: "lint.log",
        algorithm: "sha256",
        digest: "7f227db1653b6b723b07c8f2f6eb488f1f09e2f083ca7a3f5e02bbb274f5ff2e",
      },
    ],
  };
}

test("exit mapping", () => {
  assert.equal(exitFor("VERIFIED"), 0);
  assert.equal(exitFor("FAILED"), 1);
  assert.equal(exitFor("UNVERIFIED"), 2);
});

test("three PASS manifests yield VERIFIED", () => {
  const plan = {
    required_gates: [key("a"), key("b"), key("c")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
  };
  const out = reduceManifests(plan, [
    { gates: [gate("a", "PASS")] },
    { gates: [gate("b", "PASS")] },
    { gates: [gate("c", "PASS")] },
  ]);
  assert.equal(out.verdict, "VERIFIED");
  assert.equal(exitFor(out.verdict), 0);
});

test("one FAIL yields FAILED", () => {
  const plan = {
    required_gates: [key("a")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
  };
  const out = reduceManifests(plan, [{ gates: [gate("a", "FAIL")] }]);
  assert.equal(out.verdict, "FAILED");
  assert.equal(exitFor(out.verdict), 1);
});

test("required missing yields UNVERIFIED", () => {
  const plan = {
    required_gates: [key("a"), key("b")],
    identity: { tested_sha: SHA, run_id: "1", run_attempt: 1 },
  };
  const out = reduceManifests(plan, [{ gates: [gate("a", "PASS")] }]);
  assert.equal(out.verdict, "UNVERIFIED");
  assert.equal(exitFor(out.verdict), 2);
});

test("workflow source-guard", () => {
  const text = readFileSync(".github/workflows/release-acceptance.yml", "utf8");
  assert.match(text, /name: Release acceptance/);
  assert.match(text, /cancel-in-progress: false/);
  assert.equal(text.includes("gh issue close"), false);
  assert.match(text, /if: github.event_name != 'pull_request'/);
});

test("schema_invalid does not throw when required_gates is missing", async () => {
  const dir = mkdtempSync(join(tmpdir(), "acc-"));
  writeFileSync(
    join(dir, "plan.json"),
    JSON.stringify({
      identity: {
        repository: "diegosouzapw/OmniRoute",
        run_id: "1",
        run_attempt: 1,
        workflow: "release-acceptance.yml",
        trigger: "push",
        scope: "release",
        requested_ref: "refs/heads/release/v3.8.51",
        base_sha: SHA,
        candidate_sha: SHA,
        tested_sha: SHA,
      },
      artifact: null,
    })
  );
  const man = join(dir, "m");
  mkdirSync(man);
  writeFileSync(join(man, "a.json"), JSON.stringify({ gates: [gate("a", "PASS")] }));
  const out = join(dir, "report.json");
  const code = await main([
    "node",
    "cli",
    "--plan",
    join(dir, "plan.json"),
    "--manifests",
    man,
    "--out",
    out,
  ]);
  assert.equal(code, 2);
  const report = JSON.parse(readFileSync(out, "utf8"));
  assert.equal(report.verdict, "UNVERIFIED");
  assert.ok(Array.isArray(report.required_gates));
  assert.ok(report.evidence_errors.some((e) => e.code === "empty_required_set"));
  assert.equal(
    report.evidence_errors.some((e) => e.code === "schema_invalid"),
    false
  );
});

test("schema_invalid keeps FAILED when reduce already failed", async () => {
  const dir = mkdtempSync(join(tmpdir(), "acc-fail-"));
  const plan = {
    required_gates: [key("a")],
    identity: {
      repository: "diegosouzapw/OmniRoute",
      run_id: "1",
      run_attempt: 1,
      workflow: "release-acceptance.yml",
      trigger: "push",
      scope: "release",
      requested_ref: "refs/heads/release/v3.8.51",
      base_sha: SHA,
      candidate_sha: SHA,
      tested_sha: SHA,
    },
    artifact: null,
  };
  writeFileSync(join(dir, "plan.json"), JSON.stringify(plan));
  const man = join(dir, "m");
  mkdirSync(man);
  const g = gate("a", "FAIL");
  g.unexpected = true;
  writeFileSync(join(man, "a.json"), JSON.stringify({ gates: [g] }));
  const out = join(dir, "report.json");
  const code = await main([
    "node",
    "cli",
    "--plan",
    join(dir, "plan.json"),
    "--manifests",
    man,
    "--out",
    out,
  ]);
  assert.equal(code, 1);
  const report = JSON.parse(readFileSync(out, "utf8"));
  assert.equal(report.verdict, "FAILED");
  assert.ok(report.evidence_errors.some((e) => e.code === "schema_invalid"));
});
