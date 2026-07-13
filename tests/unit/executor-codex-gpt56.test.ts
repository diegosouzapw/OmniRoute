import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor, usesCodexResponsesLiteInput } from "../../open-sse/executors/codex.ts";

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

test("GPT-5.6 Codex aliases use Responses-Lite while older models stay standard", () => {
  for (const model of [
    "gpt-5.6-sol",
    "gpt-5.6-terra-max",
    "gpt-5.6-luna-xhigh",
    "codex/gpt-5.6-sol-ultra",
    "cx/gpt-5.6-terra-low",
  ]) {
    assert.equal(usesCodexResponsesLiteInput(model), true, model);
  }
  assert.equal(usesCodexResponsesLiteInput("gpt-5.5-xhigh"), false);
  assert.equal(usesCodexResponsesLiteInput("gpt-5.1-codex-max"), false);
});

test("CodexExecutor.transformRequest sends GPT-5.6 assistant replay as Responses-Lite input", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "codex/gpt-5.6-sol-ultra",
    {
      _nativeCodexPassthrough: true,
      model: "codex/gpt-5.6-sol-ultra",
      client_metadata: { existing: "keep" },
      input: [
        {
          type: "message",
          role: "assistant",
          content: [
            {
              type: "output_text",
              text: "Previous answer",
              annotations: [],
              logprobs: [],
              obfuscation: "opaque",
            },
            { type: "input_image", image_url: "https://example.com/assistant.png" },
            { type: "scoped_content", scope: "conversation", content: "preserve" },
          ],
        },
      ],
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.model, "gpt-5.6-sol");
  assert.equal(result.reasoning.context, "all_turns");
  assert.deepEqual(result.input[0], {
    type: "message",
    role: "assistant",
    content: [
      { type: "input_text", text: "Previous answer" },
      { type: "input_image", image_url: "https://example.com/assistant.png" },
      { type: "scoped_content", scope: "conversation", content: "preserve" },
    ],
  });
  assert.equal(
    result.client_metadata.ws_request_header_x_openai_internal_codex_responses_lite,
    "true"
  );
});

test("CodexExecutor.buildHeaders marks GPT-5.6 requests as Responses-Lite", () => {
  const executor = new CodexExecutor();
  const gpt56Headers = executor.buildHeaders({}, true, null, "gpt-5.6-luna-max");
  const standardHeaders = executor.buildHeaders({}, true, null, "gpt-5.5-xhigh");

  assert.equal(gpt56Headers["x-openai-internal-codex-responses-lite"], "true");
  assert.equal(standardHeaders["x-openai-internal-codex-responses-lite"], undefined);
});

test("CodexExecutor.transformRequest keeps the standard assistant replay contract for GPT-5.5", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5-xhigh",
    {
      model: "gpt-5.5-xhigh",
      input: [
        {
          type: "message",
          role: "assistant",
          content: [{ type: "input_text", text: "Previous answer" }],
        },
      ],
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(result.input[0].content[0].type, "output_text");
  assert.equal(result.reasoning.context, undefined);
});

test("CodexExecutor.execute sends the Responses-Lite HTTP header for GPT-5.6", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Headers | null = null;

  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers as HeadersInit);
    return new Response(JSON.stringify({ id: "resp_gpt56", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gpt-5.6-sol",
      body: { model: "gpt-5.6-sol", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(result.response.status, 200);
    assert.equal(capturedHeaders?.get("x-openai-internal-codex-responses-lite"), "true");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
