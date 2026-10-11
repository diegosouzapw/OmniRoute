import { getCodexClientVersion } from "@omniroute/open-sse/config/codexClient.ts";
import type { SyncedAvailableModel } from "@/lib/db/models";
import {
  compareCodexDiscoveryVersions,
  type CodexDiscoveryMode,
  type CodexDiscoverySource,
} from "@/shared/services/codexDiscoveryPolicy";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
  type SafeOutboundFetchGuard,
} from "@/shared/network/safeOutboundFetch";
import {
  reconcileCodexDiscoveryCatalog,
  type CodexDiscoveryModel,
  type CodexModelsFetch,
} from "./codex";

export function createCodexDiscoveryFetch(
  proxyConfig: unknown,
  guard: SafeOutboundFetchGuard
): CodexModelsFetch {
  return (url, init) =>
    safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard,
      proxyConfig,
      ...init,
    });
}

export function createCodexCatalogReconciler(
  staticModels: Parameters<typeof reconcileCodexDiscoveryCatalog>[1],
  mode: CodexDiscoveryMode
) {
  return (
    remoteModels: readonly (CodexDiscoveryModel | SyncedAvailableModel)[],
    source: CodexDiscoverySource = "live",
    fallbackWarning?: string
  ) => {
    const clientVersion = getCodexClientVersion();
    const catalog = reconcileCodexDiscoveryCatalog(
      remoteModels.map((model): CodexDiscoveryModel => ({
        ...model,
        owned_by: "codex",
        apiFormat: "responses",
        supportedEndpoints: ["responses"],
        discoverySource: source,
      })),
      staticModels,
      mode,
      clientVersion
    );
    return {
      ...catalog,
      warning: buildCodexClientCompatibilityWarning(
        catalog.candidateModels,
        clientVersion,
        fallbackWarning
      ),
    };
  };
}

/** Explain only version-gated candidates from the catalog selected for this response. */
export function buildCodexClientCompatibilityWarning(
  candidateModels: readonly CodexDiscoveryModel[],
  clientVersion: string,
  fallbackWarning?: string
): string | undefined {
  const incompatibleModels = candidateModels.filter(
    (model) => model.compatibilityReason === "requires-newer-client" && model.minimalClientVersion
  );
  if (incompatibleModels.length === 0) return fallbackWarning;

  const requiredVersion = incompatibleModels.reduce(
    (highest, model) =>
      (compareCodexDiscoveryVersions(model.minimalClientVersion!, highest) ?? 0) > 0
        ? model.minimalClientVersion!
        : highest,
    incompatibleModels[0].minimalClientVersion!
  );
  const modelIds = incompatibleModels
    .slice(0, 3)
    .map((model) => model.id)
    .join(", ");
  const remaining = incompatibleModels.length - 3;
  const summary = remaining > 0 ? `${modelIds}, and ${remaining} more` : modelIds;
  const warning =
    `Skipped ChatGPT/Codex models that require a newer HTTP client profile (${summary}). ` +
    `OmniRoute reports ${clientVersion}; this catalog requires at least ${requiredVersion}. ` +
    `Refresh model discovery to update the client profile automatically (unless CODEX_CLIENT_VERSION is set). If it remains too old, ` +
    `upgrade OmniRoute. If this release is otherwise protocol-compatible, temporarily set ` +
    `CODEX_CLIENT_VERSION=${requiredVersion} and restart. Installing Codex CLI is only relevant ` +
    `to the separate codex-app-server provider.`;
  return [fallbackWarning, warning].filter(Boolean).join(" ");
}
