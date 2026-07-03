import { NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import {
  resolveHfPipelineTag,
  sortHfSuggestedModels,
  type HfModelSummary,
} from "@omniroute/open-sse/services/hfModelSuggestions.ts";

/**
 * GET /api/v1/providers/suggested-models?type=image
 *
 * Proxies the public HuggingFace Hub models search API
 * (https://huggingface.co/api/models) server-side so the dashboard can
 * suggest HF Hub models for a media provider kind without a CORS round-trip
 * from the browser and without ever exposing an HF token client-side.
 *
 * This route is a read-only proxy to a public search endpoint — it never
 * spawns a child process, so it does NOT require `isLocalOnlyPath()`
 * classification in `src/server/authz/routeGuard.ts` (Hard Rules #15/#17
 * only apply to routes that spawn processes or reverse-proxy embedded
 * service UIs).
 */

const HF_MODELS_API_URL = "https://huggingface.co/api/models";
const HF_SEARCH_PAGE_SIZE = 100;
const HF_FETCH_TIMEOUT_MS = 8000;

const querySchema = z.object({
  type: z.enum(["image"]).default("image"),
  sortBy: z.enum(["downloads", "likes"]).default("downloads"),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Authentication required"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    type: searchParams.get("type") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query parameters"),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { type, sortBy, limit } = parsed.data;
  const pipelineTag = resolveHfPipelineTag(type);
  if (!pipelineTag) {
    return NextResponse.json(
      buildErrorBody(400, `Unsupported suggested-models type: ${type}`),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  try {
    const upstreamUrl = new URL(HF_MODELS_API_URL);
    upstreamUrl.searchParams.set("inference_provider", "hf-inference");
    upstreamUrl.searchParams.set("pipeline_tag", pipelineTag);
    upstreamUrl.searchParams.set("limit", String(HF_SEARCH_PAGE_SIZE));

    // This project has no dedicated server-side HF Hub search token config
    // (HuggingFace credentials are per-connection, stored encrypted in the
    // DB — see src/lib/db/providers.ts — not a raw env var), and an HF token
    // must never be exposed client-side. The public HF Hub models search
    // endpoint works fine unauthenticated, so this route calls it without
    // credentials.
    const upstream = await fetch(upstreamUrl.toString(), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(HF_FETCH_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        buildErrorBody(502, `HuggingFace Hub API responded with status ${upstream.status}`),
        { status: 502, headers: CORS_HEADERS }
      );
    }

    const raw: unknown = await upstream.json();
    const models: HfModelSummary[] = Array.isArray(raw)
      ? raw.filter(
          (m): m is HfModelSummary =>
            !!m && typeof m === "object" && typeof (m as { id?: unknown }).id === "string"
        )
      : [];

    const suggested = sortHfSuggestedModels(models, sortBy, limit);

    return NextResponse.json(
      {
        object: "list",
        type,
        pipeline_tag: pipelineTag,
        data: suggested.map((m) => ({
          id: m.id,
          likes: typeof m.likes === "number" ? m.likes : 0,
          downloads: typeof m.downloads === "number" ? m.downloads : 0,
        })),
      },
      { headers: CORS_HEADERS }
    );
  } catch (err) {
    return NextResponse.json(
      buildErrorBody(502, err instanceof Error ? err.message : String(err)),
      { status: 502, headers: CORS_HEADERS }
    );
  }
}
