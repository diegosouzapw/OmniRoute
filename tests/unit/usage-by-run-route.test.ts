/**
 * tests/unit/usage-by-run-route.test.ts
 *
 * GET /api/usage/by-run?run_id= — per-run cost lookup joining the existing
 * call_logs.session_tag + correlation_id columns to request_cost_ledger.
 * No schema change: correlation_id and request_cost_ledger.request_id are the
 * same traceId whenever the request carried no explicit correlationId.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-by-run-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "usage-by-run-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const routeModule = await import("../../src/app/api/usage/by-run/route.ts");

interface ByRunTestBody {
  runId?: string;
  rows?: Array<Record<string, unknown>>;
  error?: { message: string };
}

const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const TEST_JWT_SECRET = "usage-by-run-route-jwt-secret";
const TEST_INITIAL_PASSWORD = "usage-by-run-route-password";

function insertCallLog(db, { id, correlationId, sessionTag }) {
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, model, correlation_id, session_tag)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, new Date().toISOString(), "openai", "gpt-4o", correlationId, sessionTag);
}

function insertLedgerRow(requestId, amountUsd, timestamp = "2026-09-14T00:00:00.000Z") {
  costLedger.recordLedgerEntry({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-4o",
    tokensInput: 1000,
    tokensOutput: 500,
    tokensCacheRead: 200,
    tokensCacheCreation: 100,
    tokensReasoning: 50,
    unitPriceInput: 2.5,
    unitPriceOutput: 10,
    amountUsd,
    success: true,
    timestamp,
    requestId,
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = TEST_JWT_SECRET;
  process.env.INITIAL_PASSWORD = TEST_INITIAL_PASSWORD;
}

async function dashboardCookie() {
  const secret = new TextEncoder().encode(TEST_JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

function makeRequest(query, cookie) {
  return new Request(`http://localhost/api/usage/by-run${query}`, {
    headers: cookie ? { cookie } : {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("GET /api/usage/by-run returns the ledger cost of a call tagged with the run", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  insertCallLog(db, {
    id: "call-1",
    correlationId: "req-1",
    sessionTag: "lane-a/run-1",
  });
  insertLedgerRow("req-1", 0.025);

  const response = await routeModule.GET(makeRequest("?run_id=lane-a%2Frun-1", cookie));
  const body = (await response.json()) as ByRunTestBody;

  assert.equal(response.status, 200);
  assert.equal(body.runId, "lane-a/run-1");
  assert.equal(body.rows.length, 1);
  assert.equal(body.rows[0].requestId, "req-1");
  assert.equal(body.rows[0].provider, "openai");
  assert.equal(body.rows[0].model, "gpt-4o");
  assert.equal(body.rows[0].amountUsd, 0.025);
  assert.equal(body.rows[0].tokensInput, 1000);
  assert.equal(body.rows[0].tokensOutput, 500);
  assert.equal(body.rows[0].tokensCacheRead, 200);
  assert.equal(body.rows[0].tokensCacheCreation, 100);
  assert.equal(body.rows[0].tokensReasoning, 50);
});

test("GET /api/usage/by-run excludes calls tagged with another run", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  insertCallLog(db, { id: "call-1", correlationId: "req-1", sessionTag: "lane-a/run-1" });
  insertCallLog(db, { id: "call-2", correlationId: "req-2", sessionTag: "lane-a/run-2" });
  insertLedgerRow("req-1", 0.025, "2026-09-14T00:00:00.000Z");
  insertLedgerRow("req-2", 9.99, "2026-09-14T12:00:00.000Z");

  const response = await routeModule.GET(makeRequest("?run_id=lane-a%2Frun-1", cookie));
  const body = (await response.json()) as ByRunTestBody;

  assert.equal(response.status, 200);
  assert.equal(body.rows.length, 1);
  assert.equal(body.rows[0].requestId, "req-1");
  assert.equal(body.rows[0].amountUsd, 0.025);
});

test("GET /api/usage/by-run matches the tag exactly instead of by prefix", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  // A lane-only tag plus a per-run tag: asking for the lane must give the
  // lane-tagged call only, never the runs inside it.
  insertCallLog(db, { id: "call-lane", correlationId: "req-lane", sessionTag: "lane-a" });
  insertCallLog(db, { id: "call-run", correlationId: "req-run", sessionTag: "lane-a/run-1" });
  insertLedgerRow("req-lane", 0.1, "2026-09-14T00:00:00.000Z");
  insertLedgerRow("req-run", 0.2, "2026-09-14T12:00:00.000Z");

  const laneResponse = await routeModule.GET(makeRequest("?run_id=lane-a", cookie));
  const laneBody = (await laneResponse.json()) as ByRunTestBody;

  assert.equal(laneResponse.status, 200);
  assert.deepEqual(
    laneBody.rows.map((row) => row.requestId),
    ["req-lane"]
  );

  const wildcard = await routeModule.GET(makeRequest("?run_id=lane-a%25", cookie));
  const wildcardBody = (await wildcard.json()) as ByRunTestBody;
  assert.equal(wildcard.status, 200);
  assert.equal(wildcardBody.rows.length, 0, "a LIKE wildcard must not widen the match");
});

test("GET /api/usage/by-run omits a call that has no ledger row", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  // Non-priced call (free/local provider): correlation_id exists, ledger row does not.
  insertCallLog(db, { id: "call-1", correlationId: "req-unpriced", sessionTag: "lane-a/run-1" });

  const response = await routeModule.GET(makeRequest("?run_id=lane-a%2Frun-1", cookie));
  const body = (await response.json()) as ByRunTestBody;

  assert.equal(response.status, 200);
  assert.equal(body.rows.length, 0);
});

test("GET /api/usage/by-run orders rows newest first", async () => {
  const cookie = await dashboardCookie();
  const db = core.getDbInstance();
  insertCallLog(db, { id: "call-1", correlationId: "req-old", sessionTag: "lane-a/run-1" });
  insertCallLog(db, { id: "call-2", correlationId: "req-new", sessionTag: "lane-a/run-1" });
  insertLedgerRow("req-old", 0.1, "2026-09-13T00:00:00.000Z");
  insertLedgerRow("req-new", 0.2, "2026-09-14T00:00:00.000Z");

  const response = await routeModule.GET(makeRequest("?run_id=lane-a%2Frun-1", cookie));
  const body = (await response.json()) as ByRunTestBody;

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.rows.map((row) => row.requestId),
    ["req-new", "req-old"]
  );
});

test("GET /api/usage/by-run requires the run_id param", async () => {
  const cookie = await dashboardCookie();

  const missing = await routeModule.GET(makeRequest("", cookie));
  assert.equal(missing.status, 400);
  const missingBody = (await missing.json()) as ByRunTestBody;
  assert.equal(missingBody.error.message, "run_id query param is required");
  assert.ok(!missingBody.error.message.includes("at /"), "error body must not leak a stack trace");

  const blank = await routeModule.GET(makeRequest("?run_id=%20", cookie));
  assert.equal(blank.status, 400);
  const blankBody = (await blank.json()) as ByRunTestBody;
  assert.equal(blankBody.error.message, "run_id query param is required");
  assert.ok(!blankBody.error.message.includes("at /"), "error body must not leak a stack trace");
});

test("GET /api/usage/by-run requires management authentication", async () => {
  const response = await routeModule.GET(makeRequest("?run_id=lane-a%2Frun-1"));
  const body = (await response.json()) as ByRunTestBody;

  assert.equal(response.status, 401);
  assert.equal(body.error.message, "Authentication required");
});

test("getCostBySessionTag: an empty tag reads nothing", () => {
  core.getDbInstance();
  assert.deepEqual(costLedger.getCostBySessionTag(""), []);
});
