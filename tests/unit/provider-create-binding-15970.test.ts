import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { MockAgent, setGlobalDispatcher } from "undici";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "provider-binding-15970-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  API_KEY_SECRET: "provider-binding-fixture-secret",
  JWT_SECRET: "provider-binding-fixture-session-secret",
});
const network = new MockAgent();
network.disableNetConnect();
setGlobalDispatcher(network);
const core = await import("../../src/lib/db/core.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const connections = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/providers/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const fetchCalls: string[] = [];
globalThis.fetch = async (input) => {
  fetchCalls.push(String(input instanceof Request ? input.url : input));
  return Response.json({ data: [], models: [] });
};

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  fetchCalls.length = 0;
});
test.after(async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  await network.close();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function makeNode(type = "openai-compatible-chat") {
  return nodes.createProviderNode({
    id: `${type}-${randomUUID()}`,
    type,
    name: "Fixture node",
    prefix: "fixture",
    apiType: "chat",
    baseUrl: "https://first.invalid/v1",
    chatPath: "/chat/completions",
    modelsPath: "/models",
    customHeaders: { "X-Fixture": "first" },
  });
}

async function post(provider: string, providerSpecificData?: Record<string, unknown>, extra = {}) {
  const result = await POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: { "X-Skip-Model-Sync": "true" },
      body: {
        provider,
        name: "Binding fixture",
        apiKey: "sk-fixture-only-15970",
        ...(providerSpecificData ? { providerSpecificData } : {}),
        ...extra,
      },
    })
  );
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  return result;
}

async function assertRejected(result: Response, reason = /conflict/i) {
  const body = JSON.stringify(await result.json());
  assert.equal(result.status, 400, body);
  assert.match(body, reason);
  assert.equal((await connections.getProviderConnections()).length, 0);
  assert.equal(fetchCalls.length, 0, "conflict must not start credential validation upstream");
  assert.doesNotMatch(body, /sk-fixture|first\.invalid|second\.invalid|at \//);
}

for (const type of [
  "openai-compatible-chat",
  "openai-compatible-responses",
  "anthropic-compatible-cc",
]) {
  test(`${type}: sole-node fallback rejects an explicit conflicting endpoint before persistence`, async () => {
    await makeNode(type);
    await assertRejected(await post(type, { baseUrl: "https://second.invalid/v1" }));
  });
}

test("unsupported bare Anthropic type stays invalid instead of expanding the API", async () => {
  await makeNode("anthropic-compatible");
  await assertRejected(await post("anthropic-compatible"), /Invalid provider/);
});

for (const [key, value] of Object.entries({
  prefix: "other",
  apiType: "responses",
  nodeName: "Other node",
  chatPath: "/different-chat",
  modelsPath: "/different-models",
  customHeaders: { "X-Fixture": "second" },
})) {
  test(`sole-node fallback rejects conflicting ${key}`, async () => {
    await makeNode();
    await assertRejected(await post("openai-compatible-chat", { [key]: value }));
  });
}

test("matching identity preserves unrelated provider data", async () => {
  await makeNode();
  const result = await post("openai-compatible-chat", {
    baseUrl: "https://first.invalid/v1",
    customHeaders: { "X-Fixture": "first" },
    fixtureMetadata: "preserved",
  });
  assert.equal(result.status, 201, await result.clone().text());
  const rows = await connections.getProviderConnections();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].providerSpecificData.fixtureMetadata, "preserved");
  assert.equal(rows[0].providerSpecificData.baseUrl, "https://first.invalid/v1");
});

test("omitted identity retains the unambiguous type fallback", async () => {
  await makeNode();
  assert.equal((await post("openai-compatible-chat")).status, 201);
});

test("equivalent endpoint with a trailing slash is accepted", async () => {
  await makeNode();
  assert.equal(
    (await post("openai-compatible-chat", { baseUrl: "https://first.invalid/v1/" })).status,
    201
  );
});

for (const suffix of ["?tenant=team", "#destination=team"]) {
  test(`a slash inside ${suffix[0] === "?" ? "query" : "fragment"} is not pathname normalization`, async () => {
    const node = await makeNode();
    await nodes.updateProviderNode(String(node.id), {
      baseUrl: `https://first.invalid/v1${suffix}`,
    });
    await assertRejected(
      await post("openai-compatible-chat", { baseUrl: `https://first.invalid/v1${suffix}/` })
    );
  });
}

test("a pathname trailing slash is equivalent while preserving the query", async () => {
  const node = await makeNode();
  await nodes.updateProviderNode(String(node.id), {
    baseUrl: "https://first.invalid/v1?tenant=team",
  });
  assert.equal(
    (await post("openai-compatible-chat", { baseUrl: "https://first.invalid/v1/?tenant=team" }))
      .status,
    201
  );
});

test("concrete node id retains the dashboard's node-owned endpoint precedence", async () => {
  const node = await makeNode();
  const result = await post(String(node.id), { baseUrl: "https://second.invalid/v1" });
  assert.equal(result.status, 201);
  assert.equal(
    (await connections.getProviderConnections())[0].providerSpecificData.baseUrl,
    "https://first.invalid/v1"
  );
});

test("ambiguous bare type still returns404 without creating a connection", async () => {
  await makeNode();
  await makeNode();
  assert.equal((await post("openai-compatible-chat")).status, 404);
  assert.equal((await connections.getProviderConnections()).length, 0);
});

test("Cloudflare rejects top-level accountId instead of silently discarding it", async () => {
  await assertRejected(
    await post("cloudflare-ai", undefined, { accountId: "fixture-account" }),
    /providerSpecificData\.accountId/
  );
});

test("Cloudflare preserves accountId in the documented nested location", async () => {
  const result = await post("cloudflare-ai", { accountId: "fixture-account" });
  assert.equal(result.status, 201);
  assert.equal(
    (await connections.getProviderConnections())[0].providerSpecificData.accountId,
    "fixture-account"
  );
});
