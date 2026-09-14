import type { PostgresSyncChannel } from "./postgresSyncChannel";

const WRITER_LOCK_KEY = 7211002;

export interface QueryResult {
  rows: Array<Record<string, unknown>>;
  rowCount: number;
  command: string | null;
}

function toBuffer(value: unknown): unknown {
  if (value instanceof Uint8Array && !Buffer.isBuffer(value))
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  return value;
}

function normalizeRows(rows: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  for (const row of rows) {
    if ("QUERY PLAN" in row) {
      row.detail = row["QUERY PLAN"];
      delete row["QUERY PLAN"];
    }
    for (const key of Object.keys(row)) {
      const value = row[key];
      if (value instanceof Uint8Array) row[key] = toBuffer(value);
    }
  }
  return rows;
}

export class PostgresSession {
  private readonly queryTimeoutMs: number;
  private depth = 0;
  private savepointCounter = 0;

  constructor(
    private readonly channel: PostgresSyncChannel,
    statementTimeoutMs: number
  ) {
    this.queryTimeoutMs = statementTimeoutMs + 15_000;
  }

  get inTransaction(): boolean {
    return this.depth > 0;
  }

  rawQuery(sql: string, params?: unknown[], savepoint = this.depth > 0): QueryResult {
    const result = this.channel.call<QueryResult>(
      { op: "query", sql, params: params ?? [], savepoint, inTransaction: this.depth > 0 },
      sql,
      this.queryTimeoutMs
    );
    result.rows = normalizeRows(result.rows);
    return result;
  }

  runScript(sql: string): void {
    this.channel.call({ op: "script", sql }, sql, Math.max(this.queryTimeoutMs, 120_000));
  }

  executeTransactionStatement(statement: string): void {
    const upper = statement.toUpperCase();
    if (upper === "BEGIN") {
      if (this.depth === 0) {
        this.rawQuery("BEGIN", [], false);
        this.depth = 1;
      }
      return;
    }
    if (upper === "COMMIT" || upper === "ROLLBACK") {
      if (this.depth > 0) {
        this.rawQuery(upper, [], false);
        this.depth = 0;
      }
      return;
    }
    this.rawQuery(statement, [], false);
  }

  runInTransaction<T>(fn: () => T, immediate: boolean): T {
    const savepoint = this.beginTransaction(immediate);
    try {
      const result = fn();
      this.commitTransaction(savepoint);
      return result;
    } catch (error) {
      this.rollbackTransaction(savepoint);
      throw error;
    }
  }

  private beginTransaction(immediate: boolean): string | null {
    if (this.depth === 0) {
      this.rawQuery("BEGIN", [], false);
      this.depth = 1;
      if (immediate)
        this.rawQuery(
          `SELECT pg_advisory_xact_lock(${WRITER_LOCK_KEY}, hashtext(current_schema()))`,
          [],
          false
        );
      return null;
    }
    this.savepointCounter += 1;
    const name = `omniroute_tx_${this.savepointCounter}`;
    this.rawQuery(`SAVEPOINT ${name}`, [], false);
    this.depth += 1;
    return name;
  }

  private commitTransaction(savepoint: string | null): void {
    if (savepoint) {
      this.rawQuery(`RELEASE SAVEPOINT ${savepoint}`, [], false);
      this.depth -= 1;
      return;
    }
    this.rawQuery("COMMIT", [], false);
    this.depth = 0;
  }

  private rollbackTransaction(savepoint: string | null): void {
    try {
      if (savepoint) {
        this.rawQuery(`ROLLBACK TO SAVEPOINT ${savepoint}`, [], false);
        this.rawQuery(`RELEASE SAVEPOINT ${savepoint}`, [], false);
      } else {
        this.rawQuery("ROLLBACK", [], false);
      }
    } catch {
      this.depth = 0;
      return;
    }
    this.depth = savepoint ? this.depth - 1 : 0;
  }
}
