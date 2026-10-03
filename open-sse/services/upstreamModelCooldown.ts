import { isOpencodeFreeTierRefusalForProvider } from "../executors/opencodeGeoBlock.ts";
import { getOpencodeModelUnavailableMatch } from "../config/providerErrorRules.ts";
import { getModelLockoutInfo, lockModel } from "./accountFallback.ts";

// A shared model key excludes the failed model on every account, without modifying accounts.
const MODEL_UPSTREAM_SCOPE = "__upstream_model__";

export function noteUpstreamModelFailure(
  provider: string,
  model: string,
  status: number,
  error: unknown
): boolean {
  const match = getOpencodeModelUnavailableMatch(provider, status, null, error);
  if (!match || !model) return false;
  lockModel(
    provider,
    MODEL_UPSTREAM_SCOPE,
    model,
    "model_capacity",
    Math.min(match.cooldownMs ?? 120_000, 1_800_000)
  );
  return true;
}

export function getUpstreamModelCooldown(provider: string, model: string) {
  return getModelLockoutInfo(provider, MODEL_UPSTREAM_SCOPE, model);
}

export function noteUpstreamModelRefusal(
  provider: string,
  model: string,
  status: number,
  error: string
): void {
  if (!isOpencodeFreeTierRefusalForProvider(provider, status, error)) return;
  lockModel(provider, MODEL_UPSTREAM_SCOPE, model, "request_refused", 180_000);
}
