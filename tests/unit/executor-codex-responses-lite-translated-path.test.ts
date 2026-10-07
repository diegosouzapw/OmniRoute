import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

// Issue #11707: "X-OpenAI-Internal-Codex-Responses-Lite requires parallel_tool_calls
// to be false" persists even though #7171/#7821 already force
// parallel_tool_calls:false in enforceCodexResponsesLiteParallelToolCalls() at the
// top of CodexExecutor.execute().
//
// Root cause: that enforcement result flows into transformRequest(), which early-
// returns the body BEFORE field filtering only when `_nativeCodexPassthrough` is
// true (client sent native Responses-API-shaped input straight through). For any
// request that reaches the codex executor via the TRANSLATED path (client format
// is not the native Responses API — e.g. Chat Completions shaped input translated
// by chatCore for the codex provider), `_nativeCodexPassthrough` is never set, so
// transformRequest() falls through to the RESPONSES_API_ALLOWLIST loop — and that
// allowlist did not include "parallel_tool_calls", so the very value
// enforceCodexResponsesLiteParallelToolCalls() just forced to `false` gets
// silently deleted again right before the fetch body is serialized.
//
// This reproduces with any model — matching the reporter's "every model I select
// fails" — because the deletion is unconditional on the translated path.

async function runLiteRequest(body: Record<string, unknown>): Promise<Record<string, unknown>[]> {
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

  try {
    await executor.execute({
      model: String(body.model),
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

test("#11707: Responses Lite parallel_tool_calls:false survives the TRANSLATED (non-native-passthrough) codex path", async () => {
  // No `_nativeCodexPassthrough` marker — this is how a request arrives when the
  // client's own format isn't detected as native OpenAI Responses (e.g. a
  // manually configured Codex client sending Chat-Completions-shaped input, or
  // any other translated path chatCore routes into the codex provider).
  const body = {
    model: "gpt-5",
    messages: [{ role: "user", content: "hi" }],
  };

  const capturedBodies = await runLiteRequest(body);

  assert.equal(
    capturedBodies[0].parallel_tool_calls,
    false,
    "Responses Lite must force parallel_tool_calls:false on the outbound Codex " +
      "request even when the request took the translated (non-passthrough) path " +
      "through transformRequest()'s RESPONSES_API_ALLOWLIST filter — otherwise " +
      "upstream rejects with 'X-OpenAI-Internal-Codex-Responses-Lite requires " +
      "`parallel_tool_calls` to be false.' (#11707)"
  );
});
