import type { PreparedStatement, RunResult } from "../types";
import { PostgresAdapterError } from "./postgresErrors";
import type { PostgresSession, QueryResult } from "./postgresSession";
import { applyPragma } from "./pragmaEmulation";
import type { SchemaCatalog } from "./schemaCatalog";
import { splitStatements } from "./sqlTokenizer";
import { ROWID_COLUMN, type TranslatedStatement } from "./sqlTranslator";

const CONCURRENT_DDL_CODES = new Set(["23505", "42P07", "42710", "42701", "42P06"]);
const IDEMPOTENT_DDL_PATTERN =
  /^(CREATE (UNIQUE )?(TABLE|INDEX) IF NOT EXISTS|ALTER TABLE .* ADD COLUMN IF NOT EXISTS)/i;

function emptyResult(command: string | null = null): QueryResult {
  return { rows: [], rowCount: 0, command };
}

function isNamedParamObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !Buffer.isBuffer(value) &&
    !(value instanceof Uint8Array) &&
    !(value instanceof Date)
  );
}

function namedParamValue(record: Record<string, unknown>, name: string): unknown {
  for (const key of [name, `@${name}`, `:${name}`, `$${name}`]) {
    if (key in record) return record[key];
  }
  return null;
}

function bindParams(translated: TranslatedStatement, params: unknown[]): unknown[] {
  if (params.length !== 1) return params;
  const [first] = params;
  if (isNamedParamObject(first)) {
    return translated.paramNames
      ? translated.paramNames.map((name) => namedParamValue(first, name))
      : Object.values(first);
  }
  if (Array.isArray(first) && translated.paramCount !== 1) return first;
  return params;
}

function lastInsertRowid(translated: TranslatedStatement, result: QueryResult): number | bigint {
  if (translated.kind !== "insert" || result.rows.length === 0) return 0;
  const first = result.rows[0];
  const candidate = translated.returningColumn
    ? first[translated.returningColumn]
    : (first.id ?? first[ROWID_COLUMN]);
  return typeof candidate === "number" || typeof candidate === "bigint" ? candidate : 0;
}

export class StatementExecutor {
  constructor(
    private readonly session: PostgresSession,
    private readonly catalog: SchemaCatalog
  ) {}

  prepare(sql: string): PreparedStatement {
    return {
      run: (...params: unknown[]): RunResult => this.run(sql, params),
      get: (...params: unknown[]): unknown => this.query(sql, params).rows[0],
      all: (...params: unknown[]): unknown[] => this.query(sql, params).rows,
    };
  }

  exec(sql: string): void {
    for (const statement of splitStatements(sql)) {
      this.executeTranslated(this.catalog.translateUncached(statement), []);
    }
  }

  pragma(pragmaText: string, simple: boolean): unknown {
    return applyPragma(
      (sql, params) => this.session.rawQuery(sql, params, false).rows,
      pragmaText,
      simple
    );
  }

  private run(sql: string, params: unknown[]): RunResult {
    const translated = this.catalog.translate(sql);
    const result = this.executeTranslated(translated, params);
    return { changes: result.rowCount, lastInsertRowid: lastInsertRowid(translated, result) };
  }

  private query(sql: string, params: unknown[]): QueryResult {
    return this.executeTranslated(this.catalog.translate(sql), params);
  }

  private executeTranslated(translated: TranslatedStatement, params: unknown[]): QueryResult {
    switch (translated.kind) {
      case "pragma":
        return {
          rows: this.pragma(translated.pragma ?? "", false) as Array<Record<string, unknown>>,
          rowCount: 0,
          command: "PRAGMA",
        };
      case "noop":
        return emptyResult();
      case "transaction":
        for (const statement of translated.statements)
          this.session.executeTransactionStatement(statement);
        return emptyResult("TRANSACTION");
      case "ddl":
        return this.executeDdl(translated, bindParams(translated, params));
      default:
        return this.executeStatements(translated.statements, bindParams(translated, params));
    }
  }

  private executeStatements(statements: string[], bound: unknown[]): QueryResult {
    let last = emptyResult();
    for (const statement of statements) last = this.session.rawQuery(statement, bound);
    return last;
  }

  private executeDdl(translated: TranslatedStatement, bound: unknown[]): QueryResult {
    let last = emptyResult();
    let structural = false;
    const executedIdempotent: string[] = [];
    for (const statement of translated.statements) {
      if (!IDEMPOTENT_DDL_PATTERN.test(statement)) {
        last = this.session.rawQuery(statement, bound);
        structural = true;
        continue;
      }
      if (this.catalog.hasSeenIdempotentDdl(statement)) continue;
      last = this.runIdempotentDdl(statement, bound);
      executedIdempotent.push(statement);
    }
    if (structural || executedIdempotent.length > 0)
      this.catalog.invalidate(translated.tables, structural);
    for (const statement of executedIdempotent) this.catalog.markIdempotentDdl(statement);
    return last;
  }

  private runIdempotentDdl(statement: string, bound: unknown[]): QueryResult {
    try {
      return this.session.rawQuery(statement, bound);
    } catch (error) {
      if (error instanceof PostgresAdapterError && CONCURRENT_DDL_CODES.has(error.pgCode ?? ""))
        return emptyResult();
      throw error;
    }
  }
}
