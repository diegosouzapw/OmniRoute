import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "muse-live-16437-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const discovery = await import("../../src/app/api/providers/[id]/models/route.ts");
const cli = await import("../../src/app/api/v1/muse-code/models/route.ts");
const scoped = await import("../../src/app/api/v1/providers/[provider]/models/route.ts");
const originalFetch = globalThis.fetch;
const originalCatalog = scoped.unifiedModels.load;
type CatalogBody = {
  source?: string;
  intentional?: boolean;
  warning?: string;
  models?: { id: string }[];
  data?: { id: string; metadata?: { name: string } }[];
};

test.after(() => {
  globalThis.fetch = originalFetch;
  scoped.unifiedModels.load = originalCatalog;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function discover(authType: "apikey" | "oauth", status = 200) {
  const connection = await providers.createProviderConnection({
    provider: "muse-code",
    name: "fixture",
    authType,
    isActive: true,
    apiKey: authType === "apikey" ? "fixture-api-key" : null,
    accessToken: authType === "oauth" ? "fixture-minted-key" : null,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: { url: string; auth: string | null }[] = [];
  globalThis.fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    calls.push({ url, auth: new Headers(init?.headers).get("authorization") });
    return Response.json({ data: [{ id: "muse-new-fixture" }] }, { status });
  };
  const response = await discovery.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: Promise.resolve({ id: connection.id }) }
  );
  return { calls, response, body: (await response.json()) as CatalogBody };
}

test("a failed live request is an explicit fallback, not an intentional local-only catalog", async () => {
  const result = await discover("apikey", 503);
  assert.ok(result.calls.length > 0);
  assert.equal(result.body.source, "local_catalog");
  assert.notEqual(result.body.intentional, true);
  assert.ok(result.body.warning);
  assert.ok(result.body.models?.some((model) => model.id === "muse-spark-1.3"));
});

for (const mode of ["apikey", "oauth"] as const) {
  test(`discovery requests the live Muse catalog with the ${mode} connection token`, async () => {
    const result = await discover(mode);
    assert.ok(
      result.calls.some(
        (call) =>
          call.url === "https://api.meta.ai/v1/models" &&
          call.auth === `Bearer ${mode === "apikey" ? "fixture-api-key" : "fixture-minted-key"}`
      ),
      JSON.stringify(result)
    );
    assert.equal(result.body.source, "api");
    assert.ok(result.body.models?.some((model) => model.id === "muse-new-fixture"));
  });
}

test("CLI catalog follows the current authorized catalog and is not publicly cached", async () => {
  let current = "muse-new-fixture";
  scoped.unifiedModels.load = async () =>
    Response.json({
      object: "list",
      data: [
        { id: `mc/${current}`, root: current, owned_by: "muse-code", name: "Live fixture" },
        { id: "openai/unrelated", root: "unrelated", owned_by: "openai" },
      ],
    });
  const request = new Request("http://localhost/api/v1/muse-code/models");
  const first = await cli.GET(request);
  assert.deepEqual(
    ((await first.json()) as CatalogBody).data?.map((row) => row.id),
    [current]
  );
  assert.match(first.headers.get("cache-control") || "", /private|no-store/);
  current = "muse-next-fixture";
  const second = await cli.GET(request);
  assert.deepEqual(
    ((await second.json()) as CatalogBody).data?.map((row) => row.id),
    [current]
  );
});

test("CLI catalog preserves the shared catalog authentication rejection", async () => {
  scoped.unifiedModels.load = async () =>
    Response.json({ error: { message: "Authentication required" } }, { status: 401 });
  const response = await cli.GET(new Request("http://localhost/api/v1/muse-code/models"));
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: { message: "Authentication required" } });
});

test("control: CLI preflight remains available", async () => {
  const response = await cli.OPTIONS();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("access-control-allow-methods") || "", /GET/);
});

test("CLI preserves discovered capabilities without inventing unknown limits", async () => {
  scoped.unifiedModels.load = async () =>
    Response.json({
      object: "list",
      data: [
        {
          id: "mc/muse-live-with-metadata",
          root: "muse-live-with-metadata",
          owned_by: "muse-code",
          context_length: 123456,
          capabilities: { vision: true, effort_tiers: ["high"] },
        },
        { id: "mc/muse-unknown", root: "muse-unknown", owned_by: "muse-code" },
      ],
    });
  const response = await cli.GET(new Request("http://localhost/api/v1/muse-code/models"));
  const body = (await response.json()) as {
    data: { id: string; metadata: Record<string, unknown> }[];
  };
  const first = body.data.find((row) => row.id === "muse-live-with-metadata")!;
  assert.deepEqual(first.metadata.modalities, ["text", "image"]);
  assert.equal(first.metadata.reasoning, true);
  assert.equal(first.metadata.limit, 123456);
  const unknown = body.data.find((row) => row.id === "muse-unknown")!;
  assert.equal(unknown.metadata.limit, undefined);
  assert.equal(unknown.metadata.tool_call, undefined);
  assert.equal(unknown.metadata.cost, undefined);
});
