/**
 * STRICT_ZERO_COST — autodiscovery contract (Fase 5-8 of the design audit):
 * the filter must never hardcode a provider/model allowlist. It reads
 * whatever `catalog` (FREE_MODEL_BUDGETS-shaped) it's given, so a new SAFE
 * entry becomes usable the moment it appears, and a removed one disappears
 * the moment it's gone — no code change, no KITT change.
 *
 * Uses `evaluateCandidateConnections`'s injectable `catalog` argument (added
 * for exactly this test) with synthetic fixtures instead of mutating the
 * real, shared `FREE_MODEL_BUDGETS` — that constant is imported by
 * production code and other test files; mutating it at runtime would be a
 * global side effect this file has no business causing.
 */
import { test } from "vitest";
import assert from "node:assert/strict";

import {
  evaluateCandidateConnections,
  findBudgetEntry,
  type FreeAccessState,
  type StrictZeroCostCandidate,
} from "../../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import type { FreeModelBudget } from "../../../open-sse/config/freeModelCatalog.ts";

const NOW = "2026-08-20T00:00:00.000Z";
const OPTIONS = { minRemainingAllowance: 1, maxStateAgeMs: 180_000, now: () => Date.parse(NOW) };

function safeState(): FreeAccessState {
  return { status: "SAFE", remainingFreeAllowance: 40, resetAt: null, checkedAt: NOW };
}

// `evaluateCandidateConnections` has exactly one source of truth for "is this
// candidate documented as free": the `budgetEntry` its caller looked up via
// `findBudgetEntry(candidate, catalog)`. These provider ids are otherwise
// arbitrary — the fixtures below prove the behavior is driven entirely by
// catalog membership, not by any hardcoded provider/model name.
const KEYLESS_PROVIDER = "synthetic-keyless-provider";
const QUOTA_PROVIDER = "groq";
const REAL_CONN = "conn-1";

function keylessEntry(modelId: string): FreeModelBudget {
  return {
    provider: KEYLESS_PROVIDER,
    modelId,
    displayName: modelId,
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "keyless",
    poolKey: null,
    tos: "ok",
  };
}

function quotaEntry(modelId: string, hardStopGuaranteed = true): FreeModelBudget {
  return {
    provider: QUOTA_PROVIDER,
    modelId,
    displayName: modelId,
    monthlyTokens: 1_000_000,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "ok",
    hardStopGuaranteed,
  };
}

// 14/18. New provider/model appears in the catalog → automatically a candidate.
test("a brand-new keyless model appearing in the catalog is usable the instant it appears", () => {
  const modelId = "synthetic-new-model-14";
  const candidate: StrictZeroCostCandidate = {
    provider: KEYLESS_PROVIDER,
    model: modelId,
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
  };
  const catalogBefore: FreeModelBudget[] = []; // model does not exist yet
  const catalogAfter: FreeModelBudget[] = [keylessEntry(modelId)]; // "OmniRoute" just added it

  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalogBefore),
      () => undefined,
      OPTIONS
    ),
    [],
    "must be excluded before the catalog knows about it"
  );
  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalogAfter),
      () => undefined,
      OPTIONS
    ),
    [SYNTHETIC_NOAUTH_CONNECTION_ID],
    "must pass automatically the moment the SAME code sees it in the catalog — no code change made between these two calls"
  );
});

// 15/19. Provider/model removed from the catalog → automatically disappears.
test("a model removed from the catalog stops being usable, with no code change", () => {
  const modelId = "synthetic-removed-model-15";
  const candidate: StrictZeroCostCandidate = {
    provider: KEYLESS_PROVIDER,
    model: modelId,
    connectionId: SYNTHETIC_NOAUTH_CONNECTION_ID,
  };
  const catalogBefore: FreeModelBudget[] = [keylessEntry(modelId)];
  const catalogAfter: FreeModelBudget[] = []; // "OmniRoute" dropped the promo

  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalogBefore),
      () => undefined,
      OPTIONS
    ),
    [SYNTHETIC_NOAUTH_CONNECTION_ID]
  );
  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalogAfter),
      () => undefined,
      OPTIONS
    ),
    [],
    "must be excluded automatically once gone — no whitelist entry to delete anywhere"
  );
});

// Case 2 of Fase 8: a quota-based model ships WITH a usage adapter and
// hardStopGuaranteed=true and a SAFE live state — passes automatically.
test("a new quota-based model with hardStopGuaranteed + SAFE state is usable automatically", () => {
  const modelId = "synthetic-quota-model-safe";
  const candidate: StrictZeroCostCandidate = {
    provider: QUOTA_PROVIDER,
    model: modelId,
    connectionId: REAL_CONN,
  };
  const catalog: FreeModelBudget[] = [quotaEntry(modelId, true)];
  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalog),
      () => safeState(),
      OPTIONS
    ),
    [REAL_CONN]
  );
});

// Case 3 of Fase 8: metadata incomplete (no hardStopGuaranteed) → UNKNOWN → excluded automatically.
test("a new quota-based model WITHOUT hardStopGuaranteed is excluded automatically, even with a SAFE state", () => {
  const modelId = "synthetic-quota-model-unguaranteed";
  const candidate: StrictZeroCostCandidate = {
    provider: QUOTA_PROVIDER,
    model: modelId,
    connectionId: REAL_CONN,
  };
  const entry = quotaEntry(modelId);
  delete entry.hardStopGuaranteed; // simulate metadata that was never set, not defaulted to true
  const catalog: FreeModelBudget[] = [entry];
  assert.deepEqual(
    evaluateCandidateConnections(
      candidate,
      findBudgetEntry(candidate, catalog),
      () => safeState(),
      OPTIONS
    ),
    []
  );
});

// Production never overrides `catalog` — `findBudgetEntry(candidate)` with no
// second argument must read the real, live FREE_MODEL_BUDGETS, so an entirely
// invented provider id (one no real OmniRoute release has ever catalogued) is
// excluded automatically, with zero whitelist to edit, when the default is used.
test("an entirely unknown provider id is excluded automatically when the default (real) catalog is used", () => {
  const candidate: StrictZeroCostCandidate = {
    provider: "totally-unheard-of-provider-xyz",
    model: "whatever",
    connectionId: REAL_CONN,
  };
  assert.deepEqual(
    evaluateCandidateConnections(candidate, findBudgetEntry(candidate), () => undefined, OPTIONS),
    [],
    "findBudgetEntry() with no catalog override reads the real FREE_MODEL_BUDGETS — nothing to add or remove for this provider to stay excluded"
  );
});
