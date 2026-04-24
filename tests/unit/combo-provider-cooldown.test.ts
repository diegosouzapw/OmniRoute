import test from "node:test";
import assert from "node:assert/strict";

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

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

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
    models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
  });

  let openaiCalls = 0;
  let claudeCalls = 0;

  globalThis.fetch = async (_url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
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
