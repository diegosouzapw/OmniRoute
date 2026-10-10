import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  aggressiveEngine,
  cavemanEngine,
  liteEngine,
  ultraEngine,
} from "../../../open-sse/services/compression/engines/cavemanAdapter.ts";
import { rtkEngine as realRtkEngine } from "../../../open-sse/services/compression/engines/rtk/index.ts";
import {
  clearCompressionEngineRegistry,
  getEngine,
  getEngineEntry,
  listEnabledEngines,
  listEngines,
  registerEngine,
  setEngineEnabled,
  updateEngineConfig,
} from "../../../open-sse/services/compression/index.ts";

describe("compression engine registry contract", () => {
  beforeEach(() => {
    clearCompressionEngineRegistry();
  });

  it("registers and retrieves an engine by id", () => {
    registerEngine(cavemanEngine);

    assert.equal(getEngine("caveman"), cavemanEngine);
    assert.equal(getEngine("missing"), null);
  });

  it("lists engine entries and filters enabled entries", () => {
    registerEngine(cavemanEngine);
    registerEngine(realRtkEngine);

    assert.equal(listEngines().length, 2);
    assert.equal(listEnabledEngines().length, 2);

    assert.equal(setEngineEnabled("rtk", false), true);
    assert.equal(
      listEnabledEngines()
        .map((entry) => entry.engine.id)
        .join(","),
      "caveman"
    );
  });

  it("updates config only after engine validation passes", () => {
    registerEngine(realRtkEngine);

    const invalid = updateEngineConfig("rtk", { intensity: "extreme" });
    assert.equal(invalid.valid, false);
    assert.match(invalid.errors.join(" "), /intensity/);

    const valid = updateEngineConfig("rtk", {
      intensity: "aggressive",
      applyToCodeBlocks: true,
    });
    assert.equal(valid.valid, true);
    assert.deepEqual(getEngineEntry("rtk")?.config, {
      intensity: "aggressive",
      applyToCodeBlocks: true,
    });
  });

  it("exposes schema and validation for built-in adapters", () => {
    const cavemanSchema = cavemanEngine.getConfigSchema();
    const rtkSchema = realRtkEngine.getConfigSchema();
    const aggressiveSchema = aggressiveEngine.getConfigSchema();
    const ultraSchema = ultraEngine.getConfigSchema();

    assert.ok(cavemanSchema.some((field) => field.key === "intensity"));
    assert.ok(rtkSchema.some((field) => field.key === "applyToCodeBlocks"));
    assert.ok(aggressiveSchema.some((field) => field.key === "maxTokensPerMessage"));
    assert.ok(ultraSchema.some((field) => field.key === "compressionRate"));

    // Lite exposes its OWN minimal schema (tool truncation), NOT the aggressive
    // summarizer/threshold fields it previously leaked.
    const liteSchema = liteEngine.getConfigSchema();
    assert.ok(
      liteSchema.some((field) => field.key === "compressToolResults" && field.defaultValue === true)
    );
    assert.ok(
      liteSchema.some((field) => field.key === "maxToolLength" && field.defaultValue === 2000)
    );
    const truncateField = liteSchema.find((field) => field.key === "compressToolResults");
    assert.ok(truncateField?.description && !/2,000/.test(truncateField.description));
    assert.ok(!liteSchema.some((field) => field.key === "maxTokensPerMessage"));
    assert.ok(!liteSchema.some((field) => field.key === "summarizerEnabled"));
    assert.equal(
      liteEngine.validateConfig({
        preserveSystemPrompt: true,
        compressToolResults: false,
      }).valid,
      true
    );
    assert.equal(liteEngine.validateConfig({ preserveSystemPrompt: "yes" }).valid, false);
    assert.equal(liteEngine.validateConfig({ compressToolResults: "no" }).valid, false);
    assert.equal(liteEngine.validateConfig({ maxToolLength: 8000 }).valid, true);
    assert.equal(liteEngine.validateConfig({ maxToolLength: 10 }).valid, false);
    assert.equal(liteEngine.validateConfig({ maxToolLength: 256 }).valid, true);
    assert.equal(cavemanEngine.validateConfig({ intensity: "full" }).valid, true);
    assert.equal(cavemanEngine.validateConfig({ intensity: "bad" }).valid, false);
    assert.equal(realRtkEngine.validateConfig({ maxLinesPerResult: 20 }).valid, true);
    assert.equal(aggressiveEngine.validateConfig({ maxTokensPerMessage: 2048 }).valid, true);
    assert.equal(aggressiveEngine.validateConfig({ maxTokensPerMessage: 10 }).valid, false);
    assert.equal(ultraEngine.validateConfig({ compressionRate: 0.4 }).valid, true);
    assert.equal(ultraEngine.validateConfig({ compressionRate: 4 }).valid, false);
  });

  it("does not expose a per-engine preserveSystemPrompt control", () => {
    // System-prompt preservation is a global settings-level flag only: the engine
    // apply sites read it from the global config and the settings normalizers drop
    // any per-engine copy, so a per-engine checkbox never took effect and snapped
    // back after save. Legacy data may still carry the key: the engine validators
    // and the aggressive/ultra Zod step-config schemas keep accepting it (lite's
    // strict liteConfigSchema never had a slot for it); no engine may surface it
    // as a UI field.
    for (const engine of [liteEngine, aggressiveEngine, ultraEngine]) {
      assert.equal(
        engine.getConfigSchema().some((field) => field.key === "preserveSystemPrompt"),
        false,
        `${engine.id} config schema must not expose preserveSystemPrompt`
      );
    }
    // The validators keep accepting legacy stored configs that carry the key —
    // pinned so a future cleanup cannot silently drop that acceptance.
    assert.equal(aggressiveEngine.validateConfig({ preserveSystemPrompt: true }).valid, true);
    assert.equal(ultraEngine.validateConfig({ preserveSystemPrompt: true }).valid, true);
    assert.equal(aggressiveEngine.validateConfig({ preserveSystemPrompt: "yes" }).valid, false);
    assert.equal(ultraEngine.validateConfig({ preserveSystemPrompt: "yes" }).valid, false);
  });
});
