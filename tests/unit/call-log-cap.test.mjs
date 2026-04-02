import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-artifacts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "1";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

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

test("call logs store a single per-request artifact with pipeline details", async () => {
  const timestamp = "2026-03-30T12:34:56.789Z";
  const logId = "req_artifact_1";

  await callLogs.saveCallLog({
    id: logId,
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requestedModel: "openai/gpt-5",
    provider: "openai",
    duration: 42,
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { id: "resp_1", choices: [{ message: { content: "world" } }] },
    pipelinePayloads: {
      clientRawRequest: { body: { raw: true } },
      providerRequest: { body: { translated: true } },
      providerResponse: { body: { upstream: true } },
      clientResponse: { body: { final: true } },
    },
  });

  const logs = await callLogs.getCallLogs({ limit: 5 });
  assert.equal(logs.length, 1);
  assert.equal(logs[0].hasPipelineDetails, true);

  const detail = await callLogs.getCallLogById(logId);
  assert.equal(detail?.requestedModel, "openai/gpt-5");
  assert.equal(detail?.pipelinePayloads?.clientRawRequest?.body?.raw, true);
  assert.equal(detail?.pipelinePayloads?.providerRequest?.body?.translated, true);
  assert.equal(detail?.pipelinePayloads?.providerResponse?.body?.upstream, true);
  assert.equal(detail?.pipelinePayloads?.clientResponse?.body?.final, true);
  assert.match(
    detail?.artifactRelPath || "",
    /^2026-03-30\/2026-03-30T12-34-56\.789Z_req_artifact_1\.json$/
  );

  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", detail.artifactRelPath);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.summary.id, logId);
  assert.equal(artifact.summary.requestedModel, "openai/gpt-5");
  assert.equal(artifact.pipeline.clientRawRequest.body.raw, true);
  assert.equal("sourceRequest" in artifact.pipeline, false);
});

test("call log artifact rotation removes directories older than CALL_LOG_RETENTION_DAYS", async () => {
  const oldDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-10");
  const freshDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-30");
  fs.mkdirSync(oldDir, { recursive: true });
  fs.mkdirSync(freshDir, { recursive: true });
  fs.writeFileSync(path.join(oldDir, "old.json"), "{}");
  fs.writeFileSync(path.join(freshDir, "fresh.json"), "{}");

  const oldTime = new Date("2026-03-10T00:00:00.000Z");
  const freshTime = new Date();
  fs.utimesSync(oldDir, oldTime, oldTime);
  fs.utimesSync(freshDir, freshTime, freshTime);

  callLogs.rotateCallLogs();

  assert.equal(fs.existsSync(oldDir), false);
  assert.equal(fs.existsSync(freshDir), true);
});
