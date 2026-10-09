import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-control-detect-"));
process.env.DATA_DIR = testDataDir;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { getReasoningControlEndpointFingerprint, resolveReasoningControl } =
  await import("../../open-sse/utils/reasoningControl.ts");

const provider = "openai-compatible-chat-reasoning-detection";
const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(testDataDir, { recursive: true });
}

async function seedConnection(providerSpecificData: Record<string, unknown>) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "sk-compatible-test",
    name: "Compatible test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://engine.example.test/v1",
      apiType: "chat",
      ...providerSpecificData,
    },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("successful connection validation persists detected reasoning control onto the latest PSD", async () => {
  await resetStorage();
  const connection = await seedConnection({ existingSetting: "keep" });
  const connectionId = String((connection as { id: unknown }).id);

  globalThis.fetch = async () => {
    await providersDb.updateProviderConnection(connectionId, {
      providerSpecificData: {
        ...(await providersDb.getProviderConnectionById(connectionId)).providerSpecificData,
        concurrentSetting: "preserved",
      },
    });
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ id: "served-model", object: "model", owned_by: "vllm" }],
      }),
      { status: 200 }
    );
  };

  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, true);

  const after = await providersDb.getProviderConnectionById(connectionId);
  const psd = after.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.existingSetting, "keep");
  assert.equal(psd.concurrentSetting, "preserved");
  assert.equal(psd.reasoningControl, undefined);
  assert.deepEqual(
    {
      mode: (psd.detectedReasoningControl as Record<string, unknown>)?.mode,
      modelBackends: (psd.detectedReasoningControl as Record<string, unknown>)?.modelBackends,
      source: (psd.detectedReasoningControl as Record<string, unknown>)?.source,
      detectorVersion: (psd.detectedReasoningControl as Record<string, unknown>)?.detectorVersion,
      fingerprintType: typeof (psd.detectedReasoningControl as Record<string, unknown>)
        ?.endpointFingerprint,
    },
    {
      mode: "chat-template",
      modelBackends: { "served-model": "vllm" },
      source: "models.data.effective_owned_by",
      detectorVersion: 2,
      fingerprintType: "string",
    }
  );
});

for (const reasoningControl of ["chat-template", "openai"] as const) {
  test(`explicit reasoningControl=${reasoningControl} is never overwritten by detection`, async () => {
    await resetStorage();
    const connection = await seedConnection({ reasoningControl });
    const connectionId = String((connection as { id: unknown }).id);
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          object: "list",
          data: [{ id: "served-model", object: "model", owned_by: "sglang" }],
        }),
        { status: 200 }
      );

    await testSingleConnection(connectionId);
    const after = await providersDb.getProviderConnectionById(connectionId);
    const psd = after.providerSpecificData as Record<string, unknown>;
    assert.equal(psd.reasoningControl, reasoningControl);
    assert.equal(psd.detectedReasoningControl, undefined);
  });
}

test("successful unknown ownership clears stale auto-detection", async () => {
  await resetStorage();
  const connection = await seedConnection({
    detectedReasoningControl: {
      mode: "chat-template",
      modelBackends: { "served-model": "vllm" },
      source: "models.data.effective_owned_by",
      detectorVersion: 2,
      observedAt: "2026-01-01T00:00:00.000Z",
      endpointFingerprint: "stale",
    },
  });
  const connectionId = String((connection as { id: unknown }).id);
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "list",
        data: [{ id: "served-model", object: "model", owned_by: "other" }],
      }),
      { status: 200 }
    );

  await testSingleConnection(connectionId);
  const after = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(
    (after.providerSpecificData as Record<string, unknown>).detectedReasoningControl,
    undefined
  );
});

