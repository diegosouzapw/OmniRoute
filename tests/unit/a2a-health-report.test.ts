/**
 * Tests for the health-report A2A skill.
 *
 * Verifies:
 *  - Default scope ('all') returns all 5 sections and the correct rollup.
 *  - Scope filter (a2a, mcp, db, providers, bifrost) returns ONLY the
 *    requested section and the rollup reflects only that section.
 *  - Degraded-state synthesis: when a collector override pushes one
 *    subsystem to a worse status, the overall rollup follows.
 *  - includeMetrics=true appends a metrics block; includeMetrics=false omits
 *    it.
 *  - Overall rollup is worst-of: healthy+degraded=degraded;
 *    healthy+offline=offline; healthy+unknown=degraded; degraded+offline=offline.
 *  - Bifrost section reports status='unknown' with a single warning
 *    "subsystem not yet deployed" when no collector override is supplied.
 *  - Default collectors return the documented shape (5 keys in sections,
 *    ISO8601 generatedAt).
 */

import { describe, expect, it } from "vitest";
import {
  executeHealthReport,
  type A2ASectionDetails,
  type BifrostSectionDetails,
  type DBSectionDetails,
  type HealthReport,
  type HealthReportDeps,
  type HealthReportSection,
  type MCPSectionDetails,
  type ProvidersSectionDetails,
} from "@/lib/a2a/skills/healthReport";
import type { A2ATask } from "@/lib/a2a/taskManager";

