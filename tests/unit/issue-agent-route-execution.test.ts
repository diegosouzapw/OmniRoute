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

type RunInput = Parameters<
  typeof issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion
>[0];

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

  const calls: Array<RunInput> = [];
  const originalExecutor = issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion;
  issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = async (input) => {
    calls.push(input);
    return {
      status: 200,
      body: {
        id: "chatcmpl-issue-agent-route",
        choices: [{ message: { role: "assistant", content: "Triage response" } }],
      },
      terminalState: "succeeded",
      completionStatus: "succeeded",
      durationMs: 12,
    };
  };

  try {
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
    assert.equal(body.state, "succeeded");
    assert.equal(body.runner, "omniroute-chat-completions");
    assert.equal(calls.length, 1, "execution seam should be exercised once");

    const received = calls[0]!;
    assert.equal(received.model, "gpt-4.1");
    assert.equal(received.provider, "openai");
    assert.equal(received.routingPolicy, "quality");
    assert.equal((body.completion as Record<string, unknown>).id, "chatcmpl-issue-agent-route");
    assert.equal(body.terminalState, "succeeded");

    const auditPath = body.auditPath as string;
    const rows = (await fs.promises.readFile(auditPath, "utf8")).trim().split("\n").filter(Boolean);
    const accepted = JSON.parse(rows[0]!) as Record<string, unknown>;
    const running = JSON.parse(rows[1]!) as Record<string, unknown>;
    const terminal = JSON.parse(rows[2]!) as Record<string, unknown>;

    assert.equal(accepted.state, "accepted");
    assert.equal(running.state, "running");
    assert.equal(terminal.state, "succeeded");
    assert.equal(terminal.terminalState, "succeeded");
  } finally {
    issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = originalExecutor;
  }
});

test("issue-agent live triage maps budget exhausted into 429 budget_stopped terminal", async () => {
  await seedOpenAiConnection();

  const originalExecutor = issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion;
  issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = async () => ({
    status: 429,
    body: { message: "Quota exhausted. Individual quota reached. Contact administrator to enable overages." },
    terminalState: "budget_stopped",
    completionStatus: "budget_stopped",
    durationMs: 22,
    terminalError: "Quota exhausted. Individual quota reached. Contact administrator to enable overages.",
  });

  try {
    const response = await issueAgentRoute.POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          dryRun: false,
          model: "gpt-4.1",
          provider: "openai",
          issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5981",
          recordedContext: {
            title: "Budget stop triage path",
            body: "Route should report budget stop as a terminal state.",
          },
        }),
      })
    );
    const body = (await response.json()) as Record<string, unknown>;

    assert.equal(response.status, 429);
    assert.equal(body.state, "budget_stopped");
    assert.equal(body.completionStatus, "budget_stopped");
    assert.equal(body.terminalState, "budget_stopped");
    assert.equal(
      String(body.terminalError),
      "Quota exhausted. Individual quota reached. Contact administrator to enable overages."
    );

    const auditPath = body.auditPath as string;
    const rows = (await fs.promises.readFile(auditPath, "utf8")).trim().split("\n").filter(Boolean);
    const terminal = JSON.parse(rows.at(-1)!) as Record<string, unknown>;
    assert.equal(terminal.state, "budget_stopped");
    assert.equal(terminal.terminalState, "budget_stopped");
    assert.equal(terminal.completionStatus, "budget_stopped");
  } finally {
    issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = originalExecutor;
  }
});

test("issue-agent live triage maps timeouts into timed_out terminal with 408 status", async () => {
  await seedOpenAiConnection();

  const originalExecutor = issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion;
  issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = async () => ({
    status: 408,
    body: null,
    terminalState: "timed_out",
    completionStatus: "timed_out",
    durationMs: 7,
    timedOutMs: 1,
    terminalError: "Execution timed out after 1ms",
  });

  try {
    const response = await issueAgentRoute.POST(
      new Request("http://localhost/api/issue-agent/runs", {
        method: "POST",
        body: JSON.stringify({
          mode: "recorded-triage",
          dryRun: false,
          issueUrl: "https://github.com/KooshaPari/OmniRoute/issues/5982",
          model: "gpt-4.1",
          provider: "openai",
          timeoutMs: 1,
          recordedContext: {
            title: "Issue-agent timeout behavior",
            body: "Long-running request should become timed out terminal.",
          },
        }),
      })
    );
    const body = (await response.json()) as Record<string, unknown>;

    assert.equal(response.status, 408);
    assert.equal(body.state, "timed_out");
    assert.equal(body.completionStatus, "timed_out");
    assert.equal(body.terminalState, "timed_out");
    assert.equal(body.timedOutMs, 1);

    const auditPath = body.auditPath as string;
    const rows = (await fs.promises.readFile(auditPath, "utf8")).trim().split("\n").filter(Boolean);
    const terminal = JSON.parse(rows.at(-1)!) as Record<string, unknown>;
    assert.equal(terminal.state, "timed_out");
    assert.equal(terminal.terminalState, "timed_out");
    assert.equal(terminal.completionStatus, "timed_out");
    assert.equal(String(terminal.terminalError ?? ""), "Execution timed out after 1ms");
  } finally {
    issueAgentRoute.issueAgentRouteExecutor.executeRecordedTriageChatCompletion = originalExecutor;
  }
});

test("issue-agent GET reports enabled/disabled state", async () => {
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "1";

  const enabledResponse = await issueAgentRoute.GET();
  const enabledBody = (await enabledResponse.json()) as Record<string, unknown>;

  assert.equal(enabledResponse.status, 200);
  assert.equal(enabledBody.enabled, true);
  assert.deepEqual(enabledBody.supportedModes, ["recorded-triage"]);

  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "0";
  const disabledResponse = await issueAgentRoute.GET();
  const disabledBody = (await disabledResponse.json()) as Record<string, unknown>;

  assert.equal(disabledResponse.status, 200);
  assert.equal(disabledBody.enabled, false);
});

test("issue-agent POST rejects invalid JSON and unsupported modes", async () => {
  const invalidJsonResponse = await issueAgentRoute.POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: "{this is not valid json",
    })
  );
  const invalidJsonBody = (await invalidJsonResponse.json()) as Record<string, unknown>;

  assert.equal(invalidJsonResponse.status, 400);
  assert.equal(invalidJsonBody.error, "Invalid JSON body");

  const unsupportedModeResponse = await issueAgentRoute.POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({
        mode: "realtime",
        dryRun: true,
      }),
    })
  );
  const unsupportedModeBody = (await unsupportedModeResponse.json()) as Record<string, unknown>;

  assert.equal(unsupportedModeResponse.status, 400);
  assert.equal(unsupportedModeBody.error, "Unsupported issue-agent mode");
  assert.deepEqual(unsupportedModeBody.supportedModes as string[], ["recorded-triage"]);
});

test("issue-agent POST blocks when feature flag is disabled", async () => {
  process.env.OMNIROUTE_ISSUE_AGENT_ENABLED = "0";

  const response = await issueAgentRoute.POST(
    new Request("http://localhost/api/issue-agent/runs", {
      method: "POST",
      body: JSON.stringify({
        mode: "recorded-triage",
        dryRun: true,
      }),
    })
  );
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 403);
  assert.equal(body.enabled, false);
  assert.equal(body.error, "Issue Agent execution is disabled");
  assert.equal(body.requiredEnv, "OMNIROUTE_ISSUE_AGENT_ENABLED=true");
});
