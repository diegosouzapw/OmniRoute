/**
 * TDD for #11625: vendor-retired catalog ids stay selectable and still win on
 * arena_elo because auto-combo never consults model-lifecycle.json, and layers
 * 1–2 return before the layer-3 veto (#11508 / #11598).
 *
 * This file was written first and observed failing on the pre-fix chain:
 *   - isModelSelectable("anthropic", "claude-3-7-sonnet-20250219") === true
 *   - seeded arena_elo on gpt-5.2-codex leaked through getTaskFitnessWithSource
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const {
  isVendorRetiredId,
  rejectRetiredAutoComboCandidates,
  isModelSelectable,
  getModelLifecycleDecision,
} = await import("../../open-sse/services/modelLifecycle.ts");
const {
  getTaskFitnessWithSource,
  invalidateFitnessCache,
} = await import("../../open-sse/services/autoCombo/taskFitness.ts");
const { upsertModelIntelligence } = await import("../../src/lib/db/modelIntelligence.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const snapshot = JSON.parse(
  readFileSync(
    fileURLToPath(new URL("../../config/quality/model-lifecycle.json", import.meta.url)),
    "utf8"
  )
) as { retired: Record<string, { status?: string }> };

const snapshotRetired = Object.entries(snapshot.retired)
  .filter(([, entry]) => entry.status === "retired")
  .map(([id]) => id);

describe("isVendorRetiredId (#11625) — prefix-stripped snapshot match", () => {
  it("treats snapshot retired ids and their vendor-prefixed forms as retired", () => {
    assert.equal(isVendorRetiredId("gpt-5.2-codex"), true);
    assert.equal(isVendorRetiredId("openai/gpt-5.2-codex"), true);
    assert.equal(isVendorRetiredId("claude-3-7-sonnet-20250219"), true);
    assert.equal(isVendorRetiredId("GPT-5.2-Codex"), true);
  });

  it("does not mark a live flagship or a retiring-without-date id as retired", () => {
    assert.equal(isVendorRetiredId("gpt-5.6-sol"), false);
    // Snapshot marks this retiring with retiredOn null — must not auto-promote.
    assert.equal(isVendorRetiredId("gpt-4-turbo"), false);
  });
});

describe("rejectRetiredAutoComboCandidates (#11625)", () => {
  it("drops every snapshot-retired id and keeps a live control", () => {
    const live = { model: "gpt-5.6-sol", provider: "openai" };
    const retired = snapshotRetired.slice(0, 8).map((id) => ({
      model: id,
      provider: "openrouter",
    }));
    const prefixed = { model: "openai/gpt-5.2-codex", provider: "openrouter" };
    const kept = rejectRetiredAutoComboCandidates([live, ...retired, prefixed]);
    assert.deepEqual(
      kept.map((c) => c.model),
      ["gpt-5.6-sol"]
    );
    for (const dropped of [...retired, prefixed]) {
      assert.equal(isVendorRetiredId(dropped.model), true, dropped.model);
    }
  });
});

describe("isModelSelectable / getModelLifecycleDecision consult the snapshot (#11625)", () => {
  it("rejects an Anthropic retired id that MODEL_LIFECYCLE_RECORDS never heard of", () => {
    assert.equal(isModelSelectable("anthropic", "claude-3-7-sonnet-20250219"), false);
    const decision = getModelLifecycleDecision("anthropic", "claude-3-7-sonnet-20250219");
    assert.equal(decision.status, "shutdown");
    assert.equal(decision.action, "reject");
  });

  it("rejects a retired OpenAI id on an aggregator that the hardcoded table scopes away", () => {
    const decision = getModelLifecycleDecision("openrouter", "gpt-5.2-codex");
    assert.equal(decision.status, "shutdown");
    assert.equal(decision.action, "reject");
    assert.equal(isModelSelectable("openrouter", "openai/gpt-5.2-codex"), false);
  });

  it("still allows a live model", () => {
    assert.equal(isModelSelectable("openai", "gpt-5.6-sol"), true);
    assert.equal(getModelLifecycleDecision("openai", "gpt-5.6-sol").action, "allow");
  });
});

describe("taskFitness layers 1–2 skip retired ids (#11625)", () => {
  before(() => {
    upsertModelIntelligence({
      model: "gpt-5.2-codex",
      source: "arena_elo",
      category: "coding",
      score: 0.96,
      eloRaw: 1280,
      confidence: "high",
      expiresAt: "2099-12-31T23:59:59Z",
    });
    upsertModelIntelligence({
      model: "openai/gpt-5.2-codex",
      source: "arena_elo",
      category: "coding",
      score: 0.96,
      eloRaw: 1280,
      confidence: "high",
      expiresAt: "2099-12-31T23:59:59Z",
    });
    upsertModelIntelligence({
      model: "claude-3-7-sonnet-20250219",
      source: "arena_elo",
      category: "coding",
      score: 0.94,
      eloRaw: 1200,
      confidence: "high",
      expiresAt: "2099-12-31T23:59:59Z",
    });
    upsertModelIntelligence({
      model: "gpt-5.6-sol",
      source: "arena_elo",
      category: "coding",
      score: 0.91,
      eloRaw: 1500,
      confidence: "high",
      expiresAt: "2099-12-31T23:59:59Z",
    });
    invalidateFitnessCache();
  });

  after(() => {
    resetDbInstance();
    invalidateFitnessCache();
  });

  it("does not return a seeded arena_elo row for a retired bare id", () => {
    const result = getTaskFitnessWithSource("gpt-5.2-codex", "coding");
    assert.notEqual(result.source, "arena_elo");
    assert.notEqual(result.score, 0.96);
  });

  it("does not return a seeded arena_elo row for the vendor-prefixed catalog form", () => {
    const result = getTaskFitnessWithSource("openai/gpt-5.2-codex", "coding");
    assert.notEqual(result.source, "arena_elo");
    assert.notEqual(result.score, 0.96);
  });

  it("does not inherit a retired base's arena row onto an effort variant", () => {
    const result = getTaskFitnessWithSource("claude-3-7-sonnet-20250219-high", "coding");
    assert.notEqual(result.source, "arena_elo");
    assert.notEqual(result.source, "arena_elo:inherited");
    assert.notEqual(result.score, 0.94);
  });

  it("does not let a retired *codex id keep the coding wildcard boost", () => {
    const result = getTaskFitnessWithSource("openai/gpt-5.2-codex", "coding");
    assert.equal(result.score, 0.5);
    assert.equal(result.source, "wildcard_boost");
  });

  it("leaves a live flagship's arena row intact", () => {
    const result = getTaskFitnessWithSource("gpt-5.6-sol", "coding");
    assert.equal(result.score, 0.91);
    assert.equal(result.source, "arena_elo");
  });
});
