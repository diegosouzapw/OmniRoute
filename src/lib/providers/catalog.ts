import {
  APIKEY_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  LOCAL_PROVIDERS,
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  SEARCH_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  isClaudeCodeCompatibleProvider,
  supportsApiKeyOnFreeProvider,
  type RiskNoticeVariant,
} from "@/shared/constants/providers";

export type ProviderDisplayAuthType = "oauth" | "apikey" | "compatible" | "no-auth";
export type ProviderToggleAuthType = "oauth" | "free" | "apikey" | "no-auth";
export type StaticProviderCatalogCategory =
  | "no-auth"
  | "oauth"
  | "web-cookie"
  | "local"
  | "search"
  | "audio"
  | "upstream-proxy"
  | "apikey"
  | "cloud-agent";

export interface ProviderCatalogMetadata {
  id: string;
  name: string;
  color: string;
  alias?: string;
  icon?: string;
  textIcon?: string;
  website?: string;
  authHint?: string;
  apiHint?: string;
  passthroughModels?: boolean;
  subscriptionRisk?: boolean;
  riskNoticeVariant?: RiskNoticeVariant;
  apiType?: string;
  baseUrl?: string;
  hiddenFromDashboard?: boolean;
  /** Optional operator-supplied remote icon URL (#2166) for compatible provider nodes. */
  iconUrl?: string;
  [key: string]: unknown;
}

type ProviderRecord = Record<string, ProviderCatalogMetadata>;

export interface StaticProviderCatalogGroup {
  category: StaticProviderCatalogCategory;
  providers: ProviderRecord;
  displayAuthType: Exclude<ProviderDisplayAuthType, "compatible">;
  toggleAuthType: ProviderToggleAuthType;
}

export interface CompatibleProviderNodeLike {
  id: string;
  name?: string | null;
  type?: string | null;
  apiType?: string | null;
  baseUrl?: string | null;
  /** Optional operator-supplied remote icon URL (#2166). */
  iconUrl?: string | null;
}

export interface CompatibleProviderLabels {
  ccCompatibleName: string;
  anthropicCompatibleName: string;
  openAiCompatibleName: string;
}

export interface ResolvedStaticProviderCatalogEntry extends ProviderCatalogMetadata {
  category: StaticProviderCatalogCategory;
  displayAuthType: Exclude<ProviderDisplayAuthType, "compatible">;
  toggleAuthType: ProviderToggleAuthType;
  isCompatible: false;
}

export interface ResolvedCompatibleProviderCatalogEntry extends ProviderCatalogMetadata {
  category: "compatible";
  displayAuthType: "compatible";
  toggleAuthType: "apikey";
  isCompatible: true;
  type?: string | null;
}

export type ResolvedProviderCatalogEntry =
  | ResolvedStaticProviderCatalogEntry
  | ResolvedCompatibleProviderCatalogEntry;

export const STATIC_PROVIDER_CATALOG_GROUPS: Record<
  StaticProviderCatalogCategory,
  StaticProviderCatalogGroup
