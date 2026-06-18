/**
 * Provider Discovery A2A Skill
 *
 * Auto-discovers LLM provider endpoints from environment, config, filesystem,
 * and (optionally) the MCP server, and returns them in a normalized catalog.
 *
 * The skill is read-only: it does not enqueue or forward any LLM call and never
 * makes network requests. It only reads local env vars, the user-level
 * `~/.omniroute/config.json` (or `$DATA_DIR/config.json`), JSON files in
 * `${baseDir}/providers/*.json` and `${baseDir}/credentials/*.json`, and
 * delegates to the MCP client when present.
 *
 * Sources (selected via `task.metadata.sources`, default: all four):
 *   - env         — scan `process.env` for keys matching `*API_KEY`, `*TOKEN`,
 *                   `*BASE_URL`, `*ENDPOINT`. Grouped by the key prefix
 *                   (e.g. OPENAI_API_KEY + OPENAI_BASE_URL → vendor `openai`).
 *   - config      — read `<DATA_DIR>/config.json` or `~/.omniroute/config.json`
 *                   and parse its `providers` array.
 *   - filesystem  — scan `${baseDir}/providers/*.json` and
 *                   `${baseDir}/credentials/*.json`. Skips symlinks and any
 *                   file larger than 1 MB to avoid accidentally reading
 *                   credential dumps.
 *   - mcp         — call the MCP client's `list_providers` tool when reachable.
 *                   If the client is absent or throws, returns an empty array;
 *                   this source never fails the whole discovery.
 *
 * Inputs (via task.metadata):
 *   - sources    (optional, Array<'env'|'config'|'filesystem'|'mcp'>) —
 *                restrict which sources to scan. Default: all four.
 *   - baseDir    (optional, string) — root for filesystem scan.
 *                Default: `$DATA_DIR` if set, else `~/.omniroute`.
 *   - vendor     (optional, string) — case-insensitive substring filter.
 *   - envSnapshot (optional, Record<string,string>) — override `process.env`
 *                for the `env` source. Useful for testing.
 *
 * Output (A2ASkillResult.artifacts[0].content is JSON):
 *   {
 *     providers: [{
 *       id, vendor, source, discoveredAt,
 *       hasApiKey, hasBaseUrl,
 *       metadata: Record<string, unknown>
 *     }],
 *     stats: { total, bySource, byVendor }
 *   }
 *
 * Note: same vendor found via different sources is reported as multiple
 * providers (different `source`). This is intentional — each source is a
 * different origin and may carry different metadata.
 */

import { promises as fs, Dirent, Stats } from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { A2ATask } from "../taskManager";
import { A2ASkillResult } from "../taskExecution";

export type DiscoverySource = "env" | "config" | "filesystem" | "mcp";

export interface DiscoveryInputs {
  sources?: DiscoverySource[];
  baseDir?: string;
  /** optional: case-insensitive substring filter on vendor */
  vendor?: string;
  /** optional: env override for tests; ignored if absent */
  envSnapshot?: Record<string, string>;
}

export interface DiscoveredProvider {
  id: string;
  vendor: string;
  source: DiscoverySource;
  discoveredAt: string;
  hasApiKey: boolean;
  hasBaseUrl: boolean;
  metadata: Record<string, unknown>;
}

export interface ProviderDiscoveryOutput {
  providers: DiscoveredProvider[];
  stats: {
    total: number;
    bySource: Record<string, number>;
    byVendor: Record<string, number>;
  };
}

interface SourceScanResult {
  providers: DiscoveredProvider[];
  filesScanned: number;
  errorsEncountered: number;
  sourcesScanned: DiscoverySource[];
}

const ENV_SUFFIXES = ["API_KEY", "TOKEN", "BASE_URL", "ENDPOINT"] as const;
const MAX_FILE_BYTES = 1024 * 1024; // 1 MB
const DEFAULT_SOURCES: DiscoverySource[] = ["env", "config", "filesystem", "mcp"];

function nowIso(): string {
  return new Date().toISOString();
}

function defaultBaseDir(): string {
  if (process.env.DATA_DIR && process.env.DATA_DIR.trim() !== "") {
    return process.env.DATA_DIR.trim();
  }
  return path.join(os.homedir(), ".omniroute");
}

