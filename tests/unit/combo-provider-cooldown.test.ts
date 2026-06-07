import test from "node:test";
import assert from "node:assert/strict";

import { normalizeHeaders } from "../../open-sse/utils/headers.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("combo-provider-cooldown");
const {
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const { preScreenTargets } = await import(
  "../../open-sse/services/combo.ts"
);
const { getCircuitBreaker } = await import(
  "../../src/shared/utils/circuitBreaker.ts"
);

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("combo failover skips the cooled provider target on the next request", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-combo-cooldown",
  });
  await seedConnection("claude", {
    apiKey: "sk-claude-combo-cooldown",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  await combosDb.createCombo({
    name: "provider-cooldown-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    // openai/gpt-4o-mini is now ambiguous (multi-provider); use o3-mini which resolves unambiguously to openai
    models: ["openai/o3-mini", "claude/claude-3-5-sonnet-20241022"],
  });

  let openaiCalls = 0;
  let claudeCalls = 0;

  globalThis.fetch = async (_url, init = {}) => {
    const headers = normalizeHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-combo-cooldown") {
      openaiCalls += 1;
      return new Response(
        JSON.stringify({ error: { message: "provider temporarily unavailable" } }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (
      apiKeyHeader === "sk-claude-combo-cooldown" ||
      authHeader === "Bearer sk-claude-combo-cooldown"
    ) {
      claudeCalls += 1;
      return buildClaudeResponse("claude fallback handled it");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const firstResponse = await handleChat(
    buildRequest({
      body: {
        model: "provider-cooldown-combo",
        stream: false,
        messages: [{ role: "user", content: "first combo request" }],
      },
    })
  );
  const firstBody = (await firstResponse.json()) as any;

  const secondResponse = await handleChat(
    buildRequest({
      body: {
        model: "provider-cooldown-combo",
        stream: false,
        messages: [{ role: "user", content: "second combo request" }],
      },
    })
  );
  const secondBody = (await secondResponse.json()) as any;

  assert.equal(firstResponse.status, 200);
  assert.equal(secondResponse.status, 200);
  assert.equal(firstBody.choices[0].message.content, "claude fallback handled it");
  assert.equal(secondBody.choices[0].message.content, "claude fallback handled it");
  assert.equal(openaiCalls, 1);
  assert.equal(claudeCalls, 2);
});

test("pre-screen marks target unavailable when circuit breaker is OPEN", async () => {
  const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 60_000 });
  try {
    await breaker.execute(async () => {
      throw new Error("simulated failure");
    });
  } catch {
    // expected
  }

  const targets = [
    {
      kind: "model" as const,
      stepId: "step-1",
      executionKey: "openai/gpt-4o",
      modelStr: "openai/gpt-4o",
      provider: "openai",
      providerId: "conn-1",
      connectionId: "conn-1",
      weight: 1,
      label: null,
    },
    {
      kind: "model" as const,
      stepId: "step-2",
      executionKey: "claude/claude-3-5-sonnet-20241022",
      modelStr: "claude/claude-3-5-sonnet-20241022",
      provider: "claude",
      providerId: "conn-2",
      connectionId: "conn-2",
      weight: 1,
      label: null,
    },
  ];

  const results = await preScreenTargets(targets as any);

  const openaiResult = results.get("openai/gpt-4o");
  assert.ok(openaiResult, "openai target should have a pre-screen result");
  assert.equal(openaiResult.available, false, "open-circuit-breaker target should be unavailable");

  const claudeResult = results.get("claude/claude-3-5-sonnet-20241022");
  assert.ok(claudeResult, "claude target should have a pre-screen result");
  assert.equal(claudeResult.available, true, "closed-circuit-breaker target should be available");
});
