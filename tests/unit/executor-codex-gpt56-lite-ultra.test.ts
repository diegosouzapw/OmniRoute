import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

// Issue #7821: enforceCodexResponsesLiteParallelToolCalls() used to have zero model
// awareness — it force-set parallel_tool_calls:false for EVERY model when Responses
// Lite was detected, including gpt-5.6-sol/-terra at "ultra" effort (and gpt-5.6-luna
// at "max"), whose delegation-to-sub-agents capability depends on parallel_tool_calls
// staying enabled. This collided with the effort-clamp comment near clampEffort()
// ("Ultra coordinates delegation in Codex clients") and is why GPT-5.6 was reported
// unusable through the stock Codex CLI/App (which enables Responses Lite by default)
// while GPT-5.5 (no delegation tier) was unaffected.
//
// Covers the interaction (lite marker + delegation-dependent model/effort together),
// not just each behavior in isolation — that interaction was the actual blind spot.

async function runLiteRequest(model: string): Promise<Record<string, unknown>[]> {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url, init) => {
    capturedBodies.push(JSON.parse(String(init?.body || "{}")));
    return new Response(JSON.stringify({ id: "resp_lite", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const body = {
    _nativeCodexPassthrough: true,
    model,
    input: [],
    parallel_tool_calls: true,
  };

  try {
    await executor.execute({
      model,
      body,
      stream: true,
      credentials: { accessToken: "codex-token" },
      clientHeaders: { "X-OpenAI-Internal-Codex-Responses-Lite": "true" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  return capturedBodies;
}

test("Responses Lite must not strip parallel_tool_calls for GPT-5.6 sol ultra-tier delegation", async () => {
  const capturedBodies = await runLiteRequest("gpt-5.6-sol-ultra");
  assert.equal(
    capturedBodies[0].parallel_tool_calls,
    true,
    "Responses Lite stripped parallel_tool_calls for an ultra-tier GPT-5.6 delegation " +
      "request — this breaks sub-agent delegation and is the root cause of #7821"
  );
});

test("Responses Lite must not strip parallel_tool_calls for GPT-5.6 terra ultra-tier delegation", async () => {
  const capturedBodies = await runLiteRequest("gpt-5.6-terra-ultra");
  assert.equal(capturedBodies[0].parallel_tool_calls, true);
});

test("Responses Lite must not strip parallel_tool_calls for GPT-5.6 luna max-tier delegation", async () => {
  const capturedBodies = await runLiteRequest("gpt-5.6-luna-max");
  assert.equal(capturedBodies[0].parallel_tool_calls, true);
});

test("Responses Lite still forces parallel_tool_calls:false for non-delegation GPT-5.5", async () => {
  const capturedBodies = await runLiteRequest("gpt-5.5");
  assert.equal(
    capturedBodies[0].parallel_tool_calls,
    false,
    "GPT-5.5 has no delegation tier — Responses Lite behavior for it must be unchanged"
  );
});

test("Responses Lite still forces parallel_tool_calls:false for GPT-5.6 sol at non-ultra effort", async () => {
  const capturedBodies = await runLiteRequest("gpt-5.6-sol-high");
  assert.equal(
    capturedBodies[0].parallel_tool_calls,
    false,
    "Non-ultra GPT-5.6 effort tiers have no delegation dependency — must stay forced off"
  );
});
