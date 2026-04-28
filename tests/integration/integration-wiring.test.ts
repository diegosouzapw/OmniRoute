/**
 * Integration Wiring Verification Tests
 *
 * Validates that backend modules are correctly wired into the current
 * OmniRoute architecture (TypeScript + App Router route.ts files).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

function readProjectFile(relPath: string) {
  const full = join(ROOT, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function assertFileExists(relPath: string) {
  const full = join(ROOT, relPath);
  assert.ok(existsSync(full), `${relPath} should exist`);
  return full;
}

function assertRouteMethods(relPath: string, methods: string[]) {
  const src = readProjectFile(relPath);
  assert.ok(src, `${relPath} should exist`);
  for (const method of methods) {
    assert.match(src, new RegExp(`export\\s+async\\s+function\\s+${method}\\s*\\(`));
  }
}

function listProjectFiles(relPath: string): string[] {
  const full = join(ROOT, relPath);
  if (!existsSync(full)) return [];

  return readdirSync(full, { withFileTypes: true }).flatMap((entry) => {
    const childRelPath = `${relPath}/${entry.name}`;
    if (entry.isDirectory()) return listProjectFiles(childRelPath);
    return childRelPath;
  });
}

// ─── Pipeline Wiring ─────────────────────────────────

describe("Pipeline Wiring — server-init.ts", () => {
  const src = readProjectFile("src/server-init.ts");

  it("should initialize compliance audit log", () => {
    assert.ok(src, "src/server-init.ts should exist");
    assert.match(src, /initAuditLog/);
  });

  it("should cleanup expired logs", () => {
    assert.match(src, /cleanupExpiredLogs/);
  });

  it("should enforce secrets before startup", () => {
    assert.match(src, /enforceSecrets/);
  });

  it("should enforce web runtime env before startup", () => {
    assert.match(src, /enforceWebRuntimeEnv/);
  });

  it("should log server.start audit event", () => {
    assert.match(src, /server\.start/);
  });

  it("should use the structured startup logger instead of direct console calls", () => {
    assert.match(src, /createLogger\("server-init"\)/);
    assert.doesNotMatch(src, /console\.(log|warn|error|info|debug)\(/);
  });
});

describe("Pipeline Wiring — instrumentation-node.ts", () => {
  const src = readProjectFile("src/instrumentation-node.ts");

  it("should seed default model aliases during startup restore", () => {
    assert.ok(src, "src/instrumentation-node.ts should exist");
    assert.match(src, /seedDefaultModelAliases/);
  });
});

describe("Pipeline Wiring — sse chat handler", () => {
  const src = readProjectFile("src/sse/handlers/chat.ts");
  const coreSrc = readProjectFile("open-sse/handlers/chatCore.ts");

  it("should import and use guardrail pre-call validation", () => {
    assert.ok(src, "src/sse/handlers/chat.ts should exist");
    assert.match(src, /guardrailRegistry/);
    assert.match(src, /runPreCallHooks/);
  });

  it("should import circuit breaker integration", () => {
    assert.match(src, /getCircuitBreaker|CircuitBreakerOpenError/);
  });

  it("should use credential preflight instead of global model quarantine gates", () => {
    assert.match(src, /getProviderCredentialsWithQuotaPreflight/);
  });

  it("should import request telemetry integration", () => {
    assert.match(src, /RequestTelemetry|recordTelemetry/);
  });

  it("should import request id generation", () => {
    assert.match(src, /generateRequestId/);
  });

  it("should keep cost tracking integration in the chat pipeline", () => {
    assert.ok(coreSrc, "open-sse/handlers/chatCore.ts should exist");
    assert.match(coreSrc, /calculateCost/);
    assert.match(coreSrc, /recordCost/);
  });

  it("should not track backup artifacts in the active src/sse shim", () => {
    const trackedArtifactNames = listProjectFiles("src/sse").filter((file) =>
      /\.(orig|bak|backup)$/i.test(file)
    );

    assert.deepEqual(trackedArtifactNames, []);
  });
});

describe("Pipeline Wiring — middleware proxy", () => {
  const proxySrc = readProjectFile("src/proxy.ts");
  const pipelineSrc = readProjectFile("src/server/authz/pipeline.ts");

  it("should exist and delegate to authz pipeline", () => {
    assert.ok(proxySrc, "src/proxy.ts should exist");
    assert.match(proxySrc, /runAuthzPipeline/);
  });

  it("should generate request id for tracing in the authz pipeline", () => {
    assert.ok(pipelineSrc, "src/server/authz/pipeline.ts should exist");
    assert.match(pipelineSrc, /generateRequestId|X-Request-Id/);
  });

  it("should enforce body size guard in the authz pipeline", () => {
    assert.match(pipelineSrc, /checkBodySize|getBodySizeLimit|bodySize/i);
  });

  it("should resolve JWT secret in the authz pipeline", () => {
    assert.match(pipelineSrc, /getJwtSecret|jwtSecret|JWT_SECRET/i);
  });
});

// ─── API Routes ──────────────────────────────────────

describe("API Routes — existence check", () => {
  const routes = [
    "src/app/api/cache/stats/route.ts",
    "src/app/api/telemetry/summary/route.ts",
    "src/app/api/usage/budget/route.ts",
    "src/app/api/usage/quota/route.ts",
    "src/app/api/fallback/chains/route.ts",
    "src/app/api/compliance/audit-log/route.ts",
    "src/app/api/evals/route.ts",
    "src/app/api/evals/[suiteId]/route.ts",
    "src/app/api/policies/route.ts",
  ];

  for (const route of routes) {
    it(`route file should exist: ${route}`, () => {
      assertFileExists(route);
    });
  }
});

describe("API Routes — export HTTP methods", () => {
  it("/api/cache/stats should export GET and DELETE", () => {
    assertRouteMethods("src/app/api/cache/stats/route.ts", ["GET", "DELETE"]);
  });

  it("/api/telemetry/summary should export GET", () => {
    assertRouteMethods("src/app/api/telemetry/summary/route.ts", ["GET"]);
  });

  it("/api/usage/budget should export GET and POST", () => {
    assertRouteMethods("src/app/api/usage/budget/route.ts", ["GET", "POST"]);
  });

  it("/api/usage/quota should export GET", () => {
    assertRouteMethods("src/app/api/usage/quota/route.ts", ["GET"]);
  });

  it("/api/fallback/chains should export GET, POST, DELETE", () => {
    assertRouteMethods("src/app/api/fallback/chains/route.ts", ["GET", "POST", "DELETE"]);
  });

  it("/api/compliance/audit-log should export GET", () => {
    assertRouteMethods("src/app/api/compliance/audit-log/route.ts", ["GET"]);
  });

  it("/api/evals should export GET and POST", () => {
    assertRouteMethods("src/app/api/evals/route.ts", ["GET", "POST"]);
  });

  it("/api/evals/[suiteId] should export GET", () => {
    assertRouteMethods("src/app/api/evals/[suiteId]/route.ts", ["GET"]);
  });

  it("/api/policies should export GET and POST", () => {
    assertRouteMethods("src/app/api/policies/route.ts", ["GET", "POST"]);
  });
});

describe("API Routes — dashboard and tool consumers", () => {
  it("keeps model-combo mapping APIs wired through routing settings", () => {
    const settingsPage = readProjectFile("src/app/(dashboard)/dashboard/settings/page.tsx");
    const modelRoutingSection = readProjectFile("src/shared/components/ModelRoutingSection.tsx");

    assert.ok(settingsPage, "settings page should exist");
    assert.ok(modelRoutingSection, "ModelRoutingSection should exist");
    assert.match(settingsPage, /ModelRoutingSection/);
    assert.match(modelRoutingSection, /fetch\("\/api\/model-combo-mappings"\)/);
    assert.match(modelRoutingSection, /fetch\(`\/api\/model-combo-mappings\/\$\{editingId\}`/);
    assert.match(modelRoutingSection, /method:\s*"DELETE"/);
    assertRouteMethods("src/app/api/model-combo-mappings/route.ts", ["GET", "POST"]);
    assertRouteMethods("src/app/api/model-combo-mappings/[id]/route.ts", ["GET", "PUT", "DELETE"]);
  });

  it("keeps log APIs wired through the consolidated logs dashboard", () => {
    const logsPage = readProjectFile("src/app/(dashboard)/dashboard/logs/page.tsx");
    const requestLogger = readProjectFile("src/shared/components/RequestLoggerV2.tsx");
    const proxyLogger = readProjectFile("src/shared/components/ProxyLogger.tsx");
    const consoleLogger = readProjectFile("src/shared/components/ConsoleLogViewer.tsx");
    const activeRequests = readProjectFile("src/shared/components/ActiveRequestsPanel.tsx");

    assert.ok(logsPage, "logs page should exist");
    assert.ok(requestLogger, "RequestLoggerV2 should exist");
    assert.ok(proxyLogger, "ProxyLogger should exist");
    assert.ok(consoleLogger, "ConsoleLogViewer should exist");
    assert.ok(activeRequests, "ActiveRequestsPanel should exist");
    assert.match(logsPage, /RequestLoggerV2/);
    assert.match(logsPage, /ProxyLogger/);
    assert.match(logsPage, /ConsoleLogViewer/);
    assert.match(logsPage, /ActiveRequestsPanel/);
    assert.match(logsPage, /AuditLogTab/);
    assert.match(logsPage, /\/api\/logs\/export/);
    assert.match(requestLogger, /\/api\/usage\/call-logs/);
    assert.match(requestLogger, /\/api\/logs\/detail/);
    assert.match(proxyLogger, /\/api\/usage\/proxy-logs/);
    assert.match(consoleLogger, /\/api\/logs\/console/);
    assert.match(activeRequests, /\/api\/logs\/active/);
    assertRouteMethods("src/app/api/logs/active/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/logs/console/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/logs/detail/route.ts", ["GET", "POST"]);
    assertRouteMethods("src/app/api/logs/export/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/usage/proxy-logs/route.ts", ["GET", "DELETE"]);
    assertRouteMethods("src/app/api/usage/call-logs/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/usage/call-logs/[id]/route.ts", ["GET"]);
  });

  it("keeps usage quota wired through A2A and MCP tools", () => {
    const quotaSkill = readProjectFile("src/lib/a2a/skills/quotaManagement.ts");
    const mcpAdvancedTools = readProjectFile("open-sse/mcp-server/tools/advancedTools.ts");
    const mcpServer = readProjectFile("open-sse/mcp-server/server.ts");

    assert.ok(quotaSkill, "quotaManagement skill should exist");
    assert.ok(mcpAdvancedTools, "advanced MCP tools should exist");
    assert.ok(mcpServer, "MCP server should exist");
    assert.match(quotaSkill, /\/api\/usage\/quota/);
    assert.match(mcpAdvancedTools, /\/api\/usage\/quota/);
    assert.match(mcpServer, /\/api\/usage\/quota/);
    assertRouteMethods("src/app/api/usage/quota/route.ts", ["GET"]);
  });

  it("keeps legacy usage history and raw request-log APIs explicitly classified", () => {
    const usageStats = readProjectFile("src/shared/components/UsageStats.tsx");
    const apiReference = readProjectFile("docs/API_REFERENCE.md");
    const openApi = readProjectFile("docs/openapi.yaml");

    assert.ok(usageStats, "UsageStats compatibility component should exist");
    assert.ok(apiReference, "API reference should exist");
    assert.ok(openApi, "OpenAPI document should exist");
    assert.match(usageStats, /\/api\/usage\/history/);
    assert.match(apiReference, /\/api\/usage\/history/);
    assert.match(apiReference, /\/api\/usage\/request-logs/);
    assert.match(openApi, /\/api\/usage\/history:/);
    assert.match(openApi, /\/api\/usage\/request-logs:/);
    assertRouteMethods("src/app/api/usage/history/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/usage/request-logs/route.ts", ["GET"]);
    assertRouteMethods("src/app/api/usage/logs/route.ts", ["GET"]);
  });
});

describe("API Routes — T09 /v1 catalog consistency", () => {
  const v1RouteSrc = readProjectFile("src/app/api/v1/route.ts");
  const v1ModelsRouteSrc = readProjectFile("src/app/api/v1/models/route.ts");
  const v1CatalogSrc = readProjectFile("src/app/api/v1/models/catalog.ts");

  it("/api/v1 should delegate model catalog to unified builder", () => {
    assert.ok(v1RouteSrc, "src/app/api/v1/route.ts should exist");
    assert.match(v1RouteSrc, /getUnifiedModelsResponse/);
    assert.match(v1RouteSrc, /from\s+["']\.\/models\/catalog["']/);
    assert.doesNotMatch(v1RouteSrc, /const\s+models\s*=\s*\[/);
  });

  it("/api/v1/models route should only consume unified model catalog builder", () => {
    assert.ok(v1ModelsRouteSrc, "src/app/api/v1/models/route.ts should exist");
    assert.match(v1ModelsRouteSrc, /from\s+["']\.\/catalog["']/);
    assert.doesNotMatch(
      v1ModelsRouteSrc,
      /export\s+async\s+function\s+getUnifiedModelsResponse\s*\(/
    );
  });

  it("/api/v1/models/catalog should export unified model catalog builder", () => {
    assert.ok(v1CatalogSrc, "src/app/api/v1/models/catalog.ts should exist");
    assert.match(v1CatalogSrc, /export\s+async\s+function\s+getUnifiedModelsResponse\s*\(/);
  });
});

describe("Dashboard Wiring — T05 payload rules", () => {
  const settingsPageSrc = readProjectFile("src/app/(dashboard)/dashboard/settings/page.tsx");
  const payloadRulesTabSrc = readProjectFile(
    "src/app/(dashboard)/dashboard/settings/components/PayloadRulesTab.tsx"
  );
  const openapiSrc = readProjectFile("docs/openapi.yaml");

  it("settings page should surface payload rules inside advanced settings", () => {
    assert.ok(settingsPageSrc, "settings page source should exist");
    assert.match(settingsPageSrc, /import PayloadRulesTab from "\.\/components\/PayloadRulesTab"/);
    assert.match(settingsPageSrc, /activeTab === "advanced"/);
    assert.match(settingsPageSrc, /<PayloadRulesTab\s*\/>/);
  });

  it("payload rules tab should read and write through the dedicated settings endpoint", () => {
    assert.ok(payloadRulesTabSrc, "payload rules tab source should exist");
    assert.match(payloadRulesTabSrc, /fetch\("\/api\/settings\/payload-rules"\)/);
    assert.match(payloadRulesTabSrc, /fetch\("\/api\/settings\/payload-rules",\s*\{/);
    assert.match(payloadRulesTabSrc, /method:\s*"PUT"/);
    assert.match(payloadRulesTabSrc, /default-raw/);
  });

  it("openapi should document the payload rules management surface", () => {
    assert.ok(openapiSrc, "docs/openapi.yaml should exist");
    assert.match(openapiSrc, /\/api\/settings\/payload-rules:/);
    assert.match(openapiSrc, /summary:\s+Get payload rules configuration/);
    assert.match(openapiSrc, /ManagementSessionAuth:/);
    assert.match(openapiSrc, /PayloadRulesConfig:/);
  });
});

// ─── Barrel Exports ─────────────────────────────────

describe("Barrel Exports — shared/components", () => {
  const src = readProjectFile("src/shared/components/index.tsx");

  it("should export key shared UI modules", () => {
    assert.ok(src, "src/shared/components/index.tsx should exist");
    for (const name of [
      "Breadcrumbs",
      "EmptyState",
      "NotificationToast",
      "FilterBar",
      "ColumnToggle",
      "DataTable",
    ]) {
      assert.match(src, new RegExp(name));
    }
  });

  it("should re-export layouts", () => {
    assert.match(src, /export\s+\*\s+from\s+"\.\/layouts"/);
  });
});

describe("Barrel Exports — store", () => {
  const src = readProjectFile("src/store/index.ts");

  it("should export useNotificationStore", () => {
    assert.ok(src, "src/store/index.ts should exist");
    assert.match(src, /useNotificationStore/);
  });
});

describe("Barrel Exports — shared/components/layouts", () => {
  const src = readProjectFile("src/shared/components/layouts/index.tsx");

  it("should export DashboardLayout and AuthLayout", () => {
    assert.ok(src, "src/shared/components/layouts/index.tsx should exist");
    assert.match(src, /DashboardLayout/);
    assert.match(src, /AuthLayout/);
  });
});

// ─── Layout and Page Integration ────────────────────

describe("DashboardLayout Integration", () => {
  const src = readProjectFile("src/shared/components/layouts/DashboardLayout.tsx");

  it("should render NotificationToast globally", () => {
    assert.ok(src, "src/shared/components/layouts/DashboardLayout.tsx should exist");
    assert.match(src, /NotificationToast/);
  });

  it("should include Breadcrumbs in page wrapper", () => {
    assert.match(src, /Breadcrumbs/);
  });
});

describe("Page Integration — logs page wiring", () => {
  const src = readProjectFile("src/app/(dashboard)/dashboard/logs/page.tsx");

  it("should wire segmented log tabs", () => {
    assert.ok(src, "src/app/(dashboard)/dashboard/logs/page.tsx should exist");
    assert.match(src, /SegmentedControl/);
    assert.match(src, /RequestLoggerV2/);
    assert.match(src, /ProxyLogger/);
  });
});

describe("Page Integration — settings page wiring", () => {
  const src = readProjectFile("src/app/(dashboard)/dashboard/settings/page.tsx");
  const memorySkillsTab = readProjectFile(
    "src/app/(dashboard)/dashboard/settings/components/MemorySkillsTab.tsx"
  );

  it("should include resilience tab in advanced settings", () => {
    assert.ok(src, "src/app/(dashboard)/dashboard/settings/page.tsx should exist");
    assert.match(src, /ResilienceTab/);
  });

  it("should not label the active skills settings card as a placeholder", () => {
    assert.ok(memorySkillsTab, "MemorySkillsTab should exist");
    assert.doesNotMatch(memorySkillsTab, /Skills Settings \(placeholder\)/);
  });
});

describe("Page Integration — cache page wiring", () => {
  const src = readProjectFile("src/app/(dashboard)/dashboard/cache/page.tsx");

  it("should consolidate prompt cache metrics directly into cache management", () => {
    assert.ok(src, "src/app/(dashboard)/dashboard/cache/page.tsx should exist");
    assert.doesNotMatch(src, /CacheStatsCard/);
  });
});

describe("Page Integration — combos page empty state", () => {
  const src = readProjectFile("src/app/(dashboard)/dashboard/combos/page.tsx");

  it("should use EmptyState when there are no combos", () => {
    assert.ok(src, "src/app/(dashboard)/dashboard/combos/page.tsx should exist");
    assert.match(src, /EmptyState/);
  });

  it("should use notification store for UX feedback", () => {
    assert.match(src, /useNotificationStore/);
  });

  it("should persist usage guide visibility and allow reopening", () => {
    assert.match(src, /COMBO_USAGE_GUIDE_STORAGE_KEY/);
    assert.match(src, /localStorage/);
    assert.match(src, /handleShowUsageGuide/);
  });

  it("should expose quick templates and post-create quick test CTA", () => {
    assert.match(src, /COMBO_TEMPLATES/);
    assert.match(src, /applyTemplate/);
    assert.match(src, /recentlyCreatedCombo/);
    assert.match(src, /testNow/);
  });

  it("should include cost-optimized pricing coverage UX", () => {
    assert.match(src, /hasPricingForModel/);
    assert.match(src, /pricingCoveragePercent/);
    assert.match(src, /pricingCoverage/);
    assert.match(src, /warningCostOptimizedPartialPricing/);
  });

  it("should wire combo account labels to the global email privacy toggle", () => {
    assert.match(src, /EmailPrivacyToggle/);
    assert.match(src, /useEmailPrivacyStore/);
    assert.match(src, /pickDisplayValue/);
    assert.match(src, /emailVisibilityTooltip/);
  });

  it("should mask combo test result labels with the global email privacy toggle", () => {
    assert.match(src, /function TestResultsView/);
    assert.match(src, /pickDisplayValue\(\[r\.label\], emailsVisible, r\.model\)/);
  });
});

describe("Page Integration — provider test results privacy", () => {
  const providersSrc = readProjectFile("src/app/(dashboard)/dashboard/providers/page.tsx");
  const providerDetailSrc = readProjectFile(
    "src/app/(dashboard)/dashboard/providers/[id]/page.tsx"
  );

  it("should mask provider test batch names with the global email privacy toggle", () => {
    assert.ok(providersSrc, "src/app/(dashboard)/dashboard/providers/page.tsx should exist");
    assert.match(providersSrc, /useEmailPrivacyStore/);
    assert.match(
      providersSrc,
      /pickDisplayValue\(\[r\.connectionName\], emailsVisible, r\.connectionName\)/
    );
  });

  it("should mask provider detail test result names with the global email privacy toggle", () => {
    assert.ok(
      providerDetailSrc,
      "src/app/(dashboard)/dashboard/providers/[id]/page.tsx should exist"
    );
    assert.match(providerDetailSrc, /const emailsVisible = useEmailPrivacyStore/);
    assert.match(
      providerDetailSrc,
      /pickDisplayValue\(\s*\[r\.connectionName\],\s*emailsVisible,\s*r\.connectionName\s*\)/
    );
  });

  it("should resolve provider detail metadata through the shared dashboard catalog", () => {
    assert.ok(
      providerDetailSrc,
      "src/app/(dashboard)/dashboard/providers/[id]/page.tsx should exist"
    );
    assert.match(providerDetailSrc, /resolveDashboardProviderInfo/);
  });

  it("should treat upstream proxy entries as a dedicated management surface", () => {
    assert.ok(
      providerDetailSrc,
      "src/app/(dashboard)/dashboard/providers/[id]/page.tsx should exist"
    );
    assert.match(providerDetailSrc, /isUpstreamProxyProvider/);
    assert.match(providerDetailSrc, /Managed via Upstream Proxy Settings/);
  });
});

describe("Page Integration — legacy provider create route retirement", () => {
  const legacyProviderNewSrc = readProjectFile(
    "src/app/(dashboard)/dashboard/providers/new/page.tsx"
  );

  it("should redirect legacy /dashboard/providers/new to the canonical providers flow", () => {
    assert.ok(
      legacyProviderNewSrc,
      "src/app/(dashboard)/dashboard/providers/new/page.tsx should exist"
    );
    assert.match(legacyProviderNewSrc, /redirect\("\/dashboard\/providers"\)/);
    assert.doesNotMatch(legacyProviderNewSrc, /authMethod:\s*"api_key"/);
    assert.doesNotMatch(legacyProviderNewSrc, /displayName/);
  });
});
