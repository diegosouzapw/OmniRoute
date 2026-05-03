import { estimateCompressionTokens } from "../../stats.ts";
import {
  getRtkFilterLoadDiagnostics,
  loadRtkFilters,
  type RtkFilterLoadDiagnostic,
} from "./filterLoader.ts";
import { applyLineFilter } from "./lineFilter.ts";

export interface RtkFilterTestOutcome {
  filterId: string;
  testName: string;
  passed: boolean;
  actual: string;
  expected: string;
}

export interface RtkFilterBenchmarkRow {
  category: string;
  filters: number;
  tests: number;
  averageSavingsPercent: number;
}

export interface RtkVerifyResult {
  passed: boolean;
  outcomes: RtkFilterTestOutcome[];
  filtersWithoutTests: string[];
  benchmark: RtkFilterBenchmarkRow[];
  diagnostics: RtkFilterLoadDiagnostic[];
}

function trimComparable(value: string): string {
  return value.replace(/\n+$/g, "");
}

export function runRtkFilterTests(
  options: {
    requireAll?: boolean;
    customFiltersEnabled?: boolean;
    trustProjectFilters?: boolean;
  } = {}
): RtkVerifyResult {
  const filters = loadRtkFilters({
    refresh: true,
    customFiltersEnabled: options.customFiltersEnabled,
    trustProjectFilters: options.trustProjectFilters,
  });
  const outcomes: RtkFilterTestOutcome[] = [];
  const filtersWithoutTests: string[] = [];
  const benchmarkByCategory = new Map<
    string,
    { filters: Set<string>; tests: number; savingsTotal: number }
  >();

  for (const filter of filters) {
    const categoryStats = benchmarkByCategory.get(filter.category) ?? {
      filters: new Set<string>(),
      tests: 0,
      savingsTotal: 0,
    };
    categoryStats.filters.add(filter.id);
    benchmarkByCategory.set(filter.category, categoryStats);

    if (filter.tests.length === 0) {
      filtersWithoutTests.push(filter.id);
      continue;
    }

    for (const test of filter.tests) {
      const result = applyLineFilter(test.input, filter).text;
      const actual = trimComparable(result);
      const expected = trimComparable(test.expected);
      const originalTokens = estimateCompressionTokens(test.input);
      const compressedTokens = estimateCompressionTokens(result);
      const savings =
        originalTokens > 0 ? ((originalTokens - compressedTokens) / originalTokens) * 100 : 0;
      categoryStats.tests += 1;
      categoryStats.savingsTotal += Math.max(0, savings);
      outcomes.push({
        filterId: filter.id,
        testName: test.name,
        passed: actual === expected,
        actual,
        expected,
      });
    }
  }

  const benchmark = Array.from(benchmarkByCategory.entries())
    .map(([category, value]) => ({
      category,
      filters: value.filters.size,
      tests: value.tests,
      averageSavingsPercent:
        value.tests > 0 ? Math.round((value.savingsTotal / value.tests) * 100) / 100 : 0,
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

  const failed = outcomes.some((outcome) => !outcome.passed);
  return {
    passed: !failed && (!options.requireAll || filtersWithoutTests.length === 0),
    outcomes,
    filtersWithoutTests,
    benchmark,
    diagnostics: options.customFiltersEnabled === false ? [] : getRtkFilterLoadDiagnostics(),
  };
}
