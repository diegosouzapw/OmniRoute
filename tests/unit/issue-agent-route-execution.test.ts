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

test("issue-agent preserves the normal chat route provider failure response", async () => {
  await seedOpenAiConnection();
  globalThis.fetch = async () =>
    Response.json(
      { error: { message: "provider rate limited", type: "rate_limit_error" } },
      { status: 429 }
    );

  const response = await issueAgentRoute.POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({
        mode: "recorded-triage",
        // #7315: dryRun must be explicit false — createRecordedTriageRun()
        // (src/lib/issueAgent/recordedTriage.ts) computes `dryRun: input.dryRun
        // !== false`, so an OMITTED dryRun defaults to true (dry-run mode) and
        // the route returns the deterministic dry-run summary WITHOUT ever
        // calling executeRecordedTriageChatCompletion() — meaning the mocked
        // 429 fetch below is never invoked and this test always observed the
        // 200 dry-run response instead. Not a semantic-cache collision: the
        // sibling test above passes dryRun:false explicitly, this one didn't.
        dryRun: false,
        issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5980",
        recordedContext: { body: "Preserve upstream errors for triage." },
        provider: "openai",
        model: "gpt-4.1",
      }),
    })
  );
  const body = (await response.json()) as Record<string, unknown>;

  // The normal chat-completions route enriches the raw upstream error (adds a
  // "[provider/model] [status]:" prefix and a connection-cooldown hint) rather
  // than passing the mocked JSON through byte-for-byte — that enrichment is the
  // normal route's own, deliberate behavior (see RESILIENCE_GUIDE.md connection
  // cooldown). This test's job is to prove the issue-agent execution wrapper
  // preserves and surfaces THAT real response (status + original message text)
  // rather than swallowing it or substituting its own error — so assert on the
  // stable, observable parts instead of the exact enrichment wording/timing.
  assert.equal(response.status, 429);
  const completion = body.completion as { error?: { message?: string } };
  assert.match(
    completion.error?.message ?? "",
    /provider rate limited/,
    "the original upstream error message must survive through the issue-agent execution wrapper"
  );
});
