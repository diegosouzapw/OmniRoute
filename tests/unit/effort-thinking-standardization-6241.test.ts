import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB-backed pieces (/models enrichment) need an isolated DATA_DIR + a released handle
// (PII learning #3). Set it BEFORE importing any db-touching module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-effort-6241-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CANONICAL_EFFORT_VALUES, normalizeEffort, effortRequestSchema, normalizeReasoningRequest } =
  await import("../../src/shared/reasoning/effortStandardization.ts");
const { providerChatCompletionSchema } =
  await import("../../src/shared/validation/schemas/apiV1.ts");
const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const registry = await import("../../src/lib/modelMetadataRegistry.ts");
const { extractReasoningIntent } = await import("../../src/lib/reasoningRouting/policy.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── Schema ─────────────────────────────────────────────────────────────

test("providerChatCompletionSchema parses canonical effort + thinking", () => {
  const parsed = providerChatCompletionSchema.parse({
    model: "openai/gpt-5",
    messages: [{ role: "user", content: "hi" }],
    effort: "high",
    thinking: true,
  });
  assert.equal(parsed.effort, "high");
  assert.equal(parsed.thinking, true);
});

test("schema still accepts the existing object-shaped thinking config (back-compat)", () => {
  const parsed = providerChatCompletionSchema.parse({
    model: "anthropic/claude-sonnet-4-5",
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled", budget_tokens: 2048 },
  });
  assert.deepEqual(parsed.thinking, { type: "enabled", budget_tokens: 2048 });
});

test("schema normalizes UI tier synonyms (extra) onto xhigh, preserves max, rejects garbage", () => {
  assert.equal(effortRequestSchema.parse("extra"), "xhigh");
  assert.equal(effortRequestSchema.parse("MAX"), "max");
  assert.equal(effortRequestSchema.parse("medium"), "medium");
  assert.throws(() => effortRequestSchema.parse("turbo"));
});

// ── normalizeEffort ────────────────────────────────────────────────────

test("normalizeEffort maps canonical + aliases, ignores unknown", () => {
  assert.equal(normalizeEffort("high"), "high");
  assert.equal(normalizeEffort("HIGH"), "high");
  assert.equal(normalizeEffort("extra"), "xhigh");
  assert.equal(normalizeEffort("max"), "max");
  assert.equal(normalizeEffort("none"), "none");
  assert.equal(normalizeEffort("turbo"), undefined);
  assert.equal(normalizeEffort(3), undefined);
  assert.deepEqual([...CANONICAL_EFFORT_VALUES], ["none", "low", "medium", "high", "xhigh", "max"]);
});

// ── normalizeReasoningRequest ──────────────────────────────────────────

test("canonical effort populates reasoning_effort + reasoning.effort when client did not", () => {
  const out = normalizeReasoningRequest({
    model: "openai/gpt-5",
    effort: "high",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "high");
  assert.equal((out.reasoning as Record<string, unknown>).effort, "high");
});

test("canonical thinking boolean is preserved as the truthy toggle", () => {
  const out = normalizeReasoningRequest({
    model: "openai/gpt-5",
    effort: "medium",
    thinking: true,
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "medium");
  assert.equal(out.thinking, true);
});

test("Extra maps to xhigh, Max is preserved natively through the normalizer", () => {
  const extra = normalizeReasoningRequest({ effort: "extra" }) as Record<string, unknown>;
  assert.equal(extra.reasoning_effort, "xhigh");
  const max = normalizeReasoningRequest({ effort: "Max" }) as Record<string, unknown>;
  assert.equal(max.reasoning_effort, "max");
});

test("explicit client reasoning_effort is NOT overwritten by canonical effort", () => {
  const out = normalizeReasoningRequest({
    model: "openai/gpt-5",
    reasoning_effort: "low",
    effort: "high",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "low");
});

test("explicit client reasoning.effort is NOT overwritten by canonical effort", () => {
  const out = normalizeReasoningRequest({
    reasoning: { effort: "low" },
    effort: "high",
  }) as Record<string, unknown>;
  assert.equal((out.reasoning as Record<string, unknown>).effort, "low");
  assert.equal(out.reasoning_effort, undefined);
});

test("explicit object-shaped thinking config is preserved (not clobbered by boolean)", () => {
  const cfg = { type: "enabled", budget_tokens: 4096 };
  const out = normalizeReasoningRequest({
    effort: "high",
    thinking: cfg,
  }) as Record<string, unknown>;
  assert.deepEqual(out.thinking, cfg);
  assert.equal(out.reasoning_effort, "high");
});

test("OpenRouter reasoning.enabled false normalizes to none without mutating the request", () => {
  const body = {
    model: "openai/gpt-5",
    messages: [{ role: "system", content: "Keep this prompt." }],
    max_tokens: 321,
    reasoning: { enabled: false, summary: "auto" },
  };
  const before = structuredClone(body);
  const out = normalizeReasoningRequest(body) as Record<string, unknown>;

  assert.notEqual(out, body);
  assert.equal(out.messages, body.messages);
  assert.equal(out.reasoning_effort, "none");
  assert.deepEqual(out.reasoning, { summary: "auto", effort: "none" });
  assert.deepEqual(body, before);

  const intent = extractReasoningIntent(body.model, out);
  assert.equal(intent.effort, "none");
  assert.equal(intent.hasThinkingBudget, false);

  const ambiguous = { reasoning: { enabled: false, max_tokens: 2048 } };
  const rawIntent = extractReasoningIntent(body.model, ambiguous);
  assert.equal(rawIntent.effort, null);
  assert.equal(rawIntent.sourceEffort, "signal");
  assert.equal(rawIntent.hasThinkingBudget, true);
  const preservedBudget = normalizeReasoningRequest(ambiguous) as Record<string, unknown>;
  assert.equal(preservedBudget.reasoning_effort, undefined);
  assert.deepEqual(preservedBudget.reasoning, { max_tokens: 2048 });

  const suffixed = extractReasoningIntent("codex/gpt-6-astra-high", {
    reasoning: { enabled: false },
  });
  assert.equal(suffixed.effort, "high");
  assert.equal(
    extractReasoningIntent(body.model, {
      reasoning: { enabled: false },
      thinking: { type: "enabled", budget_tokens: 2048 },
    }).sourceEffort,
    "signal"
  );
  assert.equal(
    extractReasoningIntent(body.model, {
      reasoning: { enabled: false },
      chat_template_kwargs: { enable_thinking: true },
    }).sourceEffort,
    "missing"
  );
  assert.equal(extractReasoningIntent(body.model, { effort: "extra" }).effort, "xhigh");
});

test("explicit effort beats reasoning.enabled false; true and non-boolean flags are untouched", () => {
  const nested = normalizeReasoningRequest({
    reasoning: { enabled: false, effort: "high", summary: "auto" },
  }) as Record<string, unknown>;
  assert.equal(nested.reasoning_effort, undefined);
  assert.deepEqual(nested.reasoning, { effort: "high", summary: "auto" });

  const flat = normalizeReasoningRequest({
    reasoning_effort: "high",
    reasoning: { enabled: false },
  }) as Record<string, unknown>;
  assert.equal(flat.reasoning_effort, "high");
  assert.equal(flat.reasoning, undefined);

  const canonical = normalizeReasoningRequest({
    effort: "high",
    reasoning: { enabled: false },
  }) as Record<string, unknown>;
  assert.equal(canonical.reasoning_effort, "high");
  assert.deepEqual(canonical.reasoning, { effort: "high" });

  const invalidCanonical = normalizeReasoningRequest({
    effort: "turbo",
    reasoning: { enabled: false },
  }) as Record<string, unknown>;
  assert.equal(invalidCanonical.effort, "turbo");
  assert.equal(invalidCanonical.reasoning_effort, undefined);
  assert.equal(invalidCanonical.reasoning, undefined);

  for (const control of [
    { thinking: { type: "enabled", budget_tokens: 2048 } },
    { output_config: { effort: "high" } },
    { chat_template_kwargs: { enable_thinking: true } },
  ]) {
    const out = normalizeReasoningRequest({ reasoning: { enabled: false }, ...control }) as Record<
      string,
      unknown
    >;
    assert.equal(out.reasoning_effort, undefined);
    assert.equal(out.reasoning, undefined);
  }

  for (const enabled of [true, "false", null, undefined]) {
    const body = { reasoning: { enabled } };
    assert.equal(normalizeReasoningRequest(body), body);
  }
});

test("returns the same reference untouched when no canonical fields are set", () => {
  const body = { model: "openai/gpt-5", reasoning_effort: "low" };
  const out = normalizeReasoningRequest(body);
  assert.equal(out, body);
});

// ── /models capability exposure ────────────────────────────────────────

test("enrichCatalogModelEntry exposes supportsThinking + effort_tiers for a thinking model", () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-5": {
        tool_call: true,
        reasoning: true,
        attachment: false,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text"]),
        modalities_output: JSON.stringify(["text"]),
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: "stable",
        family: "gpt-5",
        open_weights: false,
        limit_context: 400000,
        limit_input: 400000,
        limit_output: 128000,
        interleaved_field: null,
      },
    },
  });

  const enriched = registry.enrichCatalogModelEntry({
    id: "openai/gpt-5",
    object: "model",
    owned_by: "openai",
    root: "gpt-5",
  }) as Record<string, unknown>;

  const caps = enriched.capabilities as Record<string, unknown>;
  assert.ok(caps, "capabilities object present");
  assert.equal(caps.supportsThinking, true);
  assert.deepEqual(caps.effort_tiers, ["none", "low", "medium", "high", "xhigh", "max"]);
  // additive — existing flags preserved
  assert.equal(caps.thinking, true);
  assert.equal(caps.reasoning, true);
});

