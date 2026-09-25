import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyStrictZeroCostCandidate,
  countStrictExclusions,
  describeStrictExclusions,
  filterStrictZeroCostCandidates,
  type FreeAccessState,
  type StrictZeroCostCandidate,
} from "../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import type { FreeModelBudget } from "../../open-sse/config/freeModelCatalog.ts";

const NOW = 10_000_000;

function entry(provider: string, model: string): FreeModelBudget {
  return {
    provider,
    modelId: model,
    freeType: "recurring-monthly",
    hardStopGuaranteed: true,
  } as FreeModelBudget;
}

function exhState(): FreeAccessState {
  return {
    status: "EXHAUSTED",
    remainingFreeAllowance: 0,
    resetAt: null,
    checkedAt: new Date(NOW).toISOString(),
  };
}

const CATALOG = [entry("p-exh", "m"), entry("p-unk", "m")];

const OPTS = {
  minRemainingAllowance: 1,
  maxStateAgeMs: 60_000,
  now: () => NOW,
  resolveFreeAccessState: (provider: string, _connectionId: string) =>
    provider === "p-exh" ? exhState() : undefined,
  catalog: CATALOG,
};

const POOL: StrictZeroCostCandidate[] = [
  { provider: "p-exh", model: "m", connectionId: "c-exh" },
  { provider: "p-unk", model: "m", connectionId: "c-unk" },
];

test("an exhausted quota and a missing reading are counted apart, not merged", () => {
  const result = countStrictExclusions(POOL, OPTS);
  assert.deepEqual(result, { excluded: 2, noHardStop: 0, exhausted: 1, stateUnknown: 1 });
});

test("a missing reading is state-unknown while a fresh EXHAUSTED reading is exhausted", () => {
  assert.equal(
    classifyStrictZeroCostCandidate(POOL[0]!, CATALOG[0], OPTS.resolveFreeAccessState, OPTS)
      .outcome,
    "exhausted"
  );
  assert.equal(
    classifyStrictZeroCostCandidate(POOL[1]!, CATALOG[1], OPTS.resolveFreeAccessState, OPTS)
      .outcome,
    "state-unknown"
  );
});

test("exposing the reason changes nothing about the exclusion decision", () => {
  assert.deepEqual(filterStrictZeroCostCandidates(POOL, { ...OPTS, enabled: true }), []);
});

test("the pool-log detail surfaces the exhausted and state-unknown split", () => {
  assert.equal(
    describeStrictExclusions(countStrictExclusions(POOL, OPTS)),
    " (no-hard-stop 0, exhausted 1, state-unknown 1)"
  );
});
