import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";

const FISH_AUDIO_API_BASE = "https://api.fish.audio";
const ALLOWED_RESPONSE_HEADERS = ["content-type", "content-disposition", "retry-after", "x-request-id"] as const;

type FishAudioCredentials = {
  apiKey?: string | null;
  accessToken?: string | null;
  allExpired?: boolean;
};

export function fishAudioOptionsResponse(): Response {
  return handleCorsOptions();
}

export function isSafeFishAudioVoiceId(value: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(value);
}

export function isFishAudioVoiceProvider(value: string): boolean {
  return value === "fishaudio";
}

function proxyResponseHeaders(upstream: Response): Headers {
  const headers = new Headers(CORS_HEADERS);
  for (const name of ALLOWED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

export async function proxyFishAudioRequest(
  request: Request,
  pathname: string,
  init: Omit<RequestInit, "headers"> = {}
): Promise<Response> {
  const credentials = (await getProviderCredentialsWithQuotaPreflight(
    "fishaudio"
  )) as FishAudioCredentials | null;
  if (credentials && isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse("fishaudio", credentials);
  }
  const apiKey = credentials?.apiKey || credentials?.accessToken;
  if (!apiKey || credentials?.allExpired) {
    return new Response(JSON.stringify(buildErrorBody(401, "No credentials for provider: fishaudio")), {
      status: 401,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${FISH_AUDIO_API_BASE}${pathname}`);
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${apiKey}`);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const accept = request.headers.get("accept");
  if (accept) headers.set("accept", accept);

  try {
    const upstream = await fetch(upstreamUrl, { ...init, headers });
    if (upstream.ok) {
      await clearRecoveredProviderState(credentials as Record<string, unknown>);
    }
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: proxyResponseHeaders(upstream),
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        buildErrorBody(
          502,
          sanitizeErrorMessage(error instanceof Error ? error.message : "Fish Audio request failed")
        )
      ),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
}
