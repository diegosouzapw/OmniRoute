import test from "node:test";
import assert from "node:assert/strict";

const { handleModeration } = await import("../../open-sse/handlers/moderations.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("handleModeration requires input", async () => {
  const response = await handleModeration({
    body: { model: "openai/omni-moderation-latest" },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "input is required");
});

test("handleModeration rejects unknown moderation models", async () => {
  const response = await handleModeration({
    body: { model: "mystery/moderation", input: "hello" },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(payload.error.message, /No moderation provider found/);
});

test("handleModeration requires credentials for the resolved provider", async () => {
  const response = await handleModeration({
    body: { input: "hello" },
    credentials: null,
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for moderation provider: openai");
});

test("handleModeration proxies successful requests with default model and accessToken fallback", async () => {
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return Response.json({
      id: "modr-1",
      results: [{ flagged: false }],
    });
  };

  const response = await handleModeration({
    body: { input: "all clear" },
    credentials: { accessToken: "oauth-token" },
  });

  assert.equal(captured.url, "https://api.openai.com/v1/moderations");
  assert.equal(captured.headers.Authorization, "Bearer oauth-token");
  assert.deepEqual(captured.body, {
    model: "omni-moderation-latest",
    input: "all clear",
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.match(response.headers.get("access-control-allow-methods") || "", /OPTIONS/);
  assert.deepEqual(await response.json(), {
    id: "modr-1",
    results: [{ flagged: false }],
  });
});

test("handleModeration returns upstream error payloads with CORS headers", async () => {
  globalThis.fetch = async () =>
    new Response('{"error":"busy"}', {
      status: 429,
      headers: { "content-type": "application/json" },
    });

  const response = await handleModeration({
    body: { model: "openai/text-moderation-latest", input: "check this" },
    credentials: { apiKey: "sk-test" },
  });

  assert.equal(response.status, 429);
  assert.equal(await response.text(), '{"error":"busy"}');
  assert.equal(response.headers.get("content-type"), "application/json");
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.match(response.headers.get("access-control-allow-methods") || "", /OPTIONS/);
});

test("handleModeration returns a 500 when the upstream request throws", async () => {
  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };

  const response = await handleModeration({
    body: { model: "openai/text-moderation-latest", input: "check this" },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.match(payload.error.message, /Moderation request failed: socket closed/);
});
