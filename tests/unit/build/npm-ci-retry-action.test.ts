import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const action = parse(
  readFileSync(new URL("../../../.github/actions/npm-ci-retry/action.yml", import.meta.url), "utf8")
) as { runs: { steps: Array<{ name?: string; shell?: string; run?: string }> } };
const install = action.runs.steps.find((step) => step.name?.startsWith("npm ci"));

function runInstall(codes: number[]) {
  assert.equal(install?.shell, "bash");
  assert.ok(install?.run);
  // Execute the actual composite shell. Only npm/network and sleep cross the fixture boundary.
  const result = spawnSync(
    "bash",
    [
      "--noprofile",
      "--norc",
      "-eo",
      "pipefail",
      "-c",
      `
    IFS=, read -r -a codes <<< "$FIXTURE_NPM_CODES"
    attempt_count=0
    npm() {
      local code="\${codes[$attempt_count]:-99}"
      attempt_count=$((attempt_count + 1))
      printf 'ATTEMPT:%s\\n' "$*"
      return "$code"
    }
    sleep() { printf 'DELAY:%s\\n' "$*"; }
    ${install.run}
  `,
    ],
    {
      env: { ...process.env, FIXTURE_NPM_CODES: codes.join(",") },
      encoding: "utf8",
      timeout: 5_000,
    }
  );
  assert.equal(result.error, undefined);
  return {
    ...result,
    attempts: result.stdout.split("\n").filter((line) => line.startsWith("ATTEMPT:")),
    delays: result.stdout.split("\n").filter((line) => line.startsWith("DELAY:")),
  };
}

test("exhausted npm ci retries fail the composite with the last install exit", () => {
  const result = runInstall([41, 42, 43]);
  assert.equal(result.status, 43, result.stderr);
  assert.equal(result.attempts.length, 3);
  assert.deepEqual(result.delays, ["DELAY:20", "DELAY:40"]);
  assert.ok(result.attempts.every((line) => /^ATTEMPT:ci(?: |$)/.test(line)));
});

test("a deterministic install failure never becomes a successful cache miss", () => {
  assert.equal(runInstall([42, 42, 42]).status, 42);
});

test("a successful retry stops further installs", () => {
  const result = runInstall([42, 0, 43]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.attempts.length, 2);
  assert.deepEqual(result.delays, ["DELAY:20"]);
});

test("an initial successful install does not wait or retry", () => {
  const result = runInstall([0]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.attempts.length, 1);
  assert.deepEqual(result.delays, []);
});
