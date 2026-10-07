import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";

const bigquery = await import("../../src/lib/logExport/destinations/bigquery.ts");
const googleAuth = await import("../../src/lib/logExport/googleServiceAccount.ts");

type BigQueryConfig = Parameters<typeof bigquery.createBigQueryClientForTest>[0];
type LogExportRecord = Parameters<
  ReturnType<typeof bigquery.createBigQueryClientForTest>["send"]
>[0][number];

const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: "test-project",
  client_email: "exporter@test-project.iam.gserviceaccount.com",
  private_key: privateKey,
  token_uri: "https://oauth2.googleapis.com/token",
};

const CONFIG: BigQueryConfig = {
  projectId: "test-project",
  datasetId: "omniroute_test",
  tableId: "call_logs",
  location: "EU",
  serviceAccountJson: JSON.stringify(SERVICE_ACCOUNT),
  autoCreate: true,
  partitionExpirationDays: 0,
};

const RECORD: LogExportRecord = {
  id: "log-1",
  timestamp: "2026-08-28T10:00:00.000Z",
  method: "POST",
  path: "/v1/chat/completions",
  status: 200,
  model: "claude-opus-5",
  requestedModel: "anthropic/claude-opus-5",
  provider: "anthropic",
  providerDisplay: "Anthropic",
  account: "team@example.com",
  connectionId: "conn-1",
  duration: 1234,
  tokensIn: 100,
  tokensOut: 200,
  tokensCacheRead: 10,
  tokensCacheWrite: 5,
  tokensReasoning: 7,
  tokensCompressed: 3,
  cacheSource: "upstream",
  requestType: "chat",
  sourceFormat: "openai",
  targetFormat: "anthropic",
  apiKeyId: "key-1",
  apiKeyName: "primary",
  comboName: "combo-a",
  comboStepId: "step-1",
  comboExecutionKey: "exec-1",
  errorSummary: null,
  errorType: null,
  correlationId: "corr-1",
  sessionTag: "session-1",
  modelPinned: true,
  detailState: "artifact",
  hasRequestBody: true,
  hasResponseBody: true,
  hasPipelineDetails: false,
  requestBody: null,
  responseBody: null,
  pipelineRouteDecision: null,
  pipelineClientRequest: null,
  pipelineOpenaiRequest: null,
  pipelineProviderRequest: null,
  pipelineProviderResponse: null,
  pipelineClientResponse: null,
  pipelineError: null,
  bodiesTruncated: false,
};

interface InsertRow {
  insertId: string;
  json: Record<string, unknown>;
}

interface RequestBody {
  rows?: InsertRow[];
  skipInvalidRows?: boolean;
  location?: string;
  timePartitioning?: { type: string; field: string; expirationMs?: string };
  clustering?: { fields: string[] };
  schema?: { fields: Array<{ name: string }> };
}

interface Call {
  url: string;
  method: string;
  body: RequestBody;
}

type StubHandler = (call: Call) => { status: number; json: unknown } | null;

function jsonResponse(status: number, json: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => json,
  } as unknown as Response;
}

function safeJson(raw: string): RequestBody {
  try {
    return JSON.parse(raw) as RequestBody;
  } catch {
    return {};
  }
}

function stubFetch(handlers: StubHandler[]) {
  const calls: Call[] = [];
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    const call: Call = {
      url: String(url),
      method: init?.method ?? "GET",
      body: typeof init?.body === "string" ? safeJson(init.body) : {},
    };
    calls.push(call);
    if (call.url.includes("oauth2.googleapis.com/token")) {
      return jsonResponse(200, { access_token: `token-${calls.length}`, expires_in: 3600 });
    }
    for (const handler of handlers) {
      const result = handler(call);
      if (result) return jsonResponse(result.status, result.json);
    }
    return jsonResponse(404, { error: { message: "Not found" } });
  }) as unknown as typeof fetch;
  return { fetchImpl, calls };
}

test.beforeEach(() => {
  googleAuth.__resetServiceAccountTokenCache();
});

