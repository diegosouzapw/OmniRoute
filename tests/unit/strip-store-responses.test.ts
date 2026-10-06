import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { stripStore } from "../../open-sse/handlers/chatCore/agentRouterProtocol.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const COMPATIBLE_PROVIDER = "openai-compatible-responses-test";

test("stripStore forces store=false for stateless OpenAI-compatible Responses requests", () => {
  for (const initialStore of [undefined, false, true]) {
    const body: Record<string, unknown> = {};
    if (initialStore !== undefined) body.store = initialStore;

    stripStore(body, COMPATIBLE_PROVIDER, FORMATS.OPENAI_RESPONSES, {});

    assert.equal(body.store, false);
  }
});

test("stripStore preserves client store values for opted-in OpenAI-compatible Responses requests", () => {
  for (const initialStore of [false, true]) {
    const body: Record<string, unknown> = { store: initialStore };

    stripStore(body, COMPATIBLE_PROVIDER, FORMATS.OPENAI_RESPONSES, {
      openaiStoreEnabled: true,
    });

    assert.equal(body.store, initialStore);
  }

  const omitted: Record<string, unknown> = {};
  stripStore(omitted, COMPATIBLE_PROVIDER, FORMATS.OPENAI_RESPONSES, {
    openaiStoreEnabled: true,
  });
  assert.equal("store" in omitted, false);
});

test("stripStore keeps existing OpenAI and AgentRouter behavior", () => {
  const cases = [
    { provider: "openai", targetFormat: FORMATS.OPENAI, expected: true },
    { provider: "openai", targetFormat: FORMATS.OPENAI_RESPONSES, expected: true },
    { provider: "agentrouter", targetFormat: FORMATS.OPENAI_RESPONSES, expected: true },
    { provider: "agentrouter", targetFormat: FORMATS.OPENAI, expected: false },
  ];

  for (const { provider, targetFormat, expected } of cases) {
    const body: Record<string, unknown> = { store: true };
    stripStore(body, provider, targetFormat, {});
    assert.equal("store" in body, expected, `${provider}/${targetFormat}`);
  }
});

test("stripStore removes store outside OpenAI-compatible Responses targets", () => {
  const cases = [
    { provider: COMPATIBLE_PROVIDER, targetFormat: FORMATS.OPENAI },
    { provider: "anthropic", targetFormat: FORMATS.CLAUDE },
  ];

  for (const { provider, targetFormat } of cases) {
    const body: Record<string, unknown> = { store: false };
    stripStore(body, provider, targetFormat, { openaiStoreEnabled: true });
    assert.equal("store" in body, false, `${provider}/${targetFormat}`);
  }
});

test("DefaultExecutor never serializes native passthrough markers upstream", async () => {
  let capturedBody: Record<string, unknown> | null = null;
  const server = createServer((request, response) => {
    let rawBody = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      rawBody += chunk;
    });
    request.on("end", () => {
      capturedBody = JSON.parse(rawBody);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ id: "resp_test", object: "response", output: [] }));
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");

  try {
    const executor = new DefaultExecutor(COMPATIBLE_PROVIDER);
    await executor.execute({
      model: "gpt-5.6-test",
      body: {
        model: "gpt-5.6-test",
        input: "hi",
        store: false,
        _nativeOpenAICompatibleResponsesPassthrough: true,
        _nativeCodexPassthrough: true,
        _nativeXaiResponsesPassthrough: true,
        _omnirouteResponsesStore: false,
      },
      stream: false,
      credentials: {
        apiKey: "test-key",
        providerSpecificData: {
          apiType: "responses",
          baseUrl: `http://127.0.0.1:${address.port}/v1`,
        },
      },
    });
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }

  assert.ok(capturedBody);
  assert.equal(capturedBody.store, false);
  assert.equal(capturedBody._nativeOpenAICompatibleResponsesPassthrough, undefined);
  assert.equal(capturedBody._nativeCodexPassthrough, undefined);
  assert.equal(capturedBody._nativeXaiResponsesPassthrough, undefined);
  assert.equal(capturedBody._omnirouteResponsesStore, undefined);
});
