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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    model: "codex/gpt-5.6-sol",
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

test("injectHandoffIntoBody appends Claude-native handoff to top-level system", () => {
  const payload = {
    sessionId: "sess-1",
    comboName: "relay-combo",
    fromAccount: "conn-a",
    summary: "Keep the Claude-native request shape",
    keyDecisions: ["keep system prompts top-level"],
    taskProgress: "Continue the request",
    activeEntities: ["contextHandoff.ts"],
    messageCount: 8,
    model: "claude/claude-opus-5",
    warningThresholdPct: 0.85,
    generatedAt: "2099-04-08T12:00:00.000Z",
    expiresAt: "2099-04-08T17:00:00.000Z",
  };
  const body = {
    system: "Existing Claude prompt",
    max_tokens: 64,
    messages: [{ role: "user", content: [{ type: "text", text: "Continue" }] }],
  };

  const injected = contextHandoff.injectHandoffIntoBody(body, payload, undefined, "claude");
  const system = injected.system as Array<Record<string, unknown>>;

  assert.strictEqual(injected.messages, body.messages);
  assert.deepEqual(system[0], { type: "text", text: "Existing Claude prompt" });
  assert.match(String(system[1]?.text), /<context_handoff>/);
  assert.equal(system[1]?.type, "text");
});

