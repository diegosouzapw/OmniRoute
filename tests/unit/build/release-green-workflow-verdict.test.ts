import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parse } from "yaml";

const root = new URL("../../../", import.meta.url);
type Step = { name?: string; id?: string; run?: string; if?: string; env?: Record<string, string> };
const workflow = parse(
  readFileSync(new URL(".github/workflows/nightly-release-green.yml", root), "utf8")
) as {
  jobs: Record<string, { steps: Step[] }>;
};
const sha = "1".repeat(40);

function execute(job: string, validatorExit: number, report: string, event = "schedule") {
  const dir = mkdtempSync(join(tmpdir(), "omni-green-workflow-"));
  try {
    mkdirSync(join(dir, "scripts/quality"), { recursive: true });
    mkdirSync(join(dir, "scripts/ci"), { recursive: true });
    writeFileSync(
      join(dir, "scripts/quality/validate-release-green.mjs"),
      "process.stdout.write(process.env.FIXTURE_REPORT); process.exit(Number(process.env.FIXTURE_EXIT));"
    );
    const verifier = new URL("scripts/ci/release-green-result.mjs", root);
    if (existsSync(verifier)) cpSync(verifier, join(dir, "scripts/ci/release-green-result.mjs"));
    const outputs = join(dir, "outputs");
    writeFileSync(outputs, "");
    const env = {
      ...process.env,
      EVENT_NAME: event,
      GITHUB_OUTPUT: outputs,
      FIXTURE_EXIT: String(validatorExit),
      FIXTURE_REPORT: report,
      VALIDATED_SHA: sha,
    };
    const validate = workflow.jobs[job].steps.find((s) => s.id === "validate")!;
    const result = spawnSync("bash", ["-euo", "pipefail", "-c", validate.run!], {
      cwd: dir,
      env,
      encoding: "utf8",
    });
    assert.equal(result.error, undefined);
    const values = Object.fromEntries(
      readFileSync(outputs, "utf8")
        .trim()
        .split("\n")
        .map((l) => l.split("="))
    );
    const enforce = workflow.jobs[job].steps.find((s) => s.name === "Enforce validation verdict");
    if (!enforce) return result.status;
    assert.equal(enforce.if, "always()");
    const final = spawnSync("bash", ["-euo", "pipefail", "-c", enforce.run!], {
      cwd: dir,
      encoding: "utf8",
      env: { ...env, VALIDATION_EXIT: values.exit ?? "", REPORT_PREFIX: job },
    });
    assert.equal(final.error, undefined);
    return final.status;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const pass = JSON.stringify({
  schemaVersion: 1,
  candidateSha: sha,
  profile: "full",
  releaseGreen: true,
  hardFailures: [],
  checks: [{ id: "fixture", kind: "hard", ok: true }],
});

for (const job of ["release-green", "main-green"]) {
  test(`${job}: a failed validator cannot produce a successful workflow`, () => {
    assert.notEqual(execute(job, 42, ""), 0);
  });
  test(`${job}: exit zero with absent or inconsistent evidence fails closed`, () => {
    for (const report of [
      "",
      "{}",
      "not-json",
      pass.replace('"releaseGreen":true', '"releaseGreen":false'),
      pass.replace('"ok":true', '"ok":false'),
      pass.replace(sha, "2".repeat(40)),
      pass.replace('"profile":"full"', '"profile":"quick"'),
      pass.replace('"id":"fixture"', '"id":""'),
      pass.replace('"checks":[', '"checks":[{"id":"fixture","kind":"hard","ok":true},'),
    ]) {
      assert.notEqual(execute(job, 0, report), 0, report);
    }
  });
  test(`${job}: a complete consistent PASS retains success`, () => {
    assert.equal(execute(job, 0, pass), 0);
    assert.equal(execute(job, 0, pass.replace('"profile":"full"', '"profile":"quick"'), "push"), 0);
  });
  test(`${job}: quick runs cannot close a full-gate incident`, () => {
    const close = workflow.jobs[job].steps.find((s) => s.name?.startsWith("Close tracking issue"))!;
    assert.match(close.if ?? "", /github\.event_name != 'push'/);
    assert.match(close.run ?? "", /refs\/heads\//);
    assert.match(close.run ?? "", /VALIDATED_SHA/);
  });
  test(`${job}: only the still-current validated SHA can close an incident`, () => {
    const close = workflow.jobs[job].steps.find((s) => s.name?.startsWith("Close tracking issue"))!;
    const dir = mkdtempSync(join(tmpdir(), "omni-green-close-"));
    try {
      const calls = join(dir, "gh-calls");
      for (const current of ["2".repeat(40), sha]) {
        writeFileSync(calls, "");
        const result = spawnSync(
          "bash",
          [
            "-euo",
            "pipefail",
            "-c",
            `
          git() { printf '%s\\trefs/heads/main\\n' "$FIXTURE_CURRENT_SHA"; }
          gh() {
            printf '%s\\n' "$*" >> "$FIXTURE_GH_CALLS"
            if [ "$2" = "list" ]; then printf '123\\n'; fi
          }
          ${close.run}
        `,
          ],
          {
            encoding: "utf8",
            env: {
              ...process.env,
              VALIDATED_SHA: sha,
              FIXTURE_CURRENT_SHA: current,
              FIXTURE_GH_CALLS: calls,
              TARGET: "release/v3.8.51",
              RUN_URL: "https://example.invalid/runs/1",
              GITHUB_REPOSITORY: "fixture/repo",
            },
          }
        );
        assert.equal(result.status, 0, result.stderr);
        const recorded = readFileSync(calls, "utf8");
        if (current === sha) assert.match(recorded, /issue close 123/);
        else assert.equal(recorded, "", "stale validation must not mutate issues");
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
