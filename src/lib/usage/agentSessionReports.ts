/**
 * Team reports for the management dashboard: usage, tokens and cost of coding-agent sessions,
 * rolled up by member (API key), project, provider, model, account and day.
 *
 * Cost is priced from each request slice at read time. Pricing is linear in tokens, so pricing
 * a summed slice equals summing per-request prices (the same approach as usage analytics).
 */

import { getDbInstance } from "@/lib/db/core";
import type { SqliteAdapter } from "@/lib/db/adapters/types";
import {
  listAgentSessionUsageSlices,
  type AgentSessionReportFilter,
  type AgentSessionUsageSlice,
} from "@/lib/db/agentSessionReports";
import { listAgentSessions, type AgentSessionRecord } from "@/lib/db/agentSessions";
import { calculateCostDetailed } from "./costCalculator";

export type { AgentSessionReportFilter };

export interface ReportTotals {
  requests: number;
  errors: number;
  unpricedRequests: number;
  costUsd: number;
  tokens: {
    input: number;
    output: number;
    cacheRead: number;
    cacheCreation: number;
    reasoning: number;
    total: number;
  };
  sessions: number;
  members: number;
  projects: number;
  lastSeenAt: string | null;
}

export interface ReportBreakdownRow extends ReportTotals {
  key: string;
  /** Display name when one is known (API key name, account label); null means "use the key". */
  label: string | null;
  /** Secondary text: project repo, or the account's provider. */
  detail: string | null;
}

export const REPORT_DIMENSIONS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "accounts",
  "daily",
] as const;
export type ReportDimension = (typeof REPORT_DIMENSIONS)[number];

export interface AgentSessionReport {
  totals: ReportTotals;
  breakdowns: Record<ReportDimension, ReportBreakdownRow[]>;
}

type PricedSlice = AgentSessionUsageSlice & { costUsd: number; priced: boolean };
type RowIdentity = Pick<ReportBreakdownRow, "key" | "label" | "detail">;

const DIMENSION_IDENTITY: Record<ReportDimension, (slice: PricedSlice) => RowIdentity> = {
  members: (s) => ({ key: s.apiKeyId ?? "", label: s.apiKeyName, detail: null }),
  projects: (s) => ({ key: s.projectName ?? "", label: null, detail: s.projectRepo }),
  clients: (s) => ({ key: s.client ?? "", label: null, detail: null }),
  providers: (s) => ({ key: s.provider ?? "", label: null, detail: null }),
  models: (s) => ({ key: s.model ?? "", label: null, detail: null }),
  accounts: (s) => ({ key: s.connectionId ?? "", label: s.accountLabel, detail: s.provider }),
  daily: (s) => ({ key: s.day, label: null, detail: null }),
};

class TotalsAccumulator {
  private requests = 0;
  private errors = 0;
  private unpricedRequests = 0;
  private costUsd = 0;
  private tokens = { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 };
  private sessions = new Set<string>();
  private members = new Set<string>();
  private projects = new Set<string>();
  private lastSeenAt: string | null = null;

  add(slice: PricedSlice): void {
    this.requests += slice.requests;
    this.errors += slice.errors;
    if (!slice.priced) this.unpricedRequests += slice.requestsWithTokens;
    this.costUsd += slice.costUsd;
    for (const field of Object.keys(this.tokens) as Array<keyof typeof this.tokens>) {
      this.tokens[field] += slice.tokens[field];
    }
    this.sessions.add(slice.sessionId);
    this.members.add(slice.apiKeyId ?? "");
    this.projects.add(slice.projectName ?? "");
    if (!this.lastSeenAt || slice.lastSeenAt > this.lastSeenAt) this.lastSeenAt = slice.lastSeenAt;
  }

  toTotals(): ReportTotals {
    // Stored input already includes cache reads and writes; adding them again double counts.
    const { input, output } = this.tokens;
    return {
      requests: this.requests,
      errors: this.errors,
      unpricedRequests: this.unpricedRequests,
      costUsd: Number(this.costUsd.toFixed(6)),
      tokens: { ...this.tokens, total: input + output },
      sessions: this.sessions.size,
      members: this.members.size,
      projects: this.projects.size,
      lastSeenAt: this.lastSeenAt,
    };
  }
}

async function priceSlice(slice: AgentSessionUsageSlice): Promise<PricedSlice> {
  const { costUsd, priced } = await calculateCostDetailed(
    slice.provider || "",
    slice.model || "",
    slice.tokens,
    { provider: slice.provider, model: slice.model, serviceTier: slice.serviceTier }
  );
  return { ...slice, costUsd, priced };
}

