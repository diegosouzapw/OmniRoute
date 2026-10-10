import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { after, before, beforeEach, test } from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "gemini-catalog-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-gemini-catalog-key";
process.env.JWT_SECRET = "synthetic-gemini-catalog-session";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "synthetic-gemini-peer-stamp";

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const providers = await import("../../src/lib/db/providers.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const sessions = await import("../helpers/managementSession.ts");
const models = await import("../../src/lib/db/models.ts");
const gemini = await import("../../src/app/api/v1beta/models/route.ts");
const openai = await import("../../src/app/api/v1/models/catalog.ts");

type CatalogBody = {
  models?: Array<{
    name: string;
    displayName: string;
    inputTokenLimit?: number;
    outputTokenLimit?: number;
    supportedGenerationMethods?: string[];
    description?: string;
  }>;
  error?: { message: string; code?: string };
};
let port = 0;
let apiKey = "";
let exposeSocketPeer = false;
let requestOrigin = "http://catalog.example.test";
// Exercise the exported handlers over real HTTP; this does not start Next middleware.
const server = http.createServer(async (incoming, outgoing) => {
  try {
    const headers = new Headers();
    for (const [key, value] of Object.entries(incoming.headers)) {
      if (typeof value === "string") headers.set(key, value);
    }
    const request = new Request(`${requestOrigin}${incoming.url}`, {
      method: incoming.method,
      headers,
    });
    if (exposeSocketPeer) Object.defineProperty(request, "socket", { value: incoming.socket });
    const response =
      incoming.method === "OPTIONS"
        ? await gemini.OPTIONS()
        : incoming.url === "/v1/models"
          ? await openai.getUnifiedModelsResponse(request)
          : await gemini.GET(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    outgoing.writeHead(500);
    outgoing.end("fixture handler failed");
  }
});

async function getCatalog(
  headers: Record<string, string> = {},
  url = "/v1beta/models",
  method = "GET"
) {
  return new Promise<{ status: number; body: CatalogBody }>((resolve, reject) => {
    http
      .request({ host: "127.0.0.1", port, path: url, headers, method }, (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk: string) => (body += chunk));
        response.on("end", () => {
          try {
            resolve({ status: response.statusCode ?? 0, body: body ? JSON.parse(body) : {} });
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject)
      .end();
  });
}

before(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  port = address.port;
  process.env.G16207_PORT = String(port);
});

beforeEach(async () => {
  exposeSocketPeer = false;
  requestOrigin = "http://catalog.example.test";
  core.resetDbInstance();
  keys.resetApiKeyState();
  openai.__resetCatalogBuilderRunsForTest();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  await settings.updateSettings({
    password: "synthetic-test-password",
    requireLogin: true,
    requireAuthForModels: true,
  });
  await keys.createApiKey("catalog-fixture", "synthetic-machine");
  const storedKey = (await keys.getApiKeys()).find((entry) => entry.name === "catalog-fixture");
  assert.ok(storedKey);
  apiKey = storedKey.key;
  await providers.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    apiKey: "synthetic-upstream-key",
    testStatus: "active",
  });
  await models.replaceSyncedAvailableModelsForConnection("gemini", "fixture-gemini", [
    { id: "gemini-catalog-control", name: "Catalog control" },
  ]);
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  delete process.env.G16207_PORT;
  core.resetDbInstance();
  keys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("A0 valid API key returns the persisted Gemini model over HTTP", async () => {
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    result.body.models?.some((entry) => entry.name === "models/gemini/gemini-catalog-control")
  );
});

test("A1 anonymous Gemini catalog requires the same configured auth as OpenAI", async () => {
  const sibling = await getCatalog({}, "/v1/models");
  assert.equal(sibling.status, 401, "the existing OpenAI gate is the control");
  const result = await getCatalog();
  assert.equal(result.status, 401);
  assert.equal(result.body.models, undefined);
  assert.equal(result.body.error?.code, "invalid_api_key");
  assert.ok(!result.body.error?.message.includes("at /"));
});

async function seedNode(
  id: string,
  prefix: string | null,
  type = "openai-compatible",
  active = true
) {
  await nodes.createProviderNode({
    id,
    prefix,
    type,
    name: "Synthetic node",
    apiType: "chat",
    baseUrl: "https://unused.example.test/v1",
  });
  await providers.createProviderConnection({
    provider: id,
    authType: "apikey",
    apiKey: "synthetic-node-key",
    isActive: active,
    testStatus: "active",
  });
}

test("P1 synced compatible models expose the configured prefix instead of the node UUID", async () => {
  const id = "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441";
  await seedNode(id, "fixture-openai");
  await models.replaceSyncedAvailableModelsForConnection(id, "node-connection", [
    { id: "custom-model", name: "Synced custom" },
  ]);
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    result.body.models?.some((entry) => entry.name === "models/fixture-openai/custom-model")
  );
  assert.ok(!JSON.stringify(result.body).includes(id));
});

test("P2 custom Anthropic-compatible models expose the configured prefix", async () => {
  const id = "anthropic-compatible-02669115-2545-4896-b003-cb4dac09d442";
  await seedNode(id, "fixture-claude", "anthropic-compatible");
  await models.addCustomModel(id, "custom-claude", "Custom Claude");
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    result.body.models?.some((entry) => entry.name === "models/fixture-claude/custom-claude")
  );
  assert.ok(!JSON.stringify(result.body).includes(id));
});

