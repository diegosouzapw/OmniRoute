/**
 * Regression tests for the vision-bridge describe call against OmniRoute's own
 * self-loop (or any OpenAI-compatible endpoint that defaults to SSE).
 *
 * Root cause (observed with `cmd/xiaomi/mimo-v2.5`):
 *   callVisionModelSingle() sent no `stream` field and no `Accept` header, so
 *   OmniRoute's resolveStreamFlag() defaulted the request to `stream=true` and
 *   returned a `data: {...}` SSE stream. response.json() then threw
 *   `Unexpected token 'd'` ("data: {...} is not valid JSON"), the description
 *   became `null`, and (per #4012) the raw image was preserved instead of being
 *   replaced with text — so nothing was injected into the text-only model.
 *
 * Fix covered here:
 *   1. The describe request now sends `stream: false` + `Accept: application/json`
 *   2. readVisionResponseBody() tolerantly parses JSON → SSE → diagnostics
 *      envelope, so forceStream providers still work
 *   3. extractOpenAICompatibleContent() falls back to `reasoning_content` when
 *      `content` is null (reasoning models that exhaust max_tokens)
 *
 * Run: node --import tsx/esm --test tests/unit/guardrails/vision-bridge-sse-and-reasoning.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  callVisionModel as callVisionModelRaw,
  type VisionModelConfig,
} from "@/lib/guardrails/visionBridgeHelpers";

// Inject the router's credential-check seam as INDETERMINATE (null): the fixed
// model is used as-is and selection never touches the live connections DB — on a
// clean box the suite otherwise dies with "No vision-capable provider connected",
// and on a dev box auto-selection may swap the model under the assertions.
const callVisionModel = (img: string, config: VisionModelConfig) =>
  callVisionModelRaw(img, config, undefined, undefined, {
    hasUsableCredentials: async () => null,
  });

const originalFetch = globalThis.fetch;

function baseConfig(overrides: Partial<VisionModelConfig> = {}): VisionModelConfig {
  return {
    model: "cmd/xiaomi/mimo-v2.5",
    prompt: "Describe this image",
    timeoutMs: 30000,
    maxImages: 10,
    ...overrides,
  };
}

// Data URI for a 1x1 transparent PNG — avoids any network fetch on the describe path.
const TINY_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

test("vision-bridge: describe request sends stream:false + Accept application/json", async () => {
  let capturedBody: Record<string, unknown> = {};
  let capturedHeaders: Record<string, string> = {};

  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [{ message: { content: "A black labrador puppy" } }],
    }),
  };

  globalThis.fetch = async (_url: URL | RequestInfo, init?: RequestInit) => {
    if (init?.body) capturedBody = JSON.parse(init.body as string);
    capturedHeaders = (init?.headers as Record<string, string>) ?? {};
    return mockResponse as unknown as Response;
  };

  try {
    await callVisionModel(TINY_PNG, baseConfig());

    // Root-cause regression: explicit non-stream so the self-loop returns JSON.
    assert.strictEqual(capturedBody.stream, false);
    assert.strictEqual(capturedHeaders["Accept"], "application/json");
    // Self-loop uses the full provider-prefixed model id for cmd/* models.
    assert.strictEqual(capturedBody.model, "cmd/xiaomi/mimo-v2.5");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: parses an SSE body (data: lines) instead of throwing", async () => {
  // The exact failure mode from the log: response.json() throws
  // `Unexpected token 'd'` because the body is `data: {...}` SSE, not JSON.
  const sseBody = [
    'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"A black "}}]}',
    "",
    'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"labrador puppy"}}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const mockResponse = {
    ok: true,
    json: async () => {
      throw new SyntaxError('Unexpected token \'d\', "data: {"id"... is not valid JSON');
    },
    text: async () => sseBody,
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const result = await callVisionModel(TINY_PNG, baseConfig());
    assert.strictEqual(result, "A black labrador puppy");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: falls back to reasoning_content when content is null", async () => {
  // mimo-v2.5 is a reasoning model: with max_tokens: 300 it exhausted tokens on
  // chain-of-thought and returned `content: null` + a complete analysis in
  // `reasoning_content`. extractOpenAICompatibleContent must use it.
  const reasoningText =
    "The image shows a black Labrador puppy looking up at the camera with soulful eyes, " +
    "sitting on a rustic wooden floor.";

  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [
        {
          message: {
            content: null,
            reasoning_content: reasoningText,
          },
        },
      ],
    }),
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const result = await callVisionModel(TINY_PNG, baseConfig());
    assert.strictEqual(result, reasoningText);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: falls back to plain `reasoning` when content is null (opencode gateway)", async () => {
  // opencode-routed gateways name the reasoning field `reasoning` (not
  // `reasoning_content`) — e.g. opencode/mimo-v2.5-free (#6623 / #10809).
  // extractOpenAICompatibleContent must use it as the description.
  const reasoningText =
    "The image shows a young black Labrador puppy with golden-brown eyes sitting on weathered wooden planks.";
  const mockResponse = {
    ok: true,
    json: async () => ({
      choices: [
        {
          finish_reason: "length",
          message: {
            content: null,
            reasoning: reasoningText,
          },
        },
      ],
    }),
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const result = await callVisionModel(TINY_PNG, baseConfig());
    assert.strictEqual(result, reasoningText);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: parses SSE reasoning_content deltas when content is empty", async () => {
  const reasoningPart1 = "The user wants a concise description of an image. ";
  const reasoningPart2 = "A black Labrador puppy gazes up at the camera.";
  const sseBody = [
    `data: {"id":"chatcmpl-2","choices":[{"index":0,"delta":{"reasoning_content":${JSON.stringify(
      reasoningPart1
    )}}}]}`,
    "",
    `data: {"id":"chatcmpl-2","choices":[{"index":0,"delta":{"reasoning_content":${JSON.stringify(
      reasoningPart2
    )}}}]}`,
    "",
    'data: {"id":"chatcmpl-2","choices":[{"index":0,"delta":{},"finish_reason":"length"}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const mockResponse = {
    ok: true,
    json: async () => {
      throw new SyntaxError("Unexpected token 'd'");
    },
    text: async () => sseBody,
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const result = await callVisionModel(TINY_PNG, baseConfig());
    assert.strictEqual(result, reasoningPart1 + reasoningPart2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: parses the diagnostics envelope { _streamed, summary }", async () => {
  // Some OmniRoute capture paths wrap the provider response in
  // { _streamed: true, _format: "sse-json", summary: {...} }.
  const mockResponse = {
    ok: true,
    json: async () => ({
      _streamed: true,
      _format: "sse-json",
      summary: {
        id: "chatcmpl-3",
        choices: [{ message: { content: "Envelope description" } }],
      },
    }),
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    const result = await callVisionModel(TINY_PNG, baseConfig());
    assert.strictEqual(result, "Envelope description");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: surfaces upstream error from an error-only SSE body", async () => {
  // `data: {"error":{"message":"..."}}` with no choices — the real upstream
  // message must be surfaced, not a generic "empty or invalid response".
  const mockResponse = {
    ok: true,
    json: async () => {
      throw new SyntaxError("not json");
    },
    text: async () => 'data: {"error":{"message":"upstream 401 unauthorized"}}\n',
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    await assert.rejects(
      async () => await callVisionModel(TINY_PNG, baseConfig()),
      /upstream 401 unauthorized/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("vision-bridge: still throws when SSE body has no usable content", async () => {
  const mockResponse = {
    ok: true,
    json: async () => {
      throw new SyntaxError("not json");
    },
    text: async () => "data: [DONE]\n",
  };

  globalThis.fetch = async () => mockResponse as unknown as Response;

  try {
    await assert.rejects(
      async () => await callVisionModel(TINY_PNG, baseConfig()),
      /empty or invalid|Vision API error/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
