// #2166 — custom remote icon URL for OpenAI-/Anthropic-compatible provider nodes.
// Mirrors the structure of tests/unit/custom-headers-provider-nodes.test.ts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-icon-url-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const { OPENAI_COMPATIBLE_PREFIX } = await import("../../src/shared/constants/providers.ts");
const { createProviderNodeSchema, updateProviderNodeSchema } =
  await import("../../src/shared/validation/schemas.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/provider-nodes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/provider-nodes/${id}`, {
    method: "PUT",
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

test("createProviderNodeSchema accepts a valid iconUrl", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    apiType: "chat",
    iconUrl: "https://example.com/logo.png",
  });
  assert.equal(result.success, true);
});

test("createProviderNodeSchema accepts an empty iconUrl (no custom icon)", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    apiType: "chat",
    iconUrl: "",
  });
  assert.equal(result.success, true);
});

test("createProviderNodeSchema accepts a missing iconUrl", () => {
  const result = createProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    apiType: "chat",
  });
  assert.equal(result.success, true);
});

test("createProviderNodeSchema rejects a non-URL or non-http(s) iconUrl", () => {
  // "   " is intentionally NOT in this list — it trims to "" (no custom icon),
  // matching the chatPath/modelsPath convention for optional path-like fields.
  const invalidInputs = ["not-a-url", "javascript:alert(1)", "data:text/html,evil", "ftp://broken"];
  for (const iconUrl of invalidInputs) {
    const result = createProviderNodeSchema.safeParse({
      name: "Test",
      prefix: "test",
      apiType: "chat",
      iconUrl,
    });
    assert.equal(result.success, false, `Should reject: ${JSON.stringify(iconUrl)}`);
  }
});

test("updateProviderNodeSchema accepts a valid iconUrl", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    baseUrl: "https://test.com",
    iconUrl: "https://example.com/logo.png",
  });
  assert.equal(result.success, true);
});

test("updateProviderNodeSchema rejects a non-URL iconUrl", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    baseUrl: "https://test.com",
    iconUrl: "not-a-url",
  });
  assert.equal(result.success, false);
});

test("provider nodes route creates an OpenAI-compatible node with iconUrl", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Icon URL Node",
      prefix: "icon-url",
      apiType: "chat",
      baseUrl: "https://custom.example.com/v1",
      iconUrl: "https://cdn.example.com/icons/custom.png",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${OPENAI_COMPATIBLE_PREFIX}chat-`));
  assert.equal(body.node.iconUrl, "https://cdn.example.com/icons/custom.png");
});

test("provider nodes route creates nodes without iconUrl (null)", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "No Icon Node",
      prefix: "no-icon",
      apiType: "chat",
      baseUrl: "https://noicon.example.com/v1",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.equal(body.node.iconUrl, null);
});

test("provider nodes route update modifies iconUrl", async () => {
  const createResponse = await providerNodesRoute.POST(
    makeRequest({
      name: "Original Node",
      prefix: "original-icon",
      apiType: "chat",
      baseUrl: "https://original.example.com/v1",
    })
  );
  const created = (await createResponse.json()) as any;
  const nodeId = created.node.id;
  assert.equal(created.node.iconUrl, null);

  const updateResponse = await providerNodesIdRoute.PUT(
    makeUpdateRequest(nodeId, {
      name: "Updated Node",
      prefix: "updated-icon",
      apiType: "chat",
      baseUrl: "https://updated.example.com/v1",
      iconUrl: "https://cdn.example.com/icons/updated.png",
    }),
    { params: Promise.resolve({ id: nodeId }) }
  );
  const updated = (await updateResponse.json()) as any;

  assert.equal(updateResponse.status, 200);
  assert.equal(updated.node.iconUrl, "https://cdn.example.com/icons/updated.png");
});

test("provider nodes route update can clear iconUrl by passing an empty string", async () => {
  const createResponse = await providerNodesRoute.POST(
    makeRequest({
      name: "Node With Icon",
      prefix: "with-icon",
      apiType: "chat",
      baseUrl: "https://withicon.example.com/v1",
      iconUrl: "https://cdn.example.com/icons/keep.png",
    })
  );
  const created = (await createResponse.json()) as any;
  const nodeId = created.node.id;
  assert.equal(created.node.iconUrl, "https://cdn.example.com/icons/keep.png");

  const updateResponse = await providerNodesIdRoute.PUT(
    makeUpdateRequest(nodeId, {
      name: "Node Without Icon",
      prefix: "no-clear",
      apiType: "chat",
      baseUrl: "https://noclear.example.com/v1",
      iconUrl: "",
    }),
    { params: Promise.resolve({ id: nodeId }) }
  );
  const updated = (await updateResponse.json()) as any;

  assert.equal(updateResponse.status, 200);
  assert.equal(updated.node.iconUrl, null);
});

test("db: createProviderNode and getProviderNodeById round-trip iconUrl", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-icon-url-db",
    type: "openai-compatible",
    name: "DB Icon URL Test",
    prefix: "db-icon",
    apiType: "chat",
    baseUrl: "https://db.example.com/v1",
    iconUrl: "https://cdn.example.com/icons/db.png",
  });

  assert.equal(node.iconUrl, "https://cdn.example.com/icons/db.png");

  const retrieved = await providersDb.getProviderNodeById("openai-compatible-chat-icon-url-db");
  assert.equal(retrieved.iconUrl, "https://cdn.example.com/icons/db.png");
});

test("db: createProviderNode without iconUrl stores null", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-no-icon-db",
    type: "openai-compatible",
    name: "DB No Icon Test",
    prefix: "db-no-icon",
    apiType: "chat",
    baseUrl: "https://db-no-icon.example.com/v1",
  });

  assert.equal(node.iconUrl, null);
});

test("db: updateProviderNode modifies iconUrl", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-update-icon",
    type: "openai-compatible",
    name: "Update Icon Test",
    prefix: "update-icon",
    apiType: "chat",
    baseUrl: "https://update-icon.example.com/v1",
    iconUrl: "https://cdn.example.com/icons/initial.png",
  });

  assert.equal(node.iconUrl, "https://cdn.example.com/icons/initial.png");

  const updated = await providersDb.updateProviderNode("openai-compatible-chat-update-icon", {
    iconUrl: "https://cdn.example.com/icons/updated.png",
  });

  assert.equal(updated.iconUrl, "https://cdn.example.com/icons/updated.png");

  const retrieved = await providersDb.getProviderNodeById("openai-compatible-chat-update-icon");
  assert.equal(retrieved.iconUrl, "https://cdn.example.com/icons/updated.png");
});

test("db: updateProviderNode can clear iconUrl by passing null", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-clear-icon",
    type: "openai-compatible",
    name: "Clear Icon Test",
    prefix: "clear-icon",
    apiType: "chat",
    baseUrl: "https://clear-icon.example.com/v1",
    iconUrl: "https://cdn.example.com/icons/clear-me.png",
  });

  assert.equal(node.iconUrl, "https://cdn.example.com/icons/clear-me.png");

  const updated = await providersDb.updateProviderNode("openai-compatible-chat-clear-icon", {
    iconUrl: null,
  });

  assert.equal(updated.iconUrl, null);

  const retrieved = await providersDb.getProviderNodeById("openai-compatible-chat-clear-icon");
  assert.equal(retrieved.iconUrl, null);
});
