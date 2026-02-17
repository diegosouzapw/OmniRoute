import { NextResponse } from "next/server";
import {
  getProviderConnections,
  createProviderConnection,
  getProviderNodeById,
  isCloudEnabled,
} from "@/models";
import { APIKEY_PROVIDERS } from "@/shared/constants/config";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { createProviderSchema, validateBody } from "@/shared/validation/schemas";

// GET /api/providers - List all connections
export async function GET() {
  try {
    const connections = await getProviderConnections();

    // Hide sensitive fields
    const safeConnections = connections.map((c) => ({
      ...c,
      apiKey: undefined,
      accessToken: undefined,
      refreshToken: undefined,
      idToken: undefined,
    }));

    return NextResponse.json({ connections: safeConnections });
  } catch (error) {
    console.log("Error fetching providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}

// POST /api/providers - Create new connection (API Key only, OAuth via separate flow)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Zod validation
    const validation = validateBody(createProviderSchema, body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { provider, apiKey, name, priority, globalPriority, defaultModel, testStatus } =
      validation.data;

    // Business validation
    const isValidProvider =
      APIKEY_PROVIDERS[provider] ||
      isOpenAICompatibleProvider(provider) ||
      isAnthropicCompatibleProvider(provider);

    if (!isValidProvider) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    let providerSpecificData: Record<string, any> | null = null;
    const allowMultipleCompatibleConnections =
      process.env.ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE === "true";

    if (isOpenAICompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        return NextResponse.json({ error: "OpenAI Compatible node not found" }, { status: 404 });
      }

      const existingConnections = await getProviderConnections({ provider });
      if (!allowMultipleCompatibleConnections && existingConnections.length > 0) {
        return NextResponse.json(
          { error: "Only one connection is allowed for this OpenAI Compatible node" },
          { status: 400 }
        );
      }

      providerSpecificData = {
        prefix: node.prefix,
        apiType: node.apiType,
        baseUrl: node.baseUrl,
        nodeName: node.name,
      };
    } else if (isAnthropicCompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        return NextResponse.json({ error: "Anthropic Compatible node not found" }, { status: 404 });
      }

      const existingConnections = await getProviderConnections({ provider });
      if (!allowMultipleCompatibleConnections && existingConnections.length > 0) {
        return NextResponse.json(
          { error: "Only one connection is allowed for this Anthropic Compatible node" },
          { status: 400 }
        );
      }

      providerSpecificData = {
        prefix: node.prefix,
        baseUrl: node.baseUrl,
        nodeName: node.name,
      };
    }

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

    // Hide sensitive fields
    const result: Record<string, any> = { ...newConnection };
    delete result.apiKey;

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

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
