import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-rm-"));
process.env.DATA_DIR = TEST_DATA_DIR;

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

test("call logs persist requestedModel and allow filtering by requested model", async () => {
  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-5.2-mini",
    requestedModel: "openai/gpt-5.2-codex",
    provider: "openai",
    duration: 123,
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { id: "resp_1" },
  });

  const all = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(all.length, 1);
  assert.equal(all[0].model, "openai/gpt-5.2-mini");
  assert.equal(all[0].requestedModel, "openai/gpt-5.2-codex");

  const byRequested = await callLogs.getCallLogs({ model: "gpt-5.2-codex", limit: 10 });
  assert.equal(byRequested.length, 1);
  assert.equal(byRequested[0].requestedModel, "openai/gpt-5.2-codex");

  const detail = await callLogs.getCallLogById(all[0].id);
  assert.equal(detail?.requestedModel, "openai/gpt-5.2-codex");
});
