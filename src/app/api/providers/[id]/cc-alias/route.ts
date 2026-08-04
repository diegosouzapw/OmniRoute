import { NextResponse } from "next/server";
import {
  getCcAliasProviderSetting,
  setCcAliasProviderSetting,
  setCcAliasModelSetting,
  getCcAliasSettingsBulk,
} from "@/lib/db/ccDiscoveryAliases";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { updateCcAliasSettingSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * GET /api/providers/[id]/cc-alias
 *
 * Returns the Claude Code discovery-alias gate override for this provider
 * (`provider`, "on" | "off" | null meaning "inherit from the global flag")
 * plus every per-model override configured for this provider (`models`,
 * keyed by modelId — a missing key means "inherit from the provider
 * setting").
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const provider = getCcAliasProviderSetting(id);

    const { models: allModels } = getCcAliasSettingsBulk();
    const prefix = `${id}/`;
    const models: Record<string, "on" | "off"> = {};
    for (const [key, value] of allModels) {
      if (key.startsWith(prefix)) {
        models[key.slice(prefix.length)] = value;
      }
    }

    return NextResponse.json({ provider, models });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}

/**
 * PUT /api/providers/[id]/cc-alias
 *
 * Sets (or clears, when `value` is null) the Claude Code discovery-alias
 * gate override for this provider or one of its models.
 * Body: { scope: "provider", value: "on"|"off"|null }
 *     | { scope: "model", modelId: string, value: "on"|"off"|null }
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  try {
    const { id } = await params;
    const validation = validateBody(updateCcAliasSettingSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;

    if (body.scope === "provider") {
      setCcAliasProviderSetting(id, body.value);
    } else {
      setCcAliasModelSetting(id, body.modelId, body.value);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error)), { status: 500 });
  }
}
