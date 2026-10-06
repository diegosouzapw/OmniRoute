/**
 * Local-only Radar model overrides and tombstones.
 *
 * The browser never sends these settings to the private Radar server. The
 * route is management-authenticated and exists only while RADAR_ENABLED is on.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  clearRadarLocalModelOverride,
  listRadarLocalModelState,
  setRadarLocalModelOverride,
  setRadarModelTombstone,
} from "@/lib/db/radar";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "@/shared/middleware/bodySizeGuard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const providerSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9][a-z0-9._-]{0,99}$/i);
const modelIdSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .refine((value) => !/[\u0000-\u001f\u007f]/.test(value));
const identityShape = { provider: providerSchema, modelId: modelIdSchema };

const overrideSchema = z
  .object({
    ...identityShape,
    displayName: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .refine((value) => !/[\u0000-\u001f\u007f]/.test(value))
      .nullable()
      .optional(),
    enabled: z.boolean().nullable().optional(),
  })
  .strict()
  .refine(
    (value) =>
      Object.prototype.hasOwnProperty.call(value, "displayName") ||
      Object.prototype.hasOwnProperty.call(value, "enabled")
  );

const tombstoneSchema = z.object({ ...identityShape, tombstoned: z.boolean() }).strict();
const identitySchema = z.object(identityShape).strict();

function json(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { ...CORS_HEADERS, "Cache-Control": "no-store" },
  });
}

function error(status: number, message: string): NextResponse {
  return json(buildErrorBody(status, message), status);
}

async function authorize(request: Request): Promise<NextResponse | null> {
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) return error(404, "Not found");
  if (!(await isAuthenticated(request))) return error(401, "Unauthorized");
  return null;
}

const RADAR_LOCAL_STATE_BODY_LIMIT_BYTES = 4 * 1024;
type ReadJsonResult =
  { ok: true; value: unknown } | { ok: false; status: 400 | 413; message: string };

async function readJson(request: Request): Promise<ReadJsonResult> {
  try {
    const bytes = await readRequestBodyWithLimit(request, RADAR_LOCAL_STATE_BODY_LIMIT_BYTES);
    const raw = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, value: JSON.parse(raw) as unknown };
  } catch (cause: unknown) {
    return cause instanceof RequestBodyTooLargeError
      ? { ok: false, status: 413, message: "Request body too large" }
      : { ok: false, status: 400, message: "Invalid request body" };
  }
}

function stateResponse(): NextResponse {
  return json({ states: listRadarLocalModelState() });
}

function internalError(cause: unknown): NextResponse {
  return error(500, sanitizeErrorMessage(cause) || "Failed to update Radar local state");
}

export async function OPTIONS(): Promise<Response> {
  return handleCorsOptions();
}

export async function GET(request: Request): Promise<NextResponse> {
  const authError = await authorize(request);
  if (authError) return authError;
  try {
    return stateResponse();
  } catch (cause: unknown) {
    return internalError(cause);
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const authError = await authorize(request);
  if (authError) return authError;

  const body = await readJson(request);
  if (!body.ok) return error(body.status, body.message);
  const parsed = overrideSchema.safeParse(body.value);
  if (!parsed.success) return error(400, "Invalid Radar local override");

  try {
    const { provider, modelId, displayName, enabled } = parsed.data;
    const patch: { displayName?: string | null; enabled?: boolean | null } = {};
    if (Object.prototype.hasOwnProperty.call(parsed.data, "displayName")) {
      patch.displayName = displayName;
    }
    if (Object.prototype.hasOwnProperty.call(parsed.data, "enabled")) patch.enabled = enabled;
    if (!setRadarLocalModelOverride(provider, modelId, patch)) {
      return error(400, "Invalid Radar local override");
    }
    return stateResponse();
  } catch (cause: unknown) {
    return internalError(cause);
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  const authError = await authorize(request);
  if (authError) return authError;

  const body = await readJson(request);
  if (!body.ok) return error(body.status, body.message);
  const parsed = tombstoneSchema.safeParse(body.value);
  if (!parsed.success) return error(400, "Invalid Radar tombstone");

  try {
    const { provider, modelId, tombstoned } = parsed.data;
    if (!setRadarModelTombstone(provider, modelId, tombstoned)) {
      return error(400, "Invalid Radar tombstone");
    }
    return stateResponse();
  } catch (cause: unknown) {
    return internalError(cause);
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const authError = await authorize(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const parsed = identitySchema.safeParse({
    provider: url.searchParams.get("provider"),
    modelId: url.searchParams.get("modelId"),
  });
  if (!parsed.success) return error(400, "provider and modelId are required");

  try {
    if (!clearRadarLocalModelOverride(parsed.data.provider, parsed.data.modelId)) {
      return error(400, "Invalid Radar local override");
    }
    return stateResponse();
  } catch (cause: unknown) {
    return internalError(cause);
  }
}
