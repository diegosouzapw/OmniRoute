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
  const url = executor.buildUrl("deepseek-v3.2", false, 0, {
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

test("T29: Vertex executor rejects invalid Service Account JSON clearly", async () => {
  const executor = new VertexExecutor();

  await assert.rejects(
    () =>
      executor.execute({
        model: "gemini-2.5-flash",
        body: { contents: [] },
        stream: false,
        credentials: { apiKey: "not-json" },
      }),
    /Service Account JSON/i
  );
});
