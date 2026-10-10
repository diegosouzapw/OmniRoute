import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { Script } from "node:vm";
import test from "node:test";
import { transformSync } from "esbuild";
import { createCoverageScope } from "../../scripts/quality/coverage-scope.mjs";
import { instrumentCoverageSource } from "../../scripts/quality/coverage-instrumenter.mjs";

const source = "export function choose(flag) { return flag ? 1 : 2; }";
const unused = "export function untouched() { return 42; }";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "omni-coverage-union-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "src"));
  writeFileSync(join(root, "src/choose.js"), source);
  writeFileSync(join(root, "src/unused.js"), unused);
  const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" });
  git("init", "-q");
  git("add", "src");
  const tree = git("write-tree").trim();
  // Plumbing creates fixture objects without invoking or bypassing repository hooks.
  const sha = git(
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "commit-tree",
    tree,
    "-m",
    "coverage fixture"
  ).trim();
  const scope = createCoverageScope(root, sha);
  const lanes = ["node", "vitest-node", "vitest-ui"];
  const plan = {
    schemaVersion: 1,
    sha,
    scopeHash: scope.scopeHash,
    runId: "fixture-run",
    partitions: lanes.map((lane) => ({ lane, shard: "1", processes: ["worker-1"] })),
  };
  const instrumented = instrumentCoverageSource(source, "src/choose.js");
  const receipts = lanes.map((lane, index) => {
    const compiled = transformSync(instrumented.code, { format: "cjs" });
    const context = { module: { exports: {} }, require: createRequire(import.meta.url) };
    new Script(compiled.code).runInNewContext(context, {
      contextCodeGeneration: { strings: false, wasm: false },
      timeout: 1000,
    });
    context.module.exports.choose(index === 0);
    return {
      schemaVersion: 1,
      sha,
      scopeHash: scope.scopeHash,
      runId: plan.runId,
      lane,
      shard: "1",
      processId: "worker-1",
      completed: true,
      exitCode: 0,
      instrumenter: instrumented.identity.instrumenter,
      sources: { "src/choose.js": instrumented.identity.sourceHash },
      coverage: JSON.parse(JSON.stringify(context.__coverage__)),
    };
  });
  return { root, sha, scope, plan, receipts };
}

test("raw complementary hits merge while a never-imported production file remains zero", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  const result = mergeCoverageEvidence(input);
  assert.deepEqual(Object.keys(result.coverage).sort(), ["src/choose.js", "src/unused.js"]);
  const counts = Object.values(result.coverage["src/choose.js"].b).flat();
  assert.deepEqual(counts, [1, 2]);
  assert.ok(Object.values(result.coverage["src/unused.js"].s).every((count) => count === 0));
  assert.equal(result.summary.total.functions.total, 2);
  assert.equal(result.summary.total.functions.covered, 1);
  assert.equal(result.releaseAcceptance, false);
  assert.equal(result.complete, true);
});

test("each observed file binds its original source hash, not only its map shape", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  for (const sources of [
    undefined,
    {},
    { "src/choose.js": "a".repeat(64) },
    { ...input.receipts[0].sources, "src/extra.js": "a".repeat(64) },
  ]) {
    const changed = structuredClone(input);
    changed.receipts[0].sources = sources;
    assert.throws(() => mergeCoverageEvidence(changed), /coverage evidence/);
  }
});

test("missing, duplicate, unexpected or failed processes cannot produce a complete report", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  for (const mutate of [
    (value) => value.receipts.pop(),
    (value) => value.receipts.push(structuredClone(value.receipts[0])),
    (value) => {
      value.receipts[0].processId = "unplanned";
    },
    (value) => {
      value.receipts[0].completed = false;
    },
    (value) => {
      value.receipts[0].exitCode = 1;
    },
    (value) => {
      value.plan.partitions.pop();
      value.receipts.pop();
    },
    (value) => {
      value.plan.partitions[0].processes.push("lost-child");
    },
  ]) {
    const changed = structuredClone(input);
    mutate(changed);
    assert.throws(() => mergeCoverageEvidence(changed), /coverage evidence/);
  }
});

test("SHA, scope, run and instrumenter identities must agree before composition", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  for (const mutate of [
    (value) => {
      value.plan.sha = "a".repeat(40);
    },
    (value) => {
      value.plan.scopeHash = "b".repeat(64);
    },
    (value) => {
      value.plan.runId = "";
    },
    (value) => {
      value.receipts[0].sha = "a".repeat(40);
    },
    (value) => {
      value.receipts[0].scopeHash = "b".repeat(64);
    },
    (value) => {
      value.receipts[0].runId = "stale-attempt";
    },
    (value) => {
      value.receipts[0].schemaVersion = 2;
    },
    (value) => {
      value.receipts[0].instrumenter = "different-instrumenter";
    },
  ]) {
    const changed = structuredClone(input);
    mutate(changed);
    assert.throws(() => mergeCoverageEvidence(changed), /coverage evidence/);
  }
});

