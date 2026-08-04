import test from "node:test";
import assert from "node:assert/strict";

const { VertexExecutor } = await import("../../open-sse/executors/vertex.ts");

const MIN_SA_JSON = JSON.stringify({
  project_id: "vertex-project-123",
});

test("T29: Vertex executor builds regional Gemini URL from Service Account project", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-3.1-pro-preview", true, 0, {
    apiKey: MIN_SA_JSON,
    providerSpecificData: { region: "europe-west4" },
  });

  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/europe-west4/publishers/google/models/gemini-3.1-pro-preview:streamGenerateContent?alt=sse"
  );
});

test("T29: Vertex executor routes partner models to global openapi endpoint", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("DeepSeek-V4-Pro", false, 0, {
    apiKey: MIN_SA_JSON,
    providerSpecificData: { region: "us-central1" },
  });

  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/global/endpoints/openapi/chat/completions"
  );
});

test("T29: Vertex executor defaults region to us-central1 when not configured", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-2.5-flash", false, 0, {
    apiKey: MIN_SA_JSON,
    providerSpecificData: {},
  });

  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/vertex-project-123/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent"
  );
});

test("T29: Vertex executor headers include Bearer token and SSE Accept when streaming", () => {
  const executor = new VertexExecutor();
  const headers = executor.buildHeaders({ accessToken: "ya29.test-token" }, true);

  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Authorization, "Bearer ya29.test-token");
  assert.equal(headers.Accept, "text/event-stream");
});

test("T29: Vertex executor rejects incomplete Service Account JSON clearly", async () => {
  const executor = new VertexExecutor();

  // A JSON object (not an opaque Express key) that is missing client_email/private_key must still
  // fail clearly when the executor tries to mint a JWT from it.
  await assert.rejects(
    () =>
      executor.execute({
        model: "gemini-2.5-flash",
        body: { contents: [] },
        stream: false,
        credentials: { apiKey: JSON.stringify({ project_id: "p" }) },
      }),
    /missing required fields/i
  );
});

test("T29: Vertex executor routes a non-JSON Express API key to the project-less publisher endpoint", () => {
  const executor = new VertexExecutor();
  const stream = executor.buildUrl("gemini-2.5-flash", true, 0, { apiKey: "express-key-123" });
  const nonStream = executor.buildUrl("gemini-2.5-flash", false, 0, { apiKey: "express-key-123" });

  assert.equal(
    stream,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=express-key-123"
  );
  assert.equal(
    nonStream,
    "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=express-key-123"
  );
});
