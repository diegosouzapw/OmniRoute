import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-discovery-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getCachedDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function connection(oauth = true) {
  return createProviderConnection({
    provider: "claude",
    authType: oauth ? "oauth" : "apikey",
    name: "Claude discovery",
    isActive: true,
    ...(oauth ? { accessToken: "test-oauth" } : { apiKey: "test-api-key" }),
    providerSpecificData: { autoFetchModels: false },
  });
}
const call = (id: string, refresh = true) =>
  GET(new Request(`http://localhost/api/providers/${id}/models?refresh=${refresh}&chatOnly=true`), {
    params: { id },
  });

test("Claude refresh discovers remote-only models with OAuth, paginates, and persists the cache", async () => {
  const c = await connection();
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input));
    const headers = new Headers(init?.headers);
    assert.equal(url.origin, "https://api.anthropic.com");
    assert.equal(url.pathname, "/v1/models");
    assert.equal(headers.get("authorization"), "Bearer test-oauth");
    assert.equal(headers.get("x-api-key"), null);
    assert.match(headers.get("anthropic-beta") || "", /oauth-2025-04-20/);
    calls++;
    if (calls === 1)
      return Response.json({
        data: [
          {
            id: "claude-opus-5-5",
            display_name: "Claude Opus 5.5",
            type: "model",
            max_input_tokens: 1000000,
            max_tokens: 128000,
          },
        ],
        has_more: true,
        last_id: "claude-opus-5-5",
      });
    assert.equal(url.searchParams.get("after_id"), "claude-opus-5-5");
    return Response.json({
      data: [{ id: "claude-fable-5-1", display_name: "Claude Fable 5.1", type: "model" }],
      has_more: false,
    });
  };
  const r = await call(c.id);
  const body = await r.json();
  assert.equal(body.source, "api");
  assert.equal(calls, 2);
  assert.deepEqual(
    body.models.map((m: { id: string }) => m.id),
    ["claude-opus-5-5", "claude-fable-5-1"]
  );
  assert.equal(body.models[0].inputTokenLimit, 1000000);
  assert.equal(body.models[0].outputTokenLimit, 128000);
  const cached = await getCachedDiscoveredModels("claude", c.id);
  assert.ok(cached.some((m) => m.id === "claude-opus-5-5"));
  globalThis.fetch = async () => {
    throw new Error("must use cache");
  };
  assert.equal((await (await call(c.id, false)).json()).source, "cache");
  const failed = await (await call(c.id)).json();
  assert.equal(failed.source, "cache");
  assert.match(failed.warning, /unavailable/i);
});

test("Claude API-key discovery uses x-api-key and reports HTTP failures without leaking upstream text", async () => {
  const c = await connection(false);
  globalThis.fetch = async (_input, init) => {
    const headers = new Headers(init?.headers);
    assert.equal(headers.get("x-api-key"), "test-api-key");
    assert.equal(headers.get("authorization"), null);
    return new Response("secret upstream stack at /private/key", { status: 403 });
  };
  const body = await (await call(c.id)).json();
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /403/);
  assert.ok(!JSON.stringify(body).includes("/private/key"));
});

test("Claude auto-fetch disabled keeps the local fallback and performs no upstream request", async () => {
  const c = await connection();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("unexpected fetch");
  };
  const body = await (await call(c.id, false)).json();
  assert.equal(body.source, "local_catalog");
  assert.equal(calls, 0);
});