function isProviderShape(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return (
    typeof (value as Record<string, unknown>).id === "string" ||
    typeof (value as Record<string, unknown>).vendor === "string" ||
    typeof (value as Record<string, unknown>).provider === "string"
  );
}

function coerceString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function normalizeVendor(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pickProviderShapeFields(
  raw: Record<string, unknown>,
): { id: string; vendor: string; hasApiKey: boolean; hasBaseUrl: boolean } {
  const idRaw =
    coerceString(raw.id) ||
    coerceString(raw.provider) ||
    coerceString(raw.name) ||
    "unknown";
  const vendorRaw =
    coerceString(raw.vendor) ||
    coerceString(raw.provider) ||
    coerceString(raw.id) ||
    idRaw;
  const apiKey =
    coerceString(raw.apiKey) ||
    coerceString(raw.api_key) ||
    coerceString(raw.token);
  const baseUrl =
    coerceString(raw.baseUrl) ||
    coerceString(raw.base_url) ||
    coerceString(raw.endpoint) ||
    coerceString(raw.url);
  return {
    id: idRaw,
    vendor: normalizeVendor(vendorRaw),
    hasApiKey: Boolean(apiKey),
    hasBaseUrl: Boolean(baseUrl),
  };
}

/**
 * Env source — scan process.env for keys matching `*API_KEY`, `*TOKEN`,
 * `*BASE_URL`, `*ENDPOINT`. Group by the key prefix (everything before the
 * last underscore-separated suffix) so that OPENAI_API_KEY and
 * OPENAI_BASE_URL collapse into one `openai` provider.
 */
function discoverFromEnv(
  inputs: DiscoveryInputs,
  discoveredAt: string,
): DiscoveredProvider[] {
  const env =
    inputs.envSnapshot ?? (process.env as unknown as Record<string, string | undefined>);
  const byPrefix = new Map<
    string,
    { hasApiKey: boolean; hasBaseUrl: boolean; rawKeys: string[] }
  >();

  for (const key of Object.keys(env)) {
    const upper = key.toUpperCase();
    const matchedSuffix = ENV_SUFFIXES.find((s) => upper.endsWith("_" + s));
    if (!matchedSuffix) continue;
    const value = env[key];
    if (typeof value !== "string" || value.trim() === "") continue;

    const prefixRaw = key.slice(0, key.length - matchedSuffix.length - 1);
    if (!prefixRaw) continue;
    const prefix = normalizeVendor(prefixRaw);
    if (!prefix) continue;

    const entry = byPrefix.get(prefix) ?? {
      hasApiKey: false,
      hasBaseUrl: false,
      rawKeys: [],
    };
    if (matchedSuffix === "API_KEY" || matchedSuffix === "TOKEN") entry.hasApiKey = true;
    if (matchedSuffix === "BASE_URL" || matchedSuffix === "ENDPOINT") entry.hasBaseUrl = true;
    entry.rawKeys.push(key);
    byPrefix.set(prefix, entry);
  }

  const providers: DiscoveredProvider[] = [];
  for (const [vendor, info] of byPrefix.entries()) {
    providers.push({
      id: vendor,
      vendor,
      source: "env",
      discoveredAt,
      hasApiKey: info.hasApiKey,
      hasBaseUrl: info.hasBaseUrl,
      metadata: { envKeys: info.rawKeys.sort() },
    });
  }
  return providers;
}

/**
 * Config source — read `<DATA_DIR>/config.json` or `~/.omniroute/config.json`
 * and parse its `providers` array. Returns [] if the file is absent.
 */
async function discoverFromConfig(
  baseDir: string,
  discoveredAt: string,
): Promise<SourceScanResult> {
  const result: SourceScanResult = {
    providers: [],
    filesScanned: 0,
    errorsEncountered: 0,
    sourcesScanned: ["config"],
  };
  const configPath = path.join(baseDir, "config.json");
  let raw: string;
  try {
    const stat = await fs.stat(configPath);
    if (stat.isSymbolicLink() || !stat.isFile()) return result;
    if (stat.size > MAX_FILE_BYTES) {
      result.errorsEncountered += 1;
      return result;
    }
    result.filesScanned += 1;
    raw = await fs.readFile(configPath, "utf8");
  } catch {
    // File missing or unreadable — treat as empty catalog (not an error).
    return result;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    result.errorsEncountered += 1;
    return result;
  }

  const list: unknown[] =
    parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? Array.isArray((parsed as Record<string, unknown>).providers)
        ? ((parsed as Record<string, unknown>).providers as unknown[])
        : []
      : Array.isArray(parsed)
        ? (parsed as unknown[])
        : [];

  for (const entry of list) {
    if (!isProviderShape(entry)) continue;
    const fields = pickProviderShapeFields(entry);
    result.providers.push({
      ...fields,
      source: "config",
      discoveredAt,
      metadata: { ...entry, sourceFile: configPath },
    });
  }
  return result;
}

/**
 * Filesystem source — scan `${baseDir}/providers/*.json` and
 * `${baseDir}/credentials/*.json`. Each file is one provider if it has a
 * recognizable shape.
 */
async function discoverFromFilesystem(
  baseDir: string,
  discoveredAt: string,
): Promise<SourceScanResult> {
  const result: SourceScanResult = {
    providers: [],
    filesScanned: 0,
    errorsEncountered: 0,
    sourcesScanned: ["filesystem"],
  };
  const subdirs = ["providers", "credentials"];

  for (const sub of subdirs) {
    const dir = path.join(baseDir, sub);
    let entries: Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      continue; // missing dir is not an error
    }

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (entry.name.startsWith(".")) continue;
      if (!entry.name.endsWith(".json")) continue;
      const filePath = path.join(dir, entry.name);

      let stat: Stats;
      try {
        stat = await fs.stat(filePath);
      } catch {
        result.errorsEncountered += 1;
        continue;
      }
      // Don't follow symlinks (already excluded by isFile() but be explicit).
      if (stat.isSymbolicLink()) continue;
      if (stat.size > MAX_FILE_BYTES) {
        result.errorsEncountered += 1;
        continue;
      }
      result.filesScanned += 1;

      let raw: string;
      try {
        raw = await fs.readFile(filePath, "utf8");
      } catch {
        result.errorsEncountered += 1;
        continue;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        result.errorsEncountered += 1;
        continue;
      }

      // A file may contain either a single provider object or `{ providers: [...] }`.
      const candidates: unknown[] = isProviderShape(parsed)
        ? [parsed]
        : parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed) &&
            Array.isArray((parsed as Record<string, unknown>).providers)
          ? ((parsed as Record<string, unknown>).providers as unknown[])
          : [];

      for (const candidate of candidates) {
        if (!isProviderShape(candidate)) continue;
        const fields = pickProviderShapeFields(candidate);
        result.providers.push({
          ...fields,
          source: "filesystem",
          discoveredAt,
          metadata: { ...candidate, sourceFile: filePath },
        });
      }
    }
  }
  return result;
}

