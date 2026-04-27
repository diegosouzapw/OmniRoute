import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-debug-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("saveCallLog preserves streamChunks in pipeline payloads", async () => {
  const logId = "req_stream_debug_1";

  const streamChunks = {
    provider: [
      'data: {"content": "hello"}\n\n',
      'data: {"content": " world"}\n\n',
      "data: [DONE]\n\n",
    ],
    openai: [
      'data: {"choices":[{"delta":{"content":"hello"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":" world"}}]}\n\n',
    ],
    client: [
      'data: {"choices":[{"delta":{"content":"hello"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":" world"}}]}\n\n',
    ],
  };

  await callLogs.saveCallLog({
    id: logId,
    timestamp: new Date().toISOString(),
    status: 200,
    model: "gemini/gemma-4-26b-a4b-it",
    provider: "gemini",
    pipelinePayloads: {
      clientRawRequest: { body: { stream: true } },
      streamChunks: streamChunks,
    },
  });

  const detail = await callLogs.getCallLogById(logId);

  assert.ok(detail, "Log detail should exist");
  assert.ok(detail.pipelinePayloads, "Pipeline payloads should exist");
  assert.ok(detail.pipelinePayloads.streamChunks, "streamChunks should exist in pipeline payloads");

  assert.deepEqual(detail.pipelinePayloads.streamChunks.provider, streamChunks.provider);
  assert.deepEqual(detail.pipelinePayloads.streamChunks.openai, streamChunks.openai);
  assert.deepEqual(detail.pipelinePayloads.streamChunks.client, streamChunks.client);
});

test("saveCallLog preserves partial streamChunks", async () => {
  const logId = "req_stream_debug_2";

  const streamChunks = {
    provider: ["raw chunk 1", "raw chunk 2"],
    // other stages missing
  };

  await callLogs.saveCallLog({
    id: logId,
    status: 200,
    model: "test-model",
    pipelinePayloads: {
      streamChunks: streamChunks,
    },
  });

  const detail = await callLogs.getCallLogById(logId);

  assert.ok(detail?.pipelinePayloads?.streamChunks, "streamChunks should exist");
  assert.deepEqual(detail.pipelinePayloads.streamChunks.provider, streamChunks.provider);
  assert.equal(detail.pipelinePayloads.streamChunks.openai, undefined);
  assert.equal(detail.pipelinePayloads.streamChunks.client, undefined);
});
