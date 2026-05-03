import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { cavemanEngine } from "../../../open-sse/services/compression/engines/cavemanAdapter.ts";
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

    assert.ok(cavemanSchema.some((field) => field.key === "intensity"));
    assert.ok(rtkSchema.some((field) => field.key === "applyToCodeBlocks"));
    assert.equal(cavemanEngine.validateConfig({ intensity: "full" }).valid, true);
    assert.equal(cavemanEngine.validateConfig({ intensity: "bad" }).valid, false);
    assert.equal(realRtkEngine.validateConfig({ maxLinesPerResult: 20 }).valid, true);
  });
});
