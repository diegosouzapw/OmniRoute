import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import { createProviderConnection, getProviderNodeById, isCloudEnabled } from "@/models";
import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
  supportsBulkApiKey,
} from "@/shared/constants/providers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { bulkCreateProviderSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} from "@/lib/providers/requestDefaults";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isManagedProviderConnectionId } from "@/lib/providers/catalog";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { getProxyForLevel, resolveProxyForProvider } from "@/lib/localDb";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

// POST /api/providers/bulk — create multiple API-key connections for a single provider.
// Partial-failure semantics: each entry succeeds or fails independently; the
// response always returns 200 with per-entry results so callers can show which
// lines failed without rolling back the successful ones.
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

  const validation = validateBody(bulkCreateProviderSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const {
    provider,
    entries,
    priority,
    globalPriority,
    providerSpecificData: incomingPsd,
    validateKeys,
  } = validation.data;

  const isManagedOrCompatible =
    isManagedProviderConnectionId(provider) ||
    isOpenAICompatibleProvider(provider) ||
    isAnthropicCompatibleProvider(provider);

  if (!isManagedOrCompatible) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  if (!supportsBulkApiKey(provider)) {
    return NextResponse.json(
      { error: "Bulk add is not supported for this provider" },
      { status: 400 }
    );
  }

  let baseProviderSpecificData: Record<string, unknown> | null = incomingPsd || null;
  if (isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider)) {
    const node: any = await getProviderNodeById(provider);
    if (!node) {
      return NextResponse.json({ error: "Provider node not found" }, { status: 404 });
    }
    baseProviderSpecificData = {
      ...(baseProviderSpecificData || {}),
      prefix: node.prefix,
      ...(node.apiType ? { apiType: node.apiType } : {}),
      baseUrl: node.baseUrl,
      nodeName: node.name,
      ...(node.chatPath ? { chatPath: node.chatPath } : {}),
      ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
    };
  }

  baseProviderSpecificData =
    normalizeProviderSpecificData(provider, baseProviderSpecificData) || null;

  // Resolve proxy once for all entries — we call validateProviderApiKey directly
  // instead of round-tripping through /api/providers/validate over HTTP. Direct
  // invocation avoids SSRF risk from `new URL(request.url).origin` being driven
  // by a spoofable Host header (CodeQL js/request-forgery #243).
  const proxyToUse = validateKeys
    ? (await resolveProxyForProvider(provider)) ||
      (await getProxyForLevel("provider", provider)) ||
      (await getProxyForLevel("global")) ||
      null
    : null;

  const created: Array<Record<string, unknown>> = [];
  const errors: Array<{ index: number; name: string; message: string }> = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    try {
      let testStatus: "active" | "unknown" | "failed" = "unknown";

      if (validateKeys) {
        const probe = await runWithProxyContext(proxyToUse, () =>
          validateProviderApiKey({
            provider,
            apiKey: entry.apiKey,
            providerSpecificData: baseProviderSpecificData || {},
          })
        );
        testStatus = probe?.valid ? "active" : "failed";
      }

      const newConnection = await createProviderConnection({
        provider,
        authType: "apikey",
        name: entry.name,
        apiKey: entry.apiKey,
        priority: priority || 1,
        globalPriority: globalPriority || null,
        defaultModel: null,
        providerSpecificData: baseProviderSpecificData,
        isActive: true,
        testStatus,
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
          via: "bulk",
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
    action: "provider.credentials.bulk_created",
    actor: "admin",
    resourceType: "provider_credentials",
    status: errors.length === entries.length ? "failure" : "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: {
      provider,
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

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;
    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing providers to cloud:", error);
  }
}
