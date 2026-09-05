import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-rate-limit-body");
const { BaseExecutor, buildRequest, handleChat, resetStorage, seedConnection, settingsDb } =
  harness;

const rateLimitManager = await import("../../../open-sse/services/rateLimitManager.ts");

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await rateLimitManager.__resetRateLimitManagerForTests();
  await resetStorage();
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
});

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await resetStorage();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  await harness.cleanup();
});

test("handleChat applies body-derived retry-after to the runtime limiter", async () => {
  const connection = await seedConnection("openai", { apiKey: "sk-openai-body-retry" });

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          message: "Rate limit exceeded. Please retry after 20s.",
        },
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "Trigger 429 from body retry-after" }],
      },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 429);
  assert.match(body.error.message, /retry after 20s/i);

  const limiterState = await rateLimitManager.__getLimiterStateForTests(
    "openai",
    connection.id,
    "gpt-4.1"
  );
  assert.ok(limiterState, "expected limiter state to exist for the active connection");
  // #9604's rolling-lease gate (reservoir: null) was clobbered by the #9041 merge;
  // the underlying Bottleneck heartbeat defect it worked around is now fixed at the
  // root (bottleneckPatch.ts, base-reds round 3 #9985), so RPM enforcement is back
  // on the reservoir: the body-derived 429 lock must leave it drained (0), never
  // refilled-and-forgotten (the pre-patch heartbeat bug) nor untracked.
  assert.equal(
    limiterState.reservoir,
    0,
    "body-derived retry-after must drain the runtime reservoir"
  );
});

test("handleChat tolerates non-JSON rate-limit bodies without breaking fallback flow", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-plain-429" });

  globalThis.fetch = async () =>
    new Response("rate limit exceeded but body is not json", {
      status: 429,
      headers: { "Content-Type": "text/plain" },
    });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "Trigger plain text 429" }],
      },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 429);
  assert.match(body.error.message, /rate limit exceeded but body is not json/i);
});
