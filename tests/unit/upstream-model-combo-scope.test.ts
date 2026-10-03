import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";
import { isProviderInCooldown } from "../../open-sse/services/providerCooldownTracker.ts";
import { getUpstreamModelCooldown } from "../../open-sse/services/upstreamModelCooldown.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker.ts";
const harness = await createChatPipelineHarness("upstream-model-combo-scope");
test.after(async () => harness.cleanup());
test("an overloaded OpenCode model falls back to its sibling without cooling the account", async () => {
  await harness.resetStorage();
  const account = await harness.seedConnection("opencode", { apiKey: "test-key" });
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    resilienceSettings: {
      providerCooldown: { enabled: true, minRetryCooldownMs: 1000, maxRetryCooldownMs: 10000 },
    },
  });
  await harness.combosDb.createCombo({
    name: "model-scope-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["oc/nemotron-3-ultra-free", "oc/big-pickle"],
  });
  let failedModelCalls = 0,
    siblingCalls = 0;
  globalThis.fetch = async (_url, init = {}) => {
    const body = JSON.parse(String(init.body));
    if (body.model === "nemotron-3-ultra-free") {
      failedModelCalls++;
      return new Response(
        JSON.stringify({
          error: { message: "Upstream error from Nvidia: Service temporarily overloaded" },
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
    siblingCalls++;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-test",
        object: "chat.completion",
        model: "big-pickle",
        choices: [
          { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
  const first = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "model-scope-combo",
        stream: false,
        messages: [{ role: "user", content: "first" }],
      },
    })
  );
  assert.equal(first.status, 200);
  assert.equal((await first.json()).choices[0].message.content, "OK");
  const previousFailures = failedModelCalls;
  assert.ok(previousFailures > 0);
  assert.ok(getUpstreamModelCooldown("opencode", "nemotron-3-ultra-free"));
  const second = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "model-scope-combo",
        stream: false,
        messages: [{ role: "user", content: "second" }],
      },
    })
  );
  assert.equal(second.status, 200);
  assert.equal((await second.json()).choices[0].message.content, "OK");
  assert.equal(failedModelCalls, previousFailures);
  assert.equal(siblingCalls, 2);
  assert.equal(isProviderInCooldown("opencode", account.id), false);
  assert.equal(getCircuitBreaker("opencode").getStatus().state, "CLOSED");
});
