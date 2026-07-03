/**
 * Router eval CLI (F0.2).
 *
 * Supports:
 * - JSONL replay: `--input /path/to/file.jsonl` or `--input -` for stdin
 * - SQLite replay: `--db /path/to/data-dir` (reads call_logs from storage.sqlite)
 * - Windowing: `--since`, `--limit`
 * - Baseline compare + regression gate: `--baseline-input`, `--baseline-db`,
 *   `--fail-on-regression`
 * - Artifact write: `--out /path/to/report.md` or `--json --out /path/to/report.json`
 */

import fs from "node:fs";
import path from "node:path";

import {
  aggregateRouterObservations,
  compareRouterEvalRuns,
  formatRouterEvalComparison,
  formatRouterEvalReport,
  parseObservation,
  type RouterEvalObservation,
  type RouterEvalReport,
} from "../../src/lib/routerEval/index.ts";
import { SQLITE_FILE } from "../../src/lib/db/core.ts";
import { openDatabaseAsync } from "../../src/lib/db/adapters/driverFactory.ts";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

type DbReplaySource = "auto" | "call-logs" | "usage-history";

type CliArgs = {
  input?: string;
  baselineInput?: string;
  db?: string;
  baselineDb?: string;
  dbSource?: DbReplaySource;
  baselineDbSource?: DbReplaySource;
  since?: string;
  limit?: string;
  provider?: string;
  model?: string;
  out?: string;
  json?: boolean;
  failOnRegression?: boolean;
  help?: boolean;
};

type LoadResult = {
  source: string;
  report: RouterEvalReport;
  observations: RouterEvalObservation[];
};

function parseCliArgs(argv: string[]): CliArgs {
  const parsed: CliArgs = {};
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const [key, inlineValue] = arg.slice(2).split("=", 2);
    const nextValue = argv[index + 1];
    const getValue = (defaultValue = "") => {
      if (inlineValue != null && inlineValue.length > 0) return inlineValue;
      if (!nextValue || nextValue.startsWith("--")) return defaultValue;
      index++;
      return nextValue;
    };

    if (key === "help") {
      parsed.help = true;
    } else if (key === "input") {
      parsed.input = getValue(undefined);
    } else if (key === "baseline-input") {
      parsed.baselineInput = getValue(undefined);
    } else if (key === "db") {
      parsed.db = getValue(undefined);
    } else if (key === "baseline-db") {
      parsed.baselineDb = getValue(undefined);
    } else if (key === "db-source") {
      parsed.dbSource = parseReplaySource(getValue(""));
    } else if (key === "baseline-db-source") {
      parsed.baselineDbSource = parseReplaySource(getValue(""));
    } else if (key === "since") {
      parsed.since = getValue("");
    } else if (key === "limit") {
      parsed.limit = getValue("");
    } else if (key === "provider") {
      parsed.provider = getValue("");
    } else if (key === "model") {
      parsed.model = getValue("");
    } else if (key === "out" || key === "output") {
      parsed.out = getValue("");
    } else if (key === "json") {
      parsed.json = true;
    } else if (key === "fail-on-regression") {
      parsed.failOnRegression = true;
    }
  }
  return parsed;
}

function usage(): string {
  return [
    "omniroute eval:router",
    "",
    "Usage:",
    "  bun scripts/router-eval/index.ts --input <jsonl|->",
    "  bun scripts/router-eval/index.ts --db [DATA_DIR|storage.sqlite] [--db-source <source>] [--since <ts>] [--limit <n>]",
    "  bun scripts/router-eval/index.ts --input <candidate> --baseline-input <baseline> --fail-on-regression",
    "",
    "Options:",
    "  --input             JSONL source (or - for stdin)",
    "  --baseline-input     JSONL baseline for regression compare",
    "  --db                 Offline replay from DATA_DIR/storage.sqlite or a SQLite file",
    "  --db-source          auto, call-logs, or usage-history (default: auto)",
    "  --baseline-db        DB baseline source",
    "  --baseline-db-source auto, call-logs, or usage-history (default: auto)",
    "  --since              Optional ISO timestamp filter for DB replay",
    "  --limit              Max rows for DB replay",
    "  --provider           Exact provider filter for DB replay",
    "  --model              Exact model filter for DB replay",
    "  --out, --output      Write report to file",
    "  --json               Emit a machine-readable JSON artifact",
    "  --fail-on-regression Exit non-zero when candidate AIQ drops or frontier shrinks",
  ].join("\n");
}

