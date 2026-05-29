/**
 * Discovery Service — Automated Provider Discovery
 *
 * Stub implementation for Phase 1. Scans LLM providers for free/unlimited
 * access methods and reports findings.
 *
 * Default: disabled (opt-in via settings)
 */

export interface DiscoveryConfig {
  enabled: boolean;
  scanInterval: number;
  maxConcurrentScans: number;
  targetProviders: string[];
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

const DEFAULT_CONFIG: DiscoveryConfig = {
  enabled: false,
  scanInterval: 24 * 60 * 60 * 1000, // 24 hours
  maxConcurrentScans: 3,
  targetProviders: [],
};

/**
 * Probe a single URL for API availability.
 * Returns basic endpoint info if accessible.
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

/**
 * Scan a provider for free access methods.
 * Stub implementation — returns placeholder data.
 */
export async function scanProvider(
  providerId: string,
  _config: Partial<DiscoveryConfig> = {}
): Promise<DiscoveryResult[]> {
  // Phase 1 stub — returns empty results
  // Phase 2 will implement actual scanning logic
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

/**
 * Get discovery results from the database.
 * Stub implementation — returns empty array.
 */
export function getDiscoveryResults(_providerId?: string): DiscoveryResult[] {
  // Phase 1 stub — Phase 2 will query SQLite
  return [];
}

/**
 * Check if discovery service is enabled.
 */
export function isDiscoveryEnabled(): boolean {
  return DEFAULT_CONFIG.enabled;
}

export { DEFAULT_CONFIG };
