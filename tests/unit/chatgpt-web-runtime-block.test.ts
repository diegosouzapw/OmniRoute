import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatgpt-web-retired-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesDb = await import("../../src/lib/db/providers/nodes.ts");
const modelAliasesDb = await import("../../src/lib/db/models/aliases.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelAliasResolver = await import("../../src/lib/modelAliasResolver.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

function isRetiredError(error: unknown): boolean {
  const typed = error as Error & { code?: string; status?: number };
  assert.equal(typed.code, "PROVIDER_RETIRED");
  assert.equal(typed.status, 410);
  assert.equal(typed.message, "Provider is retired and unavailable.");
  return true;
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
  modelAliasResolver.invalidateAliasCache();
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("retired legacy ChatGPT Web prefixes cannot shadow compatible nodes", async () => {
  for (const [index, prefix] of ["cgpt-web", "CGPT-WEB"].entries()) {
    await providerNodesDb.createProviderNode({
      id: `openai-compatible-retired-chatgpt-web-${index}`,
      type: "openai-compatible",
      name: `Retired ChatGPT Web prefix ${prefix}`,
      prefix,
      apiType: "chat",
      baseUrl: "https://retired.example.invalid/v1",
    });

    await assert.rejects(() => getModelInfo(`${prefix}/gpt-5.5`), isRetiredError);
  }

  const cleanRoom = await getModelInfo("chatgpt-web/gpt-5-5-thinking");
  assert.equal(cleanRoom.provider, "chatgpt-web");
  assert.equal(cleanRoom.model, "gpt-5-5-thinking");

  const codex = await getModelInfo("chatgpt-web-codex/high");
  assert.equal(codex.provider, "chatgpt-web-codex");
  assert.equal(codex.model, "high");
});

test("legacy alias writes return the durable ChatGPT Web tombstone", async () => {
  for (const provider of ["cgpt-web"]) {
    const created = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `${provider} retired write`,
      apiKey: `sk-${provider}-retired-write`,
      isActive: true,
      testStatus: "active",
    });
    assert.equal(created.isActive, false);
    assert.equal(created.testStatus, "unavailable");
    assert.equal(created.errorCode, "PROVIDER_REMOVED");

    const updated = await providersDb.updateProviderConnection(String(created.id), {
      isActive: true,
      testStatus: "active",
      errorCode: null,
    });
    assert.equal(updated?.isActive, false);
    assert.equal(updated?.testStatus, "unavailable");
    assert.equal(updated?.errorCode, "PROVIDER_REMOVED");
  }
});

test("credential selection rejects the retired alias even if a writer bypasses migration triggers", async () => {
  const db = core.getDbInstance();
  db.exec(`
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_insert;
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_update;
  `);

  for (const provider of ["cgpt-web"]) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, api_key, is_active, test_status, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, ?, 1, 'active', datetime('now'), datetime('now'))"
    ).run(
      `${provider}-bypassed-trigger`,
      provider,
      `${provider} bypassed trigger`,
      `sk-${provider}-bypassed-trigger`
    );

    const credentials = await auth.getProviderCredentials(provider);
    assert.equal(credentials, null);
  }
});

test("chat resolution returns a sanitized retirement response", async () => {
  const result = await resolveModelOrError(
    "cgpt-web/gpt-5.5",
    {
      model: "cgpt-web/gpt-5.5",
      messages: [{ role: "user", content: "hello" }],
    },
    "/v1/chat/completions"
  );

  assert.ok(result.error instanceof Response);
  assert.equal(result.error.status, 410);
  const body = (await result.error.json()) as {
    error?: { code?: string; message?: string };
  };
  assert.equal(body.error?.code, "PROVIDER_RETIRED");
  assert.equal(body.error?.message, "Provider is retired and unavailable.");
  assert.equal(JSON.stringify(body).includes("cgpt-web"), false);
});

