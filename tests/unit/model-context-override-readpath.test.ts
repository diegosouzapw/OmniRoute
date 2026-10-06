import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Feature 5004 — getModelContextLimit reads the override before the static catalog.

const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-mco-readpath-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const mco = await import("../../src/lib/db/modelContextOverrides.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");

beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(moduleDataDir, { recursive: true });
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("getModelContextLimit override precedence (5004)", () => {
  it("an override wins over the catalog, and removing it falls back to the catalog", () => {
    // Read the override-free catalog value dynamically (non-brittle for any model).
    const catalog = caps.getResolvedModelCapabilities({
      provider: "openai",
      model: "gpt-4o",
    }).contextWindow;
    const distinct = (catalog ?? 0) + 12345;

    mco.setModelContextOverride("openai", "gpt-4o", distinct);
    assert.equal(caps.getModelContextLimit("openai", "gpt-4o"), distinct, "override must win");

    mco.removeModelContextOverride("openai", "gpt-4o");
    assert.equal(
      caps.getModelContextLimit("openai", "gpt-4o"),
      catalog,
      "absence must fall back to the catalog"
    );
  });

  it("an override surfaces a window for a model the catalog does not know", () => {
    assert.equal(caps.getModelContextLimit("custom-local", "my-7b-128k"), null);
    mco.setModelContextOverride("custom-local", "my-7b-128k", 131072);
    assert.equal(caps.getModelContextLimit("custom-local", "my-7b-128k"), 131072);
  });

  it("resolves exact raw aliases after canonical rows, without effort inheritance", () => {
    const provider = "github";
    const rawAlias = "claude-opus-4.5";
    const canonical = "claude-opus-4-5-20251101";

    assert.equal(mco.setModelContextOverride(provider, rawAlias, 333333), true);
    assert.equal(
      caps.getResolvedModelCapabilities({ provider, model: rawAlias }).contextWindow,
      333333,
      "an exact raw alias override must be effective"
    );
    assert.notEqual(
      caps.getResolvedModelCapabilities(
        { provider, model: rawAlias },
        { persistedOverrides: false }
      ).contextWindow,
      333333,
      "override-free resolution must not read the raw alias row"
    );

    assert.equal(mco.setModelContextOverride(provider, canonical, 444444), true);
    assert.equal(
      caps.getResolvedModelCapabilities({ provider, model: rawAlias }).contextWindow,
      444444,
      "the canonical row must win over the exact raw alias row"
    );
    assert.notEqual(
      caps.getResolvedModelCapabilities({ provider, model: `${rawAlias}-high` }).contextWindow,
      444444,
      "an exact alias override must not inherit to an effort variant"
    );
  });

  it("default getResolvedModelCapabilities reflects the override; persistedOverrides:false returns the catalog", () => {
    mco.setModelContextOverride("openai", "gpt-4o", 999999, "auto:discovery");
    // Default resolution is the effective runtime view: the persisted context
    // override wins over the catalog.
    const effective = caps.getResolvedModelCapabilities({
      provider: "openai",
      model: "gpt-4o",
    }).contextWindow;
    assert.equal(effective, 999999, "default resolution must reflect the persisted override");

    // The override-free catalog view (used by the reconciler) excludes the override.
    const catalog = caps.getResolvedModelCapabilities(
      { provider: "openai", model: "gpt-4o" },
      { persistedOverrides: false }
    ).contextWindow;
    assert.notEqual(catalog, 999999, "persistedOverrides:false must return the catalog value");

    // getModelContextLimit always follows the effective override.
    assert.equal(
      caps.getModelContextLimit("openai", "gpt-4o"),
      999999,
      "getModelContextLimit reflects the override"
    );
  });
});
