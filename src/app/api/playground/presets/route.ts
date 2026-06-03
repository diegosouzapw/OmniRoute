/**
 * GET  /api/playground/presets  — list presets
 * POST /api/playground/presets  — create a preset
 *
 * Auth: optional (extractApiKey + isValidApiKey; required when REQUIRE_API_KEY=true).
 * Hard Rule #5: all DB access via src/lib/db/playgroundPresets (never raw SQL).
 * Hard Rule #12: all error paths via buildErrorBody.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { listPlaygroundPresets, createPlaygroundPreset } from "@/lib/db/playgroundPresets";
import { PlaygroundPresetCreateSchema } from "@/shared/schemas/playground";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

function errorResp(status: number, message: string): Response {
  return new Response(
    JSON.stringify(buildErrorBody(status, sanitizeErrorMessage(message))),
    {
      status,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}

async function checkAuth(request: Request): Promise<Response | null> {
  const apiKeyRaw = extractApiKey(request);
  if (process.env.REQUIRE_API_KEY === "true" && !apiKeyRaw) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }
  return null;
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * GET /api/playground/presets
 * Returns { presets: PlaygroundPresetListItem[] }
 */
export async function GET(request: Request): Promise<Response> {
  const authError = await checkAuth(request);
  if (authError) return authError;

  try {
    const presets = listPlaygroundPresets();
    return new Response(JSON.stringify({ presets }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to list presets"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, safeMsg);
  }
}

/**
 * POST /api/playground/presets
 * Body: PlaygroundPresetCreateSchema
 * Returns the created preset with status 201.
 */
export async function POST(request: Request): Promise<Response> {
  const authError = await checkAuth(request);
  if (authError) return authError;

  // 1. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResp(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // 2. Validate (Hard Rule #7)
  const parsed = PlaygroundPresetCreateSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid request body";
    return errorResp(HTTP_STATUS.BAD_REQUEST, message);
  }
  const body = parsed.data;

  // 3. Create preset (Hard Rule #5 — via DB module)
  try {
    const created = createPlaygroundPreset({
      name: body.name,
      endpoint: body.endpoint,
      model: body.model,
      system: body.system ?? null,
      params: body.params,
    });

    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to create preset"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, safeMsg);
  }
}
