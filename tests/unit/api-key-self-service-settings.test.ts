/**
 * Per-key self-service settings (migration 194) end to end on a temp SQLite DB:
 * the DB module, the Zod schemas, the admin routes (GET/PUT
 * /api/keys/[id]/self-service, GET /api/keys, PATCH/DELETE /api/keys/[id]),
 * GET /v1/me/status auth via Bearer or x-api-key, and the policy merge into
 * apiKeyInfo.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-service-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "self-service-settings-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/apiKeySelfServiceSettings.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const keyRoute = await import("../../src/app/api/keys/[id]/route.ts");
const selfServiceRoute = await import("../../src/app/api/keys/[id]/self-service/route.ts");
const meStatusRoute = await import("../../src/app/api/v1/me/status/route.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } =
  await import("../../src/shared/constants/selfServiceScopes.ts");

type ErrorBody = { error: { message?: string; details?: unknown[] } | string };

function resetStorage() {
  settingsDb.clearApiKeySelfServiceSettingsCache();
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  settingsDb.clearApiKeySelfServiceSettingsCache();
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function managementKey() {
  return apiKeys.createApiKey("management", "test-machine", ["manage"]);
}

function jsonRequest(url: string, method: string, bearer: string, body?: unknown) {
  return new Request(url, {
    method,
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json" },
    ...(body !== undefined && { body: typeof body === "string" ? body : JSON.stringify(body) }),
  });
}

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

function assertNoStackLeak(body: unknown) {
  const text = JSON.stringify(body);
  assert.equal(text.includes("at /"), false, "error body must not contain a stack trace");
  assert.equal(text.includes(".ts:"), false, "error body must not contain source locations");
}

// ──────────────── DB module ────────────────

test("settings default to all providers + forward when no row exists", () => {
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("no-such-key"), {
    sharedQuotaProviders: null,
    anthropicRateLimitHeaders: "forward",
  });
});

test("update round-trips, normalizes the provider list and keeps omitted fields", () => {
  const saved = settingsDb.updateApiKeySelfServiceSettings("key-a", {
    sharedQuotaProviders: [" codex ", "claude", "codex", "  "],
    anthropicRateLimitHeaders: "strip",
  });
  assert.deepEqual(saved, {
    sharedQuotaProviders: ["claude", "codex"],
    anthropicRateLimitHeaders: "strip",
  });

  settingsDb.clearApiKeySelfServiceSettingsCache();
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-a"), saved, "persisted in SQLite");

  settingsDb.updateApiKeySelfServiceSettings("key-a", { anthropicRateLimitHeaders: "forward" });
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-a"), {
    sharedQuotaProviders: ["claude", "codex"],
    anthropicRateLimitHeaders: "forward",
  });

  settingsDb.updateApiKeySelfServiceSettings("key-a", { sharedQuotaProviders: [] });
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-a").sharedQuotaProviders, []);

  settingsDb.updateApiKeySelfServiceSettings("key-a", { sharedQuotaProviders: null });
  assert.equal(settingsDb.getApiKeySelfServiceSettings("key-a").sharedQuotaProviders, null);
});

test("writes and deletes are visible immediately after a cached read", () => {
  settingsDb.updateApiKeySelfServiceSettings("key-c", { sharedQuotaProviders: ["codex"] });
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-c").sharedQuotaProviders, [
    "codex",
  ]);

  settingsDb.updateApiKeySelfServiceSettings("key-c", { sharedQuotaProviders: ["claude"] });
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-c").sharedQuotaProviders, [
    "claude",
  ]);

  settingsDb.deleteApiKeySelfServiceSettings("key-c");
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-c"), {
    sharedQuotaProviders: null,
    anthropicRateLimitHeaders: "forward",
  });
});

test("returned settings are copies; mutating them does not change later reads", () => {
  settingsDb.updateApiKeySelfServiceSettings("key-m", { sharedQuotaProviders: ["codex"] });
  const read = settingsDb.getApiKeySelfServiceSettings("key-m");
  read.sharedQuotaProviders?.push("claude");
  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-m").sharedQuotaProviders, [
    "codex",
  ]);
});

test("a corrupt stored provider list fails closed to none; an unknown mode reads as auto", () => {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO api_key_self_service_settings (api_key_id, shared_quota_providers, anthropic_ratelimit_headers)
       VALUES (?, ?, ?)`
    )
    .run("key-bad", "{not json", "sometimes");

  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-bad"), {
    sharedQuotaProviders: [],
    anthropicRateLimitHeaders: "forward",
  });
});

test("a missing table reads as defaults and delete is a no-op", () => {
  core.getDbInstance().exec("DROP TABLE api_key_self_service_settings");
  settingsDb.clearApiKeySelfServiceSettingsCache();

  assert.deepEqual(settingsDb.getApiKeySelfServiceSettings("key-x"), {
    sharedQuotaProviders: null,
    anthropicRateLimitHeaders: "forward",
  });
  assert.doesNotThrow(() => settingsDb.deleteApiKeySelfServiceSettings("key-x"));
});

// ──────────────── Schemas ────────────────

test("PATCH schema accepts either self-service field alone and rejects bad values", () => {
  const patch = schemas.updateKeyPermissionsSchema;
  assert.equal(patch.safeParse({ sharedQuotaProviders: ["codex"] }).success, true);
  assert.equal(patch.safeParse({ sharedQuotaProviders: null }).success, true);
  assert.equal(patch.safeParse({ sharedQuotaProviders: [] }).success, true);
  assert.equal(patch.safeParse({ anthropicRateLimitHeaders: "strip" }).success, true);

  assert.equal(patch.safeParse({ anthropicRateLimitHeaders: "block" }).success, false);
  assert.equal(
    patch.safeParse({ sharedQuotaProviders: Array.from({ length: 101 }, (_, i) => `p${i}`) })
      .success,
    false,
    "more than 100 providers is rejected"
  );
  assert.equal(patch.safeParse({ sharedQuotaProviders: ["x".repeat(65)] }).success, false);
  assert.equal(patch.safeParse({ sharedQuotaProviders: ["  "] }).success, false);
  assert.equal(patch.safeParse({}).success, false, "an empty update is still rejected");
});

test("PUT schema validates the same fields and rejects an empty body", () => {
  const put = schemas.updateApiKeySelfServiceSchema;
  const parsed = put.safeParse({
    sharedQuotaProviders: [" codex "],
    anthropicRateLimitHeaders: "forward",
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.deepEqual(parsed.data.sharedQuotaProviders, ["codex"]);
  assert.equal(put.safeParse({ anthropicRateLimitHeaders: "FORWARD" }).success, false);
  assert.equal(
    put.safeParse({ sharedQuotaProviders: Array.from({ length: 101 }, (_, i) => `p${i}`) }).success,
    false
  );
  assert.equal(put.safeParse({}).success, false);
});

// ──────────────── Admin routes ────────────────

test("PUT /api/keys/[id]/self-service persists settings and GET returns settings, visibility, providers and a preview", async () => {
  const admin = await managementKey();
  const key = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);
  const url = `http://localhost/api/keys/${key.id}/self-service`;

  const put = await selfServiceRoute.PUT(
    jsonRequest(url, "PUT", admin.key, {
      sharedQuotaProviders: ["codex", "claude"],
      anthropicRateLimitHeaders: "forward",
    }),
    params(key.id)
  );
  assert.equal(put.status, 200);
  assert.deepEqual(await put.json(), {
    settings: { sharedQuotaProviders: ["claude", "codex"], anthropicRateLimitHeaders: "forward" },
  });

  const get = await selfServiceRoute.GET(jsonRequest(url, "GET", admin.key), params(key.id));
  assert.equal(get.status, 200);
  const body = await get.json();
  assert.deepEqual(body.settings, {
    sharedQuotaProviders: ["claude", "codex"],
    anthropicRateLimitHeaders: "forward",
  });
  assert.deepEqual(body.visibility, { selfUsage: true, accountQuota: false });
  assert.deepEqual(body.availableProviders, []);
  assert.deepEqual(body.status.apiKey, { id: key.id, name: "holder" });
  assert.equal(typeof body.status.generatedAt, "string");
  assert.ok(Array.isArray(body.status.limits));
  assert.ok(Array.isArray(body.status.accountQuotas), "the admin preview always has accountQuotas");
  assert.equal(typeof body.status.usage.daily.requests, "number");
});

test("self-service routes reject bad bodies with 400 and unknown keys with 404, without leaking stacks", async () => {
  const admin = await managementKey();
  const key = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);
  const url = `http://localhost/api/keys/${key.id}/self-service`;

  const badMode = await selfServiceRoute.PUT(
    jsonRequest(url, "PUT", admin.key, { anthropicRateLimitHeaders: "block" }),
    params(key.id)
  );
  assert.equal(badMode.status, 400);
  assertNoStackLeak(await badMode.json());

  const badJson = await selfServiceRoute.PUT(
    jsonRequest(url, "PUT", admin.key, "{oops"),
    params(key.id)
  );
  assert.equal(badJson.status, 400);
  assertNoStackLeak(await badJson.json());

  const missing = await selfServiceRoute.PUT(
    jsonRequest(url, "PUT", admin.key, { anthropicRateLimitHeaders: "strip" }),
    params("missing-key")
  );
  assert.equal(missing.status, 404);
  const missingBody = (await missing.json()) as ErrorBody;
  assertNoStackLeak(missingBody);
  assert.equal(typeof missingBody.error === "object" && missingBody.error.message, "Key not found");

  const missingGet = await selfServiceRoute.GET(
    jsonRequest(url, "GET", admin.key),
    params("missing-key")
  );
  assert.equal(missingGet.status, 404);
  assert.deepEqual(
    settingsDb.getApiKeySelfServiceSettings(key.id).anthropicRateLimitHeaders,
    "forward"
  );
});

test("self-service routes require management auth", async () => {
  const holder = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);
  process.env.INITIAL_PASSWORD = "self-service-test-password";
  try {
    const response = await selfServiceRoute.GET(
      jsonRequest(`http://localhost/api/keys/${holder.id}/self-service`, "GET", holder.key),
      params(holder.id)
    );
    assert.ok(response.status === 401 || response.status === 403, `got ${response.status}`);
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});

test("PATCH /api/keys/[id] accepts a settings-only update and GET /api/keys + GET /api/keys/[id] expose it", async () => {
  const admin = await managementKey();
  const key = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);

  const patch = await keyRoute.PATCH(
    jsonRequest(`http://localhost/api/keys/${key.id}`, "PATCH", admin.key, {
      sharedQuotaProviders: ["codex"],
    }),
    params(key.id)
  );
  assert.equal(patch.status, 200);
  const patchBody = await patch.json();
  assert.deepEqual(patchBody.sharedQuotaProviders, ["codex"]);

  const modeOnly = await keyRoute.PATCH(
    jsonRequest(`http://localhost/api/keys/${key.id}`, "PATCH", admin.key, {
      anthropicRateLimitHeaders: "strip",
      name: "renamed holder",
    }),
    params(key.id)
  );
  assert.equal(modeOnly.status, 200);

  const list = await keysRoute.GET(jsonRequest("http://localhost/api/keys", "GET", admin.key));
  const listed = (await list.json()).keys.find((entry: { id: string }) => entry.id === key.id);
  assert.deepEqual(listed.sharedQuotaProviders, ["codex"]);
  assert.equal(listed.anthropicRateLimitHeaders, "strip");
  assert.equal(listed.name, "renamed holder");
  const adminListed = (
    await (await keysRoute.GET(jsonRequest("http://localhost/api/keys", "GET", admin.key))).json()
  ).keys.find((entry: { id: string }) => entry.id === admin.id);
  assert.equal(adminListed.sharedQuotaProviders, null, "keys without a row list the defaults");

  const single = await keyRoute.GET(
    jsonRequest(`http://localhost/api/keys/${key.id}`, "GET", admin.key),
    params(key.id)
  );
  const singleBody = await single.json();
  assert.deepEqual(singleBody.sharedQuotaProviders, ["codex"]);
  assert.equal(singleBody.anthropicRateLimitHeaders, "strip");

  const unknown = await keyRoute.PATCH(
    jsonRequest("http://localhost/api/keys/missing", "PATCH", admin.key, {
      sharedQuotaProviders: ["codex"],
    }),
    params("missing")
  );
  assert.equal(unknown.status, 404);
  settingsDb.clearApiKeySelfServiceSettingsCache();
  assert.equal(
    settingsDb.getApiKeySelfServiceSettings("missing").sharedQuotaProviders,
    null,
    "no settings row is created for an unknown key"
  );

  const invalid = await keyRoute.PATCH(
    jsonRequest(`http://localhost/api/keys/${key.id}`, "PATCH", admin.key, {
      anthropicRateLimitHeaders: "block",
    }),
    params(key.id)
  );
  assert.equal(invalid.status, 400);
  assertNoStackLeak(await invalid.json());
});

test("DELETE /api/keys/[id] removes the key's settings row", async () => {
  const admin = await managementKey();
  const key = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);
  settingsDb.updateApiKeySelfServiceSettings(key.id, {
    sharedQuotaProviders: ["codex"],
    anthropicRateLimitHeaders: "forward",
  });

  const response = await keyRoute.DELETE(
    jsonRequest(`http://localhost/api/keys/${key.id}`, "DELETE", admin.key),
    params(key.id)
  );
  assert.equal(response.status, 200);

  const row = core
    .getDbInstance()
    .prepare("SELECT api_key_id FROM api_key_self_service_settings WHERE api_key_id = ?")
    .get(key.id);
  assert.equal(row, undefined);
});

// ──────────────── /v1/me/status ────────────────

test("GET /v1/me/status accepts x-api-key as well as Bearer", async () => {
  const key = await apiKeys.createApiKey("holder", "test-machine", [SELF_USAGE_SCOPE]);

  const viaHeader = await meStatusRoute.GET(
    new Request("http://localhost/api/v1/me/status", { headers: { "x-api-key": key.key } })
  );
  assert.equal(viaHeader.status, 200);
  const body = await viaHeader.json();
  assert.deepEqual(body.apiKey, { id: key.id, name: "holder" });
  assert.equal(typeof body.generatedAt, "string");
  assert.equal(typeof body.usage.cost.usedUsd, "number");
  assert.equal(typeof body.usage.daily.costUsd, "number");
  assert.equal(typeof body.usage.weekly.tokens.total, "number");
  assert.deepEqual(body.limits, []);
  assert.equal("accountQuotas" in body, false, "no account quotas without self:account-quota");

  const viaBearer = await meStatusRoute.GET(
    new Request("http://localhost/api/v1/me/status", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  assert.equal(viaBearer.status, 200);

  const invalid = await meStatusRoute.GET(
    new Request("http://localhost/api/v1/me/status", { headers: { "x-api-key": "sk-not-a-key" } })
  );
  assert.equal(invalid.status, 401);
});

test("GET /v1/me/status returns 403 without self:usage and honors sharedQuotaProviders = []", async () => {
  const noScope = await apiKeys.createApiKey("no scope", "test-machine", ["custom:scope"]);
  const forbidden = await meStatusRoute.GET(
    new Request("http://localhost/api/v1/me/status", { headers: { "x-api-key": noScope.key } })
  );
  assert.equal(forbidden.status, 403);

  const quotaKey = await apiKeys.createApiKey("quota", "test-machine", [
    SELF_USAGE_SCOPE,
    SELF_ACCOUNT_QUOTA_SCOPE,
  ]);
  settingsDb.updateApiKeySelfServiceSettings(quotaKey.id, { sharedQuotaProviders: [] });
  const response = await meStatusRoute.GET(
    new Request("http://localhost/api/v1/me/status", { headers: { "x-api-key": quotaKey.key } })
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.deepEqual(body.accountQuotas, []);
});

// ──────────────── Policy merge ────────────────

test("enforceApiKeyPolicy merges the key's self-service settings into apiKeyInfo", async () => {
  const key = await apiKeys.createApiKey("policy", "test-machine", [SELF_USAGE_SCOPE]);
  settingsDb.updateApiKeySelfServiceSettings(key.id, {
    sharedQuotaProviders: ["claude"],
    anthropicRateLimitHeaders: "strip",
  });

  const policy = await enforceApiKeyPolicy(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: { Authorization: `Bearer ${key.key}` },
    }),
    null
  );

  assert.equal(policy.apiKeyInfo?.id, key.id);
  assert.deepEqual(policy.apiKeyInfo?.sharedQuotaProviders, ["claude"]);
  assert.equal(policy.apiKeyInfo?.anthropicRateLimitHeaders, "strip");

  const cached = await apiKeys.getApiKeyMetadata(key.key);
  assert.equal(
    (cached as Record<string, unknown> | null)?.anthropicRateLimitHeaders,
    undefined,
    "the cached key metadata object is not mutated"
  );
});
