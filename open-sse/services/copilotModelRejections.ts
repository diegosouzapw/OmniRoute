import { getAllModelLockouts, lockModel } from "./accountFallback.ts";

/** A bounded, connection-specific rejection; never a persisted entitlement rule. */
export const COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS = 6 * 60 * 60 * 1000;
export const COPILOT_MODEL_REJECTION_REASON = "copilot_model_not_supported" as const;
const COPILOT_PROVIDERS = new Set(["github", "ghe-copilot"]);

/** Preserve the merged helper's API for callers holding the upstream error text. */
export function lockCopilotModelNotSupported(
  provider: string | null | undefined,
  connectionId: string,
  model: string | null | undefined,
  errorText: string
): boolean {
  if (!provider || !COPILOT_PROVIDERS.has(provider) || !model) return false;
  if (!/model_not_supported/i.test(errorText || "")) return false;
  lockModel(
    provider,
    connectionId,
    model,
    COPILOT_MODEL_REJECTION_REASON,
    COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS,
    { modelUnsupportedUntil: Date.now() + COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS }
  );
  return true;
}

/** The HTTP path must learn from the original structured upstream code, not sanitized prose. */
export function learnCopilotModelRejection(
  status: number,
  provider: string,
  connectionId: string,
  model: string,
  body: unknown
): boolean {
  if (status !== 400) return false;
  let payload = body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return false;
    }
  }
  if (!payload || typeof payload !== "object") return false;
  const root = payload as Record<string, unknown>;
  const error =
    root.error && typeof root.error === "object" ? (root.error as Record<string, unknown>) : root;
  return (
    error.code === "model_not_supported" &&
    lockCopilotModelNotSupported(provider, connectionId, model, "model_not_supported")
  );
}

export function getCopilotModelRejections() {
  const now = Date.now();
  return getAllModelLockouts().flatMap((entry) => {
    const until = entry.modelUnsupportedUntil ?? 0;
    return COPILOT_PROVIDERS.has(entry.provider) && until > now
      ? [{ ...entry, until, remainingMs: until - now }]
      : [];
  });
}

/** Stable between state changes; expiry/clear change it without a database write. */
export function getCopilotRejectionCatalogVersion(): string {
  return JSON.stringify(
    getCopilotModelRejections()
      .map((entry) =>
        JSON.stringify([entry.provider, entry.connectionId, entry.model, entry.until])
      )
      .sort()
  );
}

export function areCopilotConnectionsRejected(
  provider: string,
  model: string | null | undefined,
  connections: ReadonlyArray<{ id: string }>
): boolean {
  if (!model || !COPILOT_PROVIDERS.has(provider) || connections.length === 0) return false;
  const rejected = new Set(
    getCopilotModelRejections()
      .filter((entry) => entry.provider === provider && entry.model === model)
      .map((entry) => entry.connectionId)
  );
  return connections.every((connection) => rejected.has(connection.id));
}
