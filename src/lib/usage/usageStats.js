/**
 * Usage Stats — extracted from usageDb.js (T-15)
 *
 * Aggregates usage data into stats for the dashboard:
 * totals, by provider/model/account/apiKey, 10-minute buckets.
 *
 * @module lib/usage/usageStats
 */

import { getDbInstance } from "../db/core.js";
import { getPendingRequests } from "./usageHistory.js";
import { calculateCost } from "./costCalculator.js";

/**
 * Get aggregated usage stats.
 */
export async function getUsageStats() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM usage_history ORDER BY timestamp ASC").all();

  const { getProviderConnections } = await import("@/lib/localDb.js");
  let allConnections = [];
  try {
    allConnections = await getProviderConnections();
  } catch {}

  const connectionMap = {};
  for (const conn of allConnections) {
    connectionMap[conn.id] = conn.name || conn.email || conn.id;
  }

  const pendingRequests = getPendingRequests();

  const stats = {
    totalRequests: rows.length,
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    totalCost: 0,
    byProvider: {},
    byModel: {},
    byAccount: {},
    byApiKey: {},
    last10Minutes: [],
    pending: pendingRequests,
    activeRequests: [],
  };

  // Build active requests
  for (const [connectionId, models] of Object.entries(pendingRequests.byAccount)) {
    for (const [modelKey, count] of Object.entries(models)) {
      if (count > 0) {
        const accountName = connectionMap[connectionId] || `Account ${connectionId.slice(0, 8)}...`;
        const match = modelKey.match(/^(.*) \((.*)\)$/);
        stats.activeRequests.push({
          model: match ? match[1] : modelKey,
          provider: match ? match[2] : "unknown",
          account: accountName,
          count,
        });
      }
    }
  }

  // 10-minute buckets
  const now = new Date();
  const currentMinuteStart = new Date(Math.floor(now.getTime() / 60000) * 60000);

  const bucketMap = {};
  for (let i = 0; i < 10; i++) {
    const bucketTime = new Date(currentMinuteStart.getTime() - (9 - i) * 60 * 1000);
    const bucketKey = bucketTime.getTime();
    bucketMap[bucketKey] = { requests: 0, promptTokens: 0, completionTokens: 0, cost: 0 };
    stats.last10Minutes.push(bucketMap[bucketKey]);
  }

  const tenMinutesAgo = new Date(currentMinuteStart.getTime() - 9 * 60 * 1000);

  for (const row of rows) {
    const promptTokens = row.tokens_input || 0;
    const completionTokens = row.tokens_output || 0;
    const entryTime = new Date(row.timestamp);

    const entryTokens = {
      input: row.tokens_input,
      output: row.tokens_output,
      cacheRead: row.tokens_cache_read,
      cacheCreation: row.tokens_cache_creation,
      reasoning: row.tokens_reasoning,
    };
    const entryCost = await calculateCost(row.provider, row.model, entryTokens);

    stats.totalPromptTokens += promptTokens;
    stats.totalCompletionTokens += completionTokens;
    stats.totalCost += entryCost;

    // 10-min buckets
    if (entryTime >= tenMinutesAgo && entryTime <= now) {
      const entryMinuteStart = Math.floor(entryTime.getTime() / 60000) * 60000;
      if (bucketMap[entryMinuteStart]) {
        bucketMap[entryMinuteStart].requests++;
        bucketMap[entryMinuteStart].promptTokens += promptTokens;
        bucketMap[entryMinuteStart].completionTokens += completionTokens;
        bucketMap[entryMinuteStart].cost += entryCost;
      }
    }

    // By Provider
    if (!stats.byProvider[row.provider]) {
      stats.byProvider[row.provider] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
      };
    }
    stats.byProvider[row.provider].requests++;
    stats.byProvider[row.provider].promptTokens += promptTokens;
    stats.byProvider[row.provider].completionTokens += completionTokens;
    stats.byProvider[row.provider].cost += entryCost;

    // By Model
    const modelKey = row.provider ? `${row.model} (${row.provider})` : row.model;
    if (!stats.byModel[modelKey]) {
      stats.byModel[modelKey] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
        rawModel: row.model,
        provider: row.provider,
        lastUsed: row.timestamp,
      };
    }
    stats.byModel[modelKey].requests++;
    stats.byModel[modelKey].promptTokens += promptTokens;
    stats.byModel[modelKey].completionTokens += completionTokens;
    stats.byModel[modelKey].cost += entryCost;
    if (new Date(row.timestamp) > new Date(stats.byModel[modelKey].lastUsed)) {
      stats.byModel[modelKey].lastUsed = row.timestamp;
    }

    // By Account
    if (row.connection_id) {
      const accountName =
        connectionMap[row.connection_id] || `Account ${row.connection_id.slice(0, 8)}...`;
      const accountKey = `${row.model} (${row.provider} - ${accountName})`;
      if (!stats.byAccount[accountKey]) {
        stats.byAccount[accountKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          rawModel: row.model,
          provider: row.provider,
          connectionId: row.connection_id,
          accountName,
          lastUsed: row.timestamp,
        };
      }
      stats.byAccount[accountKey].requests++;
      stats.byAccount[accountKey].promptTokens += promptTokens;
      stats.byAccount[accountKey].completionTokens += completionTokens;
      stats.byAccount[accountKey].cost += entryCost;
      if (new Date(row.timestamp) > new Date(stats.byAccount[accountKey].lastUsed)) {
        stats.byAccount[accountKey].lastUsed = row.timestamp;
      }
    }

    // By API key
    if (row.api_key_id || row.api_key_name) {
      const keyName = row.api_key_name || row.api_key_id || "unknown";
      const keyId = row.api_key_id || null;
      const apiKey = keyId ? `${keyName} (${keyId})` : keyName;
      if (!stats.byApiKey[apiKey]) {
        stats.byApiKey[apiKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          apiKeyId: keyId,
          apiKeyName: keyName,
          lastUsed: row.timestamp,
        };
      }
      stats.byApiKey[apiKey].requests++;
      stats.byApiKey[apiKey].promptTokens += promptTokens;
      stats.byApiKey[apiKey].completionTokens += completionTokens;
      stats.byApiKey[apiKey].cost += entryCost;
      if (new Date(row.timestamp) > new Date(stats.byApiKey[apiKey].lastUsed)) {
        stats.byApiKey[apiKey].lastUsed = row.timestamp;
      }
    }
  }

  return stats;
}
