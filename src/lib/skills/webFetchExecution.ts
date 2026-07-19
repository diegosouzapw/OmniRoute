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
} from "@omniroute/open-sse/handlers/webFetch.ts";

const WEB_FETCH_PROVIDERS = ["firecrawl", "jina-reader", "tavily-search", "tinyfish"] as const;
type WebFetchProviderId = (typeof WEB_FETCH_PROVIDERS)[number];

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

async function resolveCredentials(
  providerId: WebFetchProviderId
): Promise<WebFetchCredentials | null> {
  try {
    return (await getProviderCredentialsWithQuotaPreflight(providerId)) ?? null;
  } catch {
    return null;
  }
}

async function autoSelectProvider(): Promise<{
  provider: WebFetchProviderId;
  credentials: WebFetchCredentials;
} | null> {
  for (const providerId of WEB_FETCH_PROVIDERS) {
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