test("enrichCatalogModelEntry preserves Kimi's provider-declared effort contract", () => {
  for (const model of ["k3", "k3-256k"]) {
    const entry = registry.enrichCatalogModelEntry({
      id: `kmc/${model}`,
      object: "model",
      owned_by: "kimi-coding",
      root: model,
      capabilities: {
        thinking: true,
        supportsThinking: true,
        effort_tiers: ["low", "high", "max"],
      },
    }) as Record<string, unknown>;
    assert.deepEqual(
      (entry.capabilities as Record<string, unknown>).effort_tiers,
      ["low", "high", "max"],
      model
    );
  }

  const k27 = registry.enrichCatalogModelEntry({
    id: "kmc/kimi-for-coding",
    object: "model",
    owned_by: "kimi-coding",
    root: "kimi-for-coding",
    capabilities: { thinking: true, supportsThinking: true },
  }) as Record<string, unknown>;
  assert.equal("effort_tiers" in (k27.capabilities as Record<string, unknown>), false);
});

test("enrichCatalogModelEntry exposes Max for Kiro GPT-5.6 Luna", () => {
  const enriched = registry.enrichCatalogModelEntry({
    id: "kr/gpt-5.6-luna",
    object: "model",
    owned_by: "kr",
    root: "gpt-5.6-luna",
  }) as Record<string, unknown>;

  const caps = enriched.capabilities as Record<string, unknown>;
  assert.equal(caps.supportsThinking, true);
  assert.deepEqual(caps.effort_tiers, ["none", "low", "medium", "high", "xhigh", "max"]);
});
