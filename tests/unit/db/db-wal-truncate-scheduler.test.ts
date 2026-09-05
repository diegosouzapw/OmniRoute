/**
 * A WAL never shrinks on its own: only `wal_checkpoint(TRUNCATE)` reclaims the file, and a
 * long-running server never closes its DB (observed locally: a 154 MB WAL on a 143 MB base).
 *
 * The scheduler cannot be exercised directly in a unit test: it gates itself off under
 * `isAutomatedTestProcess()`, same as the pre-existing DB health-check scheduler it is
 * modeled on (see tests/unit/lib/jobRegistry/boot-wiring.test.ts for the same constraint).
 * This reads the wiring instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

const CORE_PATH = "src/lib/db/core.ts";

test("a periodic WAL truncate scheduler is started when the DB instance boots", () => {
  const source = readSource(CORE_PATH);
  assert.match(
    source,
    /startWalTruncateScheduler\(db\)/,
    "getDbInstance() must start the WAL truncate scheduler alongside the DB health-check scheduler"
  );
});

test("the WAL truncate scheduler runs wal_checkpoint(TRUNCATE), not a lighter mode", () => {
  const source = readSource(CORE_PATH);
  const fnStart = source.indexOf("function startWalTruncateScheduler");
  assert.notEqual(fnStart, -1, "startWalTruncateScheduler must exist");
  const fnBody = source.slice(fnStart, fnStart + 1200);
  assert.match(
    fnBody,
    /checkpointDb\(db, "TRUNCATE"\)/,
    "the scheduled checkpoint must request TRUNCATE mode — a lighter mode would not shrink the WAL file"
  );
});

test("the WAL truncate scheduler is cleared on close, like the health-check scheduler", () => {
  const source = readSource(CORE_PATH);
  const fnStart = source.indexOf("export function closeDbInstance");
  assert.notEqual(fnStart, -1, "closeDbInstance must exist");
  const fnBody = source.slice(fnStart, fnStart + 300);
  assert.match(fnBody, /clearDbHealthCheckScheduler\(\)/);
  assert.match(
    fnBody,
    /clearWalTruncateScheduler\(\)/,
    "closeDbInstance() must clear the WAL truncate timer so it does not outlive the DB handle"
  );
});

test("the truncate interval is overridable via OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS", () => {
  const source = readSource(CORE_PATH);
  assert.match(
    source,
    /OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS/,
    "the interval must be operator-configurable, matching OMNIROUTE_DB_HEALTHCHECK_INTERVAL_MS"
  );
});

test("the scheduler self-gates the same way the DB health-check scheduler does", () => {
  const source = readSource(CORE_PATH);
  const fnStart = source.indexOf("function startWalTruncateScheduler");
  const fnBody = source.slice(fnStart, fnStart + 300);
  assert.match(
    fnBody,
    /isCloud \|\| isBuildPhase \|\| isAutomatedTestProcess\(\)/,
    "must not run during cloud/build/test contexts, same as startDbHealthCheckScheduler"
  );
});

test("the new env var is documented", () => {
  const docs = readSource("docs/reference/ENVIRONMENT.md");
  assert.match(
    docs,
    /OMNIROUTE_WAL_TRUNCATE_INTERVAL_MS/,
    "docs/reference/ENVIRONMENT.md must document the new env var (check:env-doc-sync)"
  );
});
