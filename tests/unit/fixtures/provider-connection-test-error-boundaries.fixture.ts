import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-errors-"));
const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const originalApiKeySecret = process.env.API_KEY_SECRET;
const originalDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
const originalDisableHealthCheck = process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK;
const pluginsDir = path.join(testRoot, "plugins");
const testDataDir = path.join(testRoot, "data");
fs.mkdirSync(pluginsDir, { recursive: true });
fs.mkdirSync(testDataDir, { recursive: true });
process.env.OMNIROUTE_PLUGINS_DIR = pluginsDir;
process.env.DATA_DIR = testDataDir;
assert.notEqual(fs.realpathSync(testDataDir), "/home/diegosouzapw/.omniroute");
assert.notEqual(fs.realpathSync(pluginsDir), "/home/diegosouzapw/.omniroute/plugins");

process.env.API_KEY_SECRET = "provider-error-boundary-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

// Connection tests suppress their call-log entry under node --test. This file
// exercises the real persistent boundary, so present a normal runtime identity
// before importing the route and its logging modules.
const originalArgv = process.argv;
const originalExecArgv = process.execArgv;
const originalNodeEnv = process.env.NODE_ENV;
const originalVitest = process.env.VITEST;
process.argv = [
  process.execPath,
  path.join(process.cwd(), "scripts/ad-hoc/omniroute-boundary-harness.mjs"),
];
process.execArgv = [];
process.env.NODE_ENV = "development";
delete process.env.VITEST;

const hostileValidationMessage =
  "Jules failed access_token=jules-boundary-secret at /srv/private/validator.ts\n" +
  "    at probe (/srv/private/validator.ts:42:7)";
const julesValidationUrl = "https://jules.googleapis.com/v1alpha/sources";
const originalFetch = globalThis.fetch;
let validationFetchCalls = 0;
const boundaryFetch = (async (input: string | URL | Request) => {
  const url =
    typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  assert.equal(url, julesValidationUrl, `unexpected outbound request: ${url}`);
  validationFetchCalls += 1;
  return new Response(hostileValidationMessage, { status: 500 });
}) as typeof fetch;
globalThis.fetch = boundaryFetch;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const { saveCallLog, waitForCallLogSaves, closeCallLogSaves } =
  await import("../../../src/lib/usage/callLogs.ts");
const { flushProxyLogsSync } = await import("../../../src/lib/proxyLogger.ts");
const { projectProviderRuntimeForPublicResponse, testSingleConnection } =
  await import("../../../src/app/api/providers/[id]/test/route.ts");
// proxyFetch installs its global dispatcher while the imports above load. Put
// the deterministic stub back at the final fetch seam so this test can never
// reach Jules over the network.
globalThis.fetch = boundaryFetch;

