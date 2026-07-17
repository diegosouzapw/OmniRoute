import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import { createProviderConnection, getProviderNodeById, isCloudEnabled } from "@/models";
import { isAnthropicCompatibleProvider, isOpenAICompatibleProvider } from "@/shared/constants/providers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { bulkImportProviderSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} from "@/lib/providers/requestDefaults";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { getProxyForLevel, resolveProxyForProvider } from "@/lib/localDb";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

type ImportEntry = {
  provider: string;
  name: string;
  apiKey: string;
  baseUrl?: string;
  priority?: number;
};

/**
 * Resolve the providerSpecificData base object for one entry's provider — mirrors the
 * per-provider node resolution in POST /api/providers/bulk, plus an optional per-entry
 * `baseUrl` override (the file-import format lets each row point at a different
 * OpenAI/Anthropic-compatible endpoint, unlike the single-provider bulk-key route).
 */
async function resolveProviderSpecificData(
  entry: ImportEntry
): Promise<Record<string, unknown> | null> {
  let base: Record<string, unknown> | null = null;
  if (isOpenAICompatibleProvider(entry.provider) || isAnthropicCompatibleProvider(entry.provider)) {
    const node: any = await getProviderNodeById(entry.provider);
    if (!node) return null;
    base = {
      prefix: node.prefix,
      ...(node.apiType ? { apiType: node.apiType } : {}),
      baseUrl: entry.baseUrl || node.baseUrl,
      nodeName: node.name,
      ...(node.chatPath ? { chatPath: node.chatPath } : {}),
      ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
    };
  } else if (entry.baseUrl) {
    base = { baseUrl: entry.baseUrl };
  }
  return normalizeProviderSpecificData(entry.provider, base) || base;
}

async function importOneEntry(
  entry: ImportEntry,
  validateKeys: boolean
): Promise<{ created: Record<string, unknown> } | { error: string }> {
  const providerSpecificData = await resolveProviderSpecificData(entry);
  if (
    (isOpenAICompatibleProvider(entry.provider) || isAnthropicCompatibleProvider(entry.provider)) &&
    !providerSpecificData
  ) {
    return { error: "Provider node not found" };
  }

  const proxyToUse = validateKeys
    ? (await resolveProxyForProvider(entry.provider)) ||
      (await getProxyForLevel("provider", entry.provider)) ||
      (await getProxyForLevel("global")) ||
      null
    : null;

  let testStatus: "active" | "unknown" | "failed" = "unknown";
  if (validateKeys) {
    const probe = await runWithProxyContext(proxyToUse, () =>
      validateProviderApiKey({
        provider: entry.provider,
        apiKey: entry.apiKey,
        providerSpecificData: providerSpecificData || undefined,
      })
    );
    testStatus = probe?.valid ? "active" : "failed";
  }

  const newConnection = await createProviderConnection({
    provider: entry.provider,
    authType: "apikey",
    name: entry.name,
    apiKey: entry.apiKey,
    priority: entry.priority || 1,
    globalPriority: null,
    defaultModel: null,
    providerSpecificData,
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
  return { created: safe };
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

// POST /api/providers/import — create multiple provider connections from a parsed
// CSV/JSON file, where each row/entry may target a DIFFERENT provider (#6836).
// Partial-failure semantics identical to /api/providers/bulk: every entry succeeds or
// fails independently and the response always returns 200 with per-entry results.
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

  const validation = validateBody(bulkImportProviderSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { entries, validateKeys } = validation.data;

  const created: Array<Record<string, unknown>> = [];
  const errors: Array<{ index: number; name: string; provider: string; message: string }> = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    try {
      const result = await importOneEntry(entry, !!validateKeys);
      if ("error" in result) {
        errors.push({ index: i, name: entry.name, provider: entry.provider, message: result.error });
        continue;
      }
      created.push(result.created);
      logAuditEvent({
        action: "provider.credentials.created",
        actor: "admin",
        target: getProviderAuditTarget(result.created),
        resourceType: "provider_credentials",
        status: "success",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: {
          provider: entry.provider,
          via: "import",
          connection: summarizeProviderConnectionForAudit(result.created),
        },
      });
    } catch (err) {
      errors.push({
        index: i,
        name: entry.name,
        provider: entry.provider,
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
      via: "import",
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