test("successful validation replaces the whole detected model map", async () => {
  await resetStorage();
  const endpoint = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  const connection = await seedConnection({
    detectedReasoningControl: {
      mode: "chat-template",
      modelBackends: { "removed-model": "vllm", "current-model": "vllm" },
      source: "models.data.effective_owned_by",
      detectorVersion: 2,
      observedAt: "2026-01-01T00:00:00.000Z",
      endpointFingerprint: getReasoningControlEndpointFingerprint(endpoint),
    },
  });
  const connectionId = String((connection as { id: unknown }).id);
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "list",
        data: [
          { id: "current-model", owned_by: "vllm" },
          { id: "new-model", owned_by: "sglang" },
        ],
      }),
      { status: 200 }
    );

  await testSingleConnection(connectionId);
  const after = await providersDb.getProviderConnectionById(connectionId);
  const detected = (after.providerSpecificData as Record<string, unknown>)
    .detectedReasoningControl as Record<string, unknown>;
  const modelBackends = detected.modelBackends as Record<string, unknown>;
  assert.deepEqual(modelBackends, {
    "current-model": "vllm",
    "new-model": "sglang",
  });
  assert.equal(Object.hasOwn(modelBackends, "removed-model"), false);
});

test("failed validation preserves prior auto-detection evidence", async () => {
  await resetStorage();
  const detectedReasoningControl = {
    mode: "chat-template",
    modelBackends: { "served-model": "vllm" },
    source: "models.data.effective_owned_by",
    detectorVersion: 2,
    observedAt: "2026-01-01T00:00:00.000Z",
    endpointFingerprint: "prior",
  };
  const connection = await seedConnection({ detectedReasoningControl });
  const connectionId = String((connection as { id: unknown }).id);
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  const result = await testSingleConnection(connectionId);
  assert.equal(result.valid, false);
  const after = await providersDb.getProviderConnectionById(connectionId);
  assert.deepEqual(
    (after.providerSpecificData as Record<string, unknown>).detectedReasoningControl,
    detectedReasoningControl
  );
});

test("detection from an endpoint changed during the probe is not persisted", async () => {
  await resetStorage();
  const connection = await seedConnection({});
  const connectionId = String((connection as { id: unknown }).id);
  globalThis.fetch = async () => {
    await providersDb.updateProviderConnection(connectionId, {
      providerSpecificData: {
        ...(await providersDb.getProviderConnectionById(connectionId)).providerSpecificData,
        baseUrl: "https://replacement.example.test/v1",
      },
    });
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ id: "served-model", object: "model", owned_by: "llamacpp" }],
      }),
      { status: 200 }
    );
  };

  await testSingleConnection(connectionId);
  const after = await providersDb.getProviderConnectionById(connectionId);
  const psd = after.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.baseUrl, "https://replacement.example.test/v1");
  assert.equal(psd.detectedReasoningControl, undefined);
});

test("an explicit pin clears stale detection so clearing the pin cannot reactivate it", async () => {
  await resetStorage();
  const endpoint = {
    baseUrl: "https://engine.example.test/v1",
    apiType: "chat",
  };
  const connection = await seedConnection({
    detectedReasoningControl: {
      mode: "chat-template",
      modelBackends: { "served-model": "vllm" },
      source: "models.data.effective_owned_by",
      detectorVersion: 2,
      observedAt: "2026-01-01T00:00:00.000Z",
      endpointFingerprint: getReasoningControlEndpointFingerprint(endpoint),
    },
  });
  const connectionId = String((connection as { id: unknown }).id);

  const current = await providersDb.getProviderConnectionById(connectionId);
  await providersDb.updateProviderConnection(connectionId, {
    providerSpecificData: {
      ...(current.providerSpecificData as Record<string, unknown>),
      reasoningControl: "openai",
    },
  });
  const pinned = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(
    (pinned.providerSpecificData as Record<string, unknown>).detectedReasoningControl,
    undefined
  );
  assert.equal(resolveReasoningControl(pinned.providerSpecificData), "openai");

  await providersDb.updateProviderConnection(connectionId, {
    providerSpecificData: {
      ...(pinned.providerSpecificData as Record<string, unknown>),
      reasoningControl: null,
    },
  });
  const cleared = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(
    (cleared.providerSpecificData as Record<string, unknown>).detectedReasoningControl,
    undefined
  );
  assert.equal(resolveReasoningControl(cleared.providerSpecificData), "openai");
});
