<<<<<<< Updated upstream
=======
import { getSettings } from "../db/settings";
import dns from "node:dns/promises";
import net from "node:net";
>>>>>>> Stashed changes
/**
 * Plugin Marketplace — browse, search, install plugins from a registry.
 *
 * Phase 1: Local registry with seed data.
 * Phase 2: Remote registry with ratings/downloads.
 *
 * @module plugins/marketplace
 */

/**
 * Validate a URL for SSRF safety: must be http/https and must not resolve
 * to a private or loopback IP address.
 */
async function isSafeMarketplaceUrl(urlStr: string): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }
  // Resolve hostname to IPs and check none are private/loopback
  try {
    const addresses = await dns.resolve4(parsed.hostname);
    for (const ip of addresses) {
      if (net.isIPv4(ip)) {
        const parts = ip.split(".").map(Number);
        // 127.0.0.0/8 (loopback)
        if (parts[0] === 127) return false;
        // 10.0.0.0/8 (private)
        if (parts[0] === 10) return false;
        // 172.16.0.0/12 (private)
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return false;
        // 192.168.0.0/16 (private)
        if (parts[0] === 192 && parts[1] === 168) return false;
        // 0.0.0.0/8 (current network)
        if (parts[0] === 0) return false;
        // 100.64.0.0/10 (CGNAT)
        if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return false;
        // 169.254.0.0/16 (link-local)
        if (parts[0] === 169 && parts[1] === 254) return false;
        // 198.18.0.0/15 (benchmarking)
        if (parts[0] === 198 && (parts[1] === 18 || parts[1] === 19)) return false;
      }
    }
  } catch {
    // DNS resolution failure — reject to be safe
    return false;
  }
  return true;
}

// Marketplace — local seed registry. Remote registry in Phase 2.

// ── Types ──

export interface MarketplaceEntry {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  downloadUrl: string;
  repository?: string;
  tags: string[];
  downloads: number;
  rating: number; // 0-5
  verified: boolean;
  lastUpdated: string;
}

// ── Seed Data ──

const SEED_REGISTRY: MarketplaceEntry[] = [
  {
    name: "request-logger",
    version: "1.0.0",
    description: "Logs all requests and responses with timing",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["logging", "debugging"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "rate-limiter",
    version: "1.0.0",
    description: "Per-model rate limiting with sliding window",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["rate-limit", "security"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "cost-tracker",
    version: "1.0.0",
    description: "Track token costs per request and per model",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["analytics", "cost"],
    downloads: 0,
    rating: 4,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "theme-manager",
    version: "1.0.0",
    description: "Dynamic UI theme management via CSS variable injection",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["theme", "ui", "css", "customization"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-06-09",
  },
];

// ── API ──

/**
 * List all available plugins in the marketplace.
 */
<<<<<<< Updated upstream
export function listMarketplacePlugins(): MarketplaceEntry[] {
=======
export async function listMarketplacePlugins(): Promise<MarketplaceEntry[]> {
  try {
    const settings = await getSettings();
    const url = typeof settings.pluginMarketplaceUrl === "string" ? settings.pluginMarketplaceUrl : null;
    if (url) {
      if (!(await isSafeMarketplaceUrl(url))) {
        console.warn("Custom marketplace URL rejected (SSRF guard):", url);
        return [...SEED_REGISTRY];
      }
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) {
        console.warn("Custom marketplace returned non-OK status:", res.status);
        return [...SEED_REGISTRY];
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.filter((entry: unknown) =>
          entry && typeof entry === "object" && typeof (entry as Record<string, unknown>).name === "string"
        ) as MarketplaceEntry[];
      }
      if (data && typeof data === "object" && Array.isArray((data as Record<string, unknown>).plugins)) {
        return ((data as Record<string, unknown>).plugins as unknown[]).filter((entry: unknown) =>
          entry && typeof entry === "object" && typeof (entry as Record<string, unknown>).name === "string"
        ) as MarketplaceEntry[];
      }
      console.warn("Custom marketplace returned unrecognized format");
    }
  } catch (err) {
    console.error("Failed to fetch from custom plugin marketplace:", err);
  }
>>>>>>> Stashed changes
  return [...SEED_REGISTRY];
}

/**
 * Search marketplace plugins by query.
 */
export function searchMarketplace(query: string): MarketplaceEntry[] {
  const q = query.toLowerCase();
  return SEED_REGISTRY.filter(
    (p) =>
      p.name.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

/**
 * Get a specific marketplace entry.
 */
export function getMarketplaceEntry(name: string): MarketplaceEntry | undefined {
  return SEED_REGISTRY.find((p) => p.name === name);
}

/**
 * Check if marketplace is available.
 */
export function isMarketplaceAvailable(): boolean {
<<<<<<< Updated upstream
  return true; // Local seed always available
=======
  return true; // Always available (falls back to seed)
>>>>>>> Stashed changes
}
