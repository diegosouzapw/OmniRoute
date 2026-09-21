import test from "node:test";
import assert from "node:assert/strict";

const { POST, OPTIONS } = await import("../../src/app/api/v1/responses/input_tokens/route.ts");

function post(body: unknown): Request {
  return new Request("http://localhost/v1/responses/input_tokens", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function count(body: unknown) {
  const response = await POST(post(body));
  return { status: response.status, json: await response.json() };
}

test("returns the OpenAI Responses contract shape", async () => {
  const { status, json } = await count({ model: "cx/gpt-5.6-sol", input: "hello world" });
  assert.equal(status, 200);
  assert.equal(json.object, "response.input_tokens");
  assert.equal(typeof json.input_tokens, "number");
  assert.equal(Number.isInteger(json.input_tokens), true);
  assert.ok(json.input_tokens > 0);
  // No OmniRoute-only fields may leak into the public contract.
  assert.deepEqual(Object.keys(json).sort(), ["input_tokens", "object"]);
});

test("never performs an upstream request (no fetch from this route)", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async (...args: unknown[]) => {
    calls += 1;
    void args;
    throw new Error("the local token count route must not call upstream");
  }) as typeof globalThis.fetch;
  try {
    const { status } = await count({ model: "cx/gpt-5.6-sol", input: "hello world" });
    assert.equal(status, 200);
    assert.equal(calls, 0, "no upstream call may be issued — this is what avoids the CF challenge");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("counts instructions, structured input and tools", async () => {
  const bare = await count({ model: "cx/gpt-5.6-sol", input: "hello" });
  const withInstructions = await count({
    model: "cx/gpt-5.6-sol",
    input: "hello",
    instructions: "You are a careful assistant that always explains its reasoning.",
  });
  assert.ok(withInstructions.json.input_tokens > bare.json.input_tokens);

  const withTools = await count({
    model: "cx/gpt-5.6-sol",
    input: "hello",
    tools: [
      {
        type: "function",
        name: "search_documents",
        description: "Search the corpus for matching documents",
        parameters: { type: "object", properties: { query: { type: "string" } } },
      },
    ],
  });
  assert.ok(
    withTools.json.input_tokens > bare.json.input_tokens,
    "tool definitions are serialized into the prompt and must be counted"
  );

  const structured = await count({
    model: "cx/gpt-5.6-sol",
    input: [
      { role: "user", content: [{ type: "input_text", text: "first message" }] },
      { role: "assistant", content: [{ type: "output_text", text: "second message" }] },
    ],
  });
  assert.ok(structured.json.input_tokens > 0);
});

test("estimate is conservative — never under-counts the raw text", async () => {
  // Under-counting is the dangerous direction: a client would send a request
  // past the context window. Over-counting only compacts slightly early.
  const text = "The quick brown fox jumps over the lazy dog. ".repeat(40);
  const { json } = await count({ model: "cx/gpt-5.6-sol", input: text });
  const naiveLowerBound = Math.ceil(text.length / 6);
  assert.ok(
    json.input_tokens >= naiveLowerBound,
    `expected >= ${naiveLowerBound}, got ${json.input_tokens}`
  );
});

test("non-text parts do not crash the counter", async () => {
  const { status, json } = await count({
    model: "cx/gpt-5.6-sol",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "describe this" },
          { type: "input_image", image_url: "data:image/png;base64,AAAABBBBCCCC" },
          { type: "input_file", filename: "a.pdf" },
        ],
      },
    ],
  });
  assert.equal(status, 200);
  assert.ok(json.input_tokens > 0);
});

test("server-held context references stay in the plain contract shape", async () => {
  const { status, json } = await count({
    model: "cx/gpt-5.6-sol",
    input: "follow up",
    previous_response_id: "resp_abc123",
  });
  assert.equal(status, 200);
  assert.deepEqual(Object.keys(json).sort(), ["input_tokens", "object"]);
});

test("an empty request still answers the contract with zero", async () => {
  const { status, json } = await count({ model: "cx/gpt-5.6-sol" });
  assert.equal(status, 200);
  assert.equal(json.object, "response.input_tokens");
  assert.equal(json.input_tokens, 0);
});

test("invalid JSON is a 400, not a 500", async () => {
  const response = await POST(post("not json at all"));
  assert.equal(response.status, 400);
});

test("OPTIONS preflight is answered", async () => {
  const response = await OPTIONS();
  assert.equal(response.status, 200);
});
