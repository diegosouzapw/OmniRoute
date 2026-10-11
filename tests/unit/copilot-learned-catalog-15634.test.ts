import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-copilot-catalog-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "copilot-catalog-synthetic-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const settings = await import("../../src/lib/db/settings.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");
const combos = await import("../../src/lib/db/combos.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { findStaleComboModelRefs } = await import("../../src/lib/combos/staleModelRefs.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const originalFetch = globalThis.fetch;
const rejectedModel = "claude-sonnet-5";
const validModel = "gpt-6-astra";
const dispatched: string[] = [];
let connectionId = "";
let rejectionCode = "model_not_supported";
let rejectionStatus = 400;
let rejectionMessage = "The requested model is not supported.";

async function seedOtherConnection(provider: string, inventory?: string[]) {
  const connection = await providers.createProviderConnection({
    provider,
    name: "Synthetic account B",
    authType: "oauth",
    accessToken: "synthetic-other-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      copilotToken: "synthetic-other-token",
      copilotTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  });
  if (inventory)
    await models.replaceSyncedAvailableModelsForConnection(
      provider,
      String(connection.id),
      inventory.map((id) => ({ id, name: id, source: "imported" as const }))
    );
  return String(connection.id);
}

async function rejectOnce() {
  const response = await chat(`gh/${rejectedModel}`);
  assert.equal(response.status, rejectionStatus, await response.text());
}

function hasRejected(ids: string[]) {
  return ids.includes(`github/${rejectedModel}`);
}

async function listedIds(): Promise<string[]> {
  const response = await modelsRoute.GET(new Request("http://localhost/v1/models"));
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((entry) => entry.id);
}

async function chat(model: string) {
  return chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-OmniRoute-No-Cache": "true" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  locks.clearAllModelLockouts();
  catalog.__resetCatalogBuilderRunsForTest();
  dispatched.length = 0;
  rejectionCode = "model_not_supported";
  rejectionStatus = 400;
  rejectionMessage = "The requested model is not supported.";
  apiKeys.resetApiKeyState();
  await settings.updateSettings({
    requireLogin: false,
    requireApiKey: false,
    requireAuthForModels: false,
    requestRetry: 0,
    autoRoutingEnabled: false,
    probeCanDisable: false,
    blockedProviders: Object.keys(NOAUTH_PROVIDERS),
  });
  const connection = await providers.createProviderConnection({
    provider: "github",
    name: "Copilot synthetic account A",
    authType: "oauth",
    accessToken: "synthetic-github-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      copilotToken: "synthetic-copilot-token",
      copilotTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  });
  connectionId = String(connection.id);
  await models.replaceSyncedAvailableModelsForConnection(
    "github",
    connectionId,
    [rejectedModel, validModel].map((id) => ({ id, name: id, source: "imported" as const }))
  );
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    assert.equal(url.hostname, "api.githubcopilot.com", `unexpected upstream ${url.origin}`);
    const body = JSON.parse(String(init?.body)) as { model: string };
    dispatched.push(body.model);
    if (
      body.model === rejectedModel &&
      new Headers(init?.headers).get("authorization") !== "Bearer synthetic-other-token"
    ) {
      return Response.json(
        {
          error: {
            message: rejectionMessage,
            code: rejectionCode,
            type: "invalid_request_error",
            param: "model",
          },
        },
        { status: rejectionStatus }
      );
    }
    if (body.model === rejectedModel) {
      assert.equal(url.pathname, "/v1/messages");
      return Response.json({
        id: "msg-15634",
        type: "message",
        role: "assistant",
        model: rejectedModel,
        content: [{ type: "text", text: "hello from account B" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 1, output_tokens: 4 },
      });
    }
    assert.equal(body.model, validModel);
    return Response.json({
      id: "resp-copilot-catalog-fixture",
      object: "response",
      status: "completed",
      output: [
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "hello" }] },
      ],
    });
  };
});

