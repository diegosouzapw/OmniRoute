import { NextResponse } from "next/server";
import {
  assignApiKeyAccess,
  KeyAllowsAllModelsError,
  KeyAllowsAllCombosError,
  EmptyRestrictedAccessListError,
  KeyAccessCapExceededError,
  ApiKeyPolicyInvariantError,
} from "@/lib/db/apiKeyAccessAssign";
import { isCloudEnabled } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { apiKeyAccessAssignSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import * as log from "@/sse/utils/logger";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  const validation = validateBody(apiKeyAccessAssignSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const { id } = await params;
    const result = await assignApiKeyAccess(id, validation.data);

    if (!result) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    if (result.changed) {
      await syncKeysToCloudIfEnabled();
    }

    return NextResponse.json({
      id: result.id,
      modelAccessMode: result.modelAccessMode,
      allowedModels: result.allowedModels,
      allowedCombos: result.allowedCombos,
      changed: result.changed,
    });
  } catch (error) {
    if (error instanceof KeyAllowsAllModelsError || error instanceof KeyAllowsAllCombosError) {
      return NextResponse.json(
        {
          error: {
            code: error.code,
            message: error.message,
          },
        },
        { status: 409 }
      );
    }

    if (
      error instanceof EmptyRestrictedAccessListError ||
      error instanceof KeyAccessCapExceededError
    ) {
      return NextResponse.json(buildErrorBody(400, error.message), { status: 400 });
    }

    if (
      error instanceof ApiKeyPolicyInvariantError ||
      (error instanceof Error && (error as { code?: string }).code === "LEASE_KEY_POLICY_INVALID")
    ) {
      const err = error as Error & { code?: string };
      return NextResponse.json(
        buildErrorBody(400, err.message, null, {
          type: "lease_error",
          code: err.code || "LEASE_KEY_POLICY_INVALID",
        }),
        { status: 400 }
      );
    }

    log.error("keys", "Error assigning key access", error);
    return NextResponse.json({ error: "Failed to assign key access" }, { status: 500 });
  }
}

/**
 * Sync API keys to Cloud if enabled
 */
async function syncKeysToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    log.error("keys", "Error syncing keys to cloud", error);
  }
}
