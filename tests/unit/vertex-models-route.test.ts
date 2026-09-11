import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vertex-model-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage(): Promise<void> {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedVertexConnection(options: {
  apiKey?: string;
  accessToken?: string;
  projectId?: string;
}): Promise<{ id: string }> {
  return providersDb.createProviderConnection({
    provider: "vertex",
    authType: "apikey",
    name: `vertex-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: options.apiKey,
    accessToken: options.accessToken,
    projectId: options.projectId,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
}

async function callRoute(connectionId: string): Promise<Response> {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true&chatOnly=true`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Vertex Express probes only Gemini discovery and then uses the intentional Gemini catalog", async () => {
  const connection = await seedVertexConnection({ apiKey: "vertex-express-key" });
  let fetchCalls = 0;
  const headers: HeadersInit[] = [];
  globalThis.fetch = async (_url, init) => {
    fetchCalls += 1;
    headers.push(init?.headers || {});
    return Response.json({ error: { status: "UNAUTHENTICATED" } }, { status: 401 });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.match(body.warning, /live catalog.*API key.*curated Express catalog/i);
  assert.equal(fetchCalls, 1);
  assert.ok(
    headers.every((header) => new Headers(header).get("x-goog-api-key") === "vertex-express-key")
  );
  assert.ok(body.models.some((model: { id?: string }) => model.id.startsWith("gemini-")));
  assert.ok(!body.models.some((model: { id?: string }) => model.id.includes("grok")));
});

test("Vertex authorization API key detects and persists its project for curated partner models", async () => {
  const connection = await seedVertexConnection({ apiKey: "vertex-authorization-key" });
  const calledUrls: string[] = [];
  globalThis.fetch = async (url, init) => {
    const calledUrl = String(url);
    calledUrls.push(calledUrl);
    assert.equal(new Headers(init?.headers).get("x-goog-api-key"), "vertex-authorization-key");
    return Response.json(
      {
        error: {
          status: "PERMISSION_DENIED",
          details: [
            {
              "@type": "type.googleapis.com/google.rpc.ErrorInfo",
              reason: "API_KEY_SERVICE_BLOCKED",
              metadata: { consumer: "projects/316081256616" },
            },
          ],
        },
      },
      { status: 403 }
    );
  };

  const response = await callRoute(connection.id);
  const body = await response.json();
  const byId = new Map(
    body.models.map((model: { id: string; targetFormat?: string }) => [model.id, model])
  );
  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal(body.projectIdAutoDetected, true);
  assert.equal(body.catalogMode, "curated_project");
  assert.equal(body.warning, undefined);
  assert.equal(byId.get("xai/grok-4.6")?.targetFormat, "openai");
  assert.equal(byId.get("zai-org/glm-5-maas")?.targetFormat, "openai");
  assert.equal(byId.get("qwen/qwen3-next-80b-a3b-instruct-maas")?.targetFormat, "openai");
  assert.ok(!byId.has("GLM-5.1-FP8"));
  assert.ok(!byId.has("Qwen3.6-35B-A3B"));
  assert.equal(calledUrls.length, 1);
  assert.ok(calledUrls[0].includes("generativelanguage.googleapis.com"));
  assert.ok(!calledUrls[0].includes("vertex-authorization-key"));

  const saved = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(saved?.projectId, "316081256616");
});

test("Vertex Service Account discovery merges Gemini and all partner transport catalogs", async () => {
  const connection = await seedVertexConnection({
    accessToken: "ya29.vertex-model-discovery",
  });
  const calledUrls: string[] = [];
  globalThis.fetch = async (url) => {
    const calledUrl = String(url);
    calledUrls.push(calledUrl);
    if (calledUrl.includes("generativelanguage.googleapis.com")) {
      return Response.json({
        models: [
          {
            name: "models/gemini-3.1-pro-preview",
            displayName: "Gemini 3.1 Pro Preview",
            supportedGenerationMethods: ["generateContent"],
          },
          {
            name: "models/gemini-3.7-flash",
            displayName: "Gemini 3.7 Flash",
            supportedGenerationMethods: ["generateContent"],
            inputTokenLimit: 900000,
            outputTokenLimit: 60000,
          },
        ],
      });
    }
    if (calledUrl.includes("/models/gemini/3-7-flash?hl=en")) {
      return new Response(
        `<table>
          <tr><th>Model ID</th><td>gemini-3.7-flash</td></tr>
          <tr><th>Token limits</th><td>Context window</td><td>1,048,576</td></tr>
          <tr><th>Maximum output tokens</th><td>65,536</td></tr>
        </table>`,
        { headers: { "Last-Modified": "Thu, 03 Sep 2026 10:00:00 GMT" } }
      );
    }
    if (calledUrl.includes("/publishers/google/models")) {
      return Response.json({
        publisherModels: [
          { name: "publishers/google/models/gemini-3.7-flash" },
          { name: "publishers/google/models/gemini-3.1-flash-image" },
        ],
      });
    }
    if (calledUrl.includes("/publishers/anthropic/models")) {
      return Response.json({
        publisherModels: [{ name: "publishers/anthropic/models/claude-sonnet-4-6" }],
      });
    }
    if (calledUrl.includes("/publishers/xai/models")) {
      return Response.json({
        publisherModels: [{ name: "publishers/xai/models/grok-4.6" }],
      });
    }
    if (calledUrl.includes("/publishers/mistralai/models")) {
      return Response.json({
        publisherModels: [{ name: "publishers/mistralai/models/mistral-medium-3" }],
      });
    }
    return new Response("unexpected discovery URL", { status: 500 });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();
  const byId = new Map(
    body.models.map((model: { id: string; targetFormat?: string }) => [model.id, model])
  );
  const gemini37 = byId.get("gemini-3.7-flash") as
    | {
        contextWindow?: number;
        inputTokenLimit?: number;
        outputTokenLimit?: number;
        metadataProvenance?: { vertexDocs?: { source?: string } };
      }
    | undefined;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.ok(byId.has("gemini-3.1-pro-preview"));
  assert.ok(byId.has("gemini-3.7-flash"));
  assert.equal(gemini37?.contextWindow, 1048576);
  assert.equal(gemini37?.inputTokenLimit, 900000);
  assert.equal(gemini37?.outputTokenLimit, 60000);
  assert.equal(gemini37?.metadataProvenance?.vertexDocs?.source, "google-cloud-docs");
  assert.ok(!byId.has("gemini-3.1-flash-image"));
  assert.equal(byId.get("claude-sonnet-4-6")?.targetFormat, "claude");
  assert.equal(byId.get("xai/grok-4.6")?.targetFormat, "openai");
  assert.equal(byId.get("mistral-medium-3")?.targetFormat, "openai");
  assert.ok(calledUrls.some((url) => url.includes("/v1beta1/publishers/xai/models")));
  assert.ok(calledUrls.some((url) => url.includes("/v1beta1/publishers/google/models")));
  assert.ok(
    calledUrls
      .filter((url) => url.includes("/v1beta1/publishers/"))
      .every((url) => url.includes("pageSize=300"))
  );
});

test("Vertex Service Account keeps usable xAI results when Gemini listing is blocked", async () => {
  const connection = await seedVertexConnection({ accessToken: "ya29.vertex-xai-only" });
  globalThis.fetch = async (url) => {
    const calledUrl = String(url);
    if (calledUrl.includes("generativelanguage.googleapis.com")) {
      return Response.json({ error: { status: "PERMISSION_DENIED" } }, { status: 403 });
    }
    if (calledUrl.includes("/publishers/xai/models")) {
      return Response.json({
        publisherModels: [{ name: "publishers/xai/models/grok-4.6" }],
      });
    }
    return Response.json({ publisherModels: [] });
  };

  const response = await callRoute(connection.id);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.ok(body.models.some((model: { id?: string }) => model.id === "xai/grok-4.6"));
  assert.equal(body.catalogMode, "live_vertex_catalog");
  assert.equal(body.warning, undefined);
});
