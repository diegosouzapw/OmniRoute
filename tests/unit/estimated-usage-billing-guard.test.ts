// Estimated token usage: billing stays exactly as it is, and the call log records that the
// counts were estimated. Drives the real handleChatCore (non-streaming and streaming) with a
// fetch stub, then reads the persisted call log and the API-key spend ledger.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-estimated-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { getDailyTotal } = await import("../../src/domain/costRules.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { extractUsage, filterUsageForFormat, isEstimatedUsage } =
  await import("../../open-sse/utils/usageTracking.ts");
const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");

const originalFetch = globalThis.fetch;
const silentLog = { debug() {}, info() {}, warn() {}, error() {} };
const MODEL = "gpt-4o-mini";

before(() => {
  core.resetDbInstance();
});

after(async () => {
  globalThis.fetch = originalFetch;
  await callLogs.closeCallLogSaves(5_000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const USAGE = { prompt_tokens: 1200, completion_tokens: 800, total_tokens: 2000 };

function jsonCompletion(usage: Record<string, unknown>): Response {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-estimated",
      object: "chat.completion",
      model: MODEL,
      choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
      usage,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function sseCompletion(events: unknown[]): Response {
  const body = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

const textChunk = (content: string, finish: string | null = null) => ({
  id: "chatcmpl-estimated",
  object: "chat.completion.chunk",
  model: MODEL,
  choices: [{ index: 0, delta: { content }, finish_reason: finish }],
});

async function runChat(apiKeyId: string, stream: boolean, response: () => Response) {
  globalThis.fetch = (async () => response()) as typeof fetch;
  const body = { model: MODEL, stream, messages: [{ role: "user", content: "hello there" }] };
  const result = (await handleChatCore({
    body,
    modelInfo: { provider: "openai", model: MODEL, extendedContext: false },
    credentials: { apiKey: "sk-test-estimated" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: stream ? "text/event-stream" : "application/json" }),
    },
    apiKeyInfo: { id: apiKeyId, name: apiKeyId },
    userAgent: "unit-test",
    isCombo: false,
    log: silentLog,
  } as unknown as Parameters<typeof handleChatCore>[0])) as { response?: Response };
  const clientText = result.response ? await result.response.text() : "";
  return clientText;
}

async function persistedLog(apiKeyId: string) {
  const deadline = Date.now() + 15_000;
  for (;;) {
    await callLogs.waitForCallLogSaves(5_000);
    const rows = (await callLogs.getCallLogs({})) as Array<{ id: string; apiKeyId: string }>;
    const row = rows.find((r) => r.apiKeyId === apiKeyId);
    if (row) return callLogs.getCallLogById(row.id);
    if (Date.now() > deadline) throw new Error(`no call log for ${apiKeyId}`);
    await new Promise((r) => setTimeout(r, 50));
  }
}

async function spend(apiKeyId: string): Promise<number> {
  const deadline = Date.now() + 5_000;
  let total = getDailyTotal(apiKeyId);
  while (total === 0 && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 50));
    total = getDailyTotal(apiKeyId);
  }
  return total;
}

function usageEstimatedMeta(entry: unknown): unknown {
  const responseBody = (entry as { responseBody?: { _omniroute?: Record<string, unknown> } })
    ?.responseBody;
  return responseBody?._omniroute?.usageEstimated;
}

test("extraction keeps an internal estimated marker that never serializes or spreads", () => {
  const estimatedChunk = { choices: [], usage: { ...USAGE, estimated: true } };
  const reportedChunk = { choices: [], usage: { ...USAGE } };
  const estimated = extractUsage(estimatedChunk);
  const reported = extractUsage(reportedChunk);
  assert.equal(isEstimatedUsage(estimated), true);
  assert.equal(isEstimatedUsage(reported), false);
  assert.deepStrictEqual(estimated, reported, "token fields are untouched");
  assert.equal(JSON.stringify(estimated), JSON.stringify(reported));
  assert.equal(isEstimatedUsage({ ...estimated }), false, "spread copies never carry it");
  assert.equal(isEstimatedUsage(filterUsageForFormat(estimated, "openai")), false);

  const fromResponse = extractUsageFromResponse({ usage: { ...USAGE, estimated: true } }, "x");
  assert.equal(isEstimatedUsage(fromResponse), true);
  assert.equal(JSON.stringify(fromResponse).includes("estimated"), false);
  assert.equal(isEstimatedUsage(extractUsageFromResponse({ usage: { ...USAGE } }, "x")), false);
});

test("non-streaming estimated usage is still billed and is marked in the call log", async () => {
  const clientText = await runChat("key-json-estimated", false, () =>
    jsonCompletion({ ...USAGE, estimated: true })
  );
  assert.ok((await spend("key-json-estimated")) > 0, "API-key spend still records the cost");
  const entry = await persistedLog("key-json-estimated");
  assert.equal(entry?.tokens?.in, USAGE.prompt_tokens);
  assert.equal(entry?.tokens?.out, USAGE.completion_tokens);
  assert.equal(usageEstimatedMeta(entry), true);
  assert.doesNotMatch(clientText, /usageEstimated/);
});

test("non-streaming provider-reported usage carries no estimated marker", async () => {
  await runChat("key-json-reported", false, () => jsonCompletion({ ...USAGE }));
  assert.ok((await spend("key-json-reported")) > 0);
  const entry = await persistedLog("key-json-reported");
  assert.equal(usageEstimatedMeta(entry), undefined);
});

test("a stream without upstream usage is billed on the estimate and marked in the call log", async () => {
  const clientText = await runChat("key-sse-silent", true, () =>
    sseCompletion([textChunk("hello from the model"), textChunk("", "stop")])
  );
  assert.match(clientText, /hello from the model/);
  assert.ok((await spend("key-sse-silent")) > 0, "API-key spend still records the estimate");
  const entry = await persistedLog("key-sse-silent");
  assert.ok((entry?.tokens?.out ?? 0) > 0);
  assert.equal(usageEstimatedMeta(entry), true);
  assert.doesNotMatch(clientText, /usageEstimated/);
});

test("a stream whose executor reports estimated usage is billed and marked in the call log", async () => {
  const clientText = await runChat("key-sse-executor", true, () =>
    sseCompletion([
      textChunk("hello from the model"),
      textChunk("", "stop"),
      {
        id: "chatcmpl-estimated",
        object: "chat.completion.chunk",
        model: MODEL,
        choices: [],
        usage: { ...USAGE, estimated: true },
      },
    ])
  );
  assert.ok((await spend("key-sse-executor")) > 0);
  const entry = await persistedLog("key-sse-executor");
  assert.equal(entry?.tokens?.in, USAGE.prompt_tokens);
  assert.equal(usageEstimatedMeta(entry), true);
  assert.doesNotMatch(clientText, /usageEstimated/);
});

test("a stream with provider-reported usage carries no estimated marker", async () => {
  await runChat("key-sse-reported", true, () =>
    sseCompletion([
      textChunk("hello from the model"),
      textChunk("", "stop"),
      {
        id: "chatcmpl-estimated",
        object: "chat.completion.chunk",
        model: MODEL,
        choices: [],
        usage: { ...USAGE },
      },
    ])
  );
  const entry = await persistedLog("key-sse-reported");
  assert.equal(entry?.tokens?.in, USAGE.prompt_tokens);
  assert.equal(usageEstimatedMeta(entry), undefined);
});
