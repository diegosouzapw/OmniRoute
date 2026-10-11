import { buildErrorBody } from "../utils/error.ts";
import { maskAccountId } from "./accountRotation.ts";
import {
  requiredProxyUnavailableFingerprints,
  type ScopedAccount,
} from "./opencodeAccountScope.ts";
import type { ExecutorExecuteResult, ExecutorLog, ProviderCredentials } from "./base.ts";

/** Log blocked accounts and fail closed when none can safely dispatch. */
export function guardRequiredAccountProxies(
  credentials: ProviderCredentials,
  accounts: ScopedAccount[],
  log: ExecutorLog | null | undefined,
  correlationPrefix: string
): ExecutorExecuteResult | null {
  const blockedAccounts = requiredProxyUnavailableFingerprints(credentials);
  for (const fingerprint of blockedAccounts) {
    log?.warn?.(
      "OPENCODE",
      `${correlationPrefix}skipping account ${maskAccountId(fingerprint)}: required proxy unavailable`
    );
  }
  if (accounts.length > 0 || blockedAccounts.length === 0) return null;

  return {
    response: new Response(
      JSON.stringify(
        buildErrorBody(503, "Required account proxy is unavailable", undefined, {
          code: "proxy_unavailable",
        })
      ),
      { status: 503, headers: { "Content-Type": "application/json" } }
    ),
    url: "",
    headers: {},
    transformedBody: null,
  };
}
