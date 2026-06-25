/**
 * tests/unit/observability/tenantMetrics.test.ts
 *
 * Per-tenant cost meters + quota gauges (PR-007 deliverable). Covers:
 *   - USD-canonical cost recording
 *   - EUR → USD_EQ conversion sidecar increment
 *   - Unknown-currency → "other" bucket (never silent drop)
 *   - tenantLabelAllowList cardinality cap (256 max)
 *   - setTenantQuota ratio math (used/limit) + divide-by-zero guard
 *   - recordTenantUsage / recordTenantRequest / recordTenantError counters
 *   - Lazy allow-list admission until cap is reached
 */

import test from "node:test";
import assert from "node:assert/strict";

const tenantMetrics = await import("../../../src/lib/observability/tenantMetrics.ts");
const costCalculator = await import("../../../src/lib/observability/costCalculator.ts");
const { createCounter } = await import("../../../src/lib/observability/metrics.ts");

function resetState() {
  tenantMetrics._resetTenantAllowListForTests();
  // We can't easily reset the global metrics registry mid-process; tests
  // assert increments, not absolute values.
}

test("recordTenantCost increments the counter under USD label", () => {
  resetState();
  const before = tenantMetrics.tenantCostCounter.get({
    tenant_id: "acme",
    provider: "openai",
    model: "gpt-4o",
    currency: "USD",
  });
  tenantMetrics.recordTenantCost({
    tenantId: "acme",
    provider: "openai",
    model: "gpt-4o",
    costUsd: 0.123,
    currency: "USD",
  });
  const after = tenantMetrics.tenantCostCounter.get({
    tenant_id: "acme",
    provider: "openai",
    model: "gpt-4o",
    currency: "USD",
  });
  assert.equal(after - before, 0.123);
});

test("recordTenantCost treats EUR as USD_EQ with converted amount", () => {
  resetState();
  const eurLabel = { tenant_id: "acme", provider: "openai", model: "gpt-4o", currency: "EUR" };
  const usdEqLabel = { tenant_id: "acme", provider: "openai", model: "gpt-4o", currency: "USD_EQ" };
  const beforeEur = tenantMetrics.tenantCostCounter.get(eurLabel);
  const beforeUsd = tenantMetrics.tenantCostCounter.get(usdEqLabel);
  tenantMetrics.recordTenantCost({
    tenantId: "acme",
    provider: "openai",
    model: "gpt-4o",
    costUsd: 1.0,
    currency: "EUR",
  });
  const afterEur = tenantMetrics.tenantCostCounter.get(eurLabel);
  const afterUsd = tenantMetrics.tenantCostCounter.get(usdEqLabel);
  assert.equal(afterEur - beforeEur, 1.0);
  assert.ok(afterUsd - beforeUsd > 0);
  // EUR rate in EXCHANGE_RATES is 0.92 → 1 EUR = 1/0.92 USD ≈ 1.087
  const expected = costCalculator.convertCurrency(1.0, "EUR");
  assert.equal(afterUsd - beforeUsd, expected);
});

test("recordTenantCost routes unknown currencies into currency=other (never silent drop)", () => {
  resetState();
  const otherLabel = { tenant_id: "acme", provider: "openai", model: "gpt-4o", currency: "other" };
  const before = tenantMetrics.tenantCostCounter.get(otherLabel);
  tenantMetrics.recordTenantCost({
    tenantId: "acme",
    provider: "openai",
    model: "gpt-4o",
    costUsd: 0.05,
    currency: "ZZZ",
  });
  const after = tenantMetrics.tenantCostCounter.get(otherLabel);
  assert.equal(after - before, 0.05);
});

test("tenantLabelAllowList overflow: 257th unique tenant maps to 'other'", () => {
  resetState();
  for (let i = 0; i < tenantMetrics.TENANT_LABEL_ALLOW_LIST_MAX; i++) {
    tenantMetrics.addTenantLabelAllowListEntry(`tenant-${i}`);
  }
  assert.equal(tenantMetrics.tenantLabelAllowList().length, tenantMetrics.TENANT_LABEL_ALLOW_LIST_MAX);
  assert.equal(tenantMetrics.resolveTenantLabel("tenant-overflow"), "other");
});

test("tenantLabelAllowList lazy admission under the cap", () => {
  resetState();
  // First call resolves a NEW id, lazy-admitting it under the cap.
  assert.equal(tenantMetrics.resolveTenantLabel("lazy-1"), "lazy-1");
  assert.equal(tenantMetrics.tenantLabelAllowList().includes("lazy-1"), true);
});

