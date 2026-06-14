import { NextResponse } from "next/server";
import { getProviderCallStats, getModelCallStats } from "@/lib/db/providerStats";
import { AI_PROVIDERS } from "@/shared/constants/providers";

export async function GET() {
  try {
    // Hard Rule #5: SQL lives in src/lib/db/providerStats.ts, not inline here.
    const providerStats = getProviderCallStats();
    const modelStats = getModelCallStats();

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
