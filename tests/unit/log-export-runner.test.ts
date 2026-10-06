import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { generateKeyPairSync } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-log-export-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "log-export-runner-test-key";

const coreDb = await import("../../src/lib/db/core.ts");
const destinationsDb = await import("../../src/lib/db/logExportDestinations.ts");
const source = await import("../../src/lib/usage/callLogExportSource.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");
const secrets = await import("../../src/lib/logExport/secrets.ts");
const runner = await import("../../src/lib/logExport/runner.ts");
const googleAuth = await import("../../src/lib/logExport/googleServiceAccount.ts");

const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const SERVICE_ACCOUNT_JSON = JSON.stringify({
  type: "service_account",
  project_id: "test-project",
  client_email: "exporter@test-project.iam.gserviceaccount.com",
  private_key: privateKey,
  token_uri: "https://oauth2.googleapis.com/token",
});

const originalFetch = globalThis.fetch;

interface InsertRow {
  insertId: string;
  json: Record<string, unknown>;
}

interface InsertedBatch {
  rows: InsertRow[];
}

function installFetchStub(options: { failInsert?: boolean; insertDelayMs?: number } = {}) {
  const batches: InsertedBatch[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const href = String(url);
    const body = typeof init?.body === "string" ? init.body : "";
    if (href.includes("oauth2.googleapis.com/token")) {
      return jsonResponse(200, { access_token: "stub-token", expires_in: 3600 });
    }
    if (href.endsWith("/insertAll")) {
      if (options.failInsert) {
        return jsonResponse(500, { error: { message: "backend error" } });
      }
      if (options.insertDelayMs) {
        await new Promise((resolve) => setTimeout(resolve, options.insertDelayMs));
      }
      batches.push({ rows: (JSON.parse(body) as { rows: InsertRow[] }).rows });
      return jsonResponse(200, {});
    }
    // Dataset and table both already exist, so prepare() is a no-op.
    return jsonResponse(200, {});
  }) as unknown as typeof fetch;
  return batches;
}

function jsonResponse(status: number, json: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => json,
  } as unknown as Response;
}

