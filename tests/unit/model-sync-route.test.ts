import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// FASE-01: API_KEY_SECRET is required for CRC operations (no hardcoded fallback)
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-model-sync-secret-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const originalFetch = globalThis.fetch;

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function enableAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

test("model sync route skips success log when fetched models do not change stored models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "custom-model-1",
      name: "Custom Model 1",
      source: "auto-sync",
    },
  ]);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [{ id: "custom-model-1", name: "Custom Model 1" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.logged, false);
    assert.deepEqual(body.modelChanges, { added: 0, removed: 0, updated: 0, total: 0 });

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model sync route stores the real provider while keeping the account label", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "MAIN",
    displayName: "OpenRouter Main",
    apiKey: "test-key",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [{ id: "custom-model-2", name: "Custom Model 2" }],
    });
  };

  try {
    const response = await modelSyncRoute.POST(
      new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
        method: "POST",
        headers: scheduler.buildModelSyncInternalHeaders(),
      }),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as any;
    assert.equal(body.logged, true);
    assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
    assert.equal(body.provider, "openrouter");

    const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });
    assert.equal(logs.length, 1);
    assert.equal(logs[0].provider, "openrouter");
    assert.equal(logs[0].account, "MAIN");
    assert.equal(logs[0].model, "model-sync");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("model sync route requires authentication for external requests when auth is enabled", async () => {
  await resetStorage();
  await enableAuth();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Protected Connection",
    apiKey: "test-key",
  });

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(body.error.message, "Authentication required");
  assert.equal(body.error.type, "invalid_api_key");
});

test("model sync route returns 404 for unknown connections after internal auth passes", async () => {
  await resetStorage();

  const response = await modelSyncRoute.POST(
    new Request("http://localhost/api/providers/missing/sync-models", {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: "missing" } }
  );

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Connection not found" });
});

test("model sync route propagates upstream failures and records an error log entry", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Error Branch",
    apiKey: "test-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({ error: "Provider upstream unavailable" }, { status: 502 });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 502);
  assert.equal(body.error, "Provider upstream unavailable");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 502);
  assert.equal(logs[0].provider, "openrouter");
  assert.equal(logs[0].path, `/api/providers/${connection.id}/models`);
});

test("model sync route falls back to the upstream HTTP status when the models payload has no error field", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Rate Limited Sync",
    apiKey: "test-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({}, { status: 429 });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 429);
  assert.equal(body.error, "Failed to fetch models");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 429);
  assert.equal(logs[0].error, "HTTP 429");
});

test("model sync route preserves previously synced models when the upstream omits the models list", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "No Models Returned",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "persisted-model",
      name: "Persisted Model",
      source: "auto-sync",
    },
  ]);

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({});
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.syncedModels, 1);
  assert.equal(body.logged, false);
  assert.deepEqual(body.modelChanges, { added: 0, removed: 0, updated: 0, total: 0 });
  assert.deepEqual(body.models, [
    {
      id: "persisted-model",
      name: "Persisted Model",
      source: "auto-sync",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat"],
    },
  ]);
  assert.equal(logs.length, 0);
});

test("model sync route writes synced available models for Gemini connections", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "Gemini Sync",
    apiKey: "gm-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [
        {
          id: "gemini-custom-preview",
          name: "Gemini Custom Preview",
          supportedEndpoints: ["chat", "embeddings"],
          inputTokenLimit: 32768,
          outputTokenLimit: 8192,
          description: "Custom Gemini preview model",
          supportsThinking: true,
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const synced = await modelsDb.getSyncedAvailableModels("gemini");
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.provider, "gemini");
  assert.equal(body.syncedModels, 1);
  assert.equal(body.logged, true);
  assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
  assert.deepEqual(body.models, [
    {
      id: "gemini-custom-preview",
      name: "Gemini Custom Preview",
      source: "api-sync",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat", "embeddings"],
      inputTokenLimit: 32768,
      outputTokenLimit: 8192,
      description: "Custom Gemini preview model",
      supportsThinking: true,
    },
  ]);
  assert.deepEqual(synced, [
    {
      id: "gemini-custom-preview",
      name: "Gemini Custom Preview",
      source: "api-sync",
      supportedEndpoints: ["chat", "embeddings"],
      inputTokenLimit: 32768,
      outputTokenLimit: 8192,
      description: "Custom Gemini preview model",
      supportsThinking: true,
    },
  ]);
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
});

