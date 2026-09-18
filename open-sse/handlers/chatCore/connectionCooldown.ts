import { updateProviderConnection } from "@/lib/db/providers";
import { shouldIsolateProbeFailures } from "@/shared/utils/probeOrigin";

/**
 * chatCore leaf for the non-terminal "exclude this connection for a while"
 * outcomes (GEO_BLOCKED, GCP_PROJECT_REQUIRED): record the error on the
 * connection and park it via rateLimitedUntil so selection prefers sibling
 * accounts, without ever marking it banned/expired.
 */
export async function excludeConnectionForCooldown(params: {
  connectionId: string;
  errorType: string;
  message: string;
  statusCode: number;
  cooldownMs: number;
  /**
   * T-PROBE (#9817): when true, a probe-origin failure records the error but
   * does not push the connection into the cooldown (routing state untouched).
   */
  skipCooldownForProbe: boolean;
  /** Log wording: `[provider] Node <id> <label> (<status>) — excluded for <s>s, <suffix>` */
  label: string;
  suffix: string;
}): Promise<void> {
  const { connectionId, errorType, message, statusCode, cooldownMs, label, suffix } = params;
  await updateProviderConnection(connectionId, {
    lastErrorType: errorType,
    lastError: message,
    errorCode: statusCode,
  });
  if (!(params.skipCooldownForProbe && (await shouldIsolateProbeFailures()))) {
    try {
      const { setConnectionRateLimitUntil } = await import("@/lib/db/providers");
      setConnectionRateLimitUntil(connectionId, Date.now() + cooldownMs);
    } catch {
      // DB write failure must never break the fallback loop
    }
  }
  console.warn(
    `[provider] Node ${connectionId} ${label} (${statusCode}) — excluded for ${Math.ceil(cooldownMs / 1000)}s, ${suffix}`
  );
}
