import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import { createProviderConnection, isCloudEnabled } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { bulkWebSessionImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { sanitizeProviderSpecificDataForResponse } from "@/lib/providers/requestDefaults";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  requiresWebSessionCredential,
  getWebSessionCredentialRequirement,
  hasUsableWebSessionCredential,
} from "@/shared/providers/webSessionCredentials";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(bulkWebSessionImportSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { provider, entries, priority, globalPriority } = validation.data;

  if (!requiresWebSessionCredential(provider)) {
    return NextResponse.json(
      { error: `Provider '${provider}' does not require web-session credentials` },
      { status: 400 }
    );
  }

  const requirement = getWebSessionCredentialRequirement(provider);
  if (!requirement || requirement.kind === "none") {
    return NextResponse.json(
      { error: `Provider '${provider}' has no credential requirement` },
      { status: 400 }
    );
  }

  const created: Array<Record<string, unknown>> = [];
  const errors: Array<{ index: number; name: string; message: string }> = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    try {
      const providerSpecificData = buildProviderSpecificData(
        requirement,
        entry.credential
      );

      if (!hasUsableWebSessionCredential(provider, providerSpecificData)) {
        throw new Error(
          `Credential does not match expected format for ${requirement.credentialName}`
        );
      }

      const newConnection = await createProviderConnection({
        provider,
        authType: "cookie",
        name: entry.name,
        apiKey: null,
        priority: priority || 1,
        globalPriority: globalPriority || null,
        defaultModel: null,
        providerSpecificData,
        isActive: true,
        testStatus: "unknown",
      });

      const safe: Record<string, unknown> = { ...newConnection };
      delete safe.apiKey;
      if (safe.providerSpecificData) {
        safe.providerSpecificData = sanitizeProviderSpecificDataForResponse(
          safe.providerSpecificData as Record<string, unknown>
        );
      }
      created.push(safe);

      logAuditEvent({
        action: "provider.credentials.created",
        actor: "admin",
        target: getProviderAuditTarget(newConnection),
        resourceType: "provider_credentials",
        status: "success",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: {
          provider,
          via: "bulk_web_session",
          connection: summarizeProviderConnectionForAudit(newConnection),
        },
      });
    } catch (err) {
      errors.push({
        index: i,
        name: entry.name,
        message: sanitizeErrorMessage(err) || "Failed to create connection",
      });
    }
  }

  if (created.length > 0) {
    await syncToCloudIfEnabled();
  }

  logAuditEvent({
    action: "provider.credentials.bulk_imported",
    actor: "admin",
    resourceType: "provider_credentials",
    status: errors.length === entries.length ? "failure" : "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: {
      provider,
      via: "bulk_web_session",
      total: entries.length,
      success: created.length,
      failed: errors.length,
    },
  });

  return NextResponse.json(
    {
      success: created.length,
      failed: errors.length,
      total: entries.length,
      created,
      errors,
    },
    { status: 200 }
  );
}

function buildProviderSpecificData(
  requirement: ReturnType<typeof getWebSessionCredentialRequirement>,
  credential: string
): Record<string, unknown> {
  if (!requirement || requirement.kind === "none") {
    return {};
  }

  const data: Record<string, unknown> = {};

  if (requirement.kind === "cookie") {
    data.cookie = credential;
    for (const key of requirement.storageKeys) {
      if (key !== "cookie") {
        data[key] = credential;
      }
    }
  } else if (requirement.kind === "token") {
    for (const key of requirement.storageKeys) {
      data[key] = credential;
    }
  }

  return data;
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;
    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    // cloud sync is best-effort — ignore errors
  }
}