test("model sync route writes synced available models for non-Gemini providers too", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "opencode-go",
    authType: "apikey",
    name: "OpenCode Go Sync",
    apiKey: "opencode-go-key",
  });

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [
        {
          id: "glm-5.1",
          name: "GLM 5.1",
          supportedEndpoints: ["chat"],
          inputTokenLimit: 262144,
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const synced = await modelsDb.getSyncedAvailableModels("opencode-go");

  assert.equal(response.status, 200);
  assert.equal(body.provider, "opencode-go");
  assert.equal(body.syncedModels, 1);
  assert.deepEqual(synced, [
    {
      id: "glm-5.1",
      name: "GLM 5.1",
      source: "api-sync",
      supportedEndpoints: ["chat"],
      inputTokenLimit: 262144,
    },
  ]);
});

test("model sync route import mode merges discovered models without deleting manual models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter Import",
    apiKey: "test-key",
  });

  await modelsDb.addCustomModel("openrouter", "manual-only", "Manual Only", "manual");
  await localDb.setModelAlias("manual-only", "openrouter/manual-only");

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [{ id: "router-v4", name: "Router V4" }],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const aliases = await localDb.getModelAliases();

  assert.equal(response.status, 200);
  assert.equal(body.mode, "merge");
  assert.equal(body.importedCount, 1);
  assert.equal(body.updatedCount, 0);
  assert.equal(body.syncedAliases, 1);
  assert.deepEqual(body.modelChanges, { added: 1, removed: 0, updated: 0, total: 1 });
  assert.deepEqual(
    body.models.map((model) => ({ id: model.id, source: model.source })),
    [
      { id: "manual-only", source: "manual" },
      { id: "router-v4", source: "api-sync" },
    ]
  );
  assert.deepEqual(
    body.importedModels.map((model) => ({ id: model.id, source: model.source })),
    [{ id: "router-v4", source: "api-sync" }]
  );
  assert.equal(aliases["manual-only"], "openrouter/manual-only");
  assert.equal(aliases["router-v4"], "openrouter/router-v4");
});

test("model sync route import mode ignores supported endpoint ordering changes", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter Import Stable",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "router-v4",
      name: "Router V4",
      source: "api-sync",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat", "embeddings"],
    },
  ]);

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [
        {
          id: "router-v4",
          name: "Router V4",
          supportedEndpoints: ["embeddings", "chat"],
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.importedCount, 0);
  assert.equal(body.updatedCount, 0);
  assert.deepEqual(body.importedChanges, { added: 0, updated: 0, unchanged: 1, total: 0 });
  assert.deepEqual(body.modelChanges, { added: 0, removed: 0, updated: 0, total: 0 });
  assert.equal(body.logged, false);
  assert.deepEqual(body.importedModels, []);
  assert.deepEqual(
    body.models.map((model) => ({
      id: model.id,
      supportedEndpoints: model.supportedEndpoints,
    })),
    [{ id: "router-v4", supportedEndpoints: ["chat", "embeddings"] }]
  );
  assert.equal(logs.length, 0);
});

test("model sync route import mode reports updates without counting them as new imports", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "OpenRouter Import Update",
    apiKey: "test-key",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "router-v4",
      name: "Router V4",
      source: "api-sync",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat"],
    },
  ]);

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [
        {
          id: "router-v4",
          name: "Router V4 Updated",
          supportedEndpoints: ["chat", "embeddings"],
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.importedCount, 0);
  assert.equal(body.updatedCount, 1);
  assert.deepEqual(body.importedChanges, { added: 0, updated: 1, unchanged: 0, total: 1 });
  assert.deepEqual(body.importedModels, []);
  assert.deepEqual(
    body.models.map((model) => ({
      id: model.id,
      name: model.name,
      supportedEndpoints: model.supportedEndpoints,
    })),
    [
      {
        id: "router-v4",
        name: "Router V4 Updated",
        supportedEndpoints: ["chat", "embeddings"],
      },
    ]
  );
  assert.equal(body.logged, true);
  assert.equal(logs.length, 1);
});

test("model sync route records added, removed, and updated model diffs with fallback identifiers", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "oauth",
    email: "sync@example.com",
    accessToken: "sync-token",
  });

  await modelsDb.replaceCustomModels("openrouter", [
    {
      id: "persisted-model",
      name: "Persisted Model",
      source: "auto-sync",
    },
    {
      id: "removed-model",
      name: "Removed Model",
      source: "auto-sync",
    },
  ]);

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [
        {
          id: "persisted-model",
          name: "Persisted Model v2",
          supportedEndpoints: ["chat", "embeddings"],
        },
        {
          model: "fallback-model",
          displayName: "Fallback Model",
          description: "Fallback from model field",
        },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.syncedModels, 2);
  assert.equal(body.logged, true);
  assert.deepEqual(body.modelChanges, { added: 1, removed: 1, updated: 1, total: 3 });
  assert.deepEqual(
    body.models.map((model) => ({
      id: model.id,
      name: model.name,
      supportedEndpoints: model.supportedEndpoints,
      description: model.description,
    })),
    [
      {
        id: "persisted-model",
        name: "Persisted Model v2",
        supportedEndpoints: ["chat", "embeddings"],
        description: undefined,
      },
      {
        id: "fallback-model",
        name: "Fallback Model",
        supportedEndpoints: ["chat"],
        description: "Fallback from model field",
      },
    ]
  );
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
  assert.equal(logs[0].provider, "openrouter");
  assert.ok(logs[0].account.includes("*"), `Expected masked email, got: ${logs[0].account}`);
});