test("A2 an invalid API key does not expose the model inventory", async () => {
  const result = await getCatalog({ authorization: "Bearer invalid-synthetic-key" });
  assert.equal(result.status, 401);
  assert.equal(result.body.models, undefined);
  assert.equal(result.body.error?.message, "Invalid API key");
});

for (const header of ["x-api-key", "x-goog-api-key"]) {
  test(`A3 valid ${header} retains catalog access`, async () => {
    const headers: Record<string, string> = { [header]: apiKey };
    if (header === "x-api-key") headers["anthropic-version"] = "2023-06-01";
    const result = await getCatalog(headers);
    assert.equal(result.status, 200);
    assert.ok(
      result.body.models?.some((entry) => entry.name === "models/gemini/gemini-catalog-control")
    );
  });
}

test("A4 a verified dashboard session retains access while an invalid cookie does not", async () => {
  const valid = await sessions.createManagementSessionHeaders();
  const result = await getCatalog(Object.fromEntries(valid));
  assert.equal(result.status, 200);
  assert.ok(result.body.models?.length);
  const invalid = await getCatalog({ cookie: "auth_token=invalid-synthetic-session" });
  assert.equal(invalid.status, 401);
  assert.equal(invalid.body.models, undefined);
});

test("A5 explicit catalog auth opt-out preserves anonymous access", async () => {
  await settings.updateSettings({ requireAuthForModels: false });
  const result = await getCatalog();
  assert.equal(result.status, 200);
  assert.ok(result.body.models?.length);
});

async function makeKeyless() {
  for (const entry of await keys.getApiKeys()) await keys.deleteApiKey(entry.id);
  // Seed an already-completed installation through the real bootstrap rule.
  // updateSettings({ setupComplete: true }) would instead start onboarding's
  // unrelated background Codex resync against a dashboard server.
  const previousPassword = process.env.INITIAL_PASSWORD;
  try {
    process.env.INITIAL_PASSWORD = "synthetic-bootstrap-only";
    await settings.getSettings();
  } finally {
    if (previousPassword === undefined) delete process.env.INITIAL_PASSWORD;
    else process.env.INITIAL_PASSWORD = previousPassword;
  }
  await settings.updateSettings({ password: null });
  const stored = await settings.getSettings();
  assert.equal(stored.setupComplete, true);
  assert.equal(stored.password, null);
  assert.equal(keys.getApiKeysCount(), 0);
  assert.equal(process.env.INITIAL_PASSWORD, undefined);
}

test("A6 keyless completed setup permits a trusted loopback socket", async () => {
  await makeKeyless();
  exposeSocketPeer = true;
  const result = await getCatalog();
  assert.equal(result.status, 200);
  assert.ok(result.body.models?.length);
});

test("A6 keyless remote context rejects forged loopback URL and headers", async () => {
  await makeKeyless();
  requestOrigin = "http://127.0.0.1";
  const result = await getCatalog({
    host: "localhost",
    "x-forwarded-for": "127.0.0.1",
    "x-omniroute-peer-ip": "wrong-token|127.0.0.1",
  });
  assert.equal(result.status, 401);
  assert.equal(result.body.models, undefined);
});

test("A7 OPTIONS remains available without an inventory", async () => {
  const result = await getCatalog({}, "/v1beta/models", "OPTIONS");
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, {});
});

test("A8 an invalid explicit key takes precedence over a valid session", async () => {
  const headers = await sessions.createManagementSessionHeaders({
    authorization: "Bearer invalid-synthetic-key",
  });
  const result = await getCatalog(Object.fromEntries(headers));
  assert.equal(result.status, 401);
  assert.equal(result.body.error?.message, "Invalid API key");
});

test("P0 built-in provider names remain unchanged", async () => {
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "synthetic-openai",
    testStatus: "active",
  });
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(result.body.models?.some((entry) => entry.name === "models/openai/gpt-4o"));
});

test("P3 P9 synced/custom dedup retains custom metadata and Gemini shape", async () => {
  const id = "openai-compatible-metadata";
  await seedNode(id, "fixture-metadata");
  await models.replaceSyncedAvailableModelsForConnection(id, "metadata-connection", [
    { id: "shared-model", name: "Synced name", inputTokenLimit: 4096, outputTokenLimit: 1024 },
  ]);
  await models.addCustomModel(
    id,
    "shared-model",
    "Custom name",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    { inputTokenLimit: 8192, outputTokenLimit: 2048 }
  );
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  const entries = result.body.models?.filter(
    (entry) => entry.name === "models/fixture-metadata/shared-model"
  );
  assert.equal(result.status, 200);
  assert.equal(entries?.length, 1);
  assert.equal(entries?.[0].displayName, "Custom name");
  assert.equal(entries?.[0].inputTokenLimit, 8192);
  assert.equal(entries?.[0].outputTokenLimit, 2048);
  assert.deepEqual(entries?.[0].supportedGenerationMethods, ["generateContent"]);
});

