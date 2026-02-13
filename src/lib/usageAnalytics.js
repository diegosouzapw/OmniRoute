/**
 * Usage Analytics — Aggregation functions for the analytics dashboard
 *
 * Processes usage.json history entries into dashboard-ready data:
 * summary cards, daily trends, activity heatmap, model breakdown, etc.
 */

import { calculateCost } from "@/lib/usageDb.js";

/**
 * Compute date range boundaries
 * @param {string} range - "7d" | "30d" | "90d" | "ytd" | "all"
 * @returns {{ start: Date, end: Date }}
 */
function getDateRange(range) {
  const end = new Date();
  let start;

  switch (range) {
    case "7d":
      start = new Date(end);
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start = new Date(end);
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start = new Date(end);
      start.setDate(start.getDate() - 90);
      break;
    case "ytd":
      start = new Date(end.getFullYear(), 0, 1);
      break;
    case "all":
    default:
      start = new Date(0);
      break;
  }

  return { start, end };
}

/**
 * Format a Date to "YYYY-MM-DD" string
 */
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Short model name (strip provider prefix paths)
 */
function shortModelName(model) {
  if (!model) return "unknown";
  // "accounts/fireworks/models/gpt-oss-120b" → "gpt-oss-120b"
  const parts = model.split("/");
  return parts[parts.length - 1] || model;
}

/**
 * Compute all analytics data from usage history
 * @param {Array} history - Array of usage entries
 * @param {string} range - Time range filter
 * @param {Object} connectionMap - Map of connectionId → account name
 * @returns {Object} Analytics data
 */
