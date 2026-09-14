export interface TableSchema {
  columns: string[];
  columnTypes: Record<string, string>;
  primaryKey: string[];
  uniqueIndexes: string[][];
  identityColumn: string | null;
}

export interface TranslationContext {
  lookupTable(name: string): TableSchema | null;
}

export type StatementKind =
  "select" | "insert" | "update" | "delete" | "ddl" | "pragma" | "transaction" | "noop" | "other";

export interface TranslatedStatement {
  kind: StatementKind;
  statements: string[];
  paramNames: string[] | null;
  paramCount: number;
  pragma?: string;
  returningColumn?: string;
  tables: string[];
}

export class SqliteEmulationError extends Error {
  code: string;
  constructor(message: string, code = "SQLITE_ERROR") {
    super(message);
    this.code = code;
  }
}

export const ROWID_TABLES = new Set([
  "call_logs",
  "conversation_turn_nodes",
  "memories",
  "domain_fallback_chains",
  "domain_lockout_state",
  "domain_circuit_breakers",
]);

export const ROWID_COLUMN = "rowid";

export const TEXT_TYPES = new Set([
  "TEXT",
  "VARCHAR",
  "CHAR",
  "CHARACTER",
  "CLOB",
  "DATETIME",
  "TIMESTAMP",
  "DATE",
  "TIME",
  "JSON",
  "STRING",
  "NVARCHAR",
  "NCHAR",
  "VARYING",
]);
export const INT_TYPES = new Set([
  "INTEGER",
  "INT",
  "INT2",
  "INT4",
  "INT8",
  "BIGINT",
  "SMALLINT",
  "TINYINT",
  "MEDIUMINT",
  "BOOLEAN",
  "BOOL",
  "UNSIGNED",
]);
export const REAL_TYPES = new Set(["REAL", "FLOAT", "DOUBLE", "NUMERIC", "DECIMAL", "NUMBER"]);
export const BLOB_TYPES = new Set(["BLOB", "BYTEA"]);

export interface ParamState {
  names: string[];
  positional: number;
}

export function finish(
  kind: StatementKind,
  statements: string[],
  params: ParamState,
  tables: string[]
): TranslatedStatement {
  return {
    kind,
    statements,
    paramNames: params.names.length ? params.names : null,
    paramCount: params.names.length ? params.names.length : params.positional,
    tables,
  };
}
