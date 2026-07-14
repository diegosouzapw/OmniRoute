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
