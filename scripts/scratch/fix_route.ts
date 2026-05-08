import fs from "fs";

const content = fs.readFileSync("src/app/api/usage/analytics/route.ts", "utf8");

// We'll replace the GET function entirely
const getFnStart = content.indexOf("export async function GET(request: Request) {");
const beforeGet = content.slice(0, getFnStart);

const newGetFn = `export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const apiKeyIdsParam = searchParams.get("apiKeyIds") || "";
    const apiKeyIds = apiKeyIdsParam ? apiKeyIdsParam.split(",").filter(Boolean) : [];

    const sinceIso = startDate || getRangeStartIso(range);
    const untilIso = endDate || null;
    const presetsParam = searchParams.get("presets");

    const db = getDbInstance();

    // ── Enrich entries with missing apiKeyName ──────────────────────────
    try {
      // Only run enrichment if there are actually NULL entries
      const hasNull = db.prepare("SELECT 1 FROM usage_history WHERE (api_key_name IS NULL OR api_key_name = '') AND connection_id IS NOT NULL LIMIT 1").get();
      if (hasNull) {
        // Step 1: dominant key per connectionId from existing usage data
        db.prepare(\`
          UPDATE usage_history
          SET
            api_key_name = (
              SELECT uh2.api_key_name
              FROM usage_history AS uh2
              WHERE uh2.connection_id = usage_history.connection_id
                AND uh2.api_key_name IS NOT NULL AND uh2.api_key_name != ''
              GROUP BY uh2.api_key_name
              ORDER BY COUNT(*) DESC
              LIMIT 1
            ),
            api_key_id = COALESCE(api_key_id, (
              SELECT uh2.api_key_id
              FROM usage_history AS uh2
              WHERE uh2.connection_id = usage_history.connection_id
                AND uh2.api_key_name IS NOT NULL AND uh2.api_key_name != ''
              GROUP BY uh2.api_key_name
              ORDER BY COUNT(*) DESC
              LIMIT 1
            ))
          WHERE (api_key_name IS NULL OR api_key_name = '')
            AND connection_id IS NOT NULL
            AND EXISTS (
                SELECT 1 FROM usage_history AS uh3
                WHERE uh3.connection_id = usage_history.connection_id
                  AND uh3.api_key_name IS NOT NULL AND uh3.api_key_name != ''
            )
        \`).run();

        // Step 2 & 3: For still unresolved connections, check apiKeys config
        const stillNull = db.prepare("SELECT DISTINCT connection_id FROM usage_history WHERE (api_key_name IS NULL OR api_key_name = '') AND connection_id IS NOT NULL").all();
        if (stillNull.length > 0) {
          const { getApiKeys } = await import("@/lib/localDb");
          const apiKeys = (await getApiKeys()) as any[];

          const updateStmt = db.prepare("UPDATE usage_history SET api_key_name = ?, api_key_id = ? WHERE connection_id = ? AND (api_key_name IS NULL OR api_key_name = '')");
          const updateMany = db.transaction((updates: any[]) => {
            for (const u of updates) updateStmt.run(u.name, u.id, u.cid);
          });

          const updates = [];
          const orphanIds = new Set(stillNull.map((r: any) => r.connection_id));

          for (const ak of apiKeys) {
            const allowed = Array.isArray(ak.allowedConnections) ? ak.allowedConnections : [];
            const keyName = ak.name || ak.id;
            const keyId = ak.id || null;
            for (const cid of allowed) {
              if (typeof cid === "string" && orphanIds.has(cid)) {
                updates.push({ name: keyName, id: keyId, cid });
                orphanIds.delete(cid);
              }
            }
          }

          if (orphanIds.size > 0) {
            const unrestrictedKeys = apiKeys.filter(
              (ak: any) => !Array.isArray(ak.allowedConnections) || ak.allowedConnections.length === 0
            );
            if (unrestrictedKeys.length > 0) {
              let bestKey = unrestrictedKeys[0];
              let bestCount = -1;
              for (const uk of unrestrictedKeys) {
                const countRow = db.prepare("SELECT COUNT(*) as c FROM usage_history WHERE api_key_name = ?").get(uk.name || uk.id) as any;
                if (countRow.c > bestCount) { bestCount = countRow.c; bestKey = uk; }
              }
              const fallbackName = bestKey.name || bestKey.id;
              const fallbackId = bestKey.id || null;
              for (const cid of orphanIds) {
                updates.push({ name: fallbackName, id: fallbackId, cid });
              }
            }
          }

          if (updates.length > 0) updateMany(updates);
        }
      }
    } catch(e) {
      console.error("Failed to backfill missing api_key_name:", e);
    }

    const conditions = [];
    const params: Record<string, string> = {};

    if (sinceIso) {
      conditions.push("timestamp >= @since");
      params.since = sinceIso;
    }
    if (untilIso) {
      conditions.push("timestamp <= @until");
      params.until = untilIso;
    }

    let apiKeyWhere = "";
    if (apiKeyIds.length > 0) {
      const placeholders = apiKeyIds.map((_, i) => \`@apiKey\${i}\`);
      apiKeyIds.forEach((key, i) => {
        params[\`apiKey\${i}\`] = key;
      });
      apiKeyWhere = \`(api_key_name IN (\${placeholders.join(",")}) OR api_key_id IN (\${placeholders.join(",")}))\`;
      conditions.push(apiKeyWhere);
    }

    const whereClause = conditions.length > 0 ? \`WHERE \${conditions.join(" AND ")}\` : "";

    // Fetch pricing data for cost calculation (no rows loaded)
    const { getPricing } = await import("@/lib/db/settings");
    const pricingByProvider = (await getPricing()) as PricingByProvider;
    const { computeCostFromPricing, normalizeModelName } =
      await import("@/lib/usage/costCalculator");

    const summaryRow = db
      .prepare(
        \`
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
        \${whereClause}
      \`
      )
      .get(params) as Record<string, unknown>;

    const dailyRows = db
      .prepare(
        \`
        SELECT
          DATE(timestamp) as date,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        \${whereClause}
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const dailyCostRows = db
      .prepare(
        \`
        SELECT
          DATE(timestamp) as date,
          provider,
          model,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
        FROM usage_history
        \${whereClause}
        GROUP BY DATE(timestamp), provider, model
        ORDER BY date ASC
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const heatmapStart = new Date();
    heatmapStart.setUTCDate(heatmapStart.getUTCDate() - 364);
    // Custom date range might need a wider heatmap window
    if (startDate) {
      const customStart = new Date(startDate);
      if (customStart.getTime() < heatmapStart.getTime()) {
        heatmapStart.setTime(customStart.getTime());
      }
    }

    // Heatmap needs its own whereClause if api keys are filtered
    const heatmapConditions = ["timestamp >= @heatmapStart"];
    if (apiKeyWhere) heatmapConditions.push(apiKeyWhere);
    const heatmapParams: Record<string, string> = { heatmapStart: heatmapStart.toISOString() };
    if (apiKeyIds.length > 0) {
      apiKeyIds.forEach((key, i) => { heatmapParams[\`apiKey\${i}\`] = key; });
    }

    const heatmapRows = db
      .prepare(
        \`
        SELECT
          DATE(timestamp) as date,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        WHERE \${heatmapConditions.join(" AND ")}
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      \`
      )
      .all(heatmapParams) as Array<Record<string, unknown>>;

    const modelRows = db
      .prepare(
        \`
        SELECT
          model,
          provider,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
          COALESCE(MAX(timestamp), '') as lastUsed
        FROM usage_history
        \${whereClause}
        GROUP BY model, provider
        ORDER BY requests DESC
        LIMIT 50
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const providerCostRows = db
      .prepare(
        \`
        SELECT
          provider,
          model,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
        FROM usage_history
        \${whereClause}
        GROUP BY provider, model
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const providerRows = db
      .prepare(
        \`
        SELECT
          provider,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests
        FROM usage_history
        \${whereClause}
        GROUP BY provider
        ORDER BY requests DESC
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const accountCostRows = db
      .prepare(
        \`
        SELECT
          connection_id as account,
          provider,
          model,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
        FROM usage_history
        \${whereClause}
        GROUP BY connection_id, provider, model
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const accountRows = db
      .prepare(
        \`
        SELECT
          connection_id as account,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
          COALESCE(AVG(latency_ms), 0) as avgLatencyMs,
          COALESCE(MAX(timestamp), '') as lastUsed
        FROM usage_history
        \${whereClause}
        GROUP BY connection_id
        ORDER BY requests DESC
        LIMIT 50
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const apiKeyWhereClause = appendWhereCondition(
      whereClause,
      "(api_key_id IS NOT NULL AND api_key_id != '') OR (api_key_name IS NOT NULL AND api_key_name != '')"
    );
    const apiKeyRows = db
      .prepare(
        \`
        SELECT
          api_key_id as apiKeyId,
          COALESCE(NULLIF(api_key_name, ''), NULLIF(api_key_id, ''), 'Unknown API key') as apiKeyName,
          provider,
          model,
          COUNT(*) as requests,
          COALESCE(SUM(tokens_input), 0) as promptTokens,
          COALESCE(SUM(tokens_output), 0) as completionTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
          COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
        FROM usage_history
        \${apiKeyWhereClause}
        GROUP BY api_key_id, api_key_name, provider, model
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const weeklyRows = db
      .prepare(
        \`
        SELECT
          dayOfWeek,
          COUNT(*) as days,
          COALESCE(SUM(requests), 0) as requests,
          COALESCE(SUM(totalTokens), 0) as totalTokens
        FROM (
          SELECT
            DATE(timestamp) as date,
            strftime('%w', timestamp) as dayOfWeek,
            COUNT(*) as requests,
            COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
          FROM usage_history
          \${whereClause}
          GROUP BY DATE(timestamp), strftime('%w', timestamp)
        )
        GROUP BY dayOfWeek
        ORDER BY dayOfWeek ASC
      \`
      )
      .all(params) as Array<Record<string, unknown>>;

    const fallbackRow = db
      .prepare(
        \`
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
        \${whereClause}
      \`
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
      totalCost: 0,
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
      streak: 0,
    };

    const dailyCostByDate = new Map<string, number>();
    for (const row of dailyCostRows) {
      const date = toStringValue(row.date);
      if (!date) continue;
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        normalizeModelName,
        computeCostFromPricing
      );
      dailyCostByDate.set(date, (dailyCostByDate.get(date) || 0) + cost);
    }

    const dailyTrend = dailyRows.map((row) => ({
      date: row.date,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      cost: roundCost(dailyCostByDate.get(toStringValue(row.date)) || 0),
    }));

    const activityMap: Record<string, number> = {};
    for (const row of heatmapRows) {
      activityMap[row.date as string] = Number(row.totalTokens);
    }
    summary.streak = computeActivityStreak(activityMap);

    const byModel = modelRows.map((row) => {
      const model = row.model as string;
      const provider = row.provider as string;
      const short = shortModelName(model);
      const tokens = {
        input: Number(row.promptTokens) || 0,
        output: Number(row.completionTokens) || 0,
      };
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        normalizeModelName,
        computeCostFromPricing
      );
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
        cost: roundCost(cost),
      };
    });

    const totalCost = Array.from(dailyCostByDate.values()).reduce((sum, cost) => sum + cost, 0);
    summary.totalCost = roundCost(totalCost);

    const providerCostByProvider = new Map<string, number>();
    for (const row of providerCostRows) {
      const provider = toStringValue(row.provider);
      if (!provider) continue;
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        normalizeModelName,
        computeCostFromPricing
      );
      providerCostByProvider.set(provider, (providerCostByProvider.get(provider) || 0) + cost);
    }

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
      cost: roundCost(providerCostByProvider.get(toStringValue(row.provider)) || 0),
    }));

    const accountCostByAccount = new Map<string, number>();
    for (const row of accountCostRows) {
      const account = toStringValue(row.account, "unknown");
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        normalizeModelName,
        computeCostFromPricing
      );
      accountCostByAccount.set(account, (accountCostByAccount.get(account) || 0) + cost);
    }

    const byAccount = accountRows.map((row) => ({
      account: toStringValue(row.account, "unknown"),
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      lastUsed: row.lastUsed,
      cost: roundCost(accountCostByAccount.get(toStringValue(row.account, "unknown")) || 0),
    }));

    const apiKeyMap = new Map<
      string,
      {
        apiKey: string;
        apiKeyId: string | null;
        apiKeyName: string;
        requests: number;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost: number;
      }
    >();
    for (const row of apiKeyRows) {
      const apiKeyId = toStringValue(row.apiKeyId);
      const apiKeyName = toStringValue(row.apiKeyName, apiKeyId || "Unknown API key");
      const key = \`\${apiKeyId || "unknown"}::\${apiKeyName}\`;
      const existing = apiKeyMap.get(key) || {
        apiKey: apiKeyId && apiKeyName !== apiKeyId ? \`\${apiKeyName} (\${apiKeyId})\` : apiKeyName,
        apiKeyId: apiKeyId || null,
        apiKeyName,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };

      existing.requests += Number(row.requests);
      existing.promptTokens += Number(row.promptTokens);
      existing.completionTokens += Number(row.completionTokens);
      existing.totalTokens += Number(row.totalTokens);
      existing.cost += computeUsageRowCost(
        row,
        pricingByProvider,
        normalizeModelName,
        computeCostFromPricing
      );
      apiKeyMap.set(key, existing);
    }
    const byApiKey = Array.from(apiKeyMap.values())
      .map((row) => ({ ...row, cost: roundCost(row.cost) }))
      .sort((left, right) => right.cost - left.cost);

    const weeklyTokens = [0, 0, 0, 0, 0, 0, 0];
    const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];
    const weeklyPattern = WEEKDAY_LABELS.map((day) => ({
      day,
      avgTokens: 0,
      totalTokens: 0,
    }));
    for (const row of weeklyRows) {
      const dayIdx = Number(row.dayOfWeek);
      if (dayIdx >= 0 && dayIdx <= 6) {
        const totalTokens = Number(row.totalTokens);
        const days = Number(row.days);
        weeklyTokens[dayIdx] = totalTokens;
        weeklyCounts[dayIdx] = Number(row.requests);
        weeklyPattern[dayIdx] = {
          day: WEEKDAY_LABELS[dayIdx],
          avgTokens: days > 0 ? Math.round(totalTokens / days) : 0,
          totalTokens,
        };
      }
    }

    const analytics = {
      summary,
      dailyTrend,
      activityMap,
      byModel,
      byProvider,
      byApiKey,
      byAccount,
      weeklyPattern,
      weeklyTokens,
      weeklyCounts,
      range,
    } as any;

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
        const presetConditions = [];
        const presetParams: Record<string, string> = {};
        if (presetSinceIso) { presetConditions.push("timestamp >= @presetSince"); presetParams.presetSince = presetSinceIso; }
        if (apiKeyWhere) { presetConditions.push(apiKeyWhere); Object.assign(presetParams, params); }

        const presetWhere = presetConditions.length > 0 ? \`WHERE \${presetConditions.join(" AND ")}\` : "";

        const presetModelRows = db
          .prepare(
            \`
            SELECT
              model,
              provider,
              COALESCE(SUM(tokens_input), 0) as promptTokens,
              COALESCE(SUM(tokens_output), 0) as completionTokens,
              COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
              COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
              COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
            FROM usage_history
            \${presetWhere}
            GROUP BY model, provider
          \`
          )
          .all(presetParams) as Array<Record<string, unknown>>;

        let presetTotalCost = 0;
        for (const row of presetModelRows) {
          presetTotalCost += computeUsageRowCost(
            row,
            pricingByProvider,
            normalizeModelName,
            computeCostFromPricing
          );
        }

        presetSummaries[presetRange] = {
          totalCost: roundCost(presetTotalCost),
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
`;

fs.writeFileSync("src/app/api/usage/analytics/route.ts", beforeGet + newGetFn, "utf8");
