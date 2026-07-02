import { CORS_HEADERS } from "@/shared/utils/cors";

/**
 * #4674 — Shared logic for `GET /v1/models/{model}`.
 *
 * Before this route existed, a request for a single model fell through to the
 * Next.js catch-all and returned the HTML dashboard, which broke Claude Code's
 * model-validation probe (it expects the OpenAI `{ id, object: "model", ... }`
 * shape). Kept in a sibling module (not the route file) so the lookup stays
 * unit-testable without the DB-backed catalog.
 */

type CatalogModel = { id?: unknown } & Record<string, unknown>;

/**
 * Find a model entry in the unified catalog `data` array by id.
 *
 * Exact-case matches win; failing that we fall back to a case-insensitive match
 * so clients that normalise the model id (#5082 — OpenCode requesting
 * `minimax/minimax-m3` for the canonical `minimax/MiniMax-M3`) still resolve the
 * real entry — and its `context_length` — instead of falling back to 0.
 */
export function findModelById(
  data: CatalogModel[] | null | undefined,
  requestedId: string
): CatalogModel | null {
  if (!Array.isArray(data)) return null;
  const exact = data.find((m) => typeof m?.id === "string" && m.id === requestedId);
  if (exact) return exact;
  const lower = requestedId.toLowerCase();
  return data.find((m) => typeof m?.id === "string" && m.id.toLowerCase() === lower) ?? null;
}

/**
 * Resolve a single model from the unified catalog response.
 *
 * @param getModels  Returns the `{ object: "list", data: [...] }` Response — in
 *   the route this is `getUnifiedModelsResponse`; tests inject a fake.
 */
export async function handleGetModelById(
  request: Request,
  requestedId: string,
  getModels: (request: Request, corsHeaders?: Record<string, string>) => Promise<Response>
): Promise<Response> {
  const listResp = await getModels(request, CORS_HEADERS);
  // Propagate auth rejections / 5xx (already JSON) unchanged.
  if (!listResp.ok) return listResp;

  let data: CatalogModel[] | undefined;
  try {
    const body = (await listResp.json()) as { data?: CatalogModel[] };
    data = body?.data;
  } catch {
    data = undefined;
  }

  const found = findModelById(data, requestedId);
  if (found) {
    return Response.json(found, { headers: CORS_HEADERS });
  }

  return Response.json(
    {
      error: {
        message: `The model '${requestedId}' does not exist`,
        type: "invalid_request_error",
        code: "model_not_found",
      },
    },
    { status: 404, headers: CORS_HEADERS }
  );
}
