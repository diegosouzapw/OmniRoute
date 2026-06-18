/**
 * Agent Card Discovery Endpoint (/.well-known/agent.json)
 * Advertises OmniRoute's A2A capabilities to external agents
 */

import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const version = process.env.npm_package_version || "1.0.0";

  const agentCard = {
    name: "OmniRoute",
    description: "Intelligent AI gateway with auto-routing across 180+ LLM providers",
    url: `${process.env.OMNIROUTE_BASE_URL || "http://localhost:20128"}/a2a`,
    version,
    capabilities: {
      streaming: true,
      pushNotifications: false,
    },
    skills: [
      {
        id: "smart-routing",
        name: "Smart Routing",
        description: "Routes prompts through OmniRoute intelligent pipeline",
        tags: ["routing", "llm", "multi-provider", "cost-optimization"],
        examples: [
          "Write a hello world in Python",
          "Explain quantum computing using the cheapest provider",
        ],
      },
      {
        id: "quota-management",
        name: "Quota Management",
        description: "Natural-language queries about provider quotas",
        tags: ["quota", "analytics", "cost"],
        examples: [
          "Which provider has the most quota remaining?",
          "Suggest a free combo for coding",
        ],
      },
      {
        id: "provider-discovery",
        name: "Provider Discovery",
        description: "Lists installed providers with capabilities, free-tier flags, OAuth status",
        tags: ["provider", "discovery", "capabilities"],
        examples: [
          "What providers are available?",
          "Which providers support vision?",
        ],
      },
      {
        id: "cost-analysis",
        name: "Cost Analysis",
        description: "Estimates cost of a request/conversation given the catalog + recent usage",
        tags: ["cost", "pricing", "analytics"],
        examples: [
          "How much will this request cost?",
          "Compare costs across providers",
        ],
      },
      {
        id: "health-report",
        name: "Health Report",
        description: "Aggregates circuit breaker, cooldown, lockout state per provider",
        tags: ["health", "monitoring", "resilience"],
        examples: [
          "What providers are healthy?",
          "Show me provider health status",
        ],
      },
      {
        id: "agent-dispatch",
        name: "Agent Dispatch",
        description: "Dispatches coding tasks to the substrate engine for code execution",
        tags: ["coding", "execution", "agent", "substrate"],
        examples: [
          "Dispatch a code generation task to substrate",
          "Run this coding task through the forge engine",
        ],
      },
    ],
    authentication: {
      schemes: ["bearer"],
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

/**
 * CORS preflight for agent discovery
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
