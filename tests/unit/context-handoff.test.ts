import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-context-handoff-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const handoffDb = await import("../../src/lib/db/contextHandoffs.ts");
const contextHandoff = await import("../../open-sse/services/contextHandoff.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitFor(fn, timeoutMs = 1500) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const value = await fn();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("buildHandoffSystemMessage and injectHandoffIntoBody preserve existing history", () => {
  const payload = {
    sessionId: "sess-1",
    comboName: "relay-combo",
    fromAccount: "conn-a",
    summary: "Working through combo relay integration",
    keyDecisions: ["use 85% pre-handoff threshold", "delete handoff after successful replay"],
    taskProgress: "Need to finish tests",
    activeEntities: ["combo.ts", "chat.ts"],
    messageCount: 42,
    model: "codex/gpt-5.4",
    warningThresholdPct: 0.85,
    generatedAt: "2099-04-08T12:00:00.000Z",
    expiresAt: "2099-04-08T17:00:00.000Z",
  };
  const body = {
    messages: [
      { role: "system", content: "Original system message" },
      { role: "user", content: "Continue" },
    ],
  };

  const systemMessage = contextHandoff.buildHandoffSystemMessage(payload);
  const injected = contextHandoff.injectHandoffIntoBody(body, payload);

  assert.match(systemMessage, /<context_handoff>/);
  assert.match(systemMessage, /combo\.ts/);
  assert.equal(injected.messages[0].role, "system");
  assert.match(String(injected.messages[0].content), /<context_handoff>/);
  assert.equal(injected.messages[1].content, "Original system message");
  assert.equal(body.messages.length, 2);
});

test("injectHandoffIntoBody preserves Responses API shape for native Codex requests", () => {
  const payload = {
    sessionId: "sess-1",
    comboName: "relay-combo",
    fromAccount: "conn-a",
    summary: "Keep the current plan and continue seamlessly",
    keyDecisions: ["prefer Responses-native payloads"],
    taskProgress: "Need to carry state across account switches",
    activeEntities: ["chat.ts", "contextHandoff.ts"],
    messageCount: 8,
    model: "codex/gpt-5.4",
    warningThresholdPct: 0.85,
    generatedAt: "2099-04-08T12:00:00.000Z",
    expiresAt: "2099-04-08T17:00:00.000Z",
  };
  const body = {
    instructions: "Original instructions",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Continue" }],
      },
    ],
  };

  const injected = contextHandoff.injectHandoffIntoBody(body, payload);

  assert.equal("messages" in injected, false);
  assert.deepEqual(injected.input, body.input);
  assert.match(String(injected.instructions), /<context_handoff>/);
  assert.match(String(injected.instructions), /Original instructions/);
});

test("parseHandoffJSON accepts fenced JSON and normalizes fields", () => {
  const parsed = contextHandoff.parseHandoffJSON(`\`\`\`json
{"summary":"  Ready to continue  ","keyDecisions":["A","B"],"taskProgress":"Pending tests","activeEntities":["file.ts","combo.ts"]}
\`\`\``);

  assert.equal(parsed.summary, "Ready to continue");
  assert.deepEqual(parsed.keyDecisions, ["A", "B"]);
  assert.equal(parsed.taskProgress, "Pending tests");
  assert.deepEqual(parsed.activeEntities, ["file.ts", "combo.ts"]);
});

test("parseHandoffJSON returns null for invalid payloads without throwing", () => {
  assert.equal(contextHandoff.parseHandoffJSON("not-json"), null);
});

test("resolveContextRelayConfig preserves explicit empty handoffProviders", () => {
  const resolved = contextHandoff.resolveContextRelayConfig({
    handoffProviders: [],
    handoffThreshold: 0.9,
    maxMessagesForSummary: 15,
  });

  assert.deepEqual(resolved.handoffProviders, []);
  assert.equal(resolved.handoffThreshold, 0.9);
  assert.equal(resolved.maxMessagesForSummary, 15);
});

test("maybeGenerateHandoff skips below the warning threshold", async () => {
  let called = false;

  contextHandoff.maybeGenerateHandoff({
    sessionId: "sess-low",
    comboName: "relay-combo",
    connectionId: "conn-low",
    percentUsed: 0.7,
    messages: [{ role: "user", content: "hello" }],
    model: "codex/gpt-5.4",
    expiresAt: null,
    handleSingleModel: async () => {
      called = true;
      return new Response("{}", { status: 200 });
    },
  });

  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(called, false);
  assert.equal(handoffDb.getHandoff("sess-low", "relay-combo"), null);
});

test("maybeGenerateHandoff persists a structured handoff once the threshold is reached", async () => {
  const calls = [];

  contextHandoff.maybeGenerateHandoff({
    sessionId: "sess-save",
    comboName: "relay-combo",
    connectionId: "conn-save",
    percentUsed: 0.88,
    messages: [
      { role: "user", content: "Please continue wiring the combo" },
      { role: "assistant", content: "Working on it" },
    ],
    model: "codex/gpt-5.4",
    expiresAt: "2099-04-08T17:00:00.000Z",
    handleSingleModel: async (body, modelStr) => {
      calls.push({ body, modelStr });
      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "Relay summary generated",
                  keyDecisions: ["Use context-relay"],
                  taskProgress: "Integration in progress",
                  activeEntities: ["combo.ts", "contextHandoff.ts"],
                }),
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    },
  });

  const saved = await waitFor(() => handoffDb.getHandoff("sess-save", "relay-combo"));
  assert.ok(saved);
  assert.equal(saved.fromAccount, "conn-save");
  assert.equal(saved.summary, "Relay summary generated");
  assert.deepEqual(saved.keyDecisions, ["Use context-relay"]);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].modelStr, "codex/gpt-5.4");
  assert.equal(calls[0].body._omnirouteSkipContextRelay, true);
  assert.equal(calls[0].body._omnirouteInternalRequest, "context-handoff");
});