/**
 * MCP source — call the MCP client's `listProviders` tool when reachable.
 * The MCP client lives in `src/lib/mcp/` (deferred dynamic import so we don't
 * pull it in if the caller doesn't ask for the `mcp` source).
 * If the module isn't there, or the call throws, return an empty array and
 * count it as one error — never fail the whole discovery.
 */
async function discoverFromMcp(discoveredAt: string): Promise<SourceScanResult> {
  const result: SourceScanResult = {
    providers: [],
    filesScanned: 0,
    errorsEncountered: 0,
    sourcesScanned: ["mcp"],
  };

  type McpClient = { listProviders?: () => Promise<unknown[]> };
  let mod: McpClient | undefined;
  // The MCP client module is optional infrastructure. We import lazily and
  // tolerate any failure (module missing, runtime error, network error).
  // We route the module specifier through a `string` local so TypeScript
  // does not statically resolve the path (the file may not exist in this
  // checkout; the .catch() below ensures runtime tolerance regardless).
  const mcpModuleSpec: string = "../../mcp/client.js";
  try {
    mod = (await import(mcpModuleSpec).catch(() => undefined)) as McpClient | undefined;
  } catch {
    result.errorsEncountered += 1;
    return result;
  }

  if (!mod || typeof mod.listProviders !== "function") {
    // No MCP client available — empty result, no error counted.
    return result;
  }

  let list: unknown;
  try {
    list = await mod.listProviders();
  } catch {
    result.errorsEncountered += 1;
    return result;
  }

  if (!Array.isArray(list)) return result;
  for (const entry of list) {
    if (!isProviderShape(entry)) continue;
    const fields = pickProviderShapeFields(entry);
    result.providers.push({
      ...fields,
      source: "mcp",
      discoveredAt,
      metadata: { ...entry },
    });
  }
  return result;
}

