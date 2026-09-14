type PragmaRows = Array<Record<string, unknown>>;

export type PragmaQuery = (sql: string, params: unknown[]) => PragmaRows;

type PragmaHandler = (query: PragmaQuery, argument: string | null) => PragmaRows;

const EMPTY_RESULT_PRAGMAS = [
  "index_info",
  "index_xinfo",
  "foreign_key_list",
  "database_list",
  "compile_options",
];

const ZERO_VALUE_PRAGMAS = [
  "user_version",
  "schema_version",
  "foreign_keys",
  "auto_vacuum",
  "synchronous",
  "temp_store",
  "mmap_size",
  "busy_timeout",
  "application_id",
];

function tableInfo(query: PragmaQuery, argument: string | null): PragmaRows {
  return query('SELECT cid, name, type, "notnull", dflt_value, pk FROM omniroute_table_info($1)', [
    argument ?? "",
  ]);
}

function indexList(query: PragmaQuery, argument: string | null): PragmaRows {
  return query('SELECT seq, name, "unique", origin, partial FROM omniroute_index_list($1)', [
    argument ?? "",
  ]);
}

function pageCount(query: PragmaQuery): PragmaRows {
  return query(
    "SELECT CEIL(pg_database_size(current_database()) / 8192.0)::bigint AS page_count",
    []
  );
}

const PRAGMA_HANDLERS = new Map<string, PragmaHandler>([
  ["table_info", tableInfo],
  ["table_xinfo", tableInfo],
  ["index_list", indexList],
  ["page_count", pageCount],
  ["journal_mode", () => [{ journal_mode: "wal" }]],
  ["page_size", () => [{ page_size: 8192 }]],
  ["cache_size", () => [{ cache_size: -2000 }]],
  ["freelist_count", () => [{ freelist_count: 0 }]],
  ["quick_check", () => [{ quick_check: "ok" }]],
  ["integrity_check", () => [{ integrity_check: "ok" }]],
  ["wal_checkpoint", () => [{ busy: 0, log: 0, checkpointed: 0 }]],
  ...EMPTY_RESULT_PRAGMAS.map((name): [string, PragmaHandler] => [name, () => []]),
  ...ZERO_VALUE_PRAGMAS.map((name): [string, PragmaHandler] => [name, () => [{ [name]: 0 }]]),
]);

function pickResult(rows: PragmaRows, simple: boolean): unknown {
  if (!simple) return rows;
  const first = rows[0];
  if (!first) return null;
  const firstKey = Object.keys(first)[0];
  return firstKey === undefined ? null : first[firstKey];
}

export function applyPragma(query: PragmaQuery, pragmaText: string, simple: boolean): unknown {
  const text = pragmaText.trim().replace(/;$/, "");
  const call = /^([A-Za-z_]+)\s*\(\s*["'`]?([^"'`)]*)["'`]?\s*\)$/.exec(text);
  const assignment = /^([A-Za-z_]+)\s*=\s*(.+)$/.exec(text);
  const name = (call?.[1] ?? assignment?.[1] ?? text).toLowerCase();
  const argument = call?.[2]?.trim() ?? null;
  const handler = PRAGMA_HANDLERS.get(name);
  if (!handler) return assignment ? null : pickResult([], simple);
  return pickResult(handler(query, argument), simple);
}
