import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const worker = path.join(root, "scripts/test/unit-quick-worker.mjs");

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quick-worker-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const report = path.join(dir, "report.jsonl");
  return {
    dir,
    write(name: string, source: string) {
      const file = path.join(dir, `${name}.test.mjs`);
      fs.writeFileSync(file, source);
      return file;
    },
    run(files: string[], concurrency = 2) {
      // Exercise the same per-file defaults as a standalone invocation; never
      // let this test's own isolated DB path become shared by fixture children.
      const env = { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true" };
      delete env.DATA_DIR;
      delete env.SQLITE_FILE;
      delete env.NODE_TEST_CONTEXT;
      const result = spawnSync(process.execPath, [worker], {
        cwd: root,
        env,
        input: JSON.stringify({
          files,
          concurrency,
          isolation: "process",
          forceExit: false,
          execArgv: [
            "--test-force-exit",
            "--import",
            "tsx/esm",
            "--import",
            "./tests/_setup/isolateDataDir.ts",
          ],
          phase: "fixture",
          report,
        }),
        encoding: "utf8",
        maxBuffer: 8 * 1024 * 1024,
        timeout: 10_000,
      });
      assert.ifError(result.error);
      const rows = fs.readFileSync(report, "utf8").trim().split("\n").map(JSON.parse);
      return { ...result, rows, summary: rows.find((row) => row.type === "phase") };
    },
  };
}

test("quick worker keeps process and data isolation and reports every file", (t) => {
  const f = fixture(t);
  const source = `
    import test from "node:test";
    import assert from "node:assert/strict";
    import fs from "node:fs";
    import { fileURLToPath } from "node:url";
    test("isolated", () => {
      assert.equal(globalThis.fixtureMarker, undefined);
      globalThis.fixtureMarker = true;
      assert.ok(process.env.DATA_DIR);
      assert.equal(process.env.OMNIROUTE_SKIP_SYSTEM_TRUST, "1");
      fs.writeFileSync(fileURLToPath(import.meta.url) + ".json",
        JSON.stringify({ pid: process.pid, dataDir: process.env.DATA_DIR }));
    });
  `;
  const files = [f.write("one", source), f.write("two", source)];
  const result = f.run(files);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const records = files.map((file) => JSON.parse(fs.readFileSync(`${file}.json`, "utf8")));
  assert.notEqual(records[0].pid, records[1].pid);
  assert.notEqual(records[0].dataDir, records[1].dataDir);
  assert.deepEqual(
    result.rows
      .filter((row) => row.type === "file")
      .map((row) => path.resolve(root, row.file))
      .sort(),
    files.sort()
  );
  assert.equal(result.summary.counts.passed, 2);
});

test("quick worker reports a failure even when later files pass", (t) => {
  const f = fixture(t);
  const result = f.run([
    f.write(
      "fail",
      'import test from "node:test"; test("broken", () => { throw new Error("fixture failure"); });'
    ),
    f.write("pass", 'import test from "node:test"; test("valid", () => {});'),
  ]);
  assert.equal(result.status, 1);
  assert.equal(result.summary.success, false);
  assert.equal(result.summary.counts.failed, 1);
  assert.equal(result.summary.counts.passed, 1);
  assert.match(result.stdout, /fixture failure/);
});

test("quick worker preserves TODO and skip semantics", (t) => {
  const f = fixture(t);
  const result = f.run([
    f.write(
      "todo",
      `
    import test from "node:test";
    test("known todo", { todo: true }, () => { throw new Error("expected TODO"); });
    test.skip("known skip", () => { throw new Error("must not execute"); });
  `
    ),
  ]);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(result.summary.counts.failed, 0);
  assert.equal(result.summary.counts.todo, 1);
  assert.equal(result.summary.counts.skipped, 1);
});

test("quick worker keeps serial files from overlapping", (t) => {
  const f = fixture(t);
  const lock = JSON.stringify(path.join(f.dir, "active"));
  const source = `
    import test from "node:test";
    import fs from "node:fs";
    test("exclusive fixture", async () => {
      fs.mkdirSync(${lock});
      try { await new Promise((resolve) => setTimeout(resolve, 20)); }
      finally { fs.rmdirSync(${lock}); }
    });
  `;
  const result = f.run([f.write("one", source), f.write("two", source)], 1);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(result.summary.counts.passed, 2);
});

test("quick worker does not leave a completed file's open handles running", (t) => {
  const f = fixture(t);
  const result = f.run([
    f.write(
      "interval",
      `
    import test from "node:test";
    test("completed", () => { setInterval(() => {}, 60_000); });
  `
    ),
  ]);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(result.summary.counts.passed, 1);
});

test("quick worker drains large reporter output before exiting", (t) => {
  const f = fixture(t);
  const size = 2 * 1024 * 1024;
  const result = f.run([
    f.write(
      "output",
      `
    import test from "node:test";
    test("large output", () => { console.log("x".repeat(${size}) + "REPORTER_TAIL"); });
    test("last test must be reported", () => {});
  `
    ),
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.ok(result.stdout.includes("x".repeat(size) + "REPORTER_TAIL"));
  assert.match(result.stdout, /last test must be reported/);
  assert.match(result.stdout, /duration_ms/);
});

test("quick worker reports scripts that have no per-file test summary", (t) => {
  const f = fixture(t);
  const passed = f.write("plain-pass", 'console.log("script executed");');
  const failed = f.write(
    "plain-fail",
    'throw new Error("script failed before registering tests");'
  );
  const result = f.run([passed, failed]);
  assert.equal(result.status, 1);
  const rows = result.rows.filter((row) => row.type === "file");
  assert.equal(rows.length, 2);
  const byFile = new Map(rows.map((row) => [path.resolve(root, row.file), row]));
  assert.equal(byFile.get(passed).success, true);
  assert.equal(byFile.get(failed).success, false);
  for (const row of rows) {
    assert.ok(row.duration_ms >= 0);
    if (row.source === "completion") assert.equal(row.counts, null);
  }
  assert.equal(result.summary.success, false);
});
