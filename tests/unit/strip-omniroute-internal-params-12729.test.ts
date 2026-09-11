import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { stripInternalBodyFields } from "../../open-sse/config/cliFingerprints.ts";

// Issue #12729: since 3.8.50, the context-relay / universal-handoff summary
// bodies built by open-sse/services/contextHandoff.ts carry the internal
// `_omnirouteSkipContextRelay` / `_omnirouteInternalRequest` flags, and a
// client can also send `_omnirouteSkipUniversalHandoff`. The routing layer
// (chat.ts, combo.ts) reads them before dispatch, but they were never removed
// from the payload sent upstream — strict OpenAI-compatible providers (NVIDIA
// NIM, Groq) reject them with HTTP 400 "Unsupported parameter(s)", wasting one
// upstream call per combo step.

test("stripInternalBodyFields removes context-relay / handoff flags", () => {
  const body: Record<string, unknown> = {
    model: "test-model",
    messages: [{ role: "user", content: "hi" }],
    stream: false,
    _omnirouteSkipContextRelay: true,
    _omnirouteInternalRequest: "context-handoff",
    _omnirouteSkipUniversalHandoff: true,
  };

  stripInternalBodyFields(body);

  assert.equal("_omnirouteSkipContextRelay" in body, false);
  assert.equal("_omnirouteInternalRequest" in body, false);
  assert.equal("_omnirouteSkipUniversalHandoff" in body, false);
  // Legit request fields survive the strip.
  assert.equal(body.model, "test-model");
  assert.equal(body.stream, false);
  assert.deepEqual(body.messages, [{ role: "user", content: "hi" }]);
});

test("DefaultExecutor never serializes _omniroute* flags upstream", async () => {
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
      response.end(
        JSON.stringify({
          id: "chatcmpl_test",
          object: "chat.completion",
          choices: [
            { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");

  try {
    const executor = new DefaultExecutor("nvidia");
    const result = await executor.execute({
      model: "meta/llama-3.1-8b-instruct",
      body: {
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: "hi" }],
        stream: false,
        _omnirouteSkipContextRelay: true,
        _omnirouteInternalRequest: "context-handoff",
        _omnirouteSkipUniversalHandoff: true,
      },
      stream: false,
      credentials: {
        apiKey: "test-key",
        providerSpecificData: {
          baseUrl: `http://127.0.0.1:${address.port}/v1`,
        },
      },
    });
    assert.equal(result.response.status, 200);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }

  assert.ok(capturedBody);
  assert.equal(capturedBody._omnirouteSkipContextRelay, undefined);
  assert.equal(capturedBody._omnirouteInternalRequest, undefined);
  assert.equal(capturedBody._omnirouteSkipUniversalHandoff, undefined);
  // The rest of the request still reaches upstream untouched.
  assert.equal(capturedBody.model, "meta/llama-3.1-8b-instruct");
  assert.equal(capturedBody.stream, false);
  assert.deepEqual(capturedBody.messages, [{ role: "user", content: "hi" }]);
});
