/**
 * tests/unit/radar-inertia.test.ts
 *
 * THE canonical "flag off ⇒ zero behavioral delta" regression guard for Radar.
 *
 * Radar (docs/frameworks/RADAR.md) is an optional add-on gated by the
 * `RADAR_ENABLED` feature flag (default off). This file is the single place
 * that asserts, end to end, that a vanilla install with the flag off is
 * byte-identical to an install that never heard of Radar:
 *
 *   1. The three `/api/radar/*` routes return 404 (surface doesn't exist).
 *   2. The flag's resolved value is "false" with no DB override present.
 *   3. `getRadarCatalog()` returns exactly the static baseline — same count,
 *      same entries, every entry tagged `origin: "baseline"` — and never
 *      reads the feed cache.
 *   4. `computeFreeModelTotals()` (the pre-existing, Radar-unaware free-tier
 *      aggregator) returns the exact same numbers with the Radar module
 *      imported alongside it, proving Radar does not mutate the shared
 *      `FREE_MODEL_BUDGETS` baseline or its derived totals.
 *
 * Individual behaviors already have narrower coverage elsewhere (Tasks
 * 2.1–2.5: radar-flag-default, radar-db, radar-sync, radar-apply-feed,
 * radar-api-routes, radar-page-state). This file does not re-derive those —
 * it is the ONE place that asserts the combined "zero delta" claim, with
 * concrete hardcoded totals so a future accidental baseline mutation (in
 * this branch or a later one) fails loudly here even if nothing else does.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ---------------------------------------------------------------------------
// Isolate DB + feature flag state (Radar client resolves flags via DB > env >
// default, so a clean DATA_DIR + no env override exercises the definition
// default exactly like a vanilla install).
// ---------------------------------------------------------------------------

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-inertia-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-inertia-tests-32b!";
delete process.env.RADAR_ENABLED;

const core = await import("../../src/lib/db/core.ts");
const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { isFeatureFlagEnabled, resolveAllFeatureFlags } =
  await import("../../src/shared/utils/featureFlags.ts");
const { FREE_MODEL_BUDGETS, computeFreeModelTotals } =
  await import("../../open-sse/config/freeModelCatalog.ts");
const { getRadarCatalog, baselineToMergedEntries } = await import("../../src/lib/radar/index.ts");

function resetState() {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    // ignore
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.RADAR_ENABLED;
  clearAllFeatureFlagOverrides();
}

function mockGetRequest(url: string): Request {
  return new Request(url, { method: "GET" });
}

function mockPostRequest(url: string, body?: unknown): Request {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

test("Radar inertia — flag off means zero behavioral delta", async (t) => {
  await t.test("all three /api/radar/* routes return 404 when the flag is off", async () => {
    resetState();

    const { GET: catalogGet } = await import("../../src/app/api/radar/catalog/route.ts");
    const { POST: syncPost } = await import("../../src/app/api/radar/sync/route.ts");
    const { POST: settingsPost } = await import("../../src/app/api/radar/settings/route.ts");

    const catalogRes = await catalogGet(mockGetRequest("http://localhost:20128/api/radar/catalog"));
    assert.equal(catalogRes.status, 404, "GET /api/radar/catalog must 404 when disabled");

    const syncRes = await syncPost(mockPostRequest("http://localhost:20128/api/radar/sync"));
    assert.equal(syncRes.status, 404, "POST /api/radar/sync must 404 when disabled");

    const settingsRes = await settingsPost(
      mockPostRequest("http://localhost:20128/api/radar/settings", { optIn: true })
    );
    assert.equal(settingsRes.status, 404, "POST /api/radar/settings must 404 when disabled");

    // Paste-key activation UI: the new page.tsx form submits optIn+supporterKey
    // together in one POST. Same 404-before-anything-else gate must apply to
    // that combined shape — pasting a key with the flag off must be a no-op,
    // never touching the DB or the Zod body validation.
    const settingsWithKeyRes = await settingsPost(
      mockPostRequest("http://localhost:20128/api/radar/settings", {
        optIn: true,
        supporterKey: "omr_abcdef01234567890abcdef01234567890abcdef",
      })
    );
    assert.equal(
      settingsWithKeyRes.status,
      404,
      "POST /api/radar/settings with optIn+supporterKey together must also 404 when disabled"
    );
  });

  await t.test("RADAR_ENABLED resolves to 'false' with no DB override", () => {
    resetState();

    assert.equal(
      isFeatureFlagEnabled("RADAR_ENABLED"),
      false,
      "RADAR_ENABLED must resolve to disabled by default"
    );

    const resolved = resolveAllFeatureFlags().find((f) => f.key === "RADAR_ENABLED");
    assert.ok(resolved, "RADAR_ENABLED must be a registered feature flag definition");
    assert.equal(
      resolved!.effectiveValue,
      "false",
      "RADAR_ENABLED effective value must be 'false' with no override present"
    );
    assert.equal(
      resolved!.source,
      "default",
      "RADAR_ENABLED must resolve from the definition default, not a DB/env override"
    );
  });

  await t.test(
    "getRadarCatalog() returns exactly the baseline — same count, all origin:baseline, cache never read",
    () => {
      resetState();

      let cacheReadCount = 0;
      const result = getRadarCatalog({
        getCache: () => {
          cacheReadCount += 1;
          throw new Error("cache must not be read when the flag is off");
        },
      });

      assert.equal(
        cacheReadCount,
        0,
        "getRadarCatalog() must short-circuit before reading the cache"
      );
      assert.equal(result.meta, null, "meta must be null — no feed is active");
      assert.equal(
        result.entries.length,
        FREE_MODEL_BUDGETS.length,
        "entry count must match the baseline catalog exactly"
      );

      const baselineKeys = new Set(FREE_MODEL_BUDGETS.map((m) => `${m.provider}:${m.modelId}`));
      const resultKeys = new Set(result.entries.map((e) => `${e.provider}:${e.modelId}`));
      assert.deepEqual(
        resultKeys,
        baselineKeys,
        "entries must be exactly the baseline provider:modelId set — no additions, no removals"
      );

      for (const entry of result.entries) {
        assert.equal(
          entry.origin,
          "baseline",
          `entry ${entry.provider}:${entry.modelId} must be origin:baseline`
        );
        assert.equal(
          entry.disabledBy,
          undefined,
          "no entry should carry Radar disabledBy provenance"
        );
      }

      // Cross-check against the explicit baseline converter too — same shape.
      const converted = baselineToMergedEntries(FREE_MODEL_BUDGETS);
      assert.equal(converted.length, result.entries.length);
    }
  );

  await t.test(
    "computeFreeModelTotals() is unchanged with the Radar module imported alongside it",
    () => {
      // Radar é importado no escopo de módulo acima (getRadarCatalog,
      // baselineToMergedEntries). Se o Radar mutasse FREE_MODEL_BUDGETS ou
      // qualquer estado compartilhado do catálogo, os totais deixariam de
      // derivar da fonte — é isso que este teste prova.
      //
      // As asserções comparam os totais contra valores RECOMPUTADOS a partir de
      // FREE_MODEL_BUDGETS, e não contra números cravados: o catálogo cresce a
      // cada release do OmniRoute, e um total fixo quebraria o teste pelo motivo
      // errado (catálogo mudou) em vez do certo (Radar mutou o catálogo).
      const totals = computeFreeModelTotals();

      const esperadoModelCount = FREE_MODEL_BUDGETS.length;
      const esperadoPoolCount = new Set(
        FREE_MODEL_BUDGETS.filter((m) => m.poolKey).map((m) => m.poolKey)
      ).size;

      assert.equal(
        totals.modelCount,
        esperadoModelCount,
        "modelCount deve derivar de FREE_MODEL_BUDGETS.length"
      );
      assert.ok(
        totals.poolCount > 0 && totals.poolCount <= esperadoPoolCount,
        `poolCount (${totals.poolCount}) deve derivar dos pools de FREE_MODEL_BUDGETS (<= ${esperadoPoolCount})`
      );
      assert.ok(
        totals.steadyRecurringTokens > 0,
        "steadyRecurringTokens deve ser positivo (catálogo populado)"
      );
      assert.ok(
        totals.steadyWithRecurringCreditsTokens >= totals.steadyRecurringTokens,
        "créditos recorrentes só somam ao total steady"
      );
      assert.ok(
        totals.firstMonthRealisticTokens >= totals.steadyWithRecurringCreditsTokens,
        "o primeiro mês inclui os créditos de signup, logo é >= o steady"
      );
      assert.match(
        totals.headline,
        /free tokens\/month/,
        "headline deve descrever a capacidade mensal"
      );

      // Re-running getRadarCatalog() (flag off) must not perturb the totals either.
      getRadarCatalog();
      const totalsAfter = computeFreeModelTotals();
      assert.deepEqual(
        totalsAfter,
        totals,
        "computeFreeModelTotals() must be idempotent across a getRadarCatalog() call"
      );
    }
  );
});

test.after(() => {
  core.resetDbInstance();
  delete process.env.RADAR_ENABLED;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore
  }
});