test.afterEach(async () => {
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(await callLogs.waitForCallLogSaves(2_000), true);
  globalThis.fetch = originalFetch;
});
test.after(() => {
  locks.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("a listed, supported Copilot model still reaches the HTTP upstream", async () => {
  assert.ok((await listedIds()).includes(`github/${validModel}`));
  const response = await chat(`gh/${validModel}`);
  assert.equal(response.status, 200, await response.text());
  assert.deepEqual(dispatched, [validModel]);
});

for (const cold of [false, true]) {
  test(`learned Copilot rejection disappears from the ${cold ? "cold" : "warm"} HTTP catalog`, async () => {
    const before = await listedIds();
    assert.ok(before.includes(`github/${rejectedModel}`));
    const rejected = await chat(`gh/${rejectedModel}`);
    assert.equal(rejected.status, 400, await rejected.text());
    assert.deepEqual(dispatched, [rejectedModel]);
    assert.equal(locks.isModelLocked("github", connectionId, rejectedModel), true);
    if (cold) catalog.__resetCatalogBuilderRunsForTest();
    const after = await listedIds();
    assert.ok(after.includes(`github/${validModel}`));
    assert.equal(
      after.some((id) => /^(?:gh|github)\/claude-sonnet-5(?:$|-)/.test(id)),
      false
    );
  });
}

test("a repeated rejected model reports model_not_supported without another upstream call", async () => {
  const first = await chat(`gh/${rejectedModel}`);
  assert.equal(first.status, 400);
  await first.text();
  const repeated = await chat(`github/${rejectedModel}`);
  const body = await repeated.json();
  assert.deepEqual(dispatched, [rejectedModel]);
  assert.deepEqual(
    { status: repeated.status, code: body.error?.code },
    { status: 400, code: "model_not_supported" }
  );
});

test("account B advertising the model keeps it listed and handles the next request", async () => {
  await rejectOnce();
  const otherId = await seedOtherConnection("github", [rejectedModel, validModel]);
  assert.equal(hasRejected(await listedIds()), true);
  const response = await chat(`github/${rejectedModel}`);
  assert.equal(response.status, 200, await response.text());
  assert.deepEqual(dispatched, [rejectedModel, rejectedModel]);
  assert.equal(locks.isModelLocked("github", otherId, rejectedModel), false);
});

test("account B explicitly advertising only GPT does not keep rejected Claude listed", async () => {
  await rejectOnce();
  await seedOtherConnection("github", [validModel]);
  assert.equal(hasRejected(await listedIds()), false);
});

test("account B with unknown inventory preserves the existing fail-open contract", async () => {
  await rejectOnce();
  await seedOtherConnection("github");
  assert.equal(hasRejected(await listedIds()), true);
});

test("manual exclusions on account B remain authoritative", async () => {
  await rejectOnce();
  const otherId = await seedOtherConnection("github", [rejectedModel, validModel]);
  await providers.updateProviderConnection(otherId, {
    providerSpecificData: { excludedModels: [rejectedModel] },
  });
  assert.equal(hasRejected(await listedIds()), false);
  const repeated = await chat(`github/${rejectedModel}`);
  const body = await repeated.json();
  assert.deepEqual(
    { status: repeated.status, code: body.error?.code },
    { status: 400, code: "model_not_supported" }
  );
  assert.deepEqual(dispatched, [rejectedModel]);
});

test("explicit clear rebuilds the complete catalog without changing synced inventory", async () => {
  await listedIds();
  const inventory = await models.getSyncedAvailableModelsByConnection("github");
  await rejectOnce();
  assert.equal(hasRejected(await listedIds()), false);
  assert.equal(locks.clearModelLock("github", connectionId, rejectedModel), true);
  assert.equal(hasRejected(await listedIds()), true);
  assert.deepEqual(await models.getSyncedAvailableModelsByConnection("github"), inventory);
});

test("the learned six-hour deadline expires without another DB write", async (t) => {
  await rejectOnce();
  const lock = locks.getAllModelLockouts().find((entry) => entry.connectionId === connectionId);
  assert.ok(lock);
  assert.equal(lock.reason, "copilot_model_not_supported");
  assert.equal(lock.until - Date.parse(lock.lockedAt), 6 * 60 * 60 * 1_000);
  assert.equal(hasRejected(await listedIds()), false);
  const builderRuns = catalog.__getCatalogBuilderRunsForTest();
  const currentTime = Date.now();
  const now = t.mock.method(Date, "now", () => currentTime + 1_000);
  assert.equal(hasRejected(await listedIds()), false);
  assert.equal(
    catalog.__getCatalogBuilderRunsForTest(),
    builderRuns,
    "a ticking remainingMs must not rebuild"
  );
  now.mock.mockImplementation(() => lock.until);
  assert.equal(
    hasRejected(await listedIds()),
    true,
    "deadline excludes stale locks even at zero remainingMs"
  );
});

for (const reason of ["rate_limit", "model_capacity", "model_not_found", "server_error"]) {
  test(`transient ${reason} lock does not remove a model from the catalog`, async () => {
    await listedIds();
    locks.lockModel("github", connectionId, rejectedModel, reason, 60_000);
    assert.equal(hasRejected(await listedIds()), true);
  });
}

for (const code of ["model_not_found", "model_capacity"]) {
  test(`an upstream ${code} is not learned as catalog entitlement`, async () => {
    rejectionCode = code;
    await rejectOnce();
    assert.equal(hasRejected(await listedIds()), true);
  });
}

test("probe-origin failures do not learn a catalog rejection", async () => {
  await runAsProbe(rejectOnce);
  assert.equal(locks.isModelLocked("github", connectionId, rejectedModel), false);
  assert.equal(hasRejected(await listedIds()), true);
});

test("the same model remains visible on a separate provider", async () => {
  await seedOtherConnection("claude", [rejectedModel]);
  await rejectOnce();
  const ids = await listedIds();
  assert.equal(hasRejected(ids), false);
  assert.ok(ids.includes(`claude/${rejectedModel}`));
});

test("learned response filtering never marks live combo members stale or prunes them", async () => {
  await providers.touchConnectionSyncedModelsAt(connectionId);
  const combo = await combos.createCombo({
    name: "copilot-15634",
    strategy: "priority",
    models: [`github/${rejectedModel}`, `github/${validModel}`],
  });
  const inventory = await getActiveSyncedCatalog("github");
  assert.equal(inventory.authoritative, true);
  assert.ok(inventory.models.some((model) => model.id === rejectedModel));
  await rejectOnce();
  assert.equal(hasRejected(await listedIds()), false);
  assert.deepEqual(await getActiveSyncedCatalog("github"), inventory);
  assert.deepEqual(await findStaleComboModelRefs("github"), []);
  assert.deepEqual((await combos.getComboById(combo.id))?.models, combo.models);
  const fallback = await chat("copilot-15634");
  assert.equal(fallback.status, 200, await fallback.text());
  assert.deepEqual(dispatched, [rejectedModel, validModel]);
});

test("API-key ACL is still applied independently of learned catalog filtering", async () => {
  await rejectOnce();
  const key = await apiKeys.createApiKey("catalog-15634", "synthetic-machine");
  await apiKeys.updateApiKeyPermissions(key.id, {
    allowedModels: [`github/${validModel}`, `gh/${validModel}`],
  });
  const response = await modelsRoute.GET(
    new Request("http://localhost/v1/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(body.data.length > 0);
  assert.ok(
    body.data.every((model: { id: string }) =>
      [`github/${validModel}`, `gh/${validModel}`].includes(model.id)
    )
  );
});

test("an already-dispatched long quota response does not erase a learned model rejection", async () => {
  const respondNormally = globalThis.fetch;
  let releaseQuota!: () => void;
  let enteredQuota!: () => void;
  const quotaPending = new Promise<void>((resolve) => {
    releaseQuota = resolve;
  });
  const quotaEntered = new Promise<void>((resolve) => {
    enteredQuota = resolve;
  });
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    calls += 1;
    if (calls > 1) return respondNormally(input, init);
    const url = new URL(String(input));
    assert.equal(url.hostname, "api.githubcopilot.com");
    assert.equal(JSON.parse(String(init?.body)).model, rejectedModel);
    dispatched.push(rejectedModel);
    enteredQuota();
    await quotaPending;
    return Response.json(
      {
        error: {
          message: "Model quota exceeded. Please retry later.",
          code: "rate_limit_exceeded",
        },
      },
      { status: 429, headers: { "Retry-After": "28800" } }
    );
  };
  const quotaRequest = chat(`gh/${rejectedModel}`);
  await quotaEntered;
  try {
    await rejectOnce();
    assert.equal(hasRejected(await listedIds()), false);
  } finally {
    releaseQuota();
  }
  const quota = await quotaRequest;
  assert.equal(quota.status, 429, await quota.text());
  assert.equal(calls, 2, "both requests were already dispatched before learning");
  assert.equal(
    hasRejected(await listedIds()),
    false,
    "a later quota response must not erase the rejection"
  );
});

test("text mentioning model_not_supported without its structured code does not hide a model", async () => {
  rejectionCode = "invalid_request_error";
  rejectionMessage = "The requested model is not supported. Diagnostic: model_not_supported";
  await rejectOnce();
  assert.equal(hasRejected(await listedIds()), true);
});

test("a shorter rejection arriving after a long quota keeps its independent expiry", async (t) => {
  const respondNormally = globalThis.fetch;
  let releaseRejected!: () => void;
  let enteredRejected!: () => void;
  const rejectedPending = new Promise<void>((resolve) => {
    releaseRejected = resolve;
  });
  const rejectedEntered = new Promise<void>((resolve) => {
    enteredRejected = resolve;
  });
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    calls += 1;
    if (calls === 1) {
      enteredRejected();
      await rejectedPending;
      return respondNormally(input, init);
    }
    assert.equal(new URL(String(input)).hostname, "api.githubcopilot.com");
    assert.equal(JSON.parse(String(init?.body)).model, rejectedModel);
    dispatched.push(rejectedModel);
    return Response.json(
      {
        error: {
          message: "Model quota exceeded. Please retry later.",
          code: "rate_limit_exceeded",
        },
      },
      { status: 429, headers: { "Retry-After": "28800" } }
    );
  };
  const rejectedRequest = chat(`gh/${rejectedModel}`);
  await rejectedEntered;
  try {
    const quota = await chat(`gh/${rejectedModel}`);
    assert.equal(quota.status, 429, await quota.text());
    assert.equal(hasRejected(await listedIds()), true, "quota alone must not hide the model");
  } finally {
    releaseRejected();
  }
  const rejected = await rejectedRequest;
  assert.equal(rejected.status, 400, await rejected.text());
  assert.equal(calls, 2);
  assert.equal(hasRejected(await listedIds()), false);
  const currentTime = Date.now();
  t.mock.method(Date, "now", () => currentTime + 6 * 60 * 60 * 1_000 + 1_000);
  assert.equal(hasRejected(await listedIds()), true, "six-hour rejection expires independently");
  assert.equal(
    locks.isModelLocked("github", connectionId, rejectedModel),
    true,
    "eight-hour quota remains active"
  );
  assert.equal(locks.clearModelLock("github", connectionId, rejectedModel), true);
  assert.equal(locks.isModelLocked("github", connectionId, rejectedModel), false);
});

test("text without any error code does not create a learned catalog rejection", async () => {
  rejectionCode = undefined;
  rejectionMessage = "The requested model is not supported. Diagnostic: model_not_supported";
  await rejectOnce();
  assert.equal(hasRejected(await listedIds()), true);
});
