import { randomUUID } from "node:crypto";
import { getDbInstance, rowToCamel } from "./core";

export type EvalTargetType = "suite-default" | "model" | "combo";
export type EvalCaseStrategy = "contains" | "exact" | "regex" | "custom";

export interface EvalMessage {
  role: string;
  content: string;
}

export interface EvalCaseRecord {
  id: string;
  suiteId: string;
  name: string;
  model?: string;
  input: {
    messages: EvalMessage[];
    max_tokens?: number;
  };
  expected: {
    strategy: EvalCaseStrategy;
    value?: string;
  };
  tags: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface EvalSuiteRecord {
  id: string;
  name: string;
  description?: string;
  source: "custom";
  caseCount: number;
  cases: EvalCaseRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface EvalTargetDescriptor {
  type: EvalTargetType;
  id: string | null;
  key: string;
  label: string;
}

export interface EvalRunSummary {
  total: number;
  passed: number;
  failed: number;
  passRate: number;
}

export interface PersistedEvalRun {
  id: string;
  runGroupId: string | null;
  suiteId: string;
  suiteName: string;
  target: EvalTargetDescriptor;
  apiKeyId: string | null;
  avgLatencyMs: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs: Record<string, string>;
  createdAt: string;
}

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function hasColumn(db: DbLike, table: string, column: string): boolean {
  const rows = db.prepare<{ name?: string }>(`PRAGMA table_info(${table})`).all();
  return rows.some((row) => row && typeof row.name === "string" && row.name === column);
}

function ensureEvalSuiteTables(db: DbLike) {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS eval_suites (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`
  ).run();

  if (!hasColumn(db, "eval_suites", "description")) {
    db.prepare("ALTER TABLE eval_suites ADD COLUMN description TEXT").run();
  }
  if (!hasColumn(db, "eval_suites", "created_at")) {
    db.prepare("ALTER TABLE eval_suites ADD COLUMN created_at TEXT NOT NULL DEFAULT ''").run();
  }
  if (!hasColumn(db, "eval_suites", "updated_at")) {
    db.prepare("ALTER TABLE eval_suites ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''").run();
  }

  db.prepare(
    `CREATE TABLE IF NOT EXISTS eval_cases (
      id TEXT PRIMARY KEY,
      suite_id TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      model TEXT,
      input_json TEXT NOT NULL,
      expected_strategy TEXT NOT NULL,
      expected_value TEXT,
      tags_json TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`
  ).run();

  if (!hasColumn(db, "eval_cases", "sort_order")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0").run();
  }
  if (!hasColumn(db, "eval_cases", "model")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN model TEXT").run();
  }
  if (!hasColumn(db, "eval_cases", "input_json")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN input_json TEXT NOT NULL DEFAULT '{}'").run();
  }
  if (!hasColumn(db, "eval_cases", "expected_strategy")) {
    db.prepare(
      "ALTER TABLE eval_cases ADD COLUMN expected_strategy TEXT NOT NULL DEFAULT 'contains'"
    ).run();
  }
  if (!hasColumn(db, "eval_cases", "expected_value")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN expected_value TEXT").run();
  }
  if (!hasColumn(db, "eval_cases", "tags_json")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN tags_json TEXT").run();
  }
  if (!hasColumn(db, "eval_cases", "created_at")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN created_at TEXT NOT NULL DEFAULT ''").run();
  }
  if (!hasColumn(db, "eval_cases", "updated_at")) {
    db.prepare("ALTER TABLE eval_cases ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''").run();
  }

  db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_eval_suites_updated_at ON eval_suites(updated_at DESC)"
  ).run();
  db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_eval_cases_suite_order ON eval_cases(suite_id, sort_order ASC, created_at ASC)"
  ).run();
}

function parseJsonRecord(value: unknown): JsonRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonRecord;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as JsonRecord)
      : {};
  } catch {
    return {};
  }
}

function parseJsonArray(value: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(value)) {
    return value.filter(
      (entry): entry is Record<string, unknown> =>
        !!entry && typeof entry === "object" && !Array.isArray(entry)
    );
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter(
          (entry): entry is Record<string, unknown> =>
            !!entry && typeof entry === "object" && !Array.isArray(entry)
        )
      : [];
  } catch {
    return [];
  }
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed
          .filter((entry): entry is string => typeof entry === "string")
          .map((entry) => entry.trim())
          .filter((entry) => entry.length > 0)
      : [];
  } catch {
    return [];
  }
}

function parseMessages(value: unknown): EvalMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return null;
      }
      const row = entry as Record<string, unknown>;
      const role = typeof row.role === "string" ? row.role.trim() : "";
      const content = typeof row.content === "string" ? row.content : "";
      if (!role || !content.trim()) {
        return null;
      }
      return {
        role,
        content,
      } satisfies EvalMessage;
    })
    .filter((entry): entry is EvalMessage => entry !== null);
}

function parseNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sanitizeEvalCaseInput(value: unknown): EvalCaseRecord["input"] {
  const record =
    value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
  const maxTokens = parseNumber(record.max_tokens);
  const input: EvalCaseRecord["input"] = {
    messages: parseMessages(record.messages),
  };

  if (maxTokens > 0) {
    input.max_tokens = Math.floor(maxTokens);
  }

  return input;
}

function sanitizeEvalExpected(value: unknown): EvalCaseRecord["expected"] {
  const record =
    value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
  const strategy = typeof record.strategy === "string" ? record.strategy.trim() : "";
  const normalizedStrategy: EvalCaseStrategy =
    strategy === "exact" || strategy === "regex" || strategy === "custom" ? strategy : "contains";
  const expectedValue =
    typeof record.value === "string" && record.value.trim().length > 0 ? record.value : undefined;

  return {
    strategy: normalizedStrategy,
    ...(expectedValue ? { value: expectedValue } : {}),
  };
}

function createScorecardFromRuns(
  runs: Array<{
    suiteId: string;
    suiteName: string;
    summary: EvalRunSummary;
    results: Array<Record<string, unknown>>;
  }>
) {
  const totalCases = runs.reduce((sum, run) => sum + run.summary.total, 0);
  const totalPassed = runs.reduce((sum, run) => sum + run.summary.passed, 0);

  return {
    suites: runs.length,
    totalCases,
    totalPassed,
    overallPassRate: totalCases > 0 ? Math.round((totalPassed / totalCases) * 100) : 0,
    perSuite: runs.map((run) => ({
      id: run.suiteId,
      name: run.suiteName,
      passRate: run.summary.passRate,
    })),
  };
}

export function serializeEvalTargetKey(type: EvalTargetType, id?: string | null): string {
  return `${type}:${typeof id === "string" && id.trim().length > 0 ? id.trim() : "__default__"}`;
}

function toTargetDescriptor(row: JsonRecord): EvalTargetDescriptor {
  const type = row.targetType;
  const rawId = row.targetId;
  const id = typeof rawId === "string" && rawId.trim().length > 0 ? rawId.trim() : null;
  const normalizedType: EvalTargetType =
    type === "combo" || type === "model" || type === "suite-default" ? type : "suite-default";

  return {
    type: normalizedType,
    id,
    key: serializeEvalTargetKey(normalizedType, id),
    label:
      typeof row.targetLabel === "string" && row.targetLabel.trim().length > 0
        ? row.targetLabel.trim()
        : normalizedType === "combo"
          ? `Combo: ${id || "Unknown"}`
          : normalizedType === "model"
            ? `Model: ${id || "Unknown"}`
            : "Suite defaults",
  };
}

function toPersistedEvalRun(row: unknown): PersistedEvalRun | null {
  const camel = rowToCamel(row) as JsonRecord | null;
  if (!camel) return null;

  const summaryRecord = parseJsonRecord(camel.summaryJson);
  const outputsRecord = parseJsonRecord(camel.outputsJson);
  const outputs = Object.fromEntries(
    Object.entries(outputsRecord)
      .filter((entry): entry is [string, string] => typeof entry[0] === "string")
      .map(([key, value]) => [key, typeof value === "string" ? value : String(value ?? "")])
  );

  return {
    id: typeof camel.id === "string" ? camel.id : "",
    runGroupId:
      typeof camel.runGroupId === "string" && camel.runGroupId.trim().length > 0
        ? camel.runGroupId
        : null,
    suiteId: typeof camel.suiteId === "string" ? camel.suiteId : "",
    suiteName: typeof camel.suiteName === "string" ? camel.suiteName : "",
    target: toTargetDescriptor(camel),
    apiKeyId:
      typeof camel.apiKeyId === "string" && camel.apiKeyId.trim().length > 0
        ? camel.apiKeyId
        : null,
    avgLatencyMs: parseNumber(camel.avgLatencyMs),
    summary: {
      total: parseNumber(summaryRecord.total ?? camel.total),
      passed: parseNumber(summaryRecord.passed ?? camel.passed),
      failed: parseNumber(summaryRecord.failed ?? camel.failed),
      passRate: parseNumber(summaryRecord.passRate ?? camel.passRate),
    },
    results: parseJsonArray(camel.resultsJson),
    outputs,
    createdAt: typeof camel.createdAt === "string" ? camel.createdAt : "",
  };
}

function toEvalCaseRecord(row: unknown): EvalCaseRecord | null {
  const camel = rowToCamel(row) as JsonRecord | null;
  if (!camel) return null;

  const input = sanitizeEvalCaseInput(parseJsonRecord(camel.inputJson));
  const expected = sanitizeEvalExpected({
    strategy: camel.expectedStrategy,
    value: camel.expectedValue,
  });

  return {
    id: typeof camel.id === "string" ? camel.id : "",
    suiteId: typeof camel.suiteId === "string" ? camel.suiteId : "",
    name: typeof camel.name === "string" ? camel.name : "",
    ...(typeof camel.model === "string" && camel.model.trim().length > 0
      ? { model: camel.model.trim() }
      : {}),
    input,
    expected,
    tags: parseStringArray(camel.tagsJson),
    sortOrder: parseNumber(camel.sortOrder),
    createdAt: typeof camel.createdAt === "string" ? camel.createdAt : "",
    updatedAt: typeof camel.updatedAt === "string" ? camel.updatedAt : "",
  };
}

function toEvalSuiteRecord(row: unknown, cases: EvalCaseRecord[]): EvalSuiteRecord | null {
  const camel = rowToCamel(row) as JsonRecord | null;
  if (!camel) return null;

  return {
    id: typeof camel.id === "string" ? camel.id : "",
    name: typeof camel.name === "string" ? camel.name : "",
    ...(typeof camel.description === "string" && camel.description.trim().length > 0
      ? { description: camel.description }
      : {}),
    source: "custom",
    caseCount: cases.length,
    cases,
    createdAt: typeof camel.createdAt === "string" ? camel.createdAt : "",
    updatedAt: typeof camel.updatedAt === "string" ? camel.updatedAt : "",
  };
}

export function saveEvalRun(input: {
  runGroupId?: string | null;
  suiteId: string;
  suiteName: string;
  target: { type: EvalTargetType; id?: string | null; label: string };
  apiKeyId?: string | null;
  avgLatencyMs?: number;
  summary: EvalRunSummary;
  results: Array<Record<string, unknown>>;
  outputs?: Record<string, string>;
  createdAt?: string;
}): PersistedEvalRun {
  const db = getDbInstance() as unknown as DbLike;
  const createdAt = input.createdAt || new Date().toISOString();
  const id = randomUUID();
  const targetId =
    typeof input.target.id === "string" && input.target.id.trim().length > 0
      ? input.target.id.trim()
      : null;
  const avgLatencyMs = Number.isFinite(Number(input.avgLatencyMs))
    ? Math.max(0, Math.round(Number(input.avgLatencyMs)))
    : 0;

  db.prepare(
    `INSERT INTO eval_runs
      (id, run_group_id, suite_id, suite_name, target_type, target_id, target_label, api_key_id,
       pass_rate, total, passed, failed, avg_latency_ms, summary_json, results_json, outputs_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.runGroupId || null,
    input.suiteId,
    input.suiteName,
    input.target.type,
    targetId,
    input.target.label,
    input.apiKeyId || null,
    input.summary.passRate,
    input.summary.total,
    input.summary.passed,
    input.summary.failed,
    avgLatencyMs,
    JSON.stringify(input.summary),
    JSON.stringify(input.results || []),
    JSON.stringify(input.outputs || {}),
    createdAt
  );

  return {
    id,
    runGroupId: input.runGroupId || null,
    suiteId: input.suiteId,
    suiteName: input.suiteName,
    target: {
      type: input.target.type,
      id: targetId,
      key: serializeEvalTargetKey(input.target.type, targetId),
      label: input.target.label,
    },
    apiKeyId: input.apiKeyId || null,
    avgLatencyMs,
    summary: input.summary,
    results: input.results || [],
    outputs: input.outputs || {},
    createdAt,
  };
}

export function listEvalRuns(
  options: {
    suiteId?: string;
    runGroupId?: string;
    limit?: number;
  } = {}
): PersistedEvalRun[] {
  const db = getDbInstance() as unknown as DbLike;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (options.suiteId) {
    conditions.push("suite_id = ?");
    params.push(options.suiteId);
  }

  if (options.runGroupId) {
    conditions.push("run_group_id = ?");
    params.push(options.runGroupId);
  }

  const limit = Number.isFinite(Number(options.limit))
    ? Math.min(200, Math.max(1, Math.floor(Number(options.limit))))
    : 20;
  params.push(limit);

  const sql = `SELECT *
    FROM eval_runs
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""}
    ORDER BY created_at DESC
    LIMIT ?`;
  const rows = db.prepare(sql).all(...params);
  return rows
    .map((row) => toPersistedEvalRun(row))
    .filter((row): row is PersistedEvalRun => row !== null);
}

export function getEvalScorecard(
  options: {
    suiteId?: string;
    limit?: number;
  } = {}
) {
  const runs = listEvalRuns({ suiteId: options.suiteId, limit: options.limit || 50 });
  if (runs.length === 0) return null;

  const latestByScope = new Map<string, PersistedEvalRun>();
  for (const run of runs) {
    const scopeKey = `${run.suiteId}:${run.target.key}`;
    if (!latestByScope.has(scopeKey)) {
      latestByScope.set(scopeKey, run);
    }
  }

  return createScorecardFromRuns(
    Array.from(latestByScope.values()).map((run) => ({
      suiteId: `${run.suiteId}:${run.target.key}`,
      suiteName: `${run.suiteName} · ${run.target.label}`,
      results: run.results,
      summary: run.summary,
    }))
  );
}

export function listCustomEvalSuites(): EvalSuiteRecord[] {
  const db = getDbInstance() as unknown as DbLike;
  ensureEvalSuiteTables(db);
  const suiteRows = db
    .prepare("SELECT * FROM eval_suites ORDER BY updated_at DESC, created_at DESC")
    .all();
  const caseRows = db
    .prepare(
      "SELECT * FROM eval_cases ORDER BY suite_id ASC, sort_order ASC, created_at ASC, id ASC"
    )
    .all();

  const casesBySuite = new Map<string, EvalCaseRecord[]>();
  for (const row of caseRows) {
    const parsed = toEvalCaseRecord(row);
    if (!parsed || !parsed.suiteId) continue;
    const current = casesBySuite.get(parsed.suiteId) || [];
    current.push(parsed);
    casesBySuite.set(parsed.suiteId, current);
  }

  return suiteRows
    .map((row) => {
      const camel = rowToCamel(row) as JsonRecord | null;
      const suiteId = camel && typeof camel.id === "string" ? camel.id : "";
      return toEvalSuiteRecord(row, casesBySuite.get(suiteId) || []);
    })
    .filter((suite): suite is EvalSuiteRecord => suite !== null);
}

export function getCustomEvalSuite(suiteId: string): EvalSuiteRecord | null {
  const normalizedSuiteId = suiteId.trim();
  if (!normalizedSuiteId) return null;
  return listCustomEvalSuites().find((suite) => suite.id === normalizedSuiteId) || null;
}

export function saveCustomEvalSuite(input: {
  id?: string;
  name: string;
  description?: string;
  cases: Array<{
    id?: string;
    name: string;
    model?: string;
    input: {
      messages: EvalMessage[];
      max_tokens?: number;
    };
    expected: {
      strategy: EvalCaseStrategy;
      value?: string;
    };
    tags?: string[];
  }>;
}): EvalSuiteRecord {
  const db = getDbInstance() as unknown as DbLike;
  ensureEvalSuiteTables(db);
  const now = new Date().toISOString();
  const suiteId =
    typeof input.id === "string" && input.id.trim().length > 0 ? input.id.trim() : randomUUID();
  const name = input.name.trim();
  const description =
    typeof input.description === "string" && input.description.trim().length > 0
      ? input.description.trim()
      : null;

  if (!name) {
    throw new Error("Suite name is required");
  }

  if (!Array.isArray(input.cases) || input.cases.length === 0) {
    throw new Error("At least one eval case is required");
  }

  db.prepare("BEGIN").run();
  try {
    const existing = db
      .prepare<{ id: string }>("SELECT id FROM eval_suites WHERE id = ?")
      .get(suiteId);

    if (existing) {
      db.prepare(
        `UPDATE eval_suites
         SET name = ?, description = ?, updated_at = ?
         WHERE id = ?`
      ).run(name, description, now, suiteId);
    } else {
      db.prepare(
        `INSERT INTO eval_suites (id, name, description, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)`
      ).run(suiteId, name, description, now, now);
    }

    db.prepare("DELETE FROM eval_cases WHERE suite_id = ?").run(suiteId);

    input.cases.forEach((rawCase, index) => {
      const caseId =
        typeof rawCase.id === "string" && rawCase.id.trim().length > 0
          ? rawCase.id.trim()
          : randomUUID();
      const caseName = rawCase.name.trim();
      const model =
        typeof rawCase.model === "string" && rawCase.model.trim().length > 0
          ? rawCase.model.trim()
          : null;
      const sanitizedInput = sanitizeEvalCaseInput(rawCase.input);
      const sanitizedExpected = sanitizeEvalExpected(rawCase.expected);
      const tags = Array.isArray(rawCase.tags)
        ? rawCase.tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0)
        : [];

      if (!caseName) {
        throw new Error(`Case ${index + 1} is missing a name`);
      }

      if (sanitizedInput.messages.length === 0) {
        throw new Error(`Case ${index + 1} must include at least one message`);
      }

      if (
        (sanitizedExpected.strategy === "contains" ||
          sanitizedExpected.strategy === "exact" ||
          sanitizedExpected.strategy === "regex") &&
        !sanitizedExpected.value
      ) {
        throw new Error(`Case ${index + 1} must include an expected value`);
      }

      db.prepare(
        `INSERT INTO eval_cases
          (id, suite_id, sort_order, name, model, input_json, expected_strategy, expected_value,
           tags_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        caseId,
        suiteId,
        index,
        caseName,
        model,
        JSON.stringify(sanitizedInput),
        sanitizedExpected.strategy,
        sanitizedExpected.value || null,
        JSON.stringify(tags),
        now,
        now
      );
    });

    db.prepare("COMMIT").run();
  } catch (error) {
    db.prepare("ROLLBACK").run();
    throw error;
  }

  const saved = getCustomEvalSuite(suiteId);
  if (!saved) {
    throw new Error("Failed to persist eval suite");
  }

  return saved;
}

export function deleteCustomEvalSuite(suiteId: string): boolean {
  const db = getDbInstance() as unknown as DbLike;
  ensureEvalSuiteTables(db);
  const normalizedSuiteId = suiteId.trim();
  if (!normalizedSuiteId) return false;

  db.prepare("BEGIN").run();
  try {
    db.prepare("DELETE FROM eval_cases WHERE suite_id = ?").run(normalizedSuiteId);
    const result = db.prepare("DELETE FROM eval_suites WHERE id = ?").run(normalizedSuiteId);
    db.prepare("COMMIT").run();
    return result.changes > 0;
  } catch (error) {
    db.prepare("ROLLBACK").run();
    throw error;
  }
}
