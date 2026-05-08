/**
 * A2A Skill: Health Report
 *
 * Produces a structured health summary for orchestrating agents.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

type JsonRecord = Record<string, unknown>;

type ProviderHealthEntry = {
  state?: string;
  failures?: number;
  retryAfterMs?: number;
  lastFailure?: string | null;
};

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function healthFetch(path: string): Promise<JsonRecord> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
  };
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    throw new Error(`API [${response.status}]: ${await response.text().catch(() => "error")}`);
  }
  return response.json();
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function summarizeProviderHealth(providerHealth: unknown) {
  const entries = Object.entries(asRecord(providerHealth)).map(([provider, raw]) => ({
    provider,
    ...(asRecord(raw) as ProviderHealthEntry),
  }));
  const degraded = entries.filter((entry) => entry.state && entry.state !== "CLOSED");

  return {
    total: entries.length,
    healthy: entries.filter((entry) => entry.state === "CLOSED").length,
    degraded,
  };
}

function summarizeRateLimits(rateLimitStatus: unknown) {
  return Object.entries(asRecord(rateLimitStatus))
    .map(([key, raw]) => {
      const status = asRecord(raw);
      return {
        key,
        queued: toNumber(status.queued),
        running: toNumber(status.running),
        maxConcurrent: toNumber(status.maxConcurrent),
      };
    })
    .filter((entry) => entry.queued > 0 || entry.running > 0)
    .sort((left, right) => right.queued + right.running - (left.queued + left.running));
}

export interface HealthReportResult {
  artifacts: TaskArtifact[];
  metadata: {
    status: string;
    providerSummary: {
      total: number;
      healthy: number;
      degradedCount: number;
    };
    degradedProviders: Array<ProviderHealthEntry & { provider: string }>;
    activeRateLimits: Array<{
      key: string;
      queued: number;
      running: number;
      maxConcurrent: number;
    }>;
    lockoutCount: number;
    telemetry: JsonRecord;
  };
}

export async function executeHealthReport(_task: A2ATask): Promise<HealthReportResult> {
  const [healthResult, telemetryResult] = await Promise.allSettled([
    healthFetch("/api/monitoring/health"),
    healthFetch("/api/telemetry/summary"),
  ]);

  if (healthResult.status === "rejected") {
    throw healthResult.reason;
  }

  const health = healthResult.value;
  const telemetry = telemetryResult.status === "fulfilled" ? telemetryResult.value : {};
  const providerSummary = summarizeProviderHealth(health.providerHealth);
  const activeRateLimits = summarizeRateLimits(health.rateLimitStatus).slice(0, 10);
  const lockouts = asRecord(health.lockouts);
  const lockoutCount = Object.keys(lockouts).length;
  const status =
    providerSummary.degraded.length > 0 || activeRateLimits.length > 0 || lockoutCount > 0
      ? "degraded"
      : String(health.status || "healthy");

  const degradedLines =
    providerSummary.degraded.length > 0
      ? providerSummary.degraded.slice(0, 8).map((entry) => {
          const retry =
            typeof entry.retryAfterMs === "number" && entry.retryAfterMs > 0
              ? `, retry in ${Math.round(entry.retryAfterMs / 1000)}s`
              : "";
          return `- ${entry.provider}: ${entry.state || "unknown"} (${entry.failures || 0} failures${retry})`;
        })
      : ["- No degraded providers."];

  return {
    artifacts: [
      {
        type: "text",
        content: [
          `Health report: ${status}`,
          `Providers healthy: ${providerSummary.healthy}/${providerSummary.total}`,
          `Active rate limit queues: ${activeRateLimits.length}`,
          `Active lockouts: ${lockoutCount}`,
          `Recent requests: ${toNumber(telemetry.totalRequests).toLocaleString()}`,
          `p95 latency: ${Math.round(toNumber(telemetry.p95))}ms`,
          "",
          "Degraded providers:",
          ...degradedLines,
        ].join("\n"),
      },
    ],
    metadata: {
      status,
      providerSummary: {
        total: providerSummary.total,
        healthy: providerSummary.healthy,
        degradedCount: providerSummary.degraded.length,
      },
      degradedProviders: providerSummary.degraded,
      activeRateLimits,
      lockoutCount,
      telemetry,
    },
  };
}
