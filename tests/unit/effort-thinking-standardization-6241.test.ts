import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB-backed pieces (/models enrichment) need an isolated DATA_DIR + a released handle
// (PII learning #3). Set it BEFORE importing any db-touching module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-effort-6241-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  CANONICAL_EFFORT_VALUES,
  normalizeEffort,
  effortRequestSchema,
  normalizeReasoningRequest,
} = await import("../../src/shared/reasoning/effortStandardization.ts");
const { providerChatCompletionSchema } = await import(
  "../../src/shared/validation/schemas/apiV1.ts"
);
const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const registry = await import("../../src/lib/modelMetadataRegistry.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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

test("schema normalizes UI tier synonyms (extra/max) onto xhigh, rejects garbage", () => {
  assert.equal(effortRequestSchema.parse("extra"), "xhigh");
  assert.equal(effortRequestSchema.parse("MAX"), "xhigh");
  assert.equal(effortRequestSchema.parse("medium"), "medium");
  assert.throws(() => effortRequestSchema.parse("turbo"));
});

// ── normalizeEffort ────────────────────────────────────────────────────

test("normalizeEffort maps canonical + aliases, ignores unknown", () => {
  assert.equal(normalizeEffort("high"), "high");
  assert.equal(normalizeEffort("HIGH"), "high");
  assert.equal(normalizeEffort("extra"), "xhigh");
  assert.equal(normalizeEffort("max"), "xhigh");
  assert.equal(normalizeEffort("none"), "none");
  assert.equal(normalizeEffort("turbo"), undefined);
  assert.equal(normalizeEffort(3), undefined);
  assert.deepEqual([...CANONICAL_EFFORT_VALUES], ["none", "low", "medium", "high", "xhigh"]);
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

test("Extra / Max collapse to xhigh through the normalizer", () => {
  const extra = normalizeReasoningRequest({ effort: "extra" }) as Record<string, unknown>;
  assert.equal(extra.reasoning_effort, "xhigh");
  const max = normalizeReasoningRequest({ effort: "Max" }) as Record<string, unknown>;
  assert.equal(max.reasoning_effort, "xhigh");
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
  assert.deepEqual(caps.effort_tiers, ["none", "low", "medium", "high", "xhigh"]);
  // additive — existing flags preserved
  assert.equal(caps.thinking, true);
  assert.equal(caps.reasoning, true);
});
