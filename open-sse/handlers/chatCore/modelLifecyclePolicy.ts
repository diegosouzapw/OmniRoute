import { HTTP_STATUS } from "../../config/constants.ts";
import {
  formatModelLifecycleMessage,
  getModelLifecycleDecision,
} from "../../services/modelLifecycle.ts";
import { resolveModelAlias } from "../../services/modelDeprecation.ts";
import { createErrorResult } from "../../utils/error.ts";

type LifecycleLogger = {
  info?: (tag: string, message: string) => unknown;
  warn?: (tag: string, message: string) => unknown;
} | null;

function getModelLifecycleError({
  provider,
  model,
  log,
  warnOnDeprecation = false,
}: {
  provider: string;
  model: string;
  log?: LifecycleLogger;
  warnOnDeprecation?: boolean;
}): ReturnType<typeof createErrorResult> | null {
  const decision = getModelLifecycleDecision(provider, model);
  const message = formatModelLifecycleMessage(decision);
  if (message && (decision.action === "reject" || warnOnDeprecation)) {
    log?.warn?.("MODEL_LIFECYCLE", message);
  }
  if (decision.action !== "reject" || !message) return null;
  return createErrorResult(
    HTTP_STATUS.GONE,
    message,
    null,
    "model_shutdown",
    "invalid_request_error"
  );
}

export function checkLifecycle(provider: string, model: string, log?: LifecycleLogger) {
  return getModelLifecycleError({
    provider,
    // #11503: pass the provider so a globally deprecated id this provider still serves
    // under its original name is left alone instead of rewritten into a 404.
    model: resolveModelAlias(model, provider),
    log,
  });
}

export function resolveLifecycle(provider: string, model: string, log?: LifecycleLogger) {
  const resolvedModel = resolveModelAlias(model, provider);
  if (resolvedModel !== model) {
    log?.info?.("ALIAS", `Model alias applied: ${model} → ${resolvedModel}`);
  }
  const lifecycleError = getModelLifecycleError({
    provider,
    model: resolvedModel,
    log,
    warnOnDeprecation: true,
  });
  return [resolvedModel, resolvedModel === model ? model : resolvedModel, lifecycleError] as const;
}
