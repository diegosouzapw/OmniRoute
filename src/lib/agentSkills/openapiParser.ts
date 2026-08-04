/**
 * openapiParser.ts — parses docs/openapi.yaml to extract endpoint info
 * grouped by SkillArea. Used by the catalog and the generator.
 *
 * Reads the OpenAPI YAML synchronously at runtime (same pattern as
 * src/app/api/openapi/spec/route.ts). Does NOT fetch via HTTP to remain
 * usable as a standalone script/CI tool (D15).
 */

import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";
import type { SkillArea } from "./types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface OpenapiPath {
  /** HTTP method (uppercase): "GET", "POST", etc. */
  method: string;
  /** OpenAPI path template, e.g. "/api/providers/{id}" */
  path: string;
  /** Summary from the operation object */
  summary: string;
  /** Description from the operation object (may be absent) */
  description?: string;
  /** OpenAPI tags */
  tags: string[];
}

export interface ParsedOpenapi {
  /** All endpoints keyed by "<METHOD> <path>" */
  paths: Map<string, OpenapiPath>;
  /** Endpoints grouped by SkillArea (only API-mapped areas) */
  areas: Map<SkillArea, OpenapiPath[]>;
}

// ── Mapping: path prefix → SkillArea ────────────────────────────────────────

/**
 * Maps an API path prefix to the corresponding SkillArea.
 * Order matters: more specific prefixes must come before generic ones.
 */
const PATH_AREA_MAP: Array<[string, SkillArea]> = [
  // Auth
  ["/api/auth", "auth"],
  ["/api/session", "auth"],
  // Providers
  ["/api/providers", "providers"],
  ["/api/provider-nodes", "providers"],
  ["/api/provider-models", "providers"],
  // Models
  ["/api/v1/models", "models"],
  ["/api/models", "models"],
  // Combos / routing
  ["/api/combos", "combos-routing"],
  ["/api/fallback", "combos-routing"],
  // API Keys
  ["/api/keys", "api-keys"],
  // Usage logs
  ["/api/usage", "usage-logs"],
  // Budget / rate limit
  ["/api/rate-limit", "budget"],
  ["/api/budget", "budget"],
  // Settings
  ["/api/settings", "settings"],
  ["/api/tags", "settings"],
  // Proxies
  ["/api/settings/proxy", "proxies"],
  // Cache
  ["/api/cache", "cache"],
  // Compression / RTK
  ["/api/settings/compression", "compression"],
  ["/api/compression", "compression"],
  ["/api/context/rtk", "context-rtk"],
  // Resilience
  ["/api/monitoring", "resilience"],
  ["/api/provider-metrics", "resilience"],
  ["/api/circuit-breakers", "resilience"],
  // CLI tools
  ["/api/cli-tools", "cli-tools"],
  // Tunnels
  ["/api/tunnel", "tunnels"],
  // Sync / cloud
  ["/api/cloud", "sync-cloud"],
  ["/api/sync", "sync-cloud"],
  // DB backups
  ["/api/system", "db-backups"],
  ["/api/backup", "db-backups"],
  // Webhooks
  ["/api/webhooks", "webhooks"],
  // MCP
  ["/api/mcp", "mcp"],
  // A2A
  ["/a2a", "agents-a2a"],
  // Version manager
  ["/api/services", "version-manager"],
  ["/api/version", "version-manager"],
  // Inference (catch-all for /api/v1/* proxy endpoints)
  ["/api/v1", "inference"],
];

// ── HTTP methods recognised as operations ────────────────────────────────────

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head", "options"] as const;

// ── Parser ───────────────────────────────────────────────────────────────────

function resolveArea(urlPath: string): SkillArea | null {
  for (const [prefix, area] of PATH_AREA_MAP) {
    if (
      urlPath === prefix ||
      urlPath.startsWith(prefix + "/") ||
      urlPath.startsWith(prefix + "{")
    ) {
      return area;
    }
  }
  return null;
}

function extractOperations(pathsObj: Record<string, any>): OpenapiPath[] {
  const ops: OpenapiPath[] = [];

  for (const [urlPath, pathItem] of Object.entries(pathsObj)) {
    if (!pathItem || typeof pathItem !== "object") continue;

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation || typeof operation !== "object") continue;

      ops.push({
        method: method.toUpperCase(),
        path: urlPath,
        summary: String(operation.summary ?? ""),
        description: operation.description ? String(operation.description) : undefined,
        tags: Array.isArray(operation.tags) ? operation.tags.map(String) : [],
      });
    }
  }

  return ops;
}

/**
 * Parses `docs/openapi.yaml` and returns:
 * - `paths`: all operations keyed by `"METHOD /path"`
 * - `areas`: operations grouped by SkillArea (api skills only)
 *
 * Reads the file synchronously so it can be called from both server context
 * and standalone scripts without async machinery.
 */
export function parseOpenapi(): ParsedOpenapi {
  const yamlPath = path.resolve(process.cwd(), "docs", "openapi.yaml");
  let rawContent: string;

  try {
    rawContent = fs.readFileSync(yamlPath, "utf-8");
  } catch (err) {
    throw new Error(
      `openapiParser: could not read ${yamlPath}. ` +
        `Run from project root. Underlying error: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const doc = yaml.load(rawContent) as Record<string, any>;

  if (!doc || typeof doc !== "object") {
    throw new Error("openapiParser: parsed YAML is not an object");
  }

  const pathsObj = doc.paths ?? {};
  const operations = extractOperations(pathsObj);

  const paths = new Map<string, OpenapiPath>();
  const areas = new Map<SkillArea, OpenapiPath[]>();

  for (const op of operations) {
    const key = `${op.method} ${op.path}`;
    paths.set(key, op);

    const area = resolveArea(op.path);
    if (area) {
      if (!areas.has(area)) {
        areas.set(area, []);
      }
      areas.get(area)!.push(op);
    }
  }

  return { paths, areas };
}

/**
 * Returns endpoint strings for a given SkillArea, suitable for `AgentSkill.endpoints`.
 * Format: `"GET /api/providers/{id}"`.
 */
export function getEndpointsForArea(area: SkillArea): string[] {
  const { areas } = parseOpenapi();
  const ops = areas.get(area) ?? [];
  return ops.map((op) => `${op.method} ${op.path}`);
}
