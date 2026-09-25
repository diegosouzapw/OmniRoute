import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getApiKeySelfServiceSettings,
  updateApiKeySelfServiceSettings,
} from "@/lib/db/apiKeySelfServiceSettings";
import { getApiKeyById } from "@/lib/db/apiKeys";
import {
  buildApiKeySelfServiceStatus,
  listApiKeyReachableProviders,
} from "@/lib/usage/apiKeySelfService";
import { hasSelfAccountQuotaScope, hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { updateApiKeySelfServiceSchema } from "@/shared/validation/schemas";
import * as log from "@/sse/utils/logger";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

type RouteContext = { params: Promise<{ id: string }> };

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function optionalUsd(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function keyNotFound() {
  return NextResponse.json(buildErrorBody(404, "Key not found"), { status: 404 });
}

// GET /api/keys/[id]/self-service — settings, key-holder visibility, reachable
// providers, and an admin preview of the key's GET /v1/me/status body.
export async function GET(request: Request, { params }: RouteContext) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const key = await getApiKeyById(id);
    if (!key || typeof key.id !== "string") return keyNotFound();

    const settings = getApiKeySelfServiceSettings(key.id);
    const scopes = stringList(key.scopes);
    const allowedConnections = stringList(key.allowedConnections);
    const selfUsage = hasSelfUsageScope(scopes);

    const [availableProviders, status] = await Promise.all([
      listApiKeyReachableProviders(allowedConnections),
      buildApiKeySelfServiceStatus(
        {
          id: key.id,
          name: typeof key.name === "string" ? key.name : "",
          scopes,
          allowedConnections,
          usageLimitEnabled: key.usageLimitEnabled === true,
          dailyUsageLimitUsd: optionalUsd(key.dailyUsageLimitUsd),
          weeklyUsageLimitUsd: optionalUsd(key.weeklyUsageLimitUsd),
          sharedQuotaProviders: settings.sharedQuotaProviders,
        },
        {},
        { adminPreview: true }
      ),
    ]);

    return NextResponse.json({
      settings,
      visibility: {
        selfUsage,
        // /v1/me/status requires self:usage, so account quotas need both scopes.
        accountQuota: selfUsage && hasSelfAccountQuotaScope(scopes),
      },
      availableProviders,
      status,
    });
  } catch (error) {
    log.error("keys", "Error fetching API key self-service settings", error);
    return NextResponse.json(buildErrorBody(500, "Failed to fetch self-service settings"), {
      status: 500,
    });
  }
}

// PUT /api/keys/[id]/self-service — update sharedQuotaProviders and/or
// anthropicRateLimitHeaders. Omitted fields keep their current value.
export async function PUT(request: Request, { params }: RouteContext) {
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

  const validation = validateBody(updateApiKeySelfServiceSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const { id } = await params;
    const key = await getApiKeyById(id);
    if (!key || typeof key.id !== "string") return keyNotFound();

    const settings = updateApiKeySelfServiceSettings(key.id, validation.data);
    return NextResponse.json({ settings });
  } catch (error) {
    log.error("keys", "Error updating API key self-service settings", error);
    return NextResponse.json(buildErrorBody(500, "Failed to update self-service settings"), {
      status: 500,
    });
  }
}
