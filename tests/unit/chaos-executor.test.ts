/**
 * Unit tests for src/lib/chaos/chaosExecutor.ts
 *
 * Regression coverage for #6679: the original PR dispatched to models via a real
 * network fetch() to `${OMNIROUTE_INTERNAL_URL || "http://localhost:30129"}` —
 * 30129 is the author's personal dev port, not the project's default port 20128,
 * so Chaos Mode silently failed on any standard install. This now dispatches
 * in-process via the established synthetic-Request/route-handler pattern (see
 * src/lib/batches/dispatch.ts, src/lib/evals/runtime.ts) — no network hop, no
 * port dependency. `chatDispatch.postChatCompletion` is mocked here (same
 * technique tests/unit/batch-processor.test.ts uses for dispatch.ts) so these
 * tests never hit a real upstream provider.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-executor-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chaosConfig = await import("../../src/lib/chaos/chaosConfig.ts");
const chaosExecutor = await import("../../src/lib/chaos/chaosExecutor.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  mock.restoreAll();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("executeChaosRun throws when no active provider connections exist", async () => {
  await assert.rejects(
    () => chaosExecutor.executeChaosRun({ task: "hello" }),
    /No active provider connections found/
  );
});

test("executeChaosRun dispatches in-process (no fetch/network call) and returns per-provider results", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Test OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  let capturedRequest: Request | null = null;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedRequest = req;
    return jsonResponse({ choices: [{ message: { content: "hello from openai" } }] });
  });

  const result = await chaosExecutor.executeChaosRun({ task: "Summarize this repo" });

  assert.equal(result.mode, "parallel");
  assert.equal(result.totalProviders, 1);
  assert.equal(result.models.length, 1);
  assert.equal(result.models[0].status, "success");
  assert.equal(result.models[0].content, "hello from openai");

  assert.ok(capturedRequest, "postChatCompletion should have been invoked in-process");
  assert.equal(
    (capturedRequest as unknown as Request).url,
    "http://localhost/api/v1/chat/completions"
  );
});

test("executeChaosRun forwards the caller's apiKey as a Bearer Authorization header", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Test Anthropic",
    apiKey: "sk-test-anthropic",
    defaultModel: "claude-3-5-sonnet",
  });

  let capturedAuth: string | null = null;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task", apiKey: "sk-caller-key" });

  assert.equal(capturedAuth, "Bearer sk-caller-key");
});

test("executeChaosRun omits Authorization header when no apiKey is provided (dashboard/local mode)", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Test OpenAI",
    apiKey: "sk-test-openai-2",
    defaultModel: "gpt-4o-mini",
  });

  let capturedAuth: string | null | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    capturedAuth = req.headers.get("Authorization");
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(capturedAuth, null);
});

test("executeChaosRun surfaces upstream errors per-model instead of throwing", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Failing OpenAI",
    apiKey: "sk-test-failing",
    defaultModel: "gpt-4o-mini",
  });

  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () =>
    jsonResponse({ error: "upstream exploded" }, 502)
  );

  const result = await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(result.models[0].status, "error");
  assert.match(result.models[0].error ?? "", /API 502/);
});

test("executeChaosRun collaborative mode chains context between sequential model calls", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Model A",
    apiKey: "sk-test-a",
    defaultModel: "gpt-4o-mini",
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Model B",
    apiKey: "sk-test-b",
    defaultModel: "claude-3-5-sonnet",
  });

  const seenUserMessages: string[] = [];
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    const body = (await req.json()) as { messages: { role: string; content: string }[] };
    const userMessage = body.messages.find((m) => m.role === "user");
    seenUserMessages.push(userMessage?.content ?? "");
    return jsonResponse({
      choices: [{ message: { content: `reply-${seenUserMessages.length}` } }],
    });
  });

  const result = await chaosExecutor.executeChaosRun({
    task: "Original task",
    mode: "collaborative",
  });

  assert.equal(result.mode, "collaborative");
  assert.equal(result.models.length, 2);
  assert.equal(seenUserMessages[0], "Original task");
  assert.match(seenUserMessages[1], /Previous model's output:\nreply-1/);
  assert.ok(result.summary && result.summary.includes("reply-2"));
});

test("executeChaosRun respects an explicit providers filter and errors when none match", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Only OpenAI",
    apiKey: "sk-test-only-openai",
    defaultModel: "gpt-4o-mini",
  });

  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async () =>
    jsonResponse({ choices: [{ message: { content: "ok" } }] })
  );

  await assert.rejects(
    () => chaosExecutor.executeChaosRun({ task: "task", providers: ["anthropic"] }),
    /None of the specified providers are active/
  );

  const result = await chaosExecutor.executeChaosRun({ task: "task", providers: ["openai"] });
  assert.equal(result.models.length, 1);
});

test("executeChaosRun applies global config provider overrides for model resolution", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Override target",
    apiKey: "sk-test-override",
    defaultModel: "gpt-4o-mini",
  });

  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [{ providerId: "openai", modelId: "gpt-4-turbo", enabled: true }],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });

  let capturedModel: string | undefined;
  mock.method(chaosExecutor.chatDispatch, "postChatCompletion", async (req: Request) => {
    const body = (await req.json()) as { model: string };
    capturedModel = body.model;
    return jsonResponse({ choices: [{ message: { content: "ok" } }] });
  });

  await chaosExecutor.executeChaosRun({ task: "task" });

  assert.equal(capturedModel, "gpt-4-turbo");
});
