export type ProviderCredentials = {
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  email?: string | null;
  projectId?: string | null;
  expiresAt?: string;
  connectionId?: string; // T07: used for API key rotation index
  maxConcurrent?: number | null;
  /**
   * Optional per-model concurrency ceilings for this connection (see
   * ProviderCredentials in open-sse/types.d.ts). Normalized at credential
   * selection; the chat core resolves the exact-model cap fail-open.
   */
  modelConcurrency?: Record<string, number> | null;
  rateLimitMaxConcurrent?: number | null;
  providerSpecificData?: Record<string, unknown>;
  requestEndpointPath?: string;
};

/** Trusted request-local observer, supplied only by strict model validation. */
export type StrictValidationDispatch = {
  beforeFetch(details: {
    provider: string;
    model: string;
    credentials: ProviderCredentials;
    url: string;
    headers: HeadersInit | undefined;
    body: BodyInit | null | undefined;
  }): void;
  reject(): never;
};

export function assertValidationCredentials(
  observer: StrictValidationDispatch | undefined,
  credentials: ProviderCredentials
): void {
  if (!observer) return;
  const extraKeys = credentials.providerSpecificData?.extraApiKeys;
  if (extraKeys == null) return;
  // Reject rotation before resolveEffectiveKey mutates selectedKeyId or
  // consults the shared key-health state. Malformed key lists fail closed.
  if (!Array.isArray(extraKeys) || extraKeys.length > 0) observer.reject();
}

function prepareValidationFetch(
  observer: StrictValidationDispatch | undefined,
  details: Pick<
    Parameters<StrictValidationDispatch["beforeFetch"]>[0],
    "provider" | "model" | "credentials" | "url"
  >,
  options: RequestInit
): RequestInit {
  if (!observer) return options;
  options.signal?.throwIfAborted();
  observer.beforeFetch({ ...details, headers: options.headers, body: options.body });
  // The observer is synchronous; no awaited work may separate this final
  // cancellation/identity fence from the physical transport in BaseExecutor.
  options.signal?.throwIfAborted();
  // Automatic redirects would perform an unobserved second HTTP dispatch,
  // possibly to a different provider or credential scope.
  return { ...options, redirect: "error" };
}

/** `fetch` that runs the strict-validation fence first; plain `fetch` when there is no observer. */
export function validationFetch(
  observer: StrictValidationDispatch | undefined,
  provider: string,
  model: string,
  credentials: ProviderCredentials
): (url: string, options: RequestInit) => Promise<Response> {
  return (url, options) =>
    fetch(url, prepareValidationFetch(observer, { provider, model, credentials, url }, options));
}
