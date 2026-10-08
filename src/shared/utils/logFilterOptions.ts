/**
 * Builds the Logs tab filter dropdown options. The server lists every value seen in
 * call_logs and every configured API key; the loaded rows are merged on top so values
 * that appeared after the options were fetched still show up.
 */

type ApiKeyRef = { id?: string | null; name?: string | null };

export type LogFilterOptionsSource = {
  providers?: string[];
  models?: string[];
  accounts?: string[];
  apiKeys?: ApiKeyRef[];
};

type LogRowLike = {
  provider?: string | null;
  model?: string | null;
  requestedModel?: string | null;
  account?: string | null;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
};

export type LogFilterApiKeyOption = {
  /** Value sent as the `apiKey` filter — the key id, or the name for id-less rows. */
  value: string;
  id: string | null;
  name: string | null;
};

export type LogFilterOptions = {
  providers: string[];
  models: string[];
  accounts: string[];
  apiKeys: LogFilterApiKeyOption[];
};

function isRealValue(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value !== "-";
}

function sortedUnique(...lists: unknown[][]): string[] {
  const values = new Set<string>();
  for (const list of lists) {
    for (const value of list) if (isRealValue(value)) values.add(value);
  }
  return [...values].sort();
}

export function mergeLogFilterOptions(
  server: LogFilterOptionsSource | null | undefined,
  configuredKeys: ApiKeyRef[] | null | undefined,
  logs: LogRowLike[]
): LogFilterOptions {
  const apiKeys = new Map<string, LogFilterApiKeyOption>();
  const addKey = (key: ApiKeyRef) => {
    const id = isRealValue(key.id) ? key.id : null;
    const name = isRealValue(key.name) ? key.name : null;
    const value = id || name;
    if (!value) return;
    // First writer wins: configured keys go in first, so the current key name beats
    // the name a historical log row was written with.
    if (!apiKeys.has(value)) apiKeys.set(value, { value, id, name });
  };
  for (const key of configuredKeys ?? []) addKey(key);
  for (const key of server?.apiKeys ?? []) addKey(key);
  for (const log of logs) addKey({ id: log.apiKeyId, name: log.apiKeyName });

  return {
    providers: sortedUnique(
      server?.providers ?? [],
      logs.map((l) => l.provider)
    ),
    models: sortedUnique(
      server?.models ?? [],
      logs.flatMap((l) => [l.model, l.requestedModel])
    ),
    accounts: sortedUnique(
      server?.accounts ?? [],
      logs.map((l) => l.account)
    ),
    apiKeys: [...apiKeys.values()].sort((a, b) =>
      (a.name || a.value).localeCompare(b.name || b.value)
    ),
  };
}
