/**
 * Contract of the opt-in usage parameters on GET /api/free-provider-rankings.
 *
 * Two guarantees are worth a test rather than a reading of the code:
 *  - an unknown `usageRange` is rejected, never coerced to a default window
 *    (a typo must not silently answer for a different period);
 *  - without `withUsage`, the aggregate query over `call_logs` is not issued —
 *    asserted on a spy, so the opt-in cannot rot into an always-on cost.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rankings-usage-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/free-provider-rankings/route.ts");

function get(query: string): NextRequest {
  return new Request(`http://localhost/api/free-provider-rankings${query}`) as NextRequest;
}

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("route: an unknown usageRange is rejected with 400, not coerced", async () => {
  const res = await route.GET(get("?configuredOnly=1&withUsage=1&usageRange=42h"));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { details?: Record<string, unknown> };
  assert.ok(body.details?.usageRange, "the offending parameter must be named");
});

test("route: every documented window is accepted", async () => {
  for (const range of ["1h", "24h", "7d", "30d"]) {
    const res = await route.GET(get(`?configuredOnly=1&withUsage=1&usageRange=${range}`));
    assert.equal(res.status, 200, `${range} must be accepted`);
  }
});

/**
 * Counts statements touching `call_logs`. Instrumenting the DB handle rather
 * than the module export is deliberate: ESM namespaces are sealed (redefining
 * an export throws), and the invariant worth protecting is "no query hits
 * call_logs", not "this particular function was not called".
 */
function countCallLogQueries(): { stop: () => number } {
  const db = core.getDbInstance() as { prepare: (sql: string) => unknown };
  const original = db.prepare.bind(db);
  let hits = 0;
  db.prepare = (sql: string) => {
    if (/from\s+call_logs/i.test(sql)) hits += 1;
    return original(sql);
  };
  return {
    stop: () => {
      db.prepare = original;
      return hits;
    },
  };
}

test("route: without withUsage, call_logs is never queried", async () => {
  const spy = countCallLogQueries();
  const res = await route.GET(get("?configuredOnly=1"));
  const hits = spy.stop();

  assert.equal(res.status, 200);
  assert.equal(hits, 0, "the default path must not pay for the usage aggregate");
});

test("route: with withUsage, call_logs is queried exactly once", async () => {
  const spy = countCallLogQueries();
  const res = await route.GET(get("?configuredOnly=1&withUsage=1"));
  const hits = spy.stop();

  assert.equal(res.status, 200);
  assert.equal(hits, 1, "one aggregate, never one query per provider");
});

test("route: an unknown sortBy is rejected with 400, not coerced", async () => {
  const res = await route.GET(get("?sortBy=bogus"));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { details?: Record<string, unknown> };
  assert.ok(body.details?.sortBy, "the offending parameter must be named");
});

test("route: sortBy=reliability is accepted (elo stays default)", async () => {
  for (const value of ["elo", "reliability"]) {
    const res = await route.GET(get(`?sortBy=${value}`));
    assert.equal(res.status, 200, `sortBy=${value} must be accepted`);
  }
});

test("route: sortBy=reliability queries call_logs even without withUsage", async () => {
  const spy = countCallLogQueries();
  const res = await route.GET(get("?sortBy=reliability"));
  const hits = spy.stop();

  assert.equal(res.status, 200);
  assert.ok(hits >= 1, "sortBy=reliability must pull the usage aggregate");
});

test("route: plain request without sortBy or withUsage never touches call_logs", async () => {
  const spy = countCallLogQueries();
  const res = await route.GET(get(""));
  const hits = spy.stop();

  assert.equal(res.status, 200);
  assert.equal(hits, 0, "default path must stay free of the usage aggregate");
});
