import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import {
  getProviderConnections,
  createProviderConnection,
  getProviderNodeById,
  isCloudEnabled,
} from "@/models";
import {
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { createProviderSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { normalizeQoderPatProviderData } from "@omniroute/open-sse/services/qoderCli";
import {
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} from "@/lib/providers/requestDefaults";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isManagedProviderConnectionId } from "@/lib/providers/catalog";

// GET /api/providers - List all connections
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const connections = await getProviderConnections();

    // Hide sensitive fields
    const safeConnections = connections.map((c) => ({
      ...c,
      apiKey: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      idToken: undefined,
      providerSpecificData: c.providerSpecificData
        ? sanitizeProviderSpecificDataForResponse(c.providerSpecificData)
        : undefined,
    }));

    return NextResponse.json({ connections: safeConnections });
  } catch (error) {
    console.log("Error fetching providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}

// POST /api/providers - Create new connection (API Key only, OAuth via separate flow)
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  try {
    const body = await request.json();

    // Zod validation
    const validation = validateBody(createProviderSchema, body);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      provider,
      apiKey,
      name,
      priority,
      globalPriority,
      defaultModel,
      testStatus,
      providerSpecificData: incomingPsd,
    } = validation.data;

    // Business validation
    const isValidProvider =
      isManagedProviderConnectionId(provider) ||
      isOpenAICompatibleProvider(provider) ||
      isAnthropicCompatibleProvider(provider);

    if (!isValidProvider) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    let providerSpecificData = incomingPsd || null;
    const allowMultipleCompatibleConnections =
      process.env.ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE === "true";

    if (provider === "qoder") {
      providerSpecificData = normalizeQoderPatProviderData(providerSpecificData || {});
    }

    if (isOpenAICompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        return NextResponse.json({ error: "OpenAI Compatible node not found" }, { status: 404 });
      }

      const existingConnections = await getProviderConnections({ provider });
      // Allow multiple connections for compatible nodes exactly like first-party providers

      providerSpecificData = {
        ...(providerSpecificData || {}),
        prefix: node.prefix,
        apiType: node.apiType,
        baseUrl: node.baseUrl,
        nodeName: node.name,
        ...(node.chatPath ? { chatPath: node.chatPath } : {}),
        ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
      };
    } else if (isAnthropicCompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        return NextResponse.json(
          {
            error: isClaudeCodeCompatibleProvider(provider)
              ? "CC Compatible node not found"
              : "Anthropic Compatible node not found",
          },
          { status: 404 }
        );
      }

      const existingConnections = await getProviderConnections({ provider });
      // Allow multiple connections for compatible nodes exactly like first-party providers

      providerSpecificData = {
        ...(providerSpecificData || {}),
        prefix: node.prefix,
        baseUrl: node.baseUrl,
        nodeName: node.name,
        ...(node.chatPath ? { chatPath: node.chatPath } : {}),
        ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
      };
    }

    providerSpecificData = normalizeProviderSpecificData(provider, providerSpecificData) || null;

    const newConnection = await createProviderConnection({
      provider,
      authType: "apikey",
      name,
      apiKey,
      priority: priority || 1,
      globalPriority: globalPriority || null,
      defaultModel: defaultModel || null,
      providerSpecificData,
      isActive: true,
      testStatus: testStatus || "unknown",
    });

    // Note: Gemini model sync is now triggered client-side with progress dialog

    // Hide sensitive fields
    const result: Record<string, any> = { ...newConnection };
    delete result.apiKey;
    if (result.providerSpecificData) {
      result.providerSpecificData = sanitizeProviderSpecificDataForResponse(
        result.providerSpecificData
      );
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    logAuditEvent({
      action: "provider.credentials.created",
      actor: "admin",
      target: getProviderAuditTarget(newConnection),
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: provider,
        connection: summarizeProviderConnectionForAudit(newConnection),
      },
    });

    return NextResponse.json({ connection: result }, { status: 201 });
  } catch (error) {
    console.log("Error creating provider:", error);
    return NextResponse.json({ error: "Failed to create provider" }, { status: 500 });
  }
}

/**
 * Sync to Cloud if enabled
 */
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
