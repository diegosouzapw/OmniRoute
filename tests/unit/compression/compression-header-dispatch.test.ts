import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  selectCompressionPlan,
  planFromHeader,
  formatCompressionMeta,
  buildNamedComboLookup,
} from "../../../open-sse/services/compression/strategySelector.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

const combos = {
  c1: [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
  "fast combo": [{ engine: "lite" }],
};

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, ...overrides };
}

// header is the 7th positional arg of selectCompressionPlan/selectCompressionStrategy.
function planWithHeader(config: CompressionConfig, header: string | null) {
  return selectCompressionPlan(config, null, 0, undefined, undefined, combos, header);
}

describe("planFromHeader (Phase 3)", () => {
  it("off => mode off, source request-header", () => {
    const p = planFromHeader(cfg(), "off", combos);
    assert.deepEqual(p, { mode: "off", stackedPipeline: [], source: "request-header" });
  });

  it("default => the panel-derived default, ignoring the active profile", () => {
    const config = cfg({
      activeComboId: "c1",
      enginesExplicit: true,
      engines: { rtk: { enabled: true } },
    });
    const p = planFromHeader(config, "default", combos);
    assert.equal(p?.mode, "rtk"); // engines map default, NOT the c1 active profile
    assert.equal(p?.source, "request-header");
  });

  it("engine:<id> => that single engine when enabled (case-insensitive)", () => {
    const config = cfg({ enginesExplicit: true, engines: { rtk: { enabled: true } } });
    assert.equal(planFromHeader(config, "engine:RTK", combos)?.mode, "rtk");
  });

  it("engine:<id> => null (fall-through) when the engine is disabled", () => {
    const config = cfg({ engines: { rtk: { enabled: false } } });
    assert.equal(planFromHeader(config, "engine:rtk", combos), null);
  });

  it("engine: <id> => tolerates whitespace after the colon", () => {
    const config = cfg({ enginesExplicit: true, engines: { rtk: { enabled: true } } });
    assert.equal(planFromHeader(config, "engine: rtk", combos)?.mode, "rtk");
  });

  it("<combo> matches by name (case-insensitive) and by id", () => {
    assert.deepEqual(
      planFromHeader(cfg(), "FAST COMBO", combos)?.stackedPipeline,
      combos["fast combo"]
    );
    assert.deepEqual(planFromHeader(cfg(), "c1", combos)?.stackedPipeline, combos.c1);
  });

  it("unknown value => null (fall-through)", () => {
    assert.equal(planFromHeader(cfg(), "nonsense", combos), null);
  });
});

describe("header precedence in resolveBasePlan (Phase 3)", () => {
  it("a valid header beats the active profile", () => {
    const config = cfg({ activeComboId: "c1" });
    assert.equal(planWithHeader(config, "off").mode, "off");
    assert.equal(planWithHeader(config, "off").source, "request-header");
  });

  it("a valid header beats a routing-combo override", () => {
    const config = cfg({ comboOverrides: { "route-x": "stacked" } });
    const plan = selectCompressionPlan(config, "route-x", 0, undefined, undefined, combos, "off");
    assert.equal(plan.mode, "off");
    assert.equal(plan.source, "request-header");
  });

  it("a valid header bypasses auto-trigger (Decision B)", () => {
    const config = cfg({
      autoTriggerTokens: 1000,
      autoTriggerMode: "aggressive",
      enginesExplicit: true,
      engines: { rtk: { enabled: true } },
    });
    // Large prompt would auto-escalate to aggressive; the header pins the panel default.
    assert.equal(planWithHeader(config, "default").mode, "rtk");
  });

  it("an unknown header falls through to the normal resolution", () => {
    const config = cfg({ activeComboId: "c1" });
    const plan = planWithHeader(config, "bogus");
    assert.equal(plan.mode, "stacked");
    assert.equal(plan.source, "active-profile");
  });

  it("master-off beats the header (hard kill switch)", () => {
    const config = cfg({ enabled: false, engines: { rtk: { enabled: true } } });
    const plan = planWithHeader(config, "engine:rtk");
    assert.equal(plan.mode, "off");
    assert.equal(plan.source, "off");
  });
});

describe("source on non-header paths", () => {
  it("routing-override / active-profile / auto-trigger / default / off", () => {
    assert.equal(
      selectCompressionPlan(
        cfg({ comboOverrides: { r: "lite" } }),
        "r",
        0,
        undefined,
        undefined,
        combos,
        null
      ).source,
      "routing-override"
    );
    assert.equal(planWithHeader(cfg({ activeComboId: "c1" }), null).source, "active-profile");
    // auto-trigger only fires once estimatedTokens crosses autoTriggerTokens, so pass an
    // estimate above the threshold (planWithHeader pins estimatedTokens=0 and never trips it).
    assert.equal(
      selectCompressionPlan(
        cfg({ autoTriggerTokens: 10, autoTriggerMode: "lite" }),
        null,
        50,
        undefined,
        undefined,
        combos,
        null
      ).source,
      "auto-trigger"
    );
    assert.equal(
      planWithHeader(cfg({ enginesExplicit: true, engines: { rtk: { enabled: true } } }), null)
        .source,
      "default"
    );
    assert.equal(planWithHeader(cfg({ enabled: false }), null).source, "off");
  });
});

describe("formatCompressionMeta", () => {
  it("renders '<mode>; source=<source>'", () => {
    assert.equal(
      formatCompressionMeta({ mode: "aggressive", stackedPipeline: [], source: "request-header" }),
      "aggressive; source=request-header"
    );
    assert.equal(formatCompressionMeta({ mode: "off", stackedPipeline: [] }), "off; source=off");
  });
});

describe("buildNamedComboLookup", () => {
  const pipe = [{ engine: "lite" }];

  it("keys each combo by both id and lowercased name", () => {
    const map = buildNamedComboLookup([{ id: "abc-123", name: "My Fast Combo", pipeline: pipe }]);
    assert.deepEqual(map["abc-123"], pipe);
    assert.deepEqual(map["my fast combo"], pipe);
  });

  it("skips the name key (no '' key, no crash) when the name is blank/whitespace/missing", () => {
    const map = buildNamedComboLookup([
      { id: "id-empty", name: "", pipeline: pipe },
      { id: "id-space", name: "   ", pipeline: pipe },
      { id: "id-null", name: null, pipeline: pipe },
    ]);
    assert.deepEqual(map["id-empty"], pipe); // id key always present
    assert.deepEqual(map["id-space"], pipe);
    assert.deepEqual(map["id-null"], pipe);
    assert.equal(Object.prototype.hasOwnProperty.call(map, ""), false); // no blank key
    assert.equal(Object.keys(map).length, 3); // only the three id keys
  });

  it("trims surrounding whitespace on the name key", () => {
    const map = buildNamedComboLookup([{ id: "x", name: "  Spaced  ", pipeline: pipe }]);
    assert.deepEqual(map["spaced"], pipe);
  });
});
