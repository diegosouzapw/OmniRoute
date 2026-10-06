import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { classifyCallLogError, toStoredErrorType } from "../../src/lib/usage/callLogs/format.ts";
import { saveCallLog } from "../../src/lib/usage/callLogs.ts";
import { ERROR_TYPE_CUTOVER_ISO, getErrorTypeBreakdown } from "../../src/lib/db/callLogStats.ts";
import { getCallLogsForExport } from "../../src/lib/usage/callLogExportSource.ts";
import { toBigQueryRow } from "../../src/lib/logExport/destinations/bigquery.ts";
import {
  ERROR_TYPE_CONTRACT,
  ERROR_TYPE_CONTRACT_VERSION,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

test.after(() => {
  resetDbInstance();
});

function deleteCallLogs(ids: string[]) {
  const db = getDbInstance();
  const stmt = db.prepare("DELETE FROM call_logs WHERE id = ?");
  for (const id of ids) stmt.run(id);
}

function insertRawErrorType(id: string, errorType: string | null, timestamp: string, status = 500) {
  getDbInstance()
    .prepare(
      "INSERT INTO call_logs (id, timestamp, method, path, status, error_type, model, provider) VALUES (@id, @ts, 'POST', '/v1/chat/completions', @status, @et, 'm', 'p')"
    )
    .run({ id, ts: timestamp, et: errorType, status });
}

function breakdownFor(ids: string[]) {
  const whereClause = `WHERE id IN (${ids.map((_, i) => `@id${i}`).join(", ")})`;
  const params = Object.fromEntries(ids.map((id, i) => [`id${i}`, id]));
  return getErrorTypeBreakdown(whereClause, params);
}

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

test("classifyCallLogError: successes stay null, unclassifiable failures become unknown", () => {
  // Successes (with or without a body) carry no family.
  assert.equal(classifyCallLogError(200, "", "openai"), null);
  assert.equal(classifyCallLogError(200, "some body", "openai"), null);
  // status 0 = no upstream response: null without error text, a failure with it.
  assert.equal(classifyCallLogError(0, "", "test-provider"), null);
  assert.equal(classifyCallLogError(0, "boom", "test-provider"), "unknown");
  // An api-key provider 403 the classifier cannot place (it returns null).
  assert.equal(classifyCallLogError(403, "some other 403 body", "openai"), "unknown");
  assert.equal(classifyCallLogError(418, "teapot", "openai"), "unknown");
});

test("classifyCallLogError only ever returns a contract value or null", () => {
  const contract = new Set<string | null>([...ERROR_TYPE_CONTRACT, null]);
  const samples: Array<[number, string]> = [
    [0, ""],
    [0, "socket hang up"],
    [200, "ok"],
    [400, "context length exceeded"],
    [400, "bad request"],
    [401, "bad key"],
    [402, "pay"],
    [403, "browser_signature_banned"],
    [403, "nope"],
    [404, "gone"],
    [422, "gcp_project_required"],
    [429, "slow down"],
    [503, "down"],
  ];
  for (const [status, body] of samples) {
    const value = classifyCallLogError(status, body, "openai");
    assert.ok(contract.has(value), `status ${status} produced out-of-contract ${String(value)}`);
  }
});

test("error type contract version is 1 and vocabulary syncs with PROVIDER_ERROR_TYPES", () => {
  assert.equal(ERROR_TYPE_CONTRACT_VERSION, 1);
  assert.deepEqual(
    [...ERROR_TYPE_CONTRACT].sort(),
    [...Object.values(PROVIDER_ERROR_TYPES), "unknown"].sort()
  );
  assert.ok(Object.isFrozen(ERROR_TYPE_CONTRACT));
});

test("classifyCallLogError extracts message from Error object", () => {
  assert.equal(
    classifyCallLogError(403, new Error("browser_signature_banned"), "openai"),
    "fingerprint_rejection"
  );
});

test("saveCallLog persists error_type from failure", async () => {
  const testId = `test-errtype-${Date.now()}`;
  try {
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

    const row = getDbInstance()
      .prepare("SELECT error_type FROM call_logs WHERE id = ?")
      .get(testId) as { error_type: string | null };
    assert.equal(row.error_type, "quota_exhausted");
  } finally {
    deleteCallLogs([testId]);
  }
});

test("saveCallLog persists null error_type for success", async () => {
  const testId = `test-errtype-ok-${Date.now()}`;
  try {
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

    const row = getDbInstance()
      .prepare("SELECT error_type FROM call_logs WHERE id = ?")
      .get(testId) as { error_type: string | null };
    assert.equal(row.error_type, null);
  } finally {
    deleteCallLogs([testId]);
  }
});

test("saveCallLog normalizes Error object before classifying", async () => {
  const testId = `test-errtype-err-${Date.now()}`;
  try {
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

    const row = getDbInstance()
      .prepare("SELECT error_type FROM call_logs WHERE id = ?")
      .get(testId) as { error_type: string | null };
    assert.equal(row.error_type, "fingerprint_rejection");
  } finally {
    deleteCallLogs([testId]);
  }
});

test("getErrorTypeBreakdown groups failures by family, excludes successes", async () => {
  const stamp = Date.now();
  const ids = [
    `test-errbd-q1-${stamp}`,
    `test-errbd-q2-${stamp}`,
    `test-errbd-s5-${stamp}`,
    `test-errbd-403-${stamp}`,
    `test-errbd-ok-${stamp}`,
  ];
  const base = {
    method: "POST",
    path: "/v1/chat/completions",
    model: "m",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 1, out: 1 },
  };
  try {
    await saveCallLog({ ...base, id: ids[0], status: 402, error: "exceeded your current quota" });
    await saveCallLog({ ...base, id: ids[1], status: 402, error: "insufficient balance" });
    await saveCallLog({ ...base, id: ids[2], status: 500, error: "Internal Server Error" });
    await saveCallLog({ ...base, id: ids[3], status: 403, error: "some other 403 body" });
    await saveCallLog({ ...base, id: ids[4], status: 200 });

    assert.deepEqual(breakdownFor(ids), [
      { errorType: "quota_exhausted", count: 2 },
      { errorType: "server_error", count: 1 },
      { errorType: "unknown", count: 1 },
    ]);
  } finally {
    deleteCallLogs(ids);
  }
});