test("setTenantQuota sets the gauge to used/limit ratio", () => {
  resetState();
  tenantMetrics.setTenantQuota({ tenantId: "acme", resource: "requests", limit: 1000, used: 250 });
  assert.equal(
    tenantMetrics.tenantQuotaGauge.get({ tenant_id: "acme", resource: "requests" }),
    0.25
  );
});

test("setTenantQuota with limit=0 sets the gauge to 0 (no +Infinity)", () => {
  resetState();
  tenantMetrics.setTenantQuota({ tenantId: "acme", resource: "requests", limit: 0, used: 100 });
  assert.equal(
    tenantMetrics.tenantQuotaGauge.get({ tenant_id: "acme", resource: "requests" }),
    0
  );
});

test("setTenantQuota with used > limit emits a ratio > 1 (overflow signal)", () => {
  resetState();
  tenantMetrics.setTenantQuota({ tenantId: "acme", resource: "tokens", limit: 100, used: 250 });
  assert.equal(
    tenantMetrics.tenantQuotaGauge.get({ tenant_id: "acme", resource: "tokens" }),
    2.5
  );
});

test("recordTenantUsage sets the gauge per (resource, window)", () => {
  resetState();
  tenantMetrics.recordTenantUsage({ tenantId: "acme", resource: "tokens", value: 12345, window: "hour" });
  tenantMetrics.recordTenantUsage({ tenantId: "acme", resource: "tokens", value: 80000, window: "day" });
  assert.equal(
    tenantMetrics.tenantUsageGauge.get({ tenant_id: "acme", resource: "tokens", window: "hour" }),
    12345
  );
  assert.equal(
    tenantMetrics.tenantUsageGauge.get({ tenant_id: "acme", resource: "tokens", window: "day" }),
    80000
  );
});

test("recordTenantRequest increments the request counter", () => {
  resetState();
  const before = tenantMetrics.tenantRequestCounter.get({ tenant_id: "acme", route: "v1.chat", status: "200" });
  tenantMetrics.recordTenantRequest({ tenantId: "acme", route: "v1.chat", status: 200 });
  const after = tenantMetrics.tenantRequestCounter.get({ tenant_id: "acme", route: "v1.chat", status: "200" });
  assert.equal(after - before, 1);
});

test("recordTenantError increments the error counter", () => {
  resetState();
  const before = tenantMetrics.tenantErrorCounter.get({
    tenant_id: "acme",
    route: "v1.chat",
    error_code: "rate_limited",
  });
  tenantMetrics.recordTenantError({ tenantId: "acme", route: "v1.chat", errorCode: "rate_limited" });
  const after = tenantMetrics.tenantErrorCounter.get({
    tenant_id: "acme",
    route: "v1.chat",
    error_code: "rate_limited",
  });
  assert.equal(after - before, 1);
});

test("resolveTenantLabel sanitises forbidden characters", () => {
  resetState();
  // Newlines, quotes, backslashes must be replaced.
  const bad = 'evil"\n,\\tenant';
  const label = tenantMetrics.resolveTenantLabel(bad);
  assert.ok(!label.includes('"'));
  assert.ok(!label.includes("\n"));
  assert.ok(!label.includes(","));
  assert.ok(!label.includes("\\"));
});

test("resolveTenantLabel normalises empty / non-string input to 'other'", () => {
  resetState();
  assert.equal(tenantMetrics.resolveTenantLabel(""), "other");
  assert.equal(tenantMetrics.resolveTenantLabel(null), "other");
  assert.equal(tenantMetrics.resolveTenantLabel(undefined), "other");
  assert.equal(tenantMetrics.resolveTenantLabel(123), "other");
});

test("createCounter enforces a per-metric cardinality cap", () => {
  // The cap is enforced inside the metrics module that tenantMetrics builds on.
  const c = createCounter({
    name: "ephemeral_card_test",
    help: "ephemeral",
    labelNames: ["k"],
    cardinalityLimit: 3,
  });
  for (let i = 0; i < 3; i++) c.inc({ k: `v${i}` });
  c.inc({ k: "overflow-1" });
  c.inc({ k: "overflow-2" });
  assert.ok(c.droppedCount() >= 1, "droppedCount should advance when the cap is hit");
});

test("initTenantMetrics reads the env var on first call", () => {
  resetState();
  process.env.OMNIROUTE_TENANT_LABEL_ALLOW_LIST = "alpha,beta,gamma";
  tenantMetrics.initTenantMetrics();
  const list = tenantMetrics.tenantLabelAllowList();
  assert.ok(list.includes("alpha"));
  assert.ok(list.includes("beta"));
  assert.ok(list.includes("gamma"));
  delete process.env.OMNIROUTE_TENANT_LABEL_ALLOW_LIST;
});