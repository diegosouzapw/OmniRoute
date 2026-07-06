import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { resolveCanonicalProviderModel } from "../../open-sse/services/model.ts";
import { DEFAULT_PRICING } from "../../src/shared/constants/pricing.ts";

test("Pollinations catalog mirrors the current public text model lineup", () => {
  const models = getModelsByProviderId("pollinations");
  const ids = new Set(models.map((model) => model.id));
  const names = models.map((model) => model.name);

  assert.ok(ids.has("openai-fast"));
  assert.ok(ids.has("openai-large"));
  assert.ok(ids.has("perplexity-fast"));
  assert.ok(ids.has("qwen-coder-large"));
  assert.ok(ids.has("claude-large"));
  assert.equal(ids.has("llama"), false);
  assert.equal(
    names.some((name) => /GPT-5 via Pollinations/i.test(name)),
    false
  );
});

test("Puter catalog exposes the currently documented Sonar models", () => {
  const ids = new Set(getModelsByProviderId("puter").map((model) => model.id));

  assert.ok(ids.has("perplexity/sonar"));
  assert.ok(ids.has("perplexity/sonar-pro"));
  assert.ok(ids.has("perplexity/sonar-pro-search"));
  assert.ok(ids.has("perplexity/sonar-reasoning-pro"));
  assert.ok(ids.has("perplexity/sonar-deep-research"));
});

test("NVIDIA catalog includes the verified 2026 additions and GPT OSS 20B alias resolution", () => {
  const ids = new Set(getModelsByProviderId("nvidia").map((model) => model.id));

  assert.ok(ids.has("openai/gpt-oss-20b"));
  assert.ok(ids.has("nvidia/nemotron-3-super-120b-a12b"));
  assert.ok(ids.has("mistralai/mistral-large-3-675b-instruct-2512"));
  assert.ok(ids.has("qwen/qwen3.5-397b-a17b"));
  assert.ok(ids.has("mistralai/devstral-2-123b-instruct-2512"));

  assert.deepEqual(resolveCanonicalProviderModel("nvidia", "gpt-oss-20b"), {
    provider: "nvidia",
    model: "openai/gpt-oss-20b",
  });
});

test("Fable 5 catalog exposes claude-fable-5 in cc — but NOT via Kiro (fabricated)", () => {
  // claude-fable-5 is a real Claude flagship served by the Claude Code (cc) channel,
  // but Kiro's upstream never served it — it had been copied verbatim into the Kiro
  // registry from OmniRoute's own Anthropic catalog and returned upstream 400
  // "Invalid model". #6170 removed the fabricated Kiro copy.
  const ccIds = new Set(getModelsByProviderId("cc").map((m) => m.id));
  assert.ok(ccIds.has("claude-fable-5"), "cc must expose claude-fable-5");

  const ccPricing = (DEFAULT_PRICING as Record<string, Record<string, unknown>>).cc;
  assert.ok(ccPricing["claude-fable-5"], "cc pricing must include claude-fable-5");

  const kiroIds = new Set(getModelsByProviderId("kiro").map((m) => m.id));
  assert.equal(kiroIds.has("claude-fable-5"), false, "kiro must NOT expose claude-fable-5 (fabricated)");
});

test("Sonnet 5 catalog exposes claude-sonnet-5 across cc/kiro/anthropic/blackbox with Sonnet-tier pricing", () => {
  // Sonnet 5 must be wired everywhere the last flagship (Fable 5) was — but as a
  // Sonnet-tier model: $3/$15 pricing (NOT the Opus/Fable $15/$75), 1M ctx / 128K out.
  for (const providerId of ["cc", "kiro", "anthropic", "blackbox"]) {
    const ids = new Set(getModelsByProviderId(providerId).map((m) => m.id));
    assert.ok(ids.has("claude-sonnet-5"), `${providerId} must expose claude-sonnet-5`);
  }

  const kiroSonnet5 = getModelsByProviderId("kiro").find((m) => m.id === "claude-sonnet-5");
  assert.equal(kiroSonnet5?.contextLength, 1000000);
  assert.equal(kiroSonnet5?.maxOutputTokens, 128000);

  const ccPricing = (DEFAULT_PRICING as Record<string, Record<string, unknown>>).cc;
  assert.ok(ccPricing["claude-sonnet-5"], "cc pricing must include claude-sonnet-5");

  const kiroPricing = (DEFAULT_PRICING as Record<string, Record<string, unknown>>).kiro;
  const kiroSonnet5Price = kiroPricing["claude-sonnet-5"] as { input: number; output: number };
  assert.ok(kiroSonnet5Price, "kiro pricing must include claude-sonnet-5");
  // Sonnet-tier, not Opus-tier — guards against copying Fable 5's $15/$75.
  assert.equal(kiroSonnet5Price.input, 3.0);
  assert.equal(kiroSonnet5Price.output, 15.0);
});