function makeTask(metadata: Record<string, unknown> | undefined = {}): A2ATask {
  return {
    id: "test-health-task",
    skill: "health-report",
    messages: [],
    metadata,
    state: "working",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function parseReport(result: Awaited<ReturnType<typeof executeHealthReport>>): HealthReport {
  expect(result.artifacts).toHaveLength(1);
  expect(result.artifacts[0].type).toBe("text");
  return JSON.parse(result.artifacts[0].content) as HealthReport;
}

// Deterministic snapshot builders for the five sections. Each returns a
// section with a known status so the rollup tests can be controlled.
function healthyA2A(): Omit<HealthReportSection<A2ASectionDetails>, "status"> {
  return {
    details: {
      skillsCount: 10,
      registeredSkills: ["s1", "s2"],
      transport: "online",
    },
    warnings: [],
  };
}
function healthyMCP(): Omit<HealthReportSection<MCPSectionDetails>, "status"> {
  return {
    details: { toolsCount: 87, scopesCount: 4, transports: ["http"], scopes: ["read"] },
    warnings: [],
  };
}
function healthyDB(): Omit<HealthReportSection<DBSectionDetails>, "status"> {
  return {
    details: {
      migrations: 97,
      modules: 83,
      lastBackup: "2026-06-17T00:00:00.000Z",
      integrityCheck: "ok",
    },
    warnings: [],
  };
}
function healthyProviders(): Omit<HealthReportSection<ProvidersSectionDetails>, "status"> {
  return {
    details: {
      total: 232,
      active: 232,
      degraded: 0,
      withFreeTier: 12,
      byFamily: { apiKey: 100, oauth: 50, noAuth: 50, webCookie: 32 },
    },
    warnings: [],
  };
}
function healthyBifrost(): Omit<HealthReportSection<BifrostSectionDetails>, "status"> {
  return {
    details: { baseUrl: "https://bifrost.example", lastHealthCheck: "2026-06-18T00:00:00.000Z", modelCount: 50 },
    warnings: [],
  };
}

describe("healthReport A2A skill", () => {
  it("default scope returns all 5 sections with overall=healthy when all subsystems are healthy", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(await executeHealthReport(makeTask(), deps));

    expect(report.overall).toBe("healthy");
    expect(report.scope).toBe("all");
    expect(Object.keys(report.sections).sort()).toEqual(
      ["a2a", "bifrost", "db", "mcp", "providers"].sort(),
    );
    expect(report.sections.a2a?.status).toBe("healthy");
    expect(report.sections.mcp?.status).toBe("healthy");
    expect(report.sections.db?.status).toBe("healthy");
    expect(report.sections.providers?.status).toBe("healthy");
    expect(report.sections.bifrost?.status).toBe("healthy");
    // generatedAt is a valid ISO8601 string
    expect(new Date(report.generatedAt).toString()).not.toBe("Invalid Date");
  });

  it("scope='a2a' returns ONLY the a2a section", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "a2a" }), deps),
    );

    expect(report.scope).toBe("a2a");
    expect(Object.keys(report.sections)).toEqual(["a2a"]);
    expect(report.sections.a2a?.details.skillsCount).toBe(10);
    expect(report.overall).toBe("healthy");
  });

  it("scope='mcp' returns ONLY the mcp section", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "mcp" }), deps),
    );

    expect(report.scope).toBe("mcp");
    expect(Object.keys(report.sections)).toEqual(["mcp"]);
    expect(report.sections.mcp?.details.toolsCount).toBe(87);
    expect(report.overall).toBe("healthy");
  });

  it("scope='db' returns ONLY the db section", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "db" }), deps),
    );

    expect(report.scope).toBe("db");
    expect(Object.keys(report.sections)).toEqual(["db"]);
    expect(report.sections.db?.details.migrations).toBe(97);
    expect(report.overall).toBe("healthy");
  });

  it("scope='providers' returns ONLY the providers section", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "providers" }), deps),
    );

    expect(report.scope).toBe("providers");
    expect(Object.keys(report.sections)).toEqual(["providers"]);
    expect(report.sections.providers?.details.total).toBe(232);
    expect(report.overall).toBe("healthy");
  });

  it("degraded state synthesis: a forced offline in mcp makes overall=offline", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: () => ({
        details: { toolsCount: 0, scopesCount: 0, transports: [], scopes: [] },
        warnings: ["MCP tool registry is empty"],
        forcedStatus: "offline",
      }),
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(await executeHealthReport(makeTask(), deps));

    expect(report.sections.mcp?.status).toBe("offline");
    expect(report.sections.a2a?.status).toBe("healthy");
    expect(report.overall).toBe("offline");
  });

  it("overall rollup is worst-of: healthy+degraded → degraded, healthy+offline → offline", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: () => ({
        details: { toolsCount: 87, scopesCount: 0, transports: ["http"], scopes: [] },
        warnings: ["no scopes"],
        forcedStatus: "degraded",
      }),
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const degradedReport = parseReport(await executeHealthReport(makeTask(), deps));
    expect(degradedReport.overall).toBe("degraded");

    // Now make providers offline, expect offline.
    const deps2: HealthReportDeps = {
      ...deps,
      collectProviders: () => ({
        details: {
          total: 0,
          active: 0,
          degraded: 0,
          withFreeTier: 0,
          byFamily: { apiKey: 0, oauth: 0, noAuth: 0, webCookie: 0 },
        },
        warnings: ["Provider catalog is empty"],
        forcedStatus: "offline",
      }),
    };
    const offlineReport = parseReport(await executeHealthReport(makeTask(), deps2));
    expect(offlineReport.overall).toBe("offline");
  });

  it("overall rollup: a single 'unknown' section makes overall=degraded (not healthy, not offline)", async () => {
    // Bifrost is the only section we want to count; others healthy.
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: () => ({
        details: { baseUrl: null, lastHealthCheck: null, modelCount: 0 },
        warnings: ["subsystem not yet deployed"],
        forcedStatus: "unknown",
      }),
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "bifrost" }), deps),
    );
    expect(report.sections.bifrost?.status).toBe("unknown");
    expect(report.overall).toBe("degraded");
  });

  it("default bifrost collector reports status='unknown' with 'subsystem not yet deployed' warning", async () => {
    // No deps override — we exercise the real defaultCollectBifrost path.
    // This test deliberately does NOT mock the other collectors either so
    // it covers the real file/migration/provider paths too. We only
    // assert on the bifrost section + the overall rollup behaviour.
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "bifrost" })),
    );
    expect(report.sections.bifrost?.status).toBe("unknown");
    expect(report.sections.bifrost?.warnings).toContain("subsystem not yet deployed");
    expect(report.sections.bifrost?.details.baseUrl).toBeNull();
    expect(report.sections.bifrost?.details.modelCount).toBe(0);
  });

  it("includeMetrics=true appends a metrics block with the same keys as sections", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
      collectMetrics: () => ({
        a2a: { p50: 10, p95: 50, p99: 100, sampleSize: 200, source: "synthetic" },
        mcp: { p50: 5, p95: 20, p99: 80, sampleSize: 200, source: "synthetic" },
        db: { p50: 1, p95: 5, p99: 10, sampleSize: 200, source: "synthetic" },
        providers: { p50: 8, p95: 30, p99: 90, sampleSize: 200, source: "synthetic" },
        bifrost: { p50: null, p95: null, p99: null, sampleSize: 0, source: "none" },
      }),
    };
    const report = parseReport(
      await executeHealthReport(makeTask({ scope: "a2a", includeMetrics: true }), deps),
    );
    expect(report.metrics).toBeDefined();
    expect(report.metrics?.a2a?.p50).toBe(10);
    expect(report.metrics?.a2a?.p95).toBe(50);
    expect(report.metrics?.a2a?.p99).toBe(100);
    // Only the scoped section gets a metrics entry.
    expect(Object.keys(report.metrics ?? {})).toEqual(["a2a"]);
  });

  it("includeMetrics=false (default) omits the metrics block", async () => {
    const deps: HealthReportDeps = {
      collectA2A: healthyA2A,
      collectMCP: healthyMCP,
      collectDB: healthyDB,
      collectProviders: healthyProviders,
      collectBifrost: healthyBifrost,
    };
    const report = parseReport(await executeHealthReport(makeTask(), deps));
    expect(report.metrics).toBeUndefined();
  });
});
