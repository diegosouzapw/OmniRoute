import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";

const { privateKey: ociPrivateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { buildOciChatPayload, buildOciUrl, parseOciCredentialInput } =
  await import("../../open-sse/executors/oci.ts");

const ociApiKey = JSON.stringify({
  user: "ocid1.user.oc1..aaaa",
  fingerprint: "11:22:33:44",
  tenancy: "ocid1.tenancy.oc1..bbbb",
  compartmentId: "ocid1.compartment.oc1..cccc",
  privateKey: ociPrivateKey,
  region: "us-chicago-1",
});

test("OCI uses a specialized executor and normalizes chat endpoints", () => {
  assert.equal(hasSpecializedExecutor("oci"), true);
  assert.equal(getExecutor("oci").constructor.name, "OciExecutor");
  assert.equal(
    buildOciUrl("https://inference.generativeai.us-chicago-1.oci.oraclecloud.com"),
    "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/chat"
  );
  assert.equal(
    buildOciUrl(
      "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/chat"
    ),
    "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/chat"
  );
});

test("OCI parses JSON credentials and adapts generic and Cohere payloads", () => {
  const credentials = parseOciCredentialInput(ociApiKey, null);
  assert.ok(credentials);
  assert.equal(credentials?.region, "us-chicago-1");
  assert.equal(credentials?.compartmentId, "ocid1.compartment.oc1..cccc");

  const genericPayload = buildOciChatPayload(
    "meta.llama-3.1-70b-instruct",
    {
      model: "meta.llama-3.1-70b-instruct",
      messages: [
        { role: "system", content: "You are terse." },
        { role: "user", content: [{ type: "text", text: "Hello" }] },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_weather",
              type: "function",
              function: {
                name: "get_weather",
                arguments: '{"city":"Sao Paulo"}',
              },
            },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            parameters: {
              type: "object",
              properties: {
                city: { type: "string" },
              },
            },
          },
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "get_weather" },
      },
      max_tokens: 32,
    },
    credentials!
  );

  assert.equal(genericPayload.compartmentId, "ocid1.compartment.oc1..cccc");
  assert.equal(genericPayload.chatRequest.apiFormat, "GENERIC");
  assert.equal(genericPayload.chatRequest.maxTokens, 32);
  assert.equal(genericPayload.chatRequest.toolChoice.name, "get_weather");
  assert.equal(genericPayload.chatRequest.messages[2].toolCalls[0].name, "get_weather");

  const coherePayload = buildOciChatPayload(
    "cohere.command-r-plus-08-2024",
    {
      model: "cohere.command-r-plus-08-2024",
      messages: [
        { role: "system", content: "You are terse." },
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi" },
        { role: "user", content: "Tell me more" },
      ],
      max_tokens: 48,
    },
    credentials!
  );

  assert.equal(coherePayload.chatRequest.apiFormat, "COHERE");
  assert.equal(coherePayload.chatRequest.message, "Tell me more");
  assert.equal(coherePayload.chatRequest.chatHistory[0].role, "USER");
  assert.equal(coherePayload.chatRequest.preambleOverride, "You are terse.");
});

test("OCI executor signs chat requests and translates generic responses", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        modelId: "meta.llama-3.1-70b-instruct",
        modelVersion: "1",
        chatResponse: {
          timeCreated: "2026-04-20T13:00:00Z",
          choices: [
            {
              index: 0,
              message: {
                role: "ASSISTANT",
                content: [{ type: "TEXT", text: "hello from oci" }],
              },
              finishReason: "COMPLETE",
            },
          ],
          usage: {
            promptTokens: 5,
            completionTokens: 3,
            totalTokens: 8,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("oci");
    const result = await executor.execute({
      model: "meta.llama-3.1-70b-instruct",
      body: {
        model: "meta.llama-3.1-70b-instruct",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 12,
      },
      stream: false,
      credentials: {
        apiKey: ociApiKey,
      },
    });

    assert.equal(
      captured.url,
      "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/chat"
    );
    assert.match(String(captured.headers.Authorization || ""), /^Signature version="1"/);
    assert.equal(captured.headers["Content-Type"], "application/json");
    assert.equal(captured.body.compartmentId, "ocid1.compartment.oc1..cccc");
    assert.equal(captured.body.chatRequest.apiFormat, "GENERIC");

    const responseBody = await result.response.json();
    assert.equal(responseBody.model, "meta.llama-3.1-70b-instruct");
    assert.equal(responseBody.choices[0].message.content, "hello from oci");
    assert.equal(responseBody.usage.total_tokens, 8);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("OCI executor synthesizes SSE for Cohere-compatible responses", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        modelId: "cohere.command-r-plus-08-2024",
        modelVersion: "1",
        chatResponse: {
          apiFormat: "COHERE",
          text: "oci cohere text",
          finishReason: "COMPLETE",
          usage: {
            promptTokens: 7,
            completionTokens: 4,
            totalTokens: 11,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const executor = getExecutor("oci");
    const result = await executor.execute({
      model: "cohere.command-r-plus-08-2024",
      body: {
        model: "cohere.command-r-plus-08-2024",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        apiKey: ociApiKey,
      },
    });

    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const raw = await result.response.text();
    assert.match(raw, /oci cohere text/);
    assert.match(raw, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
