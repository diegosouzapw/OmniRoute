export interface WorkerErrorPayload {
  message: string;
  code: string | null;
  detail: string | null;
  table: string | null;
  column: string | null;
  constraint: string | null;
  routine: string | null;
  position: string | null;
  where?: string | null;
}

export class PostgresAdapterError extends Error {
  code: string;
  pgCode: string | null;
  detail: string | null;
  context: string | null;
  sql: string | null;

  constructor(message: string, payload: Partial<WorkerErrorPayload>, sql: string | null) {
    super(message);
    this.name = "PostgresAdapterError";
    this.pgCode = payload.code ?? null;
    this.code = mapSqliteCode(payload.code ?? null);
    this.detail = payload.detail ?? null;
    this.context = payload.where ?? null;
    this.sql = sql;
  }
}

function mapSqliteCode(pgCode: string | null): string {
  switch (pgCode) {
    case "23505":
      return "SQLITE_CONSTRAINT_UNIQUE";
    case "23502":
      return "SQLITE_CONSTRAINT_NOTNULL";
    case "23514":
      return "SQLITE_CONSTRAINT_CHECK";
    case "23503":
      return "SQLITE_CONSTRAINT_FOREIGNKEY";
    case "40P01":
    case "55P03":
    case "40001":
      return "SQLITE_BUSY";
    case "42P01":
    case "42703":
    case "42601":
    case "42P07":
    case "42701":
      return "SQLITE_ERROR";
    default:
      return pgCode ? `PG_${pgCode}` : "SQLITE_ERROR";
  }
}

function quotedName(message: string, prefix: string): string | null {
  const match = new RegExp(`${prefix} "([^"]+)"`).exec(message);
  return match ? match[1] : null;
}

function keyColumns(detail: string | null): string | null {
  if (!detail) return null;
  const match = /Key \(([^)]+)\)=/.exec(detail);
  return match
    ? match[1]
        .split(",")
        .map((c) => c.trim().replace(/"/g, ""))
        .join(", ")
    : null;
}

export function toSqliteStyleMessage(payload: WorkerErrorPayload): string {
  const { code, message, detail, table, column, constraint } = payload;
  switch (code) {
    case "42P01":
      return `no such table: ${quotedName(message, "relation") ?? table ?? "unknown"}`;
    case "42703": {
      const name = quotedName(message, "column") ?? column ?? "unknown";
      return `no such column: ${name}`;
    }
    case "23505": {
      const columns = keyColumns(detail);
      const qualified = columns
        ? columns
            .split(", ")
            .map((c) => `${table ?? ""}.${c}`)
            .join(", ")
        : (constraint ?? "");
      return `UNIQUE constraint failed: ${qualified}`;
    }
    case "23502":
      return `NOT NULL constraint failed: ${table ?? ""}.${column ?? ""}`;
    case "23514":
      return `CHECK constraint failed: ${constraint ?? ""}`;
    case "23503":
      return `FOREIGN KEY constraint failed`;
    case "42P07":
      return `table ${quotedName(message, "relation") ?? ""} already exists`;
    case "42701":
      return `duplicate column name: ${quotedName(message, "column") ?? column ?? ""}`;
    case "40P01":
    case "55P03":
    case "40001":
      return `database is locked (${message})`;
    default:
      return message;
  }
}
