/**
 * tests/unit/free-tier-summary-radar-overlay.test.ts
 *
 * GET /api/free-tier/summary used to answer from the release-frozen baseline
 * only, while the Radar overlay (flag RADAR_ENABLED) refreshed the very same
 * catalog for the dashboard screens — two doors, two answers to one question,
 * and the door that advertised a date was the stale one.
 *
 * The route now resolves its catalog through getRadarCatalog() like the
 * screens do, reports which source answered (`catalogSource`), and states the
 * date of what it ACTUALLY served: the feed's own build date when the overlay
 * answers (null when a pre-migration cache row carries none — never the
 * download time standing in for it), the curation date when the baseline does.
 *
 * Entitlement: the feed server decides community vs live at DOWNLOAD time
 * (supporter key). The local instance may re-serve what it legitimately holds,
 * but must not become a free relay of premium content when it is exposed to a
 * network:
 *   - community tier  => served to every caller (it is the free public feed);
 *   - live tier       => served to authenticated callers only; anonymous
 *                        callers keep the release-frozen baseline;
 *   - flag off / no cache / corrupt cache => exactly today's behaviour
 *     (the mirror of radar-inertia.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-tier-summary-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-free-tier-summary-tests-32b";
process.env.JWT_SECRET = "test-jwt-secret-for-free-tier-summary-tests";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-free-tier-summary-tests";
delete process.env.RADAR_ENABLED;

const core = await import("../../../src/lib/db/core.ts");
const { clearAllFeatureFlagOverrides, setFeatureFlagOverride } =
  await import("../../../src/lib/db/featureFlags.ts");
const radarDb = await import("../../../src/lib/db/radar.ts");
const { GET } = await import("../../../src/app/api/free-tier/summary/route.ts");
const { computeFreeModelTotals } = await import("../../../open-sse/config/freeModelCatalog.ts");
const { FREE_CATALOG_CURATED_AT } = await import("../../../open-sse/config/freeModelCatalog.data.ts");
const { FREE_MODEL_BUDGETS } = await import("../../../open-sse/config/freeModelCatalog.data.ts");

// Anchored on the shipped catalog's curation date so the suite cannot rot the
// next time the catalog is curated: a fixed literal would silently become older
// than the baseline and change what the route is expected to serve.
const GEN_AT = `${FREE_CATALOG_CURATED_AT}T12:00:00.000Z`;
const STALE_GEN_AT = "2026-01-02T12:00:00.000Z";
const FETCHED_AT = `${FREE_CATALOG_CURATED_AT}T18:00:00.000Z`;
const OVERLAY_TOKENS = 1_234_567;
const DISABLED_TOKENS = 9_999_999;
const GATED_TOKENS = 4_242_000;

async function authCookieHeader(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

function feedPayload(tier: "community" | "live") {
  return {
    feed: "omniroute-radar",
    schemaVersion: 1,
    version: "2026.08.25.1",
    generatedAt: GEN_AT,
    tier,
    counts: { providers: 1, models: 2 },
    providers: [{ id: "test-radar", name: "Test Radar" }],
    models: [
      {
        provider: "test-radar",
        modelId: "overlay-model",
        displayName: "Overlay Model",
        familyId: null,
        freeType: "recurring-monthly",
        budget: { kind: "per_model", tokensPerMonth: OVERLAY_TOKENS },
        limits: { rpm: null, rpd: null, tpm: null, tpd: null },
        contextWindow: null,
        capabilities: { tools: false, vision: false, thinking: false },
        trainsOnPrompts: null,
        tosRisk: "ok",
        setup: null,
        enabled: true,
      },
      {
        provider: "test-radar",
        modelId: "retired-model",
        displayName: "Retired Model",
        familyId: null,
        freeType: "recurring-monthly",
        budget: { kind: "per_model", tokensPerMonth: DISABLED_TOKENS },
        limits: { rpm: null, rpd: null, tpm: null, tpd: null },
        contextWindow: null,
        capabilities: { tools: false, vision: false, thinking: false },
        trainsOnPrompts: null,
        tosRisk: "ok",
        setup: null,
        enabled: false,
      },
    ],
    quirks: [],
    totals: {
      dedupedTokensPerMonth: OVERLAY_TOKENS + DISABLED_TOKENS,
      modelCount: 2,
      poolCount: 0,
    },
  };
}

function seedGatedCache() {
  const payload = feedPayload("community");
  payload.models.push({
    provider: "test-radar",
    modelId: "overlay-gated-model",
    displayName: "Overlay Gated Model",
    familyId: null,
    freeType: "recurring-daily",
    budget: { kind: "shared_pool", poolId: "overlay-gated", tokensPerMonth: GATED_TOKENS },
    limits: { rpm: null, rpd: null, tpm: null, tpd: null },
    contextWindow: null,
    capabilities: { tools: false, vision: false, thinking: false },
    trainsOnPrompts: null,
    tosRisk: "ok",
    setup: null,
    enabled: true,
    eligibilityGate: "regional-identity",
  } as (typeof payload.models)[number]);
  radarDb.setRadarCache({
    version: "2026.08.25.1",
    generatedAt: GEN_AT,
    tier: "community",
    payload: JSON.stringify(payload),
    signature: "test-signature-not-verified-on-read",
    fetchedAt: FETCHED_AT,
  });
}

function resetState() {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR))
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.RADAR_ENABLED;
  clearAllFeatureFlagOverrides();
}

function seedCache(tier: "community" | "live", opts: { generatedAt?: string | null } = {}) {
  radarDb.setRadarCache({
    version: "2026.08.25.1",
    generatedAt: "generatedAt" in opts ? (opts.generatedAt ?? undefined) : GEN_AT,
    tier,
    payload: JSON.stringify(feedPayload(tier)),
    signature: "test-signature-not-verified-on-read",
    fetchedAt: FETCHED_AT,
  });
}

async function getBody(authenticated = false): Promise<Record<string, unknown>> {
  const res = await GET(
    new Request("https://omni.test/api/free-tier/summary", {
      headers: authenticated ? { Cookie: await authCookieHeader() } : {},
    })
  );
  assert.equal(res.status, 200);
  return (await res.json()) as Record<string, unknown>;
}

// --- zero-delta default ------------------------------------------------------

test("flag off => the baseline answers, unchanged contract, honest source tag", async () => {
  resetState();
  const body = await getBody();

  const expected = computeFreeModelTotals();
  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
  assert.equal(body.steadyRecurringTokens, expected.steadyRecurringTokens);
  assert.equal(body.modelCount, expected.modelCount);
});

test("excludeTosAvoid still filters on the baseline path", async () => {
  resetState();
  const res = await GET(new Request("https://omni.test/api/free-tier/summary?excludeTosAvoid=1"));
  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;

  const expected = computeFreeModelTotals({ excludeTosAvoid: true });
  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.steadyRecurringTokens, expected.steadyRecurringTokens);
});

// --- community tier: the free public feed serves everyone --------------------

test("community tier, anonymous caller => the overlay answers, honestly dated", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community");

  const body = await getBody(false);

  assert.equal(body.catalogSource, "radar-overlay");
  // The honest date is the feed's BUILD date, not this install's download time.
  assert.equal(body.catalogUpdatedAt, GEN_AT);
  assert.notEqual(body.catalogUpdatedAt, FETCHED_AT);

  const baselineSteady = computeFreeModelTotals().steadyRecurringTokens;
  assert.equal(
    body.steadyRecurringTokens,
    (baselineSteady as number) + OVERLAY_TOKENS,
    "the feed-only enabled model joins the steady headline"
  );
});

test("community tier, authenticated caller => same overlay", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community");

  const body = await getBody(true);

  assert.equal(body.catalogSource, "radar-overlay");
  assert.equal(body.catalogUpdatedAt, GEN_AT);
});

test("an entry the feed disables is excluded from the served totals", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community");

  const body = await getBody(false);

  const perModel = body.perModel as Array<{ modelId: string }>;
  assert.ok(!perModel.some((m) => m.modelId === "retired-model"));
  assert.equal(
    body.steadyRecurringTokens,
    (computeFreeModelTotals().steadyRecurringTokens as number) + OVERLAY_TOKENS
  );
});

test("a pre-migration cache row serves the overlay with an UNKNOWN date, not the fetch time", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: undefined });

  const body = await getBody(false);

  // Freshness guard: unknown build date is stale, so the baseline answers.
  // Unknown must still not be papered over by fetchedAt.
  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
});

// --- live tier: paid content stays behind this instance's sessions ----------

test("live tier, ANONYMOUS caller => the baseline answers, never the premium feed", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("live");

  const body = await getBody(false);

  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
  assert.equal(body.steadyRecurringTokens, computeFreeModelTotals().steadyRecurringTokens);
});

test("live tier, authenticated caller => this install's earned overlay", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("live");

  const body = await getBody(true);

  assert.equal(body.catalogSource, "radar-overlay");
  assert.equal(body.catalogUpdatedAt, GEN_AT);
  assert.equal(
    body.steadyRecurringTokens,
    (computeFreeModelTotals().steadyRecurringTokens as number) + OVERLAY_TOKENS
  );
});

// --- resilience --------------------------------------------------------------

test("corrupt cache => baseline fallback with the baseline contract", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  radarDb.setRadarCache({
    version: "broken",
    generatedAt: GEN_AT,
    tier: "community",
    payload: "{definitely not json",
    signature: "test-signature-not-verified-on-read",
    fetchedAt: FETCHED_AT,
  });

  const body = await getBody(false);

  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
  assert.equal(body.steadyRecurringTokens, computeFreeModelTotals().steadyRecurringTokens);
});

// --- freshness guard: never answer from a feed built before the shipped catalog ---

test("overlay older than the shipped catalog => the baseline answers", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: STALE_GEN_AT });

  const body = await getBody();

  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
});

test("overlay with an unknown build date => the baseline answers", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: null });

  const body = await getBody();

  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
});

test("overlay built on the curation day itself => the overlay answers", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: `${FREE_CATALOG_CURATED_AT}T00:30:00.000Z` });

  const body = await getBody();

  assert.equal(body.catalogSource, "radar-overlay");
});

test("overlay newer than the shipped catalog still answers", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community");

  const body = await getBody();

  assert.equal(body.catalogSource, "radar-overlay");
  assert.equal(body.catalogUpdatedAt, GEN_AT);
});

// --- the stale fallback keeps the operator's own decisions ---

test("stale overlay => a tombstoned model stays out of the totals", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: STALE_GEN_AT });

  const target = FREE_MODEL_BUDGETS[0];
  const withoutTombstone = await getBody();
  radarDb.setRadarModelTombstone(target.provider, target.modelId, true);
  const withTombstone = await getBody();

  assert.equal(withTombstone.catalogSource, "baseline");
  assert.ok(
    (withTombstone.modelCount as number) < (withoutTombstone.modelCount as number),
    "a tombstoned model must never come back into the totals when the feed is withheld"
  );
});

test("stale overlay => a locally disabled model stays out of the totals", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedCache("community", { generatedAt: STALE_GEN_AT });

  const baselineBody = await getBody();
  const target = FREE_MODEL_BUDGETS[0];
  radarDb.setRadarLocalModelOverride(target.provider, target.modelId, { enabled: false });
  const disabledBody = await getBody();

  assert.equal(disabledBody.catalogSource, "baseline");
  assert.ok(
    (disabledBody.modelCount as number) < (baselineBody.modelCount as number),
    "a locally disabled model must not be counted when the feed is withheld"
  );
});

// --- eligibility-gated entries from the feed stay out of the headline --------

test("a gated overlay entry lands in gatedRecurringTokens, never in the steady headline", async () => {
  resetState();
  setFeatureFlagOverride("RADAR_ENABLED", "true");
  seedGatedCache();

  const body = await getBody(false);

  assert.equal(body.catalogSource, "radar-overlay");
  assert.equal(
    body.gatedRecurringTokens,
    (computeFreeModelTotals().gatedRecurringTokens as number) + GATED_TOKENS,
    "the feed-only gated pool joins the gated bucket on top of the baseline's own"
  );
  assert.equal(
    body.steadyRecurringTokens,
    (computeFreeModelTotals().steadyRecurringTokens as number) + OVERLAY_TOKENS,
    "the gated pool must not move the steady headline"
  );
});
