/**
 * Usage Stats — extracted from usageDb.js (T-15)
 *
 * Aggregates usage data into stats for the dashboard:
 * totals, by provider/model/account/apiKey, 10-minute buckets.
 *
 * @module lib/usage/usageStats
 */

import { getDbInstance } from "../db/core";
import { getPendingRequests } from "./usageHistory";
import { getAccountDisplayName } from "@/lib/display/names";
import { calculateCost } from "./costCalculator";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Get aggregated usage stats.
 */
export async function getUsageStats() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM usage_history ORDER BY timestamp ASC").all() as unknown[];

  const { getProviderConnections } = await import("@/lib/localDb");
  let allConnections: unknown[] = [];
  try {
    const loadedConnections = await getProviderConnections();
    allConnections = Array.isArray(loadedConnections) ? loadedConnections : [];
  } catch {}

  const connectionMap: Record<string, string> = {};
  for (const connRaw of allConnections) {
    const conn = asRecord(connRaw);
    const connectionId = toStringOrEmpty(conn.id);
    if (!connectionId) continue;
    connectionMap[connectionId] =
      toStringOrEmpty(conn.name) || toStringOrEmpty(conn.email) || connectionId;
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
        const accountName =
          connectionMap[connectionId] || getAccountDisplayName({ id: connectionId });
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

  for (const rowRaw of rows) {
    const row = asRecord(rowRaw);
    const provider = toStringOrEmpty(row.provider) || "unknown";
    const model = toStringOrEmpty(row.model) || "unknown";
    const timestamp = toStringOrEmpty(row.timestamp) || new Date(0).toISOString();
    const connectionId = toStringOrEmpty(row.connection_id) || null;
    const apiKeyId = toStringOrEmpty(row.api_key_id) || null;
    const apiKeyName = toStringOrEmpty(row.api_key_name) || null;

    const promptTokens = toNumber(row.tokens_input);
    const completionTokens = toNumber(row.tokens_output);
    const entryTime = new Date(timestamp);

    const entryTokens = {
      input: toNumber(row.tokens_input),
      output: toNumber(row.tokens_output),
      cacheRead: toNumber(row.tokens_cache_read),
      cacheCreation: toNumber(row.tokens_cache_creation),
      reasoning: toNumber(row.tokens_reasoning),
    };
    const entryCost = await calculateCost(provider, model, entryTokens);

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
    if (!stats.byProvider[provider]) {
      stats.byProvider[provider] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
      };
    }
    stats.byProvider[provider].requests++;
    stats.byProvider[provider].promptTokens += promptTokens;
    stats.byProvider[provider].completionTokens += completionTokens;
    stats.byProvider[provider].cost += entryCost;

    // By Model
    const modelKey = provider ? `${model} (${provider})` : model;
    if (!stats.byModel[modelKey]) {
      stats.byModel[modelKey] = {
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        cost: 0,
        rawModel: model,
        provider,
        lastUsed: timestamp,
      };
    }
    stats.byModel[modelKey].requests++;
    stats.byModel[modelKey].promptTokens += promptTokens;
    stats.byModel[modelKey].completionTokens += completionTokens;
    stats.byModel[modelKey].cost += entryCost;
    if (new Date(timestamp) > new Date(stats.byModel[modelKey].lastUsed)) {
      stats.byModel[modelKey].lastUsed = timestamp;
    }

    // By Account
    if (connectionId) {
      const accountName =
        connectionMap[connectionId] || getAccountDisplayName({ id: connectionId });
      const accountKey = `${model} (${provider} - ${accountName})`;
      if (!stats.byAccount[accountKey]) {
        stats.byAccount[accountKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          rawModel: model,
          provider,
          connectionId,
          accountName,
          lastUsed: timestamp,
        };
      }
      stats.byAccount[accountKey].requests++;
      stats.byAccount[accountKey].promptTokens += promptTokens;
      stats.byAccount[accountKey].completionTokens += completionTokens;
      stats.byAccount[accountKey].cost += entryCost;
      if (new Date(timestamp) > new Date(stats.byAccount[accountKey].lastUsed)) {
        stats.byAccount[accountKey].lastUsed = timestamp;
      }
    }

    // By API key
    if (apiKeyId || apiKeyName) {
      const keyName = apiKeyName || apiKeyId || "unknown";
      const keyId = apiKeyId || null;
      const apiKey = keyId ? `${keyName} (${keyId})` : keyName;
      if (!stats.byApiKey[apiKey]) {
        stats.byApiKey[apiKey] = {
          requests: 0,
          promptTokens: 0,
          completionTokens: 0,
          cost: 0,
          apiKeyId: keyId,
          apiKeyName: keyName,
          lastUsed: timestamp,
        };
      }
      stats.byApiKey[apiKey].requests++;
      stats.byApiKey[apiKey].promptTokens += promptTokens;
      stats.byApiKey[apiKey].completionTokens += completionTokens;
      stats.byApiKey[apiKey].cost += entryCost;
      if (new Date(timestamp) > new Date(stats.byApiKey[apiKey].lastUsed)) {
        stats.byApiKey[apiKey].lastUsed = timestamp;
      }
    }
  }

  return stats;
}
