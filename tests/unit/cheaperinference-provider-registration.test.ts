// Cheaper Inference (api.cheaperinference.com) — OSS-sponsor gateway provider.
// Locks the canonical catalog entry so the id/alias/brand cannot drift, and
// guards the two invariants the provider gates enforce (Zod shape + a registry
// entry that maps back to a canonical provider).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AI_PROVIDERS,
  getProviderByAlias,
  USAGE_SUPPORTED_PROVIDERS,
} from "@/shared/constants/providers";

test("cheaperinference is a canonical provider with the agreed id/alias/brand", () => {
  const provider = AI_PROVIDERS.cheaperinference as unknown as Record<string, unknown>;
  assert.ok(provider, "cheaperinference missing from AI_PROVIDERS");
  assert.equal(provider.id, "cheaperinference");
  assert.equal(provider.alias, "cinf");
  assert.equal(provider.name, "Cheaper Inference");
  // Brand green from the supplied logomark (stroke="#31f889").
  assert.equal(provider.color, "#31f889");
  assert.match(String(provider.website), /^https:\/\/cheaperinference\.com/);
});

test("cheaperinference resolves by alias", () => {
  // getProviderByAlias is the alias-aware lookup; getProviderById indexes by
  // catalog key only and would never resolve "cinf".
  const byAlias = getProviderByAlias("cinf") as unknown as Record<string, unknown> | null;
  assert.ok(byAlias, "alias cinf does not resolve");
  assert.equal(byAlias.id, "cheaperinference");
});

test("cheaperinference is NOT wired into any quota/usage surface", () => {
  // Operator decision 2026-07-31: no quota card. The provider exposes no
  // balance API (/v1/wallet and /v1/balance both 404), so a quota card would
  // have to invent a number. Guard the decision so a later sweep does not
  // silently add one.
  assert.ok(
    !USAGE_SUPPORTED_PROVIDERS.includes("cheaperinference"),
    "cheaperinference must not be in USAGE_SUPPORTED_PROVIDERS (no balance API upstream)"
  );
});

test("cheaperinference registry entry points at the measured API surface", async () => {
  const { REGISTRY } = await import("@omniroute/open-sse/config/providers/index.ts");
  const entry = REGISTRY.cheaperinference as unknown as Record<string, unknown>;
  assert.ok(entry, "cheaperinference missing from REGISTRY");
  assert.equal(entry.format, "openai");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.executor, "cheaperinference");
  assert.equal(entry.baseUrl, "https://api.cheaperinference.com/v1/chat/completions");
  assert.equal(entry.responsesBaseUrl, "https://api.cheaperinference.com/v1/responses");
});

test("cheaperinference catalog matches the measured GET /v1/models text set", async () => {
  const { REGISTRY } = await import("@omniroute/open-sse/config/providers/index.ts");
  const models = (REGISTRY.cheaperinference as unknown as { models: Array<{ id: string }> })
    .models;
  // 39 text models measured on 2026-07-31; the 3 image models live in
  // imageRegistry.ts, never here (chat requests for them 400 upstream).
  assert.equal(models.length, 39);
  const ids = new Set(models.map((m) => m.id));
  for (const expected of ["claude-opus-5", "gpt-5.4", "kimi-k3", "deepseek-v4-flash", "grok-4.5"]) {
    assert.ok(ids.has(expected), `missing model ${expected}`);
  }
  for (const imageOnly of ["nano-banana-2", "nano-banana-pro", "grok-imagine"]) {
    assert.ok(!ids.has(imageOnly), `${imageOnly} is image-only and must not be a chat model`);
  }
});

test("cheaperinference tags its Responses-capable models", async () => {
  const { REGISTRY } = await import("@omniroute/open-sse/config/providers/index.ts");
  const models = (
    REGISTRY.cheaperinference as unknown as {
      models: Array<{ id: string; targetFormat?: string }>;
    }
  ).models;
  const responsesModels = models.filter((m) => m.targetFormat === "openai-responses");
  assert.ok(responsesModels.length > 0, "no model routed to the native /v1/responses endpoint");
  for (const m of responsesModels) {
    assert.match(m.id, /^gpt-5\./, "only the GPT-5.x family is tagged for native Responses");
  }
});

test("cheaperinference resale pricing covers every catalog model", async () => {
  const { DEFAULT_PRICING } = await import("@/shared/constants/pricing/default-pricing");
  const { REGISTRY } = await import("@omniroute/open-sse/config/providers/index.ts");
  const pricing = (DEFAULT_PRICING as Record<string, Record<string, unknown>>).cheaperinference;
  assert.ok(pricing, "no pricing block for cheaperinference");
  const models = (REGISTRY.cheaperinference as unknown as { models: Array<{ id: string }> })
    .models;
  for (const model of models) {
    assert.ok(pricing[model.id], `missing pricing for ${model.id}`);
  }
});

test("cheaperinference pricing uses the gateway's discounted rates, not list price", async () => {
  const { DEFAULT_PRICING } = (await import("@/shared/constants/pricing/default-pricing")) as {
    DEFAULT_PRICING: Record<string, Record<string, Record<string, number>>>;
  };
  // Measured 2026-07-31: the gateway resells claude-opus-5 at $3.50/$17.50 per 1M
  // (30% off Anthropic list). A drift here means the table was copied from the
  // model maker instead of GET /v1/models.
  const opus = DEFAULT_PRICING.cheaperinference["claude-opus-5"];
  assert.equal(opus.input, 3.5);
  assert.equal(opus.output, 17.5);
  const flash = DEFAULT_PRICING.cheaperinference["deepseek-v4-flash"];
  assert.equal(flash.input, 0.098);
  assert.equal(flash.output, 0.196);
});
