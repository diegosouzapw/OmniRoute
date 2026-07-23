import test from "node:test";
import assert from "node:assert/strict";

const { VertexExecutor, isExpressApiKey, looksLikeServiceAccountJson } = await import(
  "../../open-sse/executors/vertex.ts"
);

test("looksLikeServiceAccountJson is true only for a JSON object credential", () => {
  assert.equal(looksLikeServiceAccountJson(JSON.stringify({ project_id: "p" })), true);
  assert.equal(looksLikeServiceAccountJson("express-opaque-key"), false);
  assert.equal(looksLikeServiceAccountJson(JSON.stringify([1, 2, 3])), false);
  assert.equal(looksLikeServiceAccountJson(""), false);
});

test("isExpressApiKey is true for a non-empty, non-JSON credential", () => {
  assert.equal(isExpressApiKey("AIzaSyExpressKey"), true);
  assert.equal(isExpressApiKey("   "), false);
  assert.equal(isExpressApiKey(""), false);
  assert.equal(isExpressApiKey(null), false);
  assert.equal(isExpressApiKey(undefined), false);
  assert.equal(isExpressApiKey(JSON.stringify({ project_id: "p" })), false);
});

test("buildUrl Express: streaming google model uses streamGenerateContent + ?alt=sse&key=", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-3-flash-preview", true, 0, { apiKey: "k-express" });
  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-flash-preview:streamGenerateContent?alt=sse&key=k-express"
  );
});

test("buildUrl Express: non-streaming google model uses generateContent?key=", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-3-flash-preview", false, 0, { apiKey: "k-express" });
  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-flash-preview:generateContent?key=k-express"
  );
});

test("buildUrl Express: the API key is URL-encoded and trimmed", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-2.5-flash", false, 0, { apiKey: "  a/b+c=d  " });
  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=a%2Fb%2Bc%3Dd"
  );
});

test("buildUrl Express: a present accessToken takes the Service Account path, not Express", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-2.5-flash", false, 0, {
    apiKey: "k-express",
    accessToken: "ya29.token",
    providerSpecificData: { region: "us-central1" },
  });
  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/unknown-project/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent"
  );
});

test("buildHeaders for an Express key (no accessToken) omits the Authorization header", () => {
  const executor = new VertexExecutor();
  const headers = executor.buildHeaders({ apiKey: "k-express" }, false);
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Authorization, undefined);
});

test("execute with an Express key calls the publisher endpoint directly (no OAuth token exchange)", async () => {
  const executor = new VertexExecutor();
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  globalThis.fetch = async (url: any) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-3-flash-preview",
      body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      stream: false,
      credentials: { apiKey: "AIzaSyExpressKey" },
    } as any);

    assert.equal(result.response.status, 200);
    // Exactly one call — straight to Vertex, no oauth2 token mint.
    assert.equal(calls.length, 1);
    assert.equal(
      calls[0],
      "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-flash-preview:generateContent?key=AIzaSyExpressKey"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