test("injectHandoffIntoBody keeps OpenAI system fields on the message-based path", () => {
  const payload = {
    sessionId: "sess-1",
    comboName: "relay-combo",
    fromAccount: "conn-a",
    summary: "Keep the OpenAI request shape",
    keyDecisions: [],
    taskProgress: "Continue",
    activeEntities: [],
    messageCount: 1,
    model: "openai/gpt-5",
    warningThresholdPct: 0.85,
    generatedAt: "2099-04-08T12:00:00.000Z",
    expiresAt: "2099-04-08T17:00:00.000Z",
  };
  const body = {
    system: undefined,
    messages: [{ role: "user", content: "Continue" }],
  };

  const injected = contextHandoff.injectHandoffIntoBody(body, payload, undefined, "openai");

  assert.equal((injected.messages as Array<Record<string, unknown>>)[0]?.role, "system");
  assert.equal(injected.system, undefined);
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
    model: "codex/gpt-5.6-sol",
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
    model: "codex/gpt-5.6-sol",
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
    model: "codex/gpt-5.6-sol",
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
  assert.equal(calls[0].modelStr, "codex/gpt-5.6-sol");
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
    model: "codex/gpt-5.6-sol",
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
    model: "codex/gpt-5.6-sol",
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

test("selectMessagesForSummary handles schema-locked vs standard relayMode", () => {
  const messages = [
    { role: "system", content: "System instruction" },
    { role: "user", content: "Msg 1" },
    { role: "assistant", content: "Msg 2" },
    { role: "user", content: "Msg 3" },
  ];

  // Standard mode includes system message
  const standard = contextHandoff.selectMessagesForSummary(messages, 2, "standard");
  assert.equal(standard[0].role, "system");
  assert.equal(standard.length, 3); // system + last 2

  // Schema-locked mode excludes system message
  const locked = contextHandoff.selectMessagesForSummary(messages, 2, "schema-locked");
  assert.equal(locked[0].role, "assistant");
  assert.equal(locked[0].content, "Msg 2");
  assert.equal(locked.length, 2); // only non-system slice
});

test("selectMessagesForSummary trims non-system messages and excludes system in schema-locked token overflow", () => {
  // Input with system messages and huge non-system messages exceeding token limit
  const hugeText = "x".repeat(35000);
  const messages = [
    { role: "system", content: "System prompt" },
    { role: "developer", content: "Developer prompt" },
    { role: "user", content: `User msg 1: ${hugeText}` },
    { role: "assistant", content: `Assistant msg 2: ${hugeText}` },
    { role: "user", content: "User msg 3 short" },
  ];

  const trimmedLocked = contextHandoff.selectMessagesForSummary(messages, 10, "schema-locked");
  // Should exclude system and developer messages
  assert.ok(trimmedLocked.every((m) => m.role !== "system" && m.role !== "developer"));
  // Should have trimmed down to non-overflowing messages (or last non-system)
  assert.ok(trimmedLocked.length < 3);
  assert.equal(trimmedLocked[trimmedLocked.length - 1].content, "User msg 3 short");
});

test("resolveUniversalHandoffConfig correctly parses relayMode", async () => {
  const comboSchema = await import("../../src/shared/validation/schemas/combo.ts");
  const parsedLocked = comboSchema.comboRuntimeConfigSchema.parse({
    relayMode: "schema-locked",
  });
  assert.equal(parsedLocked.relayMode, "schema-locked");

  const parsedStandard = comboSchema.comboRuntimeConfigSchema.parse({
    relayMode: "standard",
  });
  assert.equal(parsedStandard.relayMode, "standard");

  const resolvedConfig = contextHandoff.resolveUniversalHandoffConfig({
    relayMode: "schema-locked",
  });
  assert.equal(resolvedConfig.relayMode, "schema-locked");
});

test("maybeGenerateHandoff respects explicit empty handoffProviders and skips generation", async () => {
  let called = false;

  contextHandoff.maybeGenerateHandoff({
    sessionId: "sess-disabled",
    comboName: "relay-combo",
    connectionId: "conn-disabled",
    percentUsed: 0.92,
    messages: [{ role: "user", content: "Do not generate" }],
    model: "codex/gpt-5.6-sol",
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
    model: "codex/gpt-5.6-sol",
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
    model: "codex/gpt-5.6-sol",
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

test("selectMessagesForSummary filters falsy values and preserves system/developer messages", () => {
  const messages: (contextHandoff.MessageLike | null | undefined | false)[] = [
    null,
    undefined,
    { role: "system", content: "System 1" },
    false,
    { role: "user", content: "User 1" },
    { role: "developer", content: "Dev 1" },
    { role: "assistant", content: "Assistant 1" },
    { role: "user", content: "User 2" },
  ];

  const selected = contextHandoff.selectMessagesForSummary(
    messages as contextHandoff.MessageLike[],
    2
  );

  assert.equal(selected.length, 4);
  assert.equal(selected[0].role, "system");
  assert.equal(selected[1].role, "developer");
  assert.equal(selected[2].role, "assistant");
  assert.equal(selected[3].role, "user");
  assert.equal(selected[3].content, "User 2");
});

test("selectMessagesForSummary with no system messages and oversized single remaining message still produces non-empty selection", () => {
  // Build a single very large non-system message that exceeds MAX_HISTORY_TOKENS_FOR_SUMMARY
  // (token estimator is ~4 chars/token, so 8000 tokens ≈ 32000 chars).
  const hugeContent = "x".repeat(40000);
  const messages: contextHandoff.MessageLike[] = [
    { role: "user", content: "first message" },
    { role: "assistant", content: hugeContent },
  ];

  const selected = contextHandoff.selectMessagesForSummary(messages, 10);

  // The function must return at least one message rather than [] so the handoff is not silently dropped.
  assert.ok(selected.length > 0, "expected at least one message to be selected");

  // formatMessagesForPrompt on the result must produce a non-empty string
  // (guards the regression: previously returned [] → empty historyText → handoff skipped).
  const historyText = selected
    .map((m, i) => {
      const role = typeof m.role === "string" ? m.role : "unknown";
      const content = typeof m.content === "string" ? m.content.trim() : "";
      return content ? `[${i + 1}] ${role.toUpperCase()}:\n${content}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
  assert.ok(historyText.length > 0, "historyText must be non-empty so the handoff is generated");
});

// ── #11552: universal-handoff regeneration backoff ───────────────────────────
// A switch-heavy combo strategy (weighted / random / round-robin) alternates
// models on almost every turn, so `maybeGenerateUniversalHandoff` is consulted
// constantly. When the summarizer answers with something that is not a usable
// handoff, nothing is persisted — and before the fix the very next switch
// re-issued the same full-history summarization call and discarded the answer
// again, on and on. That is the extra upstream call issue #11552 measured.

function universalHandoffOptions(sessionId, handleSingleModel) {
  return {
    sessionId,
    comboName: "weighted-combo",
    messages: [{ role: "user", content: "Ship the weighted combo fix" }],
    prevModel: "openai/gpt-4o-mini",
    currModel: "claude/claude-3-5-sonnet-20241022",
    universalConfig: contextHandoff.resolveUniversalHandoffConfig(null, null),
    handleSingleModel,
  };
}

function handoffJSONResponse(summary) {
  return new Response(
    JSON.stringify({
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary,
              keyDecisions: ["backoff on unparseable handoffs"],
              taskProgress: "done",
              activeEntities: ["contextHandoff.ts"],
            }),
          },
        },
      ],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("maybeGenerateUniversalHandoff stops re-summarizing after an unparseable answer", async () => {
  contextHandoff.resetUniversalHandoffCooldowns();
  let calls = 0;
  // 200 upstream OK responses that carry no handoff JSON — exactly what the
  // weighted combo matrix sees.
  const options = universalHandoffOptions("sess-unparseable", async () => {
    calls += 1;
    return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  });

  for (let i = 0; i < 200; i++) {
    contextHandoff.maybeGenerateUniversalHandoff(options);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  // Positive anchor: the feature still runs — the first switch DID generate.
  assert.equal(calls, 1, `expected exactly one summarization call, got ${calls}`);
  assert.equal(handoffDb.getHandoff("sess-unparseable", "weighted-combo"), null);
});

test("maybeGenerateUniversalHandoff still generates and persists a usable handoff", async () => {
  contextHandoff.resetUniversalHandoffCooldowns();
  let calls = 0;
  const options = universalHandoffOptions("sess-usable", async () => {
    calls += 1;
    return handoffJSONResponse("Weighted combo handoff");
  });

  contextHandoff.maybeGenerateUniversalHandoff(options);
  const saved = await waitFor(() => handoffDb.getHandoff("sess-usable", "weighted-combo"));
  assert.ok(saved, "a parseable summary must still be persisted");
  assert.equal(saved.summary, "Weighted combo handoff");
  assert.equal(calls, 1);

  // A persisted handoff makes the next switch "inject", not "generate".
  contextHandoff.maybeGenerateUniversalHandoff(options);
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(calls, 1);
});

test("a transient upstream failure does not arm the unparseable backoff", async () => {
  contextHandoff.resetUniversalHandoffCooldowns();
  let calls = 0;
  const options = universalHandoffOptions("sess-transient", async () => {
    calls += 1;
    if (calls === 1) return new Response("upstream down", { status: 503 });
    return handoffJSONResponse("Recovered handoff");
  });

  contextHandoff.maybeGenerateUniversalHandoff(options);
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(handoffDb.getHandoff("sess-transient", "weighted-combo"), null);

  contextHandoff.maybeGenerateUniversalHandoff(options);
  const saved = await waitFor(() => handoffDb.getHandoff("sess-transient", "weighted-combo"));
  assert.ok(saved, "a 503 must stay retryable on the next model switch");
  assert.equal(saved.summary, "Recovered handoff");
  assert.equal(calls, 2);
});
