/**
 * Health Report A2A Skill
 *
 * Aggregates a fleet-wide health snapshot for the OmniRoute gateway. The
 * report covers five subsystems that the A2A server depends on:
 *
 *   - a2a        — the A2A server itself (skill registry, transport)
 *   - mcp        — the Model Context Protocol server (tools, scopes)
 *   - db         — the SQLite database (migrations, modules, backups, integrity)
 *   - providers  — the provider catalog (count, free-tier coverage, degraded)
 *   - bifrost    — the Tier-1 router substrate (NOT YET DEPLOYED)
 *
 * Each section is shaped as
 *   { status: 'healthy'|'degraded'|'offline'|'unknown',
 *     details: { ... subsystem-specific fields ... },
 *     warnings: string[] }
 *
 * The top-level report has an `overall` rollup computed as worst-of across
 * the included sections (offline > degraded > unknown > healthy). When a
 * subsystem does not exist in the repo (e.g. bifrost), it is reported as
 * `unknown` with a single warning "subsystem not yet deployed".
 *
 * The skill is read-only: it never makes network calls, never mutates DB
 * state, and never enqueues any LLM call. The default collectors read
 * filesystem + module-level constants only.
 *
 * For testability, the five collectors and the metrics collector can be
 * overridden via the optional `deps` argument. Tests inject deterministic
 * snapshots so the rollup behaviour can be asserted without touching the
 * real registry / provider catalog / db files.
 *
 * Inputs (via task.metadata):
 *   - scope           (optional, 'all'|'a2a'|'mcp'|'db'|'providers'|'bifrost')
 *                     Default: 'all'. Restricts the report to one subsystem.
 *   - includeMetrics  (optional, boolean) Default: false. When true, appends
 *                     latency p50/p95/p99 per section (synthetic from any
 *                     available log; otherwise null).
 *
 * Output (A2ASkillResult.artifacts[0].content is JSON):
 *   {
 *     overall: 'healthy'|'degraded'|'offline',
 *     generatedAt: ISO8601,
 *     scope: 'all'|<one of the sections>,
 *     sections: { a2a, mcp, db, providers, bifrost }   // filtered by scope
 *     metrics?: { a2a?: {p50,p95,p99}|null, ... }
 *   }
 */