type ArtifactRow = { artifact_relpath: string | null; error_summary: string | null };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function readArtifact(relativePath: string | null): Record<string, unknown> {
  assert.ok(relativePath, "call log must have a persisted detail artifact");
  const absolutePath = path.join(testDataDir, "call_logs", relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8")) as Record<string, unknown>;
}

test.after(async () => {
  await closeCallLogSaves(2_000);
  flushProxyLogsSync();
  globalThis.fetch = originalFetch;
  process.argv = originalArgv;
  process.execArgv = originalExecArgv;
  if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalNodeEnv;
  if (originalVitest === undefined) delete process.env.VITEST;
  else process.env.VITEST = originalVitest;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;
  core.resetDbInstance();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = originalApiKeySecret;
  if (originalDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  else process.env.DISABLE_SQLITE_AUTO_BACKUP = originalDisableBackup;
  if (originalDisableHealthCheck === undefined) {
    delete process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK;
  } else {
    process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = originalDisableHealthCheck;
  }
  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("public runtime projection omits host paths and internal error envelopes", () => {
  const projected = projectProviderRuntimeForPublicResponse({
    installed: true,
    runnable: false,
    requiresBinary: true,
    reason: "not_executable",
    runtimeMode: "local",
    version: "v1 from /srv/private/bin/tool",
    command: "/srv/private/bin/tool",
    commandPath: "/srv/private/bin/tool",
    settingsPath: "C:\\Users\\admin\\.config\\tool.json",
    error: "access_token=runtime-secret at /srv/private/runtime.json",
    diagnosis: { message: "runtime-secret at /srv/private/runtime.ts" },
  });
  const serialized = JSON.stringify(projected);

  assert.equal(projected?.installed, true);
  assert.equal(projected?.runnable, false);
  assert.equal("commandPath" in (projected || {}), false);
  assert.equal("settingsPath" in (projected || {}), false);
  assert.equal("error" in (projected || {}), false);
  assert.equal("diagnosis" in (projected || {}), false);
  assert.doesNotMatch(serialized, /runtime-secret|srv\/private|C:\\\\Users/i);
});

test("connection validation projects hostile errors before public and persistent boundaries", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "jules",
    authType: "apikey",
    name: "Jules Error Boundary",
    apiKey: "jules-test-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(connection?.id);

  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, false);
  assert.ok(validationFetchCalls > 0, "the deterministic Jules stub must handle the probe");
  assert.match(String(result.error), /Jules failed/i);
  assert.equal(await waitForCallLogSaves(10_000), true, "call-log write must drain");
  flushProxyLogsSync();

  const db = core.getDbInstance();
  const providerRow = db
    .prepare("SELECT last_error FROM provider_connections WHERE id = ?")
    .get(connection.id) as { last_error: string | null };
  const callLogRow = db
    .prepare(
      `SELECT error_summary, artifact_relpath
       FROM call_logs
       WHERE connection_id = ? AND model = 'connection-test'
       ORDER BY rowid DESC LIMIT 1`
    )
    .get(connection.id) as ArtifactRow;
  const proxyLogRow = db
    .prepare(
      `SELECT error
       FROM proxy_logs
       WHERE connection_id = ? AND provider = 'jules'
         AND target_url = 'jules/connection-test'
       ORDER BY rowid DESC LIMIT 1`
    )
    .get(connection.id) as { error: string | null };
  assert.ok(callLogRow, "connection test must write call_logs");
  assert.ok(proxyLogRow, "connection test must write proxy_logs");
  const artifact = readArtifact(callLogRow.artifact_relpath);

  const boundaries = {
    publicResult: result,
    providerLastError: providerRow.last_error,
    callLogSummary: callLogRow.error_summary,
    callLogArtifactError: artifact.error,
    proxyLogError: proxyLogRow.error,
  };
  const leakPattern = /jules-boundary-secret|srv\/private|validator\.ts|\bat probe\b/i;
  const leakingBoundaries = Object.entries(boundaries)
    .filter(([, value]) => leakPattern.test(JSON.stringify(value)))
    .map(([name]) => name);
  assert.deepEqual(leakingBoundaries, []);
});

test("failed call logs sanitize response-body copies while successful bodies stay unchanged", async () => {
  const hostileBody = {
    message: "access_token=call-body-secret at /srv/private/upstream.json",
    detail: "Error: api_key=call-detail-secret\n    at dispatch (/srv/private/rerank.ts:7:2)",
  };
  const successBody = {
    message: "Successful output mentions /tmp/public-example.ts and remains unchanged",
    usage: { total_tokens: 4 },
  };

  await saveCallLog({
    id: "error-body-json",
    status: 502,
    provider: "rerank-test",
    model: "rerank-test",
    responseBody: hostileBody,
    pipelinePayloads: {
      providerResponse: { body: hostileBody },
      clientResponse: { body: hostileBody },
    },
  });
  await saveCallLog({
    id: "error-body-text",
    status: 503,
    provider: "rerank-test",
    model: "rerank-test",
    responseBody: "Bearer plaintext-body-secret at C:\\Users\\admin\\upstream.txt",
  });
  await saveCallLog({
    id: "success-body-control",
    status: 200,
    provider: "rerank-test",
    model: "rerank-test",
    responseBody: successBody,
    pipelinePayloads: {
      providerResponse: { body: successBody },
      clientResponse: { body: successBody },
    },
  });
  await saveCallLog({
    id: "error-body-binary",
    status: 500,
    provider: "rerank-test",
    model: "rerank-test",
    responseBody: Buffer.from([1, 2, 3, 4]),
  });
  assert.equal(await waitForCallLogSaves(2_000), true, "call-log writes must drain");

  const db = core.getDbInstance();
  const rows = db
    .prepare(
      `SELECT id, artifact_relpath FROM call_logs
       WHERE id IN (
         'error-body-json', 'error-body-text', 'success-body-control', 'error-body-binary'
       )`
    )
    .all() as Array<{ id: string; artifact_relpath: string | null }>;
  const artifacts = Object.fromEntries(
    rows.map((row) => [row.id, readArtifact(row.artifact_relpath)])
  ) as Record<string, Record<string, unknown>>;

  assert.doesNotMatch(
    JSON.stringify({ json: artifacts["error-body-json"], text: artifacts["error-body-text"] }),
    /call-body-secret|call-detail-secret|plaintext-body-secret|srv\/private|C:\\\\Users|\bat dispatch\b/i
  );
  assert.deepEqual(artifacts["success-body-control"].responseBody, successBody);
  assert.equal(artifacts["error-body-binary"].responseBody, "[binary 4 bytes]");
  const pipeline = artifacts["success-body-control"].pipeline;
  assert.ok(isRecord(pipeline));
  assert.ok(isRecord(pipeline.providerResponse));
  assert.ok(isRecord(pipeline.clientResponse));
  assert.deepEqual(pipeline.providerResponse.body, successBody);
  assert.deepEqual(pipeline.clientResponse.body, successBody);
});
