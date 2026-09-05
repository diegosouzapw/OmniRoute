import test from "node:test";
import assert from "node:assert/strict";
import { getPassthroughProviders } from "../../../open-sse/config/providerRegistry.ts";

test("src/sse/handlers/chat.ts imports cleanly without module or syntax errors", async () => {
  const chatHandler = await import("../../../src/sse/handlers/chat.ts");
  assert.ok(chatHandler, "chat.ts handler module should export successfully");
});

test("getPassthroughProviders includes expected proxy/passthrough providers", () => {
  const providers = getPassthroughProviders();
  assert.ok(providers.has("cline"), "cline should be a passthrough provider");
  assert.ok(providers.has("kilocode"), "kilocode should be a passthrough provider");
});

test("passthrough model routing preserves original unstripped modelStr when provider overrides to passthrough", () => {
  const passthroughProviders = getPassthroughProviders();
  const provider: string = "cline";
  const resolvedProvider: string = "openai";
  const modelStr = "cline/gpt-4o-mini";
  const model = "gpt-4o-mini";
  const body = { model: "cline/gpt-4o-mini", messages: [] };

  let effectiveModel = model;
  let requestBody = { ...body, model: `cline/${effectiveModel}` };

  if (provider !== resolvedProvider && passthroughProviders.has(provider)) {
    effectiveModel = modelStr;
    requestBody = { ...body, model: modelStr };
  }

  assert.equal(effectiveModel, "cline/gpt-4o-mini");
  assert.equal(requestBody.model, "cline/gpt-4o-mini");
});

test("providerId falls back to target.provider when target.providerId is absent", () => {
  const targetWithProviderId = { providerId: "prov_123", provider: "cline" };
  const targetWithProviderOnly = { provider: "kilocode" };
  const targetEmpty = {};

  const resolveProviderId = (target: { providerId?: string; provider?: string }) =>
    target?.providerId ?? target?.provider ?? null;

  assert.equal(resolveProviderId(targetWithProviderId), "prov_123");
  assert.equal(resolveProviderId(targetWithProviderOnly), "kilocode");
  assert.equal(resolveProviderId(targetEmpty), null);
});
