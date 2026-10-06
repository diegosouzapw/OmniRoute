import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qw-runtime-block-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesDb = await import("../../src/lib/db/providers/nodes.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { hashLeaseOwnerId } = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

const RETIRED_PROVIDER_VARIANTS = [
  "qwen-web",
  "qw",
  " QwEn-Web ",
  "\tQW\n",
  "\u00a0QWEN-WEB\uFEFF",
  "\u2003qw\u2029",
  "\u3000QWEN-WEB\u3000",
] as const;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await new Promise((resolve) => setImmediate(resolve));
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function isRetiredError(error: unknown): boolean {
  const typed = error as Error & { status?: number };
  assert.equal(typed.status, 410);
  assert.match(typed.message, /retired/i);
  return true;
}

test("retired Qwen Web model prefixes cannot shadow custom compatible nodes", async () => {
  for (const [index, providerId] of ["qwen-web", "qw", "QwEn-WeB", "QW"].entries()) {
    const nodeId = `openai-compatible-chat-retired-prefix-${index}`;
    await providerNodesDb.createProviderNode({
      id: nodeId,
      type: "openai-compatible",
      name: `Retired prefix ${providerId}`,
      prefix: providerId,
      apiType: "chat",
      baseUrl: "https://retired.example.invalid/v1",
    });

    await assert.rejects(() => getModelInfo(`${providerId}/gpt-4o`), isRetiredError);
  }
});

test("stripModelPrefix cannot erase retired Qwen Web identities before dispatch", async () => {
  await settingsDb.updateSettings({ stripModelPrefix: true });
  try {
    for (const providerId of ["qwen-web", "qw", "QwEn-WeB", "QW"]) {
      await assert.rejects(() => getModelInfo(`${providerId}/gpt-4o`), isRetiredError);
    }
  } finally {
    await settingsDb.updateSettings({ stripModelPrefix: false });
  }
});

test("direct chat resolution converts retired provider failures into sanitized HTTP 410", async () => {
  for (const providerId of ["qwen-web", "qw"]) {
    const result = await resolveModelOrError(
      `${providerId}/gpt-4o`,
      { model: `${providerId}/gpt-4o`, messages: [{ role: "user", content: "hello" }] },
      "/v1/chat/completions"
    );
    assert.ok(result.error instanceof Response);
    assert.equal(result.error.status, 410);
    const body = (await result.error.json()) as { error?: { message?: string } };
    assert.equal(body.error?.message, "Provider is retired and unavailable.");
    assert.equal(JSON.stringify(body).includes(providerId), false);
  }
});

test("priority combo skips retired Qwen Web target and falls back to a healthy target", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Healthy combo fallback",
    apiKey: "sk-healthy-combo-fallback",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: "retired-qwen-fallback",
    strategy: "priority",
    models: [
      { provider: "qwen-web", model: "gpt-4o" },
      { provider: "openai", model: "gpt-4o" },
    ],
  });

  const fetchCalls: string[] = [];
  globalThis.fetch = async (input: string | URL | Request) => {
    fetchCalls.push(String(input));
    return Response.json({
      id: "chatcmpl-retired-qwen-fallback",
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
        model: "retired-qwen-fallback",
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  const body = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  assert.equal(body.choices?.[0]?.message?.content, "healthy fallback");
});

test("retired Qwen Web ids stay ineligible after imports, even if DB triggers are bypassed", async () => {
  const db = core.getDbInstance();

  const created = await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Retired create response",
    apiKey: "retired-create-key",
    isActive: true,
  });
  assert.equal(created.isActive, false, "create must report the tombstoned persisted state");

  const updated = await providersDb.updateProviderConnection(created.id, {
    isActive: true,
    testStatus: "active",
    errorCode: null,
    lastError: null,
    lastErrorType: null,
    lastErrorSource: null,
    lastErrorAt: null,
  });
  assert.equal(updated?.isActive, false, "update must report the tombstoned persisted state");
  assert.equal(updated?.errorCode, "PROVIDER_REMOVED");

  for (const [index, providerId] of RETIRED_PROVIDER_VARIANTS.entries()) {
    const connectionId = `trigger-normalized-${index}`;
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, 1, 'active', datetime('now'), datetime('now'))"
    ).run(connectionId, providerId, `${providerId}-post-migration-import`);

    const persistedState = db
      .prepare(
        "SELECT is_active, test_status, error_code, last_error_type, last_error_source " +
          "FROM provider_connections WHERE id = ?"
      )
      .get(connectionId) as {
      is_active: number;
      test_status: string;
      error_code: string;
      last_error_type: string;
      last_error_source: string;
    };
    assert.deepEqual(persistedState, {
      is_active: 0,
      test_status: "unavailable",
      error_code: "PROVIDER_REMOVED",
      last_error_type: "provider_removed",
      last_error_source: "migration:retire-qwen-web",
    });

    const credentials = await getProviderCredentials(
      providerId,
      null,
      [connectionId],
      "qwen3.8-max",
      { allowSuppressedConnections: true }
    );
    assert.equal(
      credentials,
      null,
      `${providerId} must remain blocked after trigger normalization`
    );
  }

  db.exec(`
    DROP TRIGGER provider_connections_retire_qwen_web_insert;
    DROP TRIGGER provider_connections_retire_qwen_web_update;
    DROP TRIGGER exclusive_connection_leases_retire_qwen_web_insert;
    DROP TRIGGER exclusive_connection_leases_retire_qwen_web_update;
  `);

  for (const [index, providerId] of RETIRED_PROVIDER_VARIANTS.entries()) {
    const connectionId = `truly-active-${index}`;
    const leaseOwnerId = `vlo_${String.fromCharCode(65 + index).repeat(43)}`;
    const apiKeyId = `retired-key-${index}`;
    const generation = index + 1;
    const now = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 60_000).toISOString();

    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, 1, 'active', ?, ?)"
    ).run(connectionId, providerId, `${providerId}-trigger-bypass`, now, now);
    db.prepare(
      "INSERT INTO exclusive_connection_leases " +
        "(lease_owner_hash, api_key_id, provider, connection_id, generation, state, " +
        "acquired_at, renewed_at, expires_at) VALUES (?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?)"
    ).run(
      hashLeaseOwnerId(leaseOwnerId),
      apiKeyId,
      providerId,
      connectionId,
      generation,
      now,
      now,
      expiresAt
    );

    const activeBeforeSelection = db
      .prepare("SELECT is_active, test_status FROM provider_connections WHERE id = ?")
      .get(connectionId) as { is_active: number; test_status: string };
    assert.deepEqual(
      activeBeforeSelection,
      { is_active: 1, test_status: "active" },
      "fixture must bypass the migration triggers so the auth tombstone is tested independently"
    );

    const credentials = await getProviderCredentials(
      providerId,
      null,
      [connectionId],
      "qwen3.8-max",
      {
        allowSuppressedConnections: true,
        lease: {
          apiKeyId,
          context: { leaseOwnerId, generation },
          mode: "request",
        },
      }
    );
    assert.equal(credentials, null, `${providerId} must be blocked even with a truly active row`);

    const lease = db
      .prepare("SELECT state, end_reason FROM exclusive_connection_leases WHERE connection_id = ?")
      .get(connectionId) as { state: string; end_reason: string | null };
    assert.deepEqual(lease, {
      state: "INVALIDATED",
      end_reason: "CONNECTION_INELIGIBLE",
    });
  }
});
