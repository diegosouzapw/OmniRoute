import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-nodes-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const { OPENAI_COMPATIBLE_PREFIX, ANTHROPIC_COMPATIBLE_PREFIX, CLAUDE_CODE_COMPATIBLE_PREFIX } =
  await import("../../src/shared/constants/providers.ts");

const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
const originalAllowLocalProviderUrls = process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;

async function resetStorage() {
  delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
  if (originalAllowLocalProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = originalAllowLocalProviderUrls;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(body) {
  return new Request("http://localhost/api/provider-nodes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider nodes route lists stored nodes and exposes the CC feature flag", async () => {
  await providersDb.createProviderNode({
    id: "openai-compatible-chat-seeded",
    name: "Seeded Node",
    prefix: "seed",
    type: "openai-compatible",
    apiType: "chat",
    baseUrl: "https://seed.example.com/v1",
  });

  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";
  const response = await providerNodesRoute.GET();
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.ccCompatibleProviderEnabled, true);
  assert.equal(body.nodes.length, 1);
  assert.equal(body.nodes[0].name, "Seeded Node");
});

test("provider nodes route rejects malformed JSON and schema validation failures", async () => {
  const malformed = await providerNodesRoute.POST(
    new Request("http://localhost/api/provider-nodes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalid = await providerNodesRoute.POST(
    makeRequest({
      name: "Missing API Type",
      prefix: "missing-api-type",
    })
  );

  const malformedBody = (await malformed.json()) as any;
  const invalidBody = (await invalid.json()) as any;

  assert.equal(malformed.status, 400);
  assert.equal(malformedBody.error.message, "Invalid request");
  assert.deepEqual(malformedBody.error.details, [{ field: "body", message: "Invalid JSON body" }]);

  assert.equal(invalid.status, 400);
  assert.equal(invalidBody.error.message, "Invalid request");
  assert.match(
    invalidBody.error.details.find((detail) => detail.field === "apiType")?.message || "",
    /Invalid OpenAI compatible API type/
  );
});

test("provider nodes route creates OpenAI-compatible nodes with normalized defaults", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "  OpenAI Proxy  ",
      prefix: "  openlike  ",
      apiType: "chat",
      baseUrl: " https://proxy.example.com/v1 ",
      chatPath: "",
      modelsPath: "",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${OPENAI_COMPATIBLE_PREFIX}chat-`));
  assert.equal(body.node.type, "openai-compatible");
  assert.equal(body.node.name, "OpenAI Proxy");
  assert.equal(body.node.prefix, "openlike");
  assert.equal(body.node.baseUrl, "https://proxy.example.com/v1");
  assert.equal(body.node.chatPath, null);
  assert.equal(body.node.modelsPath, null);
});

test("provider nodes route allows local OpenAI-compatible base URLs by default", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Local Proxy",
      prefix: "local-proxy",
      apiType: "chat",
      baseUrl: "http://127.0.0.1:11434/v1",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.equal(body.node.baseUrl, "http://127.0.0.1:11434/v1");
});

test("provider nodes route blocks local base URLs when local provider URLs are disabled", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "false";

  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Local Proxy",
      prefix: "local-proxy",
      apiType: "chat",
      baseUrl: "http://127.0.0.1:11434/v1",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.deepEqual(body.error.details, [
    { field: "baseUrl", message: "Blocked private or local provider URL" },
  ]);
  assert.deepEqual(await providersDb.getProviderNodes(), []);
});

test("provider nodes route blocks cloud metadata base URLs by default", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;

  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Metadata Proxy",
      prefix: "metadata-proxy",
      apiType: "chat",
      baseUrl: "http://169.254.169.254/latest/meta-data",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.deepEqual(body.error.details, [
    { field: "baseUrl", message: "Blocked cloud-metadata endpoint" },
  ]);
  assert.deepEqual(await providersDb.getProviderNodes(), []);
});

test("provider nodes route sanitizes invalid base URL errors", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Bad URL",
      prefix: "bad-url",
      apiType: "chat",
      baseUrl: "not a url with secret-token",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.deepEqual(body.error.details, [
    { field: "baseUrl", message: "Invalid provider base URL format" },
  ]);
  assert.doesNotMatch(JSON.stringify(body), /secret-token/);
});

test("provider nodes route creates Anthropics-compatible nodes and sanitizes messages URLs", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      type: "anthropic-compatible",
      name: "  Anthropic Gateway  ",
      prefix: "  anthropicx  ",
      baseUrl: " https://anthropic.example.com/v1/messages?beta=1 ",
      modelsPath: "/models",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${ANTHROPIC_COMPATIBLE_PREFIX}`));
  assert.equal(body.node.type, "anthropic-compatible");
  assert.equal(body.node.name, "Anthropic Gateway");
  assert.equal(body.node.prefix, "anthropicx");
  assert.equal(body.node.baseUrl, "https://anthropic.example.com/v1");
  assert.equal(body.node.modelsPath, "/models");
});

