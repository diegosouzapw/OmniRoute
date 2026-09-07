import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuickPlan, runQuickPlan } from "../../../scripts/test/unit-quick-tier.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quick-plan-"));
  const scripts = {
    "test:unit":
      'node --test tests/unit/*.test.ts "tests/unit/{db,db-adapters,newgroup}/**/*.test.ts" "tests/unit/**/*.test.mjs" && node --import tsx --test "tests/unit/dashboard/**/*.test.ts" && npm run test:unit:serial',
    "test:unit:serial": 'node --test "tests/unit/serial/**/*.test.ts"',
  };
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ scripts }));
  for (const file of [
    "tests/unit/new.test.ts",
    "tests/unit/newgroup/new.test.ts",
    "tests/unit/db/heavy.test.ts",
    "tests/unit/db/heavy.test.mjs",
    "tests/unit/db-adapters/keep.test.ts",
    "tests/unit/dashboard/ui.test.ts",
    "tests/unit/serial/timing.test.ts",
    "tests/unit/autoCombo/vitest.test.ts",
    "tests/unit/ui/view.test.tsx",
  ]) {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    fs.writeFileSync(path.join(dir, file), "throw new Error('listing must not execute tests');\n");
  }
  return { dir, scripts, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

test("quick tier inherits new canonical groups and excludes slow directories across extensions", () => {
  const f = fixture();
  try {
    const plan = buildQuickPlan(f.dir);
    assert.deepEqual(plan.groups[0].files, [
      "tests/unit/db-adapters/keep.test.ts",
      "tests/unit/new.test.ts",
      "tests/unit/newgroup/new.test.ts",
    ]);
    assert.deepEqual(plan.excluded, [
      "tests/unit/db/heavy.test.mjs",
      "tests/unit/db/heavy.test.ts",
    ]);
    assert.deepEqual(plan.groups[1].files, ["tests/unit/dashboard/ui.test.ts"]);
    assert.deepEqual(plan.groups[2].files, ["tests/unit/serial/timing.test.ts"]);
    assert.equal(plan.totalFiles, 7);
  } finally {
    f.cleanup();
  }
});

test("quick tier rejects overlapping canonical phases instead of running a test twice", () => {
  const f = fixture();
  try {
    f.scripts["test:unit"] = f.scripts["test:unit"].replace(
      "db,db-adapters,newgroup",
      "db,db-adapters,newgroup,dashboard"
    );
    fs.writeFileSync(path.join(f.dir, "package.json"), JSON.stringify({ scripts: f.scripts }));
    assert.throws(() => buildQuickPlan(f.dir), /multiple phases.*dashboard\/ui\.test\.ts/);
  } finally {
    f.cleanup();
  }
});

test("quick tier fails visibly if the canonical command layout changes", () => {
  const f = fixture();
  try {
    f.scripts["test:unit"] = "node scripts/new-test-runner.mjs";
    fs.writeFileSync(path.join(f.dir, "package.json"), JSON.stringify({ scripts: f.scripts }));
    assert.throws(() => buildQuickPlan(f.dir), /canonical test:unit/);
  } finally {
    f.cleanup();
  }
});

test("quick runner preserves process isolation, loader separation and serial concurrency", (t) => {
  const f = fixture();
  const previousEnv = { DATA_DIR: process.env.DATA_DIR, SQLITE_FILE: process.env.SQLITE_FILE };
  process.env.DATA_DIR = path.join(f.dir, "application-data");
  process.env.SQLITE_FILE = path.join(f.dir, "application.sqlite");
  t.after(() => {
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  try {
    const calls: {
      files: string[];
      execArgv: string[];
      concurrency: number;
      isolation: string;
      forceExit: boolean;
    }[] = [];
    const status = runQuickPlan(buildQuickPlan(f.dir), {
      root: f.dir,
      concurrency: 3,
      spawn: (
        _command: string,
        _args: string[],
        options: { input: string; env: NodeJS.ProcessEnv }
      ) => {
        assert.equal(options.env.DATA_DIR, undefined);
        assert.equal(options.env.SQLITE_FILE, undefined);
        assert.equal(options.env.DISABLE_SQLITE_AUTO_BACKUP, "true");
        calls.push(JSON.parse(options.input));
        return { status: calls.length === 1 ? 1 : 0 };
      },
      log: () => {},
    });
    assert.equal(status, 1, "a later passing group must not mask a failure");
    assert.equal(calls.length, 3, "all tiers still report results after a failure");
    for (const call of calls) {
      assert.equal(call.isolation, "process");
      assert.equal(call.forceExit, false);
      assert.ok(call.execArgv.includes("--test-force-exit"));
      assert.ok(call.execArgv.includes("./tests/_setup/isolateDataDir.ts"));
    }
    assert.ok(calls[0].execArgv.includes("tsx/esm"));
    assert.ok(calls[1].execArgv.includes("tsx"));
    assert.equal(calls[2].concurrency, 1);
    assert.equal(calls[0].concurrency, 3);
  } finally {
    f.cleanup();
  }
});

test("quick runner reports child startup failures", () => {
  const f = fixture();
  try {
    const report = path.join(f.dir, "report.jsonl");
    assert.equal(
      runQuickPlan(buildQuickPlan(f.dir), {
        root: f.dir,
        report,
        spawn: () => ({ error: new Error("spawn failed"), status: null }),
        log: () => {},
      }),
      1
    );
    const rows = fs.readFileSync(report, "utf8").trim().split("\n").map(JSON.parse);
    assert.equal(rows[0].type, "run");
    assert.equal(rows.filter((row) => row.type === "exit").length, 3);
    for (const row of rows.slice(1)) {
      assert.equal(row.status, null);
      assert.equal(row.error, "spawn failed");
      assert.ok(row.duration_ms >= 0);
    }
  } finally {
    f.cleanup();
  }
});

test("the real quick plan partitions the canonical files without changing full-suite scripts", () => {
  const plan = buildQuickPlan(root);
  const files = plan.groups.flatMap((group: { files: string[] }) => group.files);
  assert.equal(new Set([...files, ...plan.excluded]).size, plan.totalFiles);
  assert.ok(plan.excluded.length > 0);
  assert.ok(files.length > plan.excluded.length);
  assert.ok(files.includes("tests/unit/test/unit-quick-tier.test.ts"));
  assert.ok(files.includes("tests/unit/serial/glm-coding-plan-monthly-3580.test.ts"));
});

test("quick runner schedules a large phase together without OS argument limits", () => {
  const files = Array.from(
    { length: 1000 },
    (_, i) => `tests/unit/newgroup/${"long".repeat(10)}-${i}.test.ts`
  );
  const collected: string[] = [];
  let phases = 0;
  const status = runQuickPlan(
    { groups: [{ name: "main", loader: "tsx/esm", files }] },
    {
      root,
      spawn: (_command: string, args: string[], options: { input: string }) => {
        phases++;
        assert.ok(Buffer.byteLength(args.join(" ")) < 1000);
        collected.push(...JSON.parse(options.input).files);
        return { status: 0 };
      },
      log: () => {},
    }
  );
  assert.equal(status, 0);
  assert.equal(phases, 1, "a slow file must not hold up a later command-line batch");
  assert.deepEqual(collected, files);
});
