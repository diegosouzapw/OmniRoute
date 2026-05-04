import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { detectCommandType } from "./commandDetector.ts";
import { validateRtkFilter, type RtkFilterDefinition } from "./filterSchema.ts";

let cache: RtkFilterDefinition[] | null = null;
let cacheKey: string | null = null;
let diagnostics: RtkFilterLoadDiagnostic[] = [];

export interface RtkFilterLoadDiagnostic {
  source: "project" | "global" | "builtin";
  path?: string;
  level: "warning" | "error";
  message: string;
}

interface FilterSource {
  source: "project" | "global" | "builtin";
  path: string;
  trusted: boolean;
}

interface RtkFilterLoadOptions {
  refresh?: boolean;
  customFiltersEnabled?: boolean;
  trustProjectFilters?: boolean;
}

function getFiltersDir(): string {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.join(moduleDir, "filters"),
    path.join(moduleDir, "..", "services", "compression", "engines", "rtk", "filters"),
    path.join(process.cwd(), "open-sse", "services", "compression", "engines", "rtk", "filters"),
    path.join(
      process.cwd(),
      "app",
      "open-sse",
      "services",
      "compression",
      "engines",
      "rtk",
      "filters"
    ),
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
    const trustedHash =
      typeof trust.filtersSha256 === "string"
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
  const projectPath = path.join(process.cwd(), ".rtk", "filters.json");
  if (options.customFiltersEnabled !== false && fs.existsSync(projectPath)) {
    const trusted = projectFiltersTrusted(projectPath, options.trustProjectFilters === true);
    if (trusted === true) {
      sources.push({ source: "project", path: projectPath, trusted: true });
    } else {
      diagnostics.push({
        source: "project",
        path: projectPath,
        level: "warning",
        message:
          trusted === "changed"
            ? "Project RTK filters changed after trust and were skipped"
            : "Project RTK filters are untrusted and were skipped",
      });
    }
  }

  const globalPath = path.join(getDataDir(), "rtk", "filters.json");
  if (options.customFiltersEnabled !== false && fs.existsSync(globalPath)) {
    sources.push({ source: "global", path: globalPath, trusted: true });
  }

  const builtinDir = getFiltersDir();
  if (fs.existsSync(builtinDir)) {
    for (const file of fs
      .readdirSync(builtinDir)
      .filter((entry) => entry.endsWith(".json"))
      .sort()) {
      sources.push({
        source: "builtin",
        path: path.join(builtinDir, file),
        trusted: true,
      });
    }
  }

  return sources;
}

function parseFilterFile(source: FilterSource): RtkFilterDefinition[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(source.path, "utf8"));
    const entries = Array.isArray(parsed) ? parsed : [parsed];
    return entries.map(validateRtkFilter);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (source.source === "builtin") {
      throw new Error(`Invalid RTK filter ${path.basename(source.path)}: ${message}`);
    }
    diagnostics.push({
      source: source.source,
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

  const sorted = filters.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
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
    "id" | "name" | "description" | "commandTypes" | "category" | "priority"
  >
> {
  return loadRtkFilters().map((filter) => ({
    id: filter.id,
    name: filter.name,
    description: filter.description,
    commandTypes: filter.commandTypes,
    category: filter.category,
    priority: filter.priority,
  }));
}

export function matchRtkFilter(
  text: string,
  command?: string | null,
  options: RtkFilterLoadOptions = {}
): RtkFilterDefinition | null {
  const detection = detectCommandType(text, command);
  const detectedCommand = detection.command ?? command ?? "";
  const matchesPattern = (pattern: string, value: string): boolean => {
    try {
      return new RegExp(pattern, "im").test(value);
    } catch {
      return false;
    }
  };
  const filters = loadRtkFilters(options);
  return (
    filters.find((filter) => filter.commandTypes.includes(detection.type)) ??
    filters.find(
      (filter) =>
        detectedCommand &&
        filter.commandPatterns.some((pattern) => matchesPattern(pattern, detectedCommand))
    ) ??
    filters.find((filter) =>
      filter.matchPatterns.some((pattern) => matchesPattern(pattern, text))
    ) ??
    filters.find((filter) => filter.commandTypes.includes("generic-output")) ??
    null
  );
}