import fs from "fs";
import path from "path";
import { A2ATask } from "../taskManager";
import { A2ASkillResult } from "../taskExecution";
import { A2A_SKILL_HANDLERS } from "../taskExecution";
import { MCP_TOOLS } from "../../../../open-sse/mcp-server/schemas/tools";
import {
  APIKEY_PROVIDERS,
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "../../../shared/constants/providers";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SectionStatus = "healthy" | "degraded" | "offline" | "unknown";
export type OverallStatus = "healthy" | "degraded" | "offline";
export type A2ATransportState = "online" | "degraded" | "offline";
export type HealthReportScope =
  | "all"
  | "a2a"
  | "mcp"
  | "db"
  | "providers"
  | "bifrost";

export interface A2ASectionDetails {
  skillsCount: number;
  registeredSkills: string[];
  transport: A2ATransportState;
}

export interface MCPSectionDetails {
  toolsCount: number;
  scopesCount: number;
  transports: string[];
  scopes: string[];
}

export interface DBSectionDetails {
  migrations: number;
  modules: number;
  lastBackup: string | null;
  integrityCheck: "ok" | "failed" | "not_run" | "skipped";
}

export interface ProvidersSectionDetails {
  total: number;
  active: number;
  degraded: number;
  withFreeTier: number;
  byFamily: {
    apiKey: number;
    oauth: number;
    noAuth: number;
    webCookie: number;
  };
}

export interface BifrostSectionDetails {
  baseUrl: string | null;
  lastHealthCheck: string | null;
  modelCount: number;
}

export interface LatencyMetrics {
  p50: number | null;
  p95: number | null;
  p99: number | null;
  sampleSize: number;
  source: "synthetic" | "log" | "none";
}

export type SectionMetrics = LatencyMetrics | null;

export interface HealthReportSection<TDetails> {
  status: SectionStatus;
  details: TDetails;
  warnings: string[];
}

export type HealthReportSectionKey = "a2a" | "mcp" | "db" | "providers" | "bifrost";

export interface HealthReport {
  overall: OverallStatus;
  generatedAt: string;
  scope: HealthReportScope;
  sections: Partial<{
    a2a: HealthReportSection<A2ASectionDetails>;
    mcp: HealthReportSection<MCPSectionDetails>;
    db: HealthReportSection<DBSectionDetails>;
    providers: HealthReportSection<ProvidersSectionDetails>;
    bifrost: HealthReportSection<BifrostSectionDetails>;
  }>;
  metrics?: Partial<{
    a2a: SectionMetrics;
    mcp: SectionMetrics;
    db: SectionMetrics;
    providers: SectionMetrics;
    bifrost: SectionMetrics;
  }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collector dependencies (injectable for tests)
// ─────────────────────────────────────────────────────────────────────────────

export interface HealthReportDeps {
  collectA2A?: () => Omit<HealthReportSection<A2ASectionDetails>, "status"> & {
    /** Caller can pin a transport state to force a non-healthy status. */
    forcedStatus?: SectionStatus;
  };
  collectMCP?: () => Omit<HealthReportSection<MCPSectionDetails>, "status"> & {
    forcedStatus?: SectionStatus;
  };
  collectDB?: () => Omit<HealthReportSection<DBSectionDetails>, "status"> & {
    forcedStatus?: SectionStatus;
  };
  collectProviders?: () => Omit<HealthReportSection<ProvidersSectionDetails>, "status"> & {
    forcedStatus?: SectionStatus;
  };
  collectBifrost?: () => Omit<HealthReportSection<BifrostSectionDetails>, "status"> & {
    forcedStatus?: SectionStatus;
  };
  /**
   * Optional metrics collector. When includeMetrics=true and the caller did
   * not inject metrics, we fall back to `collectDefaultMetrics` which
   * returns null (no log source wired up in this stub).
   */
  collectMetrics?: () => Partial<Record<HealthReportSectionKey, SectionMetrics>>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Module-level state for filesystem-based defaults
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolve the migrations directory path. Mirrors the logic in
 * `migrationRunner.ts` but stops at the first hit so this skill can be called
 * before the DB subsystem is initialized (i.e. during very early boot).
 */
function resolveMigrationsDir(): string | null {
  const candidates = [
    process.env["OMNIROUTE_MIGRATIONS_DIR"],
    path.join(process.cwd(), "src", "lib", "db", "migrations"),
    path.join(process.cwd(), "migrations"),
  ].filter((c): c is string => typeof c === "string" && c.length > 0);

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // ignore — try the next candidate
    }
  }
  return null;
}

/**
 * Resolve the `db` modules directory (top-level .ts files in src/lib/db).
 * Used for the "modules" count in the db section.
 */
function resolveDbModulesDir(): string | null {
  const candidates = [
    path.join(process.cwd(), "src", "lib", "db"),
    path.join(process.cwd(), "app", "src", "lib", "db"),
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Resolve the `db_backups` directory used for last-backup lookups. Tries a
 * few conventional locations without importing `core.ts` (which would
 * initialize a DB handle and break the "read-only" guarantee).
 */
function resolveBackupsDir(): string | null {
  const candidates = [
    process.env["DB_BACKUPS_DIR"],
    path.join(process.cwd(), "data", "db_backups"),
    path.join(process.cwd(), ".data", "db_backups"),
    path.join(process.cwd(), "db_backups"),
  ].filter((c): c is string => typeof c === "string" && c.length > 0);

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Default collectors — read from real sources (no network, no DB writes)
// ─────────────────────────────────────────────────────────────────────────────

function defaultCollectA2A(): Omit<HealthReportSection<A2ASectionDetails>, "status"> & {
  forcedStatus?: SectionStatus;
} {
  const registeredSkills = Object.keys(A2A_SKILL_HANDLERS).sort();
  const warnings: string[] = [];
  let transport: A2ATransportState = "online";

  if (registeredSkills.length === 0) {
    warnings.push("A2A skill registry is empty — no skills are registered");
    transport = "degraded";
  }

  return {
    details: {
      skillsCount: registeredSkills.length,
      registeredSkills,
      transport,
    },
    warnings,
  };
}

function defaultCollectMCP(): Omit<HealthReportSection<MCPSectionDetails>, "status"> & {
  forcedStatus?: SectionStatus;
} {
  const warnings: string[] = [];
  const transports = new Set<string>();
  const scopes = new Set<string>();

  for (const tool of MCP_TOOLS) {
    transports.add("http");
    for (const scope of tool.scopes) {
      scopes.add(scope);
    }
  }

  // The MCP server is currently served via HTTP from /api/mcp/tools.
  // stdio transport is exposed by the open-sse harness for IDE clients
  // (VS Code, Cursor, Claude Desktop) — we mark it known-but-not-active
  // unless the env var explicitly opts in.
  if (process.env["OMNIROUTE_MCP_STDIO"] === "1") {
    transports.add("stdio");
  }

  // NOTE: MCP_TOOLS is typed as a literal tuple in the schema, so the
  // length-0 warning is statically unreachable. We keep an `else` branch
  // for documentation but the warning only fires for the `scopes`
  // empty-set case (a real misconfiguration).
  if (scopes.size === 0) {
    warnings.push("MCP tools declare no scopes — auth will reject all calls");
  }

  return {
    details: {
      toolsCount: MCP_TOOLS.length,
      scopesCount: scopes.size,
      transports: [...transports].sort(),
      scopes: [...scopes].sort(),
    },
    warnings,
  };
}

function defaultCollectDB(): Omit<HealthReportSection<DBSectionDetails>, "status"> & {
  forcedStatus?: SectionStatus;
} {
  const warnings: string[] = [];
  const migrationsDir = resolveMigrationsDir();
  const modulesDir = resolveDbModulesDir();
  const backupsDir = resolveBackupsDir();

  let migrations = 0;
  if (migrationsDir) {
    try {
      migrations = fs
        .readdirSync(migrationsDir)
        .filter((f) => f.endsWith(".sql")).length;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      warnings.push(`Failed to read migrations dir: ${message}`);
    }
  } else {
    warnings.push("Migrations directory not found — db.migrations = 0");
  }

  let modules = 0;
  if (modulesDir) {
    try {
      modules = fs
        .readdirSync(modulesDir)
        .filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts")).length;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      warnings.push(`Failed to read db modules dir: ${message}`);
    }
  } else {
    warnings.push("db modules directory not found — db.modules = 0");
  }

  let lastBackup: string | null = null;
  if (backupsDir) {
    try {
      const files = fs
        .readdirSync(backupsDir)
        .filter((f) => f.startsWith("db_") && f.endsWith(".sqlite"))
        .map((f) => {
          const full = path.join(backupsDir, f);
          try {
            return { name: f, mtimeMs: fs.statSync(full).mtimeMs };
          } catch {
            return null;
          }
        })
        .filter((x): x is { name: string; mtimeMs: number } => x !== null)
        .sort((a, b) => b.mtimeMs - a.mtimeMs);
      if (files.length > 0) {
        lastBackup = new Date(files[0]!.mtimeMs).toISOString();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      warnings.push(`Failed to read backups dir: ${message}`);
    }
  }

  // We deliberately do not open a DB connection here. The skill is a
  // read-only snapshot; an integrity_check is an expensive PRAGMA and
  // should be triggered explicitly by the caller via the dedicated
  // /api/db/health MCP tool. We mark this as 'not_run' to be honest about
  // what this report covers.
  const integrityCheck: DBSectionDetails["integrityCheck"] = "not_run";

  return {
    details: {
      migrations,
      modules,
      lastBackup,
      integrityCheck,
    },
    warnings,
  };
}

function defaultCollectProviders(): Omit<
  HealthReportSection<ProvidersSectionDetails>,
  "status"
> & { forcedStatus?: SectionStatus } {
  const warnings: string[] = [];
  const byFamily = {
    apiKey: Object.keys(APIKEY_PROVIDERS).length,
    oauth: Object.keys(OAUTH_PROVIDERS).length,
    noAuth: Object.keys(NOAUTH_PROVIDERS).length,
    webCookie: Object.keys(WEB_COOKIE_PROVIDERS).length,
  };
  const total = byFamily.apiKey + byFamily.oauth + byFamily.noAuth + byFamily.webCookie;

  // "active" = configured + reachable. We have no live circuit-breaker state
  // in this stub; we treat all catalog entries as potentially active and
  // leave the `degraded` field at 0. Callers that want real-time degradation
  // should query /api/resilience or the per-provider metrics tool. This is
  // surfaced as a warning so operators know the catalog snapshot is not
  // equivalent to a live health check.
  const active = total;
  const degraded = 0;

  // The four provider maps have heterogeneous value types (some have
  // `hasFree`, some have `subscriptionRisk`, some have `alias`); we widen
  // to `unknown[]` and narrow per-element when reading `hasFree`.
  const allProviders: unknown[] = [
    ...Object.values(APIKEY_PROVIDERS),
    ...Object.values(OAUTH_PROVIDERS),
    ...Object.values(NOAUTH_PROVIDERS),
    ...Object.values(WEB_COOKIE_PROVIDERS),
  ];
  const withFreeTier = allProviders.filter(
    (p) => (p as { hasFree?: boolean } | null)?.hasFree === true,
  ).length;

  if (total === 0) {
    warnings.push("Provider catalog is empty");
  }
  if (withFreeTier === 0) {
    warnings.push("No providers advertise a free tier — every request will incur cost");
  }
  warnings.push(
    "Provider active/degraded counts reflect catalog size; live circuit-breaker " +
      "state is not consulted by this skill — use the resilience API for that.",
  );

  return {
    details: {
      total,
      active,
      degraded,
      withFreeTier,
      byFamily,
    },
    warnings,
  };
}

function defaultCollectBifrost(): Omit<
  HealthReportSection<BifrostSectionDetails>,
  "status"
> & { forcedStatus?: SectionStatus } {
  // Bifrost is the Tier-1 router substrate (KooshaPari/bifrost). It is
  // wired into OmniRoute via BifrostAdapter but is NOT YET DEPLOYED in
  // production. The catalog model cache (L5-111) is staged in a feature
  // branch and not merged. Until then we report 'unknown' with the
  // standard "subsystem not yet deployed" warning.
  return {
    details: {
      baseUrl: null,
      lastHealthCheck: null,
      modelCount: 0,
    },
    warnings: ["subsystem not yet deployed"],
    forcedStatus: "unknown",
  };
}

function defaultCollectMetrics(): Partial<Record<HealthReportSectionKey, SectionMetrics>> {
  // No log source wired into this skill. We deliberately return null for
  // every section rather than fabricate numbers. The includeMetrics=true
  // path is a forward-compat hook for when /api/observability exposes
  // rolling p50/p95/p99 windows.
  return {
    a2a: null,
    mcp: null,
    db: null,
    providers: null,
    bifrost: null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Status derivation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive the status of a section from its collected details + warnings.
 * Collectors may explicitly override status via `forcedStatus` (used by
 * tests and by the bifrost stub).
 */
function deriveStatus<K extends HealthReportSectionKey>(
  key: K,
  collected: Omit<HealthReportSection<unknown>, "status"> & {
    forcedStatus?: SectionStatus;
  },
): SectionStatus {
  if (collected.forcedStatus) return collected.forcedStatus;

  const warningCount = collected.warnings.length;
  const details = collected.details as Record<string, unknown>;

  // Subsystem-specific offline checks first.
  switch (key) {
    case "a2a": {
      const a2aDetails = details as unknown as A2ASectionDetails;
      if (a2aDetails.transport === "offline") return "offline";
      if (a2aDetails.skillsCount === 0) return "offline";
      if (a2aDetails.transport === "degraded" || warningCount > 0) return "degraded";
      return "healthy";
    }
    case "mcp": {
      const mcpDetails = details as unknown as MCPSectionDetails;
      if (mcpDetails.toolsCount === 0) return "offline";
      if (mcpDetails.scopesCount === 0 || warningCount > 0) return "degraded";
      return "healthy";
    }
    case "db": {
      const dbDetails = details as unknown as DBSectionDetails;
      if (dbDetails.integrityCheck === "failed") return "offline";
      if (dbDetails.migrations === 0 || dbDetails.modules === 0) return "degraded";
      if (dbDetails.integrityCheck === "not_run" || warningCount > 0) return "degraded";
      return "healthy";
    }
    case "providers": {
      const pDetails = details as unknown as ProvidersSectionDetails;
      if (pDetails.total === 0) return "offline";
      const degradedRatio = pDetails.degraded / Math.max(1, pDetails.total);
      if (degradedRatio > 0.5) return "degraded";
      if (degradedRatio > 0 || warningCount > 1) return "degraded";
      return "healthy";
    }
    case "bifrost": {
      const bDetails = details as unknown as BifrostSectionDetails;
      if (bDetails.baseUrl === null) return "unknown";
      if (bDetails.modelCount === 0) return "degraded";
      return "healthy";
    }
    default:
      return warningCount > 0 ? "degraded" : "healthy";
  }
}

/**
 * Roll up multiple section statuses into one overall status using
 * worst-of semantics. Ordering:
 *   offline  > degraded > unknown  > healthy
 *
 * `unknown` is treated as "could not be verified" and contributes as a
 * soft degraded signal — the overall never goes `healthy` if any section
 * is unknown, but it does not escalate to `offline` purely because of an
 * unknown subsystem.
 */
const STATUS_SEVERITY: Record<SectionStatus, number> = {
  healthy: 0,
  unknown: 1,
  degraded: 2,
  offline: 3,
};

function rollup(statuses: SectionStatus[]): OverallStatus {
  let worst: OverallStatus = "healthy";
  for (const s of statuses) {
    if (STATUS_SEVERITY[s] > STATUS_SEVERITY[worst]) {
      // Map unknown → degraded for the rollup (so unknown does not
      // accidentally look healthy), but do not promote to offline.
      if (s === "unknown") {
        if (worst === "healthy") worst = "degraded";
      } else {
        worst = s as OverallStatus;
      }
    }
  }
  return worst;
}

// ─────────────────────────────────────────────────────────────────────────────
// Scope parsing
// ─────────────────────────────────────────────────────────────────────────────

const SCOPES: readonly HealthReportScope[] = [
  "all",
  "a2a",
  "mcp",
  "db",
  "providers",
  "bifrost",
] as const;

function parseScope(raw: unknown): HealthReportScope {
  if (typeof raw === "string" && (SCOPES as readonly string[]).includes(raw)) {
    return raw as HealthReportScope;
  }
  return "all";
}

function parseIncludeMetrics(raw: unknown): boolean {
  return raw === true || raw === "true" || raw === 1 || raw === "1";
}

// ─────────────────────────────────────────────────────────────────────────────
// Main skill
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Execute the `health-report` A2A skill.
 *
 * The returned `A2ASkillResult.artifacts[0].content` is a JSON-encoded
 * `HealthReport`. The `metadata` field carries the same JSON as
 * `content` for clients that prefer typed metadata.
 */
export async function executeHealthReport(
  task: A2ATask,
  deps: HealthReportDeps = {},
): Promise<A2ASkillResult> {
  const metadata = task.metadata ?? {};
  const scope = parseScope(metadata["scope"]);
  const includeMetrics = parseIncludeMetrics(metadata["includeMetrics"]);

  // Collect each requested section. We always run all five collectors (they
  // are cheap and isolated to filesystem + module-level constants); the
  // scope filter happens after rollup.
  const a2aRaw = (deps.collectA2A ?? defaultCollectA2A)();
  const mcpRaw = (deps.collectMCP ?? defaultCollectMCP)();
  const dbRaw = (deps.collectDB ?? defaultCollectDB)();
  const providersRaw = (deps.collectProviders ?? defaultCollectProviders)();
  const bifrostRaw = (deps.collectBifrost ?? defaultCollectBifrost)();

  const a2aSection: HealthReportSection<A2ASectionDetails> = {
    status: deriveStatus("a2a", a2aRaw),
    details: a2aRaw.details as A2ASectionDetails,
    warnings: a2aRaw.warnings,
  };
  const mcpSection: HealthReportSection<MCPSectionDetails> = {
    status: deriveStatus("mcp", mcpRaw),
    details: mcpRaw.details as MCPSectionDetails,
    warnings: mcpRaw.warnings,
  };
  const dbSection: HealthReportSection<DBSectionDetails> = {
    status: deriveStatus("db", dbRaw),
    details: dbRaw.details as DBSectionDetails,
    warnings: dbRaw.warnings,
  };
  const providersSection: HealthReportSection<ProvidersSectionDetails> = {
    status: deriveStatus("providers", providersRaw),
    details: providersRaw.details as ProvidersSectionDetails,
    warnings: providersRaw.warnings,
  };
  const bifrostSection: HealthReportSection<BifrostSectionDetails> = {
    status: deriveStatus("bifrost", bifrostRaw),
    details: bifrostRaw.details as BifrostSectionDetails,
    warnings: bifrostRaw.warnings,
  };

  const allSections = {
    a2a: a2aSection,
    mcp: mcpSection,
    db: dbSection,
    providers: providersSection,
    bifrost: bifrostSection,
  } as const;

  // Apply scope filter.
  let includedSections: Partial<typeof allSections> = allSections;
  if (scope !== "all") {
    includedSections = {
      [scope]: allSections[scope],
    } as Partial<typeof allSections>;
  }

  // Roll up overall from the included sections only.
  const includedStatuses = Object.values(includedSections).map((s) => s.status);
  const overall = rollup(includedStatuses);

  const report: HealthReport = {
    overall,
    generatedAt: new Date().toISOString(),
    scope,
    sections: includedSections,
  };

  if (includeMetrics) {
    const metricsCollector = deps.collectMetrics ?? defaultCollectMetrics;
    const metrics = metricsCollector();
    // Only attach metrics for sections actually included in the report.
    const filtered: Partial<Record<HealthReportSectionKey, SectionMetrics>> = {};
    for (const key of Object.keys(includedSections) as HealthReportSectionKey[]) {
      if (metrics[key] !== undefined) filtered[key] = metrics[key] ?? null;
    }
    report.metrics = filtered;
  }

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify(report),
      },
    ],
    metadata: {
      health_report: report,
      scope,
      overall,
    },
  };
}
