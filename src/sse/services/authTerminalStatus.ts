import { PROVIDER_ERROR_TYPES } from "@omniroute/open-sse/services/errorClassifier.ts";
import { isCreditsExhausted } from "@omniroute/open-sse/services/accountFallback.ts";
import { resolveProviderId, WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";

// #8200: cookie-auth providers (perplexity-web, grok-web, ...) use a rotating browser
// session, not a static API key — a 401 means "session needs a refresh", not "dead".
export function isRecoverableCookieAuth401(
  provider: string | null,
  providerErrorType: string | null
): boolean {
  return (
    providerErrorType !== PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED &&
    provider != null &&
    resolveProviderId(provider) in WEB_COOKIE_PROVIDERS
  );
}
// #12242 (402 variant of #3027): a bare 402 on a passthrough/gateway
// provider that multiplexes many models behind one credential
// (kilo-gateway, ollama-cloud, etc.) is a PER-MODEL billing signal, not
// proof the credential itself is dead — free models on the same connection
// remain perfectly usable. Only terminalize the whole connection for a 402
// when the provider is NOT a per-model-quota provider; the caller lets it
// fall through to the per-model lockout branch instead.
// `result.creditsExhausted` is a provider's own explicit classification
// (independent of HTTP status) and stays unconditionally terminal — it is
// not scoped by this check.
export function isConnectionWideCreditsExhausted(
  status: number,
  result: { permanent?: boolean; creditsExhausted?: boolean },
  isPerModelQuotaProvider: boolean
): boolean {
  return result.creditsExhausted || (status === 402 && !isPerModelQuotaProvider);
}

/** Credits-depleted bodies park; renewing billing-cycle quota does not. */
export function shouldParkCreditsExhausted(
  status: number,
  result: { permanent?: boolean; creditsExhausted?: boolean },
  isPerModelQuotaProvider: boolean,
  errorText: string
): boolean {
  return (
    isConnectionWideCreditsExhausted(status, result, isPerModelQuotaProvider) ||
    (!isPerModelQuotaProvider && isCreditsExhausted(errorText))
  );
}

function isNonTerminalProviderError(providerErrorType: string | null): boolean {
  return (
    providerErrorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR ||
    providerErrorType === PROVIDER_ERROR_TYPES.GEO_BLOCKED ||
    providerErrorType === PROVIDER_ERROR_TYPES.OAUTH_INVALID_TOKEN ||
    // #1010: Cloudflare fingerprint rejection is the CDN refusing the CLIENT's
    // signature, not the account's credentials — never a terminal account state.
    providerErrorType === PROVIDER_ERROR_TYPES.FINGERPRINT_REJECTION ||
    // Anthropic OAuth 403 "Request not allowed" refuses ONE request; the token
    // keeps serving the next one — never a terminal account state.
    providerErrorType === PROVIDER_ERROR_TYPES.REQUEST_REJECTED
  );
}

function isExpiredAuthFailure(
  status: number,
  providerErrorType: string | null,
  provider: string | null
): boolean {
  return (
    (providerErrorType === PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED ||
      providerErrorType === PROVIDER_ERROR_TYPES.UNAUTHORIZED ||
      status === 401) &&
    !isRecoverableCookieAuth401(provider, providerErrorType)
  );
}

export function resolveTerminalConnectionStatus(
  status: number,
  result: { permanent?: boolean; creditsExhausted?: boolean },
  providerErrorType: string | null = null,
  provider: string | null = null,
  isPerModelQuotaProvider = false,
  errorText: string = ""
): string | null {
  if (shouldParkCreditsExhausted(status, result, isPerModelQuotaProvider, errorText)) {
    return "credits_exhausted";
  }
  if (isNonTerminalProviderError(providerErrorType)) {
    return null;
  }
  if (result.permanent || providerErrorType === PROVIDER_ERROR_TYPES.FORBIDDEN) {
    return "banned";
  }
  if (isExpiredAuthFailure(status, providerErrorType, provider)) {
    return "expired";
  }
  return null;
}
