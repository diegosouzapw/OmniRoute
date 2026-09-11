import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import test from "node:test";
import vm from "node:vm";

const core = readFileSync(new URL("../../src/lib/db/core.ts", import.meta.url), "utf8");
const managedCheck = core
  .slice(
    core.indexOf("export function runManagedDbHealthCheck("),
    core.indexOf("export function getDbInstance()")
  )
  .replace("export function", "function");
const route = readFileSync(new URL("../../src/app/api/db/health/route.ts", import.meta.url), "utf8")
  .replace(/^import .*;\n/gm, "")
  .replaceAll("export async function", "async function");

function loadCheck(skipEnv, authenticated = true) {
  const calls = [];
  const context = vm.createContext({
    process: { env: { OMNIROUTE_SKIP_DB_HEALTHCHECK: skipEnv } },
    getDbInstance: () => ({}),
    createHealthCheckBackup: () => assert.fail("read-only polling must not create backups"),
    runDbHealthCheck: (_db, options) => {
      calls.push(options);
      return { status: "healthy" };
    },
    isAuthenticated: async () => authenticated,
    NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) },
    sanitizeErrorMessage: (message) => message,
    console,
  });
  vm.runInContext(stripTypeScriptTypes(managedCheck + route), context);
  return { context, calls };
}

test("dashboard GET skips integrity scans even without a deployment opt-out", async () => {
  const { context, calls } = loadCheck(undefined);
  for (let poll = 0; poll < 3; poll++) {
    const response = await vm.runInContext("GET({})", context);
    assert.equal(response.status, 200);
  }
  assert.equal(calls.length, 3);
  for (const options of calls) {
    assert.equal(options.autoRepair, false);
    assert.equal(options.skipIntegrityCheck, true);
  }
});

test("managed checks honor the deployment opt-out, including manual repair", async () => {
  const { context, calls } = loadCheck("1");
  vm.runInContext("runManagedDbHealthCheck({skipIntegrityCheck:false})", context);
  await vm.runInContext("POST({})", context);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].skipIntegrityCheck, true);
  assert.equal(calls[1].skipIntegrityCheck, true);
  assert.equal(calls[1].autoRepair, true);
});

test("explicit repair retains integrity scans when the deployment allows them", async () => {
  const { context, calls } = loadCheck("0");
  await vm.runInContext("POST({})", context);
  assert.equal(Boolean(calls[0].skipIntegrityCheck), false);
  assert.equal(calls[0].autoRepair, true);
});

test("unauthenticated polling and repair do not touch the database", async () => {
  const { context, calls } = loadCheck(undefined, false);
  for (const method of ["GET", "POST"]) {
    const response = await vm.runInContext(`${method}({})`, context);
    assert.equal(response.status, 401);
  }
  assert.equal(calls.length, 0);
});
