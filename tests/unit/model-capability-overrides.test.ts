import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-model-capability-overrides-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const caps = await import("../../src/lib/modelCapabilities.ts");
const overrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");

beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
  fs.mkdirSync(moduleDataDir, { recursive: true });
  coreDb.getDbInstance();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
});

describe("model capability overrides", () => {
  it("stores, lists, removes, and applies a provider/model max_token override", () => {
    const withoutOverride = caps.getResolvedModelCapabilities({
      provider: "openai",
      model: "gpt-4o",
    }).maxOutputTokens;
    const distinct = (withoutOverride ?? 0) + 12345;

    assert.equal(
      overrides.setModelCapabilityOverride("openai/gpt-4o", "max_token", distinct),
      true
    );
    assert.deepEqual(
      overrides.listModelCapabilityOverrides().map((entry) => ({
        target: entry.target,
        key: entry.key,
        value: entry.value,
      })),
      [{ target: "openai/gpt-4o", key: "max_token", value: distinct }]
    );

    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" }).maxOutputTokens,
      distinct
    );
    assert.notEqual(
      caps.getResolvedModelCapabilities({ provider: "anthropic", model: "gpt-4o" }).maxOutputTokens,
      distinct,
      "override must be scoped by provider/model, not bare model id"
    );

    assert.equal(overrides.removeModelCapabilityOverride("openai/gpt-4o", "max_token"), true);
    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "openai", model: "gpt-4o" }).maxOutputTokens,
      withoutOverride
    );
  });

  it("applies overrides stored under provider-scoped model aliases", () => {
    assert.equal(
      overrides.setModelCapabilityOverride("github/claude-opus-4.5", "max_token", 77777),
      true
    );

    assert.equal(
      caps.getResolvedModelCapabilities({ provider: "github", model: "claude-opus-4.5" })
        .maxOutputTokens,
      77777
    );
  });

  it("rejects invalid targets and non-positive values", () => {
    assert.equal(overrides.setModelCapabilityOverride("gpt-4o", "max_token", 1000), false);
    assert.equal(overrides.setModelCapabilityOverride("openai/gpt-4o", "max_token", 0), false);
    assert.equal(overrides.setModelCapabilityOverride("openai/gpt-4o", "max_token", 1.5), false);
    assert.deepEqual(overrides.listModelCapabilityOverrides(), []);
  });
});