test("getErrorTypeBreakdown with empty whereClause does not crash", () => {
  const breakdown = getErrorTypeBreakdown("", {});
  assert.ok(Array.isArray(breakdown));
});

test("getErrorTypeBreakdown maps free-text history to unclassified, keeps pre_migration", () => {
  const ids = ["hx-typo", "hx-old", "hx-new"];
  try {
    insertRawErrorType("hx-typo", "typo_free", new Date().toISOString());
    insertRawErrorType("hx-old", null, "2026-01-01T00:00:00.000Z");
    insertRawErrorType("hx-new", null, new Date().toISOString());
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["typo_free"], undefined); // no longer leaks through as-is
    assert.equal(byType["unclassified"], 2); // typo + recent NULL, merged into ONE row
    assert.equal(byType["pre_migration"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("legacy NULL rows neither vanish nor double-count next to the new unknown value", async () => {
  const stamp = Date.now();
  const legacyPre = `hx-legacy-pre-${stamp}`;
  const legacyPost = `hx-legacy-post-${stamp}`;
  const legacySuccess = `hx-legacy-ok-${stamp}`;
  const vocab = `hx-vocab-${stamp}`;
  const fresh = `hx-fresh-unknown-${stamp}`;
  const ids = [legacyPre, legacyPost, legacySuccess, vocab, fresh];
  try {
    insertRawErrorType(legacyPre, null, "2026-02-01T00:00:00.000Z", 503);
    insertRawErrorType(legacyPost, null, new Date().toISOString(), 403);
    insertRawErrorType(legacySuccess, null, new Date().toISOString(), 200);
    insertRawErrorType(vocab, "rate_limited", new Date().toISOString(), 429);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const rows = breakdownFor(ids);
    const byType = Object.fromEntries(rows.map((r) => [r.errorType, r.count]));
    assert.deepEqual(byType, {
      pre_migration: 1,
      unclassified: 1,
      rate_limited: 1,
      unknown: 1,
    });
    // One bucket per failure row: the breakdown total equals the failure count.
    const failures = getDbInstance()
      .prepare(
        `SELECT COUNT(*) AS n FROM call_logs WHERE id IN (${ids.map(() => "?").join(",")}) AND (status >= 400 OR error_summary IS NOT NULL)`
      )
      .get(...ids) as { n: number };
    assert.equal(
      rows.reduce((sum, r) => sum + r.count, 0),
      failures.n
    );
  } finally {
    deleteCallLogs(ids);
  }
});

test("cutover boundary: pre_migration only before ERROR_TYPE_CUTOVER_ISO", () => {
  assert.equal(ERROR_TYPE_CUTOVER_ISO, "2026-08-20");
  const ids = ["hx-b1", "hx-b2"];
  try {
    insertRawErrorType("hx-b1", null, "2026-08-19T23:59:59.000Z");
    insertRawErrorType("hx-b2", null, "2026-08-20T00:00:00.000Z");
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["pre_migration"], 1);
    assert.equal(byType["unclassified"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("log export keeps both legacy NULL and the new unknown error_type intact", async () => {
  const stamp = Date.now();
  const legacy = `hx-export-null-${stamp}`;
  const fresh = `hx-export-unknown-${stamp}`;
  const db = getDbInstance();
  const before = Number(
    (db.prepare("SELECT COALESCE(MAX(rowid), 0) AS m FROM call_logs").get() as { m: number }).m
  );
  try {
    insertRawErrorType(legacy, null, new Date().toISOString(), 500);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const exported = getCallLogsForExport(before, 50);
    const byId = new Map(exported.map((row) => [row.record.id, row.record]));
    assert.equal(byId.get(legacy)?.errorType, null);
    assert.equal(byId.get(fresh)?.errorType, "unknown");

    const exportedAt = new Date().toISOString();
    assert.equal(toBigQueryRow(byId.get(legacy)!, exportedAt).error_type, null);
    assert.equal(toBigQueryRow(byId.get(fresh)!, exportedAt).error_type, "unknown");
  } finally {
    deleteCallLogs([legacy, fresh]);
  }
});

test("getErrorTypeBreakdown maps free-text history to unclassified, keeps pre_migration", () => {
  const ids = ["hx-typo", "hx-old", "hx-new"];
  try {
    insertRawErrorType("hx-typo", "typo_free", new Date().toISOString());
    insertRawErrorType("hx-old", null, "2026-01-01T00:00:00.000Z");
    insertRawErrorType("hx-new", null, new Date().toISOString());
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["typo_free"], undefined); // no longer leaks through as-is
    assert.equal(byType["unclassified"], 2); // typo + recent NULL, merged into ONE row
    assert.equal(byType["pre_migration"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("legacy NULL rows neither vanish nor double-count next to the new unknown value", async () => {
  const stamp = Date.now();
  const legacyPre = `hx-legacy-pre-${stamp}`;
  const legacyPost = `hx-legacy-post-${stamp}`;
  const legacySuccess = `hx-legacy-ok-${stamp}`;
  const vocab = `hx-vocab-${stamp}`;
  const fresh = `hx-fresh-unknown-${stamp}`;
  const ids = [legacyPre, legacyPost, legacySuccess, vocab, fresh];
  try {
    insertRawErrorType(legacyPre, null, "2026-02-01T00:00:00.000Z", 503);
    insertRawErrorType(legacyPost, null, new Date().toISOString(), 403);
    insertRawErrorType(legacySuccess, null, new Date().toISOString(), 200);
    insertRawErrorType(vocab, "rate_limited", new Date().toISOString(), 429);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const rows = breakdownFor(ids);
    const byType = Object.fromEntries(rows.map((r) => [r.errorType, r.count]));
    assert.deepEqual(byType, {
      pre_migration: 1,
      unclassified: 1,
      rate_limited: 1,
      unknown: 1,
    });
    // One bucket per failure row: the breakdown total equals the failure count.
    const failures = getDbInstance()
      .prepare(
        `SELECT COUNT(*) AS n FROM call_logs WHERE id IN (${ids.map(() => "?").join(",")}) AND (status >= 400 OR error_summary IS NOT NULL)`
      )
      .get(...ids) as { n: number };
    assert.equal(
      rows.reduce((sum, r) => sum + r.count, 0),
      failures.n
    );
  } finally {
    deleteCallLogs(ids);
  }
});

test("cutover boundary: pre_migration only before ERROR_TYPE_CUTOVER_ISO", () => {
  assert.equal(ERROR_TYPE_CUTOVER_ISO, "2026-08-20");
  const ids = ["hx-b1", "hx-b2"];
  try {
    insertRawErrorType("hx-b1", null, "2026-08-19T23:59:59.000Z");
    insertRawErrorType("hx-b2", null, "2026-08-20T00:00:00.000Z");
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["pre_migration"], 1);
    assert.equal(byType["unclassified"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("log export keeps both legacy NULL and the new unknown error_type intact", async () => {
  const stamp = Date.now();
  const legacy = `hx-export-null-${stamp}`;
  const fresh = `hx-export-unknown-${stamp}`;
  const db = getDbInstance();
  const before = Number(
    (db.prepare("SELECT COALESCE(MAX(rowid), 0) AS m FROM call_logs").get() as { m: number }).m
  );
  try {
    insertRawErrorType(legacy, null, new Date().toISOString(), 500);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const exported = getCallLogsForExport(before, 50);
    const byId = new Map(exported.map((row) => [row.record.id, row.record]));
    assert.equal(byId.get(legacy)?.errorType, null);
    assert.equal(byId.get(fresh)?.errorType, "unknown");

    const exportedAt = new Date().toISOString();
    assert.equal(toBigQueryRow(byId.get(legacy)!, exportedAt).error_type, null);
    assert.equal(toBigQueryRow(byId.get(fresh)!, exportedAt).error_type, "unknown");
  } finally {
    deleteCallLogs([legacy, fresh]);
  }
});

test("toStoredErrorType: contract values pass, null stays null, anything else is unknown", () => {
  for (const value of ERROR_TYPE_CONTRACT) {
    assert.equal(toStoredErrorType(value), value);
  }
  assert.equal(toStoredErrorType(null), null);
  assert.equal(toStoredErrorType(undefined), null);
  for (const value of ["typo_free", "RATE_LIMITED", "", " rate_limited", 42, {}, ["unknown"]]) {
    assert.equal(
      toStoredErrorType(value),
      "unknown",
      `expected unknown for ${JSON.stringify(value)}`
    );
  }
});

test("saveCallLog stores unknown when the classifier emits a family outside the contract", async () => {
  // Simulates vocabulary drift for real: classifyProviderError reads
  // PROVIDER_ERROR_TYPES at call time, while ERROR_TYPE_CONTRACT is the frozen
  // snapshot taken at load. A renamed family therefore reaches the write point
  // as an out-of-contract string, and the guard must clamp it.
  const types = PROVIDER_ERROR_TYPES as unknown as Record<string, string>;
  const original = types.SERVER_ERROR;
  const id = `test-errtype-drift-${Date.now()}`;
  try {
    types.SERVER_ERROR = "server_error_v2";
    assert.equal(classifyCallLogError(503, "down", "test-provider"), "server_error_v2");
    await saveCallLog({
      id,
      method: "POST",
      path: "/v1/chat/completions",
      status: 503,
      error: "Service Unavailable",
      model: "m",
      provider: "test-provider",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });
    const row = getDbInstance()
      .prepare("SELECT error_type FROM call_logs WHERE id = ?")
      .get(id) as {
      error_type: string | null;
    };
    assert.equal(row.error_type, "unknown");
  } finally {
    types.SERVER_ERROR = original;
    deleteCallLogs([id]);
  }
});

test("getErrorTypeBreakdown maps free-text history to unclassified, keeps pre_migration", () => {
  const ids = ["hx-typo", "hx-old", "hx-new"];
  try {
    insertRawErrorType("hx-typo", "typo_free", new Date().toISOString());
    insertRawErrorType("hx-old", null, "2026-01-01T00:00:00.000Z");
    insertRawErrorType("hx-new", null, new Date().toISOString());
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["typo_free"], undefined); // no longer leaks through as-is
    assert.equal(byType["unclassified"], 2); // typo + recent NULL, merged into ONE row
    assert.equal(byType["pre_migration"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("legacy NULL rows neither vanish nor double-count next to the new unknown value", async () => {
  const stamp = Date.now();
  const legacyPre = `hx-legacy-pre-${stamp}`;
  const legacyPost = `hx-legacy-post-${stamp}`;
  const legacySuccess = `hx-legacy-ok-${stamp}`;
  const vocab = `hx-vocab-${stamp}`;
  const fresh = `hx-fresh-unknown-${stamp}`;
  const ids = [legacyPre, legacyPost, legacySuccess, vocab, fresh];
  try {
    insertRawErrorType(legacyPre, null, "2026-02-01T00:00:00.000Z", 503);
    insertRawErrorType(legacyPost, null, new Date().toISOString(), 403);
    insertRawErrorType(legacySuccess, null, new Date().toISOString(), 200);
    insertRawErrorType(vocab, "rate_limited", new Date().toISOString(), 429);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const rows = breakdownFor(ids);
    const byType = Object.fromEntries(rows.map((r) => [r.errorType, r.count]));
    assert.deepEqual(byType, {
      pre_migration: 1,
      unclassified: 1,
      rate_limited: 1,
      unknown: 1,
    });
    // One bucket per failure row: the breakdown total equals the failure count.
    const failures = getDbInstance()
      .prepare(
        `SELECT COUNT(*) AS n FROM call_logs WHERE id IN (${ids.map(() => "?").join(",")}) AND (status >= 400 OR error_summary IS NOT NULL)`
      )
      .get(...ids) as { n: number };
    assert.equal(
      rows.reduce((sum, r) => sum + r.count, 0),
      failures.n
    );
  } finally {
    deleteCallLogs(ids);
  }
});

test("cutover boundary: pre_migration only before ERROR_TYPE_CUTOVER_ISO", () => {
  assert.equal(ERROR_TYPE_CUTOVER_ISO, "2026-08-20");
  const ids = ["hx-b1", "hx-b2"];
  try {
    insertRawErrorType("hx-b1", null, "2026-08-19T23:59:59.000Z");
    insertRawErrorType("hx-b2", null, "2026-08-20T00:00:00.000Z");
    const byType = Object.fromEntries(breakdownFor(ids).map((r) => [r.errorType, r.count]));
    assert.equal(byType["pre_migration"], 1);
    assert.equal(byType["unclassified"], 1);
  } finally {
    deleteCallLogs(ids);
  }
});

test("log export keeps both legacy NULL and the new unknown error_type intact", async () => {
  const stamp = Date.now();
  const legacy = `hx-export-null-${stamp}`;
  const fresh = `hx-export-unknown-${stamp}`;
  const db = getDbInstance();
  const before = Number(
    (db.prepare("SELECT COALESCE(MAX(rowid), 0) AS m FROM call_logs").get() as { m: number }).m
  );
  try {
    insertRawErrorType(legacy, null, new Date().toISOString(), 500);
    await saveCallLog({
      id: fresh,
      method: "POST",
      path: "/v1/chat/completions",
      status: 403,
      error: "some other 403 body",
      model: "m",
      provider: "openai",
      duration: 1,
      tokens: { in: 1, out: 1 },
    });

    const exported = getCallLogsForExport(before, 50);
    const byId = new Map(exported.map((row) => [row.record.id, row.record]));
    assert.equal(byId.get(legacy)?.errorType, null);
    assert.equal(byId.get(fresh)?.errorType, "unknown");

    const exportedAt = new Date().toISOString();
    assert.equal(toBigQueryRow(byId.get(legacy)!, exportedAt).error_type, null);
    assert.equal(toBigQueryRow(byId.get(fresh)!, exportedAt).error_type, "unknown");
  } finally {
    deleteCallLogs([legacy, fresh]);
  }
});
