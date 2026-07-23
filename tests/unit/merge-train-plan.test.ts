// Guards scripts/release/merge-train.sh (merge-gates.md §7 — batch validation of N
// queued PRs as one merged result, replacing O(N²) per-PR CI re-runs). Only the
// side-effect-free surface is testable in unit scope: --plan mode (no worktree, no
// network) and argument validation.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pExecFile = promisify(execFile);
const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), "../../scripts/release/merge-train.sh");

async function run(args: string[]) {
  try {
    const { stdout, stderr } = await pExecFile("bash", [SCRIPT, ...args]);
    return { code: 0, stdout, stderr };
  } catch (err) {
    const e = err as { code?: number; stdout?: string; stderr?: string };
    return { code: e.code ?? -1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

test("--plan prints the full step plan without touching anything and exits 0", async () => {
  const { code, stdout } = await run(["--plan", "release/v9.9.9", "111", "222"]);
  assert.equal(code, 0);
  assert.match(stdout, /PLAN \(full\) — base=origin\/release\/v9\.9\.9 prs=111 222/);
  assert.match(stdout, /worktree add \.claude\/worktrees\/merge-train-/);
  assert.match(stdout, /pull\/111\/head/);
  assert.match(stdout, /pull\/222\/head/);
  // the parity suite is fully enumerated in the plan
  for (const gate of [
    "typecheck:core",
    "check-file-size.mjs",
    "check-complexity.mjs",
    "check-cognitive-complexity.mjs",
    "check-changelog-integrity.mjs",
    "npm run test:unit",
    "test:vitest",
  ]) {
    assert.ok(stdout.includes(gate), `plan must include ${gate}`);
  }
  // Speed guard (2026-07-18): full mode must use the box-tuned `test:unit` runner
  // (--test-concurrency=20), never the two sequential 4-core CI shards that ran the
  // dominant phase at ~25% of the box.
  assert.ok(!stdout.includes("TEST_SHARD="), "full mode must not use the sequential CI shards");
  assert.match(stdout, /--admin evidence/);
  assert.match(stdout, /teardown: git worktree remove/);
});

test("--plan --fast swaps the full unit suite for changed-tests, keeps static gates + vitest", async () => {
  const { code, stdout } = await run(["--plan", "--fast", "release/v9.9.9", "111"]);
  assert.equal(code, 0);
  assert.match(stdout, /PLAN \(fast\) — base=origin\/release\/v9\.9\.9 prs=111/);
  for (const gate of [
    "typecheck:core",
    "check-file-size.mjs",
    "check-complexity.mjs",
    "check-cognitive-complexity.mjs",
    "check-changelog-integrity.mjs",
    "test:vitest",
  ]) {
    assert.ok(stdout.includes(gate), `fast plan must still include ${gate}`);
  }
  assert.match(stdout, /\(fast\) run node:test files changed by the boarded PRs/);
  assert.ok(!stdout.includes("npm run test:unit"), "fast mode must not run the full unit suite");
});

test("rejects an unknown flag", async () => {
  const { code, stderr } = await run(["--nope", "release/v9.9.9", "111"]);
  assert.equal(code, 1);
  assert.match(stderr, /unknown flag/);
});

test("usage error without enough args", async () => {
  const { code, stderr } = await run(["--plan", "release/v9.9.9"]);
  assert.equal(code, 1);
  assert.match(stderr, /usage:/);
});

test("rejects a non-numeric PR ref", async () => {
  const { code, stderr } = await run(["--plan", "release/v9.9.9", "12a"]);
  assert.equal(code, 1);
  assert.match(stderr, /not numeric/);
});
