import test from "node:test";
import assert from "node:assert/strict";

import { normalizeHeaders } from "../../open-sse/utils/headers.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

/**
 * Guard for the same-provider cascade (issue #3200): when a combo has SEVERAL
 * targets from the same provider and that provider fails, the combo must NOT
 * cascade through every same-provider target before falling back.
 *
 * Finding (TDD investigation of PRs #3145 / #3169, 2026-06): the EXISTING
 * connection-cooldown already prevents this. After the FIRST same-provider
 * failure (404 here, also 5xx) the connection is marked unavailable, so every
 * remaining same-provider target is pre-screened out before dispatch — the
 * provider is hit exactly ONCE, then the combo falls back to a different
 * provider. This is stronger than PR #3145's provider-level counter (which would
 * try the provider twice before short-circuiting) and does not need the parallel
 * cooldown cache PR #3169 proposed. This test locks that behavior in so a future
 * change can't silently regress the cascade guard.
 */
const harness = await createChatPipelineHarness("combo-same-provider-cascade");
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

test("combo hits a failing provider only once before falling back across same-provider targets (#3200)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-cascade" });
  await seedConnection("claude", { apiKey: "sk-claude-cascade" });
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });

  // Three openai targets followed by one claude target. All openai models route
  // to the single seeded openai connection (same provider string).
  await combosDb.createCombo({
    name: "same-provider-cascade-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: [
      "openai/o3-mini",
      "openai/o1-mini",
      "openai/gpt-4.1-mini",
      "claude/claude-3-5-sonnet-20241022",
    ],
  });

  let openaiCalls = 0;
  let claudeCalls = 0;

  globalThis.fetch = async (_url, init = {}) => {
    const headers = normalizeHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-cascade") {
      openaiCalls += 1;
      // 404 → per-model lockout (NOT whole-connection cooldown), so the openai
      // connection stays usable and the next same-provider model is attempted.
      // This is the cascade #3200 describes; #3145's consecutive-failure tracking
      // is what cuts it short (5xx is already handled by connection cooldown).
      return new Response(JSON.stringify({ error: { message: "model not found" } }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-claude-cascade" ||
      authHeader === "Bearer sk-claude-cascade"
    ) {
      claudeCalls += 1;
      return buildClaudeResponse("claude handled the fallback");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "same-provider-cascade-combo",
        stream: false,
        messages: [{ role: "user", content: "cascade request" }],
      },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "claude handled the fallback");
  // The connection cools down on the first failure, so the 2nd and 3rd openai
  // targets are pre-screened out — the provider is dispatched to exactly once.
  assert.equal(
    openaiCalls,
    1,
    `expected the failing provider to be hit once then short-circuited by connection cooldown, got ${openaiCalls} calls`
  );
  assert.equal(claudeCalls, 1, "claude must serve the request after the cascade is cut short");
});
