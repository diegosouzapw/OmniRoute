import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry";

import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";

const IMAGE_PROVIDER_VALIDATION_ENDPOINTS: Record<
  string,
  { baseUrl?: string; path: string; method?: string }
> = {
  nanobanana: {
    baseUrl: "https://api.nanobananaapi.ai",
    path: "/api/v1/common/credit",
  },
  "fal-ai": {
    baseUrl: "https://api.fal.ai",
    path: "/v1/models?limit=1",
  },
  "stability-ai": {
    path: "/v1/user/account",
  },
  "black-forest-labs": {
    path: "/v1/credits",
  },
  recraft: {
    path: "/v1/users/me",
  },
  topaz: {
    path: "/account/v1/credits/balance",
  },
};

function normalizeBaseUrl(baseUrl: string) {
  return (baseUrl || "").trim().replace(/\/$/, "");
}

function applyCustomUserAgent(headers: Record<string, string>, providerSpecificData: any = {}) {
  const customUserAgent =
    typeof providerSpecificData?.customUserAgent === "string"
      ? providerSpecificData.customUserAgent.trim()
      : "";
  if (customUserAgent) {
    headers["user-agent"] = customUserAgent;
  }
  return headers;
}

function toValidationErrorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error || "Validation failed");
  const statusCode = getSafeOutboundFetchErrorStatus(error);

  return {
    valid: false,
    error: message || "Validation failed",
    unsupported: false,
    ...(statusCode ? { statusCode } : {}),
    ...(error instanceof SafeOutboundFetchError && error.code === "TIMEOUT"
      ? { timeout: true }
      : {}),
    ...(statusCode === 400 ? { securityBlocked: true } : {}),
  };
}

function buildImageProviderValidationHeaders(
  imageProvider: any,
  apiKey: string,
  providerSpecificData: any = {}
) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (apiKey) {
    switch (String(imageProvider?.authHeader || "").toLowerCase()) {
      case "bearer":
        headers.Authorization = `Bearer ${apiKey}`;
        break;
      case "key":
        headers.Authorization = `Key ${apiKey}`;
        break;
      case "x-key":
        headers["x-key"] = apiKey;
        break;
      case "x-api-key":
        headers["X-API-Key"] = apiKey;
        break;
      case "none":
        break;
      default:
        headers.Authorization = `Bearer ${apiKey}`;
        break;
    }
  }

  return applyCustomUserAgent(headers, providerSpecificData);
}

async function validationRead(url: string, init: RequestInit) {
  return safeOutboundFetch(url, {
    ...SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
    guard: getProviderOutboundGuard(),
    ...init,
  });
}

export async function validateImageProviderApiKey({
  provider,
  apiKey,
  providerSpecificData = {},
}: any) {
  const imageProvider = getImageProvider(provider);
  const validationConfig = IMAGE_PROVIDER_VALIDATION_ENDPOINTS[provider];

  if (!imageProvider || !validationConfig) {
    return { valid: false, error: "Provider validation not supported", unsupported: true };
  }

  try {
    const baseUrl = normalizeBaseUrl(
      providerSpecificData?.baseUrl || validationConfig.baseUrl || imageProvider.baseUrl
    );
    const url = `${baseUrl}${validationConfig.path}`;
    const response = await validationRead(url, {
      method: validationConfig.method || "GET",
      headers: buildImageProviderValidationHeaders(imageProvider, apiKey, providerSpecificData),
    });

    if (response.ok) {
      return { valid: true, error: null, method: "image-provider" };
    }

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key", method: "image-provider" };
    }

    if (response.status === 429) {
      return {
        valid: false,
        error: "Validation rate limited (429)",
        method: "image-provider",
      };
    }

    if (response.status >= 500) {
      return {
        valid: false,
        error: `Provider unavailable (${response.status})`,
        method: "image-provider",
      };
    }

    return {
      valid: false,
      error: `Validation failed: ${response.status}`,
      method: "image-provider",
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
