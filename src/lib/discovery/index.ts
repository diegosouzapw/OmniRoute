/**
 * Plugin Discovery Tool — Automated provider scanning.
 *
 * Scans LLM providers for free/unlimited access methods and reports findings.
 * Integrated into OmniRoute as an opt-in service (default off).
 *
 * Phase 1: Stub with types and config.
 * Phase 2: Full scanning engine.
 *
 * @module discovery
 */

import { logger } from "../../../open-sse/utils/logger.ts";
import {
  upsertDiscoveryResult as dbUpsertDiscoveryResult,
  getDiscoveryResults as dbGetDiscoveryResults,
  type DiscoveryResult as DbDiscoveryResult,
} from "../db/discoveryResults";

const log = logger("DISCOVERY");

// ── Types ──

export interface DiscoveryConfig {
  enabled: boolean;
  scanInterval: number; // ms between scans (default: 24h)
  maxConcurrentScans: number;
  targetProviders: string[]; // empty = scan all known
  notificationWebhook?: string;
}

export interface DiscoveryResult {
  id?: number;
  providerId: string;
  method: "free_tier" | "web_cookie" | "auto_register" | "trial" | "public_api";
  endpoint?: string;
  authType: "none" | "cookie" | "api_key" | "oauth";
  models?: string[];
  rateLimit?: string;
  feasibility: number; // 1-5
  riskLevel: "none" | "low" | "medium" | "high" | "critical";
  status: "pending" | "testing" | "verified" | "rejected";
  notes?: string;
  discoveredAt?: string;
  verifiedAt?: string;
}

// ── Default Config ──

export const DEFAULT_DISCOVERY_CONFIG: DiscoveryConfig = {
  enabled: false,
  scanInterval: 24 * 60 * 60 * 1000, // 24 hours
  maxConcurrentScans: 3,
  targetProviders: [],
};

// ── Probe ──

/**
 * Probe a single URL for API availability.
 */
export async function probeEndpoint(
  url: string,
  signal?: AbortSignal
): Promise<{ accessible: boolean; status?: number; hasModels?: boolean }> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "OmniRoute-Discovery/1.0" },
      signal,
    });
    return {
      accessible: res.ok,
      status: res.status,
      hasModels: res.ok && url.includes("/models"),
    };
  } catch {
    return { accessible: false };
  }
}

// ── Scan ──

/**
 * Scan a provider for free access methods.
 * Phase 1 stub — returns placeholder. Phase 2 will implement real scanning.
 */
export async function scanProvider(
  providerId: string,
  _config: Partial<DiscoveryConfig> = {}
): Promise<DiscoveryResult[]> {
  log.info("discovery.scan_stub", {
    providerId,
    note: "Phase 1 stub — implement real scanning in Phase 2",
  });
  return [
    {
      providerId,
      method: "free_tier",
      authType: "none",
      feasibility: 3,
      riskLevel: "none",
      status: "pending",
      notes: "Stub scan — implement actual discovery logic in Phase 2",
      discoveredAt: new Date().toISOString(),
    },
  ];
}

// ── Results (Reporter — Phase 2) ──

/**
 * Persist a discovery finding to the `discovery_results` table via the DB
 * module. Uniqueness is keyed on `(providerId, method, endpoint)`, so
 * re-discovering the same endpoint updates the existing row. Returns the
 * persisted row (with its id).
 */
export function persistDiscoveryResult(result: DiscoveryResult): DiscoveryResult {
  return dbUpsertDiscoveryResult(result as DbDiscoveryResult) as DiscoveryResult;
}

/**
 * Get discovery results from the DB, optionally filtered to one provider.
 * Newest findings first.
 */
export function getDiscoveryResults(providerId?: string): DiscoveryResult[] {
  return dbGetDiscoveryResults(providerId) as DiscoveryResult[];
}

// ── Config ──

/**
 * Check if discovery service is enabled.
 */
export function isDiscoveryEnabled(): boolean {
  return DEFAULT_DISCOVERY_CONFIG.enabled;
}
