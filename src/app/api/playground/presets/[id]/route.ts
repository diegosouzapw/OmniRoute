/**
 * GET    /api/playground/presets/[id]  — get a single preset
 * PUT    /api/playground/presets/[id]  — update a preset (partial patch)
 * DELETE /api/playground/presets/[id]  — delete a preset (204 on success)
 *
 * Auth: optional (extractApiKey + isValidApiKey; required when REQUIRE_API_KEY=true).
 * Hard Rule #5: all DB access via src/lib/db/playgroundPresets (never raw SQL).
 * Hard Rule #7: PUT body validated via PlaygroundPresetUpdateSchema.
 * Hard Rule #12: all error paths via buildErrorBody.
 */

import { z } from "zod";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  getPlaygroundPreset,
  updatePlaygroundPreset,
  deletePlaygroundPreset,
} from "@/lib/db/playgroundPresets";
import { PlaygroundPresetUpdateSchema } from "@/shared/schemas/playground";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
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

function validateId(id: unknown): { valid: true; id: string } | { valid: false; error: Response } {
  const result = z.string().uuid().safeParse(id);
  if (!result.success) {
    return {
      valid: false,
      error: errorResp(HTTP_STATUS.BAD_REQUEST, "Invalid preset id: must be a valid UUID"),
    };
  }
  return { valid: true, id: result.data };
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * GET /api/playground/presets/[id]
 * Returns the preset or 404.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const validation = validateId(rawId);
  if (!validation.valid) return validation.error;
  const { id } = validation;

  try {
    const preset = getPlaygroundPreset(id);
    if (!preset) {
      return errorResp(HTTP_STATUS.NOT_FOUND, `Preset not found: ${id}`);
    }
    return new Response(JSON.stringify(preset), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to fetch preset"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, safeMsg);
  }
}

/**
 * PUT /api/playground/presets/[id]
 * Body: PlaygroundPresetUpdateSchema (partial)
 * Returns the updated preset or 404.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const validation = validateId(rawId);
  if (!validation.valid) return validation.error;
  const { id } = validation;

  // Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResp(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // Validate body (Hard Rule #7)
  const parsed = PlaygroundPresetUpdateSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid request body";
    return errorResp(HTTP_STATUS.BAD_REQUEST, message);
  }
  const patch = parsed.data;

  try {
    const updated = updatePlaygroundPreset(id, {
      ...(patch.name !== undefined ? { name: patch.name } : {}),
      ...(patch.endpoint !== undefined ? { endpoint: patch.endpoint } : {}),
      ...(patch.model !== undefined ? { model: patch.model } : {}),
      ...("system" in patch ? { system: patch.system ?? null } : {}),
      ...(patch.params !== undefined ? { params: patch.params } : {}),
    });

    if (!updated) {
      return errorResp(HTTP_STATUS.NOT_FOUND, `Preset not found: ${id}`);
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to update preset"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, safeMsg);
  }
}

/**
 * DELETE /api/playground/presets/[id]
 * Returns 204 on success; 404 if not found.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const authError = await checkAuth(request);
  if (authError) return authError;

  const { id: rawId } = await params;
  const validation = validateId(rawId);
  if (!validation.valid) return validation.error;
  const { id } = validation;

  try {
    const deleted = deletePlaygroundPreset(id);
    if (!deleted) {
      return errorResp(HTTP_STATUS.NOT_FOUND, `Preset not found: ${id}`);
    }
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to delete preset"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, safeMsg);
  }
}
