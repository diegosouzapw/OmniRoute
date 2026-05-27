import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function readSource(relativePath: string) {
  return readFileSync(new URL("../../" + relativePath, import.meta.url), "utf8");
}

test("analytics page exposes the restored analytics tab shell", () => {
  const source = readSource("src/app/(dashboard)/dashboard/analytics/page.tsx");

  assert.ok(source.includes('role="tablist"'));
  assert.ok(source.includes('aria-label="Analytics sections"'));
  for (const label of [
    "Overview",
    "Evals",
    "Search",
    "Utilization",
    "Combo Health",
    "Route Trace",
  ]) {
    assert.ok(source.includes('label: "' + label + '"'));
  }
  for (const tabId of [
    "overview",
    "evals",
    "search",
    "utilization",
    "combo-health",
    "route-trace",
  ]) {
    assert.ok(source.includes('id: "' + tabId + '"'));
  }
});

test("endpoint page keeps APIs, MCP, and A2A as in-page tabs", () => {
  const source = readSource("src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx");

  assert.ok(source.includes('type EndpointTab = "apis" | "mcp" | "a2a"'));
  for (const label of ["APIs", "MCP", "A2A"]) {
    assert.ok(source.includes('label: "' + label + '"'));
  }
  assert.ok(source.includes('useState<EndpointTab>("apis")'));
  assert.ok(source.includes('activeEndpointTab === "mcp" ? <McpDashboardPage /> : null'));
  assert.ok(source.includes('activeEndpointTab === "a2a" ? <A2ADashboardPage /> : null'));
});

test("settings root renders the General, Appearance, and Resilience tab panel", () => {
  const pageSource = readSource("src/app/(dashboard)/dashboard/settings/page.tsx");
  const clientSource = readSource("src/app/(dashboard)/dashboard/settings/SettingsPageClient.tsx");

  assert.ok(pageSource.includes("return <SettingsPageClient initialTab={normalizeTab(tab)} />"));
  assert.ok(
    clientSource.includes('export type SettingsTab = "general" | "appearance" | "resilience"')
  );
  for (const label of ["General", "Appearance", "Resilience"]) {
    assert.ok(clientSource.includes('label: "' + label + '"'));
  }
  assert.ok(clientSource.includes('role="tabpanel"'));
  assert.ok(clientSource.includes("aria-label={activeLabel}"));
});

test("provider limit status chips use English fallback labels", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/index.tsx"
  );

  assert.ok(source.includes('critical: tr("statCritical", "Critical")'));
  assert.ok(source.includes('alert: tr("statAlert", "Alert")'));
  assert.ok(source.includes('ok: tr("statHealthy", "Healthy")'));
  assert.doesNotMatch(source, /Crítico|Alerta|Saudável/);
});

test("provider limits collapsed rows show quota resets and progress bars inline", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/index.tsx"
  );

  assert.ok(source.includes("const renderInlineQuotaSummary = (quotas: any[]) =>"));
  assert.ok(source.includes("const cd = formatCountdown(q.resetAt)"));
  assert.ok(source.includes("`⏱ ${cd}`"));
  assert.ok(source.includes("h-1 w-14 rounded-sm"));
  assert.ok(source.includes("getQuotaBarWidthClass(pct)"));
  assert.ok(source.includes("getQuotaToneClasses(pct)"));
  assert.ok(source.includes("renderInlineQuotaSummary(quota.quotas)"));
});
