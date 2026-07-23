import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { versionManagerToolSchema } from "@/shared/validation/schemas";

export const VERSION_MANAGER_SUPERVISOR_TOOLS = new Set(["cliproxy", "cliproxyapi"]);

type VersionManagerToolRequest = { ok: true; tool: string } | { ok: false; response: Response };

export function validateVersionManagerToolBody(rawBody: unknown): VersionManagerToolRequest {
  const validation = validateBody(versionManagerToolSchema, rawBody);
  if (isValidationFailure(validation)) {
    return {
      ok: false,
      response: NextResponse.json({ error: validation.error }, { status: 400 }),
    };
  }

  const { tool } = validation.data;

  if (!VERSION_MANAGER_SUPERVISOR_TOOLS.has(tool)) {
    return {
      ok: false,
      response: NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 }),
    };
  }

  return { ok: true, tool };
}

export async function parseVersionManagerToolRequest(
  request: Request
): Promise<VersionManagerToolRequest> {
  const authError = await requireManagementAuth(request);
  if (authError) {
    return { ok: false, response: authError };
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }

  return validateVersionManagerToolBody(rawBody);
}