test("persisted aliases cannot rewrite the retired ChatGPT Web alias before routing", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Retired ChatGPT Web alias control",
    apiKey: "sk-chatgpt-web-retirement-control",
    isActive: true,
    testStatus: "active",
  });
  await modelAliasesDb.setModelAlias("cgpt-web", "openai/gpt-4o");
  await modelAliasesDb.setModelAlias("friendly-retired-cgpt", "cgpt-web/gpt-5.5");
  await modelAliasesDb.setModelAlias("cgpt-web-preview", "openai/gpt-4o");
  await settingsDb.updateSettings({
    wildcardAliases: [{ pattern: "wildcard-retired-cgpt-*", target: "cgpt-web/gpt-5.5" }],
  });
  modelAliasResolver.invalidateAliasCache();

  const fetchCalls: string[] = [];
  globalThis.fetch = async (input: string | URL | Request) => {
    fetchCalls.push(String(input));
    return Response.json({
      id: "chatcmpl-chatgpt-web-retirement-control",
      choices: [{ message: { role: "assistant", content: "healthy control" } }],
    });
  };

  const retired = await chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "cgpt-web/gpt-5.5",
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );

  assert.equal(retired.status, 410);
  assert.equal(fetchCalls.length, 0);
  const retiredBody = (await retired.json()) as {
    error?: { code?: string; message?: string };
  };
  assert.equal(retiredBody.error?.code, "PROVIDER_RETIRED");
  assert.equal(retiredBody.error?.message, "Provider is retired and unavailable.");
  assert.equal(JSON.stringify(retiredBody).includes("cgpt-web"), false);

  const retiredBareAlias = await chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "cgpt-web",
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );
  assert.equal(retiredBareAlias.status, 410);
  assert.equal(fetchCalls.length, 0);
  const retiredBareBody = (await retiredBareAlias.json()) as {
    error?: { code?: string; message?: string };
  };
  assert.equal(retiredBareBody.error?.code, "PROVIDER_RETIRED");
  assert.equal(retiredBareBody.error?.message, "Provider is retired and unavailable.");

  for (const alias of ["friendly-retired-cgpt", "wildcard-retired-cgpt-model"]) {
    const retiredTargetAlias = await chatRoute.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: alias,
          messages: [{ role: "user", content: "hello" }],
          stream: false,
        }),
      })
    );
    assert.equal(retiredTargetAlias.status, 410);
    const retiredTargetBody = (await retiredTargetAlias.json()) as {
      error?: { code?: string; message?: string };
    };
    assert.equal(retiredTargetBody.error?.code, "PROVIDER_RETIRED");
    assert.equal(retiredTargetBody.error?.message, "Provider is retired and unavailable.");
    assert.equal(fetchCalls.length, 0);
  }

  const legitimateBareAlias = await chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "cgpt-web-preview",
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );
  assert.equal(legitimateBareAlias.status, 200);
  assert.equal(fetchCalls.length, 1);
});

test("priority combo skips a retired ChatGPT Web alias target and uses its fallback", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Healthy ChatGPT Web combo fallback",
    apiKey: "sk-chatgpt-web-combo-fallback",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: "retired-chatgpt-web-fallback",
    strategy: "priority",
    models: [
      { provider: "cgpt-web", model: "gpt-5.5" },
      { provider: "openai", model: "gpt-4o" },
    ],
  });

  const fetchCalls: string[] = [];
  globalThis.fetch = async (input: string | URL | Request) => {
    fetchCalls.push(String(input));
    return Response.json({
      id: "chatcmpl-chatgpt-web-combo-fallback",
      choices: [{ message: { role: "assistant", content: "healthy fallback" } }],
    });
  };

  const response = await chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OmniRoute-No-Cache": "true",
      },
      body: JSON.stringify({
        model: "retired-chatgpt-web-fallback",
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  const body = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  assert.equal(body.choices?.[0]?.message?.content, "healthy fallback");
});
