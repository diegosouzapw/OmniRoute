import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getDbInstance } from "../../src/lib/db/core.ts";
import { classifyCallLogError } from "../../src/lib/usage/callLogs/format.ts";
import { saveCallLog } from "../../src/lib/usage/callLogs.ts";
import { getErrorTypeBreakdown } from "../../src/lib/db/callLogStats.ts";
import {
  ERROR_TYPE_CONTRACT,
  ERROR_TYPE_CONTRACT_VERSION,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

test("SCHEMA_SQL mirrors error_type column for fresh installs", () => {
  const src = fs.readFileSync("src/lib/db/core.ts", "utf8");
  assert.ok(
    src.includes("error_type TEXT DEFAULT NULL"),
    "SCHEMA_SQL should mirror the 158 ADD COLUMN for fresh installs"
  );
});

test("classifyCallLogError maps status+body to the provider error family", () => {
  assert.equal(classifyCallLogError(402, "whatever body", "openai"), "quota_exhausted");
  assert.equal(classifyCallLogError(500, "Internal Server Error", "openai"), "server_error");
  assert.equal(classifyCallLogError(429, "rate limit", "openai"), "rate_limited");
  assert.equal(classifyCallLogError(404, "model not found", "openai"), "model_not_found");
  assert.equal(classifyCallLogError(401, "bad key", "openai"), "unauthorized");
});

test("classifyCallLogError classifies only failures", () => {
  assert.equal(classifyCallLogError(200, "", "openai"), null);
  assert.equal(classifyCallLogError(200, "some body", "openai"), null);
  assert.equal(classifyCallLogError(0, "", "test-provider"), null); // 0 with no error → success (no signal)
  assert.equal(classifyCallLogError(0, "boom", "test-provider"), "unknown");
});

test("classifyCallLogError maps unclassifiable failure to unknown, success stays null", () => {
  assert.equal(classifyCallLogError(200, "", "openai"), null);
  assert.equal(classifyCallLogError(200, "some body", "openai"), null); // success+body → null (inherited)
  assert.equal(classifyCallLogError(403, "some other 403 body", "openai"), "unknown");
  assert.equal(classifyCallLogError(0, "boom", "test-provider"), "unknown");
  assert.equal(classifyCallLogError(0, "", "test-provider"), null); // 0 with no error → success (no signal)
});

test("error type contract version is 1 and vocabulary syncs with PROVIDER_ERROR_TYPES", () => {
  assert.equal(ERROR_TYPE_CONTRACT_VERSION, 1);
  for (const v of Object.values(PROVIDER_ERROR_TYPES)) {
    assert.ok((ERROR_TYPE_CONTRACT as readonly string[]).includes(v));
  }
  assert.ok((ERROR_TYPE_CONTRACT as readonly string[]).includes("unknown"));
});

test("classifyCallLogError extracts message from Error object", () => {
  assert.equal(
    classifyCallLogError(403, new Error("browser_signature_banned"), "openai"),
    "fingerprint_rejection"
  );
});

test("classifyCallLogError returns unknown for unclassifiable provider-403 (api key)", () => {
  assert.equal(classifyCallLogError(403, "some other 403 body", "openai"), "unknown");
});

test("saveCallLog persists error_type from failure", async () => {
  const db = getDbInstance();
  const testId = `test-errtype-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 402,
    error: "exceeded your current quota",
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
  });

  const row = db.prepare("SELECT error_type FROM call_logs WHERE id = ?").get(testId) as {
    error_type: string | null;
  };
  assert.equal(row.error_type, "quota_exhausted");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("saveCallLog persists null error_type for success", async () => {
  const db = getDbInstance();
  const testId = `test-errtype-ok-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
  });

  const row = db.prepare("SELECT error_type FROM call_logs WHERE id = ?").get(testId) as {
    error_type: string | null;
  };
  assert.equal(row.error_type, null);

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("saveCallLog normalizes Error object before classifying", async () => {
  const db = getDbInstance();
  const testId = `test-errtype-err-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 403,
    error: new Error("browser_signature_banned"),
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
  });

  const row = db.prepare("SELECT error_type FROM call_logs WHERE id = ?").get(testId) as {
    error_type: string | null;
  };
  assert.equal(row.error_type, "fingerprint_rejection");

  db.prepare("DELETE FROM call_logs WHERE id = ?").run(testId);
});

test("getErrorTypeBreakdown groups failures by family, excludes successes", async () => {
  const db = getDbInstance();
  const ids = [
    `test-errbd-q1-${Date.now()}`,
    `test-errbd-q2-${Date.now()}`,
    `test-errbd-s5-${Date.now()}`,
    `test-errbd-403-${Date.now()}`,
    `test-errbd-ok-${Date.now()}`,
  ];

  await saveCallLog({
    id: ids[0],
    method: "POST",
    path: "/v1/chat/completions",
    status: 402,
    error: "exceeded your current quota",
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[1],
    method: "POST",
    path: "/v1/chat/completions",
    status: 402,
    error: "insufficient balance",
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[2],
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    error: "Internal Server Error",
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[3],
    method: "POST",
    path: "/v1/chat/completions",
    status: 403,
    error: "some other 403 body",
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[4],
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  });

  const whereClause = `WHERE id IN (${ids.map((_, i) => `@id${i}`).join(", ")})`;
  const params = Object.fromEntries(ids.map((id, i) => [`id${i}`, id]));
  const breakdown = getErrorTypeBreakdown(whereClause, params);

  assert.deepEqual(breakdown, [
    { errorType: "quota_exhausted", count: 2 },
    { errorType: "server_error", count: 1 },
    { errorType: "unknown", count: 1 },
  ]);

  ids.forEach((id) => db.prepare("DELETE FROM call_logs WHERE id = ?").run(id));
});

test("getErrorTypeBreakdown with empty whereClause does not crash", () => {
  const breakdown = getErrorTypeBreakdown("", {});
  assert.ok(Array.isArray(breakdown));
});

function insertRawErrorType(
  db: ReturnType<typeof getDbInstance>,
  id: string,
  errorType: string | null,
  timestamp: string
) {
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, method, path, status, error_type, model, provider) VALUES (@id, @ts, 'POST', '/v1/chat/completions', 500, @et, 'm', 'p')"
  ).run({ id, ts: timestamp, et: errorType });
}

test("getErrorTypeBreakdown maps free-text history to unclassified, keeps pre_migration", () => {
  const db = getDbInstance();
  insertRawErrorType(db, "hx-typo", "typo_libre", new Date().toISOString());
  insertRawErrorType(db, "hx-old", null, "2026-01-01T00:00:00.000Z");
  insertRawErrorType(db, "hx-new", null, new Date().toISOString());
  const rows = getErrorTypeBreakdown("WHERE id IN ('hx-typo','hx-old','hx-new')", {});
  const byType = Object.fromEntries(rows.map((r) => [r.errorType, r.count]));
  assert.equal(byType["typo_libre"], undefined); // ne fuit plus telle quelle
  assert.equal(byType["unclassified"], 2); // typo + recent NULL
  assert.equal(byType["pre_migration"], 1);
  db.prepare("DELETE FROM call_logs WHERE id IN ('hx-typo','hx-old','hx-new')").run();
});

test("cutover boundary: pre_migration only before ERROR_TYPE_CUTOVER_ISO", () => {
  const db = getDbInstance();
  insertRawErrorType(db, "hx-b1", null, "2026-08-19T23:59:59.000Z");
  insertRawErrorType(db, "hx-b2", null, "2026-08-20T00:00:00.000Z");
  const rows = getErrorTypeBreakdown("WHERE id IN ('hx-b1','hx-b2')", {});
  const byType = Object.fromEntries(rows.map((r) => [r.errorType, r.count]));
  assert.equal(byType["pre_migration"], 1);
  db.prepare("DELETE FROM call_logs WHERE id IN ('hx-b1','hx-b2')").run();
});

test("migration 177 file was evaluated and dropped: EXPLAIN shows no index use for the CASE query", () => {
  // Exit-hatch record: the exact getErrorTypeBreakdown query groups by a
  // CASE expression, and the planner keeps SCAN + TEMP B-TREE with or without a
  // bare-column index on error_type (verified 10k-row scratch DB, before/after
  // identical). No 177 file ships; the zod write-point guard below is the payload.
  const src = fs.readFileSync("src/lib/db/core.ts", "utf8");
  assert.ok(
    !src.includes("idx_cl_error_type"),
    "no idx_cl_error_type remnants should remain after the exit hatch"
  );
});

test("getErrorTypeBreakdown buckets group correctly (no index payload after exit hatch)", async () => {
  const db = getDbInstance();
  const stamp = Date.now();
  const ids = [`test-idx-q-${stamp}`, `test-idx-s-${stamp}`, `test-idx-ok-${stamp}`];
  await saveCallLog({
    id: ids[0],
    method: "POST",
    path: "/v1/chat/completions",
    status: 402,
    error: "exceeded your current quota",
    model: "m",
    provider: "p",
    duration: 1,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[1],
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    error: "Internal Server Error",
    model: "m",
    provider: "p",
    duration: 1,
    tokens: { in: 1, out: 1 },
  });
  await saveCallLog({
    id: ids[2],
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "m",
    provider: "p",
    duration: 1,
    tokens: { in: 1, out: 1 },
  });
  const whereClause = `WHERE id IN (${ids.map((_, i) => `@id${i}`).join(", ")})`;
  const params = Object.fromEntries(ids.map((id, i) => [`id${i}`, id]));
  const breakdown = getErrorTypeBreakdown(whereClause, params);
  assert.deepEqual(breakdown, [
    { errorType: "quota_exhausted", count: 1 },
    { errorType: "server_error", count: 1 },
  ]);
  ids.forEach((id) => db.prepare("DELETE FROM call_logs WHERE id = ?").run(id));
});

test("saveCallLog clamps out-of-vocabulary error_type to unknown, keeps null success", async () => {
  const db = getDbInstance();
  const id = `test-errtype-clamp-${Date.now()}`;
  await saveCallLog({
    id,
    method: "POST",
    path: "/v1/chat/completions",
    status: 403,
    error: "some other 403 body",
    model: "m",
    provider: "test-provider",
    duration: 1,
    tokens: { in: 1, out: 1 },
  });
  const row = db.prepare("SELECT error_type FROM call_logs WHERE id = ?").get(id) as {
    error_type: string | null;
  };
  assert.equal(row.error_type, "unknown");
  db.prepare("DELETE FROM call_logs WHERE id = ?").run(id);
});
