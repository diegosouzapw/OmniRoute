import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { unavailableResponse } from "@omniroute/open-sse/utils/error.ts";

export type RateLimitedCredentials = {
  allRateLimited: true;
  retryAfter?: string | number | Date | null;
  retryAfterHuman?: string;
};

export function isAllRateLimitedCredentials(value: unknown): value is RateLimitedCredentials {
  return (
    !!value &&
    typeof value === "object" &&
    (value as RateLimitedCredentials).allRateLimited === true
  );
}

export function rateLimitedProviderResponse(
  provider: string,
  credentials: RateLimitedCredentials
): Response {
  return unavailableResponse(
    HTTP_STATUS.RATE_LIMITED,
    `[${provider}] All accounts rate limited`,
    credentials.retryAfter,
    credentials.retryAfterHuman
  );
}
