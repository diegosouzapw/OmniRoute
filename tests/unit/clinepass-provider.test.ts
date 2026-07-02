import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");

test("ClinePass is registered as an API-key provider with the canonical identity", () => {
  const clinepass = APIKEY_PROVIDERS.clinepass;
  assert.ok(clinepass, "APIKEY_PROVIDERS.clinepass must be defined");
  assert.equal(clinepass.id, "clinepass");
  assert.equal(clinepass.alias, "cp");
  assert.equal(clinepass.name, "ClinePass");
  assert.equal(clinepass.website, "https://cline.bot/clinepass");
  assert.equal(typeof clinepass.textIcon, "string");
});

test("ClinePass exposes the OpenAI-compatible chat completions URL", () => {
  assert.equal(PROVIDER_ENDPOINTS.clinepass, "https://api.cline.bot/api/v1/chat/completions");
});

test("ClinePass registry entry uses OpenAI format with bearer apikey auth", () => {
  const entry = providerRegistry.clinepass;
  assert.ok(entry, "providerRegistry.clinepass must be defined");
  assert.equal(entry.id, "clinepass");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, "https://api.cline.bot/api/v1/chat/completions");
});

test("ClinePass seed model list is the 10 cline-pass/* models from the docs", () => {
  const models = providerRegistry.clinepass.models;
  const ids = models.map((m: { id: string }) => m.id);
  assert.equal(ids.length, 10, "ClinePass bundles exactly 10 models");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  for (const id of ids) {
    assert.ok(id.startsWith("cline-pass/"), `model id must use the cline-pass/ namespace: ${id}`);
  }
  for (const family of [
    "glm-5.2",
    "kimi-k2.7-code",
    "deepseek-v4-pro",
    "qwen3.7",
    "minimax-m3",
    "mimo-v2.5",
  ]) {
    assert.ok(
      ids.some((id: string) => id.includes(family)),
      `seed list must include ${family}`
    );
  }
});
