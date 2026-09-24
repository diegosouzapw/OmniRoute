import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { AI_PROVIDERS, AGGREGATOR_PROVIDER_IDS } from "@/shared/constants/providers.ts";

/**
 * xKiro (xkiro.com) — OpenAI-compatible gateway. Free plan, verified 2026-09-02 on
 * xkiro.com and docs.xkiro.com: "$0 / month · Free forever · Free tokens 5M / day ·
 * No credit card"; past the daily allowance free-model requests get a 429 until the
 * reset. One bucket per account ⇒ one pool of 5M × 30 = 150M.
 */
const rows = FREE_MODEL_BUDGETS.filter((m) => m.provider === "xkiro");

test("xkiro is routable, canonical and classified as an aggregator", () => {
  assert.ok(REGISTRY.xkiro, "REGISTRY entry");
  assert.equal(REGISTRY.xkiro.format, "openai");
  assert.equal(REGISTRY.xkiro.baseUrl, "https://api.xkiro.com/v1/chat/completions");
  assert.ok(AI_PROVIDERS.xkiro, "canonical provider");
  assert.equal(AI_PROVIDERS.xkiro.hasFree, true);
  assert.ok(AGGREGATOR_PROVIDER_IDS.has("xkiro"));
});

test("xkiro free plan is one 5M/day account-wide pool = 150M/month, counted once", () => {
  assert.equal(rows.length, 39);
  for (const m of rows) {
    assert.equal(m.poolKey, "xkiro-free", m.modelId);
    assert.equal(m.monthlyTokens, 150_000_000, m.modelId);
    assert.equal(m.freeType, "recurring-daily", m.modelId);
    assert.equal(m.tos, "caution", m.modelId);
    assert.equal(m.hardStopGuaranteed, true, m.modelId);
    assert.equal((m as { eligibilityGate?: unknown }).eligibilityGate, undefined, m.modelId);
  }
  const withXkiro = computeFreeModelTotals().steadyRecurringTokens;
  const without = computeFreeModelTotals({
    entries: FREE_MODEL_BUDGETS.filter((m) => m.provider !== "xkiro"),
  }).steadyRecurringTokens;
  assert.equal(withXkiro - without, 150_000_000);
});

test("xkiro never lists the undeclared-provenance codex-spark route", () => {
  assert.ok(!rows.some((m) => /codex-spark/i.test(m.modelId)));
  assert.ok(!REGISTRY.xkiro.models.some((m) => /codex-spark/i.test(m.id)));
});

test("every xkiro catalog row is a pinned registry model", () => {
  assert.equal(REGISTRY.xkiro.models.length, rows.length);
  const pinned = new Set(REGISTRY.xkiro.models.map((m) => m.id));
  for (const r of rows) assert.ok(pinned.has(r.modelId), r.modelId);
});
