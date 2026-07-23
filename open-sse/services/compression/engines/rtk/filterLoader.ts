import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { detectCommandType } from "./commandDetector.ts";
import { validateRtkFilter, type RtkFilterDefinition } from "./filterSchema.ts";
import { parseRtkTomlV1, RtkTomlCompatibilityError } from "./tomlCompatibility.ts";

let cache: RtkFilterDefinition[] | null = null;
let cacheKey: string | null = null;
let diagnostics: RtkFilterLoadDiagnostic[] = [];

// RegExp cache for matchPatterns — same pattern strings are tested against
// many different lines across requests; avoid compiling them every time.
const regexCache = new Map<string, RegExp>();

function cachedMatchPattern(pattern: string, value: string): boolean {
  const key = `${pattern}::im`;
  let re = regexCache.get(key);
  if (!re) {
    try {
      re = new RegExp(pattern, "im");
      regexCache.set(key, re);
    } catch {
      return false;
    }
  }
  return re.test(value);
}

export interface RtkFilterLoadDiagnostic {
  source: "project" | "global" | "builtin";
  format?: "omniroute-json" | "rtk-toml-v1";
  path?: string;
  level: "warning" | "error";
  message: string;
}

interface FilterSource {
  source: "project" | "global" | "builtin";
  path: string;
  trusted: boolean;
  format: "omniroute-json" | "rtk-toml-v1";
}

interface RtkFilterLoadOptions {
  refresh?: boolean;
  customFiltersEnabled?: boolean;
  trustProjectFilters?: boolean;
}

