export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "-";
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

interface StoredTokens {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
}

export interface TokenSplit {
  /** Input that was not served from or written to the prompt cache. */
  input: number;
  /** Output as stored; reasoning tokens are already part of it. */
  output: number;
  /** Cache reads plus cache writes. */
  cache: number;
  cacheRead: number;
  cacheCreation: number;
}

/**
 * Split stored token counters into three figures that do not overlap. The stored input counter
 * already includes cache reads and writes (the cost calculator subtracts them the same way), so
 * showing it next to the cache figure would count the cached part twice.
 */
export function splitTokens(tokens: StoredTokens): TokenSplit {
  const cache = tokens.cacheRead + tokens.cacheCreation;
  return {
    input: Math.max(0, tokens.input - cache),
    output: tokens.output,
    cache,
    cacheRead: tokens.cacheRead,
    cacheCreation: tokens.cacheCreation,
  };
}
