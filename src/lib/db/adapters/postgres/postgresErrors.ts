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

type MessageBuilder = (payload: WorkerErrorPayload) => string;

function uniqueConstraintMessage({ detail, table, constraint }: WorkerErrorPayload): string {
  const columns = keyColumns(detail);
  const qualified = columns
    ? columns
        .split(", ")
        .map((c) => `${table ?? ""}.${c}`)
        .join(", ")
    : (constraint ?? "");
  return `UNIQUE constraint failed: ${qualified}`;
}

function lockedMessage({ message }: WorkerErrorPayload): string {
  return `database is locked (${message})`;
}

const MESSAGE_BUILDERS: ReadonlyMap<string, MessageBuilder> = new Map<string, MessageBuilder>([
  [
    "42P01",
    ({ message, table }) =>
      `no such table: ${quotedName(message, "relation") ?? table ?? "unknown"}`,
  ],
  [
    "42703",
    ({ message, column }) =>
      `no such column: ${quotedName(message, "column") ?? column ?? "unknown"}`,
  ],
  ["23505", uniqueConstraintMessage],
  ["23502", ({ table, column }) => `NOT NULL constraint failed: ${table ?? ""}.${column ?? ""}`],
  ["23514", ({ constraint }) => `CHECK constraint failed: ${constraint ?? ""}`],
  ["23503", () => "FOREIGN KEY constraint failed"],
  ["42P07", ({ message }) => `table ${quotedName(message, "relation") ?? ""} already exists`],
  [
    "42701",
    ({ message, column }) =>
      `duplicate column name: ${quotedName(message, "column") ?? column ?? ""}`,
  ],
  ["40P01", lockedMessage],
  ["55P03", lockedMessage],
  ["40001", lockedMessage],
]);

export function toSqliteStyleMessage(payload: WorkerErrorPayload): string {
  const build = payload.code === null ? undefined : MESSAGE_BUILDERS.get(payload.code);
  return build ? build(payload) : payload.message;
}
