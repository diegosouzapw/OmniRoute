// Guards scripts/release/merge-train.sh (merge-gates.md §7 — batch validation of N
// queued PRs as one merged result, replacing O(N²) per-PR CI re-runs). Only the
// side-effect-free surface is testable in unit scope: --plan mode (no worktree, no
// network) and argument validation.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { promisify } from "node:util";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pExecFile = promisify(execFile);
const SCRIPT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../scripts/release/merge-train.sh"
);

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

test("--plan binds the changelog gate to the requested base inside the detached worktree", async () => {
  const { code, stdout } = await run(["--plan", "release/v3.8.50", "11326"]);
  assert.equal(code, 0);
  assert.match(
    stdout,
    /worktree add .* --detach origin\/release\/v3\.8\.50/,
    "the train worktree must remain detached from the requested base"
  );
  assert.match(
    stdout,
    /env CHANGELOG_BASE_REF=origin\/release\/v3\.8\.50 node scripts\/check\/check-changelog-integrity\.mjs/,
    "the gate must not fall back to a different numerically highest release branch"
  );
});

test("--plan shell-quotes a hostile base before the gate command is evaluated", async () => {
  const tempDir = await mkdtemp(join(tmpdir(), "merge-train-plan-"));
  const dollarMarker = join(tempDir, "dollar-marker");
  const backtickMarker = join(tempDir, "backtick-marker");
  const semicolonMarker = join(tempDir, "semicolon-marker");
  const base =
    `release/v9.9.9 $(touch ${dollarMarker}) ` +
    `\`touch ${backtickMarker}\` whitespace gap ; touch ${semicolonMarker}`;

  try {
    const { code, stdout } = await run(["--plan", base, "11326"]);
    assert.equal(code, 0);

    const gateLine = stdout.split("\n").find((line) => line.includes("env CHANGELOG_BASE_REF="));
    assert.ok(gateLine, "the plan must include the changelog gate command");
    const plannedGate = gateLine.replace(/^\[merge-train\] \d+\. /, "");
    assert.ok(
      !plannedGate.includes(`CHANGELOG_BASE_REF=origin/${base}`),
      "hostile shell syntax must not appear unescaped in the eval-backed gate command"
    );

    // Exercise the exact plan command through the same eval boundary as the real
    // train, replacing only the gate executable with a side-effect-free env probe.
    const probe = plannedGate.replace(
      "node scripts/check/check-changelog-integrity.mjs",
      "printenv CHANGELOG_BASE_REF"
    );
    const { stdout: evaluatedBase } = await pExecFile("bash", ["-c", 'eval "$1"', "bash", probe]);
    assert.equal(evaluatedBase, `origin/${base}\n`);

    for (const marker of [dollarMarker, backtickMarker, semicolonMarker]) {
      await assert.rejects(access(marker), { code: "ENOENT" });
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("fast mode's UNIT_SUBDIRS allowlist mirrors package.json test:unit exactly", async () => {
  // Regression for the 2026-07-18 train red: tests/unit/autoCombo/ (a vitest-only
  // subdir) was fed to the node:test bucket because the fast filter had no subdir
  // allowlist. The script must classify changed tests with the SAME subdir set
  // test:unit runs, so files owned by another runner are skipped, not misrun.
  const script = await readFile(SCRIPT, "utf8");
  const scriptList = script.match(/UNIT_SUBDIRS=",([^"]+),"/)?.[1];
  assert.ok(scriptList, "merge-train.sh must declare the UNIT_SUBDIRS allowlist");
  const pkg = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  const pkgList = pkg.scripts["test:unit"].match(/tests\/unit\/\{([^}]+)\}/)?.[1];
  assert.ok(pkgList, "package.json test:unit must carry the {subdir} allowlist glob");
  assert.equal(
    scriptList,
    pkgList,
    "merge-train.sh UNIT_SUBDIRS must equal test:unit's subdir set"
  );
  assert.ok(
    !scriptList.split(",").includes("autoCombo"),
    "autoCombo belongs to vitest, not node:test"
  );
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

test("a red static gate is discriminated against the base before the train is blamed", async () => {
  // 2026-09-22: a 170-PR drain stalled because every train aborted on the first red
  // gate, and four of those gates (docs counts, mutation coverage, two API typecheck
  // errors) were already red on the release tip. merge-gates.md §3 requires
  // reproducing a failure on `origin/<base>` before calling it inherited — the script
  // must do that itself, and it must only forgive a red whose violations are IDENTICAL
  // to the base's, so a train that ADDS a violation still owns it.
  const script = await readFile(SCRIPT, "utf8");
  assert.match(script, /base_probe_ready\(\)/, "must have a base-probe worktree helper");
  assert.match(
    script,
    /worktree remove --force "\$BASE_WT"/,
    "the base probe must be torn down by the cleanup trap"
  );
  assert.match(script, /INHERITED\+=\("\$c"\)/, "an inherited red must be recorded, not silent");
  assert.match(
    script,
    /comm -23 <\(gate_violations/,
    "inherited must mean 'adds no violation the base does not already have'"
  );
  for (const loop of ["STATIC_GATES", "FULL_ONLY_GATES"]) {
    assert.match(
      script,
      new RegExp(`\\$\\{${loop}\\[@\\]\\}"; do\\n\\s*run_gate "\\$c" 1`),
      `${loop} must run with discrimination enabled`
    );
  }
  // The unit/vitest gates must NOT be discriminated: they run files the boarded PRs
  // added, which simply do not exist on the base — "red there too" would be ENOENT.
  assert.match(script, /run_gate "\$VITEST"\n/, "vitest must run without the discriminate flag");
});

test("--plan documents the inherited-red classification", async () => {
  const { code, stdout } = await run(["--plan", "release/v9.9.9", "111"]);
  assert.equal(code, 0);
  assert.match(stdout, /re-run on origin\/release\/v9\.9\.9/);
  assert.match(stdout, /INHERITED and the train continues/);
  assert.match(stdout, /ADDED violation/);
});

// Behavioral guard for the INHERITED classifier (merge-batch rework 2026-09-23). The
// first version only recognised ✗/✖/×/FAIL/✘ marker lines, so a gate that reports
// errors any other way (tsc's `error TS2322` for dashboard-typecheck) produced an EMPTY
// violation set on both sides — and an empty `comm` diff read as "inherited", even when
// the train ADDED a brand-new type error. The classifier must fail CLOSED.
function extractShellFunction(script: string, name: string): string {
  const m = script.match(new RegExp(`^${name}\\(\\) \\{\\n[\\s\\S]*?\\n\\}\\n`, "m"));
  assert.ok(m, `merge-train.sh must define ${name}()`);
  return m[0];
}

async function classify(trainLog: string, baseLog: string) {
  const script = await readFile(SCRIPT, "utf8");
  const reLine = script.match(/^GATE_ERROR_RE=.*$/m)?.[0] ?? "";
  const lib = [
    reLine,
    extractShellFunction(script, "gate_violations"),
    extractShellFunction(script, "gate_violation_count"),
    extractShellFunction(script, "classify_gate_red"),
  ].join("\n");
  const dir = await mkdtemp(join(tmpdir(), "merge-train-classify-"));
  try {
    await writeFile(join(dir, "lib.sh"), lib);
    await writeFile(join(dir, "train.log"), trainLog);
    await writeFile(join(dir, "base.log"), baseLog);
    try {
      const { stdout } = await pExecFile("bash", [
        "-c",
        'set -euo pipefail; source "$1/lib.sh"; classify_gate_red "$1/train.log" "$1/base.log"',
        "_",
        dir,
      ]);
      return { code: 0, stdout };
    } catch (err) {
      const e = err as { code?: number; stdout?: string };
      return { code: e.code ?? -1, stdout: e.stdout ?? "" };
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const TS_BASE =
  "src/app/a.tsx(10,5): error TS2322: Type 'string' is not assignable to type 'number'.\n";

test("a tsc-style gate red on the base that gains a NEW error on the train is NOT inherited", async () => {
  const train = TS_BASE + "src/app/b.tsx(3,1): error TS2339: Property 'x' does not exist.\n";
  const { code, stdout } = await classify(train, TS_BASE);
  assert.notEqual(code, 0, `train added a TS error but was forgiven: ${stdout}`);
  assert.doesNotMatch(stdout, /^INHERITED/);
  assert.match(stdout, /error TS2339/);
});

test("identical tsc errors on base and train are still classified INHERITED", async () => {
  const { code, stdout } = await classify(TS_BASE, TS_BASE);
  assert.equal(code, 0);
  assert.match(stdout, /^INHERITED/);
});

test("a red gate with no recognisable violation line is UNCLASSIFIABLE, never inherited", async () => {
  const noise = "npm ERR! code ELIFECYCLE\nnpm ERR! errno 1\n";
  const { code, stdout } = await classify(noise, noise);
  assert.notEqual(code, 0);
  assert.match(stdout, /^UNCLASSIFIABLE/);
});

test("the train repeating an already-known violation more times than the base is NOT inherited", async () => {
  const line = "✗ docs/README.md: provider count 360 ≠ 361\n";
  const { code, stdout } = await classify(line + line, line);
  assert.notEqual(code, 0);
  assert.match(stdout, /^NEW/);
});