async function readJsonlFromStdinOrFile(inputPath: string): Promise<unknown[]> {
  const payload = inputPath === "-"
    ? fs.readFileSync(0, "utf8")
    : fs.readFileSync(inputPath, "utf8");
  const lines = payload.trim().split("\n").filter((line) => line.trim().length > 0);
  const entries: unknown[] = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    try {
      entries.push(JSON.parse(line));
    } catch (error) {
      throw new Error(`Failed to parse JSONL line ${index + 1}: ${(error as Error).message}`);
    }
  }
  return entries;
}

function coerceLimit(limit: string | undefined): number | undefined {
  if (!limit) return undefined;
  const parsed = Number(limit);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return Math.trunc(parsed);
}

function parseReplaySource(rawSource?: string): DbReplaySource {
  if (!rawSource) return "auto";
  const normalized = rawSource.toLowerCase();
  if (normalized === "auto") return "auto";
  if (normalized === "usage-history" || normalized === "usage_history") return "usage-history";
  if (normalized === "call-logs" || normalized === "call_logs") return "call-logs";
  throw new Error(`Unsupported db source: ${rawSource}`);
}

function toObservationsFromRows(rows: unknown[], fallbackConfigId: string): RouterEvalObservation[] {
  return rows.map((row) => parseObservation(row, fallbackConfigId));
}

function resolveSqliteFile(dbPath?: string): string {
  if (!dbPath) {
    if (!SQLITE_FILE) throw new Error("No SQLITE_FILE and no --db path provided");
    return SQLITE_FILE;
  }
  return dbPath.endsWith(".sqlite")
    ? path.resolve(dbPath)
    : path.join(path.resolve(dbPath), "storage.sqlite");
}

function hasReplayTable(db: SqliteAdapter, tableName: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName)
  );
}

function getTableColumns(db: SqliteAdapter, tableName: string): Set<string> {
  const rows = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name?: string }>;
  return new Set(rows.map((row) => row.name).filter((name): name is string => typeof name === "string"));
}

function selectColumn(columns: Set<string>, column: string, alias = column): string {
  return columns.has(column) ? column : `NULL AS ${alias}`;
}

function resolveReplaySource(db: SqliteAdapter, requestedSource: DbReplaySource): DbReplaySource {
  const hasCallLogs = hasReplayTable(db, "call_logs");
  const hasUsageHistory = hasReplayTable(db, "usage_history");

  if (requestedSource === "call-logs") {
    if (!hasCallLogs) throw new Error("Table 'call_logs' missing in database");
    return "call-logs";
  }
  if (requestedSource === "usage-history") {
    if (!hasUsageHistory) throw new Error("Table 'usage_history' missing in database");
    return "usage-history";
  }
  if (hasCallLogs) return "call-logs";
  if (hasUsageHistory) return "usage-history";
  throw new Error("No replay table found in database (expected call_logs or usage_history)");
}

function estimateCost(tokensIn: unknown, tokensOut: unknown): number | null {
  const input = typeof tokensIn === "number" ? tokensIn : 0;
  const output = typeof tokensOut === "number" ? tokensOut : 0;
  const total = input + output;
  return total > 0 ? Number((total * 0.000001).toFixed(6)) : null;
}

function addSharedDbFilters(
  queryParts: string[],
  params: unknown[],
  options: { since?: string; provider?: string; model?: string },
  modelColumns: string[],
  tableColumns: Set<string>
): void {
  if (options.since && tableColumns.has("timestamp")) {
    queryParts.push("AND timestamp >= ?");
    params.push(options.since);
  }
  if (options.provider && tableColumns.has("provider")) {
    queryParts.push("AND provider = ?");
    params.push(options.provider);
  }
  if (options.model) {
    const availableModelColumns = modelColumns.filter((column) => tableColumns.has(column));
    if (availableModelColumns.length > 0) {
      queryParts.push(`AND (${availableModelColumns.map((column) => `${column} = ?`).join(" OR ")})`);
      params.push(...availableModelColumns.map(() => options.model));
    }
  }
}

