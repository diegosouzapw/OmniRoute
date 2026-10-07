import test from "node:test";
import assert from "node:assert/strict";

const { handleModeration } = await import("../../open-sse/handlers/moderations.ts");
const { MODERATION_PROVIDERS, getModerationProvider, parseModerationModel } =
  await import("../../open-sse/config/moderationRegistry.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("MODERATION_PROVIDERS registers mistral with the Mistral moderations base URL", () => {
  const provider = getModerationProvider("mistral");
  assert.ok(provider);
  assert.equal(provider.baseUrl, "https://api.mistral.ai/v1/moderations");
  assert.ok(provider.models.some((m: { id: string }) => m.id === "mistral-moderation-latest"));
  assert.ok(MODERATION_PROVIDERS.mistral);
});

test("parseModerationModel routes mistral moderation models to the mistral provider", () => {
  assert.deepEqual(parseModerationModel("mistral/mistral-moderation-latest"), {
    provider: "mistral",
    model: "mistral-moderation-latest",
  });
  assert.deepEqual(parseModerationModel("mistral-moderation-latest"), {
    provider: "mistral",
    model: "mistral-moderation-latest",
  });
});

test("handleModeration proxies mistral moderation requests to the mistral endpoint", async () => {
  let captured: any;
  globalThis.fetch = async (url: any, options: any = {}) => {
    captured = { url: String(url), headers: options.headers };
    return Response.json({ id: "modr-mistral", results: [{ flagged: false }] });
  };

  const response = await handleModeration({
    body: { model: "mistral/mistral-moderation-latest", input: "check this" },
    credentials: { apiKey: "sk-mistral" },
  });

  assert.equal(captured.url, "https://api.mistral.ai/v1/moderations");
  assert.equal(captured.headers.Authorization, "Bearer sk-mistral");
  assert.equal(response.status, 200);
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

test("handleModeration sanitizes structured upstream error bodies", async () => {
  globalThis.fetch = async () =>
    Response.json(
      {
        error: {
          message: "quota metadata at /srv/provider/private.json",
          api_key: "credential-value-12345",
        },
      },
      { status: 429 }
    );

  const response = await handleModeration({
    body: { model: "openai/text-moderation-latest", input: "check this" },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as {
    error: { message: string; api_key?: string };
  };

  assert.equal(response.status, 429);
  assert.equal(payload.error.api_key, undefined);
  assert.doesNotMatch(payload.error.message, /srv\/provider/i);
  assert.doesNotMatch(JSON.stringify(payload), /credential-value-12345/i);
});

test("handleModeration canonicalizes blank, plaintext, and mislabeled upstream failures", async () => {
  const scenarios = [
    { name: "blank", body: "   ", contentType: "application/json" },
    {
      name: "plaintext",
      body: "access_token=moderation-plain-secret at /srv/private/moderation.txt",
      contentType: "text/plain",
    },
    {
      name: "mislabeled",
      body: "<html>api_key=moderation-html-secret at /srv/private/error.html</html>",
      contentType: "application/json",
    },
  ];

  for (const scenario of scenarios) {
    globalThis.fetch = async () =>
      new Response(scenario.body, {
        status: 502,
        headers: { "content-type": scenario.contentType },
      });
    const response = await handleModeration({
      body: { model: "openai/text-moderation-latest", input: "check this" },
      credentials: { apiKey: "sk-test" },
    });
    const text = await response.text();
    const payload = JSON.parse(text) as { error: { message: string } };

    assert.equal(response.status, 502, scenario.name);
    assert.match(response.headers.get("content-type") || "", /application\/json/i, scenario.name);
    assert.match(
      response.headers.get("access-control-allow-methods") || "",
      /OPTIONS/,
      scenario.name
    );
    assert.equal(typeof payload.error.message, "string", scenario.name);
    assert.doesNotMatch(
      text,
      /moderation-plain-secret|moderation-html-secret|srv\/private|<html>/i,
      scenario.name
    );
  }
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
