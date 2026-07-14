import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR =
  process.env.DATA_DIR ??
  fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-agent-execution-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const issueAgentRoute = await import("../../src/app/api/issue-agent/runs/route.ts");
const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpenAiConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "issue-agent-route-test",
    apiKey: "sk-issue-agent-route-test",
    isActive: true,
    testStatus: "active",
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "true";
  await resetStorage();
  await core.ensureDbInitialized();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_ISSUE_AGENT_ENABLED;
});

test("issue-agent live triage traverses the normal chat-completions POST route", async () => {
  await seedOpenAiConnection();
  const fetchCalls: Array<{ url: string; init: RequestInit }> = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({ url: String(url), init });
    return Response.json({
      id: "chatcmpl-issue-agent-route",
      choices: [{ message: { role: "assistant", content: "Triage response" } }],
    });
  };

  const response = await issueAgentRoute.POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({
        mode: "recorded-triage",
        dryRun: false,
        issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5980",
        recordedContext: {
          title: "Execute issue-agent triage through the router",
          body: "Use the configured provider and routing policy.",
        },
        provider: "openai",
        model: "gpt-4.1",
        routingPolicy: "quality",
      }),
    })
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(body.runner, "omniroute-chat-completions");
  assert.equal(fetchCalls.length, 1, "only the external provider boundary is mocked");
  assert.match(fetchCalls[0]!.url, /\/chat\/completions$/);

  const providerRequest = JSON.parse(String(fetchCalls[0]!.init.body)) as Record<string, unknown>;
  assert.equal(providerRequest.model, "gpt-4.1");
  assert.equal(providerRequest.stream, false);
  assert.match(JSON.stringify(providerRequest.messages), /#5980/);
  assert.equal((body.completion as Record<string, unknown>).id, "chatcmpl-issue-agent-route");
});
