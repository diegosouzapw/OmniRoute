import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const databaseSettingsRoute = await import("../../src/app/api/settings/database/route.ts");
const cacheConfigRoute = await import("../../src/app/api/settings/cache-config/route.ts");
const purgeRequestHistoryRoute =
  await import("../../src/app/api/settings/purge-request-history/route.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const aggregateHistory = await import("../../src/lib/usage/aggregateHistory.ts");
const { DEFAULT_DATABASE_SETTINGS } = await import("../../src/types/databaseSettings.ts");
const { databaseSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

type CountRow = {
  count: number;
};

type UsageSummaryRow = {
  total_requests: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_cost: number;
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeJsonRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/database", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function insertCallLog(id: string, artifactRelPath: string | null = null) {
  const db = core.getDbInstance();
  db.prepare(
    `
      INSERT INTO call_logs (id, timestamp, method, path, status, detail_state, artifact_relpath)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    id,
    "2026-06-01T12:00:00.000Z",
    "POST",
    "/v1/chat/completions",
    200,
    artifactRelPath ? "ready" : "none",
    artifactRelPath
  );
}

function writeCallLogArtifact(relativePath: string) {
  const absolutePath = path.join(TEST_DATA_DIR, "call_logs", relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, JSON.stringify({ relativePath }), "utf8");
  return absolutePath;
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("database settings route returns mapped stats and persists editable sections", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, callLogs: 12, autoCleanupEnabled: false },
      aggregation: { ...current.aggregation, enabled: false, rawDataRetentionDays: 8 },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.callLogs, 12);
  assert.equal(body.aggregation.rawDataRetentionDays, 8);
  assert.equal(typeof body.location.databasePath, "string");
  assert.equal(typeof body.location.dataDir, "string");
  assert.equal(typeof body.location.walSizeBytes, "number");
  assert.equal(typeof body.stats.databaseSizeBytes, "number");
  assert.equal(typeof body.stats.pageCount, "number");
  assert.equal(typeof body.stats.freelistCount, "number");

  const db = core.getDbInstance();
  const stored = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = 'retention.callLogs'"
    )
    .get() as { value: string } | undefined;
  assert.equal(JSON.parse(stored?.value ?? "null"), 12);

  const getResponse = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
  const getBody = await getResponse.json();

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.retention.callLogs, 12);
  assert.equal(getBody.aggregation.rawDataRetentionDays, 8);
});

test("database settings readers report the stored integrity result without a full scan", async (t) => {
  await t.test("GET returns the stored result and date without running a scan", async () => {
    const db = core.getDbInstance();
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
    ).run(
      "integrity.lastCheck",
      JSON.stringify({ status: "ok", checkedAt: "2026-10-01T10:00:00.000Z" })
    );
    let scans = 0;
    const originalPragma = db.pragma;
    db.pragma = ((sql: string, options?: unknown) => {
      if (/quick_check|integrity_check/i.test(sql)) scans += 1;
      return (originalPragma as (...args: unknown[]) => unknown).call(db, sql, options);
    }) as typeof db.pragma;
    try {
      const response = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(scans, 0);
      assert.equal(body.stats.integrityCheck, "ok");
      assert.equal(body.stats.lastIntegrityCheckAt, "2026-10-01T10:00:00.000Z");
    } finally {
      db.pragma = originalPragma;
    }
  });

  await t.test("PATCH persists settings without running a scan", async () => {
    const db = core.getDbInstance();
    let scans = 0;
    const originalPragma = db.pragma;
    db.pragma = ((sql: string, options?: unknown) => {
      if (/quick_check|integrity_check/i.test(sql)) scans += 1;
      return (originalPragma as (...args: unknown[]) => unknown).call(db, sql, options);
    }) as typeof db.pragma;
    try {
      const current = databaseSettings.getUserDatabaseSettings();
      const response = await databaseSettingsRoute.PATCH(
        makeJsonRequest("PATCH", {
          retention: { ...current.retention, callLogs: 11 },
        }) as never
      );
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(scans, 0);
      assert.equal(body.retention.callLogs, 11);
    } finally {
      db.pragma = originalPragma;
    }
  });

  await t.test("cache config GET serves cache keys without running a scan", async () => {
    const db = core.getDbInstance();
    let scans = 0;
    const originalPragma = db.pragma;
    db.pragma = ((sql: string, options?: unknown) => {
      if (/quick_check|integrity_check/i.test(sql)) scans += 1;
      return (originalPragma as (...args: unknown[]) => unknown).call(db, sql, options);
    }) as typeof db.pragma;
    try {
      const response = await cacheConfigRoute.GET(
        new Request("http://localhost/api/settings/cache-config", { method: "GET" }) as never
      );
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(scans, 0);
      assert.equal(typeof body.modelCatalogCacheTtlMs, "number");
    } finally {
      db.pragma = originalPragma;
    }
  });
});

test("explicit integrity check runs a scan and stores the dated result", async () => {
  const { POST } = await import("../../src/app/api/settings/database/integrity-check/route.ts");
  const db = core.getDbInstance();
  let scans = 0;
  const originalPragma = db.pragma;
  db.pragma = ((sql: string, options?: unknown) => {
    if (/quick_check/i.test(sql)) scans += 1;
    return (originalPragma as (...args: unknown[]) => unknown).call(db, sql, options);
  }) as typeof db.pragma;
  try {
    const response = await POST(
      new Request("http://localhost/api/settings/database/integrity-check", {
        method: "POST",
      }) as never
    );
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(scans, 1);
    assert.ok(body.integrityCheck === "ok" || body.integrityCheck === "error");
    const checkedAt = Date.parse(body.lastIntegrityCheckAt);
    assert.ok(Number.isFinite(checkedAt));
    assert.ok(Math.abs(Date.now() - checkedAt) < 5 * 60 * 1000);

    const stored = db
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = 'integrity.lastCheck'"
      )
      .get() as { value: string } | undefined;
    assert.equal(JSON.parse(stored?.value ?? "null").status, body.integrityCheck);

    const settings = databaseSettings.getDatabaseSettings();
    assert.equal(settings.stats.integrityCheck, body.integrityCheck);
    assert.equal(settings.stats.lastIntegrityCheckAt, body.lastIntegrityCheckAt);
  } finally {
    db.pragma = originalPragma;
  }
});

test("database settings readers report unknown when no check was ever stored", async (t) => {
  await t.test("missing row returns nulls without an error", async () => {
    const settings = databaseSettings.getDatabaseSettings();
    assert.equal(settings.stats.integrityCheck, null);
    assert.equal(settings.stats.lastIntegrityCheckAt, null);

    const response = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.stats.integrityCheck, null);
    assert.equal(body.stats.lastIntegrityCheckAt, null);
  });

  await t.test("corrupt stored result returns nulls without an error", async () => {
    const db = core.getDbInstance();
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
    ).run("integrity.lastCheck", "not-json{");

    const settings = databaseSettings.getDatabaseSettings();
    assert.equal(settings.stats.integrityCheck, null);
    assert.equal(settings.stats.lastIntegrityCheckAt, null);

    const response = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.stats.integrityCheck, null);
    assert.equal(body.stats.lastIntegrityCheckAt, null);
  });

  await t.test("stored settings namespaces keep their values next to the result", async () => {
    const db = core.getDbInstance();
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
    ).run("retention.callLogs", JSON.stringify(9));
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
    ).run("integrity.lastCheck", JSON.stringify({ status: "nope", checkedAt: "bogus" }));

    assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, 9);
    assert.equal(databaseSettings.getDatabaseSettings().stats.integrityCheck, null);
  });

  await t.test("stored failure text names the integrity check, not the compaction", async () => {
    const catalog = (await import("../../src/i18n/messages/en.json", {
      with: { type: "json" },
    })) as { default: { settings: Record<string, string> } };
    assert.equal(typeof catalog.default.settings.storageIntegrityCheckFailed, "string");
    assert.ok(!catalog.default.settings.storageIntegrityCheckFailed.includes("VACUUM"));
  });
});

test("database settings reader supports legacy flat keys and lets nested saves win", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
  ).run("callLogs", JSON.stringify(99));

  assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, 99);

  databaseSettings.updateDatabaseSettings({
    retention: {
      ...databaseSettings.getUserDatabaseSettings().retention,
      callLogs: 7,
    },
  });

  assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, 7);
});

test("database log settings mirror the runtime pipeline toggle", async () => {
  await settingsDb.updateSettings({ call_log_pipeline_enabled: false });

  assert.equal(databaseSettings.getUserDatabaseSettings().logs.callLogPipelineEnabled, false);

  databaseSettings.updateDatabaseSettings({
    logs: {
      ...databaseSettings.getUserDatabaseSettings().logs,
      callLogPipelineEnabled: true,
    },
  });

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
  assert.equal(databaseSettings.getUserDatabaseSettings().logs.callLogPipelineEnabled, true);
});

test("database optimization settings apply SQLite cache size immediately", () => {
  const current = databaseSettings.getUserDatabaseSettings();

  databaseSettings.updateDatabaseSettings({
    optimization: {
      ...current.optimization,
      autoVacuumMode: core.getAutoVacuumMode(),
      pageSize: 4096,
      cacheSize: 16384,
    },
  });

  const db = core.getDbInstance();
  const stored = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = 'optimization.cacheSize'"
    )
    .get() as { value: string } | undefined;

  assert.equal(db.pragma("cache_size", { simple: true }), -16384);
  assert.equal(JSON.parse(stored?.value ?? "null"), 16384);
  assert.equal(databaseSettings.getUserDatabaseSettings().optimization.cacheSize, 16384);
});

test("database optimization settings apply SQLite page size immediately", () => {
  const current = databaseSettings.getUserDatabaseSettings();

  databaseSettings.updateDatabaseSettings({
    optimization: {
      ...current.optimization,
      autoVacuumMode: core.getAutoVacuumMode(),
      pageSize: 8192,
      cacheSize: 16384,
    },
  });

  assert.equal(core.getDbInstance().pragma("page_size", { simple: true }), 8192);
  assert.equal(databaseSettings.getUserDatabaseSettings().optimization.pageSize, 8192);
});

test("database optimization cache size is applied when the DB is reopened", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
  ).run("optimization.cacheSize", JSON.stringify(32768));

  core.resetDbInstance();
  const reopened = core.getDbInstance();

  assert.equal(reopened.pragma("cache_size", { simple: true }), -32768);
});

test("database optimization rejects negative cache size through the API", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      optimization: {
        ...current.optimization,
        cacheSize: -2000,
      },
    }) as never
  );

  assert.equal(response.status, 400);
});

test("database settings patch accepts a single retention field and keeps the rest", async () => {
  const before = databaseSettings.getUserDatabaseSettings().retention;
  const nextCallLogs = before.callLogs === 31 ? 32 : 31;
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { callLogs: nextCallLogs },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.callLogs, nextCallLogs);
  for (const [key, value] of Object.entries(before)) {
    if (key === "callLogs") continue;
    assert.deepEqual(body.retention[key], value);
  }
  assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, nextCallLogs);
});

test("database settings patch rejects a below-minimum retention field naming the field", async () => {
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { callLogs: 0 },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 400);
  const details = body?.error?.details;
  assert.ok(Array.isArray(details));
  assert.ok(details.some((detail: { field?: string }) => detail?.field === "retention.callLogs"));
});

test("database settings patch rejects an unknown top-level section", async () => {
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", { inconnue: {} }) as never
  );

  assert.equal(response.status, 400);
});

test("database settings patch still accepts complete sections", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      logs: { ...current.logs },
      backup: { ...current.backup },
      cache: { ...current.cache },
      retention: { ...current.retention },
      aggregation: { ...current.aggregation },
      optimization: { ...current.optimization },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.callLogs, current.retention.callLogs);
});

test("database settings patch accepts a single cache field and keeps the rest", async () => {
  const before = databaseSettings.getUserDatabaseSettings().cache;
  const nextMaxSize = before.semanticCacheMaxSize === 500 ? 600 : 500;
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      cache: { semanticCacheMaxSize: nextMaxSize },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.cache.semanticCacheMaxSize, nextMaxSize);
  for (const [key, value] of Object.entries(before)) {
    if (key === "semanticCacheMaxSize") continue;
    assert.deepEqual(body.cache[key], value);
  }
});

test("database settings reader normalizes legacy negative cache size to the positive default", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
  ).run("optimization.cacheSize", JSON.stringify(-2000));

  assert.equal(databaseSettings.getUserDatabaseSettings().optimization.cacheSize, 65536);
});

test("purgeDetailedLogs deletes request_detail_logs", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "detail-1",
    new Date().toISOString(),
    10
  );
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "detail-2",
    new Date().toISOString(),
    20
  );

  const result = await cleanup.purgeDetailedLogs();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 2);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM request_detail_logs").get() as CountRow).count,
    0
  );
});

test("purgeCallLogs deletes summary rows and local request artifacts", async () => {
  const db = core.getDbInstance();
  const artifactPath = writeCallLogArtifact("2026-06-01/request-1.json");
  const orphanPath = writeCallLogArtifact("2026-06-02/orphan.json");
  insertCallLog("call-1", "2026-06-01/request-1.json");

  const result = await cleanup.purgeCallLogs();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 1);
  assert.equal(result.deletedArtifacts, 2);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM call_logs").get() as CountRow).count, 0);
  assert.equal(fs.existsSync(artifactPath), false);
  assert.equal(fs.existsSync(orphanPath), false);
  assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "call_logs")), false);
});

test("purge request history route clears call logs, artifacts, and legacy detail rows", async () => {
  const db = core.getDbInstance();
  const artifactPath = writeCallLogArtifact("2026-06-01/request-route.json");
  insertCallLog("call-route", "2026-06-01/request-route.json");
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "detail-route",
    "2026-06-01T12:00:01.000Z",
    25
  );

  const response = await purgeRequestHistoryRoute.POST(
    new Request("http://localhost/api/settings/purge-request-history", { method: "POST" })
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.deleted, 1);
  assert.equal(body.deletedArtifacts, 1);
  assert.equal(body.deletedDetailedLogs, 1);
  assert.equal(body.errors, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM call_logs").get() as CountRow).count, 0);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM request_detail_logs").get() as CountRow).count,
    0
  );
  assert.equal(fs.existsSync(artifactPath), false);
});

test("usage aggregation upserts replace recomputed totals instead of adding them twice", async () => {
  const db = core.getDbInstance();
  const insertSnapshot = db.prepare(
    `INSERT INTO quota_snapshots
       (provider, connection_id, window_key, remaining_percentage, is_exhausted, raw_data, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  insertSnapshot.run(
    "openai",
    "conn-1",
    "daily",
    90,
    0,
    JSON.stringify({ model: "gpt-test", input_tokens: 10, output_tokens: 4, cost: 0.25 }),
    "2026-05-01 10:15:00"
  );
  insertSnapshot.run(
    "openai",
    "conn-1",
    "daily",
    80,
    0,
    JSON.stringify({ model: "gpt-test", input_tokens: 20, output_tokens: 6, cost: 0.5 }),
    "2026-05-01 10:45:00"
  );

  await aggregateHistory.rollupDailyUsage("2026-05-01", "2026-05-01");
  await aggregateHistory.rollupDailyUsage("2026-05-01", "2026-05-01");
  await aggregateHistory.rollupHourlyQuota("2026-05-01 10:00:00", "2026-05-01 10:59:59");
  await aggregateHistory.rollupHourlyQuota("2026-05-01 10:00:00", "2026-05-01 10:59:59");

  const daily = db.prepare("SELECT * FROM daily_usage_summary").get() as UsageSummaryRow;
  const hourly = db.prepare("SELECT * FROM hourly_usage_summary").get() as UsageSummaryRow;

  assert.equal(daily.total_requests, 2);
  assert.equal(daily.total_input_tokens, 30);
  assert.equal(daily.total_output_tokens, 10);
  assert.equal(daily.total_cost, 0.75);
  assert.equal(hourly.total_requests, 2);
  assert.equal(hourly.total_input_tokens, 30);
  assert.equal(hourly.total_output_tokens, 10);
  assert.equal(hourly.total_cost, 0.75);
});

test("cleanupUsageHistory rolls up and deletes old rows using the same day boundary", async () => {
  const db = core.getDbInstance();
  const oldTimestamp = "2024-01-01T12:00:00.000Z";
  const recentTimestamp = new Date().toISOString();

  databaseSettings.updateDatabaseSettings({
    retention: {
      ...databaseSettings.getUserDatabaseSettings().retention,
      usageHistory: 30,
    },
  });

  const insertUsage = db.prepare(
    `INSERT INTO usage_history (provider, model, timestamp, tokens_input, tokens_output, success, latency_ms)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  insertUsage.run("openai", "gpt-test", oldTimestamp, 100, 40, 1, 200);
  insertUsage.run("openai", "gpt-test", recentTimestamp, 7, 3, 1, 100);

  const result = await cleanup.cleanupUsageHistory();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 1);

  const remaining = db.prepare("SELECT COUNT(*) AS count FROM usage_history").get() as CountRow;
  assert.equal(remaining.count, 1);

  const daily = db.prepare("SELECT * FROM daily_usage_summary").get() as UsageSummaryRow;
  assert.equal(daily.total_requests, 1);
  assert.equal(daily.total_input_tokens, 100);
  assert.equal(daily.total_output_tokens, 40);
});

test("PATCH persists the dashboard conversation-nodes retention", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, conversationTurnNodes: 3 },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.conversationTurnNodes, 3);

  const db = core.getDbInstance();
  const stored = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = 'retention.conversationTurnNodes'"
    )
    .get() as { value: string } | undefined;
  assert.equal(JSON.parse(stored?.value ?? "null"), 3);

  const getResponse = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
  const getBody = await getResponse.json();

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.retention.conversationTurnNodes, 3);
});

test("PATCH without the five new keys leaves stored values unchanged", async () => {
  const before = databaseSettings.getUserDatabaseSettings().retention;
  const remembered = {
    configAudit: before.configAudit,
    conversationTurnNodes: before.conversationTurnNodes,
    domainCostHistory: before.domainCostHistory,
    compressionCacheStats: before.compressionCacheStats,
    compressionRunTelemetry: before.compressionRunTelemetry,
  };
  const {
    configAudit: _droppedConfigAudit,
    conversationTurnNodes: _droppedConversationTurnNodes,
    domainCostHistory: _droppedDomainCostHistory,
    compressionCacheStats: _droppedCompressionCacheStats,
    compressionRunTelemetry: _droppedCompressionRunTelemetry,
    ...eightKeys
  } = databaseSettings.getUserDatabaseSettings().retention;

  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", { retention: eightKeys }) as never
  );

  assert.equal(response.status, 200);

  const after = databaseSettings.getUserDatabaseSettings().retention;
  assert.equal(after.configAudit, remembered.configAudit);
  assert.equal(after.conversationTurnNodes, remembered.conversationTurnNodes);
  assert.equal(after.domainCostHistory, remembered.domainCostHistory);
  assert.equal(after.compressionCacheStats, remembered.compressionCacheStats);
  assert.equal(after.compressionRunTelemetry, remembered.compressionRunTelemetry);
});

test("every stored retention duration is accepted by the settings schema", () => {
  const storedKeys = Object.keys(DEFAULT_DATABASE_SETTINGS.retention).sort();
  const schemaKeys = Object.keys(databaseSettingsSchema.shape.retention.shape).sort();

  assert.deepEqual(schemaKeys, storedKeys);
});

test("out-of-range retention durations are rejected", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const before = current.retention.conversationTurnNodes;

  const tooLow = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, conversationTurnNodes: 0 },
    }) as never
  );
  assert.equal(tooLow.status, 400);

  const tooHigh = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, conversationTurnNodes: 3651 },
    }) as never
  );
  assert.equal(tooHigh.status, 400);

  const neighborTooHigh = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, configAudit: 366 },
    }) as never
  );
  assert.equal(neighborTooHigh.status, 400);

  assert.equal(databaseSettings.getUserDatabaseSettings().retention.conversationTurnNodes, before);
});