test("different maps, out-of-scope files and invalid counters fail instead of being remapped", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  for (const mutate of [
    (map) => {
      map.path = "src/elsewhere.js";
    },
    (map) => {
      map.statementMap[0].start.line += 1;
    },
    (map) => {
      map.fnMap[0].name = "different-transform";
    },
    (map) => {
      map.branchMap[0].locations.pop();
    },
    (map) => {
      delete map.s[0];
    },
    (map) => {
      map.s[0] = -1;
    },
    (map) => {
      map.f[0] = 0.5;
    },
    (map) => {
      map.b[0].push(0);
    },
    (map) => {
      map.b[0][0] = Number.MAX_SAFE_INTEGER + 1;
    },
  ]) {
    const changed = structuredClone(input);
    mutate(changed.receipts[0].coverage["src/choose.js"]);
    assert.throws(() => mergeCoverageEvidence(changed), /coverage evidence/);
  }
  const outside = structuredClone(input);
  outside.receipts[0].coverage["src/not-in-scope.js"] =
    outside.receipts[0].coverage["src/choose.js"];
  assert.throws(() => mergeCoverageEvidence(outside), /coverage evidence/);
});

test("counter sums cannot overflow even if each individual receipt has safe integers", async (t) => {
  const { mergeCoverageEvidence } = await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  input.receipts[0].coverage["src/choose.js"].s[0] = Number.MAX_SAFE_INTEGER;
  assert.throws(() => mergeCoverageEvidence(input), /coverage evidence.*counters/);
});

test("JSON and LCOV describe the same union and a 50% function result fails the unchanged floor", async (t) => {
  const { mergeCoverageEvidence, writeCoverageReports } =
    await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  const result = mergeCoverageEvidence(input);
  const out = join(input.root, "reports");
  const verdict = writeCoverageReports(result, out);
  assert.equal(verdict.floorVerdict, "FAIL");
  assert.deepEqual(verdict.floors, { statements: 60, lines: 60, functions: 60, branches: 60 });
  const summary = JSON.parse(readFileSync(join(out, "coverage-summary.json"), "utf8"));
  assert.deepEqual(summary, result.summary);
  const coverage = JSON.parse(readFileSync(join(out, "coverage-final.json"), "utf8"));
  assert.deepEqual(coverage, result.coverage);
  const lcov = readFileSync(join(out, "lcov.info"), "utf8");
  assert.match(lcov, /SF:src\/unused.js/);
  assert.match(lcov, /FNDA:0,untouched/);
  assert.equal(lcov.split("end_of_record").length - 1, 2);
  assert.equal(verdict.releaseAcceptance, false);
});

test("the CLI emits reports but exits nonzero below the floor, and fails closed on missing processes", async (t) => {
  const input = fixture(t);
  const scopePath = join(input.root, "scope.json");
  const planPath = join(input.root, "plan.json");
  const receiptsPath = join(input.root, "receipts");
  mkdirSync(receiptsPath);
  writeFileSync(scopePath, JSON.stringify(input.scope));
  writeFileSync(planPath, JSON.stringify(input.plan));
  input.receipts.forEach((receipt, index) =>
    writeFileSync(join(receiptsPath, `${index}.json`), JSON.stringify(receipt))
  );
  const script = new URL("../../scripts/quality/coverage-union.mjs", import.meta.url);
  const args = [
    script.pathname,
    "--root",
    input.root,
    "--sha",
    input.sha,
    "--scope",
    scopePath,
    "--plan",
    planPath,
    "--receipts",
    receiptsPath,
    "--out",
    join(input.root, "cli-reports"),
  ];
  const run = () => {
    try {
      return {
        code: 0,
        stdout: execFileSync(process.execPath, args, { encoding: "utf8", timeout: 15000 }),
      };
    } catch (error) {
      return { code: error.status, stdout: error.stdout, stderr: error.stderr };
    }
  };
  const result = run();
  assert.equal(result.code, 1);
  assert.equal(JSON.parse(result.stdout).floorVerdict, "FAIL");
  assert.match(readFileSync(join(input.root, "cli-reports/lcov.info"), "utf8"), /FNDA:0,untouched/);
  rmSync(join(receiptsPath, "0.json"));
  const incomplete = run();
  assert.equal(incomplete.code, 1);
  assert.equal(incomplete.stdout.trim(), "");
  assert.match(incomplete.stderr, /missing process receipt/);
});
