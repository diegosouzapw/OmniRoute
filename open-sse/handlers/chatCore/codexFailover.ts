import { persistCodexChildCooldown } from "../../services/codexAccount/index.ts";

type CodexFailoverCredentials = {
  connectionId?: string | null;
  providerSpecificData?: unknown;
};

export async function markCodexScopeRateLimited(params: {
  failedConnectionId: string;
  model: string | null;
  rateLimitedUntil: string;
  credentials?: CodexFailoverCredentials | null;
}): Promise<void> {
  const persisted = params.model
    ? await persistCodexChildCooldown({
        connectionId: params.failedConnectionId,
        model: params.model,
        rateLimitedUntil: params.rateLimitedUntil,
      }).catch(() => null)
    : null;

  if (
    persisted &&
    params.credentials &&
    String(params.credentials.connectionId) === params.failedConnectionId
  ) {
    params.credentials.providerSpecificData = persisted.providerSpecificData;
  }
}
