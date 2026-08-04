/**
 * connectionsSearchFilter — #7937: account search across the FULL in-memory
 * connections list (not just the current page).
 *
 * Case-insensitive, plain SUBSTRING match (mirrors the semantics of
 * `src/shared/utils/modelCatalogSearch.ts` — do not reimplement a fuzzy
 * matcher here). Matches against id, tag, name, and email.
 */
import type { ConnectionRowConnection } from "./components/ConnectionRow";

function normalize(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function getConnectionTag(conn: ConnectionRowConnection): string {
  const tag = conn.providerSpecificData?.tag;
  return typeof tag === "string" ? tag : "";
}

/** True when `conn` matches `query` (empty/whitespace query always matches). */
export function matchesAccountQuery(query: string, conn: ConnectionRowConnection): boolean {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  const haystacks = [
    normalize(conn.id),
    normalize(getConnectionTag(conn)),
    normalize(conn.name),
    normalize(conn.email),
  ];
  return haystacks.some((haystack) => haystack.includes(normalizedQuery));
}

/** Filters `connections` by `query` — pass-through unchanged when query is empty. */
export function filterConnectionsByQuery<T extends ConnectionRowConnection>(
  query: string,
  connections: T[]
): T[] {
  if (!normalize(query)) return connections;
  return connections.filter((conn) => matchesAccountQuery(query, conn));
}