test("provider nodes route blocks CC-compatible nodes when the feature flag is disabled", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      type: "anthropic-compatible",
      compatMode: "cc",
      name: "Claude Code Disabled",
      prefix: "cc-disabled",
      baseUrl: "https://cc.example.com/v1/messages?beta=1",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 403);
  assert.equal(body.error, "CC Compatible provider is disabled");
});

test("provider nodes route creates CC-compatible nodes with CC-specific URL normalization", async () => {
  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";

  const response = await providerNodesRoute.POST(
    makeRequest({
      type: "anthropic-compatible",
      compatMode: "cc",
      name: " Claude Code Gateway ",
      prefix: " cc-gateway ",
      baseUrl: " https://cc.example.com/v1/messages?beta=1 ",
      chatPath: "/chat",
      modelsPath: "/models",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${CLAUDE_CODE_COMPATIBLE_PREFIX}`));
  assert.equal(body.node.type, "anthropic-compatible");
  assert.equal(body.node.name, "Claude Code Gateway");
  assert.equal(body.node.prefix, "cc-gateway");
  assert.equal(body.node.baseUrl, "https://cc.example.com");
  assert.equal(body.node.chatPath, "/chat");
  assert.equal(body.node.modelsPath, null);
});

test("provider nodes update route allows local base URLs by default", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const created = await providersDb.createProviderNode({
    id: "openai-compatible-chat-update-test",
    name: "Update Target",
    prefix: "update-target",
    type: "openai-compatible",
    apiType: "chat",
    baseUrl: "https://proxy.example.com/v1",
  });

  const response = await providerNodesIdRoute.PUT(
    new Request(`http://localhost/api/provider-nodes/${created.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Update Target",
        prefix: "update-target",
        apiType: "chat",
        baseUrl: "http://localhost:11434/v1",
      }),
    }),
    { params: Promise.resolve({ id: created.id as string }) }
  );
  const body = (await response.json()) as any;
  const stored = await providersDb.getProviderNodeById(created.id as string);

  assert.equal(response.status, 200);
  assert.equal(body.node.baseUrl, "http://localhost:11434/v1");
  assert.equal(stored?.baseUrl, "http://localhost:11434/v1");
});

test("provider nodes update route blocks cloud metadata base URLs by default", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;

  const created = await providersDb.createProviderNode({
    id: "openai-compatible-chat-update-test",
    name: "Update Target",
    prefix: "update-target",
    type: "openai-compatible",
    apiType: "chat",
    baseUrl: "https://proxy.example.com/v1",
  });

  const response = await providerNodesIdRoute.PUT(
    new Request(`http://localhost/api/provider-nodes/${created.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Update Target",
        prefix: "update-target",
        apiType: "chat",
        baseUrl: "http://metadata.google.internal/computeMetadata/v1",
      }),
    }),
    { params: Promise.resolve({ id: created.id as string }) }
  );
  const body = (await response.json()) as any;
  const stored = await providersDb.getProviderNodeById(created.id as string);

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.deepEqual(body.error.details, [
    { field: "baseUrl", message: "Blocked cloud-metadata endpoint" },
  ]);
  assert.equal(stored?.baseUrl, "https://proxy.example.com/v1");
});