function insertCallLogs(count: number, startIndex = 0) {
  const db = coreDb.getDbInstance();
  const statement = db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
                            tokens_in, tokens_out)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'claude-opus-5', 'anthropic', 100, 10, 20)`
  );
  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    statement.run(`log-${index}`, new Date(Date.UTC(2026, 7, 28, 10, 0, index)).toISOString());
  }
}

function createBigQueryDestination(overrides: Record<string, unknown> = {}) {
  return destinationsDb.createLogExportDestination({
    name: "Test BigQuery",
    type: "bigquery",
    enabled: true,
    batchSize: 2,
    maxRowsPerRun: 1000,
    config: secrets.encryptDestinationConfig("bigquery", {
      projectId: "test-project",
      datasetId: "omniroute_test",
      tableId: "call_logs",
      location: "EU",
      serviceAccountJson: SERVICE_ACCOUNT_JSON,
      autoCreate: true,
    }),
    ...overrides,
  });
}

test.beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  googleAuth.__resetServiceAccountTokenCache();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("runDestinationExport_PendingLogs_ShipsThemInBatchesAndAdvancesTheCursor", async () => {
  insertCallLogs(5);
  const destination = createBigQueryDestination();
  const batches = installFetchStub();

  const result = await runner.runDestinationExport(destination);

  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 5);
  assert.equal(result.batches, 3, "batchSize 2 over 5 rows means 3 requests");
  assert.deepEqual(
    batches.map((batch) => batch.rows.length),
    [2, 2, 1]
  );
  assert.equal(result.pendingAfterRun, 0);

  const stored = destinationsDb.getLogExportDestination(destination.id);
  assert.equal(stored?.exportedTotal, 5);
  assert.equal(stored?.cursorRowId, source.getMaxCallLogRowId());
  assert.equal(stored?.lastStatus, "success");
});

test("runDestinationExport_SecondRun_ExportsOnlyTheNewRows", async () => {
  insertCallLogs(3);
  const destination = createBigQueryDestination();
  installFetchStub();
  await runner.runDestinationExport(destination);

  insertCallLogs(2, 100);
  const batches = installFetchStub();
  const second = await runner.runDestinationExport(
    destinationsDb.getLogExportDestination(destination.id)!
  );

  assert.equal(second.exported, 2);
  const shippedIds = batches.flatMap((batch) => batch.rows.map((row) => row.insertId));
  assert.deepEqual(shippedIds, ["log-100", "log-101"]);
});

test("runDestinationExport_NoPendingRows_SendsNothingAndStaysSuccessful", async () => {
  const destination = createBigQueryDestination();
  const batches = installFetchStub();

  const result = await runner.runDestinationExport(destination);

  assert.equal(result.success, true);
  assert.equal(result.exported, 0);
  assert.equal(batches.length, 0);
});

test("runDestinationExport_DestinationRejectsBatch_KeepsCursorSoRowsAreRetried", async () => {
  insertCallLogs(4);
  const destination = createBigQueryDestination();
  installFetchStub({ failInsert: true });

  const failed = await runner.runDestinationExport(destination);

  assert.equal(failed.success, false);
  assert.match(failed.error ?? "", /backend error/);
  const afterFailure = destinationsDb.getLogExportDestination(destination.id);
  assert.equal(afterFailure?.cursorRowId, 0, "cursor must not move past an unaccepted batch");
  assert.equal(afterFailure?.lastStatus, "failure");

  const batches = installFetchStub();
  const retried = await runner.runDestinationExport(afterFailure!);

  assert.equal(retried.success, true);
  assert.equal(retried.exported, 4, "every row from the failed run is retried");
  assert.equal(batches.flatMap((batch) => batch.rows).length, 4);
});

test("runDestinationExport_MaxRowsPerRun_StopsEarlyAndReportsTheBacklog", async () => {
  insertCallLogs(10);
  const destination = createBigQueryDestination({ batchSize: 2, maxRowsPerRun: 4 });
  installFetchStub();

  const result = await runner.runDestinationExport(destination);

  assert.equal(result.exported, 4);
  assert.equal(result.pendingAfterRun, 6);
});

test("runDestinationExport_CallLogsPurgedBelowCursor_RewindsInsteadOfSkippingForever", async () => {
  insertCallLogs(3);
  const destination = createBigQueryDestination();
  installFetchStub();
  await runner.runDestinationExport(destination);

  // Simulate a purge: rowids restart, so the stored cursor now sits above max(rowid).
  coreDb.getDbInstance().prepare("DELETE FROM call_logs").run();
  insertCallLogs(2, 200);

  const batches = installFetchStub();
  const result = await runner.runDestinationExport(
    destinationsDb.getLogExportDestination(destination.id)!
  );

  assert.equal(result.exported, 2);
  assert.deepEqual(
    batches.flatMap((batch) => batch.rows.map((row) => row.insertId)),
    ["log-200", "log-201"]
  );
});

test("runAllLogExports_DisabledDestination_IsSkipped", async () => {
  insertCallLogs(2);
  createBigQueryDestination({ enabled: false });
  const batches = installFetchStub();

  const summary = await runner.runAllLogExports();

  assert.equal(summary.destinations.length, 0);
  assert.equal(summary.exported, 0);
  assert.equal(batches.length, 0);
});

test("runAllLogExports_EnabledDestination_ExportsAndSummarises", async () => {
  insertCallLogs(3);
  createBigQueryDestination();
  installFetchStub();

  const summary = await runner.runAllLogExports();

  assert.equal(summary.destinations.length, 1);
  assert.equal(summary.exported, 3);
  assert.equal(summary.failures, 0);
});

test("createClientForDestination_UnknownType_ThrowsInsteadOfSilentlySkipping", () => {
  const destination = destinationsDb.createLogExportDestination({
    name: "Ghost",
    type: "datadog",
    enabled: true,
    config: {},
  });

  assert.throws(() => runner.createClientForDestination(destination), /Unknown log export/);
});

test("getCallLogsForExport_ProjectedRecord_CarriesTheDashboardFields", () => {
  insertCallLogs(1);
  const rows = source.getCallLogsForExport(0, 10);

  assert.equal(rows.length, 1);
  assert.ok(rows[0].rowId > 0);
  assert.equal(rows[0].record.id, "log-0");
  assert.equal(rows[0].record.model, "claude-opus-5");
  assert.equal(rows[0].record.provider, "anthropic");
  assert.equal(rows[0].record.tokensIn, 10);
  assert.equal(rows[0].record.tokensOut, 20);
  assert.equal(rows[0].record.path, "/v1/chat/completions");
});

test("runDestinationExport_ConcurrentRun_IsSkippedInsteadOfRewindingTheCursor", async () => {
  insertCallLogs(6);
  const destination = createBigQueryDestination();
  const batches = installFetchStub({ insertDelayMs: 30 });

  const [first, second] = await Promise.all([
    runner.runDestinationExport(destination),
    runner.runDestinationExport(destination),
  ]);

  const [drained, skipped] = first.skipped ? [second, first] : [first, second];
  assert.equal(skipped.skipped, true, "the second concurrent drain must be skipped");
  assert.equal(skipped.exported, 0);
  assert.equal(drained.skipped, false);
  assert.equal(drained.exported, 6);
  assert.equal(batches.flatMap((batch) => batch.rows).length, 6, "no row is sent twice");

  const stored = destinationsDb.getLogExportDestination(destination.id);
  assert.equal(stored?.exportedTotal, 6);
});

test("migration170_DatabaseThatPredatesTheFeature_GainsTheTableOnUpgrade", () => {
  // Simulate an install created before migration 170 shipped: drop the table and its
  // ledger row, then reopen. The upgrade path must recreate it, not leave the exporter
  // querying a table that does not exist.
  const db = coreDb.getDbInstance();
  db.prepare("DROP TABLE IF EXISTS log_export_destinations").run();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '170'").run();
  assert.equal(tableExists("log_export_destinations"), false, "precondition: table removed");

  coreDb.resetDbInstance();
  coreDb.getDbInstance();

  assert.equal(tableExists("log_export_destinations"), true);
  assert.deepEqual(destinationsDb.getLogExportDestinations(), []);
});

function tableExists(name: string): boolean {
  const row = coreDb
    .getDbInstance()
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(name);
  return row !== undefined && row !== null;
}

// ---------------------------------------------------------------- payload export

/**
 * Write a call log that carries payloads, the way a real request does: the summary row
 * points at an on-disk artifact holding the request/response bodies and the pipeline's
 * client and provider views.
 */
function insertCallLogWithBodies(
  id: string,
  bodies: {
    requestBody?: unknown;
    responseBody?: unknown;
    pipeline?: Record<string, unknown>;
  }
) {
  const db = coreDb.getDbInstance();
  const timestamp = new Date(Date.UTC(2026, 7, 29, 12, 0, 0)).toISOString();
  const relPath = artifacts.buildArtifactRelativePath(timestamp, id);

  artifacts.writeCallArtifact(
    {
      schemaVersion: 5,
      summary: {
        id,
        timestamp,
        method: "POST",
        path: "/v1/chat/completions",
        status: 200,
        model: "claude-opus-5",
        requestedModel: "anthropic/claude-opus-5",
        provider: "anthropic",
        account: "team@example.com",
        connectionId: null,
        duration: 100,
        tokens: {
          in: 10,
          out: 20,
          cacheRead: null,
          cacheWrite: null,
          reasoning: null,
          compressed: null,
        },
        requestType: "chat",
        sourceFormat: "openai",
        targetFormat: "anthropic",
        apiKeyId: null,
        apiKeyName: null,
        comboName: null,
        comboStepId: null,
        comboExecutionKey: null,
      },
      requestBody: bodies.requestBody ?? null,
      responseBody: bodies.responseBody ?? null,
      error: null,
      ...(bodies.pipeline ? { pipeline: bodies.pipeline } : {}),
    },
    relPath
  );

  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
                            tokens_in, tokens_out, artifact_relpath, detail_state,
                            has_request_body, has_response_body, has_pipeline_details)
     VALUES (?, ?, 'POST', '/v1/chat/completions', 200, 'claude-opus-5', 'anthropic', 100, 10, 20,
             ?, 'ready', 1, 1, ?)`
  ).run(id, timestamp, relPath, bodies.pipeline ? 1 : 0);
}

