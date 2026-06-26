/**
 * ChaosReport — structured result of a chaos suite run.
 *
 * The runner collects one ScenarioResult per scenario plus a top-level
 * summary. renderMarkdown produces a human-readable version that lands
 * in stdout and (optionally) docs/chaos/last-run.md so reviewers can
 * read the failure mode at a glance.
 *
 * @module tests/chaos/report
 */
import type { InvariantResult } from "./invariants.ts";

export interface ScenarioEvent {
  at: number;
  kind: string;
  host: string;
  detail?: Record<string, unknown>;
}

export interface ScenarioResult {
  /** scenario id, e.g. "01-provider-500" */
  id: string;
  /** one-line human title */
  title: string;
  /** did the scenario's own assertions all pass? */
  ok: boolean;
  /** wall-clock duration in ms */
  durationMs: number;
  /** any error thrown by the scenario itself (e.g. setup failure) */
  error?: { message: string; stack?: string; traceId?: string };
  /** every fault event emitted by the injectors in this scenario */
  events: ScenarioEvent[];
  /** trace ids of every error captured during the scenario */
  errorTraceIds: string[];
  /** which invariants were checked and which (if any) failed */
  invariants: InvariantResult[];
  /** scenario-specific assertions captured as a key→outcome map */
  assertions: Record<string, { ok: boolean; detail?: string }>;
}

export interface ChaosReport {
  /** ISO timestamp the run started */
  startedAt: string;
  /** ISO timestamp the run finished */
  finishedAt: string;
  /** total wall-clock ms */
  totalDurationMs: number;
  /** one entry per scenario, in execution order */
  scenarios: ScenarioResult[];
  /** top-level counts */
  summary: {
    total: number;
    passed: number;
    failed: number;
    violationCount: number;
  };
  /** overall verdict — `false` if any scenario failed or any invariant violated */
  success: boolean;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Markdown rendering
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Render a ChaosReport as Markdown. Designed to be diff-friendly: stable
 * ordering, no timestamps inside scenario bodies (only at top/bottom),
 * one line per assertion.
 */
export function renderMarkdown(report: ChaosReport): string {
  const lines: string[] = [];
  const verdict = report.success ? "GREEN" : "RED";

  lines.push(`# Chaos Suite Report`);
  lines.push("");
  lines.push(`- **Started**: ${report.startedAt}`);
  lines.push(`- **Finished**: ${report.finishedAt}`);
  lines.push(`- **Duration**: ${report.totalDurationMs} ms`);
  lines.push(`- **Verdict**: ${verdict}`);
  lines.push(`- **Summary**: ${report.summary.passed}/${report.summary.total} scenarios passed, ${report.summary.violationCount} invariant violation(s)`);
  lines.push("");

  for (const s of report.scenarios) {
    const head = s.ok ? "PASS" : "FAIL";
    lines.push(`## ${head} — ${s.id} (${s.durationMs} ms)`);
    lines.push(`*${s.title}*`);
    lines.push("");

    if (s.error) {
      lines.push(`> scenario error: \`${s.error.message}\``);
      if (s.error.traceId) lines.push(`> trace_id: \`${s.error.traceId}\``);
      lines.push("");
    }

    if (Object.keys(s.assertions).length > 0) {
      lines.push("### Assertions");
      lines.push("");
      for (const [name, a] of Object.entries(s.assertions)) {
        const mark = a.ok ? "+" : "-";
        lines.push(`- ${mark} **${name}**${a.detail ? ` — ${a.detail}` : ""}`);
      }
      lines.push("");
    }

    const violations = s.invariants.filter((v) => !v.ok);
    if (violations.length > 0) {
      lines.push("### Invariant violations");
      lines.push("");
      for (const v of violations) {
        lines.push(`- **${v.name}** — ${v.reason}`);
        if (v.traceId) lines.push(`  - trace_id: \`${v.traceId}\``);
      }
      lines.push("");
    }

    if (s.errorTraceIds.length > 0) {
      lines.push("### Error trace ids");
      lines.push("");
      for (const id of s.errorTraceIds) lines.push(`- \`${id}\``);
      lines.push("");
    }

    if (s.events.length > 0) {
      lines.push(`### Fault events (${s.events.length})`);
      lines.push("");
      lines.push("| when | host | kind | detail |");
      lines.push("|------|------|------|--------|");
      for (const e of s.events.slice(0, 25)) {
        lines.push(`| +${e.at - s.events[0].at}ms | ${e.host} | ${e.kind} | ${JSON.stringify(e.detail ?? {})} |`);
      }
      if (s.events.length > 25) lines.push(`| ... | ... | ... | ${s.events.length - 25} more |`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

/* ────────────────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────────────────── */

/** Convert a ChaosReport into a one-line summary for stdout. */
export function renderOneLine(report: ChaosReport): string {
  const verdict = report.success ? "GREEN" : "RED";
  const failed = report.scenarios.filter((s) => !s.ok).map((s) => s.id);
  return `[chaos] ${verdict} ${report.summary.passed}/${report.summary.total} scenarios passed` +
    (failed.length > 0 ? `, failed: ${failed.join(", ")}` : "");
}

/** Build an empty ScenarioResult — used by the runner at scenario start. */
export function newScenarioResult(id: string, title: string): ScenarioResult {
  return {
    id,
    title,
    ok: true,
    durationMs: 0,
    events: [],
    errorTraceIds: [],
    invariants: [],
    assertions: {},
  };
}