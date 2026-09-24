/** Exact Codex model ids retired after discovery merge. */
export const CODEX_DISCOVERY_EXCLUDED_IDS: ReadonlySet<string> = new Set([
  // Reserved for one-off retired ids that do not share a clean prefix family.
]);

/**
 * Codex model-id families retired after discovery merge. Delimiter-aware
 * matching prevents prefixes such as `gpt-5.40` from being removed.
 */
export const CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES: readonly string[] = ["gpt-5.4"];

export type CodexDiscoveryMode = "off" | "safe" | "all";
export type CodexDiscoverySource = "live" | "github";
export type CodexDiscoveryStatus = "active" | "candidate" | "incompatible" | "retired";

export type CodexDiscoveryModelIdentity = {
  id?: unknown;
  visibility?: unknown;
  supportedInApi?: unknown;
  minimalClientVersion?: unknown;
};

export type CodexDiscoveryCompatibilityResult =
  { status: "active" } | { status: Exclude<CodexDiscoveryStatus, "active">; reason: string };

export function isCodexDiscoveryModelExcluded(model: CodexDiscoveryModelIdentity): boolean {
  const id = typeof model?.id === "string" ? model.id.trim().toLowerCase() : "";
  if (!id) return true;
  if (CODEX_DISCOVERY_EXCLUDED_IDS.has(id)) return true;

  return CODEX_DISCOVERY_EXCLUDED_ID_PREFIXES.some((prefix) => {
    const normalizedPrefix = prefix.toLowerCase();
    return (
      id === normalizedPrefix ||
      id.startsWith(`${normalizedPrefix}-`) ||
      id.startsWith(`${normalizedPrefix}_`) ||
      id.startsWith(`${normalizedPrefix}.`)
    );
  });
}

function compareVersions(left: string, right: string): number | null {
  const parse = (version: string) => {
    const parts = version.trim().split(".").map(Number);
    return parts.length > 0 && parts.every((part) => Number.isInteger(part) && part >= 0)
      ? parts
      : null;
  };
  const leftParts = parse(left);
  const rightParts = parse(right);
  if (!leftParts || !rightParts) return null;

  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const difference = (leftParts[index] || 0) - (rightParts[index] || 0);
    if (difference !== 0) return difference;
  }
  return 0;
}

/** Classifies remote metadata without granting compatibility by default. */
export function classifyCodexDiscoveryModel(
  model: CodexDiscoveryModelIdentity,
  {
    source,
    mode,
    implementedClientVersion,
  }: {
    source: CodexDiscoverySource;
    mode: CodexDiscoveryMode;
    implementedClientVersion: string;
  }
): CodexDiscoveryCompatibilityResult {
  if (isCodexDiscoveryModelExcluded(model)) return { status: "retired", reason: "denylisted" };
  if (typeof model.visibility === "string" && model.visibility.toLowerCase() === "hide") {
    return { status: "incompatible", reason: "hidden" };
  }
  if (model.supportedInApi === false)
    return { status: "incompatible", reason: "api-not-supported" };

  if (typeof model.minimalClientVersion === "string") {
    const versionComparison = compareVersions(model.minimalClientVersion, implementedClientVersion);
    if (versionComparison === null)
      return { status: "candidate", reason: "invalid-minimal-client-version" };
    if (versionComparison > 0) return { status: "candidate", reason: "requires-newer-client" };
  }

  if (source === "github" && mode === "safe") {
    if (model.visibility !== "list") {
      return { status: "candidate", reason: "missing-explicit-list-visibility" };
    }
    if (model.supportedInApi !== true) {
      return { status: "candidate", reason: "missing-explicit-api-support" };
    }
  }
  return { status: "active" };
}

export function getCodexDiscoveryMode(providerSpecificData: unknown): CodexDiscoveryMode {
  const data =
    providerSpecificData && typeof providerSpecificData === "object" ? providerSpecificData : {};
  const explicitMode = (data as Record<string, unknown>).codexDiscoveryMode;
  if (explicitMode === "off" || explicitMode === "safe" || explicitMode === "all")
    return explicitMode;
  return (data as Record<string, unknown>).autoFetchModels === true ? "safe" : "off";
}
