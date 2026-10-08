import test from "node:test";
import assert from "node:assert/strict";

import { normalizeHeaders } from "../../open-sse/utils/headers.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

/**
 * #15633 guard (companion of #3200's combo-same-provider-cascade.test.ts): a 404
 * whose body names a missing MODEL locks only that model, so the connection stays
 * usable for the provider's other models. In a combo that means each same-provider
 * model may be attempted — but a locked model must never be re-dispatched, and the
 * combo must still fall back to the next provider and serve the request.
 */
const harness = await createChatPipelineHarness("combo-same-provider-model-404-15633");
const {
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("model-scoped 404 locks only the model: each same-provider model is dispatched at most once, then the combo falls back (#15633)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-cascade" });
  await seedConnection("claude", { apiKey: "sk-claude-cascade" });
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });

  await combosDb.createCombo({
    name: "same-provider-model-404-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/o3-mini", "openai/o1-mini", "openai/gpt-4.1-mini", "claude/claude-sonnet-4.6"],
  });

  const openaiModels: string[] = [];
  let claudeCalls = 0;

  globalThis.fetch = async (_url, init = {}) => {
    const headers = normalizeHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-cascade") {
      const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
      openaiModels.push(String(sent.model));
      return new Response(
        JSON.stringify({
          error: { message: "The model does not exist", code: "model_not_found" },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (apiKeyHeader === "sk-claude-cascade" || authHeader === "Bearer sk-claude-cascade") {
      claudeCalls += 1;
      return buildClaudeResponse("claude handled the fallback");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "same-provider-model-404-combo",
        stream: false,
        messages: [{ role: "user", content: "model 404 request" }],
      },
    })
  );
  const body = (await response.json()) as { choices: Array<{ message: { content: string } }> };

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "claude handled the fallback");
  assert.ok(openaiModels.length >= 1, "the first openai target must be attempted");
  assert.ok(
    openaiModels.length <= 3,
    `openai dispatched ${openaiModels.length} times for 3 targets`
  );
  assert.equal(
    new Set(openaiModels).size,
    openaiModels.length,
    `a model-locked target was re-dispatched: ${openaiModels.join(", ")}`
  );
  assert.equal(claudeCalls, 1, "claude must serve the request after the openai targets fail");
});