function getModuleDir(): string {
  const anchors = [process.cwd()];
  const argv1 = process.argv[1];
  if (typeof argv1 === "string" && argv1) anchors.push(path.dirname(argv1));
  const rel = path.join("open-sse", "services", "compression");
  for (const anchor of anchors) {
    let dir = path.resolve(anchor);
    for (let i = 0; i <= 8; i++) {
      if (fs.existsSync(path.join(dir, rel))) return dir;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return path.join(os.homedir(), ".omniroute");
}

function getFiltersDir(): string {
  const root = getModuleDir();
  const candidates = [
    path.join(root, "open-sse", "services", "compression", "engines", "rtk", "filters"),
    path.join(root, "app", "open-sse", "services", "compression", "engines", "rtk", "filters"),
  ];
  return (
    candidates.find((candidate, index) => {
      return candidates.indexOf(candidate) === index && fs.existsSync(candidate);
    }) ?? candidates[0]
  );
}

function getDataDir(): string {
  return process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
}

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function projectFiltersTrusted(
  filtersPath: string,
  trustProjectFilters = false
): boolean | "changed" {
  if (trustProjectFilters) return true;
  if (process.env.OMNIROUTE_RTK_TRUST_PROJECT_FILTERS === "1") return true;
  const trustPath = path.join(path.dirname(filtersPath), "trust.json");
  if (!fs.existsSync(trustPath)) return false;
  try {
    const filtersHash = sha256(fs.readFileSync(filtersPath, "utf8"));
    const trust = JSON.parse(fs.readFileSync(trustPath, "utf8")) as Record<string, unknown>;
    const isToml = filtersPath.endsWith(".toml");
    const trustedHash = isToml
      ? typeof trust.filtersTomlSha256 === "string"
        ? trust.filtersTomlSha256
        : null
      : typeof trust.filtersSha256 === "string"
        ? trust.filtersSha256
        : typeof trust.trustedFiltersSha256 === "string"
          ? trust.trustedFiltersSha256
          : null;
    if (!trustedHash) return false;
    return trustedHash === filtersHash ? true : "changed";
  } catch {
    return false;
  }
}

function collectFilterSources(options: RtkFilterLoadOptions = {}): FilterSource[] {
  const sources: FilterSource[] = [];
  if (options.customFiltersEnabled !== false) {
    collectProjectFilterSources(sources, options);
    collectGlobalFilterSources(sources);
  }
  collectBuiltinFilterSources(sources);
  return sources;
}

function collectProjectFilterSources(sources: FilterSource[], options: RtkFilterLoadOptions): void {
  const projectCandidates = [
    { path: path.join(process.cwd(), ".rtk", "filters.toml"), format: "rtk-toml-v1" as const },
    { path: path.join(process.cwd(), ".rtk", "filters.json"), format: "omniroute-json" as const },
  ];
  for (const candidate of projectCandidates) {
    if (!fs.existsSync(candidate.path)) continue;
    const trusted = projectFiltersTrusted(candidate.path, options.trustProjectFilters === true);
    if (trusted === true) {
      sources.push({ source: "project", ...candidate, trusted: true });
      continue;
    }
    diagnostics.push({
      source: "project",
      format: candidate.format,
      path: candidate.path,
      level: "warning",
      message:
        trusted === "changed"
          ? "Project RTK filters changed after trust and were skipped"
          : "Project RTK filters are untrusted and were skipped",
    });
  }
}

function collectGlobalFilterSources(sources: FilterSource[]): void {
  const globalCandidates = [
    { path: path.join(getDataDir(), "rtk", "filters.toml"), format: "rtk-toml-v1" as const },
    { path: path.join(getDataDir(), "rtk", "filters.json"), format: "omniroute-json" as const },
  ];
  for (const candidate of globalCandidates) {
    if (fs.existsSync(candidate.path)) {
      sources.push({ source: "global", ...candidate, trusted: true });
    }
  }
}

function collectBuiltinFilterSources(sources: FilterSource[]): void {
  const builtinDir = getFiltersDir();
  if (fs.existsSync(builtinDir)) {
    let builtinFiles: string[] = [];
    try {
      builtinFiles = fs
        .readdirSync(builtinDir)
        .filter((entry) => entry.endsWith(".json"))
        .sort();
    } catch {
      // A read failure on the builtin dir (lost permission, TOCTOU after existsSync, NFS
      // timeout, read-only container) must not fail the request — degrade to the filters
      // already collected. listRtkCommandSamples guards readdirSync the same way.
      builtinFiles = [];
    }
    for (const file of builtinFiles) {
      sources.push({
        source: "builtin",
        path: path.join(builtinDir, file),
        trusted: true,
        format: "omniroute-json",
      });
    }
  }
}

function parseFilterFile(source: FilterSource): RtkFilterDefinition[] {
  try {
    const content = fs.readFileSync(source.path, "utf8");
    const definitions =
      source.format === "rtk-toml-v1"
        ? (() => {
            const result = parseRtkTomlV1(content);
            if (!result.passed) {
              throw new Error("one or more inline tests failed");
            }
            for (const warning of result.warnings) {
              diagnostics.push({
                source: source.source,
                format: source.format,
                path: source.path,
                level: "warning",
                message: warning,
              });
            }
            return result.filters;
          })()
        : (() => {
            const parsed = JSON.parse(content);
            const entries = Array.isArray(parsed) ? parsed : [parsed];
            return entries.map(validateRtkFilter);
          })();
    return definitions.map((definition) => ({
      ...definition,
      source: source.source,
      sourceFormat: definition.sourceFormat ?? source.format,
    }));
  } catch (error) {
    const message =
      error instanceof RtkTomlCompatibilityError
        ? error.publicMessage
        : error instanceof Error
          ? error.message
          : String(error);
    if (source.source === "builtin") {
      throw new Error(`Invalid RTK filter ${path.basename(source.path)}: ${message}`);
    }
    diagnostics.push({
      source: source.source,
      format: source.format,
      path: source.path,
      level: "warning",
      message: `Invalid custom RTK filter skipped: ${message}`,
    });
    return [];
  }
}

export function loadRtkFilters(options: RtkFilterLoadOptions = {}): RtkFilterDefinition[] {
  const currentCacheKey = [
    process.cwd(),
    getDataDir(),
    options.customFiltersEnabled === false ? "builtin-only" : "custom",
    options.trustProjectFilters === true ? "trusted-project" : "trust-file",
    process.env.OMNIROUTE_RTK_TRUST_PROJECT_FILTERS === "1" ? "env-trust" : "env-normal",
  ].join("|");
  if (cache && cacheKey === currentCacheKey && !options.refresh) return cache;
  diagnostics = [];
  const filters: RtkFilterDefinition[] = [];
  for (const source of collectFilterSources(options)) {
    filters.push(...parseFilterFile(source));
  }

  const sourceRank = { project: 3, global: 2, builtin: 1 } as const;
  const formatRank = { "rtk-toml-v1": 2, "omniroute-json": 1 } as const;
  const sorted = filters.sort(
    (a, b) =>
      sourceRank[b.source ?? "builtin"] - sourceRank[a.source ?? "builtin"] ||
      formatRank[b.sourceFormat ?? "omniroute-json"] -
        formatRank[a.sourceFormat ?? "omniroute-json"] ||
      b.priority - a.priority ||
      a.id.localeCompare(b.id)
  );
  cache = sorted;
  cacheKey = currentCacheKey;
  return sorted;
}

export function getRtkFilterLoadDiagnostics(): RtkFilterLoadDiagnostic[] {
  loadRtkFilters();
  return diagnostics.map((entry) => ({ ...entry }));
}

export function getRtkFilterCatalog(): Array<
  Pick<
    RtkFilterDefinition,
    | "id"
    | "name"
    | "description"
    | "commandTypes"
    | "category"
    | "priority"
    | "source"
    | "sourceFormat"
  >
> {
  return loadRtkFilters().map((filter) => ({
    id: filter.id,
    name: filter.name,
    description: filter.description,
    commandTypes: filter.commandTypes,
    category: filter.category,
    priority: filter.priority,
    source: filter.source,
    sourceFormat: filter.sourceFormat,
  }));
}

export function matchRtkFilter(
  text: string,
  command?: string | null,
  options: RtkFilterLoadOptions = {}
): RtkFilterDefinition | null {
  const detection = detectCommandType(text, command);
  const detectedCommand = detection.command ?? command ?? "";
  const filters = loadRtkFilters(options);
  for (const source of ["project", "global", "builtin"] as const) {
    const scoped = filters.filter((filter) => (filter.source ?? "builtin") === source);
    const matched =
      scoped.find(
        (filter) =>
          filter.sourceFormat === "rtk-toml-v1" &&
          detectedCommand &&
          filter.commandPatterns.some((pattern) => cachedMatchPattern(pattern, detectedCommand))
      ) ??
      scoped.find((filter) => filter.commandTypes.includes(detection.type)) ??
      scoped.find(
        (filter) =>
          detectedCommand &&
          filter.commandPatterns.some((pattern) => cachedMatchPattern(pattern, detectedCommand))
      ) ??
      scoped.find((filter) =>
        filter.matchPatterns.some((pattern) => cachedMatchPattern(pattern, text))
      );
    if (matched) return matched;
  }
  return filters.find((filter) => filter.commandTypes.includes("generic-output")) ?? null;
}
