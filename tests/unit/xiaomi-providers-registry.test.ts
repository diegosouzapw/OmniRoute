import { test } from "node:test";
import assert from "node:assert/strict";
import { xiaomi_mimoProvider } from "../../open-sse/config/providers/registry/xiaomi-mimo/index.ts";
import { xiaomi_mimo_token_planProvider } from "../../open-sse/config/providers/registry/xiaomi-mimo-token-plan/index.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getTargetFormat } from "../../open-sse/services/provider.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { getKnownPlan } from "../../src/lib/quota/planRegistry.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";

// ---------------------------------------------------------------------------
// Task 5: xiaomi-mimo declares the Anthropic-compatible variant
// ---------------------------------------------------------------------------

test("xiaomi-mimo aponta para o host da conta normal", () => {
  assert.equal(xiaomi_mimoProvider.baseUrl, "https://api.xiaomimimo.com/v1");
  assert.equal(xiaomi_mimoProvider.format, "openai");
  assert.equal(xiaomi_mimoProvider.authHeader, "bearer");
});

test("xiaomi-mimo declara a variante Anthropic no mesmo host", () => {
  const alt = xiaomi_mimoProvider.alternateFormats?.find((a) => a.format === "claude");
  assert.ok(alt, "esperava uma alternativa claude declarada");
  assert.equal(alt.baseUrl, "https://api.xiaomimimo.com/anthropic/v1/messages");
  assert.equal(alt.authHeader, "x-api-key");
  assert.equal(alt.headers?.["Anthropic-Version"], "2023-06-01");
  assert.ok(alt.label.length > 0);
});

// ---------------------------------------------------------------------------
// Task 5 Step 4: end-to-end coverage via the REAL executors, now that
// xiaomi-mimo actually declares alternateFormats. tests/unit/alternate-formats.test.ts
// only exercises replica functions (precedence/pickAuthHeader) because until this
// task no registry entry declared alternateFormats — that excuse is gone now.
//
// A defect surfaced while writing these tests: DefaultExecutor.buildUrl()'s
// "xiaomi-mimo" case piped resolveBaseUrl() through normalizeXiaomiMimoChatUrl(),
// which unconditionally appends "/chat/completions" — so the alternate's
// already-complete ".../anthropic/v1/messages" URL was mangled into
// ".../anthropic/v1/messages/chat/completions". Fixed in DefaultExecutor.buildUrl()
// (default.ts) with a short-circuit placed after the openai-compatible-*/
// anthropic-compatible-* prefix checks and before `switch (this.provider)`: when
// an alternate format is selected (and no manual providerSpecificData.baseUrl
// override is present, which still wins per #6147), its baseUrl is returned as-is
// — bypassing every per-provider normalizer in the switch, all of which assume the
// provider's default OpenAI-shaped path and would otherwise mangle a
// non-OpenAI-shaped alternate endpoint the same way. Covered end-to-end below via
// the real DefaultExecutor.buildUrl(), not just resolveBaseUrl().
// ---------------------------------------------------------------------------

class TestXiaomiExecutor extends BaseExecutor {
  constructor() {
    super("xiaomi-mimo", { baseUrl: "https://api.xiaomimimo.com/v1" });
  }

  publicResolveBaseUrl(credentials: ProviderCredentials | null): string {
    return this.resolveBaseUrl(credentials);
  }

  async transformRequest(model: string, body: unknown, stream: boolean) {
    return body;
  }
}

test("getTargetFormat: override da conexao troca o formato quando declarado (xiaomi-mimo)", () => {
  assert.equal(getTargetFormat("xiaomi-mimo", { targetFormat: "claude" }), "claude");
});

test("DefaultExecutor.buildHeaders: targetFormat claude produz x-api-key + Anthropic-Version", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const headers = executor.buildHeaders(
    {
      apiKey: "sk-test",
      providerSpecificData: { targetFormat: "claude" },
    } as never,
    true
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "sk-test");
  assert.equal(headers["Authorization"], undefined);
  assert.equal(headers["Anthropic-Version"], "2023-06-01");
});

test("DefaultExecutor.buildHeaders: sem targetFormat mantem Authorization Bearer (nao-regressao)", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const headers = executor.buildHeaders(
    {
      apiKey: "sk-test",
      providerSpecificData: {},
    } as never,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], "Bearer sk-test");
  assert.equal(headers["x-api-key"], undefined);
});

test("resolveBaseUrl: targetFormat claude resolve para o endpoint /anthropic/v1/messages", () => {
  const executor = new TestXiaomiExecutor();
  const url = executor.publicResolveBaseUrl({
    apiKey: "sk-test",
    providerSpecificData: { targetFormat: "claude" },
  });
  assert.equal(url, "https://api.xiaomimimo.com/anthropic/v1/messages");
});