test("Kiro catalog does NOT expose Claude Opus (fabricated — Kiro upstream has no Opus)", () => {
  // Kiro's real upstream never served any Opus model; the Opus 4.8/4.7/4.6 ids had been
  // copied into the Kiro registry from OmniRoute's Anthropic catalog and returned upstream
  // 400 "Invalid model. Please select a different model". #6170 removed them.
  const ids = new Set(getModelsByProviderId("kiro").map((model) => model.id));

  assert.equal(ids.has("claude-opus-4.8"), false, "kiro must NOT expose claude-opus-4.8 (fabricated)");
  assert.equal(ids.has("claude-opus-4.7"), false, "kiro must NOT expose claude-opus-4.7 (fabricated)");
  assert.equal(ids.has("claude-opus-4.6"), false, "kiro must NOT expose claude-opus-4.6 (fabricated)");
});

test("Every Kiro registry model resolves a non-zero pricing row (no $0.00 usage)", async () => {
  const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
  const models = getModelsByProviderId("kiro");

  assert.ok(models.length > 0, "kiro must expose models");

  for (const model of models) {
    const pricing = getPricingForModel("kiro", model.id) as {
      input?: number;
      output?: number;
    } | null;
    assert.ok(pricing, `kiro pricing must include "${model.id}"`);
    assert.equal(
      typeof pricing?.input === "number" && typeof pricing?.output === "number",
      true,
      `kiro pricing for "${model.id}" must have numeric input/output`
    );
  }

  // Regression guard: Kiro's real Sonnet is 4.5 (the "4.6" id was fabricated — #6170) and
  // must carry Sonnet-tier pricing ($3/$15).
  const sonnet45 = getPricingForModel("kiro", "claude-sonnet-4.5") as {
    input: number;
    output: number;
  } | null;
  assert.ok(sonnet45, "kiro pricing must include claude-sonnet-4.5");
  assert.equal(sonnet45?.input, 3.0);
  assert.equal(sonnet45?.output, 15.0);
});

test("Every OpenAI registry model resolves a non-zero pricing row (alias: openai)", async () => {
  const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
  const models = getModelsByProviderId("openai");
  assert.ok(models.length > 0, "openai must expose models");

  for (const model of models) {
    const pricing = getPricingForModel("openai", model.id) as {
      input?: number;
      output?: number;
    } | null;
    assert.ok(pricing, `openai pricing must include "${model.id}"`);
    assert.equal(
      typeof pricing?.input === "number" && typeof pricing?.output === "number",
      true,
      `openai pricing for "${model.id}" must have numeric input/output`
    );
  }
});

test("Every Codex registry model resolves a non-zero pricing row (alias: cx)", async () => {
  const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
  const models = getModelsByProviderId("codex");
  assert.ok(models.length > 0, "codex must expose models");

  for (const model of models) {
    // Codex pricing lives under the "cx" alias (its DEFAULT_PRICING key).
    const pricing = getPricingForModel("cx", model.id) as {
      input?: number;
      output?: number;
    } | null;
    assert.ok(pricing, `cx pricing must include codex model "${model.id}"`);
    assert.equal(
      typeof pricing?.input === "number" && typeof pricing?.output === "number",
      true,
      `cx pricing for "${model.id}" must have numeric input/output`
    );
  }
});

test("Every Qwen registry model resolves a non-zero pricing row (alias: qw)", async () => {
  const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
  const models = getModelsByProviderId("qwen");
  assert.ok(models.length > 0, "qwen must expose models");

  for (const model of models) {
    // Qwen pricing lives under the "qw" alias (its DEFAULT_PRICING key).
    const pricing = getPricingForModel("qw", model.id) as {
      input?: number;
      output?: number;
    } | null;
    assert.ok(pricing, `qw pricing must include qwen model "${model.id}"`);
    assert.equal(
      typeof pricing?.input === "number" && typeof pricing?.output === "number",
      true,
      `qw pricing for "${model.id}" must have numeric input/output`
    );
  }

  // Regression guard: the "coder-model" id (Qwen3.5/3.6 Coder Model, ported from
  // upstream 9router PR #156) must be priced like the other Qwen coder tier.
  const coderModel = getPricingForModel("qw", "coder-model") as {
    input: number;
    output: number;
  } | null;
  assert.ok(coderModel, "qw pricing must include coder-model");
  assert.equal(typeof coderModel?.input, "number");
  assert.equal(typeof coderModel?.output, "number");
});
