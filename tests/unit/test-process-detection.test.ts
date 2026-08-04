import test from "node:test";
import assert from "node:assert/strict";
import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

// Regression guard for the substring bug: eleven subsystems decided "am I under a test runner?" with
// `process.argv.some((a) => a.includes("test"))`. JavaScript agrees that 'latest'.includes('test') is
// true, so ANY argv carrying a `latest` path segment — a release symlink like /opt/app/latest/server.js,
// an npm cache path, a `--model=latest` flag — silently put the process into "test mode". For
// src/lib/db/backup.ts that means isSqliteAutoBackupDisabled() returns true: no SQLite auto-backup, no
// warning. Same class for migrationRunner, cloud sync, health checks and quota recovery.
//
// argv/env are parameters (not read off the global) precisely so this file can assert the negative
// cases — under the test runner the globals always say "test", which is what made the bug invisible.

const NO_ENV = {} as NodeJS.ProcessEnv;

test("a 'latest' path segment is NOT a test run (the bug that disabled backups)", () => {
  assert.equal(isAutomatedTestProcess(["node", "/opt/omniroute/latest/server.js"], NO_ENV), false);
  assert.equal(isAutomatedTestProcess(["node", "C:\\apps\\latest\\bin\\omniroute.mjs", "serve"], NO_ENV), false);
});

test("other words merely containing 'test' are not test runs either", () => {
  for (const argv of [
    ["node", "/srv/protest/app.js"],
    ["node", "/home/u/contest-bot/index.js"],
    ["node", "server.js", "--model=latest"],
    ["node", "/opt/attestation/run.js"],
  ]) {
    assert.equal(isAutomatedTestProcess(argv, NO_ENV), false, `argv should not read as a test run: ${argv.join(" ")}`);
  }
});

test("the real runners are still detected", () => {
  assert.equal(isAutomatedTestProcess(["node", "--test", "tests/unit/foo.test.ts"], NO_ENV), true, "node --test");
  assert.equal(isAutomatedTestProcess(["node", "/repo/tests/unit/foo.test.ts"], NO_ENV), true, "a tests/ path");
  assert.equal(isAutomatedTestProcess(["node", "/repo/src/foo.test.ts"], NO_ENV), true, "a *.test.ts file");
  assert.equal(isAutomatedTestProcess(["node", "/repo/node_modules/.bin/vitest", "run"], NO_ENV), true, "vitest binary");
  assert.equal(isAutomatedTestProcess(["node", "/repo/node_modules/.bin/jest"], NO_ENV), true, "jest binary");
});

test("env still wins, as before", () => {
  assert.equal(isAutomatedTestProcess(["node", "server.js"], { NODE_ENV: "test" } as NodeJS.ProcessEnv), true);
  assert.equal(isAutomatedTestProcess(["node", "server.js"], { VITEST: "1" } as NodeJS.ProcessEnv), true);
  assert.equal(isAutomatedTestProcess(["node", "server.js"], { NODE_ENV: "production" } as NodeJS.ProcessEnv), false);
});

test("a production serve is never a test run", () => {
  assert.equal(
    isAutomatedTestProcess(["C:\\Program Files\\nodejs\\node.exe", "bin/omniroute.mjs", "serve"], { NODE_ENV: "production" } as NodeJS.ProcessEnv),
    false
  );
});