export async function computeAnalytics(history, range = "30d", connectionMap = {}) {
  const { start, end } = getDateRange(range);

  // ---- Filtered entries ----
  const entries = history.filter((e) => {
    const t = new Date(e.timestamp);
    return t >= start && t <= end;
  });

  // ---- Summary ----
  const summary = {
    totalTokens: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalCost: 0,
    totalRequests: entries.length,
    uniqueModels: new Set(),
    uniqueAccounts: new Set(),
    uniqueApiKeys: new Set(),
  };

  // ---- Daily trend ----
  const dailyMap = {}; // "YYYY-MM-DD" → { requests, promptTokens, completionTokens, cost }
  const dailyByModelMap = {}; // "YYYY-MM-DD" → { modelShort → tokens }

  // ---- Activity heatmap (always last 365 days, regardless of range filter) ----
  const heatmapStart = new Date();
  heatmapStart.setDate(heatmapStart.getDate() - 364);
  const activityMap = {};

  // ---- By model / account / provider ----
  const byModelMap = {};
  const byAccountMap = {};
  const byProviderMap = {};
  const byApiKeyMap = {};

  // ---- Weekly pattern (0=Sun..6=Sat) ----
  const weeklyTokens = [0, 0, 0, 0, 0, 0, 0];
  const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];

  // ---- Single pass over ALL history for heatmap ----
  for (const entry of history) {
    const entryDate = new Date(entry.timestamp);
    if (entryDate >= heatmapStart) {
      const key = toDateKey(entryDate);
      const tokens =
        (entry.tokens?.input ?? entry.tokens?.prompt_tokens ?? 0) +
        (entry.tokens?.output ?? entry.tokens?.completion_tokens ?? 0);
      activityMap[key] = (activityMap[key] || 0) + tokens;
    }
  }

  // ---- Single pass over filtered entries for everything else ----
  for (const entry of entries) {
    const pt = entry.tokens?.input ?? entry.tokens?.prompt_tokens ?? 0;
    const ct = entry.tokens?.output ?? entry.tokens?.completion_tokens ?? 0;
    const totalTkns = pt + ct;
    const entryDate = new Date(entry.timestamp);
    const dateKey = toDateKey(entryDate);
    const dayOfWeek = entryDate.getDay();
    const modelShort = shortModelName(entry.model);

    // Cost
    let cost = 0;
    try {
      cost = await calculateCost(entry.provider, entry.model, entry.tokens);
    } catch {
      /* ignore */
    }

    // Summary
    summary.promptTokens += pt;
    summary.completionTokens += ct;
    summary.totalTokens += totalTkns;
    summary.totalCost += cost;
    if (entry.model) summary.uniqueModels.add(modelShort);
    if (entry.connectionId) summary.uniqueAccounts.add(entry.connectionId);
    if (entry.apiKeyId || entry.apiKeyName) {
      summary.uniqueApiKeys.add(entry.apiKeyId || entry.apiKeyName);
    }

    // Daily trend
    if (!dailyMap[dateKey]) {
      dailyMap[dateKey] = {
        date: dateKey,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
      };
    }
    dailyMap[dateKey].requests++;
    dailyMap[dateKey].promptTokens += pt;
    dailyMap[dateKey].completionTokens += ct;
    dailyMap[dateKey].cost += cost;

    // Daily by model
    if (!dailyByModelMap[dateKey]) dailyByModelMap[dateKey] = {};
    dailyByModelMap[dateKey][modelShort] = (dailyByModelMap[dateKey][modelShort] || 0) + totalTkns;

    // Weekly pattern
    weeklyTokens[dayOfWeek] += totalTkns;
    weeklyCounts[dayOfWeek]++;

    // By model
    if (!byModelMap[modelShort]) {
      byModelMap[modelShort] = {
        model: modelShort,
        provider: entry.provider,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };
    }
    byModelMap[modelShort].requests++;
    byModelMap[modelShort].promptTokens += pt;
    byModelMap[modelShort].completionTokens += ct;
    byModelMap[modelShort].totalTokens += totalTkns;
    byModelMap[modelShort].cost += cost;

    // By account
    const accountName = entry.connectionId
      ? connectionMap[entry.connectionId] || `Account ${entry.connectionId.slice(0, 8)}`
      : entry.provider || "unknown";
    if (!byAccountMap[accountName]) {
      byAccountMap[accountName] = { account: accountName, totalTokens: 0, requests: 0, cost: 0 };
    }
    byAccountMap[accountName].totalTokens += totalTkns;
    byAccountMap[accountName].requests++;
    byAccountMap[accountName].cost += cost;

    // By provider
    const prov = entry.provider || "unknown";
    if (!byProviderMap[prov]) {
      byProviderMap[prov] = {
        provider: prov,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
      };
    }
    byProviderMap[prov].requests++;
    byProviderMap[prov].promptTokens += pt;
    byProviderMap[prov].completionTokens += ct;
    byProviderMap[prov].totalTokens += totalTkns;
    byProviderMap[prov].cost += cost;

    // By API key
    if (entry.apiKeyId || entry.apiKeyName) {
      const keyName = entry.apiKeyName || entry.apiKeyId || "unknown";
      const keyLabel = entry.apiKeyId ? `${keyName} (${entry.apiKeyId})` : keyName;
      if (!byApiKeyMap[keyLabel]) {
        byApiKeyMap[keyLabel] = {
          apiKey: keyLabel,
          apiKeyId: entry.apiKeyId || null,
          apiKeyName: keyName,
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
          cost: 0,
        };
      }
      byApiKeyMap[keyLabel].requests++;
      byApiKeyMap[keyLabel].promptTokens += pt;
      byApiKeyMap[keyLabel].completionTokens += ct;
      byApiKeyMap[keyLabel].totalTokens += totalTkns;
      byApiKeyMap[keyLabel].cost += cost;
    }
  }

  // ---- Build sorted arrays ----
  const dailyTrend = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));

  // Daily by model — collect all unique model names
  const allModels = new Set();
  for (const day of Object.values(dailyByModelMap)) {
    for (const m of Object.keys(day)) allModels.add(m);
  }
  const dailyByModel = dailyTrend.map((d) => {
    const row = { date: d.date };
    for (const m of allModels) {
      row[m] = dailyByModelMap[d.date]?.[m] || 0;
    }
    return row;
  });

  const byModel = Object.values(byModelMap)
    .sort((a, b) => b.totalTokens - a.totalTokens)
    .map((m) => ({
      ...m,
      pct: summary.totalTokens > 0 ? ((m.totalTokens / summary.totalTokens) * 100).toFixed(1) : "0",
    }));

  const byAccount = Object.values(byAccountMap).sort((a, b) => b.totalTokens - a.totalTokens);
  const byProvider = Object.values(byProviderMap).sort((a, b) => b.totalTokens - a.totalTokens);
  const byApiKey = Object.values(byApiKeyMap).sort((a, b) => b.totalTokens - a.totalTokens);

  // Weekly pattern (avg tokens per day of week)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyPattern = weekDays.map((name, i) => ({
    day: name,
    avgTokens: weeklyCounts[i] > 0 ? Math.round(weeklyTokens[i] / weeklyCounts[i]) : 0,
    totalTokens: weeklyTokens[i],
  }));

  // Streak — consecutive days with activity (from today going back)
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    if (activityMap[key] && activityMap[key] > 0) {
      streak++;
    } else if (i > 0) {
      break; // Stop at first gap (skip today if no activity yet)
    }
  }

  return {
    summary: {
      totalTokens: summary.totalTokens,
      promptTokens: summary.promptTokens,
      completionTokens: summary.completionTokens,
      totalCost: summary.totalCost,
      totalRequests: summary.totalRequests,
      uniqueModels: summary.uniqueModels.size,
      uniqueAccounts: summary.uniqueAccounts.size,
      uniqueApiKeys: summary.uniqueApiKeys.size,
      streak,
    },
    dailyTrend,
    dailyByModel,
    modelNames: [...allModels],
    byModel,
    byAccount,
    byProvider,
    byApiKey,
    activityMap,
    weeklyPattern,
    range,
  };
}
