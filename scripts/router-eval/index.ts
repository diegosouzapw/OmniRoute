#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import {
  compareRouterEvalRuns,
  createRouterEvalArtifact,
  formatRouterEvalComparison,
  formatRouterEvalReport,
  runRouterEval,
  toRouterObservation,
  type RouterEvalArtifact,
  type RouterEvalArtifactMetadata,
  type RouterObservation,
} from "@/lib/routerEval/index.ts";
import { SQLITE_FILE } from "@/lib/db/core.ts";

type DbCallLogRow = {
  id: string;
  model: string | null;
  requested_model: string | null;
  duration: number | null;
  tokens_in: number | null;
  tokens_out: number | null;
  status: number | null;
  combo_name: string | null;
  provider: string | null;
  error_summary: string | null;
  timestamp: string | null;
  correlation_id: string | null;
};

type DbUsageHistoryRow = {
  id: number;
  provider: string | null;
  model: string | null;
  tokens_input: number | null;
  tokens_output: number | null;
  service_tier: string | null;
  status: string | null;
  success: number | null;
  latency_ms: number | null;
  error_code: string | null;
  combo_strategy: string | null;
  timestamp: string | null;
};

type DbReplaySource = "auto" | "call-logs" | "usage-history";

type SqliteStatement = {
  get: (...params: unknown[]) => unknown;
  all: (...params: unknown[]) => unknown[];
};

type SqliteDatabase = {
  prepare: (sql: string) => SqliteStatement;
  close: () => void;
};

type ArgSpec = {
  input?: string;
  db?: string;
  dbSource?: DbReplaySource;
  baselineInput?: string;
  baselineDb?: string;
  baselineDbSource?: DbReplaySource;
  since?: string;
  limit?: number;
  aiqDrop?: number;
  costIncrease?: number;
  output?: string;
  jsonOutput?: string;
  exportCorpus?: string;
  failOnRegression?: boolean;
  help?: boolean;
};

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) return undefined;
  return value;
}

