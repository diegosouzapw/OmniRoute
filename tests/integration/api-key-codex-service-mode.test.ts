import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Database from "better-sqlite3";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("key-service-mode");
const providers = await import("../../src/lib/db/providers.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
type RecordedBody = Record<string, unknown>;
let calls: RecordedBody[] = [];
let firstConnectionId: string;

test("service mode: migration preserves existing rows and rejects invalid values", () => {
  const db = new Database(":memory:");
  try {
    db.exec(
      "CREATE TABLE api_keys (id TEXT PRIMARY KEY); INSERT INTO api_keys VALUES ('existing');"
    );
    db.exec(
      readFileSync(
        new URL("../../src/lib/db/migrations/179_api_key_codex_service_mode.sql", import.meta.url),
        "utf8"
      )
    );
    assert.deepEqual(db.prepare("SELECT * FROM api_keys").get(), {
      id: "existing",
      codex_service_mode: "inherit",
    });
    assert.throws(() => db.exec("UPDATE api_keys SET codex_service_mode = 'invalid'"));
  } finally {
    db.close();
  }
});

test("service mode: management PATCH and GET round-trip the setting", async () => {
  const { PATCH, GET } = await import("../../src/app/api/keys/[id]/route.ts");
  const key = await h.seedApiKey();
  const context = { params: Promise.resolve({ id: key.id }) };
  const response = await PATCH(
    new Request("http://localhost/api/keys/" + key.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codexServiceMode: "default" }),
    }),
    context
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal((await response.json()).codexServiceMode, "default");
  const saved = await GET(new Request("http://localhost/api/keys/" + key.id), context);
  assert.equal((await saved.json()).codexServiceMode, "default");
});

test("service mode: app-server rejects overrides it cannot enforce before connecting", async () => {
  const previous = process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED;
  process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED = "true";
  try {
    const executor = new CodexExecutor();
    const result = await executor.execute({
      model: "gpt-5.6-luna",
      body: { input: "ok" },
      stream: false,
      credentials: withApiKeyCodexServiceMode(
        "codex",
        {
          providerSpecificData: {
            codexTransport: "app-server",
            codexAppServerUrl: "ws://127.0.0.1:1456",
            codexAppServerToken: "fixture",
          },
        },
        "default"
      ),
    });
    assert.equal(result.response.status, 400);
    const data = await result.response.json();
    assert.match(data.error.message, /cannot enforce/);
    assert.ok(!data.error.message.includes("at /"));
    assert.equal(calls.length, 0);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED;
    else process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED = previous;
  }
});

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  calls = [];
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Service mode fixture",
    accessToken: "fixture-access-token",
    refreshToken: "fixture-refresh-token",
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { requestDefaults: { serviceTier: "priority" } },
  });
  firstConnectionId = String(connection.id);
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    assert.match(String(url), /chatgpt\.com\/backend-api\/codex\/responses/);
    calls.push(JSON.parse(String(init.body)) as RecordedBody);
    return new Response(
      "data: " +
        JSON.stringify({
          type: "response.completed",
          response: {
            id: "resp_fixture",
            object: "response",
            status: "completed",
            model: "gpt-5.6-luna",
            output: [
              {
                id: "msg_fixture",
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: "ok", annotations: [] }],
              },
            ],
            usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
          },
        }) +
        "\n\ndata: [DONE]\n\n",
      { headers: { "Content-Type": "text/event-stream" } }
    );
  };
});
test.afterEach(async () => {
  flushProxyLogsSync();
  h.BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.resetStorage();
});
test.after(() => {
  flushProxyLogsSync();
  return h.cleanup();
});

const { updateKeyPermissionsSchema } = await import("../../src/shared/validation/schemas/keys.ts");
const { applyApiKeyCodexServiceMode, withApiKeyCodexServiceMode } =
  await import("../../src/lib/providers/codexApiKeyServiceMode.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");

async function send(key: string, tier?: string, model = "codex/gpt-5.6-luna", native = false) {
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key,
      url: native ? "http://localhost/v1/responses" : "http://localhost/v1/chat/completions",
      body: {
        model,
        stream: false,
        ...(tier ? { service_tier: tier } : {}),
        ...(native
          ? { input: "Reply ok " + crypto.randomUUID() }
          : { messages: [{ role: "user", content: "Reply ok " + crypto.randomUUID() }] }),
      },
    })
  );
  const text = await response.text();
  assert.equal(response.status, 200, text);
}

test("service mode: metadata persistence, cache invalidation and strict validation", async () => {
  const key = await h.seedApiKey();
  assert.equal((await h.apiKeysDb.getApiKeyMetadata(key.key))?.codexServiceMode, "inherit");
  const before = await h.apiKeysDb.getApiKeyById(key.id);
  for (const codexServiceMode of ["default", "priority", "flex", "inherit"] as const) {
    assert.equal(updateKeyPermissionsSchema.safeParse({ codexServiceMode }).success, true);
    await h.apiKeysDb.updateApiKeyPermissions(key.id, { codexServiceMode });
    assert.equal(
      (await h.apiKeysDb.getApiKeyMetadata(key.key))?.codexServiceMode,
      codexServiceMode
    );
    const after = await h.apiKeysDb.getApiKeyById(key.id);
    assert.equal(after?.codexServiceMode, codexServiceMode);
    assert.deepEqual(after?.allowedModels, before?.allowedModels);
    assert.deepEqual(after?.scopes, before?.scopes);
    assert.equal(after?.modelAccessMode, before?.modelAccessMode);
  }
  for (const codexServiceMode of ["fast", "none", "", null, 1]) {
    assert.equal(updateKeyPermissionsSchema.safeParse({ codexServiceMode }).success, false);
  }
});

