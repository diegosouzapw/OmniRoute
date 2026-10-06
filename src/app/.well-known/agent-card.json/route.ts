/**
 * Agent Card Endpoint — /.well-known/agent-card.json
 *
 * Serves the OmniRoute A2A Agent Card in the A2A Protocol v1.0 shape for
 * discovery by 1.0 clients (a2a-sdk 1.x, Hermes, …). The legacy v0.3 card
 * remains available at /.well-known/agent.json.
 *
 * `supportedInterfaces` declares both protocol versions against the same
 * JSON-RPC endpoint — the v1.0 route handler accepts both `SendMessage` and
 * the legacy `message/send` (see src/app/a2a/route.ts).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getFleetSkills } from "@/lib/conductor/fleetSkills";
import { getBaseUrl } from "@/lib/wellKnown";

const PACKAGE_VERSION = process.env.npm_package_version || "1.8.1";

/**
 * GET /.well-known/agent-card.json
 *
 * Returns the OmniRoute Agent Card (A2A v1.0).
 */
export async function GET(request?: NextRequest) {
  const fleetSkills = await getFleetSkills();
  const baseUrl = getBaseUrl(request);

  const agentCard = {
    name: "OmniRoute AI Gateway",
    description:
      "Intelligent AI routing gateway with 36+ providers, smart fallback, quota tracking, " +
      "format translation, and auto-managed combos. Routes AI requests to the optimal " +
      "provider based on cost, latency, quota availability, and task requirements.",
    url: `${baseUrl}/a2a`,
    version: PACKAGE_VERSION,
    supportedInterfaces: [
      {
        url: `${baseUrl}/a2a`,
        protocolBinding: "JSONRPC",
        protocolVersion: "1.0",
      },
      {
        url: `${baseUrl}/a2a`,
        protocolBinding: "JSONRPC",
        protocolVersion: "0.3",
      },
    ],
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/plain"],
    capabilities: {
      streaming: true,
      pushNotifications: false,
    },
    skills: [
      {
        id: "smart-routing",
        name: "Smart Request Routing",
        description:
          "Routes AI requests to the optimal provider based on quota, cost, latency, and reliability.",
        tags: ["routing", "llm", "optimization", "fallback"],
        examples: [
          "Route this coding task to the fastest available model",
          "Send this review to an analytical model under a $0.50 budget",
        ],
      },
      {
        id: "quota-management",
        name: "Quota & Cost Management",
        description:
          "Tracks and manages API quotas across providers with auto-fallback when quotas are exhausted.",
        tags: ["quota", "cost", "monitoring", "budget"],
        examples: ["Check remaining quota for all providers", "Generate a cost report for today"],
      },
      {
        id: "provider-discovery",
        name: "Provider Discovery",
        description:
          "Discovers providers that can handle a requested capability (chat, images, audio, search, embeddings, rerank, video).",
        tags: ["providers", "discovery", "capabilities", "health"],
        examples: [
          "Which providers can handle image generation?",
          "Find healthy providers for embeddings",
        ],
      },
      {
        id: "cost-analysis",
        name: "Cost Analysis",
        description:
          "Analyzes usage costs by provider and model and returns cost-saving opportunities.",
        tags: ["cost", "usage", "analytics", "optimization"],
        examples: ["How much did we spend this week?", "Which provider costs the most?"],
      },
      {
        id: "health-report",
        name: "Health Report",
        description:
          "Summarizes provider health, circuit-breaker state, rate-limit queues, and telemetry into a structured report.",
        tags: ["health", "monitoring", "resilience", "telemetry"],
        examples: ["Is everything healthy?", "Report degraded providers and retry timing"],
      },
      {
        id: "list-capabilities",
        name: "List Capabilities",
        description: "Returns the full catalog of OmniRoute agent skills.",
        tags: ["discovery", "capabilities"],
        examples: ["What can you do?", "List your skills"],
      },
      ...fleetSkills,
    ],
    security: {
      schemes: ["api-key"],
      apiKeyHeader: "Authorization",
    },
  };

  return NextResponse.json(agentCard, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
