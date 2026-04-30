import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";

function getRangeStartIso(range: string): string | null {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all":
    default:
      return null;
  }

  return start.toISOString();
}

function shortModelName(model: string | null): string {
  if (!model) return "-";
  const parts = model.split(/[/:-]/);
  return parts[parts.length - 1] || model;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const sinceIso = getRangeStartIso(range);
    const presetsParam = searchParams.get("presets");

    const db = getDbInstance();
    const whereClause = sinceIso ? "WHERE timestamp >= @since" : "";
    const params = sinceIso ? { since: sinceIso } : {};

    // Fetch pricing data for cost calculation (no rows loaded)
    const { getPricing } = await import("@/lib/db/settings");
    const pricingByProvider = await getPricing();
    const { normalizeModelName } = await import("@/lib/usage/costCalculator");

    const summaryRow = db
      .prepare(
        `
        SELECT
          COUNT(*) as totalRequests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COUNT(DISTINCT model) as uniqueModels,
          COUNT(DISTINCT connection_id) as uniqueAccounts,
          COUNT(DISTINCT api_key_id) as uniqueApiKeys,
          COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(MIN(timestamp), '') as firstRequest,
          COALESCE(MAX(timestamp), '') as lastRequest
        FROM usage_history
        ${whereClause}
      `
      )
      .get(params) as Record<string, unknown>;

    const dailyRows = db
      .prepare(
        `
        SELECT
          DATE(timestamp) as date,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        ${whereClause}
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    // Use requested range for heatmap if available, else default to 364 days (1 year) as fallback
    const heatmapStart = sinceIso ? new Date(sinceIso) : new Date();
    if (!sinceIso) {
      heatmapStart.setDate(heatmapStart.getDate() - 364);
    }
    const heatmapRows = db
      .prepare(
        `
        SELECT
          DATE(timestamp) as date,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        WHERE timestamp >= @heatmapStart
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      `
      )
      .all({ heatmapStart: heatmapStart.toISOString() }) as Array<Record<string, unknown>>;

    const modelRows = db
      .prepare(
        `
        SELECT
          model,
          provider,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
          COALESCE(MAX(timestamp), '') as lastUsed
        FROM usage_history
        ${whereClause}
        GROUP BY model, provider
        ORDER BY requests DESC
        LIMIT 50
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const providerRows = db
      .prepare(
        `
        SELECT
          provider,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests
        FROM usage_history
        ${whereClause}
        GROUP BY provider
        ORDER BY requests DESC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const accountRows = db
      .prepare(
        `
        SELECT
          connection_id as account,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(MAX(timestamp), '') as lastUsed
        FROM usage_history
        ${whereClause}
        GROUP BY connection_id
        ORDER BY requests DESC
        LIMIT 50
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const weeklyRows = db
      .prepare(
        `
        SELECT
          strftime('%w', timestamp) as dayOfWeek,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        ${whereClause}
        GROUP BY strftime('%w', timestamp)
        ORDER BY dayOfWeek ASC
      `
      )
      .all(params) as Array<Record<string, unknown>>;

    const fallbackRow = db
      .prepare(
        `
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN requested_model IS NOT NULL AND requested_model != '' THEN 1 ELSE 0 END) as with_requested,
          SUM(CASE
            WHEN requested_model IS NOT NULL
             AND requested_model != ''
             AND model IS NOT NULL
             AND requested_model != model
            THEN 1 ELSE 0 END
          ) as fallbacks
        FROM call_logs
        ${whereClause}
      `
      )
      .get(params) as Record<string, unknown>;

    const summary = {
      totalRequests: Number(summaryRow?.totalRequests || 0),
      promptTokens: Number(summaryRow?.promptTokens || 0),
      completionTokens: Number(summaryRow?.completionTokens || 0),
      totalTokens: Number(summaryRow?.totalTokens || 0),
      uniqueModels: Number(summaryRow?.uniqueModels || 0),
      uniqueAccounts: Number(summaryRow?.uniqueAccounts || 0),
      uniqueApiKeys: Number(summaryRow?.uniqueApiKeys || 0),
      successfulRequests: Number(summaryRow?.successfulRequests || 0),
      successRatePct:
        Number(summaryRow?.totalRequests || 0) > 0
          ? Number(
              (
                (Number(summaryRow?.successfulRequests || 0) /
                  Number(summaryRow?.totalRequests || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      avgLatencyMs: Math.round(Number(summaryRow?.avgLatencyMs || 0)),
      // Compute totalCost by summing cost from byModel (calculated later)
      totalCost: 0, // Will be updated after byModel is processed
      firstRequest: summaryRow?.firstRequest || "",
      lastRequest: summaryRow?.lastRequest || "",
      fallbackCount: Number(fallbackRow?.fallbacks || 0),
      fallbackRatePct:
        Number(fallbackRow?.with_requested || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.fallbacks || 0) / Number(fallbackRow?.with_requested || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      requestedModelCoveragePct:
        Number(fallbackRow?.total || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.with_requested || 0) / Number(fallbackRow?.total || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
    };

    const dailyTrend = dailyRows.map((row) => ({
      date: row.date,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
    }));

    const activityMap: Record<string, number> = {};
    for (const row of heatmapRows) {
      activityMap[row.date as string] = Number(row.totalTokens);
    }

    const byModel = modelRows.map((row) => {
      const model = row.model as string;
      const provider = row.provider as string;
      const short = shortModelName(model);
      const tokens = {
        input: Number(row.promptTokens) || 0,
        output: Number(row.completionTokens) || 0,
      };
      // Compute cost from pricing and aggregated tokens
      let cost = 0;
      try {
        const modelPricing =
          pricingByProvider[provider]?.[model] || pricingByProvider[provider]?.[short];
        if (modelPricing && typeof modelPricing === "object") {
          const p = modelPricing as Record<string, unknown>;
          const inputPrice = Number(p.input) || 0;
          const outputPrice = Number(p.output) || 0;
          cost = (tokens.input * inputPrice + tokens.output * outputPrice) / 1_000_000;
        }
      } catch {
        /* ignore */
      }
      return {
        model: short,
        provider,
        rawModel: model,
        requests: Number(row.requests),
        promptTokens: tokens.input,
        completionTokens: tokens.output,
        totalTokens: Number(row.totalTokens),
        avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
        successRatePct:
          Number(row.requests) > 0
            ? Number((Number(row.successfulRequests) / Number(row.requests)) * 100).toFixed(2)
            : 0,
        lastUsed: row.lastUsed,
        cost: Math.round(cost * 100) / 100,
      };
    });

    // Compute totalCost from byModel sum
    const totalCost = byModel.reduce((sum, m) => sum + (m.cost || 0), 0);
    summary.totalCost = Math.round(totalCost * 100) / 100;

    const byProvider = providerRows.map((row) => ({
      provider: row.provider,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      successRatePct:
        Number(row.requests) > 0
          ? Number((Number(row.successfulRequests) / Number(row.requests)) * 100).toFixed(2)
          : 0,
    }));

    const byAccount = accountRows.map((row) => ({
      account: row.account,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      lastUsed: row.lastUsed,
    }));

    const weeklyTokens = [0, 0, 0, 0, 0, 0, 0];
    const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];
    for (const row of weeklyRows) {
      const dayIdx = Number(row.dayOfWeek);
      if (dayIdx >= 0 && dayIdx <= 6) {
        weeklyTokens[dayIdx] = Number(row.totalTokens);
        weeklyCounts[dayIdx] = Number(row.requests);
      }
    }

    const analytics = {
      summary,
      dailyTrend,
      activityMap,
      byModel,
      byProvider,
      byAccount,
      weeklyTokens,
      weeklyCounts,
      range,
    };

    if (presetsParam) {
      const allowedRanges = new Set(["1d", "7d", "30d", "90d", "ytd", "all"]);
      const presetRanges = presetsParam
        .split(",")
        .map((preset) => preset.trim())
        .filter((preset) => allowedRanges.has(preset));
      const presetSummaries: Record<string, { totalCost: number }> = {};

      for (const presetRange of presetRanges) {
        if (presetRange === range) {
          presetSummaries[presetRange] = {
            totalCost: Number(analytics.summary?.totalCost || 0),
          };
          continue;
        }

        const presetSinceIso = getRangeStartIso(presetRange);
        const presetWhere = presetSinceIso ? "WHERE timestamp >= @presetSince" : "";
        const presetParams = presetSinceIso ? { presetSince: presetSinceIso } : {};

        const presetModelRows = db
          .prepare(
            `
            SELECT
              model,
              provider,
              COALESCE(SUM(tokens_input), 0) as promptTokens,
              COALESCE(SUM(tokens_output), 0) as completionTokens
            FROM usage_history
            ${presetWhere}
            GROUP BY model, provider
          `
          )
          .all(presetParams) as Array<Record<string, unknown>>;

        let presetTotalCost = 0;
        for (const row of presetModelRows) {
          const m = row.model as string;
          const p = row.provider as string;
          const short = shortModelName(m);
          const inputTokens = Number(row.promptTokens) || 0;
          const outputTokens = Number(row.completionTokens) || 0;

          try {
            const modelPricing = pricingByProvider[p]?.[m] || pricingByProvider[p]?.[short];
            if (modelPricing && typeof modelPricing === "object") {
              const mp = modelPricing as Record<string, unknown>;
              const inputPrice = Number(mp.input) || 0;
              const outputPrice = Number(mp.output) || 0;
              presetTotalCost +=
                (inputTokens * inputPrice + outputTokens * outputPrice) / 1_000_000;
            }
          } catch {}
        }

        presetSummaries[presetRange] = {
          totalCost: Math.round(presetTotalCost * 100) / 100,
        };
      }

      analytics.presetSummaries = presetSummaries;
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}