> = {
  "no-auth": {
    category: "no-auth",
    providers: NOAUTH_PROVIDERS as ProviderRecord,
    displayAuthType: "no-auth",
    toggleAuthType: "no-auth",
  },
  oauth: {
    category: "oauth",
    providers: OAUTH_PROVIDERS as ProviderRecord,
    displayAuthType: "oauth",
    toggleAuthType: "oauth",
  },
  "web-cookie": {
    category: "web-cookie",
    providers: WEB_COOKIE_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  local: {
    category: "local",
    providers: LOCAL_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  search: {
    category: "search",
    providers: SEARCH_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  audio: {
    category: "audio",
    providers: AUDIO_ONLY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  "upstream-proxy": {
    category: "upstream-proxy",
    providers: UPSTREAM_PROXY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  apikey: {
    category: "apikey",
    providers: APIKEY_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
  "cloud-agent": {
    category: "cloud-agent",
    providers: CLOUD_AGENT_PROVIDERS as ProviderRecord,
    displayAuthType: "apikey",
    toggleAuthType: "apikey",
  },
};

export const STATIC_PROVIDER_CATALOG_RESOLUTION_ORDER: StaticProviderCatalogCategory[] = [
  "no-auth",
  "oauth",
  "web-cookie",
  "local",
  "search",
  "audio",
  "upstream-proxy",
  "cloud-agent",
  "apikey",
];

const MANAGED_PROVIDER_CONNECTION_CATEGORIES = new Set<StaticProviderCatalogCategory>([
  "apikey",
  "web-cookie",
  "local",
  "search",
  "audio",
  "cloud-agent",
]);

export function getStaticProviderCatalogGroup(
  category: StaticProviderCatalogCategory
): StaticProviderCatalogGroup {
  return STATIC_PROVIDER_CATALOG_GROUPS[category];
}

export function resolveStaticProviderCatalogEntry(
  providerId: string
): ResolvedStaticProviderCatalogEntry | null {
  for (const category of STATIC_PROVIDER_CATALOG_RESOLUTION_ORDER) {
    const group = STATIC_PROVIDER_CATALOG_GROUPS[category];
    const provider = group.providers[providerId];
    if (!provider) continue;
    return {
      ...provider,
      category,
      displayAuthType: group.displayAuthType,
      toggleAuthType: group.toggleAuthType,
      isCompatible: false,
    };
  }
  return null;
}

/**
 * OAuth-primary providers that ALSO accept a direct BYOK API key (dual-auth),
 * admitted through the managed-connection API-key gate independent of the OAuth
 * catalog. These are deliberately kept OUT of `FREE_APIKEY_PROVIDER_IDS`: that
 * set flips `providerSupportsPat` true, which turns `isOAuth` false and would
 * make the dashboard's primary "Connect" button route to the API-key modal
 * instead of the OAuth flow. Admitting them here lets POST /api/providers
 * persist an `apikey` connection (the reliable BYOK path) while the provider
 * stays OAuth-primary (isOAuth=true). clinepass is the dual-auth case: sign in
 * with a Cline account OR paste a ClinePass API key.
 */
const DUAL_AUTH_APIKEY_PROVIDER_IDS = new Set<string>(["clinepass"]);

export function isManagedProviderConnectionId(providerId: string): boolean {
  if (supportsApiKeyOnFreeProvider(providerId)) return true;
  if (DUAL_AUTH_APIKEY_PROVIDER_IDS.has(providerId)) return true;

  const entry = resolveStaticProviderCatalogEntry(providerId);
  return !!(entry && MANAGED_PROVIDER_CONNECTION_CATEGORIES.has(entry.category));
}

export function resolveCompatibleProviderCatalogEntry(
  providerNode: CompatibleProviderNodeLike,
  labels: CompatibleProviderLabels
): ResolvedCompatibleProviderCatalogEntry {
  const isCcCompatible = isClaudeCodeCompatibleProvider(providerNode.id);
  const isAnthropicCompatible = providerNode.type === "anthropic-compatible" && !isCcCompatible;

  return {
    id: providerNode.id,
    name:
      providerNode.name ||
      (isCcCompatible
        ? labels.ccCompatibleName
        : isAnthropicCompatible
          ? labels.anthropicCompatibleName
          : labels.openAiCompatibleName),
    color: isCcCompatible ? "#B45309" : isAnthropicCompatible ? "#D97757" : "#10A37F",
    textIcon: isCcCompatible ? "CC" : isAnthropicCompatible ? "AC" : "OC",
    apiType: providerNode.apiType || undefined,
    baseUrl: providerNode.baseUrl || undefined,
    iconUrl: providerNode.iconUrl || undefined,
    type: providerNode.type,
    category: "compatible",
    displayAuthType: "compatible",
    toggleAuthType: "apikey",
    isCompatible: true,
  };
}

export function resolveProviderCatalogEntry(
  providerId: string,
  options?: {
    providerNode?: CompatibleProviderNodeLike | null;
    compatibleLabels?: CompatibleProviderLabels | null;
  }
): ResolvedProviderCatalogEntry | null {
  if (options?.providerNode && options.compatibleLabels) {
    return resolveCompatibleProviderCatalogEntry(options.providerNode, options.compatibleLabels);
  }

  return resolveStaticProviderCatalogEntry(providerId);
}
