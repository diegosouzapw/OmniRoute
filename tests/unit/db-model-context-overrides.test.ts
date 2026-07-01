import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Feature 5004 — model_context_overrides DB module round-trip.

const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-mco-module-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const mco = await import("../../src/lib/db/modelContextOverrides.ts");

function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
  fs.mkdirSync(moduleDataDir, { recursive: true });
}

beforeEach(() => {
  resetStorage();
  // Touch the DB so migration 110 creates the table.
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
});

describe("modelContextOverrides", () => {
  it("returns null when there is no override", () => {
    assert.equal(mco.getModelContextOverride("openai", "gpt-5"), null);
    assert.equal(mco.getModelContextOverrideRecord("openai", "gpt-5"), null);
  });

  it("round-trips a manual override (set -> get -> record)", () => {
    assert.equal(mco.setModelContextOverride("openai", "gpt-5", 400000), true);
    assert.equal(mco.getModelContextOverride("openai", "gpt-5"), 400000);
    const rec = mco.getModelContextOverrideRecord("openai", "gpt-5");
    assert.equal(rec?.realContext, 400000);
    assert.equal(rec?.source, "manual");
    assert.equal(rec?.provider, "openai");
    assert.equal(rec?.modelId, "gpt-5");
  });

  it("upserts on the same (provider, model) key and records the source", () => {
    mco.setModelContextOverride("anthropic", "claude-sonnet-4-5", 200000, "auto:discovery");
    assert.equal(mco.getModelContextOverrideRecord("anthropic", "claude-sonnet-4-5")?.source, "auto:discovery");
    // Re-set as manual overwrites the same row.
    mco.setModelContextOverride("anthropic", "claude-sonnet-4-5", 1000000, "manual");
    const rec = mco.getModelContextOverrideRecord("anthropic", "claude-sonnet-4-5");
    assert.equal(rec?.realContext, 1000000);
    assert.equal(rec?.source, "manual");
    assert.equal(mco.listModelContextOverrides().length, 1);
  });

  it("rejects non-positive / non-integer windows and empty keys (no write)", () => {
    assert.equal(mco.setModelContextOverride("openai", "gpt-5", 0), false);
    assert.equal(mco.setModelContextOverride("openai", "gpt-5", -1), false);
    assert.equal(mco.setModelContextOverride("openai", "gpt-5", 1.5), false);
    assert.equal(mco.setModelContextOverride("", "gpt-5", 1000), false);
    assert.equal(mco.setModelContextOverride("openai", "  ", 1000), false);
    assert.equal(mco.getModelContextOverride("openai", "gpt-5"), null);
  });

  it("trims keys so lookups match writes", () => {
    mco.setModelContextOverride("  openai  ", "  gpt-5  ", 333000);
    assert.equal(mco.getModelContextOverride("openai", "gpt-5"), 333000);
  });

  it("removes an override", () => {
    mco.setModelContextOverride("groq", "llama-3.3-70b", 128000);
    assert.equal(mco.removeModelContextOverride("groq", "llama-3.3-70b"), true);
    assert.equal(mco.getModelContextOverride("groq", "llama-3.3-70b"), null);
    assert.equal(mco.removeModelContextOverride("groq", "llama-3.3-70b"), false);
  });

  it("lists all overrides", () => {
    mco.setModelContextOverride("openai", "gpt-5", 400000);
    mco.setModelContextOverride("anthropic", "claude-sonnet-4-5", 200000, "auto:discovery");
    const all = mco.listModelContextOverrides();
    assert.equal(all.length, 2);
    assert.deepEqual(
      all.map((o) => `${o.provider}/${o.modelId}`).sort(),
      ["anthropic/claude-sonnet-4-5", "openai/gpt-5"]
    );
  });
});
