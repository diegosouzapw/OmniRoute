import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import {
  createProviderConnection,
  getProviderConnections,
  getProviderNodeById,
  isCloudEnabled,
} from "@/models";
import { isAnthropicCompatibleProvider, isOpenAICompatibleProvider } from "@/shared/constants/providers";
import { isManagedProviderConnectionId } from "@/lib/providers/catalog";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { resolveBulkNameCollisions } from "@/shared/utils/bulkApiKeyParser";
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

// Provider-existence check (moved out of the Zod schema so the client-reachable schema
// stays free of the server-only provider catalog — #6836; isManagedProviderConnectionId
// drags the server runtime into the browser/CLI bundle). Extracted as a helper so the
// per-row check adds no branches to importOneEntry's own complexity.
function isKnownImportProvider(provider: string): boolean {
  return (
    isManagedProviderConnectionId(provider) ||
    isOpenAICompatibleProvider(provider) ||
    isAnthropicCompatibleProvider(provider)
  );
}

async function importOneEntry(
  entry: ImportEntry,
  validateKeys: boolean
): Promise<{ created: Record<string, unknown> } | { error: string }> {
  // Reject unknown providers per-row, preserving the partial-failure contract of /bulk.
  if (!isKnownImportProvider(entry.provider)) {
    return { error: "Unknown or unsupported provider" };
  }

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

/**
 * #2587 / #6836 — mirrors the guard in POST /api/providers/bulk: createProviderConnection
 * upserts apikey connections BY NAME, so an imported row whose (provider, name) collides
 * with an already-saved connection — or with an earlier row in the SAME import batch —
 * would silently REPLACE that connection's apiKey/priority instead of inserting a new
 * one, while the response still reported it as a fresh "created" success. Unlike /bulk
 * (single provider per request), one import batch can span many DIFFERENT providers, so
 * collisions are resolved per-provider: existing connection names are fetched once per
 * distinct provider in the batch, then `resolveBulkNameCollisions` gap-fills a free
 * "<name> <n>" suffix for every entry so each one reaches createProviderConnection as a
 * genuine insert.
 */
async function resolveImportNameCollisions(entries: ImportEntry[]): Promise<ImportEntry[]> {
  const indicesByProvider = new Map<string, number[]>();
  entries.forEach((entry, index) => {
    const indices = indicesByProvider.get(entry.provider) || [];
    indices.push(index);
    indicesByProvider.set(entry.provider, indices);
  });

  const resolved: ImportEntry[] = [...entries];
  for (const [provider, indices] of indicesByProvider) {
    const existingConnections = await getProviderConnections({ provider, authType: "apikey" });
    const existingNames = existingConnections
      .map((c) => (typeof c.name === "string" ? c.name : null))
      .filter((n): n is string => !!n);

    const providerEntries = indices.map((i) => ({ name: entries[i].name }));
    const resolvedProviderEntries = resolveBulkNameCollisions(providerEntries, existingNames);

    indices.forEach((originalIndex, i) => {
      resolved[originalIndex] = { ...entries[originalIndex], name: resolvedProviderEntries[i].name };
    });
  }

  return resolved;
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
  const resolvedEntries = await resolveImportNameCollisions(entries);

  const created: Array<Record<string, unknown>> = [];
  const errors: Array<{ index: number; name: string; provider: string; message: string }> = [];

  for (let i = 0; i < resolvedEntries.length; i++) {
    const entry = resolvedEntries[i];
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
