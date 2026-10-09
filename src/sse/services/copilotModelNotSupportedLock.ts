import { lockModel } from "@omniroute/open-sse/services/accountFallback.ts";

/** Bounded TTL so a transient Copilot outage never hides a model for long (#15634). */
export const COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS = 6 * 60 * 60 * 1000;

const COPILOT_PROVIDERS = new Set(["github", "ghe-copilot"]);

/**
 * #15634: Copilot sometimes answers 400 `model_not_supported` for a model its own
 * /models listed. Remember it in memory for this connection so direct (non-combo)
 * requests stop retrying it. No DB write, no account cooldown.
 */
export function lockCopilotModelNotSupported(
  provider: string | null | undefined,
  connectionId: string,
  model: string | null | undefined,
  errorText: string
): boolean {
  if (!provider || !COPILOT_PROVIDERS.has(provider) || !model) return false;
  if (!/model_not_supported/i.test(errorText || "")) return false;
  lockModel(provider, connectionId, model, "model_capacity", COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS);
  return true;
}
