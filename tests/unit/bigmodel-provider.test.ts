import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { parseModel } from "../../open-sse/services/model.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { isReservedProviderPrefix } from "../../src/shared/constants/reservedProviderPrefixes.ts";

const BIGMODEL_CHAT_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

test("BigModel.cn uses the documented OpenAI chat endpoint with Bearer authentication", () => {
  const entry = getRegistryEntry("bigmodel");
  assert.ok(entry);
  assert.equal(entry.alias, "bigmodel");
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, BIGMODEL_CHAT_URL);
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.equal(getRegistryEntry("zhipu"), null);
  assert.ok(PROVIDER_MODELS.bigmodel.some((model) => model.id === "glm-5.3"));
  assert.ok(PROVIDER_MODELS.bigmodel.some((model) => model.id === "glm-5.3-flash"));
  assert.equal(PROVIDER_MODELS.zhipu, undefined);
  assert.deepEqual(parseModel("bigmodel/glm-5.3-flash"), {
    provider: "bigmodel",
    model: "glm-5.3-flash",
    isAlias: false,
    providerAlias: "bigmodel",
    extendedContext: false,
  });
  assert.equal(isReservedProviderPrefix("bigmodel"), true);

  const executor = new DefaultExecutor("bigmodel");
  assert.equal(executor.buildUrl("glm-5.3", true), BIGMODEL_CHAT_URL);

  const headers = executor.buildHeaders({ apiKey: "bigmodel-key" }, true);
  assert.equal(headers.Authorization, "Bearer bigmodel-key");
  assert.equal(headers["x-api-key"], undefined);
});

test("BigModel.cn and Z.AI expose distinct platform links and localized descriptions", () => {
  const bigmodel = APIKEY_PROVIDERS.bigmodel;
  const zai = APIKEY_PROVIDERS.zai;

  assert.equal(bigmodel.name, "BigModel.cn (Zhipu)");
  assert.equal(bigmodel.alias, "bigmodel");
  assert.equal(bigmodel.website, "https://open.bigmodel.cn");
  assert.match(bigmodel.apiHint, /bigmodel\.cn\/usercenter\/proj-mgmt\/apikeys/);
  assert.equal(zai.website, "https://z.ai/model-api");
  assert.equal(zai.apiHint, "Create an API key at https://z.ai/manage-apikey/apikey-list.");

  const en = JSON.parse(readFileSync("src/i18n/messages/en.json", "utf8"));
  const zhCN = JSON.parse(readFileSync("src/i18n/messages/zh-CN.json", "utf8"));
  const zhTW = JSON.parse(readFileSync("src/i18n/messages/zh-TW.json", "utf8"));
  assert.match(en.providers.onboardingProviderDescriptions.bigmodel, /BigModel\.cn/);
  assert.match(zhCN.providers.onboardingProviderDescriptions.bigmodel, /智谱开放平台/);
  assert.match(zhTW.providers.onboardingProviderDescriptions.bigmodel, /智譜開放平台/);
  assert.match(en.providers.onboardingProviderDescriptions.zai, /z\.ai\/manage-apikey/);
  assert.match(zhCN.providers.onboardingProviderDescriptions.zai, /z\.ai\/manage-apikey/);
  assert.match(zhTW.providers.onboardingProviderDescriptions.zai, /z\.ai\/manage-apikey/);

  const ptBR = JSON.parse(readFileSync("src/i18n/messages/pt-BR.json", "utf8"));
  const vi = JSON.parse(readFileSync("src/i18n/messages/vi.json", "utf8"));
  const bigmodelKeyPath = /bigmodel\.cn\/usercenter\/proj-mgmt\/apikeys/;
  assert.match(ptBR.providers.onboardingProviderDescriptions.bigmodel, bigmodelKeyPath);
  assert.match(vi.providers.onboardingProviderDescriptions.bigmodel, bigmodelKeyPath);
  assert.match(ptBR.providers.onboardingProviderDescriptions.zai, /z\.ai\/manage-apikey/);
  assert.match(vi.providers.onboardingProviderDescriptions.zai, /z\.ai\/manage-apikey/);
});
