import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const testDataDir = mkdtempSync(join(tmpdir(), "omniroute-dast-methods-"));
process.env.DATA_DIR = testDataDir;
process.env.SQLITE_FILE = join(testDataDir, "storage.sqlite");
process.env.JWT_SECRET = "dast-method-not-allowed-jwt-secret";

const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const logoutRoute = await import("../../src/app/api/auth/logout/route.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const keyDetailRoute = await import("../../src/app/api/keys/[id]/route.ts");

async function assertTraceMethodNotAllowed(
  route: { TRACE: () => Response | Promise<Response> },
  allow: string
) {
  const response = await route.TRACE();
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), allow);
}

test("high-risk dashboard API routes return 405 for TRACE", async () => {
  await assertTraceMethodNotAllowed(loginRoute, "POST");
  await assertTraceMethodNotAllowed(logoutRoute, "POST");
  await assertTraceMethodNotAllowed(keysRoute, "GET, POST");
  await assertTraceMethodNotAllowed(keyDetailRoute, "GET, PATCH, DELETE");
});
