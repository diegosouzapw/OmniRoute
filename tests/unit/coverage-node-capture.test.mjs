import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { createCoverageScope } from "../../scripts/quality/coverage-scope.mjs";

const register = fileURLToPath(
  new URL("../../scripts/quality/coverage-node-register.mjs", import.meta.url)
);
const tsx = new URL("../../node_modules/tsx/dist/esm/index.mjs", import.meta.url).href;

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "omni-node-capture-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "src"));
  mkdirSync(join(root, "tests"));
  writeFileSync(join(root, "package.json"), '{"type":"module"}');
  writeFileSync(
    join(root, "src/read.ts"),
    "const seed = <number>41; export function read(flag: boolean) { return flag ? seed + 1 : 0; } export function unused() { return -1; }"
  );
  writeFileSync(join(root, "src/require.cjs"), "module.exports = (flag) => flag ? 7 : 8;");
  writeFileSync(join(root, "src/never.ts"), "export function neverImported() { return 123; }");
  const git = (...args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" });
  git("init", "-q");
  git("add", ".");
  const sha = git(
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "commit-tree",
    git("write-tree").trim(),
    "-m",
    "capture fixture"
  ).trim();
  const scope = createCoverageScope(root, sha);
  const scopeFile = join(root, "scope.json");
  writeFileSync(scopeFile, JSON.stringify(scope));
  writeFileSync(
    join(root, "tests/fixture.mjs"),
    `
import test from 'node:test'; import assert from 'node:assert/strict';
import { read } from '../src/read.ts'; import required from '../src/require.cjs';
test('public returns', () => { assert.equal(read(true), 42); assert.equal(required(false), 8); });
`
  );
  const directory = join(root, "capture");
  const run = () =>
    spawnSync(
      process.execPath,
      ["--import", tsx, "--import", register, "--test", "--test-force-exit", "tests/fixture.mjs"],
      {
        cwd: root,
        encoding: "utf8",
        timeout: 20000,
        env: {
          ...process.env,
          NODE_TEST_CONTEXT: undefined,
          OMNI_COVERAGE_ROOT: root,
          OMNI_COVERAGE_SCOPE: scopeFile,
          OMNI_COVERAGE_SHA: sha,
          OMNI_COVERAGE_RUN_ID: "capture-fixture",
          OMNI_COVERAGE_SHARD: "serial",
          OMNI_COVERAGE_DIR: directory,
        },
      }
    );
  return { root, sha, scope, directory, run };
}

test("real Node/tsx ESM and CJS hits survive the native runner's force-exit", async (t) => {
  const input = fixture(t);
  const child = input.run();
  assert.equal(child.error, undefined, child.error?.message);
  assert.equal(child.status, 0, child.stdout + child.stderr);
  assert.match(child.stdout, /public returns/);
  const receipts = readdirSync(join(input.directory, "receipts")).map((file) =>
    JSON.parse(readFileSync(join(input.directory, "receipts", file), "utf8"))
  );
  const worker = receipts.find((receipt) => receipt.coverage["src/read.ts"]);
  assert.ok(worker, "the isolated test process must flush its own counters");
  assert.equal(worker.completed, true);
  assert.equal(worker.exitCode, 0);
  assert.equal(worker.sha, input.sha);
  assert.equal(worker.scopeHash, input.scope.scopeHash);
  assert.ok(Object.values(worker.coverage["src/read.ts"].f).includes(0));
  assert.ok(Object.values(worker.coverage["src/read.ts"].f).some((count) => count > 0));
  assert.ok(
    Object.values(worker.coverage["src/require.cjs"].b)
      .flat()
      .some((count) => count > 0)
  );
  assert.equal(
    worker.sources["src/read.ts"],
    input.scope.files.find((file) => file.path === "src/read.ts").sourceHash
  );
  assert.equal(readdirSync(join(input.directory, "started")).length, receipts.length);
  const { readNodeCapture } = await import("../../scripts/quality/coverage-capture-ledger.mjs");
  const ledger = readNodeCapture({
    directory: input.directory,
    expectedEntries: [join(input.root, "tests/fixture.mjs")],
    sha: input.sha,
    scopeHash: input.scope.scopeHash,
    runId: "capture-fixture",
    shard: "serial",
  });
  assert.equal(ledger.receipts.length, receipts.length);
  assert.equal(ledger.partition.processes.length, receipts.length);
});

test("changed working sources fail capture instead of carrying the committed source identity", (t) => {
  const input = fixture(t);
  writeFileSync(join(input.root, "src/read.ts"), "export function read() { return 42; }");
  const child = input.run();
  assert.equal(child.status, 1, child.stdout + child.stderr);
  assert.match(child.stdout + child.stderr, /coverage source hash mismatch/);
  const receipts = readdirSync(join(input.directory, "receipts")).map((file) =>
    JSON.parse(readFileSync(join(input.directory, "receipts", file), "utf8"))
  );
  assert.ok(receipts.some((receipt) => receipt.exitCode !== 0 && !receipt.completed));
});

