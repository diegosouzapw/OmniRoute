// #6874 — VibeProxy (github.com/automazeio/vibeproxy) provider-node preset.
// TDD regression guard for `preset: "vibeproxy-openai"` on
// POST /api/provider-nodes: defaults name/prefix/apiType, still requires an
// explicit baseUrl, and normalizes the caller-supplied baseUrl to its `/v1`
// root the same way the existing Anthropic/Claude-Code-compatible presets do.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vibeproxy-preset-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const { OPENAI_COMPATIBLE_PREFIX } = await import("../../src/shared/constants/providers.ts");

interface ProviderNodeErrorBody {
  error: { message: string; details?: { field: string; message: string }[] };
}

interface ProviderNodeResponseBody {
  node: {
    id: string;
    type: string;
    prefix: string;
    name: string;
    apiType?: string;
    baseUrl: string;
  };
}

async function resetStorage() {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(body: unknown) {
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

test("vibeproxy-openai preset creates a node with defaulted name/prefix/apiType", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      preset: "vibeproxy-openai",
      baseUrl: "http://localhost:8317",
    })
  );
  const body = (await response.json()) as ProviderNodeResponseBody;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${OPENAI_COMPATIBLE_PREFIX}chat-`));
  assert.equal(body.node.type, "openai-compatible");
  assert.equal(body.node.name, "VibeProxy");
  assert.equal(body.node.prefix, "vibeproxy");
  assert.equal(body.node.apiType, "chat");
  assert.equal(body.node.baseUrl, "http://localhost:8317/v1");
});

test("vibeproxy-openai preset normalizes a baseUrl with a /chat/completions suffix", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      preset: "vibeproxy-openai",
      baseUrl: "http://localhost:8317/v1/chat/completions",
    })
  );
  const body = (await response.json()) as ProviderNodeResponseBody;

  assert.equal(response.status, 201);
  assert.equal(body.node.baseUrl, "http://localhost:8317/v1");
});

test("vibeproxy-openai preset appends /v1 when the caller omits it", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      preset: "vibeproxy-openai",
      baseUrl: "http://localhost:9000",
    })
  );
  const body = (await response.json()) as ProviderNodeResponseBody;

  assert.equal(response.status, 201);
  assert.equal(body.node.baseUrl, "http://localhost:9000/v1");
});

test("vibeproxy-openai preset honors caller-supplied name/prefix instead of the defaults", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      preset: "vibeproxy-openai",
      name: "My VibeProxy",
      prefix: "my-vibeproxy",
      baseUrl: "http://localhost:8317",
    })
  );
  const body = (await response.json()) as ProviderNodeResponseBody;

  assert.equal(response.status, 201);
  assert.equal(body.node.name, "My VibeProxy");
  assert.equal(body.node.prefix, "my-vibeproxy");
});

test("vibeproxy-openai preset rejects a missing baseUrl (no silent default)", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      preset: "vibeproxy-openai",
    })
  );
  const body = (await response.json()) as ProviderNodeErrorBody;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid request");
  assert.match(
    body.error.details?.find((d) => d.field === "baseUrl")?.message || "",
    /Base URL is required for the VibeProxy preset/
  );
  assert.deepEqual(await providersDb.getProviderNodes(), []);
});
