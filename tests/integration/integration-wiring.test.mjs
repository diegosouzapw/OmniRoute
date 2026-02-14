/**
 * Integration Wiring Verification Tests
 *
 * Validates that backend modules are correctly wired into the proxy pipeline,
 * API routes exist, and barrel exports are accessible.
 *
 * @module tests/integration/integration-wiring.test.mjs
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");

// ─── Helpers ─────────────────────────────────────────

function readSrc(relPath) {
  const full = join(ROOT, "src", relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

// ─── Pipeline Wiring (Batch 1) ──────────────────────

describe("Pipeline Wiring — server-init.js", () => {
  const src = readSrc("server-init.js");

  it("should import initAuditLog from compliance", () => {
    assert.ok(src, "server-init.js should exist");
    assert.match(src, /initAuditLog/);
  });

  it("should call cleanupExpiredLogs", () => {
    assert.match(src, /cleanupExpiredLogs/);
  });

  it("should log server.start audit event", () => {
    assert.match(src, /server\.start/);
  });
});

describe("Pipeline Wiring — chat.js", () => {
  const src = readSrc("sse/handlers/chat.js");

  it("should import compliance/sanitization", () => {
    assert.ok(src, "chat.js should exist");
    assert.match(src, /sanitize|compliance|logAuditEvent/);
  });

  it("should import circuitBreaker", () => {
    assert.match(src, /circuitBreaker|getCircuitBreaker/);
  });

  it("should import modelAvailability", () => {
    assert.match(src, /isModelAvailable|modelAvailability/);
  });

  it("should import requestTelemetry", () => {
    assert.match(src, /RequestTelemetry|requestTelemetry/);
  });

  it("should import costRules", () => {
    assert.match(src, /checkBudget|recordCost/);
  });

  it("should use generateRequestId", () => {
    assert.match(src, /generateRequestId/);
  });
});

describe("Pipeline Wiring — proxy.js", () => {
  const src = readSrc("proxy.js");

  it("should import fetchWithTimeout", () => {
    assert.ok(src, "proxy.js should exist");
    assert.match(src, /fetchWithTimeout/);
  });

  it("should import requestId utilities", () => {
    assert.match(src, /generateRequestId|addRequestIdHeader/);
  });
});

// ─── API Routes (Batch 2) ───────────────────────────

describe("API Routes — existence check", () => {
  const routes = [
    "app/api/cache/stats/route.js",
    "app/api/models/availability/route.js",
    "app/api/telemetry/summary/route.js",
    "app/api/usage/budget/route.js",
    "app/api/fallback/chains/route.js",
    "app/api/compliance/audit-log/route.js",
    "app/api/evals/route.js",
    "app/api/evals/[suiteId]/route.js",
    "app/api/policies/route.js",
  ];

  for (const route of routes) {
    it(`route file should exist: ${route}`, () => {
      const full = join(ROOT, "src", route);
      assert.ok(existsSync(full), `${route} should exist`);
    });
  }
});

describe("API Routes — export HTTP methods", () => {
  it("/api/cache/stats should export GET and DELETE", () => {
    const src = readSrc("app/api/cache/stats/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+DELETE/);
  });

  it("/api/models/availability should export GET and POST", () => {
    const src = readSrc("app/api/models/availability/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+POST/);
  });

  it("/api/telemetry/summary should export GET", () => {
    const src = readSrc("app/api/telemetry/summary/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
  });

  it("/api/usage/budget should export GET and POST", () => {
    const src = readSrc("app/api/usage/budget/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+POST/);
  });

  it("/api/fallback/chains should export GET, POST, DELETE", () => {
    const src = readSrc("app/api/fallback/chains/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+POST/);
    assert.match(src, /export\s+(async\s+)?function\s+DELETE/);
  });

  it("/api/evals should export GET and POST", () => {
    const src = readSrc("app/api/evals/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+POST/);
  });

  it("/api/policies should export GET and POST", () => {
    const src = readSrc("app/api/policies/route.js");
    assert.match(src, /export\s+(async\s+)?function\s+GET/);
    assert.match(src, /export\s+(async\s+)?function\s+POST/);
  });
});

// ─── Barrel Exports (Batch 3) ───────────────────────

describe("Barrel Exports — shared/components", () => {
  const src = readSrc("shared/components/index.js");

  const expected = [
    "Breadcrumbs",
    "EmptyState",
    "NotificationToast",
    "FilterBar",
    "ColumnToggle",
    "DataTable",
  ];

  for (const name of expected) {
    it(`should export ${name}`, () => {
      assert.ok(src, "shared/components/index.js should exist");
      assert.match(src, new RegExp(name));
    });
  }
});

describe("Barrel Exports — store", () => {
  const src = readSrc("store/index.js");

  it("should export useNotificationStore", () => {
    assert.ok(src, "store/index.js should exist");
    assert.match(src, /useNotificationStore/);
  });
});

// ─── Layout Integration (Batch 3) ──────────────────

describe("DashboardLayout Integration", () => {
  const src = readSrc("shared/components/layouts/DashboardLayout.js");

  it("should import NotificationToast", () => {
    assert.ok(src, "DashboardLayout.js should exist");
    assert.match(src, /NotificationToast/);
  });

  it("should import Breadcrumbs", () => {
    assert.match(src, /Breadcrumbs/);
  });
});

// ─── Page Integration (Batch 4) ────────────────────

describe("Page Integration — new components exist", () => {
  const components = [
    "app/(dashboard)/dashboard/usage/components/BudgetTelemetryCards.js",
    "app/(dashboard)/dashboard/settings/components/ComplianceTab.js",
    "app/(dashboard)/dashboard/settings/components/CacheStatsCard.js",
  ];

  for (const comp of components) {
    it(`component should exist: ${comp.split("/").pop()}`, () => {
      const full = join(ROOT, "src", comp);
      assert.ok(existsSync(full), `${comp} should exist`);
    });
  }
});

describe("Page Integration — Usage page wiring", () => {
  const src = readSrc("app/(dashboard)/dashboard/usage/page.js");

  it("should import BudgetTelemetryCards", () => {
    assert.ok(src, "usage/page.js should exist");
    assert.match(src, /BudgetTelemetryCards/);
  });
});

describe("Page Integration — Settings page wiring", () => {
  const src = readSrc("app/(dashboard)/dashboard/settings/page.js");

  it("should import ComplianceTab", () => {
    assert.ok(src, "settings/page.js should exist");
    assert.match(src, /ComplianceTab/);
  });

  it("should import CacheStatsCard", () => {
    assert.match(src, /CacheStatsCard/);
  });

  it("should have compliance tab entry", () => {
    assert.match(src, /compliance/i);
  });
});

describe("Page Integration — Combos page EmptyState", () => {
  const src = readSrc("app/(dashboard)/dashboard/combos/page.js");

  it("should import EmptyState", () => {
    assert.ok(src, "combos/page.js should exist");
    assert.match(src, /EmptyState/);
  });
});