test("a killed test worker leaves a start without completion and the ledger rejects it", async (t) => {
  const { readNodeCapture } = await import("../../scripts/quality/coverage-capture-ledger.mjs");
  const input = fixture(t);
  writeFileSync(
    join(input.root, "tests/fixture.mjs"),
    "import '../src/read.ts'; process.kill(process.pid, 'SIGKILL');"
  );
  const child = input.run();
  assert.equal(child.status, 1, child.stdout + child.stderr);
  assert.ok(
    readdirSync(join(input.directory, "started")).length >
      readdirSync(join(input.directory, "receipts")).length
  );
  assert.throws(
    () =>
      readNodeCapture({
        directory: input.directory,
        expectedEntries: [join(input.root, "tests/fixture.mjs")],
        sha: input.sha,
        scopeHash: input.scope.scopeHash,
        runId: "capture-fixture",
        shard: "serial",
      }),
    /coverage capture.*missing.*completion/
  );
});

function runVitestCapture(input, environment, { extraFile = false, fails = false } = {}) {
  const plugin = new URL("../../scripts/quality/coverage-vitest-plugin.mjs", import.meta.url).href;
  const provider = fileURLToPath(
    new URL("../../scripts/quality/coverage-vitest-provider.mjs", import.meta.url)
  );
  const vitest = fileURLToPath(new URL("../../node_modules/vitest/vitest.mjs", import.meta.url));
  const vitestModule = fileURLToPath(
    new URL("../../node_modules/vitest/dist/index.js", import.meta.url)
  );
  writeFileSync(
    join(input.root, "tests/vitest.test.ts"),
    `import { test, expect } from 'vitest'; import { read } from '../src/read'; test('complement', () => expect(read(false)).toBe(${fails ? 99 : 0}));`
  );
  if (extraFile)
    writeFileSync(
      join(input.root, "tests/second.test.ts"),
      "import { test, expect } from 'vitest'; import { read } from '../src/read'; test('second', () => expect(read(true)).toBe(42));"
    );
  writeFileSync(
    join(input.root, "vitest.config.mjs"),
    `
import { readFileSync } from 'node:fs';
import { createCoverageCapturePlugin } from ${JSON.stringify(plugin)};
const scope = JSON.parse(readFileSync(${JSON.stringify(join(input.root, "scope.json"))}, 'utf8'));
export default { plugins: [createCoverageCapturePlugin({ root: ${JSON.stringify(input.root)}, scope })],
  server: { fs: { allow: [${JSON.stringify(input.root)}, ${JSON.stringify(fileURLToPath(new URL("../../", import.meta.url)))}] } },
  resolve: { alias: { vitest: ${JSON.stringify(vitestModule)} } },
  test: { include: ['tests/*.test.ts'], environment: ${JSON.stringify(environment)},
    maxWorkers: 1, isolate: true, coverage: { enabled: true, provider: 'custom',
      customProviderModule: ${JSON.stringify(provider)}, clean: false, reportOnFailure: true } } };
`
  );
  const directory = join(input.root, `vitest-capture-${environment}`);
  const child = spawnSync(
    process.execPath,
    [vitest, "run", "--config", join(input.root, "vitest.config.mjs")],
    {
      cwd: input.root,
      encoding: "utf8",
      timeout: 30000,
      env: {
        ...process.env,
        NODE_TEST_CONTEXT: undefined,
        OMNI_COVERAGE_ROOT: input.root,
        OMNI_COVERAGE_SCOPE: join(input.root, "scope.json"),
        OMNI_COVERAGE_SHA: input.sha,
        OMNI_COVERAGE_RUN_ID: "capture-fixture",
        OMNI_COVERAGE_SHARD: "serial",
        OMNI_COVERAGE_LANE: environment === "node" ? "vitest-node" : "vitest-ui",
        OMNI_COVERAGE_DIR: directory,
      },
    }
  );
  return { child, directory };
}

