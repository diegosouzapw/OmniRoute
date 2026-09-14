import type { QueryResult } from "./postgresSession";
import {
  ROWID_COLUMN,
  translateStatement,
  type TableSchema,
  type TranslatedStatement,
  type TranslationContext,
} from "./sqlTranslator";

const TRANSLATION_CACHE_LIMIT = 4000;

type SchemaRow = {
  column_name: string;
  data_type: string;
  is_identity: number;
  pk_position: number;
  unique_groups: string | null;
};

export type SchemaQuery = (sql: string, params: unknown[]) => QueryResult;

function uniqueGroups(rows: SchemaRow[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const row of rows) {
    if (!row.unique_groups) continue;
    for (const group of row.unique_groups.split(",")) {
      const members = groups.get(group) ?? [];
      members.push(row.column_name);
      groups.set(group, members);
    }
  }
  return Array.from(groups.values());
}

function buildTableSchema(rows: SchemaRow[]): TableSchema {
  const primaryKey = rows
    .filter((row) => row.pk_position > 0)
    .sort((a, b) => a.pk_position - b.pk_position)
    .map((row) => row.column_name);
  const identity =
    rows.find((row) => row.is_identity === 1 && row.pk_position > 0)?.column_name ??
    rows.find((row) => row.is_identity === 1)?.column_name ??
    null;
  const columnTypes: Record<string, string> = {};
  for (const row of rows) columnTypes[row.column_name.toLowerCase()] = row.data_type;
  return {
    columns: rows.map((row) => row.column_name),
    columnTypes,
    primaryKey,
    uniqueIndexes: uniqueGroups(rows),
    identityColumn: identity === ROWID_COLUMN && primaryKey.length ? null : identity,
  };
}

export class SchemaCatalog implements TranslationContext {
  private readonly schemaCache = new Map<string, TableSchema | null>();
  private readonly translationCache = new Map<string, TranslatedStatement>();
  private readonly idempotentDdlSeen = new Set<string>();

  constructor(private readonly query: SchemaQuery) {}

  lookupTable(name: string): TableSchema | null {
    const key = name.toLowerCase();
    if (this.schemaCache.has(key)) return this.schemaCache.get(key) ?? null;
    const rows = this.query(
      "SELECT column_name, data_type, is_identity, pk_position, unique_groups FROM omniroute_table_schema($1)",
      [name]
    ).rows as SchemaRow[];
    const schema = rows.length === 0 ? null : buildTableSchema(rows);
    this.schemaCache.set(key, schema);
    return schema;
  }

  translate(sql: string): TranslatedStatement {
    const cached = this.translationCache.get(sql);
    if (cached) return cached;
    const translated = this.translateUncached(sql);
    if (this.translationCache.size >= TRANSLATION_CACHE_LIMIT) {
      const oldest = this.translationCache.keys().next().value;
      if (oldest !== undefined) this.translationCache.delete(oldest);
    }
    this.translationCache.set(sql, translated);
    return translated;
  }

  translateUncached(sql: string): TranslatedStatement {
    return translateStatement(sql, this);
  }

  hasSeenIdempotentDdl(statement: string): boolean {
    return this.idempotentDdlSeen.has(statement);
  }

  markIdempotentDdl(statement: string): void {
    this.idempotentDdlSeen.add(statement);
  }

  invalidate(tables: string[], forgetIdempotentDdl: boolean): void {
    if (tables.length === 0) {
      this.schemaCache.clear();
      this.translationCache.clear();
      this.idempotentDdlSeen.clear();
      return;
    }
    const affected = new Set(tables.map((table) => table.toLowerCase()));
    for (const table of affected) this.schemaCache.delete(table);
    for (const [sql, translated] of this.translationCache) {
      if (translated.tables.some((table) => affected.has(table.toLowerCase())))
        this.translationCache.delete(sql);
    }
    if (forgetIdempotentDdl) this.forgetIdempotentDdlFor(tables);
  }

  private forgetIdempotentDdlFor(tables: string[]): void {
    for (const statement of this.idempotentDdlSeen) {
      if (tables.some((table) => statement.toLowerCase().includes(`"${table.toLowerCase()}"`)))
        this.idempotentDdlSeen.delete(statement);
    }
  }
}
