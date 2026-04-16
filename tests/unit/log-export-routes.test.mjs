import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-export-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const exportRoute = await import("../../src/app/api/logs/export/route.ts");
const exportAllRoute = await import("../../src/app/api/db-backups/exportAll/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/logs/export returns explicit detailed payloads from artifact storage", async () => {
  await callLogs.saveCallLog({
    id: "export-route-log",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    requestBody: { messages: [{ role: "user", content: "hello export" }] },
    responseBody: { id: "resp-export", ok: true },
  });

  const response = await exportRoute.GET(
    new Request("http://localhost/api/logs/export?hours=24&type=call-logs")
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.count, 1);
  assert.equal(body.logs[0].id, "export-route-log");
  assert.deepEqual(body.logs[0].requestBody, {
    messages: [{ role: "user", content: "hello export" }],
  });
  assert.deepEqual(body.logs[0].responseBody, { id: "resp-export", ok: true });
  assert.equal(body.logs[0].detailState, "ready");
});

test("GET /api/db-backups/exportAll includes call_logs artifacts in the archive", async () => {
  await callLogs.saveCallLog({
    id: "backup-route-log",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    requestBody: { hello: "backup" },
  });

  const response = await exportAllRoute.GET(
    new Request("http://localhost/api/db-backups/exportAll")
  );
  assert.equal(response.status, 200);

  const archiveBuffer = Buffer.from(await response.arrayBuffer());
  const archivePath = path.join(TEST_DATA_DIR, "backup-export.tar.gz");
  fs.writeFileSync(archivePath, archiveBuffer);

  const listing = execFileSync("tar", ["-tzf", archivePath], { encoding: "utf8" });
  assert.match(listing, /call_logs\//);
  assert.match(listing, /call_logs\/.+\.json/);
  assert.match(listing, /metadata\.json/);
  assert.match(listing, /storage\.sqlite/);
});