function getNumericArg(name: string): number | undefined {
  const value = getArgValue(name);
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function getFloatArg(name: string): number | undefined {
  const value = getArgValue(name);
  if (!value) return undefined;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseArgs(): ArgSpec {
  return {
    input: getArgValue("input"),
    db: getArgValue("db"),
    dbSource: parseReplaySource(getArgValue("db-source")),
    baselineInput: getArgValue("baseline-input"),
    baselineDb: getArgValue("baseline-db"),
    baselineDbSource: parseReplaySource(getArgValue("baseline-db-source")),
    since: getArgValue("since"),
    limit: getNumericArg("limit"),
    aiqDrop: getFloatArg("max-aiq-drop"),
    costIncrease: getFloatArg("max-cost-increase"),
    output: getArgValue("output"),
    jsonOutput: getArgValue("json-output"),
    exportCorpus: getArgValue("export-corpus"),
    failOnRegression: process.argv.includes("--fail-on-regression"),
    help: process.argv.includes("--help") || process.argv.includes("-h"),
  };
}

function usage() {
  return [
    "Usage:",
    "  npm run eval:router -- --input <file.ndjson> [--since <iso>] [--limit <n>]",
    "  npm run eval:router -- --db [path] [--db-source usage-history|call-logs|auto] [--since <iso>] [--limit <n>]",
    "  npm run eval:router -- --input <candidate> --baseline-input <baseline>",
    "  npm run eval:router -- --db <path> --db-source usage-history",
    "       [--max-aiq-drop <n>] [--max-cost-increase <n>] [--fail-on-regression]",
    "",
    "Options:",
    "  --input <path>           JSONL observation corpus (or omit for stdin)",
    "  --db [path]              Read SQLite rows from the routing-replay source",
    "  --db-source <auto|call-logs|usage-history>  Source for --db reads (default: auto => call-logs then usage-history)",
    "  --baseline-input <path>   Baseline corpus in JSONL",
    "  --baseline-db <path>      Baseline corpus in SQLite",
    "  --baseline-db-source <auto|call-logs|usage-history>  Source for baseline DB reads",
    "  --since <ISO8601>        Filter rows newer than this value",
    "  --limit <n>              Limit sample count",
    "  --max-aiq-drop <n>       Regression threshold (default: 0)",
    "  --max-cost-increase <n>   Relative increase threshold (default: 0)",
    "  --output <path>          Write report to file",
    "  --json-output <path>     Write machine-readable artifact JSON",
    "  --export-corpus <path>   Write normalized RouterObservation JSONL",
    "  --fail-on-regression      Exit 1 if candidate regresses vs baseline",
  ].join("\n");
}

function parseInputLine(rawLine: string): RouterObservation | null {
  const trimmed = rawLine.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    return toRouterObservation(parsed);
  } catch {
    return null;
  }
}

async function readJsonl(inputPath?: string): Promise<RouterObservation[]> {
  let text: string;
  if (!inputPath) {
    text = await new Response(process.stdin, { duplex: "half" }).text();
  } else {
    text = await fs.promises.readFile(path.resolve(inputPath), "utf8");
  }

  const observations: RouterObservation[] = [];
  for (const line of text.split(/\r?\n/)) {
    const parsed = parseInputLine(line);
    if (parsed) observations.push(parsed);
  }
  return observations;
}

function estimateCost(tokensIn: unknown, tokensOut: unknown): number {
  const inTokens = typeof tokensIn === "number" ? tokensIn : 0;
  const outTokens = typeof tokensOut === "number" ? tokensOut : 0;
  return Number(((inTokens + outTokens) * 0.000001).toFixed(6));
}

function parseReplaySource(rawSource?: string): DbReplaySource {
  if (!rawSource) return "auto";
  const normalized = rawSource.toLowerCase();
  if (normalized === "auto") return "auto";
  if (normalized === "usage_history" || normalized === "usage-history") return "usage-history";
  if (normalized === "call_logs" || normalized === "call-logs") return "call-logs";
  throw new Error(`Unsupported db source: ${rawSource}`);
}

function hasReplayTable(database: SqliteDatabase, tableName: string): boolean {
  return Boolean(
    database.prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name=?").get(tableName)
  );
}

function resolveReplaySource(
  database: SqliteDatabase,
  requestedSource: DbReplaySource
): DbReplaySource {
  const hasUsageHistory = hasReplayTable(database, "usage_history");
  const hasCallLogs = hasReplayTable(database, "call_logs");

  if (requestedSource === "usage-history") {
    if (!hasUsageHistory) throw new Error("Table 'usage_history' missing in database");
    return "usage-history";
  }

  if (requestedSource === "call-logs") {
    if (!hasCallLogs) throw new Error("Table 'call_logs' missing in database");
    return "call-logs";
  }

  if (requestedSource === "auto") {
    if (hasCallLogs) return "call-logs";
    if (hasUsageHistory) return "usage-history";
  }

  throw new Error("No replay table found in database (expected usage_history or call_logs)");
}

function toSuccessFromStatus(status: unknown): boolean {
  if (typeof status === "number") return status >= 200 && status < 400;
  if (typeof status === "string") {
    const parsed = Number.parseInt(status, 10);
    if (Number.isFinite(parsed)) return parsed >= 200 && parsed < 400;
    const normalized = status.trim().toLowerCase();
    if (normalized === "ok" || normalized === "success" || normalized === "true") return true;
  }
  return false;
}

function readCallLogDb(db: SqliteDatabase, since?: string, limit?: number): RouterObservation[] {
  const queryParts = [
    "SELECT id, model, requested_model, duration, tokens_in, tokens_out, status, combo_name, provider, error_summary, timestamp, correlation_id",
    "FROM call_logs",
    "WHERE 1=1",
  ];
  const params: unknown[] = [];

  if (since) {
    queryParts.push("AND timestamp >= ?");
    params.push(since);
  }

  queryParts.push("ORDER BY timestamp ASC");
  if (limit) {
    queryParts.push("LIMIT ?");
    params.push(limit);
  }

  const rows = db.prepare(queryParts.join(" ")).all(...params) as DbCallLogRow[];

  const observations: RouterObservation[] = [];
  for (const row of rows) {
    const mapped = toRouterObservation({
      sampleId: row.id,
      model: row.model,
      requestedModel: row.requested_model,
      latency: row.duration ?? 0,
      costUsd: estimateCost(row.tokens_in, row.tokens_out),
      configId: row.combo_name || row.provider || "default",
      success: row.status != null && row.status >= 200 && row.status < 400,
      status: row.status ?? 0,
      error: row.error_summary,
      routeInput: {
        correlationId: row.correlation_id ?? "",
      },
      timestamp: row.timestamp ?? new Date().toISOString(),
    });
    if (mapped) observations.push(mapped);
  }
  return observations;
}

function readUsageHistoryDb(
  db: SqliteDatabase,
  since?: string,
  limit?: number
): RouterObservation[] {
  const queryParts = [
    "SELECT id, provider, model, tokens_input, tokens_output, service_tier, status, success, latency_ms, error_code, combo_strategy, timestamp",
    "FROM usage_history",
    "WHERE 1=1",
  ];
  const params: unknown[] = [];

  if (since) {
    queryParts.push("AND timestamp >= ?");
    params.push(since);
  }

  queryParts.push("ORDER BY timestamp ASC");
  if (limit) {
    queryParts.push("LIMIT ?");
    params.push(limit);
  }

  const rows = db.prepare(queryParts.join(" ")).all(...params) as DbUsageHistoryRow[];

  const observations: RouterObservation[] = [];
  for (const row of rows) {
    const cost = estimateCost(row.tokens_input, row.tokens_output);
    const rowId = `${row.id}`;
    const mapped = toRouterObservation({
      sampleId: rowId,
      model: row.model,
      requestedModel: row.model,
      latency: row.latency_ms ?? 0,
      costUsd: cost,
      configId: row.combo_strategy || row.provider || "default",
      success: toSuccessFromStatus(row.status) || row.success === 1,
      status: row.success === 1 ? 200 : 0,
      routeInput: {},
      metadata: {
        provider: row.provider,
        serviceTier: row.service_tier,
        errorCode: row.error_code,
      },
      timestamp: row.timestamp ?? new Date().toISOString(),
    });
    if (mapped) observations.push(mapped);
  }
  return observations;
}

async function openSqliteDatabase(sqliteFile: string): Promise<SqliteDatabase> {
  if ("Bun" in globalThis) {
    const sqlite = await import("bun:sqlite");
    return new sqlite.Database(sqliteFile, { readonly: true });
  }

  const sqlite = await import("better-sqlite3");
  return new sqlite.default(sqliteFile, { readonly: true });
}

async function readDb(
  filePath: string,
  since?: string,
  limit?: number,
  source: DbReplaySource = "auto"
): Promise<RouterObservation[]> {
  const sqliteFile = filePath || SQLITE_FILE;
  if (!sqliteFile) throw new Error("SQLite mode requires a path or SQLITE_FILE");
  const db = await openSqliteDatabase(sqliteFile);
  try {
    const normalized = parseReplaySource(source);
    const activeSource = resolveReplaySource(db, normalized);
    if (activeSource === "usage-history") {
      return readUsageHistoryDb(db, since, limit);
    }
    return readCallLogDb(db, since, limit);
  } finally {
    db.close();
  }
}

function resolveDbPath(rawArg?: string): string {
  if (rawArg) return path.resolve(rawArg);
  if (SQLITE_FILE) return SQLITE_FILE;
  throw new Error("No SQLITE_FILE and no --db path provided");
}

function describeInputSource(
  inputPath: string | undefined,
  dbPath: string | undefined,
  dbSource: DbReplaySource | undefined,
  usesDb: boolean
): { source: string; path?: string; dbSource?: string } {
  if (inputPath) return { source: "jsonl", path: path.resolve(inputPath) };
  if (usesDb) {
    return {
      source: "sqlite",
      path: resolveDbPath(dbPath),
      dbSource: dbSource ?? "auto",
    };
  }
  return { source: "stdin" };
}

function buildArtifactMetadata(args: ArgSpec, hasCandidateDb: boolean): RouterEvalArtifactMetadata {
  const hasBaselineDb = Boolean(args.baselineDb);
  return {
    candidate: describeInputSource(args.input, args.db, args.dbSource, hasCandidateDb),
    baseline:
      args.baselineInput || hasBaselineDb
        ? describeInputSource(
            args.baselineInput,
            args.baselineDb,
            args.baselineDbSource,
            hasBaselineDb
          )
        : undefined,
    window: {
      since: args.since,
      limit: args.limit,
    },
    thresholds: {
      maxAiqDrop: args.aiqDrop ?? 0,
      maxCostIncrease: args.costIncrease ?? 0,
    },
    outputs: {
      markdown: args.output ? path.resolve(args.output) : undefined,
      json: args.jsonOutput ? path.resolve(args.jsonOutput) : undefined,
      corpus: args.exportCorpus ? path.resolve(args.exportCorpus) : undefined,
    },
  };
}

async function writeCorpus(pathArg: string, observations: RouterObservation[]): Promise<void> {
  const outPath = path.resolve(pathArg);
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  const lines = observations.map((observation) => JSON.stringify(observation));
  await fs.promises.writeFile(outPath, `${lines.join("\n")}\n`, "utf8");
}

async function run() {
  const args = parseArgs();
  if (args.help) {
    console.log(usage());
    return;
  }

  const hasCandidateDb = Boolean(args.db || process.argv.includes("--db"));
  const candidate: RouterObservation[] = args.input
    ? await readJsonl(args.input)
    : hasCandidateDb
      ? await readDb(resolveDbPath(args.db), args.since, args.limit, args.dbSource)
      : await readJsonl();

  const baseline: RouterObservation[] | undefined = args.baselineInput
    ? await readJsonl(args.baselineInput)
    : args.baselineDb
      ? await readDb(resolveDbPath(args.baselineDb), args.since, args.limit, args.baselineDbSource)
      : undefined;

  if (candidate.length === 0) {
    console.error("No candidate observations found");
    process.exitCode = 2;
    return;
  }

  if (args.exportCorpus) {
    await writeCorpus(args.exportCorpus, candidate);
  }

  const report = runRouterEval(candidate);
  const metadata = buildArtifactMetadata(args, hasCandidateDb);
  let output = formatRouterEvalReport(report);
  let artifact: RouterEvalArtifact = createRouterEvalArtifact(report, metadata);

  if (baseline && baseline.length > 0) {
    const comparison = compareRouterEvalRuns(runRouterEval(baseline), report, {
      aiqDrop: args.aiqDrop ?? 0,
      relativeCostIncrease: args.costIncrease ?? 0,
    });
    output = formatRouterEvalComparison(comparison);
    artifact = createRouterEvalArtifact(comparison, metadata);
    console.log(output);
    if (args.failOnRegression && comparison.regressions.length > 0) {
      process.exitCode = 1;
    }
  } else {
    console.log(output);
  }

  if (args.output) {
    const outPath = path.resolve(args.output);
    await fs.promises.writeFile(outPath, output, "utf8");
  }

  if (args.jsonOutput) {
    const outPath = path.resolve(args.jsonOutput);
    await fs.promises.writeFile(outPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  }
}

run().catch((error) => {
  if (error && typeof error === "object" && "message" in error) {
    console.error((error as Error).message);
  } else {
    console.error(String(error));
  }
  process.exitCode = 1;
});
