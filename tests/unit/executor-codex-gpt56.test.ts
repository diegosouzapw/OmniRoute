import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";

test("Chat-to-Codex translation preserves max only for GPT-5.6", () => {
  const executor = new CodexExecutor();
  const cases = [
    { model: "gpt-5.6-sol", expectedEffort: "max" },
    { model: "gpt-5.6-terra", expectedEffort: "max" },
    { model: "gpt-5.6-luna", expectedEffort: "max" },
    { model: "gpt-5.5", expectedEffort: "xhigh" },
  ];

  for (const { model, expectedEffort } of cases) {
    const translated = openaiToOpenAIResponsesRequest(
      model,
      {
        model,
        messages: [{ role: "user", content: "test" }],
        reasoning_effort: "max",
      },
      true,
      {}
    );
    const result = executor.transformRequest(model, translated, true, {
      requestEndpointPath: "/chat/completions",
    });

    assert.equal(result.model, model);
    assert.equal(result.reasoning.effort, expectedEffort, model);
    assert.equal(result.reasoning_effort, undefined);
  }
});

test("CodexExecutor.transformRequest preserves max effort for GPT-5.6", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-sol",
    {
      model: "gpt-5.6-sol",
      input: [],
      reasoning_effort: "max",
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.model, "gpt-5.6-sol");
  assert.equal(result.reasoning.effort, "max");
  assert.equal(result.reasoning_effort, undefined);
});

test("CodexExecutor.transformRequest maps GPT-5.6 ultra aliases to max wire effort", () => {
  const executor = new CodexExecutor();

  for (const model of ["gpt-5.6-sol-ultra", "gpt-5.6-terra-ultra"]) {
    const result = executor.transformRequest(model, { model, input: [] }, false, {
      requestEndpointPath: "/responses",
    });

    assert.equal(result.model, model.replace(/-ultra$/, ""));
    assert.equal(result.reasoning.effort, "max");
  }
});

test("CodexExecutor.transformRequest clamps Luna ultra requests to its max effort", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6-luna",
    {
      model: "gpt-5.6-luna",
      input: [],
      reasoning_effort: "ultra",
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.model, "gpt-5.6-luna");
  assert.equal(result.reasoning.effort, "max");
});

test("CodexExecutor.execute disables parallel tool calls for Responses Lite markers", async () => {
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

  const headerBody = {
    _nativeCodexPassthrough: true,
    model: "gpt-5.6-sol",
    input: [],
    parallel_tool_calls: true,
  };
  const metadataBody = {
    _nativeCodexPassthrough: true,
    model: "gpt-5.6-sol",
    input: [],
    client_metadata: {
      ws_request_header_x_openai_internal_codex_responses_lite: "true",
    },
  };
  const standardBody = {
    _nativeCodexPassthrough: true,
    model: "gpt-5.6-sol",
    input: [],
    parallel_tool_calls: true,
  };

  try {
    for (const request of [
      {
        body: headerBody,
        clientHeaders: { "X-OpenAI-Internal-Codex-Responses-Lite": "true" },
      },
      { body: metadataBody },
      { body: standardBody },
    ]) {
      const result = await executor.execute({
        model: "gpt-5.6-sol",
        body: request.body,
        stream: true,
        credentials: { accessToken: "codex-token" },
        clientHeaders: request.clientHeaders,
      });
      assert.equal(result.response.status, 200);
    }

    assert.equal(capturedBodies[0].parallel_tool_calls, false);
    assert.equal(headerBody.parallel_tool_calls, true);
    assert.equal(capturedBodies[1].parallel_tool_calls, false);
    assert.equal(metadataBody.parallel_tool_calls, undefined);
    assert.equal(capturedBodies[2].parallel_tool_calls, true);
    assert.equal(standardBody.parallel_tool_calls, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
