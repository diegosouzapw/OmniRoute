import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Issue #8181 companion coverage for the two write-path defects in consoleInterceptor:
//
//  * writeEntry appends with no rate limit, so a flood writes unbounded lines to disk. The
//    limiter added for this is scoped to `error` ONLY — structuredLogger's #1006 limiter is
//    applied solely to error()/fatal(), while writeEntry serves all five console levels across
//    ~800 non-error call sites. Capping those would silently drop routine logging.
//  * ensureDir() runs once at init, so a directory removed at runtime makes every later append
//    throw ENOENT into a bare catch, permanently and silently.
//
// These run in child processes for two reasons: the flood test would otherwise emit thousands
// of passthrough lines into the test runner's own output, and each child gets a private
// APP_LOG_FILE_PATH so line counts are attributable to the interceptor alone (structuredLogger
// and the pino transport also target the shared default log path).

const interceptorPath = fileURLToPath(
  new URL("../../../src/lib/consoleInterceptor.ts", import.meta.url)
);

type ChildResult = { status: number | null; stderr: string; lines: Array<Record<string, string>> };

function runChild(body: string[]): ChildResult {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-writes-8181-"));
  const logFile = join(dir, "logs", "application", "app.log");
  const childFile = join(dir, "probe.mts");

  writeFileSync(
    childFile,
    [
      `process.env.APP_LOG_TO_FILE = "true";`,
      `process.env.APP_LOG_FILE_PATH = ${JSON.stringify(logFile)};`,
      `const M = await import(${JSON.stringify(interceptorPath)});`,
      `const LOG_FILE = ${JSON.stringify(logFile)};`,
      ...body,
    ].join("\n")
  );

  const result = spawnSync(process.execPath, ["--import", "tsx/esm", childFile], {
    encoding: "utf8",
    timeout: 60_000,
    env: { ...process.env, DISABLE_SQLITE_AUTO_BACKUP: "true" },
  });

  const lines = existsSync(logFile)
    ? readFileSync(logFile, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((l) => JSON.parse(l) as Record<string, string>)
    : [];

  rmSync(dir, { recursive: true, force: true });
  return { status: result.status, stderr: String(result.stderr), lines };
}

test("a flood of identical console.error entries collapses to a single disk write (#8181)", () => {
  const r = runChild([
    `M.initConsoleInterceptor();`,
    `for (let i = 0; i < 10000; i++) console.error("identical flood line");`,
    `setTimeout(() => process.exit(0), 150);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  const flood = r.lines.filter((l) => l.message === "identical flood line");
  assert.equal(
    flood.length,
    1,
    `10,000 identical error entries inside the dedup window must yield exactly 1 disk line, got ${flood.length}`
  );
});

test("distinct error entries are capped per second, not unbounded (#8181)", () => {
  const r = runChild([
    `M.initConsoleInterceptor();`,
    `for (let i = 0; i < 500; i++) console.error("distinct error " + i);`,
    `setTimeout(() => process.exit(0), 150);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  const errs = r.lines.filter((l) => l.level === "error");
  assert.ok(
    errs.length <= 51,
    `500 distinct errors in one second must be capped near 50/sec, got ${errs.length}`
  );
  assert.ok(errs.length > 0, "the cap must not suppress everything");
});

// The R6 regression guard. If the limiter were applied to every level (the obvious way to write
// it), ordinary logging would be silently dropped and the Console Log Viewer would go sparse.
test("ordinary non-error logging is NOT rate limited (#8181)", () => {
  const r = runChild([
    `M.initConsoleInterceptor();`,
    `for (let i = 0; i < 300; i++) console.log("routine line " + i);`,
    `for (let i = 0; i < 300; i++) console.warn("warn line " + i);`,
    `setTimeout(() => process.exit(0), 200);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  const routine = r.lines.filter((l) => l.message?.startsWith("routine line"));
  const warns = r.lines.filter((l) => l.message?.startsWith("warn line"));
  assert.equal(
    routine.length,
    300,
    `all 300 info entries must land — the limiter must be scoped to 'error' only, got ${routine.length}`
  );
  assert.equal(warns.length, 300, `all 300 warn entries must land, got ${warns.length}`);
});

test("a single ordinary console.error still writes exactly one line", () => {
  const r = runChild([
    `M.initConsoleInterceptor();`,
    `console.error("just one");`,
    `setTimeout(() => process.exit(0), 150);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  assert.equal(r.lines.filter((l) => l.message === "just one").length, 1);
});

// This is the production incident, as a regression test: the log directory vanished across a
// restart and the interceptor stopped writing permanently, with nothing surfaced anywhere.
test("a log directory removed at runtime is recreated and logging recovers (#8181)", () => {
  const r = runChild([
    `const { rmSync, existsSync } = await import("node:fs");`,
    `const { dirname } = await import("node:path");`,
    `M.initConsoleInterceptor();`,
    `console.error("before removal");`,
    `rmSync(dirname(LOG_FILE), { recursive: true, force: true });`,
    `if (existsSync(LOG_FILE)) { process.exit(3); }`,
    `console.error("after removal");`,
    `setTimeout(() => process.exit(0), 200);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  const messages = r.lines.map((l) => l.message);
  assert.ok(
    messages.includes("after removal"),
    "an entry written after the log directory was deleted must still land — ensureDir() only " +
      "runs at init, so without a retry the interceptor dies silently and permanently"
  );
});

test("the log-unavailable notice is emitted at most once, to the real stderr", () => {
  const r = runChild([
    `const { rmSync, mkdirSync, chmodSync } = await import("node:fs");`,
    `const { dirname } = await import("node:path");`,
    `M.initConsoleInterceptor();`,
    // Make the directory unrecreatable so the retry fails and the notice path is exercised.
    `const parent = dirname(dirname(LOG_FILE));`,
    `rmSync(dirname(LOG_FILE), { recursive: true, force: true });`,
    `chmodSync(parent, 0o500);`,
    `for (let i = 0; i < 5; i++) console.error("unwritable " + i);`,
    `chmodSync(parent, 0o700);`,
    `setTimeout(() => process.exit(0), 200);`,
  ]);

  assert.equal(r.status, 0, `child must exit cleanly: ${r.stderr.slice(0, 400)}`);
  const notices = r.stderr.split("\n").filter((l) => l.includes("[consoleInterceptor]"));
  assert.equal(
    notices.length,
    1,
    `the notice must fire exactly once across repeated failures, got ${notices.length} — a ` +
      "per-call notice would itself become a flood"
  );
});
