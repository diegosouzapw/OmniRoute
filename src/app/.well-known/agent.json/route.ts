/**
 * Agent Card Endpoint — /.well-known/agent.json
 *
 * Serves the OmniRoute A2A Agent Card for discovery by other agents.
 * Conforms to A2A Protocol v0.3.
 *
 * The Agent Card is dynamically generated to include the current version
 * from package.json and skills based on available combos.
 */

import { NextResponse } from "next/server";

const PACKAGE_VERSION = process.env.npm_package_version || "1.8.1";
const BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";

/**
 * GET /.well-known/agent.json
 *
 * Returns the OmniRoute Agent Card that describes this gateway's
 * capabilities as an A2A agent.
 */
export async function GET() {
  const agentCard = {
    name: "OmniRoute AI Gateway",
    description:
      "Intelligent AI routing gateway with 36+ providers, smart fallback, " +
      "quota tracking, format translation, and auto-managed combos. " +
      "Routes AI requests to the optimal provider based on cost, latency, " +
      "quota availability, and task requirements.",
    url: `${BASE_URL}/a2a`,
    version: PACKAGE_VERSION,
    capabilities: {
      streaming: true,
      pushNotifications: false,
    },
    skills: [
      {
        id: "smart-routing",
        name: "Smart Request Routing",
        description:
          "Routes AI requests to the optimal provider based on quota, cost, " +
          "latency, and reliability. Supports combo-based routing with " +
          "multiple strategies: priority, weighted, round-robin, cost-optimized.",
        tags: ["routing", "llm", "optimization", "fallback"],
        examples: [
          "Route this coding task to the fastest available model",
          "Send this review to an analytical model under $0.50 budget",
          "Find the cheapest provider with available quota",
        ],
      },
      {
        id: "quota-management",
        name: "Quota & Cost Management",
        description:
          "Tracks and manages API quotas across 36+ providers with " +
          "auto-fallback when quotas are exhausted. Provides real-time " +
          "cost tracking and budget enforcement.",
        tags: ["quota", "cost", "monitoring", "budget"],
        examples: [
          "Check remaining quota for all providers",
          "Which provider has the most available quota?",
          "Generate a cost report for today",
        ],
      },
      {
        id: "provider-discovery",
        name: "Provider Discovery",
        description:
          "Discovers providers that can handle a requested capability " +
          "such as chat, images, audio, search, embeddings, rerank, or video. " +
          "Reports availability, health, configuration status, and a recommended provider.",
        tags: ["providers", "discovery", "capabilities", "health"],
        examples: [
          "Which providers can handle image generation?",
          "Find healthy providers for embeddings",
          "What local providers are configured?",
        ],
      },
      {
        id: "cost-analysis",
        name: "Cost Analysis",
        description:
          "Analyzes usage costs by provider and model, compares recent periods, " +
          "and returns cost-saving opportunities for agents to act on.",
        tags: ["cost", "usage", "analytics", "optimization"],
        examples: [
          "How much did we spend this week?",
          "Which provider is costing the most?",
          "Suggest cost-saving opportunities for the last 30 days",
        ],
      },
      {
        id: "health-report",
        name: "Health Report",
        description:
          "Aggregates provider health, circuit breaker states, rate limit queues, " +
          "lockouts, and telemetry into a structured report for orchestration.",
        tags: ["health", "monitoring", "resilience", "telemetry"],
        examples: [
          "Is everything healthy?",
          "Report degraded providers and retry timing",
          "Summarize active rate limits and lockouts",
        ],
      },
    ],
    authentication: {
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
