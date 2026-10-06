import { z } from "zod";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

import {
  isVideoBridgeDrilldownRemoteAccessEnabled,
  VIDEO_DRILLDOWN_VARIANTS,
  VideoDrilldownLifecycle,
  type VideoDrilldownVariant,
} from "@/lib/guardrails/videoBridgeDrilldownLifecycle";
import { VideoDrilldownCache } from "@/lib/guardrails/videoBridgeDrilldown";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// A single process-wide lifecycle backs both this authenticated consumer route and any
// future in-process producer (the video bridge guardrail, once it threads a per-request
// opt-in flag through). It is intentionally a *different* cache instance from the internal
// loopback broker route's — this route never accepts raw frames from a remote caller, only
// opaque handles minted by an in-process producer, so there is no reason to share state with
// the loopback-only extraction broker surface.
const sharedLifecycle = new VideoDrilldownLifecycle({
  cache: new VideoDrilldownCache({
    maxEntries: 64,
    maxEntriesPerPrincipal: 16,
    maxBytesPerPrincipal: 64 * 1024 * 1024,
    maxTotalBytes: 256 * 1024 * 1024,
    ttlMs: 10 * 60 * 1000,
  }),
});

const HandleSchema = z
  .string()
  .regex(/^[0-9a-f]{64}$/, "handle must be an opaque 64-character hex value");
const VariantSchema = z.enum(VIDEO_DRILLDOWN_VARIANTS as [VideoDrilldownVariant, ...VideoDrilldownVariant[]]);
const BoundedIntSchema = z
  .string()
  .regex(/^\d{1,9}$/)
  .transform(Number);
const NonNegativeNumberSchema = z
  .string()
  .refine((value) => value.length > 0 && value.length <= 64 && Number.isFinite(Number(value)))
  .transform(Number)
  .refine((value) => value >= 0);

const ReadQuerySchema = z
  .object({
    end: NonNegativeNumberSchema.optional(),
    frames: BoundedIntSchema.pipe(z.number().int().min(1).max(8)).optional(),
    handle: HandleSchema,
    page: BoundedIntSchema.pipe(z.number().int().min(0)).optional(),
    start: NonNegativeNumberSchema.optional(),
    variant: VariantSchema.optional(),
  })
  .strict();
const DeleteQuerySchema = z.object({ handle: HandleSchema }).strict();

function queryRecord(searchParams: URLSearchParams): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of searchParams) values[key] = value;
  return values;
}

function corsJson(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function corsError(status: number, message: string, type: string): Response {
  return corsJson(status, buildErrorBody(status, message, null, { type }));
}

export interface VideoBridgeDrilldownRouteDependencies {
  isRemoteAccessEnabled?: () => boolean;
  lifecycle?: VideoDrilldownLifecycle;
}

async function resolvePrincipal(
  request: Request
): Promise<{ error?: Response; principalId?: string }> {
  const apiKey = extractApiKey(request);
  if (!apiKey) {
    return { error: corsError(401, "Authentication is required", "authentication_required") };
  }
  if (!(await isValidApiKey(apiKey))) {
    return { error: corsError(401, "The provided API key is invalid", "authentication_required") };
  }
  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return { error: policy.rejection };
  const principalId = policy.apiKeyInfo?.id;
  if (!principalId) {
    return { error: corsError(401, "Authentication is required", "authentication_required") };
  }
  return { principalId };
}

export const OPTIONS = async (): Promise<Response> => handleCorsOptions();

export async function handleVideoBridgeDrilldownConsumerRequest(
  request: Request,
  dependencies: VideoBridgeDrilldownRouteDependencies = {}
): Promise<Response> {
  const isRemoteAccessEnabled =
    dependencies.isRemoteAccessEnabled ?? isVideoBridgeDrilldownRemoteAccessEnabled;
  if (!isRemoteAccessEnabled()) {
    return corsError(
      403,
      "Video Bridge drill-down remote access is disabled",
      "feature_disabled"
    );
  }
  if (request.method !== "GET" && request.method !== "DELETE") {
    return corsError(405, "Method not allowed", "invalid_request");
  }
  const resolved = await resolvePrincipal(request);
  if (resolved.error) return resolved.error;
  const principalId = resolved.principalId!;
  const lifecycle = dependencies.lifecycle ?? sharedLifecycle;
  const url = new URL(request.url);
  const query = queryRecord(url.searchParams);

  if (request.method === "DELETE") {
    const parsed = DeleteQuerySchema.safeParse(query);
    if (!parsed.success) return corsError(400, "A valid drill-down handle is required", "invalid_request");
    const removed = lifecycle.deleteHandle(principalId, parsed.data.handle);
    return corsJson(200, { removed });
  }

  const parsed = ReadQuerySchema.safeParse(query);
  if (!parsed.success) return corsError(400, "Invalid Video Bridge drill-down query", "invalid_request");
  const page = await lifecycle.resolve(principalId, parsed.data.handle, {
    endSeconds: parsed.data.end,
    frameCount: parsed.data.frames,
    page: parsed.data.page,
    startSeconds: parsed.data.start,
    variant: parsed.data.variant,
  });
  if (!page) {
    return corsError(404, "Video Bridge drill-down result was not found", "not_found");
  }
  return corsJson(200, page);
}

export async function GET(request: Request): Promise<Response> {
  return handleVideoBridgeDrilldownConsumerRequest(request);
}

export async function DELETE(request: Request): Promise<Response> {
  return handleVideoBridgeDrilldownConsumerRequest(request);
}
