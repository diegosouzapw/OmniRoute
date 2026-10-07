import rawManifest from "../../../config/cli-tools-manifest.json";

export type CliSurface = "catalog" | "detect" | "run" | "configure" | "generate";
export type CliCapability = CliSurface | "agentBackend";
export type CliPlatform = "linux" | "darwin" | "win32";

export interface CliConfigureRecipe {
  mode: "module" | "codex-profile";
  module?: string;
  exportName?: string;
}

export interface CliRunModelSpec {
  flag: string;
  prefix: string;
  required: boolean;
}

export interface CliAgentBackendSpec {
  mode: "acp" | "stdio-adapter";
  binary: string;
  versionArgs: string[];
  spawnArgs: string[];
  providerAlias: string;
}

export interface CliIntegrationEntry {
  displayName: string;
  aliases: string[];
  binaries: string[];
  surfaces: Record<CliSurface, boolean>;
  configureRecipe?: CliConfigureRecipe;
  runModel?: CliRunModelSpec;
  agentBackend?: CliAgentBackendSpec;
}

interface CliRuntimeManifest {
  platforms: CliPlatform[];
  primaryConfigPaths: Record<string, string[]>;
}

function validateEntry(id: string, entry: CliIntegrationEntry, runtime: CliRuntimeManifest): void {
  if (!id || id !== id.toLowerCase()) throw new Error(`Invalid CLI manifest id: ${id}`);
  if (!entry.displayName || !Array.isArray(entry.aliases) || !Array.isArray(entry.binaries)) {
    throw new Error(`Invalid CLI manifest entry: ${id}`);
  }
  if (entry.surfaces.configure !== Boolean(entry.configureRecipe)) {
    throw new Error(`CLI '${id}' configure capability and recipe disagree`);
  }
  if (entry.surfaces.detect && !Object.hasOwn(runtime.primaryConfigPaths, id)) {
    throw new Error(`Detectable CLI '${id}' has no primary config-path contract`);
  }
  const primaryPaths = runtime.primaryConfigPaths[id];
  if (
    primaryPaths &&
    (!Array.isArray(primaryPaths) || primaryPaths.some((candidate) => !candidate.trim()))
  ) {
    throw new Error(`Invalid primary config paths for CLI '${id}'`);
  }
}

function claimAliases(aliases: string[], claimedNames: Set<string>): void {
  for (const alias of aliases) {
    const normalized = alias.trim().toLowerCase();
    if (!normalized || claimedNames.has(normalized)) {
      throw new Error(`CLI alias '${alias}' conflicts with a canonical id`);
    }
    if (claimedNames.has(`alias:${normalized}`)) {
      throw new Error(`Duplicate CLI alias: ${alias}`);
    }
    claimedNames.add(`alias:${normalized}`);
  }
}

function validateManifest(
  tools: Record<string, CliIntegrationEntry>,
  runtime: CliRuntimeManifest
): void {
  const allowedPlatforms = new Set<CliPlatform>(["linux", "darwin", "win32"]);
  if (
    runtime.platforms.length === 0 ||
    runtime.platforms.some((platform) => !allowedPlatforms.has(platform))
  ) {
    throw new Error("Invalid CLI manifest runtime platforms");
  }
  const claimedNames = new Set(Object.keys(tools));
  for (const [id, entry] of Object.entries(tools)) {
    validateEntry(id, entry, runtime);
    claimAliases(entry.aliases, claimedNames);
  }
}

const parsedTools = rawManifest.tools as Record<string, CliIntegrationEntry>;
const parsedRuntime = rawManifest.runtime as CliRuntimeManifest;
validateManifest(parsedTools, parsedRuntime);

export const CLI_INTEGRATION_MANIFEST: Readonly<Record<string, CliIntegrationEntry>> =
  Object.freeze(parsedTools);

export const CLI_INTEGRATION_PLATFORMS: readonly CliPlatform[] = Object.freeze([
  ...parsedRuntime.platforms,
]);

export function listCliIntegrationIds(capability?: CliCapability): string[] {
  return Object.entries(CLI_INTEGRATION_MANIFEST)
    .filter(([, entry]) => {
      if (!capability) return true;
      if (capability === "agentBackend") return Boolean(entry.agentBackend);
      return entry.surfaces[capability];
    })
    .map(([id]) => id);
}

export function getCliIntegration(id: string): CliIntegrationEntry | undefined {
  return CLI_INTEGRATION_MANIFEST[id];
}

/** Primary config-path suffixes accepted for the current runtime resolver. */
export function getCliDeclaredPrimaryConfigPaths(id: string): readonly string[] {
  return Object.freeze([...(parsedRuntime.primaryConfigPaths[id] || [])]);
}

/** Provider aliases default to the canonical id unless an agent contract declares an override. */
export function getCliProviderAlias(id: string): string | undefined {
  const entry = getCliIntegration(id);
  if (!entry) return undefined;
  return entry.agentBackend?.providerAlias || id;
}

export function buildCliAliasMap(): Readonly<Record<string, string>> {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(CLI_INTEGRATION_MANIFEST).flatMap(([id, entry]) =>
        entry.aliases.map((alias) => [alias, id])
      )
    )
  );
}