test("toBigQueryRow_EveryDashboardField_HasAColumn", () => {
  const row = bigquery.toBigQueryRow(RECORD, "2026-08-28T11:00:00.000Z");
  const schemaNames = bigquery.BIGQUERY_TABLE_SCHEMA.fields.map((field) => field.name);

  // Every column in the table schema is produced by the mapper, and nothing extra.
  assert.deepEqual([...Object.keys(row)].sort(), [...schemaNames].sort());

  // One record field per column (plus exported_at), so a new dashboard column cannot
  // be silently dropped on the way out.
  assert.equal(Object.keys(RECORD).length + 1, schemaNames.length);

  assert.equal(row.id, "log-1");
  assert.equal(row.requested_model, "anthropic/claude-opus-5");
  assert.equal(row.duration_ms, 1234);
  assert.equal(row.tokens_cache_write, 5);
  assert.equal(row.model_pinned, true);
  assert.equal(row.exported_at, "2026-08-28T11:00:00.000Z");
});

test("send_Batch_PostsInsertAllWithPerRowInsertIdForDeduplication", async () => {
  const { fetchImpl, calls } = stubFetch([
    (call) => (call.url.endsWith("/insertAll") ? { status: 200, json: {} } : null),
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.send([RECORD, { ...RECORD, id: "log-2" }]);

  const insert = calls.find((call) => call.url.endsWith("/insertAll"));
  assert.ok(insert, "insertAll must be called");
  assert.equal(insert.method, "POST");
  assert.equal(insert.body.skipInvalidRows, false);
  assert.deepEqual(
    (insert.body.rows ?? []).map((row) => row.insertId),
    ["log-1", "log-2"]
  );
  assert.equal((insert.body.rows ?? [])[0].json.id, "log-1");
});

test("send_EmptyBatch_MakesNoHttpCall", async () => {
  const { fetchImpl, calls } = stubFetch([]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);
  await client.send([]);
  assert.equal(calls.length, 0);
});

test("send_InsertErrorsInResponse_ThrowsSoTheCursorDoesNotAdvance", async () => {
  const { fetchImpl } = stubFetch([
    (call) =>
      call.url.endsWith("/insertAll")
        ? {
            status: 200,
            json: { insertErrors: [{ index: 0, errors: [{ message: "no such field: bogus" }] }] },
          }
        : null,
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await assert.rejects(() => client.send([RECORD]), /no such field/);
});

test("send_HttpFailure_ThrowsWithTheBigQueryMessage", async () => {
  const { fetchImpl } = stubFetch([
    (call) =>
      call.url.endsWith("/insertAll")
        ? {
            status: 403,
            json: { error: { message: "Permission bigquery.tables.updateData denied" } },
          }
        : null,
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await assert.rejects(() => client.send([RECORD]), /Permission bigquery/);
});

test("prepare_MissingDatasetAndTable_CreatesBothWithPartitioning", async () => {
  const created: Call[] = [];
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.method === "POST" && /\/datasets$/.test(call.url)) {
        created.push(call);
        return { status: 200, json: {} };
      }
      if (call.method === "POST" && /\/tables$/.test(call.url)) {
        created.push(call);
        return { status: 200, json: {} };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.prepare();

  assert.equal(created.length, 2);
  assert.equal(created[0].body.location, "EU");
  assert.equal(created[1].body.timePartitioning?.field, "timestamp");
  assert.equal(created[1].body.timePartitioning?.type, "DAY");
  assert.equal(created[1].body.schema?.fields.length, bigquery.BIGQUERY_TABLE_SCHEMA.fields.length);
  assert.deepEqual(created[1].body.clustering?.fields, [
    "api_key_name",
    "provider",
    "model",
    "status",
  ]);
  // No retention configured, so partitions must not carry an expiry.
  assert.equal(created[1].body.timePartitioning?.expirationMs, undefined);
});

test("prepare_ExistingTable_CreatesNothing", async () => {
  const { fetchImpl, calls } = stubFetch([
    (call) => (call.method === "GET" ? { status: 200, json: {} } : null),
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.prepare();

  const writes = calls.filter((call) => call.method === "POST" && !call.url.includes("oauth2"));
  assert.equal(writes.length, 0);
});

test("prepare_AutoCreateDisabledAndTableMissing_Throws", async () => {
  const { fetchImpl } = stubFetch([]);
  const client = bigquery.createBigQueryClientForTest({ ...CONFIG, autoCreate: false }, fetchImpl);

  await assert.rejects(() => client.prepare(), /auto-create is off/);
});

test("test_ReachableTable_ReportsOkWithoutWritingRows", async () => {
  const { fetchImpl, calls } = stubFetch([
    (call) => (call.method === "GET" ? { status: 200, json: {} } : null),
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  const result = await client.test();

  assert.equal(result.ok, true);
  assert.match(result.detail, /exporter@test-project/);
  assert.equal(
    calls.some((call) => call.url.endsWith("/insertAll")),
    false
  );
});

test("test_PermissionDenied_ReportsTheUpstreamReason", async () => {
  const { fetchImpl } = stubFetch([
    (call) =>
      call.method === "GET"
        ? { status: 403, json: { error: { message: "caller does not have permission" } } }
        : null,
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  const result = await client.test();

  assert.equal(result.ok, false);
  assert.match(result.detail, /does not have permission/);
});

test("parseServiceAccountKey_MalformedJson_ThrowsOperatorFacingMessage", () => {
  assert.throws(() => googleAuth.parseServiceAccountKey("not json"), /not valid JSON/);
  assert.throws(() => googleAuth.parseServiceAccountKey('{"type":"user"}'), /service_account/);
  assert.throws(
    () => googleAuth.parseServiceAccountKey('{"type":"service_account"}'),
    /client_email/
  );
});

test("getServiceAccountAccessToken_SecondCall_ReusesTheCachedToken", async () => {
  let tokenCalls = 0;
  const fetchImpl = (async () => {
    tokenCalls += 1;
    return jsonResponse(200, { access_token: "cached-token", expires_in: 3600 });
  }) as unknown as typeof fetch;

  const key = googleAuth.parseServiceAccountKey(JSON.stringify(SERVICE_ACCOUNT));
  const first = await googleAuth.getServiceAccountAccessToken(key, "scope-a", fetchImpl);
  const second = await googleAuth.getServiceAccountAccessToken(key, "scope-a", fetchImpl);

  assert.equal(first, "cached-token");
  assert.equal(second, "cached-token");
  assert.equal(tokenCalls, 1);
});

test("send_LargeBatch_ChunksTo500RowsPerInsertAllRequest", async () => {
  const { fetchImpl, calls } = stubFetch([
    (call) => (call.url.endsWith("/insertAll") ? { status: 200, json: {} } : null),
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  const records = Array.from({ length: 1200 }, (_, i) => ({ ...RECORD, id: `log-${i}` }));
  await client.send(records);

  const inserts = calls.filter((call) => call.url.endsWith("/insertAll"));
  assert.deepEqual(
    inserts.map((call) => (call.body.rows ?? []).length),
    [500, 500, 200],
    "insertAll must stay within BigQuery's per-request row recommendation"
  );
});

test("send_TransientServerError_RetriesTheSameChunkWithTheSameInsertIds", async () => {
  let attempts = 0;
  const { fetchImpl, calls } = stubFetch([
    (call) => {
      if (!call.url.endsWith("/insertAll")) return null;
      attempts += 1;
      return attempts === 1
        ? { status: 503, json: { error: { message: "backendError" } } }
        : { status: 200, json: {} };
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.send([RECORD]);

  const inserts = calls.filter((call) => call.url.endsWith("/insertAll"));
  assert.equal(inserts.length, 2, "a 503 is retried once");
  assert.deepEqual(
    inserts.map((call) => (call.body.rows ?? [])[0].insertId),
    ["log-1", "log-1"],
    "the retry reuses the call-log id so BigQuery de-duplicates it"
  );
});

test("send_PermanentAuthFailure_DoesNotRetry", async () => {
  const { fetchImpl, calls } = stubFetch([
    (call) =>
      call.url.endsWith("/insertAll")
        ? { status: 403, json: { error: { message: "caller lacks bigquery.tables.updateData" } } }
        : null,
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await assert.rejects(() => client.send([RECORD]), /updateData/);
  assert.equal(
    calls.filter((call) => call.url.endsWith("/insertAll")).length,
    1,
    "a 403 is terminal — retrying it just burns the run"
  );
});

test("send_FreshlyCreatedTableStillPropagating_RetriesThe404", async () => {
  let inserts = 0;
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.method === "GET") return { status: 404, json: { error: { message: "Not found" } } };
      if (call.method === "POST" && /\/(datasets|tables)$/.test(call.url)) {
        return { status: 200, json: {} };
      }
      if (call.url.endsWith("/insertAll")) {
        inserts += 1;
        // BigQuery answers 404 on the streaming endpoint until the new table propagates.
        return inserts === 1
          ? { status: 404, json: { error: { message: "Table 123:ds.tbl not found." } } }
          : { status: 200, json: {} };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.prepare();
  await client.send([RECORD]);

  assert.equal(inserts, 2, "the 404 on a just-created table is retried, not surfaced");
});

test("send_MissingTableNotCreatedByThisRun_FailsFastOn404", async () => {
  let inserts = 0;
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.url.endsWith("/insertAll")) {
        inserts += 1;
        return { status: 404, json: { error: { message: "Table 123:ds.tbl not found." } } };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await assert.rejects(() => client.send([RECORD]), /not found/);
  assert.equal(inserts, 1, "a table this run did not create is a real error, not a race");
});

test("prepare_RetentionConfigured_SetsPartitionExpiry", async () => {
  const created: Call[] = [];
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.method === "POST" && /\/(datasets|tables)$/.test(call.url)) {
        created.push(call);
        return { status: 200, json: {} };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(
    { ...CONFIG, partitionExpirationDays: 30 },
    fetchImpl
  );

  await client.prepare();

  const table = created.find((call) => /\/tables$/.test(call.url));
  assert.ok(table, "table must be created");
  // 30 days in milliseconds, as a string — BigQuery rejects a number here.
  assert.equal(table.body.timePartitioning?.expirationMs, String(30 * 86_400_000));
});

test("send_PayloadsExceedingTheRequestCap_SplitIntoMultipleInsertAllCalls", async () => {
  const inserts: Call[] = [];
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.url.endsWith("/insertAll")) {
        inserts.push(call);
        return { status: 200, json: {} };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  // Four rows of ~3 MB each: under the 500-row chunk limit, well over the 9 MB
  // byte budget, so chunking must close on bytes rather than count.
  const big = "x".repeat(3 * 1024 * 1024);
  const records = [1, 2, 3, 4].map((n) => ({
    ...RECORD,
    id: `big-${n}`,
    requestBody: big,
  }));

  await client.send(records);

  assert.ok(inserts.length >= 2, `expected several calls, got ${inserts.length}`);
  for (const insert of inserts) {
    const bytes = Buffer.byteLength(JSON.stringify(insert.body), "utf8");
    assert.ok(bytes < 10 * 1024 * 1024, `chunk of ${bytes} bytes exceeds the insertAll cap`);
  }
  // Every row still ships exactly once.
  const ids = inserts.flatMap((insert) => (insert.body.rows ?? []).map((row) => row.insertId));
  assert.deepEqual(ids, ["big-1", "big-2", "big-3", "big-4"]);
});

test("send_SingleRowOverTheByteBudget_StillShipsRatherThanStallingTheCursor", async () => {
  const inserts: Call[] = [];
  const { fetchImpl } = stubFetch([
    (call) => {
      if (call.url.endsWith("/insertAll")) {
        inserts.push(call);
        return { status: 200, json: {} };
      }
      return null;
    },
  ]);
  const client = bigquery.createBigQueryClientForTest(CONFIG, fetchImpl);

  await client.send([{ ...RECORD, id: "huge", requestBody: "y".repeat(12 * 1024 * 1024) }]);

  assert.equal(inserts.length, 1);
  assert.deepEqual(
    (inserts[0].body.rows ?? []).map((row) => row.insertId),
    ["huge"]
  );
});

test("toBigQueryRow_PayloadFields_MapOntoTheirColumns", () => {
  const row = bigquery.toBigQueryRow(
    {
      ...RECORD,
      requestBody: '{"messages":[{"role":"user","content":"hi"}]}',
      pipelineProviderRequest: '{"upstream":true}',
      pipelineClientResponse: '{"choices":[]}',
      bodiesTruncated: true,
    },
    "2026-08-29T00:00:00.000Z"
  );

  assert.equal(row.request_body, '{"messages":[{"role":"user","content":"hi"}]}');
  assert.equal(row.pipeline_provider_request, '{"upstream":true}');
  assert.equal(row.pipeline_client_response, '{"choices":[]}');
  assert.equal(row.bodies_truncated, true);
  // A destination that never opted in leaves them null rather than empty strings.
  assert.equal(bigquery.toBigQueryRow(RECORD, "2026-08-29T00:00:00.000Z").request_body, null);
});
