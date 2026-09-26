import { describe, expect, it } from "vitest";
import {
  buildCatalogSearchParams,
  DEFAULT_COMBO_FILTERS,
  DEFAULT_MODEL_FILTERS,
  hasActiveComboFilters,
  hasActiveModelFilters,
  parseCatalogTab,
  parseComboFilters,
  parseModelFilters,
  parseNonNegativeInt,
} from "@/app/(dashboard)/dashboard/models/catalogUrlState";

describe("parseNonNegativeInt", () => {
  it("accepts non-negative whole numbers", () => {
    expect(parseNonNegativeInt("0")).toBe(0);
    expect(parseNonNegativeInt("32000")).toBe(32000);
    expect(parseNonNegativeInt(" 42 ")).toBe(42);
  });

  it("rejects empty, NaN, negative, fractional, exponent and unsafe values", () => {
    for (const raw of [
      null,
      undefined,
      "",
      "   ",
      "abc",
      "NaN",
      "-5",
      "1.5",
      "1e3",
      "9".repeat(20),
    ]) {
      expect(parseNonNegativeInt(raw)).toBeUndefined();
    }
  });
});

describe("parseCatalogTab", () => {
  it("defaults to models for anything but combos", () => {
    expect(parseCatalogTab(new URLSearchParams("tab=combos"))).toBe("combos");
    expect(parseCatalogTab(new URLSearchParams("tab=other"))).toBe("models");
    expect(parseCatalogTab(new URLSearchParams(""))).toBe("models");
  });
});

describe("parseModelFilters", () => {
  it("returns the defaults for an empty query", () => {
    expect(parseModelFilters(new URLSearchParams(""))).toEqual(DEFAULT_MODEL_FILTERS);
  });

  it("does not leak combo search or test-result filters into models after reload", () => {
    const params = buildCatalogSearchParams("combos", DEFAULT_MODEL_FILTERS, {
      ...DEFAULT_COMBO_FILTERS,
      query: "fast",
      testResult: "error",
    });
    expect(parseModelFilters(params)).toEqual(DEFAULT_MODEL_FILTERS);
    expect(parseComboFilters(params)).toMatchObject({ query: "fast", testResult: "error" });
  });

  it("reads every model filter param", () => {
    expect(
      parseModelFilters(
        new URLSearchParams(
          "query=chat&provider=alpha&type=chat&subtype=code&capability=tools&pricing=free&health=down&testResult=slow&minContext=8000&minOutput=4096"
        )
      )
    ).toEqual({
      query: "chat",
      providerId: "alpha",
      type: "chat",
      subtype: "code",
      capability: "tools",
      pricing: "free",
      providerHealth: "down",
      testResult: "slow",
      minContextLength: 8000,
      minMaxOutputTokens: 4096,
    });
  });

  it("drops invalid numeric and enumerated values instead of filtering on them", () => {
    const filters = parseModelFilters(
      new URLSearchParams("minContext=abc&minOutput=-5&pricing=cheap&health=?&testResult=maybe")
    );
    expect(filters).toEqual(DEFAULT_MODEL_FILTERS);
    expect(hasActiveModelFilters(filters)).toBe(false);
  });
});

describe("parseComboFilters", () => {
  it("reads combo params and ignores invalid member counts", () => {
    expect(
      parseComboFilters(
        new URLSearchParams(
          "tab=combos&query=fast&strategy=priority&status=paused&testResult=error&minMembers=2&maxMembers=-1"
        )
      )
    ).toEqual({
      query: "fast",
      strategy: "priority",
      status: "paused",
      testResult: "error",
      minMembers: 2,
      maxMembers: undefined,
    });
  });

  it("only reads the shared query/testResult params when the combos tab is active", () => {
    expect(parseComboFilters(new URLSearchParams("query=fast&testResult=ok"))).toEqual(
      DEFAULT_COMBO_FILTERS
    );
    expect(parseComboFilters(new URLSearchParams("cQuery=deep&cTestResult=ok")).query).toBe("deep");
  });

  it("drops an unknown status", () => {
    expect(parseComboFilters(new URLSearchParams("tab=combos&status=zombie")).status).toBe("all");
  });
});

describe("buildCatalogSearchParams", () => {
  it("round-trips model filters", () => {
    const filters = {
      ...DEFAULT_MODEL_FILTERS,
      query: "vision",
      providerId: "beta",
      minMaxOutputTokens: 8000,
    };
    const params = buildCatalogSearchParams("models", filters, DEFAULT_COMBO_FILTERS);
    expect(params.toString()).toBe("query=vision&provider=beta&minOutput=8000");
    expect(parseModelFilters(params)).toEqual(filters);
  });

  it("round-trips combo filters with the tab param", () => {
    const filters = { ...DEFAULT_COMBO_FILTERS, strategy: "fusion", minMembers: 2, maxMembers: 5 };
    const params = buildCatalogSearchParams("combos", DEFAULT_MODEL_FILTERS, filters);
    expect(params.get("tab")).toBe("combos");
    expect(parseComboFilters(params)).toEqual(filters);
  });

  it("writes nothing for default filters on the models tab", () => {
    expect(
      buildCatalogSearchParams("models", DEFAULT_MODEL_FILTERS, DEFAULT_COMBO_FILTERS).toString()
    ).toBe("");
  });
});

describe("hasActive*Filters", () => {
  it("detects any non-default filter", () => {
    expect(hasActiveModelFilters(DEFAULT_MODEL_FILTERS)).toBe(false);
    expect(hasActiveModelFilters({ ...DEFAULT_MODEL_FILTERS, minMaxOutputTokens: 0 })).toBe(true);
    expect(hasActiveComboFilters(DEFAULT_COMBO_FILTERS)).toBe(false);
    expect(hasActiveComboFilters({ ...DEFAULT_COMBO_FILTERS, maxMembers: 3 })).toBe(true);
  });
});