for (const environment of ["node", "jsdom"]) {
  test(`Vitest ${environment} captures the same original maps and complementary branch`, async (t) => {
    const input = fixture(t);
    const node = input.run();
    assert.equal(node.status, 0, node.stdout + node.stderr);
    const nodeReceipts = readdirSync(join(input.directory, "receipts")).map((file) =>
      JSON.parse(readFileSync(join(input.directory, "receipts", file), "utf8"))
    );
    const nodeMap = nodeReceipts.find((receipt) => receipt.coverage["src/read.ts"]).coverage[
      "src/read.ts"
    ];
    const { child, directory } = runVitestCapture(input, environment);
    assert.equal(child.error, undefined, child.error?.message);
    assert.equal(child.status, 0, child.stdout + child.stderr);
    const receipts = readdirSync(join(directory, "receipts")).map((file) =>
      JSON.parse(readFileSync(join(directory, "receipts", file), "utf8"))
    );
    assert.equal(receipts.length, 1);
    const observed = receipts[0].coverage["src/read.ts"];
    for (const key of ["statementMap", "fnMap", "branchMap"])
      assert.deepEqual(observed[key], nodeMap[key]);
    assert.deepEqual(Object.values(nodeMap.b).flat(), [1, 0]);
    assert.deepEqual(Object.values(observed.b).flat(), [0, 1]);
    assert.equal(receipts[0].completed, true);
    assert.equal(receipts[0].exitCode, 0);
    const { readVitestCapture } = await import("../../scripts/quality/coverage-capture-ledger.mjs");
    const parameters = {
      directory,
      expectedEntries: [join(input.root, "tests/vitest.test.ts")],
      sha: input.sha,
      scopeHash: input.scope.scopeHash,
      runId: "capture-fixture",
      shard: "serial",
      lane: environment === "node" ? "vitest-node" : "vitest-ui",
    };
    const ledger = readVitestCapture(parameters);
    assert.equal(ledger.receipts.length, 1);
    assert.throws(
      () =>
        readVitestCapture({
          ...parameters,
          expectedEntries: [
            ...parameters.expectedEntries,
            join(input.root, "tests/not-executed.test.ts"),
          ],
        }),
      /missing planned test entrypoint/
    );
  });
}

test("multiple Vitest files have distinct completions and real test failures cannot be certified", async (t) => {
  const { readVitestCapture } = await import("../../scripts/quality/coverage-capture-ledger.mjs");
  const input = fixture(t);
  const { child, directory } = runVitestCapture(input, "node", { extraFile: true });
  assert.equal(child.status, 0, child.stdout + child.stderr);
  const parameters = {
    directory,
    expectedEntries: [
      join(input.root, "tests/vitest.test.ts"),
      join(input.root, "tests/second.test.ts"),
    ],
    sha: input.sha,
    scopeHash: input.scope.scopeHash,
    runId: "capture-fixture",
    shard: "serial",
    lane: "vitest-node",
  };
  const ledger = readVitestCapture(parameters);
  assert.equal(ledger.receipts.length, 2);
  const failure = fixture(t);
  const failed = runVitestCapture(failure, "node", { fails: true });
  assert.equal(failed.child.status, 1, failed.child.stdout + failed.child.stderr);
  assert.throws(
    () =>
      readVitestCapture({
        ...parameters,
        directory: failed.directory,
        sha: failure.sha,
        scopeHash: failure.scope.scopeHash,
        expectedEntries: [join(failure.root, "tests/vitest.test.ts")],
      }),
    /failed process completion/
  );
});

test("real three-runner receipts compose with zero-hit files and cannot hide a lost lane", async (t) => {
  const { readNodeCapture, readVitestCapture } =
    await import("../../scripts/quality/coverage-capture-ledger.mjs");
  const { mergeCoverageEvidence, writeCoverageReports } =
    await import("../../scripts/quality/coverage-union.mjs");
  const input = fixture(t);
  const node = input.run();
  assert.equal(node.status, 0, node.stdout + node.stderr);
  const identity = {
    sha: input.sha,
    scopeHash: input.scope.scopeHash,
    runId: "capture-fixture",
    shard: "serial",
  };
  const results = [
    readNodeCapture({
      ...identity,
      directory: input.directory,
      expectedEntries: [join(input.root, "tests/fixture.mjs")],
    }),
  ];
  for (const environment of ["node", "jsdom"]) {
    const { child, directory } = runVitestCapture(input, environment);
    assert.equal(child.status, 0, child.stdout + child.stderr);
    results.push(
      readVitestCapture({
        ...identity,
        directory,
        expectedEntries: [join(input.root, "tests/vitest.test.ts")],
        lane: environment === "node" ? "vitest-node" : "vitest-ui",
      })
    );
  }
  const plan = {
    ...identity,
    schemaVersion: 1,
    partitions: results.map((result) => result.partition),
  };
  const receipts = results.flatMap((result) => result.receipts);
  const merged = mergeCoverageEvidence({ ...input, plan, receipts });
  assert.deepEqual(Object.values(merged.coverage["src/read.ts"].b).flat(), [1, 2]);
  assert.equal(merged.summary.total.functions.pct, 50);
  assert.ok(Object.values(merged.coverage["src/never.ts"].s).every((count) => count === 0));
  const report = writeCoverageReports(merged, join(input.root, "union-reports"));
  assert.equal(report.floorVerdict, "FAIL");
  assert.match(
    readFileSync(join(input.root, "union-reports/lcov.info"), "utf8"),
    /FNDA:0,neverImported/
  );
  assert.throws(
    () =>
      mergeCoverageEvidence({
        ...input,
        plan,
        receipts: receipts.filter((receipt) => receipt.lane !== "vitest-ui"),
      }),
    /missing process receipt/
  );
});
