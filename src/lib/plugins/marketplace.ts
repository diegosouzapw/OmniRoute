import { getSettings } from "../db/settings";
import dns from "node:dns/promises";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { pluginManager } from "./manager";
import { createHash } from "node:crypto";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
/**
 * Plugin Marketplace — browse, search, install plugins from a registry.
 *
 * Phase 1: Local registry with seed data.
 * Phase 2: Remote registry with ratings/downloads.
 *
 * @module plugins/marketplace
 */

/** Resolve a hostname to every address it maps to (A + AAAA). Injectable for tests. */
export type MarketplaceLookupFn = (hostname: string) => Promise<Array<{ address: string }>>;

const defaultLookup: MarketplaceLookupFn = (hostname) =>
  dns.lookup(hostname, { all: true, verbatim: true });

/**
 * SSRF guard for a custom marketplace registry URL. Must be http(s) and must not
 * target a private/loopback/link-local/ULA address. Unlike a literal-only or
 * IPv4-only check, this resolves BOTH IPv4 (A) and IPv6 (AAAA) records and rejects
 * if ANY resolved address is private — closing the public-hostname → private-IP
 * bypass (IPv6 included: `::1`, `fc00::/7`, `fe80::/10`, IPv4-mapped) via the
 * canonical `isPrivateHost`. DNS failure rejects (fail-closed). The fetch itself
 * additionally runs through `safeOutboundFetch({ guard: "public-only" })`, which
 * re-applies the guard and blocks redirects (no public → private 30x pivot).
 */
export async function isSafeMarketplaceUrl(
  urlStr: string,
  lookupFn: MarketplaceLookupFn = defaultLookup
): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }
  // Literal IP hostnames (IPv4 + IPv6, incl. IPv4-mapped) are classified directly.
  if (isPrivateHost(parsed.hostname)) {
    return false;
  }
  // Resolve A + AAAA and reject if the hostname maps to any private address.
  try {
    const records = await lookupFn(parsed.hostname);
    if (!records.length) return false;
    for (const { address } of records) {
      if (isPrivateHost(address)) return false;
    }
  } catch {
    // DNS resolution failure — reject to be safe.
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
  checksum?: string; // SHA-256 hex (optional — verified when present)
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
export async function listMarketplacePlugins(): Promise<MarketplaceEntry[]> {
  try {
    const settings = await getSettings();
    const url = typeof settings.pluginMarketplaceUrl === "string" ? settings.pluginMarketplaceUrl : null;
    if (url) {
      if (!(await isSafeMarketplaceUrl(url))) {
        console.warn("Custom marketplace URL rejected (SSRF guard):", url);
        return [...SEED_REGISTRY];
      }
      const res = await safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 });
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
  return [...SEED_REGISTRY];
}

/**
 * Search marketplace plugins by query.
 */
export async function searchMarketplace(query: string): Promise<MarketplaceEntry[]> {
  const plugins = await listMarketplacePlugins();
  const q = query.toLowerCase();
  return plugins.filter(
    (p) =>
      p.name.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

/**
 * Get a specific marketplace entry.
 */
export async function getMarketplaceEntry(name: string): Promise<MarketplaceEntry | undefined> {
  const plugins = await listMarketplacePlugins();
  return plugins.find((p) => p.name === name);
}

/**
 * Check if marketplace is available.
 */
export function isMarketplaceAvailable(): boolean {
  return true; // Always available (falls back to seed)
}

/**
 * Install a plugin from the marketplace by name.
 * Downloads the plugin archive, verifies checksum if present, and installs via PluginManager.
 */
export async function installMarketplacePlugin(name: string): Promise<{ name: string; version: string }> {
  const plugins = await listMarketplacePlugins();
  const entry = plugins.find((p) => p.name === name);
  if (!entry) {
    throw new Error(`Plugin '${name}' not found in marketplace`);
  }

  // Create temp dir for download
  const tmpDir = await mkdtemp(join(tmpdir(), "plugin-mp-"));
  const tmpFile = join(tmpDir, "plugin.tar.gz");

  try {
    // Download the plugin archive
    const response = await safeOutboundFetch(entry.downloadUrl, { guard: "public-only" });
    if (!response.ok) {
      throw new Error(`Failed to download plugin '${name}': ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());

    // Verify SHA-256 checksum if provided
    if (entry.checksum) {
      const actual = createHash("sha256").update(buffer).digest("hex");
      if (actual !== entry.checksum) {
        throw new Error(
          `Checksum mismatch for plugin '${name}': expected ${entry.checksum}, got ${actual}`
        );
      }
    }

    // Write to temp file
    await writeFile(tmpFile, buffer);

    // Delegate to pluginManager.install
    const result = await pluginManager.install(tmpDir);
    return { name: result.name, version: result.version };
  } finally {
    // Cleanup temp dir
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}