test("runDestinationExport_IncludeBodiesOff_ShipsNoPayloadsAtAll", async () => {
  insertCallLogWithBodies("with-bodies", {
    requestBody: { messages: [{ role: "user", content: "secret prompt" }] },
    responseBody: { choices: [{ message: { content: "secret answer" } }] },
  });
  const destination = createBigQueryDestination();
  const batches = installFetchStub();

  await runner.runDestinationExport(destination);

  const row = batches[0].rows[0].json;
  assert.equal(row.request_body, null);
  assert.equal(row.response_body, null);
  assert.equal(row.bodies_truncated, false);
  // The summary flags still report that payloads exist, they are just not shipped.
  assert.equal(row.has_request_body, true);
  const wire = JSON.stringify(batches);
  assert.ok(!wire.includes("secret prompt"), "prompt must not leave when includeBodies is off");
  assert.ok(!wire.includes("secret answer"), "completion must not leave when includeBodies is off");
});

test("runDestinationExport_IncludeBodiesOn_ShipsClientAndProviderPayloads", async () => {
  insertCallLogWithBodies("full-detail", {
    requestBody: { messages: [{ role: "user", content: "what is 2+2" }] },
    responseBody: { choices: [{ message: { content: "4" } }] },
    pipeline: {
      routeDecision: { target: "anthropic/claude-opus-5" },
      clientRawRequest: { model: "opus", messages: [{ role: "user", content: "what is 2+2" }] },
      openaiRequest: { model: "claude-opus-5" },
      providerRequest: { anthropic_version: "2023-06-01" },
      providerResponse: { content: [{ text: "4" }] },
      clientResponse: { choices: [{ message: { content: "4" } }] },
    },
  });
  const destination = createBigQueryDestination({ includeBodies: true });
  const batches = installFetchStub();

  await runner.runDestinationExport(destination);

  const row = batches[0].rows[0].json as Record<string, string | null>;
  assert.match(String(row.request_body), /what is 2\+2/);
  assert.match(String(row.response_body), /"4"/);
  assert.match(String(row.pipeline_route_decision), /claude-opus-5/);
  assert.match(String(row.pipeline_client_request), /what is 2\+2/);
  assert.match(String(row.pipeline_openai_request), /claude-opus-5/);
  assert.match(String(row.pipeline_provider_request), /anthropic_version/);
  assert.match(String(row.pipeline_provider_response), /"4"/);
  assert.match(String(row.pipeline_client_response), /"4"/);
  assert.equal(row.bodies_truncated, false);
});

