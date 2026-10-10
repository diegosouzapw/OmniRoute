/**
 * Bounded call_logs reader for reasoning_effort=none compliance.
 *
 * One test per gate case. Rows are inserted directly (the production writer
 * only persists effort columns on the encrypted path), and removed in
 * `finally`, so every input reaches the code through the journal it reads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-none-honored-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const mod = await import("../../../src/lib/db/reasoningEffortCompliance.ts");

const FIXED_NOW = new Date("2026-03-28T12:00:00.000Z").getTime();
const isoHoursAgo = (hours: number) => new Date(FIXED_NOW - hours * 3_600_000).toISOString();

let idSeq = 0;
function insertRow(row: Record<string, unknown>) {
  const db = core.getDbInstance();
  const full = {
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: null,
    requested_model: null,
    provider: "openai",
    account: null,
    connection_id: null,
    duration: 100,
    tokens_in: 10,
    tokens_out: 20,
    cache_source: "upstream",
    source_format: null,
    target_format: null,
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    combo_step_id: null,
    combo_execution_key: null,
    error_summary: null,
    detail_state: "none",
    artifact_relpath: null,
    artifact_size_bytes: null,
    artifact_sha256: null,
    has_request_body: 0,
    has_response_body: 0,
    has_pipeline_details: 0,
    request_summary: null,
    request_type: null,
    tokens_reasoning: null,
    reasoning_chars: null,
    reasoning_encrypted: null,
    reasoning_effort_requested: null,
    ...row,
    id: (row.id as string) ?? `none-honored-${++idSeq}`,
    timestamp: (row.timestamp as string) ?? isoHoursAgo(1),
  };
  db.prepare(
    `INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, cache_source, source_format, target_format,
      api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key,
      error_summary, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
      has_request_body, has_response_body, has_pipeline_details, request_summary, request_type,
      tokens_reasoning, reasoning_chars, reasoning_encrypted, reasoning_effort_requested
    ) VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @cache_source, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @combo_step_id, @combo_execution_key,
      @error_summary, @detail_state, @artifact_relpath, @artifact_size_bytes, @artifact_sha256,
      @has_request_body, @has_response_body, @has_pipeline_details, @request_summary, @request_type,
      @tokens_reasoning, @reasoning_chars, @reasoning_encrypted, @reasoning_effort_requested
    )`
  ).run(full);
}

function clearEnv() {
  delete process.env.NONE_HONORED_WINDOW_HOURS;
  delete process.env.NONE_HONORED_CACHE_TTL_MS;
  delete process.env.NONE_HONORED_MIN_SAMPLE;
}

test.before(() => {
  core.resetDbInstance();
  core.getDbInstance();
});

test.beforeEach(() => {
  clearEnv();
  mod.clearNoneHonoredCache();
  core.getDbInstance().prepare("DELETE FROM call_logs").run();
});

test.after(() => {
  clearEnv();
  mod.clearNoneHonoredCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("none requested with no reasoning applied reads honored with window and sample size", () => {
  try {
    for (let i = 0; i < 3; i++) {
      insertRow({ requested_model: "model-a", reasoning_effort_requested: "none" });
    }
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(typeof snapshot.observedAt, "string");
    assert.equal(snapshot.window.hours, 24);
    assert.equal(typeof snapshot.window.sinceIso, "string");
    const entry = snapshot.entries.get("model-a");
    assert.ok(entry, "expected a snapshot entry for model-a");
    assert.equal(entry.honored, true);
    assert.equal(entry.sampleSize, 3);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("none requested with reasoning applied reads not honored", () => {
  try {
    insertRow({ requested_model: "model-b", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-b", reasoning_effort_requested: "none" });
    insertRow({
      requested_model: "model-b",
      reasoning_effort_requested: "none",
      tokens_reasoning: 384,
    });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-b")?.honored, false);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("model without a none request in the window reads unknown", () => {
  try {
    insertRow({ requested_model: "other-model", reasoning_effort_requested: "low" });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.has("model-c"), false);
    assert.equal(mod.readNoneHonored(snapshot, "model-c").honored, null);
    assert.equal(mod.readNoneHonored(snapshot, "model-c").sampleSize, 0);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("two close reads issue a single journal query", () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  let journalReads = 0;
  (db as { prepare: (...args: unknown[]) => unknown }).prepare = ((
    sql: unknown,
    ...rest: unknown[]
  ) => {
    if (typeof sql === "string" && sql.includes("call_logs")) journalReads += 1;
    return (originalPrepare as (...args: unknown[]) => unknown)(sql, ...rest);
  }) as typeof db.prepare;
  try {
    insertRow({ requested_model: "model-cache", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-cache", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-cache", reasoning_effort_requested: "none" });
    mod.clearNoneHonoredCache();
    journalReads = 0;
    const first = mod.getNoneHonoredSnapshot(db, FIXED_NOW);
    const second = mod.getNoneHonoredSnapshot(db, FIXED_NOW);
    assert.equal(journalReads, 1);
    assert.equal(second, first);
  } finally {
    (db as { prepare: typeof db.prepare }).prepare = originalPrepare;
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("request outside the window is not counted", () => {
  try {
    insertRow({
      requested_model: "model-d",
      reasoning_effort_requested: "none",
      tokens_reasoning: 1016,
      timestamp: isoHoursAgo(25),
    });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.has("model-d"), false);
    assert.equal(mod.readNoneHonored(snapshot, "model-d").honored, null);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("small sample reads unknown instead of not honored", () => {
  try {
    insertRow({ requested_model: "model-e", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-e", reasoning_effort_requested: "none" });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-e")?.honored, null);
    assert.equal(snapshot.entries.get("model-e")?.sampleSize, 2);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("row without any model key is ignored", () => {
  try {
    insertRow({
      model: null,
      requested_model: null,
      reasoning_effort_requested: "none",
      tokens_reasoning: 5,
    });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.size, 0);
    for (const key of snapshot.entries.keys()) {
      assert.ok(typeof key === "string" && key.length > 0);
    }
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("effort matching ignores case and padding", () => {
  try {
    insertRow({ requested_model: "model-f", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-f", reasoning_effort_requested: " None " });
    insertRow({ requested_model: "model-f", reasoning_effort_requested: "NONE" });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-f")?.honored, true);
    assert.equal(snapshot.entries.get("model-f")?.sampleSize, 3);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("missing requested model falls back to the served model", () => {
  try {
    insertRow({ model: "model-g", requested_model: null, reasoning_effort_requested: "none" });
    insertRow({ model: "model-g", requested_model: null, reasoning_effort_requested: "none" });
    insertRow({ model: "model-g", requested_model: "", reasoning_effort_requested: "none" });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-g")?.honored, true);
    assert.equal(snapshot.entries.get("model-g")?.sampleSize, 3);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("encrypted reasoning marker counts as reasoning applied", () => {
  try {
    insertRow({ requested_model: "model-h", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-h", reasoning_effort_requested: "none" });
    insertRow({
      requested_model: "model-h",
      reasoning_effort_requested: "none",
      reasoning_encrypted: 1,
    });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-h")?.honored, false);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("reasoning character count counts as reasoning applied", () => {
  try {
    insertRow({ requested_model: "model-i", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-i", reasoning_effort_requested: "none" });
    insertRow({
      requested_model: "model-i",
      reasoning_effort_requested: "none",
      reasoning_chars: 50,
    });
    const snapshot = mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(snapshot.entries.get("model-i")?.honored, false);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});

test("repeated reads keep a single cache entry", () => {
  try {
    insertRow({ requested_model: "model-j", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-j", reasoning_effort_requested: "none" });
    insertRow({ requested_model: "model-j", reasoning_effort_requested: "none" });
    mod.clearNoneHonoredCache();
    assert.equal(mod.noneHonoredCacheSizeForTest(), 0);
    mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    mod.getNoneHonoredSnapshot(undefined, FIXED_NOW);
    assert.equal(mod.noneHonoredCacheSizeForTest(), 1);
    mod.clearNoneHonoredCache();
    assert.equal(mod.noneHonoredCacheSizeForTest(), 0);
  } finally {
    core.getDbInstance().prepare("DELETE FROM call_logs").run();
    mod.clearNoneHonoredCache();
  }
});
