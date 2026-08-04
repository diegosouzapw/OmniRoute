import { isResourceNotFoundResponse } from "@omniroute/open-sse/services/errorClassifier.ts";

type HealthLogger = {
  info(tag: string, message: string): void;
};

export type Resource404CooldownBypass = {
  shouldFallback: false;
  cooldownMs: 0;
};

/**
 * Return a no-cooldown decision when a 404 belongs to this request's resource,
 * rather than to the selected model, endpoint, account, or provider.
 */
export function getResource404Bypass(
  status: number,
  errorText: string,
  connectionId: string,
  logger: HealthLogger
): Resource404CooldownBypass | null {
  if (status !== 404 || !isResourceNotFoundResponse(errorText)) return null;
  logger.info(
    "AUTH",
    `${connectionId.slice(0, 8)} request-resource 404; skipping model/account cooldown`
  );
  return { shouldFallback: false, cooldownMs: 0 };
}
