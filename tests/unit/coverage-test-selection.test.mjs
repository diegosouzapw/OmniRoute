import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  createCoverageTestPlan,
  verifyCoverageTestSelection,
} from "../../scripts/quality/coverage-test-selection.mjs";

const policyPath = "config/quality/coverage-test-selection.json";
const policy = readFileSync(new URL(`../../${policyPath}`, import.meta.url));
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "omni-test-selection-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (path, data) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), data);
  };
  write(policyPath, policy);
  const selection = JSON.parse(policy);
  write(
    "package.json",
    JSON.stringify({
      scripts: {
        "test:unit:ci:shard": selection.partitions
          .filter((part) => part.lane === "node")
          .map(
            (part) =>
              `node --test --test-shard=$TEST_SHARD ${part.include.map((pattern) => JSON.stringify(pattern)).join(" ")}`
          )
          .join(" && "),
      },
    })
  );
  for (const [id, path] of [
    ["vitest-node", "vitest.mcp.config.ts"],
    ["vitest-ui", "vitest.config.ts"],
  ]) {
    const part = selection.partitions.find((entry) => entry.id === id);
    write(
      path,
      `export default { test: { include: ${JSON.stringify(part.include)}, exclude: ${JSON.stringify(part.exclude)} } };`
    );
  }
  for (const path of [
    "tests/unit/first.test.ts",
    "tests/unit/lib/nested.test.ts",
    "tests/unit/deep/contract.test.mjs",
    "tests/unit/dashboard/view.test.ts",
    "tests/unit/serial/state.test.ts",
    "open-sse/mcp-server/__tests__/tool.test.ts",
    "tests/unit/ui/view.test.tsx",
    "src/shared/hooks/__tests__/hook.test.tsx",
    "tests/e2e/not-in-unit.test.ts",
  ])
    write(path, "// selection fixture\n");
  const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();
  git("init", "-q");
  const commit = () => {
    git("add", ".");
    return git(
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit-tree",
      git("write-tree"),
      "-m",
      "selection fixture"
    );
  };
  return { root, sha: commit(), write, commit };
}

test("independent policy plans all three Node segments and both Vitest lanes before execution", (t) => {
  const { root, sha } = fixture(t);
  const plan = createCoverageTestPlan(root, sha);
  assert.equal(plan.partitions.length, 26);
  assert.equal(plan.sha, sha);
  assert.equal(plan.releaseAcceptance, false);
  assert.equal(plan.shardAssignment, "explicit-files-round-robin/v1");
  assert.match(plan.selectionHash, /^[a-f0-9]{64}$/);
  const main = plan.partitions
    .filter((part) => part.segment === "node-main")
    .flatMap((part) => part.files);
  assert.deepEqual(main.sort(), [
    "tests/unit/deep/contract.test.mjs",
    "tests/unit/first.test.ts",
    "tests/unit/lib/nested.test.ts",
  ]);
  assert.equal(new Set(main).size, main.length);
  assert.ok(
    plan.partitions.some(
      (part) =>
        part.segment === "node-dashboard" &&
        part.files.includes("tests/unit/dashboard/view.test.ts")
    )
  );
  assert.ok(
    plan.partitions.some(
      (part) =>
        part.segment === "node-serial" && part.files.includes("tests/unit/serial/state.test.ts")
    )
  );
  assert.ok(plan.partitions.every((part) => !part.files.includes("tests/e2e/not-in-unit.test.ts")));
  // The same test can intentionally execute in different Vitest environments.
  for (const lane of ["vitest-node", "vitest-ui"])
    assert.ok(
      plan.partitions
        .find((part) => part.lane === lane)
        .files.includes("src/shared/hooks/__tests__/hook.test.tsx")
    );
});

test("selection verifier rejects missing, extra and duplicate files, not only missing PIDs", (t) => {
  const { root, sha } = fixture(t);
  const plan = createCoverageTestPlan(root, sha);
  const part = plan.partitions.find((partition) => partition.lane === "vitest-ui");
  assert.equal(
    verifyCoverageTestSelection(root, sha, plan, part.id, [...part.files].reverse()),
    true
  );
  for (const files of [
    part.files.slice(1),
    [...part.files, "tests/unit/not-selected.test.tsx"],
    [...part.files, part.files[0]],
    ["../outside.test.tsx"],
  ]) {
    assert.throws(
      () => verifyCoverageTestSelection(root, sha, plan, part.id, files),
      /coverage selection/
    );
  }
});

test("an incomplete or rewritten plan cannot certify its own reduced selection", (t) => {
  const { root, sha } = fixture(t);
  const plan = createCoverageTestPlan(root, sha);
  const altered = structuredClone(plan);
  altered.partitions = altered.partitions.filter((part) => part.segment !== "node-serial");
  assert.throws(
    () =>
      verifyCoverageTestSelection(
        root,
        sha,
        altered,
        altered.partitions[0].id,
        altered.partitions[0].files
      ),
    /frozen plan mismatch/
  );
  assert.throws(() =>
    verifyCoverageTestSelection(root, "0".repeat(40), plan, plan.partitions[0].id, [])
  );
});

test("working-tree changes cannot silently alter the committed selection", (t) => {
  const { root, sha, write } = fixture(t);
  const before = createCoverageTestPlan(root, sha);
  write(policyPath, "{}\n");
  write("tests/unit/new-untracked.test.ts", "// untracked\n");
  assert.deepEqual(createCoverageTestPlan(root, sha), before);
});

test("policy cannot drop dashboard, serial or either Vitest lane", (t) => {
  const { root, write, commit } = fixture(t);
  for (const id of ["node-dashboard", "node-serial", "vitest-node", "vitest-ui"]) {
    const altered = JSON.parse(policy);
    altered.partitions = altered.partitions.filter((part) => part.id !== id);
    write(policyPath, JSON.stringify(altered));
    assert.throws(() => createCoverageTestPlan(root, commit()), /required partition policy/);
  }
});

test("runner selector or exclude drift cannot silently certify a smaller suite", (t) => {
  const { root, write, commit } = fixture(t);
  const configuration = JSON.parse(policy).partitions.find((part) => part.id === "vitest-ui");
  write(
    "vitest.config.ts",
    `export default {test:{include:${JSON.stringify(configuration.include)},exclude:["**/*"]}};`
  );
  assert.throws(() => createCoverageTestPlan(root, commit()), /Vitest selector policy drift/);
  write(
    "vitest.config.ts",
    `export default {test:{include:computeIncludes(),exclude:${JSON.stringify(configuration.exclude)}}};`
  );
  assert.throws(() => createCoverageTestPlan(root, commit()), /literal string array/);
});

test("CLI freezes one exact Git selection and refuses to overwrite an existing plan", (t) => {
  const { root, sha } = fixture(t);
  const out = join(root, "plan.json");
  const script = fileURLToPath(
    new URL("../../scripts/quality/coverage-test-selection.mjs", import.meta.url)
  );
  const args = [script, "--root", root, "--sha", sha, "--out", out];
  const child = spawnSync(process.execPath, args, { encoding: "utf8", timeout: 10000 });
  assert.equal(child.status, 0, child.stdout + child.stderr);
  assert.deepEqual(JSON.parse(readFileSync(out, "utf8")), createCoverageTestPlan(root, sha));
  const duplicate = spawnSync(process.execPath, args, { encoding: "utf8", timeout: 10000 });
  assert.notEqual(duplicate.status, 0);
});