function breakdownBy(dimension: ReportDimension, slices: PricedSlice[]): ReportBreakdownRow[] {
  const groups = new Map<string, { identity: RowIdentity; totals: TotalsAccumulator }>();
  for (const slice of slices) {
    const identity = DIMENSION_IDENTITY[dimension](slice);
    let group = groups.get(identity.key);
    if (!group) {
      group = { identity, totals: new TotalsAccumulator() };
      groups.set(identity.key, group);
    }
    group.totals.add(slice);
  }
  const rows = [...groups.values()].map(({ identity, totals }) => ({
    ...identity,
    ...totals.toTotals(),
  }));
  if (dimension === "daily") return rows.sort((a, b) => a.key.localeCompare(b.key));
  return rows.sort((a, b) => b.costUsd - a.costUsd || b.tokens.total - a.tokens.total);
}

export async function buildAgentSessionReport(
  filter: AgentSessionReportFilter = {},
  db: SqliteAdapter = getDbInstance()
): Promise<AgentSessionReport> {
  const slices = await Promise.all(listAgentSessionUsageSlices(db, filter).map(priceSlice));
  const totals = new TotalsAccumulator();
  for (const slice of slices) totals.add(slice);

  const breakdowns = Object.fromEntries(
    REPORT_DIMENSIONS.map((dimension) => [dimension, breakdownBy(dimension, slices)])
  ) as Record<ReportDimension, ReportBreakdownRow[]>;

  return { totals: totals.toTotals(), breakdowns };
}

const SESSION_EXPORT_PAGE_SIZE = 100;
/** Bounds one CSV download; narrower filters export the rest. */
export const SESSION_EXPORT_MAX_ROWS = 10_000;

export function listAgentSessionsForExport(
  filter: AgentSessionReportFilter,
  db: SqliteAdapter = getDbInstance()
): AgentSessionRecord[] {
  const sessions: AgentSessionRecord[] = [];
  while (sessions.length < SESSION_EXPORT_MAX_ROWS) {
    const page = listAgentSessions(db, {
      ...filter,
      limit: SESSION_EXPORT_PAGE_SIZE,
      offset: sessions.length,
    });
    sessions.push(...page.sessions);
    if (page.sessions.length < SESSION_EXPORT_PAGE_SIZE) break;
  }
  return sessions;
}

// Leading =, +, -, @, tab or CR make spreadsheets evaluate a cell as a formula; project and
// key names come from client headers, so they are untrusted.
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (typeof value === "string" && FORMULA_PREFIX.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function breakdownToCsv(rows: ReportBreakdownRow[]): string {
  return toCsv(
    [
      "key",
      "label",
      "detail",
      "sessions",
      "members",
      "projects",
      "requests",
      "errors",
      "tokens_input",
      "tokens_output",
      "tokens_cache_read",
      "tokens_cache_creation",
      "tokens_reasoning",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "last_seen_at",
    ],
    rows.map((r) => [
      r.key,
      r.label,
      r.detail,
      r.sessions,
      r.members,
      r.projects,
      r.requests,
      r.errors,
      r.tokens.input,
      r.tokens.output,
      r.tokens.cacheRead,
      r.tokens.cacheCreation,
      r.tokens.reasoning,
      r.tokens.total,
      r.costUsd,
      r.unpricedRequests,
      r.lastSeenAt,
    ])
  );
}

export function sessionsToCsv(sessions: AgentSessionRecord[]): string {
  return toCsv(
    [
      "session_id",
      "api_key_id",
      "api_key_name",
      "client",
      "project_name",
      "project_repo",
      "project_path",
      "git_branch",
      "requests",
      "errors",
      "tokens_total",
      "cost_usd",
      "unpriced_requests",
      "last_provider",
      "last_model",
      "first_seen_at",
      "last_seen_at",
    ],
    sessions.map((s) => [
      s.id,
      s.apiKeyId,
      s.apiKeyName,
      s.client,
      s.projectName,
      s.projectRepo,
      s.projectPath,
      s.gitBranch,
      s.requestCount,
      s.errorCount,
      s.tokens.total,
      s.costUsd,
      s.unpricedCount,
      s.lastProvider,
      s.lastModel,
      s.firstSeenAt,
      s.lastSeenAt,
    ])
  );
}