test("model sync route forwards cookies, filters built-ins, and syncs aliases for internal requests", async () => {
  await resetStorage();
  await enableAuth();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "External Sync",
    displayName: "OpenRouter External",
    apiKey: "test-key",
  });

  await localDb.setModelAlias("stale-model", "openrouter/stale-model");
  await localDb.setModelAlias("router-v2", "other-provider/router-v2");

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    assert.equal(init.headers.cookie, "session=test-cookie");
    assert.equal(
      init.headers[scheduler.getModelSyncInternalAuthHeaderName()],
      scheduler.buildModelSyncInternalHeaders()[scheduler.getModelSyncInternalAuthHeaderName()]
    );

    return Response.json({
      models: [
        { id: "auto", name: "Auto (Best Available)" },
        { id: "router-v2", name: "Router V2" },
        { id: "router-v3", name: "Router V3" },
      ],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: {
        cookie: "session=test-cookie",
        ...scheduler.buildModelSyncInternalHeaders(),
      },
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const aliases = await localDb.getModelAliases();
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 200);
  assert.equal(body.provider, "openrouter");
  assert.equal(body.syncedModels, 3);
  assert.equal(body.availableModelsCount, 3);
  assert.equal(body.syncedAliases, 2);
  assert.equal(body.logged, true);
  assert.deepEqual(body.modelChanges, { added: 2, removed: 0, updated: 0, total: 2 });
  assert.deepEqual(
    body.models.map((model) => ({ id: model.id, name: model.name })),
    [
      { id: "router-v2", name: "Router V2" },
      { id: "router-v3", name: "Router V3" },
    ]
  );
  assert.equal(aliases["stale-model"], undefined);
  assert.equal(aliases["openrouter-router-v2"], "openrouter/router-v2");
  assert.equal(aliases["router-v3"], "openrouter/router-v3");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 200);
  assert.equal(logs[0].account, "External Sync");
});

test("model sync route reports synced managed models separately from preserved manual models", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Mixed Sync",
    apiKey: "test-key",
  });

  await modelsDb.addCustomModel("openrouter", "manual-only", "Manual Only", "manual");

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [{ id: "router-v4", name: "Router V4" }],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.syncedModels, 1);
  assert.equal(body.availableModelsCount, 2);
  assert.equal(body.importedCount, 1);
  assert.equal(body.updatedCount, 0);
  assert.deepEqual(
    body.models.map((model) => ({ id: model.id, source: model.source })),
    [
      { id: "manual-only", source: "manual" },
      { id: "router-v4", source: "api-sync" },
    ]
  );
});

test("model sync route uses provider-node prefixes when syncing compatible-provider aliases", async () => {
  await resetStorage();

  await providersDb.createProviderNode({
    id: "anthropic-compatible-demo",
    type: "anthropic-compatible",
    name: "Anthropic Demo",
    prefix: "cm",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: "anthropic-compatible-demo",
    authType: "apikey",
    name: "Compatible Sync",
    apiKey: "compat-key",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/messages",
      modelsPath: "/v1/models",
    },
  });

  await localDb.setModelAlias("sonnet-4-6", "some-other-provider/sonnet-4-6");

  globalThis.fetch = async (url) => {
    assert.equal(
      String(url),
      `http://localhost/api/providers/${connection.id}/models?refresh=true`
    );
    return Response.json({
      models: [{ id: "sonnet-4-6", name: "Sonnet 4.6" }],
    });
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const aliases = await localDb.getModelAliases();

  assert.equal(response.status, 200);
  assert.equal(body.provider, "anthropic-compatible-demo");
  assert.equal(body.syncedAliases, 1);
  assert.equal(aliases["cm-sonnet-4-6"], "anthropic-compatible-demo/sonnet-4-6");
});

test("model sync route returns 500 and records a failure when the internal models fetch throws", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "Exploding Sync",
    apiKey: "test-key",
  });

  globalThis.fetch = async () => {
    throw new Error("network exploded");
  };

  const response = await modelSyncRoute.POST(
    new Request(`http://localhost/api/providers/${connection.id}/sync-models`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as any;
  const logs = await callLogs.getCallLogs({ model: "model-sync", limit: 10 });

  assert.equal(response.status, 500);
  assert.equal(body.error, "network exploded");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].status, 500);
  assert.equal(logs[0].provider, "openrouter");
});