test("resolveBaseUrl: sem targetFormat resolve para o /v1 padrao", () => {
  const executor = new TestXiaomiExecutor();
  const url = executor.publicResolveBaseUrl({ apiKey: "sk-test", providerSpecificData: {} });
  assert.equal(url, "https://api.xiaomimimo.com/v1");
});

test("resolveBaseUrl: providerSpecificData.baseUrl manual vence a alternativa", () => {
  const executor = new TestXiaomiExecutor();
  const url = executor.publicResolveBaseUrl({
    apiKey: "sk-test",
    providerSpecificData: {
      targetFormat: "claude",
      baseUrl: "https://manual.example.com/v1",
    },
  });
  assert.equal(url, "https://manual.example.com/v1");
});

// DefaultExecutor.buildUrl() end-to-end: proves the short-circuit fix in
// default.ts, not just the resolveBaseUrl() layer above.

test("buildUrl: targetFormat claude produz a URL do endpoint Anthropic, sem /chat/completions grudado", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const url = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    apiKey: "sk-x",
    providerSpecificData: { targetFormat: "claude" },
  });
  assert.equal(url, "https://api.xiaomimimo.com/anthropic/v1/messages");
});

test("buildUrl: sem targetFormat mantem a URL OpenAI padrao (nao-regressao)", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const url = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    apiKey: "sk-x",
    providerSpecificData: {},
  });
  assert.equal(url, "https://api.xiaomimimo.com/v1/chat/completions");
});

test("buildUrl: providerSpecificData.baseUrl manual continua vencendo e passa pelo caminho normal", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const url = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    apiKey: "sk-x",
    providerSpecificData: {
      targetFormat: "claude",
      baseUrl: "https://manual.example.com/v1",
    },
  });
  assert.equal(url, "https://manual.example.com/v1/chat/completions");
});

test("buildUrl: xiaomi-mimo-token-plan com targetFormat claude usa o host token-plan-sgp", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");
  const url = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    apiKey: "sk-x",
    providerSpecificData: { targetFormat: "claude" },
  });
  assert.equal(url, "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages");
});

test("buildUrl: xiaomi-mimo-token-plan sem targetFormat mantem a URL OpenAI padrao do host token-plan-sgp", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");
  const url = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    apiKey: "sk-x",
    providerSpecificData: {},
  });
  assert.equal(url, "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions");
});

// ---------------------------------------------------------------------------
// Task 6: xiaomi-mimo-token-plan provider
// ---------------------------------------------------------------------------

test("xiaomi-mimo-token-plan aponta para o host token-plan-sgp", () => {
  assert.equal(
    xiaomi_mimo_token_planProvider.baseUrl,
    "https://token-plan-sgp.xiaomimimo.com/v1"
  );
  assert.equal(xiaomi_mimo_token_planProvider.format, "openai");
  assert.equal(xiaomi_mimo_token_planProvider.authHeader, "bearer");
});

test("xiaomi-mimo-token-plan declara a variante Anthropic no host token-plan", () => {
  const alt = xiaomi_mimo_token_planProvider.alternateFormats?.find(
    (a) => a.format === "claude"
  );
  assert.ok(alt, "esperava uma alternativa claude declarada");
  assert.equal(alt.baseUrl, "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages");
  assert.equal(alt.authHeader, "x-api-key");
});

test("xiaomi-mimo-token-plan esta registrado e nao colide de host com o normal", () => {
  assert.ok(REGISTRY["xiaomi-mimo-token-plan"], "provedor nao registrado");
  assert.notEqual(
    REGISTRY["xiaomi-mimo-token-plan"].baseUrl,
    REGISTRY["xiaomi-mimo"].baseUrl
  );
});

test("xiaomi-mimo-token-plan expoe os modelos de chat", () => {
  const ids = xiaomi_mimo_token_planProvider.models.map((m) => m.id);
  assert.ok(ids.includes("mimo-v2.5-pro"));
  assert.ok(ids.includes("mimo-v2.5"));
});

// ---------------------------------------------------------------------------
// Task 7: monthly quota plan for the Token Plan
// ---------------------------------------------------------------------------

test("xiaomi-mimo-token-plan tem plano mensal registrado", () => {
  const plan = getKnownPlan("xiaomi-mimo-token-plan");
  assert.ok(plan, "esperava plano registrado para o Token Plan");
  assert.equal(plan.dimensions.length, 1);
  assert.equal(plan.dimensions[0].unit, "tokens");
  assert.equal(plan.dimensions[0].window, "monthly");
  assert.ok(plan.dimensions[0].limit > 0);
});

test("xiaomi-mimo-token-plan declara suporte a usage", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("xiaomi-mimo-token-plan"));
});
