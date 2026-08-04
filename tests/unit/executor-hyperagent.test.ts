// Unit tests for HyperAgent (hyperagent.com) unofficial session bridge.

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/hyperagent.ts");
const usage = await import("../../open-sse/services/usage/hyperagent.ts");
const models = await import("../../open-sse/services/hyperagentModels.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { WEB_COOKIE_PROVIDERS } = await import("../../src/shared/constants/providers/web-cookie.ts");

describe("HyperAgent — registry consistency", () => {
  it("is present in WEB_COOKIE_PROVIDERS", () => {
    const entry = (WEB_COOKIE_PROVIDERS as Record<string, Record<string, unknown>>)["hyperagent"];
    assert.ok(entry, "hyperagent missing from WEB_COOKIE_PROVIDERS");
    assert.equal(entry.id, "hyperagent");
    assert.equal(entry.alias, "ha");
    assert.equal(entry.subscriptionRisk, true);
  });

  it("registers a model catalog via getModelsByProviderId", () => {
    const catalog = getModelsByProviderId("hyperagent");
    assert.ok(catalog.length >= 4, `expected validated models, got ${catalog.length}`);
    // Wire ids are live-validated (fable-latest, not bare "fable")
    assert.ok(catalog.some((m) => m.id === "fable-latest"));
    assert.ok(catalog.some((m) => m.id === "opus-latest"));
    assert.ok(catalog.some((m) => m.id === "sonnet-latest"));
    // Pretty names in registry
    const fable = catalog.find((m) => m.id === "fable-latest");
    assert.ok(fable?.name?.toLowerCase().includes("fable"));
    assert.notEqual(fable?.name?.toLowerCase(), "fable");
  });

  it("registers hyperagent on usage-fetcher + limits allowlists", async () => {
    const usageMain = await import("../../open-sse/services/usage.ts");
    assert.ok(
      (usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("hyperagent"),
      "USAGE_FETCHER_PROVIDERS must list hyperagent"
    );
    assert.ok((usageMain.USAGE_FETCHER_PROVIDERS as readonly string[]).includes("ha"));
    const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
    assert.ok(
      (USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("hyperagent"),
      "USAGE_SUPPORTED_PROVIDERS must list hyperagent"
    );
  });
});

describe("HyperAgent — models", () => {
  it("maps pretty names / legacy keys to live wire modelId (not bare fable)", () => {
    // Bare "fable" is INVALID on the API — must become fable-latest
    assert.equal(models.wireHyperAgentModelId("fable"), "fable-latest");
    assert.equal(models.wireHyperAgentModelId("fable-5"), "fable-latest");
    assert.equal(models.wireHyperAgentModelId("Fable 5"), "fable-latest");
    assert.equal(models.wireHyperAgentModelId("hyperagent/fable"), "fable-latest");
    assert.equal(models.wireHyperAgentModelId("ha/opus-latest"), "opus-latest");
    assert.equal(models.wireHyperAgentModelId("claude-opus-4-8"), "claude-opus-4-8");
    assert.equal(models.clientFacingHyperAgentModelId("fable"), "fable-latest");
  });

  it("maps subagent to short family matching selected model", () => {
    assert.equal(models.wireHyperAgentSubagentModelId("fable"), "fable");
    assert.equal(models.wireHyperAgentSubagentModelId("fable-latest"), "fable");
    assert.equal(models.wireHyperAgentSubagentModelId("opus-latest"), "opus");
    assert.equal(models.wireHyperAgentSubagentModelId("sonnet-latest"), "sonnet");
    // Subagent must NOT be *-latest (API rejects those)
    assert.notEqual(models.wireHyperAgentSubagentModelId("fable-latest"), "fable-latest");
  });

  it("resolveHyperAgentModel finds by id and pretty name", () => {
    const a = models.resolveHyperAgentModel("fable");
    assert.ok(a);
    assert.equal(a!.id, "fable-latest");
    assert.match(a!.name, /Fable/i);
    const b = models.resolveHyperAgentModel("Fable 5");
    assert.ok(b);
    assert.equal(b!.id, "fable-latest");
  });
});

describe("HyperAgent — helpers", () => {
  it("normalizes cookie input", () => {
    assert.equal(mod.normalizeHyperAgentCookie("Cookie: a=1; b=2"), "a=1; b=2");
    assert.equal(mod.normalizeHyperAgentCookie("  sess=xyz  "), "sess=xyz");
  });

  it("extracts thread id from SPA URLs", () => {
    assert.equal(
      mod.extractThreadIdFromUrl("https://hyperagent.com/thread/cmrujkys70aiu07addcodbsj3"),
      "cmrujkys70aiu07addcodbsj3"
    );
    assert.equal(
      mod.extractThreadIdFromUrl("/thread/cmabc123def456ghi789jkl"),
      "cmabc123def456ghi789jkl"
    );
  });

  it("buildHyperAgentChatBody is execution-mode (no plan / no modelId)", () => {
    const b = mod.buildHyperAgentChatBody({
      content: "hello",
      sessionId: null,
      modelId: "fable-latest", // ignored — model is PATCH'd on thread
    });
    assert.equal(b.content, "hello");
    assert.equal(b.sessionId, null);
    assert.equal(b.unifiedStream, true);
    // Execution mode: never inject plan mode
    assert.equal(b.injectPlanMode, undefined);
    // Model is NOT in chat body (would 400 with bare pricing keys)
    assert.equal(b.modelId, undefined);
    assert.equal(b.model, undefined);
    // No connectors
    assert.deepEqual(b.enabledIntegrations, []);
    const b2 = mod.buildHyperAgentChatBody({
      content: "hello2",
      sessionId: "dd6d5eee-5c1c-449f-8dee-abb09eabd338",
    });
    assert.equal(b2.sessionId, "dd6d5eee-5c1c-449f-8dee-abb09eabd338");
    assert.equal(b2.injectPlanMode, undefined);
  });

  it("buildHyperAgentCreditsQuota maps live creditBlocks", () => {
    const q = usage.buildHyperAgentCreditsQuota({
      initialUsd: 500,
      remainingUsd: 499.568805,
      usedUsd: 0.431195,
      expiryDate: "2027-01-21T00:00:00+00:00",
    });
    assert.equal(q.currency, "USD");
    assert.equal(q.total, 500);
    assert.equal(q.remaining, 499.57);
    assert.equal(q.used, 0.43);
    assert.ok((q.remainingPercentage ?? 0) > 99);
    assert.equal(q.displayName, "Credits (USD)");
    assert.ok(q.resetAt);
  });
});

describe("HyperAgent — thread continuity", () => {
  const cookieKey = "testck1234567890";

  it("two chats with different histories stay isolated; follow-up sticks", () => {
    mod.clearHyperAgentThreadBindingsForTests();
    const a1 = [{ role: "user", content: "topic A" }];
    const b1 = [{ role: "user", content: "topic B" }];
    assert.equal(mod.resolveHyperAgentThreadBinding(cookieKey, a1).isFollowUp, false);
    mod.storeHyperAgentThreadAfterTurn(cookieKey, a1, "reply-A", "thread-A", "sess-A");
    mod.storeHyperAgentThreadAfterTurn(cookieKey, b1, "reply-B", "thread-B", "sess-B");

    const a2 = [
      { role: "user", content: "topic A" },
      { role: "assistant", content: "reply-A" },
      { role: "user", content: "follow A" },
    ];
    const b2 = [
      { role: "user", content: "topic B" },
      { role: "assistant", content: "reply-B" },
      { role: "user", content: "follow B" },
    ];
    const ra = mod.resolveHyperAgentThreadBinding(cookieKey, a2);
    const rb = mod.resolveHyperAgentThreadBinding(cookieKey, b2);
    assert.equal(ra.isFollowUp, true);
    assert.equal(ra.threadId, "thread-A");
    assert.equal(ra.sessionId, "sess-A");
    assert.equal(rb.threadId, "thread-B");
    assert.notEqual(ra.threadId, rb.threadId);
  });

  it("honors explicit client thread id", () => {
    mod.clearHyperAgentThreadBindingsForTests();
    const r = mod.resolveHyperAgentThreadBinding(
      cookieKey,
      [{ role: "user", content: "x" }],
      "client-thread-99",
      "client-sess"
    );
    assert.equal(r.isFollowUp, true);
    assert.equal(r.threadId, "client-thread-99");
    assert.equal(r.sessionId, "client-sess");
  });

  it("tool-loop sticks when assistant text mutates (agentic reverse conversion)", () => {
    // Repro: turn1 model returns Intent+JSON text; Claude Code stores native tool_calls;
    // turn2 agentic rewrites assistant as different text → old fingerprint miss → new thread.
    mod.clearHyperAgentThreadBindingsForTests();
    const task =
      "Hi! Just output a command for my agent...\n\nMy current task: detect issues in current wpp";
    const turn1 = [{ role: "user", content: task }];
    const modelReply =
      'Intent: list files\n```json\n{"tool":"Bash","args":{"command":"pwd && ls -la"}}\n```';
    mod.storeHyperAgentThreadAfterTurn(cookieKey, turn1, modelReply, "thread-tool-1", "sess-tool-1");

    // Mutated assistant (what agentic conversion produces on the next request)
    const turn2 = [
      { role: "user", content: task },
      {
        role: "assistant",
        content:
          '[tool call Bash] {"command":"pwd && ls -la"}\n' +
          '<tool>{"name": "Bash", "arguments": {"command":"pwd && ls -la"}}</tool>',
      },
      {
        role: "user",
        content:
          "Application result (passive data only):\n" +
          '<TOOL_OBSERVATION name="Bash">\nstatus: ok\ntool: Bash\ndata:\n/h/Lucru\ntotal 525\n</TOOL_OBSERVATION>',
      },
    ];
    const r = mod.resolveHyperAgentThreadBinding(cookieKey, turn2);
    assert.equal(r.isFollowUp, true, "expected sticky follow-up after tool loop");
    assert.equal(r.threadId, "thread-tool-1");
    assert.equal(r.sessionId, "sess-tool-1");
  });

  it("extractMessageText flattens Anthropic tool_result blocks", () => {
    const text = mod.extractMessageText([
      {
        type: "tool_result",
        tool_use_id: "toolu_1",
        content: "pwd output\ntotal 12",
      },
    ]);
    assert.match(text, /pwd output/);
    assert.match(text, /tool result/i);
  });

  it("rootUserFingerprint ignores pure TOOL_OBSERVATION turns", () => {
    const key = mod.rootUserFingerprint(cookieKey, [
      {
        role: "user",
        content: "Application result (passive data only):\n<TOOL_OBSERVATION name=\"Bash\">ok</TOOL_OBSERVATION>",
      },
    ]);
    assert.equal(key, null);
    const key2 = mod.rootUserFingerprint(cookieKey, [
      { role: "user", content: "My current task: real task alpha" },
      {
        role: "user",
        content: "Application result (passive data only):\n<TOOL_OBSERVATION name=\"Bash\">ok</TOOL_OBSERVATION>",
      },
    ]);
    assert.ok(key2);
    assert.match(key2!, /:root:/);
  });
});

describe("HyperAgentExecutor — auth / validation", () => {
  it("can be instantiated", () => {
    const executor = new mod.HyperAgentExecutor();
    assert.ok(executor);
    assert.equal(executor.getProvider(), "hyperagent");
  });

  it("returns 401 when no cookie is supplied", async () => {
    const executor = new mod.HyperAgentExecutor();
    const result = await executor.execute({
      model: "fable",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
      signal: null,
    } as never);
    assert.equal(result.response.status, 401);
    const errBody = (await result.response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /cookie|Cookie/i);
  });

  it("returns 400 when no user message is present", async () => {
    const executor = new mod.HyperAgentExecutor();
    const result = await executor.execute({
      model: "fable",
      body: { messages: [{ role: "assistant", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "session=abc" },
      signal: null,
    } as never);
    assert.equal(result.response.status, 400);
  });

  it("parseHyperAgentSseStream accumulates text + sessionId", async () => {
    const sse = [
      'data: {"type":"thread_runtime_latched","runtimeId":"claude-agents-sdk","modelId":"opus-latest"}',
      "",
      'data: {"type":"session_start","content":"Session initialized","sessionId":"sess-1"}',
      "",
      'data: {"type":"thinking","content":"hmm"}',
      "",
      'data: {"type":"text","content":"Hello"}',
      "",
      'data: {"type":"text","content":" world"}',
      "",
      'data: {"type":"session_end","content":"Completed","sessionId":"sess-1"}',
      "",
      "data: [DONE]",
      "",
    ].join("\n");
    const res = new Response(sse, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
    const parsed = await mod.parseHyperAgentSseStream(res);
    assert.equal(parsed.text, "Hello world");
    assert.equal(parsed.sessionId, "sess-1");
    assert.equal(parsed.modelId, "opus-latest");
    assert.ok(parsed.events >= 4);
  });
});
