import { getAllModelLockouts, lockExactModel } from "./accountFallback.ts";

/** A bounded, connection-specific rejection; never a persisted entitlement rule. */
export const COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS = 6 * 60 * 60 * 1000;
export const COPILOT_MODEL_REJECTION_REASON = "copilot_model_not_supported" as const;
const COPILOT_PROVIDERS = new Set(["github", "ghe-copilot"]);

/**
 * Preserve the merged helper's API for callers holding the upstream error text. The rejection is
 * an exact-model lock: it lives in its own key namespace, so a later quota-family cooldown
 * (rate_limit, model_capacity, …) on the same model can neither erase nor relabel it.
 */
export function lockCopilotModelNotSupported(
  provider: string | null | undefined,
  connectionId: string,
  model: string | null | undefined,
  errorText: string
): boolean {
  if (!provider || !COPILOT_PROVIDERS.has(provider) || !model) return false;
  if (!/model_not_supported/i.test(errorText || "")) return false;
  lockExactModel(
    provider,
    connectionId,
    model,
    COPILOT_MODEL_REJECTION_REASON,
    COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS
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

/** Exact-lock keys store the model trimmed + lower-cased; compare in that same form. */
export function normalizeRejectedModel(model: string): string {
  return model.trim().toLowerCase();
}

export function getCopilotModelRejections() {
  const now = Date.now();
  return getAllModelLockouts().flatMap((entry) =>
    COPILOT_PROVIDERS.has(entry.provider) &&
    entry.reason === COPILOT_MODEL_REJECTION_REASON &&
    entry.until > now
      ? [{ ...entry, remainingMs: entry.until - now }]
      : []
  );
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
      .filter(
        (entry) => entry.provider === provider && entry.model === normalizeRejectedModel(model)
      )
      .map((entry) => entry.connectionId)
  );
  return connections.every((connection) => rejected.has(connection.id));
}

/** Connection filter states that never reach the cooldown branch of getProviderCredentials. */
const NON_COOLDOWN_FILTER_STATES = new Set([
  "excluded",
  "modelExcluded",
  "modelNotAdvertised",
  "terminalStatus",
]);

/**
 * `{ modelNotSupported: true }` when every cooldown-blocked connection carries a learned
 * Copilot rejection for this model, `{}` otherwise — spread into the all-rate-limited result.
 */
export function copilotRejectionFlag(
  provider: string,
  model: string | null | undefined,
  connections: ReadonlyArray<{ id: string }>,
  filterStatus: ReadonlyMap<string, string>
): { modelNotSupported?: true } {
  const blocked = connections.filter(
    (connection) => !NON_COOLDOWN_FILTER_STATES.has(filterStatus.get(connection.id) ?? "")
  );
  return areCopilotConnectionsRejected(provider, model, blocked) ? { modelNotSupported: true } : {};
}