for (const mode of ["default", "priority", "flex"] as const) {
  test(
    "service mode: force " +
      mode +
      " overrides client, global and connection tiers in chat and Responses",
    async () => {
      const key = await h.seedApiKey();
      await h.settingsDb.updateSettings({ codexServiceTier: { enabled: true, tier: "priority" } });
      await h.apiKeysDb.updateApiKeyPermissions(key.id, { codexServiceMode: mode });
      await send(key.key, mode === "priority" ? "flex" : "priority");
      await send(key.key, mode === "priority" ? "default" : "priority", undefined, true);
      assert.deepEqual(
        calls.map((body) => body.service_tier),
        [mode, mode]
      );
      assert.ok(
        calls.every((body) => !Object.keys(body).some((key) => key.startsWith("_omniroute")))
      );
    }
  );
}

test("service mode: inherit keeps precedence and force does not leak to another key", async () => {
  const forced = await h.seedApiKey({ name: "Forced" });
  const ordinary = await h.seedApiKey({ name: "Inherited" });
  await h.apiKeysDb.updateApiKeyPermissions(forced.id, { codexServiceMode: "default" });
  await h.settingsDb.updateSettings({ codexServiceTier: { enabled: true, tier: "flex" } });
  await send(forced.key, "priority");
  await send(ordinary.key, "priority");
  await send(ordinary.key);
  await h.settingsDb.updateSettings({ codexServiceTier: { enabled: false } });
  await send(ordinary.key);
  assert.deepEqual(
    calls.map((body) => body.service_tier),
    ["default", "priority", "flex", "priority"]
  );
});

test("service mode: combo uses key mode on the resolved Codex leg", async () => {
  const key = await h.seedApiKey();
  await h.apiKeysDb.updateApiKeyPermissions(key.id, { codexServiceMode: "default" });
  await h.combosDb.createCombo({
    name: "service-combo",
    models: [{ model: "codex/gpt-5.6-luna", connectionId: firstConnectionId }],
    strategy: "priority",
  });
  await send(key.key, "priority", "service-combo");
  assert.equal(calls[0]?.service_tier, "default");
});

test("service mode: non-Codex and inherited bodies/credentials remain unmodified", () => {
  const body = { service_tier: "flex", model: "test" };
  const credentials = { providerSpecificData: { requestDefaults: { serviceTier: "priority" } } };
  assert.equal(applyApiKeyCodexServiceMode("openai", body, "default"), body);
  assert.equal(withApiKeyCodexServiceMode("openai", credentials, "default"), credentials);
  assert.equal(applyApiKeyCodexServiceMode("codex", body, "inherit"), body);
  const wrapped = withApiKeyCodexServiceMode("codex", credentials, "default");
  assert.deepEqual(JSON.parse(JSON.stringify(wrapped)), credentials);
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.6-luna",
    { input: "ok", service_tier: "priority" },
    false,
    wrapped
  );
  assert.equal(transformed.service_tier, "default");
  assert.equal(credentials.providerSpecificData.requestDefaults.serviceTier, "priority");
  assert.equal(body.service_tier, "flex");
});

test("service mode: retries retain force and unsupported tiers never downgrade silently", async () => {
  const executor = new CodexExecutor();
  const credentials = withApiKeyCodexServiceMode(
    "codex",
    { accessToken: "fixture", providerSpecificData: {} },
    "default"
  );
  const success = globalThis.fetch;
  let attempts = 0;
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    attempts++;
    assert.equal(JSON.parse(String(init.body)).service_tier, "default");
    if (attempts === 1)
      return Response.json({ error: { message: "Retry fixture" } }, { status: 429 });
    return success(url, init);
  };
  const input = {
    model: "gpt-5.6-luna",
    body: { input: "ok", service_tier: "priority" },
    stream: false,
    credentials,
  };
  const result = await executor.execute(input);
  assert.equal(result.response.status, 200);
  await result.response.text();
  assert.equal(attempts, 2);
  attempts = 0;
  const { setGlobalAutoLearnEnabled } = await import("../../src/lib/db/paramFilters.ts");
  setGlobalAutoLearnEnabled(true);
  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    attempts++;
    assert.equal(JSON.parse(String(init.body)).service_tier, "default");
    return Response.json(
      { error: { message: "Unsupported parameter: service_tier" } },
      { status: 400 }
    );
  };
  try {
    const rejected = await executor.execute(input);
    assert.equal(rejected.response.status, 400);
    assert.equal(attempts, 1);
  } finally {
    setGlobalAutoLearnEnabled(false);
  }
});

test("service mode: authenticated WebSocket preparation enforces the key tier", async () => {
  process.env.OMNIROUTE_WS_BRIDGE_SECRET = "fixture-bridge-secret";
  const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");
  const key = await h.seedApiKey();
  await h.apiKeysDb.updateApiKeyPermissions(key.id, { codexServiceMode: "default" });
  const response = await POST(
    new Request("http://localhost/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-omniroute-ws-bridge-secret": "fixture-bridge-secret",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://localhost/v1/responses",
        headers: { authorization: "Bearer " + key.key },
        response: { model: "codex/gpt-5.6-luna", input: "Reply ok", service_tier: "priority" },
      }),
    })
  );
  const data = await response.json();
  assert.equal(response.status, 200, JSON.stringify(data));
  assert.equal(data.response.service_tier, "default");
});
