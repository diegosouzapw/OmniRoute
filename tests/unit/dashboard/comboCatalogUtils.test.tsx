import { describe, expect, it } from "vitest";
import {
  filterCatalogCombos,
  flattenCombos,
  getComboCatalogPage,
  sortCatalogCombos,
  type ComboCatalogRow,
} from "@/app/(dashboard)/dashboard/models/comboCatalogUtils";

const sampleCombos: ComboCatalogRow[] = [
  {
    id: "combo-1",
    name: "alpha-priority",
    displayName: "Alpha Priority",
    strategy: "priority",
    description: "Fast fallback chain",
    models: [
      { model: "openai/gpt-4o", provider: "openai" },
      { model: "anthropic/claude-3-5-sonnet", provider: "anthropic" },
    ],
    memberCount: 2,
    status: "active",
    contextLength: 128000,
  },
  {
    id: "combo-2",
    name: "beta-round-robin",
    displayName: "Beta Round Robin",
    strategy: "round-robin",
    description: "Load balanced across 5 models",
    models: [{ model: "m1" }, { model: "m2" }, { model: "m3" }, { model: "m4" }, { model: "m5" }],
    memberCount: 5,
    status: "paused",
    contextLength: 64000,
  },
  {
    id: "combo-3",
    name: "gamma-fusion",
    strategy: "fusion",
    description: "Parallel judge panel",
    models: [{ model: "m1" }],
    memberCount: 1,
    status: "active",
  },
];

describe("flattenCombos", () => {
  it("extracts and normalizes combo rows from API payload", () => {
    const rawCombos = [
      {
        id: "c1",
        name: "test-combo",
        strategy: "weighted",
        models: [{ model: "m1" }],
        isActive: false,
      },
      {
        id: "c2",
        name: "active-combo",
        strategy: "round-robin",
        models: [{ model: "m1" }, { model: "m2" }],
        isActive: true,
      },
    ];

    const result = flattenCombos(rawCombos);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: "c1",
      name: "test-combo",
      displayName: "test-combo",
      strategy: "weighted",
      description: undefined,
      models: [{ model: "m1" }],
      memberCount: 1,
      status: "paused",
      contextLength: undefined,
    });
    expect(result[1].status).toBe("active");
    expect(result[1].memberCount).toBe(2);
  });

  it("handles empty or invalid inputs", () => {
    expect(flattenCombos(null)).toEqual([]);
    expect(flattenCombos(undefined)).toEqual([]);
    expect(flattenCombos("invalid")).toEqual([]);
  });
});

describe("filterCatalogCombos", () => {
  it("filters combos by query across name, displayName, description, and model ids", () => {
    expect(
      filterCatalogCombos(sampleCombos, {
        query: "alpha",
        strategy: "all",
        status: "all",
        testResult: "all",
      })
    ).toEqual([sampleCombos[0]]);

    expect(
      filterCatalogCombos(sampleCombos, {
        query: "claude-3-5",
        strategy: "all",
        status: "all",
        testResult: "all",
      })
    ).toEqual([sampleCombos[0]]);

    expect(
      filterCatalogCombos(sampleCombos, {
        query: "judge",
        strategy: "all",
        status: "all",
        testResult: "all",
      })
    ).toEqual([sampleCombos[2]]);
  });

  it("filters combos by strategy", () => {
    expect(
      filterCatalogCombos(sampleCombos, {
        query: "",
        strategy: "priority",
        status: "all",
        testResult: "all",
      })
    ).toEqual([sampleCombos[0]]);
  });

  it("filters combos by status", () => {
    expect(
      filterCatalogCombos(sampleCombos, {
        query: "",
        strategy: "all",
        status: "paused",
        testResult: "all",
      })
    ).toEqual([sampleCombos[1]]);

    expect(
      filterCatalogCombos(sampleCombos, {
        query: "",
        strategy: "all",
        status: "active",
        testResult: "all",
      })
    ).toEqual([sampleCombos[0], sampleCombos[2]]);
  });

  it("filters combos by member count range", () => {
    expect(
      filterCatalogCombos(sampleCombos, {
        query: "",
        strategy: "all",
        status: "all",
        minMembers: 2,
        maxMembers: 4,
        testResult: "all",
      })
    ).toEqual([sampleCombos[0]]);

    expect(
      filterCatalogCombos(sampleCombos, {
        query: "",
        strategy: "all",
        status: "all",
        minMembers: 3,
        testResult: "all",
      })
    ).toEqual([sampleCombos[1]]);
  });

  it("filters combos by test result", () => {
    const testResults = {
      "combo:alpha-priority": {
        id: "combo:alpha-priority",
        targetType: "combo" as const,
        comboName: "alpha-priority",
        status: "ok" as const,
        latencyMs: 120,
        testedAt: 1000,
      },
      "combo:beta-round-robin": {
        id: "combo:beta-round-robin",
        targetType: "combo" as const,
        comboName: "beta-round-robin",
        status: "error" as const,
        latencyMs: 50,
        testedAt: 1000,
      },
    };

    expect(
      filterCatalogCombos(
        sampleCombos,
        {
          query: "",
          strategy: "all",
          status: "all",
          testResult: "ok",
        },
        testResults
      )
    ).toEqual([sampleCombos[0]]);

    expect(
      filterCatalogCombos(
        sampleCombos,
        {
          query: "",
          strategy: "all",
          status: "all",
          testResult: "error",
        },
        testResults
      )
    ).toEqual([sampleCombos[1]]);

    expect(
      filterCatalogCombos(
        sampleCombos,
        {
          query: "",
          strategy: "all",
          status: "all",
          testResult: "untested",
        },
        testResults
      )
    ).toEqual([sampleCombos[2]]);
  });
});

describe("sortCatalogCombos", () => {
  it("sorts by name ascending and descending", () => {
    const sortedAsc = sortCatalogCombos(sampleCombos, "name", "asc");
    expect(sortedAsc.map((c) => c.name)).toEqual([
      "alpha-priority",
      "beta-round-robin",
      "gamma-fusion",
    ]);

    const sortedDesc = sortCatalogCombos(sampleCombos, "name", "desc");
    expect(sortedDesc.map((c) => c.name)).toEqual([
      "gamma-fusion",
      "beta-round-robin",
      "alpha-priority",
    ]);
  });

  it("sorts by memberCount", () => {
    const sorted = sortCatalogCombos(sampleCombos, "memberCount", "desc");
    expect(sorted.map((c) => c.memberCount)).toEqual([5, 2, 1]);
  });
});

describe("getComboCatalogPage", () => {
  it("paginates combo rows correctly", () => {
    expect(getComboCatalogPage(sampleCombos, 0, 2)).toEqual({
      rows: [sampleCombos[0], sampleCombos[1]],
      page: 0,
      pageCount: 2,
    });
    expect(getComboCatalogPage(sampleCombos, 1, 2)).toEqual({
      rows: [sampleCombos[2]],
      page: 1,
      pageCount: 2,
    });
  });
});
