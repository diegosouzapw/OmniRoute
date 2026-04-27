import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-glm-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GLM import uses international coding endpoint when apiRegion is international", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-intl",
    apiKey: "glm-key",
    providerSpecificData: { apiRegion: "international" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://api.z.ai/api/coding/paas/v4/models");
    assert.equal(init.headers.Authorization, "Bearer glm-key");
    assert.equal(init.headers["x-api-key"], undefined);
    assert.equal(init.headers["anthropic-version"], undefined);
    return Response.json({ data: [{ id: "glm-5", name: "GLM 5" }] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      provider: "glm",
      connectionId: connection.id,
      models: [{ id: "glm-5", name: "GLM 5" }],
      source: "api",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLMT import shares the GLM coding models endpoint and surfaces provider metadata correctly", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glmt",
    authType: "apikey",
    name: "glmt-intl",
    apiKey: "glmt-key",
    providerSpecificData: { apiRegion: "international" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://api.z.ai/api/coding/paas/v4/models");
    assert.equal(init.headers.Authorization, "Bearer glmt-key");
    return Response.json({ data: [{ id: "glm-5.1", name: "GLM 5.1" }] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      provider: "glmt",
      connectionId: connection.id,
      models: [{ id: "glm-5.1", name: "GLM 5.1" }],
      source: "api",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import uses China coding endpoint when apiRegion is china", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-cn",
    apiKey: "glm-cn-key",
    providerSpecificData: { apiRegion: "china" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://open.bigmodel.cn/api/coding/paas/v4/models");
    assert.equal(init.headers.Authorization, "Bearer glm-cn-key");
    return Response.json({ data: [{ id: "glm-5", name: "GLM 5" }] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.provider, "glm");
    assert.equal(body.models.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import defaults to international endpoint when apiRegion is missing", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-default",
    apiKey: "glm-key",
    providerSpecificData: {},
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.z.ai/api/coding/paas/v4/models");
    return Response.json({ data: [{ id: "glm-5", name: "GLM 5" }] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import defaults to international endpoint when apiRegion is invalid", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-bogus",
    apiKey: "glm-key",
    providerSpecificData: { apiRegion: "bogus" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.z.ai/api/coding/paas/v4/models");
    return Response.json({ data: [{ id: "glm-5", name: "GLM 5" }] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import prefers apiKey over accessToken and sends only Authorization Bearer", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-both-tokens",
    apiKey: "glm-api-key",
    accessToken: "glm-access-token",
    providerSpecificData: { apiRegion: "international" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(init.headers.Authorization, "Bearer glm-api-key");
    assert.equal(init.headers["x-api-key"], undefined);
    return Response.json({ data: [] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import falls back to accessToken when apiKey is absent", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-access-only",
    accessToken: "glm-access-token",
    providerSpecificData: { apiRegion: "international" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(init.headers.Authorization, "Bearer glm-access-token");
    return Response.json({ data: [] });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GLM import falls back to the local catalog on upstream non-OK status codes", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "glm-error",
    apiKey: "glm-key",
    providerSpecificData: { apiRegion: "international" },
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("bad gateway", { status: 502 });

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.provider, "glm");
    assert.equal(body.connectionId, connection.id);
    assert.equal(body.source, "local_catalog");
    assert.match(body.warning, /API unavailable/i);
    assert.ok(body.models.some((model) => model.id === "glm-5.1"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
