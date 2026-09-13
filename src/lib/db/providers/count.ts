/**
 * db/providers/count.ts Connection-count query.
 *
 * Lives in its own leaf so models.ts can ask "how many connections
 * remain for this provider" without importing the providers.ts god
 * file (which imports deletion.ts, which imports models.ts).
 */
import { getDbInstance } from "../core";
import type { JsonRecord } from "./columns";

interface StatementLike<TRow = unknown> {
  get: (...params: unknown[]) => TRow | undefined;
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

export function getProviderConnectionsCount(filter: JsonRecord = {}): number {
  const db = getDbInstance() as unknown as DbLike;
  let sql = "SELECT count(*) as cnt FROM provider_connections";
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.provider) {
    conditions.push("provider = @provider");
    params.provider = filter.provider;
  }
  if (filter.isActive !== undefined) {
    conditions.push("is_active = @isActive");
    params.isActive = filter.isActive ? 1 : 0;
  }
  if (filter.authType) {
    conditions.push("auth_type = @authType");
    params.authType = filter.authType;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const row = db.prepare(sql).get(params) as { cnt: number };
  return row.cnt;
}