test("maybeGenerateHandoff deduplicates concurrent in-flight generations for the same session", async () => {
  const calls = [];
  let releaseGeneration;
  const gate = new Promise((resolve) => {
    releaseGeneration = resolve;
  });

  const options = {
    sessionId: "sess-dedupe",
    comboName: "relay-combo",
    connectionId: "conn-dedupe",
    percentUsed: 0.89,
    messages: [{ role: "user", content: "Generate once" }],
    model: "codex/gpt-5.4",
    expiresAt: "2099-01-01T00:00:00.000Z",
    handleSingleModel: async () => {
      calls.push("summary");
      await gate;
      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "Only one handoff should be generated",
                  keyDecisions: ["dedupe in flight"],
                  taskProgress: "done",
                  activeEntities: ["contextHandoff.ts"],
                }),
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    },
  };

  contextHandoff.maybeGenerateHandoff(options);
  contextHandoff.maybeGenerateHandoff(options);

  await new Promise((resolve) => setTimeout(resolve, 25));
  assert.equal(calls.length, 1);

  releaseGeneration();
  const saved = await waitFor(() => handoffDb.getHandoff("sess-dedupe", "relay-combo"));
  assert.ok(saved);
  assert.equal(saved.summary, "Only one handoff should be generated");
  assert.equal(calls.length, 1);
});

test("maybeGenerateHandoff allows a new attempt after a failed in-flight generation", async () => {
  let calls = 0;

  const options = {
    sessionId: "sess-retry",
    comboName: "relay-combo",
    connectionId: "conn-retry",
    percentUsed: 0.9,
    messages: [{ role: "user", content: "Retry after failure" }],
    model: "codex/gpt-5.4",
    expiresAt: "2099-01-01T00:00:00.000Z",
    handleSingleModel: async () => {
      calls += 1;
      if (calls === 1) {
        return new Response("temporary failure", { status: 500 });
      }

      return new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  summary: "Retry succeeded",
                  keyDecisions: ["lock cleared after failure"],
                  taskProgress: "completed",
                  activeEntities: ["contextHandoff.ts"],
                }),
              },
            },
          ],
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    },
  };

  contextHandoff.maybeGenerateHandoff(options);
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(handoffDb.getHandoff("sess-retry", "relay-combo"), null);

  contextHandoff.maybeGenerateHandoff(options);
  const saved = await waitFor(() => handoffDb.getHandoff("sess-retry", "relay-combo"));
  assert.ok(saved);
  assert.equal(saved.summary, "Retry succeeded");
  assert.equal(calls, 2);
});

test("maybeGenerateHandoff respects explicit empty handoffProviders and skips generation", async () => {
  let called = false;

  contextHandoff.maybeGenerateHandoff({
    sessionId: "sess-disabled",
    comboName: "relay-combo",
    connectionId: "conn-disabled",
    percentUsed: 0.92,
    messages: [{ role: "user", content: "Do not generate" }],
    model: "codex/gpt-5.4",
    expiresAt: null,
    config: { handoffProviders: [] },
    handleSingleModel: async () => {
      called = true;
      return new Response("{}", { status: 200 });
    },
  });

  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(called, false);
  assert.equal(handoffDb.getHandoff("sess-disabled", "relay-combo"), null);
});

test("context handoff DB module upserts and deletes active handoffs", () => {
  handoffDb.upsertHandoff({
    sessionId: "sess-db",
    comboName: "relay-combo",
    fromAccount: "conn-a",
    summary: "First summary",
    keyDecisions: ["A"],
    taskProgress: "step one",
    activeEntities: ["a.ts"],
    messageCount: 3,
    model: "codex/gpt-5.4",
    warningThresholdPct: 0.85,
    generatedAt: "2099-04-08T10:00:00.000Z",
    expiresAt: "2099-01-01T00:00:00.000Z",
  });
  handoffDb.upsertHandoff({
    sessionId: "sess-db",
    comboName: "relay-combo",
    fromAccount: "conn-b",
    summary: "Updated summary",
    keyDecisions: ["B"],
    taskProgress: "step two",
    activeEntities: ["b.ts"],
    messageCount: 4,
    model: "codex/gpt-5.4",
    warningThresholdPct: 0.86,
    generatedAt: "2099-04-08T11:00:00.000Z",
    expiresAt: "2099-01-01T00:00:00.000Z",
  });

  const saved = handoffDb.getHandoff("sess-db", "relay-combo");
  assert.equal(saved.fromAccount, "conn-b");
  assert.equal(saved.summary, "Updated summary");
  assert.equal(handoffDb.hasActiveHandoff("sess-db", "relay-combo"), true);

  handoffDb.deleteHandoff("sess-db", "relay-combo");
  assert.equal(handoffDb.getHandoff("sess-db", "relay-combo"), null);
});