function readCallLogDb(
  db: SqliteAdapter,
  options: { since?: string; limit?: string; provider?: string; model?: string }
): RouterEvalObservation[] {
  const columns = getTableColumns(db, "call_logs");
  const params: unknown[] = [];
  const queryParts = [
    `SELECT ${[
      "id",
      selectColumn(columns, "model"),
      selectColumn(columns, "requested_model"),
      selectColumn(columns, "combo_name"),
      selectColumn(columns, "provider"),
      selectColumn(columns, "status"),
      selectColumn(columns, "duration"),
      selectColumn(columns, "tokens_in"),
      selectColumn(columns, "tokens_out"),
      selectColumn(columns, "error_summary"),
    ].join(", ")}`,
    "FROM call_logs",
    "WHERE 1=1",
  ];
  addSharedDbFilters(queryParts, params, options, ["model", "requested_model"], columns);
  queryParts.push(columns.has("timestamp") ? "ORDER BY timestamp ASC" : "ORDER BY id ASC");
  const limitValue = coerceLimit(options.limit);
  if (limitValue) {
    queryParts.push("LIMIT ?");
    params.push(limitValue);
  }

  const logs = db.prepare(queryParts.join(" ")).all(...params) as Array<{
    id: string | number;
    model: string | null;
    requested_model: string | null;
    combo_name: string | null;
    provider: string | null;
    status: number | null;
    duration: number | null;
    tokens_in: number | null;
    tokens_out: number | null;
    error_summary: string | null;
  }>;

  return toObservationsFromRows(
    logs.map((log) => ({
      sampleId: String(log.id),
      configId: log.combo_name ?? log.provider ?? "default",
      expected_model: log.requested_model ?? null,
      selected_model: log.model ?? null,
      latencyMs: log.duration ?? null,
      costUsd: estimateCost(log.tokens_in, log.tokens_out),
      success: log.status != null && log.status >= 200 && log.status < 300 && !log.error_summary,
      status: log.status ?? null,
    })),
    "default"
  );
}

function readUsageHistoryDb(
  db: SqliteAdapter,
  options: { since?: string; limit?: string; provider?: string; model?: string }
): RouterEvalObservation[] {
  const columns = getTableColumns(db, "usage_history");
  const params: unknown[] = [];
  const queryParts = [
    `SELECT ${[
      "id",
      selectColumn(columns, "provider"),
      selectColumn(columns, "model"),
      selectColumn(columns, "tokens_input"),
      selectColumn(columns, "tokens_output"),
      selectColumn(columns, "status"),
      selectColumn(columns, "success"),
      selectColumn(columns, "latency_ms"),
      selectColumn(columns, "combo_strategy"),
    ].join(", ")}`,
    "FROM usage_history",
    "WHERE 1=1",
  ];
  addSharedDbFilters(queryParts, params, options, ["model"], columns);
  queryParts.push(columns.has("timestamp") ? "ORDER BY timestamp ASC" : "ORDER BY id ASC");
  const limitValue = coerceLimit(options.limit);
  if (limitValue) {
    queryParts.push("LIMIT ?");
    params.push(limitValue);
  }

  const rows = db.prepare(queryParts.join(" ")).all(...params) as Array<{
    id: string | number;
    provider: string | null;
    model: string | null;
    tokens_input: number | null;
    tokens_output: number | null;
    status: string | number | null;
    success: number | boolean | null;
    latency_ms: number | null;
    combo_strategy: string | null;
  }>;

  return toObservationsFromRows(
    rows.map((row) => ({
      sampleId: String(row.id),
      configId: row.combo_strategy ?? row.provider ?? "default",
      expected_model: row.model ?? null,
      selected_model: row.model ?? null,
      latencyMs: row.latency_ms ?? null,
      costUsd: estimateCost(row.tokens_input, row.tokens_output),
      success: row.success === true || row.success === 1,
      status: row.status,
    })),
    "default"
  );
}

