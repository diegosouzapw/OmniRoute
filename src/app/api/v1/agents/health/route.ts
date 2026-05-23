import { NextRequest, NextResponse } from "next/server";
import { getAgent, getAvailableAgents } from "@/lib/cloudAgent/registry";
import { getCloudAgentCredentialFromDb } from "@/lib/cloudAgent/credentials";
import { getCloudAgentCorsHeaders, requireCloudAgentManagementAuth } from "@/lib/cloudAgent/api";
import pino from "pino";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const logger = pino({ name: "cloud-agents-health-api" });

const PROVIDER_NAMES: Record<string, string> = {
  jules: "Jules",
  devin: "Devin",
  "codex-cloud": "Codex Cloud",
};

interface ProviderHealth {
  id: string;
  name: string;
  connected: boolean;
  latencyMs: number;
  error?: string;
}

async function checkProviderHealth(providerId: string): Promise<ProviderHealth> {
  const name = PROVIDER_NAMES[providerId] ?? providerId;
  const agent = getAgent(providerId);

  if (!agent) {
    return { id: providerId, name, connected: false, latencyMs: 0, error: "Unknown provider" };
  }

  const credentials = getCloudAgentCredentialFromDb(providerId);
  if (!credentials) {
    return {
      id: providerId,
      name,
      connected: false,
      latencyMs: 0,
      error: "No credentials configured",
    };
  }

  const start = Date.now();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error("Connection timed out")), 5000);
    });
    await Promise.race([agent.listSources(credentials), timeoutPromise]);
    return { id: providerId, name, connected: true, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      id: providerId,
      name,
      connected: false,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { headers: getCloudAgentCorsHeaders(request) });
}

export async function GET(request: NextRequest) {
  try {
    const authError = await requireCloudAgentManagementAuth(request);
    if (authError) return authError;

    const agentIds = getAvailableAgents();
    const results = await Promise.all(agentIds.map(checkProviderHealth));

    return NextResponse.json(
      { providers: results },
      { headers: getCloudAgentCorsHeaders(request) }
    );
  } catch (error) {
    logger.error({ err: error }, "Failed to check cloud agent health");
    return NextResponse.json(
      {
        error:
          sanitizeErrorMessage(error instanceof Error ? error.message : "Unknown error") ||
          "Internal server error",
      },
      { status: 500, headers: getCloudAgentCorsHeaders(request) }
    );
  }
}
