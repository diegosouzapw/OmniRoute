/**
 * webFetchExecution.ts — resolves credentials for a web-fetch provider and dispatches
 * to handleWebFetch(), mirroring src/lib/search/executeWebSearch.ts. Consumed by the
 * `web_fetch` builtin skill handler (src/lib/skills/builtins.ts) when the synthetic
 * `omniroute_web_fetch` tool call emitted by webFetchInterception.ts is executed
 * (#7339, Phase 4 of #3384).
 */

import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import { getInterceptionRules, type FetchInterceptionBackend } from "@/lib/db/interceptionRules";
import {
  handleWebFetch,
  type WebFetchCredentials,
  type WebFetchFormat,
  type WebFetchResponse,
  WEB_FETCH_PROVIDERS,
  EXPLICIT_ONLY_WEB_FETCH_PROVIDERS,
  ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS,
  type WebFetchProviderId,
} from "@omniroute/open-sse/handlers/webFetch.ts";

// Providers that only understand their own URL shape (context7 takes a library
// reference, not a generic web URL): explicit requests only, never auto-selected.
const EXPLICIT_ONLY_PROVIDERS = EXPLICIT_ONLY_WEB_FETCH_PROVIDERS;

// Providers whose upstream serves an anonymous tier: usable without a key.
const ANONYMOUS_CAPABLE_PROVIDERS = ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS;

const FETCH_BACKEND_TO_PROVIDER: Record<FetchInterceptionBackend, WebFetchProviderId> = {
  firecrawl: "firecrawl",
  jina: "jina-reader",
  tavily: "tavily-search",
};

export interface ExecuteWebFetchInput {
  url: string;
  provider?: string;
  format?: WebFetchFormat;
  depth?: 0 | 1 | 2;
  wait_for_selector?: string;
  include_metadata?: boolean;
  /** Provider/model that owns the interception rule row, used to resolve a pinned backend. */
  ruleProvider?: string | null;
  ruleModel?: string | null;
}

export class WebFetchExecutionError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function isKnownWebFetchProvider(value: unknown): value is WebFetchProviderId {
  return typeof value === "string" && (WEB_FETCH_PROVIDERS as readonly string[]).includes(value);
}

function resolvePinnedBackend(input: ExecuteWebFetchInput): WebFetchProviderId | undefined {
  if (isKnownWebFetchProvider(input.provider)) return input.provider;
  if (!input.ruleProvider) return undefined;

  const rules = getInterceptionRules(input.ruleProvider);
  if (!rules) return undefined;

  const modelRule = input.ruleModel ? rules.models?.[input.ruleModel] : undefined;
  const backend = modelRule?.fetchBackend ?? rules.fetchBackend;
  return backend ? FETCH_BACKEND_TO_PROVIDER[backend] : undefined;
}

export function normalizeWebFetchCredentials(value: unknown): WebFetchCredentials | null {
  if (!value || typeof value !== "object") return null;
  const credentials = value as Record<string, unknown>;
  if (credentials.allRateLimited === true || credentials.allExpired === true) return null;

  const providerSpecificData =
    credentials.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>)
      : undefined;

  return {
    ...(typeof credentials.apiKey === "string" && { apiKey: credentials.apiKey }),
    ...(typeof credentials.baseUrl === "string" && { baseUrl: credentials.baseUrl }),
    ...(providerSpecificData && { providerSpecificData }),
  };
}

async function resolveCredentials(
  providerId: WebFetchProviderId
): Promise<WebFetchCredentials | null> {
  try {
    return normalizeWebFetchCredentials(await getProviderCredentialsWithQuotaPreflight(providerId));
  } catch {
    return null;
  }
}

async function autoSelectProvider(): Promise<{
  provider: WebFetchProviderId;
  credentials: WebFetchCredentials;
} | null> {
  for (const providerId of WEB_FETCH_PROVIDERS) {
    if (EXPLICIT_ONLY_PROVIDERS.has(providerId)) continue;
    const credentials = await resolveCredentials(providerId);
    if (credentials) return { provider: providerId, credentials };
  }
  return null;
}

async function resolveProviderAndCredentials(
  input: ExecuteWebFetchInput
): Promise<{ provider: WebFetchProviderId; credentials: WebFetchCredentials }> {
  const pinnedProvider = resolvePinnedBackend(input);
  const pinnedCredentials = pinnedProvider ? await resolveCredentials(pinnedProvider) : null;
  if (pinnedProvider && pinnedCredentials) {
    return { provider: pinnedProvider, credentials: pinnedCredentials };
  }
  if (pinnedProvider && ANONYMOUS_CAPABLE_PROVIDERS.has(pinnedProvider)) {
    // Anonymous tier: no connection configured (or the credential resolution
    // came back rate-limited — the anonymous tier does not consume key quota,
    // so a rate-limited key must not block the anonymous attempt either).
    return { provider: pinnedProvider, credentials: {} };
  }

  const auto = await autoSelectProvider();
  if (!auto) {
    throw new WebFetchExecutionError(
      `No credentials configured for any web-fetch provider. Add an API key for one of: ${WEB_FETCH_PROVIDERS.join(", ")}.`,
      400
    );
  }
  return auto;
}

export async function executeWebFetch(input: ExecuteWebFetchInput): Promise<WebFetchResponse> {
  if (!input.url || typeof input.url !== "string") {
    throw new WebFetchExecutionError("Missing required field: url", 400);
  }

  const { provider, credentials } = await resolveProviderAndCredentials(input);

  const result = await handleWebFetch(
    {
      url: input.url,
      format: input.format,
      depth: input.depth,
      wait_for_selector: input.wait_for_selector,
      include_metadata: input.include_metadata,
    },
    credentials,
    provider
  );

  if (!result.success || !result.data) {
    throw new WebFetchExecutionError(result.error || "Web fetch failed", result.status || 502);
  }

  return result.data;
}
