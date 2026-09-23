export type ProviderCredentials = {
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  email?: string | null;
  projectId?: string | null;
  expiresAt?: string;
  connectionId?: string; // T07: used for API key rotation index
  maxConcurrent?: number | null;
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

export function prepareValidationFetch(
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
