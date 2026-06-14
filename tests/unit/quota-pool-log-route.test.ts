/**
 * tests/unit/quota-pool-log-route.test.ts
 *
 * Task 7 — source-level assertions for the usage-log endpoint + card.
 *
 * Follows the same pattern as:
 *   tests/unit/budget-route-auth.test.ts (source-scan)
 *   tests/unit/quota-account-quota-row.test.ts (source-scan)
 *
 * We use source-scan assertions (readFileSync) so the test works with
 * Node.js native test runner without a Next.js / DOM setup.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const ROUTE_PATH = join(
  ROOT,
  "src/app/api/quota/pools/[id]/log/route.ts"
);

const USAGE_LOG_CARD_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/UsageLogCard.tsx"
);

const POOL_CARD_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolCard.tsx"
);

const CONSUMPTION_DB_PATH = join(
  ROOT,
  "src/lib/db/quotaConsumption.ts"
);

const EN_PATH = join(ROOT, "src/i18n/messages/en.json");
const PT_PATH = join(ROOT, "src/i18n/messages/pt-BR.json");

// ── Load sources ─────────────────────────────────────────────────────────────

const routeSrc = readFileSync(ROUTE_PATH, "utf8");
const usageLogCardSrc = readFileSync(USAGE_LOG_CARD_PATH, "utf8");
const poolCardSrc = readFileSync(POOL_CARD_PATH, "utf8");
const consumptionDbSrc = readFileSync(CONSUMPTION_DB_PATH, "utf8");

// ── Route: auth ───────────────────────────────────────────────────────────────

test("log route: imports requireManagementAuth", () => {
  assert.ok(
    routeSrc.includes("requireManagementAuth"),
    "route must import and call requireManagementAuth"
  );
});

test("log route: calls requireManagementAuth before any data access", () => {
  // Find the GET handler body (after "export async function GET")
  const handlerIdx = routeSrc.indexOf("export async function GET");
  assert.ok(handlerIdx >= 0, "GET handler must exist");
  const handlerBody = routeSrc.slice(handlerIdx);
  // Within the handler body, auth call must come before listConsumptionForPool call
  const authIdx = handlerBody.indexOf("requireManagementAuth(request)");
  const listIdx = handlerBody.indexOf("listConsumptionForPool(");
  assert.ok(authIdx >= 0, "requireManagementAuth call must be in GET handler");
  assert.ok(listIdx >= 0, "listConsumptionForPool call must be in GET handler");
  assert.ok(
    authIdx < listIdx,
    "auth check must come before listConsumptionForPool call"
  );
});

test("log route: returns early when authError is truthy", () => {
  assert.ok(
    routeSrc.includes("if (authError) return authError"),
    "route must return authError immediately"
  );
});

// ── Route: error sanitization ─────────────────────────────────────────────────

test("log route: uses buildErrorBody from open-sse/utils/error", () => {
  assert.ok(
    routeSrc.includes("buildErrorBody"),
    "route must use buildErrorBody for error responses — Hard Rule #12"
  );
  assert.ok(
    routeSrc.includes("open-sse/utils/error") || routeSrc.includes("@omniroute/open-sse/utils/error"),
    "route must import buildErrorBody from open-sse/utils/error"
  );
});

test("log route: does NOT put raw err.stack in response (stack trace guard)", () => {
  // Ensure err.stack is never used in the response body
  assert.ok(
    !routeSrc.includes("err.stack"),
    "route must not leak err.stack in response"
  );
});

// ── Route: response shape ─────────────────────────────────────────────────────

test("log route: returns { events } shape", () => {
  assert.ok(
    routeSrc.includes("{ events }") || routeSrc.includes("{events}") || routeSrc.includes("events:"),
    "route must return { events } in the response body"
  );
});

test("log route: calls listConsumptionForPool", () => {
  assert.ok(
    routeSrc.includes("listConsumptionForPool"),
    "route must call listConsumptionForPool from quotaConsumption"
  );
});

test("log route: parses limit query param with default 50", () => {
  assert.ok(
    routeSrc.includes("50"),
    "route must use 50 as the default limit"
  );
});

test("log route: clamps limit to max 200", () => {
  assert.ok(
    routeSrc.includes("200"),
    "route must clamp limit to a maximum of 200"
  );
});

test("log route: has dynamic export (force-dynamic)", () => {
  assert.ok(
    routeSrc.includes('dynamic = "force-dynamic"') || routeSrc.includes("dynamic = 'force-dynamic'"),
    "route must export dynamic = 'force-dynamic'"
  );
});

// ── DB module: listConsumptionForPool ─────────────────────────────────────────

test("quotaConsumption: exports listConsumptionForPool", () => {
  assert.ok(
    consumptionDbSrc.includes("export function listConsumptionForPool"),
    "quotaConsumption.ts must export listConsumptionForPool"
  );
});

test("quotaConsumption: listConsumptionForPool filters by poolId prefix", () => {
  assert.ok(
    consumptionDbSrc.includes("LIKE"),
    "listConsumptionForPool must use LIKE to filter by poolId prefix in dimension_key"
  );
});

test("quotaConsumption: exports ConsumptionEvent type", () => {
  assert.ok(
    consumptionDbSrc.includes("ConsumptionEvent"),
    "quotaConsumption.ts must export the ConsumptionEvent type"
  );
});

// ── UsageLogCard structural assertions ────────────────────────────────────────

test("UsageLogCard: fetches /api/quota/pools/${poolId}/log endpoint", () => {
  assert.ok(
    usageLogCardSrc.includes("/api/quota/pools/") && usageLogCardSrc.includes("/log"),
    "UsageLogCard must fetch the /api/quota/pools/[id]/log endpoint"
  );
});

test("UsageLogCard: is collapsible (toggle state)", () => {
  assert.ok(
    usageLogCardSrc.includes("useState") &&
      (usageLogCardSrc.includes("open") || usageLogCardSrc.includes("expanded") || usageLogCardSrc.includes("collapsed")),
    "UsageLogCard must be collapsible with a toggle state"
  );
});

test("UsageLogCard: renders logTitle i18n key", () => {
  assert.ok(
    usageLogCardSrc.includes("logTitle"),
    "UsageLogCard must render the t('logTitle') key"
  );
});

test("UsageLogCard: renders logEmpty i18n key for empty state", () => {
  assert.ok(
    usageLogCardSrc.includes("logEmpty"),
    "UsageLogCard must render the t('logEmpty') key"
  );
});

test("UsageLogCard: fail-soft — guards events with ?? []", () => {
  assert.ok(
    usageLogCardSrc.includes("?? []"),
    "UsageLogCard must guard events with ?? [] for fail-soft behavior"
  );
});

test("UsageLogCard: uses useTranslations for i18n", () => {
  assert.ok(
    usageLogCardSrc.includes("useTranslations"),
    "UsageLogCard must use useTranslations from next-intl"
  );
});

test("UsageLogCard: cleans up fetch with alive flag", () => {
  assert.ok(
    usageLogCardSrc.includes("alive = false"),
    "UsageLogCard must set alive = false in useEffect cleanup to prevent state-after-unmount"
  );
});

// ── PoolCard mounts UsageLogCard ──────────────────────────────────────────────

test("PoolCard: imports UsageLogCard", () => {
  assert.ok(
    poolCardSrc.includes("UsageLogCard"),
    "PoolCard.tsx must import and render UsageLogCard"
  );
});

test("PoolCard: mounts <UsageLogCard in JSX", () => {
  assert.ok(
    poolCardSrc.includes("<UsageLogCard"),
    "PoolCard.tsx must render <UsageLogCard .../>"
  );
});

test("PoolCard: passes poolId prop to UsageLogCard", () => {
  assert.ok(
    poolCardSrc.includes("poolId="),
    "PoolCard.tsx must pass poolId prop to UsageLogCard"
  );
});

// ── i18n parity ───────────────────────────────────────────────────────────────

const LOG_KEYS = ["logTitle", "logEmpty"] as const;

test("i18n: logTitle and logEmpty present in en.json", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of LOG_KEYS) {
    assert.equal(
      typeof en["quotaShare"]?.[k],
      "string",
      `en.json missing quotaShare.${k}`
    );
  }
});

test("i18n: logTitle and logEmpty present in pt-BR.json", () => {
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of LOG_KEYS) {
    assert.equal(
      typeof pt["quotaShare"]?.[k],
      "string",
      `pt-BR.json missing quotaShare.${k}`
    );
  }
});

test("i18n: parity between en and pt-BR for log keys", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of LOG_KEYS) {
    assert.ok(k in (en["quotaShare"] ?? {}), `en.json missing quotaShare.${k}`);
    assert.ok(k in (pt["quotaShare"] ?? {}), `pt-BR.json missing quotaShare.${k}`);
  }
});
