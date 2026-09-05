import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance } from "../../../src/lib/db/core.ts";
import { classifyCallLogError } from "../../../src/lib/usage/callLogs/format.ts";
import { saveCallLog } from "../../../src/lib/usage/callLogs.ts";
import { getErrorTypeBreakdown } from "../../../src/lib/db/callLogStats.ts";

test("call_logs table has error_type column", () => {
  const db = getDbInstance();
  const columns = db.prepare("PRAGMA table_info(call_logs)").all() as { name: string }[];
  const colNames = columns.map((c) => c.name);
  assert.ok(colNames.includes("error_type"), "call_logs should have error_type column");
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
  assert.equal(classifyCallLogError(0, "boom", "test-provider"), null);
});

test("classifyCallLogError extracts message from Error object", () => {
  assert.equal(
    classifyCallLogError(403, new Error("browser_signature_banned"), "openai"),
    "fingerprint_rejection"
  );
});

test("classifyCallLogError returns null for unclassifiable provider-403 (api key)", () => {
  assert.equal(classifyCallLogError(403, "some other 403 body", "openai"), null);
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
    { errorType: "unclassified", count: 1 },
  ]);

  ids.forEach((id) => db.prepare("DELETE FROM call_logs WHERE id = ?").run(id));
});

test("getErrorTypeBreakdown with empty whereClause does not crash", () => {
  const breakdown = getErrorTypeBreakdown("", {});
  assert.ok(Array.isArray(breakdown));
});