test("runDestinationExport_PayloadOverTheCap_TruncatesAndFlagsInsteadOfDropping", async () => {
  insertCallLogWithBodies("oversized", {
    requestBody: { messages: [{ role: "user", content: "z".repeat(20_000) }] },
  });
  const destination = createBigQueryDestination({ includeBodies: true, maxBodyBytes: 2048 });
  const batches = installFetchStub();

  await runner.runDestinationExport(destination);

  const row = batches[0].rows[0].json as Record<string, string | boolean | null>;
  const body = String(row.request_body);
  assert.ok(body.length < 20_000, "payload must be clipped");
  assert.ok(body.endsWith("…[truncated]"), `expected a truncation marker, got ${body.slice(-40)}`);
  assert.equal(row.bodies_truncated, true);
});

test("runDestinationExport_MissingArtifact_ExportsSummaryRatherThanFailingTheBatch", async () => {
  // A row that claims an artifact which is not on disk: retention or a manual purge.
  const db = coreDb.getDbInstance();
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
                            tokens_in, tokens_out, artifact_relpath, detail_state, has_request_body)
     VALUES ('orphan', ?, 'POST', '/v1/chat/completions', 200, 'claude-opus-5', 'anthropic', 100,
             10, 20, '2026/08/29/orphan.json', 'ready', 1)`
  ).run(new Date(Date.UTC(2026, 7, 29, 13, 0, 0)).toISOString());

  const destination = createBigQueryDestination({ includeBodies: true });
  const batches = installFetchStub();

  const result = await runner.runDestinationExport(destination);

  assert.equal(result.success, true, result.error ?? "");
  assert.equal(result.exported, 1);
  const row = batches[0].rows[0].json;
  assert.equal(row.id, "orphan");
  assert.equal(row.request_body, null);
});
