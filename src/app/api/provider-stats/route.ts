import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { AI_PROVIDERS } from "@/shared/constants/providers";

export async function GET() {
  try {
    const db = getDbInstance();

    const providerStats = db
      .prepare(
        `
      SELECT
        c.provider,
        pn.name as nodeName,
        COUNT(*) as totalRequests,
        SUM(CASE WHEN c.status >= 200 AND c.status < 400 THEN 1 ELSE 0 END) as successfulRequests,
        ROUND(AVG(c.duration)) as avgLatencyMs,
        SUM(c.tokens_in) as totalTokensIn,
        SUM(c.tokens_out) as totalTokensOut
      FROM call_logs c
      LEFT JOIN provider_nodes pn ON pn.id = c.provider
      WHERE c.provider IS NOT NULL AND c.provider != '-'
      GROUP BY c.provider
      ORDER BY totalRequests DESC
    `
      )
      .all();

    const modelStats = db
      .prepare(
        `
      SELECT
        c.provider,
        pn.name as nodeName,
        c.model,
        COUNT(*) as requests,
        ROUND(AVG(c.duration)) as avgLatencyMs,
        SUM(CASE WHEN c.status >= 200 AND c.status < 400 THEN 1 ELSE 0 END) as successfulRequests
      FROM call_logs c
      LEFT JOIN provider_nodes pn ON pn.id = c.provider
      WHERE c.provider IS NOT NULL AND c.model IS NOT NULL
      GROUP BY c.provider, c.model
      ORDER BY c.provider, requests DESC
    `
      )
      .all();

    let comboMetrics: Record<string, unknown> = {};
    try {
      const { getAllComboMetrics } = await import(
        "@omniroute/open-sse/services/comboMetrics.ts"
      );
      comboMetrics = getAllComboMetrics() as Record<string, unknown>;
    } catch {}

    let telemetry: Record<string, unknown> = {};
    try {
      const { getTelemetrySummary } = await import("@/shared/utils/requestTelemetry");
      telemetry = getTelemetrySummary(300000) as Record<string, unknown>;
    } catch {}

    let toolLatency: Record<string, unknown> = {};
    try {
      const { getToolLatencyByProvider } = await import(
        "@omniroute/open-sse/services/toolLatencyTracker"
      );
      toolLatency = getToolLatencyByProvider() as Record<string, unknown>;
    } catch {}

    const resolveName = (provider: string, nodeName: string | null) => {
      if (nodeName?.trim()) return nodeName.trim();
      const info = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
      return info?.name || provider;
    };

    const providers = providerStats.map((p: any) => ({
      ...p,
      provider: resolveName(p.provider, p.nodeName),
    }));

    const models = modelStats.map((m: any) => ({
      ...m,
      provider: resolveName(m.provider, m.nodeName),
    }));

    return NextResponse.json({ providers, models, comboMetrics, telemetry, toolLatency });
  } catch (error) {
    console.error("Error fetching provider stats:", error);
    return NextResponse.json({ error: "Failed to fetch provider stats" }, { status: 500 });
  }
}
