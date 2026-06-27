// Resolve the model used for routing. The `X-Route-Model` header, when present,
// overrides `body.model` — letting a caller/proxy force a specific combo/alias/model
// regardless of what the client CLI sent. This is useful when a CLI hardcodes
// `body.model` to a fixed provider/model (bypassing combo routing): an upstream
// proxy can send `X-Route-Model` to restore routing control without mutating the
// request body. The resolved value still flows through `enforceApiKeyPolicy`, so
// it cannot bypass per-key model/combo allowlists. See PR #4863.

type HeaderCarrier = { headers: { get(name: string): string | null } };

export function resolveRoutingModel(
  request: HeaderCarrier,
  body: { model?: string | null }
): string | null | undefined {
  const headerModel = request.headers.get("x-route-model")?.trim();
  return headerModel || body.model;
}
