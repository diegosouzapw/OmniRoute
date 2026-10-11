import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cline-discovery-15136-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
assert.equal(process.env.DATA_DIR, dataDir);

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const discovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const route = await import("../../src/app/api/providers/[id]/models/route.ts");
const originalFetch = globalThis.fetch;

const fullCatalog = {
  data: [
    { id: "vendor/shared", name: "Paid Shared", architecture: { modality: "text->text" } },
    { id: "vendor/other", architecture: { modality: "text+image->text" } },
    { id: "cline-free/shared", architecture: { modality: "text->text" } },
    { id: "cline-pass/subscription", architecture: { modality: "text->text" } },
    { id: "vendor/image", architecture: { modality: "text->image" } },
  ],
};
const recommendedCatalog = {
  free: [{ id: "cline-free/shared", name: "Free Shared" }, { id: "cline-free/rotated-new" }],
  recommended: [{ id: "vendor/shared" }, { id: "cline-pass/subscription" }],
  clinePass: [{ id: "cline-pass/subscription" }],
};

async function connection(provider = "cline", autoFetchModels = true) {
  return providers.createProviderConnection({
    provider,
    authType: "oauth",
    name: "Cline fixture",
    accessToken: "fixture-not-a-real-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels },
  });
}

function mockCatalogs(
  recommended: () => Response,
  full: () => Response = () => Response.json(fullCatalog)
) {
  const calls: string[] = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    calls.push(url);
    assert.equal(new Headers(init?.headers).get("authorization"), null);
    if (url === "https://api.cline.bot/api/v1/ai/cline/recommended-models") return recommended();
    if (url === "https://api.cline.bot/api/v1/ai/cline/models") return full();
    throw new Error("Unexpected outbound request in Cline fixture");
  };
  return calls;
}

async function request(id: string, refresh = true) {
  const response = await route.GET(
    new Request(`http://localhost/api/providers/${id}/models${refresh ? "?refresh=true" : ""}`),
    { params: { id } }
  );
  assert.equal(response.status, 200);
  return response.json() as Promise<{
    source: string;
    models: Array<{ id: string; name?: string }>;
  }>;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("Cline discovery merges rotating free models first without collapsing paid namespaces", async () => {
  const row = await connection();
  const calls = mockCatalogs(() => Response.json(recommendedCatalog));
  const body = await request(row.id);
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["cline-free/shared", "cline-free/rotated-new", "vendor/shared", "vendor/other"]
  );
  assert.equal(body.models[0].name, "Free Shared");
  assert.equal(calls.length, 2);
  assert.ok(
    (await discovery.getCachedDiscoveredModels("cline", row.id)).some(
      (model) => model.id === "cline-free/rotated-new"
    )
  );
});

for (const [name, reply] of [
  ["HTTP failure", () => new Response("down", { status: 503 })],
  [
    "network failure",
    () => {
      throw new Error("fixture network failure");
    },
  ],
  ["invalid JSON", () => new Response("invalid", { status: 200 })],
  ["missing free bucket", () => Response.json({ recommended: [] })],
  ["malformed free bucket", () => Response.json({ free: {}, recommended: [] })],
  ["malformed free entry", () => Response.json({ free: [{ id: 42 }], recommended: [] })],
] as const) {
  test(`Cline preserves its previous complete cache on recommended ${name}`, async () => {
    const row = await connection();
    await discovery.persistDiscoveredModels("cline", row.id, [{ id: "cline-free/previous" }]);
    mockCatalogs(reply);
    const body = await request(row.id);
    assert.equal(body.source, "cache");
    assert.deepEqual(
      body.models.map((model) => model.id),
      ["cline-free/previous"]
    );
    assert.deepEqual(
      (await discovery.getCachedDiscoveredModels("cline", row.id)).map((model) => model.id),
      ["cline-free/previous"]
    );
  });
}

test("Cline preserves cache when the full catalog fails despite a valid free bucket", async () => {
  const row = await connection();
  await discovery.persistDiscoveredModels("cline", row.id, [{ id: "cline-free/previous" }]);
  mockCatalogs(
    () => Response.json(recommendedCatalog),
    () => Response.json({ error: "not a catalog" })
  );
  const body = await request(row.id);
  assert.equal(body.source, "cache");
  assert.deepEqual(
    (await discovery.getCachedDiscoveredModels("cline", row.id)).map((model) => model.id),
    ["cline-free/previous"]
  );
});

test("a valid empty free bucket expires removed free entries without dropping paid models", async () => {
  const row = await connection();
  await discovery.persistDiscoveredModels("cline", row.id, [{ id: "cline-free/previous" }]);
  mockCatalogs(
    () => Response.json({ free: [], recommended: [] }),
    () => Response.json({ data: [fullCatalog.data[0]] })
  );
  const body = await request(row.id);
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["vendor/shared"]
  );
  assert.deepEqual(
    (await discovery.getCachedDiscoveredModels("cline", row.id)).map((model) => model.id),
    ["vendor/shared"]
  );
});

test("Cline auto-fetch disabled performs no outbound request", async () => {
  const row = await connection("cline", false);
  const calls = mockCatalogs(() => Response.json(recommendedCatalog));
  await request(row.id, false);
  assert.equal(calls.length, 0);
});

test("ClinePass discovery remains confined to its subscription bucket", async () => {
  const row = await connection("clinepass");
  const calls = mockCatalogs(() => Response.json(recommendedCatalog));
  const body = await request(row.id);
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["cline-pass/subscription"]
  );
  assert.equal(calls.length, 1);
});
