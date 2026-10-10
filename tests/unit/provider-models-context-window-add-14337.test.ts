import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Contexto: modelo custom cadastrado num provedor genérico (openai/anthropic-compatible)
// caía no DEFAULT_LIMITS.default (128k) porque o form de ADD não tinha como informar a
// janela real — o guard de chatCore devolvia 400 context_length_exceeded (caso real:
// qwen-cloud-token-plan/qwen3.8-max, janela 1M). O POST passa a gravar o override na
// tabela Feature-5004 `model_context_overrides` (mesmo caminho do PUT #4125).

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-context-add-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const contextManager = await import("../../open-sse/services/contextManager.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function buildRequest(method: string, body: unknown) {
  return new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST with contextWindowOverride persists a manual override consumed by getTokenLimit", async () => {
  const res = await providerModelsRoute.POST(
    buildRequest("POST", {
      provider: "qwen-cloud-token-plan",
      modelId: "qwen3.8-max",
      modelName: "Qwen 3.8 Max",
      contextWindowOverride: 1_000_000,
    })
  );
  const body = (await res.json()) as {
    model?: { contextWindowOverride?: number; contextWindowOverrideSource?: string };
  };
  assert.equal(res.status, 200);
  assert.equal(body.model?.contextWindowOverride, 1_000_000);
  assert.equal(body.model?.contextWindowOverrideSource, "manual");

  const record = contextOverrides.getModelContextOverrideRecord(
    "qwen-cloud-token-plan",
    "qwen3.8-max"
  );
  assert.ok(record, "override record should exist");
  assert.equal(record!.realContext, 1_000_000);
  assert.equal(record!.source, "manual");

  // getTokenLimit é o que o guard de chatCore lê; sem override este provedor/modelo
  // desconhecido cai em DEFAULT_LIMITS.default (128000) e o guard rejeita com 400.
  assert.equal(contextManager.getTokenLimit("qwen-cloud-token-plan", "qwen3.8-max"), 1_000_000);
});

test("POST without contextWindowOverride creates no override (default preserved)", async () => {
  const res = await providerModelsRoute.POST(
    buildRequest("POST", { provider: "qwen-cloud-token-plan", modelId: "plain-model" })
  );
  assert.equal(res.status, 200);
  assert.equal(
    contextOverrides.getModelContextOverrideRecord("qwen-cloud-token-plan", "plain-model"),
    null
  );
  assert.equal(contextManager.getTokenLimit("qwen-cloud-token-plan", "plain-model"), 128000);
});

test("POST on an already-existing model id still applies the override", async () => {
  // addCustomModel devolve o row existente sem regravar; o override deve ser
  // aplicado mesmo assim (intenção do operador ao re-submeter com a janela).
  await providerModelsRoute.POST(buildRequest("POST", { provider: "p1", modelId: "m1" }));
  const res = await providerModelsRoute.POST(
    buildRequest("POST", { provider: "p1", modelId: "m1", contextWindowOverride: 256_000 })
  );
  assert.equal(res.status, 200);
  const record = contextOverrides.getModelContextOverrideRecord("p1", "m1");
  assert.equal(record?.realContext, 256_000);
});