test("P4 listing preserves slashful model IDs without claiming POST round-trip", async () => {
  const id = "openai-compatible-slash";
  await seedNode(id, "fixture-slash");
  await models.addCustomModel(id, "vendor/model-with-slash", "Slashful model");
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    result.body.models?.some(
      (entry) => entry.name === "models/fixture-slash/vendor/model-with-slash"
    )
  );
});

test("P5 inactive nodes and hidden custom models remain absent", async () => {
  await seedNode("openai-compatible-inactive", "fixture-inactive", "openai-compatible", false);
  await models.addCustomModel("openai-compatible-inactive", "inactive-only", "Inactive");
  await seedNode("openai-compatible-hidden", "fixture-hidden");
  await models.addCustomModel("openai-compatible-hidden", "hidden-only", "Hidden");
  await models.updateCustomModel("openai-compatible-hidden", "hidden-only", { isHidden: true });
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    !result.body.models?.some(
      (entry) => entry.name.includes("inactive-only") || entry.name.includes("hidden-only")
    )
  );
});

test("P6 independent nodes keep separate identities for the same model", async () => {
  await seedNode("openai-compatible-left", "fixture-left");
  await seedNode("openai-compatible-right", "fixture-right");
  await models.addCustomModel("openai-compatible-left", "shared-id", "Left metadata");
  await models.addCustomModel("openai-compatible-right", "shared-id", "Right metadata");
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.equal(
    result.body.models?.find((entry) => entry.name === "models/fixture-left/shared-id")
      ?.displayName,
    "Left metadata"
  );
  assert.equal(
    result.body.models?.find((entry) => entry.name === "models/fixture-right/shared-id")
      ?.displayName,
    "Right metadata"
  );
});

for (const prefix of [null, "openai"]) {
  test(`P7 node with ${prefix === null ? "missing" : "reserved"} prefix is not advertised by UUID or name`, async () => {
    const id = "openai-compatible-ineligible";
    await seedNode(id, prefix);
    await models.addCustomModel(id, "ineligible-only", "Ineligible");
    await models.replaceSyncedAvailableModelsForConnection(id, "ineligible-connection", [
      { id: "ineligible-synced", name: "Ineligible synced" },
    ]);
    const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
    assert.equal(result.status, 200);
    assert.ok(!result.body.models?.some((entry) => entry.name.includes("ineligible")));
  });
}

for (const winnerActive of [true, false]) {
  test(`P7 collision retains runtime ownership with winner active=${winnerActive}`, async () => {
    await seedNode("anthropic-compatible-first", "fixture-collision", "anthropic-compatible");
    await seedNode("openai-compatible-a", "fixture-collision", "openai-compatible", winnerActive);
    await seedNode("openai-compatible-z", "fixture-collision");
    for (const [id, model] of [
      ["anthropic-compatible-first", "anthropic-loser"],
      ["openai-compatible-a", "winner-only"],
      ["openai-compatible-z", "openai-loser"],
    ]) {
      await models.addCustomModel(id, model, model);
      await models.replaceSyncedAvailableModelsForConnection(id, `${id}-connection`, [
        { id: `${model}-synced`, name: model },
      ]);
    }
    const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
    assert.equal(result.status, 200);
    assert.deepEqual(
      result.body.models
        ?.filter((entry) => entry.name.includes("fixture-collision"))
        .map((entry) => entry.name)
        .sort(),
      winnerActive
        ? ["models/fixture-collision/winner-only", "models/fixture-collision/winner-only-synced"]
        : []
    );
    assert.ok(!JSON.stringify(result.body).includes("loser"));
  });
}

test("P8 changing the configured prefix is visible on the next request", async () => {
  const id = "openai-compatible-rename";
  await seedNode(id, "fixture-before");
  await models.addCustomModel(id, "rename-model", "Rename");
  assert.ok(
    (await getCatalog({ authorization: `Bearer ${apiKey}` })).body.models?.some(
      (entry) => entry.name === "models/fixture-before/rename-model"
    )
  );
  await nodes.updateProviderNode(id, { prefix: "fixture-after" });
  const result = await getCatalog({ authorization: `Bearer ${apiKey}` });
  assert.equal(result.status, 200);
  assert.ok(
    result.body.models?.some((entry) => entry.name === "models/fixture-after/rename-model")
  );
  assert.ok(!result.body.models?.some((entry) => entry.name.includes("fixture-before")));
});

test("A3 bare x-api-key keeps the existing Anthropic scoping requirement", async () => {
  const result = await getCatalog({ "x-api-key": apiKey });
  assert.equal(result.status, 401);
  assert.equal(result.body.models, undefined);
});
