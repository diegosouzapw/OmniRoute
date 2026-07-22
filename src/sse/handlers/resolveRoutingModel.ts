// Resolve the model used for routing. The `X-Route-Model` header, when present,
// overrides `body.model` — letting a caller/proxy force a specific combo/alias/model
// regardless of what the client CLI sent. This is useful when a CLI hardcodes
// `body.model` to a fixed provider/model (bypassing combo routing): an upstream
// proxy can send `X-Route-Model` to restore routing control without mutating the
// request body. The resolved value still flows through `enforceApiKeyPolicy`, so
// it cannot bypass per-key model/combo allowlists. See PR #4863.
//
// IMPORTANT: callers MUST then align `body.model` with the resolved value via
// `alignBodyModelWithRouting` (or equivalent). Otherwise the post-guardrail
// "body.model !== modelStr → adopt body.model" path silently undoes the header
// override and routes to the original body model (e.g. opencode-zen 401 while
// logs still show the X-Route-Model target like zai/glm-5.2).

type HeaderCarrier = { headers: { get(name: string): string | null } };

export function resolveRoutingModel(
  request: HeaderCarrier,
  body: { model?: string | null }
): string | null | undefined {
  const headerModel = request.headers.get("x-route-model")?.trim();
  return headerModel || body.model;
}

/**
 * Keep body.model in sync with the routing model after resolveRoutingModel.
 * Returns the (possibly new) body object and whether body.model was rewritten.
 */
export function alignBodyModelWithRouting<T extends { model?: unknown }>(
  body: T,
  modelStr: string | null | undefined
): { body: T; aligned: boolean; previousModel: string | null } {
  const previousModel = typeof body?.model === "string" ? body.model : null;
  if (!modelStr || typeof modelStr !== "string" || modelStr.length === 0) {
    return { body, aligned: false, previousModel };
  }
  if (previousModel === modelStr) {
    return { body, aligned: false, previousModel };
  }
  return {
    body: { ...body, model: modelStr },
    aligned: true,
    previousModel,
  };
}

type RoutingLogger = { info: (tag: string, msg: string) => void };

/**
 * Thin wrapper around alignBodyModelWithRouting that also emits the ROUTING
 * log line, kept out of chat.ts so the caller stays a one-liner.
 *
 * Callers MUST run this immediately after resolveRoutingModel. Without it,
 * the post-guardrail "body.model !== modelStr → adopt body.model" reconcile
 * path (see reconcileGuardrailReroute below) treats a mismatched body.model
 * as a guardrail reroute and silently restores it — undoing an X-Route-Model
 * header override (e.g. header zai/glm-5.2 + body opencode-zen/gpt-5.4 → 401
 * Missing API key while HTTP logs still show zai).
 */
export function applyRoutingModelAlignment<T extends { model?: unknown }>(
  body: T,
  modelStr: string | null | undefined,
  log: RoutingLogger
): T {
  const aligned = alignBodyModelWithRouting(body, modelStr);
  if (aligned.aligned) {
    log.info(
      "ROUTING",
      `Aligned body.model to routing model: ${aligned.previousModel || "(none)"} → ${modelStr}`
    );
  }
  return aligned.body;
}

type GuardrailRerouteLogger = {
  info: (tag: string, msg: string) => void;
  warn: (tag: string, msg: string) => void;
};

/**
 * Keep body.model glued to modelStr after a stage that may override modelStr
 * (e.g. a pre-request hook) without necessarily rewriting body.model itself.
 * Returns the (possibly new) body/modelStr and logs the override when the
 * hook actually changed modelStr.
 */
export function reconcileModelOverride<T extends { model?: unknown }>(params: {
  body: T;
  modelStr: string;
  overrideModel: string | null | undefined;
  logTag: string;
  log: GuardrailRerouteLogger;
}): { body: T; modelStr: string } {
  const { body, overrideModel, logTag, log } = params;
  let { modelStr } = params;

  if (overrideModel && overrideModel !== modelStr) {
    log.info("ROUTING", `${logTag}: ${modelStr} → ${overrideModel}`);
    modelStr = overrideModel;
    if (typeof body?.model !== "string" || body.model !== modelStr) {
      return { body: { ...body, model: modelStr }, modelStr };
    }
    return { body, modelStr };
  }
  if (modelStr && typeof body?.model === "string" && body.model !== modelStr) {
    // The stage rewrote body without updating model — restore the routing model.
    return { body: { ...body, model: modelStr }, modelStr };
  }
  return { body, modelStr };
}

/**
 * Reconcile body.model after the pre-call guardrail pipeline runs. A guardrail
 * (e.g. Vision Bridge auto-reroute) can swap body.model AFTER
 * enforceApiKeyPolicy already validated modelStr's allowlist/budget, so any
 * genuine change must be re-checked against the same per-key allowlist before
 * being adopted as the new routing model. `modelBeforeGuardrails` must be a
 * snapshot of body.model taken immediately before the guardrail payload was
 * applied — comparing against a stale/aligned value would misclassify a
 * legitimate X-Route-Model alignment as a guardrail reroute.
 */
export async function reconcileGuardrailReroute<T extends { model?: unknown }>(params: {
  body: T;
  modelBeforeGuardrails: string;
  modelStr: string;
  apiKey: string | null | undefined;
  apiKeyId: string | undefined;
  isModelAllowedForKey: (apiKey: string | null | undefined, model: string) => Promise<boolean>;
  log: GuardrailRerouteLogger;
}): Promise<{ body: T; modelStr: string }> {
  const { body, modelBeforeGuardrails, apiKey, apiKeyId, isModelAllowedForKey, log } = params;
  let { modelStr } = params;

  if (body?.model && typeof body.model === "string" && body.model !== modelBeforeGuardrails) {
    const rerouteModel = body.model;
    const rerouteAllowed = await isModelAllowedForKey(apiKey, rerouteModel);
    if (!rerouteAllowed) {
      log.warn(
        "POLICY",
        `Guardrail reroute to "${rerouteModel}" rejected by API key policy (key=${apiKeyId || "unknown"}); keeping original model "${modelStr}"`
      );
      return { body: { ...body, model: modelStr }, modelStr };
    }
    log.info("ROUTING", `Guardrail model reroute: ${modelBeforeGuardrails} → ${rerouteModel}`);
    return { body, modelStr: rerouteModel };
  }
  // Guardrails returned a payload whose model drifted from modelStr without
  // changing from the pre-guardrail value (should not happen after align), or
  // stripped model — keep body.model glued to modelStr.
  if (modelStr && typeof body?.model === "string" && body.model !== modelStr) {
    return { body: { ...body, model: modelStr }, modelStr };
  }
  return { body, modelStr };
}

// Grouped under one namespace so chat.ts needs a single extra import name
// alongside resolveRoutingModel — see each function's own doc comment above.
export const RoutingModelOps = {
  align: applyRoutingModelAlignment,
  reconcileGuardrailReroute,
  reconcileModelOverride,
};
