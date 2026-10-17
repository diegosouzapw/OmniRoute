import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-dmr-16670-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_PROVIDER_PROBE_TIMEOUT_MS = "1000";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { resolveLocalSyncedEndpointRoute } =
  await import("../../src/lib/providerModels/syncedEndpointRouting.ts");
const originalFetch = globalThis.fetch;
const provider = "docker-model-runner";
const defaultBase = "http://localhost:12434/engines/v1";

async function seed(baseUrl?: string) {
  return providers.createProviderConnection({
    provider,
    authType: "apikey",
    name: "Docker test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true, ...(baseUrl ? { baseUrl } : {}) },
  });
}
function discover(id: string) {
  return GET(new Request(`http://localhost/api/providers/${id}/models?refresh=true`), {
    params: { id },
  });
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("DMR discovers its registered default and exposes exact tagged IDs in the public catalog", async () => {
  const connection = await seed();
  const urls: string[] = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return Response.json({ data: [{ id: "ai/smollm2:latest", object: "model" }] });
  };
  const response = await discover(connection.id);
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.source, "api");
  assert.deepEqual(urls, [`${defaultBase}/models`]);
  const synced = await models.getSyncedAvailableModelsByConnection(provider);
  assert.equal(synced[connection.id][0].id, "ai/smollm2:latest");
  const catalog = await getUnifiedModelsResponse(
    new Request("http://localhost/v1/models?prefix=alias")
  );
  const publicBody = await catalog.json();
  assert.equal(catalog.status, 200);
  assert.ok(publicBody.data.some((model: { id: string }) => model.id === "dmr/ai/smollm2:latest"));
});

test("DMR discovery preserves an explicit container engine URL", async () => {
  const base = "http://model-runner.docker.internal/engines/llama.cpp/v1";
  const connection = await seed(base);
  const urls: string[] = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return Response.json({ data: [{ id: "ai/smollm2:q4" }] });
  };
  const response = await discover(connection.id);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).source, "api");
  assert.deepEqual(urls, [`${base}/models`]);
});

for (const base of [undefined, "http://127.0.0.1:12435/engines/llama.cpp/v1"]) {
  test(`DMR embedding dispatch respects ${base ? "explicit" : "default"} URL after capability discovery`, async () => {
    const connection = await seed(base);
    await models.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
      { id: "ai/embeddinggemma:latest", supportedEndpoints: ["embeddings"] },
    ]);
    const calls: Array<{
      url: string;
      body: Record<string, unknown>;
      authorization: string | null;
    }> = [];
    globalThis.fetch = async (url, options) => {
      calls.push({
        url: String(url),
        body: JSON.parse(String(options?.body)),
        authorization: new Headers(options?.headers).get("authorization"),
      });
      return Response.json({
        data: [{ object: "embedding", index: 0, embedding: [0.1, 0.2] }],
        usage: { prompt_tokens: 1, total_tokens: 1 },
      });
    };
    const response = await createEmbeddingResponse({
      model: "dmr/ai/embeddinggemma:latest",
      input: "hello",
    });
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.deepEqual(body.data[0].embedding, [0.1, 0.2]);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, `${base || defaultBase}/embeddings`);
    assert.equal(calls[0].body.model, "ai/embeddinggemma:latest");
    assert.equal(calls[0].authorization, null);
  });
}

test("DMR does not infer embeddings capability from a chat-only model listing", async () => {
  const connection = await seed();
  await models.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: "ai/smollm2:latest" },
  ]);
  assert.equal(await resolveLocalSyncedEndpointRoute("dmr/ai/smollm2:latest", "embeddings"), null);
});

test("DMR chat dispatch preserves JSON and SSE bodies through default and engine URLs", async () => {
  const executor = new DefaultExecutor(provider);
  for (const stream of [false, true]) {
    for (const baseUrl of [undefined, "http://127.0.0.1:12435/engines/llama.cpp/v1"]) {
      const expectedBase = baseUrl || defaultBase;
      const responseBody = stream
        ? 'data: {"choices":[{"delta":{"content":"hello"}}]}\n\ndata: [DONE]\n\n'
        : JSON.stringify({ choices: [{ message: { role: "assistant", content: "hello" } }] });
      const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
      globalThis.fetch = async (url, options) => {
        calls.push({ url: String(url), body: JSON.parse(String(options?.body)) });
        return new Response(responseBody, {
          headers: { "content-type": stream ? "text/event-stream" : "application/json" },
        });
      };
      const result = await executor.execute({
        model: "ai/smollm2:latest",
        stream,
        credentials: { providerSpecificData: baseUrl ? { baseUrl } : {} },
        body: {
          model: "ai/smollm2:latest",
          stream,
          messages: [{ role: "user", content: "hello" }],
        },
      });
      assert.equal(result.response.status, 200);
      assert.equal(await result.response.text(), responseBody);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, `${expectedBase}/chat/completions`);
      assert.equal(calls[0].body.model, "ai/smollm2:latest");
      assert.equal(calls[0].body.stream, stream);
    }
  }
});

test("DMR optional embedding credentials are forwarded when configured", async () => {
  const connection = await providers.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "dmr-test-key",
    name: "Keyed DMR",
    isActive: true,
    providerSpecificData: { baseUrl: defaultBase },
  });
  await models.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: "ai/embeddinggemma:latest", supportedEndpoints: ["embeddings"] },
  ]);
  let authorization: string | null = null;
  globalThis.fetch = async (_url, options) => {
    authorization = new Headers(options?.headers).get("authorization");
    return Response.json({ data: [{ object: "embedding", index: 0, embedding: [0.1] }] });
  };
  const response = await createEmbeddingResponse({
    model: "dmr/ai/embeddinggemma:latest",
    input: "hello",
  });
  assert.equal(response.status, 200, JSON.stringify(await response.json()));
  assert.equal(authorization, "Bearer dmr-test-key");
});

test("DMR unavailable discovery retains cached models and terminates after bounded attempts", async () => {
  const connection = await seed(defaultBase);
  await models.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: "ai/smollm2:cached" },
  ]);
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls += 1;
    assert.ok(options?.signal, "existing probe must carry a timeout signal");
    throw new TypeError("fetch failed");
  };
  const response = await discover(connection.id);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.notEqual(body.source, "api");
  assert.ok(body.models.some((model: { id: string }) => model.id === "ai/smollm2:cached"));
  assert.ok(calls > 0 && calls <= 6, `bounded probe attempts: ${calls}`);
  assert.equal(
    (await models.getSyncedAvailableModelsByConnection(provider))[connection.id][0].id,
    "ai/smollm2:cached"
  );
});

test("DMR stalled discovery returns a bounded timeout error without erasing cached models", async () => {
  const connection = await seed(defaultBase);
  await models.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: "ai/smollm2:cached" },
  ]);
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls += 1;
    assert.ok(options?.signal);
    await new Promise<void>((_resolve, reject) => {
      options.signal?.addEventListener("abort", () => reject(options.signal?.reason), {
        once: true,
      });
    });
    throw new Error("timeout signal must reject");
  };
  const response = await discover(connection.id);
  const body = await response.json();
  assert.equal(response.status, 504);
  assert.equal(typeof body.error, "string");
  assert.ok(!body.error.includes("at /"));
  assert.ok(calls > 0 && calls <= 2, `bounded timeout attempts: ${calls}`);
  assert.equal(
    (await models.getSyncedAvailableModelsByConnection(provider))[connection.id][0].id,
    "ai/smollm2:cached"
  );
});