async function loadObservationsFromDb(
  dbPath: string | undefined,
  options: {
    since?: string;
    limit?: string;
    provider?: string;
    model?: string;
    source?: DbReplaySource;
  }
): Promise<RouterEvalObservation[]> {
  const sqliteFile = resolveSqliteFile(dbPath);
  const db = await openDatabaseAsync(sqliteFile, { readonly: true });
  try {
    const activeSource = resolveReplaySource(db, options.source ?? "auto");
    return activeSource === "usage-history"
      ? readUsageHistoryDb(db, options)
      : readCallLogDb(db, options);
  } finally {
    db.close();
  }
}

function buildReportFromSource(args: CliArgs, isBaseline = false): Promise<LoadResult> {
  const source = isBaseline ? (args.baselineInput ?? args.baselineDb) : (args.input ?? args.db);
  if (!source) {
    return Promise.resolve({
      source: isBaseline ? "baseline" : "candidate",
      report: aggregateRouterObservations([]),
      observations: [],
    });
  }

  if (isBaseline ? Boolean(args.baselineDb) : Boolean(args.db)) {
    const dbPath = (isBaseline ? args.baselineDb : args.db) as string;
    return loadDbReport(
      dbPath,
      {
        since: args.since,
        limit: args.limit,
        provider: args.provider,
        model: args.model,
        source: isBaseline ? args.baselineDbSource : args.dbSource,
      },
      source
    );
  }
  return loadJsonlReport(source, isBaseline);
}

async function loadDbReport(
  dbPath: string | undefined,
  options: {
    since?: string;
    limit?: string;
    provider?: string;
    model?: string;
    source?: DbReplaySource;
  },
  source: string
): Promise<LoadResult> {
  const observations = await loadObservationsFromDb(dbPath, options);
  const report = aggregateRouterObservations(observations);
  return { source, report, observations };
}

async function loadJsonlReport(input: string, isBaseline: boolean): Promise<LoadResult> {
  const rows = await readJsonlFromStdinOrFile(input);
  const observations = toObservationsFromRows(rows, isBaseline ? "baseline" : "candidate");
  const report = aggregateRouterObservations(observations);
  return { source: input, report, observations };
}

function fail(message: string): string {
  return `eval:router failed: ${message}\n`;
}

function writeArtifactIfRequested(outPath: string | undefined, output: string): void {
  if (!outPath) return;
  fs.writeFileSync(path.resolve(outPath), output, "utf8");
}

function formatJsonArtifact(payload: unknown): string {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export async function runRouterEvalCli(argv: string[]): Promise<{ code: number; output: string }> {
  const args = parseCliArgs(argv);
  if (args.help) {
    return { code: 0, output: `${usage()}\n` };
  }

  const candidate = await buildReportFromSource({ ...args }, false);
  if (!candidate.report || candidate.observations.length === 0 && !args.baselineInput && !args.baselineDb && !args.db && !args.input) {
    return { code: 2, output: fail("provide --input or --db") };
  }

  if (args.baselineInput || args.baselineDb) {
    if ((args.db && args.baselineDb && path.resolve(args.db) !== path.resolve(args.baselineDb)) &&
      args.since == null) {
      return {
        code: 2,
        output: fail("--baseline-db must point to the same DB as --db for this implementation"),
      };
    }

    const baseline = await buildReportFromSource({ ...args, input: args.baselineInput }, true);
    const comparison = compareRouterEvalRuns(candidate.report, baseline.report);
    const output = args.json
      ? formatJsonArtifact({
          kind: "router-eval-comparison",
          candidateSource: candidate.source,
          baselineSource: baseline.source,
          comparison,
        })
      : formatRouterEvalComparison(comparison);
    writeArtifactIfRequested(args.out, output);
    if (args.failOnRegression && comparison.regressed) {
      return { code: 2, output };
    }
    return { code: 0, output };
  }

  const report = args.json
    ? formatJsonArtifact({
        kind: "router-eval-report",
        source: candidate.source,
        report: candidate.report,
      })
    : formatRouterEvalReport(candidate.report);
  writeArtifactIfRequested(args.out, report);
  return { code: 0, output: report };
}

async function main() {
  const result = await runRouterEvalCli(process.argv.slice(2));
  process.stdout.write(result.output);
  if (result.code !== 0) process.exitCode = result.code;
}

if (import.meta.url === new URL(process.argv[1] ?? "", "file:///").href) {
  void main();
}

export { parseCliArgs, buildReportFromSource, formatRouterEvalReport, formatRouterEvalComparison };