function matchesVendorFilter(
  provider: DiscoveredProvider,
  vendorFilter: string | undefined,
): boolean {
  if (!vendorFilter) return true;
  const needle = vendorFilter.trim().toLowerCase();
  if (!needle) return true;
  return (
    provider.vendor.toLowerCase().includes(needle) ||
    provider.id.toLowerCase().includes(needle)
  );
}

function buildStats(providers: DiscoveredProvider[]): ProviderDiscoveryOutput["stats"] {
  const bySource: Record<string, number> = {};
  const byVendor: Record<string, number> = {};
  for (const p of providers) {
    bySource[p.source] = (bySource[p.source] ?? 0) + 1;
    byVendor[p.vendor] = (byVendor[p.vendor] ?? 0) + 1;
  }
  return { total: providers.length, bySource, byVendor };
}

function extractInputs(metadata: Record<string, unknown> | undefined): DiscoveryInputs {
  if (!metadata) return {};
  const sources = Array.isArray(metadata.sources)
    ? (metadata.sources as unknown[]).filter(
        (s): s is DiscoverySource =>
          s === "env" || s === "config" || s === "filesystem" || s === "mcp",
      )
    : undefined;
  const baseDir =
    typeof metadata.baseDir === "string" && metadata.baseDir.trim() !== ""
      ? metadata.baseDir.trim()
      : undefined;
  const vendor =
    typeof metadata.vendor === "string" && metadata.vendor.trim() !== ""
      ? metadata.vendor.trim()
      : undefined;
  const envSnapshot =
    metadata.envSnapshot && typeof metadata.envSnapshot === "object"
      ? Object.fromEntries(
          Object.entries(metadata.envSnapshot as Record<string, unknown>).filter(
            (e): e is [string, string] => typeof e[1] === "string",
          ),
        )
      : undefined;
  return { sources, baseDir, vendor, envSnapshot };
}

export async function executeProviderDiscovery(task: A2ATask): Promise<A2ASkillResult> {
  const inputs = extractInputs(task.metadata);
  const sources =
    inputs.sources && inputs.sources.length > 0 ? inputs.sources : DEFAULT_SOURCES;
  const baseDir = inputs.baseDir ?? defaultBaseDir();
  const discoveredAt = nowIso();

  const collected: DiscoveredProvider[] = [];
  let filesScanned = 0;
  let errorsEncountered = 0;
  const sourcesScanned: DiscoverySource[] = [];

  for (const src of sources) {
    try {
      if (src === "env") {
        collected.push(...discoverFromEnv(inputs, discoveredAt));
        sourcesScanned.push("env");
      } else if (src === "config") {
        const r = await discoverFromConfig(baseDir, discoveredAt);
        collected.push(...r.providers);
        filesScanned += r.filesScanned;
        errorsEncountered += r.errorsEncountered;
        sourcesScanned.push("config");
      } else if (src === "filesystem") {
        const r = await discoverFromFilesystem(baseDir, discoveredAt);
        collected.push(...r.providers);
        filesScanned += r.filesScanned;
        errorsEncountered += r.errorsEncountered;
        sourcesScanned.push("filesystem");
      } else if (src === "mcp") {
        const r = await discoverFromMcp(discoveredAt);
        collected.push(...r.providers);
        filesScanned += r.filesScanned;
        errorsEncountered += r.errorsEncountered;
        sourcesScanned.push("mcp");
      }
    } catch {
      // A single source failure must never abort the whole discovery.
      errorsEncountered += 1;
    }
  }

  const filtered = collected.filter((p) => matchesVendorFilter(p, inputs.vendor));
  const stats = buildStats(filtered);
  const output: ProviderDiscoveryOutput = { providers: filtered, stats };

  return {
    artifacts: [
      {
        type: "text",
        content: JSON.stringify(output),
      },
    ],
    metadata: {
      generatedAt: discoveredAt,
      sourcesScanned: sourcesScanned as string[],
      filesScanned,
      errorsEncountered,
      totalDiscovered: filtered.length,
    },
  };
}
