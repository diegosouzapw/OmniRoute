/**
 * A2A Skill: Cost Analysis
 *
 * Summarizes usage cost, provider/model spend distribution, and savings opportunities.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";
import { formatCost } from "@/shared/utils/formatting";

type AnalyticsRecord = Record<string, unknown>;

type CostEntry = {
  id: string;
  requests: number;
  cost: number;
  tokens: number;
};

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

function detectRange(task: A2ATask): string {
  const metadataRange = task.input.metadata?.range;
  if (typeof metadataRange === "string" && metadataRange.trim()) return metadataRange;

  const query = task.input.messages.at(-1)?.content?.toLowerCase() || "";
  if (query.includes("today") || query.includes("24h")) return "1d";
  if (query.includes("week") || query.includes("7d")) return "7d";
  if (query.includes("quarter") || query.includes("90d")) return "90d";
  if (query.includes("year") || query.includes("ytd")) return "ytd";
  return "30d";
}

async function costFetch(path: string): Promise<AnalyticsRecord> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
  };
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    throw new Error(`API [${response.status}]: ${await response.text().catch(() => "error")}`);
  }
  return response.json();
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toCostEntries(value: unknown): CostEntry[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];

  return Object.entries(value as Record<string, AnalyticsRecord>)
    .map(([id, raw]) => ({
      id,
      requests: toNumber(raw.requests ?? raw.count ?? raw.totalRequests),
      cost: toNumber(raw.cost ?? raw.totalCost),
      tokens:
        toNumber(raw.tokens ?? raw.totalTokens ?? raw.promptTokens) +
        toNumber(raw.completionTokens),
    }))
    .sort((left, right) => right.cost - left.cost);
}

function buildSavings(
  providerCosts: CostEntry[],
  modelCosts: CostEntry[],
  fallbackRatePct: number
) {
  const suggestions: string[] = [];
  const topProvider = providerCosts[0];
  const topModel = modelCosts[0];

  if (topProvider?.cost > 0) {
    suggestions.push(
      `Review ${topProvider.id}: it is the largest provider cost at ${formatCost(topProvider.cost)}.`
    );
  }
  if (topModel?.cost > 0) {
    suggestions.push(
      `Check model ${topModel.id}: it is the largest model cost at ${formatCost(topModel.cost)}.`
    );
  }
  if (fallbackRatePct > 10) {
    suggestions.push(
      `Fallback rate is ${fallbackRatePct.toFixed(1)}%; tune combo priority or quota strategy to avoid expensive fallback paths.`
    );
  }
  if (suggestions.length === 0) {
    suggestions.push("No obvious cost-saving opportunity was detected in this range.");
  }

  return suggestions;
}

export interface CostAnalysisResult {
  artifacts: TaskArtifact[];
  metadata: {
    range: string;
    totalCost: number;
    totalRequests: number;
    providerCosts: CostEntry[];
    modelCosts: CostEntry[];
    savings: string[];
  };
}

export async function executeCostAnalysis(task: A2ATask): Promise<CostAnalysisResult> {
  const range = detectRange(task);
  const analytics = await costFetch(
    `/api/usage/analytics?range=${encodeURIComponent(range)}&presets=1d,7d,30d,90d,ytd`
  );
  const summary = (analytics.summary || {}) as AnalyticsRecord;
  const providerCosts = toCostEntries(analytics.byProvider).slice(0, 10);
  const modelCosts = toCostEntries(analytics.byModel).slice(0, 10);
  const totalCost = toNumber(summary.totalCost);
  const totalRequests = toNumber(summary.totalRequests ?? summary.requests);
  const fallbackRatePct = toNumber(summary.fallbackRatePct);
  const savings = buildSavings(providerCosts, modelCosts, fallbackRatePct);

  return {
    artifacts: [
      {
        type: "text",
        content: [
          `Cost analysis for range: ${range}`,
          `Total cost: ${formatCost(totalCost)}`,
          `Total requests: ${totalRequests.toLocaleString()}`,
          `Fallback rate: ${fallbackRatePct.toFixed(2)}%`,
          "",
          "Top providers:",
          ...(providerCosts.length
            ? providerCosts
                .slice(0, 5)
                .map(
                  (entry, index) =>
                    `${index + 1}. ${entry.id} - ${formatCost(entry.cost)} (${entry.requests.toLocaleString()} requests)`
                )
            : ["No provider cost data available."]),
          "",
          "Savings opportunities:",
          ...savings.map((suggestion) => `- ${suggestion}`),
        ].join("\n"),
      },
    ],
    metadata: {
      range,
      totalCost,
      totalRequests,
      providerCosts,
      modelCosts,
      savings,
    },
  };
}
